"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    ChevronLeft,
    CheckCircle2,
    Search,
    RefreshCw,
    Inbox,
    ArrowLeft,
    Play,
    PlayCircle,
    ExternalLink
} from "lucide-react";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");

type Order = {
    _id: string;
    orderId: string;
    createdAt: string;
    status: string;
    plan?: { name?: string; price?: number; currency?: string; quantity?: number; type?: string };
    budget?: number;
    channel?: { name?: string; link?: string };
    videos?: Array<{ videoId?: string; title?: string; link?: string; thumb?: string; thumbnail?: string; viewsRequested?: number; }>;
    youtubeLink?: string;
    userId?: { name?: string; email?: string };
    targeting?: { country?: string; goal?: string; duration?: string; autoTargeting?: boolean; gender?: string; ages?: string[]; interests?: string[]; keywords?: string[]; };
};

export default function AdminCompleted() {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    useEffect(() => {
        const savedToken = localStorage.getItem("adminToken");
        if (savedToken) setToken(savedToken);
        else router.replace("/admin");
    }, [router]);

    useEffect(() => {
        if (token) fetchOrders();
    }, [token]);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/orders`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            setOrders(data.filter((o: Order) => o.status === "completed"));
        } catch (err) {
            console.warn(err);
        } finally {
            setLoading(false);
        }
    };

    const filteredOrders = useMemo(() => {
        if (!searchQuery) return orders;
        const q = searchQuery.toLowerCase();
        return orders.filter(o =>
            o.orderId.toLowerCase().includes(q) ||
            o.userId?.email?.toLowerCase().includes(q) ||
            o.userId?.name?.toLowerCase().includes(q)
        );
    }, [orders, searchQuery]);

    if (!token) return null;

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-6">
            <div className="max-w-[1400px] mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col">
                <div className="border-b px-8 py-6 flex items-center justify-between bg-white sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => router.push("/admin")}><ArrowLeft className="h-5 w-5" /></Button>
                        <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
                            <CheckCircle2 className="text-green-600" /> COMPLETED
                        </h1>
                        <div className="hidden md:flex relative w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                                placeholder="Search completed orders..."
                                className="w-full bg-slate-100 border-0 rounded-xl py-2 pl-10 pr-4 text-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={fetchOrders} disabled={loading}><RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /></Button>
                </div>

                <div className="flex-1">
                    {!selectedOrder ? (
                        <div className="divide-y text-sm">
                            {filteredOrders.length === 0 ? (
                                <div className="py-20 text-center text-slate-400 font-medium">No completed orders found</div>
                            ) : (
                                filteredOrders.map((o, index) => (
                                    <div 
                                        key={o._id} 
                                        onClick={() => setSelectedOrder(o)} 
                                        className="flex items-center px-8 py-4 cursor-pointer hover:bg-green-50/30 transition-all border-l-4 border-transparent hover:border-green-600"
                                    >
                                        <div className="w-1/4 flex items-center gap-3">
                                            <span className="text-[10px] font-black text-slate-300 w-4">{index + 1}</span>
                                            <div className="min-w-0 flex-1">
                                                <p className="font-bold text-slate-900 truncate pr-4">{o.userId?.name || "Anonymous"}</p>
                                                <span className="block text-[10px] font-normal text-slate-500">{o.userId?.email}</span>
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0 pr-4">
                                            <div className="text-sm truncate text-slate-500">
                                                {o.orderId} • <span className="text-green-600">{o.plan?.name || "Custom"}</span>
                                            </div>
                                            <div className="text-[11px] text-slate-400 truncate flex items-center gap-1.5 mt-0.5">
                                                <Play className="w-2.5 h-2.5" /> 
                                                {o.videos && o.videos[0] ? (o.videos[0].link || (o.videos[0].videoId ? `https://www.youtube.com/watch?v=${o.videos[0].videoId}` : "No link")) : (o.youtubeLink || "No link")}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-[10px] font-black uppercase px-2 py-1 rounded-full bg-green-100 text-green-800">Completed</div>
                                            <div className="w-36 text-right text-[10px] text-slate-400 font-bold leading-tight">
                                                {new Date(o.createdAt).toLocaleDateString()}<br/>
                                                {new Date(o.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    ) : (
                        <div className="p-8 space-y-8 animate-in fade-in slide-in-from-right-4">
                            <div className="flex items-center justify-between border-b pb-6">
                                <Button variant="ghost" onClick={() => setSelectedOrder(null)}><ArrowLeft className="mr-2 h-4 w-4" /> BACK</Button>
                                <div className="text-right">
                                    <h2 className="text-2xl font-black">{selectedOrder.orderId}</h2>
                                    <p className="text-[10px] font-black text-green-600 uppercase">Archive View</p>
                                </div>
                            </div>

                            <div className="grid lg:grid-cols-3 gap-4">
                                <div className="lg:col-span-2 space-y-4">
                                    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-1">
                                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Client</h3>
                                            <p className="font-bold text-base leading-tight">{selectedOrder.userId?.name}</p>
                                            <p className="text-slate-500 text-xs italic truncate">{selectedOrder.userId?.email}</p>
                                        </div>
                                        <div className="space-y-1 md:border-l md:border-slate-100 md:pl-6">
                                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Campaign</h3>
                                            <p className="font-bold text-sm">{selectedOrder.plan?.name}</p>
                                            <p className="font-black text-lg text-green-600">₹{selectedOrder.budget}</p>
                                        </div>
                                        <div className="space-y-1 md:border-l md:border-slate-100 md:pl-6 text-left">
                                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Source</h3>
                                            <p className="font-bold text-sm truncate">{selectedOrder.channel?.name || "ProfessorChess"}</p>
                                            <a href={selectedOrder.channel?.link} target="_blank" className="text-red-500 text-[10px] font-bold hover:underline">CHANNEL LINK</a>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-4">
                                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Targeting & Preferences</h3>
                                        <div className="grid grid-cols-3 gap-y-4 gap-x-4">
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Country</p>
                                                <p className="text-sm font-bold">{selectedOrder.targeting?.country || "Any"}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Duration</p>
                                                <p className="text-sm font-bold">{selectedOrder.targeting?.duration || "Default"}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Strategy</p>
                                                <div className="flex items-center gap-1.5 mt-1">
                                                    {selectedOrder.targeting?.autoTargeting !== false ? (
                                                        <span className="text-[11px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">AI ASSISTANT</span>
                                                    ) : (
                                                        <span className="text-[11px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100 uppercase">Manual</span>
                                                    )}
                                                </div>
                                            </div>
                                            {selectedOrder.targeting?.autoTargeting === false && (
                                                <>
                                                    <div>
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Gender</p>
                                                        <p className="text-sm font-bold capitalize">{selectedOrder.targeting.gender || "All"}</p>
                                                    </div>
                                                    <div className="col-span-2">
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Age Ranges</p>
                                                        <div className="flex flex-wrap gap-1.5 mt-1">
                                                            {(selectedOrder.targeting.ages || ["All Ages"]).map((age, i) => (
                                                                <span key={i} className="text-[11px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-lg border border-slate-200">{age}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="col-span-2">
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Interests</p>
                                                        <div className="flex flex-wrap gap-1.5 mt-1">
                                                            {(selectedOrder.targeting.interests || ["All Interests"]).map((interest, i) => (
                                                                <span key={i} className="text-[11px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-lg border border-slate-200 capitalize">{interest}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="col-span-2">
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Keywords & Phrases</p>
                                                        <div className="flex flex-wrap gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100 min-h-[44px]">
                                                            {(selectedOrder.targeting.keywords && selectedOrder.targeting.keywords.length > 0) ? (
                                                                selectedOrder.targeting.keywords.map((kw, i) => (
                                                                    <span key={i} className="text-[12px] font-bold bg-white text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 shadow-sm">{kw}</span>
                                                                ))
                                                            ) : (
                                                                <span className="text-[11px] font-bold text-slate-400 italic">No keywords specified</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-3">
                                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Videos & Content</h3>
                                        <div className="space-y-2">
                                            {selectedOrder.videos && selectedOrder.videos.length > 0 ? (
                                                selectedOrder.videos.map((v, i) => (
                                                    <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 group transition-all hover:bg-white hover:shadow-sm">
                                                        <div className="flex-1 min-w-0">
                                                            <a href={v.link || (v.videoId ? `https://www.youtube.com/watch?v=${v.videoId}` : "#")} target="_blank" className="text-red-600 font-bold hover:underline flex items-center gap-2 break-all text-sm">
                                                                <PlayCircle className="w-4 h-4 flex-shrink-0" /> {v.link || (v.videoId ? `https://www.youtube.com/watch?v=${v.videoId}` : "No link")}
                                                            </a>
                                                        </div>
                                                        {v.viewsRequested && (
                                                            <div className="flex-shrink-0 ml-4">
                                                                <span className="text-[10px] font-black bg-slate-900 text-white px-2.5 py-1 rounded-full uppercase tracking-tighter">
                                                                    {v.viewsRequested.toLocaleString()} VIEWS
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))
                                            ) : selectedOrder.youtubeLink ? (
                                                <div className="p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                                                    <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Legacy Link</p>
                                                    <a href={selectedOrder.youtubeLink} target="_blank" className="text-red-600 font-bold flex items-center gap-2 break-all hover:underline">
                                                        <PlayCircle className="w-4 h-4" /> {selectedOrder.youtubeLink}
                                                    </a>
                                                </div>
                                            ) : (
                                                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed text-slate-400 italic text-sm">
                                                    No videos linked to this order
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-4 shadow-xl h-fit">
                                    <h3 className="font-black italic text-green-500">SUMMARY</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center text-sm border-b border-slate-700 pb-3">
                                            <span className="text-slate-400">Date</span>
                                            <span className="font-bold">{new Date(selectedOrder.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm border-b border-slate-700 pb-3">
                                            <span className="text-slate-400">Status</span>
                                            <span className="font-black text-green-500 uppercase">Delivered</span>
                                        </div>
                                        <p className="text-[10px] text-slate-500 italic leading-relaxed pt-2">
                                            This order has been successfully fulfilled and archived. No further actions are required.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
