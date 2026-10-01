import type { ReactNode } from "react";

export function LegalHeader({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <header className="bg-ink pb-14 pt-36 text-bone md:pb-20 md:pt-44">
      <div className="shell">
        <p className="eyebrow text-teal">Legal</p>
        <h1 className="display mt-5 text-[clamp(2.4rem,6vw,5.6rem)]">{title}</h1>
        {children ? <div className="mt-6 max-w-2xl text-sm leading-relaxed text-bone/60">{children}</div> : null}
      </div>
    </header>
  );
}
