"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Mail,
    ChevronLeft,
    Trash2,
    ExternalLink,
    CheckCircle2,
    AlertCircle,
    Search,
    RefreshCw,
    Inbox,
    ArrowLeft,
    Play,
    PlayCircle,
    X
} from "lucide-react";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");

type Order = {
    _id: string;
    orderId: string;
    campaignType?: string;
    createdAt: string;
    status: string;
    plan?: { name?: string; price?: number; currency?: string; quantity?: number; type?: string };
    budget?: number;
    channel?: { name?: string; link?: string };
    videos?: Array<{ videoId?: string; title?: string; link?: string; thumb?: string; thumbnail?: string; viewsRequested?: number; }>;
    youtubeLink?: string;
    userId?: { name?: string; email?: string };
    paymentId?: { status?: string };
    targeting?: { country?: string; goal?: string; duration?: string; autoTargeting?: boolean; gender?: string; ages?: string[]; interests?: string[]; keywords?: string[]; };
    isRead?: boolean;
    viewsGenerated?: number;
    subscribersGained?: number;
    audienceReached?: number;
};

const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    payment_pending: "bg-orange-100 text-orange-800",
    paid: "bg-blue-100 text-blue-800",
    promotion_scheduled: "bg-purple-100 text-purple-800",
    in_progress: "bg-indigo-100 text-indigo-800",
    completed: "bg-green-100 text-green-800",
    failed: "bg-red-100 text-red-800",
};

