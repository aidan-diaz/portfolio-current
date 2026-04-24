import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

type SectionTransitionProps = {
  children: ReactNode;
  /** Optional delay so sequential sections can stagger. */
  delay?: number;
};

/**
 * Wrapper that fades + slides each top-level section into view as it
 * scrolls past the viewport threshold. No-ops when the user prefers
 * reduced motion (children render plain).
 *
 * `whileInView` only fires once per section so re-entering doesn't re-animate
 * (avoids motion fatigue on long pages).
 */
export function SectionTransition({
  children,
  delay = 0,
}: SectionTransitionProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.42,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
