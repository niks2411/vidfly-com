import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Globe, Layers, Settings, CreditCard, X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import CampaignHeader from "@/components/CampaignHeader";
import AdPreviewModal from "@/components/AdPreviewModal";
import { getVerifiedEmail, getSelectedChannelKey } from "@/lib/verifiedEmail";
import CampaignLayout from "@/components/CampaignLayout";
import CampaignCard from "@/components/CampaignCard";
import ChannelSelector from "@/components/ChannelSelector";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL.replace(/\/$/, "");

type PricingBreakdown = {
  baseViews: { min: number; max: number; exact: number };
  bonusViews: { min: number; max: number; exact: number; percentage: number };
  totalViews: { min: number; max: number; exact: number };
  totalSubscribers?: { min: number; max: number };
};

type SelectedVideo = {
  title: string;
  author?: string;
  videoId: string;
  thumbnail: string;
  link: string;
  channelId?: string | null;
  avatarUrl?: string | null;
  viewsRequested?: number | null;
};

type LocationState = {
  email?: string;
  youtubeLink: string;
  videoInfo: SelectedVideo;
  videos?: SelectedVideo[];
  bulkViewsPackage?: {
    id: string;
    label: string;
    price: string;
    views: number;
  };
  campaignType?: string;
};

const STORAGE_KEY = "vidfly_channel_videos";
const BUDGET_STATE_KEY = "vidfly_budget_state";

