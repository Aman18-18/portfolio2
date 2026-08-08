import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";

type InViewOptions = NonNullable<Parameters<typeof useInView>[1]>;

interface ScrollTypewriterProps {
  text: string;
  className?: string;
  speed?: number;
  showCursor?: boolean;
  as?: "p" | "h1" | "h2" | "h3" | "span" | "div";
  triggerMargin?: InViewOptions["margin"];
}

export function ScrollTypewriter({
  text,
  className = "",
  speed = 1,
  showCursor = true,
  as: Tag = "p",
  triggerMargin = "0px 0px -24% 0px",
}: ScrollTypewriterProps) {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, {
    once: true,
    margin: triggerMargin,
  });

  const revealProgress = useMotionValue(0);
  const visibleCount = useTransform(revealProgress, (value) =>
    Math.min(text.length, Math.round(value))
  );

  useEffect(() => {
    if (!isInView) {
      return;
    }

    if (shouldReduceMotion) {
      revealProgress.set(text.length);
      return;
    }

    const duration = Math.min(0.9, Math.max(0.35, text.length / (90 * speed)));
    const controls = animate(revealProgress, text.length, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });

    return () => controls.stop();
  }, [isInView, revealProgress, shouldReduceMotion, speed, text.length]);

  const cursorOpacity = useTransform(visibleCount, (value) =>
    value < text.length ? 1 : 0
  );

  return (
    <Tag ref={ref as never} className={`relative ${className}`}>
      <span aria-label={text}>
        {text.split("").map((char, index) => (
          <Char key={`${char}-${index}`} char={char} index={index} visibleCount={visibleCount} />
        ))}
      </span>
      {showCursor && (
        <motion.span
          className="inline-block w-[2px] h-[0.85em] bg-fg/70 ml-0.5 align-middle animate-pulse"
          style={{ opacity: cursorOpacity }}
        />
      )}
    </Tag>
  );
}

function Char({
  char,
  index,
  visibleCount,
}: {
  char: string;
  index: number;
  visibleCount: MotionValue<number>;
}) {
  const opacity = useTransform(visibleCount, (value) => (index < value ? 1 : 0));

  return (
    <motion.span style={{ opacity }} className="inline">
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}
