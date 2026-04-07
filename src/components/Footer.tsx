import Link from 'next/link';
import { contact } from '@/data/content';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div className="container">
        <div className="footer-top" style={styles.top}>
          <div>
            <div style={styles.logo}>
              <span style={styles.logoName}>Kuba</span>
              <span style={styles.logoAmp}>&</span>
              <span style={styles.logoName}>Kubová</span>
              <span style={styles.logoText}>studio</span>
            </div>
            <p style={styles.address}>{contact.address}</p>
            <p style={styles.address}>IČ: {contact.ic}</p>
          </div>

          <div className="footer-links-group" style={styles.linksGroup}>
            <div style={styles.linkCol}>
              <span style={styles.colTitle}>Navigace</span>
              <Link href="/" style={styles.link}>Domů</Link>
              <Link href="/projekty" style={styles.link}>Projekty</Link>
              <Link href="/o-nas" style={styles.link}>O nás</Link>
              <Link href="/kontakt" style={styles.link}>Kontakt</Link>
            </div>
            <div style={styles.linkCol}>
              <span style={styles.colTitle}>Kontakt</span>
              <a href={`mailto:${contact.studioEmail}`} style={styles.link}>{contact.studioEmail}</a>
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`} style={styles.link}>{contact.phone}</a>
            </div>
          </div>
        </div>

        <div style={styles.bottom}>
          <p style={styles.copy}>
            &copy; {new Date().getFullYear()} Kuba&amp;Kubová studio. Všechna práva vyhrazena.
          </p>
        </div>
      </div>
    </footer>
  );
}

const styles: Record<string, React.CSSProperties> = {
  footer: {
    backgroundColor: 'var(--ink)',
    color: 'var(--stone)',
    padding: '80px 0 40px',
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap' as const,
    gap: '48px',
    paddingBottom: '48px',
    borderBottom: '0.5px solid rgba(240, 237, 230, 0.1)',
  },
  logo: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '2px',
    marginBottom: '16px',
  },
  logoName: {
    fontFamily: 'var(--font-serif)',
    fontSize: '20px',
    fontWeight: 400,
    color: 'var(--stone)',
  },
  logoAmp: {
    fontFamily: 'var(--font-serif)',
    fontSize: '18px',
    fontWeight: 300,
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
  address: {
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    fontWeight: 300,
    color: 'rgba(240, 237, 230, 0.5)',
    lineHeight: 1.8,
  },
  linksGroup: {
    display: 'flex',
    gap: '80px',
    flexWrap: 'wrap' as const,
  },
  linkCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  colTitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '11px',
    fontWeight: 400,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'var(--bronze)',
    marginBottom: '8px',
  },
  link: {
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    fontWeight: 300,
    color: 'rgba(240, 237, 230, 0.6)',
    textDecoration: 'none',
    transition: 'color 0.3s',
  },
  bottom: {
    paddingTop: '32px',
  },
  copy: {
    fontFamily: 'var(--font-sans)',
    fontSize: '12px',
    fontWeight: 300,
    color: 'rgba(240, 237, 230, 0.3)',
  },
};
