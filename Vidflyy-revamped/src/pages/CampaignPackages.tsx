import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CampaignSidebar from "@/components/CampaignSidebar";
import CampaignHeader from "@/components/CampaignHeader";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { getVerifiedEmail } from "@/lib/verifiedEmail";

const STORAGE_KEY = "vidfly_channel_videos";

const packages = [
  {
    id: "monetization",
    name: "YouTube Monetization Package",
    price: "$1499",
    oldPrice: "$1999",
    discount: "25% off",
    description: "Unlock monetization with guaranteed watch hours and subscribers.",
    accent: "bg-pink-50",
  },
  {
    id: "silver",
    name: "YouTube Silver Play Package",
    price: "Starting from $499",
    description: "Grow towards 100K subscribers with dedicated campaigns.",
    accent: "bg-purple-50",
  },
  {
    id: "bulk-views",
    name: "YouTube Bulk Views Packages",
    price: "Starting from $249",
    description: "High-volume views for your library of content.",
    accent: "bg-blue-50",
  },
];

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "http://localhost:5000";

type StoredVideo = {
  title: string;
  author?: string;
  videoId: string;
  thumbnail: string;
  link: string;
  channelId?: string | null;
};

type ChannelInfo = {
  channelId: string;
  name: string;
  avatar: string | null;
  description?: string;
  subscriberCount?: number;
  videoCount?: number;
};

const CampaignPackages = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const verifiedEmail = getVerifiedEmail();
  
  const [storedVideos, setStoredVideos] = useState<StoredVideo[]>([]);
  const [channelInfo, setChannelInfo] = useState<ChannelInfo | null>(
    (location.state as { channelInfo?: ChannelInfo })?.channelInfo || null
  );
  const [loadingChannel, setLoadingChannel] = useState(false);
  const [channelError, setChannelError] = useState("");

  // Load stored videos from sessionStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const parsed: StoredVideo[] = JSON.parse(
        sessionStorage.getItem(STORAGE_KEY) || "[]"
      );
      setStoredVideos(parsed);
      
      // Get selected channel from sessionStorage
      const SELECTED_CHANNEL_KEY = "vidfly_selected_channel";
      const savedChannelId = sessionStorage.getItem(SELECTED_CHANNEL_KEY);
      
      if (savedChannelId && parsed.length > 0 && !channelInfo) {
        // Filter videos by selected channel
        const channelVideos = parsed.filter((v) => v.channelId === savedChannelId);
        if (channelVideos.length > 0) {
          const videoWithChannel = channelVideos[0];
          fetchChannelInfoById(savedChannelId, videoWithChannel.author || "");
        }
      } else if (parsed.length > 0 && !channelInfo) {
        // Fallback: use first video with channelId
        const videoWithChannel = parsed.find((v) => v.channelId);
        if (videoWithChannel?.channelId) {
          fetchChannelInfoById(videoWithChannel.channelId, videoWithChannel.author || "");
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
      if (newChannelId && storedVideos.length > 0) {
        const channelVideos = storedVideos.filter((v) => v.channelId === newChannelId);
        if (channelVideos.length > 0) {
          const videoWithChannel = channelVideos[0];
          fetchChannelInfoById(newChannelId, videoWithChannel.author || "");
        }
      }
    };

    window.addEventListener('channelChanged', handleChannelChange as EventListener);
    return () => {
      window.removeEventListener('channelChanged', handleChannelChange as EventListener);
    };
  }, [storedVideos]);


  useEffect(() => {
    if (!verifiedEmail) {
      navigate("/get-started", { replace: true });
    }
  }, [verifiedEmail, navigate]);

  const fetchChannelInfoById = async (channelId: string, channelName: string) => {
    setLoadingChannel(true);
    setChannelError("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/youtube/channel-info?channelId=${encodeURIComponent(channelId)}`
      );

      if (!response.ok) {
        // If API fails, use basic info from stored video
        setChannelInfo({
          channelId,
          name: channelName,
          avatar: null,
          subscriberCount: 0,
          videoCount: 0,
        });
        return;
      }

      const data = await response.json();
      setChannelInfo(data);
    } catch (err) {
      // Fallback to basic info
      setChannelInfo({
        channelId,
        name: channelName,
        avatar: null,
        subscriberCount: 0,
        videoCount: 0,
      });
    } finally {
      setLoadingChannel(false);
    }
  };

  const handleBuyNow = async (pkgId: string) => {
    // Get selected channel from sessionStorage
    const SELECTED_CHANNEL_KEY = "vidfly_selected_channel";
    let selectedChannelId: string | null = sessionStorage.getItem(SELECTED_CHANNEL_KEY);
    let channelName = channelInfo?.name || "";
    
    // If no saved channel, use first video with channelId
    if (!selectedChannelId && storedVideos.length > 0) {
      const videoWithChannel = storedVideos.find((v) => v.channelId);
      if (videoWithChannel?.channelId) {
        selectedChannelId = videoWithChannel.channelId;
        channelName = videoWithChannel.author || "";
        sessionStorage.setItem(SELECTED_CHANNEL_KEY, selectedChannelId);
      }
    }

    if (!selectedChannelId) {
      setChannelError("Please add videos from a channel first on the 'Promote Video / Short' page");
      return;
    }

    // Fetch channel info if not already loaded or if it's a different channel
    let finalChannelInfo = channelInfo;
    if (!finalChannelInfo || finalChannelInfo.channelId !== selectedChannelId) {
      await fetchChannelInfoById(selectedChannelId, channelName);
      // Wait a bit for state to update, then use the updated channelInfo
      // Since fetchChannelInfoById updates state, we'll use a fallback
      finalChannelInfo = {
        channelId: selectedChannelId,
        name: channelName,
        avatar: null,
        subscriberCount: 0,
        videoCount: 0,
      };
    }

    navigate(`/campaign/packages/${pkgId}`, {
      state: {
        packageId: pkgId,
        channelInfo: finalChannelInfo,
        email: verifiedEmail,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-purple-50 font-montserrat">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 flex flex-col gap-8 lg:flex-row">
        <CampaignSidebar />
        <main className="flex-1 space-y-8">
          <section className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 animate-fade-in hover:shadow-2xl transition-all duration-300">
            <CampaignHeader>
              <div className="animate-fade-in">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent mb-3">Buy Packages</h1>
                <p className="text-slate-600 text-lg">
                  Choose a package to boost your YouTube growth
                </p>
              </div>
            </CampaignHeader>

            {/* Packages */}
            <div className="space-y-6">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`rounded-3xl border border-slate-100 p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 ${pkg.accent}`}
                >
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-slate-900">{pkg.name}</h2>
                    <div className="flex items-center gap-3 mt-2 text-lg font-semibold text-purple-600">
                      <span>{pkg.price}</span>
                      {pkg.oldPrice && (
                        <span className="text-slate-400 line-through text-base">{pkg.oldPrice}</span>
                      )}
                      {pkg.discount && (
                        <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                          {pkg.discount}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-500 text-sm mt-3">{pkg.description}</p>
                  </div>
                  <div>
                    <Button
                      className="rounded-2xl px-8 py-6 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                      onClick={() => handleBuyNow(pkg.id)}
                      disabled={storedVideos.length === 0 || loadingChannel}
                    >
                      {loadingChannel ? "Loading..." : "Buy Now"}
                    </Button>
                    {channelError && (
                      <p className="mt-2 text-sm text-red-600 font-medium">{channelError}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default CampaignPackages;


