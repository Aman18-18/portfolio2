import { useScroll, useSpring } from "framer-motion";
import { motion } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[2px] pointer-events-none">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-fg/60 via-fg to-fg/60 blur-[3px] opacity-70"
        style={{ scaleX }}
      />
      <motion.div
        className="absolute inset-0 h-full origin-left bg-gradient-to-r from-fg/70 via-fg to-fg/70"
        style={{ scaleX }}
      />
    </div>
  );
}
