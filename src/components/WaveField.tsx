"use client";

import { useEffect, useRef } from "react";

/**
 * The hero backdrop: a dense 3D point-cloud terrain in perspective.
 *
 * The reference ships this as a pre-rendered mp4, which is theirs, so this
 * reconstructs the same effect in a canvas. What the effect actually is:
 * tens of thousands of tiny points laid out on a ground plane, displaced
 * vertically by a summed-sine height field, projected through a perspective
 * camera and drawn brightest along the ridge crests. The field scrolls toward
 * the viewer, so the dunes appear to roll forward.
 *
 * Earlier attempts here drew flat 2D sine LINES, which is a different effect
 * entirely and read as wallpaper stripes. The three things that make it look
 * like terrain rather than stripes are all present now: perspective division
 * (near rows spread wide and sparse, far rows compress toward the horizon),
 * brightness driven by surface slope rather than depth alone, and enough point
 * density that the surface reads as continuous shading.
 *
 * Performance: points are written straight into an ImageData buffer rather
 * than issuing tens of thousands of fillRect calls, which is roughly an order
 * of magnitude cheaper and keeps this comfortable at 30fps. Nothing is
 * allocated inside the frame loop.
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

    let W = 0;
    let H = 0;
    let img: ImageData | null = null;
    let buf: Uint32Array | null = null;
    let timer = 0;
    let t = 0;

    /** Depth slices from near to far. */
    const ROWS = 190;
    /** Points across each slice. */
    const COLS = 230;

    /** Camera. Small values push the horizon up and exaggerate the recession. */
    const NEAR = 0.55;
    const FAR = 9.5;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      // Cap at 1x: this is a soft, dense texture, so a 2x buffer quadruples
      // the fill cost for no visible gain.
      W = Math.max(1, Math.floor(rect.width));
      H = Math.max(1, Math.floor(rect.height));
      canvas.width = W;
      canvas.height = H;
      img = ctx!.createImageData(W, H);
      buf = new Uint32Array(img.data.buffer);
    }

    /** Terrain height at a point, as a sum of non-harmonic waves. */
    function heightAt(x: number, z: number, time: number) {
      return (
        Math.sin(x * 1.15 + z * 0.55 + time * 0.00021) * 0.52 +
        Math.sin(x * 0.47 - z * 0.93 + time * 0.00013) * 0.34 +
        Math.sin(x * 2.35 + z * 1.7 - time * 0.00029) * 0.14
      );
    }

    function draw(time: number) {
      if (!ctx || !img || !buf) return;
      buf.fill(0);

      const horizon = H * 0.06;
      const focal = H * 1.15;
      const cx = W * 0.5;

      for (let r = 0; r < ROWS; r++) {
        // Depth spaced quadratically so near slices get more of the budget.
        const rt = r / (ROWS - 1);
        const z = NEAR + rt * rt * (FAR - NEAR);

        const inv = 1 / z;
        const rowY = horizon + focal * inv * 0.98;
        if (rowY < -8 || rowY > H + 8) continue;

        // Near slices are brighter and their points sit further apart.
        const depthFade = 0.38 + Math.pow(rt, 0.85) * 0.62;

        for (let c = 0; c < COLS; c++) {
          const ct = c / (COLS - 1);

          // World x spans wider than the screen so the near rows run off the
          // sides rather than ending in a visible edge.
          const wx = (ct - 0.5) * 15;
          const sx = cx + wx * focal * inv * 0.5;
          if (sx < 0 || sx >= W) continue;

          const h = heightAt(wx, z, time);

          // Vertical displacement also divides by depth, which is what makes
          // distant dunes flatten out.
          const sy = rowY - h * focal * inv * 0.3;
          if (sy < 0 || sy >= H) continue;

          // Slope along x: crests facing the light read brighter than troughs.
          const hNext = heightAt(wx + 0.07, z, time);
          const slope = (hNext - h) * 22;
          const lit = Math.max(0, Math.min(1, 0.3 + slope));

          let a = depthFade * (0.16 + lit * 1.35);
          if (a <= 0.004) continue;
          if (a > 1) a = 1;

          const px = (sy | 0) * W + (sx | 0);
          const alpha = (a * 255) | 0;

          // Cool blue-white, matching the reference's palette. ABGR order,
          // which is what a little-endian Uint32 view of RGBA expects.
          const prev = buf[px] >>> 24;
          const next = prev + alpha > 255 ? 255 : prev + alpha;
          buf[px] = (next << 24) | (222 << 16) | (208 << 8) | 176;
        }
      }

      ctx.putImageData(img, 0, 0);
    }

    function loop() {
      t += 33;
      draw(t);
      timer = window.setTimeout(loop, 33);
    }

    const onResize = () => {
      resize();
      draw(t);
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
