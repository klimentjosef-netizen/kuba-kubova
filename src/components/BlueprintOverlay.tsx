'use client';

import { useEffect, useRef } from 'react';

/**
 * Architectural blueprint SVG overlay for page sections.
 * Each variant draws different architect motifs when scrolled into view.
 *
 * Variants:
 *   hero       — dimension lines, axis crosses, construction marks
 *   founders   — floor plan (left), building section (right)
 *   projects   — crop marks at corners, measurement ticks
 *   philosophy — compass circles, golden ratio spiral, proportion lines
 *   contact    — coordinate grid, azimuth lines, site plan marks
 */

type Variant = 'hero' | 'founders' | 'projects' | 'philosophy' | 'contact';

interface Props {
  variant: Variant;
  dark?: boolean; // true = light strokes on dark bg
}

export default function BlueprintOverlay({ variant, dark = false }: Props) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          svg.classList.add('bp-active');
          observer.unobserve(svg);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  const stroke = dark ? 'rgba(139,111,71,0.25)' : 'rgba(139,111,71,0.12)';
  const strokeFine = dark ? 'rgba(200,184,154,0.15)' : 'rgba(107,100,86,0.08)';
  const textFill = dark ? 'rgba(200,184,154,0.2)' : 'rgba(107,100,86,0.1)';

  return (
    <svg
      ref={ref}
      className="blueprint-svg"
      viewBox="0 0 1400 800"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {variant === 'hero' && <HeroBlueprint stroke={stroke} strokeFine={strokeFine} textFill={textFill} />}
      {variant === 'founders' && <FoundersBlueprint stroke={stroke} strokeFine={strokeFine} textFill={textFill} dark={dark} />}
      {variant === 'projects' && <ProjectsBlueprint stroke={stroke} strokeFine={strokeFine} textFill={textFill} />}
      {variant === 'philosophy' && <PhilosophyBlueprint stroke={stroke} strokeFine={strokeFine} textFill={textFill} />}
      {variant === 'contact' && <ContactBlueprint stroke={stroke} strokeFine={strokeFine} textFill={textFill} />}
    </svg>
  );
}

interface BpProps {
  stroke: string;
  strokeFine: string;
  textFill: string;
  dark?: boolean;
}

// ─── HERO: dimension lines, axis crosses, construction marks ───

