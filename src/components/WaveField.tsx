"use client";

import { useEffect, useRef } from "react";

/**
 * The hero's animated backdrop.
 *
 * The reference design uses a pre-rendered mp4 of a flowing particle mesh.
 * That file is theirs, so this draws an equivalent surface in a canvas
 * instead: a perspective grid of points displaced by two summed sine waves,
 * which reads as the same slow, dark, undulating field without shipping
 * anyone else's asset. It is also about 2KB of code rather than a multi-
 * megabyte video, so the hero has no download cost at all.
 *
 * Cheap on purpose: points only, no line joins, no shadows, no per-frame
 * allocation. Redraws are throttled to ~30fps because the motion is slow
 * enough that 60 buys nothing visible.
 */
export function WaveField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    // Respect the OS setting: render one static frame and stop.
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Grid resolution. Columns scale with width so the mesh keeps roughly
    // square cells on any viewport; rows are fixed since the hero's height
    // varies far less than its width.
    const ROWS = 34;
    let cols = 60;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.max(28, Math.min(96, Math.round(width / 22)));
    }

    function draw(t: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // The mesh occupies the lower two thirds and recedes toward a horizon,
      // so the hero text sits over the calm upper area.
      const horizon = height * 0.3;

      for (let r = 0; r < ROWS; r++) {
        // Non-linear row spacing produces the perspective compression.
        const rowT = r / (ROWS - 1);
        const depth = rowT * rowT;
        const y = horizon + depth * (height - horizon) * 1.15;
        if (y > height + 40) continue;

        // Near rows are brighter and wider; far rows fade into the ground.
        const fade = 0.12 + rowT * 0.88;
        const size = 0.6 + rowT * 1.7;

        for (let c = 0; c <= cols; c++) {
          const colT = c / cols;

          // Spread columns outward as they come forward, which is what makes
          // it read as a receding plane rather than a flat grid.
          const spread = 0.55 + rowT * 0.85;
          const x = width / 2 + (colT - 0.5) * width * spread;
          if (x < -20 || x > width + 20) continue;

          // Two waves at different frequencies and speeds, summed. The second
          // is deliberately not a harmonic of the first so the surface never
          // visibly repeats.
          const w1 = Math.sin(colT * 7.5 + rowT * 3.1 + t * 0.00034);
          const w2 = Math.sin(colT * 3.1 - rowT * 5.4 + t * 0.00021);
          const lift = (w1 * 0.6 + w2 * 0.4) * (10 + rowT * 46);

          // Crests catch more light than troughs.
          const crest = (w1 * 0.6 + w2 * 0.4 + 1) / 2;
          const alpha = fade * (0.18 + crest * 0.62);

          ctx.fillStyle = `rgba(176, 214, 228, ${alpha.toFixed(3)})`;
          ctx.fillRect(x, y - lift, size, size);
        }
      }
    }

    function loop(now: number) {
      draw(now);
      raf = window.setTimeout(
        () => (raf = requestAnimationFrame(loop)),
        33,
      ) as unknown as number;
    }

    const onResize = () => {
      resize();
      if (reduce) draw(0);
    };

    resize();

    if (reduce) {
      draw(0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      clearTimeout(raf);
    };
  }, []);

  return <canvas ref={ref} className="wave" aria-hidden="true" />;
}
