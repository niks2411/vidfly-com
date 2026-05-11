"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import CampaignHeader from "@/components/CampaignHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { getVerifiedEmail, getSelectedChannelKey } from "@/lib/verifiedEmail";
import CampaignLayout from "@/components/CampaignLayout";
import CampaignCard from "@/components/CampaignCard";

const STORAGE_KEY = "vidfly_channel_videos";
const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");

type StoredVideo = {
    title: string;
    author?: string;
    videoId: string;
    thumbnail: string;
    link: string;
    channelId?: string | null;
    avatarUrl?: string | null;
};

type PackageInfo = {
    id: string;
    label: string;
    price: string;
    views: number | string;
    ai?: boolean;
};

export default function CampaignPackageSelect() {
    const router = useRouter();
    const [verifiedEmail, setVerifiedEmail] = useState("");
    const [selectedPkg, setSelectedPkg] = useState<PackageInfo | null>(null);

    useEffect(() => {
        const email = getVerifiedEmail();
        if (!email) {
            router.replace("/get-started");
            return;
        }
        setVerifiedEmail(email);

        const storedPkg = sessionStorage.getItem("vidfly_selected_package");
        if (!storedPkg) {
            router.replace("/campaign/packages");
            return;
        }
        setSelectedPkg(JSON.parse(storedPkg));
    }, [router]);

    const [videos, setVideos] = useState<StoredVideo[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [search, setSearch] = useState("");
    const [tab, setTab] = useState<"recent" | "all">("recent");
    const [channelVideos, setChannelVideos] = useState<StoredVideo[]>([]);
    const [channelId, setChannelId] = useState<string | null>(null);
    const [loadingChannel, setLoadingChannel] = useState(false);
    const [searchResults, setSearchResults] = useState<StoredVideo[]>([]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            const stored = sessionStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                setVideos(parsed);
                if (parsed.length > 0) setSelectedIds([parsed[0].videoId]);
            }

            const channelKey = getSelectedChannelKey();
            const savedChannelId = localStorage.getItem(channelKey);
            if (savedChannelId) setChannelId(savedChannelId);
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        const fetchChannelVideos = async () => {
            if (!channelId) return;
            try {
                setLoadingChannel(true);
                const params = new URLSearchParams({ channelId, maxResults: "10", order: "date" });
                const response = await fetch(`${API_BASE_URL}/api/youtube/channel-videos?${params.toString()}`);
                if (response.ok) {
                    const data = await response.json();
                    setChannelVideos((data.videos || []).map((v: any) => ({
                        ...v,
                        avatarUrl: v.channelAvatar || v.avatarUrl || null,
                        link: v.link || `https://www.youtube.com/watch?v=${v.videoId}`,
                    })));
                }
            } catch (err) {
                console.warn(err);
            } finally {
                setLoadingChannel(false);
            }
        };
        fetchChannelVideos();
    }, [channelId]);

    useEffect(() => {
        const fetchSearch = async () => {
            if (!channelId || !search.trim()) {
                setSearchResults([]);
                return;
            }
            try {
                const params = new URLSearchParams({ channelId, maxResults: "10", query: search, order: "relevance" });
                const response = await fetch(`${API_BASE_URL}/api/youtube/channel-videos?${params.toString()}`);
                if (response.ok) {
                    const data = await response.json();
                    setSearchResults((data.videos || []).map((v: any) => ({
                        ...v,
                        avatarUrl: v.channelAvatar || v.avatarUrl || null,
                        link: v.link || `https://www.youtube.com/watch?v=${v.videoId}`,
                    })));
                }
            } catch (err) {
                console.warn(err);
            }
        };
        const timer = setTimeout(fetchSearch, 500);
        return () => clearTimeout(timer);
    }, [channelId, search]);

    const filteredVideos = useMemo(() => {
        if (search.trim()) return searchResults;
        if (tab === "recent") return channelVideos.slice(0, 5);
        return [...channelVideos, ...videos].filter((v, i, a) => a.findIndex(t => t.videoId === v.videoId) === i);
    }, [search, searchResults, tab, channelVideos, videos]);

    const handleNext = () => {
        if (!selectedIds.length || !selectedPkg) return;
        const allVideos = [...channelVideos, ...videos, ...searchResults];
        const selected = allVideos.find(v => v.videoId === selectedIds[0]);
        if (!selected) return;

        // Ensure we have the avatarUrl for the budget page
        const videoWithAvatar = { ...selected } as any;
        if (!videoWithAvatar.avatarUrl) {
            const channelInfoStr = sessionStorage.getItem("vidfly_channel_info");
            const channelKey = getSelectedChannelKey();
            const currentChannelId = localStorage.getItem(channelKey) || selected.channelId;
            
            if (channelInfoStr && currentChannelId) {
                try {
                    const infoList = JSON.parse(channelInfoStr);
                    const match = infoList.find((c: any) => c.channelId === currentChannelId);
                    if (match) videoWithAvatar.avatarUrl = match.avatar || match.channelAvatar;
                } catch (e) {}
            }
        }
        
        // Final fallback: if still no avatar, check if the video object itself had it under another key
        if (!videoWithAvatar.avatarUrl && (selected as any).channelAvatar) {
            videoWithAvatar.avatarUrl = (selected as any).channelAvatar;
        }

        const priceStr = String(selectedPkg.price);
        const priceNum = parseFloat(priceStr.replace(/[₹,]/g, ''));

        // Parse views to a clean number for the backend
        const viewsRaw = selectedPkg.views;
        const viewsCount = typeof viewsRaw === "string" 
            ? parseInt(viewsRaw.replace(/[^0-9]/g, "")) 
            : viewsRaw;

        // Clear any stale regular campaign states to prevent hijacking in the budget page
        sessionStorage.removeItem("vidfly_current_campaign_video");
        sessionStorage.removeItem("vidfly_current_campaign_videos");

        sessionStorage.setItem(STORAGE_KEY, JSON.stringify([videoWithAvatar]));
        sessionStorage.setItem("vidfly_budget_state", JSON.stringify({
            email: verifiedEmail,
            youtubeLink: videoWithAvatar.link,
            videoInfo: videoWithAvatar,
            videos: [videoWithAvatar],
            bulkViewsPackage: {
                id: selectedPkg.id,
                label: selectedPkg.label,
                price: selectedPkg.price,
                views: viewsCount,
            },
            campaignType: "packages",
            autoTargeting: selectedPkg.ai || false,
        }));

        router.push("/campaign/budget");
    };

    if (!selectedPkg) return null;

    return (
        <CampaignLayout activeSidebar="packages" showChannelSelector={true}>
            <CampaignCard>
                <div className="md:hidden flex gap-2 mb-6 px-1">
                    <div className="flex-1 h-1.5 rounded-full bg-cyan-400"></div>
                    <div className="flex-1 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                    <div className="flex-1 h-1.5 rounded-full bg-slate-100"></div>
                </div>

                <CampaignHeader showChannelSelector={false}>
                    <div className="flex items-center gap-4 flex-1 max-w-xl">
                        {[
                            { label: "Select Package", active: true, color: "bg-gradient-to-r from-blue-400 to-emerald-300" },
                            { label: "Select Video", active: true, color: "bg-gradient-to-r from-blue-400 to-emerald-300" },
                            { label: "Budget & Targeting", active: false, color: "bg-slate-200" }
                        ].map((step, index) => (
                            <div key={index} className="flex-1 flex flex-col items-start gap-2.5">
                                <div className={`h-[5px] w-full rounded-full ${step.color}`} />
                                <span className="text-[11px] font-bold text-slate-900 tracking-tight">{step.label}</span>
                            </div>
                        ))}
                    </div>
                </CampaignHeader>

                <div className="mt-4 mb-6 p-4 bg-purple-50 rounded-2xl border border-purple-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-purple-600 flex items-center justify-center text-white font-bold animate-pulse">
                            ★
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Selected Package</p>
                            <span className="font-bold text-slate-800">{selectedPkg.label}</span>
                        </div>
                    </div>
                    <span className="font-black text-purple-600 text-lg">{selectedPkg.price}</span>
                </div>

                <div className="space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 mb-2">Select Video</h1>
                        <p className="text-slate-600 text-sm">Which video should we promote with this package?</p>
                    </div>

                    <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-4 py-2 border border-slate-200">
                        <Search className="h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Search your video title"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border-0 bg-transparent focus-visible:ring-0"
                        />
                    </div>

                    <div className="space-y-3">
                        {loadingChannel ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="h-8 w-8 text-purple-500 animate-spin" />
                            </div>
                        ) : (
                            filteredVideos.map((v) => (
                                <div
                                    key={v.videoId}
                                    onClick={() => setSelectedIds([v.videoId])}
                                    className={`flex items-center gap-4 p-3 rounded-2xl border cursor-pointer transition-all ${selectedIds.includes(v.videoId) ? "bg-purple-50 border-purple-200 shadow-sm" : "bg-white border-slate-200 hover:border-purple-100"}`}
                                >
                                    <div className="w-24 h-16 rounded-lg overflow-hidden shrink-0 shadow-sm">
                                        <img src={v.thumbnail} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-slate-900 line-clamp-1">{v.title}</p>
                                        <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">{v.author}</p>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${selectedIds.includes(v.videoId) ? "bg-purple-600 border-purple-600 shadow-sm shadow-purple-200" : "border-slate-300"}`}>
                                        {selectedIds.includes(v.videoId) && <span className="text-white text-xs">✓</span>}
                                    </div>
                                </div>
                            ))
                        )}
                        {!loadingChannel && filteredVideos.length === 0 && (
                            <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                <p className="text-slate-400 text-sm">No videos found. Try a different search.</p>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-4 justify-end pt-6 border-t border-slate-100">
                        <Button variant="outline" className="rounded-xl h-12 px-8 text-slate-600 font-bold" onClick={() => router.back()}>BACK</Button>
                        <Button className="rounded-xl bg-slate-900 hover:bg-slate-800 h-12 px-8 font-bold text-white shadow-lg disabled:opacity-50" disabled={!selectedIds.length} onClick={handleNext}>
                            CONTINUE TO BUDGET
                        </Button>
                    </div>
                </div>
            </CampaignCard>
        </CampaignLayout>
    );
}
