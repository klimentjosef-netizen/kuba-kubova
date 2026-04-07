'use client';

import { useState } from 'react';
import { projects, projectCategories, type ProjectCategory } from '@/data/content';
import { useScrollRevealAll } from '@/hooks/useScrollReveal';
import ProjectCard from '@/components/ProjectCard';
import ContactBar from '@/components/ContactBar';

export default function ProjektyPage() {
  useScrollRevealAll();
  const [filter, setFilter] = useState<ProjectCategory | 'vse'>('vse');

  const filtered = filter === 'vse'
    ? projects
    : projects.filter((p) => p.category === filter);

  return (
    <>
      {/* Hero */}
      <section style={styles.hero}>
        <div className="container">
          <p className="section-label">Portfolio</p>
          <h1 style={styles.title}>Naše projekty</h1>
          <p style={styles.subtitle}>
            Od rodinných domů po komerční stavby. Každý projekt je unikátní odpovědí na zadání klienta a charakter místa.
          </p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="section" style={{ paddingTop: '0' }}>
        <div className="container">
          <div style={styles.filters}>
            {projectCategories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                style={{
                  ...styles.filterBtn,
                  ...(filter === cat.value ? styles.filterBtnActive : {}),
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div style={styles.grid} className="reveal project-grid">
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

      <ContactBar />
    </>
  );
}

const styles: Record<string, React.CSSProperties> = {
  hero: {
    paddingTop: 'calc(var(--nav-height) + 80px)',
    paddingBottom: '60px',
  },
  title: {
    fontFamily: 'var(--font-serif)',
    fontSize: 'clamp(42px, 5vw, 64px)',
    fontWeight: 300,
    marginBottom: '20px',
  },
  subtitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '17px',
    fontWeight: 300,
    color: 'var(--slate)',
    maxWidth: '600px',
    lineHeight: 1.6,
  },
  filters: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '8px',
    marginBottom: '48px',
  },
  filterBtn: {
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    fontWeight: 400,
    letterSpacing: '0.04em',
    padding: '10px 20px',
    border: '0.5px solid var(--slate)',
    background: 'transparent',
    color: 'var(--slate)',
    cursor: 'none',
    transition: 'all 0.3s',
  },
  filterBtnActive: {
    background: 'var(--ink)',
    color: 'var(--stone)',
    borderColor: 'var(--ink)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '32px',
  },
};
