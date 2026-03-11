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
                    } catch(e) {}
                } else {
                    // Try to fetch channel info directly if it's not a video
                    try {
                        const res = await fetch(`${API_BASE_URL}/api/youtube/channel-info?videoUrl=${encodeURIComponent(url)}`);
                        if (res.ok) cInfo = await res.json();
                    } catch(e) {}
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
        <CampaignLayout activeSidebar="promote" className="max-w-none p-0 !p-0 flex-1 flex flex-col font-founders relative">
            
            {/* Main Hero Section with Image background matching */}
            <div className="relative flex-1 flex flex-col items-center justify-center px-4 py-12">
                
                {/* Background Gradient matching the Pink/White blend in image */}
                <div 
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                        background: 'radial-gradient(ellipse at 0% 0%, rgba(255, 120, 120, 0.4) 0%, rgba(255, 255, 255, 0) 70%)',
                    }}
                />

                <div className="w-full max-w-4xl relative z-10 flex flex-col items-center text-center animate-fade-in">
                    
                    {/* Main Headline aligned with Home Page section-heading */}
                    <h1 className="section-heading !mb-6 !leading-[1.1] text-center">
                        <span className="bg-gradient-to-r from-[#fc5c65] via-[#e056fd] to-[#8b5cf6] bg-clip-text text-transparent">Promote Your YouTube Videos</span>
                        <span className="text-[#3f3f46]"> to the <br className="hidden md:block"/></span>
                        <span className="text-[#3f3f46]">Right Audience</span>
                    </h1>

                    {/* Description aligned with Home Page section-desc */}
                    <p className="section-desc max-w-2xl mb-12 !mx-auto">
                        Grow faster with <span className="font-bold text-slate-900">Vidflyy's</span> smart YouTube promotion system. Reach real viewers and track your promotion results in real time.
                    </p>

                    {/* Hand Drawn Arrow - Absolute positioned */}
                    <div className="absolute right-[5%] top-[55%] hidden xl:block pointer-events-none">
                        <svg width="220" height="140" viewBox="0 0 220 140" fill="none" className="rotate-[15deg] opacity-70">
                            <path d="M10 20C40 10 90 20 110 50C130 80 100 110 80 110C60 110 50 90 70 70C90 50 140 40 200 110" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="10 5" />
                            <path d="M185 110L205 115L195 95" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    {/* Price Hint & Main Action Area */}
                    <p className="text-[#3b82f6] font-semibold text-[16px] mb-4">
                        Plans start at just ₹499 /-
                    </p>
                    <div className="w-full max-w-2xl flex flex-col items-center gap-6">
                        <div className="w-full relative group p-[2.5px] rounded-full bg-gradient-to-r from-[#dec9ff] via-[#f7d5ff] to-[#d1ffef] shadow-[0_0_30px_rgba(192,132,252,0.15)] transition-all duration-300">
                            <PlaceholdersAndVanishInput
                                placeholders={[
                                    "Paste your YouTube Video Link or Channel URL",
                                    "Enter your YouTube video link...",
                                    "Paste your channel URL here...",
                                    "Search for your channel name...",
                                ]}
                                showIcon={true}
                                hideSubmit={false}
                                className="h-16 bg-white !max-w-none border-none"
                                onChange={(e) => setYoutubeLink(e.target.value)}
                                onSubmit={handleLaunchCampaign}
                            />
                        </div>
                        {/* Preview Section placed exactly below the input box */}
                        <div className="w-full">
                            {isFetchingPreview && (
                                <div className="w-full flex items-center justify-center py-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-dashed border-slate-200 animate-pulse mb-8 overflow-hidden h-[120px]">
                                    <Loader2 className="w-6 h-6 animate-spin text-[#E52D27]" />
                                    <span className="ml-3 text-[15px] font-medium text-slate-500 font-founders">Fetching YouTube Details...</span>
                                </div>
                            )}

                            {(!isFetchingPreview && (videoInfo || channelInfo)) && (
                                <div className="w-full bg-white border border-slate-100 rounded-xl p-3 flex flex-col relative overflow-hidden text-left shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500 mb-8 mx-auto xl:max-w-md">
                                    <div className="flex gap-4">
                                        <div className="shrink-0 w-[140px] aspect-video bg-black rounded-lg overflow-hidden relative shadow-md">
                                            <img 
                                                src={videoInfo?.thumbnail || channelInfo?.avatar || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=400&auto=format&fit=crop"} 
                                                alt="Preview" 
                                                className={videoInfo ? "w-full h-full object-cover" : "h-full w-auto mx-auto object-cover"}
                                            />
                                            {videoInfo && (
                                                <div className="absolute top-1.5 right-1.5 bg-black/70 backdrop-blur-sm text-white px-1.5 py-0.5 rounded text-[10px] font-bold">
                                                    {videoInfo.duration}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col flex-1 min-w-0 justify-center">
                                            <h3 className="font-bold text-slate-800 text-[14px] leading-tight line-clamp-2 pr-2">
                                                {videoInfo?.title || channelInfo?.title || "Fetching details..."}
                                            </h3>
                                            <div className="flex items-center gap-2 mt-2 text-slate-500">
                                                {(channelInfo?.avatar || videoInfo?.channelAvatar) && (
                                                    <img src={channelInfo?.avatar || videoInfo?.channelAvatar} alt="Avatar" className="w-4 h-4 rounded-full" />
                                                )}
                                                <span className="text-[13px] font-medium line-clamp-1">{videoInfo?.author || channelInfo?.name || channelInfo?.title || "Unknown Channel"}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#ff5a5f] to-[#c22143]" />
                                </div>
                            )}
                        </div>

                        {/* Format indicators indicators */}
                        <div className="flex flex-col items-center gap-6 relative z-10 w-full">
                            {/* Format Indicators */}
                            <div className="flex items-center justify-center gap-8 text-[14px] font-semibold text-slate-500 mt-2">
                                 <div className="flex items-center gap-2">
                                     <div className="w-5 h-5 bg-[#E52D27] rounded-sm flex items-center justify-center">
                                         <Play className="h-3 w-3 text-white fill-current" />
                                     </div>
                                     Video
                                 </div>
                                 <div className="flex items-center gap-2">
                                     <div className="w-5 h-5 bg-[#E52D27] rounded-sm flex items-center justify-center">
                                         <svg viewBox="0 0 24 24" className="w-4 h-4 text-white fill-current">
                                             <path d="M17.712 9.329c.14-.543.167-1.121.085-1.701-.137-.962-.577-1.853-1.238-2.514-.66-.66-1.551-1.1-2.512-1.236-.61-.086-1.206-.05-1.761.112l-1.547-1.442L2.513 11.232l1.642 1.541c-.42.505-.724 1.107-.866 1.773-.137.962.302 1.854.963 2.515.66.661 1.551 1.101 2.512 1.237.611.086 1.207.051 1.762-.112l1.547 1.443 8.226-8.683-1.642-1.541l2.055-2.186z"/>
                                         </svg>
                                     </div>
                                     Shorts
                                 </div>
                                 <div className="flex items-center gap-2">
                                     <div className="w-5 h-5 bg-slate-400 rounded-sm flex items-center justify-center">
                                         <Users className="h-3 w-3 text-white" />
                                     </div>
                                     Channel
                                 </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            
        </CampaignLayout>
    );
}
