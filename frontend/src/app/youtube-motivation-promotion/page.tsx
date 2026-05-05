"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
    Flame,
    HeartHandshake,
    Users,
    CheckCircle,
    Play,
    Target,
    Sparkles,
    ThumbsUp,
    Brain,
    Check,
} from "lucide-react";
import { promotionPackages } from "@/lib/constants";
import { Animated } from "@/components/Animated";
import { Counter } from "@/components/Counter";
import FAQ from "@/components/FAQ";

const motivationFaqs = [
    { question: "What is YouTube motivation promotion and how does it work?", answer: "YouTube motivation promotion is a strategy to increase views, watch time, and subscribers for motivational videos using targeted advertising. Vidflyy promotes your content through Google Ads to users who regularly watch motivational speeches, success stories, and self-improvement content, ensuring highly relevant audience reach." },
    { question: "How can I promote motivational videos on YouTube effectively?", answer: "The most effective way to promote motivational videos on YouTube is through targeted ad campaigns. With Vidflyy, you can launch campaigns that reach audiences interested in motivation, productivity, and personal growth, helping you gain real views and engagement." },
    { question: "Can YouTube motivation promotion help grow my channel faster?", answer: "Yes, motivational content performs exceptionally well on YouTube due to high watch time and repeat viewership. By promoting your videos to the right audience, you can increase engagement, improve retention, and accelerate your channel growth." },
    { question: "Are the views from YouTube motivation promotion real or fake?", answer: "All views generated through Vidflyy are 100% real. Your videos are promoted using Google Ads to genuine users, ensuring no bots, fake views, or spam traffic, making it safe for long-term channel growth." },
    { question: "What type of motivational content can I promote?", answer: "You can promote a wide range of motivational content including speeches, success stories, life lessons, productivity tips, mindset videos, and inspirational shorts, as long as they comply with YouTube and advertising policies." },
    { question: "How quickly can I see results from motivational video promotion?", answer: "Most campaigns are launched within 24-48 hours after setup. Once live, you can start seeing real views, engagement, and audience interaction from users interested in motivational content almost immediately." },
    { question: "Will YouTube motivation promotion help me gain subscribers?", answer: "Yes, when your videos are shown to people interested in motivation and self-improvement, they are more likely to subscribe to your channel, leading to consistent and long-term growth." },
    { question: "Why should I use YouTube motivation promotion instead of organic growth?", answer: "Organic growth can take time and consistent effort. YouTube motivation promotion gives your videos an initial boost in visibility and engagement, helping them perform better in YouTube’s algorithm and increasing your chances of ranking in search and recommendations." }
];

