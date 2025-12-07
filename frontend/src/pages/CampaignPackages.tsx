import { useState, useEffect, useMemo } from "react";
import CampaignLayout from "@/components/CampaignLayout";
import CampaignCard from "@/components/CampaignCard";
import CampaignHeader from "@/components/CampaignHeader";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { getVerifiedEmail } from "@/lib/verifiedEmail";

const STORAGE_KEY = "vidfly_channel_videos";

const packages = [
  {
    id: "starter",
    name: "Starter",
    price: 999,
    views: 5000,
    hasAI: false,
    accent: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    id: "boost",
    name: "Boost",
    price: 1999,
    views: 10000,
    hasAI: false,
    accent: "bg-green-50",
    borderColor: "border-green-200",
  },
  {
    id: "growth",
    name: "Growth",
    price: 3499,
    views: 20000,
    hasAI: false,
    accent: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  {
    id: "premium-ai",
    name: "Premium AI",
    price: 5499,
    views: 35000,
    bonusViews: 2000,
    totalViews: 37000,
    hasAI: true,
    discount: 5,
    aiFeatures: ["AI Smart Targeting for precise audience reach", "Higher watch time & stronger engagement"],
    accent: "bg-orange-50",
    borderColor: "border-orange-300",
    isPopular: true,
  },
  {
    id: "viral-ai",
    name: "Viral AI",
    price: 8999,
    views: 55000,
    bonusViews: 4000,
    totalViews: 59000,
    hasAI: true,
    discount: 8,
    aiFeatures: ["Advanced AI Interest Targeting", "Optimized placements for rapid growth"],
    accent: "bg-red-50",
    borderColor: "border-red-300",
  },
  {
    id: "ultra-viral-ai",
    name: "Ultra Viral AI",
    price: 12999,
    views: 80000,
    bonusViews: 6500,
    totalViews: 86500,
    hasAI: true,
    discount: 10,
    aiFeatures: ["AI Behaviour + Interest + Demographic Targeting", "Maximum reach & best viral potential"],
    accent: "bg-gradient-to-br from-purple-50 to-pink-50",
    borderColor: "border-purple-400",
    isPremium: true,
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
    <CampaignLayout activeSidebar="packages">
      <CampaignCard>
            <CampaignHeader>
              <div className="animate-fade-in">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent mb-3">Buy Packages</h1>
                <p className="text-slate-600 text-lg">
                  Choose a package to boost your YouTube growth
                </p>
              </div>
            </CampaignHeader>

            {/* Common Features Info */}
            <div className="mb-8 p-6 bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Every Plan Comes With Our Full Promotion Suite:</h3>
              <div className="grid md:grid-cols-2 gap-3 text-sm text-slate-700">
                <div className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">✔</span>
                  <span>1 Video Promotion with professional ad setup</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">✔</span>
                  <span>Real, High-Intent Viewers</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">✔</span>
                  <span>Natural Likes, Subscribers & Engagement Increase</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">✔</span>
                  <span>Niche-Based Basic Targeting</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">✔</span>
                  <span>Multi-Format Promotion (TrueView, In-Feed & Shorts Ads)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">✔</span>
                  <span>Safe, Google-Ads compliant delivery</span>
                </div>
              </div>
            </div>

            {/* Packages Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`relative rounded-2xl border-2 ${pkg.borderColor} bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                    pkg.isPremium ? "lg:col-span-2 lg:max-w-2xl lg:mx-auto" : ""
                  }`}
                >
                  {pkg.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                      MOST POPULAR
                    </div>
                  )}
                  {pkg.isPremium && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                      PREMIUM
                    </div>
                  )}

                  {/* Header */}
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">{pkg.name}</h2>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-3xl font-bold text-red-600">₹{pkg.price.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Views */}
                  <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-slate-900">
                        {pkg.totalViews ? pkg.totalViews.toLocaleString() : pkg.views.toLocaleString()}+
                      </p>
                      <p className="text-sm text-slate-600 mt-1">Real, High-Intent Viewers</p>
                      {pkg.totalViews && (
                        <p className="text-xs text-slate-500 mt-1">
                          Base: {pkg.views.toLocaleString()} + Bonus: {pkg.bonusViews?.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* AI Targeting Status */}
                  <div className="mb-6 p-3 bg-slate-100 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-700">AI Targeting:</span>
                      {pkg.hasAI ? (
                        <span className="text-green-600 font-bold text-sm">✓ Included</span>
                      ) : (
                        <span className="text-red-500 font-bold text-sm">✗ Not Included</span>
                      )}
                    </div>
                  </div>

                  {/* Premium Features */}
                  {pkg.hasAI && pkg.aiFeatures && (
                    <div className="mb-6">
                      <p className="text-sm font-semibold text-slate-800 mb-2">Plus Premium Features:</p>
                      <ul className="space-y-2">
                        {pkg.aiFeatures.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                            <span className="text-purple-500 mt-0.5">✨</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Bonus Section */}
                  {pkg.discount && (
                    <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                      <p className="text-sm font-semibold text-slate-800 mb-2">Bonus Included:</p>
                      <div className="space-y-1 text-sm text-slate-700">
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-600">🎁</span>
                          <span>{pkg.discount}% Instant Discount</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-600">🎁</span>
                          <span>+{pkg.bonusViews?.toLocaleString()} FREE Viewers Added</span>
                        </div>
                        <div className="pt-2 mt-2 border-t border-yellow-200">
                          <p className="text-xs font-semibold text-slate-800">
                            Total Value Delivered: {pkg.totalViews?.toLocaleString()}+ Viewers
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* CTA Button */}
                  <Button
                    className={`w-full rounded-xl py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${
                      pkg.isPremium
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                        : pkg.hasAI
                        ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                        : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
                    }`}
                    onClick={() => handleBuyNow(pkg.id)}
                    disabled={storedVideos.length === 0 || loadingChannel}
                  >
                    {loadingChannel ? "Loading..." : `Buy ${pkg.name}`}
                  </Button>
                  {channelError && pkg.id === packages[0].id && (
                    <p className="mt-2 text-xs text-red-600 text-center">{channelError}</p>
                  )}
                </div>
              ))}
            </div>

      </CampaignCard>
    </CampaignLayout>
  );
};

export default CampaignPackages;


