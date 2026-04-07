'use client';

import { useEffect, useRef, useMemo } from 'react';

/**
 * Dense architectural perspective sketch — 700+ straight lines forming
 * a complex modern building. Bold, detailed, clearly visible.
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

    let seed = 42;
    const rand = () => { seed = (seed * 16807 + 7) % 2147483647; return (seed % 10000) / 10000; };

    const add = (x1: number, y1: number, x2: number, y2: number, w: number, o: number) => {
      result.push({ x1, y1, x2, y2, w, o, delay: 0, speed: 0 });
    };

    // Double line helper — draws main + shadow/duplicate
    const addD = (x1: number, y1: number, x2: number, y2: number, w: number, o: number) => {
      add(x1, y1, x2, y2, w, o);
      add(x1 + 1.5, y1 + 1.5, x2 + 1.5, y2 + 1.5, w * 0.4, o * 0.35);
    };

    // Overshoot line — extends past both ends
    const addO = (x1: number, y1: number, x2: number, y2: number, w: number, o: number, ext = 0.1) => {
      const dx = x2 - x1, dy = y2 - y1;
      add(x1 - dx * ext, y1 - dy * ext, x2 + dx * ext, y2 + dy * ext, w, o);
    };

    const vx = 1000, vy = 310;

    const toVP = (x: number, y: number, t: number, w: number, o: number) => {
      add(x, y, x + (vx - x) * t, y + (vy - y) * t, w, o);
    };

    // ═══════════════════════════════════════
    // CONSTRUCTION LINES (drawn light, first)
    // ═══════════════════════════════════════
    add(0, vy, 1920, vy, 0.2, 0.03); // horizon
    for (let i = 0; i < 18; i++) {
      const angle = -Math.PI * 0.45 + i * (Math.PI * 0.9 / 17);
      add(vx, vy, vx + Math.cos(angle) * 2000, vy + Math.sin(angle) * 2000, 0.12, 0.018);
    }
    for (let i = 0; i < 10; i++) {
      add(100 + i * 180, 30, 100 + i * 180, 870, 0.1, 0.012);
    }

    // ═══════════════════════════════════════
    // BUILDING A — Left, 3-story glass box
    // ═══════════════════════════════════════
    const aL = 60, aR = 460, aT = 280, aB = 780;
    // Main structure — doubled
    addD(aL, aB, aL, aT, 2.2, 0.30);
    addD(aR, aB, aR, aT - 25, 2.2, 0.30);
    addD(aL, aT, aR, aT - 25, 1.8, 0.26);
    addD(aL, aB, aR, aB, 1.3, 0.20);
    // Roof slab
    addO(aL - 12, aT - 8, aR + 12, aT - 33, 1.4, 0.22);
    add(aL - 12, aT - 8, aL - 12, aT + 5, 0.5, 0.08);
    add(aR + 12, aT - 33, aR + 12, aT - 20, 0.5, 0.08);
    // Depth lines
    toVP(aR, aT - 25, 0.28, 1.2, 0.16);
    toVP(aR, aB, 0.22, 0.9, 0.12);
    toVP(aR + 12, aT - 33, 0.25, 0.8, 0.10);
    // Side depth wall
    const aRd = aR + (vx - aR) * 0.28;
    const aTd = aT - 25 + (vy - aT + 25) * 0.28;
    const aBd = aB + (vy - aB) * 0.22;
    add(aRd, aTd, aRd, aBd, 0.7, 0.09);

    // Floor slabs — every floor, bold
    for (let i = 0; i < 15; i++) {
      const y = aT + i * 34;
      if (y > aB - 5) break;
      const isMajor = i % 4 === 0;
      add(aL, y, aR, y - (i * 25 / 15), isMajor ? 1.2 : 0.5, isMajor ? 0.22 : 0.08);
      // Depth continuation
      add(aR, y - (i * 25 / 15), aRd, y - (i * 25 / 15) + (vy - y) * 0.06, isMajor ? 0.6 : 0.3, isMajor ? 0.10 : 0.04);
      // Shadow line below slab
      if (isMajor) {
        add(aL, y + 3, aR, y + 3 - (i * 25 / 15), 0.3, 0.04);
      }
    }

    // Vertical mullions — dense
    for (let i = 0; i < 12; i++) {
      const x = aL + 20 + i * 34;
      if (x > aR - 10) break;
      add(x, aT + 3, x, aB, 0.5, 0.10);
      // Window transom bars every 2nd mullion
      if (i % 2 === 0) {
        for (let j = 1; j < 14; j++) {
          const wy = aT + j * 34;
          if (wy > aB - 15) break;
          add(x, wy + 12, x + 34, wy + 12, 0.25, 0.04);
        }
      }
    }

    // Balcony railings
    for (let fl = 0; fl < 4; fl++) {
      const ry = aT + fl * 4 * 34 + 2;
      if (ry > aB - 20) break;
      add(aL - 8, ry, aL, ry, 0.6, 0.10);
      add(aL - 8, ry, aL - 8, ry + 20, 0.3, 0.06);
      add(aL - 8, ry + 20, aL, ry + 20, 0.3, 0.06);
      // Railing verticals
      for (let rv = 0; rv < 3; rv++) {
        add(aL - 8, ry + rv * 7, aL - 8, ry + rv * 7 + 5, 0.2, 0.04);
      }
    }

    // ═══════════════════════════════════════
    // BUILDING B — Center tower, tallest
    // ═══════════════════════════════════════
    const bL = 480, bR = 860, bT = 80, bB = 780;
    addD(bL, bB, bL, bT, 2.5, 0.35);
    addD(bR, bB, bR, bT + 8, 2.5, 0.35);
    addD(bL, bT, bR, bT + 8, 2.0, 0.28);
    addD(bL, bB, bR, bB, 1.2, 0.16);

    // Roof structure
    addO(bL - 10, bT - 10, bR + 10, bT - 2, 1.5, 0.22);
    add(bL + 100, bT - 25, bL + 280, bT - 25, 0.8, 0.10); // antenna/parapet
    add(bL + 100, bT - 25, bL + 100, bT - 10, 0.5, 0.08);
    add(bL + 280, bT - 25, bL + 280, bT - 10, 0.5, 0.08);

    // Depth
    toVP(bR, bT + 8, 0.32, 1.5, 0.20);
    toVP(bR, bB, 0.28, 1.0, 0.14);
    const bRd = bR + (vx - bR) * 0.32;
    const bTd = bT + 8 + (vy - bT - 8) * 0.32;
    const bBd = bB + (vy - bB) * 0.28;
    addD(bRd, bTd, bRd, bBd, 0.9, 0.12);

    // Floor slabs
    for (let i = 0; i < 20; i++) {
      const y = bT + 20 + i * 35;
      if (y > bB - 5) break;
      const isMajor = i % 3 === 0;
      add(bL, y, bR, y + 0.5, isMajor ? 1.3 : 0.5, isMajor ? 0.22 : 0.07);
      add(bR, y + 0.5, bRd, y + 0.5 + (vy - y) * 0.07, isMajor ? 0.6 : 0.25, isMajor ? 0.08 : 0.03);
      if (isMajor) add(bL, y + 3, bR, y + 3.5, 0.3, 0.04);
    }

    // Mullions — very dense curtain wall
    for (let i = 0; i < 10; i++) {
      const x = bL + 18 + i * 38;
      if (x > bR - 10) break;
      addD(x, bT + 15, x, bB, 0.6, 0.12);
    }

    // Window glass detail — horizontal bars
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 19; j++) {
        const x = bL + 18 + i * 38;
        const y = bT + 25 + j * 35 + 15;
        if (x > bR - 15 || y > bB - 10) continue;
        if (rand() > 0.6) continue; // not every one
        add(x, y, x + 35, y, 0.2, 0.03);
      }
    }

    // Entrance — large double-height
    addD(bL + 110, bB, bL + 110, bB - 100, 1.5, 0.25);
    addD(bL + 260, bB, bL + 260, bB - 100, 1.5, 0.25);
    addD(bL + 105, bB - 100, bL + 265, bB - 100, 1.2, 0.22);
    // Canopy
    addO(bL + 85, bB - 110, bL + 285, bB - 110, 1.8, 0.26, 0.05);
    add(bL + 85, bB - 110, bL + 85, bB - 105, 0.6, 0.08);
    add(bL + 285, bB - 110, bL + 285, bB - 105, 0.6, 0.08);
    toVP(bL + 285, bB - 110, 0.1, 0.7, 0.10);
    // Door divisions
    add(bL + 155, bB - 95, bL + 155, bB, 0.6, 0.10);
    add(bL + 215, bB - 95, bL + 215, bB, 0.6, 0.10);
    // Revolving door circle
    add(bL + 185, bB - 50, bL + 185, bB - 30, 0.3, 0.06);

    // Structural accent columns
    for (let i = 0; i < 5; i++) {
      const x = bL + 40 + i * 82;
      if (x > bR - 20) break;
      addD(x, bT + 10, x, bB, 1.0, 0.14);
    }

    // ═══════════════════════════════════════
    // BUILDING C — Right, stepped with cantilever
    // ═══════════════════════════════════════
    const cL = 880, cR = 1320, cT = 180, cM = 400, cB = 780;
    // Lower mass
    addD(cL, cB, cL, cM, 2.2, 0.30);
    addD(cR, cB, cR, cM, 2.2, 0.30);
    addD(cL, cM, cR, cM, 1.6, 0.24);
    addD(cL, cB, cR, cB, 1.2, 0.16);
    // Upper setback
    addD(cL + 50, cM, cL + 50, cT, 2.0, 0.28);
    addD(cR - 40, cM, cR - 40, cT + 15, 2.0, 0.28);
    addD(cL + 50, cT, cR - 40, cT + 15, 1.6, 0.24);
    // Cantilever slab
    addO(cL + 25, cM - 8, cR - 15, cM - 8, 1.4, 0.22);
    add(cL + 25, cM - 8, cL + 25, cM + 6, 0.6, 0.08);
    add(cR - 15, cM - 8, cR - 15, cM + 6, 0.6, 0.08);
    // Second cantilever at mid
    addO(cL + 30, cM + 190, cR - 20, cM + 190, 1.0, 0.15);

    // Depth
    toVP(cR, cM, 0.22, 1.0, 0.14);
    toVP(cR, cB, 0.20, 0.8, 0.10);
    toVP(cR - 40, cT + 15, 0.24, 0.9, 0.12);
    const cRd = cR + (vx - cR) * 0.22;
    const cMd = cM + (vy - cM) * 0.22;
    const cBd = cB + (vy - cB) * 0.20;
    add(cRd, cMd, cRd, cBd, 0.7, 0.08);

    // Floors lower
    for (let i = 0; i < 10; i++) {
      const y = cM + 15 + i * 38;
      if (y > cB - 5) break;
      const isMajor = i % 3 === 0;
      add(cL, y, cR, y, isMajor ? 1.0 : 0.4, isMajor ? 0.18 : 0.06);
      add(cR, y, cRd, y + (vy - y) * 0.05, isMajor ? 0.5 : 0.2, isMajor ? 0.06 : 0.02);
    }
    // Floors upper
    for (let i = 0; i < 6; i++) {
      const y = cT + 18 + i * 32;
      if (y > cM - 10) break;
      add(cL + 50, y, cR - 40, y, i % 2 === 0 ? 0.7 : 0.3, i % 2 === 0 ? 0.12 : 0.05);
    }

    // Windows lower — dense grid
    for (let i = 0; i < 10; i++) {
      const x = cL + 22 + i * 42;
      if (x > cR - 15) break;
      add(x, cM + 10, x, cB, 0.5, 0.09);
    }
    // Windows upper
    for (let i = 0; i < 6; i++) {
      const x = cL + 70 + i * 38;
      if (x > cR - 60) break;
      add(x, cT + 15, x, cM - 12, 0.5, 0.09);
    }

    // Balconies on lower section
    for (let fl = 0; fl < 8; fl++) {
      const ry = cM + 20 + fl * 48;
      if (ry > cB - 25) break;
      // Left balcony
      add(cL - 10, ry, cL, ry, 0.5, 0.08);
      add(cL - 10, ry, cL - 10, ry + 18, 0.3, 0.05);
      add(cL - 10, ry + 18, cL, ry + 18, 0.3, 0.05);
      // Right balcony
      add(cR, ry, cR + 10, ry, 0.5, 0.08);
      add(cR + 10, ry, cR + 10, ry + 18, 0.3, 0.05);
      add(cR + 10, ry + 18, cR, ry + 18, 0.3, 0.05);
    }

    // ═══════════════════════════════════════
    // BUILDING D — Right, wider with more detail
    // ═══════════════════════════════════════
    const dL = 1340, dR = 1620, dT = 200, dB = 780;
    addD(dL, dB, dL, dT, 2.0, 0.28);
    addD(dR, dB, dR, dT + 15, 2.0, 0.28);
    addD(dL, dT, dR, dT + 15, 1.6, 0.22);
    addD(dL, dB, dR, dB, 1.2, 0.16);
    // Roof overhang
    addO(dL - 10, dT - 6, dR + 10, dT + 9, 1.2, 0.18);
    // Depth
    toVP(dR, dT + 15, 0.2, 1.0, 0.14);
    toVP(dR, dB, 0.16, 0.7, 0.10);
    const dRd = dR + (vx - dR) * 0.2;
    const dTd = dT + 15 + (vy - dT - 15) * 0.2;
    const dBd = dB + (vy - dB) * 0.16;
    add(dRd, dTd, dRd, dBd, 0.6, 0.08);

    // Floor slabs
    for (let i = 0; i < 15; i++) {
      const y = dT + 18 + i * 38;
      if (y > dB - 5) break;
      const isMajor = i % 3 === 0;
      add(dL, y, dR, y + 1, isMajor ? 1.0 : 0.4, isMajor ? 0.18 : 0.06);
      add(dR, y + 1, dRd, y + 1 + (vy - y) * 0.04, isMajor ? 0.5 : 0.2, isMajor ? 0.06 : 0.02);
      if (isMajor) add(dL, y + 3, dR, y + 3, 0.3, 0.04);
    }
    // Dense mullions
    for (let i = 0; i < 8; i++) {
      const x = dL + 18 + i * 35;
      if (x > dR - 10) break;
      addD(x, dT + 15, x, dB, 0.5, 0.10);
    }
    // Window crossbars — denser
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 14; j++) {
        const x = dL + 18 + i * 35;
        const y = dT + 28 + j * 38 + 16;
        if (x > dR - 15 || y > dB - 10) continue;
        if (rand() > 0.55) continue;
        add(x, y, x + 32, y, 0.2, 0.035);
      }
    }
    // Balconies
    for (let fl = 0; fl < 6; fl++) {
      const ry = dT + 25 + fl * 3 * 38;
      if (ry > dB - 30) break;
      add(dL - 10, ry, dL, ry, 0.5, 0.08);
      add(dL - 10, ry, dL - 10, ry + 16, 0.3, 0.05);
      add(dL - 10, ry + 16, dL, ry + 16, 0.3, 0.05);
    }
    // Entrance
    addD(dL + 80, dB, dL + 80, dB - 70, 1.2, 0.20);
    addD(dL + 190, dB, dL + 190, dB - 70, 1.2, 0.20);
    addD(dL + 75, dB - 70, dL + 195, dB - 70, 1.0, 0.18);
    // Structural accents
    for (let i = 0; i < 3; i++) {
      const x = dL + 50 + i * 85;
      if (x > dR - 30) break;
      addD(x, dT + 10, x, dB, 0.8, 0.12);
    }

    // ═══════════════════════════════════════
    // BUILDING E — Background, far right
    // ═══════════════════════════════════════
    addD(1640, 780, 1640, 310, 1.2, 0.14);
    addD(1840, 780, 1840, 360, 1.2, 0.14);
    add(1640, 310, 1840, 360, 1.0, 0.12);
    addO(1635, 305, 1845, 355, 0.8, 0.10);
    // Floors
    for (let i = 0; i < 10; i++) {
      const y = 370 + i * 42;
      if (y > 770) break;
      add(1640, y, 1840, y + 2, i % 3 === 0 ? 0.6 : 0.25, i % 3 === 0 ? 0.10 : 0.04);
    }
    // Mullions
    for (let i = 0; i < 5; i++) {
      add(1665 + i * 40, 315 + i * 5, 1665 + i * 40, 780, 0.4, 0.06);
    }
    // Depth
    toVP(1840, 360, 0.12, 0.5, 0.06);
    toVP(1840, 780, 0.10, 0.4, 0.05);

    // ═══════════════════════════════════════
    // GROUND PLANE
    // ═══════════════════════════════════════
    addD(0, 780, 1920, 780, 2.0, 0.25);
    add(0, 786, 1920, 786, 0.5, 0.06);
    // Perspective ground
    for (let i = 0; i < 14; i++) {
      const x = 50 + i * 140;
      toVP(x, 780, 0.35, 0.3, 0.04);
    }
    // Pavement grid
    for (let i = 0; i < 5; i++) {
      add(30, 790 + i * 15, 1890, 790 + i * 15, 0.2, 0.025);
    }
    // Ground texture/hatching
    for (let i = 0; i < 40; i++) {
      const x = 30 + rand() * 1860;
      const len = 10 + rand() * 50;
      const angle = rand() * 0.3 - 0.15;
      add(x, 782, x + len * Math.cos(angle), 782 + len * Math.sin(angle) + 5 + rand() * 15, 0.15, 0.025);
    }

    // ═══════════════════════════════════════
    // BRIDGES / CONNECTIONS
    // ═══════════════════════════════════════
    // Bridge B → C
    addD(bR, 380, cL, 380, 1.0, 0.16);
    addD(bR, 395, cL, 395, 1.0, 0.16);
    add(bR, 380, bR, 395, 0.5, 0.08);
    add(cL, 380, cL, 395, 0.5, 0.08);
    // Bridge railing
    add(bR + 3, 375, cL - 3, 375, 0.3, 0.05);
    for (let i = 0; i < 5; i++) {
      const bx = bR + 5 + i * ((cL - bR - 10) / 4);
      add(bx, 375, bx, 380, 0.2, 0.04);
    }

    // Bridge A → B upper
    add(aR, 450, bL, 450, 0.7, 0.10);
    add(aR, 460, bL, 460, 0.7, 0.10);

    // ═══════════════════════════════════════
    // PEOPLE — more figures
    // ═══════════════════════════════════════
    const people: [number, number][] = [[90, 32], [180, 28], [350, 30], [550, 34], [750, 26], [950, 30], [1150, 28], [1280, 32], [1450, 27], [1550, 30]];
    for (const [px, ph] of people) {
      add(px, 780, px, 780 - ph, 0.9, 0.16);
      add(px - 4, 780 - ph + 3, px + 4, 780 - ph + 3, 0.6, 0.12);
      add(px, 780 - ph, px, 780 - ph - 4, 0.5, 0.10);
      // Walking stance
      if (rand() > 0.5) {
        add(px, 780, px - 3, 780 - ph * 0.5, 0.3, 0.06);
        add(px, 780, px + 3, 780 - ph * 0.5, 0.3, 0.06);
      }
    }

    // ═══════════════════════════════════════
    // TREES — more detailed
    // ═══════════════════════════════════════
    const trees = [30, 1650, 1730, 1820, 1880];
    for (const tx of trees) {
      add(tx, 780, tx, 720, 0.7, 0.10);
      add(tx - 1, 780, tx - 1, 725, 0.3, 0.04);
      for (let j = 0; j < 10; j++) {
        const a = -Math.PI * 0.85 + j * (Math.PI * 1.7 / 9);
        const r = 12 + rand() * 22;
        add(tx, 720, tx + Math.cos(a) * r, 720 + Math.sin(a) * r - 8, 0.3, 0.06);
      }
    }

    // ═══════════════════════════════════════
    // STAIRCASE / LANDSCAPE STEPS (left foreground)
    // ═══════════════════════════════════════
    for (let i = 0; i < 6; i++) {
      const sy = 780 + i * 8;
      add(0, sy, 200 - i * 15, sy, 0.4, 0.06);
      add(200 - i * 15, sy, 200 - i * 15, sy + 8, 0.3, 0.05);
    }

    // ═══════════════════════════════════════
    // RANDOM OVERSHOOTS & TEXTURE
    // ═══════════════════════════════════════
    for (let i = 0; i < 60; i++) {
      const x = 50 + rand() * 1820;
      const y = 100 + rand() * 650;
      const len = 15 + rand() * 80;
      const isH = rand() > 0.45;
      add(x, y, x + (isH ? len : 0), y + (isH ? 0 : len), 0.15, 0.02);
    }

    // Shadow lines under cantilevers
    for (let i = 0; i < 8; i++) {
      const sx = cL + 30 + i * 50;
      if (sx > cR - 30) break;
      add(sx, cM + 1, sx + 25, cM + 12, 0.2, 0.03);
    }
    for (let i = 0; i < 6; i++) {
      const sx = cL + 35 + i * 50;
      if (sx > cR - 35) break;
      add(sx, cM + 192, sx + 20, cM + 200, 0.2, 0.03);
    }

    // ═══════════════════════════════════════
    // SHUFFLE & ASSIGN TIMING (~5 seconds)
    // ═══════════════════════════════════════
    const totalTime = 5.5;
    const indices = Array.from({ length: result.length }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    for (let pos = 0; pos < indices.length; pos++) {
      const idx = indices[pos];
      result[idx].delay = (pos / indices.length) * totalTime;
      const len = Math.sqrt((result[idx].x2 - result[idx].x1) ** 2 + (result[idx].y2 - result[idx].y1) ** 2);
      result[idx].speed = 0.25 + (len / 1800) * 1.0;
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