function HeroBlueprint({ stroke, strokeFine, textFill }: BpProps) {
  return (
    <g>
      {/* Horizontal dimension line top */}
      <line x1="60" y1="40" x2="500" y2="40" stroke={stroke} strokeWidth="0.5" className="bp-line" style={{ '--bp-len': 440, '--bp-delay': '0.2s' } as React.CSSProperties} />
      <line x1="60" y1="35" x2="60" y2="45" stroke={stroke} strokeWidth="0.5" className="bp-line" style={{ '--bp-len': 10, '--bp-delay': '0.6s' } as React.CSSProperties} />
      <line x1="500" y1="35" x2="500" y2="45" stroke={stroke} strokeWidth="0.5" className="bp-line" style={{ '--bp-len': 10, '--bp-delay': '0.7s' } as React.CSSProperties} />
      <text x="280" y="35" textAnchor="middle" fill={textFill} fontSize="9" fontFamily="Barlow, sans-serif" letterSpacing="2" className="bp-text" style={{ '--bp-delay': '0.9s' } as React.CSSProperties}>6 400 mm</text>

      {/* Vertical dimension line left */}
      <line x1="30" y1="100" x2="30" y2="700" stroke={stroke} strokeWidth="0.5" className="bp-line" style={{ '--bp-len': 600, '--bp-delay': '0.3s' } as React.CSSProperties} />
      <line x1="25" y1="100" x2="35" y2="100" stroke={stroke} strokeWidth="0.5" className="bp-line" style={{ '--bp-len': 10, '--bp-delay': '0.8s' } as React.CSSProperties} />
      <line x1="25" y1="700" x2="35" y2="700" stroke={stroke} strokeWidth="0.5" className="bp-line" style={{ '--bp-len': 10, '--bp-delay': '0.9s' } as React.CSSProperties} />

      {/* Axis cross center-right */}
      <line x1="1050" y1="370" x2="1150" y2="370" stroke={stroke} strokeWidth="0.3" className="bp-line" style={{ '--bp-len': 100, '--bp-delay': '0.5s' } as React.CSSProperties} />
      <line x1="1100" y1="320" x2="1100" y2="420" stroke={stroke} strokeWidth="0.3" className="bp-line" style={{ '--bp-len': 100, '--bp-delay': '0.6s' } as React.CSSProperties} />
      <circle cx="1100" cy="370" r="20" fill="none" stroke={stroke} strokeWidth="0.3" className="bp-circle" style={{ '--bp-delay': '0.8s' } as React.CSSProperties} />
      <text x="1100" y="450" textAnchor="middle" fill={textFill} fontSize="8" fontFamily="Barlow, sans-serif" letterSpacing="3" className="bp-text" style={{ '--bp-delay': '1.2s' } as React.CSSProperties}>A1</text>

      {/* Construction angle marks top-right */}
      <line x1="1200" y1="80" x2="1350" y2="80" stroke={strokeFine} strokeWidth="0.3" className="bp-line" style={{ '--bp-len': 150, '--bp-delay': '0.4s' } as React.CSSProperties} />
      <line x1="1200" y1="80" x2="1200" y2="200" stroke={strokeFine} strokeWidth="0.3" className="bp-line" style={{ '--bp-len': 120, '--bp-delay': '0.5s' } as React.CSSProperties} />
      <line x1="1200" y1="80" x2="1300" y2="180" stroke={strokeFine} strokeWidth="0.3" strokeDasharray="4 4" className="bp-line" style={{ '--bp-len': 142, '--bp-delay': '0.7s' } as React.CSSProperties} />
      <text x="1310" y="75" fill={textFill} fontSize="7" fontFamily="Barlow, sans-serif" className="bp-text" style={{ '--bp-delay': '1.0s' } as React.CSSProperties}>45°</text>

      {/* Scale bar bottom */}
      <line x1="900" y1="750" x2="1300" y2="750" stroke={stroke} strokeWidth="0.5" className="bp-line" style={{ '--bp-len': 400, '--bp-delay': '0.6s' } as React.CSSProperties} />
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={`sc-${i}`} x1={900 + i * 100} y1="745" x2={900 + i * 100} y2="755" stroke={stroke} strokeWidth="0.5" className="bp-line" style={{ '--bp-len': 10, '--bp-delay': `${0.8 + i * 0.1}s` } as React.CSSProperties} />
      ))}
      <text x="900" y="770" fill={textFill} fontSize="7" fontFamily="Barlow, sans-serif" letterSpacing="1" className="bp-text" style={{ '--bp-delay': '1.3s' } as React.CSSProperties}>0</text>
      <text x="1300" y="770" textAnchor="end" fill={textFill} fontSize="7" fontFamily="Barlow, sans-serif" letterSpacing="1" className="bp-text" style={{ '--bp-delay': '1.4s' } as React.CSSProperties}>1:100</text>

      {/* Corner registration marks */}
      {[
        [50, 60], [1350, 60], [50, 740], [1350, 740],
      ].map(([x, y], i) => (
        <g key={`reg-${i}`}>
          <line x1={x - 12} y1={y} x2={x + 12} y2={y} stroke={stroke} strokeWidth="0.3" className="bp-line" style={{ '--bp-len': 24, '--bp-delay': `${0.3 + i * 0.15}s` } as React.CSSProperties} />
          <line x1={x} y1={y - 12} x2={x} y2={y + 12} stroke={stroke} strokeWidth="0.3" className="bp-line" style={{ '--bp-len': 24, '--bp-delay': `${0.4 + i * 0.15}s` } as React.CSSProperties} />
        </g>
      ))}

      {/* Scattered dimension ticks along right edge */}
      {[150, 280, 410, 540, 670].map((y, i) => (
        <g key={`dtick-${i}`}>
          <line x1="1360" y1={y} x2="1390" y2={y} stroke={strokeFine} strokeWidth="0.3" className="bp-line" style={{ '--bp-len': 30, '--bp-delay': `${0.5 + i * 0.12}s` } as React.CSSProperties} />
          <text x="1395" y={y + 3} fill={textFill} fontSize="6" fontFamily="Barlow, sans-serif" className="bp-text" style={{ '--bp-delay': `${0.9 + i * 0.12}s` } as React.CSSProperties}>{`+${(y / 10).toFixed(1)}`}</text>
        </g>
      ))}
    </g>
  );
}

