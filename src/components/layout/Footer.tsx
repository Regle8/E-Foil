import Image from "next/image";
import Link from "next/link";
import { RiderMark } from "@/components/brand/RiderMark";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Icon } from "@/components/ui/Icon";
import { community } from "@/data/content";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Ride",
    links: [
      { label: "eFoil lessons", href: "/lessons" },
      { label: "The Reservoir, London", href: "/london" },
      { label: "Hayling Island", href: "/london#hayling" },
      { label: "What is an eFoil?", href: "/what-is-an-efoil" },
    ],
  },
  {
    title: "Shop",
    links: [
      { label: "LIFT5", href: "/lift5" },
      { label: "LIFTX", href: "/liftx" },
      { label: "All eFoils", href: "/shop?category=efoils" },
      { label: "Wings", href: "/shop?category=wings" },
      { label: "Accessories", href: "/shop?category=accessories" },
      { label: "Used Not Abused", href: "/used" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Terms & conditions", href: "/terms" },
      { label: "Privacy notice", href: "/privacy" },
      { label: "LIFT warranty", href: site.warrantyUrl, external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink text-bone">
      <div className="shell grid grid-cols-1 gap-14 pb-10 pt-20 md:pt-28 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-5 text-teal">Join the community</p>
          <h2 className="display text-[clamp(2rem,4vw,3.25rem)]">
            Win a free lesson <span className="serif text-teal normal-case">worth £200</span>
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-bone/65">{community.newsletter}</p>
          <NewsletterForm className="mt-8 max-w-md" />
          <div className="mt-8 flex items-center gap-3">
            <SocialLink href={site.socials.instagram} label="Instagram" icon="instagram" />
            <SocialLink href={site.socials.facebook} label="Facebook group" icon="facebook" />
            <SocialLink href={site.socials.linkedin} label="LinkedIn" icon="linkedin" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-4">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="eyebrow mb-5 text-bone/60">{col.title}</p>
              <ul className="grid grid-cols-1 gap-3 text-sm">
                {col.links.map((link) => (
                  <li key={link.href}>
                    {"external" in link ? (
                      <a href={link.href} target="_blank" rel="noreferrer" className="link-underline text-bone/80 hover:text-bone">
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="link-underline text-bone/80 hover:text-bone">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 content-start gap-8 text-sm lg:col-span-3">
          <div>
            <p className="eyebrow mb-5 text-bone/60">Visit & call</p>
            <address className="not-italic leading-relaxed text-bone/80">
              {site.hq.line1}
              <br />
              {site.hq.town}, {site.hq.postcode}
            </address>
            <div className="mt-4 grid grid-cols-1 gap-1.5">
              <a href={site.phone.href} className="link-underline w-fit text-bone/80 hover:text-bone">
                {site.phone.display}
              </a>
              <a href={site.mobile.href} className="link-underline w-fit text-bone/80 hover:text-bone">
                {site.mobile.display}
              </a>
              <a href={`mailto:${site.email}`} className="link-underline w-fit text-bone/80 hover:text-bone">
                {site.email}
              </a>
            </div>
          </div>
          <dl className="grid grid-cols-1 gap-1.5 text-bone/70">
            {site.hours.map((h) => (
              <div key={h.days} className="flex justify-between gap-4 border-b border-white/10 pb-1.5">
                <dt>{h.days}</dt>
                <dd className="tabular-nums">{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="shell flex flex-col gap-6 border-t border-white/10 py-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-6">
          <Image src="/brand/lift-logo-white.png" alt="LIFT Foils authorised dealer" width={110} height={54} className="h-9 w-auto opacity-80" />
          <span className="h-8 w-px bg-white/15" aria-hidden />
          <Image
            src="/brand/ocean-network.webp"
            alt="Surfers Against Sewage Ocean Network member"
            width={150}
            height={48}
            className="h-8 w-auto rounded-md bg-white px-2 py-1"
          />
        </div>
        <p className="max-w-xl text-xs leading-relaxed text-bone/60 md:text-right">
          © {new Date().getFullYear()} Efoil London. {site.legal} You must be medically fit to take part in e-foiling.
        </p>
      </div>

      <div className="pointer-events-none relative -mb-[2.2vw] select-none overflow-hidden" aria-hidden>
        <p className="display flex items-end justify-center gap-[2vw] whitespace-nowrap text-[15.5vw] leading-[0.78] text-white/[0.06]">
          Efoil
          <RiderMark className="h-[0.8em] w-auto text-teal/25" />
          London
        </p>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, icon }: { href: string; label: string; icon: "instagram" | "facebook" | "linkedin" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid size-11 place-items-center rounded-full border border-white/15 text-bone/80 transition hover:border-teal hover:bg-teal hover:text-ink"
    >
      <Icon name={icon} className="size-[1.1rem]" />
    </a>
  );
}
