import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Play, Layers, Settings, CreditCard } from "lucide-react";
import CampaignSidebar from "@/components/CampaignSidebar";
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-purple-50 font-montserrat">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 flex flex-col gap-8 lg:flex-row">
        <CampaignSidebar active="promote" />

        <main className="flex-1 space-y-8">
          <section className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 animate-fade-in hover:shadow-2xl transition-all duration-300">
            <CampaignHeader />
            <div className="flex items-center gap-3 mb-6 animate-slide-in-left">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg hover:scale-110 transition-transform duration-300">
                <Play className="h-6 w-6" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
                  Verified email
                </p>
            <p className="font-semibold text-lg text-slate-900 truncate max-w-[220px]">
                  {displayEmail}
                </p>
              </div>
            </div>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="animate-fade-in delay-100">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent mb-3">
              Promote videos with just <span className="text-red-600">₹999</span>
            </h1>
            <p className="text-slate-600 mb-6 max-w-2xl text-lg leading-relaxed">
              Enter your YouTube channel name, video URL, or Shorts link. Our team
              will review it, set up the campaign, and share tracking details
              with you.
            </p>
          </div>
          <Button
            variant="outline"
            className="rounded-2xl border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-300 hover:scale-105 shadow-lg animate-fade-in delay-200"
            onClick={() =>
              navigate("/campaign/channel", { state: { email: verifiedEmail } })
            }
          >
            Promote entire channel
          </Button>
        </div>

            <form onSubmit={handleLaunchCampaign} className="space-y-4 animate-fade-in delay-300">
              <div className="rounded-3xl border-2 border-purple-200/50 bg-gradient-to-r from-white to-purple-50/30 flex flex-col gap-3 sm:flex-row sm:items-center p-4 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-3 flex-1">
                  <div className="h-12 w-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <Play className="h-6 w-6" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Enter your YouTube channel name, video URL, or Shorts link"
                    className="border-0 shadow-none focus-visible:ring-2 focus-visible:ring-purple-500/20 text-base bg-transparent"
                    value={youtubeLink}
                    onChange={(e) => setYoutubeLink(e.target.value)}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-2xl text-base px-8 py-6 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Launch Campaign
                </Button>
              </div>

              <div className="space-y-3">
                {loadingVideo && (
                  <div className="border border-purple-100 rounded-2xl p-4 bg-purple-50 text-purple-700 text-sm">
                    Fetching video details...
                  </div>
                )}
                {videoError && !videoInfo && (
                  <div className="border border-red-100 rounded-2xl p-4 bg-red-50 text-red-600 text-sm">
                    {videoError}
                  </div>
                )}
                {videoInfo && (
                  <div className="border-2 border-purple-200/50 rounded-2xl p-5 flex gap-4 bg-gradient-to-r from-white to-purple-50/30 shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in">
                    <img
                      src={videoInfo.thumbnail}
                      alt={videoInfo.title}
                      className="w-36 h-24 object-cover rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
                    />
                    <div className="flex-1">
                      <p className="text-lg font-bold text-slate-900 line-clamp-2 mb-2">
                        {videoInfo.title}
                      </p>
                      {videoInfo.author && (
                        <p className="text-sm text-slate-600 mt-1 font-medium">
                          by {videoInfo.author}
                        </p>
                      )}
                      <a
                        href={`https://www.youtube.com/watch?v=${videoInfo.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-700 text-sm font-semibold inline-flex items-center gap-2 mt-3 transition-colors duration-200"
                      >
                        View on YouTube <span>→</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </section>

          <section className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Layers,
                title: "Enter Channel / Video Link",
                desc: "Share the exact video or channel you want to promote.",
                gradient: "from-blue-500 to-blue-600",
              },
              {
                icon: Settings,
                title: "Set Up Campaign",
                desc: "Choose your target audience, budget, and timeline.",
                gradient: "from-purple-500 to-purple-600",
              },
              {
                icon: CreditCard,
                title: "Make Payment",
                desc: "Approve and pay after finalizing campaign details.",
                gradient: "from-red-500 to-red-600",
              },
            ].map((card, index) => (
              <div
                key={card.title}
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-6 flex flex-col gap-4 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-fade-in border border-white/20"
                style={{ animationDelay: `${(index + 1) * 0.1}s` }}
              >
                <span className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${card.gradient} text-white flex items-center justify-center shadow-lg`}>
                  <card.icon className="h-6 w-6" />
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default CampaignDashboard;

