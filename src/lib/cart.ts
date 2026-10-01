"use client";

import { useSyncExternalStore } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Category } from "./types";

export type CartLine = {
  key: string;
  slug: string;
  name: string;
  category: Category;
  image: string | null;
  variant: string | null;
  variantLabel: string | null;
  unitPence: number;
  qty: number;
};

type CartState = {
  lines: CartLine[];
  open: boolean;
  add: (line: Omit<CartLine, "key" | "qty">, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
};

const MAX_QTY = 10;

// Prices here are for display only: the server re-prices every line from the catalogue at checkout.
export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      open: false,
      add: (line, qty = 1) =>
        set((state) => {
          const key = `${line.slug}::${line.variant ?? ""}`;
          const existing = state.lines.find((l) => l.key === key);
          const lines = existing
            ? state.lines.map((l) => (l.key === key ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l))
            : [...state.lines, { ...line, key, qty: Math.min(MAX_QTY, qty) }];
          return { lines, open: true };
        }),
      setQty: (key, qty) =>
        set((state) => ({
          lines: state.lines.map((l) => (l.key === key ? { ...l, qty: Math.max(1, Math.min(MAX_QTY, qty)) } : l)),
        })),
      remove: (key) => set((state) => ({ lines: state.lines.filter((l) => l.key !== key) })),
      clear: () => set({ lines: [] }),
      setOpen: (open) => set({ open }),
    }),
    {
      name: "efoil-london-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ lines: state.lines }),
      skipHydration: true,
    }
  )
);

export const cartCount = (lines: CartLine[]) => lines.reduce((n, l) => n + l.qty, 0);
export const cartSubtotal = (lines: CartLine[]) => lines.reduce((n, l) => n + l.qty * l.unitPence, 0);

/** True once the persisted cart has been restored from localStorage (always false during SSR). */
export function useCartHydrated() {
  return useSyncExternalStore(
    (onChange) => useCart.persist.onFinishHydration(onChange),
    () => useCart.persist.hasHydrated(),
    () => false
  );
}
