import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/format";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "light" | "ghost" | "ghost-dark" | "ink";
type Size = "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full font-sans text-[0.78rem] font-semibold uppercase tracking-[0.14em] whitespace-nowrap transition-[background-color,color,border-color,transform,box-shadow] duration-500 ease-(--ease-expo) active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-teal text-ink hover:bg-teal-bright hover:shadow-[0_10px_40px_-10px_rgb(104_224_216/0.7)]",
  light: "bg-bone text-ink hover:bg-white",
  ghost: "border border-white/25 text-bone backdrop-blur-md hover:border-white hover:bg-white hover:text-ink",
  "ghost-dark": "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-bone",
  ink: "bg-ink text-bone hover:bg-ink-4",
};

const sizes: Record<Size, string> = {
  md: "h-12 px-6",
  lg: "h-14 px-8 text-[0.8rem]",
};

type Common = { variant?: Variant; size?: Size; icon?: IconName | null; children: ReactNode; className?: string };

function Inner({ children, icon }: { children: ReactNode; icon?: IconName | null }) {
  return (
    <>
      <span className="relative">{children}</span>
      {icon ? (
        <span className="relative -mr-1 grid size-5 place-items-center overflow-hidden">
          <Icon
            name={icon}
            className="size-4 transition-transform duration-500 ease-(--ease-expo) group-hover/btn:translate-x-[150%]"
          />
          <Icon
            name={icon}
            className="absolute size-4 -translate-x-[150%] transition-transform duration-500 ease-(--ease-expo) group-hover/btn:translate-x-0"
          />
        </span>
      ) : null}
    </>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  icon = "arrowRight",
  children,
  className,
  ...props
}: Common & Omit<ComponentProps<typeof Link>, "children" | "className">) {
  return (
    <Link className={cn(base, variants[variant], sizes[size], className)} {...props}>
      <Inner icon={icon}>{children}</Inner>
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  icon = null,
  children,
  className,
  ...props
}: Common & Omit<ComponentProps<"button">, "children" | "className">) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      <Inner icon={icon}>{children}</Inner>
    </button>
  );
}

export function ExternalLink({
  variant = "ghost",
  size = "md",
  icon = "arrowUpRight",
  children,
  className,
  ...props
}: Common & Omit<ComponentProps<"a">, "children" | "className">) {
  return (
    <a className={cn(base, variants[variant], sizes[size], className)} target="_blank" rel="noreferrer" {...props}>
      <Inner icon={icon}>{children}</Inner>
    </a>
  );
}
