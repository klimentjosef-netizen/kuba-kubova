'use client';

import { useEffect, useRef } from 'react';

/**
 * Full-viewport architectural floor plan drawing for the hero.
 * Bold black lines, clearly visible — like watching an architect sketch.
 */
export default function HeroBlueprintFull() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    requestAnimationFrame(() => svg.classList.add('bp-active'));
  }, []);

  // Bold, visible strokes — black ink on paper
  const ink = 'rgba(15,15,13,0.18)';      // main walls
  const inkMed = 'rgba(15,15,13,0.13)';    // secondary lines
  const inkFine = 'rgba(15,15,13,0.08)';   // dimensions, grid
  const inkText = 'rgba(15,15,13,0.14)';   // text labels

  // ── HELPERS ──
  const L = (x1: number, y1: number, x2: number, y2: number, delay: number, stroke = ink, width = 1, dash?: string) => {
    const len = Math.ceil(Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2));
    return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={width} strokeDasharray={dash} className="bp-line" style={{ '--bp-len': len, '--bp-delay': `${delay}s` } as React.CSSProperties} />;
  };

  const P = (d: string, len: number, delay: number, stroke = ink, width = 1) => (
    <path d={d} fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="square" className="bp-line" style={{ '--bp-len': len, '--bp-delay': `${delay}s` } as React.CSSProperties} />
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
  // Main house: L-shaped plan, ~18m x 14m
  // Origin at (300, 200), scale: 1m ≈ 50px
  const ox = 300; // origin x
  const oy = 200; // origin y

  return (
    <svg
      ref={ref}
      className="blueprint-svg"
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    >

      {/* ════════ DRAWING FRAME ════════ */}
      {R(30, 30, 1860, 1020, 0, inkMed, 0.8)}
      {R(50, 50, 1820, 980, 0.1, inkFine, 0.5)}

      {/* ════════ MAIN OUTER WALLS ════════ */}
      {/* L-shaped floor plan — thick walls (double line) */}
      {/* Outer contour */}
      {P(`M ${ox} ${oy} L ${ox + 900} ${oy} L ${ox + 900} ${oy + 350} L ${ox + 550} ${oy + 350} L ${ox + 550} ${oy + 700} L ${ox} ${oy + 700} Z`, 3500, 0.2, ink, 2)}
      {/* Inner contour (wall thickness ~12px = ~24cm) */}
      {P(`M ${ox + 12} ${oy + 12} L ${ox + 888} ${oy + 12} L ${ox + 888} ${oy + 338} L ${ox + 538} ${oy + 338} L ${ox + 538} ${oy + 688} L ${ox + 12} ${oy + 688} Z`, 3400, 0.4, ink, 1.5)}

      {/* ════════ INTERIOR WALLS ════════ */}
      {/* Kitchen / Living divider — partial wall */}
      {L(ox + 350, oy + 12, ox + 350, oy + 250, 0.8, ink, 1.5)}
      {L(ox + 362, oy + 12, ox + 362, oy + 250, 0.85, ink, 1.5)}

      {/* Hallway wall horizontal */}
      {L(ox + 12, oy + 350, ox + 538, oy + 350, 0.9, ink, 1.5)}
      {L(ox + 12, oy + 362, ox + 538, oy + 362, 0.95, ink, 1.5)}

      {/* Bedroom 1 / Bedroom 2 divider */}
      {L(ox + 270, oy + 362, ox + 270, oy + 688, 1.0, ink, 1.5)}
      {L(ox + 282, oy + 362, ox + 282, oy + 688, 1.05, ink, 1.5)}

      {/* Bathroom wall */}
      {L(ox + 350, oy + 500, ox + 538, oy + 500, 1.1, ink, 1.5)}
      {L(ox + 350, oy + 512, ox + 538, oy + 512, 1.15, ink, 1.5)}

      {/* WC wall */}
      {L(ox + 350, oy + 362, ox + 350, oy + 500, 1.2, ink, 1.5)}
      {L(ox + 362, oy + 362, ox + 362, oy + 500, 1.25, ink, 1.5)}

      {/* Upper right room divider (study / guest) */}
      {L(ox + 650, oy + 12, ox + 650, oy + 338, 1.1, ink, 1.5)}
      {L(ox + 662, oy + 12, ox + 662, oy + 338, 1.15, ink, 1.5)}

      {/* ════════ DOORS (arc + opening) ════════ */}
      {/* Front door */}
      {R(ox + 130, oy - 5, 50, 17, 1.3, ink, 1.2)}
      <path d={`M ${ox + 130} ${oy + 12} A 50 50 0 0 0 ${ox + 180} ${oy + 62}`} fill="none" stroke={inkMed} strokeWidth={0.8} className="bp-circle" style={{ '--bp-delay': '1.5s' } as React.CSSProperties} />

      {/* Living room to hallway */}
      <path d={`M ${ox + 200} ${oy + 350} A 40 40 0 0 1 ${ox + 200} ${oy + 310}`} fill="none" stroke={inkMed} strokeWidth={0.8} className="bp-circle" style={{ '--bp-delay': '1.6s' } as React.CSSProperties} />

      {/* Kitchen to hallway */}
      <path d={`M ${ox + 430} ${oy + 350} A 40 40 0 0 0 ${ox + 430} ${oy + 310}`} fill="none" stroke={inkMed} strokeWidth={0.8} className="bp-circle" style={{ '--bp-delay': '1.65s' } as React.CSSProperties} />

      {/* Bedroom 1 door */}
      <path d={`M ${ox + 100} ${oy + 362} A 38 38 0 0 0 ${ox + 100} ${oy + 400}`} fill="none" stroke={inkMed} strokeWidth={0.8} className="bp-circle" style={{ '--bp-delay': '1.7s' } as React.CSSProperties} />

      {/* Bedroom 2 door */}
      <path d={`M ${ox + 320} ${oy + 362} A 38 38 0 0 0 ${ox + 320} ${oy + 400}`} fill="none" stroke={inkMed} strokeWidth={0.8} className="bp-circle" style={{ '--bp-delay': '1.75s' } as React.CSSProperties} />

      {/* Bathroom door */}
      <path d={`M ${ox + 400} ${oy + 512} A 35 35 0 0 1 ${ox + 435} ${oy + 512}`} fill="none" stroke={inkMed} strokeWidth={0.8} className="bp-circle" style={{ '--bp-delay': '1.8s' } as React.CSSProperties} />

      {/* Study door */}
      <path d={`M ${ox + 650} ${oy + 180} A 38 38 0 0 1 ${ox + 612} ${oy + 180}`} fill="none" stroke={inkMed} strokeWidth={0.8} className="bp-circle" style={{ '--bp-delay': '1.85s' } as React.CSSProperties} />

      {/* ════════ WINDOWS (thick marks in walls) ════════ */}
      {/* Living room windows — south wall */}
      {[80, 200].map((xo, i) => (
        <g key={`wlr-${i}`}>
          {L(ox + xo, oy + 688, ox + xo + 80, oy + 688, 1.8 + i * 0.1, inkMed, 2.5)}
          {L(ox + xo, oy + 700, ox + xo + 80, oy + 700, 1.85 + i * 0.1, inkMed, 0.6)}
          {L(ox + xo + 40, oy + 688, ox + xo + 40, oy + 700, 1.9 + i * 0.1, inkFine, 0.5)}
        </g>
      ))}

      {/* Kitchen windows — north */}
      {L(ox + 400, oy, ox + 500, oy, 1.9, inkMed, 2.5)}
      {L(ox + 400, oy + 12, ox + 500, oy + 12, 1.95, inkMed, 0.6)}

      {/* Study window — east */}
      {L(ox + 900, oy + 80, ox + 900, oy + 180, 2.0, inkMed, 2.5)}
      {L(ox + 888, oy + 80, ox + 888, oy + 180, 2.05, inkMed, 0.6)}

      {/* Bedroom 1 — west */}
      {L(ox, oy + 450, ox, oy + 550, 2.1, inkMed, 2.5)}
      {L(ox + 12, oy + 450, ox + 12, oy + 550, 2.15, inkMed, 0.6)}

      {/* Bedroom 2 — south */}
      {L(ox + 330, oy + 688, ox + 460, oy + 688, 2.2, inkMed, 2.5)}
      {L(ox + 330, oy + 700, ox + 460, oy + 700, 2.25, inkMed, 0.6)}

      {/* ════════ STAIRS (in hallway) ════════ */}
      {Array.from({ length: 10 }, (_, i) => (
        L(ox + 400, oy + 370 + i * 12, ox + 530, oy + 370 + i * 12, 2.0 + i * 0.04, inkFine, 0.6)
      ))}
      {/* Stair arrow */}
      {L(ox + 465, oy + 370, ox + 465, oy + 490, 2.3, inkMed, 0.8)}
      <polygon
        points={`${ox + 460},${oy + 375} ${ox + 465},${oy + 365} ${ox + 470},${oy + 375}`}
        fill="none" stroke={inkMed} strokeWidth={0.6}
        className="bp-circle"
        style={{ '--bp-delay': '2.4s' } as React.CSSProperties}
      />

      {/* ════════ FURNITURE SKETCHES ════════ */}
      {/* Living room — sofa */}
      {R(ox + 40, oy + 420, 120, 45, 2.5, inkFine, 0.6)}
      {R(ox + 40, oy + 465, 120, 12, 2.55, inkFine, 0.4)}
      {/* Coffee table */}
      {R(ox + 70, oy + 500, 60, 35, 2.6, inkFine, 0.5)}

      {/* Dining table */}
      {R(ox + 50, oy + 120, 80, 120, 2.5, inkFine, 0.6)}
      {/* Chairs */}
      {[0, 1, 2, 3].map((i) => (
        R(ox + 30, oy + 130 + i * 28, 15, 20, 2.6 + i * 0.05, inkFine, 0.4)
      ))}
      {[0, 1, 2, 3].map((i) => (
        R(ox + 135, oy + 130 + i * 28, 15, 20, 2.65 + i * 0.05, inkFine, 0.4)
      ))}

      {/* Kitchen — counter along wall */}
      {R(ox + 370, oy + 20, 160, 40, 2.5, inkFine, 0.6)}
      {/* Sink circle */}
      {C(ox + 420, oy + 40, 10, 2.7, inkFine, 0.5)}
      {C(ox + 450, oy + 40, 10, 2.75, inkFine, 0.5)}
      {/* Stove */}
      {R(ox + 480, oy + 25, 40, 30, 2.65, inkFine, 0.5)}
      {[0, 1, 2, 3].map((i) => (
        C(ox + 490 + (i % 2) * 20, oy + 35 + Math.floor(i / 2) * 15, 4, 2.8 + i * 0.03, inkFine, 0.4)
      ))}

      {/* Bed — bedroom 1 */}
      {R(ox + 40, oy + 430, 100, 140, 2.7, inkFine, 0.6)}
      {L(ox + 40, oy + 440, ox + 140, oy + 440, 2.75, inkFine, 0.3)}

      {/* Bed — bedroom 2 */}
      {R(ox + 300, oy + 430, 100, 140, 2.7, inkFine, 0.6)}
      {L(ox + 300, oy + 440, ox + 400, oy + 440, 2.75, inkFine, 0.3)}

      {/* Bathroom — tub */}
      {R(ox + 370, oy + 530, 60, 140, 2.8, inkFine, 0.6)}
      {/* Toilet */}
      {C(ox + 500, oy + 560, 12, 2.85, inkFine, 0.5)}
      {R(ox + 488, oy + 570, 24, 18, 2.9, inkFine, 0.4)}
      {/* Washbasin */}
      {R(ox + 460, oy + 520, 20, 16, 2.85, inkFine, 0.4)}

      {/* Study — desk */}
      {R(ox + 680, oy + 40, 180, 60, 2.6, inkFine, 0.6)}
      {/* Chair */}
      {C(ox + 770, oy + 130, 14, 2.7, inkFine, 0.5)}

      {/* Guest room — bed */}
      {R(ox + 700, oy + 200, 80, 120, 2.7, inkFine, 0.6)}
      {L(ox + 700, oy + 210, ox + 780, oy + 210, 2.75, inkFine, 0.3)}

      {/* ════════ ROOM LABELS ════════ */}
      {T(ox + 170, oy + 175, 'OBÝVACÍ POKOJ', 3.0, 12, 'middle', 3)}
      {T(ox + 170, oy + 195, '32.4 m²', 3.1, 9, 'middle', 1)}

      {T(ox + 500, oy + 175, 'KUCHYNĚ', 3.0, 12, 'middle', 3)}
      {T(ox + 500, oy + 195, '18.6 m²', 3.1, 9, 'middle', 1)}

      {T(ox + 135, oy + 560, 'LOŽNICE', 3.1, 11, 'middle', 3)}
      {T(ox + 135, oy + 578, '16.8 m²', 3.2, 8, 'middle', 1)}

      {T(ox + 400, oy + 560, 'DĚTSKÝ POKOJ', 3.1, 10, 'middle', 3)}
      {T(ox + 400, oy + 578, '14.2 m²', 3.2, 8, 'middle', 1)}

      {T(ox + 460, oy + 660, 'KOUPELNA', 3.2, 9, 'middle', 3)}
      {T(ox + 460, oy + 675, '8.4 m²', 3.3, 7, 'middle', 1)}

      {T(ox + 770, oy + 100, 'PRACOVNA', 3.1, 11, 'middle', 3)}
      {T(ox + 770, oy + 118, '12.1 m²', 3.2, 8, 'middle', 1)}

      {T(ox + 770, oy + 280, 'POKOJ PRO HOSTY', 3.15, 10, 'middle', 3)}
      {T(ox + 770, oy + 298, '11.3 m²', 3.25, 8, 'middle', 1)}

      {T(ox + 465, oy + 440, 'CHODBA', 3.1, 9, 'middle', 2)}

      {/* ════════ HORIZONTAL DIMENSIONS ════════ */}
      {/* Total width — top */}
      {L(ox, oy - 60, ox + 900, oy - 60, 2.8, inkMed, 0.7)}
      {L(ox, oy - 68, ox, oy - 52, 2.85, inkMed, 0.7)}
      {L(ox + 900, oy - 68, ox + 900, oy - 52, 2.9, inkMed, 0.7)}
      {T(ox + 450, oy - 68, '18 000', 3.3, 10)}
      {/* Extension lines */}
      {L(ox, oy - 5, ox, oy - 60, 2.7, inkFine, 0.4, '3 5')}
      {L(ox + 900, oy - 5, ox + 900, oy - 60, 2.75, inkFine, 0.4, '3 5')}

      {/* Lower wing width */}
      {L(ox, oy + 730, ox + 550, oy + 730, 2.9, inkMed, 0.7)}
      {L(ox, oy + 722, ox, oy + 738, 2.95, inkMed, 0.7)}
      {L(ox + 550, oy + 722, ox + 550, oy + 738, 3.0, inkMed, 0.7)}
      {T(ox + 275, oy + 748, '11 000', 3.35, 9)}

      {/* ════════ VERTICAL DIMENSIONS ════════ */}
      {/* Total height — left side */}
      {L(ox - 60, oy, ox - 60, oy + 700, 2.8, inkMed, 0.7)}
      {L(ox - 68, oy, ox - 52, oy, 2.85, inkMed, 0.7)}
      {L(ox - 68, oy + 700, ox - 52, oy + 700, 2.9, inkMed, 0.7)}
      {T(ox - 75, oy + 350, '14 000', 3.3, 10, 'middle', 1)}
      {L(ox - 5, oy, ox - 60, oy, 2.7, inkFine, 0.4, '3 5')}
      {L(ox - 5, oy + 700, ox - 60, oy + 700, 2.75, inkFine, 0.4, '3 5')}

      {/* Right side height (upper wing) */}
      {L(ox + 940, oy, ox + 940, oy + 350, 2.9, inkMed, 0.7)}
      {L(ox + 932, oy, ox + 948, oy, 2.95, inkMed, 0.7)}
      {L(ox + 932, oy + 350, ox + 948, oy + 350, 3.0, inkMed, 0.7)}
      {T(ox + 960, oy + 175, '7 000', 3.35, 9, 'start', 1)}

      {/* ════════ GRID AXES ════════ */}
      {/* Vertical axes with circles */}
      {[ox, ox + 270, ox + 350, ox + 550, ox + 650, ox + 900].map((x, i) => (
        <g key={`va-${i}`}>
          {L(x, oy - 90, x, oy - 40, 3.2 + i * 0.05, inkFine, 0.5)}
          {C(x, oy - 100, 12, 3.3 + i * 0.05, inkMed, 0.6)}
          {T(x, oy - 96, String.fromCharCode(65 + i), 3.5 + i * 0.05, 9, 'middle', 0)}
        </g>
      ))}

      {/* Horizontal axes */}
      {[oy, oy + 350, oy + 500, oy + 700].map((y, i) => (
        <g key={`ha-${i}`}>
          {L(ox - 90, y, ox - 40, y, 3.2 + i * 0.05, inkFine, 0.5)}
          {C(ox - 100, y, 12, 3.3 + i * 0.05, inkMed, 0.6)}
          {T(ox - 100, y + 4, String(i + 1), 3.5 + i * 0.05, 9, 'middle', 0)}
        </g>
      ))}

      {/* ════════ NORTH ARROW ════════ */}
      {L(1680, 200, 1680, 110, 3.0, ink, 1.2)}
      <polygon
        points="1674,118 1680,95 1686,118"
        fill="none" stroke={ink} strokeWidth={0.8}
        className="bp-circle"
        style={{ '--bp-delay': '3.2s' } as React.CSSProperties}
      />
      {T(1680, 88, 'S', 3.4, 14, 'middle', 0)}
      {C(1680, 200, 35, 3.1, inkMed, 0.7)}
      {L(1645, 200, 1715, 200, 3.15, inkFine, 0.4)}
      {L(1680, 165, 1680, 235, 3.15, inkFine, 0.4)}

      {/* ════════ TITLE BLOCK ════════ */}
      {R(1380, 860, 470, 160, 3.3, inkMed, 1)}
      {L(1380, 900, 1850, 900, 3.4, inkMed, 0.6)}
      {L(1380, 940, 1850, 940, 3.45, inkMed, 0.6)}
      {L(1380, 975, 1850, 975, 3.5, inkFine, 0.4)}
      {L(1615, 900, 1615, 1020, 3.5, inkMed, 0.6)}

      {T(1615, 888, 'KUBA & KUBOVÁ ARCHITEKTI', 3.7, 13, 'middle', 4)}
      {T(1615, 928, 'PŮDORYS 1.NP — RODINNÝ DŮM', 3.75, 10, 'middle', 3)}
      {T(1497, 963, 'M 1:100', 3.8, 9, 'middle', 2)}
      {T(1732, 963, 'DATUM: 03/2024', 3.85, 9, 'middle', 1)}
      {T(1497, 1000, 'Č.V.: A-01', 3.9, 9, 'middle', 2)}
      {T(1732, 1000, 'STUPEŇ: DPS', 3.95, 9, 'middle', 1)}

      {/* ════════ SCALE BAR ════════ */}
      {L(1400, 800, 1700, 800, 3.2, inkMed, 0.8)}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <g key={`sb-${i}`}>
          {L(1400 + i * 50, 793, 1400 + i * 50, 807, 3.3 + i * 0.03, inkMed, 0.6)}
        </g>
      ))}
      {T(1400, 820, '0', 3.6, 8, 'middle', 0)}
      {T(1550, 820, '5m', 3.65, 8, 'middle', 1)}
      {T(1700, 820, '10m', 3.7, 8, 'middle', 1)}

      {/* ════════ SECTION MARKERS ════════ */}
      {C(ox + 450, oy + 740, 16, 3.3, inkMed, 0.8)}
      {T(ox + 450, oy + 744, 'A-A\'', 3.5, 8, 'middle', 1)}
      {L(ox + 450, oy + 724, ox + 450, oy + 705, 3.35, inkMed, 0.8)}

      {C(ox - 30, oy + 350, 16, 3.35, inkMed, 0.8)}
      {T(ox - 30, oy + 354, 'B-B\'', 3.55, 8, 'middle', 1)}
      {L(ox - 30, oy + 334, ox - 30, oy + 315, 3.4, inkMed, 0.8)}

      {/* ════════ ELEVATION NOTES ════════ */}
      {T(ox + 100, oy + 750, '±0,000 = 245,30 m n. m.  B.p.v.', 3.6, 8, 'start', 1)}
      {T(1400, 770, 'PŮDORYS 1. NADZEMNÍHO PODLAŽÍ', 3.5, 9, 'start', 2)}
      {T(1400, 788, 'MĚŘÍTKO  1 : 100', 3.55, 8, 'start', 2)}

    </svg>
  );
}
