'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const links = [
  { href: '/', label: 'Domů' },
  { href: '/projekty', label: 'Projekty' },
  { href: '/o-nas', label: 'O nás' },
  { href: '/kontakt', label: 'Kontakt' },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`
        .nav-links { display: flex; gap: 36px; }
        .nav-burger { display: none; flex-direction: column; gap: 5px; padding: 8px; background: none; border: none; cursor: none; }
        @media (max-width: 1024px) {
          .nav-links { display: none !important; }
          .nav-burger { display: flex !important; cursor: auto; }
        }
      `}</style>

      <nav style={styles.nav}>
        <div className="container" style={styles.inner}>
          <Link href="/" style={styles.logo}>
            <span style={styles.logoName}>Kuba</span>
            <span style={styles.logoAmp}>&</span>
            <span style={styles.logoName}>Kubová</span>
            <span style={styles.logoText}>studio</span>
          </Link>

          <div className="nav-links">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  ...styles.link,
                  ...(pathname === l.href ? styles.linkActive : {}),
                }}
              >
                {l.label}
                {pathname === l.href && <span style={styles.underline} />}
              </Link>
            ))}
          </div>

          <button
            className="nav-burger"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <span style={{
              ...styles.burgerLine,
              transform: open ? 'rotate(45deg) translate(4px, 4px)' : 'none',
            }} />
            <span style={{
              ...styles.burgerLine,
              opacity: open ? 0 : 1,
            }} />
            <span style={{
              ...styles.burgerLine,
              transform: open ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
            }} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div style={styles.overlay} onClick={() => setOpen(false)}>
          <div style={styles.overlayInner}>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={styles.overlayLink}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: 'var(--nav-height)',
    zIndex: 1000,
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    backgroundColor: 'rgba(240, 237, 230, 0.85)',
    borderBottom: '0.5px solid rgba(15, 15, 13, 0.08)',
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  logo: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '2px',
    textDecoration: 'none',
  },
  logoName: {
    fontFamily: 'var(--font-serif)',
    fontSize: '20px',
    fontWeight: 400,
    color: 'var(--ink)',
  },
  logoAmp: {
    fontFamily: 'var(--font-serif)',
    fontSize: '18px',
    fontWeight: 400,
    fontStyle: 'italic',
    color: 'var(--bronze)',
    margin: '0 2px',
  },
  logoText: {
    fontFamily: 'var(--font-sans)',
    fontSize: '11px',
    fontWeight: 400,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--slate)',
    marginLeft: '10px',
  },
  link: {
    position: 'relative',
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    fontWeight: 400,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: 'var(--slate)',
    textDecoration: 'none',
    padding: '4px 0',
    transition: 'color 0.3s',
  },
  linkActive: {
    color: 'var(--ink)',
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '1px',
    backgroundColor: 'var(--bronze)',
  },
  burgerLine: {
    display: 'block',
    width: '22px',
    height: '1px',
    backgroundColor: 'var(--ink)',
    transition: 'all 0.3s',
  },
  overlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 999,
    backgroundColor: 'var(--ink)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayInner: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    textAlign: 'center',
  },
  overlayLink: {
    fontFamily: 'var(--font-serif)',
    fontSize: '42px',
    fontWeight: 400,
    color: 'var(--stone)',
    textDecoration: 'none',
  },
};
