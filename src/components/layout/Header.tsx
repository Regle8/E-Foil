"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { BackgroundVideo } from "@/components/media/BackgroundVideo";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cartCount, useCart } from "@/lib/cart";
import { cn } from "@/lib/format";
import { videos } from "@/lib/media";
import { nav, site } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lines = useCart((s) => s.lines);
  const setCartOpen = useCart((s) => s.setOpen);
  const count = cartCount(lines);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!lenis) return;
    if (menuOpen) lenis.stop();
    else lenis.start();
  }, [menuOpen, lenis]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled && !menuOpen ? "border-b border-white/10 bg-ink/75 backdrop-blur-xl" : "border-b border-transparent"
        )}
      >
        {!scrolled && !menuOpen ? (
          <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-ink/70 to-transparent" aria-hidden />
        ) : null}
        <div className="shell relative flex h-[4.5rem] items-center justify-between gap-6 md:h-20">
          <Link href="/" className="relative z-10 text-bone" aria-label={`${site.name} home`} onClick={() => setMenuOpen(false)}>
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "link-underline text-[0.8rem] font-medium tracking-[0.06em] text-bone/80 transition-colors hover:text-bone",
                  isActive(item.href) && "text-bone [background-size:100%_1px]"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="relative z-10 flex items-center gap-2 sm:gap-3">
            <a
              href={site.phone.href}
              className="hidden items-center gap-2 text-[0.8rem] tabular-nums text-bone/75 transition-colors hover:text-bone xl:flex"
            >
              <Icon name="phone" className="size-4" />
              {site.phone.display}
            </a>
            <div className="hidden md:block">
              <ButtonLink href="/lessons" size="md" className="h-11" icon={null}>
                Book a lesson
              </ButtonLink>
            </div>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative grid size-11 place-items-center rounded-full border border-white/20 text-bone transition hover:border-white hover:bg-white hover:text-ink"
              aria-label={`Open bag, ${count} item${count === 1 ? "" : "s"}`}
            >
              <Icon name="bag" className="size-[1.15rem]" />
              {count > 0 ? (
                <span className="absolute -right-1 -top-1 grid min-w-5 place-items-center rounded-full bg-teal px-1 text-[0.65rem] font-semibold text-ink">
                  {count}
                </span>
              ) : null}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="grid size-11 place-items-center rounded-full border border-white/20 text-bone transition hover:border-white lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <Icon name={menuOpen ? "close" : "menu"} className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-40 overflow-hidden bg-ink lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease }}
          >
            <BackgroundVideo video={videos.aerialFormation} className="opacity-35" />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink" aria-hidden />
            <div className="shell relative flex h-full flex-col justify-between pb-10 pt-28" data-lenis-prevent>
              <nav aria-label="Mobile" className="flex flex-col">
                {[{ label: "Home", href: "/" }, ...nav, { label: "Used Not Abused", href: "/used" }, { label: "Contact", href: "/contact" }].map(
                  (item, i) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.15 + i * 0.05, ease }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className={cn(
                          "display block py-1.5 text-[clamp(2rem,9vw,3.4rem)] transition-colors",
                          isActive(item.href) && item.href !== "/" ? "text-teal" : "text-bone hover:text-teal"
                        )}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  )
                )}
              </nav>
              <motion.div
                className="grid grid-cols-1 gap-4 border-t border-white/15 pt-6 text-sm text-bone/75"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <p className="eyebrow text-teal">{site.claim}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  <a href={site.phone.href}>{site.phone.display}</a>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
