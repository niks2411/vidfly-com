import Image from "next/image";

const VideoShowcase = () => {
    const thumbnails = [
        { src: "/lovable-uploads/1.jpg", alt: "YouTube video" },
        { src: "/lovable-uploads/2.jpg", alt: "YouTube video" },
        { src: "/lovable-uploads/13.jpg", alt: "YouTube video" },
        { src: "/lovable-uploads/4.jpg", alt: "YouTube video" },
        { src: "/lovable-uploads/5.jpg", alt: "YouTube video" },
        { src: "/lovable-uploads/6.jpg", alt: "YouTube video" },
        { src: "/lovable-uploads/7.jpg", alt: "YouTube video" },
        { src: "/lovable-uploads/8.jpg", alt: "YouTube video" },
        { src: "/lovable-uploads/9.jpg", alt: "YouTube video" },
        { src: "/lovable-uploads/10.jpg", alt: "YouTube video" },
        { src: "/lovable-uploads/11.jpg", alt: "YouTube video" },
        { src: "/lovable-uploads/12.jpg", alt: "YouTube video" },
        { src: "/lovable-uploads/1.jpg", alt: "YouTube video" },
        { src: "/lovable-uploads/2.jpg", alt: "YouTube video" },
        { src: "/lovable-uploads/13.jpg", alt: "YouTube video" },
        { src: "/lovable-uploads/4.jpg", alt: "YouTube video" },
    ];

    return (
        <section
            className="relative font-founders py-16 lg:py-20 overflow-hidden bg-[#000000]"
        >
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-[0.8fr_1.4fr] gap-8 lg:gap-12 items-center">
                    {/* Left - Video Preview */}
                    <div className="max-w-[480px]">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl aspect-[16/10] border border-white/10 shadow-2xl flex items-center justify-center">
                            {/* Play button */}
                            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors">
                                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                            </div>
                        </div>

                        {/* Navigation Dots */}
                        <div className="flex items-center gap-3 mt-6">
                            <div className="w-3 h-3 rounded-full bg-white"></div>
                            <div className="w-3 h-3 rounded-full bg-white/40"></div>
                            <div className="w-3 h-3 rounded-full bg-white/40"></div>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex items-center gap-6 mt-6">
                            {/* Trustpilot */}
                            <div className="flex items-center gap-2">
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="w-5 h-5 bg-[#00B67A] flex items-center justify-center">
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                            </svg>
                                        </div>
                                    ))}
                                </div>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="#00B67A">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                                <span className="text-white text-[12px] font-semibold">Trustpilot</span>
                            </div>

                            {/* Divider */}
                            <div className="w-px h-5 bg-white/30"></div>

                            {/* Star Rating */}
                            <div className="flex items-center gap-1.5">
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FBBF24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="w-px h-5 bg-white/30"></div>

                            {/* Google Rating */}
                            <div className="flex items-center gap-1.5">
                                <span className="text-white text-[18px] font-bold">G</span>
                                <span className="text-white/80 text-[12px] font-medium">4.7/5</span>
                            </div>
                        </div>
                    </div>

                    {/* Right - YouTube Thumbnails Marquee */}
                    <div className="hidden lg:flex flex-col gap-2 h-[420px] overflow-hidden relative">
                        {/* Blur Overlays - More Blur */}
                        <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#000000] via-[#000000]/80 to-transparent z-10 pointer-events-none"></div>
                        <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-[#000000] via-[#000000]/80 to-transparent z-10 pointer-events-none"></div>

                        {[
                            { items: thumbnails.slice(0, 4), direction: "animate-marquee" },
                            { items: thumbnails.slice(4, 8), direction: "animate-marquee-reverse" },
                            { items: thumbnails.slice(8, 12), direction: "animate-marquee" },
                            { items: thumbnails.slice(12, 16), direction: "animate-marquee-reverse" },
                        ].map((row, rowIndex) => (
                            <div key={rowIndex} className="flex gap-2 overflow-hidden">
                                <div className={`flex gap-2 shrink-0 ${row.direction}`}>
                                    {[...row.items, ...row.items].map((thumb, i) => (
                                        <div
                                            key={i}
                                            className="w-[180px] h-[95px] rounded-2xl overflow-hidden shrink-0 border border-white/10 relative"
                                        >
                                            <Image
                                                src={thumb.src}
                                                alt={thumb.alt}
                                                fill
                                                sizes="180px"
                                                className="object-cover hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoShowcase;
