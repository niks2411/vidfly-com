"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import CampaignLayout from "@/components/CampaignLayout";
import CampaignCard from "@/components/CampaignCard";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, X, Loader2 } from "lucide-react";
import ChannelSelector from "@/components/ChannelSelector";
import { getSelectedChannelKey, getVerifiedEmail } from "@/lib/verifiedEmail";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");

const packages = [
    {
        id: "starter",
        name: "Starter",
        price: "₹999",
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

const STORAGE_KEY = "vidfly_channel_videos";

export default function CampaignPackageDetail() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const pkg = packages.find(p => p.id === id);
    const verifiedEmail = getVerifiedEmail();

    useEffect(() => {
        if (!verifiedEmail) {
            router.replace("/get-started");
        }
    }, [verifiedEmail, router]);

    const [selectedChannelInfo, setSelectedChannelInfo] = useState<{
        channelId: string;
        name: string;
        avatar: string | null;
    } | null>(null);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            const channelKey = getSelectedChannelKey();
            const selectedChannelId = localStorage.getItem(channelKey);
            if (selectedChannelId) {
                const cached = sessionStorage.getItem("vidfly_channel_info");
                if (cached) {
                    const parsed = JSON.parse(cached);
                    const found = parsed.find((i: any) => i.channelId === selectedChannelId);
                    if (found) setSelectedChannelInfo({ channelId: found.channelId, name: found.name, avatar: found.avatar });
                }
            }
        } catch (err) {
            console.error(err);
        }
    }, []);

    const handleChannelSelect = (channelId: string, channelName: string) => {
        setSelectedChannelInfo({ channelId, name: channelName, avatar: null });
    };

    const handleContinueToPayment = async () => {
        if (!pkg || !verifiedEmail || !selectedChannelInfo) return;

        try {
            setProcessing(true);
            setError(null);

            const price = parseFloat(pkg.price.replace(/[₹,]/g, ''));
            const viewsMatch = pkg.views.match(/(\d+(?:,\d+)*)/);
            const quantity = viewsMatch ? parseInt(viewsMatch[1].replace(/,/g, '')) : 0;

            const payload = {
                email: verifiedEmail,
                channel: {
                    name: selectedChannelInfo.name,
                    channelId: selectedChannelInfo.channelId,
                    link: `https://www.youtube.com/channel/${selectedChannelInfo.channelId}`,
                    avatar: selectedChannelInfo.avatar,
                },
                videos: [{
                    videoId: `channel_${selectedChannelInfo.channelId}_${Date.now()}`,
                    title: `${selectedChannelInfo.name} - Channel Promotion`,
                    link: `https://www.youtube.com/channel/${selectedChannelInfo.channelId}`,
                    thumbnail: selectedChannelInfo.avatar || null,
                    viewsRequested: quantity,
                }],
                package: {
                    id: pkg.id,
                    name: pkg.name,
                    price: price,
                    currency: "INR",
                    quantity: quantity,
                    type: "package",
                    description: pkg.description,
                },
                targeting: {
                    autoTargeting: pkg.aiTargeting,
                },
                budget: price,
                source: "packages",
            };

            const response = await fetch(`${API_BASE_URL}/api/orders/campaign`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
                credentials: "include",
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data?.message || "Failed to create order");

            if (data.paymentCheckoutUrl) {
                window.location.href = data.paymentCheckoutUrl;
                return;
            }

            router.push(`/campaign/my-campaigns`);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to proceed to payment");
            setProcessing(false);
        }
    };

    if (!pkg) {
        return (
            <CampaignLayout>
                <CampaignCard className="text-center py-12">
                    <h1 className="text-2xl font-bold mb-4">Package not found</h1>
                    <Button onClick={() => router.push("/campaign/packages")}>Back to Packages</Button>
                </CampaignCard>
            </CampaignLayout>
        );
    }

    return (
        <CampaignLayout activeSidebar="packages">
            <CampaignCard className="space-y-8">
                <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                    <div className="h-14 w-14 rounded-2xl overflow-hidden bg-red-100 flex items-center justify-center text-red-600 font-bold">
                        {selectedChannelInfo?.avatar ? (
                            <img src={selectedChannelInfo.avatar} alt="" className="w-full h-full object-cover" />
                        ) : (
                            selectedChannelInfo?.name?.slice(0, 2).toUpperCase() || "VC"
                        )}
                    </div>
                    <div className="flex-1">
                        <p className="text-[10px] font-bold text-slate-500 uppercase">Selected Channel</p>
                        <h2 className="text-xl font-bold text-slate-900">{selectedChannelInfo?.name || "Choose a channel"}</h2>
                    </div>
                    <ChannelSelector onChannelSelect={handleChannelSelect} />
                </div>

                <div className={`rounded-2xl border-2 border-slate-200 p-8 ${pkg.accent} animate-in fade-in slide-in-from-bottom-4`}>
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <h1 className="text-3xl font-bold text-slate-900">{pkg.name} Package</h1>
                        {pkg.aiTargeting && (
                            <span className="flex items-center gap-1.5 text-xs font-bold bg-red-600 text-white px-3 py-1.5 rounded-full">
                                <Sparkles className="w-3 h-3" /> AI POWERED
                            </span>
                        )}
                    </div>

                    <div className="flex items-end gap-3 mb-6">
                        <span className="text-5xl font-bold text-red-600 leading-none">{pkg.price}</span>
                        {pkg.discount && (
                            <span className="text-sm font-bold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full">
                                {pkg.discount}
                            </span>
                        )}
                    </div>

                    <div className="mb-8">
                        <p className="text-2xl font-bold text-slate-800 mb-2">{pkg.views}</p>
                        {pkg.bonusViews && <p className="text-emerald-700 font-bold text-sm mb-2">{pkg.bonusViews}</p>}
                        <p className="text-slate-600 leading-relaxed">{pkg.description}</p>
                    </div>

                    <div className="space-y-4">
                        <p className="text-sm font-bold text-slate-800 border-b border-slate-200/50 pb-2">Includes:</p>
                        <ul className="grid sm:grid-cols-2 gap-4">
                            {pkg.features.map((f, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                                    <Check className="w-4 h-4 text-green-600 mt-0.5" /> <span>{f}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {error && <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">{error}</div>}

                <div className="flex gap-4 justify-end pt-4">
                    <Button variant="outline" className="rounded-xl h-12 px-8" onClick={() => router.push("/campaign/packages")} disabled={processing}>
                        CANCEL
                    </Button>
                    <Button className="rounded-xl bg-red-600 hover:bg-red-700 h-12 px-8 font-bold" onClick={handleContinueToPayment} disabled={processing || !selectedChannelInfo}>
                        {processing ? <Loader2 className="animate-spin" /> : "CONTINUE TO PAYMENT"}
                    </Button>
                </div>
            </CampaignCard>
        </CampaignLayout>
    );
}
