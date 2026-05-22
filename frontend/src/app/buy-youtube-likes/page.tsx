"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Play, Check, ChevronDown } from "lucide-react";
import { Animated } from "@/components/Animated";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const bulkPackages = [
    {
        likes: 1000,
        price: 400,
        originalPrice: 500,
        discount: "20% off",
        bgIcon: "bg-gradient-to-br from-orange-400 to-orange-500",
    },
    {
        likes: 5000,
        price: 1800,
        originalPrice: 2200,
        discount: "18% off",
        bgIcon: "bg-gradient-to-br from-slate-400 to-slate-500",
    },
    {
        likes: 10000,
        price: 3400,
        originalPrice: 4000,
        discount: "15% off",
        bgIcon: "bg-gradient-to-br from-pink-400 to-pink-500",
    },
    {
        likes: 25000,
        price: 8000,
        originalPrice: 9500,
        discount: "15% off",
        bgIcon: "bg-gradient-to-br from-red-400 to-red-500",
    },
    {
        likes: 50000,
        price: 15000,
        originalPrice: 18000,
        discount: "16% off",
        bgIcon: "bg-gradient-to-br from-blue-400 to-blue-500",
    },
    {
        likes: 100000,
        price: 28000,
        originalPrice: 35000,
        discount: "20% off",
        bgIcon: "bg-gradient-to-br from-green-400 to-green-500",
    },
];

const faqs = [
    {
        question: "Are the likes real and safe?",
        answer: "Yes, all likes provided by Vidflyy are 100% real and delivered through legitimate marketing campaigns. This method is completely safe and fully adheres to YouTube's terms of service and guidelines."
    },
    {
        question: "Will my account get banned for buying likes?",
        answer: "No. Because we use legitimate advertising methods to promote your channel to actual users, there is zero risk to your channel. We do not use bots, click farms, or fake accounts."
    },
    {
        question: "How long does it take to see results?",
        answer: "Campaigns typically start delivering results within 24-48 hours after approval. The speed of delivery and full completion depends on your selected budget and targeting options."
    },
    {
        question: "Can I target specific countries or audiences?",
        answer: "Absolutely! Our platform allows you to customize your campaign with specific geographic locations, languages, demographics, and interest-based targeting to ensure you reach your ideal audience."
    }
];

