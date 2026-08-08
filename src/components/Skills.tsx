import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { skills } from "../data/portfolio";
import { SectionDivider } from "./SectionDivider";

export function Skills() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.4"],
  });

  return (
    <section id="skills" ref={ref} className="py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-5">
        <SectionDivider className="mb-8" />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <span className="text-xs text-dim uppercase tracking-wider">Stack</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-fg mt-1">
            Skills & Technologies
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="flex flex-wrap gap-2"
        >
          {skills.map((skill, index) => (
            <SkillPill
              key={skill}
              skill={skill}
              index={index}
              progress={scrollYProgress}
              total={skills.length}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SkillPill({
  skill,
  index,
  progress,
  total,
}: {
  skill: string;
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  total: number;
}) {
  const threshold = index / total;
  const opacity = useTransform(progress, (value) => {
    const adjusted = (value - threshold + 0.08) / 0.08;
    return Math.min(1, Math.max(0.2, adjusted));
  });

  const y = useTransform(progress, (value) => {
    const adjusted = (value - threshold + 0.08) / 0.08;
    return Math.max(0, (1 - Math.min(1, adjusted)) * 8);
  });

  return (
    <motion.span
      style={{ opacity, y }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 320, damping: 20 }}
      className="pill text-sm py-1.5 px-3"
    >
      {skill}
    </motion.span>
  );
}
