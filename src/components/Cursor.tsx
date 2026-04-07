'use client';

import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Don't run on touch devices / mobile
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(max-width: 1024px)').matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dot.current) {
        dot.current.style.left = `${mouseX}px`;
        dot.current.style.top = `${mouseY}px`;
      }
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      if (ring.current) {
        ring.current.style.left = `${ringX}px`;
        ring.current.style.top = `${ringY}px`;
      }

      requestAnimationFrame(animate);
    };

    const onMouseEnterInteractive = () => {
      dot.current?.classList.add('hover');
      ring.current?.classList.add('hover');
    };

    const onMouseLeaveInteractive = () => {
      dot.current?.classList.remove('hover');
      ring.current?.classList.remove('hover');
    };

    document.addEventListener('mousemove', onMouseMove);
    const raf = requestAnimationFrame(animate);

    // Add hover listeners to interactive elements
    const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterInteractive);
      el.addEventListener('mouseleave', onMouseLeaveInteractive);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  );
}
