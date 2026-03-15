"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CampaignLayout from "@/components/CampaignLayout";
import { getVerifiedEmail, getSelectedChannelKey } from "@/lib/verifiedEmail";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");

// Same packages from the pricing page "Special Offers to Boost Your Growth"
const PACKAGES = {
    row1: [
        { id: "starter", name: "Starter", price: "999", views: "5,000+", ai: false, gradient: "from-purple-400 to-emerald-400" },
        { id: "boost", name: "Boost", price: "1,999", views: "10,000+", ai: false, gradient: "from-blue-400 to-emerald-400" },
        { id: "growth", name: "Growth", price: "3,499", views: "20,000+", ai: false, gradient: "from-indigo-400 to-purple-400" },
    ],
    row2: [
        { id: "premium-ai", name: "Premium AI", price: "5,499", views: "37,000+", ai: true, popular: true, discount: "5%", bonus: "2,000", gradient: "from-purple-500 to-emerald-400" },
        { id: "viral-ai", name: "Viral AI", price: "8,999", views: "59,000+", ai: true, discount: "8%", bonus: "4,000", gradient: "from-blue-500 to-emerald-400" },
    ],
    row3: {
        id: "ultra-viral-ai", name: "Ultra Viral AI", price: "12,999", views: "86,500+", ai: true, discount: "10%", bonus: "6,500", gradient: "from-red-500 to-purple-500", btnGradient: "from-red-500 to-purple-500"
    },
};

