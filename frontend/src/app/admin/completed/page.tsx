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
    ArrowLeft
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
    videos?: Array<{ videoId?: string; title?: string; link?: string; viewsRequested?: number; }>;
    userId?: { name?: string; email?: string };
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
        <div className="min-h-screen bg-slate-50 pt-20 pb-12 px-6 mt-16">
            <div className="max-w-[1400px] mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col h-[85vh]">
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

                <div className="flex-1 overflow-y-auto">
                    {!selectedOrder ? (
                        <div className="divide-y text-sm">
                            {filteredOrders.length === 0 ? (
                                <div className="py-20 text-center text-slate-400 font-medium">No completed orders found</div>
                            ) : (
                                filteredOrders.map(o => (
                                    <div key={o._id} onClick={() => setSelectedOrder(o)} className="flex items-center px-8 py-4 cursor-pointer hover:bg-green-50/30 transition-all border-l-4 border-transparent hover:border-green-600">
                                        <div className="w-1/4 font-bold text-slate-900">{o.userId?.name} <span className="block text-[10px] font-normal text-slate-500">{o.userId?.email}</span></div>
                                        <div className="flex-1 text-slate-600 truncate">{o.orderId} • <span className="font-bold">{o.plan?.name}</span> • {o.channel?.name}</div>
                                        <div className="w-24 text-right text-xs text-slate-400 font-bold">{new Date(o.createdAt).toLocaleDateString()}</div>
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

                            <div className="grid lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-6">
                                    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-3">
                                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Client Details</h3>
                                        <p className="font-bold text-lg">{selectedOrder.userId?.name}</p>
                                        <p className="text-slate-500 text-sm italic">{selectedOrder.userId?.email}</p>
                                    </div>

                                    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-3">
                                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Campaign Metrics</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div><p className="text-[10px] font-bold text-slate-400 uppercase">Final Plan</p><p className="font-bold">{selectedOrder.plan?.name}</p></div>
                                            <div><p className="text-[10px] font-bold text-slate-400 uppercase">Revenue</p><p className="font-black text-xl text-green-600">₹{selectedOrder.budget}</p></div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-3">
                                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target</h3>
                                        <p className="font-bold">{selectedOrder.channel?.name}</p>
                                        <a href={selectedOrder.channel?.link} target="_blank" className="text-red-600 text-sm truncate block">{selectedOrder.channel?.link}</a>
                                    </div>
                                </div>

                                <div className="bg-slate-900 text-white rounded-3xl p-8 space-y-6 shadow-2xl h-fit">
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
