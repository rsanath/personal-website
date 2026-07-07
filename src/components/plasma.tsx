"use client";

import { useEffect, useRef } from "react";

// Same palette as the reference plasma effect: ' .:-=+*#%@' light-to-dense.
const PALETTE = " .:-=+*#%@";

const CELL_SIZE = 15;
const MAX_DPR = 2;
const STATIC_TIME = 32; // fixed phase used for the reduced-motion frame
const TARGET_FPS = 60; // a slow plasma doesn't need 60fps; halves redraw work
const FRAME_INTERVAL = 1000 / TARGET_FPS;

// Monochrome: darker/richer against a light background, lighter against dark.
const LIGHTNESS_LIGHT = 22;
const LIGHTNESS_DARK = 62;

// Shapes the density mapping: the raw plasma field spends most of its range near the
// middle. Values below 1 push more of that range toward denser glyphs (fuller coverage).
const DENSITY_BIAS = 0.7;

// Precompute normalized-value -> palette-index once at module load, so the hot
// per-cell loop never calls Math.pow.
const LUT_SIZE = 512;
const DENSITY_LUT = new Uint8Array(LUT_SIZE);
for (let i = 0; i < LUT_SIZE; i++) {
  const norm = i / (LUT_SIZE - 1);
  const biased = Math.pow(norm, DENSITY_BIAS);
  DENSITY_LUT[i] = Math.min(
    PALETTE.length - 1,
    Math.floor(biased * PALETTE.length),
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
    const isDarkTheme = () =>
      document.documentElement.getAttribute("data-theme") === "dark";

    canvas.style.fontFamily = "var(--font-mono)";
    const resolvedFont = getComputedStyle(canvas).fontFamily;

    let lightness = isDarkTheme() ? LIGHTNESS_DARK : LIGHTNESS_LIGHT;

    let cols = 0;
    let rows = 0;
    let cellH = CELL_SIZE * 1.7;
    let charScaleX = 1;
    let width = 0;
    let height = 0;

    // Per-cell trig precomputed at resize time (angle-addition identities let the
    // per-frame loop use cheap multiply/adds instead of sin/cos/sqrt calls).
    let sinX = new Float32Array(0);
    let cosX = new Float32Array(0);
    let sinY = new Float32Array(0);
    let cosY = new Float32Array(0);
    let sinD = new Float32Array(0);
    let cosD = new Float32Array(0);
    let sinR = new Float32Array(0);
    let cosR = new Float32Array(0);

    // Reused per-row character buffer instead of allocating one every row/frame.
    let rowChars: string[] = [];

    let t = STATIC_TIME;
    let rafId = 0;
    let lastFrameTime = 0;

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
      const cellW = width / cols;
      cellH = height / rows;

      ctx.font = `${cellH}px ${resolvedFont}`;
      const naturalWidth = ctx.measureText("M").width || cellH * 0.6;
      charScaleX = cellW / naturalWidth;
      ctx.textBaseline = "top";

      sinX = new Float32Array(cols);
      cosX = new Float32Array(cols);
      for (let col = 0; col < cols; col++) {
        sinX[col] = Math.sin(col * 0.15);
        cosX[col] = Math.cos(col * 0.15);
      }

      sinY = new Float32Array(rows);
      cosY = new Float32Array(rows);
      for (let row = 0; row < rows; row++) {
        sinY[row] = Math.sin(row * 0.2);
        cosY[row] = Math.cos(row * 0.2);
      }

      sinD = new Float32Array(cols * rows);
      cosD = new Float32Array(cols * rows);
      sinR = new Float32Array(cols * rows);
      cosR = new Float32Array(cols * rows);
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const i = row * cols + col;
          const diag = (col + row) * 0.1;
          sinD[i] = Math.sin(diag);
          cosD[i] = Math.cos(diag);
          const radius = Math.sqrt(col * col + row * row) * 0.16;
          sinR[i] = Math.sin(radius);
          cosR[i] = Math.cos(radius);
        }
      }

      rowChars = new Array(cols).fill(" ");

      draw(reduceMotionQuery.matches ? STATIC_TIME : t);
    };

    function draw(time: number) {
      if (!ctx) return;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = `hsl(0, 0%, ${lightness}%)`;
      ctx.globalAlpha = 0.55;

      // Angle-addition identities: sin(a + b) = sin(a)cos(b) + cos(a)sin(b).
      // These four pairs are the ONLY transcendental calls made this frame —
      // everything inside the loop below is multiply/add.
      const cosT1 = Math.cos(time);
      const sinT1 = Math.sin(time);
      const cosT2 = Math.cos(time * 1.3);
      const sinT2 = Math.sin(time * 1.3);
      const cosT3 = Math.cos(time * 0.6);
      const sinT3 = Math.sin(time * 0.6);
      const cosT4 = Math.cos(time * 1.7);
      const sinT4 = Math.sin(time * 1.7);

      ctx.save();
      ctx.scale(charScaleX, 1);

      for (let row = 0; row < rows; row++) {
        const term2 = sinY[row] * cosT2 + cosY[row] * sinT2;
        const rowOffset = row * cols;

        for (let col = 0; col < cols; col++) {
          const i = rowOffset + col;
          const term1 = sinX[col] * cosT1 + cosX[col] * sinT1;
          const term3 = sinD[i] * cosT3 + cosD[i] * sinT3;
          const term4 = sinR[i] * cosT4 - cosR[i] * sinT4;

          const value = (term1 + term2 + term3 + term4) / 4; // -1..1
          const norm = (value + 1) / 2; // 0..1
          const lutIndex = (norm * (LUT_SIZE - 1)) | 0;
          rowChars[col] = PALETTE[DENSITY_LUT[lutIndex]];
        }

        // One fillText call per row instead of one per cell — this is the
        // single biggest cost reduction, since glyph rasterization dominates.
        ctx.fillText(rowChars.join(""), 0, row * cellH);
      }

      ctx.restore();
    }

    const loop = (now: number) => {
      if (reduceMotionQuery.matches || document.hidden) return;

      if (now - lastFrameTime >= FRAME_INTERVAL) {
        lastFrameTime = now;
        draw(t);
        t += 0.02;
      }
      rafId = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(rafId);
      if (reduceMotionQuery.matches) {
        draw(STATIC_TIME);
      } else {
        lastFrameTime = 0;
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