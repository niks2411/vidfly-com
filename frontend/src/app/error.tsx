"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error
    console.error("[RootError]", error);

    // Detect chunk loading errors and reload the page automatically
    const errorMessage = error?.message || "";
    const errorStack = error?.stack || "";
    
    const isChunkLoadFailed =
      /Loading chunk [\d]+ failed/i.test(errorMessage) ||
      /CSS chunk loading failed/i.test(errorMessage) ||
      /Failed to fetch dynamically imported module/i.test(errorMessage) ||
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
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 bg-white font-montserrat">
      <div className="max-w-md w-full text-center space-y-8 p-8 rounded-2xl border border-gray-100 shadow-xl bg-gradient-to-br from-white to-red-50/30">
        <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full bg-red-100 text-[#E52D27] animate-pulse">
          <svg
            className="w-12 h-12"
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

        <div className="space-y-3">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            Connection Interrupted
          </h2>
          <p className="text-gray-600 text-sm font-semibold leading-relaxed">
            The application has updated or encountered a temporary connection issue. Refreshing will load the latest version.
          </p>
        </div>

        <div className="pt-4 flex flex-col gap-3">
          <Button
            onClick={handleRefresh}
            className="bg-[#E52D27] hover:bg-[#D42621] text-white py-6 text-[15px] font-bold rounded-lg transition-all duration-300 w-full shadow-lg hover:shadow-red-500/20 shadow-red-500/10"
          >
            Refresh Page
          </Button>
          <button
            onClick={() => reset()}
            className="text-gray-500 hover:text-gray-800 text-sm font-bold py-2 transition-colors"
          >
            Try rendering again
          </button>
        </div>
      </div>
    </div>
  );
}
