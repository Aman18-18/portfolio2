import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile, quote } from "../data/portfolio";
import { ScrollTypewriter } from "./ScrollTypewriter";
import { SectionDivider } from "./SectionDivider";
import { Magnetic } from "./Magnetic";

export function Contact() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.3"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.4, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <section id="contact" ref={ref} className="py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-5">
        <SectionDivider className="mb-8" />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <span className="text-xs text-dim uppercase tracking-wider">Connect</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-fg mt-1">Contact</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          style={{ opacity, y }}
          className="card card-spot glow-border rounded-2xl p-8 md:p-10 text-center mb-16"
        >
          <p className="text-lg md:text-xl text-fg font-medium mb-2">
            Hey, you scrolled this far - let&apos;s talk.
          </p>
          <p className="text-sm text-muted mb-6">{profile.availability}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Magnetic strength={0.35}>
              <motion.a
                href={`mailto:${profile.email}`}
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-fg text-bg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Send an email
              </motion.a>
            </Magnetic>
            <Magnetic strength={0.35}>
              <motion.a
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-sm text-fg hover:bg-white/5 hover:border-white/25 transition-colors"
              >
                LinkedIn
              </motion.a>
            </Magnetic>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="text-center mb-12 px-4"
        >
          <ScrollTypewriter
            text={quote.text}
            as="p"
            className="text-sm md:text-base text-muted italic leading-relaxed max-w-xl mx-auto"
            speed={1.4}
            showCursor={false}
            triggerMargin="0px 0px -32% 0px"
          />
          <p className="text-xs text-dim mt-4">- {quote.author}</p>
        </motion.div>

        <footer className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 border-t border-white/[0.04] text-xs text-dim">
          <p>
            Designed & Developed by {profile.name} &copy; {new Date().getFullYear()}. All rights
            reserved.
          </p>
          <p className="text-dim">{profile.location}</p>
        </footer>
      </div>
    </section>
  );
}
