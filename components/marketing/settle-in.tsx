"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * The page's one authored entrance: the hero preview settles from a slight
 * tilt into place. It starts visible, so nothing is hidden if scripts fail.
 */
export function SettleIn({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={className} style={{ perspective: "1800px" }}>
      <motion.div
        initial={reduce ? false : { rotateX: 14, y: 36, scale: 0.97 }}
        animate={{ rotateX: 0, y: 0, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        style={{ transformOrigin: "50% 0%" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
