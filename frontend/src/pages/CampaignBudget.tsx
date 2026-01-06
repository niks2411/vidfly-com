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
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "http://localhost:5000";

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

        {/* Verified Email and Channel Selector section */}
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

        <CampaignCard className="space-y-6">

          {!isBulkViews && (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-6 w-full">
                {/* Enter Budget Section */}
                <div className="bg-white rounded-xl border border-slate-200 p-4">
                  <h3 className="text-sm font-semibold text-slate-800 mb-4">ENTER BUDGET</h3>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min={800}
                      max={10000}
                      step={100}
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      className="w-full accent-red-600 h-2"
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      {[800, 2000, 4000, 6000, 8000, 10000].map((mark) => (
                        <span key={mark}>{mark.toLocaleString()}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 pt-2 border-t border-slate-100">
                      <div>
                        <p className="text-xs text-slate-500 uppercase">Videos</p>
                        <p className="text-sm font-semibold text-slate-900">{selectedCount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase">Per Video</p>
                        <p className="text-sm font-semibold text-slate-900">₹ {perVideoBudget}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Estimated Views Section */}
                <div className="bg-white rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-slate-900">Estimated Views</h3>
                    <span className="text-xs text-red-600 font-semibold">Bonus (6%)</span>
                  </div>
                  {loadingPricing ? (
                    <p className="text-sm text-slate-500">Calculating…</p>
                  ) : pricingData ? (
                    <>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-red-600"
                            style={{
                              width: `${(pricingData.baseViews.exact /
                                pricingData.totalViews.exact) *
                                100
                                }%`,
                            }}
                          />
                        </div>
                        <div className="flex-1 h-3 bg-green-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500"
                            style={{
                              width: `${(pricingData.bonusViews.exact /
                                pricingData.totalViews.exact) *
                                100
                                }%`,
                            }}
                          />
                        </div>
                      </div>
                      <div className="text-sm text-slate-600 space-y-1">
                        <p>
                          Base: <strong>{pricingData.baseViews.min.toLocaleString()} - {pricingData.baseViews.max.toLocaleString()}</strong>
                        </p>
                        <p>
                          Bonus: <strong>{pricingData.bonusViews.min.toLocaleString()} - {pricingData.bonusViews.max.toLocaleString()}</strong>
                        </p>
                        {freeViewsBalance > 0 && (
                          <p>
                            Free Views: <strong className="text-emerald-600">{freeViewsBalance.toLocaleString()}</strong>
                          </p>
                        )}
                        <p className="text-base font-semibold text-slate-900 pt-2">
                          Total Views: <strong>{(pricingData.totalViews.min + freeViewsBalance).toLocaleString()} - {(pricingData.totalViews.max + freeViewsBalance).toLocaleString()}</strong>
                        </p>
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-slate-500">Drag the slider to view estimates.</p>
                  )}
                </div>



                {/* Automatic Targeting */}
                <div className="bg-white rounded-xl border border-slate-200 p-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoTargeting}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setAutoTargeting(true);
                        } else {
                          setShowTargetingModal(true);
                        }
                      }}
                      className="mt-1 h-4 w-4 text-red-600 rounded border-slate-300 focus:ring-red-500"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-800 mb-1">Automatic Targeting</p>
                      <p className="text-xs text-slate-600">
                        Automatically add the most relevant targeting for your channel.
                      </p>
                      <button
                        type="button"
                        onClick={() => setShowTargetingModal(true)}
                        className="text-xs text-red-600 hover:text-red-700 mt-1"
                      >
                        Deselect to unlock advanced targeting options.
                      </button>
                    </div>
                  </label>
                </div>

                {/* Manual Targeting Options */}
                {!autoTargeting && (
                  <div className="space-y-4 border rounded-2xl p-4 bg-slate-50">
                    <h3 className="text-base font-semibold text-slate-900">
                      Select your audience type:
                    </h3>

                    {/* Gender Selection */}
                    <div>
                      <p className="text-sm font-semibold text-slate-800 mb-2">Gender:</p>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            value="all"
                            checked={selectedGender === "all"}
                            onChange={(e) => setSelectedGender(e.target.value)}
                            className="h-4 w-4"
                          />
                          <span className="text-sm text-slate-700">All genders</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={selectedGender === "male"}
                            onChange={(e) => setSelectedGender(e.target.value)}
                            className="h-4 w-4"
                          />
                          <span className="text-sm text-slate-700">Male</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={selectedGender === "female"}
                            onChange={(e) => setSelectedGender(e.target.value)}
                            className="h-4 w-4"
                          />
                          <span className="text-sm text-slate-700">Female</span>
                        </label>
                      </div>
                    </div>

                    {/* Age Selection */}
                    <div>
                      <p className="text-sm font-semibold text-slate-800 mb-2">Age:</p>
                      <div className="flex flex-wrap gap-3">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedAges.includes("all")}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedAges(["all"]);
                              } else {
                                setSelectedAges([]);
                              }
                            }}
                            className="h-4 w-4"
                          />
                          <span className="text-sm text-slate-700">All Ages</span>
                        </label>
                        {["18-24", "25-34", "35-44", "45-54", "55-64", "65+"].map((age) => (
                          <label key={age} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedAges.includes(age)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedAges((prev) => {
                                    const filtered = prev.filter((a) => a !== "all");
                                    return [...filtered, age];
                                  });
                                } else {
                                  setSelectedAges((prev) => prev.filter((a) => a !== age));
                                }
                              }}
                              className="h-4 w-4"
                            />
                            <span className="text-sm text-slate-700">{age}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Interests Selection */}
                    <div>
                      <p className="text-sm font-semibold text-slate-800 mb-2">
                        Select your interest related to this video:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedInterests.includes("all")}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedInterests(["all"]);
                              } else {
                                setSelectedInterests([]);
                              }
                            }}
                            className="h-4 w-4"
                          />
                          <span className="text-sm text-slate-700">All interest</span>
                        </label>
                        {[
                          "Children and education",
                          "Cookery",
                          "Music and music videos",
                          "Cars and transportation",
                          "Traveling",
                          "Banking and Finance",
                          "Construction and repair",
                          "Beauty and health",
                          "Video games",
                          "Business and career",
                          "Hobbies and interests",
                          "Sports and fitness",
                          "Science and technology",
                        ].map((interest) => (
                          <label key={interest} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedInterests.includes(interest)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedInterests((prev) => {
                                    const filtered = prev.filter((i) => i !== "all");
                                    return [...filtered, interest];
                                  });
                                } else {
                                  setSelectedInterests((prev) => prev.filter((i) => i !== interest));
                                }
                              }}
                              className="h-4 w-4"
                            />
                            <span className="text-sm text-slate-700">{interest}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Sidebar */}
              <div className="space-y-4">
                <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
                  <p className="text-xs text-slate-500 uppercase mb-1">Total Budget</p>
                  <p className="text-2xl font-bold text-red-600">₹ {budget}</p>
                  <p className="text-xs text-slate-500 mt-2 truncate">{email}</p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="h-4 w-4 text-red-600" />
                    <p className="text-sm font-semibold text-slate-800">Target by Country</p>
                  </div>
                  <select
                    className="w-full border rounded-xl p-2.5 text-sm mb-2"
                    value={targetCountry}
                    onChange={(e) => setTargetCountry(e.target.value)}
                  >
                    <option value="">All Countries (Recommended)</option>
                    <option value="IN">India</option>
                    <option value="US">United States</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AE">UAE</option>
                  </select>
                  <p className="text-xs text-slate-500">
                    Targeting is optional. Narrow targeting can reduce views.
                  </p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-4">
                  <p className="text-sm font-semibold text-slate-800 mb-2">What do you want besides views?</p>
                  <select
                    className="w-full border rounded-xl p-2.5 text-sm"
                    value={goalType}
                    onChange={(e) => setGoalType(e.target.value)}
                  >
                    <option value="Subscribers">Subscribers</option>
                    <option value="Likes">Likes</option>
                    <option value="Comments">Comments</option>
                    <option value="Watch Time">Watch Time</option>
                  </select>
                </div>
                {/* Campaign Duration */}
                <div className="bg-white rounded-xl border border-slate-200 p-4">
                  <p className="text-sm font-semibold text-slate-800 mb-3">Campaign Duration</p>
                  <div className="flex flex-wrap gap-3 mb-3">
                    {["1-2 Days", "3-7 Days", "7-10 Days", "Custom"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setCampaignDuration(option)}
                        className={`px-3 py-1.5 rounded-full border text-sm transition-colors ${campaignDuration === option
                          ? "bg-red-600 text-white border-red-600"
                          : "border-slate-200 text-slate-600 hover:border-red-200"
                          }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  {campaignDuration === "Custom" && (
                    <div className="mt-3 pt-3 border-t border-slate-200">
                      <label className="block text-xs font-semibold text-slate-700 mb-2">
                        Enter number of days:
                      </label>
                      <div className="flex items-center gap-3">
                        <Input
                          type="number"
                          min={1}
                          max={365}
                          value={customDurationDays}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 1;
                            setCustomDurationDays(Math.max(1, Math.min(365, value)));
                          }}
                          className="w-32 border-slate-300 rounded-lg"
                        />
                        <span className="text-sm text-slate-600">days</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-2">
                        Campaign will run for {customDurationDays} {customDurationDays === 1 ? 'day' : 'days'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {!isBulkViews && (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-800">
                Selected Videos ({selectedCount})
              </p>
              {videoList.map((video, index) => (
                <div
                  key={video.videoId}
                  className="border rounded-2xl p-3 flex gap-3 items-center bg-white shadow-sm"
                >
                  <span className="h-7 w-7 rounded-full bg-purple-100 text-red-600 flex items-center justify-center text-xs font-semibold">
                    {index + 1}
                  </span>
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-20 h-14 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900 line-clamp-2">
                      {video.title}
                    </p>
                    <p className="text-xs text-slate-500">{video.author || channelName}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Budget ≈ ₹ {perVideoBudget} · Views ≈{" "}
                      {perVideoViews ? perVideoViews.toLocaleString() : "—"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveVideo(video.videoId)}
                    className="h-8 w-8 rounded-full border border-slate-200 text-slate-500 hover:text-red-600 hover:border-red-200 flex items-center justify-center transition-colors"
                    aria-label={`Remove ${video.title}`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Video Preview Section for Bulk Views */}
          {isBulkViews && bulkViewsPackage && primaryVideo && (
            <div className="mt-4 space-y-3">
              <h3 className="text-sm font-semibold text-slate-900 text-center">How your video will be seen</h3>

              <div className="relative bg-white rounded-xl border border-red-200 px-4 py-3 shadow-sm w-full max-w-2xl mx-auto">
                {/* Navigation Arrows */}
                <button
                  type="button"
                  onClick={() => setCurrentSlide((prev) => (prev === 0 ? 2 : prev - 1))}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border border-slate-200 rounded-full p-2 shadow-md transition-all hover:scale-110"
                  aria-label="Previous preview"
                >
                  <ChevronLeft className="h-5 w-5 text-slate-600" />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1))}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border border-slate-200 rounded-full p-2 shadow-md transition-all hover:scale-110"
                  aria-label="Next preview"
                >
                  <ChevronRight className="h-5 w-5 text-slate-600" />
                </button>

                {/* Video Preview Mock-up - Mobile YouTube Style with Carousel */}
                <div className="max-w-md mx-auto overflow-hidden scale-[0.8] md:scale-[0.9] lg:scale-100 transition-transform origin-center">
                  <div className="relative" style={{ transform: `translateX(-${currentSlide * 100}%)`, transition: 'transform 0.3s ease-in-out' }}>
                    <div className="flex">
                      {/* Slide 1: Video in Feed/List Format */}
                      <div className="min-w-full">
                        <div className="relative bg-white rounded-2xl border-2 border-red-300 shadow-2xl overflow-hidden">
                          {/* Mobile YouTube Header */}
                          <div className="bg-white border-b border-slate-200 px-3 py-2 flex items-center gap-2">
                            <div className="w-6 h-6 flex flex-col gap-1 justify-center">
                              <div className="h-0.5 w-full bg-slate-600"></div>
                              <div className="h-0.5 w-full bg-slate-600"></div>
                              <div className="h-0.5 w-full bg-slate-600"></div>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-6 h-4 bg-red-600 rounded flex items-center justify-center">
                                <Play className="h-3 w-3 text-white fill-white" />
                              </div>
                              <span className="text-xs font-semibold text-slate-900">YouTube</span>
                            </div>
                            <div className="flex-1 bg-slate-100 rounded-full h-6 mx-2"></div>
                          </div>

                          {/* Featured Video with AD */}
                          <div className="p-3">
                            <div className="relative mb-3">
                              <img
                                src={primaryVideo.thumbnail}
                                alt={primaryVideo.title}
                                className="w-full aspect-video object-cover rounded-lg"
                              />
                              <div className="absolute top-2 left-2 bg-yellow-400 text-black text-[10px] font-bold px-1.5 py-0.5 rounded z-10">
                                AD
                              </div>
                              <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
                                <div className="bg-white/95 rounded-full p-3">
                                  <Play className="h-6 w-6 text-slate-900 fill-slate-900" />
                                </div>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className="flex-1">
                                <h4 className="font-semibold text-sm text-blue-600 line-clamp-2 mb-1">
                                  {primaryVideo.title}
                                </h4>
                                <div className="flex items-center gap-1 mb-1">
                                  <span className="bg-yellow-400 text-black text-[10px] font-bold px-1 py-0.5 rounded">AD</span>
                                  <p className="text-xs text-slate-600">
                                    {primaryVideo.author || channelName}
                                  </p>
                                </div>
                                <p className="text-xs text-slate-500">
                                  {bulkViewsPackage.views.toLocaleString()} views
                                </p>
                              </div>
                              <div className="w-6 h-6 flex flex-col gap-0.5 justify-center">
                                <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                                <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                                <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* Slide 2: Video Player Format */}
                      <div className="min-w-full">
                        <div className="relative bg-white rounded-2xl border-2 border-red-300 shadow-2xl overflow-hidden">
                          {/* Mobile YouTube Header */}
                          <div className="bg-white border-b border-slate-200 px-3 py-2 flex items-center gap-2">
                            <div className="w-6 h-6 flex flex-col gap-1 justify-center">
                              <div className="h-0.5 w-full bg-slate-600"></div>
                              <div className="h-0.5 w-full bg-slate-600"></div>
                              <div className="h-0.5 w-full bg-slate-600"></div>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-6 h-4 bg-red-600 rounded flex items-center justify-center">
                                <Play className="h-3 w-3 text-white fill-white" />
                              </div>
                              <span className="text-xs font-semibold text-slate-900">YouTube</span>
                            </div>
                            <div className="flex-1 bg-slate-100 rounded-full h-6 mx-2"></div>
                          </div>

                          {/* Main Video Player Area */}
                          <div className="relative bg-slate-800 aspect-video">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-24 h-16 bg-slate-700 rounded-lg relative overflow-hidden">
                                <img
                                  src={primaryVideo.thumbnail}
                                  alt={primaryVideo.title}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute top-1 left-1 bg-yellow-400 text-black text-[8px] font-bold px-1 py-0.5 rounded">
                                  AD
                                </div>
                              </div>
                            </div>
                            <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full">
                              Skip Ad
                            </div>
                          </div>

                          {/* Video Info */}
                          <div className="bg-white p-3">
                            <h4 className="font-semibold text-sm text-slate-900 mb-1">
                              {primaryVideo.title}
                            </h4>
                            <div className="flex items-center gap-1 mb-1">
                              <span className="bg-yellow-400 text-black text-[10px] font-bold px-1 py-0.5 rounded">AD</span>
                              <p className="text-xs text-slate-600">
                                {primaryVideo.author || channelName}
                              </p>
                            </div>
                            <p className="text-xs text-slate-500 mb-3">
                              {bulkViewsPackage.views.toLocaleString()} views
                            </p>
                            <div className="flex gap-2">
                              <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm py-2 rounded-full">
                                Watch...
                              </Button>
                              <Button variant="outline" className="flex-1 border-red-600 text-red-600 text-sm py-2 rounded-full hover:bg-red-50">
                                Subscribe
                              </Button>
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* Slide 3: Minimal Feed Format */}
                      <div className="min-w-full">
                        <div className="relative bg-white rounded-2xl border-2 border-red-300 shadow-2xl overflow-hidden">
                          {/* Mobile YouTube Header */}
                          <div className="bg-white border-b border-slate-200 px-3 py-2 flex items-center gap-2">
                            <div className="w-6 h-6 flex flex-col gap-1 justify-center">
                              <div className="h-0.5 w-full bg-slate-600"></div>
                              <div className="h-0.5 w-full bg-slate-600"></div>
                              <div className="h-0.5 w-full bg-slate-600"></div>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-6 h-4 bg-red-600 rounded flex items-center justify-center">
                                <Play className="h-3 w-3 text-white fill-white" />
                              </div>
                              <span className="text-xs font-semibold text-slate-900">YouTube</span>
                            </div>
                            <div className="flex-1 bg-slate-100 rounded-full h-6 mx-2"></div>
                          </div>

                          {/* Video Thumbnail with AD */}
                          <div className="relative">
                            <img
                              src={primaryVideo.thumbnail}
                              alt={primaryVideo.title}
                              className="w-full aspect-video object-cover"
                            />
                            <div className="absolute top-2 left-2 bg-yellow-400 text-black text-[10px] font-bold px-1.5 py-0.5 rounded z-10">
                              AD
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                              <div className="bg-white/95 rounded-full p-3">
                                <Play className="h-6 w-6 text-slate-900 fill-slate-900" />
                              </div>
                            </div>
                            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full">
                              Skip Ad
                            </div>
                          </div>

                          {/* Video Info */}
                          <div className="bg-white p-3">
                            <div className="flex items-start gap-2 mb-2">
                              <div className="flex-1">
                                <h4 className="font-semibold text-sm text-slate-900 line-clamp-2 mb-1">
                                  {primaryVideo.title}
                                </h4>
                                <div className="flex items-center gap-1 mb-1">
                                  <span className="bg-yellow-400 text-black text-[10px] font-bold px-1 py-0.5 rounded">AD</span>
                                  <p className="text-xs text-slate-600">
                                    {primaryVideo.author || channelName}
                                  </p>
                                </div>
                                <p className="text-xs text-slate-500">
                                  {bulkViewsPackage.views.toLocaleString()} views
                                </p>
                              </div>
                              <div className="w-6 h-6 flex flex-col gap-0.5 justify-center">
                                <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                                <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                                <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                              </div>
                            </div>

                            <div className="flex gap-2 mt-3">
                              <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm py-2 rounded-full">
                                Watch...
                              </Button>
                              <Button variant="outline" className="flex-1 border-red-600 text-red-600 text-sm py-2 rounded-full hover:bg-red-50">
                                Subscribe
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pagination Dots */}
                  <div className="flex justify-center gap-2 mt-4">
                    {[0, 1, 2].map((index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 rounded-full transition-all ${currentSlide === index ? "w-8 bg-red-600" : "w-2 bg-red-200"
                          }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Section for Bulk Views */}
          {isBulkViews && bulkViewsPackage && primaryVideo && (
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-3">
                <img
                  src={primaryVideo.thumbnail}
                  alt={primaryVideo.title}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {primaryVideo.author || channelName}
                  </p>
                  <p className="text-xs text-slate-500">
                    {selectedCount} {selectedCount === 1 ? 'Video' : 'Videos'} Selected
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 md:gap-4">
                <div className="px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-xs font-semibold text-purple-700">
                  {bulkViewsPackage.label} · {bulkViewsPackage.price}
                </div>
                <Button
                  size="lg"
                  onClick={handleCreateCampaign}
                  disabled={creating}
                >
                  {creating ? "PROCESSING..." : "BUY PACKAGE"}
                </Button>
              </div>
            </div>
          )}

          {!isBulkViews && (
            <div className="flex gap-3 justify-end pt-4 border-t border-slate-200">
              <Button
                variant="outline"
                onClick={() => setShowPreview(true)}
                className="rounded-xl"
              >
                Preview Ad
              </Button>
              <Button
                onClick={handleCreateCampaign}
                disabled={creating}
                className="rounded-xl"
              >
                {creating ? "PROCESSING..." : "Continue"}
              </Button>
            </div>
          )}
          {createError && (
            <p className="text-sm text-red-600 text-right mt-2">{createError}</p>
          )}
        </CampaignCard>
      </div>

      {/* Ad Preview Modal */}
      <AdPreviewModal
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
      {showTargetingModal && (
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
      )}
    </CampaignLayout>
  );
};

export default CampaignBudget;

