import type { Metadata } from "next";
import Link from "next/link";
import { LegalHeader } from "@/components/layout/LegalHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: "How Efoil London collects, uses and protects your personal information.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    title: "Who we are",
    body: [
      `${site.legal} We are the controller of the personal information described in this notice.`,
      `Questions about your data can be sent to ${site.email} or ${site.phone.display}.`,
    ],
  },
  {
    title: "What we collect",
    body: [
      "Contact details you give us (name, email address, phone number) when you send an enquiry, book a lesson, place an order or join our mailing list.",
      "Order and booking details, such as the products or lessons you choose, your preferred location and dates, delivery address and any notes you add.",
      "Payment is handled by our payment provider; we do not store your full card details.",
      "Health and suitability information you choose to share so we can run lessons safely, for example about injuries or medical conditions.",
    ],
  },
  {
    title: "How we use it",
    body: [
      "To respond to enquiries, arrange and deliver lessons, and process and fulfil orders (performance of a contract).",
      "To keep riders safe and manage our business, including record-keeping and handling complaints (legitimate interests and legal obligations).",
      "To send news, offers and monthly free-lesson draw entries, only where you've opted in (consent). You can unsubscribe at any time.",
    ],
  },
  {
    title: "Who we share it with",
    body: [
      "Trusted service providers who host our website and database, process payments and deliver orders, only as needed to provide our services. We do not sell your personal information.",
    ],
  },
  {
    title: "How long we keep it",
    body: [
      "We keep order and booking records for as long as needed for accounting and legal purposes, and marketing data until you unsubscribe or ask us to delete it.",
    ],
  },
  {
    title: "Your rights",
    body: [
      "You can ask to access, correct or delete your information, object to or restrict how we use it, and withdraw consent at any time. Contact us using the details above.",
      "If you're unhappy with how we've handled your data, you can complain to the Information Commissioner's Office (ico.org.uk).",
    ],
  },
  {
    title: "Photos and video",
    body: [
      "Photos or video may be taken during lessons and used on our website and social media. Please tell us before or during your session if you'd prefer not to be filmed.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
    <LegalHeader title="Privacy notice" />
    <div className="bg-bone py-20 text-ink md:py-28">
      <div className="shell max-w-4xl">
        <p className="max-w-2xl leading-relaxed text-ink/65">
          This notice explains how we handle the personal information you share with us through this website, by phone, by email and at our
          centres. Please also read our{" "}
          <Link href="/terms" className="underline underline-offset-4">
            terms & conditions
          </Link>
          .
        </p>
        <div className="mt-14">
          {sections.map((s) => (
            <section key={s.title} className="border-t border-ink/10 py-9">
              <h2 className="display-tight text-xl md:text-2xl">{s.title}</h2>
              <div className="mt-4 grid grid-cols-1 gap-3 leading-relaxed text-ink/75">
                {s.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
