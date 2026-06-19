"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CheckCircle, ChevronDown, Heart, Sparkles, Camera, Droplets } from "lucide-react";
import { Animated } from "@/components/Animated";
import GoogleAdsSection from "@/components/GoogleAdsSection";
import FAQ from "@/components/FAQ";
import { FAQSchema, YoutubeHealthBeautyPromotionSchema } from "@/components/Schema";

const beautyFaqs = [
    {
        question: "What is YouTube health and beauty promotion and how does it work?",
        answer: "YouTube health and beauty promotion is a strategy to increase views, watch time, and subscribers for beauty and wellness videos using targeted advertising. Vidflyy promotes your content through Google Ads to users interested in skincare, makeup, fitness, and wellness content, ensuring relevant audience reach."
    },
    {
        question: "How can I promote my beauty videos on YouTube effectively?",
        answer: "The most effective way to promote beauty videos on YouTube is through targeted ad campaigns. With Vidflyy, you can launch campaigns that show your makeup tutorials, skincare routines, and product reviews to users actively watching similar content."
    },
    {
        question: "Can YouTube beauty promotion help grow my skincare or makeup channel?",
        answer: "Yes, YouTube beauty promotion helps creators gain real views, improve watch time, and attract subscribers. Since your videos are shown to beauty enthusiasts, it increases engagement and helps grow your channel faster."
    },
    {
        question: "Are the views from YouTube health and beauty promotion real?",
        answer: "Yes, all views generated through Vidflyy are 100% real. The platform uses Google Ads to promote your content to genuine users, ensuring no bots, fake views, or spam traffic."
    },
    {
        question: "What type of health and beauty videos can I promote?",
        answer: "You can promote a wide range of content including skincare routines, makeup tutorials, product reviews, fitness videos, wellness guides, and lifestyle beauty content, as long as they comply with YouTube and advertising policies."
    },
    {
        question: "How long does it take to see results from beauty video promotion?",
        answer: "Most campaigns are launched within 24 to 48 hours after setup. Once live, you can start seeing real views, engagement, and audience interaction from beauty and wellness viewers quickly."
    },
    {
        question: "Will YouTube beauty promotion help me gain subscribers?",
        answer: "Yes, when your content is shown to the right audience, viewers who are interested in beauty and wellness are more likely to subscribe, increasing your channel’s growth and long-term engagement."
    },
    {
        question: "Why should I use a YouTube health and beauty promotion service instead of organic growth?",
        answer: "Organic growth takes time and consistency, while YouTube promotion accelerates your results by giving your videos initial visibility, engagement, and traction, helping you perform better in YouTube search and recommendations."
    }
];

