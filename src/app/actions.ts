"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getCatalog } from "@/lib/catalog";
import { site } from "@/lib/site";
import { getSupabase } from "@/lib/supabase";
import type { Category, FormState } from "@/lib/types";

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const field = (fd: FormData, key: string, max = 500) => String(fd.get(key) ?? "").trim().slice(0, max);
const isBot = (fd: FormData) => field(fd, "company") !== ""; // hidden honeypot input

const unavailable = `We couldn't send that just now. Please call ${site.phone.display} or email ${site.email}.`;

export async function subscribe(_prev: FormState, fd: FormData): Promise<FormState> {
  if (isBot(fd)) return { ok: true, message: "You're in this month's draw." };
  const email = field(fd, "email", 200).toLowerCase();
  if (!EMAIL.test(email)) return { ok: false, message: "Please enter a valid email address.", errors: { email: "Enter a valid email" } };
  if (fd.get("consent") !== "on") {
    return { ok: false, message: "Please tick the box so we can email you.", errors: { consent: "Required" } };
  }

  const supabase = getSupabase();
  if (!supabase) return { ok: false, message: unavailable };
  const { error } = await supabase
    .from("newsletter_signups")
    .insert({ email, consent: true, source: field(fd, "source", 60) || "site" });
  if (error && error.code !== "23505") {
    console.error("[newsletter]", error.message);
    return { ok: false, message: unavailable };
  }
  return {
    ok: true,
    message: error ? "You're already on the list, and in this month's draw." : "Welcome aboard. You're in this month's draw for a free lesson.",
  };
}

const TOPICS = ["lesson", "product", "used", "sell", "general"] as const;

export async function sendEnquiry(_prev: FormState, fd: FormData): Promise<FormState> {
  if (isBot(fd)) return { ok: true, message: "Thanks, we'll be in touch shortly." };
  const name = field(fd, "name", 120);
  const email = field(fd, "email", 200);
  const phone = field(fd, "phone", 40);
  const message = field(fd, "message", 4000);
  const rawTopic = field(fd, "topic", 20);
  const topic = (TOPICS as readonly string[]).includes(rawTopic) ? rawTopic : "general";

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please tell us your name";
  if (!EMAIL.test(email)) errors.email = "Enter a valid email address";
  if (topic !== "lesson" && message.length < 3) errors.message = "Add a short message";
  if (Object.keys(errors).length) return { ok: false, message: "Please check the highlighted fields.", errors };

  const supabase = getSupabase();
  if (!supabase) return { ok: false, message: unavailable };
  const { error } = await supabase.from("enquiries").insert({
    topic,
    name,
    email,
    phone: phone || null,
    message: message || null,
    product_slug: field(fd, "product", 120) || null,
    location: field(fd, "location", 120) || null,
    preferred_date: field(fd, "preferred_date", 120) || null,
  });
  if (error) {
    console.error("[enquiry]", error.message);
    return { ok: false, message: unavailable };
  }
  return { ok: true, message: `Thanks ${name.split(" ")[0]}. We've got your message and will be in touch shortly.` };
}

type IncomingLine = { slug?: unknown; variant?: unknown; qty?: unknown };

type OrderLine = {
  slug: string;
  name: string;
  category: Category;
  variant: string | null;
  variantLabel: string | null;
  qty: number;
  unitPence: number;
  linePence: number;
};

function makeReference() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return "EFL-" + Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
}