// ─── FOUNDERS: floor plan left, building section right ───

function FoundersBlueprint({ stroke, strokeFine, textFill, dark }: BpProps) {
  const strokeL = dark ? strokeFine : stroke;
  const strokeR = 'rgba(139,111,71,0.2)';
  const textR = 'rgba(200,184,154,0.15)';

  return (
    <g>
      {/* LEFT SIDE — Floor plan sketch */}
      {/* Outer walls */}
      <path d="M 80 250 L 80 550 L 550 550 L 550 250 Z" fill="none" stroke={strokeL} strokeWidth="0.5" className="bp-line" style={{ '--bp-len': 1540, '--bp-delay': '0.2s' } as React.CSSProperties} />
      {/* Inner walls */}
      <line x1="280" y1="250" x2="280" y2="550" stroke={strokeL} strokeWidth="0.4" className="bp-line" style={{ '--bp-len': 300, '--bp-delay': '0.5s' } as React.CSSProperties} />
      <line x1="80" y1="400" x2="280" y2="400" stroke={strokeL} strokeWidth="0.4" className="bp-line" style={{ '--bp-len': 200, '--bp-delay': '0.6s' } as React.CSSProperties} />
      <line x1="380" y1="250" x2="380" y2="420" stroke={strokeL} strokeWidth="0.4" className="bp-line" style={{ '--bp-len': 170, '--bp-delay': '0.7s' } as React.CSSProperties} />
      {/* Door arcs */}
      <path d="M 280 380 A 20 20 0 0 0 260 400" fill="none" stroke={strokeL} strokeWidth="0.3" className="bp-circle" style={{ '--bp-delay': '1.0s' } as React.CSSProperties} />
      <path d="M 160 250 A 25 25 0 0 1 185 275" fill="none" stroke={strokeL} strokeWidth="0.3" className="bp-circle" style={{ '--bp-delay': '1.1s' } as React.CSSProperties} />
      {/* Room labels */}
      <text x="170" y="330" textAnchor="middle" fill={textFill} fontSize="8" fontFamily="Barlow, sans-serif" letterSpacing="2" className="bp-text" style={{ '--bp-delay': '1.3s' } as React.CSSProperties}>OBÝVACÍ POKOJ</text>
      <text x="170" y="470" textAnchor="middle" fill={textFill} fontSize="7" fontFamily="Barlow, sans-serif" letterSpacing="2" className="bp-text" style={{ '--bp-delay': '1.4s' } as React.CSSProperties}>KUCHYNĚ</text>
      <text x="430" y="350" textAnchor="middle" fill={textFill} fontSize="7" fontFamily="Barlow, sans-serif" letterSpacing="2" className="bp-text" style={{ '--bp-delay': '1.5s' } as React.CSSProperties}>LOŽNICE</text>
      {/* Dimension */}
      <line x1="80" y1="580" x2="550" y2="580" stroke={strokeL} strokeWidth="0.3" className="bp-line" style={{ '--bp-len': 470, '--bp-delay': '0.9s' } as React.CSSProperties} />
      <text x="315" y="600" textAnchor="middle" fill={textFill} fontSize="7" fontFamily="Barlow, sans-serif" letterSpacing="1" className="bp-text" style={{ '--bp-delay': '1.6s' } as React.CSSProperties}>12 600 mm</text>

      {/* RIGHT SIDE — Building cross-section */}
      {/* Ground */}
      <line x1="800" y1="600" x2="1300" y2="600" stroke={strokeR} strokeWidth="0.5" className="bp-line" style={{ '--bp-len': 500, '--bp-delay': '0.3s' } as React.CSSProperties} />
      {/* Foundation hatching */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
        <line key={`hatch-${i}`} x1={830 + i * 40} y1="600" x2={815 + i * 40} y2="630" stroke={strokeR} strokeWidth="0.2" className="bp-line" style={{ '--bp-len': 34, '--bp-delay': `${0.8 + i * 0.04}s` } as React.CSSProperties} />
      ))}
      {/* Building outline - section cut */}
      <path d="M 880 600 L 880 300 L 920 270 L 960 240 L 1000 210 L 1040 210 L 1080 240 L 1120 270 L 1160 300 L 1160 600" fill="none" stroke={strokeR} strokeWidth="0.5" className="bp-line" style={{ '--bp-len': 1100, '--bp-delay': '0.4s' } as React.CSSProperties} />
      {/* Floor lines */}
      <line x1="880" y1="450" x2="1160" y2="450" stroke={strokeR} strokeWidth="0.3" strokeDasharray="6 3" className="bp-line" style={{ '--bp-len': 280, '--bp-delay': '0.8s' } as React.CSSProperties} />
      <line x1="920" y1="340" x2="1120" y2="340" stroke={strokeR} strokeWidth="0.3" strokeDasharray="6 3" className="bp-line" style={{ '--bp-len': 200, '--bp-delay': '0.9s' } as React.CSSProperties} />
      {/* Height dimensions */}
      <line x1="850" y1="600" x2="850" y2="300" stroke={strokeR} strokeWidth="0.3" className="bp-line" style={{ '--bp-len': 300, '--bp-delay': '0.7s' } as React.CSSProperties} />
      <text x="840" y="450" textAnchor="end" fill={textR} fontSize="7" fontFamily="Barlow, sans-serif" className="bp-text" style={{ '--bp-delay': '1.2s' } as React.CSSProperties}>±0.000</text>
      <text x="840" y="305" textAnchor="end" fill={textR} fontSize="7" fontFamily="Barlow, sans-serif" className="bp-text" style={{ '--bp-delay': '1.3s' } as React.CSSProperties}>+6.200</text>
      {/* Section label */}
      <text x="1020" y="650" textAnchor="middle" fill={textR} fontSize="8" fontFamily="Barlow, sans-serif" letterSpacing="3" className="bp-text" style={{ '--bp-delay': '1.5s' } as React.CSSProperties}>ŘEZ A-A&apos;</text>
    </g>
  );
}