export default function BuyYoutubeLikes() {
    const router = useRouter();

    const handleGetStarted = () => {
        router.push("/campaign");
    };

    return (
        <div className="min-h-screen bg-white font-founders pb-20">
            {/* HERO SECTION */}
            <section className="pt-12 pb-16 lg:pt-20 lg:pb-24 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <Animated delay={60}>
                            <div className="lg:pl-8 xl:pl-12">
                                <h1 className="section-heading !text-left !mb-6">
                                    Buy YouTube Likes
                                </h1>
                                <p className="section-desc !text-left !mb-8 max-w-lg">
                                    If you are looking forward to driving your engagement quickly, Vidflyy is the best platform to go ahead with. Through Vidflyy, you can instantly boost video likes, engagement, and visibility to grow your audience.
                                </p>
                                <Button 
                                    onClick={handleGetStarted}
                                    className="bg-red-600 hover:bg-red-700 text-white rounded-none px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    Get Started Now
                                </Button>
                            </div>
                        </Animated>
                        <Animated delay={150}>
                            <div className="relative h-[400px] w-full flex items-center justify-center">
                                <Image 
                                    src="/likes-hero.png" 
                                    alt="Buy YouTube Likes" 
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </Animated>
                    </div>
                </div>
            </section>

            {/* WHY BUY LIKES (Grid format from the screenshot) */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Animated delay={60}>
                        <div className="text-center max-w-4xl mx-auto mb-16">
                            <h2 className="section-heading !mb-6">
                                Why Buy YouTube Likes From Vidflyy?
                            </h2>
                            <p className="section-desc">
                                Get to know why Vidflyy is the most trusted and reliable partner for thousands of creators to grow their YouTube engagement and channel authority.
                            </p>
                        </div>
                    </Animated>

                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        <Animated delay={100}>
                            <div className="bg-gray-50 rounded-[2rem] p-8 flex flex-col sm:flex-row items-center gap-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center sm:text-left">
                                <div className="relative w-32 h-32 flex-shrink-0">
                                    <Image src="/likes-why-1.png" alt="Reliable Service Provider" fill className="object-contain" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Reliable Service Provider</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        Vidflyy ensures that you receive high-quality likes from real users. Our reliable service has helped thousands of creators achieve their engagement goals securely.
                                    </p>
                                </div>
                            </div>
                        </Animated>
                        <Animated delay={150}>
                            <div className="bg-gray-50 rounded-[2rem] p-8 flex flex-col sm:flex-row items-center gap-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center sm:text-left">
                                <div className="relative w-32 h-32 flex-shrink-0">
                                    <Image src="/likes-why-2.png" alt="No Drop in Engagement" fill className="object-contain" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Drop in Engagement</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        The likes you get through our legitimate campaigns are permanent. You won't see a sudden drop in engagement, as we strictly avoid using bots or fake accounts.
                                    </p>
                                </div>
                            </div>
                        </Animated>
                        <Animated delay={200}>
                            <div className="bg-gray-50 rounded-[2rem] p-8 flex flex-col sm:flex-row items-center gap-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center sm:text-left">
                                <div className="relative w-32 h-32 flex-shrink-0">
                                    <Image src="/likes-why-3.png" alt="Transparent Pricing" fill className="object-contain" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Transparent Pricing</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        We believe in full transparency. Our pricing is straightforward with no hidden charges. You get exactly what you pay for, with high ROI on every campaign.
                                    </p>
                                </div>
                            </div>
                        </Animated>
                        <Animated delay={250}>
                            <div className="bg-gray-50 rounded-[2rem] p-8 flex flex-col sm:flex-row items-center gap-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center sm:text-left">
                                <div className="relative w-32 h-32 flex-shrink-0">
                                    <Image src="/likes-why-4.png" alt="Guaranteed Results" fill className="object-contain" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Guaranteed Results</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        We guarantee the delivery of likes for every campaign. Our team closely monitors performance to ensure your videos get the required visibility and interaction.
                                    </p>
                                </div>
                            </div>
                        </Animated>
                    </div>
                </div>
            </section>

            {/* HOW TO BUY LIKES SECTION */}
            <section className="py-16 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Animated delay={60}>
                        <div className="text-center max-w-4xl mx-auto mb-16">
                            <h2 className="section-heading !mb-6">
                                How To Buy YouTube Likes From Vidflyy?
                            </h2>
                            <p className="section-desc">
                                Getting started is incredibly easy. Follow these simple steps to boost your video engagement instantly with our advanced dashboard.
                            </p>
                        </div>
                    </Animated>
                    
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { step: "1", title: "Sign Up", desc: "Create an account on Vidflyy in seconds." },
                            { step: "2", title: "Add Video URL", desc: "Paste your YouTube video link in the dashboard." },
                            { step: "3", title: "Set Targeting", desc: "Choose your audience demographics and interests." },
                            { step: "4", title: "Checkout", desc: "Complete payment and watch your likes grow!" }
                        ].map((item, i) => (
                            <Animated key={i} delay={100 + i * 50}>
                                <div className="bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-100 relative group hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                                        {item.step}
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                                    <p className="text-gray-600 text-sm">{item.desc}</p>
                                </div>
                            </Animated>
                        ))}
                    </div>
                </div>
            </section>

            {/* BENEFITS SECTION (Layout from Image 1) */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <Animated delay={100}>
                            <div className="relative h-[450px] w-full bg-gray-50 rounded-[2rem] p-8 flex items-center justify-center">
                                <Image 
                                    src="/likes-benefits.png" 
                                    alt="Benefits of buying YouTube likes" 
                                    fill
                                    className="object-contain p-8"
                                />
                            </div>
                        </Animated>
                        <Animated delay={200}>
                            <div>
                                <h2 className="section-heading !mb-6">
                                    Benefits Of Buying YouTube Likes
                                </h2>
                                <p className="section-desc !mb-8">
                                    Increasing your likes provides an immediate signal to both viewers and the YouTube algorithm that your content is high-quality and worth watching. Here are the core benefits.
                                </p>
                                <ul className="space-y-6">
                                    {[
                                        { title: "Enhance Video Authority", desc: "High engagement rates instantly build trust with new viewers." },
                                        { title: "Trigger YouTube Algorithm", desc: "Likes are a primary signal for YouTube to suggest your video." },
                                        { title: "Boost Organic Growth", desc: "More visibility leads to organic views, comments, and subscribers." },
                                        { title: "Outrank Competitors", desc: "Higher engagement pushes your videos above competitors in search." }
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-4">
                                            <div className="mt-1 bg-red-100 rounded-full p-1.5 shadow-sm flex-shrink-0 h-fit">
                                                <Check className="w-4 h-4 text-red-600" />
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h4>
                                                <p className="text-gray-600 text-sm">{item.desc}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Animated>
                    </div>
                </div>
            </section>

            {/* CTA BANNER */}
            <section className="py-12">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Animated delay={100}>
                        <div className="bg-red-600 rounded-[2rem] p-10 md:p-14 text-center text-white shadow-xl">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Boost Your Channel with YouTube Likes
                            </h2>
                            <p className="text-red-100 mb-10 max-w-2xl mx-auto text-lg">
                                Stop waiting for engagement. Let Vidflyy's legitimate promotional campaigns drive real likes to your videos today.
                            </p>
                            <Button 
                                onClick={handleGetStarted}
                                className="bg-white hover:bg-gray-100 text-red-600 rounded-none px-10 py-6 text-lg font-bold uppercase tracking-wider"
                            >
                                Get Started Now
                            </Button>
                        </div>
                    </Animated>
                </div>
            </section>

            {/* ARE YOU THINKING ABOUT BUYING REAL YOUTUBE LIKES? */}
            <section className="py-16 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-gray-50">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <Animated delay={100}>
                                <div className="relative h-80 w-full flex items-center justify-center">
                                    <Image 
                                        src="/likes-real.png" 
                                        alt="Are you thinking about Buying Real YouTube Likes" 
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </Animated>
                            <Animated delay={200}>
                                <div>
                                    <h2 className="section-heading !mb-6">
                                        Are you thinking about Buying Real YouTube Likes?
                                    </h2>
                                    <div className="space-y-6 section-desc">
                                        <p className="section-desc !text-left">
                                            Yes, you absolutely can and should buy real YouTube likes if you want to accelerate your growth. At Vidflyy, we use completely legitimate marketing strategies via Google Ads to promote your channel to actual users. This ensures that the likes you receive are from real people, meaning they are completely safe and comply with YouTube's terms of service.
                                        </p>
                                        <p className="section-desc !text-left">
                                            Unlike fake bot likes that drop off quickly and risk your account's standing, real likes provide genuine engagement, higher watch retention on future videos, and long-term channel growth.
                                        </p>
                                    </div>
                                </div>
                            </Animated>
                        </div>
                    </div>
                </div>
            </section>

            {/* PACKAGES SECTION (Included to maintain standard site functionality) */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Animated delay={60}>
                        <div className="text-center max-w-4xl mx-auto mb-16">
                            <h2 className="section-heading !mb-6">
                                Our Bulk Likes Packages
                            </h2>
                            <p className="section-desc">
                                Choose the perfect package to kickstart your video's engagement and increase your channel's credibility.
                            </p>
                        </div>
                    </Animated>

                    <div className="grid md:grid-cols-2 gap-6">
                        {bulkPackages.map((pkg, index) => (
                            <Animated key={index} delay={100 + index * 50}>
                                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-0">
                                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 text-center sm:text-left">
                                        <div className={`w-20 h-14 rounded-[14px] flex items-center justify-center shadow-sm ${pkg.bgIcon}`}>
                                            <Play className="w-6 h-6 text-white fill-current" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-semibold text-gray-900 leading-none mb-1">
                                                {pkg.likes.toLocaleString('en-US')}
                                            </h3>
                                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                                                Likes
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
                                        <div className="text-center sm:text-right w-full sm:w-auto">
                                            <div className="text-[22px] font-semibold text-gray-900 leading-none mb-1">
                                                ₹{pkg.price.toLocaleString('en-IN')}
                                            </div>
                                            <div className="flex items-center gap-1.5 justify-center sm:justify-end text-sm">
                                                <span className="text-gray-400 line-through">₹{pkg.originalPrice.toLocaleString('en-IN')}</span>
                                                <span className="text-red-600 font-bold text-xs">{pkg.discount}</span>
                                            </div>
                                        </div>
                                        <Button 
                                            onClick={handleGetStarted}
                                            className="bg-[#E42E2C] hover:bg-red-700 text-white rounded-none px-6 py-6 font-bold tracking-wide uppercase text-sm w-full sm:w-auto"
                                        >
                                            Buy Now
                                        </Button>
                                    </div>
                                </div>
                            </Animated>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Animated delay={60}>
                        <div className="text-center mb-12">
                            <h2 className="section-heading !mb-4">
                                Frequently Asked Questions About Buying YouTube Likes
                            </h2>
                            <p className="section-desc">
                                Got questions? We've got answers. If you need more information, feel free to contact our support team.
                            </p>
                        </div>
                    </Animated>

                    <Animated delay={150}>
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                            <Accordion type="single" collapsible className="w-full">
                                {faqs.map((faq, index) => (
                                    <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-100 last:border-0">
                                        <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:text-red-600 py-6 transition-colors">
                                            {faq.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="section-desc !text-left pb-6">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </Animated>
                </div>
            </section>
        </div>
    );
}
