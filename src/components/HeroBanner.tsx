import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { profile } from "../data/portfolio";
import { Avatar } from "./Avatar";
import { LiveClock } from "./LiveClock";

const PETALS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: Math.round((Math.sin(i * 17.3) * 0.5 + 0.5) * 94) + 2,
  size: 3 + (i % 4),
  duration: 9 + (i % 6) * 2,
  delay: (i % 7) * 1.3,
  driftX: `${(i % 2 === 0 ? 1 : -1) * (20 + (i % 5) * 10)}px`,
}));

export function HeroBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative mb-16 md:mb-20"
    >
      {/* banner art — full image visible, no crop, with subtle live motion */}
      <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10">
        <div className="absolute inset-0 banner-kenburns">
          <img
            src="/hero-banner.jpg"
            alt=""
            className="hero-banner-img w-full h-full object-cover"
          />
        </div>

        {/* drifting petals for a living, ambient feel */}
        {PETALS.map((petal) => (
          <span
            key={petal.id}
            aria-hidden="true"
            className="petal-drift absolute top-0 rounded-full bg-red-400/70"
            style={
              {
                left: `${petal.left}%`,
                width: petal.size,
                height: petal.size,
                animationDuration: `${petal.duration}s`,
                animationDelay: `${petal.delay}s`,
                "--drift-x": petal.driftX,
              } as CSSProperties
            }
          />
        ))}

        {/* cinematic vignette — moody edges, and sinks the corner into shadow (dials back automatically in light mode) */}
        <div className="hero-banner-fade absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/25" />
        <div
          className="hero-banner-vignette absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 55% at 90% 92%, rgba(0,0,0,0.85), transparent 60%)",
          }}
        />

        <div className="absolute bottom-4 right-4">
          <LiveClock timeZone="Asia/Kolkata" />
        </div>
      </div>

      {/* avatar + name overlapping the bottom-left edge of the banner */}
      <div className="relative -mt-10 md:-mt-12 px-2 flex items-end gap-4 z-10">
        <motion.div
          whileHover={{ scale: 1.04, rotate: -1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border-4 border-bg shadow-2xl shadow-black/60 shrink-0 bg-bg"
        >
          <Avatar />
        </motion.div>
        <div className="pb-1">
          <h1
            className="glitch-text text-2xl md:text-3xl font-bold text-fg leading-none"
            data-text={`${profile.name} ${profile.surname}`}
          >
            {profile.name} {profile.surname}
          </h1>
          <p className="text-xs md:text-sm text-dim mt-1.5">{profile.title}</p>
        </div>
      </div>
    </motion.div>
  );
}
