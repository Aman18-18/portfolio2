import { motion } from "framer-motion";
import { profile, techStack } from "../data/portfolio";
import { Magnetic } from "./Magnetic";
import { HeroBanner } from "./HeroBanner";

export function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] grid-bg pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-5">
        <HeroBanner />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-sm md:text-base text-muted leading-relaxed max-w-xl mx-auto mb-3">
            I build interactive web apps using{" "}
            {techStack.slice(0, 6).map((tech, index) => (
              <span key={tech}>
                <span className="pill mx-0.5 align-middle">{tech}</span>
                {index < 5 ? " " : ""}
              </span>
            ))}
            . {profile.tagline.split(".")[0]}.
          </p>

          <div className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse shrink-0" />
            <span className="text-xs text-dim">{profile.availability}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card glow-border rounded-2xl p-6 md:p-8 mb-8 text-left"
        >
          <p className="text-sm text-muted leading-relaxed mb-4">
            <span className="highlight-sentence">
              Engineer / Builder. I love building, breaking, and shipping things.
            </span>
          </p>
          <ul className="space-y-2">
            {profile.bio.map((line) => (
              <li key={line} className="text-sm text-muted flex gap-2">
                <span className="text-dim shrink-0">&bull;</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-8"
        >
          <Magnetic strength={0.4}>
            <motion.a
              href={profile.resumeUrl}
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 text-sm text-fg hover:bg-white/5 hover:border-white/25 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              Resume / CV
            </motion.a>
          </Magnetic>
          <Magnetic strength={0.4}>
            <motion.a
              href="#contact"
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-fg text-bg text-sm font-medium overflow-hidden group"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-black/10 to-transparent" />
              <span className="relative">Get in touch</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="relative"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </motion.a>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {Object.entries(profile.social).map(([key, href]) => (
            <Magnetic key={key} strength={0.3}>
              <motion.a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="pill capitalize hover:text-fg"
              >
                {key}
              </motion.a>
            </Magnetic>
          ))}
          <Magnetic strength={0.3}>
            <motion.a
              href={`mailto:${profile.email}`}
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="pill hover:text-fg"
            >
              Email
            </motion.a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
