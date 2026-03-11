"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CampaignLayout from "@/components/CampaignLayout";
import { getVerifiedEmail } from "@/lib/verifiedEmail";
import {
    Play, Eye, Users, ChevronDown, Trash2, Zap, Monitor, ExternalLink, Loader2
} from "lucide-react";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");

type Order = {
    _id: string;
    orderId: string;
    status: string;
    createdAt: string;
    completedAt?: string;
    plan?: {
        name?: string;
        price?: number;
        currency?: string;
        quantity?: number;
        type?: string;
    };
    budget?: number;
    channel?: {
        name?: string;
        channelId?: string;
        link?: string;
        avatar?: string;
    };
    videos?: Array<{
        videoId?: string;
        title?: string;
        link?: string;
        thumbnail?: string;
        viewsRequested?: number;
    }>;
    campaignType?: string;
    source?: string;
    paymentId?: {
        status?: string;
        amount?: number;
        currency?: string;
    };
    targeting?: {
        goal?: string;
        country?: string;
        duration?: string;
    };
    freeViewsRedeemed?: number;
};

const statusConfig: Record<string, { label: string; color: string; bg: string; dot: string }> = {
    pending: { label: "Pending", color: "text-amber-700", bg: "bg-amber-50 border-amber-200", dot: "bg-amber-400" },
    payment_pending: { label: "Pending", color: "text-amber-700", bg: "bg-amber-50 border-amber-200", dot: "bg-amber-400" },
    paid: { label: "Paid", color: "text-blue-700", bg: "bg-blue-50 border-blue-200", dot: "bg-blue-400" },
    promotion_scheduled: { label: "Scheduled", color: "text-indigo-700", bg: "bg-indigo-50 border-indigo-200", dot: "bg-indigo-400" },
    in_progress: { label: "In Progress", color: "text-purple-700", bg: "bg-purple-50 border-purple-200", dot: "bg-purple-400" },
    completed: { label: "Completed", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200", dot: "bg-emerald-400" },
    failed: { label: "Failed", color: "text-red-700", bg: "bg-red-50 border-red-200", dot: "bg-red-400" },
};

const TABS = [
    { label: "Video", value: "video" },
    { label: "Channel", value: "channel" },
    { label: "Package", value: "package" },
];

const STATUS_OPTIONS = [
    "All Statuses", "Pending", "Paid", "Scheduled", "In Progress", "Completed", "Failed"
];

const parseISO8601Duration = (duration: string | null | undefined) => {
    if (!duration) return "";
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return "";
    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;
    if (hours > 0) return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

export default function MyCampaigns() {
    const router = useRouter();
    const [verifiedEmail, setVerifiedEmail] = useState<string | undefined>(undefined);
    const [mounted, setMounted] = useState(false);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState("video");
    const [statusFilter, setStatusFilter] = useState("All Statuses");
    const [channelFilter, setChannelFilter] = useState("All Channels");
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [showChannelDropdown, setShowChannelDropdown] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
        const email = getVerifiedEmail();
        setVerifiedEmail(email);
        if (!email) {
            router.replace("/get-started");
            return;
        }
        fetchCampaigns(email);
    }, [router]);

    // Close dropdowns on outside click
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const t = e.target as HTMLElement;
            if (!t.closest(".status-dropdown")) setShowStatusDropdown(false);
            if (!t.closest(".channel-dropdown")) setShowChannelDropdown(false);
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const fetchCampaigns = async (email: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `${API_BASE_URL}/api/orders/user?email=${encodeURIComponent(email.trim().toLowerCase())}`,
                { credentials: "include" }
            );
            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data?.message || "Unable to fetch campaigns");
            }
            const data = await response.json();
            setOrders(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load campaigns");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (orderId: string) => {
        if (!confirm("Are you sure you want to delete this campaign?")) return;
        setDeletingId(orderId);
        try {
            const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}`, {
                method: "DELETE",
                credentials: "include",
            });
            if (response.ok) {
                setOrders(prev => prev.filter(o => o.orderId !== orderId));
            }
        } catch (err) {
            console.error("Failed to delete campaign:", err);
        } finally {
            setDeletingId(null);
        }
    };

    if (!mounted || !verifiedEmail) return null;

    // Compute stats
    const totalVideosPromoted = orders.reduce((sum, o) => sum + (o.videos?.length || 0), 0);
    const totalViews = orders
        .filter(o => o.status === "completed" || o.status === "in_progress")
        .reduce((sum, o) => sum + (o.plan?.quantity || 0), 0);
    const totalSubscribers = orders
        .filter(o => o.status === "completed")
        .reduce((sum, o) => {
            if (o.targeting?.goal === "subscribers") return sum + (o.plan?.quantity || 0) * 0.1;
            return sum;
        }, 0);

    // Get unique channels for the channel filter
    const uniqueChannels = Array.from(
        new Map(
            orders
                .filter(o => o.channel?.name)
                .map(o => [o.channel!.channelId || o.channel!.name, o.channel!.name!])
        ).values()
    );

    // Filter orders
    const filteredOrders = orders.filter(order => {
        // Tab filter
        if (activeTab === "video" && order.source === "promote_channel") return false;
        if (activeTab === "channel" && order.source !== "promote_channel") return false;
        if (activeTab === "package" && order.plan?.type !== "bulk-views" && order.plan?.type !== "package") return false;

        // Status filter
        if (statusFilter !== "All Statuses") {
            const statusLabel = statusConfig[order.status]?.label || "";
            if (statusLabel !== statusFilter) return false;
        }

        // Channel filter
        if (channelFilter !== "All Channels") {
            if (order.channel?.name !== channelFilter) return false;
        }

        return true;
    });

    return (
        <CampaignLayout activeSidebar="campaigns">
            <div className="w-full max-w-5xl mx-auto px-4 lg:px-8 py-8">
                {/* Page Title */}
                <h1 className="section-heading !text-[28px] !mb-6">Campaigns</h1>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <StatCard
                        label="Videos promoted on Vidflyy"
                        value={totalVideosPromoted}
                        icon={<Monitor className="w-6 h-6 text-indigo-400" />}
                    />
                    <StatCard
                        label="Views generated through Vidflyy promotion"
                        value={totalViews}
                        icon={<Eye className="w-6 h-6 text-indigo-400" />}
                    />
                    <StatCard
                        label="Subscribers gained from Vidflyy campaigns"
                        value={Math.round(totalSubscribers)}
                        icon={<Users className="w-6 h-6 text-indigo-400" />}
                    />
                </div>

                {/* Tabs & Filters Row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-2">
                    {/* Tabs */}
                    <div className="flex bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
                        {TABS.map(tab => (
                            <button
                                key={tab.value}
                                onClick={() => setActiveTab(tab.value)}
                                className={`px-5 py-2.5 text-[13px] font-bold transition-all ${
                                    activeTab === tab.value
                                        ? "bg-white text-slate-900 shadow-sm border-b-2 border-indigo-500"
                                        : "text-slate-500 hover:text-slate-700 hover:bg-white/50"
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 ml-auto">
                        {/* Status Filter */}
                        <div className="relative status-dropdown">
                            <button
                                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] font-semibold text-slate-700 hover:border-slate-300 transition-all min-w-[150px] justify-between"
                            >
                                {statusFilter}
                                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showStatusDropdown ? "rotate-180" : ""}`} />
                            </button>
                            {showStatusDropdown && (
                                <div className="absolute z-20 top-full mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
                                    {STATUS_OPTIONS.map(opt => (
                                        <button
                                            key={opt}
                                            onClick={() => { setStatusFilter(opt); setShowStatusDropdown(false); }}
                                            className={`w-full text-left px-4 py-2.5 text-[13px] font-medium hover:bg-slate-50 transition-colors ${statusFilter === opt ? "bg-indigo-50 text-indigo-700 font-bold" : "text-slate-700"}`}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Channel Filter */}
                        <div className="relative channel-dropdown">
                            <button
                                onClick={() => setShowChannelDropdown(!showChannelDropdown)}
                                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[13px] font-semibold text-slate-700 hover:border-slate-300 transition-all min-w-[150px] justify-between"
                            >
                                {channelFilter}
                                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showChannelDropdown ? "rotate-180" : ""}`} />
                            </button>
                            {showChannelDropdown && (
                                <div className="absolute z-20 top-full mt-1 right-0 min-w-full bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
                                    <button
                                        onClick={() => { setChannelFilter("All Channels"); setShowChannelDropdown(false); }}
                                        className={`w-full text-left px-4 py-2.5 text-[13px] font-medium hover:bg-slate-50 transition-colors ${channelFilter === "All Channels" ? "bg-indigo-50 text-indigo-700 font-bold" : "text-slate-700"}`}
                                    >
                                        All Channels
                                    </button>
                                    {uniqueChannels.map(ch => (
                                        <button
                                            key={ch}
                                            onClick={() => { setChannelFilter(ch); setShowChannelDropdown(false); }}
                                            className={`w-full text-left px-4 py-2.5 text-[13px] font-medium hover:bg-slate-50 transition-colors whitespace-nowrap ${channelFilter === ch ? "bg-indigo-50 text-indigo-700 font-bold" : "text-slate-700"}`}
                                        >
                                            {ch}
                                        </button>
                                    ))}
                                </div>
                            )}
                            {uniqueChannels.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-indigo-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-sm">New</span>
                            )}
                        </div>
                    </div>
                </div>

                <p className="text-[11px] text-slate-400 font-medium mb-6">
                    Select a campaign type to view detailed performance reports.
                    {uniqueChannels.length > 0 && (
                        <span className="text-indigo-500 ml-2 float-right">Channel wise filters now available</span>
                    )}
                </p>

                {/* Error */}
                {error && (
                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 font-medium">
                        {error}
                    </div>
                )}

                {/* Campaign List */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-16">
                        <Loader2 className="w-8 h-8 text-slate-400 animate-spin mb-3" />
                        <p className="text-slate-400 text-sm font-medium">Loading campaigns...</p>
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-slate-200">
                            <Play className="h-7 w-7 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-1">
                            {orders.length === 0 ? "No campaigns yet" : "No results found"}
                        </h3>
                        <p className="text-slate-400 text-sm mb-6">
                            {orders.length === 0
                                ? "Start promoting your videos to see your campaigns here"
                                : "Try changing your filters to see more campaigns"}
                        </p>
                        {orders.length === 0 && (
                            <button
                                onClick={() => router.push("/campaign")}
                                className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all"
                            >
                                Create Your First Campaign
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredOrders.map(order => (
                            <CampaignRow
                                key={order._id}
                                order={order}
                                onDelete={() => handleDelete(order.orderId)}
                                deleting={deletingId === order.orderId}
                            />
                        ))}

                        <p className="text-center text-sm text-indigo-500 font-semibold pt-4 pb-2">
                            No more results!
                        </p>
                    </div>
                )}
            </div>
        </CampaignLayout>
    );
}

