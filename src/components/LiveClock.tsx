import { useEffect, useState } from "react";

interface LiveClockProps {
  timeZone: string;
  label?: string;
  className?: string;
}

function getTimeParts(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "00";
  return { hour: get("hour"), minute: get("minute"), second: get("second") };
}

export function LiveClock({ timeZone, label, className = "" }: LiveClockProps) {
  const [time, setTime] = useState(() => getTimeParts(new Date(), timeZone));
  const [tick, setTick] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setTime(getTimeParts(new Date(), timeZone));
      setTick((t) => !t);
    }, 1000);
    return () => clearInterval(id);
  }, [timeZone]);

  return (
    <div
      className={`inline-flex items-center gap-2.5 rounded-2xl border border-white/15 bg-black/55 backdrop-blur-md px-3.5 py-2 shadow-lg shadow-black/40 ${className}`}
    >
      <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-white/10 shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-green" />
        <span className="absolute inset-0 rounded-full bg-green/30 animate-ping" />
      </span>
      <div className="flex flex-col leading-none">
        <span className="font-mono text-sm tabular-nums text-white tracking-wide">
          {time.hour}
          <span className={tick ? "opacity-100" : "opacity-30"}>:</span>
          {time.minute}
          <span className={tick ? "opacity-100" : "opacity-30"}>:</span>
          {time.second}
        </span>
        {label && (
          <span className="text-[9px] uppercase tracking-[0.15em] text-white/50 mt-0.5">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
