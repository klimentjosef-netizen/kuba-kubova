'use client';

import { useEffect, useRef, useMemo } from 'react';

/**
 * Full-viewport hand-drawn architectural floor plan.
 * Lines have gentle wobble (SVG path noise) and appear in
 * semi-random order — like watching an architect sketch.
 */
export default function HeroBlueprintFull() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const timer = setTimeout(() => svg.classList.add('bp-active'), 600);
    return () => clearTimeout(timer);
  }, []);

  // Stroke colors
  const ink = 'rgba(15,15,13,0.20)';
  const inkMed = 'rgba(15,15,13,0.14)';
  const inkFine = 'rgba(15,15,13,0.09)';
  const inkText = 'rgba(15,15,13,0.15)';

  // ── HAND-DRAWN LINE: adds gentle wobble to straight lines ──
  const handLine = (x1: number, y1: number, x2: number, y2: number, seed: number) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    const steps = Math.max(3, Math.floor(len / 40));
    const points: string[] = [`M ${x1} ${y1}`];

    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const wobble = Math.sin(seed * 7 + i * 3.7) * 1.2 + Math.cos(seed * 13 + i * 2.3) * 0.8;
      // Perpendicular offset
      const nx = -dy / len * wobble;
      const ny = dx / len * wobble;
      const px = x1 + dx * t + nx;
      const py = y1 + dy * t + ny;
      points.push(`L ${px.toFixed(1)} ${py.toFixed(1)}`);
    }

    return { d: points.join(' '), len: Math.ceil(len * 1.05) };
  };

  // ── HAND-DRAWN RECTANGLE ──
  const handRect = (x: number, y: number, w: number, h: number, seed: number) => {
    const overshoot = 2; // lines slightly overshoot corners
    const sides = [
      handLine(x - overshoot * 0.3, y, x + w + overshoot * 0.5, y, seed),
      handLine(x + w, y - overshoot * 0.3, x + w, y + h + overshoot * 0.5, seed + 1),
      handLine(x + w + overshoot * 0.3, y + h, x - overshoot * 0.5, y + h, seed + 2),
      handLine(x, y + h + overshoot * 0.3, x, y - overshoot * 0.5, seed + 3),
    ];
    return {
      d: sides.map((s) => s.d).join(' '),
      len: sides.reduce((sum, s) => sum + s.len, 0),
    };
  };

  // ── HELPER COMPONENTS ──
  const HL = (x1: number, y1: number, x2: number, y2: number, delay: number, stroke = ink, width = 1, seed = 0, speed?: number) => {
    const { d, len } = handLine(x1, y1, x2, y2, seed || delay * 17);
    return <path d={d} fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" className="bp-line" style={{ '--bp-len': len, '--bp-delay': `${delay}s`, ...(speed ? { '--bp-draw-speed': `${speed}s` } : {}) } as React.CSSProperties} />;
  };

  const HR = (x: number, y: number, w: number, h: number, delay: number, stroke = ink, width = 1, seed = 0, speed?: number) => {
    const { d, len } = handRect(x, y, w, h, seed || delay * 13);
    return <path d={d} fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" className="bp-line" style={{ '--bp-len': len, '--bp-delay': `${delay}s`, ...(speed ? { '--bp-draw-speed': `${speed}s` } : {}) } as React.CSSProperties} />;
  };

  const C = (cx: number, cy: number, r: number, delay: number, stroke = ink, width = 1) => (
    <circle cx={cx} cy={cy} r={r} fill="none" stroke={stroke} strokeWidth={width} className="bp-circle" style={{ '--bp-delay': `${delay}s` } as React.CSSProperties} />
  );

  const T = (x: number, y: number, text: string, delay: number, size = 11, anchor: 'start' | 'middle' | 'end' = 'middle', ls = 2) => (
    <text x={x} y={y} textAnchor={anchor} fill={inkText} fontSize={size} fontFamily="Barlow, sans-serif" letterSpacing={ls} className="bp-text" style={{ '--bp-delay': `${delay}s` } as React.CSSProperties}>{text}</text>
  );

  // ── SHUFFLED TIMELINE ──
  // Instead of logical order, create all sketch elements then shuffle their delays
  // We'll use a seeded shuffle to keep it consistent across renders

  const ox = 300;
  const oy = 200;

  // Pre-compute random delays: spread ~50 draw events across 16 seconds
  // Group them loosely: structure first (0-6s), details (4-10s), labels (8-14s), annotations (11-16s)
  // But within each group, order is randomized
  const shuffle = (arr: number[], seed: number) => {
    const result = [...arr];
    let s = seed;
    for (let i = result.length - 1; i > 0; i--) {
      s = (s * 16807 + 7) % 2147483647;
      const j = s % (i + 1);
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const structureDelays = useMemo(() => shuffle(
    Array.from({ length: 14 }, (_, i) => 0.5 + i * 0.45), 42
  ), []);

  const detailDelays = useMemo(() => shuffle(
    Array.from({ length: 16 }, (_, i) => 5.0 + i * 0.35), 73
  ), []);

  const furnitureDelays = useMemo(() => shuffle(
    Array.from({ length: 20 }, (_, i) => 8.0 + i * 0.3), 91
  ), []);

  const labelDelays = useMemo(() => shuffle(
    Array.from({ length: 12 }, (_, i) => 11.0 + i * 0.35), 57
  ), []);

  let si = 0; // structure index
  let di = 0; // detail index
  let fi = 0; // furniture index
  let li = 0; // label index

  const sd = () => structureDelays[si++ % structureDelays.length];
  const dd = () => detailDelays[di++ % detailDelays.length];
  const fd = () => furnitureDelays[fi++ % furnitureDelays.length];
  const ld = () => labelDelays[li++ % labelDelays.length];

  return (
    <svg
      ref={ref}
      className="blueprint-svg"
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    >

      {/* ═══ STRUCTURE: walls, frame — random order within group ═══ */}

      {/* Drawing frame */}
      {HR(30, 30, 1860, 1020, sd(), inkMed, 0.6, 1, 5)}
      {HR(50, 50, 1820, 980, sd(), inkFine, 0.4, 2, 4)}

      {/* Outer walls — L-shape (split into segments for random order) */}
      {HL(ox, oy, ox + 900, oy, sd(), ink, 2, 10, 3.5)}
      {HL(ox + 900, oy, ox + 900, oy + 350, sd(), ink, 2, 11, 2.5)}
      {HL(ox + 900, oy + 350, ox + 550, oy + 350, sd(), ink, 2, 12, 2)}
      {HL(ox + 550, oy + 350, ox + 550, oy + 700, sd(), ink, 2, 13, 2.5)}
      {HL(ox + 550, oy + 700, ox, oy + 700, sd(), ink, 2, 14, 3)}
      {HL(ox, oy + 700, ox, oy, sd(), ink, 2, 15, 3.5)}

      {/* Inner wall contour */}
      {HL(ox + 12, oy + 12, ox + 888, oy + 12, sd(), ink, 1.2, 20, 3)}
      {HL(ox + 888, oy + 12, ox + 888, oy + 338, sd(), ink, 1.2, 21, 2)}
      {HL(ox + 888, oy + 338, ox + 538, oy + 338, sd(), ink, 1.2, 22, 2)}
      {HL(ox + 538, oy + 338, ox + 538, oy + 688, sd(), ink, 1.2, 23, 2.5)}
      {HL(ox + 538, oy + 688, ox + 12, oy + 688, sd(), ink, 1.2, 24, 3)}
      {HL(ox + 12, oy + 688, ox + 12, oy + 12, sd(), ink, 1.2, 25, 3)}

      {/* Interior walls — random order */}
      {HL(ox + 350, oy + 12, ox + 350, oy + 250, sd(), ink, 1.3, 30)}
      {HL(ox + 362, oy + 12, ox + 362, oy + 250, sd(), ink, 1.3, 31)}

      {/* ═══ DETAILS: partitions, doors, windows — random order ═══ */}

      {/* Hallway wall */}
      {HL(ox + 12, oy + 350, ox + 538, oy + 350, dd(), ink, 1.3, 40)}
      {HL(ox + 12, oy + 362, ox + 538, oy + 362, dd(), ink, 1.3, 41)}

      {/* Bedroom divider */}
      {HL(ox + 270, oy + 362, ox + 270, oy + 688, dd(), ink, 1.3, 42)}
      {HL(ox + 282, oy + 362, ox + 282, oy + 688, dd(), ink, 1.3, 43)}

      {/* Bathroom wall */}
      {HL(ox + 350, oy + 500, ox + 538, oy + 500, dd(), ink, 1.3, 44)}
      {HL(ox + 350, oy + 512, ox + 538, oy + 512, dd(), ink, 1.3, 45)}

      {/* WC partition */}
      {HL(ox + 350, oy + 362, ox + 350, oy + 500, dd(), ink, 1.3, 46)}
      {HL(ox + 362, oy + 362, ox + 362, oy + 500, dd(), ink, 1.3, 47)}

      {/* Study divider */}
      {HL(ox + 650, oy + 12, ox + 650, oy + 338, dd(), ink, 1.3, 48)}
      {HL(ox + 662, oy + 12, ox + 662, oy + 338, dd(), ink, 1.3, 49)}

      {/* Doors — arcs */}
      <path d={`M ${ox + 130} ${oy + 12} A 50 50 0 0 0 ${ox + 180} ${oy + 62}`} fill="none" stroke={inkMed} strokeWidth={0.7} className="bp-circle" style={{ '--bp-delay': `${dd()}s` } as React.CSSProperties} />
      <path d={`M ${ox + 200} ${oy + 350} A 40 40 0 0 1 ${ox + 200} ${oy + 310}`} fill="none" stroke={inkMed} strokeWidth={0.7} className="bp-circle" style={{ '--bp-delay': `${dd()}s` } as React.CSSProperties} />
      <path d={`M ${ox + 430} ${oy + 350} A 40 40 0 0 0 ${ox + 430} ${oy + 310}`} fill="none" stroke={inkMed} strokeWidth={0.7} className="bp-circle" style={{ '--bp-delay': `${dd()}s` } as React.CSSProperties} />
      <path d={`M ${ox + 100} ${oy + 362} A 38 38 0 0 0 ${ox + 100} ${oy + 400}`} fill="none" stroke={inkMed} strokeWidth={0.7} className="bp-circle" style={{ '--bp-delay': `${dd()}s` } as React.CSSProperties} />
      <path d={`M ${ox + 320} ${oy + 362} A 38 38 0 0 0 ${ox + 320} ${oy + 400}`} fill="none" stroke={inkMed} strokeWidth={0.7} className="bp-circle" style={{ '--bp-delay': `${dd()}s` } as React.CSSProperties} />
      <path d={`M ${ox + 650} ${oy + 180} A 38 38 0 0 1 ${ox + 612} ${oy + 180}`} fill="none" stroke={inkMed} strokeWidth={0.7} className="bp-circle" style={{ '--bp-delay': `${dd()}s` } as React.CSSProperties} />

      {/* ═══ FURNITURE + WINDOWS — random order ═══ */}

      {/* Windows */}
      {HL(ox + 80, oy + 690, ox + 160, oy + 690, fd(), inkMed, 2.2, 60)}
      {HL(ox + 200, oy + 690, ox + 280, oy + 690, fd(), inkMed, 2.2, 61)}
      {HL(ox + 400, oy + 2, ox + 500, oy + 2, fd(), inkMed, 2.2, 62)}
      {HL(ox + 898, oy + 80, ox + 898, oy + 180, fd(), inkMed, 2.2, 63)}
      {HL(ox + 2, oy + 450, ox + 2, oy + 550, fd(), inkMed, 2.2, 64)}
      {HL(ox + 330, oy + 690, ox + 460, oy + 690, fd(), inkMed, 2.2, 65)}

      {/* Sofa */}
      {HR(ox + 40, oy + 420, 120, 45, fd(), inkFine, 0.6, 70)}
      {HR(ox + 40, oy + 465, 120, 12, fd(), inkFine, 0.4, 71)}
      {HR(ox + 70, oy + 500, 60, 35, fd(), inkFine, 0.5, 72)}

      {/* Dining table + chairs */}
      {HR(ox + 50, oy + 120, 80, 120, fd(), inkFine, 0.6, 73)}
      {HR(ox + 30, oy + 130, 15, 20, fd(), inkFine, 0.4, 74)}
      {HR(ox + 30, oy + 186, 15, 20, fd(), inkFine, 0.4, 75)}
      {HR(ox + 135, oy + 130, 15, 20, fd(), inkFine, 0.4, 76)}
      {HR(ox + 135, oy + 186, 15, 20, fd(), inkFine, 0.4, 77)}

      {/* Kitchen counter */}
      {HR(ox + 370, oy + 20, 160, 40, fd(), inkFine, 0.6, 78)}
      {C(ox + 420, oy + 40, 10, fd(), inkFine, 0.5)}
      {C(ox + 450, oy + 40, 10, fd(), inkFine, 0.5)}

      {/* Beds */}
      {HR(ox + 40, oy + 430, 100, 140, fd(), inkFine, 0.6, 80)}
      {HR(ox + 300, oy + 430, 100, 140, fd(), inkFine, 0.6, 81)}

      {/* Bathroom */}
      {HR(ox + 370, oy + 530, 60, 140, fd(), inkFine, 0.6, 82)}
      {C(ox + 500, oy + 560, 12, fd(), inkFine, 0.5)}

      {/* Study desk */}
      {HR(ox + 680, oy + 40, 180, 60, fd(), inkFine, 0.6, 83)}
      {C(ox + 770, oy + 130, 14, fd(), inkFine, 0.5)}

      {/* Guest bed */}
      {HR(ox + 700, oy + 200, 80, 120, fd(), inkFine, 0.6, 84)}

      {/* Stairs */}
      {Array.from({ length: 8 }, (_, i) => (
        HL(ox + 400, oy + 370 + i * 15, ox + 530, oy + 370 + i * 15, fd(), inkFine, 0.5, 90 + i)
      ))}

      {/* ═══ LABELS — random order ═══ */}
      {T(ox + 170, oy + 175, 'OBÝVACÍ POKOJ', ld(), 12, 'middle', 3)}
      {T(ox + 170, oy + 195, '32.4 m²', ld(), 9, 'middle', 1)}
      {T(ox + 500, oy + 175, 'KUCHYNĚ', ld(), 12, 'middle', 3)}
      {T(ox + 135, oy + 560, 'LOŽNICE', ld(), 11, 'middle', 3)}
      {T(ox + 400, oy + 560, 'DĚTSKÝ POKOJ', ld(), 10, 'middle', 3)}
      {T(ox + 460, oy + 660, 'KOUPELNA', ld(), 9, 'middle', 3)}
      {T(ox + 770, oy + 100, 'PRACOVNA', ld(), 11, 'middle', 3)}
      {T(ox + 770, oy + 280, 'POKOJ PRO HOSTY', ld(), 10, 'middle', 3)}
      {T(ox + 465, oy + 435, 'CHODBA', ld(), 9, 'middle', 2)}

      {/* Dimensions */}
      {HL(ox, oy - 55, ox + 900, oy - 55, ld(), inkMed, 0.6, 100)}
      {T(ox + 450, oy - 63, '18 000', ld(), 9)}
      {HL(ox - 55, oy, ox - 55, oy + 700, ld(), inkMed, 0.6, 101)}
      {T(ox - 70, oy + 350, '14 000', ld(), 9, 'middle', 1)}

      {/* ═══ ANNOTATIONS — last, also randomized ═══ */}

      {/* Axes */}
      {[ox, ox + 350, ox + 550, ox + 900].map((x, i) => (
        <g key={`va-${i}`}>
          {HL(x, oy - 85, x, oy - 40, 13.0 + i * 0.3, inkFine, 0.4, 110 + i)}
          {C(x, oy - 95, 11, 13.5 + i * 0.3, inkMed, 0.5)}
          {T(x, oy - 91, String.fromCharCode(65 + i), 14.0 + i * 0.2, 8, 'middle', 0)}
        </g>
      ))}

      {/* North arrow */}
      {HL(1680, 200, 1680, 115, 13.5, ink, 1, 120)}
      {T(1680, 90, 'S', 14.2, 13, 'middle', 0)}
      {C(1680, 200, 32, 13.8, inkMed, 0.6)}

      {/* Title block */}
      {HR(1380, 860, 470, 160, 14.0, inkMed, 0.8, 130, 3)}
      {HL(1380, 905, 1850, 905, 14.3, inkFine, 0.4, 131)}
      {HL(1380, 945, 1850, 945, 14.5, inkFine, 0.4, 132)}
      {T(1615, 892, 'KUBA & KUBOVÁ ARCHITEKTI', 14.8, 12, 'middle', 4)}
      {T(1615, 932, 'PŮDORYS 1.NP — RODINNÝ DŮM', 15.0, 9, 'middle', 3)}
      {T(1500, 968, 'M 1:100', 15.2, 8, 'middle', 2)}
      {T(1730, 968, '03/2024', 15.3, 8, 'middle', 1)}

      {/* Scale bar */}
      {HL(1400, 800, 1700, 800, 14.5, inkMed, 0.7, 140)}
      {T(1400, 818, '0', 15.0, 7, 'middle', 0)}
      {T(1550, 818, '5m', 15.1, 7, 'middle', 1)}
      {T(1700, 818, '10m', 15.2, 7, 'middle', 1)}

    </svg>
  );
}
