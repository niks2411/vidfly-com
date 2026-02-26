"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
    Globe,
    MapPin,
    Camera,
    Users,
    CheckCircle,
    Play,
    Compass,
    Mountain,
    Check,
} from "lucide-react";
import { promotionPackages } from "@/lib/constants";
import { Animated } from "@/components/Animated";
import { Counter } from "@/components/Counter";

export default function YoutubeTravelPromotion() {
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

    const handleWhatsApp = (msg?: string) => {
        const text = msg || "I want to promote my travel channel on YouTube";
        window.open(`https://wa.me/917355518761?text=${encodeURIComponent(text)}`, "_blank");
    };

    return (
        <div className="min-h-screen bg-white font-montserrat">
            {/* HERO SECTION */}
            <header className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-white py-24 lg:py-32">
                <div className="absolute -left-32 -top-24 w-80 h-80 bg-blue-100 rounded-full opacity-25 animate-blob pointer-events-none"></div>
                <div className="absolute right-8 top-20 w-64 h-64 bg-blue-200 rounded-full opacity-20 animate-blob animation-delay-2500 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <Animated delay={50}>
                            <div>
                                <div className="inline-flex items-center gap-3 mb-4">
                                    <Globe className="h-6 w-6 text-red-600" />
                                    <span className="text-xs font-semibold text-red-600 uppercase">Travel Promotion</span>
                                </div>

                                <h1 className="text-3xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                                    Grow Your Travel Channel — Reach Viewers Who Love Exploring New Destinations
                                </h1>

                                <p className="text-gray-600 max-w-2xl mb-6">
                                    Promote your travel vlogs, cinematic journeys, and destination guides to viewers actively searching for travel,
                                    adventure, tourism and lifestyle content. Real engagement. No bots.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Button
                                        onClick={() => handleWhatsApp("Travel starter pack")}
                                        className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 rounded-full shadow-lg transform transition hover:scale-105"
                                    >
                                        Promote My Channel
                                    </Button>

                                    <Link
                                        href="/pricing"
                                        className="inline-flex items-center justify-center px-6 py-4 rounded-full border border-gray-200 hover:shadow-md mt-2 sm:mt-0"
                                    >
                                        See Pricing
                                    </Link>
                                </div>

                                <div className="mt-6 flex gap-6 text-sm text-gray-600">
                                    <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-red-600" /> Destination targeting</div>
                                    <div className="flex items-center gap-2"><Users className="h-4 w-4 text-red-600" /> Real travel audience</div>
                                </div>
                            </div>
                        </Animated>

                        <Animated delay={150}>
                            <div className="flex justify-center lg:justify-end">
                                <div className="bg-white rounded-3xl p-6 shadow-2xl w-full max-w-md transform hover:-translate-y-3 transition">
                                    <div className="relative h-56 overflow-hidden rounded-xl">
                                        <Image
                                            src="/lovable-uploads/travel-hero.png"
                                            alt="Travel promotion"
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
                                        <div className="text-lg font-semibold text-gray-900">Start from ₹600</div>
                                        <div className="text-sm text-gray-600">
                                            Reach travel lovers looking for destination vlogs, packing guides & adventure content.
                                        </div>

                                        <div className="mt-4 flex gap-3">
                                            <Button
                                                onClick={() => handleWhatsApp("Travel starter ₹600")}
                                                className="bg-red-600 text-white rounded-full px-4 py-2"
                                            >
                                                Promote
                                            </Button>
                                            <button
                                                onClick={() => handleWhatsApp("Custom plan for travel channel")}
                                                className="ml-auto text-sm text-gray-500 hover:underline"
                                            >
                                                Custom plan
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Animated>
                    </div>

                    <Animated delay={250}>
                        <div className="mt-12 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                                <div><Counter to={37000} /><div className="text-sm text-gray-600">Travel Creators</div></div>
                                <div><Counter to={29000000} /><div className="text-sm text-gray-600">Real Views</div></div>
                                <div><Counter to={95000} /><div className="text-sm text-gray-600">Campaigns Run</div></div>
                                <div><Counter to={800000} /><div className="text-sm text-gray-600">Subs Gained</div></div>
                            </div>
                        </div>
                    </Animated>
                </div>
            </header>

            {/* WHY TRAVEL PROMO WORKS */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <Animated delay={80}>
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 text-center">
                            Why Travel Creators Grow Faster With Our Campaigns
                        </h2>
                        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">
                            We focus on viewers interested in tourism, adventure, travel vlogging, backpacking, hotels, and destination guides.
                        </p>
                    </Animated>

                    <div className="grid md:grid-cols-3 gap-8">
                        <Animated delay={120}>
                            <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-sm transform hover:-translate-y-2 transition">
                                <div className="flex items-center gap-3 mb-4">
                                    <Compass className="h-6 w-6 text-red-600" />
                                    <h3 className="text-lg font-semibold">Interest-based Targeting</h3>
                                </div>
                                <p className="text-gray-600 text-sm">Reach users planning trips, searching destinations, or watching travel guides.</p>
                            </div>
                        </Animated>
                        <Animated delay={220}>
                            <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-sm transform hover:-translate-y-2 transition">
                                <div className="flex items-center gap-3 mb-4">
                                    <Mountain className="h-6 w-6 text-red-600" />
                                    <h3 className="text-lg font-semibold">Adventure Audience</h3>
                                </div>
                                <p className="text-gray-600 text-sm">Best for trekking, hiking, cliff-jumping, and nature lovers.</p>
                            </div>
                        </Animated>
                        <Animated delay={320}>
                            <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-sm transform hover:-translate-y-2 transition">
                                <div className="flex items-center gap-3 mb-4">
                                    <Camera className="h-6 w-6 text-red-600" />
                                    <h3 className="text-lg font-semibold">Cinematic Fans</h3>
                                </div>
                                <p className="text-gray-600 text-sm">Promote beautifully shot travel films to viewers who love visuals.</p>
                            </div>
                        </Animated>
                    </div>
                </div>
            </section>

            {/* 3 STEP WORKFLOW */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4">
                    <Animated delay={80}>
                        <h3 className="text-2xl font-bold text-center mb-6">How It Works — 3 Easy Steps</h3>
                    </Animated>

                    <div className="grid md:grid-cols-3 gap-6">
                        <Animated delay={120}>
                            <div className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition transform hover:-translate-y-2">
                                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                                    <span className="font-bold text-red-600">1</span>
                                </div>
                                <h4 className="font-semibold mb-2">Share your vlog or channel link</h4>
                                <p className="text-sm text-gray-600">Tell us your niche: adventure, resort travel, budget trips.</p>
                            </div>
                        </Animated>
                        <Animated delay={220}>
                            <div className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition transform hover:-translate-y-2">
                                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                                    <span className="font-bold text-red-600">2</span>
                                </div>
                                <h4 className="font-semibold mb-2">Choose preferred audience</h4>
                                <p className="text-sm text-gray-600">Target countries, nature lovers, photographers & tourists.</p>
                            </div>
                        </Animated>
                        <Animated delay={320}>
                            <div className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition transform hover:-translate-y-2">
                                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                                    <span className="font-bold text-red-600">3</span>
                                </div>
                                <h4 className="font-semibold mb-2">Get optimized growth</h4>
                                <p className="text-sm text-gray-600">We fine-tune reach, retention and click-through results.</p>
                            </div>
                        </Animated>
                    </div>
                </div>
            </section>

            {/* PACKAGES */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <Animated delay={80}>
                        <h3 className="text-2xl font-bold text-center mb-6">Recommended Travel Packages</h3>
                    </Animated>

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

            {/* SUCCESS STORIES */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <Animated delay={80}>
                        <h3 className="text-2xl font-bold mb-6">Success Stories</h3>
                    </Animated>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { ch: "NomadWanderer", stat: "+15K subs", desc: "Backpacking-focused targeting boosted loyal viewers." },
                            { ch: "ResortReviewPro", stat: "+9K subs", desc: "Luxury travel lovers increased retention." },
                            { ch: "Taste&Travel", stat: "+12K subs", desc: "Food & travel niche boosted long sessions." },
                        ].map((t, i) => (
                            <Animated key={t.ch} delay={120 + i * 100}>
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

            {/* FAQ */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4">
                    <Animated delay={80}>
                        <h3 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h3>
                    </Animated>

                    <div className="space-y-4 text-gray-700">
                        {[
                            { q: "Are these real travel viewers?", a: "Yes — all ads run through Google Ads targeted at travel lovers." },
                            { q: "Do you promote long travel films?", a: "Yes, performance is great for cinematic content." },
                            { q: "How fast will I grow?", a: "Growth begins in 24–72 hours after campaign start." },
                        ].map((f, i) => (
                            <Animated key={f.q} delay={120 + i * 80}>
                                <details className="p-4 border rounded-lg">
                                    <summary className="font-semibold cursor-pointer">{f.q}</summary>
                                    <p className="mt-2 text-sm">{f.a}</p>
                                </details>
                            </Animated>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-16 bg-gradient-to-br from-red-600 to-red-700 text-white">
                <div className="max-w-6xl mx-auto px-4 p-10 lg:p-12 rounded-3xl flex flex-col lg:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-2xl font-bold">Ready to get real travel viewers?</h3>
                        <p className="text-sm text-red-100 mt-2">
                            Let us promote your channel to travel lovers who truly enjoy exploring new places.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <Button
                            onClick={() => handleWhatsApp("Start travel campaign")}
                            className="bg-white text-red-600 px-6 py-4 rounded-full font-semibold"
                        >
                            Start Promotion
                        </Button>
                        <Link
                            href="/pricing"
                            className="inline-flex items-center justify-center px-6 py-4 rounded-full border border-white/30"
                        >
                            View Plans
                        </Link>
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
      `}</style>
        </div>
    );
}
