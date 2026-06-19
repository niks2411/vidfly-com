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
    console.error("[GlobalError] Name:", error?.name);
    console.error("[GlobalError] Message:", error?.message);
    console.error("[GlobalError] Stack:", error?.stack);
    console.error("[GlobalError] Current URL:", window.location.href);

    const errorMessage = error?.message || "";
    const errorStack = error?.stack || "";

    // Detect DOM manipulation errors (insertBefore / removeChild conflicts)
    const isDomError =
      errorMessage.includes("insertBefore") ||
      errorMessage.includes("removeChild") ||
      errorMessage.includes("not a child of this node") ||
      errorMessage.includes("NotFoundError");

    if (isDomError) {
      console.error("[GlobalError] DOM manipulation error detected.");
      console.error("[GlobalError] This typically means a third-party library (e.g. Lenis, GTM, Clarity) modified the DOM outside React's control.");
      console.error("[GlobalError] Timestamp:", new Date().toISOString());
    }

    // Detect chunk loading errors and reload the page automatically
    const isChunkLoadFailed =
      /Loading chunk [\d]+ failed/i.test(errorMessage) ||
      /CSS chunk loading failed/i.test(errorMessage) ||
      /Failed to fetch dynamically imported module/i.test(errorMessage) ||
      /Importing a module script failed/i.test(errorMessage) ||
      /error loading dynamic import/i.test(errorMessage) ||
      errorMessage.includes("ChunkLoadError") ||
      errorStack.includes("ChunkLoadError");

    if (isChunkLoadFailed) {
      const lastReload = sessionStorage.getItem("last-chunk-reload");
      const now = Date.now();

      // Only reload if we haven't reloaded in the last 10 seconds (prevents loops)
      if (!lastReload || now - parseInt(lastReload, 10) > 10000) {
        sessionStorage.setItem("last-chunk-reload", now.toString());
        console.warn("Chunk loading failed. Reloading the application...");
        window.location.reload();
      }
    }
  }, [error]);

  const handleRefresh = () => {
    // Clear the reload timestamp to force a refresh
    sessionStorage.removeItem("last-chunk-reload");
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
