"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[GlobalError]", error);
  }, [error]);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: "20px",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          color: "#0f172a",
        }}
      >
        <div
          style={{
            maxWidth: "400px",
            width: "100%",
            textAlign: "center",
            padding: "32px",
            borderRadius: "16px",
            border: "1px solid #f1f5f9",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
            background: "linear-gradient(135deg, #fff 0%, #fef2f2 100%)",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              margin: "0 auto 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              backgroundColor: "#fee2e2",
              color: "#dc2626",
            }}
          >
            <svg
              style={{ width: "40px", height: "40px" }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <h2
            style={{
              fontSize: "24px",
              fontWeight: "900",
              marginBottom: "12px",
              color: "#0f172a",
              letterSpacing: "-0.025em",
            }}
          >
            Application Error
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "#475569",
              lineHeight: "1.6",
              marginBottom: "24px",
              fontWeight: "500",
            }}
          >
            We encountered a system-wide interruption. Please refresh the page to reload the application.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <button
              onClick={handleRefresh}
              style={{
                width: "100%",
                padding: "14px 24px",
                fontSize: "15px",
                fontWeight: "700",
                color: "#fff",
                backgroundColor: "#dc2626",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "background-color 0.2s",
                boxShadow: "0 4px 6px -1px rgba(220, 38, 38, 0.1), 0 2px 4px -2px rgba(220, 38, 38, 0.1)",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#b91c1c")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#dc2626")}
            >
              Refresh Page
            </button>
            <button
              onClick={() => reset()}
              style={{
                background: "none",
                border: "none",
                color: "#64748b",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                padding: "8px",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#334155")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#64748b")}
            >
              Try rendering again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
