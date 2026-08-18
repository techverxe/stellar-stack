"use client";

import { useEffect, useRef } from "react";

/**
 * The hero's animated backdrop.
 *
 * The reference uses a pre-rendered mp4 of a flowing line mesh, 1440x1240 and
 * object-fit: cover, so it overflows the hero rather than fitting it. This
 * draws the equivalent surface in a canvas instead, since that file is theirs.
 *
 * An earlier version of this plotted isolated dots on a coarse grid and was
 * effectively invisible: measured at 33 lit pixels across a 1440px row. This
 * one draws continuous polylines at a much finer step, which is what makes it
 * read as a wave field rather than noise.
 *
 * Cost control: lines are stroked once per row with no per-point state
 * changes, the whole field redraws at ~30fps, and nothing is allocated inside
 * the loop.
 */
export function WaveField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let frame = 0;
    let timer = 0;
    let width = 0;
    let height = 0;

    /** Rows of the mesh, front to back. */
    const ROWS = 46;
    /** Horizontal sample step in px. Smaller means smoother curves. */
    const STEP = 9;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(t: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;

      // The field starts below the headline and recedes toward the bottom
      // right, leaving the upper left calm for the type.
      const horizon = height * 0.16;

      for (let r = 0; r < ROWS; r++) {
        const rowT = r / (ROWS - 1);

        // Squared spacing compresses the far rows and opens up the near ones,
        // which is what gives the plane its depth.
        const y0 = horizon + rowT * rowT * (height - horizon) * 1.08;
        if (y0 > height + 60) continue;

        // Near rows are brighter; far rows sink into the ground colour.
        const alpha = 0.05 + rowT * 0.3;
        ctx.strokeStyle = `rgba(168, 208, 224, ${alpha.toFixed(3)})`;

        ctx.beginPath();
        let started = false;

        for (let x = -40; x <= width + 40; x += STEP) {
          const colT = x / width;

          // Two non-harmonic waves so the surface never visibly repeats.
          const w1 = Math.sin(colT * 6.2 + rowT * 2.6 + t * 0.0004);
          const w2 = Math.sin(colT * 2.7 - rowT * 4.8 + t * 0.00026);

          // Amplitude grows toward the viewer.
          const amp = 8 + rowT * 54;
          const y = y0 - (w1 * 0.62 + w2 * 0.38) * amp;

          if (!started) {
            ctx.moveTo(x, y);
            started = true;
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }
    }

    function loop() {
      frame += 33;
      draw(frame);
      timer = window.setTimeout(loop, 33);
    }

    const onResize = () => {
      resize();
      draw(frame);
    };

    resize();
    draw(0);
    if (!reduce) loop();

    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(timer);
    };
  }, []);

  return <canvas ref={ref} className="wave" aria-hidden="true" />;
}
