"use client";

import Script from "next/script";
import { useId } from "react";

export const OrganizationSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Vidflyy",
        "url": "https://www.vidflyy.com",
        "logo": "https://www.vidflyy.com/_next/image?url=%2Flovable-uploads%2F0b27d722-c6a7-47e3-ae7d-aeb8461db170.png&w=256&q=75",
        "image": "https://www.vidflyy.com/_next/image?url=%2Fright%20image.png&w=1920&q=75",
        "description": "Vidflyy is a digital YouTube promotion platform that helps creators, brands, influencers, and businesses grow their YouTube presence through targeted Google Ads-powered campaigns. The platform focuses on improving video visibility, increasing real audience engagement, and supporting long-term channel growth through performance-driven marketing strategies.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "3rd Floor, SCO-40, Janta Nagar",
            "addressLocality": "Sahibzada Ajit Singh Nagar, Kharar",
            "addressRegion": "Punjab",
            "postalCode": "160062",
            "addressCountry": "IN"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91 7355518761",
            "email": "support@vidflyy.com",
            "contactType": "customer support",
            "availableLanguage": ["English", "Hindi"]
        },
        "sameAs": [
            "https://in.linkedin.com/company/vidflyy",
            "https://www.instagram.com/vidflyy/",
            "https://www.facebook.com/Vidflyy/"
        ]
    };

    return (
        <Script
            id="organization-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

export const ServiceSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "YouTube Video Promotion",
        "provider": {
            "@type": "Organization",
            "name": "Vidflyy"
        },
        "areaServed": "Worldwide",
        "description": "Professional YouTube growth campaigns to increase views, subscribers, and engagement using targeted Google Ads."
    };

    return (
        <Script
            id="service-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

export const FAQSchema = ({ items }: { items: { question: string; answer: string }[] }) => {
    const reactId = useId();
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": items.map((item) => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.answer,
            },
        })),
    };

    return (
        <Script
            id={`faq-schema${reactId.replace(/:/g, "-")}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

export const HomeSoftwareApplicationSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Vidflyy",
        "url": "https://www.vidflyy.com",
        "image": "https://www.vidflyy.com/_next/image?url=%2Fright%20image.png&w=1920&q=75",
        "screenshot": "https://www.vidflyy.com/_next/image?url=%2Fright%20image.png&w=1920&q=75",
        "applicationCategory": "MarketingApplication",
        "applicationSubCategory": "YouTube Promotion Platform",
        "operatingSystem": "Web Browser",
        "description": "Vidflyy is a web-based YouTube promotion and channel growth platform that helps creators, influencers, businesses, musicians, educators, and brands reach targeted audiences through Google Ads-powered campaigns. Users can promote YouTube videos, increase channel visibility, gain real views, attract engaged subscribers, improve audience retention, and track campaign performance through an easy-to-use dashboard. The platform focuses on connecting content with relevant viewers through strategic audience targeting and transparent promotional methods designed to support sustainable YouTube channel growth.",
        "keywords": [
            "YouTube promotion",
            "YouTube video promotion",
            "YouTube channel growth",
            "YouTube marketing",
            "YouTube advertising",
            "Google Ads YouTube promotion",
            "real YouTube views",
            "YouTube subscribers",
            "video marketing platform",
            "YouTube growth service",
            "creator marketing platform",
            "YouTube audience targeting",
            "YouTube engagement growth",
            "video promotion platform",
            "YouTube campaign management"
        ],
        "featureList": [
            "YouTube Video Promotion",
            "YouTube Channel Growth",
            "Google Ads Campaign Management",
            "Real Audience Targeting",
            "Subscriber Growth Campaigns",
            "Video Engagement Promotion",
            "Campaign Analytics",
            "Performance Tracking Dashboard",
            "YouTube Shorts Promotion",
            "Audience Reach Optimization",
            "Creator Growth Tools",
            "Marketing Performance Insights"
        ],
        "sameAs": [
            "https://in.linkedin.com/company/vidflyy",
            "https://www.instagram.com/vidflyy/",
            "https://www.facebook.com/Vidflyy/"
        ],
        "offers": {
            "@type": "Offer",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock"
        }
    };

    return (
        <Script
            id="home-software-application-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

export const YoutubeMusicPromotionSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Vidflyy YouTube Music Promotion",
        "url": "https://www.vidflyy.com/youtube-music-promotion",
        "image": "https://www.vidflyy.com/_next/image?url=%2Fright%20image.png&w=1920&q=75",
        "applicationCategory": "MarketingApplication",
        "applicationSubCategory": "YouTube Music Promotion Platform",
        "operatingSystem": "Web Browser",
        "description": "Vidflyy YouTube Music Promotion helps musicians, singers, independent artists, bands, music labels, and content creators promote their music videos on YouTube through Google Ads-powered campaigns. The platform enables artists to reach listeners interested in specific music genres, increase video views, grow channel subscribers, improve audience engagement, and expand their fan base through targeted YouTube advertising and transparent campaign management.",
        "keywords": [
            "YouTube music promotion",
            "music video promotion",
            "promote music on YouTube",
            "YouTube promotion for musicians",
            "YouTube music marketing",
            "music artist promotion",
            "music video advertising",
            "YouTube ads for music videos",
            "grow music channel",
            "independent artist promotion",
            "music audience targeting",
            "YouTube subscriber growth for musicians",
            "YouTube views for music videos",
            "music marketing platform",
            "music video campaign management"
        ],
        "featureList": [
            "YouTube Music Video Promotion",
            "Music Audience Targeting",
            "Google Ads Campaign Management",
            "Real Music Fans Reach",
            "Music Channel Growth",
            "Subscriber Acquisition",
            "Video Engagement Campaigns",
            "Genre-Based Audience Targeting",
            "Performance Analytics",
            "Campaign Tracking Dashboard",
            "YouTube Shorts Music Promotion",
            "Artist Growth Tools"
        ],
        "sameAs": [
            "https://in.linkedin.com/company/vidflyy",
            "https://www.instagram.com/vidflyy/",
            "https://www.facebook.com/Vidflyy/"
        ],
        "offers": {
            "@type": "Offer",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock"
        }
    };

    return (
        <Script
            id="youtube-music-promotion-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

export const YoutubeGamingPromotionSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Vidflyy YouTube Gaming Promotion",
        "url": "https://www.vidflyy.com/youtube-gaming-promotion",
        "image": "https://www.vidflyy.com/_next/image?url=%2Fright%20image.png&w=1920&q=75",
        "screenshot": "https://www.vidflyy.com/_next/image?url=%2Fright%20image.png&w=1920&q=75",
        "applicationCategory": "MarketingApplication",
        "applicationSubCategory": "YouTube Gaming Promotion Platform",
        "operatingSystem": "Web Browser",
        "description": "Vidflyy YouTube Gaming Promotion helps gaming creators, streamers, esports players, walkthrough channels, mobile gamers, PC gaming creators, and gaming influencers grow their audience through Google Ads-powered YouTube promotion campaigns. The platform enables gaming channels to reach targeted viewers, increase video views, gain engaged subscribers, improve watch time, and expand their gaming community using audience-focused advertising and transparent campaign management.",
        "keywords": [
            "YouTube gaming promotion",
            "gaming channel promotion",
            "YouTube gaming marketing",
            "gaming video promotion",
            "promote gaming videos",
            "YouTube promotion for gamers",
            "gaming content promotion",
            "gaming channel growth",
            "YouTube gaming ads",
            "gaming audience targeting",
            "esports channel promotion",
            "gaming subscriber growth",
            "gaming video marketing",
            "YouTube gaming campaign",
            "gaming creator promotion"
        ],
        "featureList": [
            "Gaming Video Promotion",
            "Gaming Channel Growth",
            "Google Ads Campaign Management",
            "Gaming Audience Targeting",
            "Real Viewer Acquisition",
            "Subscriber Growth Campaigns",
            "Watch Time Optimization",
            "Video Engagement Promotion",
            "Gaming Community Growth",
            "Performance Analytics",
            "Campaign Tracking Dashboard",
            "YouTube Shorts Gaming Promotion"
        ],
        "sameAs": [
            "https://in.linkedin.com/company/vidflyy",
            "https://www.instagram.com/vidflyy/",
            "https://www.facebook.com/Vidflyy/"
        ],
        "offers": {
            "@type": "Offer",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock"
        }
    };

    return (
        <Script
            id="youtube-gaming-promotion-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

export const YoutubeTravelPromotionSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Vidflyy YouTube Travel Promotion",
        "url": "https://www.vidflyy.com/youtube-travel-promotion",
        "image": "https://www.vidflyy.com/_next/image?url=%2Fright%20image.png&w=1920&q=75",
        "screenshot": "https://www.vidflyy.com/_next/image?url=%2Fright%20image.png&w=1920&q=75",
        "applicationCategory": "MarketingApplication",
        "applicationSubCategory": "YouTube Travel Promotion Platform",
        "operatingSystem": "Web Browser",
        "description": "Vidflyy YouTube Travel Promotion helps travel vloggers, adventure creators, tourism influencers, travel agencies, hotels, resorts, and documentary filmmakers grow their YouTube channels through targeted Google Ads-based campaigns. The platform promotes travel videos to real viewers interested in destinations, travel experiences, vlogs, and adventure content. It helps increase video views, improve watch time, boost engagement, attract subscribers, and expand global reach for travel-focused YouTube channels through transparent and performance-driven promotion campaigns.",
        "keywords": [
            "YouTube travel promotion",
            "travel video promotion",
            "promote travel vlogs on YouTube",
            "YouTube marketing for travel channels",
            "travel vlog growth service",
            "YouTube travel ads",
            "increase travel video views",
            "travel channel promotion",
            "YouTube promotion for vloggers",
            "travel influencer marketing",
            "tourism video promotion",
            "adventure travel YouTube growth",
            "travel audience targeting",
            "YouTube subscribers for travel channel",
            "travel content marketing platform"
        ],
        "featureList": [
            "YouTube Travel Video Promotion",
            "Targeted Travel Audience Reach",
            "Google Ads Campaign Management",
            "Travel Vlog Channel Growth",
            "Real Viewer Engagement",
            "Subscriber Growth Campaigns",
            "Watch Time Optimization",
            "Global Audience Targeting",
            "Campaign Performance Tracking",
            "YouTube Shorts Travel Promotion",
            "Adventure Content Promotion",
            "Tourism Channel Marketing Support"
        ],
        "sameAs": [
            "https://in.linkedin.com/company/vidflyy",
            "https://www.instagram.com/vidflyy/",
            "https://www.facebook.com/Vidflyy/"
        ],
        "offers": {
            "@type": "Offer",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock"
        }
    };

    return (
        <Script
            id="youtube-travel-promotion-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

export const YoutubeHealthBeautyPromotionSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Vidflyy YouTube Health & Beauty Promotion",
        "url": "https://www.vidflyy.com/youtube-health-beauty-promotion",
        "image": "https://www.vidflyy.com/_next/image?url=%2Fright%20image.png&w=1920&q=75",
        "screenshot": "https://www.vidflyy.com/_next/image?url=%2Fright%20image.png&w=1920&q=75",
        "applicationCategory": "MarketingApplication",
        "applicationSubCategory": "YouTube Health & Beauty Promotion Platform",
        "operatingSystem": "Web Browser",
        "description": "Vidflyy YouTube Health & Beauty Promotion helps skincare creators, beauty influencers, makeup artists, wellness coaches, dermatology educators, and lifestyle vloggers grow their YouTube channels through Google Ads-powered video promotion campaigns. The platform targets audiences interested in skincare routines, beauty tutorials, makeup reviews, haircare tips, and wellness content. It helps creators increase video views, improve watch time, boost engagement, gain subscribers, and expand their beauty and wellness audience through transparent and performance-driven YouTube marketing campaigns.",
        "keywords": [
            "YouTube health and beauty promotion",
            "beauty video promotion",
            "skincare YouTube marketing",
            "makeup channel promotion",
            "YouTube beauty growth service",
            "health and wellness YouTube promotion",
            "beauty influencer marketing",
            "skincare video promotion",
            "YouTube ads for beauty channel",
            "grow beauty YouTube channel",
            "haircare video promotion",
            "makeup tutorial promotion",
            "beauty audience targeting",
            "YouTube subscriber growth beauty niche",
            "wellness content promotion"
        ],
        "featureList": [
            "YouTube Beauty Video Promotion",
            "Skincare Audience Targeting",
            "Makeup Channel Growth Campaigns",
            "Google Ads Campaign Management",
            "Real Viewer Engagement",
            "Subscriber Growth Optimization",
            "Watch Time Improvement",
            "Beauty & Wellness Niche Targeting",
            "Campaign Analytics Dashboard",
            "YouTube Shorts Promotion",
            "Lifestyle Content Promotion",
            "Performance Tracking Tools"
        ],
        "sameAs": [
            "https://in.linkedin.com/company/vidflyy",
            "https://www.instagram.com/vidflyy/",
            "https://www.facebook.com/Vidflyy/"
        ],
        "offers": {
            "@type": "Offer",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock"
        }
    };

    return (
        <Script
            id="youtube-health-beauty-promotion-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

export const YoutubeMotivationPromotionSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Vidflyy YouTube Motivation Promotion",
        "url": "https://www.vidflyy.com/youtube-motivation-promotion",
        "image": "https://www.vidflyy.com/_next/image?url=%2Fright%20image.png&w=1920&q=75",
        "screenshot": "https://www.vidflyy.com/_next/image?url=%2Fright%20image.png&w=1920&q=75",
        "applicationCategory": "MarketingApplication",
        "applicationSubCategory": "YouTube Motivation Promotion Platform",
        "operatingSystem": "Web Browser",
        "description": "Vidflyy YouTube Motivation Promotion helps motivational speakers, self-improvement creators, life coaches, entrepreneurs, productivity influencers, and inspirational content channels grow on YouTube through Google Ads-powered video promotion campaigns. The platform delivers targeted exposure to audiences interested in motivation, success mindset, personal development, discipline, and productivity content. It helps creators increase video views, improve watch time, boost engagement, gain subscribers, and expand their motivational audience through transparent and performance-driven YouTube marketing campaigns.",
        "keywords": [
            "YouTube motivation promotion",
            "motivational video promotion",
            "YouTube self improvement marketing",
            "motivation channel growth",
            "life coach YouTube promotion",
            "inspirational video marketing",
            "YouTube ads for motivational videos",
            "personal development channel growth",
            "productivity content promotion",
            "success mindset YouTube marketing",
            "entrepreneur motivation videos promotion",
            "motivational speaker YouTube growth",
            "YouTube audience targeting motivation niche",
            "self help video promotion",
            "growth mindset content marketing"
        ],
        "featureList": [
            "YouTube Motivation Video Promotion",
            "Self-Improvement Audience Targeting",
            "Google Ads Campaign Management",
            "Life Coaching Channel Growth",
            "Real Viewer Engagement",
            "Subscriber Growth Optimization",
            "Watch Time Improvement",
            "Productivity Content Promotion",
            "Campaign Analytics Dashboard",
            "Inspirational Content Distribution",
            "YouTube Shorts Motivation Promotion",
            "Performance Tracking Tools"
        ],
        "sameAs": [
            "https://in.linkedin.com/company/vidflyy",
            "https://www.instagram.com/vidflyy/",
            "https://www.facebook.com/Vidflyy/"
        ],
        "offers": {
            "@type": "Offer",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock"
        }
    };

    return (
        <Script
            id="youtube-motivation-promotion-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

export const YoutubeVloggingPromotionSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Vidflyy YouTube Vlogging Promotion",
        "url": "https://www.vidflyy.com/youtube-vlogging-promotion",
        "image": "https://www.vidflyy.com/_next/image?url=%2Fright%20image.png&w=1920&q=75",
        "screenshot": "https://www.vidflyy.com/_next/image?url=%2Fright%20image.png&w=1920&q=75",
        "applicationCategory": "MarketingApplication",
        "applicationSubCategory": "YouTube Vlogging Promotion Platform",
        "operatingSystem": "Web Browser",
        "description": "Vidflyy YouTube Vlogging Promotion helps vloggers, daily lifestyle creators, travel vloggers, family vlog channels, storytelling creators, and influencers grow their YouTube channels through Google Ads-powered targeted promotion campaigns. The platform helps vlogging content reach real viewers interested in lifestyle videos, daily routines, travel experiences, personal stories, and entertainment vlogs. It increases video views, improves watch time, boosts engagement, attracts subscribers, and supports long-term channel growth through transparent and performance-driven YouTube marketing campaigns.",
        "keywords": [
            "YouTube vlogging promotion",
            "vlog channel growth",
            "YouTube vlog marketing",
            "promote vlogs on YouTube",
            "lifestyle vlog promotion",
            "daily vlog growth service",
            "YouTube promotion for vloggers",
            "travel vlog promotion",
            "family vlog marketing",
            "YouTube ads for vlog channels",
            "grow vlog audience",
            "vlogging audience targeting",
            "YouTube subscriber growth vlogs",
            "video blog promotion",
            "creator vlog marketing platform"
        ],
        "featureList": [
            "YouTube Vlog Video Promotion",
            "Lifestyle Audience Targeting",
            "Google Ads Campaign Management",
            "Vlog Channel Growth",
            "Real Viewer Engagement",
            "Subscriber Growth Campaigns",
            "Watch Time Optimization",
            "Content Discovery Boost",
            "Performance Analytics Dashboard",
            "YouTube Shorts Vlog Promotion",
            "Daily Content Promotion Support",
            "Audience Expansion Tools"
        ],
        "sameAs": [
            "https://in.linkedin.com/company/vidflyy",
            "https://www.instagram.com/vidflyy/",
            "https://www.facebook.com/Vidflyy/"
        ],
        "offers": {
            "@type": "Offer",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock"
        }
    };

    return (
        <Script
            id="youtube-vlogging-promotion-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};
