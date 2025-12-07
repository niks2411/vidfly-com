import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CampaignLayout from "@/components/CampaignLayout";
import CampaignCard from "@/components/CampaignCard";
import ChannelSelector from "@/components/ChannelSelector";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Play, Layers, Settings, CreditCard } from "lucide-react";
import CampaignHeader from "@/components/CampaignHeader";
import { getVerifiedEmail } from "@/lib/verifiedEmail";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "http://localhost:5000";

const menuItems = [
  "Promote Video / Short",
  "Promote Channel",
  "Manage Channels",
  "Buy Packages",
  "Buy Bulk Views",
];

type StoredVideo = {
  title: string;
  author?: string;
  videoId: string;
  thumbnail: string;
  link: string;
  channelId?: string | null;
};

const STORAGE_KEY = "vidfly_channel_videos";

const CampaignDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const stateEmail = (location.state as { email?: string } | null)?.email;
  const verifiedEmail =
    stateEmail?.trim().toLowerCase() || getVerifiedEmail();
  const displayEmail = verifiedEmail || "Email not verified";

  useEffect(() => {
    if (!verifiedEmail) {
      navigate("/get-started", { replace: true });
    }
  }, [verifiedEmail, navigate]);

  const [youtubeLink, setYoutubeLink] = useState("");
  const [videoInfo, setVideoInfo] = useState<{
    title: string;
    author?: string;
    videoId: string;
    thumbnail: string;
  } | null>(null);
  const [videoError, setVideoError] = useState("");
  const [loadingVideo, setLoadingVideo] = useState(false);

  useEffect(() => {
    if (!youtubeLink) {
      setVideoInfo(null);
      setVideoError("");
      return;
    }
    if (
      !youtubeLink.includes("youtube.com") &&
      !youtubeLink.includes("youtu.be")
    ) {
      setVideoInfo(null);
      setVideoError("");
      return;
    }

    const timeoutId = setTimeout(() => {
      fetchVideoInfo(youtubeLink);
    }, 700);

    return () => clearTimeout(timeoutId);
  }, [youtubeLink]);

  const fetchVideoInfo = async (url: string) => {
    try {
      setLoadingVideo(true);
      setVideoError("");
      const response = await fetch(`${API_BASE_URL}/api/youtube/info`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.message || "Could not fetch video info");
      }

      const data = await response.json();
      const payload: StoredVideo = {
        title: data.title,
        author: data.author,
        videoId: data.videoId,
        thumbnail: data.thumbnail,
        link: url,
        channelId: data.channelId || null,
      };
      setVideoInfo(payload);
      persistVideo(payload);
    } catch (err) {
      setVideoInfo(null);
      const message =
        err instanceof Error ? err.message : "Could not fetch video info";
      setVideoError(message);
      const videoIdMatch = url.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
      );
      if (videoIdMatch && videoIdMatch[1]) {
        const fallback: StoredVideo = {
          title: "YouTube Video",
          author: "YouTube",
          videoId: videoIdMatch[1],
          thumbnail: `https://img.youtube.com/vi/${videoIdMatch[1]}/hqdefault.jpg`,
          link: url,
          channelId: null,
        };
        setVideoInfo(fallback);
        persistVideo(fallback);
      }
    } finally {
      setLoadingVideo(false);
    }
  };

  const persistVideo = (video: StoredVideo) => {
    if (typeof window === "undefined") return;
    try {
      const existing: StoredVideo[] = JSON.parse(
        sessionStorage.getItem(STORAGE_KEY) || "[]"
      );
      const filtered = existing.filter((item) => item.videoId !== video.videoId);
      filtered.unshift(video);
      const limited = filtered.slice(0, 10);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(limited));
    } catch (err) {
      console.error("Failed to persist video", err);
    }
  };

  const handleLaunchCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifiedEmail) {
      setVideoError("Missing verified email. Please verify your email first.");
      return;
    }
    if (!videoInfo) {
      setVideoError("Please enter a valid YouTube link to continue.");
      return;
    }
    navigate("/campaign/budget", {
      state: {
        email: verifiedEmail,
        youtubeLink,
        youtubeLink,
        videoInfo,
        videos: [videoInfo],
      },
    });
  };

  return (
    <CampaignLayout activeSidebar="promote">
      <CampaignCard>
        {/* Top Section - Verified Email and Channel Selector */}
        <div className="flex items-center justify-end gap-3 mb-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-xs font-semibold text-slate-500 uppercase">Verified Email</span>
            <span className="text-sm font-semibold text-slate-900 truncate max-w-[200px]">
              {displayEmail}
            </span>
          </div>
          <ChannelSelector />
        </div>

        {/* Main Content */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-3">
                Promote videos with just ₹999
              </h1>
              <p className="text-slate-600 text-base leading-relaxed max-w-2xl">
                Enter your YouTube channel name, video URL, or Shorts link. Our team
                will review it, set up the campaign, and share tracking details
                with you.
              </p>
            </div>
            <Button
              variant="outline"
              className="rounded-xl border-red-600 text-red-600 hover:bg-red-50 whitespace-nowrap"
              onClick={() =>
                navigate("/campaign/channel", { state: { email: verifiedEmail } })
              }
            >
              PROMOTE ENTIRE CHANNEL
            </Button>
          </div>

          <form onSubmit={handleLaunchCampaign} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch">
              <div className="flex items-center gap-3 flex-1 bg-white border-2 border-slate-200 rounded-xl px-4 py-3">
                <Play className="h-5 w-5 text-red-600 flex-shrink-0" />
                <Input
                  type="text"
                  placeholder="Enter your YouTube video URL, or Shorts link"
                  className="border-0 shadow-none focus-visible:ring-0 text-base bg-transparent p-0"
                  value={youtubeLink}
                  onChange={(e) => setYoutubeLink(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-6 py-6 whitespace-nowrap"
              >
                LAUNCH CAMPAIGN
              </Button>
            </div>

            <div className="space-y-3">
              {loadingVideo && (
                <div className="border border-red-100 rounded-xl p-4 bg-red-50 text-red-700 text-sm">
                  Fetching video details...
                </div>
              )}
              {videoError && !videoInfo && (
                <div className="border border-red-100 rounded-xl p-4 bg-red-50 text-red-600 text-sm">
                  {videoError}
                </div>
              )}
              {videoInfo && (
                <div className="border-2 border-red-200 rounded-xl p-4 flex gap-4 bg-white">
                  <img
                    src={videoInfo.thumbnail}
                    alt={videoInfo.title}
                    className="w-32 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="text-base font-semibold text-slate-900 line-clamp-2 mb-1">
                      {videoInfo.title}
                    </p>
                    {videoInfo.author && (
                      <p className="text-sm text-slate-600">
                        by {videoInfo.author}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Professional Animated Flow with Curly Arrows */}
        <div className="mt-12 mb-8">
          <div className="relative max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0 relative">
            {/* Step 1 */}
            <motion.div
              className="flex flex-col items-center text-center z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <motion.div
                className="relative mb-3 w-16 h-16"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 200 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-red-500 to-pink-500 rounded-full"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(239, 68, 68, 0.5)",
                      "0 0 35px rgba(239, 68, 68, 0.8)",
                      "0 0 20px rgba(239, 68, 68, 0.5)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <Layers className="h-8 w-8 text-white" />
                </div>
              </motion.div>
              <h3 className="text-base font-semibold text-slate-900 mb-1 max-w-[140px]">
                Enter Video Link
              </h3>
              <p className="text-xs text-slate-500 max-w-[140px]">
                Choose your video to promote
              </p>
            </motion.div>

            {/* Curly Arrow 1 - Larger and Smoother */}
            <div className="hidden md:block relative w-64 h-32 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 300 120" fill="none" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="50%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M 20 60 Q 80 20, 150 50 Q 220 80, 280 60"
                  stroke="url(#gradient1)"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
                />
                <motion.path
                  d="M 280 60 L 265 55 M 280 60 L 265 65"
                  stroke="url(#gradient1)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: 1.5 }}
                />
                {/* Animated dot following the path */}
                <motion.circle
                  cx="0"
                  cy="0"
                  r="6"
                  fill="url(#gradient1)"
                  filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 0.5,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "linear",
                  }}
                >
                  <animateMotion
                    dur="1.5s"
                    begin="0.5s"
                    repeatCount="indefinite"
                    path="M 20 60 Q 80 20, 150 50 Q 220 80, 280 60"
                  />
                </motion.circle>
              </svg>
            </div>

            {/* Step 2 */}
            <motion.div
              className="flex flex-col items-center text-center z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <motion.div
                className="relative mb-3 w-16 h-16"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1, type: "spring", stiffness: 200 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-full"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(168, 85, 247, 0.5)",
                      "0 0 35px rgba(168, 85, 247, 0.8)",
                      "0 0 20px rgba(168, 85, 247, 0.5)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
                />
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <Settings className="h-8 w-8 text-white" />
                </div>
              </motion.div>
              <h3 className="text-base font-semibold text-slate-900 mb-1 max-w-[140px]">
                Set Up Campaign
              </h3>
              <p className="text-xs text-slate-500 max-w-[140px]">
                Choose audience & budget
              </p>
            </motion.div>

            {/* Curly Arrow 2 - Larger and Smoother */}
            <div className="hidden md:block relative w-64 h-32 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 300 120" fill="none" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M 20 60 Q 80 20, 150 50 Q 220 80, 280 60"
                  stroke="url(#gradient2)"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 2, ease: "easeInOut" }}
                />
                <motion.path
                  d="M 280 60 L 265 55 M 280 60 L 265 65"
                  stroke="url(#gradient2)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: 3 }}
                />
                {/* Animated dot following the path */}
                <motion.circle
                  cx="0"
                  cy="0"
                  r="6"
                  fill="url(#gradient2)"
                  filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 2,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "linear",
                  }}
                >
                  <animateMotion
                    dur="1.5s"
                    begin="2s"
                    repeatCount="indefinite"
                    path="M 20 60 Q 80 20, 150 50 Q 220 80, 280 60"
                  />
                </motion.circle>
              </svg>
            </div>

            {/* Step 3 */}
            <motion.div
              className="flex flex-col items-center text-center z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              <motion.div
                className="relative mb-3 w-16 h-16"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1.7, type: "spring", stiffness: 200 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-cyan-500 rounded-full"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(59, 130, 246, 0.5)",
                      "0 0 35px rgba(59, 130, 246, 0.8)",
                      "0 0 20px rgba(59, 130, 246, 0.5)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1, ease: "easeInOut" }}
                />
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <CreditCard className="h-8 w-8 text-white" />
                </div>
              </motion.div>
              <h3 className="text-base font-semibold text-slate-900 mb-1 max-w-[140px]">
                Make Payment
              </h3>
              <p className="text-xs text-slate-500 max-w-[140px]">
                Approve ad delivery
              </p>
            </motion.div>
          </div>
          </div>
        </div>
      </CampaignCard>
    </CampaignLayout>
  );
};

export default CampaignDashboard;

