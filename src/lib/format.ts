const gbp = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });
const gbpExact = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 2 });

/** £13,500 for whole pounds, £12.50 otherwise. */
export function formatPrice(pence: number) {
  return pence % 100 === 0 ? gbp.format(pence / 100) : gbpExact.format(pence / 100);
}

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
