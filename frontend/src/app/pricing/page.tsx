"use client";

import { useState } from "react";
import PricingInfo from "@/components/PricingInfo";
import FAQ from "@/components/FAQ";
import PromotionBanner from "@/components/PromotionBanner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function PricingPage() {
    const router = useRouter();
    const [budget, setBudget] = useState(499);

    // Standard view rates (₹0.21 - ₹0.18 per view)
    const minViews = Math.floor(budget / 0.21);
    const maxViews = Math.floor(budget / 0.18);

    // Subscribers conversion rate (1% to 1.2% of views) - Matching Campaign Budget page fallback
    const minSubs = Math.floor(minViews * 0.01);
    const maxSubs = Math.floor(maxViews * 0.012);

    const formatNumber = (num: number) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(2) + "k";
        }
        return num.toLocaleString();
    };

    const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value.replace(/[^0-9]/g, ''));
        if (!isNaN(val)) {
            setBudget(Math.min(val, 1000000));
        } else {
            setBudget(0);
        }
    };

    const handleBudgetBlur = () => {
        if (budget < 499) setBudget(499);
        if (budget > 1000000) setBudget(100000);
    };

    const handleGetStarted = () => {
        router.push("/get-started");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const percent = Math.max(0, Math.min(100, ((budget - 499) / (100000 - 499)) * 100));

    return (
        <div className="min-h-screen bg-white font-founders text-[rgb(41,40,40)]">
            {/* Hero Section */}
            <section className="bg-white pt-8 px-4 sm:px-6 lg:px-12 w-full">
                <div className="max-w-[1400px] mx-auto">
                    <div className="relative rounded-b-[7px] overflow-hidden shadow-xl h-[160px] sm:h-[220px] md:h-[260px] lg:h-[300px] animate-fade-in mb-12 max-w-6xl mx-auto">
                        <Image
                            src="/featuresbg.png"
                            alt="Vidflyy Pricing Studio"
                            fill
                            priority
                            className="object-cover object-center"
                        />
                    </div>

                    <div className="max-w-4xl mx-auto text-left sm:text-center mb-16">
                        <h1 className="section-heading text-left sm:text-center !mb-6">
                            Simple Pricing for YouTube Growth
                        </h1>
                        <p className="section-desc !text-left sm:!text-center !mx-0 sm:!mx-auto max-w-3xl">
                            Promote your videos with real ads. Set your budget, reach targeted viewers, and scale your growth with full transparency.
                        </p>
                    </div>
                </div>
            </section>

            {/* Calculator Section */}
            <section className="py-20 px-4 max-w-5xl mx-auto border-b border-gray-100 mb-10">
                <div className="mb-14 text-left sm:text-center">
                    <h2 className="section-heading text-left sm:text-center !mb-4">
                        Budget with confidence.
                    </h2>
                    <p className="section-desc !text-left sm:!text-center !mx-0 sm:!mx-auto">
                        See how many views and reach you can get based on your budget — instantly.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-10 mb-20">
                    <div className="flex flex-col w-full lg:w-[55%] pt-2">
                        <div className="mb-14 relative w-full">
                            <input
                                type="range"
                                min="499"
                                max="100000"
                                value={budget}
                                onChange={(e) => setBudget(Number(e.target.value))}
                                style={{ background: `linear-gradient(to right, #2563EB ${percent}%, #E5E7EB ${percent}%)` }}
                                className="w-full h-3 rounded-lg appearance-none cursor-pointer custom-slider relative z-10 opacity-100 focus:outline-none"
                            />
                            <div className="flex justify-between text-[15px] font-bold text-gray-900 mt-5 relative z-0 tracking-tight">
                                <span>₹499</span>
                                <span className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap">₹49,999</span>
                                <span>₹1,00,000</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-6 mt-4">
                            <div className="flex items-center gap-6">
                                <span className="text-[32px] md:text-[40px] font-bold text-gray-900 whitespace-nowrap leading-none tracking-tight">
                                    Enter Budget
                                </span>
                                <div className="relative w-36">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 font-medium text-lg">₹</span>
                                    <input
                                        type="text"
                                        value={budget}
                                        onChange={handleBudgetChange}
                                        onBlur={handleBudgetBlur}
                                        className="w-full bg-[#E8EAEE] hover:bg-[#E2E4E9] transition-colors text-gray-900 text-[18px] font-medium rounded-[4px] py-2.5 pl-8 pr-4 focus:outline-none focus:ring-2 focus:ring-[#2563EB] border-0"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-[42%] bg-[#E8EAEE] rounded-[4px] p-8 lg:p-10 shadow-sm">
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col w-1/2 pr-2 text-center">
                                <span className="font-bold text-gray-900 text-lg md:text-[20px] mb-5 tracking-tight">Views*</span>
                                <span className="text-[#2563EB] font-bold text-xl md:text-[22px] whitespace-nowrap tracking-tight">
                                    {formatNumber(minViews)} – {formatNumber(maxViews)}
                                </span>
                            </div>
                            <div className="w-[1px] h-[70px] bg-gray-300"></div>
                            <div className="flex flex-col w-1/2 pl-2 text-center">
                                <span className="font-bold text-gray-900 text-lg md:text-[20px] mb-5 tracking-tight">Subscribers*</span>
                                <span className="text-[#2563EB] font-bold text-xl md:text-[22px] whitespace-nowrap tracking-tight">
                                    {formatNumber(minSubs)} – {formatNumber(maxSubs)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="bg-[#F4F5F7] border-l-8 border-[#DC2626] p-6 md:p-8 rounded-r-md">
                    <div className="flex items-center gap-3 mb-4">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L1 21H23L12 2Z" fill="#FCA5A5" stroke="#DC2626" strokeWidth="2" strokeLinejoin="round" />
                            <path d="M12 16V17" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 9V13" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="font-medium text-gray-900 text-[17px]">Disclaimer</span>
                    </div>
                    <div className="text-[15px] leading-relaxed text-gray-800 space-y-2 font-medium">
                        <p>1. Individual results may vary based on factors like video quality, targeting precision, and other variables - these insights are offered as general guidance derived from aggregated historical data.</p>
                        <p>2. To gain subscribers, you must link your YouTube channel. We do not guarantee subscriber growth without proper channel integration.</p>
                        <Link href="/faq" className="inline-block mt-1 text-gray-900 underline underline-offset-4 decoration-1 hover:text-[#DC2626] transition-colors">
                            How to Link Your Channel to VidFlyy's Google Ads Account?
                        </Link>
                    </div>
                </div>
            </section>

            {/* Special Offers Section */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-left sm:text-center mb-16 px-4">
                        <h2 className="section-heading text-left sm:text-center !mb-6">
                            <span className="text-[#FF4D4D]">Special Offers</span> to Boost Your Growth
                        </h2>
                        <p className="section-desc !text-left sm:!text-center !mx-0 sm:!mx-auto max-w-2xl">
                            Choose a budget that fits your goals and scale your campaigns as you grow — no fixed plans, no limitations.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto justify-items-center">
                        {[
                            { name: "Starter", price: "999", views: "5,000+", ai: false, gradient: "from-purple-400 to-emerald-400" },
                            { name: "Boost", price: "1,999", views: "10,000+", ai: false, gradient: "from-blue-400 to-emerald-400" },
                            { name: "Growth", price: "3,499", views: "20,000+", ai: false, gradient: "from-indigo-400 to-purple-400" }
                        ].map((pkg) => (
                            <div key={pkg.name} className="w-full max-w-[380px]">
                                <OfferCard pkg={pkg} onAction={handleGetStarted} />
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12 justify-items-center">
                        {[
                            { name: "Premium AI", price: "5,499", views: "37,000+", ai: true, popular: true, discount: "5%", bonus: "2,000", gradient: "from-purple-500 to-emerald-400" },
                            { name: "Viral AI", price: "8,999", views: "59,000+", ai: true, discount: "8%", bonus: "4,000", gradient: "from-blue-500 to-emerald-400" }
                        ].map((pkg) => (
                            <div key={pkg.name} className="w-full max-w-[380px]">
                                <OfferCard pkg={pkg} onAction={handleGetStarted} />
                            </div>
                        ))}
                    </div>

                    <div className="max-w-[380px] mx-auto">
                        <OfferCard pkg={{
                            name: "Ultra Viral AI",
                            price: "12,999",
                            views: "86,500+",
                            ai: true,
                            discount: "10%",
                            bonus: "6,500",
                            gradient: "from-red-500 to-purple-500",
                            btnGradient: "from-red-500 to-purple-500"
                        }} onAction={handleGetStarted} />
                    </div>
                </div>
            </section>

            <PricingInfo />
            <PromotionBanner />

            <style jsx global>{`
                .custom-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    height: 28px;
                    width: 28px;
                    border-radius: 50%;
                    background: #111827;
                    border: 7px solid #2563EB;
                    cursor: pointer;
                    box-shadow: 0 0 0 4px #F9FAFB;
                }
                .custom-slider::-moz-range-thumb {
                    height: 28px;
                    width: 28px;
                    border-radius: 50%;
                    background: #111827;
                    border: 7px solid #2563EB;
                    cursor: pointer;
                    box-shadow: 0 0 0 4px #F9FAFB;
                }
            `}</style>
        </div>
    );
}

function OfferCard({ pkg, onAction }: { pkg: any, onAction: () => void }) {
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
                <div className="flex items-center gap-1.5" >
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
                <li className="flex items-start gap-3" >
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
                className={`w-full py-4 text-white font-black text-[15px] rounded-[4px] transition-all hover:scale-[1.02] active:scale-95 shadow-sm tracking-wide bg-gradient-to-r ${pkg.btnGradient || 'from-[#8B5CF6] to-[#10B981]'}`}
            >
                Get started now
            </button>
        </div>
    );
}
