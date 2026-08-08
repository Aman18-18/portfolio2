import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";

interface ScrollRevealWordsProps {
  text: string;
  className?: string;
  stagger?: number;
}

export function ScrollRevealWords({
  text,
  className = "",
  stagger = 0.04,
}: ScrollRevealWordsProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.4"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
  });

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word
          key={`${word}-${i}`}
          word={word}
          index={i}
          total={words.length}
          progress={smoothProgress}
          stagger={stagger}
        />
      ))}
    </p>
  );
}

function Word({
  word,
  index,
  total,
  progress,
  stagger,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  stagger: number;
}) {
  const threshold = index / total;
  const opacity = useTransform(progress, (v) => {
    const adjusted = (v - threshold + stagger) / stagger;
    return Math.min(1, Math.max(0.12, adjusted));
  });

  const y = useTransform(progress, (v) => {
    const adjusted = (v - threshold + stagger) / stagger;
    const clamped = Math.min(1, Math.max(0, adjusted));
    return (1 - clamped) * 12;
  });

  return (
    <motion.span
      style={{ opacity, y }}
      className="inline-block mr-[0.28em] will-change-transform"
    >
      {word}
    </motion.span>
  );
}
