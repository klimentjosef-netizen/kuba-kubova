'use client';

import { useEffect, useRef, useMemo } from 'react';

/**
 * Architectural perspective sketch — raw, overlapping lines
 * like a hand-drawn concept sketch of a modern building.
 * Lines appear randomly with varying thickness and opacity.
 */
export default function HeroBlueprintFull() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const timer = setTimeout(() => svg.classList.add('bp-active'), 300);
    return () => clearTimeout(timer);
  }, []);

  // Seeded pseudo-random for consistent renders
  const seededRandom = (seed: number) => {
    let s = seed;
    return () => {
      s = (s * 16807 + 7) % 2147483647;
      return (s % 10000) / 10000;
    };
  };

  const lines = useMemo(() => {
    const rand = seededRandom(42);
    const result: {
      x1: number; y1: number; x2: number; y2: number;
      w: number; o: number; delay: number; speed: number;
    }[] = [];

    // ─── VANISHING POINT (slightly right of center, upper third) ───
    const vx = 1050;
    const vy = 340;

    // ─── HELPER: add a sketchy line with slight randomness ───
    const addLine = (x1: number, y1: number, x2: number, y2: number, weight: number, opacity: number, timeSlot: number) => {
      // Main line
      result.push({
        x1: x1 + (rand() - 0.5) * 3,
        y1: y1 + (rand() - 0.5) * 3,
        x2: x2 + (rand() - 0.5) * 3,
        y2: y2 + (rand() - 0.5) * 3,
        w: weight * (0.8 + rand() * 0.4),
        o: opacity * (0.7 + rand() * 0.6),
        delay: timeSlot + rand() * 2,
        speed: 1.5 + rand() * 2.5,
      });

      // Overlap / construction line (lighter, slightly offset)
      if (rand() > 0.3) {
        const offsetX = (rand() - 0.5) * 6;
        const offsetY = (rand() - 0.5) * 6;
        result.push({
          x1: x1 + offsetX, y1: y1 + offsetY,
          x2: x2 + offsetX, y2: y2 + offsetY,
          w: weight * 0.4,
          o: opacity * 0.3,
          delay: timeSlot + rand() * 1.5,
          speed: 1.0 + rand() * 2,
        });
      }

      // Overshoot line (extends past endpoints)
      if (rand() > 0.5) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const ext = 0.08 + rand() * 0.15;
        result.push({
          x1: x1 - dx * ext * 0.5,
          y1: y1 - dy * ext * 0.5,
          x2: x2 + dx * ext,
          y2: y2 + dy * ext,
          w: weight * 0.25,
          o: opacity * 0.2,
          delay: timeSlot - 0.5 + rand() * 1,
          speed: 0.8 + rand() * 1.5,
        });
      }
    };

    // ─── BUILDING 1: Modern box, left side ───
    // Front face
    addLine(200, 750, 200, 300, 1.8, 0.22, 0);   // left edge
    addLine(200, 300, 700, 300, 1.5, 0.20, 1);    // top
    addLine(700, 300, 700, 750, 1.8, 0.22, 0.5);  // right edge
    addLine(200, 750, 700, 750, 1.2, 0.18, 1.5);  // bottom

    // Perspective lines to vanishing point
    addLine(200, 300, vx, vy, 0.8, 0.10, 2);
    addLine(700, 300, vx + 100, vy - 10, 0.8, 0.10, 2.5);
    addLine(200, 750, vx - 200, vy + 300, 0.5, 0.07, 3);
    addLine(700, 750, vx, vy + 250, 0.5, 0.07, 3);

    // Floor lines (horizontal slabs)
    addLine(200, 450, 700, 450, 1.0, 0.15, 3);
    addLine(200, 600, 700, 600, 1.0, 0.15, 3.5);
    // Perspective floor lines
    addLine(700, 450, vx + 50, vy + 50, 0.6, 0.08, 4);
    addLine(700, 600, vx + 30, vy + 150, 0.6, 0.08, 4.5);

    // Windows — vertical divisions
    for (let i = 0; i < 5; i++) {
      const x = 240 + i * 95;
      addLine(x, 310, x, 440, 0.7, 0.12, 5 + rand() * 3);
      addLine(x, 460, x, 590, 0.7, 0.12, 5.5 + rand() * 3);
      addLine(x, 610, x, 740, 0.7, 0.12, 6 + rand() * 3);
    }

    // Window horizontals
    addLine(230, 375, 690, 375, 0.4, 0.08, 6);
    addLine(230, 525, 690, 525, 0.4, 0.08, 6.5);
    addLine(230, 675, 690, 675, 0.4, 0.08, 7);

    // ─── BUILDING 2: Taller tower, right side ───
    addLine(750, 750, 750, 150, 2.0, 0.25, 1);    // left edge
    addLine(750, 150, 1100, 150, 1.5, 0.20, 2);   // top
    addLine(1100, 150, 1100, 750, 1.8, 0.22, 1.5); // right edge
    addLine(750, 750, 1100, 750, 1.0, 0.15, 2.5);  // bottom

    // Perspective depth
    addLine(1100, 150, 1350, 250, 1.0, 0.12, 3);
    addLine(1100, 750, 1350, 700, 0.8, 0.10, 3.5);
    addLine(1350, 250, 1350, 700, 0.8, 0.12, 4);

    // Floor lines
    for (let i = 0; i < 5; i++) {
      const y = 250 + i * 105;
      addLine(750, y, 1100, y, 0.8, 0.12, 4 + rand() * 3);
      addLine(1100, y, 1350, y + 15 + i * 3, 0.4, 0.07, 5 + rand() * 2);
    }

    // Windows
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 3; col++) {
        const wx = 790 + col * 100;
        const wy = 170 + row * 105;
        addLine(wx, wy, wx, wy + 70, 0.6, 0.10, 7 + rand() * 4);
        addLine(wx, wy, wx + 60, wy, 0.5, 0.08, 7.5 + rand() * 4);
        addLine(wx + 60, wy, wx + 60, wy + 70, 0.6, 0.10, 8 + rand() * 4);
      }
    }

    // ─── GROUND / LANDSCAPE LINES ───
    addLine(50, 750, 1800, 750, 1.5, 0.18, 0.5);
    addLine(30, 760, 1850, 760, 0.6, 0.08, 1);
    // Perspective ground lines
    addLine(50, 750, vx - 200, vy + 200, 0.4, 0.06, 4);
    addLine(1400, 750, vx + 200, vy + 200, 0.4, 0.06, 4.5);

    // Ground hatching / texture
    for (let i = 0; i < 12; i++) {
      const sx = 100 + rand() * 1600;
      addLine(sx, 755, sx + 40 + rand() * 80, 755 + rand() * 15, 0.3, 0.05, 8 + rand() * 5);
    }

    // ─── CANOPY / ENTRANCE DETAIL ───
    addLine(350, 740, 550, 740, 1.5, 0.18, 6);
    addLine(350, 740, 350, 720, 1.0, 0.15, 6.5);
    addLine(550, 740, 550, 720, 1.0, 0.15, 6.5);
    addLine(340, 720, 560, 720, 1.2, 0.16, 7);
    // Canopy perspective
    addLine(560, 720, 650, 700, 0.6, 0.08, 7.5);
    addLine(340, 720, 300, 710, 0.6, 0.08, 7.5);

    // ─── LOOSE CONSTRUCTION LINES (perspective grid) ───
    // These are the light "thinking" lines architects draw first
    for (let i = 0; i < 15; i++) {
      const startX = rand() * 300;
      const startY = 200 + rand() * 600;
      addLine(startX, startY, vx + (rand() - 0.5) * 200, vy + (rand() - 0.5) * 100, 0.2, 0.04, rand() * 3);
    }
    for (let i = 0; i < 10; i++) {
      const startX = 1200 + rand() * 600;
      const startY = 200 + rand() * 600;
      addLine(startX, startY, vx + (rand() - 0.5) * 200, vy + (rand() - 0.5) * 100, 0.2, 0.04, rand() * 4);
    }

    // ─── SKY / CONTEXT LINES ───
    // Faint horizontal lines suggesting sky/horizon
    addLine(0, 200, 500, 195, 0.2, 0.03, 10);
    addLine(1300, 180, 1900, 185, 0.2, 0.03, 11);
    addLine(0, 100, 400, 105, 0.15, 0.025, 12);

    // ─── PEOPLE SILHOUETTES (simple lines) ───
    // Figure 1
    addLine(150, 750, 150, 715, 0.8, 0.12, 10);
    addLine(145, 715, 155, 715, 0.5, 0.10, 10.5); // shoulders
    addLine(150, 715, 150, 708, 0.6, 0.10, 10.5); // head
    // Figure 2
    addLine(1200, 750, 1200, 720, 0.7, 0.10, 11);
    addLine(1195, 720, 1205, 720, 0.4, 0.08, 11.5);
    // Figure 3
    addLine(1250, 750, 1250, 718, 0.8, 0.12, 11);
    addLine(1245, 718, 1255, 718, 0.5, 0.10, 11.5);

    // ─── TREES (abstract scribbles) ───
    for (let t = 0; t < 3; t++) {
      const tx = 1400 + t * 120;
      addLine(tx, 750, tx, 680, 0.6, 0.10, 9 + rand() * 3);
      // Canopy scribbles
      for (let s = 0; s < 5; s++) {
        const angle = rand() * Math.PI * 2;
        const r = 15 + rand() * 25;
        addLine(
          tx + Math.cos(angle) * r * 0.3,
          680 - 10 + Math.sin(angle) * r * 0.3,
          tx + Math.cos(angle) * r,
          680 - 10 + Math.sin(angle) * r,
          0.3, 0.06, 10 + rand() * 3,
        );
      }
    }

    return result;
  }, []);

  // Generate hand-drawn path for each line
  const handPath = (x1: number, y1: number, x2: number, y2: number, seed: number) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len < 2) return { d: `M ${x1} ${y1} L ${x2} ${y2}`, len: 2 };

    const steps = Math.max(2, Math.floor(len / 30));
    const pts: string[] = [`M ${x1.toFixed(1)} ${y1.toFixed(1)}`];

    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const wobble = Math.sin(seed * 7.3 + i * 4.1) * 1.5 + Math.cos(seed * 11 + i * 2.7) * 0.7;
      const nx = -dy / len * wobble;
      const ny = dx / len * wobble;
      pts.push(`L ${(x1 + dx * t + nx).toFixed(1)} ${(y1 + dy * t + ny).toFixed(1)}`);
    }

    return { d: pts.join(' '), len: Math.ceil(len * 1.03) };
  };

  return (
    <svg
      ref={ref}
      className="blueprint-svg"
      viewBox="0 0 1920 900"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      {lines.map((line, i) => {
        const { d, len } = handPath(line.x1, line.y1, line.x2, line.y2, i * 7 + 13);
        return (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={`rgba(15,15,13,${line.o.toFixed(3)})`}
            strokeWidth={line.w}
            strokeLinecap="round"
            className="bp-line"
            style={{
              '--bp-len': len,
              '--bp-delay': `${line.delay.toFixed(2)}s`,
              '--bp-draw-speed': `${line.speed.toFixed(2)}s`,
            } as React.CSSProperties}
          />
        );
      })}
    </svg>
  );
}
