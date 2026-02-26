"use client";

import { useRouter } from "next/navigation";

const features = [
  { text: "Ability to reach YouTubers based on their interests", vidflyy: true, googleAds: true },
  { text: "Create new campaigns easily", vidflyy: true, googleAds: false },
  { text: "Over 200 tried & tested audiences", vidflyy: true, googleAds: false },
  { text: "Ad copy crafted for your audience", vidflyy: true, googleAds: false },
  { text: "Ad compliance & review support", vidflyy: true, googleAds: false },
  { text: "Beginner-friendly reporting", vidflyy: true, googleAds: false },
  { text: "Dedicated account manager", vidflyy: true, googleAds: false },
];

const CheckIcon = () => (
  <div className="ct-icon ct-check">
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <path d="M3 8.5L6.5 12L14 5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const CrossIcon = () => (
  <div className="ct-icon ct-cross">
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <path d="M4.5 4.5L12.5 12.5M12.5 4.5L4.5 12.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  </div>
);

const COL_ICON = "var(--ct-col, clamp(72px, 12vw, 140px))";

const ComparisonTable = () => {
  const router = useRouter();

  return (
    <section className="ct-section">
      <div className="ct-container">

        {/* ── Header row: heading left | logo cards right ── */}
        <div className="ct-header-row">

          {/* Left: heading + description */}
          <div className="ct-header-left">
            <h2 className="section-heading">
              The smarter way to{" "}
              <span className="text-red-600">grow on YouTube</span>
            </h2>
            <p className="section-desc">
              Most creators waste weeks and thousands of rupees trying to figure out Google Ads.
              Vidflyy does it all for you — real targeting, real views, real growth.
              Setup takes 3 minutes. Results start in hours.
            </p>
          </div>

          {/* Right: two logo cards */}
          <div className="ct-logo-card ct-vidflyy-card">
            <img
              src="/lovable-uploads/0b27d722-c6a7-47e3-ae7d-aeb8461db170.png"
              alt="Vidflyy"
              className="ct-logo-img"
            />
          </div>
          <div className="ct-logo-card ct-google-card">
            <img
              src="/google ads.webp"
              alt="Google Ads"
              className="ct-gads-icon"
            />
            <span className="ct-gads-text">Google Ads</span>
          </div>
        </div>

        {/* ── Feature rows ── */}
        <div className="ct-table">
          {features.map((feature, i) => (
            <div key={i} className={`ct-row ${i % 2 !== 0 ? "ct-row-alt" : ""}`}>
              <div className="ct-feat">{feature.text}</div>
              <div className="ct-cell">
                {feature.vidflyy ? <CheckIcon /> : <CrossIcon />}
              </div>
              <div className="ct-cell">
                {feature.googleAds ? <CheckIcon /> : <CrossIcon />}
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .ct-section {
          background: #fff;
          padding: clamp(2.5rem, 6vw, 5rem) clamp(0.5rem, 2vw, 1rem) clamp(3rem, 7vw, 6rem);
          font-family: 'Montserrat', sans-serif;
        }

        .ct-container {
          max-width: min(1200px, 98vw);
          margin: 0 auto;
        }

        /* ── Header row ── */
        .ct-header-row {
          display: grid;
          grid-template-columns: 1fr ${COL_ICON} ${COL_ICON};
          align-items: flex-end;
          column-gap: 12px;
          margin-bottom: 1rem;
        }

        .ct-header-left {
          padding-right: clamp(1rem, 3vw, 2.5rem);
          padding-bottom: 0;
          margin-top: 1rem;
        }

        .ct-heading {
          font-size: clamp(1.4rem, 3vw, 2.2rem);
          font-weight: 900;
          line-height: 1.22;
          color: #111;
          margin: 0 0 0.75rem;
        }

        .ct-highlight {
          color: #e52020;
        }

        .ct-sub {
          font-size: clamp(0.78rem, 1.2vw, 0.92rem);
          color: #555;
          line-height: 1.75;
          margin: 0;
        }

        /* Logo cards sizing */
        .ct-logo-cards {
          display: none; /* Just a safety, children are now direct grid members */
        }

        .ct-logo-card {
          display: flex;
          align-items: center;
          justify-content: center;
          height: clamp(60px, 7vw, 80px);
          border-radius: 0.625rem;
          background: #fff;
          margin-bottom: 40px;
        }

        .ct-vidflyy-card {
          border: 2.5px solid #2563eb;
        }

        .ct-google-card {
          border: 1.5px solid #d1d5db;
          flex-direction: column;
          gap: 4px;
        }

        .ct-logo-img {
          height: clamp(20px, 2.5vw, 30px);
          width: auto;
          object-fit: contain;
        }

        .ct-gads-icon {
          width: clamp(20px, 2.5vw, 28px);
          height: clamp(20px, 2.5vw, 28px);
          object-fit: contain;
          flex-shrink: 0;
        }

        .ct-gads-text {
          font-size: clamp(0.6rem, 0.9vw, 0.75rem);
          font-weight: 700;
          color: #333;
          letter-spacing: 0.01em;
          white-space: nowrap;
        }

        @media (max-width: 480px) {
          .ct-section {
            --ct-col: 80px;
          }
          .ct-logo-card {
            height: 60px;
            width: 80px;
            border-radius: 0.5rem;
            padding: 4px;
            flex-shrink: 0;
            min-width: 0;
          }
          .ct-logo-img {
            height: 22px;
            width: auto;
            max-width: 90%;
          }
          .ct-gads-icon {
            width: 18px;
            height: 18px;
          }
          .ct-gads-text {
            font-size: 0.6rem;
            letter-spacing: 0;
          }
          .ct-header-left {
            padding-right: 4px;
            min-width: 0;
          }
          .ct-heading {
            font-size: 1.15rem;
          }
          .ct-sub {
            display: none;
          }
        }

        /* ── Feature table ── */
        .ct-table {
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          overflow: hidden;
        }

        .ct-row {
          display: grid;
          grid-template-columns: 1fr ${COL_ICON} ${COL_ICON};
          column-gap: 12px;
          align-items: center;
          border-bottom: 1px solid #e5e7eb;
          background: #fff;
          transition: background 0.12s;
        }

        .ct-row:last-child {
          border-bottom: none;
        }

        .ct-row-alt {
          background: #f9fafb;
        }

        .ct-row:hover {
          background: #f3f4f6;
        }

        .ct-feat {
          padding: clamp(0.7rem, 1.2vw, 0.9rem) clamp(0.75rem, 1.5vw, 1.25rem);
          font-size: clamp(0.72rem, 1.1vw, 0.88rem);
          font-weight: 600;
          color: #222;
          line-height: 1.45;
        }

        .ct-cell {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(0.7rem, 1.2vw, 0.9rem) 0.625rem;
        }

        /* ── Icons ── */
        .ct-icon {
          width: clamp(24px, 2.5vw, 30px);
          height: clamp(24px, 2.5vw, 30px);
          border-radius: 0.375rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .ct-check { background: #2563eb; }
        .ct-cross { background: #ef4444; }

        /* ── Responsive ── */
        @media (max-width: 760px) {
          .ct-header-row {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .ct-logo-cards {
            display: flex;
          }

          .ct-logo-card {
            flex: 1;
          }

          .ct-vidflyy-card {
            margin-right: 0;
          }

          .ct-header-left {
            padding-right: 0;
            padding-bottom: 0;
          }

          .ct-heading { font-size: 1.55rem; }

          .ct-row,
          .ct-header-row {
            grid-template-columns: 1fr 90px 90px;
          }
        }

        @media (max-width: 480px) {
          .ct-section { padding: 48px 16px 64px; }
          .ct-feat { font-size: 0.75rem; padding: 12px; }
        }
      `}</style>
    </section>
  );
};

export default ComparisonTable;
