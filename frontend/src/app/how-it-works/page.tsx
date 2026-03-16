"use client";

import Image from "next/image";
import { Target, BarChart3, Youtube } from "lucide-react";
import PromotionCTA from "@/components/PromotionCTA";

export default function HowItWorksPage() {
    return (
        <div className="min-h-screen bg-white font-founders">
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
            <div className="max-w-4xl mx-auto px-4 text-center mt-12 md:mt-24 mb-16 md:mb-24">
                <h1 className="text-3xl md:text-4xl lg:text-[44px] text-[#101828] mb-6 tracking-tight">
                    How To Promote YouTube Video with <span className="text-red-600">Vidflyy</span>?
                </h1>
                <p className="text-base md:text-[18px] text-[rgb(81,41,41)] leading-relaxed max-w-2xl mx-auto">
                    Promote your video on YouTube and attract viewers that expand your<br className="hidden md:block" /> community and grow your YouTube Channel
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
                    <div className="w-full md:w-1/2 space-y-2 text-center md:text-left">
                        <h2 className="text-[80px] md:text-[110px] font-black text-[#7E7E7E] leading-none tracking-tighter mb-2">01</h2>
                        <h3 className="text-2xl md:text-3xl font-bold text-[#101828]">Select Your Video URL</h3>
                        <p className="text-base md:text-[18px] text-[rgb(81,41,41)] leading-relaxed max-w-sm mx-auto md:mx-0">
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
                    <div className="w-full md:w-1/2 space-y-2 text-center md:text-left">
                        <h2 className="text-[80px] md:text-[110px] font-black text-[#7E7E7E] leading-none tracking-tighter mb-2">02</h2>
                        <h3 className="text-2xl md:text-3xl font-bold text-[#101828]">Set Goal & Budget</h3>
                        <p className="text-base md:text-[18px] text-[rgb(81,41,41)] leading-relaxed max-w-sm mx-auto md:mx-0">
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
                    <div className="w-full md:w-1/2 space-y-2 text-center md:text-left">
                        <h2 className="text-[80px] md:text-[110px] font-black text-[#7E7E7E] leading-none tracking-tighter mb-2">03</h2>
                        <h3 className="text-2xl md:text-3xl font-bold text-[#101828]">Launch & Track</h3>
                        <p className="text-base md:text-[18px] text-[rgb(81,41,41)] leading-relaxed max-w-sm mx-auto md:mx-0">
                            Go live instantly and track your campaign performance with real-time updates and progress insights.
                        </p>
                    </div>
                </div>

            </div>

            {/* Bottom Call to Action Section */}
            <PromotionCTA />
        </div>
    );
}
