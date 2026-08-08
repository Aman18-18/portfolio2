import { motion } from "framer-motion";

interface SectionDividerProps {
  className?: string;
}

export function SectionDivider({ className = "" }: SectionDividerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0.35 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`origin-left ${className}`}
    >
      <div className="dotted-divider" aria-hidden="true" />
    </motion.div>
  );
}
