"use client";

import { useEffect, useRef } from "react";

// Three fields of grey dust behind everything, drifting on one clock: the
// rearmost at the base rate, each layer forward at half that. Scroll moves
// them at their depth. Still under reduced motion; never over the content.
export function Dust() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    type Mote = { x: number; y: number; r: number; layer: number; a: number; vx: number; vy: number };
    let motes: Mote[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;

    const layerAlpha = [0.18, 0.3, 0.46];
    const layerRate = [1, 0.5, 0.25];
    const layerParallax = [0.02, 0.06, 0.12];

    function seed() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((w * h) / 9000);
      motes = Array.from({ length: count }, () => {
        const layer = Math.random() < 0.5 ? 0 : Math.random() < 0.6 ? 1 : 2;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.6 + layer * 0.5 + Math.random() * 0.8,
          layer,
          a: layerAlpha[layer] * (0.6 + Math.random() * 0.6),
          vx: (0.08 + Math.random() * 0.1) * layerRate[layer],
          vy: (-0.04 - Math.random() * 0.06) * layerRate[layer],
        };
      });
    }

    function draw() {
      const sy = window.scrollY;
      ctx!.clearRect(0, 0, w, h);
      for (const m of motes) {
        if (!reduce) {
          m.x += m.vx;
          m.y += m.vy;
          if (m.x > w + 4) m.x = -4;
          if (m.y < -4) m.y = h + 4;
        }
        const y = (((m.y - sy * layerParallax[m.layer]) % h) + h) % h;
        ctx!.beginPath();
        ctx!.arc(m.x, y, m.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(231, 242, 241, ${m.a})`;
        ctx!.fill();
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    }

    seed();
    draw();
    const onResize = () => {
      seed();
      if (reduce) draw();
    };
    const onScroll = () => {
      if (reduce) draw();
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
