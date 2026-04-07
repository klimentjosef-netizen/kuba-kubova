'use client';

import { useEffect, useRef, useMemo } from 'react';

/**
 * Complex architectural perspective sketch — hundreds of straight lines
 * forming a modern building complex. Clean, technical, no wobble.
 * All drawn within ~5 seconds with randomized order.
 */
export default function HeroBlueprintFull() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const timer = setTimeout(() => svg.classList.add('bp-active'), 200);
    return () => clearTimeout(timer);
  }, []);

  const lines = useMemo(() => {
    const result: { x1: number; y1: number; x2: number; y2: number; w: number; o: number; delay: number; speed: number }[] = [];

    // Seeded random
    let seed = 42;
    const rand = () => { seed = (seed * 16807 + 7) % 2147483647; return (seed % 10000) / 10000; };

    const add = (x1: number, y1: number, x2: number, y2: number, w: number, o: number) => {
      result.push({ x1, y1, x2, y2, w, o, delay: 0, speed: 0 });
    };

    // Vanishing point
    const vx = 1020, vy = 330;

    // Helper: perspective line from point toward VP
    const toVP = (x: number, y: number, t: number, w: number, o: number) => {
      add(x, y, x + (vx - x) * t, y + (vy - y) * t, w, o);
    };

    // ════════════════════════════════════════════════
    // BUILDING A — Left block (glass facade, horizontal louvers)
    // ════════════════════════════════════════════════
    const aL = 80, aR = 480, aTop = 250, aBot = 780;
    // Main edges
    add(aL, aBot, aL, aTop, 2.0, 0.22);
    add(aR, aBot, aR, aTop - 30, 2.0, 0.22);
    add(aL, aTop, aR, aTop - 30, 1.5, 0.18);
    add(aL, aBot, aR, aBot, 1.2, 0.15);
    // Perspective depth
    toVP(aR, aTop - 30, 0.25, 1.0, 0.12);
    toVP(aR, aBot, 0.2, 0.8, 0.10);

    // Horizontal louvers / floor lines (every ~35px)
    for (let i = 0; i < 15; i++) {
      const y = aTop + 5 + i * 35;
      if (y > aBot - 10) break;
      add(aL, y, aR, y - 2, 0.6 + (i % 3 === 0 ? 0.5 : 0), (i % 3 === 0) ? 0.14 : 0.07);
      // Depth continuation
      if (i % 2 === 0) {
        const ex = aR + (vx - aR) * 0.15;
        const ey = y - 2 + (vy - y) * 0.15;
        add(aR, y - 2, ex, ey, 0.4, 0.05);
      }
    }

    // Vertical mullions
    for (let i = 0; i < 8; i++) {
      const x = aL + 30 + i * 52;
      add(x, aTop + 5, x, aBot, 0.5, 0.08);
    }

    // Overshoot / construction lines
    add(aL - 15, aTop, aL + 20, aTop, 0.3, 0.04);
    add(aR - 10, aTop - 30, aR + 25, aTop - 30, 0.3, 0.04);
    add(aL, aBot, aL, aBot + 12, 0.3, 0.04);
    add(aR, aBot, aR, aBot + 12, 0.3, 0.04);

    // ════════════════════════════════════════════════
    // BUILDING B — Center tower (tallest, glass curtain wall)
    // ════════════════════════════════════════════════
    const bL = 500, bR = 850, bTop = 120, bBot = 780;
    add(bL, bBot, bL, bTop, 2.2, 0.25);
    add(bR, bBot, bR, bTop + 10, 2.2, 0.25);
    add(bL, bTop, bR, bTop + 10, 1.8, 0.20);
    add(bL, bBot, bR, bBot, 1.0, 0.12);
    // Roof overhang
    add(bL - 15, bTop - 8, bR + 15, bTop + 2, 1.2, 0.15);
    // Depth
    toVP(bR, bTop + 10, 0.3, 1.2, 0.14);
    toVP(bR, bBot, 0.25, 0.8, 0.10);
    const bRd = bR + (vx - bR) * 0.3;
    const bTd = bTop + 10 + (vy - bTop - 10) * 0.3;
    const bBd = bBot + (vy - bBot) * 0.25;
    add(bRd, bTd, bRd, bBd, 0.8, 0.10);

    // Floor lines
    for (let i = 0; i < 18; i++) {
      const y = bTop + 20 + i * 37;
      if (y > bBot - 5) break;
      const isMain = i % 4 === 0;
      add(bL, y, bR, y + 1, isMain ? 1.0 : 0.4, isMain ? 0.14 : 0.06);
      // Depth
      if (isMain) {
        add(bR, y + 1, bRd, y + 1 + (vy - y) * 0.08, 0.5, 0.06);
      }
    }

    // Window verticals
    for (let i = 0; i < 7; i++) {
      const x = bL + 25 + i * 48;
      add(x, bTop + 20, x, bBot, 0.5, 0.08);
      // Every other gets a cross bar
      if (i % 2 === 0) {
        for (let j = 0; j < 8; j++) {
          const wy = bTop + 40 + j * 75;
          if (wy > bBot - 20) break;
          add(x - 5, wy, x + 43, wy, 0.3, 0.05);
        }
      }
    }

    // Entrance
    add(bL + 100, bBot, bL + 100, bBot - 80, 1.2, 0.18);
    add(bL + 230, bBot, bL + 230, bBot - 80, 1.2, 0.18);
    add(bL + 95, bBot - 80, bL + 235, bBot - 80, 1.0, 0.16);
    // Canopy
    add(bL + 80, bBot - 90, bL + 250, bBot - 90, 1.5, 0.18);
    toVP(bL + 250, bBot - 90, 0.08, 0.6, 0.08);
    add(bL + 80, bBot - 90, bL + 60, bBot - 85, 0.5, 0.06);

    // ════════════════════════════════════════════════
    // BUILDING C — Right block (stepped / cantilever)
    // ════════════════════════════════════════════════
    const cL = 870, cR = 1250, cTop = 200, cMid = 380, cBot = 780;
    // Lower portion
    add(cL, cBot, cL, cMid, 2.0, 0.22);
    add(cR, cBot, cR, cMid, 2.0, 0.22);
    add(cL, cMid, cR, cMid, 1.5, 0.18);
    add(cL, cBot, cR, cBot, 1.0, 0.12);
    // Upper setback
    add(cL + 40, cMid, cL + 40, cTop, 1.8, 0.20);
    add(cR - 30, cMid, cR - 30, cTop + 20, 1.8, 0.20);
    add(cL + 40, cTop, cR - 30, cTop + 20, 1.5, 0.18);
    // Cantilever overhang
    add(cL + 20, cMid - 5, cR - 10, cMid - 5, 1.2, 0.15);
    add(cL + 20, cMid - 5, cL + 20, cMid + 5, 0.5, 0.06);
    add(cR - 10, cMid - 5, cR - 10, cMid + 5, 0.5, 0.06);

    // Depth
    toVP(cR, cMid, 0.2, 0.8, 0.10);
    toVP(cR, cBot, 0.18, 0.6, 0.08);
    toVP(cR - 30, cTop + 20, 0.22, 0.8, 0.10);

    // Floor lines lower
    for (let i = 0; i < 10; i++) {
      const y = cMid + 20 + i * 40;
      if (y > cBot - 5) break;
      add(cL, y, cR, y, i % 3 === 0 ? 0.8 : 0.4, i % 3 === 0 ? 0.12 : 0.05);
    }
    // Floor lines upper
    for (let i = 0; i < 5; i++) {
      const y = cTop + 20 + i * 35;
      if (y > cMid - 5) break;
      add(cL + 40, y, cR - 30, y, 0.5, 0.07);
    }

    // Windows lower
    for (let i = 0; i < 8; i++) {
      const x = cL + 25 + i * 48;
      if (x > cR - 20) break;
      add(x, cMid + 10, x, cBot, 0.4, 0.06);
    }
    // Windows upper
    for (let i = 0; i < 5; i++) {
      const x = cL + 60 + i * 48;
      if (x > cR - 50) break;
      add(x, cTop + 25, x, cMid - 10, 0.4, 0.06);
    }

    // ════════════════════════════════════════════════
    // BUILDING D — Far right, smaller
    // ════════════════════════════════════════════════
    const dL = 1280, dR = 1550, dTop = 350, dBot = 780;
    add(dL, dBot, dL, dTop, 1.5, 0.18);
    add(dR, dBot, dR, dTop + 20, 1.5, 0.18);
    add(dL, dTop, dR, dTop + 20, 1.2, 0.14);
    add(dL, dBot, dR, dBot, 0.8, 0.10);
    toVP(dR, dTop + 20, 0.15, 0.6, 0.08);
    toVP(dR, dBot, 0.12, 0.5, 0.06);

    // Floors
    for (let i = 0; i < 10; i++) {
      const y = dTop + 25 + i * 42;
      if (y > dBot - 5) break;
      add(dL, y, dR, y + 1, i % 3 === 0 ? 0.7 : 0.3, i % 3 === 0 ? 0.10 : 0.04);
    }
    // Verticals
    for (let i = 0; i < 5; i++) {
      const x = dL + 30 + i * 55;
      if (x > dR - 15) break;
      add(x, dTop + 25, x, dBot, 0.4, 0.06);
    }

    // ════════════════════════════════════════════════
    // GROUND PLANE
    // ════════════════════════════════════════════════
    add(0, 780, 1920, 780, 1.8, 0.20);
    add(0, 785, 1920, 785, 0.5, 0.06);
    // Perspective ground lines
    for (let i = 0; i < 8; i++) {
      const x = 100 + i * 220;
      toVP(x, 780, 0.3 + rand() * 0.2, 0.3, 0.04);
    }
    // Pavement lines
    add(50, 800, 1800, 800, 0.3, 0.04);
    add(50, 830, 1800, 830, 0.2, 0.03);
    // Cross hatching on ground
    for (let i = 0; i < 20; i++) {
      const x = 80 + i * 90;
      add(x, 780, x + 15 + rand() * 30, 810, 0.2, 0.03);
    }

    // ════════════════════════════════════════════════
    // CONSTRUCTION / PERSPECTIVE GUIDE LINES
    // ════════════════════════════════════════════════
    // Horizon line
    add(0, vy, 1920, vy, 0.15, 0.025);
    // Radial construction lines from VP
    for (let i = 0; i < 12; i++) {
      const angle = -Math.PI * 0.4 + i * (Math.PI * 0.8 / 11);
      const ex = vx + Math.cos(angle) * 1500;
      const ey = vy + Math.sin(angle) * 1500;
      add(vx, vy, ex, ey, 0.15, 0.02);
    }
    // Vertical construction lines
    for (let i = 0; i < 6; i++) {
      const x = 200 + i * 280;
      add(x, 50, x, 850, 0.12, 0.015);
    }

    // ════════════════════════════════════════════════
    // CONNECTING ELEMENTS between buildings
    // ════════════════════════════════════════════════
    // Bridge / walkway B-C
    add(bR, 400, cL, 400, 0.8, 0.10);
    add(bR, 410, cL, 410, 0.8, 0.10);
    add(bR, 400, bR, 410, 0.5, 0.06);
    add(cL, 400, cL, 410, 0.5, 0.06);

    // ════════════════════════════════════════════════
    // PEOPLE (simple vertical + shoulder line)
    // ════════════════════════════════════════════════
    const people = [[120, 30], [300, 28], [650, 32], [1100, 26], [1350, 30], [1500, 28]];
    for (const [px, ph] of people) {
      add(px, 780, px, 780 - ph, 0.8, 0.12);
      add(px - 4, 780 - ph + 3, px + 4, 780 - ph + 3, 0.5, 0.08);
      add(px, 780 - ph, px, 780 - ph - 3, 0.4, 0.08); // head
    }

    // ════════════════════════════════════════════════
    // TREES
    // ════════════════════════════════════════════════
    const trees = [50, 1600, 1700, 1800];
    for (const tx of trees) {
      add(tx, 780, tx, 730, 0.6, 0.08);
      // Crown lines
      for (let j = 0; j < 6; j++) {
        const a = -Math.PI * 0.8 + j * (Math.PI * 1.6 / 5);
        const r = 15 + rand() * 10;
        add(tx, 730, tx + Math.cos(a) * r, 730 + Math.sin(a) * r - 5, 0.3, 0.05);
      }
    }

    // ════════════════════════════════════════════════
    // EXTRA DETAIL: balcony railings, facade textures
    // ════════════════════════════════════════════════
    // Building A — horizontal shading lines (glass reflection)
    for (let i = 0; i < 25; i++) {
      const y = aTop + 15 + i * 22;
      if (y > aBot - 10) break;
      const x1 = aL + 5 + rand() * 50;
      const x2 = x1 + 80 + rand() * 200;
      add(x1, y, Math.min(x2, aR - 5), y, 0.2, 0.03);
    }

    // Building B — vertical accent lines (structural)
    for (let i = 0; i < 4; i++) {
      const x = bL + 80 + i * 90;
      add(x, bTop + 15, x, bBot, 0.8, 0.10);
      add(x + 2, bTop + 15, x + 2, bBot, 0.3, 0.04);
    }

    // Building C — balcony shadows
    for (let i = 0; i < 8; i++) {
      const y = cMid + 25 + i * 50;
      if (y > cBot - 10) break;
      add(cL, y, cL + 15, y + 8, 0.3, 0.04);
      add(cR - 15, y, cR, y + 8, 0.3, 0.04);
    }

    // Random accent overshoots on all buildings
    for (let i = 0; i < 30; i++) {
      const x = 100 + rand() * 1400;
      const y = 150 + rand() * 600;
      const len = 20 + rand() * 60;
      const angle = rand() > 0.6 ? 0 : Math.PI / 2; // horizontal or vertical
      add(x, y, x + Math.cos(angle) * len, y + Math.sin(angle) * len, 0.2, 0.03);
    }

    // ════════════════════════════════════════════════
    // SHUFFLE delays: spread across 5 seconds
    // ════════════════════════════════════════════════
    const totalTime = 5.0;
    const indices = Array.from({ length: result.length }, (_, i) => i);
    // Shuffle indices
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    // Assign delays based on shuffled position
    for (let pos = 0; pos < indices.length; pos++) {
      const idx = indices[pos];
      const t = (pos / indices.length) * totalTime;
      result[idx].delay = t;
      // Speed: thicker lines draw slower
      const len = Math.sqrt((result[idx].x2 - result[idx].x1) ** 2 + (result[idx].y2 - result[idx].y1) ** 2);
      result[idx].speed = 0.3 + (len / 1500) * 1.2;
    }

    return result;
  }, []);

  return (
    <svg
      ref={ref}
      className="blueprint-svg"
      viewBox="0 0 1920 900"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      {lines.map((l, i) => {
        const len = Math.ceil(Math.sqrt((l.x2 - l.x1) ** 2 + (l.y2 - l.y1) ** 2));
        return (
          <line
            key={i}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke={`rgba(15,15,13,${l.o.toFixed(3)})`}
            strokeWidth={l.w}
            strokeLinecap="round"
            className="bp-line"
            style={{
              '--bp-len': len || 1,
              '--bp-delay': `${l.delay.toFixed(2)}s`,
              '--bp-draw-speed': `${l.speed.toFixed(2)}s`,
            } as React.CSSProperties}
          />
        );
      })}
    </svg>
  );
}
