"use client";

import { useEffect, useRef } from "react";

// Same palette as the reference plasma effect: ' .:-=+*#%@' light-to-dense.
const PALETTE = " .:-=+*#%@";

const CELL_SIZE = 15;
const MAX_DPR = 2;
const STATIC_TIME = 32; // fixed phase used for the reduced-motion frame

// Full-hue, fairly saturated plasma — a deliberate choice, not a muted accent.
const SATURATION = 10;
const LIGHTNESS_LIGHT = 22; // darker/richer against light paper; washed-out at higher values
const LIGHTNESS_DARK = 62; // lighter against dark paper

// Shapes the density mapping: the raw plasma field spends most of its range near the
// middle. Values below 1 push more of that range toward denser glyphs (fuller coverage).
const DENSITY_BIAS = 0.7;

/** Classic demoscene plasma field: sum of four sines, roughly in [-1, 1]. */
function plasmaValue(x: number, y: number, t: number) {
  return (
    (Math.sin(x * 0.15 + t) +
      Math.sin(y * 0.2 + t * 1.3) +
      Math.sin((x + y) * 0.1 + t * 0.6) +
      Math.sin(Math.sqrt(x * x + y * y) * 0.16 - t * 1.7)) /
    4
  );
}

export function Plasma() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    // Follows the `data-theme` attribute (set by the theme toggle), not system
    // preference directly, so a manual light/dark switch repaints the canvas too.
    const isDarkTheme = () =>
      document.documentElement.getAttribute("data-theme") === "dark";

    // Resolve next/font's generated family name once by reading it back off the element.
    canvas.style.fontFamily = "var(--font-mono)";
    const resolvedFont = getComputedStyle(canvas).fontFamily;

    let lightness = isDarkTheme() ? LIGHTNESS_DARK : LIGHTNESS_LIGHT;

    let cols = 0;
    let rows = 0;
    let cellW = CELL_SIZE;
    let cellH = CELL_SIZE * 1.7;
    let charScaleX = 1;
    let width = 0;
    let height = 0;

    const resize = () => {
      width = Math.max(1, container.clientWidth);
      height = Math.max(1, container.clientHeight);
      const dpr = Math.min(MAX_DPR, window.devicePixelRatio || 1);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.max(10, Math.round(width / CELL_SIZE));
      rows = Math.max(6, Math.round(height / (CELL_SIZE * 1.7)));
      cellW = width / cols;
      cellH = height / rows;

      ctx.font = `${cellH}px ${resolvedFont}`;
      const naturalWidth = ctx.measureText("M").width || cellH * 0.6;
      charScaleX = cellW / naturalWidth;
      ctx.textBaseline = "top";

      draw(reduceMotionQuery.matches ? STATIC_TIME : t);
    };

    let t = STATIC_TIME;
    let rafId = 0;

    function draw(time: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = 0.55;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const value = plasmaValue(col, row, time);
          const norm = (value + 1) / 2;
          const biased = norm ** DENSITY_BIAS;
          const idx = Math.min(
            PALETTE.length - 1,
            Math.floor(biased * PALETTE.length),
          );
          const ch = PALETTE[idx];
          if (ch === " ") continue;

          const hue = (norm * 360 + time * 40) % 360;
          ctx.fillStyle = `hsl(${hue}, ${SATURATION}%, ${lightness}%)`;

          ctx.save();
          ctx.translate(col * cellW, row * cellH);
          ctx.scale(charScaleX, 1);
          ctx.fillText(ch, 0, 0);
          ctx.restore();
        }
      }
    }

    const loop = () => {
      if (reduceMotionQuery.matches || document.hidden) return;
      draw(t);
      t += 0.02;
      rafId = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(rafId);
      if (reduceMotionQuery.matches) {
        draw(STATIC_TIME);
      } else {
        rafId = requestAnimationFrame(loop);
      }
    };

    resize();
    start();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const handleVisibilityChange = () => {
      if (!document.hidden) start();
    };
    const handleMotionChange = () => start();
    const handleThemeChange = () => {
      lightness = isDarkTheme() ? LIGHTNESS_DARK : LIGHTNESS_LIGHT;
      draw(reduceMotionQuery.matches ? STATIC_TIME : t);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    reduceMotionQuery.addEventListener("change", handleMotionChange);
    const themeObserver = new MutationObserver(handleThemeChange);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reduceMotionQuery.removeEventListener("change", handleMotionChange);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0" aria-hidden="true">
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}
