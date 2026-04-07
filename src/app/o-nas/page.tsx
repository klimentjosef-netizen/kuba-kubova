'use client';

import { founders, timeline, values } from '@/data/content';
import { useScrollRevealAll } from '@/hooks/useScrollReveal';
import ContactBar from '@/components/ContactBar';

export default function ONasPage() {
  useScrollRevealAll();

  return (
    <>
      {/* ===== HERO ===== */}
      <section style={styles.hero}>
        <div className="hero-grid" style={styles.heroGrid}>
          <div style={styles.heroLeft}>
            <div className="container" style={{ paddingRight: '60px' }}>
              <p className="section-label">O studiu</p>
              <h1 style={styles.heroTitle}>
                Tvoříme architekturu, která slouží lidem
              </h1>
              <p style={styles.heroText}>
                Studio Kuba &amp; Kubová založili Michal a Kateřina v roce 2007 v Ostravě.
                Od začátku sdílíme přesvědčení, že dobrá architektura vzniká z pochopení
                místa, materiálu a lidí, kteří v ní budou žít.
              </p>
              <p style={styles.heroText}>
                Za 18 let jsme realizovali přes 60 projektů — od rodinných domů po
                komerční stavby a rekonstrukce historických objektů. Každý projekt vnímáme
                jako odpovědnost vůči klientovi i místu.
              </p>
            </div>
          </div>

          {/* Kateřina — always dark bg */}
          <div style={styles.heroRight}>
            <div style={{ padding: '0 60px' }}>
              <em style={styles.heroQuote}>
                &ldquo;Projekt není hotový,<br />
                dokud nesedí každý detail.&rdquo;
              </em>
              <p style={styles.heroQuoteAuthor}>— Kateřina Kubová</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOUNDERS DETAIL ===== */}
      <section>
        <div className="founders-grid" style={styles.foundersGrid}>
          {/* Michal — light */}
          <div style={styles.founderLight} className="reveal">
            <p className="section-label">Spoluzakladatel</p>
            <h2 style={styles.founderName}>{founders.michal.name}</h2>
            <p style={styles.founderRole}>{founders.michal.role}</p>
            <p style={styles.founderBioLong}>{founders.michal.longBio}</p>
            <div style={styles.pills}>
              {founders.michal.specialties.map((s) => (
                <span key={s} className="pill pill--light">{s}</span>
              ))}
            </div>
            <p style={styles.founderEmail}>
              <a href={`mailto:${founders.michal.email}`} style={styles.emailLink}>
                {founders.michal.email}
              </a>
            </p>
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
            <p style={{ ...styles.founderBioLong, color: 'rgba(240, 237, 230, 0.7)' }}>
              {founders.katerina.longBio}
            </p>
            <div style={styles.pills}>
              {founders.katerina.specialties.map((s) => (
                <span key={s} className="pill pill--dark">{s}</span>
              ))}
            </div>
            <p style={styles.founderEmail}>
              <a href={`mailto:${founders.katerina.email}`} style={{ ...styles.emailLink, color: 'var(--warm)' }}>
                {founders.katerina.email}
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ===== TIMELINE ===== */}
      <section className="section" style={{ backgroundColor: 'var(--cream)' }}>
        <div className="container">
          <p className="section-label reveal">Milníky</p>
          <h2 style={styles.sectionTitle} className="reveal">Naše cesta</h2>

          <div style={styles.timelineGrid} className="reveal timeline-grid">
            {timeline.map((item) => (
              <div key={item.year} style={styles.timelineItem}>
                <span style={styles.timelineYear}>{item.year}</span>
                <h3 style={styles.timelineTitle}>{item.title}</h3>
                <p style={styles.timelineDesc}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section>
        <div className="values-grid" style={styles.valuesGrid}>
          <div style={styles.valuesLeft}>
            <em style={styles.valuesQuote}>
              &ldquo;Nasloucháme místu dříve, než začneme kreslit.&rdquo;
            </em>
          </div>
          <div style={styles.valuesRight}>
            <div style={styles.valuesCards} className="reveal values-cards">
              {values.map((v) => (
                <div key={v.title} style={styles.valueCard}>
                  <h3 style={styles.valueTitle}>{v.title}</h3>
                  <p style={styles.valueDesc}>{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactBar />
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  /* Hero */
  hero: {
    paddingTop: 'var(--nav-height)',
  },
  heroGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    minHeight: '80vh',
  },
  heroLeft: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'var(--stone)',
    padding: '80px 0',
  },
  heroRight: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'var(--ink)',
    padding: '80px 0',
  },
  heroTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: 'clamp(36px, 4vw, 56px)',
    fontWeight: 300,
    marginBottom: '32px',
    lineHeight: 1.1,
  },
  heroText: {
    fontFamily: 'var(--font-sans)',
    fontSize: '16px',
    fontWeight: 300,
    color: 'var(--slate)',
    lineHeight: 1.7,
    marginBottom: '20px',
    maxWidth: '520px',
  },
  heroQuote: {
    fontFamily: 'var(--font-serif)',
    fontSize: 'clamp(28px, 3.5vw, 42px)',
    fontWeight: 300,
    fontStyle: 'italic',
    color: 'var(--stone)',
    lineHeight: 1.3,
    display: 'block',
    marginBottom: '24px',
  },
  heroQuoteAuthor: {
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    fontWeight: 300,
    color: 'var(--warm)',
    letterSpacing: '0.04em',
  },

  /* Founders */
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
  founderBioLong: {
    fontFamily: 'var(--font-sans)',
    fontSize: '16px',
    fontWeight: 300,
    lineHeight: 1.7,
    color: 'var(--slate)',
    marginBottom: '32px',
    maxWidth: '520px',
  },
  pills: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '8px',
    marginBottom: '32px',
  },
  founderEmail: {
    marginTop: '8px',
  },
  emailLink: {
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    fontWeight: 300,
    color: 'var(--bronze)',
    textDecoration: 'none',
    borderBottom: '0.5px solid var(--bronze)',
    paddingBottom: '2px',
  },

  /* Timeline */
  sectionTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: 'clamp(32px, 4vw, 48px)',
    fontWeight: 300,
    marginBottom: '48px',
  },
  timelineGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '32px',
  },
  timelineItem: {
    paddingTop: '24px',
    borderTop: '0.5px solid var(--slate)',
  },
  timelineYear: {
    fontFamily: 'var(--font-serif)',
    fontSize: '36px',
    fontWeight: 300,
    color: 'var(--bronze)',
    display: 'block',
    marginBottom: '12px',
  },
  timelineTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: '22px',
    fontWeight: 400,
    marginBottom: '8px',
  },
  timelineDesc: {
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    fontWeight: 300,
    color: 'var(--slate)',
    lineHeight: 1.6,
  },

  /* Values */
  valuesGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    minHeight: '60vh',
  },
  valuesLeft: {
    backgroundColor: 'var(--ink)',
    display: 'flex',
    alignItems: 'center',
    padding: '80px 60px',
  },
  valuesRight: {
    backgroundColor: 'var(--stone)',
    display: 'flex',
    alignItems: 'center',
    padding: '80px 60px',
  },
  valuesQuote: {
    fontFamily: 'var(--font-serif)',
    fontSize: 'clamp(24px, 3vw, 36px)',
    fontWeight: 300,
    fontStyle: 'italic',
    color: 'var(--stone)',
    lineHeight: 1.4,
  },
  valuesCards: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
  },
  valueCard: {},
  valueTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: '22px',
    fontWeight: 400,
    marginBottom: '8px',
  },
  valueDesc: {
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    fontWeight: 300,
    color: 'var(--slate)',
    lineHeight: 1.6,
  },
};
