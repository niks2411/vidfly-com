"use client";

import { useState, useEffect } from "react";
import { MoveRight, Share2, Facebook, Linkedin, Twitter, CheckCircle2, ArrowLeft, Calendar, Clock, BookOpen } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";

interface BlogSection {
    id: string;
    title: string;
    content: React.ReactNode;
}

interface BlogFAQ {
    question: string;
    answer: string;
}

interface BlogPost {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    readTime: string;
    date: string;
    sections: BlogSection[];
    faqs: BlogFAQ[];
}

const ARTICLES: BlogPost[] = [
    {
        id: "skyrocket-guide",
        title: "How to Skyrocket Your YouTube Channel: The Ultimate 2026 Guide",
        description: "YouTube is the world's second-largest search engine. For creators and brands in 2026, understanding the nuances of professional promotion is key to growth.",
        image: "/blog-image.webp",
        category: "Strategy",
        readTime: "8 min read",
        date: "March 15, 2026",
        sections: [
            {
                id: "why-video-marketing",
                title: "1. Why Video Marketing Matters in 2026",
                content: (
                    <>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            In a world of short-form attention spans, high-quality video content remains the gold standard for
                            brand trust. Vidflyy has helped over 50k+ creators realize that visibility isn't just about views—it's
                            about targeted engagement.
                        </p>
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-6">
                            <h4 className="font-bold mb-2">Key Takeaways:</h4>
                            <ul className="space-y-3">
                                <li className="flex gap-3 text-gray-700">
                                    <CheckCircle2 className="w-5 h-5 text-[#EE2B2E] shrink-0" />
                                    YouTube Music is the fastest growing streaming platform globally.
                                </li>
                                <li className="flex gap-3 text-gray-700">
                                    <CheckCircle2 className="w-5 h-5 text-[#EE2B2E] shrink-0" />
                                    Official Artist Channels (OAC) see 2x more organic growth.
                                </li>
                            </ul>
                        </div>
                    </>
                )
            },
            {
                id: "youtube-vs-others",
                title: "2. YouTube vs Instagram: Where to Focus?",
                content: (
                    <>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            One of YouTube's biggest advantages is its tight integration with Google Ads. While platforms like
                            TikTok are great for virality, YouTube provides sustained, long-term ROI. Your visual content feeds
                            into a recommendation network that powers discovery for years, not just hours.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            At Vidflyy, we prioritize Google Ads-driven promotion because it guarantees that your video reaches
                            real, interested viewers who actually want to consume your content.
                        </p>
                    </>
                )
            },
            {
                id: "monetization-strategies",
                title: "3. Advanced Monetization Strategies",
                content: (
                    <>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            YouTube Music gives emerging artists more chances to be discovered than Spotify or Apple Music.
                            By leveraging Vidflyy's promotion tools, you can cross-promote your music and video content
                            simultaneously—a unique advantage over audio-only platforms.
                        </p>
                    </>
                )
            },
            {
                id: "audience-retention",
                title: "4. Mastering Audience Retention",
                content: (
                    <>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            The first 30 seconds of your video are crucial. We analyzed over 10,000 successful Vidflyy campaigns
                            and found that creators who use high-impact hooks combined with professional thumbnails have a
                            45% higher retention rate.
                        </p>
                    </>
                )
            },
            {
                id: "seo-optimization",
                title: "5. YouTube SEO Growth Checklist",
                content: (
                    <>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            SEO isn't just for blogs. Your video titles, descriptions, and tags are the metadata that tells
                            the algorithm who to show your content to.
                        </p>
                        <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-6">
                            <li>Use primary keywords in the first 2 lines of the description.</li>
                            <li>Incorporate LSI (Latent Semantic Indexing) keywords in your tags.</li>
                            <li>Enable closed captions for better indexing.</li>
                        </ul>
                    </>
                )
            },
            {
                id: "conclusion",
                title: "Conclusion",
                content: (
                    <>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            Success on YouTube requires a combination of great content and strategic promotion. With Vidflyy,
                            you're not just buying views; you're building a community.
                        </p>
                    </>
                )
            }
        ],
        faqs: [
            {
                question: "How long before I see results?",
                answer: "Most campaigns show significant impact within 24-48 hours of launch."
            },
            {
                question: "Is the growth organic?",
                answer: "We use Google Ads to put your video in front of real people, leading to organic engagement and subscribers."
            }
        ]
    },
    {
        id: "youtube-monetization-2026",
        title: "Youtube Monetization Requirements 2026: 1,000 Subscribers, Watch Hours & More",
        description: "Unlocking YouTube monetization requires meeting specific eligibility criteria. Here is a full guide to the updated 2026 subscriber, watch hours, and Shorts requirements.",
        image: "/blogg.png",
        category: "Monetization",
        readTime: "10 min read",
        date: "May 28, 2026",
        sections: [
            {
                id: "intro",
                title: "Understanding YouTube Monetization",
                content: (
                    <>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            Every day, thousands of creators upload videos to YouTube with the goal of growing an audience and earning money from their content. But before you can start generating revenue, you need to understand the YouTube monetization requirements in 2026.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            Here's a staggering fact: <strong>YouTube paid creators over $20 billion in 2025</strong> - more than most countries' GDPs (SQ Magazine). That's the power of the platform, but unlocking these earnings requires meeting specific eligibility criteria.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            YouTube monetization allows creators to earn through ads, channel memberships, Super Chats, Super Thanks, YouTube Shopping, and other revenue streams. These features are available through the YouTube Partner Program (YPP), which creators can join after meeting specific eligibility requirements.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            In recent years, YouTube has introduced lower entry-level monetization thresholds and expanded opportunities for Shorts creators. While these changes have made monetization more accessible, they have also created confusion around subscriber requirements, watch hours, Shorts views, and eligibility criteria.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            In this guide, we'll explain the latest YouTube monetization requirements for 2026 and show you exactly what it takes to qualify for the YouTube Partner Program. If you're looking to grow your audience faster, explore our <a href="/get-started" className="text-[#EE2B2E] font-bold hover:underline">YouTube promotion services</a> to support your channel's growth journey.
                        </p>
                    </>
                )
            },
            {
                id: "what-are-requirements",
                title: "1. What are the Youtube Monetization Requirements in 2026?",
                content: (
                    <>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            If your goal is to earn money from Youtube ads, you'll need to qualify for the Youtube Partner Program (YPP). This is Youtube's official program that gives creators access to ad revenue and other monetization features.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-6 font-semibold">
                            To become eligible for full ad revenue sharing in 2026, creators must meet one of the following requirements:
                        </p>
                        <div className="bg-[#EE2B2E]/5 border-l-4 border-[#EE2B2E] p-6 rounded-r-2xl mb-8 space-y-4">
                            <h4 className="font-extrabold text-gray-900">Standard Youtube Partner Program Requirements</h4>
                            <div>
                                <h5 className="font-bold text-gray-800 text-[15px]">Option 1: Long-Form Content</h5>
                                <p className="text-sm text-gray-600 mb-2">If you primarily create traditional Youtube videos, you'll need:</p>
                                <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
                                    <li><strong>1,000 subscribers</strong></li>
                                    <li><strong>4,000 valid public watch hours</strong> within the last 12 months</li>
                                </ul>
                                <p className="text-xs text-gray-500 mt-2">Note: Public watch hours only include watch time from public videos. Views from private, unlisted, or deleted videos do not count toward this requirement.</p>
                            </div>
                            <hr className="border-gray-200" />
                            <div>
                                <h5 className="font-bold text-gray-800 text-[15px]">Option 2: Youtube Shorts</h5>
                                <p className="text-sm text-gray-600 mb-2">If you focus on short-form content, you can qualify through Shorts performance instead of watch hours. You'll need:</p>
                                <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
                                    <li><strong>1,000 subscribers</strong></li>
                                    <li><strong>10 million valid public Shorts views</strong> within the last 90 days</li>
                                </ul>
                                <p className="text-xs text-gray-500 mt-2">This option was introduced to give Shorts creators a dedicated path to monetization without relying on long-form video watch time.</p>
                            </div>
                        </div>
                        <h4 className="font-bold text-gray-900 text-lg mb-3">Which Requirement Should You Follow?</h4>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            The right path depends on your content strategy. Creators who publish tutorials, reviews, vlogs, or educational content often find it easier to reach 4,000 watch hours. Meanwhile, creators producing viral and highly shareable Shorts may achieve monetization faster through the 10-million-view route.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            Once you meet either requirement and comply with Youtube's monetization policies, you can apply for the Youtube Partner Program and unlock ad revenue sharing along with other monetization opportunities.
                        </p>
                    </>
                )
            },
            {
                id: "entry-level-monetization",
                title: "2. New Entry-Level Monetization Requirements",
                content: (
                    <>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            Many creators assume they need 1,000 subscribers before they can earn anything on Youtube. However, that's no longer the case. To support smaller channels, Youtube introduced an expanded monetization tier that allows creators to access certain earning features before qualifying for full ad revenue sharing.
                        </p>
                        <h4 className="font-bold text-gray-900 text-lg mb-3">Can You Get Monetized with 500 Subscribers?</h4>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            Yes. Creators can apply for Youtube's entry-level monetization program if they meet the following requirements:
                        </p>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6 font-semibold">
                            <li>500 subscribers</li>
                            <li>3 public uploads in the last 90 days</li>
                            <li>And one of these conditions:
                                <ul className="list-circle pl-6 font-medium mt-1 space-y-1">
                                    <li>3,000 public watch hours in the last 12 months</li>
                                    <li>3 million valid public Shorts views in the last 90 days</li>
                                </ul>
                            </li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            This lower threshold gives growing creators an opportunity to start earning and building a community before reaching the standard Youtube Partner Program requirements.
                        </p>
                    </>
                )
            },
            {
                id: "features-available",
                title: "3. Features Available at This Level",
                content: (
                    <>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            While you won't receive ad revenue sharing at this stage, you can still unlock several monetization tools, including:
                        </p>
                        <ul className="list-disc pl-6 text-gray-700 space-y-3 mb-6">
                            <li><strong>Channel Memberships</strong> - Offer exclusive perks and content to paying subscribers.</li>
                            <li><strong>Super Thanks</strong> - Allow viewers to support your videos with one-time payments.</li>
                            <li><strong>Super Chat</strong> - Earn money from highlighted messages during live streams.</li>
                            <li><strong>Super Stickers</strong> - Let fans purchase animated stickers during live chats.</li>
                            <li><strong>Youtube Shopping</strong> - Promote and sell eligible products directly through your channel.</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            For many creators, these features provide their first opportunity to generate income on Youtube. They also help build a loyal audience while working toward the full monetization milestone of 1,000 subscribers and ad revenue eligibility.
                        </p>
                    </>
                )
            },
            {
                id: "ypp-explained",
                title: "4. Youtube Partner Program (YPP) Explained",
                content: (
                    <>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            The Youtube Partner Program (YPP) is Youtube's official monetization program that allows creators to earn money from their content. Once your channel meets Youtube's eligibility requirements and follows its monetization policies, you can apply to join the program and unlock various revenue opportunities.
                        </p>
                        <h4 className="font-bold text-gray-900 text-lg mb-3">Benefits of Joining YPP</h4>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            Joining the Youtube Partner Program gives creators access to multiple income streams, including:
                        </p>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                            <li><strong>Ad Revenue</strong> - Earn money from ads displayed on your videos.</li>
                            <li><strong>Channel Memberships</strong> - Offer exclusive content and perks to paying members.</li>
                            <li><strong>Fan Funding</strong> - Receive support through Super Chat, Super Stickers, and Super Thanks.</li>
                            <li><strong>Merchandise Shelf</strong> - Promote and sell products directly on your channel.</li>
                            <li><strong>Brand Collaborations</strong> - Increase opportunities for sponsorships and partnerships.</li>
                        </ul>
                        <h4 className="font-bold text-gray-900 text-lg mb-3">Countries Eligible for Monetization</h4>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            The Youtube Partner Program is available in many countries and regions worldwide. To apply for monetization, your channel must be based in a country where YPP is supported. Before applying, check Youtube's latest list of eligible countries to confirm availability in your region.
                        </p>
                    </>
                )
            },
            {
                id: "watch-hours-vs-shorts",
                title: "5. Watch Hours vs Shorts Views: Which Path is Easier?",
                content: (
                    <>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            To qualify for full Youtube monetization, creators can choose between two paths: public watch hours or Shorts views. Both require 1,000 subscribers, but the performance requirements differ.
                        </p>
                        <h4 className="font-bold text-gray-900 text-[17px] mb-2">Understanding Public Watch Hours</h4>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            Creators who focus on long-form videos must achieve 4,000 valid public watch hours within the last 12 months.
                        </p>
                        <h4 className="font-bold text-gray-900 text-[17px] mb-2">Understanding Shorts Views</h4>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            Creators who primarily publish Shorts can qualify with 10 million valid public Shorts views within the last 90 days.
                        </p>
                        <h4 className="font-bold text-gray-900 text-[17px] mb-2">Which Route Should New Creators Choose?</h4>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            For most new creators, reaching 4,000 watch hours is often more realistic than generating 10 million Shorts views. However, if your Shorts consistently attract high engagement and viral reach, the Shorts path may help you qualify faster.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            For example, a creator who uploads two tutorial videos each week and averages 1,000 views per video with an 8-minute watch time can gradually build the 4,000 watch hours needed for monetization. On the other hand, a Shorts creator who publishes three Shorts daily and occasionally has a video go viral with millions of views may reach the 10-million-view requirement much faster.
                        </p>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            The best option is to focus on the content format that aligns with your strengths, audience preferences, and long-term content strategy.
                        </p>
                    </>
                )
            },
            {
                id: "how-to-apply",
                title: "6. How to Apply for Youtube Monetization?",
                content: (
                    <>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            Once you've met Youtube's monetization requirements, you can apply for the Youtube Partner Program directly through Youtube Studio.
                        </p>
                        <div className="space-y-4 mb-6">
                            <p className="text-gray-700"><strong>Step 1: Meet Eligibility Requirements</strong> - Make sure your channel meets the required subscriber, watch hour, or Shorts view thresholds and follows Youtube's monetization policies.</p>
                            <p className="text-gray-700"><strong>Step 2: Enable Two-Step Verification</strong> - Youtube requires creators to enable two-step verification on their Google account for added security.</p>
                            <p className="text-gray-700"><strong>Step 3: Connect an AdSense Account</strong> - Create or link an existing Google AdSense account to receive payments from Youtube.</p>
                            <p className="text-gray-700"><strong>Step 4: Submit Your Application</strong> - Go to the Earn section in Youtube Studio and submit your application for the Youtube Partner Program.</p>
                            <p className="text-gray-700"><strong>Step 5: Wait for Youtube Review</strong> - Youtube will review your channel to ensure it complies with its policies and guidelines. Once approved, you'll gain access to eligible monetization features and can start earning from your content.</p>
                        </div>
                    </>
                )
            },
            {
                id: "monetization-policies",
                title: "7. Youtube Monetization Policies You Must Follow",
                content: (
                    <>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            Meeting the subscriber and watch-time requirements isn't enough. To stay monetized, your channel must also comply with Youtube's content and monetization policies.
                        </p>
                        <ul className="space-y-4 text-gray-700 mb-6">
                            <li><strong>Community Guidelines:</strong> Your content must follow Youtube's Community Guidelines and avoid spam, harmful, misleading, or prohibited content.</li>
                            <li><strong>Copyright Rules:</strong> Only use content that you own or have permission to use. Repeated copyright violations can impact your monetization eligibility.</li>
                            <li><strong>Reused Content Policy:</strong> Channels that heavily reuse content from other creators without adding significant original value may be denied monetization.</li>
                            <li><strong>AI-Generated Content Rules:</strong> AI-generated content can be monetized, but it must provide original value and comply with Youtube's policies. Simply publishing mass-produced or low-quality AI content may put monetization at risk.</li>
                            <li><strong>Advertiser-Friendly Content Guidelines:</strong> Since advertisers fund much of Youtube's revenue, your videos should be suitable for advertisers. Content containing excessive violence, hate speech, or inappropriate material may receive limited or no ads.</li>
                        </ul>
                    </>
                )
            },
            {
                id: "rejection-reasons",
                title: "8. Common Reasons Youtube Monetization Gets Rejected",
                content: (
                    <>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            Many creators meet the subscriber and watch-hour requirements but still get rejected during the review process. Here are some of the most common reasons:
                        </p>
                        <ul className="list-disc pl-6 space-y-3 text-gray-700 mb-6">
                            <li><strong>Reused Content:</strong> Using videos from other creators with little or no original commentary, editing, or added value can lead to rejection.</li>
                            <li><strong>Copyright Strikes:</strong> Channels with copyright violations or unauthorized use of music, videos, or images may not qualify for monetization.</li>
                            <li><strong>Fake Engagement:</strong> Buying subscribers, views, watch hours, or using artificial engagement tactics violates Youtube's policies.</li>
                            <li><strong>Misleading Metadata:</strong> Clickbait titles, deceptive thumbnails, and misleading descriptions can negatively impact monetization approval.</li>
                            <li><strong>Spam Content:</strong> Uploading repetitive, low-quality, or mass-produced content may be considered spam and can result in rejection.</li>
                            <li><strong>Community Guideline Violations:</strong> Channels that repeatedly violate Youtube's Community Guidelines may lose monetization eligibility or face account restrictions.</li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed">
                            Before applying, review your channel carefully and ensure your content follows Youtube's monetization and community standards.
                        </p>
                    </>
                )
            },
            {
                id: "approval-time",
                title: "9. How Long Does Youtube Monetization Approval Take?",
                content: (
                    <>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            After you submit your application, Youtube reviews your channel to ensure it follows all monetization policies.
                        </p>
                        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                            <li><strong>Typical Review Time</strong> - Most channels are reviewed within a few days, although some reviews may take several weeks.</li>
                            <li><strong>Delays Creators May Experience</strong> - Reviews can take longer if your channel requires additional policy checks or has a large content library.</li>
                            <li><strong>What Happens After Approval?</strong> Once approved, you'll gain access to monetization features and can start earning through eligible revenue streams.</li>
                        </ul>
                    </>
                )
            },
            {
                id: "money-potential",
                title: "10. How Much Money Can You Make After Monetization?",
                content: (
                    <>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            Your earnings depend on your niche, audience, views, and engagement. There is no guaranteed income. Most successful creators earn from multiple income sources rather than relying on ads alone.
                        </p>
                        <h4 className="font-bold text-gray-900 text-lg mb-4">Example Earnings Breakdown</h4>
                        <div className="overflow-x-auto mb-6">
                            <table className="w-full text-left border-collapse text-[15px] border border-gray-200">
                                <thead>
                                    <tr className="bg-gray-100 border-b border-gray-200">
                                        <th className="p-3 font-bold text-gray-900">Revenue Source</th>
                                        <th className="p-3 font-bold text-gray-900">Potential Earnings</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-200">
                                        <td className="p-3 font-semibold text-gray-800">AdSense</td>
                                        <td className="p-3 text-gray-600">Based on views and niche</td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <td className="p-3 font-semibold text-gray-800">Channel Memberships</td>
                                        <td className="p-3 text-gray-600">Monthly recurring income</td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <td className="p-3 font-semibold text-gray-800">Super Chats & Super Thanks</td>
                                        <td className="p-3 text-gray-600">Viewer contributions</td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <td className="p-3 font-semibold text-gray-800">Affiliate Marketing</td>
                                        <td className="p-3 text-gray-600">Commission-based earnings</td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <td className="p-3 font-semibold text-gray-800">Sponsorships</td>
                                        <td className="p-3 text-gray-600">Brand partnership payments</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>
                )
            },
            {
                id: "tips-faster",
                title: "11. Tips to Reach 1,000 Subscribers Faster",
                content: (
                    <>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            Growing your first 1,000 subscribers takes time, but the right strategy can help you get there faster.
                        </p>
                        <ul className="space-y-4 text-gray-700 mb-6">
                            <li><strong>Create Content Around Searchable Topics:</strong> Focus on topics people are actively searching for to increase your chances of getting discovered. Combining high-quality content with effective <a href="/get-started" className="text-[#EE2B2E] font-bold hover:underline">YouTube channel promotion</a> can help you reach new viewers and grow faster.</li>
                            <li><strong>Use Youtube Shorts Strategically:</strong> Shorts can help you reach new audiences and gain subscribers quickly. For artists and musicians, <a href="/youtube-music-promotion" className="text-[#EE2B2E] font-bold hover:underline">YouTube music promotion</a> can help increase visibility, attract subscribers, and drive more views to new releases.</li>
                            <li><strong>Improve Click-Through Rate (CTR):</strong> Use compelling titles and eye-catching thumbnails to encourage more clicks.</li>
                            <li><strong>Focus on Audience Retention:</strong> Keep viewers engaged throughout your videos to increase watch time and improve recommendations.</li>
                            <li><strong>Maintain a Consistent Upload Schedule:</strong> Posting regularly helps build audience trust and keeps your channel active.</li>
                        </ul>
                    </>
                )
            },
            {
                id: "different-channels",
                title: "12. Youtube Monetization Requirements for Different Channel Types",
                content: (
                    <>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            The good news is that Youtube applies the same monetization requirements to all channel types. However, the path to reaching those requirements may differ.
                        </p>
                        <div className="overflow-x-auto mb-6">
                            <table className="w-full text-left border-collapse text-[15px] border border-gray-200">
                                <thead>
                                    <tr className="bg-gray-100 border-b border-gray-200">
                                        <th className="p-3 font-bold text-gray-900">Channel Type</th>
                                        <th className="p-3 font-bold text-gray-900">How They Typically Reach Monetization</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-200">
                                        <td className="p-3 font-semibold text-gray-800">Gaming Channels</td>
                                        <td className="p-3 text-gray-600">Gaming creators often achieve monetization through long watch times generated from gameplay videos, tutorials, walkthroughs, and live streams.</td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <td className="p-3 font-semibold text-gray-800">Educational Channels</td>
                                        <td className="p-3 text-gray-600">Educational content tends to generate strong watch hours because viewers often watch lessons, guides, and tutorials from start to finish.</td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <td className="p-3 font-semibold text-gray-800">Vlogging Channels</td>
                                        <td className="p-3 text-gray-600">Vloggers can grow their audience and reach monetization through consistent uploads, engaging storytelling, and building a loyal community.</td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <td className="p-3 font-semibold text-gray-800">Faceless YouTube Channels</td>
                                        <td className="p-3 text-gray-600">Faceless channels can be monetized as long as the content is original, provides value to viewers, and complies with YouTube's monetization policies.</td>
                                    </tr>
                                    <tr className="border-b border-gray-200">
                                        <td className="p-3 font-semibold text-gray-800">AI Content Channels</td>
                                        <td className="p-3 text-gray-600">AI-generated content is eligible for monetization when it includes meaningful original input, human oversight, and follows YouTube's content guidelines.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </>
                )
            },
            {
                id: "monetization-checklist",
                title: "13. Youtube Monetization Checklist for 2026",
                content: (
                    <>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            Before applying for the Youtube Partner Program, make sure you:
                        </p>
                        <ul className="space-y-3 mb-6">
                            <li className="flex gap-3 text-gray-700 font-semibold">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> Reach the subscriber requirement
                            </li>
                            <li className="flex gap-3 text-gray-700 font-semibold">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> Meet the watch hours or Shorts views requirement
                            </li>
                            <li className="flex gap-3 text-gray-700 font-semibold">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> Follow Youtube's monetization policies
                            </li>
                            <li className="flex gap-3 text-gray-700 font-semibold">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> Enable two-factor authentication
                            </li>
                            <li className="flex gap-3 text-gray-700 font-semibold">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> Link your AdSense account
                            </li>
                            <li className="flex gap-3 text-gray-700 font-semibold">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> Submit your YPP application
                            </li>
                            <li className="flex gap-3 text-gray-700 font-semibold">
                                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> Keep your channel active
                            </li>
                        </ul>
                        <p className="text-gray-700 leading-relaxed">
                            Completing this checklist will help improve your chances of a successful monetization approval.
                        </p>
                    </>
                )
            }
        ],
        faqs: [
            {
                question: "How many subscribers do I need for Youtube monetization in 2026?",
                answer: "You need 1,000 subscribers for full Youtube monetization and ad revenue sharing. However, some monetization features are available starting at 500 subscribers if you meet additional eligibility requirements."
            },
            {
                question: "Can I monetize Youtube Shorts?",
                answer: "Yes. You can qualify for monetization through Shorts by reaching 1,000 subscribers and 10 million valid public Shorts views within the last 90 days."
            },
            {
                question: "Can I monetize AI-generated videos?",
                answer: "Yes, AI-generated content can be monetized as long as it is original, provides value to viewers, and complies with Youtube's monetization policies."
            },
            {
                question: "Do deleted videos affect watch hours?",
                answer: "Yes. If a video is deleted, any watch hours generated from that video may no longer count toward your monetization requirements."
            },
            {
                question: "How often should I upload videos?",
                answer: "There is no fixed requirement, but uploading consistently helps grow your audience and keeps your channel active."
            },
            {
                question: "What happens if my monetization application is rejected?",
                answer: "Youtube will explain the reason for the rejection. After addressing the issue, you can usually reapply after the specified waiting period."
            },
            {
                question: "How long does Youtube monetization review take?",
                answer: "Most applications are reviewed within a few days, but some may take several weeks depending on the review process."
            }
        ]
    }
];

