import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "../data/portfolio";

const NAME = `${profile.name} ${profile.surname}`;

function shouldShowIntro() {
  if (typeof window === "undefined") return false;
  return !sessionStorage.getItem("intro-seen");
}

export function PageIntro() {
  const [show, setShow] = useState(shouldShowIntro);

  useEffect(() => {
    if (!show) return;

    sessionStorage.setItem("intro-seen", "1");
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setShow(false);
    }, 1900);

    return () => clearTimeout(timer);
  }, [show]);

  useEffect(() => {
    if (!show) {
      document.body.style.overflow = "";
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[300] bg-bg flex items-center justify-center"
        >
          <div className="flex overflow-hidden">
            {NAME.split("").map((letter, i) => (
              <motion.span
                key={`${letter}-${i}`}
                initial={{ y: "115%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.6,
                  delay: 0.12 + i * 0.035,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-3xl md:text-4xl font-semibold text-fg inline-block"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
