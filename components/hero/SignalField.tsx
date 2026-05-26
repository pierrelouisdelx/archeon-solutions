"use client";

import { useEffect, useRef } from "react";

/**
 * Drifting 3D point lattice rendered to <canvas>.
 * - Respects prefers-reduced-motion (renders one static frame).
 * - Pauses on tab blur and when document is hidden.
 */
export default function SignalField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let running = true;

    type Point = { x: number; y: number; z: number; flicker: number };
    const points: Point[] = [];

    // Lattice dimensions
    const COLS = 22;
    const ROWS = 14;
    const DEPTH = 8;

    const buildLattice = () => {
      points.length = 0;
      for (let z = 0; z < DEPTH; z++) {
        for (let y = 0; y < ROWS; y++) {
          for (let x = 0; x < COLS; x++) {
            points.push({
              x: x / (COLS - 1) - 0.5,
              y: y / (ROWS - 1) - 0.5,
              z: z / (DEPTH - 1) - 0.5,
              flicker: Math.random() < 0.012 ? Math.random() * 1.5 + 0.5 : 0,
            });
          }
        }
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    buildLattice();
    resize();
    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    const onVisibility = () => {
      running = !document.hidden;
      if (running) raf = requestAnimationFrame(frame);
    };
    document.addEventListener("visibilitychange", onVisibility);

    const start = performance.now();

    const project = (px: number, py: number, pz: number, t: number) => {
      // Slow horizontal drift on z, gentle bob
      const yaw = t * 0.00012;
      const pitch = Math.sin(t * 0.00009) * 0.18;

      // Rotate around Y, then X
      const cosY = Math.cos(yaw),
        sinY = Math.sin(yaw);
      const x1 = px * cosY - pz * sinY;
      const z1 = px * sinY + pz * cosY;

      const cosX = Math.cos(pitch),
        sinX = Math.sin(pitch);
      const y2 = py * cosX - z1 * sinX;
      const z2 = py * sinX + z1 * cosX;

      // Perspective
      const camZ = 1.4;
      const denom = camZ - z2 * 0.7;
      const fov = 0.9;
      const sx = (x1 * fov) / denom;
      const sy = (y2 * fov) / denom;

      return {
        x: width * 0.5 + sx * width * 0.85,
        y: height * 0.5 + sy * height * 0.9,
        depth: 1 / denom, // 0..~1.4
      };
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      const t = 1500;
      for (const p of points) {
        const { x, y, depth } = project(p.x, p.y, p.z, t);
        const r = Math.max(0.4, depth * 1.2);
        const alpha = Math.min(0.55, depth * 0.42);
        ctx.fillStyle = `rgba(244, 241, 234, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const frame = (now: number) => {
      if (!running) return;
      const t = now - start;
      ctx.clearRect(0, 0, width, height);

      for (const p of points) {
        const proj = project(p.x, p.y, p.z, t);
        const r = Math.max(0.4, proj.depth * 1.25);
        const baseAlpha = Math.min(0.55, proj.depth * 0.42);

        if (p.flicker > 0) {
          // Signal-colored flicker on a small subset
          const pulse =
            0.5 + 0.5 * Math.sin(t * 0.002 + p.flicker * 7);
          const a = baseAlpha + pulse * 0.45;
          ctx.fillStyle = `rgba(215, 255, 60, ${Math.min(0.85, a)})`;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, r * (1 + pulse * 0.6), 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(244, 241, 234, ${baseAlpha})`;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(frame);
    };

    if (reduced) {
      drawStatic();
    } else {
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  );
}