// ─── PROJECTS: crop marks, measurement ticks ───

function ProjectsBlueprint({ stroke, strokeFine, textFill }: BpProps) {
  // Crop marks at corners of a virtual "print area"
  const cropMarks: [number, number][] = [
    [60, 60], [700, 60], [1340, 60],
    [60, 740], [700, 740], [1340, 740],
  ];

  return (
    <g>
      {/* Crop marks */}
      {cropMarks.map(([x, y], i) => (
        <g key={`crop-${i}`}>
          <line x1={x - 20} y1={y} x2={x - 5} y2={y} stroke={stroke} strokeWidth="0.4" className="bp-line" style={{ '--bp-len': 15, '--bp-delay': `${0.2 + i * 0.1}s` } as React.CSSProperties} />
          <line x1={x + 5} y1={y} x2={x + 20} y2={y} stroke={stroke} strokeWidth="0.4" className="bp-line" style={{ '--bp-len': 15, '--bp-delay': `${0.25 + i * 0.1}s` } as React.CSSProperties} />
          <line x1={x} y1={y - 20} x2={x} y2={y - 5} stroke={stroke} strokeWidth="0.4" className="bp-line" style={{ '--bp-len': 15, '--bp-delay': `${0.3 + i * 0.1}s` } as React.CSSProperties} />
          <line x1={x} y1={y + 5} x2={x} y2={y + 20} stroke={stroke} strokeWidth="0.4" className="bp-line" style={{ '--bp-len': 15, '--bp-delay': `${0.35 + i * 0.1}s` } as React.CSSProperties} />
        </g>
      ))}

      {/* Horizontal ruler top */}
      <line x1="60" y1="30" x2="1340" y2="30" stroke={strokeFine} strokeWidth="0.3" className="bp-line" style={{ '--bp-len': 1280, '--bp-delay': '0.4s' } as React.CSSProperties} />
      {Array.from({ length: 13 }, (_, i) => (
        <line key={`rtick-${i}`} x1={60 + i * 100} y1="25" x2={60 + i * 100} y2="35" stroke={strokeFine} strokeWidth="0.3" className="bp-line" style={{ '--bp-len': 10, '--bp-delay': `${0.6 + i * 0.05}s` } as React.CSSProperties} />
      ))}

      {/* Vertical ruler left */}
      <line x1="30" y1="60" x2="30" y2="740" stroke={strokeFine} strokeWidth="0.3" className="bp-line" style={{ '--bp-len': 680, '--bp-delay': '0.5s' } as React.CSSProperties} />

      {/* Grid alignment lines — very faint dashed */}
      {[250, 500].map((y, i) => (
        <line key={`gy-${i}`} x1="60" y1={y} x2="1340" y2={y} stroke={strokeFine} strokeWidth="0.2" strokeDasharray="8 12" className="bp-line" style={{ '--bp-len': 1280, '--bp-delay': `${0.7 + i * 0.15}s` } as React.CSSProperties} />
      ))}
      {[460, 940].map((x, i) => (
        <line key={`gx-${i}`} x1={x} y1="60" x2={x} y2="740" stroke={strokeFine} strokeWidth="0.2" strokeDasharray="8 12" className="bp-line" style={{ '--bp-len': 680, '--bp-delay': `${0.8 + i * 0.15}s` } as React.CSSProperties} />
      ))}

      {/* Project number labels */}
      {['01', '02', '03'].map((n, i) => (
        <text key={`pn-${i}`} x={210 + i * 480} y="50" textAnchor="middle" fill={textFill} fontSize="7" fontFamily="Barlow, sans-serif" letterSpacing="2" className="bp-text" style={{ '--bp-delay': `${1.0 + i * 0.15}s` } as React.CSSProperties}>P-{n}</text>
      ))}
    </g>
  );
}

