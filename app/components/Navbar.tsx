'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/people', label: 'People' },
  { href: '/research', label: 'Research' },
  { href: '/publications', label: 'Publications' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          width: 100%;
          background: #faf9f7;
          border-bottom: 1px solid #e5e0d8;
          font-family: 'DM Sans', sans-serif;
        }

        .navbar__inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 40px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* ── WORDMARK ── */
        .navbar__brand {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          line-height: 1.1;
        }
        .navbar__brand-main {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 18px;
          font-weight: 500;
          color: #111;
          letter-spacing: -0.01em;
        }
        .navbar__brand-sub {
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #8a7e6e;
        }

        /* ── LINKS ── */
        .navbar__links {
          display: flex;
          align-items: center;
          gap: 0;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .navbar__link {
          position: relative;
          text-decoration: none;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.04em;
          color: #5a5249;
          padding: 8px 16px;
          transition: color 0.2s ease;
        }
        .navbar__link::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 16px;
          right: 16px;
          height: 1px;
          background: #3d4f6e;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s ease;
        }
        .navbar__link:hover {
          color: #111;
        }
        .navbar__link:hover::after {
          transform: scaleX(1);
        }
        .navbar__link--active {
          color: #111;
          font-weight: 500;
        }
        .navbar__link--active::after {
          transform: scaleX(1);
          background: #3d4f6e;
        }

        /* ── MOBILE HAMBURGER ── */
        .navbar__hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 4px;
        }
        .navbar__hamburger span {
          display: block;
          width: 22px;
          height: 1.5px;
          background: #3d4f6e;
          transition: transform 0.25s ease, opacity 0.25s ease;
          transform-origin: center;
        }
        .navbar__hamburger--open span:nth-child(1) {
          transform: translateY(6.5px) rotate(45deg);
        }
        .navbar__hamburger--open span:nth-child(2) {
          opacity: 0;
        }
        .navbar__hamburger--open span:nth-child(3) {
          transform: translateY(-6.5px) rotate(-45deg);
        }

        /* ── MOBILE MENU ── */
        .navbar__mobile {
          display: none;
          flex-direction: column;
          background: #faf9f7;
          border-top: 1px solid #e5e0d8;
          padding: 12px 0 20px;
        }
        .navbar__mobile-link {
          text-decoration: none;
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0.04em;
          color: #5a5249;
          padding: 12px 40px;
          border-left: 2px solid transparent;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
        }
        .navbar__mobile-link:hover,
        .navbar__mobile-link--active {
          color: #111;
          border-left-color: #3d4f6e;
          background: #f3f0eb;
        }

        @media (max-width: 768px) {
          .navbar__links { display: none; }
          .navbar__hamburger { display: flex; }
          .navbar__mobile { display: flex; }
          .navbar__inner { padding: 0 24px; }
        }
      `}</style>

      <nav className="navbar">
        <div className="navbar__inner">

          {/* WORDMARK */}
          <Link href="/" className="navbar__brand">
            <span className="navbar__brand-main">Sensing & Monitoring Lab</span>
            <span className="navbar__brand-sub">IIT Bombay</span>
          </Link>

          {/* DESKTOP LINKS */}
          <ul className="navbar__links">
            {links.map(({ href, label }) => {
              const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`navbar__link${isActive ? ' navbar__link--active' : ''}`}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* HAMBURGER */}
          <button
            className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="navbar__mobile">
            {links.map(({ href, label }) => {
              const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
              return (
                <Link
                  key={href}
                  href={href}
                  className={`navbar__mobile-link${isActive ? ' navbar__mobile-link--active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              )
            })}
          </div>
        )}
      </nav>
    </>
  )
}