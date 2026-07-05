"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section the user is currently reading.
 * Used by the navbar to highlight the active anchor link.
 */
export function useScrollSpy(sectionIds: string[], offsetTop = 120) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onScroll = () => {
      const scrollY = window.scrollY + offsetTop;
      let current: string | null = null;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= scrollY) {
          current = id;
        }
      }
      setActiveId(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionIds, offsetTop]);

  return activeId;
}