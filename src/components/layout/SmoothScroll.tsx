"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig } from "motion/react";
import { useEffect, type ReactNode } from "react";
import { useCart } from "@/lib/cart";

export function SmoothScroll({ children }: { children: ReactNode }) {
  // Restore the persisted cart after hydration so server and client markup match.
  useEffect(() => {
    void useCart.persist.rehydrate();
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.11, smoothWheel: true, anchors: true, stopInertiaOnNavigate: true }}>
      {/* Same SSR markup for everyone; reduced-motion users get transforms switched off at runtime. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ReactLenis>
  );
}
