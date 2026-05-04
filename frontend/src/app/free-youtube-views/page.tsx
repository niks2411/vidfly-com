"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, Info, ShieldCheck, Zap, TrendingUp, Users, Youtube, Star } from "lucide-react";
import { Animated } from "@/components/Animated";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        question: "Is it really free?",
        answer: "Yes! We provide a trial of 1000 free views so you can test our service's quality before committing to any paid packages."
    },
    {
        question: "Are these views safe for my channel?",
        answer: "Absolutely. We strictly use Google Ads to promote your content, meaning all views come from real users and are 100% compliant with YouTube's Terms of Service."
    },
    {
        question: "How long does it take to deliver?",
        answer: "Free views typically start delivering within 24 hours of your request being approved. They will gradually populate to ensure natural growth."
    },
    {
        question: "Do I need to provide my password?",
        answer: "Never. We only need your public video URL to send views. We will never ask for your Google or YouTube account passwords."
    }
];

export default function FreeYoutubeViews() {
    const router = useRouter();

    const handleGetStarted = () => {
        router.push("/campaign");
    };

    return (
        <div className="min-h-screen bg-white font-founders pb-20">
            {/* CENTERED HERO SECTION */}
            <section className="pt-20 pb-16 lg:pt-28 lg:pb-20 bg-gradient-to-b from-gray-50 to-white text-center">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Animated delay={60}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-600 font-semibold text-sm mb-6">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                            </span>
                            Limited Time Offer
                        </div>
                        <h1 className="section-heading !mb-6">
                            Bonus YouTube Views: 1000 Free Views for Your Channel
                        </h1>
                        <p className="section-desc !mb-10 max-w-2xl mx-auto">
                            Vidfly offers you 1000 free YouTube views to jumpstart your channel's growth. Experience the quality of our premium engagement services completely risk-free. No credit card required.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button 
                                onClick={handleGetStarted}
                                className="bg-red-600 hover:bg-red-700 text-white rounded-none px-10 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                            >
                                Get Free Views
                            </Button>
                            <Button 
                                variant="outline"
                                className="border-2 border-gray-200 hover:border-gray-300 rounded-none px-10 py-6 text-lg font-semibold w-full sm:w-auto"
                            >
                                Learn More
                            </Button>
                        </div>
                        
                        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm font-semibold text-gray-500 uppercase tracking-widest">
                            <div className="flex items-center gap-2"><Check className="w-5 h-5 text-green-500" /> 100% Free</div>
                            <div className="flex items-center gap-2"><Check className="w-5 h-5 text-green-500" /> No Password Needed</div>
                            <div className="flex items-center gap-2"><Check className="w-5 h-5 text-green-500" /> Real Views</div>
                        </div>
                    </Animated>
                </div>
            </section>

            {/* HOW TO GET FREE VIEWS SECTION */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Animated delay={60}>
                        <div className="text-center max-w-4xl mx-auto mb-16">
                            <h2 className="section-heading !mb-6">
                                How to get Free YouTube Views?
                            </h2>
                            <p className="section-desc">
                                Claiming your free YouTube views from Vidfly is a quick and straightforward process. Just follow these steps to see your view count rise.
                            </p>
                        </div>
                    </Animated>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <Animated delay={100}>
                            <div className="space-y-8">
                                {[
                                    { step: "01", title: "Create Your Account", desc: "Sign up for a free Vidfly account using your email address." },
                                    { step: "02", title: "Submit Video URL", desc: "Go to the Free Trial section and paste the link of the video you want to promote." },
                                    { step: "03", title: "Verify Email", desc: "Confirm your email address to activate your free views campaign." },
                                    { step: "04", title: "Watch It Grow", desc: "Sit back and watch as real, targeted views are delivered to your video." }
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                                        <div className="flex-shrink-0 w-14 h-14 bg-red-50 text-red-600 font-bold text-xl flex items-center justify-center rounded-2xl">
                                            {item.step}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                            <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Animated>
                        <Animated delay={200}>
                            <div className="bg-gray-50 rounded-[2rem] p-10 border border-gray-100 h-full flex flex-col justify-center">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Why give free views?</h3>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    We know that finding a reliable YouTube promotion service can be difficult. The internet is full of bots and scams. 
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    We offer this 1000 free views trial because we are confident in the quality of our Google Ads-powered delivery. We want you to see the real engagement and retention for yourself, so you can trust us when you're ready to scale your channel with our premium bulk packages.
                                </p>
                            </div>
                        </Animated>
                    </div>
                </div>
            </section>

            {/* BENEFITS OF FREE VIEWS GRID */}
            <section className="py-16 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Animated delay={60}>
                        <div className="text-center max-w-4xl mx-auto mb-16">
                            <h2 className="section-heading !mb-6">
                                Benefits of Free Views
                            </h2>
                            <p className="section-desc">
                                Even our free trial views pack a punch. Here is what you get when you claim your 1000 free views.
                            </p>
                        </div>
                    </Animated>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: ShieldCheck, title: "100% Safe", desc: "Compliant with YouTube policies. Zero risk of bans or strikes." },
                            { icon: Zap, title: "Fast Delivery", desc: "Campaigns start within 24 hours of successful verification." },
                            { icon: TrendingUp, title: "Better Rankings", desc: "Initial engagement signals YouTube to rank your video higher." },
                            { icon: Users, title: "Real Engagement", desc: "Delivered to real people who might like and subscribe." }
                        ].map((benefit, i) => (
                            <Animated key={i} delay={100 + i * 50}>
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow h-full">
                                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-6">
                                        <benefit.icon className="w-6 h-6 text-red-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{benefit.desc}</p>
                                </div>
                            </Animated>
                        ))}
                    </div>
                </div>
            </section>

            {/* POWERED BY GOOGLE ADS TEXT */}
            <section className="py-20 text-center">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Animated delay={100}>
                        <Youtube className="w-16 h-16 text-red-600 mx-auto mb-6" />
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            Free YouTube Views Powered By Google Ads
                        </h2>
                        <p className="section-desc max-w-2xl mx-auto">
                            Unlike competitors who use bots or click farms for their free trials, Vidfly uses official Google Ads campaigns to deliver your free views. We absorb the advertising cost so you can experience authentic growth.
                        </p>
                    </Animated>
                </div>
            </section>

            {/* COMPARISON TABLE */}
            <section className="py-16 bg-gray-50/50">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Animated delay={60}>
                        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-100">
                                            <th className="p-6 font-bold text-gray-900">Features</th>
                                            <th className="p-6 font-bold text-red-600 bg-red-50">Vidfly Free Views</th>
                                            <th className="p-6 font-bold text-gray-900">Other "Free" Sites</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {[
                                            { feature: "View Quality", ours: "Real Users (Google Ads)", theirs: "Bots & Click Farms" },
                                            { feature: "Account Safety", ours: "100% Safe", theirs: "High Risk of Bans" },
                                            { feature: "Engagement", ours: "Potential for Likes/Subs", theirs: "Zero Engagement" },
                                            { feature: "Retention Rate", ours: "High Watch Time", theirs: "Instant Drop-off" },
                                            { feature: "Password Required", ours: "No", theirs: "Often Yes (Unsafe)" }
                                        ].map((row, i) => (
                                            <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="p-6 font-semibold text-gray-900">{row.feature}</td>
                                                <td className="p-6 text-red-700 font-medium bg-red-50/30 flex items-center gap-2">
                                                    <Check className="w-5 h-5 text-red-500" /> {row.ours}
                                                </td>
                                                <td className="p-6 text-gray-500">{row.theirs}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Animated>
                </div>
            </section>

            {/* DESIGNED FOR CREATORS GRID */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Animated delay={60}>
                        <div className="text-center max-w-4xl mx-auto mb-16">
                            <h2 className="section-heading !mb-6">
                                Designed For Every Type of Creator
                            </h2>
                            <p className="section-desc">
                                Whether you are just starting out or looking to break through a plateau, our free trial is built to help you.
                            </p>
                        </div>
                    </Animated>

                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                        <Animated delay={100}>
                            <div className="border-t-2 border-red-100 pt-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 text-red-600">01. New Channels</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Struggling to get your first few views? Our free 1000 views give your very first videos the initial traction needed to be picked up by the algorithm.
                                </p>
                            </div>
                        </Animated>
                        <Animated delay={150}>
                            <div className="border-t-2 border-red-100 pt-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 text-red-600">02. Gamers & Streamers</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Stand out in a saturated niche. Use free views on your highlight reels to increase visibility and draw viewers to your live streams.
                                </p>
                            </div>
                        </Animated>
                        <Animated delay={200}>
                            <div className="border-t-2 border-red-100 pt-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 text-red-600">03. Musicians & Artists</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Promote your latest music video or cover. Real views from Google Ads mean you reach listeners who actually enjoy your genre.
                                </p>
                            </div>
                        </Animated>
                        <Animated delay={250}>
                            <div className="border-t-2 border-red-100 pt-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 text-red-600">04. Small Businesses</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Increase brand awareness and trust by ensuring your product demo or commercial has a credible number of views from day one.
                                </p>
                            </div>
                        </Animated>
                    </div>
                </div>
            </section>

            {/* BEST WAYS TO GET VIEWS LISTICLE */}
            <section className="py-16 bg-gray-900 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Animated delay={60}>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                5 Best Ways to Get More YouTube Views in 2024
                            </h2>
                            <p className="text-gray-400 text-lg">
                                Combine our free trial with these proven organic strategies for maximum channel growth.
                            </p>
                        </div>
                    </Animated>

                    <div className="space-y-6">
                        {[
                            { title: "Optimize Thumbnails & Titles", desc: "Your thumbnail and title are the only things determining your Click-Through Rate (CTR). Make them vibrant, emotional, and intriguing." },
                            { title: "Hook Viewers in 5 Seconds", desc: "Drop the long intro. Get straight to the point and tell the viewer exactly what they will gain by watching the entire video." },
                            { title: "Create Searchable Content", desc: "Use tools like TubeBuddy or VidIQ to find low-competition keywords and create videos answering specific questions." },
                            { title: "Engage With Your Community", desc: "Pin a comment, ask questions, and reply to viewers. YouTube promotes videos with high comment velocity." },
                            { title: "Leverage YouTube Shorts", desc: "Cut your long-form videos into 30-second Shorts to tap into the massive mobile audience and redirect them to your main content." }
                        ].map((tip, i) => (
                            <Animated key={i} delay={100 + i * 50}>
                                <div className="bg-gray-800 p-6 rounded-2xl flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                                    <div className="text-red-500 font-black text-3xl opacity-50">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">{tip.title}</h3>
                                        <p className="text-gray-400 leading-relaxed">{tip.desc}</p>
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
                                Frequently Asked Questions
                            </h2>
                            <p className="section-desc">
                                Got questions about the free trial? We've got answers.
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
