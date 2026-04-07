'use client';

import { useEffect, useRef } from 'react';

/**
 * Full-viewport architectural technical drawing for the hero section.
 * Draws a complete building facade elevation with axes, dimensions,
 * annotations, and a title block — all animated via stroke-dasharray.
 */
export default function HeroBlueprintFull() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    // Activate immediately (hero is always in viewport on load)
    requestAnimationFrame(() => svg.classList.add('bp-active'));
  }, []);

  const s = 'rgba(139,111,71,0.09)';   // main stroke
  const sf = 'rgba(107,100,86,0.06)';   // fine/subtle stroke
  const t = 'rgba(107,100,86,0.08)';    // text fill

  // Helper for line with draw animation
  const L = (x1: number, y1: number, x2: number, y2: number, delay: number, stroke = s, width = 0.5, dash?: string) => {
    const len = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    return (
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={stroke} strokeWidth={width}
        strokeDasharray={dash}
        className="bp-line"
        style={{ '--bp-len': Math.ceil(len), '--bp-delay': `${delay}s` } as React.CSSProperties}
      />
    );
  };

  // Helper for rectangle path
  const R = (x: number, y: number, w: number, h: number, delay: number, stroke = s, width = 0.5) => {
    const len = 2 * (w + h);
    return (
      <rect
        x={x} y={y} width={w} height={h}
        fill="none" stroke={stroke} strokeWidth={width}
        className="bp-line"
        style={{ '--bp-len': Math.ceil(len), '--bp-delay': `${delay}s` } as React.CSSProperties}
      />
    );
  };

  // Helper for text
  const T = (x: number, y: number, text: string, delay: number, size = 9, anchor: 'start' | 'middle' | 'end' = 'middle', ls = 2) => (
    <text
      x={x} y={y} textAnchor={anchor} fill={t}
      fontSize={size} fontFamily="Barlow, sans-serif" letterSpacing={ls}
      className="bp-text"
      style={{ '--bp-delay': `${delay}s` } as React.CSSProperties}
    >
      {text}
    </text>
  );

  // Helper for circle
  const C = (cx: number, cy: number, r: number, delay: number, stroke = s, width = 0.5) => (
    <circle
      cx={cx} cy={cy} r={r}
      fill="none" stroke={stroke} strokeWidth={width}
      className="bp-circle"
      style={{ '--bp-delay': `${delay}s` } as React.CSSProperties}
    />
  );

  // ── LAYOUT CONSTANTS ──
  // Drawing area: buildings centered around x=960
  const groundY = 780;
  const axisTopY = 160;

  // 3 buildings
  const bldgs = [
    { x: 480, w: 280, h: 420, label: 'A' }, // left building, 3-story
    { x: 780, w: 340, h: 520, label: 'B' }, // center tall
    { x: 1140, w: 240, h: 360, label: 'C' }, // right shorter
  ];

  // Windows config per building
  const winConfigs = [
    { cols: 4, rows: 5, ww: 28, wh: 36, gx: 55, gy: 65, padX: 35, padY: 50 },
    { cols: 5, rows: 7, ww: 30, wh: 34, gx: 52, gy: 60, padX: 40, padY: 45 },
    { cols: 3, rows: 4, ww: 32, wh: 40, gx: 62, gy: 68, padX: 30, padY: 50 },
  ];

  let winIdx = 0;

  return (
    <svg
      ref={ref}
      className="blueprint-svg"
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      {/* ════════ DRAWING SHEET FRAME ════════ */}
      {R(40, 40, 1840, 1000, 0, s, 0.4)}
      {R(60, 60, 1800, 960, 0.1, sf, 0.3)}

      {/* Corner registration crosses */}
      {[[40, 40], [1880, 40], [40, 1040], [1880, 1040]].map(([cx, cy], i) => (
        <g key={`reg-${i}`}>
          {L(cx - 15, cy, cx + 15, cy, 0.15 + i * 0.05, s, 0.3)}
          {L(cx, cy - 15, cx, cy + 15, 0.2 + i * 0.05, s, 0.3)}
        </g>
      ))}

      {/* ════════ GRID AXIS SYSTEM ════════ */}
      {/* Vertical axes (A–E) at building boundaries */}
      {[480, 760, 780, 1120, 1140, 1380].map((x, i) => (
        <g key={`vax-${i}`}>
          {L(x, axisTopY - 50, x, groundY + 60, 0.3 + i * 0.08, sf, 0.2, '6 8')}
          {C(x, axisTopY - 70, 14, 0.5 + i * 0.08, s, 0.3)}
        </g>
      ))}
      {/* Axis labels */}
      {[
        [480, 'A'], [760, 'B'], [780, 'C'], [1120, 'D'], [1140, 'E'], [1380, 'F'],
      ].map(([x, label], i) => (
        T(x as number, (axisTopY - 66) as number, label as string, 0.7 + i * 0.08, 8, 'middle', 0)
      ))}

      {/* Horizontal axes (floor levels) */}
      {[groundY, groundY - 200, groundY - 400, groundY - 520].map((y, i) => (
        <g key={`hax-${i}`}>
          {L(380, y, 1480, y, 0.4 + i * 0.1, sf, 0.15, '6 10')}
          {C(370, y, 14, 0.6 + i * 0.1, s, 0.3)}
        </g>
      ))}
      {/* Floor level labels */}
      {[
        [groundY, '1'], [groundY - 200, '2'], [groundY - 400, '3'], [groundY - 520, '4'],
      ].map(([y, label], i) => (
        T(370, (y as number) + 4, label as string, 0.8 + i * 0.1, 8, 'middle', 0)
      ))}

      {/* ════════ BUILDING FACADES ════════ */}
      {bldgs.map((b, bi) => {
        const topY = groundY - b.h;
        const bDelay = 0.6 + bi * 0.3;
        const pathLen = 2 * b.w + b.h; // U-shape (no bottom, sits on ground)

        return (
          <g key={`bld-${bi}`}>
            {/* Building outline — U shape from ground up */}
            <path
              d={`M ${b.x} ${groundY} L ${b.x} ${topY} L ${b.x + b.w} ${topY} L ${b.x + b.w} ${groundY}`}
              fill="none" stroke={s} strokeWidth="0.5" strokeLinecap="square"
              className="bp-line"
              style={{ '--bp-len': pathLen, '--bp-delay': `${bDelay}s` } as React.CSSProperties}
            />

            {/* Roof parapet line */}
            {L(b.x - 8, topY, b.x + b.w + 8, topY, bDelay + 0.3, s, 0.4)}
            {/* Parapet cap */}
            {L(b.x - 8, topY - 6, b.x + b.w + 8, topY - 6, bDelay + 0.35, sf, 0.3)}

            {/* Windows */}
            {(() => {
              const wc = winConfigs[bi];
              const elements: React.ReactNode[] = [];
              for (let row = 0; row < wc.rows; row++) {
                for (let col = 0; col < wc.cols; col++) {
                  const wx = b.x + wc.padX + col * wc.gx;
                  const wy = topY + wc.padY + row * wc.gy;
                  const wDelay = bDelay + 0.5 + winIdx * 0.02;
                  elements.push(
                    <rect
                      key={`w-${bi}-${row}-${col}`}
                      x={wx} y={wy} width={wc.ww} height={wc.wh}
                      fill="none" stroke={sf} strokeWidth="0.3"
                      className="bp-text"
                      style={{ '--bp-delay': `${wDelay}s` } as React.CSSProperties}
                    />,
                  );
                  // Window cross (mullion)
                  elements.push(
                    <line
                      key={`wm-${bi}-${row}-${col}`}
                      x1={wx + wc.ww / 2} y1={wy}
                      x2={wx + wc.ww / 2} y2={wy + wc.wh}
                      stroke={sf} strokeWidth="0.2"
                      className="bp-text"
                      style={{ '--bp-delay': `${wDelay + 0.05}s` } as React.CSSProperties}
                    />,
                  );
                  winIdx++;
                }
              }
              return elements;
            })()}

            {/* Entrance door (only on center building) */}
            {bi === 1 && (
              <>
                {R(b.x + b.w / 2 - 30, groundY - 80, 60, 80, bDelay + 0.4, s, 0.4)}
                {/* Door handle */}
                {C(b.x + b.w / 2 + 20, groundY - 40, 2, bDelay + 0.8, s, 0.3)}
                {/* Canopy above door */}
                {L(b.x + b.w / 2 - 50, groundY - 90, b.x + b.w / 2 + 50, groundY - 90, bDelay + 0.5, s, 0.4)}
                {L(b.x + b.w / 2 - 50, groundY - 90, b.x + b.w / 2 - 60, groundY - 85, bDelay + 0.55, sf, 0.3)}
                {L(b.x + b.w / 2 + 50, groundY - 90, b.x + b.w / 2 + 60, groundY - 85, bDelay + 0.55, sf, 0.3)}
              </>
            )}
          </g>
        );
      })}

      {/* ════════ GROUND LINE + HATCHING ════════ */}
      {L(380, groundY, 1480, groundY, 0.5, s, 0.5)}
      {/* Ground hatching */}
      {Array.from({ length: 28 }, (_, i) => (
        L(400 + i * 38, groundY, 388 + i * 38, groundY + 20, 1.8 + i * 0.02, sf, 0.2)
      ))}
      {/* Ground fill line below */}
      {L(380, groundY + 20, 1480, groundY + 20, 1.5, sf, 0.3)}

      {/* ════════ HORIZONTAL DIMENSIONS (above buildings) ════════ */}
      {/* Total width */}
      {L(480, axisTopY - 100, 1380, axisTopY - 100, 1.8, s, 0.3)}
      {L(480, axisTopY - 105, 480, axisTopY - 95, 1.85, s, 0.3)}
      {L(1380, axisTopY - 105, 1380, axisTopY - 95, 1.9, s, 0.3)}
      {T(930, axisTopY - 108, '28 400', 2.4, 8)}
      {/* Extension lines up */}
      {L(480, axisTopY - 50, 480, axisTopY - 105, 1.7, sf, 0.2, '2 4')}
      {L(1380, axisTopY - 50, 1380, axisTopY - 105, 1.75, sf, 0.2, '2 4')}

      {/* Individual building widths */}
      {bldgs.map((b, i) => {
        return (
          <g key={`hdim-${i}`}>
            {L(b.x, axisTopY - 85, b.x + b.w, axisTopY - 85, 2.0 + i * 0.1, sf, 0.25)}
            {L(b.x, axisTopY - 90, b.x, axisTopY - 80, 2.05 + i * 0.1, sf, 0.25)}
            {L(b.x + b.w, axisTopY - 90, b.x + b.w, axisTopY - 80, 2.1 + i * 0.1, sf, 0.25)}
            {T(b.x + b.w / 2, axisTopY - 88, String(b.w * 10), 2.6 + i * 0.1, 7)}
          </g>
        );
      })}

      {/* ════════ VERTICAL DIMENSIONS (left side) ════════ */}
      {/* Full height dim for center (tallest) building */}
      {L(430, groundY, 430, groundY - 520, 2.0, s, 0.3)}
      {L(425, groundY, 435, groundY, 2.05, s, 0.3)}
      {L(425, groundY - 520, 435, groundY - 520, 2.1, s, 0.3)}

      {/* Floor height ticks */}
      {[0, 200, 400, 520].map((h, i) => (
        <g key={`vdim-${i}`}>
          {L(440, groundY - h, 460, groundY - h, 2.2 + i * 0.1, sf, 0.25)}
          {T(415, groundY - h + 4, ['\u00b10.000', '+3.200', '+6.400', '+9.100'][i], 2.8 + i * 0.1, 7, 'end', 1)}
        </g>
      ))}

      {/* Level markers ▽ */}
      {[0, 200, 400, 520].map((h, i) => (
        <polygon
          key={`lvl-${i}`}
          points={`${445},${groundY - h - 5} ${450},${groundY - h + 5} ${440},${groundY - h + 5}`}
          fill="none" stroke={s} strokeWidth="0.3"
          className="bp-circle"
          style={{ '--bp-delay': `${2.5 + i * 0.1}s` } as React.CSSProperties}
        />
      ))}

      {/* ════════ SECTION CUT MARKERS ════════ */}
      {/* Section A-A' */}
      {C(620, groundY + 50, 14, 2.8, s, 0.4)}
      {T(620, groundY + 54, 'A', 3.1, 9, 'middle', 0)}
      {L(620, groundY + 36, 620, groundY + 10, 2.7, s, 0.4)}
      {/* Arrow head */}
      <polygon
        points="615,15 620,5 625,15"
        fill="none" stroke={s} strokeWidth="0.3"
        className="bp-circle"
        transform={`translate(0, ${groundY - 5})`}
        style={{ '--bp-delay': '2.9s' } as React.CSSProperties}
      />

      {/* Section B-B' */}
      {C(1260, groundY + 50, 14, 2.9, s, 0.4)}
      {T(1260, groundY + 54, 'B', 3.2, 9, 'middle', 0)}
      {L(1260, groundY + 36, 1260, groundY + 10, 2.8, s, 0.4)}

      {/* ════════ NORTH ARROW ════════ */}
      {L(1720, 180, 1720, 110, 2.5, s, 0.5)}
      <polygon
        points="1714,115 1720,95 1726,115"
        fill="none" stroke={s} strokeWidth="0.4"
        className="bp-circle"
        style={{ '--bp-delay': '2.7s' } as React.CSSProperties}
      />
      {T(1720, 90, 'S', 3.0, 11, 'middle', 0)}
      {C(1720, 180, 30, 2.6, sf, 0.3)}

      {/* ════════ TITLE BLOCK ════════ */}
      {/* Title block border */}
      {R(1400, 880, 440, 140, 3.0, s, 0.4)}
      {/* Divider lines */}
      {L(1400, 920, 1840, 920, 3.1, sf, 0.3)}
      {L(1400, 960, 1840, 960, 3.15, sf, 0.3)}
      {L(1400, 990, 1840, 990, 3.2, sf, 0.3)}
      {L(1620, 920, 1620, 1020, 3.25, sf, 0.3)}

      {/* Title block text */}
      {T(1620, 908, 'KUBA & KUBOV\u00c1 ARCHITEKTI', 3.4, 10, 'middle', 3)}
      {T(1620, 948, 'POHLED JI\u017dN\u00cd \u2014 NOVOSTAVBA VILA', 3.5, 8, 'middle', 2)}
      {T(1500, 980, 'M 1:100', 3.6, 7, 'middle', 2)}
      {T(1730, 980, 'DATUM: 03/2024', 3.65, 7, 'middle', 1)}
      {T(1500, 1010, '\u010c.V.: A-04', 3.7, 7, 'middle', 2)}
      {T(1730, 1010, 'FORM\u00c1T: A1', 3.75, 7, 'middle', 1)}

      {/* ════════ SCATTERED NOTES ════════ */}
      {T(480, groundY + 80, 'POHLED JI\u017dN\u00cd', 3.3, 8, 'start', 3)}
      {T(480, groundY + 95, 'M\u011a\u0158\u00cdTKO 1:100', 3.35, 7, 'start', 2)}

      {/* Material note with leader line */}
      {L(1300, groundY - 200, 1420, groundY - 240, 3.0, sf, 0.3)}
      {T(1425, groundY - 238, 'OBKLAD: P\u0158\u00cdRODN\u00cd K\u00c1MEN', 3.4, 6, 'start', 1)}

      {L(700, groundY - 350, 680, groundY - 400, 3.1, sf, 0.3)}
      {T(640, groundY - 403, 'OKNA: HLIN\u00cdK, RAL 7016', 3.45, 6, 'end', 1)}

      {/* ════════ SCALE BAR (bottom left) ════════ */}
      {L(100, 980, 350, 980, 2.8, s, 0.4)}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        L(100 + i * 50, 975, 100 + i * 50, 985, 2.9 + i * 0.04, s, 0.3)
      ))}
      {T(100, 998, '0', 3.3, 7, 'middle', 0)}
      {T(225, 998, '5m', 3.35, 7, 'middle', 1)}
      {T(350, 998, '10m', 3.4, 7, 'middle', 1)}
    </svg>
  );
}
