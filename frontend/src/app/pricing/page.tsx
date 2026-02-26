"use client";

import EstimateSection from "@/components/EstimateSection";
import PricingInfo from "@/components/PricingInfo";
import FAQ from "@/components/FAQ";
import ExampleCampaign from "@/components/ExampleCampaign";
import { Check, Users, Eye, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { promotionPackages } from "@/lib/constants";

export default function PricingPage() {
    const router = useRouter();

    // View-based promotion packages
    const viewPlans = promotionPackages.map((pkg) => {
        const totalViews = (pkg as any).totalViews || pkg.views;
        const hasAI = pkg.hasAI;
        const discount = (pkg as any).discount as number | undefined;
        const bonusViews = (pkg as any).bonusViews as number | undefined;
        const isPopular = (pkg as any).isPopular;
        const isPremium = (pkg as any).isPremium;

        return {
            name: pkg.name,
            price: `₹${pkg.price.toLocaleString()}`,
            originalPrice: undefined as string | undefined,
            description: "YouTube Video Promotion",
            subscribers: undefined as string | undefined,
            watchHours: `${totalViews.toLocaleString()}+ Views`,
            popular: isPopular || isPremium,
            badge: isPremium ? "PREMIUM" : isPopular ? "MOST POPULAR" : undefined,
            features: [
                `${totalViews.toLocaleString()}+ real, high-intent viewers`,
                hasAI ? "AI targeting included" : "Standard niche-based targeting",
                "Multi-format promotion (TrueView, In-Feed & Shorts)",
                "Safe, Google Ads–compliant delivery",
                ...(discount && bonusViews
                    ? [
                        `${discount}% instant discount`,
                        `+${bonusViews.toLocaleString()} bonus views included`,
                    ]
                    : []),
            ],
            borderColor: pkg.borderColor,
            hasAI: hasAI,
        };
    });

    const handleGetStartedClick = () => {
        router.push("/get-started");
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <div className="min-h-screen bg-white font-montserrat">
            {/* Hero Section for Pricing Page with red themed background */}
            <section className="py-20 bg-gradient-to-br from-red-50 to-pink-50 relative overflow-hidden">
                {/* Enhanced Animated Background */}
                <div className="absolute inset-0">
                    <div className="absolute top-10 left-10 w-20 h-20 bg-red-200 rounded-full opacity-15 animate-float"></div>
                    <div className="absolute top-1/2 right-20 w-16 h-16 bg-red-300 rounded-full opacity-20 animate-bounce-slow"></div>
                    <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-red-100 rounded-full opacity-25 animate-pulse-slow"></div>
                    <div className="absolute top-1/4 right-1/4 w-18 h-18 bg-red-200 rounded-full opacity-10 animate-morph"></div>
                    <div className="absolute bottom-1/4 left-1/4 w-22 h-22 bg-red-150 rounded-full opacity-15 animate-rotate-slow"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 animate-text-slide-up">
                        Pricing <span className="text-red-600 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text">Plans</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-delay">
                        Choose the perfect plan to grow your YouTube channel and maximize your reach.
                    </p>
                </div>
            </section>

            {/* Example Campaign Performance Section */}
            <ExampleCampaign />

            {/* Subscription and Monetization Plans */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            Choose Your <span className="text-red-600">Plan</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Flexible pricing plans designed to fit every creator's needs and budget.
                        </p>
                    </div>

                    {/* Packages Grid - Inverted Triangle Layout (3, 2, 1) */}
                    <div className="flex flex-col items-center gap-6">
                        {/* Row 1: 3 packages (top row) */}
                        {viewPlans.length >= 3 && (
                            <div className="flex justify-center gap-6 w-full flex-wrap">
                                {viewPlans.slice(0, 3).map((plan: any, index) => (
                                    <div key={index} className="w-full max-w-sm">
                                        <div className={`relative rounded-2xl border-2 ${plan.borderColor || 'border-blue-200'} bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-full flex flex-col justify-between`}>
                                            {plan.popular && plan.badge !== "PREMIUM" && (
                                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                                                    MOST POPULAR
                                                </div>
                                            )}
                                            {plan.badge === "PREMIUM" && (
                                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                                                    PREMIUM
                                                </div>
                                            )}

                                            <div>
                                                <div className="text-center mb-6">
                                                    <h2 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h2>
                                                    <div className="flex items-center justify-center gap-2">
                                                        <span className="text-3xl font-bold text-red-600">{plan.price}</span>
                                                    </div>
                                                </div>

                                                <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                                                    <p className="text-2xl font-bold text-slate-900">{plan.watchHours}</p>
                                                    <p className="text-sm text-slate-600 mt-1">Real, High-Intent Viewers</p>
                                                </div>

                                                <div className="mb-6 p-3 bg-slate-100 rounded-lg flex items-center justify-between">
                                                    <span className="text-sm font-semibold text-slate-700">AI Targeting:</span>
                                                    {plan.hasAI ? (
                                                        <span className="text-green-600 font-bold text-sm">✓ Included</span>
                                                    ) : (
                                                        <span className="text-red-500 font-bold text-sm">✗ Not Included</span>
                                                    )}
                                                </div>

                                                <ul className="space-y-3 mb-6">
                                                    {plan.features.slice(2).map((feature: any, idx: number) => (
                                                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                                                            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                                            <span>{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <Button
                                                onClick={handleGetStartedClick}
                                                className={`w-full rounded-xl py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${plan.badge === "PREMIUM"
                                                    ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                                                    : plan.hasAI
                                                        ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                                                        : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
                                                    }`}
                                            >
                                                🚀 GET STARTED NOW
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Row 2: 2 packages (middle row) */}
                        {viewPlans.length >= 5 && (
                            <div className="flex justify-center gap-6 w-full flex-wrap">
                                {viewPlans.slice(3, 5).map((plan: any, index) => (
                                    <div key={index} className="w-full max-w-sm">
                                        <div className={`relative rounded-2xl border-2 ${plan.borderColor || 'border-orange-300'} bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-full flex flex-col justify-between`}>
                                            {plan.popular && (
                                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                                                    MOST POPULAR
                                                </div>
                                            )}

                                            <div>
                                                <div className="text-center mb-6">
                                                    <h2 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h2>
                                                    <div className="flex items-center justify-center gap-2">
                                                        <span className="text-3xl font-bold text-red-600">{plan.price}</span>
                                                    </div>
                                                </div>

                                                <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                                                    <p className="text-2xl font-bold text-slate-900">{plan.watchHours}</p>
                                                    <p className="text-sm text-slate-600 mt-1">Real, High-Intent Viewers</p>
                                                </div>

                                                <div className="mb-6 p-3 bg-slate-100 rounded-lg flex items-center justify-between">
                                                    <span className="text-sm font-semibold text-slate-700">AI Targeting:</span>
                                                    {plan.hasAI ? (
                                                        <span className="text-green-600 font-bold text-sm">✓ Included</span>
                                                    ) : (
                                                        <span className="text-red-500 font-bold text-sm">✗ Not Included</span>
                                                    )}
                                                </div>

                                                <ul className="space-y-3 mb-6">
                                                    {plan.features.slice(2).map((feature: any, idx: number) => (
                                                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                                                            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                                            <span>{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <Button
                                                onClick={handleGetStartedClick}
                                                className={`w-full rounded-xl py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${plan.badge === "PREMIUM"
                                                    ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                                                    : plan.hasAI
                                                        ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                                                        : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
                                                    }`}
                                            >
                                                🚀 GET STARTED NOW
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Row 3: 1 package (bottom row) */}
                        {viewPlans.length >= 6 && (
                            <div className="flex justify-center w-full flex-wrap">
                                {viewPlans.slice(5, 6).map((plan: any, index) => (
                                    <div key={index} className="w-full max-w-sm">
                                        <div className={`relative rounded-2xl border-2 ${plan.borderColor || 'border-purple-400'} bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-full flex flex-col justify-between`}>
                                            {plan.badge === "PREMIUM" && (
                                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                                                    PREMIUM
                                                </div>
                                            )}

                                            <div>
                                                <div className="text-center mb-6">
                                                    <h2 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h2>
                                                    <div className="flex items-center justify-center gap-2">
                                                        <span className="text-3xl font-bold text-red-600">{plan.price}</span>
                                                    </div>
                                                </div>

                                                <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
                                                    <p className="text-2xl font-bold text-slate-900">{plan.watchHours}</p>
                                                    <p className="text-sm text-slate-600 mt-1">Real, High-Intent Viewers</p>
                                                </div>

                                                <div className="mb-6 p-3 bg-slate-100 rounded-lg flex items-center justify-between">
                                                    <span className="text-sm font-semibold text-slate-700">AI Targeting:</span>
                                                    {plan.hasAI ? (
                                                        <span className="text-green-600 font-bold text-sm">✓ Included</span>
                                                    ) : (
                                                        <span className="text-red-500 font-bold text-sm">✗ Not Included</span>
                                                    )}
                                                </div>

                                                <ul className="space-y-3 mb-6">
                                                    {plan.features.slice(2).map((feature: any, idx: number) => (
                                                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                                                            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                                            <span>{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <Button
                                                onClick={handleGetStartedClick}
                                                className={`w-full rounded-xl py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ${plan.badge === "PREMIUM"
                                                    ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                                                    : plan.hasAI
                                                        ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                                                        : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
                                                    }`}
                                            >
                                                🚀 GET STARTED NOW
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <PricingInfo />
            <FAQ />
        </div>
    );
}
