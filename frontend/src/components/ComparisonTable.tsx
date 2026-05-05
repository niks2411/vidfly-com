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

    </section>
  );
};

export default ComparisonTable;


