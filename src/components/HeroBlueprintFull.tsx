'use client';

import { useEffect, useRef } from 'react';

/**
 * Full-viewport architectural floor plan for the hero.
 * Bold black lines drawn slowly — like watching an architect sketch.
 * Total animation timeline: ~14 seconds.
 */
export default function HeroBlueprintFull() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    // Small initial pause before the "pen touches paper"
    const timer = setTimeout(() => svg.classList.add('bp-active'), 400);
    return () => clearTimeout(timer);
  }, []);

  // Bold, visible strokes — black ink on paper
  const ink = 'rgba(15,15,13,0.18)';
  const inkMed = 'rgba(15,15,13,0.13)';
  const inkFine = 'rgba(15,15,13,0.08)';
  const inkText = 'rgba(15,15,13,0.14)';

  // ── HELPERS ──
  const L = (x1: number, y1: number, x2: number, y2: number, delay: number, stroke = ink, width = 1, dash?: string) => {
    const len = Math.ceil(Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2));
    return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={width} strokeDasharray={dash} className="bp-line" style={{ '--bp-len': len, '--bp-delay': `${delay}s` } as React.CSSProperties} />;
  };

  const P = (d: string, len: number, delay: number, stroke = ink, width = 1, speed?: number) => (
    <path d={d} fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="square" className="bp-line" style={{ '--bp-len': len, '--bp-delay': `${delay}s`, ...(speed ? { '--bp-draw-speed': `${speed}s` } : {}) } as React.CSSProperties} />
  );

  const R = (x: number, y: number, w: number, h: number, delay: number, stroke = ink, width = 1) => (
    <rect x={x} y={y} width={w} height={h} fill="none" stroke={stroke} strokeWidth={width} className="bp-line" style={{ '--bp-len': Math.ceil(2 * (w + h)), '--bp-delay': `${delay}s` } as React.CSSProperties} />
  );

  const C = (cx: number, cy: number, r: number, delay: number, stroke = ink, width = 1) => (
    <circle cx={cx} cy={cy} r={r} fill="none" stroke={stroke} strokeWidth={width} className="bp-circle" style={{ '--bp-delay': `${delay}s` } as React.CSSProperties} />
  );

  const T = (x: number, y: number, text: string, delay: number, size = 11, anchor: 'start' | 'middle' | 'end' = 'middle', ls = 2) => (
    <text x={x} y={y} textAnchor={anchor} fill={inkText} fontSize={size} fontFamily="Barlow, sans-serif" letterSpacing={ls} className="bp-text" style={{ '--bp-delay': `${delay}s` } as React.CSSProperties}>{text}</text>
  );

  // ── FLOOR PLAN LAYOUT ──
  const ox = 300;
  const oy = 200;

  return (
    <svg
      ref={ref}
      className="blueprint-svg"
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    >

      {/* ════════ PHASE 1: DRAWING FRAME (0–1.5s) ════════ */}
      {R(30, 30, 1860, 1020, 0, inkMed, 0.8)}
      {R(50, 50, 1820, 980, 0.5, inkFine, 0.5)}

      {/* ════════ PHASE 2: OUTER WALLS — the main event (1.0–4.0s) ════════ */}
      {/* Outer contour — slow, deliberate, thick line */}
      {P(`M ${ox} ${oy} L ${ox + 900} ${oy} L ${ox + 900} ${oy + 350} L ${ox + 550} ${oy + 350} L ${ox + 550} ${oy + 700} L ${ox} ${oy + 700} Z`, 3500, 1.0, ink, 2, 4.5)}
      {/* Inner contour — follows slightly behind */}
      {P(`M ${ox + 12} ${oy + 12} L ${ox + 888} ${oy + 12} L ${ox + 888} ${oy + 338} L ${ox + 538} ${oy + 338} L ${ox + 538} ${oy + 688} L ${ox + 12} ${oy + 688} Z`, 3400, 2.0, ink, 1.5, 4.0)}

      {/* ════════ PHASE 3: INTERIOR WALLS (4.0–6.5s) ════════ */}
      {/* Kitchen / Living divider */}
      {L(ox + 350, oy + 12, ox + 350, oy + 250, 4.0, ink, 1.5)}
      {L(ox + 362, oy + 12, ox + 362, oy + 250, 4.3, ink, 1.5)}

      {/* Hallway wall horizontal */}
      {L(ox + 12, oy + 350, ox + 538, oy + 350, 4.5, ink, 1.5)}
      {L(ox + 12, oy + 362, ox + 538, oy + 362, 4.8, ink, 1.5)}

      {/* Bedroom 1 / Bedroom 2 divider */}
      {L(ox + 270, oy + 362, ox + 270, oy + 688, 5.0, ink, 1.5)}
      {L(ox + 282, oy + 362, ox + 282, oy + 688, 5.3, ink, 1.5)}

      {/* Bathroom wall */}
      {L(ox + 350, oy + 500, ox + 538, oy + 500, 5.5, ink, 1.5)}
      {L(ox + 350, oy + 512, ox + 538, oy + 512, 5.7, ink, 1.5)}

      {/* WC / bathroom partition */}
      {L(ox + 350, oy + 362, ox + 350, oy + 500, 5.8, ink, 1.5)}
      {L(ox + 362, oy + 362, ox + 362, oy + 500, 6.0, ink, 1.5)}

      {/* Study / guest room divider */}
      {L(ox + 650, oy + 12, ox + 650, oy + 338, 6.0, ink, 1.5)}
      {L(ox + 662, oy + 12, ox + 662, oy + 338, 6.2, ink, 1.5)}

      {/* ════════ PHASE 4: DOORS (6.5–8.0s) ════════ */}
      {/* Front door */}
      {R(ox + 130, oy - 5, 50, 17, 6.5, ink, 1.2)}
      <path d={`M ${ox + 130} ${oy + 12} A 50 50 0 0 0 ${ox + 180} ${oy + 62}`} fill="none" stroke={inkMed} strokeWidth={0.8} className="bp-circle" style={{ '--bp-delay': '6.8s' } as React.CSSProperties} />

      {/* Living room to hallway */}
      <path d={`M ${ox + 200} ${oy + 350} A 40 40 0 0 1 ${ox + 200} ${oy + 310}`} fill="none" stroke={inkMed} strokeWidth={0.8} className="bp-circle" style={{ '--bp-delay': '7.0s' } as React.CSSProperties} />

      {/* Kitchen to hallway */}
      <path d={`M ${ox + 430} ${oy + 350} A 40 40 0 0 0 ${ox + 430} ${oy + 310}`} fill="none" stroke={inkMed} strokeWidth={0.8} className="bp-circle" style={{ '--bp-delay': '7.2s' } as React.CSSProperties} />

      {/* Bedroom 1 door */}
      <path d={`M ${ox + 100} ${oy + 362} A 38 38 0 0 0 ${ox + 100} ${oy + 400}`} fill="none" stroke={inkMed} strokeWidth={0.8} className="bp-circle" style={{ '--bp-delay': '7.4s' } as React.CSSProperties} />

      {/* Bedroom 2 door */}
      <path d={`M ${ox + 320} ${oy + 362} A 38 38 0 0 0 ${ox + 320} ${oy + 400}`} fill="none" stroke={inkMed} strokeWidth={0.8} className="bp-circle" style={{ '--bp-delay': '7.6s' } as React.CSSProperties} />

      {/* Bathroom door */}
      <path d={`M ${ox + 400} ${oy + 512} A 35 35 0 0 1 ${ox + 435} ${oy + 512}`} fill="none" stroke={inkMed} strokeWidth={0.8} className="bp-circle" style={{ '--bp-delay': '7.8s' } as React.CSSProperties} />

      {/* Study door */}
      <path d={`M ${ox + 650} ${oy + 180} A 38 38 0 0 1 ${ox + 612} ${oy + 180}`} fill="none" stroke={inkMed} strokeWidth={0.8} className="bp-circle" style={{ '--bp-delay': '8.0s' } as React.CSSProperties} />

      {/* ════════ PHASE 5: WINDOWS (7.5–9.0s) ════════ */}
      {/* Living room — south wall */}
      {[80, 200].map((xo, i) => (
        <g key={`wlr-${i}`}>
          {L(ox + xo, oy + 688, ox + xo + 80, oy + 688, 7.5 + i * 0.4, inkMed, 2.5)}
          {L(ox + xo, oy + 700, ox + xo + 80, oy + 700, 7.7 + i * 0.4, inkMed, 0.6)}
          {L(ox + xo + 40, oy + 688, ox + xo + 40, oy + 700, 7.8 + i * 0.4, inkFine, 0.5)}
        </g>
      ))}

      {/* Kitchen — north */}
      {L(ox + 400, oy, ox + 500, oy, 8.0, inkMed, 2.5)}
      {L(ox + 400, oy + 12, ox + 500, oy + 12, 8.2, inkMed, 0.6)}

      {/* Study — east */}
      {L(ox + 900, oy + 80, ox + 900, oy + 180, 8.3, inkMed, 2.5)}
      {L(ox + 888, oy + 80, ox + 888, oy + 180, 8.5, inkMed, 0.6)}

      {/* Bedroom 1 — west */}
      {L(ox, oy + 450, ox, oy + 550, 8.5, inkMed, 2.5)}
      {L(ox + 12, oy + 450, ox + 12, oy + 550, 8.7, inkMed, 0.6)}

      {/* Bedroom 2 — south */}
      {L(ox + 330, oy + 688, ox + 460, oy + 688, 8.7, inkMed, 2.5)}
      {L(ox + 330, oy + 700, ox + 460, oy + 700, 8.9, inkMed, 0.6)}

      {/* ════════ PHASE 6: STAIRS (8.5–9.5s) ════════ */}
      {Array.from({ length: 10 }, (_, i) => (
        L(ox + 400, oy + 370 + i * 12, ox + 530, oy + 370 + i * 12, 8.5 + i * 0.1, inkFine, 0.6)
      ))}
      {L(ox + 465, oy + 370, ox + 465, oy + 490, 9.2, inkMed, 0.8)}
      <polygon
        points={`${ox + 460},${oy + 375} ${ox + 465},${oy + 365} ${ox + 470},${oy + 375}`}
        fill="none" stroke={inkMed} strokeWidth={0.6}
        className="bp-circle"
        style={{ '--bp-delay': '9.5s' } as React.CSSProperties}
      />

      {/* ════════ PHASE 7: FURNITURE (9.0–11.0s) ════════ */}
      {/* Living room — sofa */}
      {R(ox + 40, oy + 420, 120, 45, 9.0, inkFine, 0.6)}
      {R(ox + 40, oy + 465, 120, 12, 9.3, inkFine, 0.4)}
      {/* Coffee table */}
      {R(ox + 70, oy + 500, 60, 35, 9.5, inkFine, 0.5)}

      {/* Dining table + chairs */}
      {R(ox + 50, oy + 120, 80, 120, 9.2, inkFine, 0.6)}
      {[0, 1, 2, 3].map((i) => (
        R(ox + 30, oy + 130 + i * 28, 15, 20, 9.6 + i * 0.15, inkFine, 0.4)
      ))}
      {[0, 1, 2, 3].map((i) => (
        R(ox + 135, oy + 130 + i * 28, 15, 20, 9.8 + i * 0.15, inkFine, 0.4)
      ))}

      {/* Kitchen counter */}
      {R(ox + 370, oy + 20, 160, 40, 9.4, inkFine, 0.6)}
      {/* Sinks */}
      {C(ox + 420, oy + 40, 10, 9.8, inkFine, 0.5)}
      {C(ox + 450, oy + 40, 10, 9.9, inkFine, 0.5)}
      {/* Stove */}
      {R(ox + 480, oy + 25, 40, 30, 9.7, inkFine, 0.5)}
      {[0, 1, 2, 3].map((i) => (
        C(ox + 490 + (i % 2) * 20, oy + 35 + Math.floor(i / 2) * 15, 4, 10.0 + i * 0.1, inkFine, 0.4)
      ))}

      {/* Bed — bedroom 1 */}
      {R(ox + 40, oy + 430, 100, 140, 10.0, inkFine, 0.6)}
      {L(ox + 40, oy + 440, ox + 140, oy + 440, 10.2, inkFine, 0.3)}

      {/* Bed — bedroom 2 */}
      {R(ox + 300, oy + 430, 100, 140, 10.2, inkFine, 0.6)}
      {L(ox + 300, oy + 440, ox + 400, oy + 440, 10.4, inkFine, 0.3)}

      {/* Bathroom — tub */}
      {R(ox + 370, oy + 530, 60, 140, 10.4, inkFine, 0.6)}
      {/* Toilet */}
      {C(ox + 500, oy + 560, 12, 10.6, inkFine, 0.5)}
      {R(ox + 488, oy + 570, 24, 18, 10.7, inkFine, 0.4)}
      {/* Washbasin */}
      {R(ox + 460, oy + 520, 20, 16, 10.6, inkFine, 0.4)}

      {/* Study desk */}
      {R(ox + 680, oy + 40, 180, 60, 10.0, inkFine, 0.6)}
      {C(ox + 770, oy + 130, 14, 10.3, inkFine, 0.5)}

      {/* Guest room bed */}
      {R(ox + 700, oy + 200, 80, 120, 10.4, inkFine, 0.6)}
      {L(ox + 700, oy + 210, ox + 780, oy + 210, 10.6, inkFine, 0.3)}

      {/* ════════ PHASE 8: ROOM LABELS (10.5–12.0s) ════════ */}
      {T(ox + 170, oy + 175, 'OBÝVACÍ POKOJ', 10.5, 12, 'middle', 3)}
      {T(ox + 170, oy + 195, '32.4 m²', 10.8, 9, 'middle', 1)}

      {T(ox + 500, oy + 175, 'KUCHYNĚ', 10.7, 12, 'middle', 3)}
      {T(ox + 500, oy + 195, '18.6 m²', 11.0, 9, 'middle', 1)}

      {T(ox + 135, oy + 560, 'LOŽNICE', 11.0, 11, 'middle', 3)}
      {T(ox + 135, oy + 578, '16.8 m²', 11.2, 8, 'middle', 1)}

      {T(ox + 400, oy + 560, 'DĚTSKÝ POKOJ', 11.2, 10, 'middle', 3)}
      {T(ox + 400, oy + 578, '14.2 m²', 11.4, 8, 'middle', 1)}

      {T(ox + 460, oy + 660, 'KOUPELNA', 11.3, 9, 'middle', 3)}
      {T(ox + 460, oy + 675, '8.4 m²', 11.5, 7, 'middle', 1)}

      {T(ox + 770, oy + 100, 'PRACOVNA', 11.0, 11, 'middle', 3)}
      {T(ox + 770, oy + 118, '12.1 m²', 11.2, 8, 'middle', 1)}

      {T(ox + 770, oy + 280, 'POKOJ PRO HOSTY', 11.2, 10, 'middle', 3)}
      {T(ox + 770, oy + 298, '11.3 m²', 11.4, 8, 'middle', 1)}

      {T(ox + 465, oy + 440, 'CHODBA', 11.0, 9, 'middle', 2)}

      {/* ════════ PHASE 9: DIMENSIONS (11.0–13.0s) ════════ */}
      {/* Total width — top */}
      {L(ox, oy - 60, ox + 900, oy - 60, 11.0, inkMed, 0.7)}
      {L(ox, oy - 68, ox, oy - 52, 11.2, inkMed, 0.7)}
      {L(ox + 900, oy - 68, ox + 900, oy - 52, 11.3, inkMed, 0.7)}
      {T(ox + 450, oy - 68, '18 000', 11.8, 10)}
      {L(ox, oy - 5, ox, oy - 60, 11.0, inkFine, 0.4, '3 5')}
      {L(ox + 900, oy - 5, ox + 900, oy - 60, 11.1, inkFine, 0.4, '3 5')}

      {/* Lower wing width */}
      {L(ox, oy + 730, ox + 550, oy + 730, 11.4, inkMed, 0.7)}
      {L(ox, oy + 722, ox, oy + 738, 11.5, inkMed, 0.7)}
      {L(ox + 550, oy + 722, ox + 550, oy + 738, 11.6, inkMed, 0.7)}
      {T(ox + 275, oy + 748, '11 000', 12.0, 9)}

      {/* Total height — left */}
      {L(ox - 60, oy, ox - 60, oy + 700, 11.5, inkMed, 0.7)}
      {L(ox - 68, oy, ox - 52, oy, 11.6, inkMed, 0.7)}
      {L(ox - 68, oy + 700, ox - 52, oy + 700, 11.7, inkMed, 0.7)}
      {T(ox - 75, oy + 350, '14 000', 12.2, 10, 'middle', 1)}
      {L(ox - 5, oy, ox - 60, oy, 11.4, inkFine, 0.4, '3 5')}
      {L(ox - 5, oy + 700, ox - 60, oy + 700, 11.5, inkFine, 0.4, '3 5')}

      {/* Right side height */}
      {L(ox + 940, oy, ox + 940, oy + 350, 11.8, inkMed, 0.7)}
      {L(ox + 932, oy, ox + 948, oy, 11.9, inkMed, 0.7)}
      {L(ox + 932, oy + 350, ox + 948, oy + 350, 12.0, inkMed, 0.7)}
      {T(ox + 960, oy + 175, '7 000', 12.4, 9, 'start', 1)}

      {/* ════════ PHASE 10: AXES + ANNOTATIONS (12.0–14.0s) ════════ */}
      {/* Vertical axes */}
      {[ox, ox + 270, ox + 350, ox + 550, ox + 650, ox + 900].map((x, i) => (
        <g key={`va-${i}`}>
          {L(x, oy - 90, x, oy - 40, 12.0 + i * 0.15, inkFine, 0.5)}
          {C(x, oy - 100, 12, 12.2 + i * 0.15, inkMed, 0.6)}
          {T(x, oy - 96, String.fromCharCode(65 + i), 12.5 + i * 0.15, 9, 'middle', 0)}
        </g>
      ))}

      {/* Horizontal axes */}
      {[oy, oy + 350, oy + 500, oy + 700].map((y, i) => (
        <g key={`ha-${i}`}>
          {L(ox - 90, y, ox - 40, y, 12.0 + i * 0.15, inkFine, 0.5)}
          {C(ox - 100, y, 12, 12.2 + i * 0.15, inkMed, 0.6)}
          {T(ox - 100, y + 4, String(i + 1), 12.5 + i * 0.15, 9, 'middle', 0)}
        </g>
      ))}

      {/* North arrow */}
      {L(1680, 200, 1680, 110, 12.5, ink, 1.2)}
      <polygon
        points="1674,118 1680,95 1686,118"
        fill="none" stroke={ink} strokeWidth={0.8}
        className="bp-circle"
        style={{ '--bp-delay': '12.8s' } as React.CSSProperties}
      />
      {T(1680, 88, 'S', 13.2, 14, 'middle', 0)}
      {C(1680, 200, 35, 12.6, inkMed, 0.7)}
      {L(1645, 200, 1715, 200, 12.7, inkFine, 0.4)}
      {L(1680, 165, 1680, 235, 12.7, inkFine, 0.4)}

      {/* Section markers */}
      {C(ox + 450, oy + 740, 16, 13.0, inkMed, 0.8)}
      {T(ox + 450, oy + 744, 'A-A\'', 13.3, 8, 'middle', 1)}
      {L(ox + 450, oy + 724, ox + 450, oy + 705, 13.0, inkMed, 0.8)}

      {C(ox - 30, oy + 350, 16, 13.2, inkMed, 0.8)}
      {T(ox - 30, oy + 354, 'B-B\'', 13.5, 8, 'middle', 1)}
      {L(ox - 30, oy + 334, ox - 30, oy + 315, 13.2, inkMed, 0.8)}

      {/* ════════ PHASE 11: TITLE BLOCK (13.0–14.5s) ════════ */}
      {R(1380, 860, 470, 160, 13.0, inkMed, 1)}
      {L(1380, 900, 1850, 900, 13.3, inkMed, 0.6)}
      {L(1380, 940, 1850, 940, 13.5, inkMed, 0.6)}
      {L(1380, 975, 1850, 975, 13.6, inkFine, 0.4)}
      {L(1615, 900, 1615, 1020, 13.7, inkMed, 0.6)}

      {T(1615, 888, 'KUBA & KUBOVÁ ARCHITEKTI', 13.8, 13, 'middle', 4)}
      {T(1615, 928, 'PŮDORYS 1.NP — RODINNÝ DŮM', 14.0, 10, 'middle', 3)}
      {T(1497, 963, 'M 1:100', 14.1, 9, 'middle', 2)}
      {T(1732, 963, 'DATUM: 03/2024', 14.2, 9, 'middle', 1)}
      {T(1497, 1000, 'Č.V.: A-01', 14.3, 9, 'middle', 2)}
      {T(1732, 1000, 'STUPEŇ: DPS', 14.4, 9, 'middle', 1)}

      {/* Scale bar */}
      {L(1400, 800, 1700, 800, 13.5, inkMed, 0.8)}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        L(1400 + i * 50, 793, 1400 + i * 50, 807, 13.7 + i * 0.08, inkMed, 0.6)
      ))}
      {T(1400, 820, '0', 14.0, 8, 'middle', 0)}
      {T(1550, 820, '5m', 14.1, 8, 'middle', 1)}
      {T(1700, 820, '10m', 14.2, 8, 'middle', 1)}

      {/* Elevation note */}
      {T(ox + 100, oy + 750, '±0,000 = 245,30 m n. m.  B.p.v.', 13.8, 8, 'start', 1)}
      {T(1400, 770, 'PŮDORYS 1. NADZEMNÍHO PODLAŽÍ', 13.5, 9, 'start', 2)}
      {T(1400, 788, 'MĚŘÍTKO  1 : 100', 13.7, 8, 'start', 2)}

    </svg>
  );
}
