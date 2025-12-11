import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CampaignLayout from "@/components/CampaignLayout";
import CampaignCard from "@/components/CampaignCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Play, Search } from "lucide-react";
import { getVerifiedEmail, getSelectedChannelKey } from "@/lib/verifiedEmail";

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
  const [tab, setTab] = useState<"recent" | "all">("recent");
  const [channelVideos, setChannelVideos] = useState<StoredVideo[]>([]);
  const [channelId, setChannelId] = useState<string | null>(null);
  const [loadingChannel, setLoadingChannel] = useState(false);
  const [channelError, setChannelError] = useState("");
  const [searchResults, setSearchResults] = useState<StoredVideo[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [hasSavedChannels, setHasSavedChannels] = useState(false);
  const [loadingSavedChannels, setLoadingSavedChannels] = useState(true);

  // Load saved channels from backend
  useEffect(() => {
    const loadSavedChannels = async () => {
      if (!verifiedEmail) {
        setLoadingSavedChannels(false);
        return;
      }
      
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/user-preferences/channels?email=${encodeURIComponent(verifiedEmail)}`,
          { credentials: "include" }
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data.channels && data.channels.length > 0) {
            setHasSavedChannels(true);
            // Set the selected channel if available
            if (data.selectedChannelId) {
              setChannelId(data.selectedChannelId);
              const channelKey = getSelectedChannelKey();
              localStorage.setItem(channelKey, data.selectedChannelId);
            } else if (data.channels.length > 0) {
              // Use first channel if no selected channel
              setChannelId(data.channels[0].channelId);
              const channelKey = getSelectedChannelKey();
              localStorage.setItem(channelKey, data.channels[0].channelId);
            }
          }
        }
      } catch (err) {
        console.warn("Failed to load saved channels:", err);
      } finally {
        setLoadingSavedChannels(false);
      }
    };
    
    loadSavedChannels();
  }, [verifiedEmail]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const parsed: StoredVideo[] = JSON.parse(
        sessionStorage.getItem(STORAGE_KEY) || "[]"
      );
      setVideos(parsed);
      setSelectedIds(parsed.slice(0, 5).map((video) => video.videoId));
      
      // Load selected channel from localStorage
      const channelKey = getSelectedChannelKey();
      const savedChannelId = localStorage.getItem(channelKey);
      if (savedChannelId) {
        setChannelId(savedChannelId);
      } else {
        const withChannel = parsed.find((video) => !!video.channelId);
        if (withChannel?.channelId) {
          setChannelId(withChannel.channelId);
          localStorage.setItem(channelKey, withChannel.channelId);
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
        const channelKey = getSelectedChannelKey();
        localStorage.setItem(channelKey, newChannelId);
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
    // Use fetched channel videos when available; otherwise fall back to stored videos
    if (channelVideos.length) {
      return channelVideos;
    }
    if (channelId) {
      return videos.filter((video) => video.channelId === channelId);
    }
    return videos;
  }, [channelVideos, videos, channelId]);

  useEffect(() => {
    const fetchSearch = async () => {
      // Only search when in "all videos" tab
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
          maxResults: "5",
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
        const mapped: StoredVideo[] = (data.videos || []).slice(0, 5).map((video: any) => ({
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
    // Only allow search in "all videos" tab
    if (tab === "all" && search.trim()) {
      return searchResults.slice(0, 5); // Limit to 5 videos
    }
    // Both "recent" and "all videos" should show the same recent list to save quota
    if (channelVideos.length) {
      return channelVideos.slice(0, 5);
    }
    return mergedVideos.slice(0, 5);
  }, [tab, channelVideos, mergedVideos, search, searchResults]);

  const toggleVideo = (videoId: string) => {
    // Switch channel selector to match the channel of the selected video
    const video = mergedVideos.find((v) => v.videoId === videoId);
    if (video?.channelId && video.channelId !== channelId) {
      setChannelId(video.channelId);
      const channelKey = getSelectedChannelKey();
      localStorage.setItem(channelKey, video.channelId);
      // Notify ChannelSelector to update UI
      window.dispatchEvent(
        new CustomEvent("channelChanged", {
          detail: { channelId: video.channelId, channelName: video.author || "Channel" },
        })
      );
    }

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
    
    // Ensure channel is saved before navigation
    if (primary.channelId) {
      const channelKey = getSelectedChannelKey();
      localStorage.setItem(channelKey, primary.channelId);
      // Notify ChannelSelector to update UI
      window.dispatchEvent(
        new CustomEvent("channelChanged", {
          detail: { channelId: primary.channelId, channelName: primary.author || "Channel" },
        })
      );
    }
    
    navigate("/campaign/budget", {
      state: {
        email: verifiedEmail,
        youtubeLink: primary.link,
        videoInfo: primary,
        videos: selectedVideos,
      },
    });
  };

  // Show loading state while checking for saved channels
  if (loadingSavedChannels) {
    return (
      <CampaignLayout activeSidebar="channel">
        <CampaignCard className="text-center space-y-6 py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="text-slate-500">Loading your channels...</p>
        </CampaignCard>
      </CampaignLayout>
    );
  }

  // Only show "Add a Channel First" if there are no videos AND no saved channels AND no channelId
  if (!videos.length && !hasSavedChannels && !channelId) {
    return (
      <CampaignLayout activeSidebar="channel">
        <CampaignCard className="text-center space-y-6">
          <h1 className="text-3xl font-bold text-slate-900">Add a Channel First</h1>
          <p className="text-slate-500">
            We couldn't find any stored videos yet. Add a video link on the "Promote
            Video / Short" step to populate your channel library.
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
    <CampaignLayout activeSidebar="promote">
      <div className="w-full space-y-6">
        {/* Progress Bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-slate-600 uppercase">STEP 2 - SELECT VIDEOS</span>
          </div>
          <div className="flex items-center gap-2">
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

        <CampaignCard className="space-y-6">
            <div>
              <p className="text-xs text-slate-500 uppercase font-semibold mb-2">Step 2</p>
              <h1 className="text-3xl font-bold text-slate-900 mb-3">
                Select videos to promote
              </h1>
              <p className="text-slate-600 text-base leading-relaxed">
                You can select up to five videos from your stored channel links.
              </p>
              {!channelId && (
                <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 mt-3 inline-block">
                  💡 Tip: paste a video link from the same channel on the previous step to unlock
                  channel-wide recommendations.
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {[
                { label: "Recent videos", value: "recent" },
                { label: "All Videos", value: "all" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setTab(option.value as typeof tab)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-300 ${
                    tab === option.value
                      ? "bg-red-600 text-white border-red-600 shadow-lg"
                      : "border-slate-200 text-slate-600 hover:border-red-300 hover:bg-red-50"
                  }`}
                >
                  {option.label}
                </button>
              ))}
              <span className="text-xs font-semibold text-amber-700 bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 px-4 py-2 rounded-xl shadow-sm">
                Max 5 videos
              </span>
              {filteredVideos.length > 0 && (
                <div className="flex gap-2 ml-auto">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-xs rounded-xl border-red-300 text-red-600 hover:bg-red-50"
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
                      className="text-xs rounded-xl border-slate-300 text-slate-600 hover:bg-slate-50"
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

            {/* Only show search in "all videos" tab */}
            {tab === "all" && (
              <div>
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 bg-slate-50">
                  <Search className="text-slate-500" />
                  <Input
                    placeholder="Search using your YouTube video title"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border-0 shadow-none focus-visible:ring-0 bg-transparent"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-slate-600"
                    onClick={() => setSearch("")}
                  >
                    Clear
                  </Button>
                </div>
                {searchError && (
                  <div className="mt-3 p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">
                    {searchError}
                  </div>
                )}
              </div>
            )}

            <div className="space-y-4">
              {loadingChannel && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-sm">
                  Loading channel videos...
                </div>
              )}
              {filteredVideos.map((video) => {
                const isSelected = selectedIds.includes(video.videoId);
                return (
                  <div
                    key={video.videoId}
                    className={`flex flex-col md:flex-row items-center gap-4 border rounded-xl p-4 ${
                      isSelected ? "bg-red-50 border-red-200" : "bg-white border-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-32 h-20 rounded-xl object-cover"
                      />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {video.title}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">{video.author}</p>
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

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-slate-200">
              <div className="text-sm text-slate-500">
                {selectedIds.length} / 5 videos selected
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="rounded-xl border-slate-300 text-slate-600 px-6"
                  onClick={() => navigate("/campaign", { state: { email: verifiedEmail } })}
                >
                  Back
                </Button>
                <Button
                  className="rounded-xl bg-red-600 hover:bg-red-700 px-6"
                  disabled={!selectedIds.length}
                  onClick={handleNext}
                >
                  Continue
                </Button>
              </div>
            </div>
        </CampaignCard>
      </div>
    </CampaignLayout>
  );
};

export default CampaignChannel;