// ─── Stat Card ───────────────────────────────────────────────
function StatCard({ label, value, icon }: { label: string; value: string | number; icon: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-5 py-5 shadow-sm hover:shadow-md transition-shadow">
            <div>
                <p className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wide mb-2">{label}</p>
                <p className="text-[28px] font-extrabold text-slate-900 leading-none">{value}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100">
                {icon}
            </div>
        </div>
    );
}

// ─── Campaign Row ────────────────────────────────────────────
function CampaignRow({ order, onDelete, deleting }: { order: Order; onDelete: () => void; deleting: boolean }) {
    const router = useRouter();
    const statusInfo = statusConfig[order.status] || statusConfig.pending;
    const videos = order.videos || [];
    const videoCount = videos.length;
    const budget = order.plan?.price || order.budget || 0;
    const currency = order.plan?.currency === "USD" ? "$" : "₹";
    const isPending = order.status === "pending" || order.status === "payment_pending";

    // Build display title: join all video titles with " | "
    const displayTitle = videos.length > 0
        ? videos.map(v => v.title || "Untitled").join(" | ")
        : "Untitled Campaign";

    return (
        <div className="bg-white rounded-2xl border border-slate-100 px-5 py-4 flex items-center gap-4 hover:shadow-md transition-all group">
            {/* Thumbnails - stacked for multi-video */}
            <div className="shrink-0 relative" style={{ width: videoCount > 1 ? `${140 + Math.min(videoCount - 1, 2) * 16}px` : '140px' }}>
                {videoCount <= 1 ? (
                    <div className="w-[140px] aspect-video bg-black rounded-xl overflow-hidden shadow-sm">
                        {videos[0]?.thumbnail ? (
                            <img src={videos[0].thumbnail} alt="" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                                <Play className="w-8 h-8 text-white/30" />
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="relative" style={{ height: `${78 + Math.min(videoCount - 1, 2) * 8}px` }}>
                        {videos.slice(0, 3).reverse().map((video, idx, arr) => {
                            const stackIdx = arr.length - 1 - idx;
                            return (
                                <div
                                    key={idx}
                                    className="absolute w-[140px] aspect-video bg-black rounded-xl overflow-hidden border-2 border-white shadow-md"
                                    style={{
                                        left: `${stackIdx * 16}px`,
                                        top: `${stackIdx * 8}px`,
                                        zIndex: stackIdx + 1,
                                    }}
                                >
                                    {video.thumbnail ? (
                                        <img src={video.thumbnail} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                                            <Play className="w-6 h-6 text-white/30" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                        {videoCount > 3 && (
                            <div
                                className="absolute w-[140px] aspect-video rounded-xl bg-black/70 flex items-center justify-center border-2 border-white shadow-md"
                                style={{
                                    left: `${2 * 16}px`,
                                    top: `${2 * 8}px`,
                                    zIndex: 4,
                                }}
                            >
                                <span className="text-white font-extrabold text-lg">+{videoCount - 3}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <h3 className="text-[14px] font-bold text-slate-800 line-clamp-1 mb-1.5">{displayTitle}</h3>
                <div className="flex flex-wrap items-center gap-2 text-[12px]">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border font-bold ${statusInfo.bg} ${statusInfo.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot}`} />
                        {statusInfo.label}
                    </span>
                    <span className="text-slate-400 font-medium">Total Budget</span>
                    <span className="text-slate-800 font-extrabold">{currency}{budget.toLocaleString()}</span>
                    <span className="text-slate-300">|</span>
                    <span className="text-slate-400 font-medium">ID : {order.orderId}</span>
                    {videoCount > 1 && (
                        <>
                            <span className="text-slate-300">|</span>
                            <span className="text-indigo-500 font-bold">{videoCount} videos</span>
                        </>
                    )}
                </div>

                {/* Pay Now button for pending */}
                {isPending && (
                    <button
                        onClick={() => router.push(`/campaign/budget`)}
                        className="mt-2.5 inline-flex items-center gap-1.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-1.5 rounded-lg text-[12px] font-bold shadow-sm shadow-red-100 transition-all"
                    >
                        Pay Now <Zap className="w-3.5 h-3.5" />
                    </button>
                )}
            </div>

            {/* Delete */}
            <button
                onClick={onDelete}
                disabled={deleting}
                className="shrink-0 p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                title="Delete campaign"
            >
                {deleting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <Trash2 className="w-5 h-5" />
                )}
            </button>
        </div>
    );
}
