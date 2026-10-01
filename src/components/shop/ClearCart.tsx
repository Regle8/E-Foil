"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/cart";

/** Empties the bag once the persisted cart has loaded (used after a successful order). */
export function ClearCart() {
  useEffect(() => {
    const clear = () => useCart.getState().clear();
    if (useCart.persist.hasHydrated()) clear();
    return useCart.persist.onFinishHydration(clear);
  }, []);
  return null;
}
