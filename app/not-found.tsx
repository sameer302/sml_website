import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .nf-root {
          font-family: 'DM Sans', sans-serif;
          background: #faf9f7;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }
        .nf-inner {
          max-width: 480px;
          text-align: center;
        }
        .nf-code {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 120px;
          font-weight: 400;
          color: #e5e0d8;
          line-height: 1;
          margin: 0 0 8px;
          letter-spacing: -0.04em;
        }
        .nf-rule {
          width: 40px;
          height: 1px;
          background: #c4b89a;
          margin: 0 auto 28px;
        }
        .nf-title {
          font-family: 'EB Garamond', Georgia, serif;
          font-size: 28px;
          font-weight: 400;
          color: #111;
          margin: 0 0 16px;
          letter-spacing: -0.01em;
        }
        .nf-title em {
          font-style: italic;
          color: #3d4f6e;
        }
        .nf-desc {
          font-size: 15px;
          line-height: 1.75;
          color: #5a5249;
          font-weight: 300;
          margin-bottom: 36px;
        }
        .nf-btn {
          display: inline-block;
          padding: 12px 28px;
          background: #3d4f6e;
          color: #fff;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 2px;
          transition: background 0.2s;
        }
        .nf-btn:hover { background: #2a3a55; }
      `}</style>

      <div className="nf-root">
        <div className="nf-inner">
          <p className="nf-code">404</p>
          <div className="nf-rule" />
          <h1 className="nf-title">Page <em>not found</em></h1>
          <p className="nf-desc">
            The page you're looking for doesn't exist or may have been moved.
          </p>
          <Link href="/" className="nf-btn">Back to Home</Link>
        </div>
      </div>
    </>
  )
}