async function createStripeCheckout(opts: { origin: string; reference: string; email: string; lines: OrderLine[] }) {
  const body = new URLSearchParams();
  body.set("mode", "payment");
  body.set("customer_email", opts.email);
  body.set("client_reference_id", opts.reference);
  body.set("metadata[order_reference]", opts.reference);
  body.set("success_url", `${opts.origin}/checkout/success?ref=${opts.reference}&session_id={CHECKOUT_SESSION_ID}`);
  body.set("cancel_url", `${opts.origin}/checkout?cancelled=1`);
  opts.lines.forEach((line, i) => {
    body.set(`line_items[${i}][quantity]`, String(line.qty));
    body.set(`line_items[${i}][price_data][currency]`, "gbp");
    body.set(`line_items[${i}][price_data][unit_amount]`, String(line.unitPence));
    body.set(`line_items[${i}][price_data][product_data][name]`, line.variant ? `${line.name} (${line.variant})` : line.name);
  });
  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`, "Content-Type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
  });
  const json = (await res.json()) as { id?: string; url?: string; error?: { message?: string } };
  if (!res.ok || !json.id || !json.url) throw new Error(json.error?.message ?? `Stripe responded ${res.status}`);
  return { id: json.id, url: json.url };
}

export async function placeOrder(_prev: FormState, fd: FormData): Promise<FormState> {
  if (isBot(fd)) return { ok: false, message: "Something went wrong. Please try again." };

  let incoming: IncomingLine[] = [];
  try {
    incoming = JSON.parse(String(fd.get("items") ?? "[]"));
  } catch {
    incoming = [];
  }
  if (!Array.isArray(incoming) || incoming.length === 0) return { ok: false, message: "Your bag is empty." };
  if (incoming.length > 50) return { ok: false, message: "That's a lot of kit! Please call us to place a large order." };

  // Re-price everything from the catalogue; the browser only tells us what and how many.
  const catalog = await getCatalog();
  const lines: OrderLine[] = [];
  for (const raw of incoming) {
    const product = catalog.find((p) => p.slug === raw.slug);
    if (!product || product.purchaseMode !== "cart") {
      return { ok: false, message: `${product?.name ?? "An item in your bag"} can't be ordered online. Please remove it and get in touch.` };
    }
    let variant: string | null = null;
    if (product.variants.length) {
      const match = product.variants.find((v) => v.name === raw.variant);
      if (!match) return { ok: false, message: `Please choose a ${(product.variantLabel ?? "option").toLowerCase()} for ${product.name}.` };
      variant = match.name;
    }
    const qty = Math.max(1, Math.min(10, Math.floor(Number(raw.qty) || 1)));
    lines.push({
      slug: product.slug,
      name: product.name,
      category: product.category,
      variant,
      variantLabel: product.variantLabel,
      qty,
      unitPence: product.pricePence,
      linePence: product.pricePence * qty,
    });
  }

  const hasPhysical = lines.some((l) => l.category !== "lessons");
  const hasLessons = lines.some((l) => l.category === "lessons");
  const name = field(fd, "name", 120);
  const email = field(fd, "email", 200);
  const phone = field(fd, "phone", 40);
  const fulfilment = hasPhysical ? (fd.get("fulfilment") === "delivery" ? "delivery" : "collection") : "none";
  const address =
    fulfilment === "delivery"
      ? {
          line1: field(fd, "address1", 200),
          line2: field(fd, "address2", 200),
          city: field(fd, "city", 100),
          postcode: field(fd, "postcode", 12).toUpperCase(),
        }
      : null;

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your full name";
  if (!EMAIL.test(email)) errors.email = "Enter a valid email address";
  if (phone.replace(/\D/g, "").length < 7) errors.phone = "We need a phone number to arrange your order";
  if (address && !address.line1) errors.address1 = "Enter your street address";
  if (address && !address.city) errors.city = "Enter your town or city";
  if (address && address.postcode.length < 5) errors.postcode = "Enter a valid postcode";
  if (fd.get("terms") !== "on") errors.terms = "Please accept the terms to continue";
  if (hasLessons && fd.get("riders") !== "on") errors.riders = "Please confirm every rider meets the requirements";
  if (Object.keys(errors).length) return { ok: false, message: "Please check the highlighted fields.", errors };

  const supabase = getSupabase();
  if (!supabase) return { ok: false, message: unavailable };

  const cardPayments = Boolean(process.env.STRIPE_SECRET_KEY);
  const payment = cardPayments && fd.get("payment") === "card" ? "card" : "bank_transfer";
  const reference = makeReference();
  const subtotal = lines.reduce((n, l) => n + l.linePence, 0);

  let checkoutUrl: string | null = null;
  let sessionId: string | null = null;
  if (payment === "card") {
    try {
      const h = await headers();
      const origin = h.get("origin") ?? `https://${h.get("host")}`;
      const session = await createStripeCheckout({ origin, reference, email, lines });
      checkoutUrl = session.url;
      sessionId = session.id;
    } catch (e) {
      console.error("[checkout] stripe", e);
      return { ok: false, message: "We couldn't start the card payment. Please try again, or choose bank transfer." };
    }
  }

  const { error } = await supabase.from("orders").insert({
    reference,
    status: payment === "card" ? "pending" : "awaiting_payment",
    payment_method: payment,
    customer_name: name,
    email,
    phone,
    fulfilment,
    address,
    preferred_location: hasLessons ? field(fd, "preferred_location", 120) || null : null,
    preferred_dates: hasLessons ? field(fd, "preferred_dates", 300) || null : null,
    notes: field(fd, "notes", 2000) || null,
    items: lines,
    subtotal_pence: subtotal,
    stripe_session_id: sessionId,
  });
  if (error) {
    console.error("[checkout] insert", error.message);
    return { ok: false, message: unavailable };
  }

  redirect(checkoutUrl ?? `/checkout/success?ref=${reference}`);
}
