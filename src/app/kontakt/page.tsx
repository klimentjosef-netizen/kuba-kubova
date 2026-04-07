'use client';

import { useState, type FormEvent } from 'react';
import { contact, founders } from '@/data/content';
import { useScrollRevealAll } from '@/hooks/useScrollReveal';

export default function KontaktPage() {
  useScrollRevealAll();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Connect to Formspree
    // 1. Create a form at https://formspree.io
    // 2. Replace the form action with your Formspree endpoint
    // 3. Remove e.preventDefault() and use the native form submission
    //    OR use fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //      method: 'POST',
    //      body: new FormData(e.currentTarget),
    //      headers: { 'Accept': 'application/json' },
    //    })
    setSubmitted(true);
  };

  return (
    <>
      {/* ===== HERO ===== */}
      <section style={styles.hero}>
        <div className="container">
          <p className="section-label" style={{ color: 'var(--bronze)' }}>Kontakt</p>
          <h1 style={styles.heroTitle}>
            Máte projekt?<br />
            Pojďme si promluvit.
          </h1>
        </div>
      </section>

      {/* ===== INFO STRIP ===== */}
      <section style={styles.infoStrip}>
        <div className="container">
          <div style={styles.infoGrid} className="reveal info-grid">
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Studio</span>
              <p style={styles.infoValue}>{contact.address}</p>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Email</span>
              <a href={`mailto:${contact.studioEmail}`} style={styles.infoLink}>
                {contact.studioEmail}
              </a>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Telefon</span>
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`} style={styles.infoLink}>
                {contact.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FORM + DETAILS ===== */}
      <section className="section">
        <div className="container">
          <div className="form-grid" style={styles.formGrid}>
            {/* Form */}
            <div style={styles.formWrap} className="reveal">
              <h2 style={styles.formTitle}>Napište nám</h2>
              <p style={styles.formSub}>
                Popište nám váš záměr a my se vám ozveme do 48 hodin.
              </p>

              {submitted ? (
                <div style={styles.success}>
                  <h3 style={styles.successTitle}>Děkujeme!</h3>
                  <p style={styles.successText}>
                    Vaši zprávu jsme obdrželi. Ozveme se vám co nejdříve.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={styles.form}>
                  <div className="form-row" style={styles.formRow}>
                    <div style={styles.fieldWrap}>
                      <label style={styles.label}>Jméno</label>
                      <input
                        type="text"
                        name="name"
                        required
                        style={styles.input}
                        placeholder="Jan Novák"
                      />
                    </div>
                    <div style={styles.fieldWrap}>
                      <label style={styles.label}>Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        style={styles.input}
                        placeholder="jan@email.cz"
                      />
                    </div>
                  </div>

                  <div style={styles.fieldWrap}>
                    <label style={styles.label}>Telefon</label>
                    <input
                      type="tel"
                      name="phone"
                      style={styles.input}
                      placeholder="+420 ..."
                    />
                  </div>

                  <div style={styles.fieldWrap}>
                    <label style={styles.label}>Typ projektu</label>
                    <select name="type" style={styles.input} defaultValue="">
                      <option value="" disabled>Vyberte typ</option>
                      <option value="rodinny-dum">Rodinný dům</option>
                      <option value="komercni">Komerční stavba</option>
                      <option value="interior">Interiér</option>
                      <option value="rekonstrukce">Rekonstrukce</option>
                      <option value="jine">Jiné</option>
                    </select>
                  </div>

                  <div style={styles.fieldWrap}>
                    <label style={styles.label}>Zpráva</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      style={{ ...styles.input, resize: 'vertical' as const }}
                      placeholder="Popište nám váš projekt..."
                    />
                  </div>

                  <button type="submit" className="btn btn--filled" style={{ marginTop: '8px' }}>
                    Odeslat zprávu
                  </button>
                </form>
              )}
            </div>

            {/* Details side */}
            <div className="reveal">
              <div style={styles.detailsCard}>
                <h3 style={styles.detailsTitle}>Kontaktní údaje</h3>

                <div style={styles.detailSection}>
                  <span style={styles.detailLabel}>Adresa studia</span>
                  <p style={styles.detailValue}>{contact.addressShort}</p>
                  <p style={styles.detailValue}>{contact.city}</p>
                </div>

                <div style={styles.detailSection}>
                  <span style={styles.detailLabel}>Michal Kuba</span>
                  <a href={`mailto:${founders.michal.email}`} style={styles.detailLink}>
                    {founders.michal.email}
                  </a>
                </div>

                <div style={styles.detailSection}>
                  <span style={styles.detailLabel}>Kateřina Kubová</span>
                  <a href={`mailto:${founders.katerina.email}`} style={styles.detailLink}>
                    {founders.katerina.email}
                  </a>
                </div>

                <div style={styles.detailSection}>
                  <span style={styles.detailLabel}>IČ</span>
                  <p style={styles.detailValue}>{contact.ic}</p>
                </div>
              </div>

              {/* Map placeholder */}
              <div style={styles.mapPlaceholder}>
                <svg viewBox="0 0 400 250" style={{ width: '100%', height: '100%' }}>
                  <rect width="400" height="250" fill="#1a1917" />
                  <g opacity="0.15">
                    {/* Grid lines */}
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <line key={`h${i}`} x1="0" y1={i * 30 + 10} x2="400" y2={i * 30 + 10} stroke="#8b6f47" strokeWidth="0.3" />
                    ))}
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                      <line key={`v${i}`} x1={i * 32 + 8} y1="0" x2={i * 32 + 8} y2="250" stroke="#8b6f47" strokeWidth="0.3" />
                    ))}
                  </g>
                  <circle cx="200" cy="125" r="6" fill="none" stroke="#8b6f47" strokeWidth="1" />
                  <circle cx="200" cy="125" r="2" fill="#8b6f47" />
                  <text x="200" y="160" textAnchor="middle" fill="#6b6456" fontFamily="Barlow, sans-serif" fontSize="10" letterSpacing="2">
                    ČESKOBRATRSKÁ 14, OSTRAVA
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  /* Hero */
  hero: {
    backgroundColor: 'var(--ink)',
    paddingTop: 'calc(var(--nav-height) + 80px)',
    paddingBottom: '80px',
  },
  heroTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: 'clamp(42px, 5vw, 72px)',
    fontWeight: 400,
    color: 'var(--stone)',
    lineHeight: 1.05,
  },

  /* Info strip */
  infoStrip: {
    borderBottom: '0.5px solid rgba(15, 15, 13, 0.12)',
    padding: '48px 0',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '32px',
  },
  infoItem: {},
  infoLabel: {
    fontFamily: 'var(--font-sans)',
    fontSize: '11px',
    fontWeight: 400,
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    color: 'var(--bronze)',
    display: 'block',
    marginBottom: '8px',
  },
  infoValue: {
    fontFamily: 'var(--font-sans)',
    fontSize: '16px',
    fontWeight: 300,
    color: 'var(--ink)',
  },
  infoLink: {
    fontFamily: 'var(--font-sans)',
    fontSize: '16px',
    fontWeight: 300,
    color: 'var(--ink)',
    textDecoration: 'none',
    borderBottom: '0.5px solid var(--warm)',
    paddingBottom: '2px',
  },

  /* Form grid */
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 0.8fr',
    gap: '60px',
  },
  formWrap: {
    backgroundColor: 'var(--plaster)',
    padding: '48px',
  },
  formTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: '36px',
    fontWeight: 400,
    marginBottom: '12px',
  },
  formSub: {
    fontFamily: 'var(--font-sans)',
    fontSize: '15px',
    fontWeight: 300,
    color: 'var(--slate)',
    marginBottom: '32px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
  },
  fieldWrap: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px',
  },
  label: {
    fontFamily: 'var(--font-sans)',
    fontSize: '12px',
    fontWeight: 400,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    color: 'var(--slate)',
  },
  input: {
    fontFamily: 'var(--font-sans)',
    fontSize: '15px',
    fontWeight: 300,
    padding: '12px 16px',
    border: '0.5px solid rgba(15, 15, 13, 0.15)',
    backgroundColor: 'var(--cream)',
    color: 'var(--ink)',
    outline: 'none',
    transition: 'border-color 0.3s',
    width: '100%',
  },
  success: {
    padding: '40px 0',
  },
  successTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: '28px',
    fontWeight: 400,
    color: 'var(--bronze)',
    marginBottom: '12px',
  },
  successText: {
    fontFamily: 'var(--font-sans)',
    fontSize: '16px',
    fontWeight: 300,
    color: 'var(--slate)',
  },

  /* Details */
  detailsCard: {
    borderTop: '0.5px solid rgba(15, 15, 13, 0.12)',
    paddingTop: '32px',
    marginBottom: '40px',
  },
  detailsTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: '28px',
    fontWeight: 400,
    marginBottom: '32px',
  },
  detailSection: {
    marginBottom: '24px',
  },
  detailLabel: {
    fontFamily: 'var(--font-sans)',
    fontSize: '11px',
    fontWeight: 400,
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: 'var(--bronze)',
    display: 'block',
    marginBottom: '4px',
  },
  detailValue: {
    fontFamily: 'var(--font-sans)',
    fontSize: '15px',
    fontWeight: 300,
    color: 'var(--ink)',
    lineHeight: 1.6,
  },
  detailLink: {
    fontFamily: 'var(--font-sans)',
    fontSize: '15px',
    fontWeight: 300,
    color: 'var(--ink)',
    textDecoration: 'none',
    borderBottom: '0.5px solid var(--warm)',
    paddingBottom: '2px',
  },

  /* Map */
  mapPlaceholder: {
    aspectRatio: '16 / 10',
    overflow: 'hidden',
  },
};
