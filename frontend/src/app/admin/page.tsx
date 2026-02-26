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
    videos?: Array<{ videoId?: string; title?: string; link?: string; viewsRequested?: number; }>;
    userId?: { name?: string; email?: string };
    paymentId?: { status?: string };
    targeting?: { country?: string; goal?: string; duration?: string; autoTargeting?: boolean; gender?: string; ages?: string[]; interests?: string[]; };
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

    useEffect(() => {
        const savedToken = localStorage.getItem("adminToken");
        if (savedToken) setToken(savedToken);
    }, []);

    useEffect(() => {
        if (token) fetchOrders();
    }, [token]);

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
            setSelectedOrder(null);
        } catch (err) {
            setError("Failed to update status");
        }
    };

    if (!token) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center p-6 mt-16">
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
        <div className="min-h-screen bg-slate-50 pt-20 pb-12 px-6 mt-16">
            <div className="max-w-[1400px] mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col h-[85vh]">
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
                        <Button variant="ghost" size="sm" onClick={() => router.push("/admin/completed")} className="text-green-700 font-bold hover:bg-green-50">COMPLETED</Button>
                        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-600 font-bold hover:bg-red-50">LOGOUT</Button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {!selectedOrder ? (
                        <div className="divide-y">
                            {filteredOrders.length === 0 ? (
                                <div className="py-20 text-center text-slate-400 font-medium">No orders found</div>
                            ) : (
                                filteredOrders.map(o => (
                                    <div key={o._id} onClick={() => setSelectedOrder(o)} className="flex items-center px-8 py-4 cursor-pointer hover:bg-slate-50 transition-all border-l-4 border-transparent hover:border-red-600">
                                        <div className="w-1/4 font-bold text-slate-900">{o.userId?.name || "Anonymous"} <span className="block text-[10px] font-normal text-slate-500">{o.userId?.email}</span></div>
                                        <div className="flex-1 text-slate-600 text-sm truncate">{o.orderId} • <span className="font-bold">{o.plan?.name || "Custom"}</span> • {o.channel?.name}</div>
                                        <div className={`text-[10px] font-black uppercase px-2 py-1 rounded-full ${statusColors[o.status]}`}>{o.status}</div>
                                        <div className="w-24 text-right text-xs text-slate-400">{new Date(o.createdAt).toLocaleDateString()}</div>
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

                            <div className="grid lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-6">
                                    <Section title="Client Details">
                                        <p className="font-bold text-lg">{selectedOrder.userId?.name}</p>
                                        <p className="text-slate-500 text-sm italic">{selectedOrder.userId?.email}</p>
                                    </Section>

                                    <Section title="Campaign Details">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div><p className="text-[10px] font-bold text-slate-400 uppercase">Plan</p><p className="font-bold">{selectedOrder.plan?.name}</p></div>
                                            <div><p className="text-[10px] font-bold text-slate-400 uppercase">Budget</p><p className="font-black text-xl">₹{selectedOrder.budget}</p></div>
                                        </div>
                                    </Section>

                                    <Section title="Source">
                                        <p className="font-bold">{selectedOrder.channel?.name}</p>
                                        <a href={selectedOrder.channel?.link} target="_blank" className="text-red-600 text-sm truncate block">{selectedOrder.channel?.link}</a>
                                    </Section>

                                    <Section title="Videos">
                                        <div className="space-y-4">
                                            {(selectedOrder.videos || []).map((v, i) => (
                                                <div key={i} className="p-4 bg-slate-50 rounded-2xl border">
                                                    <p className="font-bold">{v.title}</p>
                                                    <a href={v.link} target="_blank" className="text-red-600 text-xs">{v.link}</a>
                                                </div>
                                            ))}
                                        </div>
                                    </Section>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-slate-900 text-white rounded-3xl p-8 space-y-6 shadow-2xl">
                                        <h3 className="font-black italic text-red-500">ADMIN ACTIONS</h3>
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
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-3">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</h3>
            {children}
        </div>
    );
}
