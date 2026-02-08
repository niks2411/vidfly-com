import { useState, useEffect, useMemo } from "react";
import CampaignLayout from "@/components/CampaignLayout";
import CampaignCard from "@/components/CampaignCard";
import CampaignHeader from "@/components/CampaignHeader";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { getVerifiedEmail, getSelectedChannelKey } from "@/lib/verifiedEmail";

const STORAGE_KEY = "vidfly_channel_videos";

export const promotionPackages = [
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

// Local alias used within this component for easier refactoring
const packages = promotionPackages;

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL.replace(/\/$/, "");

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
  const [hasSavedChannels, setHasSavedChannels] = useState(false);
  const [loadingSavedChannels, setLoadingSavedChannels] = useState(true);

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

  // Load saved channels from backend first
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
              const selectedChannel = data.channels.find((ch: any) => ch.channelId === data.selectedChannelId);
              if (selectedChannel && !channelInfo) {
                // Fetch channel info for the selected channel
                await fetchChannelInfoById(data.selectedChannelId, selectedChannel.channelName || "");
                const channelKey = getSelectedChannelKey();
                localStorage.setItem(channelKey, data.selectedChannelId);
              }
            } else if (data.channels.length > 0 && !channelInfo) {
              // Use first channel if no selected channel
              const firstChannel = data.channels[0];
              await fetchChannelInfoById(firstChannel.channelId, firstChannel.channelName || "");
              const channelKey = getSelectedChannelKey();
              localStorage.setItem(channelKey, firstChannel.channelId);
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

  // Load stored videos from sessionStorage (fallback)
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const parsed: StoredVideo[] = JSON.parse(
        sessionStorage.getItem(STORAGE_KEY) || "[]"
      );
      setStoredVideos(parsed);

      // Only use sessionStorage channels if backend channels are not available
      if (!hasSavedChannels && !channelInfo && parsed.length > 0) {
        // Get selected channel from localStorage (per email) for cross-tab sync
        const channelKey = getSelectedChannelKey();
        const savedChannelId = localStorage.getItem(channelKey);

        if (savedChannelId && parsed.length > 0) {
          // Filter videos by selected channel
          const channelVideos = parsed.filter((v) => v.channelId === savedChannelId);
          if (channelVideos.length > 0) {
            const videoWithChannel = channelVideos[0];
            fetchChannelInfoById(savedChannelId, videoWithChannel.author || "");
          }
        } else {
          // Fallback: use first video with channelId
          const videoWithChannel = parsed.find((v) => v.channelId);
          if (videoWithChannel?.channelId) {
            fetchChannelInfoById(videoWithChannel.channelId, videoWithChannel.author || "");
          }
        }
      }
    } catch (err) {
      console.error("Failed to load stored videos", err);
    }
  }, [hasSavedChannels, channelInfo]);

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

  const handleBuyNow = async (pkgId: string) => {
    // Get selected channel from localStorage (per email) for cross-tab sync
    const channelKey = getSelectedChannelKey();
    let selectedChannelId: string | null = localStorage.getItem(channelKey);
    let channelName = channelInfo?.name || "";

    // If no channel from localStorage, try to load from backend
    if (!selectedChannelId && verifiedEmail) {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/user-preferences/channels?email=${encodeURIComponent(verifiedEmail)}`,
          { credentials: "include" }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.selectedChannelId) {
            selectedChannelId = data.selectedChannelId;
            const selectedChannel = data.channels?.find((ch: any) => ch.channelId === data.selectedChannelId);
            if (selectedChannel) {
              channelName = selectedChannel.channelName || "";
            }
            localStorage.setItem(channelKey, selectedChannelId);
          } else if (data.channels && data.channels.length > 0) {
            // Use first channel if no selected channel
            selectedChannelId = data.channels[0].channelId;
            channelName = data.channels[0].channelName || "";
            localStorage.setItem(channelKey, selectedChannelId);
          }
        }
      } catch (err) {
        console.warn("Failed to load channels from backend:", err);
      }
    }

    // Fallback: use first video with channelId from sessionStorage
    if (!selectedChannelId && storedVideos.length > 0) {
      const videoWithChannel = storedVideos.find((v) => v.channelId);
      if (videoWithChannel?.channelId) {
        selectedChannelId = videoWithChannel.channelId;
        channelName = videoWithChannel.author || "";
        localStorage.setItem(channelKey, selectedChannelId);
      }
    }

    if (!selectedChannelId) {
      setChannelError("Please add a channel first. You can add a channel on the 'Promote Video / Short' or 'Promote Channel' page.");
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

        {/* Packages Grid - Inverted Triangle Layout (3, 2, 1) */}
        <div className="flex flex-col items-center gap-6">
          {/* Row 1: 3 packages (top row) */}
          {packages.length > 2 && (
            <div className="flex justify-center gap-6 w-full">
              {packages.slice(0, 3).map((pkg) => (
                <div key={pkg.id} className="w-full max-w-sm">
                  <div
                    className={`relative rounded-2xl border-2 ${pkg.borderColor} bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
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

                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">{pkg.name}</h2>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-3xl font-bold text-red-600">₹{pkg.price.toLocaleString()}</span>
                      </div>
                    </div>

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

                    {pkg.hasAI && pkg.aiFeatures && (
                      <div className="mb-6">
                        <p className="text-sm font-semibold text-slate-800 mb-2">Plus Premium Features:</p>
                        <ul className="space-y-2">
                          {pkg.aiFeatures.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                              <span className="text-purple-600 font-bold mt-0.5">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {pkg.discount && (
                      <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                        <p className="text-sm font-semibold text-slate-800 mb-2">Bonus Included:</p>
                        <div className="space-y-1 text-sm text-slate-700">
                          <div className="flex items-center gap-2">
                            <span className="text-yellow-600 font-semibold">✓</span>
                            <span>{pkg.discount}% Instant Discount</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-yellow-600 font-semibold">✓</span>
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

                    <Button
                      className={`w-full rounded-xl py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${pkg.isPremium
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                          : pkg.hasAI
                            ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                            : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
                        }`}
                      onClick={() => handleBuyNow(pkg.id)}
                      disabled={(!hasSavedChannels && storedVideos.length === 0) || loadingChannel || loadingSavedChannels}
                    >
                      {loadingChannel || loadingSavedChannels ? "Loading..." : `Buy ${pkg.name}`}
                    </Button>
                    {channelError && pkg.id === packages[0].id && (
                      <p className="mt-2 text-xs text-red-600 text-center">{channelError}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Row 2: 2 packages (middle row) */}
          {packages.length > 4 && (
            <div className="flex justify-center gap-6 w-full">
              {packages.slice(3, 5).map((pkg) => (
                <div key={pkg.id} className="w-full max-w-sm">
                  <div
                    className={`relative rounded-2xl border-2 ${pkg.borderColor} bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
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

                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">{pkg.name}</h2>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-3xl font-bold text-red-600">₹{pkg.price.toLocaleString()}</span>
                      </div>
                    </div>

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

                    {pkg.hasAI && pkg.aiFeatures && (
                      <div className="mb-6">
                        <p className="text-sm font-semibold text-slate-800 mb-2">Plus Premium Features:</p>
                        <ul className="space-y-2">
                          {pkg.aiFeatures.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                              <span className="text-purple-600 font-bold mt-0.5">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {pkg.discount && (
                      <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                        <p className="text-sm font-semibold text-slate-800 mb-2">Bonus Included:</p>
                        <div className="space-y-1 text-sm text-slate-700">
                          <div className="flex items-center gap-2">
                            <span className="text-yellow-600 font-semibold">✓</span>
                            <span>{pkg.discount}% Instant Discount</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-yellow-600 font-semibold">✓</span>
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

                    <Button
                      className={`w-full rounded-xl py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${pkg.isPremium
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                          : pkg.hasAI
                            ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                            : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
                        }`}
                      onClick={() => handleBuyNow(pkg.id)}
                      disabled={(!hasSavedChannels && storedVideos.length === 0) || loadingChannel || loadingSavedChannels}
                    >
                      {loadingChannel || loadingSavedChannels ? "Loading..." : `Buy ${pkg.name}`}
                    </Button>
                    {channelError && pkg.id === packages[0].id && (
                      <p className="mt-2 text-xs text-red-600 text-center">{channelError}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Row 3: 1 package (bottom row, centered) */}
          {packages.length > 5 && (
            <div className="flex justify-center w-full">
              {packages.slice(5, 6).map((pkg) => (
                <div key={pkg.id} className="w-full max-w-sm">
                  <div
                    className={`relative rounded-2xl border-2 ${pkg.borderColor} bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
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

                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">{pkg.name}</h2>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-3xl font-bold text-red-600">₹{pkg.price.toLocaleString()}</span>
                      </div>
                    </div>

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

                    {pkg.hasAI && pkg.aiFeatures && (
                      <div className="mb-6">
                        <p className="text-sm font-semibold text-slate-800 mb-2">Plus Premium Features:</p>
                        <ul className="space-y-2">
                          {pkg.aiFeatures.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                              <span className="text-purple-600 font-bold mt-0.5">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {pkg.discount && (
                      <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                        <p className="text-sm font-semibold text-slate-800 mb-2">Bonus Included:</p>
                        <div className="space-y-1 text-sm text-slate-700">
                          <div className="flex items-center gap-2">
                            <span className="text-yellow-600 font-semibold">✓</span>
                            <span>{pkg.discount}% Instant Discount</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-yellow-600 font-semibold">✓</span>
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

                    <Button
                      className={`w-full rounded-xl py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${pkg.isPremium
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                          : pkg.hasAI
                            ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                            : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
                        }`}
                      onClick={() => handleBuyNow(pkg.id)}
                      disabled={(!hasSavedChannels && storedVideos.length === 0) || loadingChannel || loadingSavedChannels}
                    >
                      {loadingChannel || loadingSavedChannels ? "Loading..." : `Buy ${pkg.name}`}
                    </Button>

                    {channelError && pkg.id === packages[0].id && (
                      <p className="mt-2 text-xs text-red-600 text-center">{channelError}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </CampaignCard>
    </CampaignLayout>
  );
};

export default CampaignPackages;


