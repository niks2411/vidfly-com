"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CampaignLayout from "@/components/CampaignLayout";
import CampaignCard from "@/components/CampaignCard";
import ChannelSelector from "@/components/ChannelSelector";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Play, Layers, Settings, CreditCard } from "lucide-react";
import { getVerifiedEmail } from "@/lib/verifiedEmail";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");

type StoredVideo = {
    title: string;
    author?: string;
    videoId: string;
    thumbnail: string;
    link: string;
    channelId?: string | null;
};

const STORAGE_KEY = "vidfly_channel_videos";

export default function CampaignDashboard() {
    const router = useRouter();
    const verifiedEmail = getVerifiedEmail();
    const displayEmail = verifiedEmail || "Email not verified";

    useEffect(() => {
        if (!verifiedEmail) {
            router.replace("/get-started");
        }
    }, [verifiedEmail, router]);

    const [youtubeLink, setYoutubeLink] = useState("");

    // Pre-fill YouTube link from session storage
    useEffect(() => {
        try {
            const promotedVideo = sessionStorage.getItem("vidfly_promoted_video");
            if (promotedVideo) {
                const { link, timestamp } = JSON.parse(promotedVideo);
                if (Date.now() - timestamp < 3600000) {
                    setYoutubeLink(link);
                    sessionStorage.removeItem("vidfly_promoted_video");
                    return;
                }
            }

            const heroInput = sessionStorage.getItem("vidfly_hero_channel_input");
            if (heroInput) {
                setYoutubeLink(heroInput);
                sessionStorage.removeItem("vidfly_hero_channel_input");
            }
        } catch { }
    }, []);

    const [videoInfo, setVideoInfo] = useState<StoredVideo | null>(null);
    const [videoError, setVideoError] = useState("");
    const [loadingVideo, setLoadingVideo] = useState(false);

    useEffect(() => {
        if (!youtubeLink) {
            setVideoInfo(null);
            setVideoError("");
            return;
        }
        if (
            !youtubeLink.includes("youtube.com") &&
            !youtubeLink.includes("youtu.be")
        ) {
            setVideoInfo(null);
            setVideoError("");
            return;
        }

        const timeoutId = setTimeout(() => {
            fetchVideoInfo(youtubeLink);
        }, 700);

        return () => clearTimeout(timeoutId);
    }, [youtubeLink]);

    const fetchVideoInfo = async (url: string) => {
        try {
            setLoadingVideo(true);
            setVideoError("");
            const response = await fetch(`${API_BASE_URL}/api/youtube/info`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url }),
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data?.message || "Could not fetch video info");
            }

            const data = await response.json();
            const payload: StoredVideo = {
                title: data.title,
                author: data.author,
                videoId: data.videoId,
                thumbnail: data.thumbnail,
                link: url,
                channelId: data.channelId || null,
            };
            setVideoInfo(payload);
            persistVideo(payload);
        } catch (err) {
            setVideoInfo(null);
            const message =
                err instanceof Error ? err.message : "Could not fetch video info";
            setVideoError(message);
            const videoIdMatch = url.match(
                /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/
            );
            if (videoIdMatch && videoIdMatch[1]) {
                const fallback: StoredVideo = {
                    title: "YouTube Video",
                    author: "YouTube",
                    videoId: videoIdMatch[1],
                    thumbnail: `https://img.youtube.com/vi/${videoIdMatch[1]}/hqdefault.jpg`,
                    link: url,
                    channelId: null,
                };
                setVideoInfo(fallback);
                persistVideo(fallback);
            }
        } finally {
            setLoadingVideo(false);
        }
    };

    const persistVideo = (video: StoredVideo) => {
        if (typeof window === "undefined") return;
        try {
            const existing: StoredVideo[] = JSON.parse(
                sessionStorage.getItem(STORAGE_KEY) || "[]"
            );
            const filtered = existing.filter((item) => item.videoId !== video.videoId);
            filtered.unshift(video);
            const limited = filtered.slice(0, 10);
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(limited));
        } catch (err) {
            console.error("Failed to persist video", err);
        }
    };

    const handleLaunchCampaign = (e: React.FormEvent) => {
        e.preventDefault();
        if (!verifiedEmail) {
            setVideoError("Missing verified email. Please verify your email first.");
            return;
        }
        if (!videoInfo) {
            setVideoError("Please enter a valid YouTube link to continue.");
            return;
        }

        // In Next.js, we should use session storage or a state manager instead of router state if possible for persistent data across refreshes, 
        // but for immediate redirection, we can use sessionStorage to pass complex objects if needed, OR just redirect.
        sessionStorage.setItem("vidfly_current_campaign_video", JSON.stringify(videoInfo));
        router.push("/campaign/budget");
    };

    return (
        <CampaignLayout activeSidebar="promote">
            <CampaignCard>
                {/* Top Section - Verified Email and Channel Selector */}
                <div className="flex flex-col sm:flex-row items-center justify-end gap-3 mb-6">
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-200 min-w-0 max-w-full order-2 sm:order-1">
                        <span className="text-xs font-semibold text-slate-500 uppercase whitespace-nowrap flex-shrink-0">Verified Email</span>
                        <span className="text-sm font-semibold text-slate-900 truncate min-w-0 block">
                            {displayEmail}
                        </span>
                    </div>
                    <div className="order-1 sm:order-2">
                        <ChannelSelector />
                    </div>
                </div>

                {/* Main Content */}
                <div className="mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                        <div className="flex-1">
                            <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-3">
                                Promote videos with just ₹999
                            </h1>
                            <p className="text-slate-600 text-base leading-relaxed max-w-2xl">
                                Enter your YouTube channel name, video URL, or Shorts link. Our team
                                will review it, set up the campaign, and share tracking details
                                with you.
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            className="rounded-xl border-red-600 text-red-600 hover:bg-red-50 whitespace-nowrap"
                            onClick={() => router.push("/campaign/channel")}
                        >
                            PROMOTE ENTIRE CHANNEL
                        </Button>
                    </div>

                    <form onSubmit={handleLaunchCampaign} className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                            <div className="flex items-center gap-3 flex-1 bg-white border-2 border-slate-200 rounded-xl px-4 py-3">
                                <Play className="h-5 w-5 text-red-600 flex-shrink-0" />
                                <Input
                                    type="text"
                                    placeholder="Enter your YouTube video URL, or Shorts link"
                                    className="border-0 shadow-none focus-visible:ring-0 text-base bg-transparent p-0"
                                    value={youtubeLink}
                                    onChange={(e) => setYoutubeLink(e.target.value)}
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-6 py-6 whitespace-nowrap"
                            >
                                LAUNCH CAMPAIGN
                            </Button>
                        </div>

                        <div className="space-y-3">
                            {loadingVideo && (
                                <div className="border border-red-100 rounded-xl p-4 bg-red-50 text-red-700 text-sm">
                                    Fetching video details...
                                </div>
                            )}
                            {videoError && !videoInfo && (
                                <div className="border border-red-100 rounded-xl p-4 bg-red-50 text-red-600 text-sm">
                                    {videoError}
                                </div>
                            )}
                            {videoInfo && (
                                <div className="border-2 border-red-200 rounded-xl p-4 flex gap-4 bg-white">
                                    <img
                                        src={videoInfo.thumbnail}
                                        alt={videoInfo.title}
                                        className="w-32 h-20 object-cover rounded-lg"
                                    />
                                    <div className="flex-1">
                                        <p className="text-base font-semibold text-slate-900 line-clamp-2 mb-1">
                                            {videoInfo.title}
                                        </p>
                                        {videoInfo.author && (
                                            <p className="text-sm text-slate-600">
                                                by {videoInfo.author}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </form>
                </div>

                {/* Professional Animated Flow with Curly Arrows */}
                <div className="mt-12 mb-8">
                    <div className="relative max-w-5xl mx-auto">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0 relative">
                            {/* Step 1 */}
                            <motion.div
                                className="flex flex-col items-center text-center z-10"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <motion.div
                                    className="relative mb-3 w-16 h-16"
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 200 }}
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-tr from-red-500 to-pink-500 rounded-full"
                                        animate={{
                                            boxShadow: [
                                                "0 0 20px rgba(239, 68, 68, 0.5)",
                                                "0 0 35px rgba(239, 68, 68, 0.8)",
                                                "0 0 20px rgba(239, 68, 68, 0.5)",
                                            ],
                                        }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    />
                                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                                        <Layers className="h-8 w-8 text-white" />
                                    </div>
                                </motion.div>
                                <h3 className="text-base font-semibold text-slate-900 mb-1 max-w-[140px]">
                                    Enter Video Link
                                </h3>
                                <p className="text-xs text-slate-500 max-w-[140px]">
                                    Choose your video to promote
                                </p>
                            </motion.div>

                            {/* Curly Arrow 1 */}
                            <div className="hidden md:block relative w-64 h-32 pointer-events-none">
                                <svg className="w-full h-full" viewBox="0 0 300 120" fill="none" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#ef4444" />
                                            <stop offset="50%" stopColor="#ec4899" />
                                            <stop offset="100%" stopColor="#a855f7" />
                                        </linearGradient>
                                    </defs>
                                    <motion.path
                                        d="M 20 60 Q 80 20, 150 50 Q 220 80, 280 60"
                                        stroke="url(#gradient1)"
                                        strokeWidth="4"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeDasharray="1"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        whileInView={{ pathLength: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
                                    />
                                </svg>
                            </div>

                            {/* Step 2 */}
                            <motion.div
                                className="flex flex-col items-center text-center z-10"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                            >
                                <motion.div
                                    className="relative mb-3 w-16 h-16"
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 1, type: "spring", stiffness: 200 }}
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-full"
                                        animate={{
                                            boxShadow: [
                                                "0 0 20px rgba(168, 85, 247, 0.5)",
                                                "0 0 35px rgba(168, 85, 247, 0.8)",
                                                "0 0 20px rgba(168, 85, 247, 0.5)",
                                            ],
                                        }}
                                        transition={{ duration: 2, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
                                    />
                                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                                        <Settings className="h-8 w-8 text-white" />
                                    </div>
                                </motion.div>
                                <h3 className="text-base font-semibold text-slate-900 mb-1 max-w-[140px]">
                                    Set Up Campaign
                                </h3>
                                <p className="text-xs text-slate-500 max-w-[140px]">
                                    Choose audience & budget
                                </p>
                            </motion.div>

                            {/* Curly Arrow 2 */}
                            <div className="hidden md:block relative w-64 h-32 pointer-events-none">
                                <svg className="w-full h-full" viewBox="0 0 300 120" fill="none" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#a855f7" />
                                            <stop offset="50%" stopColor="#8b5cf6" />
                                            <stop offset="100%" stopColor="#3b82f6" />
                                        </linearGradient>
                                    </defs>
                                    <motion.path
                                        d="M 20 60 Q 80 20, 150 50 Q 220 80, 280 60"
                                        stroke="url(#gradient2)"
                                        strokeWidth="4"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeDasharray="1"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        whileInView={{ pathLength: 1, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 2, ease: "easeInOut" }}
                                    />
                                </svg>
                            </div>

                            {/* Step 3 */}
                            <motion.div
                                className="flex flex-col items-center text-center z-10"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 1.5 }}
                            >
                                <motion.div
                                    className="relative mb-3 w-16 h-16"
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 1.7, type: "spring", stiffness: 200 }}
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-cyan-500 rounded-full"
                                        animate={{
                                            boxShadow: [
                                                "0 0 20px rgba(59, 130, 246, 0.5)",
                                                "0 0 35px rgba(59, 130, 246, 0.8)",
                                                "0 0 20px rgba(59, 130, 246, 0.5)",
                                            ],
                                        }}
                                        transition={{ duration: 2, repeat: Infinity, delay: 1, ease: "easeInOut" }}
                                    />
                                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                                        <CreditCard className="h-8 w-8 text-white" />
                                    </div>
                                </motion.div>
                                <h3 className="text-base font-semibold text-slate-900 mb-1 max-w-[140px]">
                                    Make Payment
                                </h3>
                                <p className="text-xs text-slate-500 max-w-[140px]">
                                    Approve ad delivery
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </CampaignCard>
        </CampaignLayout>
    );
}
