import { X } from "lucide-react";
import { useState } from "react";

type AdPreviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  video: {
    title: string;
    thumbnail: string;
    author?: string;
    videoId: string;
    link: string;
  };
  viewCount?: string;
};

type AdType = "search" | "related" | "commercial";

const AdPreviewModal = ({
  isOpen,
  onClose,
  video,
  viewCount = "829,953",
}: AdPreviewModalProps) => {
  const [adType, setAdType] = useState<AdType>("search");
  const adTitle = video.title.split("|")[0]?.trim() || video.title;
  const channelName = video.author?.trim() || "Your Channel";
  const viewsLabel = viewCount || "829,953";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-2 sm:p-4">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-3xl max-h-[95vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-6 border-b border-slate-200 sticky top-0 bg-white z-10">
          <h2 className="text-lg sm:text-2xl font-bold text-slate-900">How will your Ad look like?</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 sm:p-2 hover:bg-slate-100 rounded-full"
          >
            <X className="h-5 w-5 sm:h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-6 space-y-4 sm:space-y-5">
          {/* YouTube-like Interface */}
          <div className="bg-slate-50 rounded-xl sm:rounded-2xl p-3 sm:p-6 border border-slate-200 shadow-inner flex flex-col gap-3 sm:gap-6 h-[340px] sm:h-[460px]">
            {/* YouTube Header */}
            <div className="flex items-center gap-2 sm:gap-4 pb-2 sm:pb-4 border-b border-slate-200">
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="flex items-center gap-1 rounded-md sm:rounded-lg bg-white border border-red-600 px-2 py-0.5 sm:px-3 sm:py-1 shadow-sm">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 sm:w-6 sm:h-6 text-red-600"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.4.6A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.8.6 9.4.6 9.4.6s7.6 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8Z" />
                    <path d="m9.75 15.02 6-3.02-6-3.02Z" fill="#fff" />
                  </svg>
                  <span className="text-sm sm:text-lg font-semibold text-slate-900">YouTube</span>
                </div>
              </div>
              <div className="flex-1 bg-white border border-slate-300 rounded-full px-3 py-1 sm:px-4 sm:py-2 text-[10px] sm:text-sm text-slate-500">
                Search YouTube
              </div>
            </div>

            {/* Ad Preview Content */}
            <div className="flex-1 flex overflow-hidden">
              {adType === "search" && (
                <div className="w-full flex flex-col gap-2 sm:gap-4 h-full">
                  <div className="flex flex-col gap-2 sm:gap-4 rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-2 sm:p-4 shadow-sm">
                    <div className="flex gap-2 sm:gap-4">
                      <img
                        src={video.thumbnail}
                        alt={adTitle}
                        className="w-28 h-16 sm:w-48 sm:h-28 rounded-lg sm:rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="inline-flex items-center gap-1 text-[9px] sm:text-[11px] font-semibold text-amber-700 bg-amber-100 px-1.5 sm:px-2 py-0.5 rounded-full border border-amber-200">
                          <span className="text-[7px] sm:text-[9px] font-bold">AD</span> Sponsored
                        </span>
                        <h3 className="text-xs sm:text-base font-semibold text-slate-900 mt-1 sm:mt-2 line-clamp-2 leading-tight">
                          {adTitle}
                        </h3>
                        <p className="text-[10px] sm:text-sm text-slate-600 mt-0.5 sm:mt-1 truncate">{channelName}</p>
                        <p className="text-[9px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1">{viewsLabel} views</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 sm:space-y-3 flex-1 flex flex-col hidden sm:flex">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-8 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-r from-slate-200/70 to-slate-100 shrink-0"
                      />
                    ))}
                  </div>
                </div>
              )}

              {adType === "related" && (
                <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-6 h-full overflow-y-auto sm:overflow-visible">
                  <div className="flex-1 space-y-2 sm:space-y-4 flex flex-col shrink-0">
                    <div className="relative w-full rounded-xl sm:rounded-2xl bg-black aspect-video overflow-hidden border border-slate-200">
                      <img
                        src={video.thumbnail}
                        alt={adTitle}
                        className="w-full h-full object-cover opacity-90"
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600" />
                    </div>
                    <div className="space-y-1.5 sm:space-y-2">
                      <div className="h-3 sm:h-4 bg-slate-200 rounded w-2/3" />
                      <div className="h-2 sm:h-3 bg-slate-200 rounded w-1/3" />
                      <div className="h-2 sm:h-3 bg-slate-100 rounded w-full hidden sm:block" />
                    </div>
                  </div>
                  <div className="w-full sm:w-64 space-y-2 sm:space-y-3 shrink-0 pb-2">
                    <div className="flex gap-2 sm:gap-3 p-2 sm:p-3 bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-xl sm:rounded-2xl shadow-sm">
                      <div className="relative flex-shrink-0">
                        <img
                          src={video.thumbnail}
                          alt={adTitle}
                          className="w-24 h-14 sm:w-28 sm:h-18 rounded-lg sm:rounded-xl object-cover"
                        />
                        <div className="absolute top-1 left-1 bg-red-600 text-white text-[8px] sm:text-[10px] font-bold px-1 py-0.5 rounded-sm sm:rounded">
                          AD
                        </div>
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] sm:text-sm font-semibold text-slate-900 line-clamp-2 leading-tight">{adTitle}</p>
                        <p className="text-[9px] sm:text-xs text-slate-600 mt-0.5 sm:mt-1 truncate">{channelName}</p>
                        <p className="text-[9px] sm:text-xs text-slate-500">{viewsLabel} views</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {adType === "commercial" && (
                <div className="w-full flex flex-col gap-2 sm:gap-4 h-full">
                  <div className="relative w-full rounded-xl sm:rounded-3xl overflow-hidden bg-black shadow-md flex-1 min-h-[160px] sm:min-h-[260px] max-h-[180px] sm:max-h-[280px]">
                    <img
                      src={video.thumbnail}
                      alt={adTitle}
                      className="w-full h-full object-cover sm:object-contain opacity-90"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 sm:w-20 sm:h-20 bg-white/30 border sm:border-2 border-white/50 rounded-full flex items-center justify-center backdrop-blur">
                        <svg className="w-6 h-6 sm:w-10 sm:h-10 text-white ml-0.5 sm:ml-1" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-black/70 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded text-[10px] sm:text-sm font-semibold max-w-[70%] truncate">
                      {adTitle}
                    </div>
                    <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-white/90 text-slate-900 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-sm font-semibold shadow-sm">
                      Skip Ad
                    </div>
                    <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 bg-black/70 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded text-[9px] sm:text-xs flex items-center gap-1.5 sm:gap-2">
                      <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full sm:rounded-sm" />
                      0:03 / 0:15
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-red-600" />
                  </div>
                  <div className="flex items-center justify-between text-[10px] sm:text-sm text-slate-600 mt-1 sm:mt-0">
                    <div className="min-w-0 pr-2">
                      <p className="font-semibold text-slate-900 truncate">{channelName}</p>
                      <p className="text-[9px] sm:text-xs text-slate-500 truncate">{viewsLabel} views</p>
                    </div>
                    <div className="flex gap-2 sm:gap-3 text-[9px] sm:text-xs shrink-0">
                      <span className="px-2 py-1 sm:px-3 sm:py-1 rounded-full border border-slate-200 bg-white">Like</span>
                      <span className="px-2 py-1 sm:px-3 sm:py-1 rounded-full border border-slate-200 bg-white">Share</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Ad Type Tabs */}
          <div className="flex gap-2 sm:gap-4 border-b border-slate-200 overflow-x-auto hide-scrollbar snap-x relative">
            {[
              { key: "search", label: "YouTube Search" },
              { key: "related", label: "YouTube Related" },
              { key: "commercial", label: "As a Commercial" },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setAdType(tab.key as AdType)}
                className={`pb-2 sm:pb-3 px-2 sm:px-4 text-[11px] sm:text-sm font-semibold transition-colors relative whitespace-nowrap snap-start ${
                  adType === tab.key ? "text-red-600" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab.label}
                {adType === tab.key && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-t-lg" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdPreviewModal;

