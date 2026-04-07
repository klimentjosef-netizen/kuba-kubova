'use client';

import Link from 'next/link';
import { founders, projects, values } from '@/data/content';
import { useScrollRevealAll } from '@/hooks/useScrollReveal';
import Marquee from '@/components/Marquee';
import ContactBar from '@/components/ContactBar';
import ProjectCard from '@/components/ProjectCard';
import BlueprintOverlay from '@/components/BlueprintOverlay';
import HeroBlueprintFull from '@/components/HeroBlueprintFull';

export default function HomePage() {
  useScrollRevealAll();


  return (
    <>
      {/* ===== HERO ===== */}
      <section style={styles.hero} className="bp-section hero-clean">
        <HeroBlueprintFull />
        <div className="container" style={styles.heroContent}>
          <p className="section-label">Architektonické studio Ostrava</p>
          <h1 style={styles.heroTitle}>
            Stavby, které{' '}
            <em style={styles.heroItalic}>obstojí</em>
            {' '}v&nbsp;čase.
          </h1>
          <p style={styles.heroSub}>
            Michal staví na desetiletí. Kateřina na milimetry.
          </p>
          <div style={styles.heroBottom}>
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
            <div style={styles.heroCtas}>
              <Link href="/projekty" className="btn btn--filled">
                Projekty
              </Link>
              <Link href="/o-nas" className="btn btn--bronze">
                O nás
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <Marquee />

      {/* ===== FOUNDERS ===== */}
      <section style={styles.founders} className="bp-section">
        <BlueprintOverlay variant="founders" />
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
      <section className="section bp-section" style={{ backgroundColor: 'var(--cream)' }}>
        <BlueprintOverlay variant="projects" />
        <div className="container">
          <div style={styles.projectHeader} className="reveal">
            <div>
              <p className="section-label">Vybrané realizace</p>
              <h2 style={styles.sectionTitle}>
                Projekty, na které jsme hrdí
              </h2>
            </div>
            <Link href="/projekty" className="btn btn--bronze" style={{ alignSelf: 'flex-end', marginBottom: '48px' }}>
              Všechny projekty
            </Link>
          </div>

          <div style={styles.projectGrid} className="reveal">
            <div style={styles.projectBig}>
              <ProjectCard project={projects[0]} />
            </div>
            <div style={styles.projectSmall}>
              <ProjectCard project={projects[1]} />
            </div>
            <div style={styles.projectSmall}>
              <ProjectCard project={projects[3]} />
            </div>
            <div style={styles.projectBig}>
              <ProjectCard project={projects[4]} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== PHILOSOPHY ===== */}
      <section style={styles.philosophy} className="reveal bp-section">
        <BlueprintOverlay variant="philosophy" dark />
        <div className="container hero-grid" style={styles.philInner}>
          <div style={styles.philQuote} className="reveal">
            <em style={styles.philQuoteText}>
              &ldquo;Architektura není jen o stavbách.<br />
              Je o životě, který se v nich odehrává.&rdquo;
            </em>
          </div>
          <div style={styles.philValues} className="reveal">
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

const styles: Record<string, React.CSSProperties> = {
  /* Hero */
  hero: {
    paddingTop: 'calc(var(--nav-height) + 80px)',
    paddingBottom: '80px',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    position: 'relative' as const,
    overflow: 'hidden',
  },
  heroContent: {
    position: 'relative' as const,
    zIndex: 1,
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center' as const,
  },
  heroTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: 'clamp(42px, 5vw, 72px)',
    fontWeight: 400,
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
  heroBottom: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '48px',
    marginTop: '48px',
    paddingTop: '28px',
    borderTop: '0.5px solid rgba(15, 15, 13, 0.12)',
    flexWrap: 'wrap' as const,
  },
  heroCtas: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap' as const,
    justifyContent: 'center',
  },
  stats: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
  },
  stat: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '4px',
  },
  statNum: {
    fontFamily: 'var(--font-serif)',
    fontSize: '42px',
    fontWeight: 400,
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
  founders: {
    position: 'relative' as const,
    overflow: 'hidden',
  },
  foundersGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    position: 'relative' as const,
    zIndex: 1,
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
    fontWeight: 400,
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
  projectHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '32px',
    flexWrap: 'wrap' as const,
  },
  sectionTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: 'clamp(32px, 4vw, 48px)',
    fontWeight: 400,
    marginBottom: '48px',
  },

  /* Project grid — bento style */
  projectGrid: {
    display: 'grid',
    gridTemplateColumns: '1.4fr 1fr',
    gridTemplateRows: 'auto auto',
    gap: '16px',
  },
  projectBig: {},
  projectSmall: {},

  /* Philosophy */
  philosophy: {
    backgroundColor: 'var(--bronze)',
    padding: '100px 0',
    position: 'relative' as const,
    overflow: 'hidden',
  },
  philInner: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '80px',
    alignItems: 'center',
    position: 'relative' as const,
    zIndex: 1,
  },
  philQuote: {},
  philQuoteText: {
    fontFamily: 'var(--font-serif)',
    fontSize: 'clamp(24px, 3vw, 36px)',
    fontWeight: 400,
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
