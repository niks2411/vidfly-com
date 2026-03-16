"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import CampaignLayout from "@/components/CampaignLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
    Search, ArrowLeft, ArrowRight, Eye, 
    ThumbsUp, MessageSquare, CheckCircle2, Check, X,
    Loader2, Sparkles, Play
} from "lucide-react";
import { getVerifiedEmail, getSelectedChannelKey } from "@/lib/verifiedEmail";
import Image from "next/image";

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
        const timer = setTimeout(() => setIsScanning(false), 2500);
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
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Video Selection */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="flex flex-wrap items-center gap-4">
                            {[
                                { label: "Latest Upload", value: "recent" },
                                { label: "All Videos", value: "all" }
                            ].map(opt => (
                                <button
                                    key={opt.value}
                                    onClick={() => setTab(opt.value as any)}
                                    className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                                        tab === opt.value 
                                        ? "bg-slate-900 text-white shadow-sm" 
                                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
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
                                    className="pl-10 pr-10 py-5 bg-slate-50 border-slate-100 rounded-xl focus-visible:ring-purple-500/20 focus-visible:border-purple-500 transition-all text-sm"
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

                        <div className="hidden lg:block text-[14px] font-bold text-purple-600">
                            {selectedIds.length} Videos Selected
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {loadingChannel ? (
                                Array(4).fill(0).map((_, i) => (
                                    <div key={i} className="h-[120px] bg-slate-50 rounded-2xl animate-pulse border border-slate-100" />
                                ))
                            ) : channelVideos.map(video => {
                                const selected = selectedIds.includes(video.videoId);
                                return (
                                    <div
                                        key={video.videoId}
                                        onClick={() => toggleVideo(video.videoId)}
                                        className={`relative group cursor-pointer border-2 rounded-xl p-2.5 flex gap-3 transition-all duration-300 ${
                                            selected ? "border-purple-500 bg-white shadow-md" : "border-slate-100 bg-white hover:border-slate-200"
                                        }`}
                                    >
                                        <div className="relative w-32 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                                            <img src={video.thumbnail} className="w-full h-full object-cover" alt="" />
                                            <div className="absolute bottom-1 right-1 bg-black/80 text-[9px] text-white px-1 rounded font-bold">
                                                {parseISO8601Duration(video.duration)}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                                            <div>
                                                <h4 className="text-[12px] font-bold text-slate-800 line-clamp-2 leading-tight">
                                                    {video.title}
                                                </h4>
                                                <p className="text-[10px] text-slate-500 mt-1">
                                                    {formatNumber(video.viewCount)} Views • {formatDate(video.publishedAt)}
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2.5 text-slate-400">
                                                    <span className="flex items-center gap-1 text-[10px]">
                                                        <ThumbsUp className="w-2.5 h-2.5" /> {formatNumber(video.likeCount)}
                                                    </span>
                                                    <span className="flex items-center gap-1 text-[10px]">
                                                        <MessageSquare className="w-2.5 h-2.5" /> {formatNumber(video.commentCount)}
                                                    </span>
                                                </div>
                                                <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                                </svg>
                                            </div>
                                        </div>
                                        {selected && (
                                            <div className="absolute bottom-2 right-2 flex items-center justify-center w-5 h-5 bg-purple-500 rounded-[4px]">
                                                <Check className="w-3.5 h-3.5 text-white stroke-[3px]" />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Column: CTA Sidebar - Hidden on Mobile */}
                    <div className="hidden lg:block lg:col-span-4 space-y-6 sticky top-24">
                        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center">
                            <button
                                onClick={handleNext}
                                disabled={selectedIds.length === 0}
                                className="w-full h-[52px] bg-[rgb(51,136,244)] hover:bg-[rgb(40,120,220)] text-white rounded-[100px] flex items-center justify-center gap-2 text-[17px] font-black transition-all disabled:opacity-50 shadow-lg shadow-blue-100"
                            >
                                Continue to Budget <ArrowRight className="w-5 h-5 stroke-[3px]" />
                            </button>
                        </div>
                    </div>
                </div>
                )}

                {/* Mobile Sticky Footer */}
                {channelId && !loadingInitialChannel && (
                    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 shadow-[0_-8px_30px_rgb(0,0,0,0.06)] p-6 z-[100] rounded-t-[32px] animate-in slide-in-from-bottom-full duration-500">
                        <div className="max-w-md mx-auto space-y-4">
                            <div className="flex items-center justify-between px-2">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                                        <Play className="w-4 h-4 text-purple-600 fill-current" />
                                    </div>
                                    <div>
                                        <p className="text-[15px] font-black text-slate-800 leading-tight">
                                            {selectedIds.length} Videos Selected
                                        </p>
                                        <p className="text-[11px] font-bold text-slate-400">Targeting up to 5 videos</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleNext}
                                disabled={selectedIds.length === 0}
                                className="w-full h-[52px] bg-[rgb(51,136,244)] hover:bg-[rgb(40,120,220)] text-white rounded-[100px] flex items-center justify-center gap-2 text-[17px] font-black shadow-lg shadow-blue-100 transition-all active:scale-[0.98] disabled:opacity-50 disabled:bg-slate-200 disabled:shadow-none"
                            >
                                Next: Budget & Audience
                                <ArrowRight className="w-5 h-5 stroke-[3px]" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </CampaignLayout>
    );
}
