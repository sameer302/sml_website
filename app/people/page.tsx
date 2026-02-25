import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import MemberCard from './MemberCard'

export const metadata = {
  title: "People | Sensing & Monitoring Lab",
  description: "Meet the researchers and engineers at the Sensing & Monitoring Lab, IIT Bombay.",
}

export default async function PeoplePage() {
  const people = await client.fetch(`
    *[_type == "person"]{
      _id,
      name,
      role,
      email,
      bio,
      photo
    }
  `)

  const roles = [
    'PI',
    'PhD Student',
    'Masters Student',
    'Undergraduate',
    'Alumni',
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .people-root {
          font-family: 'DM Sans', sans-serif;
          background: #faf9f7;
          min-height: 100vh;
          color: #1a1a1a;
        }

        /* ── HERO ── */
        .people-hero {
          padding: 120px 40px 80px;
          max-width: 900px;
          margin: 0 auto;
        }
        .people-hero__label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #8a7e6e;
          margin-bottom: 20px;
        }
        .people-hero__title {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: clamp(52px, 8vw, 96px);
          font-weight: 400;
          line-height: 1.0;
          letter-spacing: -0.02em;
          color: #111;
          margin: 0 0 28px;
        }
        .people-hero__title em {
          font-style: italic;
          color: #3d4f6e;
        }
        .people-hero__rule {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 32px;
        }
        .people-hero__rule-line {
          height: 1px;
          width: 48px;
          background: #c4b89a;
        }
        .people-hero__rule-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #c4b89a;
        }
        .people-hero__sub {
          font-size: 16px;
          line-height: 1.75;
          color: #5a5249;
          font-weight: 300;
          max-width: 480px;
        }

        /* ── BODY LAYOUT ── */
        .people-body {
          max-width: 1100px;
          margin: 0 auto;
          padding: 40px 40px 120px;
        }

        /* ── SECTION ── */
        .people-section {
          margin-bottom: 80px;
        }
        .people-section__header {
          display: grid;
          grid-template-columns: auto 1fr;
          align-items: baseline;
          gap: 24px;
          margin-bottom: 48px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e0d8;
        }
        .people-section__role {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 28px;
          font-weight: 400;
          color: #111;
          white-space: nowrap;
        }
        .people-section__count {
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #b0a898;
          font-weight: 500;
          justify-self: end;
        }

        /* ── PI SPECIAL LAYOUT ── */
        .pi-card {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 48px;
          align-items: start;
          background: #fff;
          border: 1px solid #e8e3db;
          border-radius: 4px;
          padding: 48px;
          transition: box-shadow 0.3s ease;
        }
        .pi-card:hover {
          box-shadow: 0 8px 40px rgba(0,0,0,0.08);
        }
        .pi-photo {
          width: 180px;
          height: 220px;
          object-fit: cover;
          border-radius: 2px;
          filter: grayscale(20%);
          transition: filter 0.4s ease;
        }
        .pi-card:hover .pi-photo {
          filter: grayscale(0%);
        }
        .pi-info__name {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 36px;
          font-weight: 400;
          color: #111;
          margin: 0 0 6px;
        }
        .pi-info__role {
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #8a7e6e;
          font-weight: 500;
          margin-bottom: 20px;
        }
        .pi-info__bio {
          font-size: 15px;
          line-height: 1.8;
          color: #4a4540;
          font-weight: 300;
          margin-bottom: 28px;
        }
        .pi-info__email {
          font-size: 13px;
          color: #3d4f6e;
          font-weight: 500;
          text-decoration: none;
          letter-spacing: 0.02em;
          border-bottom: 1px solid #c4d0e3;
          padding-bottom: 2px;
          transition: border-color 0.2s;
        }
        .pi-info__email:hover {
          border-color: #3d4f6e;
        }

        /* ── MEMBER GRID — max 3 columns ── */
        .people-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
        }

        /* ── MEMBER CARD ── */
        .member-card {
          background: #fff;
          border: 1px solid #e8e3db;
          padding: 36px 32px;
          transition: background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .member-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #3d4f6e, #6b8cba);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .member-card:hover::before {
          transform: scaleX(1);
        }
        .member-card:hover {
          background: #fdfcfa;
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.07);
        }
        .member-photo-wrap {
          margin-bottom: 20px;
        }
        .member-photo {
          width: 110px;
          height: 130px;
          border-radius: 2px;
          object-fit: cover;
          filter: grayscale(30%);
          transition: filter 0.35s ease;
        }
        .member-card:hover .member-photo {
          filter: grayscale(0%);
        }
        .member-name {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 22px;
          font-weight: 400;
          color: #111;
          margin: 0 0 4px;
          line-height: 1.2;
        }
        .member-role {
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #b0a898;
          font-weight: 500;
          margin-bottom: 14px;
        }

        /* ── BIO with clamp + expand ── */
        .member-bio {
          font-size: 13.5px;
          line-height: 1.75;
          color: #5a5249;
          font-weight: 300;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .member-bio--expanded {
          display: block;
          overflow: visible;
          -webkit-line-clamp: unset;
          -webkit-box-orient: unset;
        }
        .member-bio-toggle {
          background: none;
          border: none;
          padding: 0;
          margin-top: 8px;
          font-size: 12px;
          font-weight: 500;
          color: #3d4f6e;
          cursor: pointer;
          letter-spacing: 0.04em;
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-color: #c4d0e3;
          transition: text-decoration-color 0.2s, color 0.2s;
        }
        .member-bio-toggle:hover {
          color: #2a3a55;
          text-decoration-color: #2a3a55;
        }

        .member-email {
          display: inline-block;
          margin-top: 18px;
          font-size: 12px;
          color: #3d4f6e;
          font-weight: 500;
          text-decoration: none;
          letter-spacing: 0.04em;
          opacity: 0;
          transform: translateY(4px);
          transition: opacity 0.25s ease, transform 0.25s ease;
        }
        .member-card:hover .member-email {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── PHOTO PLACEHOLDER ── */
        .photo-placeholder {
          width: 110px;
          height: 130px;
          border-radius: 2px;
          background: #ede8e0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 28px;
          color: #a09585;
          margin-bottom: 20px;
        }
        .pi-photo-placeholder {
          width: 180px;
          height: 220px;
          border-radius: 2px;
          background: #ede8e0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 48px;
          color: #a09585;
        }

        @media (max-width: 900px) {
          .people-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .people-hero { padding: 80px 24px 60px; }
          .people-body { padding: 0 24px 80px; }
          .people-grid { grid-template-columns: 1fr; }
          .pi-card {
            grid-template-columns: 1fr;
            padding: 32px 24px;
          }
          .pi-photo, .pi-photo-placeholder {
            width: 120px;
            height: 150px;
          }
        }
      `}</style>

      <main className="people-root">



        {/* ── SECTIONS ── */}
        <div className="people-body">
          {roles.map((role) => {
            const members = people.filter((p: any) => p.role === role)
            if (members.length === 0) return null

            const isPI = role === 'PI'
            const sectionLabel = isPI ? 'Principal Investigator' : `${role}s`

            return (
              <section key={role} className="people-section">
                <div className="people-section__header">
                  <h2 className="people-section__role">{sectionLabel}</h2>
                  <span className="people-section__count">
                    {members.length} {members.length === 1 ? 'member' : 'members'}
                  </span>
                </div>

                {/* PI — single wide card, bio always fully visible */}
                {isPI ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {members.map((p: any) => (
                      <div key={p._id} className="pi-card">
                        {p.photo ? (
                          <img
                            src={urlFor(p.photo).width(400).height(500).fit('crop').url()}
                            className="pi-photo"
                            alt={p.name}
                          />
                        ) : (
                          <div className="pi-photo-placeholder">
                            {p.name?.[0] ?? '?'}
                          </div>
                        )}
                        <div>
                          <h3 className="pi-info__name">{p.name}</h3>
                          <p className="pi-info__role">Principal Investigator</p>
                          {p.bio && <p className="pi-info__bio">{p.bio}</p>}
                          {p.email && (
                            <a href={`mailto:${p.email}`} className="pi-info__email">
                              {p.email}
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* All other roles — 3-col grid with expandable bios */
                  <div className="people-grid">
                    {members.map((p: any) => (
                      <MemberCard
                        key={p._id}
                        name={p.name}
                        role={p.role}
                        bio={p.bio}
                        email={p.email}
                        photoUrl={
                          p.photo
                            ? urlFor(p.photo).width(300).height(360).fit('crop').url()
                            : undefined
                        }
                      />
                    ))}
                  </div>
                )}
              </section>
            )
          })}
        </div>
      </main>
    </>
  )
}