"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import CampaignHeader from "@/components/CampaignHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
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
};

type BulkPackage = {
    id: string;
    label: string;
    price: string;
    views: number;
};

export default function CampaignBulkViewsSelect() {
    const router = useRouter();
    const [verifiedEmail, setVerifiedEmail] = useState("");
    const [bulkViewsPackage, setBulkViewsPackage] = useState<BulkPackage | null>(null);

    useEffect(() => {
        const email = getVerifiedEmail();
        if (!email) {
            router.replace("/get-started");
            return;
        }
        setVerifiedEmail(email);

        const storedPkg = sessionStorage.getItem("vidfly_bulk_package");
        if (!storedPkg) {
            router.replace("/campaign/bulk-views");
            return;
        }
        setBulkViewsPackage(JSON.parse(storedPkg));
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
                        title: v.title,
                        author: v.author,
                        videoId: v.videoId,
                        thumbnail: v.thumbnail,
                        link: `https://www.youtube.com/watch?v=${v.videoId}`,
                        channelId,
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
                        title: v.title,
                        author: v.author,
                        videoId: v.videoId,
                        thumbnail: v.thumbnail,
                        link: `https://www.youtube.com/watch?v=${v.videoId}`,
                        channelId,
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
        if (!selectedIds.length || !bulkViewsPackage) return;
        const allVideos = [...channelVideos, ...videos];
        const selected = allVideos.find(v => v.videoId === selectedIds[0]);
        if (!selected) return;

        sessionStorage.setItem(STORAGE_KEY, JSON.stringify([selected]));
        sessionStorage.setItem("vidfly_budget_state", JSON.stringify({
            email: verifiedEmail,
            youtubeLink: selected.link,
            videoInfo: selected,
            videos: [selected],
            bulkViewsPackage,
            campaignType: "bulk-views",
        }));

        router.push("/campaign/budget");
    };

    if (!bulkViewsPackage) return null;

    return (
        <CampaignLayout activeSidebar="bulk" showChannelSelector={false}>
            <CampaignCard>
                <CampaignHeader showChannelSelector={false}>
                    <div className="flex items-center gap-4 flex-1 max-w-xl">
                        {[
                            { label: "Enter Link", active: true, color: "bg-gradient-to-r from-blue-400 to-emerald-300" },
                            { label: "Select Videos", active: true, color: "bg-gradient-to-r from-blue-400 to-emerald-300" },
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
                    <span className="font-bold text-slate-800">{bulkViewsPackage.label}</span>
                    <span className="font-bold text-purple-600">{bulkViewsPackage.price}</span>
                </div>

                <div className="space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 mb-2">Select Video</h1>
                        <p className="text-slate-600 text-sm">Select the video you want to promote with this bulk package.</p>
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
                        {loadingChannel && <div className="text-sm text-slate-500">Loading videos...</div>}
                        {filteredVideos.map((v) => (
                            <div
                                key={v.videoId}
                                onClick={() => setSelectedIds([v.videoId])}
                                className={`flex items-center gap-4 p-3 rounded-2xl border cursor-pointer transition-all ${selectedIds.includes(v.videoId) ? "bg-purple-50 border-purple-200 shadow-sm" : "bg-white border-slate-200 hover:border-purple-100"}`}
                            >
                                <img src={v.thumbnail} alt="" className="w-24 h-16 rounded-lg object-cover" />
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-slate-900 line-clamp-1">{v.title}</p>
                                    <p className="text-xs text-slate-500">{v.author}</p>
                                </div>
                                <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${selectedIds.includes(v.videoId) ? "bg-purple-600 border-purple-600 shadow-sm shadow-purple-200" : "border-slate-300"}`}>
                                    {selectedIds.includes(v.videoId) && <span className="text-white text-xs">✓</span>}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-4 justify-end pt-6 border-t border-slate-100">
                        <Button variant="outline" className="rounded-xl h-12 px-8 text-slate-600 font-bold" onClick={() => router.back()}>BACK</Button>
                        <Button className="rounded-xl bg-slate-900 hover:bg-slate-800 h-12 px-8 font-bold" disabled={!selectedIds.length} onClick={handleNext}>
                            CONTINUE TO BUDGET
                        </Button>
                    </div>
                </div>
            </CampaignCard>
        </CampaignLayout>
    );
}
