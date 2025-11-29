import { useState, useEffect, useMemo } from "react";
import CampaignHeader from "@/components/CampaignHeader";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { getVerifiedEmail } from "@/lib/verifiedEmail";
import CampaignLayout from "@/components/CampaignLayout";
import CampaignCard from "@/components/CampaignCard";
import { Check, Sparkles, X, Shield } from "lucide-react";

const STORAGE_KEY = "vidfly_channel_videos";

const packages = [
  {
    id: "starter",
    name: "Starter",
    price: "₹999",
    oldPrice: null,
    discount: null,
    description: "Perfect for Beginners - 5,000+ Real, High-Intent Viewers",
    views: "5,000+ Real Viewers",
    features: [
      "1 Video Promotion with professional ad setup",
      "5,000+ Real, High-Intent Viewers",
      "Natural Likes, Subscribers & Engagement Increase",
      "Niche-Based Basic Targeting",
      "Multi-Format Promotion (TrueView, In-Feed & Shorts Ads)",
      "Safe, Google-Ads compliant delivery"
    ],
    aiTargeting: false,
    accent: "bg-red-50",
  },
  {
    id: "boost",
    name: "Boost",
    price: "₹1,999",
    oldPrice: null,
    discount: null,
    description: "Great Value - 10,000+ Real, High-Intent Viewers",
    views: "10,000+ Real Viewers",
    features: [
      "1 Video Promotion with professional ad setup",
      "10,000+ Real, High-Intent Viewers",
      "Natural Likes, Subscribers & Engagement Increase",
      "Niche-Based Basic Targeting",
      "Multi-Format Promotion (TrueView, In-Feed & Shorts Ads)",
      "Safe, Google-Ads compliant delivery"
    ],
    aiTargeting: false,
    accent: "bg-orange-50",
  },
  {
    id: "growth",
    name: "Growth",
    price: "₹3,499",
    oldPrice: null,
    discount: null,
    description: "Most Popular - 20,000+ Real, High-Intent Viewers",
    views: "20,000+ Real Viewers",
    features: [
      "1 Video Promotion with professional ad setup",
      "20,000+ Real, High-Intent Viewers",
      "Natural Likes, Subscribers & Engagement Increase",
      "Niche-Based Basic Targeting",
      "Multi-Format Promotion (TrueView, In-Feed & Shorts Ads)",
      "Safe, Google-Ads compliant delivery"
    ],
    aiTargeting: false,
    accent: "bg-yellow-50",
  },
  {
    id: "premium-ai",
    name: "Premium AI",
    price: "₹5,499",
    oldPrice: null,
    discount: "5% Instant Discount",
    description: "AI-Powered Growth - 37,000+ Real Viewers (35,000 + 2,000 FREE)",
    views: "37,000+ Real Viewers",
    bonusViews: "+2,000 FREE Viewers Added",
    features: [
      "1 Video Promotion with professional ad setup",
      "35,000+ Real, High-Intent Viewers",
      "Natural Likes, Subscribers & Engagement Increase",
      "Niche-Based Basic Targeting",
      "Multi-Format Promotion (TrueView, In-Feed & Shorts Ads)",
      "Safe, Google-Ads compliant delivery",
      "AI Smart Targeting for precise audience reach",
      "Higher watch time & stronger engagement"
    ],
    aiTargeting: true,
    accent: "bg-red-50",
  },
  {
    id: "viral-ai",
    name: "Viral AI",
    price: "₹8,999",
    oldPrice: null,
    discount: "8% Instant Discount",
    description: "Advanced AI Targeting - 59,000+ Real Viewers (55,000 + 4,000 FREE)",
    views: "59,000+ Real Viewers",
    bonusViews: "+4,000 FREE Viewers Added",
    features: [
      "1 Video Promotion with professional ad setup",
      "55,000+ Real, High-Intent Viewers",
      "Natural Likes, Subscribers & Engagement Increase",
      "Niche-Based Basic Targeting",
      "Multi-Format Promotion (TrueView, In-Feed & Shorts Ads)",
      "Safe, Google-Ads compliant delivery",
      "Advanced AI Interest Targeting",
      "Optimized placements for rapid growth"
    ],
    aiTargeting: true,
    accent: "bg-red-50",
  },
  {
    id: "ultra-viral-ai",
    name: "Ultra Viral AI",
    price: "₹12,999",
    oldPrice: null,
    discount: "10% Instant Discount",
    description: "Ultimate Growth Package - 86,500+ Real Viewers (80,000 + 6,500 FREE)",
    views: "86,500+ Real Viewers",
    bonusViews: "+6,500 FREE Viewers Added",
    features: [
      "1 Video Promotion with professional ad setup",
      "80,000+ Real, High-Intent Viewers",
      "Natural Likes, Subscribers & Engagement Increase",
      "Niche-Based Basic Targeting",
      "Multi-Format Promotion (TrueView, In-Feed & Shorts Ads)",
      "Safe, Google-Ads compliant delivery",
      "AI Behaviour + Interest + Demographic Targeting",
      "Maximum reach & best viral potential"
    ],
    aiTargeting: true,
    accent: "bg-pink-50",
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

  const fetchChannelInfoById = async (channelId: string, channelName: string): Promise<ChannelInfo> => {
    setLoadingChannel(true);
    setChannelError("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/youtube/channel-info?channelId=${encodeURIComponent(channelId)}`
      );

      if (!response.ok) {
        // If API fails, use basic info from stored video
        const fallbackInfo: ChannelInfo = {
          channelId,
          name: channelName,
          avatar: null,
          subscriberCount: 0,
          videoCount: 0,
        };
        setChannelInfo(fallbackInfo);
        return fallbackInfo;
      }

      const data = await response.json();
      setChannelInfo(data);
      return data;
    } catch (err) {
      // Fallback to basic info
      const fallbackInfo: ChannelInfo = {
        channelId,
        name: channelName,
        avatar: null,
        subscriberCount: 0,
        videoCount: 0,
      };
      setChannelInfo(fallbackInfo);
      return fallbackInfo;
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
      finalChannelInfo = await fetchChannelInfoById(selectedChannelId, channelName);
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
            <h1 className="text-2xl md:text-3xl font-bold text-red-600 mb-2 leading-tight">
              Buy Packages
            </h1>
            <p className="text-slate-600 text-sm md:text-base">
              Choose a package to boost your YouTube growth
            </p>
          </div>
        </CampaignHeader>

        {/* Packages */}
        <div className="space-y-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-2xl border-2 border-slate-200 p-6 ${pkg.accent} hover:shadow-lg transition-all duration-300`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h2 className="text-2xl font-bold text-slate-900">{pkg.name}</h2>
                    {pkg.aiTargeting && (
                      <span className="flex items-center gap-1.5 text-xs font-semibold bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-1.5 rounded-full">
                        <Sparkles className="w-3 h-3" />
                        AI POWERED
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl font-bold text-red-600">{pkg.price}</span>
                    {pkg.oldPrice && (
                      <span className="text-slate-400 line-through text-lg">{pkg.oldPrice}</span>
                    )}
                    {pkg.discount && (
                      <span className="text-sm text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full font-semibold">
                        {pkg.discount}
                      </span>
                    )}
                  </div>

                  <div className="mb-4">
                    <p className="text-lg font-semibold text-slate-700 mb-2">{pkg.views}</p>
                    {pkg.bonusViews && (
                      <p className="flex items-center gap-1.5 text-sm text-emerald-700 font-medium mb-2">
                        <span className="text-emerald-600">+</span>
                        {pkg.bonusViews}
                      </p>
                    )}
                    <p className="text-slate-600 text-sm">{pkg.description}</p>
                  </div>

                  {/* Features List */}
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-semibold text-slate-700 mb-2">Every Plan Comes With Our Full Promotion Suite:</p>
                    <ul className="space-y-1.5">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                          <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {!pkg.aiTargeting && (
                      <p className="flex items-center gap-1.5 text-sm text-slate-500 mt-2">
                        <X className="w-4 h-4" />
                        <span>AI Targeting: Not Included</span>
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="lg:w-48 flex-shrink-0">
                  <Button
                    className="w-full"
                    onClick={() => handleBuyNow(pkg.id)}
                    disabled={storedVideos.length === 0 || loadingChannel}
                  >
                    {loadingChannel ? "LOADING..." : "BUY NOW"}
                  </Button>
                  {channelError && (
                    <p className="mt-2 text-xs text-red-600 font-medium text-center">{channelError}</p>
                  )}
                  <p className="flex items-center justify-center gap-1.5 text-xs text-slate-500 text-center mt-3">
                    <Shield className="w-3.5 h-3.5" />
                    <span>30-day money-back guarantee</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CampaignCard>
    </CampaignLayout>
  );
};

export default CampaignPackages;


