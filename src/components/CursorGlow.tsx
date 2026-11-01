import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const springX = useSpring(x, { stiffness: 110, damping: 22, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 110, damping: 22, mass: 0.4 });

  useEffect(() => {
    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (!isFine) return;
    setEnabled(true);

    function handleMove(event: PointerEvent) {
      x.set(event.clientX);
      y.set(event.clientY);
    }

    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[3] pointer-events-none rounded-full"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        width: 480,
        height: 480,
        background: "radial-gradient(circle, var(--cursor-glow), transparent 70%)",
        filter: "blur(6px)",
      }}
    />
  );
}
