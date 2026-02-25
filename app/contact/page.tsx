export const metadata = {
  title: "Contact | Sensing & Monitoring Lab",
  description: "Get in touch with the Sensing & Monitoring Lab at IIT Bombay for collaborations, positions, and enquiries.",
}

export default function ContactPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');

        .contact-root {
          font-family: 'DM Sans', sans-serif;
          background: #faf9f7;
          min-height: 100vh;
          color: #1a1a1a;
        }

        .contact-body {
          max-width: 1100px;
          margin: 0 auto;
          padding: 80px 40px 120px;
        }

        /* ── SECTION DIVIDER ── */
        .contact-divider {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 48px;
        }
        .contact-divider__label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #b0a898;
          white-space: nowrap;
        }
        .contact-divider__line {
          flex: 1;
          height: 1px;
          background: #e5e0d8;
        }

        /* ── CONTACT GRID ── */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
          margin-bottom: 80px;
        }

        /* ── INFO CARD ── */
        .contact-card {
          background: #fff;
          border: 1px solid #e8e3db;
          padding: 40px 36px;
        }
        .contact-card__eyebrow {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #b0a898;
          margin-bottom: 20px;
        }
        .contact-card__title {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 28px;
          font-weight: 400;
          color: #111;
          margin: 0 0 24px;
          line-height: 1.2;
        }
        .contact-card__title em {
          font-style: italic;
          color: #3d4f6e;
        }

        /* rows */
        .contact-row {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          padding: 16px 0;
          border-bottom: 1px solid #f0ece5;
        }
        .contact-row:last-child { border-bottom: none; }
        .contact-row__icon {
          width: 32px;
          height: 32px;
          border-radius: 2px;
          background: #f0ece5;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .contact-row__icon svg {
          width: 14px;
          height: 14px;
          stroke: #8a7e6e;
        }
        .contact-row__label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #b0a898;
          margin-bottom: 4px;
        }
        .contact-row__value {
          font-size: 14px;
          color: #4a4540;
          font-weight: 300;
          line-height: 1.6;
        }
        .contact-row__value a {
          color: #3d4f6e;
          text-decoration: none;
          font-weight: 500;
          border-bottom: 1px solid #c4d0e3;
          padding-bottom: 1px;
          transition: border-color 0.2s;
        }
        .contact-row__value a:hover { border-color: #3d4f6e; }

        /* ── MAP ── */
        .contact-map {
          border: 1px solid #e8e3db;
          overflow: hidden;
          height: 100%;
          min-height: 320px;
          position: relative;
        }
        .contact-map iframe {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0; left: 0;
          border: none;
          filter: grayscale(30%) contrast(1.05);
          transition: filter 0.4s ease;
        }
        .contact-map:hover iframe {
          filter: grayscale(0%) contrast(1);
        }

        /* ── JOIN US ── */
        .joinus {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
          margin-bottom: 80px;
        }
        .joinus__text {
          background: #3d4f6e;
          padding: 48px 40px;
        }
        .joinus__eyebrow {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #8fa8c8;
          margin-bottom: 16px;
        }
        .joinus__title {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 34px;
          font-weight: 400;
          color: #fff;
          margin: 0 0 20px;
          line-height: 1.2;
        }
        .joinus__title em {
          font-style: italic;
          opacity: 0.75;
        }
        .joinus__body {
          font-size: 14px;
          line-height: 1.85;
          color: #c4d0e3;
          font-weight: 300;
          margin-bottom: 32px;
        }
        .joinus__email-btn {
          display: inline-block;
          padding: 12px 24px;
          background: #faf9f7;
          color: #3d4f6e;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 2px;
          transition: background 0.2s;
        }
        .joinus__email-btn:hover { background: #fff; }

        .joinus__cards {
          display: grid;
          grid-template-rows: repeat(3, 1fr);
          gap: 2px;
        }
        .joinus__card {
          background: #fff;
          border: 1px solid #e8e3db;
          padding: 28px 32px;
          display: flex;
          align-items: center;
          gap: 20px;
          position: relative;
          overflow: hidden;
          transition: background 0.2s;
        }
        .joinus__card::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, #3d4f6e, #6b8cba);
          transform: scaleY(0);
          transform-origin: top;
          transition: transform 0.3s ease;
        }
        .joinus__card:hover::before { transform: scaleY(1); }
        .joinus__card:hover { background: #fdfcfa; }
        .joinus__card-num {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 36px;
          font-weight: 400;
          color: #e0dbd3;
          line-height: 1;
          flex-shrink: 0;
          width: 44px;
        }
        .joinus__card-title {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 20px;
          font-weight: 400;
          color: #111;
          margin: 0 0 4px;
        }
        .joinus__card-sub {
          font-size: 12px;
          color: #8a7e6e;
          font-weight: 300;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .contact-body { padding: 60px 24px 80px; }
          .contact-grid { grid-template-columns: 1fr; }
          .contact-map { min-height: 260px; position: relative; height: 260px; }
          .joinus { grid-template-columns: 1fr; }
          .joinus__cards { grid-template-rows: unset; grid-template-columns: 1fr; }
        }
      `}</style>

      <main className="contact-root">
        <div className="contact-body">

          {/* ── CONTACT INFO + MAP ── */}
          <div className="contact-divider">
            <span className="contact-divider__label">Contact</span>
            <div className="contact-divider__line" />
          </div>

          <div className="contact-grid">

            {/* INFO */}
            <div className="contact-card">
              <p className="contact-card__eyebrow">Get in touch</p>
              <h2 className="contact-card__title">
                Sensing & <em>Monitoring</em> Lab
              </h2>

              <div className="contact-row">
                <div className="contact-row__icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="contact-row__label">Address</p>
                  <p className="contact-row__value">
                    Koita Centre for Digital Health<br />
                    IIT Bombay, Powai, Mumbai — 400076<br />
                    Maharashtra, India
                  </p>
                </div>
              </div>

              <div className="contact-row">
                <div className="contact-row__icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="contact-row__label">Email</p>
                  <p className="contact-row__value">
                    <a href="mailto:npunjabi@iitb.ac.in">npunjabi@iitb.ac.in</a>
                  </p>
                </div>
              </div>

              <div className="contact-row">
                <div className="contact-row__icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <div>
                  <p className="contact-row__label">Website</p>
                  <p className="contact-row__value">
                    <a href="https://www.kcdh.iitb.ac.in" target="_blank" rel="noreferrer">
                      kcdh.iitb.ac.in
                    </a>
                  </p>
                </div>
              </div>

              <div className="contact-row">
                <div className="contact-row__icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" strokeWidth="1.5" />
                  </svg>
                </div>
                <div>
                  <p className="contact-row__label">LinkedIn</p>
                  <p className="contact-row__value">
                    <a href="https://www.linkedin.com/in/npunjabi108/" target="_blank" rel="noreferrer">
                      Prof. Nirmal Punjabi
                    </a>
                  </p>
                </div>
              </div>

              <div className="contact-row">
                <div className="contact-row__icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <div>
                  <p className="contact-row__label">Google Scholar</p>
                  <p className="contact-row__value">
                    <a href="https://scholar.google.com/citations?user=https://scholar.google.com/citations?hl=en&user=86tKGf8AAAAJ" target="_blank" rel="noreferrer">
                      View Publications
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* MAP */}
            <div className="contact-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.4846644937406!2d72.91587759999999!3d19.1302507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c7cdd0997009%3A0x62c5c13f16fcda81!2sKoita%20Centre%20for%20Digital%20Health!5e0!3m2!1sen!2sin!4v1772035970138!5m2!1sen!2sin"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="IIT Bombay location"
              />
            </div>
          </div>

          {/* ── JOIN US ── */}
          <div className="contact-divider">
            <span className="contact-divider__label">Join Us</span>
            <div className="contact-divider__line" />
          </div>

          <div className="joinus">

            {/* TEXT */}
            <div className="joinus__text">
              <p className="joinus__eyebrow">Opportunities</p>
              <h2 className="joinus__title">
                Work on problems that <em>matter.</em>
              </h2>
              <p className="joinus__body">
                We are always looking for motivated researchers and students passionate about digital health, medical devices, and AI. Whether you are a prospective PhD student, a Masters student looking for a thesis project, or an undergraduate interested in an internship — reach out with a brief introduction and your CV.
              </p>
              <p className="joinus__body" style={{ marginTop: '-16px' }}>
                For project collaborations and industry partnerships, write to us with details of your proposal.
              </p>
              <a href="mailto:npunjabi@iitb.ac.in" className="joinus__email-btn">
                ↗ Send an Email
              </a>
            </div>

            {/* OPPORTUNITY CARDS */}
            <div className="joinus__cards">
              {[
                { num: '01', title: 'PhD Positions', sub: 'Full-time doctoral research in sensing, diagnostics & AI for health.' },
                { num: '02', title: 'Masters Thesis', sub: 'Project-based thesis work aligned with ongoing lab research.' },
                { num: '03', title: 'Internships', sub: 'Short-term opportunities for motivated undergraduate students.' },
              ].map(item => (
                <div key={item.num} className="joinus__card">
                  <span className="joinus__card-num">{item.num}</span>
                  <div>
                    <p className="joinus__card-title">{item.title}</p>
                    <p className="joinus__card-sub">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </>
  )
}