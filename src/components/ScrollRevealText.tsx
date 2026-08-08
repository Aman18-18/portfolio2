import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollRevealTextProps {
  children: string;
  className?: string;
  delay?: number;
}

export function ScrollRevealText({
  children,
  className = "",
}: ScrollRevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.45"],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  );

  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.15, 0.6, 1]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ clipPath, opacity }}>{children}</motion.div>
    </div>
  );
}
