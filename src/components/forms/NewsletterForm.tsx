"use client";

import Link from "next/link";
import { subscribe } from "@/app/actions";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/format";
import { useActionForm } from "@/lib/use-action-form";

export function NewsletterForm({ source = "footer", className }: { source?: string; className?: string }) {
  const [state, onSubmit, pending] = useActionForm(subscribe, null);

  if (state?.ok) {
    return (
      <div className={cn("flex items-start gap-3 rounded-2xl border border-teal/40 bg-teal/10 p-5 text-sm", className)} role="status">
        <Icon name="check" className="mt-0.5 size-5 shrink-0 text-teal" />
        <p>{state.message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("grid grid-cols-1 gap-3", className)} noValidate>
      <input type="hidden" name="source" value={source} />
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="flex gap-2 rounded-full border border-white/15 bg-white/[0.04] p-1.5 pl-5 transition focus-within:border-teal">
        <label htmlFor={`nl-${source}`} className="sr-only">
          Email address
        </label>
        <input
          id={`nl-${source}`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Your email address"
          aria-invalid={Boolean(state?.errors?.email)}
          className="min-w-0 flex-1 bg-transparent text-sm text-bone outline-none placeholder:text-bone/40"
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-teal px-5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink transition hover:bg-teal-bright disabled:opacity-60"
        >
          {pending ? "Joining…" : "Join"}
          <Icon name="arrowRight" className="size-4" />
        </button>
      </div>
      <label className="flex items-start gap-3 text-xs leading-relaxed text-bone/60">
        <input type="checkbox" name="consent" className="mt-0.5 size-4 shrink-0 accent-teal" required />
        <span>
          Email me news, events and offers, and enter me into the monthly free-lesson draw. You can unsubscribe at any time. See our{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-bone">
            privacy notice
          </Link>
          .
        </span>
      </label>
      {state && !state.ok ? (
        <p className="text-xs text-ember" role="alert">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