function FAQItem({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 shadow-sm" style={{ borderLeft: '4px solid #8B5CF6' }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
            >
                <span className="text-[18px] font-bold text-[#0E172B]">{question}</span>
                <div className={`w-8 h-8 rounded-full bg-[#EBEEF3] flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-5 h-5 text-[#4A5568]" />
                </div>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100 border-t border-gray-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-6 text-[#475569] font-medium leading-relaxed bg-[#F9FAFB]">
                    {answer}
                </div>
            </div>
        </div>
    );
}

function WhyChooseItem({ title, desc, initialOpen, index }: { title: string, desc: string, initialOpen: boolean, index: number }) {
    const [isOpen, setIsOpen] = useState(initialOpen);
    return (
        <Animated delay={100 + (index * 50)} className="w-full">
            <div className={`border-b border-gray-100 transition-all duration-300 ${isOpen ? 'pb-6' : 'pb-2'}`}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between py-4 text-left group"
                >
                    <span className={`text-[19px] font-bold transition-colors ${isOpen ? 'text-[#0E172B]' : 'text-gray-500 hover:text-[#0E172B]'}`}>
                        {title}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#3b82f6]' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                    <p className="text-[#475569] text-[18px] font-medium leading-relaxed">
                        {desc}
                    </p>
                </div>
            </div>
        </Animated>
    );
}

export default function YoutubeHealthBeautyPromotion() {
    const router = useRouter();
    const [videoUrl, setVideoUrl] = useState("");
    const [isValidUrl, setIsValidUrl] = useState(false);

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

    return (
        <div className="min-h-screen bg-white font-founders">
            <YoutubeHealthBeautyPromotionSchema />
            <FAQSchema items={beautyFaqs} />
            {/* HERO */}
            <div className="px-2 lg:px-4">
                <header className="relative w-full min-h-[600px] flex items-center bg-[#0f172a] overflow-hidden">
                    {/* Background Image Setup */}
                    <div className="absolute inset-0 z-0 overflow-hidden">
                        <Image
                            src="/HEALTHANDBEAUTY.png"
                            alt="Health & Beauty Promotion Background"
                            fill
                            className="object-cover opacity-80"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/40"></div>
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
                                        background: "linear-gradient(90deg, #f472b6 0%, #c084fc 55%, #fb923c 85%, #f472b6 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                    }}
                                >
                                    YouTube Health & Beauty Promotion: Engage With People Who Care About Your Recommendations
                                </h1>

                                <p className="section-desc health-hero-desc !mx-0 !text-left max-w-2xl mb-10">
                                    Target the exact audience looking for your expertise. Vidflyy delivers premium YouTube beauty channel promotion by placing your makeup tutorials, skincare reviews, and wellness routines directly in front of high-intent beauty enthusiasts. Stop losing potential subscribers to the algorithm. Use our advanced YouTube video marketing to get your trusted recommendations seen, shared, and backed by an active lifestyle community.
                                </p>

                                <ul className="space-y-4 mb-10">
                                    {[
                                        "Lifestyle-Specific Reach: Beauty & wellness enthusiasts only",
                                        "High-Trust Engagement: Active views from advice seekers",
                                        "Safe Brand Building: Compliant traffic, reputation protected"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 stroke-[3px]" />
                                            <span className="text-white font-bold">{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={handlePromoteClick}
                                    className="bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400 text-white font-black text-lg px-8 py-5 rounded-xl shadow-2xl hover:scale-[1.03] transition-all duration-300"
                                >
                                    Promote My Beauty Video
                                </button>
                            </Animated>
                        </div>
                    </div>
                </header>
            </div>
            <GoogleAdsSection showBadge={false} bgColor="rgb(247,246,246)" />

            {/* HOW YOUTUBE HEALTH & BEAUTY PROMOTION WORKS */}
            <section className="py-20 bg-white font-founders">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Animated delay={60}>
                        <h2 className="section-heading text-left sm:text-center !mb-14">
                            How <span className="text-[#E52D27]">YouTube Health & Beauty</span> Promotion Works?
                        </h2>
                    </Animated>

                    <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 md:gap-4">
                        {/* Step 1 */}
                        <Animated delay={100} className="flex-1">
                            <div className="bg-[#F7F7F7] rounded-2xl p-8 text-center h-full">
                                <div className="flex justify-center mb-5">
                                    <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-[#0E172B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                        </svg>
                                    </div>
                                </div>
                                <h4 className="font-bold text-[16px] text-[#0E172B] mb-3">
                                    Select a video for<br />YouTube Beauty promotion.
                                </h4>
                                <p className="text-[#475569] text-[14px] leading-relaxed">
                                    Copy and paste the video URL that you want to promote. Select the target audience and other demographics.
                                </p>
                            </div>
                        </Animated>

                        {/* Arrow 1 */}
                        <div className="hidden md:flex items-center justify-center pt-16">
                            <svg className="w-10 h-6 text-[#0E172B]" fill="none" viewBox="0 0 40 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h32m0 0l-6-6m6 6l-6 6" />
                            </svg>
                        </div>

                        {/* Step 2 */}
                        <Animated delay={200} className="flex-1">
                            <div className="bg-[#F7F7F7] rounded-2xl p-8 text-center h-full">
                                <div className="flex justify-center mb-5">
                                    <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center">
                                        <span className="text-[28px] font-bold text-[#0E172B]">₹</span>
                                    </div>
                                </div>
                                <h4 className="font-bold text-[16px] text-[#0E172B] mb-3">
                                    Choose Your YouTube<br />Beauty promotion Budget
                                </h4>
                                <p className="text-[#475569] text-[14px] leading-relaxed">
                                    Select a promotion plan that fits your needs or enter your own custom budget. Promote Beauty videos of any size
                                </p>
                            </div>
                        </Animated>

                        {/* Arrow 2 */}
                        <div className="hidden md:flex items-center justify-center pt-16">
                            <svg className="w-10 h-6 text-[#0E172B]" fill="none" viewBox="0 0 40 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h32m0 0l-6-6m6 6l-6 6" />
                            </svg>
                        </div>

                        {/* Step 3 */}
                        <Animated delay={300} className="flex-1">
                            <div className="bg-[#F7F7F7] rounded-2xl p-8 text-center h-full">
                                <div className="flex justify-center mb-5">
                                    <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-[#0E172B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                            <line x1="16" y1="2" x2="16" y2="6" />
                                            <line x1="8" y1="2" x2="8" y2="6" />
                                            <line x1="3" y1="10" x2="21" y2="10" />
                                            <path d="M9 14l2 2 4-4" />
                                        </svg>
                                    </div>
                                </div>
                                <h4 className="font-bold text-[16px] text-[#0E172B] mb-3">
                                    Launch & Track Your<br />YouTube Beauty promotion.
                                </h4>
                                <p className="text-[#475569] text-[14px] leading-relaxed">
                                    Once your payment is confirmed, our team launches your YouTube beauty promotion campaign using advanced ad targeting to reach real beauty enthusiasts.
                                </p>
                            </div>
                        </Animated>
                    </div>
                </div>
            </section>

            {/* WHY CHOOSE VIDFLYY HEALTH & BEAUTY VIDEO PROMOTION */}
            <section className="py-24 bg-white font-founders overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Animated delay={60}>
                        <h2 className="section-heading text-left sm:text-center !mb-16">
                            Why Choose <span className="text-[#E75069]">Vidflyy</span> Health & Beauty Video Promotion
                        </h2>
                    </Animated>

                    <div className="flex flex-col lg:flex-row gap-16 items-start">
                        {/* Left Column: Interactive Accordions */}
                        <div className="flex-1 space-y-4 w-full">
                            {[
                                {
                                    title: "Higher Rankings On YT Search Results",
                                    desc: "Your beauty videos are promoted to viewers who actively watch skincare routines, makeup tutorials, and wellness content. This ensures your content reaches people who are genuinely interested in health & beauty experiences."
                                },
                                {
                                    title: "Increase Views and Engagement",
                                    desc: "Our targeted YouTube promotion helps your health & beauty videos gain more views, higher watch time, and better audience engagement, improving your overall channel performance."
                                },
                                {
                                    title: "Attract Potential Subscribers",
                                    desc: "When beauty enthusiasts discover your content, they are more likely to follow your routine and subscribe to your channel for future beauty tips and product reviews."
                                },
                                {
                                    title: "Boost YouTube Algorithm Performance",
                                    desc: "Early engagement signals such as views and watch time can help your videos perform better in YouTube search results and suggested videos."
                                },
                                {
                                    title: "Safe and YouTube-Compliant Promotion",
                                    desc: "Vidflyy uses Google Ads and legitimate YouTube promotion strategies, ensuring safe promotion without bots, fake views, or spam traffic."
                                },
                                {
                                    title: "Fast Campaign Activation",
                                    desc: "Once your order is confirmed, your health & beauty video promotion campaign is typically launched within 24 hours, helping your content reach viewers quickly."
                                }
                            ].map((item, i) => (
                                <WhyChooseItem
                                    key={i}
                                    title={item.title}
                                    desc={item.desc}
                                    initialOpen={true}
                                    index={i}
                                />
                            ))}
                        </div>

                        {/* Right Column: Visual Collage & CTA */}
                        <div className="flex-1 w-full space-y-8">
                            <Animated delay={300} className="relative">
                                {/* Large Top Collage Image Placeholder */}
                                <div className="rounded-2xl overflow-hidden bg-gray-50 shadow-2xl aspect-[4/3] relative group">
                                    <div className="absolute inset-0 bg-[#E75069] opacity-10 mix-blend-multiply transition-opacity group-hover:opacity-5"></div>
                                    <Image
                                        src="/HEALTHANDBEAUTY.png"
                                        alt="Health & Beauty Promotion Collage"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {/* Abstract Overlay Elements */}
                                    <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-4 border-white/20 animate-pulse"></div>
                                    <div className="absolute bottom-10 right-10 w-20 h-20 rounded-full bg-pink-400/20 backdrop-blur-sm"></div>
                                </div>
                            </Animated>

                            <div className="grid grid-cols-2 gap-6">
                                {/* Small Grid Icon Cards */}
                                <Animated delay={400} className="aspect-square rounded-2xl overflow-hidden bg-[#F0F4F8] shadow-xl flex flex-col items-center justify-center p-6 gap-3 group hover:bg-[#E2E8F0] transition-colors cursor-pointer border border-gray-100">
                                    <div className="bg-white rounded-full p-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                        <Heart className="w-8 h-8 text-[#E75069]" />
                                    </div>
                                    <span className="text-[13px] font-bold text-gray-400 uppercase tracking-tighter">Beauty Lovers</span>
                                </Animated>
                                <Animated delay={500} className="aspect-square rounded-2xl overflow-hidden bg-[#E75069] shadow-xl flex items-center justify-center p-8">
                                    <Sparkles className="w-16 h-16 text-white animate-float" />
                                </Animated>
                                <Animated delay={600} className="aspect-square rounded-2xl overflow-hidden bg-white border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center p-6 grayscale hover:grayscale-0 transition-all cursor-pointer">
                                    <div className="bg-gray-100 rounded-full p-4 mb-3">
                                        <Camera className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <span className="text-[14px] font-bold text-gray-500">Your Images Here</span>
                                </Animated>
                                <Animated delay={700} className="aspect-square rounded-2xl overflow-hidden bg-[#F0F4F8] shadow-xl flex flex-col items-center justify-center p-6 gap-3 group hover:bg-[#E2E8F0] transition-colors cursor-pointer border border-gray-100">
                                    <div className="bg-white rounded-full p-4 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                        <Droplets className="w-8 h-8 text-[#3b82f6]" />
                                    </div>
                                    <span className="text-[13px] font-bold text-gray-400 uppercase tracking-tighter">Skincare Tips</span>
                                </Animated>
                            </div>

                            <Animated delay={800} className="pt-8">
                                <button
                                    onClick={() => router.push('/campaign')}
                                    className="w-full lg:w-fit bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400 text-white font-black text-lg px-12 py-5 rounded-xl shadow-2xl hover:scale-[1.03] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 uppercase tracking-tighter"
                                >
                                    Promote My Beauty Video
                                </button>
                            </Animated>
                        </div>
                    </div>
                </div>
            </section>



            {/* PROMOTE TODAY CTA */}
            <section className="py-24 bg-white font-founders">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    {/* Google Partner Badge */}
                    <div className="flex justify-center mb-10">
                        <div className="bg-[#EBEEF3] px-6 py-2 flex items-center gap-2 rounded-[4px] border border-[#DEE2E6]">
                            <svg viewBox="0 0 24 24" className="h-5 w-5">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span className="text-[#5F6368] font-bold text-[14px]">
                                Official <span className="text-[#4285F4]">G</span><span className="text-[#EA4335]">o</span><span className="text-[#FBBC05]">o</span><span className="text-[#4285F4]">g</span><span className="text-[#34A853]">l</span><span className="text-[#EA4335]">e</span> Partner
                            </span>
                        </div>
                    </div>

                    <h2 className="text-[42px] md:text-[54px] font-bold text-[#0E172B] leading-tight mb-4">
                        <span style={{
                            background: "linear-gradient(90deg, #FB7185 0%, #A855F7 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            display: "inline-block"
                        }}>Promote</span> Your Beauty Video Today<br />
                        Starts at just <span style={{
                            background: "linear-gradient(90deg, #EF4444 0%, #FF8C00 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            display: "inline-block"
                        }}>₹499</span>.
                    </h2>

                    <p className="text-[#475569] text-[18px] max-w-2xl mx-auto mb-12">
                        We help you get more Engagement on your YouTube video by promoting it<br />to Relevant Audiences using Google Ads.
                    </p>

                    {/* Input Bar */}
                    <div className="max-w-3xl mx-auto bg-[#E9EBEE] p-3 rounded-[8px] flex flex-col md:flex-row items-center gap-3">
                        <div className="flex-1 flex items-center gap-4 px-4 w-full">
                            <div className="flex-shrink-0">
                                <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
                                    <path d="M43.2 14.4C42.7 12.5 41.2 11 39.3 10.5C35.8 9.6 24 9.6 24 9.6C24 9.6 12.2 9.6 8.7 10.5C6.8 11 5.3 12.5 4.8 14.4C3.9 17.9 3.9 24 3.9 24C3.9 24 3.9 30.1 4.8 33.6C5.3 35.5 6.8 37 8.7 37.5C12.2 38.4 24 38.4 24 38.4C24 38.4 35.8 38.4 39.3 37.5C41.2 37 42.7 35.5 43.2 33.6C44.1 30.1 44.1 24 44.1 24C44.1 24 44.1 17.9 43.2 14.4Z" fill="#E52D27" />
                                    <path d="M19.8 30.6L31.2 24L19.8 17.4V30.6Z" fill="white" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Enter Channel Link/ Name/ Video Url"
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                                className="bg-transparent border-none outline-none w-full text-[#0E172B] font-bold text-[17px] placeholder:text-[#9198A1]"
                            />
                        </div>
                        <button
                            onClick={() => router.push('/campaign')}
                            className="w-full md:w-auto bg-[#E52D27] hover:bg-[#CC2924] text-white font-bold text-[18px] px-10 py-5 rounded-[6px] transition-all whitespace-nowrap"
                        >
                            Promote Now
                        </button>
                    </div>
                </div>
            </section>

            <FAQ 
                items={beautyFaqs} 
                title="Frequently Asked Questions - Youtube Beauty Promotion"
                description="Everything you need to know about promoting your beauty channel on YouTube with Vidflyy."
            />


        </div>
    );
}
