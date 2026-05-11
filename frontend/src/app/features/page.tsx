import YouTubeAdPlacements from "@/components/YouTubeAdPlacements";
import Image from "next/image";
import { Play, Target, TrendingUp, Users, Youtube, CheckCircle, Zap, Shield, Globe, BarChart3 } from "lucide-react";
import PromotionBanner from "@/components/PromotionBanner";

export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-white font-founders overflow-x-hidden">
            {/* Hero Banner Section */}
            <section className="relative w-full pt-8 px-4 sm:px-6 lg:px-12 bg-white">
                <div className="max-w-[1400px] mx-auto">
                    <div className="relative rounded-b-[7px] overflow-hidden shadow-xl h-[160px] sm:h-[220px] md:h-[260px] lg:h-[300px] animate-fade-in mb-12 max-w-6xl mx-auto">
                        <Image
                            src="/featuresbg.png"
                            alt="Vidflyy Features Studio"
                            fill
                            priority
                            className="object-cover object-center"
                        />
                    </div>
                </div>
            </section>

            {/* Vidflyy Features Heading */}
            <section className="pt-16 pb-6 bg-white">
                <div className="max-w-4xl mx-auto text-left sm:text-center px-4">
                    <h1 className="section-heading text-left sm:text-center">
                        Vidflyy Features
                    </h1>
                    <p className="section-desc !text-left sm:!text-center !mx-0 sm:!mx-auto !max-w-3xl">
                        Discover how our YouTube Promotion platform saves you time and money while significantly boosting your subscriber count. Explore the powerful features we offer below.
                    </p>
                </div>
            </section>

            {/* Ads Type We Uses - Matching Figma Exactly */}
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

                            {/* Right: Just the Video */}
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
                        {/* Decorative Arrows (SVG Grid) - Matching Figma Sketch */}
                        <div className="absolute inset-0 pointer-events-none hidden lg:block z-20">
                            {/* Arrow 1 to 2 (Top curve) */}
                            <svg className="absolute top-[5%] left-[45%] w-32 h-16" viewBox="0 0 120 60">
                                <path d="M10 50 Q 60 0 110 30" stroke="black" strokeWidth="4" fill="none" strokeLinecap="round" />
                                <path d="M95 25 L 110 30 L 105 15" stroke="black" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {/* Arrow 2 to 3 (Long diagonal) */}
                            <svg className="absolute top-[35%] left-[43%] w-40 h-32" viewBox="0 0 160 120">
                                <path d="M150 10 Q 80 60 10 110" stroke="black" strokeWidth="4" fill="none" strokeLinecap="round" />
                                <path d="M25 105 L 10 110 L 15 95" stroke="black" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {/* Arrow 3 to 4 (Bottom curve) */}
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

                    {/* Bottom Blue Banner - Matching Figma exactly with stroke-through */}
                    <div className="mt-24 max-w-5xl mx-auto">
                        <div className="bg-[#2563EB] rounded-full py-6 px-12 text-center relative overflow-hidden shadow-xl shadow-blue-200">
                            <p className="text-white text-lg md:text-2xl font-bold relative z-10 tracking-tight inline-block">
                                <span className="relative inline-block mr-2 px-1">
                                    No Bots. No Fake Engagement.
                                    {/* Hand-drawn yellow strike-through */}
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

                        {/* Right Content: Clean Icon Illustration matching screenshot */}
                        <div className="lg:w-[400px] flex justify-center items-center">
                            <div className="relative w-full aspect-square animate-float max-w-[340px]">

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <PromotionBanner />
        </div>
    );
}
