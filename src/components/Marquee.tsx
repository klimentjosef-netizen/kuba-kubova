'use client';

import { useEffect, useRef } from 'react';
import { marqueeItems } from '@/data/content';

export default function Marquee() {
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('bp-active-line');
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 },
    );
    const parent = el.closest('.marquee-wrap');
    if (parent) observer.observe(parent);
    return () => observer.disconnect();
  }, []);

  // Duplicate items for seamless loop
  const items = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <div className="marquee-wrap" style={{ position: 'relative' }}>
      {/* Blueprint drawing line across the marquee */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        preserveAspectRatio="none"
        viewBox="0 0 1400 60"
      >
        <line
          ref={lineRef}
          x1="0" y1="30" x2="1400" y2="30"
          stroke="rgba(139,111,71,0.15)"
          strokeWidth="0.5"
          strokeDasharray="1400"
          strokeDashoffset="1400"
          className="marquee-bp-line"
        />
      </svg>
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i} className="marquee-item">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
