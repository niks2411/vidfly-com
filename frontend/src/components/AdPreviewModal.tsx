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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl mx-4 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900">How will your Ad look like?</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-100 rounded-full"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* YouTube-like Interface */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-inner flex flex-col gap-6 h-[460px]">
            {/* YouTube Header */}
            <div className="flex items-center gap-4 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 rounded-lg bg-white border border-red-600 px-3 py-1 shadow-sm">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 text-red-600"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.4.6A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.8.6 9.4.6 9.4.6s7.6 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8Z" />
                    <path d="m9.75 15.02 6-3.02-6-3.02Z" fill="#fff" />
                  </svg>
                  <span className="text-lg font-semibold text-slate-900">YouTube</span>
                </div>
              </div>
              <div className="flex-1 bg-white border border-slate-300 rounded-full px-4 py-2 text-sm text-slate-500">
                Search YouTube
              </div>
            </div>

            {/* Ad Preview Content */}
            <div className="flex-1 flex">
              {adType === "search" && (
                <div className="w-full flex flex-col gap-4 h-full">
                  <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex gap-4">
                      <img
                        src={video.thumbnail}
                        alt={adTitle}
                        className="w-48 h-28 rounded-xl object-cover border border-slate-200"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                          <span className="text-[9px] font-bold">AD</span> Sponsored
                        </span>
                        <h3 className="text-base font-semibold text-slate-900 mt-2 line-clamp-2">
                          {adTitle}
                        </h3>
                        <p className="text-sm text-slate-600 mt-1">{channelName}</p>
                        <p className="text-xs text-slate-500 mt-1">{viewsLabel} views</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 flex-1">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-12 rounded-xl bg-gradient-to-r from-slate-200/70 to-slate-100"
                      />
                    ))}
                  </div>
                </div>
              )}

              {adType === "related" && (
                <div className="w-full flex gap-6 h-full">
                  <div className="flex-1 space-y-4 flex flex-col">
                    <div className="relative w-full rounded-2xl bg-slate-200 aspect-video overflow-hidden border border-slate-200">
                      <img
                        src={video.thumbnail}
                        alt={adTitle}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-slate-200 rounded w-2/3" />
                      <div className="h-3 bg-slate-200 rounded w-1/3" />
                      <div className="h-3 bg-slate-100 rounded w-full" />
                    </div>
                    <div className="flex-1 space-y-3">
                      {[1, 2].map((i) => (
                        <div key={i} className="h-16 bg-slate-100 rounded-xl" />
                      ))}
                    </div>
                  </div>
                    <div className="w-64 space-y-3 overflow-hidden">
                    <div className="flex gap-3 p-3 bg-gradient-to-r from-purple-50 to-purple-100 border-2 border-purple-200 rounded-2xl shadow-md">
                      <div className="relative flex-shrink-0">
                        <img
                          src={video.thumbnail}
                          alt={adTitle}
                          className="w-28 h-18 rounded-xl object-cover"
                        />
                        <div className="absolute top-1 left-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                          AD
                        </div>
                        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded">
                          10:30
                        </div>
                      </div>
                      <div className="text-sm">
                        <p className="font-semibold text-slate-900 line-clamp-2">{adTitle}</p>
                        <p className="text-xs text-slate-600 mt-1">{channelName}</p>
                        <p className="text-xs text-slate-500 mt-1">{viewsLabel} views</p>
                      </div>
                    </div>
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex gap-3">
                        <div className="w-28 h-18 bg-slate-200 rounded-xl" />
                        <div className="flex-1 space-y-2">
                          <div className="h-3 bg-slate-200 rounded" />
                          <div className="h-2 bg-slate-200 rounded w-3/4" />
                          <div className="h-2 bg-slate-100 rounded w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {adType === "commercial" && (
                <div className="w-full flex flex-col gap-4 h-full">
                  <div className="relative w-full rounded-3xl overflow-hidden bg-black shadow-xl flex-1 min-h-[260px]">
                    <img
                      src={video.thumbnail}
                      alt={adTitle}
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-white/30 border-2 border-white/50 rounded-full flex items-center justify-center backdrop-blur">
                        <svg className="w-10 h-10 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-md text-sm font-semibold">
                      {adTitle}
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white/90 text-slate-900 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Skip Ad
                    </div>
                    <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-md text-xs flex items-center gap-2">
                      <span className="inline-block w-2 h-2 bg-white rounded-sm" />
                      0:03 / 0:15
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600" />
                  </div>
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <div>
                      <p className="font-semibold text-slate-900">{channelName}</p>
                      <p className="text-xs">{viewsLabel} views</p>
                    </div>
                    <div className="flex gap-3 text-xs">
                      <span className="px-3 py-1 rounded-full border border-slate-200 bg-white">Like</span>
                      <span className="px-3 py-1 rounded-full border border-slate-200 bg-white">Share</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Ad Type Tabs */}
          <div className="flex gap-4 border-b border-slate-200">
            {[
              { key: "search", label: "YouTube Search" },
              { key: "related", label: "YouTube Related" },
              { key: "commercial", label: "As a Commercial" },
            ].map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setAdType(tab.key as AdType)}
                className={`pb-3 px-4 text-sm font-semibold transition-colors relative ${
                  adType === tab.key ? "text-red-600" : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab.label}
                {adType === tab.key && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-full" />
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

