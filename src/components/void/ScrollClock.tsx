"use client";

import { useEffect } from "react";

// Publishes the scroll position as a CSS variable so rear planes can ride
// their depth without per-element listeners.
export function ScrollClock() {
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    const update = () => {
      root.style.setProperty("--sy", String(window.scrollY));
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
