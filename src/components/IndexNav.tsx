import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { indexLinks } from "../data/portfolio";

export function IndexNav() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = indexLinks.map((l) => l.href.slice(1));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:block">
      <p className="text-[10px] tracking-[0.2em] uppercase text-dim mb-4 font-mono">
        Index
      </p>
      <ul className="space-y-2">
        {indexLinks.map((link) => {
          const id = link.href.slice(1);
          const isActive = active === id;
          return (
            <li key={link.href} className="flex items-center gap-2">
              <motion.span
                aria-hidden="true"
                className="w-1 h-1 rounded-full bg-fg shrink-0"
                animate={{
                  scale: isActive ? 1 : 0,
                  opacity: isActive ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 26 }}
              />
              <a
                href={link.href}
                className={`block text-xs transition-colors duration-300 ${
                  isActive ? "text-fg" : "text-dim hover:text-muted"
                }`}
              >
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
