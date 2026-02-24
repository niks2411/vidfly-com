import React from "react";

const GoogleAdsSection = () => {
  const stats = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3056D3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      number: "8.9B+",
      label: "REAL VIEWS DELIVERED",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#3056D3">
          <rect x="2" y="4" width="20" height="16" rx="3" ry="3" />
          <path d="M10 8l5 4-5 4V8z" fill="white" />
        </svg>
      ),
      number: "58K+",
      label: "PROMOTED YOUTUBE CHANNEL",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#3056D3">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ),
      number: "56K+",
      label: "CREATORS LOVE US",
    },
  ];

  return (
    <section className="bg-white font-montserrat py-14 lg:py-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Row */}
        <div className="flex flex-col sm:flex-row justify-between gap-10 mb-16 lg:mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex-shrink-0 w-[52px] h-[52px] rounded-full bg-[#E2E5EB] flex items-center justify-center">
                {stat.icon}
              </div>
              <div>
                <div className="text-[30px] lg:text-[36px] font-extrabold text-[#0E172B] leading-none">
                  {stat.number}
                </div>
                <div className="text-[10px] lg:text-[11px] font-bold text-[#64748B] tracking-[0.1em] mt-1">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Google Partner Card */}
        <div className="border border-gray-200 rounded-xl p-8 lg:p-10 flex flex-col md:flex-row items-center gap-8">
          {/* Google Partner Badge */}
          <div className="flex-shrink-0">
            <div className="border border-gray-200 rounded-lg p-5 flex flex-col items-center relative">
              {/* External link icon */}
              <svg className="absolute top-3 right-3 w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
              </svg>
              {/* Google G Logo */}
              <svg width="48" height="48" viewBox="0 0 48 48" className="mb-2">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
              </svg>
              <span className="text-[14px] font-semibold text-[#0E172B]">Google Partner</span>
              <span className="bg-[#1A73E8] text-white text-[11px] font-bold px-4 py-1 rounded-sm mt-2 tracking-wide">PREMIER 2025</span>
            </div>
          </div>

          {/* Text Content */}
          <div>
            <h3 className="text-[20px] lg:text-[22px] font-bold text-[#0E172B] mb-2">
              Official Google Partner — Powered by Google Ads
            </h3>
            <p className="section-desc !mx-0 !text-left">
              Vidflyy promotes your YouTube content by running ad
              <br className="hidden sm:block" />
              campaigns via Google Ads on your behalf
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleAdsSection;
