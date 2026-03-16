"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CampaignLayout from "@/components/CampaignLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Play, Youtube, Video, Hash, Loader2, Users } from "lucide-react";
import Image from "next/image";
import ChannelSelector from "@/components/ChannelSelector";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");

export default function CampaignDashboard() {
    const router = useRouter();
    const { user } = useAuth();
    const [youtubeLink, setYoutubeLink] = useState("");
    const [mounted, setMounted] = useState(false);

    // YouTube API State
    const [videoInfo, setVideoInfo] = useState<any>(null);
    const [channelInfo, setChannelInfo] = useState<any>(null);
    const [isFetchingPreview, setIsFetchingPreview] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Live fetching of YouTube details
    useEffect(() => {
        const fetchPreview = async () => {
            const url = youtubeLink.trim();
            if (!url || !url.match(/(youtube\.com|youtu\.be)/)) {
                setVideoInfo(null);
                setChannelInfo(null);
                return;
            }

            setIsFetchingPreview(true);
            try {
                const isVid = /\/(watch|shorts|embed)\/|\?v=|youtu\.be\//.test(url);
                let vInfo = null;
                let cInfo = null;

                if (isVid) {
                    try {
                        const res = await fetch(`${API_BASE_URL}/api/youtube/info`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ url })
                        });
                        if (res.ok) vInfo = await res.json();
                    } catch (e) { }
                } else {
                    // Try to fetch channel info directly if it's not a video
                    try {
                        const res = await fetch(`${API_BASE_URL}/api/youtube/channel-info?videoUrl=${encodeURIComponent(url)}`);
                        if (res.ok) cInfo = await res.json();
                    } catch (e) { }
                }

                setVideoInfo(vInfo);
                setChannelInfo(cInfo);

            } catch (err) {
                console.error(err);
            } finally {
                setIsFetchingPreview(false);
            }
        };

        const timer = setTimeout(() => {
            fetchPreview();
        }, 800);

        return () => clearTimeout(timer);
    }, [youtubeLink]);

    const handleLaunchCampaign = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!youtubeLink) return;

        try {
            const channelId = videoInfo?.channelId || channelInfo?.channelId;
            const channelName = videoInfo?.author || channelInfo?.name;
            const channelAvatar = channelInfo?.avatar || videoInfo?.channelAvatar || videoInfo?.thumbnail;

            // Automatically add this channel to the user's saved channels list
            if (user?.email && channelId) {
                try {
                    await fetch(`${API_BASE_URL}/api/user-preferences/channels`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: user.email,
                            channelId: channelId,
                            channelName: channelName || "YouTube Channel",
                            channelAvatar: channelAvatar || "",
                        }),
                        credentials: "include",
                    });

                    // Dispatch event so ChannelSelector updates immediately
                    window.dispatchEvent(new CustomEvent('channelChanged', {
                        detail: {
                            channelId,
                            channelName: channelName || "YouTube Channel",
                            channelAvatar: channelAvatar || ""
                        }
                    }));
                } catch (apiErr) {
                    console.warn("Failed to sync channel to preferences:", apiErr);
                }
            }

            // Create the video data object that the budget page expects
            const videoData = {
                title: videoInfo?.title || (channelInfo ? `${channelInfo.name}'s Channel` : "YouTube Video"),
                author: videoInfo?.author || channelInfo?.name || "YouTube Creator",
                videoId: videoInfo?.videoId || "",
                thumbnail: videoInfo?.thumbnail || channelInfo?.avatar || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=400&auto=format&fit=crop",
                link: youtubeLink.trim(),
                channelId: videoInfo?.channelId || channelInfo?.channelId || null,
                avatarUrl: channelAvatar || null,
                publishedAt: videoInfo?.publishedAt || null,
                duration: videoInfo?.duration || null,
                viewCount: videoInfo?.viewCount || null,
                likeCount: videoInfo?.likeCount || null,
                commentCount: videoInfo?.commentCount || null,
            };

            // Sync with ChannelSelector storage keys
            const STORAGE_KEY = "vidfly_channel_videos";
            try {
                const existingVideosJSON = sessionStorage.getItem(STORAGE_KEY);
                let existingVideos = [];
                try {
                    existingVideos = JSON.parse(existingVideosJSON || "[]");
                } catch (e) {
                    existingVideos = [];
                }

                // Add new video to the list if not already there
                const videoExists = existingVideos.some((v: any) => v.videoId === videoData.videoId);
                if (!videoExists) {
                    const updatedVideos = [videoData, ...existingVideos];
                    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updatedVideos));
                }

                // Update selected channel for the current user
                if (channelId && (user?.email || localStorage.getItem("logged_user_email"))) {
                    const email = user?.email || localStorage.getItem("logged_user_email");
                    localStorage.setItem(`channel_${email}`, channelId);
                }
            } catch (err) {
                console.warn("Failed to update channel videos in storage:", err);
            }

            // Budget page expects these in sessionStorage
            sessionStorage.setItem("vidfly_current_campaign_video", JSON.stringify(videoData));
            sessionStorage.setItem("vidfly_current_campaign_videos", JSON.stringify([videoData]));

            // Persistent storage for recovery
            localStorage.setItem("campaign_link", youtubeLink.trim());

            router.push("/campaign/budget");
        } catch (err) {
            console.error("Launch error:", err);
            window.location.href = "/campaign/budget";
        }
    };

    if (!mounted) return null;

    return (
        <CampaignLayout activeSidebar="promote" className="max-w-none p-0 !p-0 flex-1 flex flex-col font-founders relative overflow-x-hidden">

            {/* Main Hero Section */}
            <div className="relative flex-1 flex flex-col items-center justify-center py-8 md:py-12 px-4">

                {/* Subtle Background Gradient */}
                <div
                    className="absolute inset-0 z-0 pointer-events-none opacity-40"
                    style={{
                        background: 'radial-gradient(circle at 50% 0%, rgba(221, 214, 254, 0.5) 0%, rgba(255, 255, 255, 0) 70%)',
                    }}
                />

                <div className="w-full max-w-5xl relative z-10 flex flex-col items-center text-center">

                    {/* Main Headline */}
                    <h1 className="section-heading !text-[#1e293b] !mb-0">
                        Join <span className="font-bold">50,000+</span> <span className="italic font-serif">Creators</span> who scaled<br className="hidden md:block" />
                        faster with <span className="font-bold">Vidfly!</span>
                    </h1>

                    {/* Stacked Creator Images */}
                    <div className="relative w-full max-w-sm h-[200px] md:h-[260px] mb-12 flex items-center justify-center">
                        {/* Center Card */}
                        <div className="absolute z-20 w-[220px] md:w-[260px] aspect-square bg-white rounded-3xl p-1 shadow-2xl overflow-hidden border-[6px] border-white">
                            <div className="w-full h-full rounded-2xl overflow-hidden relative">
                                <Image
                                    src="/creator_main.png"
                                    alt="YouTube Creator"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* Left Card (Behind) */}
                        <div className="absolute z-10 w-[200px] md:w-[240px] aspect-square bg-white rounded-3xl p-1 shadow-xl overflow-hidden border-[6px] border-white left-1/2 -translate-x-[90%] rotate-[-15deg] brightness-75">
                            <div className="w-full h-full rounded-2xl overflow-hidden relative">
                                <Image
                                    src="/creator_side1.png"
                                    alt="YouTube Creator"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* Right Card (Behind) */}
                        <div className="absolute z-10 w-[200px] md:w-[240px] aspect-square bg-white rounded-3xl p-1 shadow-xl overflow-hidden border-[6px] border-white left-1/2 translate-x-[-10%] rotate-[15deg] brightness-75">
                            <div className="w-full h-full rounded-2xl overflow-hidden relative">
                                <Image
                                    src="/creator_side2.png"
                                    alt="YouTube Creator"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* Pagination Dots */}
                        <div className="absolute -bottom-10 flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                            <div className="w-5 h-2.5 rounded-full bg-slate-800" />
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                        </div>
                    </div>

                    {/* Description/Price Line */}
                    <p className="text-[#334155] text-[17px] font-medium mb-6">
                        Promote your YouTube videos starting at <span className="font-bold">just ₹499!</span>
                    </p>

                    {/* Main Interaction Area */}
                    <div className="w-full max-w-3xl flex flex-col items-center gap-6">
                        {/* URL Input with Vanish Effect */}
                        <div className="w-full relative px-4">
                            <PlaceholdersAndVanishInput
                                placeholders={[
                                    "Enter your Channel Name, Channel Link, or Video Link",
                                    "Paste your YouTube video link...",
                                    "Paste your channel URL here...",
                                    "Search for your channel name...",
                                ]}
                                value={youtubeLink}
                                showIcon={true}
                                hideSubmit={false}
                                className="max-w-none"
                                disabled={isFetchingPreview || (!videoInfo && !channelInfo)}
                                onChange={(e) => setYoutubeLink(e.target.value)}
                                onSubmit={handleLaunchCampaign}
                            />
                        </div>

                        {/* Preview Logic (matching new style) */}
                        <div className="w-full">
                            {isFetchingPreview && (
                                <div className="w-full flex items-center justify-center py-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-dashed border-slate-200 animate-pulse transition-all">
                                    <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
                                    <span className="ml-3 text-sm font-medium text-slate-500">Fetching Details...</span>
                                </div>
                            )}

                            {(!isFetchingPreview && (videoInfo || channelInfo)) && (
                                <div className="w-full max-w-md mx-auto bg-white border border-slate-100 rounded-2xl p-3 flex flex-col relative overflow-hidden text-left shadow-lg animate-in slide-in-from-top-2 duration-300">
                                    <div className="flex gap-4">
                                        <div className="shrink-0 w-[120px] aspect-video bg-black rounded-xl overflow-hidden relative">
                                            <img
                                                src={videoInfo?.thumbnail || channelInfo?.avatar || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=400&auto=format&fit=crop"}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-col flex-1 min-w-0 justify-center">
                                            <h3 className="font-bold text-slate-800 text-sm line-clamp-1">
                                                {videoInfo?.title || channelInfo?.title || "Fetching details..."}
                                            </h3>
                                            <div className="flex items-center gap-2 mt-1 text-slate-500">
                                                <span className="text-xs font-medium line-clamp-1">{videoInfo?.author || channelInfo?.name || "Unknown Channel"}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500" />
                                </div>
                            )}
                        </div>

                        {/* Format indicators */}
                        <div className="flex items-center justify-center gap-6 mt-2 text-[13px] md:text-[15px] font-bold text-slate-400">
                            <div className="flex items-center gap-2">
                                <Play className="w-4 h-4 text-slate-300 fill-current" />
                                Video
                            </div>
                            <div className="flex items-center gap-2">
                                <svg width="10" height="13" viewBox="0 0 10 13" fill="none" className="w-4 h-4">
                                    <path d="M8.60407 5.19462L7.85473 4.88209L8.74759 4.40732C9.01997 4.26468 9.26141 4.06953 9.45801 3.83313C9.6546 3.59673 9.80245 3.32375 9.89305 3.02994C9.98364 2.73612 10.0152 2.42728 9.98583 2.12122C9.95649 1.81516 9.86686 1.51793 9.72209 1.24668C9.43132 0.697543 8.93434 0.286386 8.34045 0.103637C7.74657 -0.0791124 7.10441 -0.0184888 6.55522 0.272174L1.25161 3.08284C0.857603 3.28987 0.530811 3.60497 0.309572 3.99117C0.0883326 4.37737 -0.0181779 4.81866 0.00253621 5.26326C0.0237211 5.69664 0.164454 6.1157 0.409146 6.47401C0.653839 6.83233 0.992941 7.11593 1.38889 7.29339C1.40761 7.29963 2.13875 7.60539 2.13875 7.60539L1.25161 8.07393C0.879324 8.27473 0.568277 8.57247 0.351408 8.93563C0.13454 9.29878 0.0199227 9.71383 0.0196966 10.1368C0.0229763 10.7573 0.27097 11.3515 0.709805 11.7903C1.14864 12.229 1.74287 12.4769 2.36339 12.48C2.7404 12.48 3.11065 12.3895 3.44502 12.2158L8.75435 9.40464C9.14752 9.19728 9.47334 8.88199 9.6935 8.49584C9.91365 8.10969 10.019 7.66871 9.99718 7.22475C9.97485 6.79084 9.83296 6.37157 9.58719 6.01328C9.34142 5.655 9.00083 5.37167 8.60407 5.19462Z" fill="#94a3b8" />
                                </svg>
                                Shorts
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-slate-300" />
                                Channel
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </CampaignLayout>
    );
}
