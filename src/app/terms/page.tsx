import type { Metadata } from "next";
import { LegalHeader } from "@/components/layout/LegalHeader";
import { termsSections } from "@/data/terms";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & conditions",
  description: "Booking, payment, cancellation and safety terms for Efoil London lessons, experiences and eFoil purchases.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <LegalHeader title="Terms & conditions">{site.legal}</LegalHeader>
      <div className="bg-bone py-20 text-ink md:py-28">
        <div className="shell grid grid-cols-1 gap-14 lg:grid-cols-12">
          <aside className="hidden lg:col-span-4 lg:block">
            <nav aria-label="Sections" className="sticky top-28">
              <ol className="grid grid-cols-1 gap-2.5 text-sm text-ink/60">
                {termsSections.map((s, i) => (
                  <li key={s.title}>
                    <a href={`#t-${i}`} className="hover:text-ink">
                      {s.title.split(" — ")[0]}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
          <article className="lg:col-span-8">
            {termsSections.map((s, i) => (
              <section key={s.title} id={`t-${i}`} className="scroll-mt-28 border-t border-ink/10 py-10 first:border-t-0 first:pt-0">
                <h2 className="display-tight text-xl md:text-2xl">{s.title}</h2>
                <div className="mt-5 grid grid-cols-1 gap-4 leading-relaxed text-ink/75">
                  {s.body.map((p) => (
                    <p key={p} className={p.startsWith("–") ? "pl-5" : undefined}>
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </article>
        </div>
      </div>
    </>
  );
}
