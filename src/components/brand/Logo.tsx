import { cn } from "@/lib/format";
import { RiderMark } from "./RiderMark";

export function Logo({ className, markClassName }: { className?: string; markClassName?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <RiderMark className={cn("h-8 w-auto text-teal", markClassName)} />
      <span className="flex flex-col leading-none">
        <span className="display text-[1.05rem] tracking-[-0.02em]">Efoil</span>
        <span className="mt-[3px] font-mono text-[0.56rem] tracking-[0.42em] uppercase opacity-80">London</span>
      </span>
    </span>
  );
}
