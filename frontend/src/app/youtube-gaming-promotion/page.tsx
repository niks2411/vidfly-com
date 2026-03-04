"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Gamepad, Users, Target, Play, Trophy, Flame, CheckCircle, Check } from "lucide-react";
import { promotionPackages } from "@/lib/constants";
import { Animated } from "@/components/Animated";
import { Counter } from "@/components/Counter";

export default function YoutubeGamingPromotion() {
    const router = useRouter();

    const handleGetStartedClick = () => {
        router.push("/campaign");
    };

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

    const handleWhatsApp = (preset?: string) => {
        const text = preset ? `Promote my gaming channel: ${preset}` : "I want to promote my gaming channel on YouTube";
        window.open(`https://wa.me/917355518761?text=${encodeURIComponent(text)}`, "_blank");
    };

    return (
        <div className="min-h-screen bg-white font-founders">
            {/* HERO */}
            <header className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white py-24 lg:py-32">
                <div className="absolute -left-32 -top-24 w-80 h-80 bg-red-100 rounded-full opacity-25 animate-blob pointer-events-none"></div>
                <div className="absolute right-8 top-16 w-64 h-64 bg-red-200 rounded-full opacity-18 animate-blob animation-delay-2500 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <Animated delay={60}>
                            <div>
                                <div className="inline-flex items-center gap-3 mb-4">
                                    <Gamepad className="h-6 w-6 text-red-600" />
                                    <span className="text-xs font-semibold text-red-600 uppercase">Gaming Promotion</span>
                                </div>

                                <h1 className="section-heading !text-left !mb-6">
                                    Grow Your Gaming Channel — Reach Real Players & Active Fans
                                </h1>

                                <p className="section-desc !text-left !mx-0 mb-6">
                                    Target players by game, platform, and playstyle. We run conversion-focused YouTube campaigns that bring engaged viewers who subscribe, comment, and watch.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Button onClick={() => handleWhatsApp("Starter gaming pack")} className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 rounded-full shadow-lg transform transition hover:scale-105">
                                        Promote My Channel
                                    </Button>
                                    <Link href="/pricing" className="inline-flex items-center justify-center px-6 py-4 rounded-full border border-gray-200 hover:shadow-md mt-2 sm:mt-0">
                                        See Pricing
                                    </Link>
                                </div>

                                <div className="mt-6 flex gap-6 text-sm text-gray-600">
                                    <div className="flex items-center gap-2"><Target className="h-4 w-4 text-red-600" /> Platform & genre focus</div>
                                    <div className="flex items-center gap-2"><Users className="h-4 w-4 text-red-600" /> Community growth</div>
                                </div>
                            </div>
                        </Animated>

                        <Animated delay={180}>
                            <div className="flex justify-center lg:justify-end">
                                <div className="bg-white rounded-3xl p-6 shadow-2xl w-full max-w-md transform hover:-translate-y-3 transition">
                                    <div className="relative h-56 overflow-hidden rounded-xl">
                                        <Image
                                            src="/lovable-uploads/gaming-hero.png"
                                            alt="Gaming promotion"
                                            fill
                                            priority
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 400px"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <div className="bg-black/40 rounded-full p-4 animate-pulse">
                                                <Play className="h-8 w-8 text-white" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <div className="text-sm text-gray-500">Starter Pack</div>
                                        <div className="text-lg font-semibold text-gray-900">Start from ₹700</div>
                                        <div className="text-sm text-gray-600">Target specific game audiences, platforms and watch intents.</div>
                                        <div className="mt-4 flex gap-3">
                                            <Button onClick={() => handleWhatsApp("Starter ₹700")} className="bg-red-600 text-white rounded-full px-4 py-2">Promote</Button>
                                            <button onClick={() => handleWhatsApp("Need custom plan")} className="ml-auto text-sm text-gray-500 hover:underline">Custom plan</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Animated>
                    </div>

                    {/* Stats */}
                    <Animated delay={260}>
                        <div className="mt-12 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                                <div><Counter to={58000} /><div className="text-sm text-gray-600">Creators</div></div>
                                <div><Counter to={42000000} /><div className="text-sm text-gray-600">Real Views</div></div>
                                <div><Counter to={72000} /><div className="text-sm text-gray-600">Campaigns Run</div></div>
                                <div><Counter to={1500000} /><div className="text-sm text-gray-600">Subscribers Gained</div></div>
                            </div>
                        </div>
                    </Animated>
                </div>
            </header>

            {/* WHY GAMING PROMO */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Animated delay={80}>
                        <h2 className="section-heading text-center !mb-6">Why Gaming Channels Grow With Our Campaigns</h2>
                        <p className="section-desc text-center max-w-2xl mx-auto mb-10">We combine platform signals with creative testing to reach viewers most likely to subscribe and join your community.</p>
                    </Animated>

                    <div className="grid md:grid-cols-3 gap-8">
                        <Animated delay={120}>
                            <div className="p-6 bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-sm transform transition hover:-translate-y-2">
                                <div className="flex items-center gap-3 mb-4"><Trophy className="h-6 w-6 text-red-600" /><h3 className="text-lg font-semibold">Game Title Targeting</h3></div>
                                <p className="text-gray-600 text-sm">Reach players searching for specific titles and creators in that genre.</p>
                            </div>
                        </Animated>
                        <Animated delay={180}>
                            <div className="p-6 bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-sm transform transition hover:-translate-y-2">
                                <div className="flex items-center gap-3 mb-4"><Flame className="h-6 w-6 text-red-600" /><h3 className="text-lg font-semibold">Live Event Boosts</h3></div>
                                <p className="text-gray-600 text-sm">Promote live streams, tournaments and highlight reels when player interest is high.</p>
                            </div>
                        </Animated>
                        <Animated delay={240}>
                            <div className="p-6 bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-sm transform transition hover:-translate-y-2">
                                <div className="flex items-center gap-3 mb-4"><Users className="h-6 w-6 text-red-600" /><h3 className="text-lg font-semibold">Community Growth</h3></div>
                                <p className="text-gray-600 text-sm">We optimize for comments, live viewers and repeat watchers to build active communities.</p>
                            </div>
                        </Animated>
                    </div>
                </div>
            </section>

            {/* AUDIENCE & PLACEMENTS */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-start">
                    <Animated delay={80}>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Who We Reach</h3>
                            <ul className="space-y-4 text-gray-700">
                                <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-red-600" /><div><div className="font-semibold">FPS & Competitive Players</div><div className="text-sm">Viewers who watch tutorials, highlights & pro commentary.</div></div></li>
                                <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-red-600" /><div><div className="font-semibold">Mobile Gaming Audiences</div><div className="text-sm">Shorts and short-form placements for mobile-first players.</div></div></li>
                                <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-red-600" /><div><div className="font-semibold">Casual & Indie Fans</div><div className="text-sm">Niche reach for indie titles and community builders.</div></div></li>
                            </ul>
                        </div>
                    </Animated>

                    <Animated delay={160}>
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <h4 className="font-semibold text-gray-900 mb-4">Placement Examples</h4>
                            <div className="space-y-3">
                                <div className="bg-gray-100 rounded-lg p-4"><div className="font-semibold text-sm">In-stream (Pre-roll)</div><div className="text-xs text-gray-600">Shown before related gameplay videos.</div></div>
                                <div className="bg-gray-100 rounded-lg p-4"><div className="font-semibold text-sm">Shorts & Clips</div><div className="text-xs text-gray-600">Mobile-first placements to capture quick viewers.</div></div>
                                <div className="bg-gray-100 rounded-lg p-4"><div className="font-semibold text-sm">In-feed & Search</div><div className="text-xs text-gray-600">Top placement for discovery and channel growth.</div></div>
                            </div>
                        </div>
                    </Animated>
                </div>
            </section>

            {/* PACKAGES */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Animated delay={80}><h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Recommended Packages</h3></Animated>

                    <div className="flex flex-col items-center gap-6">
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
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-br from-red-600 to-red-700 text-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-2xl font-bold">Ready to level up your gaming channel?</h3>
                        <p className="text-sm text-red-100 mt-2">Start a campaign optimized for community growth and watch-time.</p>
                    </div>
                    <div className="flex gap-4">
                        <Button onClick={() => handleWhatsApp("Start gaming campaign")} className="bg-white text-red-600 px-6 py-4 rounded-full font-semibold">Start Promotion</Button>
                        <Link href="/pricing" className="inline-flex items-center justify-center px-6 py-4 rounded-full border border-white/30">View Plans</Link>
                    </div>
                </div>
            </section>

            <style jsx global>{`
        @keyframes blob {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px,-40px) scale(1.05); }
          66% { transform: translate(-20px,20px) scale(0.95); }
        }
        .animate-blob { animation: blob 8s infinite; }
        .animation-delay-2500 { animation-delay: 2.5s; }
        .animate-pulse { animation: pulse 1.8s ease-in-out infinite; }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.95; }
          50% { transform: scale(1.06); opacity: 1; }
          100% { transform: scale(1); opacity: 0.95; }
        }
      `}</style>
        </div>
    );
}
