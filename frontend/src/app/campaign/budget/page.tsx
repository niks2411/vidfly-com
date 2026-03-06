"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Globe, Layers, Settings, CreditCard, X, ChevronRight, Play } from "lucide-react";
import AdPreviewModal from "@/components/AdPreviewModal";
import { getVerifiedEmail, getSelectedChannelKey } from "@/lib/verifiedEmail";
import CampaignLayout from "@/components/CampaignLayout";
import CampaignCard from "@/components/CampaignCard";
import ChannelSelector from "@/components/ChannelSelector";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");

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

type CampaignState = {
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

export default function CampaignBudget() {
    const router = useRouter();
    const [state, setState] = useState<CampaignState | null>(null);
    const [verifiedEmail, setVerifiedEmail] = useState("");

    useEffect(() => {
        const email = getVerifiedEmail();
        if (!email) {
            router.replace("/get-started");
            return;
        }
        setVerifiedEmail(email);

        try {
            // 1. Check current campaign video from sessionStorage
            const currentVideo = sessionStorage.getItem("vidfly_current_campaign_video");
            const currentVideos = sessionStorage.getItem("vidfly_current_campaign_videos");

            if (currentVideo) {
                const videoInfo = JSON.parse(currentVideo);
                const videos = currentVideos ? JSON.parse(currentVideos) : [videoInfo];
                const newState: CampaignState = {
                    email,
                    youtubeLink: videoInfo.link,
                    videoInfo,
                    videos,
                };
                setState(newState);
                sessionStorage.setItem(BUDGET_STATE_KEY, JSON.stringify(newState));
            } else {
                // 2. Check for existing budget state
                const stored = sessionStorage.getItem(BUDGET_STATE_KEY);
                if (stored) {
                    setState(JSON.parse(stored));
                } else {
                    router.replace("/campaign");
                }
            }
        } catch (err) {
            console.error("Failed to restore campaign state", err);
            router.replace("/campaign");
        }
    }, [router]);

    const [selectedVideos, setSelectedVideos] = useState<SelectedVideo[]>([]);
    useEffect(() => {
        if (state?.videos) setSelectedVideos(state.videos);
        else if (state?.videoInfo) setSelectedVideos([state.videoInfo]);
    }, [state]);

    const isBulkViews = (state?.campaignType === "bulk-views" && state?.bulkViewsPackage) || false;
    const bulkViewsPackage = state?.bulkViewsPackage || null;
    const bulkViewsPrice = bulkViewsPackage
        ? parseFloat(bulkViewsPackage.price.replace(/[^0-9.]/g, ""))
        : null;

    const [budget, setBudget] = useState(800);
    useEffect(() => {
        if (isBulkViews && bulkViewsPrice) {
            setBudget(bulkViewsPrice);
        }
    }, [isBulkViews, bulkViewsPrice]);

    const [pricingData, setPricingData] = useState<PricingBreakdown | null>(null);
    const [loadingPricing, setLoadingPricing] = useState(false);
    const [targetCountry, setTargetCountry] = useState("");
    const [campaignDuration, setCampaignDuration] = useState("3-7 Days");
    const [customDurationDays, setCustomDurationDays] = useState<number>(7);
    const [autoTargeting, setAutoTargeting] = useState(true);
    const [showTargetingModal, setShowTargetingModal] = useState(false);
    const [goalType, setGoalType] = useState("Engagement");
    const [createError, setCreateError] = useState<string | null>(null);
    const [creating, setCreating] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [freeViewsBalance, setFreeViewsBalance] = useState(0);

    // Manual targeting options
    const [selectedGender, setSelectedGender] = useState("all");
    const [selectedAges, setSelectedAges] = useState<string[]>(["all"]);
    const [selectedInterests, setSelectedInterests] = useState<string[]>(["all"]);

    useEffect(() => {
        if (verifiedEmail) {
            loadFreeViewsBalance();
        }
    }, [verifiedEmail]);

    const loadFreeViewsBalance = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/free-views/balance?email=${encodeURIComponent(verifiedEmail)}`, {
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
            const timeout = setTimeout(() => calculatePricing(budget), 300);
            return () => clearTimeout(timeout);
        }
    }, [budget, isBulkViews]);

    const calculatePricing = async (value: number) => {
        try {
            setLoadingPricing(true);
            const response = await fetch(`${API_BASE_URL}/api/pricing/calculate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ price: value }),
            });
            if (!response.ok) throw new Error("Unable to calculate views");
            const data = await response.json();
            setPricingData(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingPricing(false);
        }
    };

    if (!state || !selectedVideos.length) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
        );
    }

    const primaryVideo = selectedVideos[0];
    const channelName = primaryVideo.author || "Your Channel";
    const youtubeLink = state.youtubeLink || primaryVideo.link;

    const effectiveTotalViews = (() => {
        let baseViews = 0;
        if (isBulkViews && bulkViewsPackage) {
            baseViews = bulkViewsPackage.views;
        } else if (pricingData?.totalViews?.exact) {
            baseViews = pricingData.totalViews.exact;
        } else {
            baseViews = budget;
        }
        return baseViews + freeViewsBalance;
    })();

    const perVideoViews = Math.max(1, Math.round(effectiveTotalViews / selectedVideos.length));

    const handleCreateCampaign = async () => {
        try {
            setCreating(true);
            setCreateError(null);

            const payload = {
                customerName: channelName,
                email: verifiedEmail,
                channel: {
                    name: channelName,
                    channelId: primaryVideo.channelId || null,
                    link: youtubeLink,
                    avatar: primaryVideo.avatarUrl || null,
                },
                videos: selectedVideos.map((video) => ({
                    videoId: video.videoId,
                    title: video.title,
                    link: video.link,
                    thumbnail: video.thumbnail,
                    viewsRequested: video.viewsRequested || perVideoViews,
                })),
                package: isBulkViews && bulkViewsPackage
                    ? {
                        id: bulkViewsPackage.id,
                        name: bulkViewsPackage.label,
                        price: budget,
                        currency: "INR",
                        quantity: effectiveTotalViews,
                        type: "bulk-views",
                        description: `${bulkViewsPackage.label} - ${bulkViewsPackage.price}`,
                    }
                    : {
                        id: "custom-campaign",
                        name: "Custom Campaign",
                        price: budget,
                        currency: "INR",
                        quantity: effectiveTotalViews,
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
                        ? `Custom (${customDurationDays} days)`
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
                source: selectedVideos.length > 1 ? "promote_channel" : "promote_video",
            };

            const response = await fetch(`${API_BASE_URL}/api/orders/campaign`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
                credentials: "include",
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data?.message || "Unable to create campaign");

            if (data.paymentCheckoutUrl) {
                window.location.href = data.paymentCheckoutUrl;
                return;
            }

            router.push(`/campaign/my-campaigns`);
        } catch (err) {
            setCreateError(err instanceof Error ? err.message : "Failed to create campaign");
        } finally {
            setCreating(false);
        }
    };

    const handleRemoveVideo = (videoId: string) => {
        setSelectedVideos((prev) => prev.filter((v) => v.videoId !== videoId));
    };

    return (
        <CampaignLayout activeSidebar="budget">
            <div className="w-full space-y-6">
                <div className="bg-white rounded-xl border border-slate-200 p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-slate-600 uppercase">STEP 3 - BUDGET & TARGETING</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {["ENTER LINK", "SELECT VIDEOS", "BUDGET & TARGETING", "PAYMENT"].map((step, index) => (
                            <div key={step} className="flex-1 flex items-center">
                                <div className="flex-1 flex items-center gap-2">
                                    <div className={`h-2 flex-1 rounded-full ${index <= 2 ? "bg-red-600" : "bg-slate-200"}`} />
                                    {index < 3 && <div className={`h-2 w-2 rounded-full ${index <= 2 ? "bg-red-600" : "bg-slate-200"}`} />}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6 items-start">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-xl border border-slate-200 p-3 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-20">
                            <div className="flex items-center gap-3 flex-1 min-w-0 w-full">
                                <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">✓</div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-[10px] font-semibold text-slate-500 uppercase">Verified Email</p>
                                    <p className="text-sm font-semibold text-slate-900 truncate">{verifiedEmail}</p>
                                </div>
                            </div>
                            <div className="flex-shrink-0 w-full sm:w-auto">
                                <ChannelSelector />
                            </div>
                        </div>

                        {!isBulkViews && (
                            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                                        <CreditCard className="h-4 w-4 text-red-600" /> Enter Budget
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
                                                className={`pl-6 h-9 text-sm font-semibold border-slate-200 focus:ring-red-100 ${budget < 800 || budget > 10000 ? "border-red-500" : ""}`}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="relative pt-4 pb-1">
                                    <input
                                        type="range"
                                        min={800}
                                        max={10000}
                                        step={100}
                                        value={budget}
                                        onChange={(e) => setBudget(Number(e.target.value))}
                                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                                        style={{ background: `linear-gradient(to right, #dc2626 ${((budget - 800) / (9200)) * 100}%, #e2e8f0 0%)` }}
                                    />
                                    <div className="flex justify-between text-xs text-slate-400 font-medium mt-2">
                                        {[800, 2000, 4000, 6000, 8000, 10000].map(m => <span key={m}>{m.toLocaleString()}</span>)}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
                            <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2 pb-4 border-b border-slate-100">
                                <Settings className="h-4 w-4 text-red-600" /> Targeting & Settings
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6 pb-2">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                                        <Globe className="h-3.5 w-3.5 text-slate-400" /> Target Country
                                    </label>
                                    <select
                                        className="w-full border border-slate-300 rounded-xl p-2.5 text-sm bg-slate-50"
                                        value={targetCountry}
                                        onChange={(e) => setTargetCountry(e.target.value)}
                                    >
                                        <option value="">All Countries (Recommended)</option>
                                        <option value="IN">India</option>
                                        <option value="US">United States</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Goal</label>
                                    <select className="w-full border border-slate-300 rounded-xl p-2.5 text-sm bg-slate-50" value={goalType} onChange={(e) => setGoalType(e.target.value)}>
                                        <option value="Engagement">Engagement</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-4 pt-2 border-t border-slate-50">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-3">Campaign Duration</label>
                                    <div className="flex flex-wrap gap-2">
                                        {["1-2 Days", "3-7 Days", "7-10 Days", "Custom"].map((d) => (
                                            <button
                                                key={d}
                                                onClick={() => setCampaignDuration(d)}
                                                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${campaignDuration === d
                                                    ? "bg-red-600 border-red-600 text-white shadow-md"
                                                    : "bg-white border-slate-200 text-slate-600 hover:border-red-200"
                                                    }`}
                                            >
                                                {d}
                                            </button>
                                        ))}
                                    </div>
                                    {campaignDuration === "Custom" && (
                                        <div className="mt-3 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                            <Input
                                                type="number"
                                                min={1}
                                                max={30}
                                                value={customDurationDays}
                                                onChange={(e) => setCustomDurationDays(Number(e.target.value))}
                                                className="w-24 h-10"
                                            />
                                            <span className="text-sm text-slate-500">days</span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <div
                                        onClick={() => setAutoTargeting(true)}
                                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${autoTargeting
                                            ? "border-red-600 bg-red-50/30"
                                            : "border-slate-100 bg-slate-50/50 hover:border-slate-200"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                                <span className="font-semibold text-slate-900">Automatic Targeting</span>
                                                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Recommended</span>
                                            </div>
                                            <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${autoTargeting ? "border-red-600" : "border-slate-300"}`}>
                                                {autoTargeting && <div className="h-2.5 w-2.5 rounded-full bg-red-600" />}
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 bg-white p-3 rounded-lg border border-red-100 shadow-sm">
                                            <div className="h-8 w-8 rounded-full bg-red-100 flex-shrink-0 flex items-center justify-center">
                                                <Play className="h-4 w-4 text-red-600 fill-current" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-xs font-bold text-slate-900">AI Agent</span>
                                                </div>
                                                <p className="text-xs text-slate-600 leading-relaxed">
                                                    Sit back and relax! Vidfly finds the best audience for your videos.
                                                    <span className="block mt-1 text-slate-400 font-medium">(Tailored based on your selections and channel profile.)</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        onClick={() => setShowTargetingModal(true)}
                                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${!autoTargeting
                                            ? "border-red-600 bg-red-50/30"
                                            : "border-slate-100 bg-slate-50/50 hover:border-slate-200"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold text-slate-900">Manual Targeting</span>
                                            <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${!autoTargeting ? "border-red-600" : "border-slate-300"}`}>
                                                {!autoTargeting && <div className="h-2.5 w-2.5 rounded-full bg-red-600" />}
                                            </div>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-1">Set your targeting preferences manually</p>

                                        {!autoTargeting && (
                                            <div className="mt-4 pt-4 border-t border-red-100 space-y-4 animate-in fade-in slide-in-from-top-2">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Gender</label>
                                                        <select className="w-full border border-slate-200 rounded-lg p-2 text-xs" value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)}>
                                                            <option value="all">All Genders</option>
                                                            <option value="male">Male</option>
                                                            <option value="female">Female</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Age Range</label>
                                                        <select className="w-full border border-slate-200 rounded-lg p-2 text-xs" multiple value={selectedAges} onChange={(e) => setSelectedAges(Array.from(e.target.selectedOptions, option => option.value))}>
                                                            <option value="all">All Ages</option>
                                                            <option value="18-24">18-24</option>
                                                            <option value="25-34">25-34</option>
                                                            <option value="35-44">35-44</option>
                                                            <option value="45+">45+</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-20 space-y-4">
                            <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
                                <div className="bg-slate-50 p-4 border-b border-slate-100 font-bold flex justify-between">
                                    Estimated Results <Layers className="h-4 w-4 text-slate-400" />
                                </div>
                                <div className="p-4 space-y-4">
                                    <div>
                                        <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2 uppercase">
                                            Estimated Views <span className="text-green-600 bg-green-50 px-2 rounded-full">+6% Bonus</span>
                                        </div>
                                        {loadingPricing ? (
                                            <div className="h-4 bg-slate-100 rounded w-full animate-pulse" />
                                        ) : (
                                            <div className="text-2xl font-bold text-slate-900">
                                                {pricingData ? `${(pricingData.totalViews.min + freeViewsBalance).toLocaleString()} - ${(pricingData.totalViews.max + freeViewsBalance).toLocaleString()}` : "Set budget"}
                                            </div>
                                        )}
                                    </div>
                                    <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                                        <span className="text-sm font-semibold text-slate-600">Total Budget</span>
                                        <span className="text-xl font-bold text-red-600">₹ {budget}</span>
                                    </div>
                                    <Button
                                        onClick={handleCreateCampaign}
                                        disabled={creating || budget < 800}
                                        className="w-full rounded-xl py-6 bg-red-600 hover:bg-red-700 text-white font-bold"
                                    >
                                        {creating ? "Processing..." : "Pay & Launch"}
                                    </Button>
                                    <Button variant="outline" onClick={() => setShowPreview(true)} className="w-full rounded-xl">Preview Ad</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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

            {showTargetingModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full p-6 relative">
                        <h2 className="text-xl font-bold mb-4">Ad Targeting Advice</h2>
                        <p className="text-sm text-slate-700 mb-6">Automatic Targeting generally yields the best outcomes.</p>
                        <div className="flex gap-3">
                            <Button variant="outline" className="flex-1" onClick={() => { setShowTargetingModal(false); setAutoTargeting(false); }}>Select Manually</Button>
                            <Button className="flex-1 bg-red-600" onClick={() => { setShowTargetingModal(false); setAutoTargeting(true); }}>Keep Automatic</Button>
                        </div>
                    </div>
                </div>
            )}
        </CampaignLayout>
    );
}
