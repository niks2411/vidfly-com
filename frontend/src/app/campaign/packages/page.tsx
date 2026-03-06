"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CampaignLayout from "@/components/CampaignLayout";
import CampaignCard from "@/components/CampaignCard";
import CampaignHeader from "@/components/CampaignHeader";
import { Button } from "@/components/ui/button";
import { getVerifiedEmail, getSelectedChannelKey } from "@/lib/verifiedEmail";
import { promotionPackages as packages } from "@/lib/constants";

const STORAGE_KEY = "vidfly_channel_videos";
const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");

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
    subscriberCount?: number;
    videoCount?: number;
};

export default function CampaignPackages() {
    const router = useRouter();
    const [verifiedEmail, setVerifiedEmail] = useState<string | undefined>(undefined);

    const [storedVideos, setStoredVideos] = useState<StoredVideo[]>([]);
    const [channelInfo, setChannelInfo] = useState<ChannelInfo | null>(null);
    const [loadingChannel, setLoadingChannel] = useState(false);
    const [channelError, setChannelError] = useState("");
    const [loadingInitial, setLoadingInitial] = useState(true);

    useEffect(() => {
        const email = getVerifiedEmail();
        setVerifiedEmail(email);

        if (!email) {
            router.replace("/get-started");
            return;
        }

        const init = async () => {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/api/user-preferences/channels?email=${encodeURIComponent(verifiedEmail)}`,
                    { credentials: "include" }
                );

                if (response.ok) {
                    const data = await response.json();
                    if (data.channels?.length > 0) {
                        const channelId = data.selectedChannelId || data.channels[0].channelId;
                        const channelName = data.channels.find((c: any) => c.channelId === channelId)?.channelName || "";
                        fetchChannelInfo(channelId, channelName);
                    }
                }

                const stored = sessionStorage.getItem(STORAGE_KEY);
                if (stored) setStoredVideos(JSON.parse(stored));
            } catch (err) {
                console.warn(err);
            } finally {
                setLoadingInitial(false);
            }
        };

        init();
    }, [verifiedEmail, router]);

    const fetchChannelInfo = async (channelId: string, name: string) => {
        try {
            setLoadingChannel(true);
            const response = await fetch(`${API_BASE_URL}/api/youtube/channel-info?channelId=${encodeURIComponent(channelId)}`);
            if (response.ok) {
                const data = await response.json();
                setChannelInfo(data);
            } else {
                setChannelInfo({ channelId, name, avatar: null });
            }
        } catch (err) {
            setChannelInfo({ channelId, name, avatar: null });
        } finally {
            setLoadingChannel(false);
        }
    };

    const handleBuyNow = (pkgId: string) => {
        const channelKey = getSelectedChannelKey();
        const selectedChannelId = localStorage.getItem(channelKey);

        if (!selectedChannelId && !channelInfo) {
            setChannelError("Please add a channel first on the 'Promote Video' page.");
            return;
        }

        router.push(`/campaign/packages/${pkgId}`);
    };

    if (loadingInitial) {
        return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div></div>;
    }

    return (
        <CampaignLayout activeSidebar="packages">
            <CampaignCard>
                <CampaignHeader>
                    <div className="animate-fade-in text-center sm:text-left">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent mb-3">Buy Packages</h1>
                        <p className="text-slate-600 text-lg">Choose a package to boost your YouTube growth</p>
                    </div>
                </CampaignHeader>

                <div className="mb-8 p-6 bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Every Plan Comes With Our Full Promotion Suite:</h3>
                    <div className="grid md:grid-cols-2 gap-3 text-sm text-slate-700">
                        {["1 Video Promotion with analytics", "Real, High-Intent Viewers", "Natural Engagement Boost", "Niche-Based Targeting", "Multi-Format Ads", "Safe & Compliant"].map((f, i) => (
                            <div key={i} className="flex items-start gap-2">
                                <span className="text-green-600 font-bold mt-0.5">✔</span>
                                <span>{f}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packages.map((pkg) => (
                        <div key={pkg.id} className={`relative rounded-2xl border-2 ${pkg.borderColor} bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex flex-col`}>
                            {pkg.isPopular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold px-4 py-1 rounded-full">MOST POPULAR</div>}
                            {pkg.isPremium && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[10px] font-bold px-4 py-1 rounded-full">PREMIUM</div>}

                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">{pkg.name}</h2>
                                <span className="text-3xl font-bold text-red-600">₹{pkg.price.toLocaleString()}</span>
                            </div>

                            <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                                <p className="text-2xl font-bold text-slate-900">{(pkg.totalViews || pkg.views).toLocaleString()}+</p>
                                <p className="text-xs text-slate-500 mt-1">Real High-Intent Viewers</p>
                            </div>

                            <div className="flex-1 space-y-4 mb-6">
                                <div className="flex items-center justify-between text-sm px-2">
                                    <span className="text-slate-600">AI Targeting:</span>
                                    <span className={pkg.hasAI ? "text-green-600 font-bold" : "text-slate-400"}>{pkg.hasAI ? "✓ Included" : "Not Included"}</span>
                                </div>
                                {pkg.aiFeatures && (
                                    <ul className="space-y-2 px-2">
                                        {pkg.aiFeatures.slice(0, 3).map((f, i) => (
                                            <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                                                <span className="text-purple-600">•</span> {f}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <Button
                                className={`w-full rounded-xl py-6 font-bold text-white ${pkg.isPremium ? "bg-purple-600 hover:bg-purple-700" : "bg-red-600 hover:bg-red-700"}`}
                                onClick={() => handleBuyNow(pkg.id)}
                            >
                                Buy {pkg.name}
                            </Button>
                        </div>
                    ))}
                </div>
                {channelError && <p className="mt-4 text-sm text-red-600 text-center font-medium bg-red-50 p-2 rounded-lg">{channelError}</p>}
            </CampaignCard>
        </CampaignLayout>
    );
}