const CampaignBudget = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as LocationState | undefined;

  // Load state from sessionStorage if location.state is missing (when coming back)
  const [restoredState, setRestoredState] = useState<LocationState | null>(() => {
    if (locationState) return null; // Use location state if available
    try {
      const stored = sessionStorage.getItem(BUDGET_STATE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (err) {
      console.error("Failed to restore budget state", err);
    }
    return null;
  });

  const state = locationState || restoredState;
  const email = state?.email?.trim().toLowerCase() || getVerifiedEmail();

  const [selectedVideos, setSelectedVideos] = useState<SelectedVideo[]>(() => {
    if (state?.videos?.length) return state.videos;
    if (state?.videoInfo) return [state.videoInfo];
    // Try to load from sessionStorage
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const videos = JSON.parse(stored);
        if (videos.length > 0) {
          return videos.slice(0, 5).map((v: any) => ({
            title: v.title,
            author: v.author,
            videoId: v.videoId,
            thumbnail: v.thumbnail,
            link: v.link,
            channelId: v.channelId,
            avatarUrl: v.avatarUrl,
            viewsRequested: v.viewsRequested,
          }));
        }
      }
    } catch (err) {
      console.error("Failed to load videos from storage", err);
    }
    return [];
  });

  // Ensure channel selector matches the primary video's channel
  useEffect(() => {
    const primaryVideo = state?.videoInfo || state?.videos?.[0] || selectedVideos[0];
    if (primaryVideo?.channelId) {
      const channelKey = getSelectedChannelKey();
      localStorage.setItem(channelKey, primaryVideo.channelId);

      // Notify ChannelSelector to update UI immediately
      window.dispatchEvent(
        new CustomEvent("channelChanged", {
          detail: { channelId: primaryVideo.channelId, channelName: primaryVideo.author || "Channel" },
        })
      );

      // Also save this channel to backend to ensure it appears in selector
      const saveChannelToBackend = async () => {
        try {
          const userEmail = localStorage.getItem("logged_user_email") || email;
          if (userEmail && primaryVideo.channelId) {
            // Fetch channel avatar if not available
            let channelAvatar = primaryVideo.avatarUrl || "";
            if (!channelAvatar) {
              try {
                const channelInfoResponse = await fetch(
                  `${API_BASE_URL}/api/youtube/channel-info?channelId=${encodeURIComponent(primaryVideo.channelId)}`
                );
                if (channelInfoResponse.ok) {
                  const channelInfoData = await channelInfoResponse.json();
                  channelAvatar = channelInfoData.avatar || "";
                }
              } catch (err) {
                console.warn("Failed to fetch channel avatar:", err);
              }
            }

            // Save to backend
            await fetch(`${API_BASE_URL}/api/user-preferences/channels`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: userEmail,
                channelId: primaryVideo.channelId,
                channelName: primaryVideo.author || "Channel",
                channelAvatar: channelAvatar,
              }),
              credentials: "include",
            });

            // Dispatch event again after saving to reload from backend
            window.dispatchEvent(
              new CustomEvent("channelChanged", {
                detail: { channelId: primaryVideo.channelId, channelName: primaryVideo.author || "Channel" },
              })
            );
          }
        } catch (err) {
          console.warn("Failed to save channel to backend:", err);
        }
      };

      // Run async but don't block
      saveChannelToBackend();
    }
  }, [state, selectedVideos, email]);

  // Save state to sessionStorage when it changes
  useEffect(() => {
    if (locationState) {
      try {
        sessionStorage.setItem(BUDGET_STATE_KEY, JSON.stringify(locationState));
      } catch (err) {
        console.error("Failed to save budget state", err);
      }
    }
  }, [locationState]);

  useEffect(() => {
    // Only redirect if we have no state at all (neither location nor restored)
    if (!state?.videoInfo && !selectedVideos.length) {
      // Try to load from sessionStorage one more time
      try {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        if (stored) {
          const videos = JSON.parse(stored);
          if (videos.length > 0) {
            // We have videos, so we can continue
            return;
          }
        }
      } catch (err) {
        // Ignore
      }
      navigate("/campaign", { replace: true });
    }
  }, [state, selectedVideos.length, navigate]);

  const isBulkViews = (state?.campaignType === "bulk-views" && state?.bulkViewsPackage) || false;
  const bulkViewsPackage = state?.bulkViewsPackage || null;

  // Extract price from bulk views package (remove ₹ and commas, convert to number)
  const bulkViewsPrice = bulkViewsPackage
    ? parseFloat(bulkViewsPackage.price.replace(/[^0-9.]/g, ""))
    : null;

  const [budget, setBudget] = useState(() => {
    if (isBulkViews && bulkViewsPrice) {
      return bulkViewsPrice;
    }
    return 800;
  });
  const [pricingData, setPricingData] = useState<PricingBreakdown | null>(null);
  const [loadingPricing, setLoadingPricing] = useState(false);
  const [targetCountry, setTargetCountry] = useState("");
  const [campaignDuration, setCampaignDuration] = useState("3-7 Days");
  const [customDurationDays, setCustomDurationDays] = useState<number>(7);
  const [autoTargeting, setAutoTargeting] = useState(true);
  const [showTargetingModal, setShowTargetingModal] = useState(false);
  const [goalType, setGoalType] = useState("Watch Time");
  const [createError, setCreateError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Manual targeting options
  const [selectedGender, setSelectedGender] = useState("all");
  const [selectedAges, setSelectedAges] = useState<string[]>(["all"]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["all"]);
  const [freeViewsBalance, setFreeViewsBalance] = useState(0);

  useEffect(() => {
    if (!email) {
      navigate("/get-started", { replace: true });
    } else {
      // Load free views balance
      loadFreeViewsBalance();
    }
  }, [email, navigate]);

  const loadFreeViewsBalance = async () => {
    if (!email) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/free-views/balance?email=${encodeURIComponent(email)}`, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setFreeViewsBalance(data.balance || 0);
      }
    } catch (err) {
      console.error("Failed to load free views balance", err);
    }
  };

  useEffect(() => {
    if (!isBulkViews) {
      calculatePricing(budget);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isBulkViews) {
      const timeout = setTimeout(() => calculatePricing(budget), 300);
      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [budget, isBulkViews]);

  useEffect(() => {
    if (!selectedVideos.length && state?.videoInfo) {
      navigate("/campaign/channel", { state: { email } });
    }
  }, [selectedVideos.length, navigate, state, email]);

  const calculatePricing = async (value: number) => {
    try {
      setLoadingPricing(true);
      setPricingData(null);
      const response = await fetch(`${API_BASE_URL}/api/pricing/calculate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price: value }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.message || "Unable to calculate views");
      }
      const data = await response.json();
      setPricingData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPricing(false);
    }
  };

  // Use selectedVideos if state is missing (when coming back)
  const videoList = selectedVideos.length > 0 ? selectedVideos : (state?.videos || (state?.videoInfo ? [state.videoInfo] : []));
  const primaryVideo = videoList[0];
  const selectedCount = videoList.length;
  const youtubeLink = state?.youtubeLink || primaryVideo?.link || "";

  if (!primaryVideo) {
    // Try to load from sessionStorage
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const videos = JSON.parse(stored);
        if (videos.length > 0) {
          // Will re-render with videos
          return null;
        }
      }
    } catch (err) {
      // Ignore
    }
    return null;
  }
  const channelName = primaryVideo.author || "Your Channel";

  const effectiveTotalViews = (() => {
    let baseViews = 0;
    if (isBulkViews && bulkViewsPackage) {
      baseViews = bulkViewsPackage.views;
    } else if (pricingData?.totalViews?.exact && pricingData.totalViews?.exact > 0) {
      baseViews = pricingData.totalViews.exact;
    } else {
      baseViews = budget;
    }
    // Add free views to total: base views + free views
    return baseViews + freeViewsBalance;
  })();

  const perVideoViews = (() => {
    if (selectedCount > 0) {
      return Math.max(1, Math.round(effectiveTotalViews / selectedCount));
    }
    if (isBulkViews && bulkViewsPackage) {
      return bulkViewsPackage.views;
    }
    return undefined;
  })();

  const perVideoBudget = selectedCount > 0
    ? Number((budget / selectedCount).toFixed(2))
    : budget;

  const handleCreateCampaign = async () => {
    if (!email) {
      setCreateError("Missing verified email. Please restart the flow.");
      return;
    }

    try {
      setCreating(true);
      setCreateError(null);

      const totalViewsExact = effectiveTotalViews;
      const payload = {
        customerName: channelName,
        email,
        channel: {
          name: channelName,
          channelId: primaryVideo.channelId || null,
          link: youtubeLink || primaryVideo.link,
          avatar: primaryVideo.avatarUrl || null,
        },
        videos: videoList.map((video) => ({
          videoId: video.videoId,
          title: video.title,
          link: video.link,
          thumbnail: video.thumbnail,
          viewsRequested: video.viewsRequested || perVideoViews || undefined,
        })),
        package: isBulkViews && bulkViewsPackage
          ? {
            id: bulkViewsPackage.id,
            name: bulkViewsPackage.label,
            price: budget,
            currency: "INR",
            quantity: totalViewsExact,
            type: "bulk-views",
            description: `${bulkViewsPackage.label} - ${bulkViewsPackage.price}`,
          }
          : {
            id: "custom-campaign",
            name: "Custom Campaign",
            price: budget,
            currency: "INR",
            quantity: totalViewsExact,
            type: "views",
            description: `Budget ${budget} with estimated ${pricingData?.totalViews
              ? `${pricingData.totalViews.min}-${pricingData.totalViews.max} views`
              : "views"
              }`,
          },
        targeting: {
          country: targetCountry,
          goal: goalType,
          duration: campaignDuration === "Custom"
            ? `Custom (${customDurationDays} ${customDurationDays === 1 ? 'day' : 'days'})`
            : campaignDuration,
          customDurationDays: campaignDuration === "Custom" ? customDurationDays : undefined,
          autoTargeting,
          ...(!autoTargeting && {
            gender: selectedGender,
            ages: selectedAges,
            interests: selectedInterests,
          }),
        },
        budget,
        source: selectedCount > 1 ? "promote_channel" : "promote_video",
      };

      const response = await fetch(`${API_BASE_URL}/api/orders/campaign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.message || "Unable to create campaign");
      }

      const data = await response.json();
      if (data.paymentCheckoutUrl) {
        window.location.href = data.paymentCheckoutUrl;
        return;
      }

      navigate(`/campaign`, { state: { order: data.order } });
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : "Failed to create campaign");
    } finally {
      setCreating(false);
    }
  };

  const handleRemoveVideo = (videoId: string) => {
    setSelectedVideos((prev) => prev.filter((video) => video.videoId !== videoId));
  };

  return (
    <CampaignLayout activeSidebar="budget">
      <div className="w-full space-y-6">
        {/* Progress Bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-slate-600 uppercase">STEP 3 - BUDGET & TARGETING</span>
          </div>
          <div className="flex items-center gap-2">
            {["ENTER LINK", "SELECT VIDEOS", "BUDGET & TARGETING", "PAYMENT"].map(
              (step, index) => (
                <div key={step} className="flex-1 flex items-center">
                  <div className="flex-1 flex items-center gap-2">
                    <div className={`h-2 flex-1 rounded-full ${index <= 2 ? "bg-red-600" : "bg-slate-200"
                      }`} />
                    {index < 3 && (
                      <div className={`h-2 w-2 rounded-full ${index <= 2 ? "bg-red-600" : "bg-slate-200"
                        }`} />
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>



        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {/* LEFT COLUMN - INPUTS & TARGETING */}
          <div className="lg:col-span-2 space-y-6">

            {/* Verified Email and Channel Selector section (Now inside left column) */}
            <div className="bg-white rounded-xl border border-slate-200 p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">Verified Email</p>
                  <p className="text-sm font-semibold text-slate-900 truncate">{email}</p>
                </div>
              </div>
              <ChannelSelector onChannelSelect={(channelId, channelName) => {
                console.log('Channel selected:', channelId, channelName);
              }} />
            </div>


            {/* Enter Budget Section */}
            {!isBulkViews && (
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-red-600" />
                    Enter Budget
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-500">Custom Budget:</span>
                    <div className="relative w-32">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-medium">₹</span>
                      <Input
                        type="number"
                        min={800}
                        max={10000}
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        className={`pl-6 h-9 text-sm font-semibold border-slate-200 focus:ring-red-100 ${budget < 800 || budget > 10000
                          ? "border-red-500 text-red-600 focus:border-red-500 ring-2 ring-red-50"
                          : "focus:border-red-500"
                          }`}
                        placeholder="800"
                      />
                    </div>
                  </div>
                </div>
                {(budget < 800 || budget > 10000) && (
                  <div className="mb-4 -mt-2 text-xs font-medium text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-100 flex items-center gap-2">
                    <span className="text-lg">⚠️</span> Budget must be between ₹800 and ₹10,000
                  </div>
                )}

                <div className="space-y-2">
                  <div className="relative pt-4 pb-1">
                    <input
                      type="range"
                      min={800}
                      max={10000}
                      step={100}
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-0
                      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-red-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110
                      [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:bg-red-600 [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:hover:scale-110"
                      style={{
                        background: `linear-gradient(to right, #dc2626 ${((budget - 800) / (10000 - 800)) * 100}%, #e2e8f0 ${((budget - 800) / (10000 - 800)) * 100}%)`
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 font-medium">
                    {[800, 2000, 4000, 6000, 8000, 10000].map((mark) => (
                      <span key={mark}>{mark.toLocaleString()}</span>
                    ))}
                  </div>
                </div>
              </div>

            )}

            {/* Targeting Options Group */}
            {!isBulkViews && (
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
                <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2 pb-4 border-b border-slate-100">
                  <Settings className="h-4 w-4 text-red-600" />
                  Targeting & Settings
                </h3>

                {/* Target Country */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                      <Globe className="h-3.5 w-3.5 text-slate-400" />
                      Target Country
                    </label>
                    <select
                      className="w-full border border-slate-300 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-red-100 focus:border-red-500 transition-all bg-slate-50"
                      value={targetCountry}
                      onChange={(e) => setTargetCountry(e.target.value)}
                    >
                      <option value="">All Countries (Recommended)</option>
                      <option value="IN">India</option>
                      <option value="US">United States</option>
                      <option value="GB">United Kingdom</option>
                      <option value="AE">UAE</option>
                    </select>
                  </div>

                  {/* Goal Type */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Goal (Besides Views)
                    </label>
                    <select
                      className="w-full border border-slate-300 rounded-xl p-2.5 text-sm focus:ring-2 focus:ring-red-100 focus:border-red-500 transition-all bg-slate-50"
                      value={goalType}
                      onChange={(e) => setGoalType(e.target.value)}
                    >
                      <option value="Subscribers">Subscribers</option>
                      <option value="Likes">Likes</option>
                      <option value="Comments">Comments</option>
                      <option value="Watch Time">Watch Time</option>
                    </select>
                  </div>
                </div>

                {/* Campaign Duration */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Campaign Duration
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["1-2 Days", "3-7 Days", "7-10 Days", "Custom"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setCampaignDuration(option)}
                        className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${campaignDuration === option
                          ? "bg-red-600 text-white border-red-600 shadow-md transform scale-105"
                          : "bg-white border-slate-200 text-slate-600 hover:border-red-200 hover:bg-red-50"
                          }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  {campaignDuration === "Custom" && (
                    <div className="mt-3 flex items-center gap-3">
                      <Input
                        type="number"
                        min={1}
                        max={365}
                        value={customDurationDays}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 1;
                          setCustomDurationDays(Math.max(1, Math.min(365, value)));
                        }}
                        className="w-24 border-slate-300 rounded-lg"
                      />
                      <span className="text-sm text-slate-500">days</span>
                    </div>
                  )}
                </div>

                {/* Targeting Selection - New Radio Style */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
                  {/* Automatic Targeting Option */}
                  <div
                    onClick={() => {
                      setAutoTargeting(true);
                      setShowTargetingModal(false);
                    }}
                    className="cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h3 className="text-base font-semibold text-slate-900">Automatic Targeting</h3>
                        <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded border border-green-200 uppercase tracking-wide">Recommended</span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${autoTargeting ? 'border-purple-500' : 'border-slate-300'}`}>
                        {autoTargeting && <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />}
                      </div>
                    </div>

                    {/* Chat Bubble Description */}
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-slate-200">
                        <img src="/lovable-uploads/a1.png" alt="AI Agent" className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback if image fails
                            (e.target as HTMLImageElement).src = "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix";
                          }}
                        />
                      </div>
                      <div className="relative bg-purple-50 rounded-xl rounded-tl-none p-3 text-sm text-slate-700 leading-relaxed max-w-lg">
                        {/* Chat Bubble Arrow */}
                        <div className="absolute top-0 -left-2 w-0 h-0 border-t-[10px] border-t-purple-50 border-l-[10px] border-l-transparent"></div>
                        <p className="font-medium text-slate-900">Sit back and relax! Vidfly finds the best audience for your videos.</p>
                        <p className="text-slate-500 text-xs mt-0.5">(Tailored based on your selections and channel profile.)</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-100" />

                  {/* Manual Targeting Option */}
                  <div
                    onClick={() => {
                      setAutoTargeting(false);
                      setShowTargetingModal(true);
                    }}
                    className="flex items-center justify-between cursor-pointer group"
                  >
                    <div>
                      <h3 className="text-base font-semibold text-slate-900 group-hover:text-red-700 transition-colors">Manual Targeting</h3>
                      <p className="text-slate-500 text-sm mt-0.5">Set your targeting preferences manually</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${!autoTargeting ? 'border-purple-500' : 'border-slate-300'}`}>
                      {!autoTargeting && <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />}
                    </div>
                  </div>
                </div>

                {/* Manual Targeting Options */}
                {!autoTargeting && (
                  <div className="pt-4 border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-300">
                    <h3 className="text-sm font-semibold text-slate-900 mb-4">Manual Audience Selection</h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Gender */}
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Gender</p>
                        <div className="space-y-2">
                          {["all", "male", "female"].map(g => (
                            <label key={g} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="radio"
                                name="gender"
                                value={g}
                                checked={selectedGender === g}
                                onChange={(e) => setSelectedGender(e.target.value)}
                                className="h-4 w-4 text-red-600 focus:ring-red-500"
                              />
                              <span className="text-sm text-slate-700 capitalize">{g === 'all' ? 'All Genders' : g}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Age */}
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Age Group</p>
                        <div className="flex flex-wrap gap-2">
                          {["all", "18-24", "25-34", "35-44", "45+"].map(age => (
                            <label key={age} className={`px-2 py-1 rounded text-xs border cursor-pointer transition-colors ${selectedAges.includes(age) ? 'bg-red-50 border-red-200 text-red-700' : 'border-slate-200 text-slate-600'}`}>
                              <input
                                type="checkbox"
                                className="hidden"
                                checked={selectedAges.includes(age)}
                                onChange={(e) => {
                                  if (age === 'all') {
                                    setSelectedAges(e.target.checked ? ['all'] : []);
                                  } else {
                                    if (e.target.checked) {
                                      setSelectedAges(prev => [...prev.filter(a => a !== 'all'), age]);
                                    } else {
                                      setSelectedAges(prev => prev.filter(a => a !== age));
                                    }
                                  }
                                }}
                              />
                              {age === 'all' ? 'All Ages' : age}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}



            {/* Bulk Views UI - Keeping existing logic but minimalized if needed */}
            {isBulkViews && (
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                {/* ... Bulk View specific UI can stay here or be adapted ... */}
                <h3 className="font-semibold text-lg mb-4">Bulk View Package Selected</h3>
                {/* Reuse existing bulk view preview logic if needed, or simplify */}
                <p>Package: {bulkViewsPackage?.label} - {bulkViewsPackage?.price}</p>
              </div>
            )}

          </div>

          {/* RIGHT COLUMN - SUMMARY & CHECKOUT (Fixed/Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">

              {/* Selected Videos Card (Right Side) */}
              {selectedCount > 0 && !isBulkViews && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
                  <div className="p-4 border-b border-slate-100">
                    <h3 className="text-sm font-bold text-slate-900 leading-tight">Selected Videos ({selectedCount})</h3>
                  </div>

                  <div className="max-h-[300px] overflow-y-auto p-2 space-y-2 custom-scrollbar">
                    {videoList.map((video) => (
                      <div key={video.videoId} className="flex gap-3 items-start p-2 hover:bg-slate-50 rounded-lg group transition-colors relative">
                        <img src={video.thumbnail} alt={video.title} className="w-24 h-14 rounded-md object-cover flex-shrink-0" />
                        <div className="flex-1 min-w-0 pr-6">
                          <p className="text-xs font-semibold text-slate-900 line-clamp-2 leading-snug mb-1">{video.title}</p>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400">
                            <span className="flex items-center gap-1"><Layers className="h-3 w-3" /> 1.2K</span>
                            <span>•</span>
                            <span>2 days ago</span>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveVideo(video.videoId);
                          }}
                          className="absolute right-2 top-2 p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover:opacity-100"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}


              {/* Order Summary Card */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
                <div className="bg-slate-50 p-4 border-b border-slate-100">
                  <h3 className="text-base font-bold text-slate-900 flex items-center justify-between">
                    Estimated Results
                    <Layers className="h-4 w-4 text-slate-400" />
                  </h3>
                </div>

                <div className="p-4 space-y-4">
                  {/* Estimated Views */}
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xs font-semibold text-slate-500 uppercase">Estimated Views</span>
                      <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                        +6% Bonus
                      </span>
                    </div>

                    {loadingPricing ? (
                      <div className="h-2 bg-slate-100 rounded-full w-full animate-pulse" />
                    ) : pricingData ? (
                      <>
                        <div className="text-2xl font-bold text-slate-900 leading-none mb-2">
                          {(pricingData.totalViews.min + freeViewsBalance).toLocaleString()} - {(pricingData.totalViews.max + freeViewsBalance).toLocaleString()}
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex">
                          <div className="h-full bg-slate-800" style={{ width: '70%' }} />
                          <div className="h-full bg-green-500" style={{ width: '30%' }} />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                          <span>Base</span>
                          <span className="text-green-600 font-medium">Bonus included</span>
                        </div>
                      </>
                    ) : (
                      <p className="text-sm text-slate-400">Set budget to see estimates</p>
                    )}
                  </div>

                  {/* Line Separator */}
                  <div className="border-t border-slate-100" />

                  {/* Total */}
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm font-semibold text-slate-600 block">Total Budget</span>
                      <p className="text-[10px] text-slate-400">Includes all taxes</p>
                    </div>
                    <span className="text-xl font-bold text-red-600">₹ {isBulkViews ? bulkViewsPrice : budget}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-2">
                    <Button
                      onClick={handleCreateCampaign}
                      disabled={creating || (!isBulkViews && (budget < 800 || budget > 10000))}
                      className={`w-full rounded-xl py-3 text-base font-bold shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] ${creating || (!isBulkViews && (budget < 800 || budget > 10000))
                        ? "bg-slate-300 text-slate-500 cursor-not-allowed shadow-none hover:scale-100"
                        : "bg-red-600 hover:bg-red-700 text-white shadow-red-200"
                        }`}
                    >
                      {creating ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Pay & Launch
                          <ChevronRight className="h-5 w-5" />
                        </span>
                      )}
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => setShowPreview(true)}
                      className="w-full border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl"
                    >
                      Preview Ad Experience
                    </Button>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 text-center border-t border-slate-100">
                  <p className="text-[10px] text-slate-400">
                    By clicking Pay & Launch, you agree to our Terms of Service.
                  </p>
                </div>
              </div>

              {/* Trust Signals (Optional) */}
              <div className="grid grid-cols-3 gap-2 text-center opacity-60">
                <div className="flex flex-col items-center gap-1">
                  <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                    <Globe className="h-4 w-4 text-slate-600" />
                  </div>
                  <span className="text-[10px] font-medium text-slate-600">Global Reach</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                    <Layers className="h-4 w-4 text-slate-600" />
                  </div>
                  <span className="text-[10px] font-medium text-slate-600">Real Views</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                    <CreditCard className="h-4 w-4 text-slate-600" />
                  </div>
                  <span className="text-[10px] font-medium text-slate-600">Secure Pay</span>
                </div>
              </div>

            </div>
          </div>
        </div >

        {createError && (
          <div className="fixed bottom-4 right-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl shadow-lg animate-in slide-in-from-bottom-5">
            {createError}
            <button onClick={() => setCreateError(null)} className="ml-2 font-bold">×</button>
          </div>
        )}

      </div >
      {/* Ad Preview Modal */}
      < AdPreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        video={{
          title: primaryVideo.title,
          thumbnail: primaryVideo.thumbnail,
          author: primaryVideo.author || channelName,
          videoId: primaryVideo.videoId,
          link: primaryVideo.link,
        }}
        viewCount={effectiveTotalViews.toLocaleString()}
      />

      {/* Targeting Modal */}
      {
        showTargetingModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 relative shadow-2xl">
              <button
                type="button"
                onClick={() => {
                  setShowTargetingModal(false);
                  setAutoTargeting(true);
                }}
                className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <h2 className="text-xl font-bold text-slate-900 mb-4 pr-8">
                Vidfly strongly advises to set advertising campaign to automatic targeting.
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <p className="text-sm text-slate-700">
                    Automatic Targeting will utilize the YouTube Ads Algorithm to display your videos in the recommended list, specifically to viewers from your chosen countries who have shown interest in similar content.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <p className="text-sm text-slate-700">
                    Typically, automatic targeting yields the best outcomes in terms of interactions and subscribers, while also attracting more views than manual targeting.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowTargetingModal(false);
                    setAutoTargeting(false);
                  }}
                >
                  SELECT MANUALLY
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    setShowTargetingModal(false);
                    setAutoTargeting(true);
                  }}
                >
                  KEEP AUTOMATIC
                </Button>
              </div>
            </div>
          </div>
        )
      }
    </CampaignLayout >
  );
};

export default CampaignBudget;