// ─── PHILOSOPHY: compass circles, golden ratio, proportion lines ───

function PhilosophyBlueprint({ stroke, strokeFine, textFill }: BpProps) {
  return (
    <g>
      {/* Compass circles — center */}
      <circle cx="400" cy="400" r="180" fill="none" stroke={stroke} strokeWidth="0.4" className="bp-circle" style={{ '--bp-delay': '0.2s' } as React.CSSProperties} />
      <circle cx="400" cy="400" r="111" fill="none" stroke={stroke} strokeWidth="0.3" className="bp-circle" style={{ '--bp-delay': '0.5s' } as React.CSSProperties} />
      <circle cx="400" cy="400" r="69" fill="none" stroke={strokeFine} strokeWidth="0.3" className="bp-circle" style={{ '--bp-delay': '0.8s' } as React.CSSProperties} />
      <circle cx="400" cy="400" r="42" fill="none" stroke={strokeFine} strokeWidth="0.2" className="bp-circle" style={{ '--bp-delay': '1.0s' } as React.CSSProperties} />
      {/* Center cross */}
      <line x1="395" y1="400" x2="405" y2="400" stroke={stroke} strokeWidth="0.4" className="bp-line" style={{ '--bp-len': 10, '--bp-delay': '0.3s' } as React.CSSProperties} />
      <line x1="400" y1="395" x2="400" y2="405" stroke={stroke} strokeWidth="0.4" className="bp-line" style={{ '--bp-len': 10, '--bp-delay': '0.35s' } as React.CSSProperties} />
      {/* Compass needle line */}
      <line x1="400" y1="400" x2="400" y2="220" stroke={stroke} strokeWidth="0.3" className="bp-line" style={{ '--bp-len': 180, '--bp-delay': '0.4s' } as React.CSSProperties} />

      {/* Golden ratio rectangle right side */}
      <rect x="850" y="200" width="400" height="247" fill="none" stroke={stroke} strokeWidth="0.4" className="bp-line" style={{ '--bp-len': 1294, '--bp-delay': '0.3s' } as React.CSSProperties} />
      {/* Golden split */}
      <line x1="1097" y1="200" x2="1097" y2="447" stroke={stroke} strokeWidth="0.3" className="bp-line" style={{ '--bp-len': 247, '--bp-delay': '0.6s' } as React.CSSProperties} />
      {/* Inner square */}
      <rect x="850" y="200" width="247" height="247" fill="none" stroke={strokeFine} strokeWidth="0.2" strokeDasharray="4 4" className="bp-line" style={{ '--bp-len': 988, '--bp-delay': '0.8s' } as React.CSSProperties} />
      {/* Spiral (approximated with arcs) */}
      <path d="M 1097 447 A 247 247 0 0 1 850 200" fill="none" stroke={stroke} strokeWidth="0.3" className="bp-circle" style={{ '--bp-delay': '1.0s' } as React.CSSProperties} />
      <path d="M 850 200 A 153 153 0 0 1 1097 290" fill="none" stroke={stroke} strokeWidth="0.25" className="bp-circle" style={{ '--bp-delay': '1.2s' } as React.CSSProperties} />
      {/* Label */}
      <text x="1050" y="480" textAnchor="middle" fill={textFill} fontSize="8" fontFamily="Barlow, sans-serif" letterSpacing="2" className="bp-text" style={{ '--bp-delay': '1.4s' } as React.CSSProperties}>φ = 1.618</text>

      {/* Proportion lines bottom */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <line key={`pr-${i}`} x1={200 + i * 130} y1="650" x2={200 + i * 130} y2="680" stroke={strokeFine} strokeWidth="0.3" className="bp-line" style={{ '--bp-len': 30, '--bp-delay': `${0.5 + i * 0.08}s` } as React.CSSProperties} />
      ))}
      <line x1="200" y1="665" x2="1240" y2="665" stroke={strokeFine} strokeWidth="0.2" className="bp-line" style={{ '--bp-len': 1040, '--bp-delay': '0.4s' } as React.CSSProperties} />
    </g>
  );
}

