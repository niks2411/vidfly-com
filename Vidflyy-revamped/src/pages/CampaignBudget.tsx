import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Globe, Layers, Settings, CreditCard, X } from "lucide-react";
import CampaignSidebar from "@/components/CampaignSidebar";
import CampaignHeader from "@/components/CampaignHeader";
import { getVerifiedEmail } from "@/lib/verifiedEmail";

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
};

const CampaignBudget = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | undefined;
  const email = state?.email?.trim().toLowerCase() || getVerifiedEmail();

  const [selectedVideos, setSelectedVideos] = useState<SelectedVideo[]>(() => {
    if (state?.videos?.length) return state.videos;
    return state?.videoInfo ? [state.videoInfo] : [];
  });
  useEffect(() => {
    if (!state?.videoInfo) {
      navigate("/campaign", { replace: true });
    }
  }, [state, navigate]);

  const [budget, setBudget] = useState(10);
  const [pricingData, setPricingData] = useState<PricingBreakdown | null>(null);
  const [loadingPricing, setLoadingPricing] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [targetCountry, setTargetCountry] = useState("");
  const [campaignDuration, setCampaignDuration] = useState("3-7 Days");
  const [autoTargeting, setAutoTargeting] = useState(true);
  const [goalType, setGoalType] = useState("Subscribers");
  const [createError, setCreateError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (!email) {
      navigate("/get-started", { replace: true });
    }
  }, [email, navigate]);

  useEffect(() => {
    calculatePricing(budget);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => calculatePricing(budget), 300);
    return () => clearTimeout(timeout);
  }, [budget]);

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

  if (!state?.videoInfo) {
    return null;
  }

  const videoList = selectedVideos;
  const primaryVideo = videoList[0];
  const selectedCount = videoList.length;
  const { youtubeLink } = state;
  if (!primaryVideo) {
    return null;
  }
  const channelName = primaryVideo.author || "Your Channel";
  const effectiveTotalViews =
    pricingData?.totalViews?.exact && pricingData.totalViews?.exact > 0
      ? pricingData.totalViews.exact
      : budget;
  const perVideoViews =
    selectedCount > 0
      ? Math.max(1, Math.round(effectiveTotalViews / selectedCount))
      : undefined;
  const perVideoBudget =
    selectedCount > 0 ? Number((budget / selectedCount).toFixed(2)) : budget;

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
        package: {
          id: "custom-campaign",
          name: "Custom Campaign",
          price: budget,
          currency: "INR",
          quantity: totalViewsExact,
          type: "views",
          description: `Budget ${budget} with estimated ${
            pricingData?.totalViews
              ? `${pricingData.totalViews.min}-${pricingData.totalViews.max} views`
              : "views"
          }`,
        },
        targeting: {
          country: targetCountry,
          goal: goalType,
          duration: campaignDuration,
          autoTargeting,
          notes: coupon ? `Coupon used: ${coupon}` : undefined,
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-purple-50 font-montserrat">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 flex flex-col gap-8 lg:flex-row">
        <CampaignSidebar active="budget" />
        <div className="flex-1 space-y-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 space-y-6 animate-fade-in hover:shadow-2xl transition-all duration-300">
          <CampaignHeader />
          <div className="flex flex-wrap items-center justify-between gap-4 animate-fade-in">
            <div>
              <p className="text-xs text-slate-500 uppercase font-semibold mb-2">Step 3</p>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent mb-3">
                Budget & Targeting
              </h1>
              <p className="text-slate-600 text-base">
                Configure campaign details for{" "}
                <span className="font-bold text-purple-600">
                  {primaryVideo.title}
                </span>
              </p>
            </div>
            <div className="flex gap-2 text-xs font-semibold uppercase text-purple-500">
              {["Enter Link", "Select Videos", "Budget & Targeting", "Payment"].map(
                (step, index) => (
                  <div key={step} className="flex flex-col items-center w-24">
                    <div
                      className={`h-1.5 w-full rounded-full ${
                        index <= 2 ? "bg-purple-500" : "bg-slate-200"
                      }`}
                    />
                    <span className="mt-2 text-slate-500 text-[11px] text-center">
                      {step}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="flex-1 bg-purple-50 rounded-2xl p-5">
              <p className="text-xs font-semibold text-slate-600 uppercase">
                Enter Budget
              </p>
              <input
                type="range"
                min={10}
                max={1000}
                step={10}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full mt-6 accent-purple-600"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-3">
                {[10, 100, 500, 800, 1000].map((mark) => (
                  <span key={mark}>{mark}</span>
                ))}
              </div>
            </div>
            <div className="bg-white border rounded-2xl p-5 text-center shadow-sm space-y-2">
              <div>
                <p className="text-xs text-slate-500 uppercase">Total Budget</p>
                <p className="text-4xl font-bold text-purple-600 mt-2">₹ {budget}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase">Videos Selected</p>
                <p className="text-2xl font-semibold text-slate-900">{selectedCount}</p>
                <p className="text-xs text-slate-500">
                  Per Video ≈ ₹ {perVideoBudget}
                </p>
              </div>
              <p className="text-xs text-slate-500">
                Email: {email || "Verified user"}
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-slate-900 text-sm">
                  Estimated Views
                </h3>
                <span className="text-xs text-purple-500 font-semibold">
                  Bonus (30%)
                </span>
              </div>
              {loadingPricing ? (
                <p className="text-sm text-slate-500">Calculating…</p>
              ) : pricingData ? (
                <>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500"
                        style={{
                          width: `${
                            (pricingData.baseViews.exact /
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
                          width: `${
                            (pricingData.bonusViews.exact /
                              pricingData.totalViews.exact) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-slate-600 space-y-1">
                    <p>
                      Base:{" "}
                      <strong>
                        {pricingData.baseViews.min.toLocaleString()} -{" "}
                        {pricingData.baseViews.max.toLocaleString()}
                      </strong>
                    </p>
                    <p>
                      Bonus:{" "}
                      <strong>
                        {pricingData.bonusViews.min.toLocaleString()} -{" "}
                        {pricingData.bonusViews.max.toLocaleString()}
                      </strong>
                    </p>
                    <p className="text-lg font-semibold text-slate-900 pt-2">
                      Total Views: {pricingData.totalViews.min.toLocaleString()} -{" "}
                      {pricingData.totalViews.max.toLocaleString()}
                    </p>
                    {pricingData.totalSubscribers && (
                      <p className="text-xs text-slate-500">
                        Total Subscribers:{" "}
                        {pricingData.totalSubscribers.min.toLocaleString()} -{" "}
                        {pricingData.totalSubscribers.max.toLocaleString()}
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <p className="text-sm text-slate-500">
                  Drag the slider to view estimates.
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Input
                placeholder="Apply coupon"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="rounded-2xl"
              />
              <div className="flex items-start gap-3">
                <Globe className="mt-2 text-purple-500" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-800">
                    Target by Country
                  </p>
                  <select
                    className="w-full border rounded-2xl p-3 text-sm mt-2"
                    value={targetCountry}
                    onChange={(e) => setTargetCountry(e.target.value)}
                  >
                    <option value="">All Countries (Recommended)</option>
                    <option value="IN">India</option>
                    <option value="US">United States</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AE">UAE</option>
                  </select>
                  <p className="text-xs text-slate-500 mt-2">
                    Targeting is optional. Narrow targeting can reduce views.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-slate-800 mb-3">
                Campaign Duration
              </p>
              <div className="flex flex-wrap gap-3">
                {["1-2 Days", "3-7 Days", "7-10 Days", "Custom"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setCampaignDuration(option)}
                    className={`px-4 py-2 rounded-full border text-sm ${
                      campaignDuration === option
                        ? "bg-purple-600 text-white border-purple-600"
                        : "border-slate-200 text-slate-600"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-800 mb-3">
                Automatic Targeting
              </p>
              <label className="flex items-center gap-3 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={autoTargeting}
                  onChange={(e) => setAutoTargeting(e.target.checked)}
                  className="h-4 w-4"
                />
                Automatically add the most relevant targeting for your channel.
              </label>
              <p className="text-xs text-slate-500 mt-2">
                Deselect to unlock advanced targeting options.
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-slate-800 mb-3">
                What do you want besides views?
              </p>
              <select
                className="w-full border rounded-2xl p-3 text-sm"
                value={goalType}
                onChange={(e) => setGoalType(e.target.value)}
              >
                <option value="Subscribers">Subscribers</option>
                <option value="Likes">Likes</option>
                <option value="Comments">Comments</option>
                <option value="Watch Time">Watch Time</option>
              </select>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-semibold text-slate-800">
                Selected Videos ({selectedCount})
              </p>
              {videoList.map((video, index) => (
                <div
                  key={video.videoId}
                  className="border rounded-2xl p-4 flex gap-4 items-center bg-white shadow-sm"
                >
                  <span className="h-8 w-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </span>
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-24 h-16 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900 line-clamp-2">
                      {video.title}
                    </p>
                    <p className="text-xs text-slate-500">{video.author || channelName}</p>
                    <p className="text-xs text-slate-500 mt-1">
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
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <Button
              variant="outline"
              className="rounded-2xl border-purple-600 text-purple-600 px-6"
            >
              Preview Ad
            </Button>
            <Button
              className="bg-purple-600 hover:bg-purple-700 rounded-2xl px-6"
              onClick={handleCreateCampaign}
              disabled={creating}
            >
              {creating ? "Processing..." : "Create Campaign"}
            </Button>
          </div>
          {createError && (
            <p className="text-sm text-red-600 text-right">{createError}</p>
          )}
        </div>

        <section className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Layers,
              title: "Enter Channel / Video Link",
              desc: "Share the exact video or channel you want to promote.",
            },
            {
              icon: Settings,
              title: "Set Up Campaign",
              desc: "Choose your target audience, budget, and timeline.",
            },
            {
              icon: CreditCard,
              title: "Make Payment",
              desc: "Approve and pay after finalizing campaign details.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-3xl shadow-md p-6 flex flex-col gap-3"
            >
              <span className="h-12 w-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
                <card.icon className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-semibold text-slate-900">
                {card.title}
              </h3>
              <p className="text-sm text-slate-500">{card.desc}</p>
            </div>
          ))}
        </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CampaignBudget;

