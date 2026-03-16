"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import CampaignLayout from "@/components/CampaignLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
    Search, ArrowLeft, ArrowRight, Eye, 
    ThumbsUp, MessageSquare, CheckCircle2, Check, X,
    Loader2, Sparkles, Play, Youtube
} from "lucide-react";
import { getVerifiedEmail, getSelectedChannelKey } from "@/lib/verifiedEmail";
import Image from "next/image";
import { motion } from "framer-motion";

type StoredVideo = {
    title: string;
    author?: string;
    videoId: string;
    thumbnail: string;
    link: string;
    channelId?: string | null;
    publishedAt?: string | null;
    duration?: string | null;
    viewCount?: string | number | null;
    likeCount?: string | number | null;
    commentCount?: string | number | null;
    avatarUrl?: string | null;
};

const STORAGE_KEY = "vidfly_channel_videos";
const CHANNEL_INFO_STORAGE_KEY = "vidfly_channel_info";
const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");

const formatNumber = (num: string | number | null | undefined) => {
    if (!num) return "0";
    const n = typeof num === "string" ? parseInt(num) : num;
    if (isNaN(n)) return "0";
    if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
    if (n >= 1000) return (n / 1000).toFixed(1) + "K";
    return n.toLocaleString();
};

const parseISO8601Duration = (duration: string | null | undefined) => {
    if (!duration) return "";
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return "";
    
    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;
    
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays >= 365) {
        const years = Math.floor(diffDays / 365);
        return `${years} year${years > 1 ? 's' : ''} ago`;
    }
    if (diffDays >= 30) {
        const months = Math.floor(diffDays / 30);
        return `${months} month${months > 1 ? 's' : ''} ago`;
    }
    return `${diffDays} days ago`;
};

