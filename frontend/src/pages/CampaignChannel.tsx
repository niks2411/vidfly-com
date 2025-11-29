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
      if (!channelId || !search.trim()) {
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
  }, [channelId, search]);

  const filteredVideos = useMemo(() => {
    if (search.trim()) {
      return searchResults;
    }
    if (tab === "recent" && channelVideos.length) {
      return channelVideos.slice(0, 5);
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
            <CampaignHeader>
              <div className="flex gap-2 text-xs font-semibold uppercase text-red-600">
                {["Enter Link", "Select Videos", "Budget & Targeting", "Payment"].map(
                  (step, index) => (
                    <div key={step} className="flex flex-col items-center w-24">
                      <div
                        className={`h-1.5 w-full rounded-full ${
                          index <= 1 ? "bg-red-600" : "bg-slate-200"
                        }`}
                      />
                      <span className="mt-2 text-slate-500 text-[11px] text-center">
                        {step}
                      </span>
                    </div>
                  )
                )}
              </div>
            </CampaignHeader>

            <div className="animate-fade-in delay-100">
              <p className="text-[11px] text-slate-500 uppercase font-semibold tracking-wide mb-1">
                Step 2
              </p>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r text-gray-800 bg-clip-text   mb-1.5 leading-tight">
                Select videos to promote
              </h1>
              <p className="text-slate-600 text-sm leading-relaxed">
                You can select up to five videos from your stored channel links.
              </p>
              {!channelId && (
                <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5 mt-2 inline-block">
                  💡 Tip: paste a video link from the same channel on the previous step to unlock
                  channel-wide recommendations.
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-4 animate-fade-in delay-200">
              {[
                { label: "Recent videos", value: "recent" },
                { label: "Relevant videos", value: "relevant" },
                { label: "All Videos", value: "all" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setTab(option.value as typeof tab)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold border-2 transition-all duration-300 hover:scale-105 ${
                    tab === option.value
                      ? "bg-gradient-to-r from-red-600 to-red-700 text-white border-red-600 shadow-lg"
                      : "border-slate-200 text-slate-600 hover:border-red-300 hover:bg-red-50"
                  }`}
                >
                  {option.label}
                </button>
              ))}
              <span className="text-xs font-semibold text-amber-700 bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 px-4 py-2 rounded-full shadow-sm">
                Max 5 videos
              </span>
              {filteredVideos.length > 0 && (
                <div className="flex gap-2 ml-auto">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-xs rounded-full border-red-300 text-red-600 hover:bg-red-50"
                    onClick={() => {
                      const availableIds = filteredVideos
                        .slice(0, 5)
                        .map((v) => v.videoId);
                      setSelectedIds(availableIds);
                    }}
                    disabled={selectedIds.length >= 5}
                  >
                    Select All
                  </Button>
                  {selectedIds.length > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="text-xs rounded-full border-slate-300 text-slate-600 hover:bg-slate-50"
                      onClick={() => setSelectedIds([])}
                    >
                      Deselect All
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

            <div className="mt-4">
              <div className="flex items-center gap-2 rounded-2xl border border-red-200 px-3 py-2 bg-white shadow-inner">
                <Search className="text-red-600" />
                <Input
                  placeholder="Search using your YouTube video title"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border-0 shadow-none focus-visible:ring-0"
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="text-red-600"
                  onClick={() => setSearch("")}
                >
                  Clear
                </Button>
              </div>
              {searchError && (
                <div className="mt-3 p-3 rounded-2xl bg-red-50 border border-red-100 text-sm text-red-600">
                  {searchError}
                </div>
              )}
            </div>

            <div className="mt-4 space-y-3">
              {loadingChannel && (
                <div className="p-3 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-sm">
                  Loading channel videos...
                </div>
              )}
              {filteredVideos.map((video) => {
                const isSelected = selectedIds.includes(video.videoId);
                return (
                  <div
                    key={video.videoId}
                    className={`flex flex-col md:flex-row items-center gap-3 border rounded-2xl p-3 ${
                      isSelected ? "bg-purple-50 border-red-200" : "bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-28 h-18 rounded-xl object-cover"
                      />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {video.title}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">{video.author}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleVideo(video.videoId)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                        isSelected
                          ? "bg-red-600 text-white border-red-600"
                          : "border-slate-300 text-slate-400"
                      }`}
                    >
                      {isSelected ? "✓" : ""}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-3">
              <div className="text-sm text-slate-500">
                {selectedIds.length} / 5 videos selected
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="rounded-2xl border-red-600 text-red-600 px-6"
                  onClick={() => navigate("/campaign", { state: { email: verifiedEmail } })}
                >
                  Add Channel
                </Button>
                <Button
                  className="rounded-2xl bg-red-600 hover:bg-red-700 px-6"
                  disabled={!selectedIds.length}
                  onClick={handleNext}
                >
                  Next
                </Button>
              </div>
            </div>
      </CampaignCard>

      <section className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: Play,
                title: "Select your best videos",
                desc: "Pick up to five videos to include in this channel campaign.",
              },
              {
                icon: Search,
                title: "Filter quickly",
                desc: "Search by title or use tabs to switch between lists.",
              },
              {
                icon: Play,
                title: "Next: Budget & Targeting",
                desc: "Tune campaign budgets, target audience, and goals.",
              },
            ].map((card) => (
              <CampaignCard
                key={card.title}
                className="flex flex-col gap-2"
                accent="subtle"
              >
                <span className="h-10 w-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                  <card.icon className="h-4 w-4" />
                </span>
                <h3 className="text-base font-semibold text-slate-900">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-500">{card.desc}</p>
              </CampaignCard>
            ))}
      </section>
    </CampaignLayout>
  );
};

export default CampaignChannel;

