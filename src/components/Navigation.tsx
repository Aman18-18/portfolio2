import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "../data/portfolio";
import { Avatar } from "./Avatar";
import { Magnetic } from "./Magnetic";
import { ThemeToggle } from "./ThemeToggle";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((l) => l.href.slice(1));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{
          y: scrolled ? 2 : 0,
          opacity: scrolled ? 0.96 : 1,
          boxShadow: scrolled ? "0 10px 30px rgba(0,0,0,0.2)" : "0 0 0 rgba(0,0,0,0)"
        }}
        transition={{ duration: 0.35 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-bg/80 backdrop-blur-xl border-b border-border"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-3xl mx-auto px-5 h-14 flex items-center justify-between">
          <Magnetic strength={0.35}>
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-7 h-7 rounded-lg overflow-hidden border border-white/10 group-hover:border-white/20 transition-colors">
                <Avatar />
              </div>
            </a>
          </Magnetic>

          <ul className="hidden sm:flex items-center gap-6">
            {navLinks.map((link) => {
              const id = link.href.slice(1);
              const isActive = active === id;
              return (
                <li key={link.href} className="relative py-1">
                  <a
                    href={link.href}
                    className={`text-sm transition-colors ${
                      isActive ? "text-fg" : "text-muted hover:text-fg"
                    }`}
                  >
                    {link.label}
                  </a>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-underline"
                      className="absolute -bottom-0.5 left-0 right-0 h-px bg-fg"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden flex flex-col gap-1 p-2"
          >
            <span
              className={`block w-5 h-px bg-fg transition-transform ${
                menuOpen ? "rotate-45 translate-y-[3px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-px bg-fg transition-opacity ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-px bg-fg transition-transform ${
                menuOpen ? "-rotate-45 -translate-y-[3px]" : ""
              }`}
            />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl sm:hidden flex items-center justify-center"
          >
            <ul className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-2xl text-fg hover:text-muted transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
