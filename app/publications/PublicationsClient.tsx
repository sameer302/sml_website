'use client'

import { useState } from 'react'

interface Publication {
  _id: string
  title: string
  authors: string
  type: string
  journal?: string
  volume?: string
  pages?: string
  year: number
  link?: string
  doi?: string
  arxivId?: string
  abstract?: string
  tags?: string[]
  featured?: boolean
}

const TYPE_LABELS: Record<string, string> = {
  journal: 'Journal',
  conference: 'Conference',
  workshop: 'Workshop',
  preprint: 'Preprint',
  thesis: 'Thesis',
  'book-chapter': 'Book Chapter',
}

export default function PublicationsClient({ publications }: { publications: Publication[] }) {
  const [activeType, setActiveType] = useState('All')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  // only show filter types that exist in data
  const presentTypes = ['All', ...Array.from(new Set(
    publications.map(p => TYPE_LABELS[p.type] ?? p.type).filter(Boolean)
  ))]

  const filtered = activeType === 'All'
    ? publications
    : publications.filter(p => (TYPE_LABELS[p.type] ?? p.type) === activeType)

  // group by year
  const byYear: Record<number, Publication[]> = {}
  filtered.forEach(p => {
    if (!byYear[p.year]) byYear[p.year] = []
    byYear[p.year].push(p)
  })
  const years = Object.keys(byYear).map(Number).sort((a, b) => b - a)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');

        .pub-root {
          font-family: 'DM Sans', sans-serif;
          background: #faf9f7;
          min-height: 100vh;
          color: #1a1a1a;
        }
        .pub-body {
          max-width: 900px;
          margin: 0 auto;
          padding: 80px 40px 120px;
        }

        /* ── FILTER BAR ── */
        .pub-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 56px;
        }
        .pub-filter-btn {
          background: none;
          border: 1px solid #e5e0d8;
          padding: 7px 16px;
          border-radius: 2px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #8a7e6e;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .pub-filter-btn:hover {
          border-color: #3d4f6e;
          color: #3d4f6e;
        }
        .pub-filter-btn--active {
          background: #3d4f6e;
          border-color: #3d4f6e;
          color: #fff;
        }

        /* ── YEAR GROUP ── */
        .pub-year-group { margin-bottom: 56px; }
        .pub-year-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 24px;
        }
        .pub-year-label {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 32px;
          font-weight: 400;
          color: #d4cfc8;
          line-height: 1;
          min-width: 56px;
        }
        .pub-year-line {
          flex: 1;
          height: 1px;
          background: #e5e0d8;
        }

        /* ── PUBLICATION ENTRY ── */
        .pub-entry {
          padding: 24px 0;
          border-bottom: 1px solid #f0ece5;
        }
        .pub-entry:first-child { border-top: 1px solid #f0ece5; }
        .pub-entry__top {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }
        .pub-entry__badge {
          margin-top: 3px;
          font-size: 9px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 500;
          padding: 3px 8px;
          border-radius: 2px;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .pub-entry__badge--journal     { background: #e8f0e0; color: #4a7a35; }
        .pub-entry__badge--conference  { background: #eef1f6; color: #3d4f6e; }
        .pub-entry__badge--workshop    { background: #f5f0e8; color: #7a5f35; }
        .pub-entry__badge--preprint    { background: #f0e8f5; color: #6a3d7a; }
        .pub-entry__badge--thesis      { background: #f0ece5; color: #6b5f52; }
        .pub-entry__badge--book-chapter { background: #f5e8e8; color: #7a3535; }

        .pub-entry__main { flex: 1; }
        .pub-entry__title {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 19px;
          font-weight: 400;
          color: #111;
          line-height: 1.35;
          margin: 0 0 6px;
        }
        .pub-entry__featured .pub-entry__title { font-size: 21px; }
        .pub-entry__authors {
          font-size: 13px;
          color: #8a7e6e;
          font-weight: 300;
          margin-bottom: 4px;
        }
        .pub-entry__venue {
          font-size: 13px;
          color: #5a5249;
          font-style: italic;
          font-family: 'EB Garamond', Georgia, serif;
        }
        .pub-entry__venue-detail {
          font-style: normal;
          color: #b0a898;
          font-size: 12px;
          font-family: 'DM Sans', sans-serif;
        }
        .pub-entry__links {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 10px;
          align-items: center;
        }
        .pub-entry__link {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          color: #3d4f6e;
          border-bottom: 1px solid #c4d0e3;
          padding-bottom: 1px;
          transition: border-color 0.2s, color 0.2s;
        }
        .pub-entry__link:hover { border-color: #3d4f6e; color: #2a3a55; }
        .pub-entry__abstract-toggle {
          background: none;
          border: none;
          padding: 0;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #b0a898;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: color 0.2s;
        }
        .pub-entry__abstract-toggle:hover { color: #5a5249; }
        .pub-entry__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 10px;
        }
        .pub-entry__tag {
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 500;
          color: #8a7e6e;
          background: #f0ece5;
          padding: 2px 8px;
          border-radius: 2px;
        }
        .pub-entry__abstract {
          margin-top: 14px;
          padding: 16px 20px;
          background: #f7f4f0;
          border-left: 2px solid #c4b89a;
          border-radius: 0 2px 2px 0;
          font-size: 13px;
          line-height: 1.75;
          color: #5a5249;
          font-weight: 300;
        }
        .pub-entry__featured-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #3d4f6e;
          flex-shrink: 0;
          margin-top: 8px;
        }
        .pub-empty {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 18px;
          font-style: italic;
          color: #b0a898;
          padding: 60px 0;
          text-align: center;
        }

        @media (max-width: 600px) {
          .pub-body { padding: 60px 24px 80px; }
          .pub-entry__top { flex-direction: column; gap: 8px; }
        }
      `}</style>

      <main className="pub-root">
        <div className="pub-body">

          {/* ── FILTER BAR ── */}
          <div className="pub-filters">
            {presentTypes.map(t => (
              <button
                key={t}
                className={`pub-filter-btn${activeType === t ? ' pub-filter-btn--active' : ''}`}
                onClick={() => setActiveType(t)}
              >
                {t}
              </button>
            ))}
          </div>

          {/* ── GROUPED BY YEAR ── */}
          {publications.length === 0 ? (
            <p className="pub-empty">No publications listed yet.</p>
          ) : filtered.length === 0 ? (
            <p className="pub-empty">No {activeType.toLowerCase()} publications found.</p>
          ) : (
            years.map(year => (
              <div key={year} className="pub-year-group">
                <div className="pub-year-header">
                  <span className="pub-year-label">{year}</span>
                  <div className="pub-year-line" />
                </div>
                {byYear[year].map(pub => (
                  <div
                    key={pub._id}
                    className={`pub-entry${pub.featured ? ' pub-entry__featured' : ''}`}
                  >
                    <div className="pub-entry__top">
                      {pub.featured && <div className="pub-entry__featured-dot" title="Featured" />}
                      <span className={`pub-entry__badge pub-entry__badge--${pub.type ?? 'journal'}`}>
                        {TYPE_LABELS[pub.type] ?? pub.type}
                      </span>
                      <div className="pub-entry__main">
                        <h3 className="pub-entry__title">{pub.title}</h3>
                        <p className="pub-entry__authors">{pub.authors}</p>
                        {pub.journal && (
                          <p className="pub-entry__venue">
                            {pub.journal}
                            {(pub.volume || pub.pages) && (
                              <span className="pub-entry__venue-detail">
                                {pub.volume ? ` · ${pub.volume}` : ''}
                                {pub.pages ? ` · ${pub.pages}` : ''}
                              </span>
                            )}
                          </p>
                        )}
                        <div className="pub-entry__links">
                          {pub.link && (
                            <a href={pub.link} target="_blank" rel="noreferrer" className="pub-entry__link">↗ Paper</a>
                          )}
                          {pub.doi && (
                            <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noreferrer" className="pub-entry__link">DOI</a>
                          )}
                          {pub.arxivId && (
                            <a href={`https://arxiv.org/abs/${pub.arxivId}`} target="_blank" rel="noreferrer" className="pub-entry__link">arXiv</a>
                          )}
                          {pub.abstract && (
                            <button
                              className="pub-entry__abstract-toggle"
                              onClick={() => setExpandedId(expandedId === pub._id ? null : pub._id)}
                            >
                              {expandedId === pub._id ? 'Hide abstract ↑' : 'Abstract ↓'}
                            </button>
                          )}
                        </div>
                        {pub.tags && pub.tags.length > 0 && (
                          <div className="pub-entry__tags">
                            {pub.tags.map(tag => (
                              <span key={tag} className="pub-entry__tag">{tag}</span>
                            ))}
                          </div>
                        )}
                        {expandedId === pub._id && pub.abstract && (
                          <div className="pub-entry__abstract">{pub.abstract}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}

        </div>
      </main>
    </>
  )
}