export default function CampaignPackages() {
    const router = useRouter();
    const [verifiedEmail, setVerifiedEmail] = useState<string | undefined>(undefined);
    const [channelError, setChannelError] = useState("");
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [hasChannel, setHasChannel] = useState(false);
    const [processingPkg, setProcessingPkg] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

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
                    `${API_BASE_URL}/api/user-preferences/channels?email=${encodeURIComponent(email)}`,
                    { credentials: "include" }
                );

                if (response.ok) {
                    const data = await response.json();
                    if (data.channels?.length > 0) {
                        setHasChannel(true);
                    }
                }
            } catch (err) {
                console.warn(err);
            } finally {
                setLoadingInitial(false);
            }
        };

        init();
    }, [router]);

    const handleBuyNow = async (pkg: any) => {
        const channelKey = getSelectedChannelKey();
        const selectedChannelId = localStorage.getItem(channelKey);

        if (!selectedChannelId && !hasChannel) {
            setChannelError("Please add a channel first on the 'Promote Video' page.");
            return;
        }

        if (!selectedChannelId) {
            // If we know they have channels but none is "selected", send them to detail page to pick
            router.push(`/campaign/packages/${pkg.id}`);
            return;
        }

        try {
            setProcessingPkg(pkg.id);
            setError(null);
            setChannelError("");

            // 1. Get channel info from cache
            let channelInfo = null;
            const cached = sessionStorage.getItem("vidfly_channel_info");
            if (cached) {
                const parsed = JSON.parse(cached);
                channelInfo = parsed.find((i: any) => i.channelId === selectedChannelId);
            }

            // 2. If not in cache, we need to fetch it to be safe (or at least have a name)
            if (!channelInfo) {
                try {
                    const res = await fetch(`${API_BASE_URL}/api/youtube/channel-info?channelId=${encodeURIComponent(selectedChannelId)}`, { credentials: "include" });
                    if (res.ok) channelInfo = await res.json();
                } catch (e) { }
            }

            const activeChannel = channelInfo || { channelId: selectedChannelId, name: "YouTube Channel" };

            // 3. Create the order
            const price = parseFloat(pkg.price.replace(/[₹,]/g, ''));
            const viewsMatch = pkg.views.match(/(\d+(?:,\d+)*)/);
            const quantity = viewsMatch ? parseInt(viewsMatch[1].replace(/,/g, '')) : 0;

            const payload = {
                email: verifiedEmail,
                channel: {
                    name: activeChannel.name,
                    channelId: activeChannel.channelId,
                    link: `https://www.youtube.com/channel/${activeChannel.channelId}`,
                    avatar: activeChannel.avatar || activeChannel.channelAvatar || null,
                },
                videos: [{
                    videoId: `channel_${activeChannel.channelId}_${Date.now()}`,
                    title: `${activeChannel.name} - Channel Promotion`,
                    link: `https://www.youtube.com/channel/${activeChannel.channelId}`,
                    thumbnail: activeChannel.avatar || activeChannel.channelAvatar || null,
                    viewsRequested: quantity,
                }],
                package: {
                    id: pkg.id,
                    name: pkg.name,
                    price: price,
                    currency: "INR",
                    quantity: quantity,
                    type: "package",
                    description: pkg.description || `${pkg.views} Views Boost`,
                },
                targeting: {
                    autoTargeting: pkg.ai,
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
            console.error(err);
            setError(err instanceof Error ? err.message : "Failed to proceed to payment");
            setProcessingPkg(null);
        }
    };

    if (loadingInitial) {
        return (
            <CampaignLayout activeSidebar="packages">
                <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#8B5CF6]" />
                </div>
            </CampaignLayout>
        );
    }

    return (
        <CampaignLayout activeSidebar="packages">
            <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-10">
                {/* Header */}
                <div className="text-center mb-14">
                    <h1 className="section-heading !mb-6">
                        <span className="text-[#FF4D4D]">Special Offers</span> to Boost Your Growth
                    </h1>
                    <p className="section-desc max-w-2xl mx-auto">
                        Choose a budget that fits your goals and scale your campaigns as you grow — no fixed plans, no limitations.
                    </p>
                </div>

                {/* Row 1: Basic Plans */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto justify-items-center">
                    {PACKAGES.row1.map(pkg => (
                        <div key={pkg.id} className="w-full max-w-[380px]">
                            <OfferCard pkg={pkg} onAction={() => handleBuyNow(pkg)} processing={processingPkg === pkg.id} />
                        </div>
                    ))}
                </div>

                {/* Row 2: AI Plans */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12 justify-items-center">
                    {PACKAGES.row2.map(pkg => (
                        <div key={pkg.id} className="w-full max-w-[380px]">
                            <OfferCard pkg={pkg} onAction={() => handleBuyNow(pkg)} processing={processingPkg === pkg.id} />
                        </div>
                    ))}
                </div>

                {/* Row 3: Ultra Plan */}
                <div className="max-w-[380px] mx-auto">
                    <OfferCard pkg={PACKAGES.row3} onAction={() => handleBuyNow(PACKAGES.row3)} processing={processingPkg === PACKAGES.row3.id} />
                </div>

                {/* Errors */}
                {(channelError || error) && (
                    <p className="mt-8 text-sm text-red-600 text-center font-medium bg-red-50 p-3 rounded-xl max-w-md mx-auto border border-red-200">
                        {channelError || error}
                    </p>
                )}
            </div>
        </CampaignLayout>
    );
}

// ─── Offer Card (same as pricing page) ───────────────────────
function OfferCard({ pkg, onAction, processing }: { pkg: any; onAction: () => void; processing: boolean }) {
    return (
        <div className={`relative bg-white rounded-xl p-8 shadow-sm flex flex-col h-full border-[1.5px] transition-all hover:shadow-md ${pkg.popular ? 'border-[#8B5CF6]/50' : 'border-gray-100'}`}>
            {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#8B5CF6] text-white text-[10px] font-black px-4 py-1.5 rounded-[4px] tracking-wider uppercase">
                    Most Popular
                </div>
            )}

            <div className="text-center mb-8">
                <h3 className="text-3xl font-black text-gray-900 mb-2 mt-4">{pkg.name}</h3>
                <div className="flex items-center justify-center gap-1">
                    <span className="text-[28px] font-black text-[#FF4D4D]">₹{pkg.price}</span>
                </div>
            </div>

            <div className="bg-[#F4F5F7] rounded-[4px] p-6 mb-6 text-center border-t border-cyan-100/50">
                <p className="text-2xl font-black text-gray-900 mb-1 leading-none">{pkg.views} Views</p>
                <p className="text-[13px] text-gray-500 font-bold uppercase tracking-wide">Real, High-Intent Viewers</p>
            </div>

            <div className={`rounded-[4px] px-4 py-2 flex items-center justify-between mb-8 border ${pkg.ai ? 'bg-white border-cyan-100' : 'bg-[#F4F5F7] border-gray-200'}`}>
                <span className="text-[15px] font-bold text-gray-600">AI Targeting:</span>
                <div className="flex items-center gap-1.5">
                    {pkg.ai ? (
                        <>
                            <span className="text-[#10B981] text-lg font-bold">✓</span>
                            <span className="text-[#10B981] font-bold text-[15px]">Included</span>
                        </>
                    ) : (
                        <>
                            <span className="text-[#FF4D4D] text-lg font-bold">✕</span>
                            <span className="text-[#FF4D4D] font-bold text-[15px]">Not Included</span>
                        </>
                    )}
                </div>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-start gap-3">
                    <span className="text-[#10B981] text-lg font-bold mt-[-2px]">✓</span>
                    <span className="text-[14px] text-gray-600 font-bold leading-tight">Multi-format promotion (TrueView, In-Feed & Shorts)</span>
                </li>
                <li className="flex items-start gap-3">
                    <span className="text-[#10B981] text-lg font-bold mt-[-2px]">✓</span>
                    <span className="text-[14px] text-gray-600 font-bold leading-tight">Safe, Google Ads–compliant delivery</span>
                </li>
                {pkg.discount && (
                    <li className="flex items-start gap-3">
                        <span className="text-[#10B981] text-lg font-bold mt-[-2px]">✓</span>
                        <span className="text-[14px] text-gray-600 font-bold leading-tight">{pkg.discount} instant discount</span>
                    </li>
                )}
                {pkg.bonus && (
                    <li className="flex items-start gap-3">
                        <span className="text-[#10B981] text-lg font-bold mt-[-2px]">✓</span>
                        <span className="text-[14px] text-gray-600 font-bold leading-tight">+{pkg.bonus} bonus views included</span>
                    </li>
                )}
            </ul>

            <button
                onClick={onAction}
                disabled={processing}
                className={`w-full py-4 text-white font-black text-[15px] rounded-[4px] transition-all hover:scale-[1.02] active:scale-95 shadow-sm tracking-wide bg-gradient-to-r ${pkg.btnGradient || 'from-[#8B5CF6] to-[#10B981]'} ${processing ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
                {processing ? (
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Please wait...
                    </div>
                ) : "Get started now"}
            </button>
        </div>
    );
}
