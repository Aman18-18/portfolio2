import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import { projects } from "../data/portfolio";
import { SectionDivider } from "./SectionDivider";

function ProjectStatus({ status }: { status: "Live" | "Building" }) {
  const isLive = status === "Live";

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${
        isLive ? "text-green" : "text-yellow"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isLive ? "bg-green" : "bg-yellow animate-pulse"
        }`}
      />
      {isLive ? "All Systems Operational" : "Building"}
    </span>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-20 md:py-28">
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
          <h2 className="text-2xl md:text-3xl font-semibold text-fg mt-1">Projects</h2>
        </motion.div>

        <div className="space-y-5">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.5"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [32, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
  const rotateX = useSpring(rotateXRaw, { stiffness: 180, damping: 18 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 180, damping: 18 });

  const spotlight = useMotionTemplate`radial-gradient(240px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.14), transparent 70%)`;
  const frameGlow = useMotionTemplate`radial-gradient(180px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.08), transparent 65%)`;

  function handlePointerMove(event: ReactPointerEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const localX = event.clientX - bounds.left;
    const localY = event.clientY - bounds.top;
    const percentX = localX / bounds.width - 0.5;
    const percentY = localY / bounds.height - 0.5;

    mouseX.set(localX);
    mouseY.set(localY);
    rotateXRaw.set(percentY * -7);
    rotateYRaw.set(percentX * 7);
  }

  function handleHoverEnd() {
    setIsHovered(false);
    rotateXRaw.set(0);
    rotateYRaw.set(0);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      style={{ y, opacity }}
    >
      <motion.article
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={handleHoverEnd}
        onPointerMove={handlePointerMove}
        whileHover={{
          scale: 1.015,
          boxShadow: "0 24px 70px rgba(0, 0, 0, 0.45)",
        }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1200,
        }}
        className="card glow-border relative rounded-2xl overflow-hidden group will-change-transform"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 z-10"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.28 }}
          style={{ background: spotlight }}
        />

        <motion.div
          className="pointer-events-none absolute inset-px z-10 rounded-[calc(1rem-1px)]"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.28 }}
          style={{ background: frameGlow }}
        />

        <div className="relative z-20 aspect-[16/7] bg-gradient-to-br from-white/[0.04] to-transparent border-b border-white/[0.06] flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.06), transparent 60%)",
            }}
          />

          <motion.div
            className="absolute inset-0 opacity-0"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background:
                "linear-gradient(130deg, rgba(255,255,255,0.02), rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
            }}
          />

          <motion.div
            className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/12 to-transparent skew-x-[-24deg]"
            animate={isHovered ? { x: ["0%", "260%"] } : { x: "0%" }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.span
            animate={{ scale: isHovered ? 1.08 : 1, opacity: isHovered ? 0.12 : 0.04 }}
            transition={{ duration: 0.35 }}
            className="text-6xl font-bold text-white/[0.04]"
          >
            {String(index + 1).padStart(2, "0")}
          </motion.span>
        </div>

        <div className="relative z-20 p-5 md:p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-dim">
                <span>{project.category}</span>
                <span className="text-white/20">/</span>
                <span>{project.year}</span>
              </div>
              <h3 className="text-lg font-semibold text-fg mt-1 group-hover:underline decoration-white/20 underline-offset-4">
                {project.title}
              </h3>
            </div>
            <ProjectStatus status={project.status} />
          </div>

          <p className="text-sm text-muted leading-relaxed mb-4">{project.description}</p>

          <p className="text-xs text-dim uppercase tracking-wider mb-2">Technologies</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech) => (
              <span key={tech} className="pill">
                {tech}
              </span>
            ))}
          </div>

          <a
            href={project.link}
            className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-fg transition-colors"
          >
            View Details
            <motion.span
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.22 }}
              aria-hidden="true"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </motion.span>
          </a>
        </div>
      </motion.article>
    </motion.div>
  );
}