export default function Blog() {
    const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState("");

    const currentArticle = ARTICLES.find((a) => a.id === selectedArticleId);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        if (!selectedArticleId || !currentArticle) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.3, rootMargin: "-100px 0px -40% 0px" }
        );

        currentArticle.sections.forEach((section) => {
            const element = document.getElementById(section.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [selectedArticleId, currentArticle]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
            setActiveSection(id);
        }
    };

    const handleBack = () => {
        setSelectedArticleId(null);
        window.scrollTo({ top: 0, behavior: "instant" });
    };

    const handleSelectArticle = (id: string) => {
        setSelectedArticleId(id);
        if (ARTICLES.find((a) => a.id === id)?.sections.length) {
            setActiveSection(ARTICLES.find((a) => a.id === id)!.sections[0].id);
        }
        window.scrollTo({ top: 0, behavior: "instant" });
    };

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-founders">
            {/* Progress Bar (Visible only when reading an article) */}
            {selectedArticleId && (
                <motion.div
                    className="fixed top-0 left-0 right-0 h-1 bg-[#EE2B2E] z-50 origin-left"
                    style={{ scaleX }}
                />
            )}

            <main className="max-w-7xl mx-auto px-4 pt-10 md:pt-12 pb-20">
                {!selectedArticleId ? (
                    /* Blog Listing Index Page */
                    <div>
                        <div className="mb-16 text-center flex flex-col items-center justify-center">
                            <h1 className="section-heading text-center !mb-6">
                                Vidflyy <span className="text-[#EE2B2E]">Blog</span>
                            </h1>
                            <p className="section-desc text-center !mx-auto max-w-3xl">
                                Discover actionable insights, guide updates, and expert tips to master the YouTube algorithm and scale your channel's revenue.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {ARTICLES.map((article) => (
                                <div
                                    key={article.id}
                                    onClick={() => handleSelectArticle(article.id)}
                                    className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col group hover:scale-[1.01]"
                                >
                                    <div className="aspect-[16/9] w-full relative overflow-hidden bg-gray-50">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <span className="absolute top-4 left-4 bg-[#EE2B2E] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                                            {article.category}
                                        </span>
                                    </div>
                                    <div className="p-8 flex-grow flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-4 text-xs font-bold text-gray-400 mb-4 uppercase tracking-wider">
                                                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {article.date}</span>
                                                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {article.readTime}</span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-[#1A1A1A] mb-3 group-hover:text-[#EE2B2E] transition-colors leading-tight">
                                                {article.title}
                                            </h3>
                                            <p className="text-gray-500 text-[15px] leading-relaxed mb-6">
                                                {article.description}
                                            </p>
                                        </div>
                                        <div className="flex items-center text-[#EE2B2E] font-bold gap-2 text-sm uppercase tracking-wider mt-auto">
                                            Read Article <MoveRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    /* Detailed Blog View Page */
                    <div>
                        {/* Back navigation */}
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold mb-10 transition-colors group text-sm uppercase tracking-wider"
                        >
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Blog
                        </button>

                        <header className="mb-12">
                            <div className="flex items-center gap-4 text-sm font-bold text-gray-500 mb-6 uppercase tracking-wider">
                                <span className="text-[#EE2B2E]">{currentArticle?.category}</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {currentArticle?.date}</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {currentArticle?.readTime}</span>
                            </div>

                            <h1 className="text-3xl md:text-5xl font-black text-[#1A1A1A] leading-tight mb-8 tracking-tight max-w-5xl">
                                {currentArticle?.title}
                            </h1>

                            <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl mb-12 bg-gray-100 max-h-[500px]">
                                <img
                                    src={currentArticle?.image}
                                    alt={currentArticle?.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </header>

                        <div className="flex flex-col lg:flex-row gap-12 items-start relative">

                            {/* Left Sidebar - Table of Contents */}
                            <aside className="hidden lg:block w-72 sticky top-28 space-y-3">
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-4 mb-4 flex items-center gap-2">
                                    <BookOpen className="w-4 h-4" /> Table of Contents
                                </div>
                                {currentArticle?.sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => scrollToSection(section.id)}
                                        className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 border-l-4 ${activeSection === section.id
                                            ? "bg-[#EE2B2E]/5 border-[#EE2B2E] text-[#EE2B2E] font-bold"
                                            : "bg-transparent border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                                            }`}
                                    >
                                        <span className="text-sm">{section.title}</span>
                                    </button>
                                ))}
                            </aside>

                            {/* Main Content Area */}
                            <article className="flex-1 max-w-3xl">
                                <div className="prose prose-lg prose-red max-w-none">
                                    {currentArticle?.sections.map((section) => (
                                        <div key={section.id} id={section.id} className="mb-16 scroll-mt-28">
                                            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6 leading-tight border-b border-gray-100 pb-3">
                                                {section.title}
                                            </h2>
                                            <div className="text-gray-700 leading-relaxed font-medium">
                                                {section.content}
                                            </div>
                                        </div>
                                    ))}

                                    {/* FAQs Section */}
                                    {currentArticle && currentArticle.faqs.length > 0 && (
                                        <div id="faqs" className="mb-16 scroll-mt-28">
                                            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8 leading-tight border-b border-gray-100 pb-3">
                                                Frequently Asked Questions
                                            </h2>
                                            <div className="space-y-6">
                                                {currentArticle.faqs.map((faq, index) => (
                                                    <div key={index} className="border-b border-gray-100 pb-6 last:border-b-0">
                                                        <h4 className="font-extrabold text-lg text-gray-900 mb-2.5">
                                                            {faq.question}
                                                        </h4>
                                                        <p className="text-gray-600 text-sm font-semibold leading-relaxed">
                                                            {faq.answer}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </article>

                            {/* Right Sidebar - CTA / Ads */}
                            <aside className="w-full lg:w-80 sticky top-28 space-y-6">
                                <div className="bg-[#1A1A1A] p-8 rounded-3xl text-white relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#EE2B2E] blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity" />
                                    <h3 className="text-2xl font-bold mb-4 relative z-10 leading-tight">Ready to grow your channel?</h3>
                                    <p className="text-gray-400 mb-8 text-sm relative z-10 font-medium">Start your YouTube promotion today and reach millions of targeted viewers.</p>
                                    <a
                                        href="/get-started"
                                        className="flex items-center justify-between w-full px-6 py-4 bg-[#EE2B2E] text-white rounded-xl font-bold hover:bg-[#d41c1f] transition-all group/btn"
                                    >
                                        Promote Now
                                        <MoveRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                    </a>
                                </div>

                                <div className="p-6 rounded-3xl border border-gray-100 bg-white">
                                    <h4 className="font-bold text-gray-900 mb-4 text-center">Share this article</h4>
                                    <div className="flex justify-center gap-4">
                                        <button className="p-3 bg-gray-50 rounded-full hover:bg-[#EE2B2E]/10 hover:text-[#EE2B2E] transition-colors">
                                            <Facebook className="w-5 h-5" />
                                        </button>
                                        <button className="p-3 bg-gray-50 rounded-full hover:bg-[#EE2B2E]/10 hover:text-[#EE2B2E] transition-colors">
                                            <Twitter className="w-5 h-5" />
                                        </button>
                                        <button className="p-3 bg-gray-50 rounded-full hover:bg-[#EE2B2E]/10 hover:text-[#EE2B2E] transition-colors">
                                            <Linkedin className="w-5 h-5" />
                                        </button>
                                        <button className="p-3 bg-gray-50 rounded-full hover:bg-[#EE2B2E]/10 hover:text-[#EE2B2E] transition-colors">
                                            <Share2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </aside>

                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
