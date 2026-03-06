"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface PromotionBannerProps {
    heading?: React.ReactNode;
    badgeText?: string;
    description?: string;
}

const PromotionBanner = ({
    heading,
    badgeText = "Start with just ₹499",
    description = "Launch your first campaign in seconds. Reach real viewers, track performance live, and scale when you see results.",
}: PromotionBannerProps) => {
    const router = useRouter();

    const thumbnails = [
        { src: "/lovable-uploads/1.jpg", alt: "YouTube video" },
        { src: "/lovable-uploads/2.jpg", alt: "YouTube video" },
        { src: "/lovable-uploads/3.jpg", alt: "YouTube video" },
        { src: "/lovable-uploads/4.jpg", alt: "YouTube video" },
        { src: "/lovable-uploads/5.jpg", alt: "YouTube video" },
        { src: "/lovable-uploads/6.jpg", alt: "YouTube video" },
        { src: "/lovable-uploads/7.jpg", alt: "YouTube video" },
        { src: "/lovable-uploads/8.jpg", alt: "YouTube video" },
        { src: "/lovable-uploads/9.jpg", alt: "YouTube video" },
        { src: "/lovable-uploads/10.jpg", alt: "YouTube video" },
        { src: "/lovable-uploads/11.jpg", alt: "YouTube video" },
        { src: "/lovable-uploads/12.jpg", alt: "YouTube video" },
        { src: "/lovable-uploads/music-thumbnail.png", alt: "YouTube video" },
        { src: "/lovable-uploads/music.png", alt: "YouTube video" },
        { src: "/lovable-uploads/optmize.png", alt: "YouTube video" },
        { src: "/lovable-uploads/how-videos-seen.png", alt: "YouTube video" },
    ];

    const marqueeRows = [
        { items: [...thumbnails.slice(0, 8), ...thumbnails.slice(0, 8)], direction: "animate-marquee" },
        { items: [...thumbnails.slice(4, 12), ...thumbnails.slice(4, 12)], direction: "animate-marquee-reverse" },
        { items: [...thumbnails.slice(8, 16), ...thumbnails.slice(8, 16)], direction: "animate-marquee" },
        { items: [...thumbnails.slice(1, 9), ...thumbnails.slice(1, 9)], direction: "animate-marquee-reverse" },
    ];

    const bannerColor = "rgb(220, 39, 39)";

    return (
        <section
            className="relative w-full overflow-hidden py-20 px-4 md:px-12 font-founders"
            style={{ backgroundColor: bannerColor }}
        >
            <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">

                {/* Left Side Content */}
                <div className="w-full lg:w-[50%] z-20 space-y-6 lg:pl-4">
                    <div className="inline-block bg-[#111827] text-white px-3 py-1.5 text-[14px] font-bold uppercase tracking-wider">
                        {badgeText}
                    </div>

                    <h2 className="text-white font-extrabold leading-[1.1] tracking-tight !text-left" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
                        {heading || (
                            <>
                                Run your YouTube growth <br className="hidden lg:block" />
                                campaign today and reach <br className="hidden lg:block" />
                                audience your content deserves.
                            </>
                        )}
                    </h2>

                    <p className="text-white font-bold leading-relaxed opacity-95 max-w-xl" style={{ fontSize: 'clamp(16px, 1.5vw, 18px)' }}>
                        {description}
                    </p>

                    <button
                        onClick={() => router.push("/get-started")}
                        className="bg-white px-10 py-4 font-black text-[18px] transition-transform hover:scale-105 active:scale-95 shadow-lg"
                        style={{ color: bannerColor }}
                    >
                        Start My Promotion Now
                    </button>
                </div>

                {/* Right Side - Marquee Thumbnail Grid */}
                <div className="w-full lg:w-[45%] flex flex-col gap-2 relative overflow-hidden h-[420px]">
                    {/* End Blur Overlays */}
                    <div
                        className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none"
                        style={{ background: `linear-gradient(to right, ${bannerColor}, transparent)` }}
                    ></div>
                    <div
                        className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none"
                        style={{ background: `linear-gradient(to left, ${bannerColor}, transparent)` }}
                    ></div>

                    {marqueeRows.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex gap-2 overflow-hidden whitespace-nowrap">
                            <div className={`flex gap-2 shrink-0 ${row.direction}`}>
                                {row.items.map((thumb, i) => (
                                    <div
                                        key={i}
                                        className="w-[140px] md:w-[170px] aspect-video relative rounded-[4px] overflow-hidden shrink-0 border border-white/10"
                                    >
                                        <Image
                                            src={thumb.src}
                                            alt={thumb.alt}
                                            fill
                                            sizes="(max-width: 768px) 140px, 170px"
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PromotionBanner;
