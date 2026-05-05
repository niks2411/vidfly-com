"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Youtube, Music, Play, CheckCircle } from "lucide-react";
import { Animated } from "@/components/Animated";
import GoogleAdsSection from "@/components/GoogleAdsSection";
import YouTubeGrowthCampaigns from "@/components/YouTubeGrowthCampaigns";
import PromotionBanner from "@/components/PromotionBanner";


import FAQ from "@/components/FAQ";

export default function YoutubeMusicPromotion() {
    const router = useRouter();
    const [videoUrl, setVideoUrl] = useState("");
    const [isValidUrl, setIsValidUrl] = useState(false);

    const musicFaqs = [
        {
            question: "What is included in a YouTube music promotion service for artists?",
            answer: "A YouTube music promotion service typically includes a mix of organic YouTube music promotion strategies and YouTube ads for music promotion designed to increase visibility, engagement, and reach. This can involve YouTube SEO for music videos, targeted advertising, audience research, and channel optimization. Many providers also offer YouTube music promotion packages pricing, helping artists understand exactly what they get before they decide to buy YouTube music promotion services."
        },
        {
            question: "How can YouTube music promotion help me get more views on my music videos?",
            answer: "When you invest in professional YouTube music promotion, your content is positioned in front of the right audience through smart targeting and optimization. Instead of relying on random traffic, a structured campaign helps you get more views on YouTube music videos through real engagement. This is why many artists look for the best YouTube music promotion service when they want consistent and scalable growth."
        },
        {
            question: "Organic vs paid YouTube music promotion: which is better for artists?",
            answer: "The debate around organic vs paid YouTube music promotion depends on your goals. Organic strategies focus on YouTube SEO for musicians and long-term audience building, while paid campaigns deliver instant reach through ads. Many artists choose a hybrid approach after comparing options, especially when deciding whether to hire a YouTube music promotion agency for faster and more reliable results."
        },
        {
            question: "How do YouTube music promotion packages work for independent artists?",
            answer: "For independent artists, YouTube music promotion packages are designed to match specific goals like increasing views, gaining subscribers, or launching a new track. These packages often include audience targeting, ad setup, and optimization. Before selecting a plan, many artists compare the best YouTube music promotion services 2026 to ensure they are making the right investment."
        },
        {
            question: "Can a YouTube music promotion agency guarantee real views and engagement?",
            answer: "A reliable YouTube music promotion agency focuses on delivering real YouTube promotion for musicians using ethical and proven methods. While no agency can promise virality, a trusted YouTube music promotion company ensures your content reaches genuine users. This is especially important when you are planning to order YouTube views for music video campaigns and want to avoid low-quality traffic."
        },
        {
            question: "How long does it take to see results from YouTube music promotion?",
            answer: "The timeline depends on your strategy. YouTube ads for music promotion campaigns can generate results within days, while organic YouTube promotion methods take longer but offer lasting growth. When comparing YouTube promotion vs Spotify promotion, YouTube often delivers faster visual engagement, making it a strong choice for artists looking for immediate impact."
        },
        {
            question: "What makes a YouTube music promotion company in India a good choice?",
            answer: "Choosing a YouTube music promotion company India can be beneficial due to competitive pricing and access to a large audience base. Many agencies provide affordable YouTube music promotion services India, making it easier for independent artists to scale. Before making a decision, it is common to compare the top music promotion agencies for YouTube to find the best fit."
        },
        {
            question: "Should I invest in YouTube promotion for every new music release?",
            answer: "Consistent YouTube promotion for music videos and songs helps build long-term channel authority and audience engagement. Promoting each release ensures steady growth and better performance over time. Many artists choose to buy YouTube music promotion services regularly after evaluating the best YouTube music promotion service options available, as it creates momentum for every new launch."
        }
    ];

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        setVideoUrl(url);
        const isValid = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(url);
        setIsValidUrl(isValid);
    };

    const handlePromoteClick = () => {
        if (isValidUrl && videoUrl && typeof window !== 'undefined') {
            sessionStorage.setItem("vidfly_promoted_video", JSON.stringify({
                link: videoUrl,
                timestamp: Date.now()
            }));
        }
        router.push('/campaign');
    };

    const handleWhatsApp = (preset?: string) => {
        const text = preset ? `Promote my music: ${preset}` : "I want to promote my music video on YouTube";
        window.open(`https://wa.me/917355518761?text=${encodeURIComponent(text)}`, "_blank");
    };

    return (
        <div className="min-h-screen bg-white font-founders">
            {/* HERO */}
            <div className="px-2 lg:px-4">
                <header className="relative w-full min-h-[600px] flex items-center bg-[#1a1a2e] overflow-hidden">
                    {/* Background Image Setup */}
                    <div className="absolute inset-0 z-0 overflow-hidden ">
                        <Image
                            src="/musicbg.png"
                            alt="Music Promotion Background"
                            fill
                            className="object-cover opacity-80 mix-blend-overlay"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-10 pb-20 lg:pt-14 lg:pb-28">
                        <div className="max-w-3xl space-y-6">
                            <Animated delay={50}>
                                {/* Official Google Partner Badge */}
                                <div className="flex items-center mb-8">
                                    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 flex items-center gap-3 rounded-sm shadow-sm">
                                        <svg viewBox="0 0 272 92" className="h-5 w-auto">
                                            <path fill="#EA4335" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" />
                                            <path fill="#FBBC05" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" />
                                            <path fill="#4285F4" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" />
                                            <path fill="#34A853" d="M225 3v65h-9.5V3h9.5z" />
                                            <path fill="#EA4335" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" />
                                            <path fill="#4285F4" d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z" />
                                        </svg>
                                        <span className="text-gray-600 font-bold text-sm sm:text-[16px] pl-3 border-l-2 border-gray-300">Official Premier partner</span>
                                    </div>
                                </div>

                                <h1
                                    className="section-heading !text-left !mb-8"
                                    style={{
                                        background: "linear-gradient(90deg, #43d9df 0%, #a8e06e 35%, #fdf2b1 60%, #43d9df 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                    }}
                                >
                                    Grow Your Music Channel with<br />Real Listeners & Subscribers
                                </h1>

                                <p className="section-desc music-hero-desc !mx-0 !text-left max-w-3xl mb-10">
                                    Reach thousands of real music lovers and potential subscribers with Vidflyy&apos;s advanced YouTube ad targeting. Boost your music videos, live performances, and covers with smart promotion.
                                </p>

                                <ul className="space-y-4 mb-10">
                                    {[
                                        "Real Views from Music Audience",
                                        "Increase Watch Time & Engagement",
                                        "Safe & YouTube-Compliant Promotion"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 stroke-[3px]" />
                                            <span className="text-white font-bold">{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={handlePromoteClick}
                                    className="bg-gradient-to-r from-[#9061f9] to-[#06d6a0] text-white font-black text-[18px] px-10 py-5 rounded-[4px] shadow-2xl hover:scale-[1.03] transition-all duration-300 transform uppercase tracking-tight"
                                >
                                    Promote My Music Video
                                </button>
                            </Animated>
                        </div>
                    </div>
                </header>
            </div>
            <GoogleAdsSection showBadge={false} bgColor="rgb(247,246,246)" />

            {/* WHY ARTISTS CHOOSE VIDFLYY */}
            <section className="py-20 bg-white font-founders">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 lg:mb-16">
                        <Animated delay={100}>
                            <div className="flex justify-center mb-6">
                                <span className="bg-gradient-to-r from-[#9061f9] to-[#06d6a0] text-white text-[12px] font-extrabold px-5 py-2 tracking-wide uppercase shadow-lg shadow-purple-500/20">
                                    Music Promotion Services
                                </span>
                            </div>
                            <h2 className="section-heading !mb-4">
                                Why <span className="bg-gradient-to-r from-[#9061f9] to-[#06d6a0] bg-clip-text text-transparent">Artists</span> choose Vidflyy to Grow.
                            </h2>
                            <p className="section-desc max-w-3xl mx-auto">
                                Built for musicians who want real reach, real listeners, and real growth — without fake promotion.
                            </p>
                        </Animated>
                    </div>

                    <div className="space-y-8">
                        {/* Card 1 */}
                        <Animated delay={200}>
                            <div className="bg-[#F3F4F6] overflow-hidden flex flex-col md:flex-row items-stretch border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-md group">
                                <div className="p-6 lg:p-10 md:w-[60%] flex flex-col justify-center">
                                    <h3 className="text-[24px] lg:text-[32px] font-bold text-[#0E172B] mb-4 leading-tight">
                                        No Bots, Just Real Music Fans.<br />Reach New Fans for Your Music Channel.
                                    </h3>
                                    <p className="text-[#475569] text-[16px] lg:text-[18px] leading-relaxed font-medium">
                                        Your music is promoted to audiences who actually listen to your genre — not random traffic.
                                    </p>
                                </div>
                                <div className="md:w-[40%] relative min-h-[250px] md:min-h-full overflow-hidden">
                                    <Image
                                        src="/r1.png"
                                        alt="Real Music Fans"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                            </div>
                        </Animated>

                        {/* Card 2 */}
                        <Animated delay={300}>
                            <div className="bg-[#F3F4F6] overflow-hidden flex flex-col md:flex-row items-stretch border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-md group">
                                <div className="p-6 lg:p-10 md:w-[60%] flex flex-col justify-center">
                                    <h3 className="text-[24px] lg:text-[32px] font-bold text-[#0E172B] mb-4 leading-tight">
                                        Trusted by Growing Creators Worldwide
                                    </h3>
                                    <p className="text-[#475569] text-[16px] lg:text-[18px] leading-relaxed font-medium">
                                        Thousands of creators use VIDFLYY to promote their content and reach new audiences through real YouTube campaigns.
                                    </p>
                                </div>
                                <div className="md:w-[40%] relative min-h-[250px] md:min-h-full overflow-hidden">
                                    <Image
                                        src="/r2.png"
                                        alt="Trusted by Creators"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                            </div>
                        </Animated>

                        {/* Card 3 */}
                        <Animated delay={400}>
                            <div className="bg-[#F3F4F6] overflow-hidden flex flex-col md:flex-row items-stretch border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-md group">
                                <div className="p-6 lg:p-10 md:w-[60%] flex flex-col justify-center">
                                    <h3 className="text-[24px] lg:text-[32px] font-bold text-[#0E172B] mb-4 leading-tight">
                                        Launch Music Campaigns in Seconds
                                    </h3>
                                    <p className="text-[#475569] text-[16px] lg:text-[18px] leading-relaxed font-medium mb-6">
                                        Launch your music campaign in seconds and start reaching real listeners without delays or complex setup.
                                    </p>
                                    <p className="text-[#0E172B] font-bold text-[16px] lg:text-[18px] tracking-tight">
                                        From upload to live campaign, everything is built for speed and simplicity.
                                    </p>
                                </div>
                                <div className="md:w-[40%] relative min-h-[250px] md:min-h-full overflow-hidden">
                                    <Image
                                        src="/r3.png"
                                        alt="Launch Music Campaigns"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                            </div>
                        </Animated>
                    </div>
                </div>
            </section>

            {/* READY TO PROMOTE CTA */}
            <section className="bg-[#ECECEC] font-founders">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h3 className="text-[28px] lg:text-[36px] font-black text-[#0E172B] leading-tight mb-3">
                                Ready to Promote Your Next Track?
                            </h3>
                            <p className="text-[#475569] text-[16px] lg:text-[18px] font-medium">
                                Add your video, set your budget, and go live all from one simple dashboard.
                            </p>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <button
                                onClick={handlePromoteClick}
                                className="bg-[#E52D27] hover:bg-[#D42621] text-white font-extrabold text-[18px] px-10 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                Promote My Music Now
                            </button>
                            <button
                                onClick={handlePromoteClick}
                                className="text-[#2563EB] font-semibold text-[15px] hover:underline transition-all"
                            >
                                Try with ₹499 →
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <YouTubeGrowthCampaigns />

            {/* HOW IT WORKS */}
            <section className="py-20 bg-[#1a1a2e]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Animated delay={60}>
                        <h3 className="section-heading text-left sm:text-center !mb-16 music-white-heading">
                            How Vidflyy music promotion works
                        </h3>
                    </Animated>

                    <div className="grid grid-cols-2 lg:flex lg:flex-row items-start justify-center gap-y-12 lg:gap-0">
                        <Animated delay={100} className="flex flex-col items-center text-center px-2">
                            <div className="relative w-14 h-14 lg:w-16 lg:h-16 mb-4">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-red-500 via-pink-500 to-purple-500 p-[2px]">
                                    <div className="w-full h-full rounded-full bg-[#1a1a2e] flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">1</span>
                                    </div>
                                </div>
                            </div>
                            <h4 className="text-white font-semibold text-sm lg:text-base mb-2">Setup</h4>
                            <p className="text-gray-400 text-xs leading-relaxed max-w-[140px] lg:max-w-[180px]">
                                Add your YouTube music video, choose your budget and targeting.
                            </p>
                        </Animated>
                        <div className="hidden lg:flex items-center justify-center pt-6 px-2">
                            <span className="text-gray-500 text-xl">→</span>
                        </div>
                        <Animated delay={200} className="flex flex-col items-center text-center px-2">
                            <div className="relative w-14 h-14 lg:w-16 lg:h-16 mb-4">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-red-500 via-pink-500 to-purple-500 p-[2px]">
                                    <div className="w-full h-full rounded-full bg-[#1a1a2e] flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">2</span>
                                    </div>
                                </div>
                            </div>
                            <h4 className="text-white font-semibold text-sm lg:text-base mb-2">Payment</h4>
                            <p className="text-gray-400 text-xs leading-relaxed max-w-[140px] lg:max-w-[180px]">
                                Pay securely with credit cards or UPI.
                            </p>
                        </Animated>
                        <div className="hidden lg:flex items-center justify-center pt-6 px-2">
                            <span className="text-gray-500 text-xl">→</span>
                        </div>
                        <Animated delay={300} className="flex flex-col items-center text-center px-2">
                            <div className="relative w-14 h-14 lg:w-16 lg:h-16 mb-4">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-red-500 via-pink-500 to-purple-500 p-[2px]">
                                    <div className="w-full h-full rounded-full bg-[#1a1a2e] flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">3</span>
                                    </div>
                                </div>
                            </div>
                            <h4 className="text-white font-semibold text-sm lg:text-base mb-2">Promotion</h4>
                            <p className="text-gray-400 text-xs leading-relaxed max-w-[140px] lg:max-w-[180px]">
                                Your video is shown to interested audiences.
                            </p>
                        </Animated>
                        <div className="hidden lg:flex items-center justify-center pt-6 px-2">
                            <span className="text-gray-500 text-xl">→</span>
                        </div>
                        <Animated delay={400} className="flex flex-col items-center text-center px-2">
                            <div className="relative w-14 h-14 lg:w-16 lg:h-16 mb-4">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-red-500 via-pink-500 to-purple-500 p-[2px]">
                                    <div className="w-full h-full rounded-full bg-[#1a1a2e] flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">4</span>
                                    </div>
                                </div>
                            </div>
                            <h4 className="text-white font-semibold text-sm lg:text-base mb-2">Results</h4>
                            <p className="text-gray-400 text-xs leading-relaxed max-w-[140px] lg:max-w-[180px]">
                                Track performance in your Vidflyy dashboard.
                            </p>
                        </Animated>
                    </div>
                </div>
            </section>

            <PromotionBanner
                badgeText="Start with just ₹499"
                heading={
                    <>
                        Start promoting your music <br className="hidden lg:block" />
                        today and reach listeners who <br className="hidden lg:block" />
                        truly vibe with your sound.
                    </>
                }
                description="Launch your campaign in seconds, get real listeners, track performance live, and grow your fanbase with full control."
            />


            <FAQ
                items={musicFaqs}
                title="Frequently Asked Question - Youtube Music Promotion"
                description="Everything you need to know about promoting your music on YouTube with Vidflyy."
            />


        </div>
    );
}
