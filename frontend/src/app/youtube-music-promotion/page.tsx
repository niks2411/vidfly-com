"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Youtube, Music, Play, CheckCircle } from "lucide-react";
import { Animated } from "@/components/Animated";

export default function YoutubeMusicPromotion() {
    const router = useRouter();
    const [videoUrl, setVideoUrl] = useState("");
    const [isValidUrl, setIsValidUrl] = useState(false);

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const url = e.target.value;
        setVideoUrl(url);
        const isValid = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(url);
        setIsValidUrl(isValid);
    };

    const handlePromoteClick = () => {
        if (isValidUrl) {
            if (videoUrl && typeof window !== 'undefined') {
                sessionStorage.setItem("vidfly_promoted_video", JSON.stringify({
                    link: videoUrl,
                    timestamp: Date.now()
                }));
            }
            router.push('/campaign');
        }
    };

    const handleWhatsApp = (preset?: string) => {
        const text = preset ? `Promote my music: ${preset}` : "I want to promote my music video on YouTube";
        window.open(`https://wa.me/917355518761?text=${encodeURIComponent(text)}`, "_blank");
    };

    return (
        <div className="min-h-screen bg-white font-montserrat">
            {/* HERO */}
            <header className="relative overflow-hidden bg-[#1a1a2e] py-16 lg:py-24">
                <div className="absolute -left-20 top-10 w-96 h-96 bg-red-600 rounded-full opacity-10 blur-3xl animate-blob pointer-events-none"></div>
                <div className="absolute right-10 bottom-10 w-80 h-80 bg-red-500 rounded-full opacity-10 blur-3xl animate-blob animation-delay-2000 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <Animated delay={50}>
                            <div className="space-y-6">
                                <div className="inline-block">
                                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full">
                                        <svg viewBox="0 0 272 92" className="h-4 w-auto sm:h-5">
                                            <path fill="#EA4335" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" />
                                            <path fill="#FBBC05" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" />
                                            <path fill="#4285F4" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" />
                                            <path fill="#34A853" d="M225 3v65h-9.5V3h9.5z" />
                                            <path fill="#EA4335" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" />
                                            <path fill="#4285F4" d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z" />
                                        </svg>
                                        <span className="text-white font-medium text-xs sm:text-sm">Premier Partner</span>
                                    </div>
                                </div>

                                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                                    <div className="text-white mb-2 whitespace-nowrap">YouTube Music Video</div>
                                    <div className="flex items-center gap-3">
                                        <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent font-extrabold">
                                            Promotion
                                        </span>
                                        <span className="text-white">Service</span>
                                    </div>
                                </h1>

                                <p className="text-gray-400 text-base lg:text-lg leading-relaxed max-w-lg">
                                    Reach thousands of targeted real music fans<br />
                                    with your YouTube video!
                                </p>

                                <div className="pt-2">
                                    <div className={`bg-white rounded-full p-1 pl-4 flex items-center gap-2 w-full max-w-[380px] transition-all duration-300 ring-2 ${isValidUrl ? 'ring-red-500/50 shadow-[0_10px_40px_-10px_rgba(220,38,38,0.5)]' : 'ring-transparent focus-within:ring-red-500/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.1)]'}`}>
                                        <div className="flex items-center gap-2 flex-1 py-1">
                                            <Youtube className={`h-4 w-4 flex-shrink-0 transition-colors ${isValidUrl ? 'text-red-600' : 'text-gray-400'}`} />
                                            <input
                                                type="text"
                                                value={videoUrl}
                                                onChange={handleUrlChange}
                                                placeholder="Enter your YouTube video URL"
                                                className="flex-1 border-0 focus:outline-none text-sm bg-transparent placeholder:text-gray-400 text-gray-900 min-w-0"
                                            />
                                        </div>
                                        <button
                                            disabled={!isValidUrl}
                                            onClick={handlePromoteClick}
                                            className={`px-5 py-2 rounded-full font-bold text-xs transition-all duration-300 whitespace-nowrap ${isValidUrl
                                                ? 'bg-red-600 text-white shadow-lg shadow-red-500/30 hover:bg-red-700 hover:scale-105 cursor-pointer transform translate-x-0 opacity-100 w-auto'
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed hidden sm:block opacity-0 w-0 p-0 overflow-hidden translate-x-4'
                                                }`}
                                        >
                                            Promote Now
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-700/50">
                                            <CheckCircle className="h-3.5 w-3.5 text-green-400" />
                                        </div>
                                        <span className="text-gray-300 text-sm">Legal. We use YouTube Ads only</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-700/50">
                                            <CheckCircle className="h-3.5 w-3.5 text-green-400" />
                                        </div>
                                        <span className="text-gray-300 text-sm">Start as low as ₹999</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-700/50">
                                            <CheckCircle className="h-3.5 w-3.5 text-green-400" />
                                        </div>
                                        <span className="text-gray-300 text-sm">Real followers, views, likes and comments</span>
                                    </div>
                                </div>
                            </div>
                        </Animated>

                        <Animated delay={150}>
                            <div className="flex justify-center lg:justify-end overflow-hidden">
                                <div className="relative w-full max-w-md">
                                    <img
                                        src="/lovable-uploads/music.png"
                                        alt="Music Promotion Visualization"
                                        className="w-full h-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            </div>
                        </Animated>
                    </div>
                </div>
            </header>

            {/* WHAT IS YOUTUBE MUSIC PROMOTION */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <Animated delay={100}>
                            <div className="flex justify-center">
                                <div className="relative w-72 h-72 xs:w-80 xs:h-80 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px]">
                                    <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 300 300">
                                        <defs>
                                            <path id="circlePath" d="M 150, 150 m -120, 0 a 120,120 0 1,1 240,0 a 120,120 0 1,1 -240,0" />
                                        </defs>
                                        <text fill="#9333ea" fontWeight="600" fontSize="15">
                                            <textPath href="#circlePath" startOffset="0%">
                                                promote your music videos to millions of people • promote your music videos to millions of people •
                                            </textPath>
                                        </text>
                                    </svg>
                                    <div className="absolute inset-16 xs:inset-20 sm:inset-24 lg:inset-28 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col">
                                        <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 border-b border-gray-200">
                                            <div className="flex gap-1">
                                                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                            </div>
                                            <Youtube className="h-3 w-3 text-red-600 ml-1" />
                                            <span className="text-[10px] text-gray-500 font-medium">YouTube</span>
                                        </div>
                                        <div className="flex-1 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
                                            <img
                                                src="/lovable-uploads/music-thumbnail.png"
                                                alt="Music video thumbnail"
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                                                    <Play className="h-5 w-5 text-white fill-white ml-0.5" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Animated>

                        <Animated delay={200}>
                            <div className="space-y-5">
                                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                                    What is a YouTube music<br />video promotion
                                </h2>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    The Music industry has changed tremendously over the years. In order to remain competitive in today's market, you must grow visibility on YouTube. That's where we come in! Vidflyy helps music artists from any genre promote their music. We help major and indie artists focus on presenting their content to audiences who may be interested. We help you run structured campaigns for your music videos.
                                </p>
                                <div>
                                    <Link href="/get-started">
                                        <Button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-full text-sm font-semibold">
                                            Start your promotion now
                                        </Button>
                                    </Link>
                                </div>
                                <div className="flex flex-wrap gap-6 pt-2">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-red-500" />
                                        <span className="text-xs text-gray-600">We only use YouTube Ads</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-red-500" />
                                        <span className="text-xs text-gray-600">Start as low as ₹999</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-red-500" />
                                        <span className="text-xs text-gray-600">Relevant audiences</span>
                                    </div>
                                </div>
                            </div>
                        </Animated>
                    </div>
                </div>
            </section>

            {/* WHY IT WORKS */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Animated delay={60}>
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 text-center">Why Music Promotion Works</h2>
                        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-10">We combine YouTube ad placements with music-focused targeting to reach listeners that convert into subscribers and playlist followers.</p>
                    </Animated>

                    <div className="grid md:grid-cols-3 gap-8">
                        <Animated delay={120}>
                            <div className="p-6 bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-sm transform transition hover:-translate-y-2">
                                <div className="flex items-center gap-3 mb-4"><Music className="h-6 w-6 text-red-600" /><h3 className="text-lg font-semibold">Genre & Mood Targeting</h3></div>
                                <p className="text-gray-600 text-sm">Reach listeners by genre (EDM, Indie, Hip-hop) and mood (chill, workout, study).</p>
                            </div>
                        </Animated>
                        <Animated delay={180}>
                            <div className="p-6 bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-sm transform transition hover:-translate-y-2">
                                <div className="flex items-center gap-3 mb-4"><Play className="h-6 w-6 text-red-600" /><h3 className="text-lg font-semibold">Smart Placements</h3></div>
                                <p className="text-gray-600 text-sm">In-stream, in-feed, and recommended placements tuned to music listeners increase discovery & saves.</p>
                            </div>
                        </Animated>
                        <Animated delay={240}>
                            <div className="p-6 bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-sm transform transition hover:-translate-y-2">
                                <div className="flex items-center gap-3 mb-4"><CheckCircle className="h-6 w-6 text-red-600" /><h3 className="text-lg font-semibold">Fan Conversion</h3></div>
                                <p className="text-gray-600 text-sm">Focus on long-term subscribers and playlist adds — not just one-time views.</p>
                            </div>
                        </Animated>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="py-20 bg-[#1a1a2e]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Animated delay={60}>
                        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-16 text-center">
                            How Vidflyy music promotion works
                        </h3>
                    </Animated>

                    <div className="grid grid-cols-2 lg:flex lg:flex-row items-start justify-center gap-y-12 lg:gap-0">
                        <Animated delay={100} className="flex flex-col items-center text-center px-2">
                            <div className="relative w-14 h-14 lg:w-16 lg:h-16 mb-4">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-red-500 via-pink-500 to-purple-500 p-[2px]">
                                    <div className="w-full h-full rounded-full bg-[#1a1a2e] flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">1</span>
                                    </div>
                                </div>
                            </div>
                            <h4 className="text-white font-semibold text-sm lg:text-base mb-2">Setup</h4>
                            <p className="text-gray-400 text-xs leading-relaxed max-w-[140px] lg:max-w-[180px]">
                                Add your YouTube music video, choose your budget and targeting.
                            </p>
                        </Animated>
                        <div className="hidden lg:flex items-center justify-center pt-6 px-2">
                            <span className="text-gray-500 text-xl">→</span>
                        </div>
                        <Animated delay={200} className="flex flex-col items-center text-center px-2">
                            <div className="relative w-14 h-14 lg:w-16 lg:h-16 mb-4">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-red-500 via-pink-500 to-purple-500 p-[2px]">
                                    <div className="w-full h-full rounded-full bg-[#1a1a2e] flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">2</span>
                                    </div>
                                </div>
                            </div>
                            <h4 className="text-white font-semibold text-sm lg:text-base mb-2">Payment</h4>
                            <p className="text-gray-400 text-xs leading-relaxed max-w-[140px] lg:max-w-[180px]">
                                Pay securely with credit cards or UPI.
                            </p>
                        </Animated>
                        <div className="hidden lg:flex items-center justify-center pt-6 px-2">
                            <span className="text-gray-500 text-xl">→</span>
                        </div>
                        <Animated delay={300} className="flex flex-col items-center text-center px-2">
                            <div className="relative w-14 h-14 lg:w-16 lg:h-16 mb-4">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-red-500 via-pink-500 to-purple-500 p-[2px]">
                                    <div className="w-full h-full rounded-full bg-[#1a1a2e] flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">3</span>
                                    </div>
                                </div>
                            </div>
                            <h4 className="text-white font-semibold text-sm lg:text-base mb-2">Promotion</h4>
                            <p className="text-gray-400 text-xs leading-relaxed max-w-[140px] lg:max-w-[180px]">
                                Your video is shown to interested audiences.
                            </p>
                        </Animated>
                        <div className="hidden lg:flex items-center justify-center pt-6 px-2">
                            <span className="text-gray-500 text-xl">→</span>
                        </div>
                        <Animated delay={400} className="flex flex-col items-center text-center px-2">
                            <div className="relative w-14 h-14 lg:w-16 lg:h-16 mb-4">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-red-500 via-pink-500 to-purple-500 p-[2px]">
                                    <div className="w-full h-full rounded-full bg-[#1a1a2e] flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">4</span>
                                    </div>
                                </div>
                            </div>
                            <h4 className="text-white font-semibold text-sm lg:text-base mb-2">Results</h4>
                            <p className="text-gray-400 text-xs leading-relaxed max-w-[140px] lg:max-w-[180px]">
                                Track performance in your Vidflyy dashboard.
                            </p>
                        </Animated>
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-16 bg-gradient-to-br from-red-600 to-red-700 text-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-2xl font-bold">Ready to get real listeners for your music?</h3>
                        <p className="text-sm text-red-100 mt-2">Start a campaign optimized for streams, playlist adds & long-term subscribers.</p>
                    </div>
                    <div className="flex gap-4">
                        <Button onClick={() => handleWhatsApp("Start music campaign")} className="bg-white text-red-600 px-6 py-4 rounded-full font-semibold">Start Promotion</Button>
                        <Link href="/pricing" className="inline-flex items-center justify-center px-6 py-4 rounded-full border border-white/30">View Plans</Link>
                    </div>
                </div>
            </section>

            <style jsx global>{`
        @keyframes blob {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px,-40px) scale(1.05); }
          66% { transform: translate(-20px,20px) scale(0.95); }
        }
        .animate-blob { animation: blob 8s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 15s linear infinite; }
      `}</style>
        </div>
    );
}
