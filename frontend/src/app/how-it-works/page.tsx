"use client";

import Image from "next/image";
import { Play, Target, TrendingUp, Users, Youtube, CheckCircle, Zap, Shield, Globe, BarChart3, CheckCircle2 } from "lucide-react";
import PromotionCTA from "@/components/PromotionCTA";
import PromotionBanner from "@/components/PromotionBanner";
import FAQ from "@/components/FAQ";

export default function HowItWorksPage() {
    return (
        <div className="min-h-screen bg-white font-founders overflow-x-hidden">
            {/* Hero Image Section */}
            <section className="relative w-full pt-8 px-4 sm:px-6 lg:px-12 bg-white">
                <div className="max-w-[1400px] mx-auto">
                    <div className="relative rounded-b-[7px] overflow-hidden shadow-xl h-[160px] sm:h-[220px] md:h-[260px] lg:h-[300px] animate-fade-in mb-12 max-w-6xl mx-auto">
                        <Image
                            src="/featuresbg.png"
                            alt="Vidflyy How It Works Studio"
                            fill
                            className="object-cover object-center"
                            priority
                        />
                        <div className="absolute inset-0 bg-red-900/10 mix-blend-multiply"></div>
                    </div>
                </div>
            </section>

            {/* Heading Section */}
            <div className="max-w-4xl mx-auto px-4 text-left sm:text-center mt-12 md:mt-24 mb-16 md:mb-24">
                <h1 className="section-heading text-left sm:text-center !mb-6">
                    How To Promote YouTube Video with <span className="text-red-600">Vidflyy</span>?
                </h1>
                <p className="section-desc !text-left sm:!text-center !mx-0 sm:!mx-auto max-w-2xl">
                    Promote your video on YouTube and attract viewers that expand your community and grow your YouTube Channel
                </p>
            </div>

            {/* Steps Container */}
            <div className="max-w-6xl mx-auto px-4 pb-24 space-y-16 md:space-y-24">
                {/* Step 01 */}
                <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
                    <div className="w-full md:w-1/2">
                        <div className="relative w-full aspect-[4/3] flex items-center justify-center">
                            <Image
                                src="/l1.png"
                                alt="Select Your Video URL"
                                fill
                                className="object-contain lg:object-cover"
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 space-y-2 text-left md:text-left">
                        <h2 className="text-[64px] md:text-[110px] font-black text-[#7E7E7E] opacity-40 leading-none tracking-tighter mb-2">01</h2>
                        <h3 className="text-xl md:text-3xl font-bold text-[#101828]">Select Your Video URL</h3>
                        <p className="section-desc !text-left max-w-sm !mx-0">
                            Paste your YouTube link and instantly prepare your campaign for promotion.
                        </p>
                    </div>
                </div>

                {/* Step 02 */}
                <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
                    <div className="w-full md:w-1/2">
                        <div className="relative w-full aspect-[4/3] flex items-center justify-center">
                            <Image
                                src="/l2.png"
                                alt="Set Goal & Budget"
                                fill
                                className="object-contain lg:object-cover"
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 space-y-2 text-left md:text-left">
                        <h2 className="text-[64px] md:text-[110px] font-black text-[#7E7E7E] opacity-40 leading-none tracking-tighter mb-2">02</h2>
                        <h3 className="text-xl md:text-3xl font-bold text-[#101828]">Set Goal & Budget</h3>
                        <p className="section-desc !text-left max-w-sm !mx-0">
                            Choose your objective — views, subscribers, or engagement — and set your budget based on your growth goals.
                        </p>
                    </div>
                </div>

                {/* Step 03 */}
                <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20">
                    <div className="w-full md:w-1/2">
                        <div className="relative w-full aspect-[4/3] flex items-center justify-center">
                            <Image
                                src="/l3.png"
                                alt="Launch & Track"
                                fill
                                className="object-contain lg:object-cover"
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 space-y-2 text-left md:text-left">
                        <h2 className="text-[64px] md:text-[110px] font-black text-[#7E7E7E] opacity-40 leading-none tracking-tighter mb-2">03</h2>
                        <h3 className="text-xl md:text-3xl font-bold text-[#101828]">Launch & Track</h3>
                        <p className="section-desc !text-left max-w-sm !mx-0">
                            Go live instantly and track your campaign performance with real-time updates and progress insights.
                        </p>
                    </div>
                </div>
            </div>

            {/* Section Divider */}
            <div className="w-full h-px bg-gray-100 max-w-6xl mx-auto my-12" />

            {/* Vidflyy Features Heading Section */}
            <section className="pt-16 pb-6 bg-white">
                <div className="max-w-4xl mx-auto text-left sm:text-center px-4">
                    <h2 className="section-heading text-left sm:text-center">
                        Vidflyy Features
                    </h2>
                    <p className="section-desc !text-left sm:!text-center !mx-0 sm:!mx-auto !max-w-3xl">
                        Discover how our YouTube Promotion platform saves you time and money while significantly boosting your subscriber count. Explore the powerful features we offer below.
                    </p>
                </div>
            </section>

            {/* Ads Type We Use Section */}
            <section className="bg-white pt-4 pb-20">
                <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-[#EFF2F6] py-16 lg:py-24 px-6 sm:px-10 lg:px-16">
                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                            {/* Left: Heading + List */}
                            <div>
                                <h2 className="section-heading text-left !mb-8 lg:!mb-12">
                                    Ads Type We<br />Use
                                </h2>

                                <div className="space-y-10">
                                    <div className="flex items-start gap-4">
                                        <span className="text-[#00A67E] text-[28px] font-bold leading-none mt-0.5 flex-shrink-0 italic">✓</span>
                                        <div>
                                            <h3 className="text-[18px] font-bold text-[#0E172B]">In-Feed Ads</h3>
                                            <p className="section-desc !text-left !mx-0 !text-[16px] lg:!text-[18px]">Search & suggested placements</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <span className="text-[#00A67E] text-[28px] font-bold leading-none mt-0.5 flex-shrink-0 italic">✓</span>
                                        <div>
                                            <h3 className="text-[18px] font-bold text-[#0E172B]">In-Stream Ads</h3>
                                            <p className="section-desc !text-left !mx-0 !text-[16px] lg:!text-[18px]">Ads within videos</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <span className="text-[#00A67E] text-[28px] font-bold leading-none mt-0.5 flex-shrink-0 italic">✓</span>
                                        <div>
                                            <h3 className="text-[18px] font-bold text-[#0E172B]">Shorts Ads</h3>
                                            <p className="section-desc !text-left !mx-0 !text-[16px] lg:!text-[18px]">Inside Shorts feed</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Video */}
                            <div className="relative">
                                <video
                                    className="w-full h-auto object-cover rounded-none shadow-md"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                >
                                    <source src="/rightvideo.mp4" type="video/mp4" />
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* All-in-One Growth Dashboard Section */}
            <section className="bg-[#EFF2F6] py-24 lg:py-32">
                <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="section-heading text-left sm:text-center mb-16 lg:mb-20">
                        All-in-One Growth Dashboard
                    </h2>

                    <div className="relative">
                        {/* Decorative Arrows */}
                        <div className="absolute inset-0 pointer-events-none hidden lg:block z-20">
                            <svg className="absolute top-[5%] left-[45%] w-32 h-16" viewBox="0 0 120 60">
                                <path d="M10 50 Q 60 0 110 30" stroke="black" strokeWidth="4" fill="none" strokeLinecap="round" />
                                <path d="M95 25 L 110 30 L 105 15" stroke="black" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <svg className="absolute top-[35%] left-[43%] w-40 h-32" viewBox="0 0 160 120">
                                <path d="M150 10 Q 80 60 10 110" stroke="black" strokeWidth="4" fill="none" strokeLinecap="round" />
                                <path d="M25 105 L 10 110 L 15 95" stroke="black" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <svg className="absolute top-[75%] left-[45%] w-32 h-20" viewBox="0 0 120 80">
                                <path d="M10 10 Q 60 80 110 10" stroke="black" strokeWidth="4" fill="none" strokeLinecap="round" />
                                <path d="M95 15 L 110 10 L 105 25" stroke="black" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        <div className="grid md:grid-cols-2 gap-x-8 gap-y-10 lg:gap-x-12 lg:gap-y-14">
                            {[
                                { number: "1", title: "Add Your Video", desc: "Paste your YouTube link and get started instantly." },
                                { number: "2", title: "Choose Your Goal", desc: "Select views, subscribers, or engagement based on your objective." },
                                { number: "3", title: "Set Your Budget", desc: "Control how much you want to spend and scale at your pace." },
                                { number: "4", title: "Launch & Track", desc: "Go live instantly and monitor your campaign in real time." }
                            ].map((step, i) => (
                                <div key={i} className="relative bg-white p-8 lg:p-10 rounded-sm shadow-sm min-h-[220px] flex flex-col justify-center transition-all hover:shadow-md">
                                    <div className="relative z-10 max-w-[280px]">
                                        <h3 className="text-[26px] lg:text-[30px] font-black text-red-600 mb-3 leading-tight">
                                            {step.title}
                                        </h3>
                                        <p className="text-[16px] lg:text-[18px] text-gray-600 leading-relaxed font-medium">
                                            {step.desc}
                                        </p>
                                    </div>
                                    <span className="absolute bottom-[-10px] right-2 text-[140px] lg:text-[180px] font-black leading-none select-none z-0" style={{ color: 'rgb(208, 212, 221)' }}>
                                        {step.number}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Blue Banner */}
                    <div className="mt-24 max-w-5xl mx-auto">
                        <div className="bg-[#2563EB] rounded-full py-6 px-12 text-center relative overflow-hidden shadow-xl shadow-blue-200">
                            <p className="text-white text-lg md:text-2xl font-bold relative z-10 tracking-tight inline-block">
                                <span className="relative inline-block mr-2 px-1">
                                    No Bots. No Fake Engagement.
                                    <svg className="absolute inset-0 w-full h-full pointer-events-none translate-y-[2px]" preserveAspectRatio="none" viewBox="0 0 100 20">
                                        <path d="M0 12 Q 50 10 100 13" stroke="#FACC15" strokeWidth="2" fill="none" strokeLinecap="round" className="opacity-90" />
                                    </svg>
                                </span>{" "}
                                Full Transparency.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Built on Transparency Section */}
            <section className="bg-white py-24 lg:py-32 relative overflow-hidden">
                {/* Large Faint Background Favicon */}
                <div className="absolute -bottom-24 -right-24 w-[400px] h-[400px] opacity-[0.5] pointer-events-none">
                    <Image
                        src="/favicon.png"
                        alt="Background Logo"
                        fill
                        className="object-contain"
                    />
                </div>

                <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-16 lg:gap-24">
                        {/* Left Content */}
                        <div className="flex-1 max-w-2xl">
                            <h2 className="section-heading text-left mb-8">
                                Built on <span className="text-blue-600">Transparency.</span><br />
                                Backed by Real Results.
                            </h2>
                            <p className="section-desc !text-left !mx-0 max-w-lg mb-12">
                                Vidflyy is designed to give creators full clarity and control over their growth.
                            </p>

                            {/* Features List */}
                            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8">
                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-500 font-bold text-xl">
                                        ✕
                                    </div>
                                    <span className="text-[17px] font-bold text-[#0E172B]">No Bots. No Fake Traffic</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-50 text-[#00A67E] font-bold text-xl">
                                        ✓
                                    </div>
                                    <span className="text-[17px] font-bold text-[#0E172B]">Transparent Campaign Tracking</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-50 text-[#00A67E] font-bold text-xl">
                                        ✓
                                    </div>
                                    <span className="text-[17px] font-bold text-[#0E172B]">Safe for Your Channel</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-50 text-[#00A67E] font-bold text-xl">
                                        ✓
                                    </div>
                                    <span className="text-[17px] font-bold text-[#0E172B]">Pay for What You Get</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Content */}
                        <div className="lg:w-[400px] flex justify-center items-center">
                            <div className="relative w-full aspect-square animate-float max-w-[340px]">
                                <div className="absolute inset-0 bg-gradient-to-tr from-red-500 to-[#E52D27] rounded-full opacity-10 blur-3xl" />
                                <div className="relative z-10 w-full h-full flex items-center justify-center flex-col p-8 bg-white border border-gray-100 rounded-3xl shadow-xl">
                                    <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-6 text-red-500">
                                        <Youtube className="w-8 h-8" />
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">Real Channel Growth</h4>
                                    <p className="text-gray-500 text-sm text-center leading-relaxed font-medium">
                                        Google Ads-driven campaigns designed to bring active and relevant subscribers to your channel safely.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <FAQ />

            {/* Banner Section from Features Page */}
            <PromotionBanner />

            {/* Bottom Call to Action Section from How It Works Page */}
            <PromotionCTA />
        </div>
    );
}
