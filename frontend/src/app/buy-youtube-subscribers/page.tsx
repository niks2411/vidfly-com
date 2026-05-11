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
        subscribers: 25000,
        price: 4750,
        originalPrice: 5000,
        discount: "5% off",
        bgIcon: "bg-gradient-to-br from-orange-400 to-orange-500",
    },
    {
        subscribers: 50000,
        price: 9500,
        originalPrice: 10000,
        discount: "5% off",
        bgIcon: "bg-gradient-to-br from-slate-400 to-slate-500",
    },
    {
        subscribers: 100000,
        price: 19000,
        originalPrice: 20000,
        discount: "5% off",
        bgIcon: "bg-gradient-to-br from-pink-400 to-pink-500",
    },
    {
        subscribers: 250000,
        price: 47500,
        originalPrice: 50000,
        discount: "5% off",
        bgIcon: "bg-gradient-to-br from-red-400 to-red-500",
    },
    {
        subscribers: 500000,
        price: 95000,
        originalPrice: 100000,
        discount: "5% off",
        bgIcon: "bg-gradient-to-br from-blue-400 to-blue-500",
    },
    {
        subscribers: 1000000,
        price: 190000,
        originalPrice: 200000,
        discount: "5% off",
        bgIcon: "bg-gradient-to-br from-green-400 to-green-500",
    },
];

