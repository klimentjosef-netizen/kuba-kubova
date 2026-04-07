import Link from 'next/link';
import { contact } from '@/data/content';

export default function ContactBar() {
  return (
    <section style={styles.bar}>
      <div className="container contact-bar-inner" style={styles.inner}>
        <h2 style={styles.headline}>
          <em>Máte projekt?</em> Ozvěte se nám.
        </h2>

        <div style={styles.info}>
          <a href={`mailto:${contact.studioEmail}`} style={styles.link}>
            {contact.studioEmail}
          </a>
          <span style={styles.divider}>|</span>
          <a href={`tel:${contact.phone.replace(/\s/g, '')}`} style={styles.link}>
            {contact.phone}
          </a>
        </div>

        <Link href="/kontakt" className="btn btn--light">
          Napište nám
        </Link>
      </div>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  bar: {
    backgroundColor: 'var(--ink)',
    padding: '80px 0',
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap' as const,
    gap: '32px',
  },
  headline: {
    fontFamily: 'var(--font-serif)',
    fontSize: '32px',
    fontWeight: 300,
    color: 'var(--stone)',
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  link: {
    fontFamily: 'var(--font-sans)',
    fontSize: '15px',
    fontWeight: 300,
    color: 'var(--warm)',
    textDecoration: 'none',
    transition: 'color 0.3s',
  },
  divider: {
    color: 'rgba(240, 237, 230, 0.2)',
    fontSize: '14px',
  },
};
