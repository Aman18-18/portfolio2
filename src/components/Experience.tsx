import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { experience } from "../data/portfolio";
import { ScrollTypewriter } from "./ScrollTypewriter";
import { SectionDivider } from "./SectionDivider";

function StatusBadge({ status }: { status: "Working" | "Completed" }) {
  const isWorking = status === "Working";

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium ${
        isWorking
          ? "bg-green/10 text-green border border-green/20"
          : "bg-white/5 text-dim border border-white/10"
      }`}
    >
      {isWorking && <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />}
      {status}
    </span>
  );
}

export function Experience() {
  const [expanded, setExpanded] = useState<string | null>(experience[0]?.id ?? null);
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? experience : experience.slice(0, 2);

  return (
    <section id="experience" className="py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-5">
        <SectionDivider className="mb-8" />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <span className="text-xs text-dim uppercase tracking-wider">Featured</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-fg mt-1">Experience</h2>
        </motion.div>

        <div className="space-y-4">
          {visible.map((item, index) => {
            const isOpen = expanded === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -2 }}
                className="card card-spot glow-border group rounded-2xl overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : item.id)}
                  className="w-full text-left p-5 md:p-6 flex items-start gap-4 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-sm font-semibold text-muted transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:border-white/25 group-hover:text-fg">
                    {item.company.charAt(0)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-base font-semibold text-fg">{item.company}</h3>
                      <StatusBadge status={item.status} />
                    </div>
                    <p className="text-sm text-muted">{item.role}</p>
                  </div>

                  <div className="text-right shrink-0 hidden sm:block">
                    <p className="text-xs text-muted">{item.period}</p>
                    <p className="text-xs text-dim mt-0.5">{item.location}</p>
                  </div>

                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-dim shrink-0 mt-1"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-6 pb-6 pt-0 border-t border-white/[0.04]">
                        <div className="sm:hidden mb-4 pt-4">
                          <p className="text-xs text-muted">{item.period}</p>
                          <p className="text-xs text-dim">{item.location}</p>
                        </div>

                        <p className="text-xs text-dim uppercase tracking-wider mb-3 mt-4">
                          Technologies
                        </p>
                        <div className="flex flex-wrap gap-2 mb-5">
                          {item.tech.map((tech) => (
                            <span key={tech} className="pill">
                              {tech}
                            </span>
                          ))}
                        </div>

                        <ul className="space-y-3">
                          {item.bullets.map((bullet, bulletIndex) => (
                            <li key={bullet} className="flex gap-2 text-sm text-muted">
                              <span className="text-dim shrink-0">&bull;</span>
                              {bulletIndex === 0 ? (
                                <ScrollTypewriter
                                  text={bullet}
                                  as="span"
                                  className="leading-relaxed"
                                  speed={1.35}
                                  showCursor
                                  triggerMargin="0px 0px -28% 0px"
                                />
                              ) : (
                                <span className="leading-relaxed">{bullet}</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {experience.length > 2 && (
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="mt-6 w-full py-3 rounded-xl border border-dashed border-white/10 text-sm text-muted hover:text-fg hover:border-white/20 transition-colors"
          >
            {showAll ? "Show less" : "Show all work experiences"}
          </button>
        )}
      </div>
    </section>
  );
}