export default function YoutubeMotivationPromotion() {
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
        const text = preset || "I want to promote my motivation channel on YouTube";
        window.open(`https://wa.me/917355518761?text=${encodeURIComponent(text)}`, "_blank");
    };

    return (
        <div className="min-h-screen bg-white font-founders">
            {/* HERO */}
            <header className="relative overflow-hidden bg-gradient-to-br from-yellow-50 to-white py-24 lg:py-32">
                <div className="absolute -left-32 -top-24 w-80 h-80 bg-yellow-200 rounded-full opacity-30 blur-xl animate-blob"></div>
                <div className="absolute right-8 top-20 w-64 h-64 bg-red-200 rounded-full opacity-20 blur-lg animate-blob animation-delay-2500"></div>

                <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <Animated delay={80}>
                            <div>
                                <div className="inline-flex items-center gap-3 mb-4">
                                    <Flame className="h-6 w-6 text-red-600" />
                                    <span className="text-xs font-semibold text-red-600 uppercase">Motivation Promotion</span>
                                </div>

                                <h1 className="section-heading !text-left !mb-6">
                                    Inspire Millions. Grow Your Motivation Channel With Real Interested Viewers.
                                </h1>

                                <p className="section-desc !text-left !mx-0 mb-6">
                                    Promote motivational speeches, success stories, life lessons, productivity tips and inspirational shorts to people actively seeking motivation daily.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Button
                                        onClick={() => handleWhatsApp("Motivation basic package")}
                                        className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full px-6 py-4 shadow-lg hover:scale-105 transition"
                                    >
                                        Promote My Channel
                                    </Button>
                                    <Link
                                        href="/pricing"
                                        className="rounded-full px-6 py-4 border border-gray-300 hover:shadow-md text-center mt-2 sm:mt-0"
                                    >
                                        View Pricing
                                    </Link>
                                </div>

                                <div className="mt-6 flex gap-6 text-sm text-gray-600">
                                    <div className="flex items-center gap-2"><Brain className="h-4 w-4 text-red-600" /> Mindset-focused audience</div>
                                    <div className="flex items-center gap-2"><ThumbsUp className="h-4 w-4 text-red-600" /> High retention viewers</div>
                                </div>
                            </div>
                        </Animated>

                        <Animated delay={180}>
                            <div className="flex justify-center lg:justify-end">
                                <div className="bg-white rounded-3xl p-6 shadow-2xl max-w-md w-full transform hover:-translate-y-3 transition">
                                    <div className="relative h-56 overflow-hidden rounded-xl">
                                        <Image
                                            src="/lovable-uploads/motivation-hero.png"
                                            className="object-cover"
                                            alt="Motivation Promotion"
                                            fill
                                            priority
                                            sizes="(max-width: 768px) 100vw, 400px"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="bg-black/40 p-4 rounded-full animate-pulse">
                                                <Play className="h-8 w-8 text-white" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <div className="text-sm text-gray-500">Starter Pack</div>
                                        <div className="text-lg font-semibold text-gray-900">Start from ₹650</div>
                                        <p className="text-sm text-gray-600">Perfect for new creators posting motivational shorts & speech clips.</p>

                                        <div className="flex gap-3 mt-4">
                                            <Button onClick={() => handleWhatsApp("Starter ₹650")} className="bg-red-600 text-white rounded-full px-4 py-2">
                                                Promote
                                            </Button>
                                            <button onClick={() => handleWhatsApp("Custom plan")} className="text-sm text-gray-500 hover:underline ml-auto">
                                                Custom plan
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Animated>
                    </div>

                    <Animated delay={260}>
                        <div className="mt-14 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                                <div><Counter to={51000} /><div className="text-sm text-gray-600">Motivational Creators</div></div>
                                <div><Counter to={31000000} /><div className="text-sm text-gray-600">Real Views Delivered</div></div>
                                <div><Counter to={87000} /><div className="text-sm text-gray-600">Campaigns Run</div></div>
                                <div><Counter to={1200000} /><div className="text-sm text-gray-600">Subs Gained</div></div>
                            </div>
                        </div>
                    </Animated>
                </div>
            </header>

            {/* WHY IT WORKS */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <Animated delay={100}>
                        <h2 className="section-heading text-left sm:text-center !mb-6">
                            Why Motivational Channels Grow Fast With Us
                        </h2>
                        <p className="section-desc !text-left sm:!text-center !mx-0 sm:!mx-auto max-w-2xl mb-10">
                            Motivational audiences watch more, save videos, follow channels, and return daily — our campaigns attract high-retention viewers.
                        </p>
                    </Animated>

                    <div className="grid md:grid-cols-3 gap-8">
                        <Animated delay={140}>
                            <div className="p-6 bg-gradient-to-br from-yellow-50 to-white rounded-2xl shadow hover:-translate-y-2 transition">
                                <div className="flex items-center gap-3 mb-4"><Sparkles className="h-6 w-6 text-red-600" /><h3 className="font-semibold text-lg">High-retention Viewers</h3></div>
                                <p className="text-gray-600 text-sm">People who love daily inspiration and mindset content engage longer.</p>
                            </div>
                        </Animated>
                        <Animated delay={220}>
                            <div className="p-6 bg-gradient-to-br from-yellow-50 to-white rounded-2xl shadow hover:-translate-y-2 transition">
                                <div className="flex items-center gap-3 mb-4"><Flame className="h-6 w-6 text-red-600" /><h3 className="font-semibold text-lg">Viral Shorts Boost</h3></div>
                                <p className="text-gray-600 text-sm">Short motivational clips perform best — massive mobile reach.</p>
                            </div>
                        </Animated>
                        <Animated delay={300}>
                            <div className="p-6 bg-gradient-to-br from-yellow-50 to-white rounded-2xl shadow hover:-translate-y-2 transition">
                                <div className="flex items-center gap-3 mb-4"><HeartHandshake className="h-6 w-6 text-red-600" /><h3 className="font-semibold text-lg">Life Improvement Audiences</h3></div>
                                <p className="text-gray-600 text-sm">Viewers actively searching for positivity, discipline and success.</p>
                            </div>
                        </Animated>
                    </div>
                </div>
            </section>

            {/* AUDIENCE */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-10">
                    <Animated delay={120}>
                        <div>
                            <h3 className="text-2xl font-semibold mb-4">Who We Target</h3>
                            <ul className="space-y-4 text-gray-700">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-red-600" />
                                    <div><div className="font-semibold">Students & Young Creators</div><div className="text-sm">People preparing for exams, careers & goals.</div></div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-red-600" />
                                    <div><div className="font-semibold">Entrepreneurs</div><div className="text-sm">Viewers searching for hustle mindset content.</div></div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-red-600" />
                                    <div><div className="font-semibold">Fitness & Discipline Seekers</div><div className="text-sm">People wanting motivation for habits & change.</div></div>
                                </li>
                            </ul>
                        </div>
                    </Animated>

                    <Animated delay={180}>
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <h4 className="font-semibold mb-4">Best Ad Placements</h4>
                            <div className="space-y-3">
                                <div className="p-4 bg-gray-100 rounded-lg">
                                    <div className="font-semibold text-sm">Shorts Boost</div>
                                    <div className="text-xs text-gray-600">Best for daily motivational messages.</div>
                                </div>
                                <div className="p-4 bg-gray-100 rounded-lg">
                                    <div className="font-semibold text-sm">Search Visibility</div>
                                    <div className="text-xs text-gray-600">Top ranking for “motivation for study”, “success tips”, etc.</div>
                                </div>
                                <div className="p-4 bg-gray-100 rounded-lg">
                                    <div className="font-semibold text-sm">In-stream Ads</div>
                                    <div className="text-xs text-gray-600">Shown before inspirational and self-help videos.</div>
                                </div>
                            </div>
                        </div>
                    </Animated>
                </div>
            </section>

            {/* PACKAGES */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <Animated delay={100}><h3 className="section-heading text-left sm:text-center !mb-6">Recommended Packages</h3></Animated>

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
            <section className="py-16 bg-yellow-50">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <Animated delay={80}><h3 className="section-heading text-left sm:text-center !mb-6">Creator Success Stories</h3></Animated>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { ch: "RiseWithAman", stat: "+20K subs", desc: "Daily shorts skyrocketed engagement." },
                            { ch: "MindsetBoost", stat: "+14K subs", desc: "Long motivational speeches gained huge retention." },
                            { ch: "LifeShift", stat: "+11K subs", desc: "Goal-oriented viewers converted strongly." },
                        ].map((t, i) => (
                            <Animated key={t.ch} delay={120 + i * 70}>
                                <div className="bg-white p-6 rounded-2xl shadow hover:-translate-y-2 transition">
                                    <div className="text-sm text-gray-500">Channel: {t.ch}</div>
                                    <div className="font-semibold text-gray-900 mt-2">{t.stat}</div>
                                    <p className="text-sm text-gray-600">{t.desc}</p>
                                </div>
                            </Animated>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <FAQ items={motivationFaqs} />

            {/* FINAL CTA */}
            <section className="py-16 bg-gradient-to-br from-red-600 to-red-700 text-white">
                <div className="max-w-6xl mx-auto px-4 p-10 lg:p-12 rounded-3xl flex flex-col lg:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-2xl font-bold">Ready to Inspire Millions?</h3>
                        <p className="text-sm text-red-100 mt-2">Start promoting your motivational content today.</p>
                    </div>

                    <div className="flex gap-4">
                        <Button onClick={() => handleWhatsApp("Start motivational campaign")} className="bg-white text-red-600 px-6 py-4 rounded-full font-semibold">
                            Start Promotion
                        </Button>
                        <Link href="/pricing" className="border border-white/30 px-6 py-4 rounded-full flex items-center">
                            View Plans
                        </Link>
                    </div>
                </div>
            </section>


        </div>
    );
}
