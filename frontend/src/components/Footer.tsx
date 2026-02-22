import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const navLinks = [
    [
      { label: "Blog", url: "/blog" },
      { label: "FAQ", url: "/features" },
    ],
    [
      { label: "Terms of Service", url: "/terms-and-conditions" },
      { label: "Pricing", url: "/pricing" },
    ],
    [
      { label: "Privacy Policy", url: "/privacy-policy" },
      { label: "Disclaimer", url: "/disclaimer" },
    ],
    [
      { label: "About Us", url: "/features" },
      { label: "Refund Policy", url: "/refund-policy" },
    ],
    [
      { label: "Success Stories", url: "/success-stories" },
      { label: "Contact Us", url: "/contact" },
    ],
  ];

  const paymentMethods = ["VISA", "MC", "AMEX", "Discover", "Apple Pay", "G Pay", "PayPal"];

  return (
    <footer className="nf-footer" style={{ fontFamily: "'Montserrat', sans-serif" }}>

      {/* ── Band 1: Nav links + Trust badges ── */}
      <div className="nf-band1">
        <div className="nf-container">
          {/* Nav grid */}
          <nav className="nf-nav-grid">
            {navLinks.map((col, ci) => (
              <div key={ci} className="nf-nav-col">
                {col.map((link) => (
                  <Link
                    key={link.label}
                    to={link.url}
                    onClick={scrollToTop}
                    className="nf-nav-link"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>

          {/* Trust badges */}
          <div className="nf-badges">
            <div className="nf-premier-badge">
              {/* Google G logo SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="38" height="38">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                <path fill="none" d="M0 0h48v48H0z" />
              </svg>
              <div className="nf-premier-text">
                <span className="nf-premier-google">Google</span>
                <span className="nf-premier-label">Premier Partner</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Band 2: Contact + Payment methods ── */}
      <div className="nf-band2">
        <div className="nf-container">
          {/* Contact */}
          <div className="nf-contact">
            <a href="tel:+917355518761" className="nf-contact-item">
              <Phone size={15} strokeWidth={2} />
              <span>+91 7355518761</span>
            </a>
            <a href="mailto:info@videopromotion.digital" className="nf-contact-item">
              <Mail size={15} strokeWidth={2} />
              <span>info@videopromotion.digital</span>
            </a>
          </div>

          {/* Payment icons */}
          <div className="nf-payments">
            <div className="nf-pay-badge nf-pay-visa">VISA</div>
            <div className="nf-pay-badge nf-pay-mc">
              <span className="nf-mc-left">●</span>
              <span className="nf-mc-right">●</span>
            </div>
            <div className="nf-pay-badge nf-pay-amex">AMEX</div>
            <div className="nf-pay-badge nf-pay-disc">DISC</div>
            <div className="nf-pay-badge nf-pay-apple">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
              Pay
            </div>
            <div className="nf-pay-badge nf-pay-gpay">G Pay</div>
            <div className="nf-pay-badge nf-pay-paypal">
              <span style={{ color: "#003087", fontWeight: 800 }}>Pay</span>
              <span style={{ color: "#009cde", fontWeight: 800 }}>Pal</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Band 3: Copyright + App links + Social ── */}
      <div className="nf-band3">
        <div className="nf-container nf-band3-inner">
          {/* Left: copyright + disclaimer + address */}
          <div className="nf-copy-block">
            <p className="nf-copyright">© 2026, Vidflyy</p>
            <p className="nf-disclaimer">
              Vidflyy is an independent advertising service and is not associated with or endorsed by YouTube.
            </p>
            <div className="nf-lang">
              <span>🇮🇳</span>
              <span>English (IN)</span>
            </div>
          </div>

          {/* Right: app + social */}
          <div className="nf-right-block">
            {/* Social icons */}
            <div className="nf-social">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="nf-social-icon"
                aria-label="YouTube"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M21.58 7.19c-.23-.87-.9-1.55-1.77-1.78C18.25 5 12 5 12 5s-6.25 0-7.81.41c-.87.23-1.54.91-1.77 1.78C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.87.9 1.55 1.77 1.78C5.75 19 12 19 12 19s6.25 0 7.81-.41c.87-.23 1.54-.91 1.77-1.78C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z" /></svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="nf-social-icon"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="nf-social-icon"
                aria-label="X / Twitter"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .nf-footer {
          background: #f3f4f8;
          border-top: 1px solid #e0e2ea;
          font-size: clamp(0.78rem, 1vw, 0.95rem);
        }

        .nf-container {
          max-width: min(1300px, 98vw);
          margin: 0 auto;
          padding: 0 clamp(0.5rem, 1.5vw, 1rem);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
        }

        /* ── Band 1 ── */
        .nf-band1 {
          background: #fff;
          padding: clamp(1rem, 2.5vw, 1.5rem) 0;
          border-bottom: 1px solid #e0e2ea;
        }

        .nf-nav-grid {
          display: flex;
          gap: clamp(1rem, 3vw, 2.25rem);
          flex-wrap: wrap;
        }

        .nf-nav-col {
          display: flex;
          flex-direction: column;
          gap: 0.625rem;
        }

        .nf-nav-link {
          color: #333;
          text-decoration: none;
          font-size: clamp(0.72rem, 1vw, 0.85rem);
          font-weight: 500;
          white-space: nowrap;
          transition: color 0.18s;
        }

        .nf-nav-link:hover {
          color: #e52020;
        }

        .nf-badges {
          display: flex;
          gap: 10px;
          flex-shrink: 0;
        }

        /* Google Premier Partner pill badge */
        .nf-premier-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.625rem;
          border: 1.5px solid #dadce0;
          border-radius: 100px;
          padding: 0.5rem clamp(0.75rem, 1.5vw, 1.125rem) 0.5rem 0.75rem;
          background: #fff;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
        }

        .nf-premier-text {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          line-height: 1;
        }

        .nf-premier-google {
          font-size: clamp(0.78rem, 1vw, 0.92rem);
          font-weight: 400;
          color: #5f6368;
          letter-spacing: 0.01em;
        }

        .nf-premier-label {
          font-size: clamp(0.78rem, 1vw, 0.92rem);
          font-weight: 700;
          color: #202124;
          letter-spacing: 0.01em;
        }

        /* ── Band 2 ── */
        .nf-band2 {
          background: #fff;
          padding: clamp(0.75rem, 1.5vw, 1rem) 0;
          border-bottom: 1px solid #e0e2ea;
        }

        .nf-contact {
          display: flex;
          gap: clamp(1rem, 2.5vw, 1.75rem);
          flex-wrap: wrap;
        }

        .nf-contact-item {
          display: flex;
          align-items: center;
          gap: 0.44rem;
          color: #333;
          text-decoration: none;
          font-size: clamp(0.72rem, 1vw, 0.85rem);
          font-weight: 500;
          transition: color 0.18s;
        }

        .nf-contact-item:hover {
          color: #e52020;
        }

        /* Payment badges */
        .nf-payments {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .nf-pay-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          height: clamp(22px, 2vw, 28px);
          min-width: clamp(32px, 3vw, 42px);
          padding: 0 0.375rem;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          background: #fff;
          font-size: clamp(0.55rem, 0.8vw, 0.7rem);
          font-weight: 800;
          letter-spacing: 0.03em;
          white-space: nowrap;
          gap: 2px;
        }

        .nf-pay-visa  { color: #1a1f71; }
        .nf-pay-amex  { color: #007bc1; }
        .nf-pay-disc  { color: #f76f20; }
        .nf-pay-apple { color: #111; gap: 3px; }
        .nf-pay-gpay  { color: #555; letter-spacing: 0; }
        .nf-pay-paypal { gap: 0; }

        .nf-pay-mc {
          position: relative;
          overflow: visible;
          border: none;
          background: transparent;
          min-width: 36px;
          padding: 0;
        }

        .nf-mc-left {
          color: #eb001b;
          font-size: 1.4rem;
          line-height: 1;
          opacity: 0.95;
        }

        .nf-mc-right {
          color: #f79e1b;
          font-size: 1.4rem;
          line-height: 1;
          margin-left: -10px;
          opacity: 0.9;
        }

        /* ── Band 3 ── */
        .nf-band3 {
          background: #f3f4f8;
          padding: clamp(1rem, 2vw, 1.375rem) 0;
        }

        .nf-band3-inner {
          align-items: flex-start;
        }

        .nf-copy-block {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .nf-copyright {
          font-weight: 700;
          color: #111;
          font-size: clamp(0.72rem, 1vw, 0.85rem);
          margin: 0;
        }

        .nf-disclaimer {
          color: #2563eb;
          font-size: clamp(0.68rem, 0.9vw, 0.8rem);
          margin: 0;
          line-height: 1.5;
          max-width: min(580px, 90vw);
        }

        .nf-address {
          color: #555;
          font-size: clamp(0.66rem, 0.9vw, 0.78rem);
          margin: 0;
          line-height: 1.6;
        }

        .nf-lang {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          color: #555;
          font-size: clamp(0.66rem, 0.9vw, 0.78rem);
          margin-top: 0.25rem;
        }

        /* Right block */
        .nf-right-block {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 14px;
          flex-shrink: 0;
        }

        /* Social icons */
        .nf-social {
          display: flex;
          gap: 0.5rem;
        }

        .nf-social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: clamp(28px, 2.5vw, 36px);
          height: clamp(28px, 2.5vw, 36px);
          border-radius: 50%;
          border: 1px solid #d1d5db;
          background: #fff;
          color: #444;
          text-decoration: none;
          transition: border-color 0.18s, color 0.18s, background 0.18s;
        }

        .nf-social-icon:hover {
          background: #e52020;
          border-color: #e52020;
          color: #fff;
        }

        /* ── Responsive ── */
        @media (max-width: 860px) {
          .nf-container {
            flex-direction: column;
            align-items: flex-start;
          }

          .nf-badges {
            align-self: flex-start;
          }

          .nf-payments {
            justify-content: flex-start;
          }

          .nf-right-block {
            align-items: flex-start;
          }
        }

        @media (max-width: 560px) {
          .nf-nav-grid {
            gap: 20px;
          }

          .nf-app-buttons {
            flex-direction: column;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
