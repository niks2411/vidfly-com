import { useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CampaignLayout from "@/components/CampaignLayout";
import CampaignCard from "@/components/CampaignCard";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, X, Shield } from "lucide-react";
import ChannelSelector from "@/components/ChannelSelector";

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

type StoredVideo = {
  title: string;
  author?: string;
};

const STORAGE_KEY = "vidfly_channel_videos";

const CampaignPackageDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const pkg = id && packages.find(p => p.id === id);
  const location = useLocation();
  const verifiedEmail =
    (location.state as { email?: string } | null)?.email || undefined;
  
  const [selectedChannelInfo, setSelectedChannelInfo] = useState<{
    channelId: string;
    name: string;
    avatar: string | null;
  } | null>(null);

  const channelInfo = useMemo(() => {
    // First, use selected channel from ChannelSelector
    if (selectedChannelInfo) {
      return {
        author: selectedChannelInfo.name,
        avatarUrl: selectedChannelInfo.avatar || `https://ui-avatars.com/api/?name=${
          selectedChannelInfo.name || "VC"
        }&background=dc2626&color=fff`,
      };
    }

    // Then, try to get channelInfo from navigation state (passed from Buy Now)
    const stateChannelInfo = (location.state as { channelInfo?: { channelId: string; name: string; avatar: string | null; subscriberCount?: number; videoCount?: number } } | null)?.channelInfo;
    
    if (stateChannelInfo) {
      return {
        author: stateChannelInfo.name,
        avatarUrl: stateChannelInfo.avatar || `https://ui-avatars.com/api/?name=${
          stateChannelInfo.name || "VC"
        }&background=dc2626&color=fff`,
      };
    }

    // Fallback to sessionStorage if no state channelInfo
    if (typeof window === "undefined") return null;
    try {
      const parsed: StoredVideo[] = JSON.parse(
        sessionStorage.getItem(STORAGE_KEY) || "[]"
      );
      if (!parsed.length) {
        return null;
      }
      return {
        ...parsed[0],
        avatarUrl: `https://ui-avatars.com/api/?name=${
          parsed[0].author || "VC"
        }&background=dc2626&color=fff`,
      };
    } catch {
      return null;
    }
  }, [location.state, selectedChannelInfo]);

  // Load channel info from sessionStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const SELECTED_CHANNEL_KEY = "vidfly_selected_channel";
      const CHANNEL_INFO_STORAGE_KEY = "vidfly_channel_info";
      const selectedChannelId = sessionStorage.getItem(SELECTED_CHANNEL_KEY);
      
      if (selectedChannelId) {
        const cachedChannelInfo = sessionStorage.getItem(CHANNEL_INFO_STORAGE_KEY);
        if (cachedChannelInfo) {
          try {
            const parsedInfo: Array<{ channelId: string; name: string; avatar: string }> = JSON.parse(cachedChannelInfo);
            const channelInfo = parsedInfo.find(info => info.channelId === selectedChannelId);
            if (channelInfo) {
              setSelectedChannelInfo({
                channelId: channelInfo.channelId,
                name: channelInfo.name,
                avatar: channelInfo.avatar,
              });
            }
          } catch (err) {
            console.error("Failed to parse cached channel info", err);
          }
        }
      }
    } catch (err) {
      console.error("Failed to load channel info", err);
    }
  }, []);

  const handleChannelSelect = (channelId: string, channelName: string) => {
    // Fetch channel info and update state
    const CHANNEL_INFO_STORAGE_KEY = "vidfly_channel_info";
    const cachedChannelInfo = sessionStorage.getItem(CHANNEL_INFO_STORAGE_KEY);
    if (cachedChannelInfo) {
      try {
        const parsedInfo: Array<{ channelId: string; name: string; avatar: string }> = JSON.parse(cachedChannelInfo);
        const channelInfo = parsedInfo.find(info => info.channelId === channelId);
        if (channelInfo) {
          setSelectedChannelInfo({
            channelId: channelInfo.channelId,
            name: channelInfo.name,
            avatar: channelInfo.avatar,
          });
        } else {
          setSelectedChannelInfo({
            channelId,
            name: channelName,
            avatar: null,
          });
        }
      } catch (err) {
        console.error("Failed to parse cached channel info", err);
        setSelectedChannelInfo({
          channelId,
          name: channelName,
          avatar: null,
        });
      }
    } else {
      setSelectedChannelInfo({
        channelId,
        name: channelName,
        avatar: null,
      });
    }
  };

  if (!pkg) {
    return (
      <CampaignLayout>
        <CampaignCard className="text-center space-y-6">
          <h1 className="text-3xl font-bold text-slate-900">Package not found</h1>
          <Button onClick={() => navigate("/campaign/packages")} className="rounded-2xl">
            Back to packages
          </Button>
        </CampaignCard>
      </CampaignLayout>
    );
  }

  return (
    <CampaignLayout activeSidebar="packages">
      <CampaignCard className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl overflow-hidden bg-red-100 flex items-center justify-center text-red-600 font-bold">
                {channelInfo?.avatarUrl ? (
                  <img
                    src={channelInfo.avatarUrl}
                    alt={channelInfo.author}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  (channelInfo?.author?.slice(0, 2).toUpperCase() || "VC")
                )}
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-500 uppercase">Channel</p>
                <h2 className="text-xl font-bold text-slate-900">
                  {channelInfo?.author || "Your Channel"}
                </h2>
              </div>
              <ChannelSelector onChannelSelect={handleChannelSelect} />
            </div>

            <div className={`mt-6 rounded-2xl border-2 border-slate-200 p-6 ${pkg.accent}`}>
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{pkg.name}</h1>
                {pkg.aiTargeting && (
                  <span className="flex items-center gap-1.5 text-xs font-semibold bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-1.5 rounded-full">
                    <Sparkles className="w-3 h-3" />
                    AI POWERED
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl font-bold text-red-600">{pkg.price}</span>
                {pkg.oldPrice && (
                  <span className="text-slate-400 line-through text-xl">{pkg.oldPrice}</span>
                )}
                {pkg.discount && (
                  <span className="text-sm text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full font-semibold">
                    {pkg.discount}
                  </span>
                )}
              </div>

              <div className="mb-4">
                <p className="text-xl font-semibold text-slate-700 mb-2">{pkg.views}</p>
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

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4 mt-8 rounded-xl">
              <Button className="rounded-xl"
                variant="outline"
                onClick={() => navigate("/campaign/packages")}
              >
                BACK TO PACKAGES
              </Button>
              <Button className="rounded-xl">
                CONTINUE TO PAYMENT
              </Button>
            </div>
      </CampaignCard>
    </CampaignLayout>
  );
};

export default CampaignPackageDetail;

