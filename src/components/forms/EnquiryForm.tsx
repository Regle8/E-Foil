"use client";

import { sendEnquiry } from "@/app/actions";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/format";
import { useActionForm } from "@/lib/use-action-form";

type Topic = "lesson" | "product" | "used" | "sell" | "general";

const topicLabels: Record<Topic, string> = {
  lesson: "Lessons & demos",
  product: "Buying an eFoil or kit",
  used: "Used Not Abused stock",
  sell: "Selling my eFoil",
  general: "Something else",
};

export function EnquiryForm({
  defaultTopic = "general",
  product,
  productName,
  tone = "dark",
  lockTopic = false,
  className,
}: {
  defaultTopic?: Topic;
  product?: string;
  productName?: string;
  tone?: "dark" | "light";
  lockTopic?: boolean;
  className?: string;
}) {
  const [state, onSubmit, pending] = useActionForm(sendEnquiry, null);
  const fieldClass = cn("field", tone === "light" && "field-light");
  const err = (key: string) => state?.errors?.[key];

  if (state?.ok) {
    return (
      <div
        role="status"
        className={cn(
          "flex items-start gap-4 rounded-3xl border p-6",
          tone === "dark" ? "border-teal/40 bg-teal/10" : "border-teal-deep/30 bg-teal/15",
          className
        )}
      >
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-teal text-ink">
          <Icon name="check" className="size-5" />
        </span>
        <div>
          <p className="display-tight text-xl">Message received</p>
          <p className="mt-1 text-sm opacity-75">{state.message}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("grid grid-cols-1 gap-4", className)} noValidate>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      {product ? <input type="hidden" name="product" value={product} /> : null}
      {lockTopic ? <input type="hidden" name="topic" value={defaultTopic} /> : null}
      {productName ? (
        <p className="eyebrow opacity-60">
          Enquiring about: <span className="opacity-100">{productName}</span>
        </p>
      ) : null}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Name" error={err("name")}>
          <input name="name" autoComplete="name" required className={fieldClass} aria-invalid={Boolean(err("name"))} />
        </Field>
        <Field label="Email" error={err("email")}>
          <input name="email" type="email" autoComplete="email" required className={fieldClass} aria-invalid={Boolean(err("email"))} />
        </Field>
        <Field label="Phone (optional)">
          <input name="phone" type="tel" autoComplete="tel" className={fieldClass} />
        </Field>
        {!lockTopic ? (
          <Field label="I'm asking about">
            <select name="topic" defaultValue={defaultTopic} className={fieldClass}>
              {Object.entries(topicLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </Field>
        ) : (
          <Field label="Preferred location">
            <select name="location" className={fieldClass} defaultValue="">
              <option value="">No preference</option>
              <option>Queen Mother Reservoir, London</option>
              <option>Hayling Island</option>
            </select>
          </Field>
        )}
      </div>
      <Field label="Message" error={err("message")}>
        <textarea
          name="message"
          rows={5}
          className={cn(fieldClass, "resize-y")}
          placeholder="Tell us about your riding, what you're looking for, or the dates you have in mind."
          aria-invalid={Boolean(err("message"))}
        />
      </Field>
      {state && !state.ok ? (
        <p className="text-sm text-ember" role="alert">
          {state.message}
        </p>
      ) : null}
      <div>
        <Button type="submit" size="lg" icon="arrowRight" disabled={pending} variant={tone === "dark" ? "primary" : "ink"}>
          {pending ? "Sending…" : "Send enquiry"}
        </Button>
      </div>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="grid grid-cols-1 gap-2">
      <span className="text-xs font-medium tracking-wide opacity-70">{label}</span>
      {children}
      {error ? <span className="text-xs text-ember">{error}</span> : null}
    </label>
  );
}
