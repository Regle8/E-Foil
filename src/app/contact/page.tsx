import type { Metadata } from "next";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { PageHero } from "@/components/layout/PageHero";
import { Icon } from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { videos } from "@/lib/media";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Efoil London",
  description: "Questions about eFoil lessons, demos or buying a LIFT eFoil? Call 020 8087 4016, email efoillondon@gmail.com or send us an enquiry.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const cards = [
    { icon: "phone" as const, label: "Phone", value: site.phone.display, href: site.phone.href },
    { icon: "phone" as const, label: "Mobile", value: site.mobile.display, href: site.mobile.href },
    { icon: "mail" as const, label: "Email", value: site.email, href: `mailto:${site.email}` },
  ];
  return (
    <>
      <PageHero
        size="md"
        video={videos.coastRide}
        eyebrow="Contact"
        lines={[
          "Talk to",
          <span key="t" className="serif text-[1.15em] text-teal">
            the team
          </span>,
        ]}
        intro={<p>Lessons, demos, a new LIFT or selling your old one: Oly, Steve and Nikki are here to help.</p>}
      />

      <section className="bg-ink py-20 text-bone md:py-28">
        <div className="shell grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="grid grid-cols-1 content-start gap-4 lg:col-span-5">
            {cards.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.06}>
                <a
                  href={c.href}
                  className="group flex items-center justify-between gap-6 rounded-[1.5rem] border border-white/10 bg-ink-2 p-6 transition hover:border-teal/60"
                >
                  <span className="flex items-center gap-4">
                    <span className="grid size-11 place-items-center rounded-full bg-teal/15 text-teal">
                      <Icon name={c.icon} className="size-5" />
                    </span>
                    <span>
                      <span className="eyebrow block text-bone/60">{c.label}</span>
                      <span className="mt-1 block text-lg">{c.value}</span>
                    </span>
                  </span>
                  <Icon name="arrowUpRight" className="size-5 text-bone/40 transition group-hover:text-teal" />
                </a>
              </Reveal>
            ))}
            <Reveal delay={0.2} className="rounded-[1.5rem] border border-white/10 bg-ink-2 p-6">
              <span className="eyebrow block text-bone/60">{site.hq.name}</span>
              <address className="mt-2 not-italic text-lg">
                {site.hq.line1}, {site.hq.town}, {site.hq.postcode}
              </address>
              <dl className="mt-5 grid grid-cols-1 gap-1.5 text-sm text-bone/70">
                {site.hours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-4 border-b border-white/10 pb-1.5">
                    <dt>{h.days}</dt>
                    <dd>{h.time}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={0.26} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[site.reservoir, site.hayling].map((l) => (
                <a
                  key={l.name}
                  href={l.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-[1.5rem] border border-white/10 p-6 transition hover:border-teal/60"
                >
                  <Icon name="pin" className="size-5 text-teal" />
                  <p className="mt-4 font-medium">{l.name}</p>
                  <p className="mt-1 text-sm text-bone/65">{l.place}</p>
                  <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-teal">
                    Directions <Icon name="arrowUpRight" className="size-3.5" />
                  </p>
                </a>
              ))}
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal className="rounded-[2rem] border border-white/10 bg-ink-2 p-6 md:p-10">
              <Eyebrow className="mb-3 text-teal">Send an enquiry</Eyebrow>
              <h2 className="display mb-8 text-[clamp(1.8rem,3.4vw,3rem)]">How can we help?</h2>
              <EnquiryForm />
            </Reveal>
            <p className="mt-6 text-sm text-bone/60">Lessons and free-ride sessions at the reservoir must be pre-booked through us.</p>
          </div>
        </div>
      </section>
    </>
  );
}
