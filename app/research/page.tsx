import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

export default async function ResearchPage() {
  const research = await client.fetch(`
    *[_type == "research"] | order(order asc, _createdAt asc) {
      _id,
      title,
      area,
      status,
      shortDescription,
      motivation,
      approach,
      outcomes,
      image,
      tags,
      startYear,
      teamMembers[]-> {
        name,
        role
      }
    }
  `)

  const areaLabels: Record<string, string> = {
    'oral-health': 'Oral Health Diagnostics',
    'non-invasive-screening': 'Non-invasive Screening',
    'physiological-monitoring': 'Physiological Monitoring',
    'acoustic-biomarkers': 'Acoustic Biomarkers',
    'neonatal-monitoring': 'Neonatal Monitoring',
    'edge-other': 'Edge Deployment & Other',
  }

  const ongoing = research.filter((r: any) => r.status === 'ongoing')
  const completed = research.filter((r: any) => r.status === 'completed')

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');

        .rp-root {
          font-family: 'DM Sans', sans-serif;
          background: #faf9f7;
          min-height: 100vh;
          color: #1a1a1a;
        }

        /* ── BODY ── */
        .rp-body {
          max-width: 1100px;
          margin: 0 auto;
          padding: 80px 40px 120px;
        }

        /* ── SECTION HEADER ── */
        .rp-section {
          margin-bottom: 72px;
        }
        .rp-section__header {
          display: grid;
          grid-template-columns: auto 1fr;
          align-items: baseline;
          gap: 24px;
          margin-bottom: 48px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e0d8;
        }
        .rp-section__title {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 28px;
          font-weight: 400;
          color: #111;
          white-space: nowrap;
        }
        .rp-section__count {
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #b0a898;
          font-weight: 500;
          justify-self: end;
        }

        /* ── CARD GRID ── */
        .rp-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2px;
        }

        /* ── RESEARCH CARD ── */
        .rp-card {
          background: #fff;
          border: 1px solid #e8e3db;
          padding: 36px 32px;
          position: relative;
          transition: background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
        }
        .rp-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #3d4f6e, #6b8cba);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .rp-card:hover::before { transform: scaleX(1); }
        .rp-card:hover {
          background: #fdfcfa;
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.07);
        }

        /* image */
        .rp-card__img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 2px;
          margin-bottom: 24px;
          filter: grayscale(20%);
          transition: filter 0.4s ease;
        }
        .rp-card:hover .rp-card__img { filter: grayscale(0%); }

        /* top row */
        .rp-card__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 14px;
          flex-wrap: wrap;
        }
        .rp-card__area {
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #8a7e6e;
          font-weight: 500;
        }
        .rp-card__status {
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-weight: 500;
          padding: 3px 10px;
          border-radius: 2px;
        }
        .rp-card__status--ongoing {
          background: #e8f0e0;
          color: #4a7a35;
        }
        .rp-card__status--completed {
          background: #e8e3db;
          color: #6b5f52;
        }

        /* title */
        .rp-card__title {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 22px;
          font-weight: 400;
          color: #111;
          margin: 0 0 12px;
          line-height: 1.25;
        }

        /* short desc */
        .rp-card__desc {
          font-size: 13.5px;
          line-height: 1.75;
          color: #5a5249;
          font-weight: 300;
          margin-bottom: 20px;
        }

        /* expandable details */
        .rp-card__details {
          border-top: 1px solid #f0ece5;
          padding-top: 20px;
          margin-top: 4px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .rp-card__detail-label {
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #b0a898;
          font-weight: 500;
          margin-bottom: 6px;
        }
        .rp-card__detail-text {
          font-size: 13px;
          line-height: 1.7;
          color: #5a5249;
          font-weight: 300;
        }
        .rp-card__outcomes {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .rp-card__outcomes li {
          font-size: 13px;
          line-height: 1.6;
          color: #5a5249;
          font-weight: 300;
          padding-left: 14px;
          position: relative;
        }
        .rp-card__outcomes li::before {
          content: '—';
          position: absolute;
          left: 0;
          color: #c4b89a;
          font-size: 11px;
        }

        /* tags */
        .rp-card__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .rp-card__tag {
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 500;
          color: #3d4f6e;
          background: #eef1f6;
          padding: 3px 10px;
          border-radius: 2px;
        }

        /* team */
        .rp-card__team {
          font-size: 12px;
          color: #8a7e6e;
          font-weight: 400;
        }

        /* year */
        .rp-card__year {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 13px;
          color: #b0a898;
          margin-top: 4px;
        }

        /* empty state */
        .rp-empty {
          font-size: 14px;
          color: #b0a898;
          font-style: italic;
          padding: 40px 0;
          font-family: 'EB Garamond', Georgia, serif;
        }

        @media (max-width: 768px) {
          .rp-body { padding: 60px 24px 80px; }
          .rp-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <main className="rp-root">
        <div className="rp-body">

          {/* ── ONGOING ── */}
          <section className="rp-section">
            <div className="rp-section__header">
              <h2 className="rp-section__title">Ongoing Research</h2>
              <span className="rp-section__count">
                {ongoing.length} {ongoing.length === 1 ? 'project' : 'projects'}
              </span>
            </div>

            {ongoing.length === 0 ? (
              <p className="rp-empty">No ongoing projects listed yet.</p>
            ) : (
              <div className="rp-grid">
                {ongoing.map((r: any) => (
                  <ResearchCard key={r._id} r={r} areaLabels={areaLabels} />
                ))}
              </div>
            )}
          </section>

          {/* ── COMPLETED ── */}
          {completed.length > 0 && (
            <section className="rp-section">
              <div className="rp-section__header">
                <h2 className="rp-section__title">Completed Research</h2>
                <span className="rp-section__count">
                  {completed.length} {completed.length === 1 ? 'project' : 'projects'}
                </span>
              </div>
              <div className="rp-grid">
                {completed.map((r: any) => (
                  <ResearchCard key={r._id} r={r} areaLabels={areaLabels} />
                ))}
              </div>
            </section>
          )}

        </div>
      </main>
    </>
  )
}

/* ── CARD COMPONENT (server, no interactivity needed) ── */
function ResearchCard({ r, areaLabels }: { r: any; areaLabels: Record<string, string> }) {
  const hasDetails = r.motivation || r.approach || (r.outcomes && r.outcomes.length > 0)

  return (
    <div className="rp-card">
      {r.image && (
        <img
          src={urlFor(r.image).width(800).height(400).fit('crop').url()}
          alt={r.image.alt ?? r.title}
          className="rp-card__img"
        />
      )}

      <div className="rp-card__top">
        <span className="rp-card__area">
          {r.area ? areaLabels[r.area] ?? r.area : 'Research'}
        </span>
        <span className={`rp-card__status rp-card__status--${r.status ?? 'ongoing'}`}>
          {r.status === 'completed' ? 'Completed' : 'Ongoing'}
        </span>
      </div>

      <h3 className="rp-card__title">{r.title}</h3>

      {r.shortDescription && (
        <p className="rp-card__desc">{r.shortDescription}</p>
      )}

      {/* tags */}
      {r.tags && r.tags.length > 0 && (
        <div className="rp-card__tags" style={{ marginBottom: '16px' }}>
          {r.tags.map((tag: string) => (
            <span key={tag} className="rp-card__tag">{tag}</span>
          ))}
        </div>
      )}

      {/* expandable detail sections */}
      {hasDetails && (
        <div className="rp-card__details">
          {r.motivation && (
            <div>
              <p className="rp-card__detail-label">Motivation</p>
              <p className="rp-card__detail-text">{r.motivation}</p>
            </div>
          )}
          {r.approach && (
            <div>
              <p className="rp-card__detail-label">Our Approach</p>
              <p className="rp-card__detail-text">{r.approach}</p>
            </div>
          )}
          {r.outcomes && r.outcomes.length > 0 && (
            <div>
              <p className="rp-card__detail-label">Key Outcomes</p>
              <ul className="rp-card__outcomes">
                {r.outcomes.map((o: string, i: number) => (
                  <li key={i}>{o}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* footer row */}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '8px' }}>
        {r.teamMembers && r.teamMembers.length > 0 && (
          <p className="rp-card__team">
            {r.teamMembers.map((m: any) => m.name).join(', ')}
          </p>
        )}
        {r.startYear && (
          <span className="rp-card__year">Since {r.startYear}</span>
        )}
      </div>
    </div>
  )
}