// ─── CONTACT: coordinate grid, azimuth lines, site plan marks ───

function ContactBlueprint({ stroke, strokeFine, textFill }: BpProps) {
  return (
    <g>
      {/* Coordinate grid */}
      {Array.from({ length: 8 }, (_, i) => (
        <line key={`cgh-${i}`} x1="100" y1={100 + i * 90} x2="1300" y2={100 + i * 90} stroke={strokeFine} strokeWidth="0.2" className="bp-line" style={{ '--bp-len': 1200, '--bp-delay': `${0.1 + i * 0.06}s` } as React.CSSProperties} />
      ))}
      {Array.from({ length: 14 }, (_, i) => (
        <line key={`cgv-${i}`} x1={100 + i * 90} y1="100" x2={100 + i * 90} y2="730" stroke={strokeFine} strokeWidth="0.2" className="bp-line" style={{ '--bp-len': 630, '--bp-delay': `${0.15 + i * 0.04}s` } as React.CSSProperties} />
      ))}

      {/* Azimuth / north arrow */}
      <line x1="1200" y1="200" x2="1200" y2="100" stroke={stroke} strokeWidth="0.5" className="bp-line" style={{ '--bp-len': 100, '--bp-delay': '0.4s' } as React.CSSProperties} />
      <polygon points="1200,100 1195,115 1205,115" fill="none" stroke={stroke} strokeWidth="0.4" className="bp-circle" style={{ '--bp-delay': '0.7s' } as React.CSSProperties} />
      <text x="1200" y="90" textAnchor="middle" fill={textFill} fontSize="10" fontFamily="Barlow, sans-serif" fontWeight="400" className="bp-text" style={{ '--bp-delay': '0.9s' } as React.CSSProperties}>S</text>

      {/* Azimuth circle */}
      <circle cx="1200" cy="200" r="40" fill="none" stroke={stroke} strokeWidth="0.3" className="bp-circle" style={{ '--bp-delay': '0.5s' } as React.CSSProperties} />
      <circle cx="1200" cy="200" r="2" fill={stroke} stroke="none" className="bp-text" style={{ '--bp-delay': '0.6s' } as React.CSSProperties} />

      {/* Site plan rectangle — building footprint */}
      <rect x="300" y="250" width="220" height="160" fill="none" stroke={stroke} strokeWidth="0.5" className="bp-line" style={{ '--bp-len': 760, '--bp-delay': '0.3s' } as React.CSSProperties} />
      {/* Parking spots */}
      {[0, 1, 2, 3].map((i) => (
        <rect key={`park-${i}`} x={570 + i * 40} y="330" width="30" height="50" fill="none" stroke={strokeFine} strokeWidth="0.3" className="bp-line" style={{ '--bp-len': 160, '--bp-delay': `${0.7 + i * 0.1}s` } as React.CSSProperties} />
      ))}
      {/* Road */}
      <line x1="200" y1="450" x2="800" y2="450" stroke={stroke} strokeWidth="0.4" className="bp-line" style={{ '--bp-len': 600, '--bp-delay': '0.5s' } as React.CSSProperties} />
      <line x1="200" y1="470" x2="800" y2="470" stroke={stroke} strokeWidth="0.4" className="bp-line" style={{ '--bp-len': 600, '--bp-delay': '0.55s' } as React.CSSProperties} />
      {/* Road center dashes */}
      <line x1="200" y1="460" x2="800" y2="460" stroke={stroke} strokeWidth="0.3" strokeDasharray="12 8" className="bp-line" style={{ '--bp-len': 600, '--bp-delay': '0.7s' } as React.CSSProperties} />

      {/* Property boundary */}
      <path d="M 250 200 L 600 200 L 600 500 L 250 500 Z" fill="none" stroke={strokeFine} strokeWidth="0.3" strokeDasharray="6 4" className="bp-line" style={{ '--bp-len': 1300, '--bp-delay': '0.4s' } as React.CSSProperties} />

      {/* Coordinates */}
      <text x="250" y="520" fill={textFill} fontSize="7" fontFamily="Barlow, sans-serif" letterSpacing="1" className="bp-text" style={{ '--bp-delay': '1.0s' } as React.CSSProperties}>49°49&apos;32&quot;N</text>
      <text x="250" y="535" fill={textFill} fontSize="7" fontFamily="Barlow, sans-serif" letterSpacing="1" className="bp-text" style={{ '--bp-delay': '1.1s' } as React.CSSProperties}>18°17&apos;28&quot;E</text>

      {/* Scale */}
      <text x="600" y="520" fill={textFill} fontSize="7" fontFamily="Barlow, sans-serif" letterSpacing="2" className="bp-text" style={{ '--bp-delay': '1.2s' } as React.CSSProperties}>M 1:500</text>

      {/* Street label */}
      <text x="500" y="443" textAnchor="middle" fill={textFill} fontSize="7" fontFamily="Barlow, sans-serif" letterSpacing="3" className="bp-text" style={{ '--bp-delay': '1.3s' } as React.CSSProperties}>ČESKOBRATRSKÁ</text>
    </g>
  );
}
