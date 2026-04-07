'use client';

import Link from 'next/link';
import { founders, projects, values } from '@/data/content';
import { useScrollRevealAll } from '@/hooks/useScrollReveal';
import Marquee from '@/components/Marquee';
import ContactBar from '@/components/ContactBar';
import ProjectCard from '@/components/ProjectCard';

export default function HomePage() {
  useScrollRevealAll();

  const featured = projects.slice(0, 4);

  return (
    <>
      {/* ===== HERO ===== */}
      <section style={styles.hero}>
        <div className="container hero-grid" style={styles.heroInner}>
          <div style={styles.heroLeft}>
            <p className="section-label">Architektonické studio Ostrava</p>
            <h1 style={styles.heroTitle}>
              Stavby, které{' '}
              <em style={styles.heroItalic}>obstojí</em>
              {' '}v&nbsp;čase.
            </h1>
            <p style={styles.heroSub}>
              Michal staví na desetiletí. Kateřina na milimetry.
            </p>
            <div style={styles.heroCtas}>
              <Link href="/projekty" className="btn btn--filled">
                Projekty
              </Link>
              <Link href="/o-nas" className="btn btn--bronze">
                O nás
              </Link>
            </div>
          </div>

          <div style={styles.heroRight}>
            <HeroIllustration />
            <div style={styles.stats}>
              <div style={styles.stat}>
                <span style={styles.statNum}>18</span>
                <span style={styles.statLabel}>let zkušeností</span>
              </div>
              <div style={styles.statDivider} />
              <div style={styles.stat}>
                <span style={styles.statNum}>64</span>
                <span style={styles.statLabel}>projektů</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <Marquee />

      {/* ===== FOUNDERS ===== */}
      <section style={styles.founders}>
        <div className="founders-grid" style={styles.foundersGrid}>
          {/* Michal — light */}
          <div style={styles.founderLight} className="reveal">
            <p className="section-label">Spoluzakladatel</p>
            <h2 style={styles.founderName}>{founders.michal.name}</h2>
            <p style={styles.founderRole}>{founders.michal.role}</p>
            <p style={styles.founderBio}>{founders.michal.bio}</p>
            <div style={styles.pills}>
              {founders.michal.specialties.map((s) => (
                <span key={s} className="pill pill--light">{s}</span>
              ))}
            </div>
          </div>

          {/* Kateřina — dark */}
          <div style={styles.founderDark} className="reveal">
            <p className="section-label" style={{ color: 'var(--bronze)' }}>
              Spoluzakladatelka
            </p>
            <h2 style={{ ...styles.founderName, color: 'var(--stone)' }}>
              {founders.katerina.name}
            </h2>
            <p style={{ ...styles.founderRole, color: 'var(--warm)' }}>
              {founders.katerina.role}
            </p>
            <p style={{ ...styles.founderBio, color: 'rgba(240, 237, 230, 0.7)' }}>
              {founders.katerina.bio}
            </p>
            <div style={styles.pills}>
              {founders.katerina.specialties.map((s) => (
                <span key={s} className="pill pill--dark">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PROJECTS ===== */}
      <section className="section" style={{ backgroundColor: 'var(--cream)' }}>
        <div className="container">
          <p className="section-label reveal">Vybrané realizace</p>
          <h2 style={styles.sectionTitle} className="reveal">
            Projekty, na které jsme hrdí
          </h2>

          <div style={styles.projectGrid} className="reveal project-grid">
            {featured.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
            <Link href="/projekty" style={styles.moreTile}>
              <span style={styles.moreNum}>+60</span>
              <span style={styles.moreText}>dalších projektů</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== PHILOSOPHY ===== */}
      <section style={styles.philosophy} className="reveal">
        <div className="container hero-grid" style={styles.philInner}>
          <div style={styles.philQuote}>
            <em style={styles.philQuoteText}>
              &ldquo;Architektura není jen o stavbách.<br />
              Je o životě, který se v nich odehrává.&rdquo;
            </em>
          </div>
          <div style={styles.philValues}>
            {values.slice(0, 3).map((v) => (
              <div key={v.title} style={styles.philValue}>
                <h3 style={styles.philValueTitle}>{v.title}</h3>
                <p style={styles.philValueDesc}>{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT BAR ===== */}
      <ContactBar />
    </>
  );
}

function HeroIllustration() {
  return (
    <svg viewBox="0 0 560 420" style={{ width: '100%', height: 'auto' }}>
      <rect width="560" height="420" fill="#1a1917" />
      <g opacity="0.2">
        {/* Building silhouettes */}
        <rect x="40" y="80" width="120" height="300" fill="none" stroke="#8b6f47" strokeWidth="0.5" />
        <rect x="180" y="40" width="100" height="340" fill="none" stroke="#8b6f47" strokeWidth="0.5" />
        <rect x="300" y="120" width="140" height="260" fill="none" stroke="#8b6f47" strokeWidth="0.5" />
        <rect x="460" y="60" width="80" height="320" fill="none" stroke="#8b6f47" strokeWidth="0.5" />

        {/* Window grids */}
        {[0, 1, 2, 3, 4, 5].map((row) =>
          [0, 1, 2].map((col) => (
            <rect
              key={`w1-${row}-${col}`}
              x={55 + col * 35}
              y={100 + row * 45}
              width="20"
              height="28"
              fill="none"
              stroke="#c8b89a"
              strokeWidth="0.3"
            />
          ))
        )}
        {[0, 1, 2, 3, 4, 5, 6].map((row) =>
          [0, 1].map((col) => (
            <rect
              key={`w2-${row}-${col}`}
              x={195 + col * 45}
              y={60 + row * 42}
              width="24"
              height="24"
              fill="none"
              stroke="#c8b89a"
              strokeWidth="0.3"
            />
          ))
        )}
        {[0, 1, 2, 3, 4].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <rect
              key={`w3-${row}-${col}`}
              x={312 + col * 30}
              y={145 + row * 45}
              width="18"
              height="26"
              fill="none"
              stroke="#c8b89a"
              strokeWidth="0.3"
            />
          ))
        )}

        {/* Ground line */}
        <line x1="0" y1="380" x2="560" y2="380" stroke="#c8b89a" strokeWidth="0.5" />

        {/* Accent lines */}
        <line x1="180" y1="40" x2="280" y2="40" stroke="#8b6f47" strokeWidth="0.5" />
        <line x1="460" y1="60" x2="540" y2="60" stroke="#8b6f47" strokeWidth="0.5" />
      </g>
    </svg>
  );
}

const styles: Record<string, React.CSSProperties> = {
  /* Hero */
  hero: {
    paddingTop: 'calc(var(--nav-height) + 80px)',
    paddingBottom: '80px',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
  },
  heroInner: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '80px',
    alignItems: 'center',
  },
  heroLeft: {},
  heroTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: 'clamp(42px, 5vw, 72px)',
    fontWeight: 300,
    lineHeight: 1.05,
    color: 'var(--ink)',
    marginBottom: '24px',
  },
  heroItalic: {
    color: 'var(--bronze)',
    fontStyle: 'italic',
  },
  heroSub: {
    fontFamily: 'var(--font-sans)',
    fontSize: '17px',
    fontWeight: 300,
    color: 'var(--slate)',
    marginBottom: '40px',
    lineHeight: 1.6,
  },
  heroCtas: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap' as const,
  },
  heroRight: {},
  stats: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
    marginTop: '32px',
    paddingTop: '24px',
    borderTop: '0.5px solid rgba(15, 15, 13, 0.12)',
  },
  stat: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  },
  statNum: {
    fontFamily: 'var(--font-serif)',
    fontSize: '42px',
    fontWeight: 300,
    color: 'var(--ink)',
    lineHeight: 1,
  },
  statLabel: {
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    fontWeight: 300,
    color: 'var(--slate)',
    letterSpacing: '0.04em',
  },
  statDivider: {
    width: '1px',
    height: '48px',
    backgroundColor: 'rgba(15, 15, 13, 0.12)',
  },

  /* Founders */
  founders: {},
  foundersGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
  },
  founderLight: {
    backgroundColor: 'var(--stone)',
    padding: '100px 60px',
  },
  founderDark: {
    backgroundColor: 'var(--ink)',
    padding: '100px 60px',
  },
  founderName: {
    fontFamily: 'var(--font-serif)',
    fontSize: '58px',
    fontWeight: 300,
    lineHeight: 1.05,
    marginBottom: '8px',
  },
  founderRole: {
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    fontWeight: 400,
    letterSpacing: '0.06em',
    color: 'var(--bronze)',
    marginBottom: '24px',
  },
  founderBio: {
    fontFamily: 'var(--font-sans)',
    fontSize: '16px',
    fontWeight: 300,
    lineHeight: 1.7,
    color: 'var(--slate)',
    marginBottom: '32px',
    maxWidth: '480px',
  },
  pills: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '8px',
  },

  /* Section heading */
  sectionTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: 'clamp(32px, 4vw, 48px)',
    fontWeight: 300,
    marginBottom: '48px',
  },

  /* Project grid */
  projectGrid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr',
    gap: '24px',
  },
  moreTile: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: '3 / 2',
    border: '0.5px solid var(--slate)',
    textDecoration: 'none',
    transition: 'background 0.3s, border-color 0.3s',
  },
  moreNum: {
    fontFamily: 'var(--font-serif)',
    fontSize: '48px',
    fontWeight: 300,
    color: 'var(--ink)',
    lineHeight: 1,
  },
  moreText: {
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    fontWeight: 300,
    color: 'var(--slate)',
    marginTop: '8px',
    letterSpacing: '0.04em',
  },

  /* Philosophy */
  philosophy: {
    backgroundColor: 'var(--bronze)',
    padding: '100px 0',
  },
  philInner: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '80px',
    alignItems: 'center',
  },
  philQuote: {},
  philQuoteText: {
    fontFamily: 'var(--font-serif)',
    fontSize: 'clamp(24px, 3vw, 36px)',
    fontWeight: 300,
    fontStyle: 'italic',
    color: 'var(--cream)',
    lineHeight: 1.4,
  },
  philValues: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '32px',
  },
  philValue: {},
  philValueTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: '22px',
    fontWeight: 400,
    color: 'var(--cream)',
    marginBottom: '8px',
  },
  philValueDesc: {
    fontFamily: 'var(--font-sans)',
    fontSize: '15px',
    fontWeight: 300,
    color: 'rgba(248, 245, 238, 0.8)',
    lineHeight: 1.6,
  },
};