export default function AdminPanel() {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loginError, setLoginError] = useState<string | null>(null);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [showVerification, setShowVerification] = useState(false);
    const [pendingStatus, setPendingStatus] = useState("");
    const [viewsGenerated, setViewsGenerated] = useState<string>("0");
    const [subscribersGained, setSubscribersGained] = useState<string>("0");
    const [audienceReached, setAudienceReached] = useState<string>("0");
    const [stats, setStats] = useState<{ totalUsers: number; totalOrders: number; pendingOrders: number; successOrders: number } | null>(null);

    useEffect(() => {
        const savedToken = localStorage.getItem("adminToken");
        if (savedToken) setToken(savedToken);
    }, []);

    useEffect(() => {
        if (token) {
            fetchOrders();
            fetchStats();
        }
    }, [token]);

    const fetchStats = async () => {
        if (!token) return;
        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/dashboard/stats`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            }
        } catch (err) {
            console.error("Failed to fetch stats", err);
        }
    };

    const fetchOrders = async () => {
        if (!token) return;
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/orders`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!response.ok) throw new Error("Unauthorized");
            const data = await response.json();
            setOrders(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load orders");
            if (err instanceof Error && err.message === "Unauthorized") {
                localStorage.removeItem("adminToken");
                setToken(null);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Login failed");
            localStorage.setItem("adminToken", data.token);
            setToken(data.token);
        } catch (err) {
            setLoginError(err instanceof Error ? err.message : "Login failed");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        setToken(null);
        setOrders([]);
    };

    const filteredOrders = useMemo(() => {
        let filtered = orders.filter(o => o.status !== "completed");
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter(o =>
                o.orderId.toLowerCase().includes(q) ||
                o.userId?.email?.toLowerCase().includes(q) ||
                o.userId?.name?.toLowerCase().includes(q)
            );
        }
        return filtered;
    }, [orders, searchQuery]);

    const handleStatusUpdate = async () => {
        if (!token || !selectedOrder || verificationCode !== "admin123") {
            setError("Invalid verification code");
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/orders/${selectedOrder.orderId}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: pendingStatus }),
            });
            if (!response.ok) throw new Error("Update failed");
            setShowVerification(false);
            setVerificationCode("");
            fetchOrders();
            fetchStats();
            setSelectedOrder(null);
        } catch (err) {
            setError("Failed to update status");
        }
    };

    const handleStatsUpdate = async () => {
        if (!token || !selectedOrder) return;
        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/orders/${selectedOrder.orderId}/stats`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    viewsGenerated: parseInt(viewsGenerated) || 0,
                    subscribersGained: parseInt(subscribersGained) || 0,
                    audienceReached: parseInt(audienceReached) || 0
                })
            });
            if (!response.ok) throw new Error("Update failed");
            const updatedOrder = await response.json();
            setOrders(prev => prev.map(o => o.orderId === selectedOrder.orderId ? { ...o, ...updatedOrder } : o));
            setSelectedOrder({ ...selectedOrder, ...updatedOrder });
            alert("Stats updated successfully");
        } catch (err) {
            setError("Failed to update stats");
        }
    };

    const handleSelectOrder = async (order: Order) => {
        setSelectedOrder(order);
        setViewsGenerated(String(order.viewsGenerated || 0));
        setSubscribersGained(String(order.subscribersGained || 0));
        setAudienceReached(String(order.audienceReached || 0));
        if (!order.isRead && token) {
            try {
                await fetch(`${API_BASE_URL}/api/admin/orders/${order.orderId}/read`, {
                    method: "PUT",
                    headers: { Authorization: `Bearer ${token}` }
                });
                setOrders(prev => prev.map(o => o._id === order._id ? { ...o, isRead: true } : o));
            } catch (err) {
                console.error("Failed to mark as read");
            }
        }
    };

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
                <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 space-y-6">
                    <h1 className="text-3xl font-black text-center text-slate-900 italic tracking-tighter">VIDFLY ADMIN</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required className="h-12 rounded-xl" />
                        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="h-12 rounded-xl" />
                        {loginError && <p className="text-sm text-red-600 font-medium">{loginError}</p>}
                        <Button type="submit" className="w-full h-12 bg-slate-900 hover:bg-black rounded-xl font-bold">SIGN IN</Button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-6">
            <div className="max-w-[1400px] mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col">
                <div className="border-b px-8 py-6 flex items-center justify-between bg-white sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
                            <Inbox className="text-red-600" /> INBOX
                        </h1>
                        <div className="hidden md:flex relative w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                                placeholder="Search orders..."
                                className="w-full bg-slate-100 border-0 rounded-xl py-2 pl-10 pr-4 text-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        {stats && (
                            <div className="flex items-center gap-6 mr-6 border-r pr-6 border-slate-100">
                                <div className="text-center">
                                    <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">Users</p>
                                    <p className="text-lg font-black text-slate-900 leading-none">{stats.totalUsers}</p>
                                </div>
                            </div>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => router.push("/admin/completed")} className="text-green-700 font-bold hover:bg-green-50">COMPLETED</Button>
                        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-600 font-bold hover:bg-red-50">LOGOUT</Button>
                    </div>
                </div>

                <div className="flex-1">
                    {!selectedOrder ? (
                        <div className="divide-y">
                            {filteredOrders.length === 0 ? (
                                <div className="py-20 text-center text-slate-400 font-medium">No orders found</div>
                            ) : (
                                filteredOrders.map((o, index) => (
                                    <div 
                                        key={o._id} 
                                        onClick={() => handleSelectOrder(o)} 
                                        className={`flex items-center px-8 py-4 cursor-pointer transition-all ${o.isRead ? 'bg-white' : 'bg-slate-50'} hover:bg-slate-100`}
                                    >
                                        <div className="w-1/4 flex items-center gap-3">
                                            <span className="text-[10px] font-black text-slate-300 w-4">{index + 1}</span>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-2">
                                                    {!o.isRead && <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse flex-shrink-0" />}
                                                    <p className={`font-bold ${o.isRead ? 'text-slate-600' : 'text-slate-900'} truncate`}>{o.userId?.name || "Anonymous"}</p>
                                                </div>
                                                <span className="block text-[10px] font-normal text-slate-500">{o.userId?.email}</span>
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0 pr-4">
                                            <div className={`text-sm truncate ${o.isRead ? 'text-slate-500' : 'text-slate-900 font-bold'}`}>
                                                {o.orderId} • <span className="text-red-600">{o.plan?.name || "Custom"}</span>
                                            </div>
                                            <div className="text-[11px] text-slate-400 truncate flex items-center gap-1.5 mt-0.5">
                                                <Play className="w-2.5 h-2.5" /> 
                                                {o.videos && o.videos[0] ? (o.videos[0].link || (o.videos[0].videoId ? `https://www.youtube.com/watch?v=${o.videos[0].videoId}` : "No link")) : (o.youtubeLink || "No link")}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className={`text-[10px] font-black uppercase px-2 py-1 rounded-full ${statusColors[o.status]}`}>{o.status}</div>
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
                                <h2 className="text-2xl font-black">{selectedOrder.orderId}</h2>
                            </div>

                            <div className="grid lg:grid-cols-12 gap-5">
                                <div className="lg:col-span-8 space-y-4">
                                    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-1">
                                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Client</h3>
                                            <p className="font-bold text-base leading-tight">{selectedOrder.userId?.name}</p>
                                            <p className="text-slate-500 text-xs italic truncate">{selectedOrder.userId?.email}</p>
                                        </div>
                                        <div className="space-y-1 md:border-l md:border-slate-100 md:pl-6">
                                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Campaign</h3>
                                            <p className="font-bold text-sm">{selectedOrder.plan?.name}</p>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-[10px] text-slate-400 font-bold uppercase">Budget</span>
                                                <p className="font-black text-lg text-red-600">₹{selectedOrder.budget}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-1 md:border-l md:border-slate-100 md:pl-6 text-left">
                                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Source</h3>
                                            <p className="font-bold text-sm truncate">{selectedOrder.channel?.name || "ProfessorChess"}</p>
                                            <a href={selectedOrder.channel?.link} target="_blank" className="text-blue-500 text-[10px] font-bold hover:underline">CHANNEL LINK</a>
                                        </div>
                                    </div>

                                    <Section title="Targeting & Preferences">
                                        <div className="grid grid-cols-3 gap-y-3 gap-x-4">
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
                                                        <span className="flex items-center gap-1 text-[11px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                                                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                                            AI ASSISTANT
                                                        </span>
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
                                                    <div className="col-span-3">
                                                        <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Keywords & Phrases</p>
                                                        <div className="flex flex-wrap gap-2 p-2 bg-slate-50 rounded-xl border border-slate-100 min-h-[36px]">
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
                                    </Section>

                                    <Section title="Videos & Content">
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
                                    </Section>
                                </div>

                                <div className="lg:col-span-4 space-y-4">
                                    <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-5 shadow-xl h-fit">
                                        <h3 className="font-black italic text-red-500">ADMIN ACTIONS</h3>
                                        
                                        <div className="space-y-4 border-b border-slate-700 pb-5">
                                            <div className="space-y-1.5">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase">Audience Reached</p>
                                                <Input 
                                                    type="text" 
                                                    value={audienceReached} 
                                                    onChange={(e) => setAudienceReached(e.target.value.replace(/[^0-9]/g, ''))}
                                                    onFocus={(e) => { if (e.target.value === "0") setAudienceReached(""); }}
                                                    onBlur={(e) => { if (e.target.value === "") setAudienceReached("0"); }}
                                                    className="bg-slate-800 border-0 text-white h-10 rounded-lg font-bold"
                                                />
                                            </div>
                                            <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 font-bold" onClick={handleStatsUpdate}>UPDATE STATS</Button>
                                        </div>

                                        <div className="space-y-2">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">Change Status</p>
                                            <select
                                                value={selectedOrder.status}
                                                onChange={(e) => { setPendingStatus(e.target.value); setShowVerification(true); }}
                                                className="w-full bg-slate-800 border-0 rounded-xl p-3 font-bold text-sm focus:ring-2 focus:ring-red-500"
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="paid">Paid</option>
                                                <option value="in_progress">In Progress</option>
                                                <option value="completed">Completed</option>
                                                <option value="failed">Failed</option>
                                            </select>
                                        </div>

                                        {showVerification && (
                                            <div className="space-y-4 border-t border-slate-700 pt-6 animate-in slide-in-from-top-2">
                                                <p className="text-xs font-bold text-red-500">VERIFICATION REQUIRED</p>
                                                <p className="text-[10px] text-slate-400">Enter code <span className="text-white font-bold">admin123</span> to set status to <span className="text-white font-bold uppercase">{pendingStatus}</span></p>
                                                <Input
                                                    type="password"
                                                    value={verificationCode}
                                                    onChange={(e) => setVerificationCode(e.target.value)}
                                                    className="bg-slate-800 border-0 text-white h-10 rounded-lg"
                                                />
                                                <div className="flex gap-2">
                                                    <Button size="sm" className="flex-1 bg-red-600 hover:bg-red-700 font-bold" onClick={handleStatusUpdate}>CONFIRM</Button>
                                                    <Button size="sm" variant="ghost" className="flex-1 text-slate-400" onClick={() => setShowVerification(false)}>CANCEL</Button>
                                                </div>
                                            </div>
                                        )}
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-2.5">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{title}</h3>
            {children}
        </div>
    );
}
