import { useEffect } from "react";

// Tracks the pointer over any element with .card-spot and exposes its
// position as --mx / --my so the CSS spotlight can follow the cursor.
export function useCardSpotlight() {
  useEffect(() => {
    function onMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      const target = event.target as HTMLElement | null;
      const card = target?.closest?.(".card-spot") as HTMLElement | null;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
}