export default function CampaignChannel() {
    const router = useRouter();
    const verifiedEmail = getVerifiedEmail();

    useEffect(() => {
        if (!verifiedEmail) {
            router.replace("/get-started");
        }
    }, [verifiedEmail, router]);

    const [videos, setVideos] = useState<StoredVideo[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [tab, setTab] = useState<"recent" | "all">("recent");
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
    const [channelVideos, setChannelVideos] = useState<StoredVideo[]>([]);
    const [channelId, setChannelId] = useState<string | null>(null);
    const [channelName, setChannelName] = useState("");
    const [subscriberCount, setSubscriberCount] = useState("");
    const [channelAvatar, setChannelAvatar] = useState("");
    const [loadingChannel, setLoadingChannel] = useState(false);
    const [loadingInitialChannel, setLoadingInitialChannel] = useState(true);
    const [isScanning, setIsScanning] = useState(true);
    const [cache, setCache] = useState<Record<string, { videos: StoredVideo[], info?: any }>>({});

    // Artificial scanning delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsScanning(false);
        }, 1200);
        return () => clearTimeout(timer);
    }, []);

    // Debounce search query
    useEffect(() => {
        if (!searchQuery.trim()) {
            setDebouncedSearchQuery("");
            return;
        }
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 500); // 500ms delay
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Fetch channel header info separately (cache it)
    useEffect(() => {
        const fetchChannelHeader = async () => {
            if (!channelId) return;
            const cacheKey = `info-${channelId}`;
            const cachedData = cache[cacheKey]?.info;
            
            // If fully cached (has subscriberCount), just use it
            if (cachedData && cachedData.subscriberCount) {
                if (cachedData.name) setChannelName(cachedData.name);
                if (cachedData.avatar) setChannelAvatar(cachedData.avatar);
                setSubscriberCount(cachedData.subscriberCount);
                return;
            }

            // If we have name/avatar from backend but need subscriberCount from YouTube
            try {
                const response = await fetch(`${API_BASE_URL}/api/youtube/channel-info?channelId=${encodeURIComponent(channelId)}`);
                if (response.ok) {
                    const data = await response.json();
                    // Only update name/avatar if they weren't already set from backend
                    if (!channelName && data.name) setChannelName(data.name);
                    if (!channelAvatar && data.avatar) setChannelAvatar(data.avatar);
                    setSubscriberCount(data.subscriberCount || "0");
                    setCache(prev => ({ ...prev, [cacheKey]: { ...(prev[cacheKey] || {videos: []}), info: { ...cachedData, ...data } } }));
                }
            } catch (err) { console.error(err); }
        };
        fetchChannelHeader();
    }, [channelId, cache]);

    const loadSavedChannels = useCallback(async () => {
        if (typeof window === "undefined" || !verifiedEmail) {
            setLoadingInitialChannel(false);
            return;
        }

        try {
            const cachedChannelInfo = sessionStorage.getItem(CHANNEL_INFO_STORAGE_KEY);
            if (cachedChannelInfo) {
                try {
                    const parsedInfo = JSON.parse(cachedChannelInfo);
                    if (parsedInfo && parsedInfo.length > 0) {
                        const channelKey = getSelectedChannelKey();
                        const savedChannelId = localStorage.getItem(channelKey);
                        if (!savedChannelId && parsedInfo[0]?.channelId) {
                            setChannelId(parsedInfo[0].channelId);
                        } else if (savedChannelId) {
                            setChannelId(savedChannelId);
                            // Use cached info for instant avatar display
                            const cachedCh = parsedInfo.find((c: any) => c.channelId === savedChannelId);
                            if (cachedCh) {
                                if (cachedCh.name) setChannelName(cachedCh.name);
                                if (cachedCh.avatar) setChannelAvatar(cachedCh.avatar);
                            }
                        }
                    }
                } catch (err) { console.error(err); }
            }

            const response = await fetch(
                `${API_BASE_URL}/api/user-preferences/channels?email=${encodeURIComponent(verifiedEmail)}`,
                { credentials: "include" }
            );

            if (response.ok) {
                const data = await response.json();
                if (data.channels && data.channels.length > 0) {
                    const channelKey = getSelectedChannelKey();
                    let targetChannelId = data.selectedChannelId || localStorage.getItem(channelKey) || data.channels[0].channelId;
                    
                    setChannelId(targetChannelId);

                    // Instantly set channel name & avatar from backend data (no extra YouTube API call needed)
                    const matchedChannel = data.channels.find((ch: any) => ch.channelId === targetChannelId);
                    if (matchedChannel) {
                        if (matchedChannel.channelName) setChannelName(matchedChannel.channelName);
                        if (matchedChannel.channelAvatar) setChannelAvatar(matchedChannel.channelAvatar);
                        
                        // Pre-populate cache so the fetchChannelHeader useEffect skips the API call
                        const infoCacheKey = `info-${targetChannelId}`;
                        setCache(prev => ({
                            ...prev,
                            [infoCacheKey]: {
                                ...(prev[infoCacheKey] || { videos: [] }),
                                info: {
                                    name: matchedChannel.channelName,
                                    avatar: matchedChannel.channelAvatar,
                                }
                            }
                        }));
                    }
                }
            }
        } catch (err) {
            console.warn("Failed to load channels:", err);
        } finally {
            setLoadingInitialChannel(false);
        }
    }, [verifiedEmail]);

    useEffect(() => { loadSavedChannels(); }, [loadSavedChannels]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            const parsed: StoredVideo[] = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");
            setVideos(parsed);
        } catch (err) { console.error(err); }
    }, []);

    // Reset selection when channel changes to prevent "ghost" selections from previous channels
    useEffect(() => {
        if (channelId) {
            setSelectedIds([]);
        }
    }, [channelId]);

    useEffect(() => {
        const fetchVideos = async () => {
            if (!channelId) return;
            
            const normalizedQuery = tab === 'all' ? debouncedSearchQuery.trim().toLowerCase() : "";
            const cacheKey = `videos-${channelId}-${tab}-${normalizedQuery}`;

            if (cache[cacheKey]) {
                setChannelVideos(cache[cacheKey].videos);
                return;
            }

            try {
                setLoadingChannel(true);
                const params = new URLSearchParams({
                    channelId,
                    maxResults: "5",
                    order: tab === 'recent' ? 'date' : 'relevance'
                });
                
                if (tab === 'all' && normalizedQuery) {
                    params.append('query', normalizedQuery);
                }

                const videosResponse = await fetch(`${API_BASE_URL}/api/youtube/channel-videos?${params.toString()}`);
                if (videosResponse.ok) {
                    const data = await videosResponse.json();
                    const mapped = (data.videos || []).map((v: any) => ({
                        ...v,
                        videoId: v.videoId,
                        author: v.author,
                        thumbnail: v.thumbnail,
                        duration: v.duration,
                        publishedAt: v.publishedAt,
                        viewCount: v.viewCount,
                        likeCount: v.likeCount,
                        commentCount: v.commentCount
                    }));
                    setChannelVideos(mapped);
                    setCache(prev => ({ ...prev, [cacheKey]: { videos: mapped } }));
                    
                    if (selectedIds.length === 0 && mapped.length > 0) {
                        setSelectedIds(mapped.slice(0, 5).map((v: any) => v.videoId));
                    }
                }
            } catch (err) { console.error(err); } finally { setLoadingChannel(false); }
        };
        fetchVideos();
    }, [channelId, tab, debouncedSearchQuery, cache, selectedIds.length]);

    const toggleVideo = (videoId: string) => {
        setSelectedIds(prev => prev.includes(videoId) ? prev.filter(id => id !== videoId) : prev.length >= 5 ? prev : [...prev, videoId]);
    };

    const handleNext = () => {
        if (!selectedIds.length) return;
        const videoMap = new Map(channelVideos.map(v => [v.videoId, v]));
        const selectedVideos = selectedIds.map(id => {
            const video = videoMap.get(id);
            if (video) {
                return { ...video, avatarUrl: channelAvatar };
            }
            return null;
        }).filter(Boolean);
        
        sessionStorage.setItem("vidfly_current_campaign_video", JSON.stringify(selectedVideos[0]));
        sessionStorage.setItem("vidfly_current_campaign_videos", JSON.stringify(selectedVideos));
        router.push("/campaign/budget");
    };

    return (
        <CampaignLayout activeSidebar="channel" hideSidebar={true}>
            <div className="w-full max-w-4xl mx-auto px-4 lg:px-6 space-y-4 pb-[180px] lg:pb-12 pt-4">
                {/* Header & Progress */}
                {/* Header & Progress */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4">
                    {/* Go Back - Desktop Only */}
                    <button onClick={() => router.back()} className="hidden md:flex items-center gap-3 group">
                        <div className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all bg-white shadow-sm">
                            <ArrowLeft className="w-5 h-5 text-slate-900" />
                        </div>
                        <span className="font-extrabold text-[19px] text-slate-900 tracking-tight">Select Videos to Promote</span>
                    </button>

                    {/* Mobile Title - No Back Button */}
                    <div className="md:hidden flex flex-col gap-1 px-1">
                        <h1 className="font-black text-[28px] text-slate-900 tracking-tight leading-tight">Select Videos</h1>
                        <p className="text-[14px] font-bold text-slate-400">Choose up to 5 videos to promote</p>
                    </div>

                    {/* Progress Stepper - Desktop Only */}
                    <div className="hidden md:block flex-1 max-w-xl pt-0.5 md:ml-12 lg:ml-16">
                        <div className="flex items-center gap-2 md:gap-4 flex-wrap md:flex-nowrap">
                            {[
                                { label: "Enter Link", active: true, color: "bg-gradient-to-r from-blue-400 to-emerald-300" },
                                { label: "Select Videos", active: true, color: "bg-gradient-to-r from-blue-400 to-emerald-300" },
                                { label: "Budget & Targeting", active: false, color: "bg-slate-200" }
                            ].map((step, index) => (
                                <div key={index} className="flex-1 min-w-[80px] flex flex-col items-start gap-2.5">
                                    <div className={`h-[5px] w-full rounded-full ${step.color}`} />
                                    <span className="text-[10px] md:text-[11px] font-bold text-slate-900 tracking-tight whitespace-nowrap">{step.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {!loadingInitialChannel && !channelId ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto">
                        <div className="w-20 h-20 rounded-full bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center mb-6">
                            <svg className="w-10 h-10 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-extrabold text-slate-800 mb-2">No Channel Found</h3>
                        <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                            To promote your channel, please first <span className="font-bold text-slate-700">promote a video</span>. This will automatically add your channel to the selector.
                        </p>
                        <button
                            onClick={() => router.push("/campaign")}
                            className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-8 py-3 flex items-center gap-2 font-bold transition-all text-[14px] shadow-lg shadow-slate-200"
                        >
                            Promote a Video First <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                ) : loadingInitialChannel ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-slate-400 animate-spin mb-3" />
                        <p className="text-slate-400 text-sm font-medium">Loading your channels...</p>
                    </div>
                ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                    {/* Left Column: Video Selection */}
                    <div className="lg:col-span-8 space-y-5">
                        <div className="flex flex-wrap items-center gap-3">
                            {[
                                { label: "Latest Upload", value: "recent" },
                                { label: "Trending", value: "trending" },
                                { label: "All Videos", value: "all" }
                            ].map(opt => (
                                <button
                                    key={opt.value}
                                    onClick={() => setTab(opt.value as any)}
                                    className={`px-5 py-2 rounded-lg text-[13px] font-black transition-all ${
                                        tab === opt.value 
                                        ? "bg-slate-900 text-white shadow-lg" 
                                        : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-100"
                                    }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>

                        {tab === 'all' && (
                            <div className="relative">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <Input 
                                    placeholder="Search specific video from this channel..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 pr-10 py-4.5 bg-white border-slate-200 rounded-xl focus-visible:ring-purple-500/20 focus-visible:border-purple-500 transition-all text-sm font-medium"
                                />
                                {searchQuery && (
                                    <button 
                                        onClick={() => setSearchQuery("")}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 rounded-full transition-colors"
                                    >
                                        <X className="w-3 h-3 text-slate-500" />
                                    </button>
                                )}
                            </div>
                        )}

                        <div className="text-[12px] font-black text-purple-600 bg-purple-50 px-3 py-1 rounded-full inline-block">
                            {selectedIds.length} Videos Selected
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {(loadingChannel || isScanning) ? (
                                Array(6).fill(0).map((_, i) => (
                                    <div key={i} className="h-[90px] bg-slate-50/50 rounded-xl animate-pulse border border-slate-100" />
                                ))
                            ) : channelVideos.map(video => {
                                const selected = selectedIds.includes(video.videoId);
                                return (
                                    <div
                                        key={video.videoId}
                                        onClick={() => toggleVideo(video.videoId)}
                                        className={`relative group cursor-pointer border-2 rounded-xl p-2 flex gap-3 transition-all duration-300 ${
                                            selected ? "border-purple-500 bg-white shadow-lg shadow-purple-500/5 ring-1 ring-purple-500/10" : "border-slate-100 bg-white hover:border-purple-200"
                                        }`}
                                    >
                                        <div className="relative w-32 h-18 flex-shrink-0 rounded-lg overflow-hidden shadow-sm">
                                            <img src={video.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                                            <div className="absolute bottom-1 right-1 bg-black/80 text-[9px] text-white px-1.5 py-0.5 rounded font-black backdrop-blur-sm">
                                                {parseISO8601Duration(video.duration)}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                                            <div>
                                                <h4 className="text-[13px] font-bold text-slate-900 line-clamp-2 leading-[1.2]">
                                                    {video.title}
                                                </h4>
                                                <p className="text-[10px] text-slate-500 mt-1 font-medium">
                                                    {formatNumber(video.viewCount)} Views • {formatDate(video.publishedAt)}
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                {/* YouTube indicator removed */}
                                            </div>
                                        </div>
                                        
                                        <div className={`absolute bottom-2 right-2 w-4.5 h-4.5 rounded-md flex items-center justify-center transition-all ${
                                            selected ? "bg-purple-600 scale-100 shadow-lg shadow-purple-200" : "border-2 border-slate-200 scale-90 opacity-0 group-hover:opacity-100"
                                        }`}>
                                            <Check className="w-3 h-3 text-white stroke-[4px]" />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Column: Compact Sidebar */}
                    <div className="hidden lg:block lg:col-span-4 sticky top-24">
                        <div className="bg-white rounded-[24px] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden min-h-[450px] flex flex-col">
                            {/* Profile Header - More Compact */}
                            <div className="p-5 pb-4">
                                <div className="flex items-center gap-3">
                                    {channelAvatar ? (
                                        <img src={channelAvatar} className="w-11 h-11 rounded-full object-cover border-2 border-slate-50 shadow-sm" alt="" />
                                    ) : (
                                        <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                            <Users className="w-5 h-5" />
                                        </div>
                                    )}
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-1.5">
                                            <h3 className="text-[15px] font-black text-slate-900 truncate tracking-tight">{channelName || "Your Channel"}</h3>
                                        </div>
                                        <p className="text-[11px] font-bold text-slate-400">{formatNumber(subscriberCount)} Subscribers</p>
                                    </div>
                                </div>
                            </div>

                            <div className="px-5"><div className="h-px bg-slate-50 w-full" /></div>

                            {/* Center Success Message or Scanner - Reduced Padding */}
                            <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
                                {isScanning ? (
                                    <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">
                                         <div className="relative w-24 h-24 mb-6">
                                            <motion.div 
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                                className="absolute inset-0 border-[3px] border-dashed border-red-500/20 rounded-full"
                                            />
                                            <motion.div 
                                                animate={{ top: ["15%", "85%", "15%"] }}
                                                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                                                className="absolute left-[15%] right-[15%] h-[1.5px] bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] z-10"
                                            />
                                            <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center shadow-lg border border-slate-50 overflow-hidden">
                                                <Search className="w-7 h-7 text-red-600 relative z-20" />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="text-[16px] font-black text-slate-900 tracking-tight">Scanning...</h4>
                                            <div className="flex items-center justify-center gap-1.5 text-red-600 font-bold text-[9px] uppercase tracking-wider">
                                                <Sparkles className="w-2.5 h-2.5 animate-pulse" />
                                                Analyzing
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center animate-in zoom-in-95 duration-500 w-full">
                                        <motion.div 
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-6"
                                        >
                                            <div className="w-14 h-14 rounded-full border-[2.5px] border-red-600 flex items-center justify-center">
                                                <Check className="w-6 h-6 text-red-600 stroke-[3px]" />
                                            </div>
                                        </motion.div>

                                        <h4 className="text-[16px] font-bold text-slate-400 tracking-tight mb-6">
                                            Ready to boost your channel!
                                        </h4>

                                        {/* Pro Tip Box - More Compact */}
                                        <div className="relative w-full text-left bg-[#f4f7f9] rounded-xl p-4 pl-12">
                                            <div className="absolute left-[-10px] top-1/2 -translate-y-1/2">
                                                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500 shadow-lg">
                                                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
                                                </div>
                                            </div>
                                            <p className="text-[11px] leading-relaxed text-slate-700">
                                                <span className="font-black text-slate-900">Pro Tip:</span> Promoting <span className="font-black">multiple videos</span> together helps the algorithm learn faster.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Action Button - Reduced Height */}
                            <div className="p-5 pt-0">
                                <button
                                    onClick={handleNext}
                                    disabled={selectedIds.length === 0 || isScanning}
                                    className="w-full h-[54px] bg-[rgb(51,136,244)] hover:bg-[rgb(41,126,234)] text-white rounded-[18px] flex items-center justify-center gap-2 text-[15px] font-black transition-all disabled:opacity-50 shadow-lg shadow-[rgb(51,136,244)]/20 active:scale-95"
                                >
                                    Next: Budget & Audience
                                    <ArrowRight className="w-4 h-4 stroke-[4px]" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                )}

                {/* Mobile Sticky Footer (Simplified) */}
                {channelId && !loadingInitialChannel && (
                    <div className="lg:hidden fixed bottom-6 left-6 right-6 z-[100] animate-in slide-in-from-bottom-full duration-500">
                         <div className="bg-white/80 backdrop-blur-xl rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/20 p-4">
                                <button
                                    onClick={handleNext}
                                    disabled={selectedIds.length === 0 || isScanning}
                                    className="w-full h-[60px] bg-[rgb(51,136,244)] hover:bg-[rgb(41,126,234)] text-white rounded-[18px] flex items-center justify-center gap-3 text-[16px] font-extrabold shadow-lg shadow-[rgb(51,136,244)]/20 active:scale-95 transition-all"
                                >
                                    Next: Budget & Audience
                                    <ArrowRight className="w-5 h-5 stroke-[4px]" />
                                </button>
                         </div>
                    </div>
                )}
            </div>
        </CampaignLayout>
    );
}
