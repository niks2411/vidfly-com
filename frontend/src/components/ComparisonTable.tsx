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

        {/* ── Header row: heading top | logos bottom on mobile ── */}
        <div className="ct-header-row">

          {/* Left: heading + description */}
          <div className="ct-header-left">
            <h2 className="section-heading text-left">
              The smarter way to{" "}
              <span className="text-red-600">grow on YouTube</span>
            </h2>
            <p className="section-desc text-left !mx-0">
              Most creators waste weeks and thousands of rupees trying to figure out Google Ads.
              Vidflyy does it all for you — real targeting, real views, real growth.
              Setup takes 3 minutes. Results start in hours.
            </p>
          </div>

          {/* Logos row - stacks below text on mobile, stays right on desktop */}
          <div className="ct-logo-row">
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
          padding: clamp(2.5rem, 6vw, 5rem) clamp(1rem, 2vw, 2rem);
          font-family: 'Founders Grotesk', sans-serif;
        }

        .ct-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* ── Header row ── */
        .ct-header-row {
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .ct-header-left {
          flex: 1;
        }

        .ct-logo-row {
          display: flex;
          gap: 12px;
          align-items: center;
          margin-bottom: 6px;
        }

        .ct-logo-card {
          display: flex;
          align-items: center;
          justify-content: center;
          width: clamp(100px, 12vw, 140px);
          height: clamp(60px, 7vw, 80px);
          border-radius: 0.625rem;
          background: #fff;
          flex-shrink: 0;
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
          height: 30%;
          width: auto;
          object-fit: contain;
        }

        .ct-gads-icon {
          width: clamp(20px, 2.5vw, 28px);
          height: clamp(20px, 2.5vw, 28px);
          object-fit: contain;
        }

        .ct-gads-text {
          font-size: 0.75rem;
          font-weight: 700;
          color: #333;
          white-space: nowrap;
        }

        /* ── Feature table ── */
        .ct-table {
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          overflow: hidden;
        }

        .ct-row {
          display: grid;
          grid-template-columns: 1fr 100px 100px;
          align-items: center;
          border-bottom: 1px solid #e5e7eb;
          background: #fff;
        }

        .ct-row:last-child {
          border-bottom: none;
        }

        .ct-row-alt {
          background: #f9fafb;
        }

        .ct-feat {
          padding: 1.25rem 1.5rem;
          font-size: 1rem;
          font-weight: 600;
          color: #111;
          line-height: 1.4;
        }

        .ct-cell {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .ct-icon {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ct-check { background: #2563eb; }
        .ct-cross { background: #ef4444; }

        /* ── Tablet/Mobile Responsiveness ── */
        @media (max-width: 1024px) {
          .ct-header-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.5rem;
          }

          .ct-logo-row {
            width: 100%;
            justify-content: flex-end;
            margin-bottom: 0;
          }

          .ct-logo-card {
            width: 120px;
            height: 70px;
          }
        }

        @media (max-width: 480px) {
          .ct-section { padding: 40px 16px; }
          .ct-header-left { margin-top: 0; }
          .ct-logo-card { width: 100px; height: 60px; }
          
          .ct-row {
            grid-template-columns: 1fr 50px 50px;
          }

          .ct-feat {
            padding: 1rem 0.75rem;
            font-size: 0.85rem;
          }

          .ct-cell {
            padding: 0.5rem;
          }

          .ct-icon {
            width: 24px;
            height: 24px;
          }

          .ct-icon svg {
            width: 14px;
            height: 14px;
          }
        }
      `}</style>
    </section>
  );
};

export default ComparisonTable;
