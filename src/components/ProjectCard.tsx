'use client';

import Image from 'next/image';
import type { Project } from '@/data/content';

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  return (
    <div className="project-card" style={styles.card}>
      <div style={styles.imageWrap}>
        {project.photo ? (
          <Image
            src={project.photo}
            alt={project.name}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <PlaceholderSVG name={project.name} />
        )}
        <div className="project-overlay" style={styles.overlay}>
          <span style={styles.overlayName}>{project.name}</span>
        </div>
      </div>

      <div style={styles.meta}>
        <span style={styles.category}>{project.categoryLabel}</span>
        <h3 style={styles.name}>{project.name}</h3>
        <p style={styles.details}>
          {project.location} — {project.year} — {project.area} m²
        </p>
      </div>
    </div>
  );
}

function PlaceholderSVG({ name }: { name: string }) {
  return (
    <svg
      viewBox="0 0 600 400"
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
    >
      <rect width="600" height="400" fill="#1a1917" />
      {/* Abstract building grid */}
      <g opacity="0.15">
        <rect x="80" y="120" width="100" height="240" fill="none" stroke="#8b6f47" strokeWidth="0.5" />
        <rect x="200" y="80" width="80" height="280" fill="none" stroke="#8b6f47" strokeWidth="0.5" />
        <rect x="300" y="160" width="120" height="200" fill="none" stroke="#8b6f47" strokeWidth="0.5" />
        <rect x="440" y="100" width="90" height="260" fill="none" stroke="#8b6f47" strokeWidth="0.5" />
        {/* Windows */}
        {[0, 1, 2, 3].map((row) =>
          [0, 1].map((col) => (
            <rect
              key={`a${row}${col}`}
              x={95 + col * 40}
              y={140 + row * 50}
              width="20"
              height="30"
              fill="none"
              stroke="#c8b89a"
              strokeWidth="0.3"
            />
          ))
        )}
        {[0, 1, 2, 3, 4].map((row) =>
          [0, 1].map((col) => (
            <rect
              key={`b${row}${col}`}
              x={210 + col * 30}
              y={100 + row * 48}
              width="16"
              height="28"
              fill="none"
              stroke="#c8b89a"
              strokeWidth="0.3"
            />
          ))
        )}
        <line x1="0" y1="360" x2="600" y2="360" stroke="#c8b89a" strokeWidth="0.3" />
      </g>
      <text
        x="300"
        y="390"
        textAnchor="middle"
        fill="#6b6456"
        fontFamily="Barlow, sans-serif"
        fontSize="10"
        letterSpacing="2"
      >
        {name.toUpperCase()}
      </text>
    </svg>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    position: 'relative',
  },
  imageWrap: {
    position: 'relative',
    aspectRatio: '3 / 2',
    overflow: 'hidden',
    backgroundColor: 'var(--ink)',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'flex-end',
    padding: '24px',
    background: 'linear-gradient(transparent 40%, rgba(15, 15, 13, 0.7))',
    opacity: 0,
    transition: 'opacity 0.4s ease',
  },
  overlayName: {
    fontFamily: 'var(--font-serif)',
    fontSize: '24px',
    fontWeight: 400,
    color: '#fff',
  },
  meta: {
    paddingTop: '16px',
  },
  category: {
    fontFamily: 'var(--font-sans)',
    fontSize: '11px',
    fontWeight: 400,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--bronze)',
    marginBottom: '6px',
    display: 'block',
  },
  name: {
    fontFamily: 'var(--font-serif)',
    fontSize: '22px',
    fontWeight: 400,
    color: 'var(--ink)',
    marginBottom: '4px',
  },
  details: {
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    fontWeight: 300,
    color: 'var(--slate)',
  },
};
