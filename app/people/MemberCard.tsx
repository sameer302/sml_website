'use client'

import { useState } from 'react'

interface MemberCardProps {
  name: string
  role: string
  bio?: string
  email?: string
  photoUrl?: string
}

export default function MemberCard({ name, role, bio, email, photoUrl }: MemberCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <style>{`
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
        .member-bio-clamped {
          font-size: 13.5px;
          line-height: 1.75;
          color: #5a5249;
          font-weight: 300;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .member-bio-full {
          font-size: 13.5px;
          line-height: 1.75;
          color: #5a5249;
          font-weight: 300;
        }
        .member-bio-toggle {
          background: none;
          border: none;
          padding: 0;
          margin-top: 8px;
          display: block;
          font-size: 12px;
          font-family: 'DM Sans', sans-serif;
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
      `}</style>

      <div className="member-card">
        {photoUrl ? (
          <div className="member-photo-wrap">
            <img src={photoUrl} className="member-photo" alt={name} />
          </div>
        ) : (
          <div className="photo-placeholder">{name?.[0] ?? '?'}</div>
        )}

        <h3 className="member-name">{name}</h3>
        <p className="member-role">{role}</p>

        {bio && (
          <div>
            <p className={expanded ? 'member-bio-full' : 'member-bio-clamped'}>{bio}</p>
            {!expanded ? (
              <button className="member-bio-toggle" onClick={() => setExpanded(true)}>
                Read more ↓
              </button>
            ) : (
              <button className="member-bio-toggle" onClick={() => setExpanded(false)}>
                Show less ↑
              </button>
            )}
          </div>
        )}

        {email && (
          <a href={`mailto:${email}`} className="member-email">
            ↗ {email}
          </a>
        )}
      </div>
    </>
  )
}