const faqs = [
    {
        question: "Are the subscribers real and safe?",
        answer: "Yes, all subscribers provided by Vidfly are 100% real and delivered through legitimate marketing campaigns. This method is completely safe and fully adheres to YouTube's terms of service and guidelines."
    },
    {
        question: "Will my account get banned for buying subscribers?",
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

export default function BuyYoutubeSubscribers() {
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
                                    Buy YouTube Subscribers
                                </h1>
                                <p className="section-desc !text-left !mb-8 max-w-lg">
                                    If you are looking forward to driving your channel growth quickly, Vidfly is the best platform to go ahead with. Through Vidfly, you can instantly boost your subscriber count, engagement, and authority.
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
                                    src="/buy-subs-hero.png" 
                                    alt="Buy YouTube Subscribers" 
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </Animated>
                    </div>
                </div>
            </section>

            {/* PACKAGES SECTION */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Animated delay={60}>
                        <div className="text-center max-w-4xl mx-auto mb-16">
                            <h2 className="section-heading !mb-6">
                                Our Bulk Subscribers packages
                            </h2>
                            <p className="section-desc">
                                Do you want to build your audience faster? Purchase YouTube subscribers from our cost-effective bulk packages to increase your channel's credibility and reach.
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
                                                {pkg.subscribers.toLocaleString('en-US')}
                                            </h3>
                                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                                                Subs
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

            {/* WHY TO BUY SECTION */}
            <section className="py-16 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-gray-50">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <Animated delay={100}>
                                <div className="relative h-80 w-full flex items-center justify-center">
                                    <Image 
                                        src="/why-buy-subs.png" 
                                        alt="Why buy YouTube subscribers illustration" 
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </Animated>
                            <Animated delay={200}>
                                <div>
                                    <h2 className="section-heading !mb-6">
                                        Why To Buy YouTube Subscribers?
                                    </h2>
                                    <div className="space-y-6 section-desc">
                                        <p className="section-desc !text-left">
                                            The need to boost YouTube subscribers can vary depending on your channel's goals, but the primary reason is to speed up authority and channel growth. If your channel has hit a plateau regarding views and subscribers, Vidfly can help you break through that stagnation and attract a loyal audience to your videos.
                                        </p>
                                        <p className="section-desc !text-left">
                                            Purchasing real YouTube subscribers will give your content a competitive edge and increase its chances of being recommended by the YouTube algorithm. Only real subscribers have a strong command of authentic engagement. This exposure will lead to more organic visibility. It is a strategic way to gain momentum and build credibility, especially for growing creators.
                                        </p>
                                    </div>
                                </div>
                            </Animated>
                        </div>
                    </div>
                </div>
            </section>

            {/* HOW TO BUY SECTION */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gray-50 rounded-[2rem] p-8 md:p-12 shadow-sm">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <Animated delay={100}>
                                <div>
                                    <h2 className="section-heading !mb-6">
                                        How To Buy YouTube Subscribers From Vidfly?
                                    </h2>
                                    <p className="section-desc !mb-8">
                                        Don't miss out on the chance to grow your YouTube channel using Vidfly. Our dashboard has a particular section dedicated to buying YouTube subscribers for your channel. Follow the steps below to buy subscribers from Vidfly.
                                    </p>
                                    <ul className="space-y-4">
                                        {[
                                            "Sign Up/Sign In On Vidfly.",
                                            "Copy and Paste the Channel URL on the Dashboard.",
                                            "Enter Demographic and Targeting details.",
                                            "Set the desired Budget.",
                                            "Complete the Checkout process."
                                        ].map((step, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <div className="mt-1 bg-white rounded-full p-1 shadow-sm flex-shrink-0">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                                                </div>
                                                <span className="text-gray-700">{step}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Animated>
                            <Animated delay={200}>
                                <div className="relative h-80 w-full bg-white rounded-2xl shadow-sm overflow-hidden flex items-center justify-center p-8">
                                    <Image 
                                        src="/how-to-buy-subs.png" 
                                        alt="How to buy YouTube subscribers illustration" 
                                        fill
                                        className="object-contain p-8"
                                    />
                                </div>
                            </Animated>
                        </div>
                    </div>
                </div>
            </section>

            {/* CAN I BUY REAL SUBS SECTION */}
            <section className="py-16 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-gray-50">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <Animated delay={100}>
                                <div className="relative h-80 w-full flex items-center justify-center">
                                    <Image 
                                        src="/can-buy-real-subs.png" 
                                        alt="Can I buy real YouTube subscribers" 
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </Animated>
                            <Animated delay={200}>
                                <div>
                                    <h2 className="section-heading !mb-6">
                                        Can I Buy Real YouTube Subscribers?
                                    </h2>
                                    <div className="space-y-6 section-desc">
                                        <p className="section-desc !text-left">
                                            Yes, you can buy real YouTube subscribers. At Vidfly, we use completely legitimate marketing strategies to promote your channel to actual users. This ensures that the subscribers you receive are real people, meaning they are completely safe and comply with YouTube's terms of service.
                                        </p>
                                        <p className="section-desc !text-left">
                                            Unlike fake bot subscribers that drop off quickly and risk your account's standing, real subscribers provide genuine engagement, higher watch retention on future videos, and long-term channel growth.
                                        </p>
                                    </div>
                                </div>
                            </Animated>
                        </div>
                    </div>
                </div>
            </section>

            {/* BENEFITS SECTION */}
            <section className="py-16 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-red-50 rounded-[2rem] p-8 md:p-12 shadow-sm border border-red-100">
                        <div className="grid lg:grid-cols-12 gap-12 items-start relative h-full">
                            <div className="lg:col-span-5 relative lg:sticky lg:top-32 h-fit">
                                <Animated delay={100}>
                                    <div className="relative h-[400px] w-full flex items-center justify-center bg-white rounded-2xl shadow-sm p-8">
                                        <Image 
                                            src="/benefits-subs.png" 
                                            alt="Benefits of buying YouTube subscribers" 
                                            fill
                                            className="object-contain p-6"
                                        />
                                    </div>
                                </Animated>
                            </div>
                            <Animated delay={200} className="lg:col-span-7">
                                <div>
                                    <h2 className="section-heading !mb-6">
                                        Benefits Of Buying YouTube Subscribers
                                    </h2>
                                    <p className="section-desc !mb-10">
                                        If you have a high number of subscribers on your channel, people are likely to trust your content and engage with it. Buying YouTube subscribers acts as a catalyst in building a solid and dedicated community.
                                    </p>
                                    
                                    <div className="space-y-8">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                                <div className="bg-red-200 p-1 rounded-full"><Check className="w-5 h-5 text-red-700" /></div>
                                                Social Proof And Authority
                                            </h3>
                                            <p className="section-desc !text-left ml-9">
                                                When people see a channel with a high subscriber count, they naturally assume it's popular and worth watching. This 'social proof' encourages organic viewers to click on your videos and subscribe, instantly boosting your authority.
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                                <div className="bg-red-200 p-1 rounded-full"><Check className="w-5 h-5 text-red-700" /></div>
                                                Improved YouTube Search Rankings
                                            </h3>
                                            <p className="section-desc !text-left ml-9">
                                                YouTube's algorithm favors channels that have a strong, active subscriber base. More subscribers signal to YouTube that your channel is valuable, which can push your videos higher in search results and recommendations.
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                                <div className="bg-red-200 p-1 rounded-full"><Check className="w-5 h-5 text-red-700" /></div>
                                                Higher Chances Of Gaining More Organic Traffic
                                            </h3>
                                            <p className="section-desc !text-left ml-9">
                                                As your channel climbs the search rankings, it becomes more visible to a broader audience. This increased visibility leads to a snowball effect, bringing in more organic views, likes, and subscribers.
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                                <div className="bg-red-200 p-1 rounded-full"><Check className="w-5 h-5 text-red-700" /></div>
                                                Monetization & Brand Deals
                                            </h3>
                                            <p className="section-desc !text-left ml-9">
                                                Reaching 1,000 subscribers is a key requirement for the YouTube Partner Program. Buying subscribers can help you get there faster. Additionally, brands look for channels with high subscriber counts for sponsorships and deals.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Animated>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ SECTION */}
            <section className="py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Animated delay={60}>
                        <div className="text-center mb-12">
                            <h2 className="section-heading !mb-4">
                                Frequently Asked Questions About Buying YouTube Subscribers
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
