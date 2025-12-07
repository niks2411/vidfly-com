import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CampaignHeader from "@/components/CampaignHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Play, Search } from "lucide-react";
import { getVerifiedEmail } from "@/lib/verifiedEmail";
import CampaignLayout from "@/components/CampaignLayout";
import CampaignCard from "@/components/CampaignCard";

type StoredVideo = {
  title: string;
  author?: string;
  videoId: string;
  thumbnail: string;
  link: string;
  channelId?: string | null;
};

const STORAGE_KEY = "vidfly_channel_videos";
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "http://localhost:5000";

const CampaignChannel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const stateEmail = (location.state as { email?: string } | null)?.email;
  const verifiedEmail =
    stateEmail?.trim().toLowerCase() || getVerifiedEmail();

  useEffect(() => {
    if (!verifiedEmail) {
      navigate("/get-started", { replace: true });
    }
  }, [verifiedEmail, navigate]);

  const [videos, setVideos] = useState<StoredVideo[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"recent" | "relevant" | "all">("recent");
  const [channelVideos, setChannelVideos] = useState<StoredVideo[]>([]);
  const [channelId, setChannelId] = useState<string | null>(null);
  const [loadingChannel, setLoadingChannel] = useState(false);
  const [channelError, setChannelError] = useState("");
  const [searchResults, setSearchResults] = useState<StoredVideo[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const parsed: StoredVideo[] = JSON.parse(
        sessionStorage.getItem(STORAGE_KEY) || "[]"
      );
      setVideos(parsed);
      setSelectedIds(parsed.slice(0, 5).map((video) => video.videoId));
      
      // Load selected channel from sessionStorage
      const SELECTED_CHANNEL_KEY = "vidfly_selected_channel";
      const savedChannelId = sessionStorage.getItem(SELECTED_CHANNEL_KEY);
      if (savedChannelId) {
        setChannelId(savedChannelId);
      } else {
        const withChannel = parsed.find((video) => !!video.channelId);
        if (withChannel?.channelId) {
          setChannelId(withChannel.channelId);
          sessionStorage.setItem(SELECTED_CHANNEL_KEY, withChannel.channelId);
        }
      }
    } catch (err) {
      console.error("Failed to load stored videos", err);
    }
  }, []);

  // Listen for channel changes from ChannelSelector
  useEffect(() => {
    const handleChannelChange = (event: CustomEvent) => {
      const { channelId: newChannelId } = event.detail;
      if (newChannelId) {
        setChannelId(newChannelId);
        sessionStorage.setItem("vidfly_selected_channel", newChannelId);
      }
    };

    window.addEventListener('channelChanged', handleChannelChange as EventListener);
    return () => {
      window.removeEventListener('channelChanged', handleChannelChange as EventListener);
    };
  }, []);

  useEffect(() => {
    const fetchChannelVideos = async () => {
      if (!channelId) return;
      try {
        setLoadingChannel(true);
        setChannelError("");
        const params = new URLSearchParams({
          channelId,
          maxResults: "15",
          order: "date",
        });
        const response = await fetch(
          `${API_BASE_URL}/api/youtube/channel-videos?${params.toString()}`
        );
        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data?.message || "Unable to load channel videos");
        }
        const data = await response.json();
        const mapped: StoredVideo[] = (data.videos || []).map((video: any) => ({
          title: video.title,
          author: video.author,
          videoId: video.videoId,
          thumbnail: video.thumbnail,
          link: `https://www.youtube.com/watch?v=${video.videoId}`,
          channelId,
        }));
        setChannelVideos(mapped);
      } catch (err) {
        setChannelError(
          err instanceof Error ? err.message : "Unable to load channel videos"
        );
      } finally {
        setLoadingChannel(false);
      }
    };
    fetchChannelVideos();
  }, [channelId]);

  const mergedVideos = useMemo(() => {
    // Filter videos by selected channel if channelId is set
    let videosToMerge = videos;
    if (channelId) {
      videosToMerge = videos.filter((video) => video.channelId === channelId);
    }
    
    const map = new Map<string, StoredVideo>();
    [...channelVideos, ...videosToMerge].forEach((video) => {
      if (!map.has(video.videoId)) {
        map.set(video.videoId, video);
      }
    });
    return Array.from(map.values());
  }, [channelVideos, videos, channelId]);

  useEffect(() => {
    const fetchSearch = async () => {
      // Only search when "all" tab is selected and search query exists
      if (!channelId || !search.trim() || tab !== "all") {
        setSearchResults([]);
        setSearchError("");
        return;
      }
      try {
        setSearchLoading(true);
        setSearchError("");
        const params = new URLSearchParams({
          channelId,
          maxResults: "15",
          query: search,
          order: "relevance",
        });
        const response = await fetch(
          `${API_BASE_URL}/api/youtube/channel-videos?${params.toString()}`
        );
        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data?.message || "Unable to search channel videos");
        }
        const data = await response.json();
        const mapped: StoredVideo[] = (data.videos || []).map((video: any) => ({
          title: video.title,
          author: video.author,
          videoId: video.videoId,
          thumbnail: video.thumbnail,
          link: `https://www.youtube.com/watch?v=${video.videoId}`,
          channelId,
        }));
        setSearchResults(mapped);
      } catch (err) {
        setSearchError(
          err instanceof Error ? err.message : "Unable to search channel videos"
        );
      } finally {
        setSearchLoading(false);
      }
    };
    fetchSearch();
  }, [channelId, search, tab]);

  const filteredVideos = useMemo(() => {
    // If searching in "all" tab, return search results
    if (tab === "all" && search.trim()) {
      return searchResults;
    }
    // Recent videos: show first 5
    if (tab === "recent" && channelVideos.length) {
      return channelVideos.slice(0, 5);
    }
    // All videos: show first 5 initially (to reduce API quota)
    if (tab === "all") {
      return mergedVideos.slice(0, 5);
    }
    return mergedVideos;
  }, [tab, channelVideos, mergedVideos, search, searchResults]);

  const toggleVideo = (videoId: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(videoId)) {
        return prev.filter((id) => id !== videoId);
      }
      if (prev.length >= 5) return prev;
      return [...prev, videoId];
    });
  };

  const handleNext = () => {
    if (!selectedIds.length) return;
    const videoMap = new Map(mergedVideos.map((video) => [video.videoId, video]));
    const selectedVideos = selectedIds
      .map((id) => videoMap.get(id))
      .filter(Boolean) as StoredVideo[];
    if (!selectedVideos.length) return;
    const primary = selectedVideos[0];
    navigate("/campaign/budget", {
      state: {
        email: verifiedEmail,
        youtubeLink: primary.link,
        videoInfo: primary,
        videos: selectedVideos,
      },
    });
  };

  if (!videos.length) {
    return (
      <CampaignLayout activeSidebar="channel">
        <CampaignCard className="text-center space-y-6">
          <h1 className="text-3xl font-bold text-slate-900">Add a Channel First</h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-base leading-relaxed">
            We couldn’t find any stored videos yet. Add a video link on the “Promote
            Video / Short” step to populate your channel library.
          </p>
          <Button
            onClick={() => navigate("/campaign", { replace: true })}
            className="bg-red-600 hover:bg-red-700 rounded-2xl px-6"
          >
            Go to Promote Video
          </Button>
        </CampaignCard>
      </CampaignLayout>
    );
  }

  return (
    <CampaignLayout activeSidebar="channel">
      <CampaignCard>
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            {["ENTER LINK", "SELECT VIDEOS", "BUDGET & TARGETING", "PAYMENT"].map(
              (step, index) => (
                <div key={step} className="flex-1 flex items-center">
                  <div className="flex-1 flex items-center gap-2">
                    <div className={`h-2 flex-1 rounded-full ${
                      index <= 1 ? "bg-red-600" : "bg-slate-200"
                    }`} />
                    {index < 3 && (
                      <div className={`h-2 w-2 rounded-full ${
                        index <= 1 ? "bg-red-600" : "bg-slate-200"
                      }`} />
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">STEP 2: Select videos to promote</h1>
          <p className="text-slate-600 text-sm">
            You can select up to five videos from your stored channel links.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          {[
            { label: "Recent videos", value: "recent" },
            { label: "Relevant videos", value: "relevant" },
            { label: "All Videos", value: "all" },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                setTab(option.value as typeof tab);
                // Clear search when switching tabs
                if (option.value !== "all") {
                  setSearch("");
                }
              }}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                tab === option.value
                  ? "bg-red-600 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-red-200"
              }`}
            >
              {option.label}
            </button>
          ))}
          <span className="px-4 py-2 rounded-full text-xs font-semibold text-red-600 bg-white border-2 border-red-600">
            Max 5 videos
          </span>
          {filteredVideos.length > 0 && (
            <div className="flex gap-2 ml-auto">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-xs rounded-full"
                onClick={() => {
                  const availableIds = filteredVideos
                    .slice(0, 5)
                    .map((v) => v.videoId);
                  setSelectedIds(availableIds);
                }}
                disabled={selectedIds.length >= 5}
              >
                SELECT ALL
              </Button>
              {selectedIds.length > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs rounded-full"
                  onClick={() => setSelectedIds([])}
                >
                  DESELECT ALL
                </Button>
              )}
            </div>
          )}
        </div>

            {channelError && (
              <div className="mt-4 p-3 rounded-2xl bg-red-50 border border-red-100 text-sm text-red-600">
                {channelError}
              </div>
            )}

        {tab === "all" && (
          <div className="mb-4">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 bg-white">
              <Search className="h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search videos by title"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border-0 shadow-none focus-visible:ring-0 bg-transparent"
              />
            </div>
            {searchError && (
              <div className="mt-3 p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">
                {searchError}
              </div>
            )}
            {searchLoading && (
              <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-sm text-slate-600">
                Searching videos...
              </div>
            )}
          </div>
        )}

        <div className="space-y-2">
          {loadingChannel && tab !== "all" && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm">
              Loading channel videos...
            </div>
          )}
          {filteredVideos.length === 0 && !loadingChannel && !searchLoading && (
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 text-sm text-center">
              {tab === "all" && search.trim() 
                ? "No videos found matching your search." 
                : "No videos available."}
            </div>
          )}
          {filteredVideos.map((video) => {
            const isSelected = selectedIds.includes(video.videoId);
            return (
              <div
                key={video.videoId}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-red-200 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-24 h-16 bg-slate-200 rounded-lg flex-shrink-0 overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 line-clamp-2">
                      {video.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{video.author}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleVideo(video.videoId)}
                  className={`w-6 h-6 rounded-full flex items-center justify-center border-2 flex-shrink-0 ${
                    isSelected
                      ? "bg-red-600 border-red-600"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {isSelected && (
                    <span className="text-white text-xs font-bold">✓</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200">
          <Button
            variant="outline"
            className="rounded-xl"
            onClick={() => navigate("/campaign", { state: { email: verifiedEmail } })}
          >
            Back
          </Button>
          <Button
            className="rounded-xl"
            disabled={!selectedIds.length}
            onClick={handleNext}
          >
            Continue
          </Button>
        </div>
      </CampaignCard>
    </CampaignLayout>
  );
};

export default CampaignChannel;

