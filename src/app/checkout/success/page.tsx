import type { Metadata } from "next";
import { BackgroundVideo } from "@/components/media/BackgroundVideo";
import { ClearCart } from "@/components/shop/ClearCart";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/Primitives";
import { RevealLines } from "@/components/ui/Reveal";
import { videos } from "@/lib/media";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Order received",
  robots: { index: false },
};

async function stripePaid(sessionId: string) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return false;
  try {
    const res = await fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`, {
      headers: { Authorization: `Bearer ${key}` },
      cache: "no-store",
    });
    const json = (await res.json()) as { payment_status?: string };
    return json.payment_status === "paid";
  } catch {
    return false;
  }
}

export default async function SuccessPage({ searchParams }: PageProps<"/checkout/success">) {
  const sp = await searchParams;
  const reference = typeof sp.ref === "string" && /^EFL-[A-Z0-9]{6}$/.test(sp.ref) ? sp.ref : null;
  const sessionId = typeof sp.session_id === "string" ? sp.session_id : null;
  const paid = sessionId ? await stripePaid(sessionId) : false;

  const steps = [
    paid ? "Payment received. A receipt is on its way from our payment provider." : "We'll be in touch to confirm your order and arrange payment.",
    "Booked a lesson? We'll call to agree a date that suits you and the conditions.",
    "Ordered kit? Nikki will confirm availability, delivery or collection.",
  ];

  return (
    <section className="grain relative flex min-h-[100svh] items-center overflow-hidden bg-ink text-bone">
      <ClearCart />
      <BackgroundVideo video={videos.sunsetDuo} priority />
      <div className="absolute inset-0 bg-ink/60" aria-hidden />
      <div className="shell relative z-10 py-36">
        <Eyebrow dot className="text-bone/80">
          {reference ? `Order ${reference}` : "Order received"}
        </Eyebrow>
        <RevealLines
          as="h1"
          className="display mt-8 text-[clamp(2.6rem,8vw,8rem)]"
          lines={[
            "You're",
            <span key="b" className="serif text-[1.15em] text-teal">
              all set
            </span>,
          ]}
        />
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-bone/80">
          Thank you for choosing Efoil London.{reference ? ` Your reference is ${reference}; keep it handy if you get in touch.` : ""}
        </p>
        <ul className="mt-10 grid grid-cols-1 max-w-xl gap-4">
          {steps.map((s) => (
            <li key={s} className="flex items-start gap-3 text-bone/80">
              <Icon name="check" className="mt-0.5 size-5 shrink-0 text-teal" />
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-wrap gap-3">
          <ButtonLink href="/" size="lg">
            Back to home
          </ButtonLink>
          <ButtonLink href={site.phone.href} size="lg" variant="ghost" icon="phone">
            {site.phone.display}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
