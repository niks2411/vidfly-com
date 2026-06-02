"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Youtube, CheckCircle, Brain, Target, Flame, Sparkles, HeartHandshake, Users, ThumbsUp } from "lucide-react";
import { Animated } from "@/components/Animated";
import GoogleAdsSection from "@/components/GoogleAdsSection";
import FAQ from "@/components/FAQ";
import { FAQSchema } from "@/components/Schema";

const motivationFaqs = [
    { question: "What is YouTube motivation promotion and how does it work?", answer: "YouTube motivation promotion is a strategy to increase views, watch time, and subscribers for motivational content using targeted advertising. Vidflyy promotes your content through Google Ads to users who regularly watch motivational speeches, success stories, and self-improvement content, ensuring highly relevant audience reach." },
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

    const handleWhatsApp = (preset?: string) => {
        const text = preset ? `Promote my motivational video: ${preset}` : "I want to promote my motivational video on YouTube";
        window.open(`https://wa.me/917355518761?text=${encodeURIComponent(text)}`, "_blank");
    };

    const topics = [
        { icon: Brain, label: "Mindset" },
        { icon: Target, label: "Goals" },
        { icon: Flame, label: "Discipline" },
        { icon: Sparkles, label: "Productivity" },
        { icon: HeartHandshake, label: "Inspiration" },
        { icon: Users, label: "Leadership" },
        { icon: ThumbsUp, label: "Positivity" },
        { icon: Youtube, label: "Speeches" },
        { icon: Brain, label: "Mindset" },
        { icon: Target, label: "Goals" },
        { icon: Flame, label: "Discipline" },
        { icon: Sparkles, label: "Productivity" },
        { icon: HeartHandshake, label: "Inspiration" },
        { icon: Users, label: "Leadership" },
        { icon: ThumbsUp, label: "Positivity" },
        { icon: Youtube, label: "Speeches" }
    ];

    return (
        <div className="min-h-screen bg-white font-founders">
            <FAQSchema items={motivationFaqs} />
            {/* HERO */}
            <div className="px-2 lg:px-4">
                <header className="relative w-full min-h-[600px] flex items-center bg-[#0f0f23] overflow-hidden">
                    {/* Background Image Setup */}
                    <div className="absolute inset-0 z-0 overflow-hidden">
                        <Image
                            src="/motivationbg.webp"
                            alt="Motivation Promotion Background"
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
                                        background: "linear-gradient(90deg, #ff6b6b 0%, #feca57 35%, #ffd200 60%, #ff9f43 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                    }}
                                >
                                    Grow Your Motivation Channel with<br />Real Viewers & Subscribers
                                </h1>

                                <p className="section-desc gaming-hero-desc !mx-0 !text-left max-w-3xl mb-10">
                                    Reach thousands of real motivation and self-improvement lovers with Vidflyy&apos;s advanced YouTube ad targeting. Boost your motivational speeches, success stories, and mindset videos with smart promotion.
                                </p>

                                <ul className="space-y-4 mb-10">
                                    {[
                                        "Real Views from Motivation Audience",
                                        "Higher Watch Time & Engagement",
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
                                    className="bg-gradient-to-r from-[#E52D27] to-[#E52D27] text-white font-black text-[18px] px-10 py-5 rounded-[4px] shadow-2xl hover:scale-[1.03] transition-all duration-300 transform tracking-tight"
                                >
                                    Promote My Motivation Video
                                </button>
                            </Animated>
                        </div>
                    </div>
                </header>
            </div>
            <GoogleAdsSection showBadge={false} bgColor="rgb(247,246,246)" />

            {/* HOW YOUTUBE MOTIVATION PROMOTION WORKS */}
            <section className="py-20 bg-white font-founders">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Animated delay={60}>
                        <h2 className="section-heading text-left sm:text-center !mb-14">
                            How <span className="text-[#E52D27]">YouTube Motivation</span> Promotion Works?
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
                                    Select a video for<br />YouTube motivation promotion.
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
                                    Choose Your YouTube<br />motivation promotion Budget
                                </h4>
                                <p className="text-[#475569] text-[14px] leading-relaxed">
                                    Select a promotion plan that fits your needs or enter your own custom budget. Promote motivation videos of any size.
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
                                    Launch & Track Your<br />YouTube motivation promotion.
                                </h4>
                                <p className="text-[#475569] text-[14px] leading-relaxed">
                                    Once your payment is confirmed, our team launches your YouTube motivation promotion campaign using advanced ad targeting to reach real motivation enthusiasts.
                                </p>
                            </div>
                        </Animated>
                    </div>
                </div>
            </section>

            {/* TYPES OF MOTIVATION CHANNELS */}
            <section className="py-20 bg-[#F7F6F6] font-founders">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Animated delay={60}>
                        <h2 className="section-heading text-left sm:text-center !mb-4">
                            Types of Motivation Channels <span className="text-[#E52D27]">We Promote</span>
                        </h2>
                        <p className="section-desc !text-left sm:!text-center !mx-0 sm:!mx-auto max-w-2xl mb-12">
                            Vidflyy supports promotion for a wide range of motivation creators, including:
                        </p>
                    </Animated>

                    {/* Scrolling Tags */}
                    <div className="relative overflow-hidden mb-16">
                        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#F7F6F6] to-transparent z-10 pointer-events-none"></div>
                        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#F7F6F6] to-transparent z-10 pointer-events-none"></div>
                        <div className="flex gap-4 animate-scroll-tags">
                            {[
                                "Motivational speech videos",
                                "Success story channels",
                                "Self-improvement creators",
                                "Mindset and focus channels",
                                "Daily inspiration content",
                                "Inspirational stories",
                                "Life lesson videos",
                                "Discipline and study focus",
                                "Habits and productivity",
                                "Spiritual growth content",
                                "Motivational speech videos",
                                "Success story channels",
                                "Self-improvement creators",
                                "Mindset and focus channels",
                            ].map((tag, i) => (
                                <span
                                    key={i}
                                    className="whitespace-nowrap px-6 py-3 border-2 border-gray-300 rounded-sm text-[#0E172B] font-semibold text-[14px] bg-white flex-shrink-0"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Motivation Topics Marquee */}
                    <Animated delay={200}>
                        <p className="font-extrabold text-[18px] text-[#0E172B] mb-8 text-bold text-center">
                            Our promotion campaigns work for channels focusing on popular topics such as:
                        </p>
                        <div className="relative overflow-hidden">
                            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#F7F6F6] to-transparent z-10 pointer-events-none"></div>
                            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#F7F6F6] to-transparent z-10 pointer-events-none"></div>
                            <div className="flex items-center gap-6 animate-scroll-games">
                                {topics.map((topic, i) => {
                                    const Icon = topic.icon;
                                    return (
                                        <div key={i} className="flex-shrink-0 bg-white border border-gray-200 p-6 rounded-xl flex flex-col items-center justify-center w-[160px] h-[140px] shadow-sm">
                                            <Icon className="w-10 h-10 text-red-600 mb-3" />
                                            <span className="font-extrabold text-[15px] text-slate-800">{topic.label}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </Animated>
                </div>
            </section>

            {/* WHY PROMOTE YOUR MOTIVATION CHANNEL */}
            <section className="py-20 bg-white font-founders">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        {/* Left Content */}
                        <div className="flex-1">
                            <Animated delay={60}>
                                <h2 className="section-heading !text-left !mb-4">
                                    Why <span className="text-[#E52D27]">Promote</span> Your Motivation Channel?
                                </h2>
                                <p className="section-desc !text-left !mx-0 max-w-xl mb-10">
                                    YouTube&apos;s algorithm favors videos that receive early engagement and watch time. If your motivation videos start gaining traction quickly, YouTube will recommend them to more viewers.
                                </p>

                                <ul className="space-y-5 mb-10">
                                    {[
                                        "Reach real motivation and self-help seekers",
                                        "Increase video views and watch time",
                                        "Gain loyal, lifelong subscribers",
                                        "Boost video ranking on YouTube search",
                                        "Grow your inspiration community faster"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-4">
                                            <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                                                <path d="M4 12.5L9.5 18L20 6" stroke="#22c55e" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <span className="text-[#0E172B] text-[17px] font-bold">{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => router.push('/campaign')}
                                    className="bg-[#E52D27] hover:bg-[#D42621] text-white font-extrabold text-[16px] px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    Promote My Motivation Video Now
                                </button>
                            </Animated>
                        </div>

                        {/* Right Image */}
                        <div className="flex-1 flex justify-center lg:justify-end">
                            <Animated delay={200}>
                                <div className="relative w-[350px] h-[350px] lg:w-[550px] lg:h-[450px]">
                                    <Image
                                        src="/megaphone.png"
                                        alt="Promote Your Motivation Channel"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </Animated>
                        </div>
                    </div>
                </div>
            </section>

            {/* IS YOUTUBE MOTIVATION PROMOTION SAFE */}
            <section className="py-20 font-founders" style={{ backgroundColor: 'rgb(247,246,246)' }}>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        {/* Left Image */}
                        <div className="flex-1 flex justify-center lg:justify-start lg:pl-12">
                            <Animated delay={100}>
                                <div className="relative w-[300px] h-[350px] lg:w-[380px] lg:h-[400px]">
                                    <Image
                                        src="/motivation-safe.png"
                                        alt="YouTube Motivation Promotion Safe"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </Animated>
                        </div>

                        {/* Right Content */}
                        <div className="flex-1">
                            <Animated delay={60}>
                                <h2 className="section-heading !text-left !mb-6">
                                    Is YouTube Motivation<br />Promotion Safe?
                                </h2>
                                <p className="section-desc !text-left !mx-0 mb-8">
                                    Yes. Vidflyy uses YouTube advertising campaigns through <strong className="text-[#0E172B]">Google Ads</strong>, which are compliant with YouTube&apos;s promotional policies.
                                </p>

                                <div className="mb-8">
                                    <p className="text-[22px] font-extrabold text-[#0E172B] mb-4">
                                        We never use <span className="text-[#E52D27]">✗</span>
                                    </p>
                                    <ul className="space-y-2">
                                        {["Bots", "Fake views", "Automated traffic", "Spam promotion"].map((item, i) => (
                                            <li key={i} className="text-[#0E172B] text-[16px] font-bold">{item}</li>
                                        ))}
                                    </ul>
                                </div>

                                <p className="section-desc !text-left !mx-0">
                                    Our goal is to promote your motivation videos to genuine viewers <strong className="text-[#0E172B]">who are interested in self-improvement content</strong>.
                                </p>
                            </Animated>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHO SHOULD USE MOTIVATION VIDEO PROMOTION */}
            <section className="py-20 font-founders" style={{ backgroundColor: 'rgb(247,246,246)' }}>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        {/* Left Content */}
                        <div className="flex-1">
                            <Animated delay={60}>
                                <h2 className="section-heading !text-left !mb-6">
                                    Who Should Use Motivation<br />Video Promotion?
                                </h2>
                                <p className="section-desc !text-left !mx-0 mb-8">
                                    YouTube motivation promotion is ideal for:
                                </p>

                                <ul className="space-y-4 mb-10">
                                    {[
                                        "New motivational speech channels starting out",
                                        "Productivity and mindset coaches building their brand",
                                        "Speech editors and compilers looking for exposure",
                                        "Self-improvement channels struggling to gain traction",
                                        "Creators posting daily inspiration shorts and reels"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="text-[#0E172B] font-bold text-[18px]">→</span>
                                            <span className="text-[#0E172B] text-[16px] font-bold">{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <p className="section-desc !text-left !mx-0">
                                    If you want to <strong className="text-[#0E172B]">increase visibility and reach more people seeking inspiration</strong>, promotion can help accelerate your growth.
                                </p>
                            </Animated>
                        </div>

                        {/* Right Image */}
                        <div className="flex-1 flex justify-center lg:justify-end">
                            <Animated delay={200}>
                                <div className="relative w-[300px] h-[350px] lg:w-[400px] lg:h-[400px]">
                                    <Image
                                        src="/motivation-who.png"
                                        alt="Who Should Use Motivation Video Promotion"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
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
                            background: "linear-gradient(90deg, #ff9f43 0%, #ff6b6b 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            display: "inline-block"
                        }}>Promote</span> Your Motivation Video Today<br />
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
                                onChange={handleUrlChange}
                                className="bg-transparent border-none outline-none w-full text-[#0E172B] font-bold text-[17px] placeholder:text-[#9198A1]"
                            />
                        </div>
                        <button
                            onClick={handlePromoteClick}
                            className="w-full md:w-auto bg-[#E52D27] hover:bg-[#CC2924] text-white font-bold text-[18px] px-10 py-5 rounded-[6px] transition-all whitespace-nowrap"
                        >
                            Promote Now
                        </button>
                    </div>
                </div>
            </section>

            <FAQ 
                items={motivationFaqs} 
                title="Frequently Asked Question - Youtube Motivation Promotion"
                description="Everything you need to know about promoting your motivational channel on YouTube with Vidflyy."
            />
        </div>
    );
}
