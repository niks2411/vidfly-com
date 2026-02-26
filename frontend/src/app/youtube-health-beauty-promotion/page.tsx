"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Heart,
    Sparkles,
    Users,
    CheckCircle,
    Camera,
    Wand2,
    Play,
    Target,
    Check,
} from "lucide-react";
import { promotionPackages } from "@/lib/constants";
import { Animated } from "@/components/Animated";
import { Counter } from "@/components/Counter";

export default function YoutubeHealthBeautyPromotion() {
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
        const text = preset || "I want to promote my health & beauty videos on YouTube";
        window.open(`https://wa.me/917355518761?text=${encodeURIComponent(text)}`, "_blank");
    };

    return (
        <div className="min-h-screen bg-white font-montserrat">
            {/* HERO */}
            <header className="relative overflow-hidden bg-gradient-to-br from-pink-50 to-white py-24 lg:py-32">
                <div className="absolute -left-32 -top-24 w-80 h-80 bg-pink-100 rounded-full opacity-25 animate-blob pointer-events-none"></div>
                <div className="absolute right-8 top-16 w-64 h-64 bg-pink-200 rounded-full opacity-18 animate-blob animation-delay-2500 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <Animated delay={60}>
                            <div>
                                <div className="inline-flex items-center gap-3 mb-4">
                                    <Heart className="h-6 w-6 text-red-600" />
                                    <span className="text-xs font-semibold text-red-600 uppercase">Health & Beauty Promotion</span>
                                </div>

                                <h1 className="text-3xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                                    Get Your Beauty & Wellness Videos In Front Of Real, Engaged Viewers
                                </h1>

                                <p className="text-gray-600 max-w-2xl mb-6">
                                    Promote skincare routines, makeup tutorials, wellness guides and product reviews to audiences most likely to engage, save and convert.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Button onClick={() => handleWhatsApp("Starter beauty pack")} className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 rounded-full shadow-lg transform transition hover:scale-105">
                                        Promote My Channel
                                    </Button>

                                    <Link href="/pricing" className="inline-flex items-center justify-center px-6 py-4 rounded-full border border-gray-200 hover:shadow-md mt-2 sm:mt-0">
                                        See Pricing
                                    </Link>
                                </div>

                                <div className="mt-6 flex gap-6 text-sm text-gray-600">
                                    <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-red-600" /> Product-intent targeting</div>
                                    <div className="flex items-center gap-2"><Users className="h-4 w-4 text-red-600" /> High-engagement viewers</div>
                                </div>
                            </div>
                        </Animated>

                        <Animated delay={180}>
                            <div className="flex justify-center lg:justify-end">
                                <div className="bg-white rounded-3xl p-6 shadow-2xl w-full max-w-md transform hover:-translate-y-3 transition">
                                    <div className="relative overflow-hidden rounded-xl">
                                        <img src="/lovable-uploads/health-beauty-hero.png" alt="Health & beauty promotion" className="w-full h-56 object-cover" />
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <div className="bg-black/40 rounded-full p-4 animate-pulse">
                                                <Play className="h-8 w-8 text-white" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <div className="text-sm text-gray-500">Starter</div>
                                        <div className="text-lg font-semibold text-gray-900">Start from ₹750</div>
                                        <div className="text-sm text-gray-600">Reach beauty lovers, skincare seekers & wellness audiences.</div>

                                        <div className="mt-4 flex gap-3">
                                            <Button onClick={() => handleWhatsApp("Starter ₹750")} className="bg-red-600 text-white rounded-full px-4 py-2">Promote</Button>
                                            <button onClick={() => handleWhatsApp("Custom beauty plan")} className="ml-auto text-sm text-gray-500 hover:underline">Custom plan</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Animated>
                    </div>

                    <Animated delay={260}>
                        <div className="mt-12 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                                <div><Counter to={42000} /><div className="text-sm text-gray-600">Creators</div></div>
                                <div><Counter to={35000000} /><div className="text-sm text-gray-600">Real Views</div></div>
                                <div><Counter to={48000} /><div className="text-sm text-gray-600">Boosts Run</div></div>
                                <div><Counter to={950000} /><div className="text-sm text-gray-600">Subs Gained</div></div>
                            </div>
                        </div>
                    </Animated>
                </div>
            </header>

            {/* WHY THIS WORKS */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <Animated delay={80}>
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 text-center">Why Beauty Creators Choose Our Promotions</h2>
                        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">We target viewers who are ready to try, buy and follow — product-intent audiences, routine watchers and trend followers.</p>
                    </Animated>

                    <div className="grid md:grid-cols-3 gap-8">
                        <Animated delay={120}>
                            <div className="p-6 bg-gradient-to-br from-pink-50 to-white rounded-2xl shadow-sm transform hover:-translate-y-2 transition">
                                <div className="flex items-center gap-3 mb-4"><Wand2 className="h-6 w-6 text-red-600" /><h3 className="text-lg font-semibold">Product-intent Targeting</h3></div>
                                <p className="text-gray-600 text-sm">Reach viewers searching for product reviews, routines and hauls.</p>
                            </div>
                        </Animated>
                        <Animated delay={200}>
                            <div className="p-6 bg-gradient-to-br from-pink-50 to-white rounded-2xl shadow-sm transform hover:-translate-y-2 transition">
                                <div className="flex items-center gap-3 mb-4"><Camera className="h-6 w-6 text-red-600" /><h3 className="text-lg font-semibold">Cinematic Placement</h3></div>
                                <p className="text-gray-600 text-sm">Promote beautifully shot demos and tutorials to receptive viewers.</p>
                            </div>
                        </Animated>
                        <Animated delay={280}>
                            <div className="p-6 bg-gradient-to-br from-pink-50 to-white rounded-2xl shadow-sm transform hover:-translate-y-2 transition">
                                <div className="flex items-center gap-3 mb-4"><Target className="h-6 w-6 text-red-600" /><h3 className="text-lg font-semibold">Conversion Focus</h3></div>
                                <p className="text-gray-600 text-sm">Optimize for saves, clicks and subscriber growth — not just plays.</p>
                            </div>
                        </Animated>
                    </div>
                </div>
            </section>

            {/* WHO WE TARGET & PLACEMENTS */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10">
                    <Animated delay={80}>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Who We Target</h3>
                            <ul className="space-y-4 text-gray-700">
                                <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-red-600" /><div><div className="font-semibold">Skincare Enthusiasts</div><div className="text-sm">Viewers learning routines, tips & product recommendations.</div></div></li>
                                <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-red-600" /><div><div className="font-semibold">Makeup Fans</div><div className="text-sm">Tutorial & haul audiences who engage & save.</div></div></li>
                                <li className="flex items-start gap-3"><CheckCircle className="h-5 w-5 text-red-600" /><div><div className="font-semibold">Wellness Seekers</div><div className="text-sm">Yoga, supplements, and routine-led audiences.</div></div></li>
                            </ul>
                        </div>
                    </Animated>

                    <Animated delay={140}>
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <h4 className="font-semibold text-gray-900 mb-4">Placement Examples</h4>
                            <div className="space-y-3">
                                <div className="bg-gray-100 rounded-lg p-4"><div className="font-semibold text-sm">In-stream Ads</div><div className="text-xs text-gray-600">Shown before tutorials and product demos.</div></div>
                                <div className="bg-gray-100 rounded-lg p-4"><div className="font-semibold text-sm">In-feed & Search</div><div className="text-xs text-gray-600">Appears in search for product reviews and routines.</div></div>
                                <div className="bg-gray-100 rounded-lg p-4"><div className="font-semibold text-sm">Shorts Promotion</div><div className="text-xs text-gray-600">Quick tips and transformations perform well in mobile placements.</div></div>
                            </div>
                        </div>
                    </Animated>
                </div>
            </section>

            {/* PACKAGES */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <Animated delay={80}><h3 className="text-2xl font-bold text-center mb-6">Suggested Packages for Beauty Creators</h3></Animated>

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

            {/* TESTIMONIALS */}
            <section className="py-16 bg-pink-50">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <Animated delay={80}><h3 className="text-2xl font-bold mb-6">Success Stories</h3></Animated>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { ch: "GlowWithRiya", stat: "+12K subs", desc: "Makeup hacks + routine promotion." },
                            { ch: "HealNaturals", stat: "+9K subs", desc: "Wellness & natural beauty targeting." },
                            { ch: "HairCareHub", stat: "+8K subs", desc: "Hair routines and product demos." },
                        ].map((t, i) => (
                            <Animated key={t.ch} delay={120 + i * 80}>
                                <div className="bg-white p-6 rounded-2xl shadow hover:-translate-y-2 transition">
                                    <div className="text-sm text-gray-500 mb-2">Channel: {t.ch}</div>
                                    <div className="font-semibold text-gray-900 mb-2">{t.stat}</div>
                                    <div className="text-sm text-gray-600">{t.desc}</div>
                                </div>
                            </Animated>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-16 bg-gradient-to-br from-red-600 to-red-700 text-white">
                <div className="max-w-6xl mx-auto px-4 p-10 lg:p-12 rounded-3xl flex flex-col lg:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-2xl font-bold">Ready to grow your Health & Beauty channel?</h3>
                        <p className="text-sm text-red-100 mt-2">Start a campaign focused on real product-intent viewers and long-term followers.</p>
                    </div>

                    <div className="flex gap-4">
                        <Button onClick={() => handleWhatsApp("Start health & beauty campaign")} className="bg-white text-red-600 px-6 py-4 rounded-full font-semibold">
                            Start Promotion
                        </Button>
                        <Link href="/pricing" className="inline-flex items-center justify-center px-6 py-4 rounded-full border border-white/30">View Plans</Link>
                    </div>
                </div>
            </section>

            <style jsx global>{`
        @keyframes blob {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px,-40px) scale(1.06); }
          66% { transform: translate(-20px,20px) scale(0.94); }
        }
        .animate-blob { animation: blob 8s infinite; }
        .animation-delay-2500 { animation-delay: 2.5s; }
        .animate-pulse { animation: pulse 1.6s ease-in-out infinite; }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.95; }
          50% { transform: scale(1.06); opacity: 1; }
          100% { transform: scale(1); opacity: 0.95; }
        }
      `}</style>
        </div>
    );
}
