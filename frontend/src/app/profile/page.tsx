"use client";

import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Mail, Shield, Calendar, LogOut, CheckCircle, ExternalLink, Settings as SettingsIcon, LayoutGrid, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import CampaignLayout from "@/components/CampaignLayout";

export default function ProfilePage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    const [avatar, setAvatar] = useState<string>("boy");

    useEffect(() => {
        if (!loading && !user) {
            router.push("/get-started");
        }
        const savedAvatar = localStorage.getItem("vidfly_avatar");
        if (savedAvatar) {
            setAvatar(savedAvatar);
        } else {
            setAvatar("boy");
        }
    }, [user, loading, router]);

    const handleAvatarSelect = (type: string) => {
        setAvatar(type);
        localStorage.setItem("vidfly_avatar", type);
        window.dispatchEvent(new Event("storage"));
    };

    const handleLogout = async () => {
        await logout();
        router.push("/");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <CampaignLayout activeSidebar="settings">
            <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8 font-montserrat">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-6">
                        <div className="relative group">
                            <Avatar className="h-20 w-20 md:h-24 md:w-24 border-4 border-white shadow-xl">
                                <AvatarImage src={user.avatar || `/avatars/${avatar}.png`} alt={user.name || user.email} referrerPolicy="no-referrer" />
                                <AvatarFallback className="bg-slate-100 text-slate-400">
                                    <User className="h-10 w-10" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-1 -right-1 bg-green-500 border-2 border-white w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                                <CheckCircle className="text-white w-3 h-3" />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-1">
                                {user.name || "My Profile"}
                            </h1>
                            <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                                <Mail className="w-4 h-4 text-slate-400" />
                                {user.email}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            onClick={handleLogout}
                            className="rounded-full h-11 px-6 border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 hover:text-red-500 transition-all"
                        >
                            <LogOut className="w-4 h-4" /> Sign Out
                        </Button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column: Details */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden">
                            <div className="px-6 py-5 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
                                <h3 className="text-base font-black text-slate-900 flex items-center gap-2 uppercase tracking-wider">
                                    <Shield className="w-4 h-4 text-indigo-500" /> Account Security
                                </h3>
                                <div className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-green-100">
                                    Verified Account
                                </div>
                            </div>
                            <div className="p-6 grid sm:grid-cols-2 gap-4">
                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100/50 space-y-1">
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Display Name</p>
                                    <p className="text-sm font-bold text-slate-800">{user.name || "—"}</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100/50 space-y-1">
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Email Address</p>
                                    <p className="text-sm font-bold text-slate-800">{user.email}</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100/50 space-y-1">
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Account ID</p>
                                    <p className="text-xs font-mono text-slate-500 truncate" title={user.id}>{user.id}</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100/50 space-y-1">
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Status</p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500" />
                                        <p className="text-sm font-bold text-slate-800">Premium Active</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Avatar Picker */}
                        <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden">
                             <div className="px-6 py-5 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
                                <h3 className="text-base font-black text-slate-900 flex items-center gap-2 uppercase tracking-wider">
                                    <SettingsIcon className="w-4 h-4 text-indigo-500" /> Appearance
                                </h3>
                            </div>
                            <div className="p-6">
                                <p className="text-sm text-slate-500 font-bold mb-6">Choose an avatar to personalize your experience across Vidflyy.</p>
                                <div className="flex flex-wrap gap-8 items-center">
                                    <div
                                        onClick={() => handleAvatarSelect("boy")}
                                        className="relative cursor-pointer group"
                                    >
                                        <div className={`w-20 h-20 rounded-2xl overflow-hidden border-4 transition-all duration-300 ${avatar === "boy" ? "border-indigo-500 scale-105 shadow-xl shadow-indigo-100" : "border-white shadow-md grayscale-[30%] hover:grayscale-0"}`}>
                                            <Image src="/avatars/boy.png" alt="Boy" fill className="object-cover" />
                                        </div>
                                        {avatar === "boy" && (
                                            <div className="absolute -top-2 -right-2 bg-indigo-500 text-white p-1 rounded-lg shadow-lg">
                                                <CheckCircle className="w-3 h-3" />
                                            </div>
                                        )}
                                        <p className={`text-[11px] font-black text-center mt-3 uppercase tracking-widest ${avatar === "boy" ? "text-indigo-600" : "text-slate-400"}`}>Aviator</p>
                                    </div>

                                    <div
                                        onClick={() => handleAvatarSelect("girl")}
                                        className="relative cursor-pointer group"
                                    >
                                        <div className={`w-20 h-20 rounded-2xl overflow-hidden border-4 transition-all duration-300 ${avatar === "girl" ? "border-indigo-500 scale-105 shadow-xl shadow-indigo-100" : "border-white shadow-md grayscale-[30%] hover:grayscale-0"}`}>
                                            <Image src="/avatars/girl.png" alt="Girl" fill className="object-cover" />
                                        </div>
                                         {avatar === "girl" && (
                                            <div className="absolute -top-2 -right-2 bg-indigo-500 text-white p-1 rounded-lg shadow-lg">
                                                <CheckCircle className="w-3 h-3" />
                                            </div>
                                        )}
                                        <p className={`text-[11px] font-black text-center mt-3 uppercase tracking-widest ${avatar === "girl" ? "text-indigo-600" : "text-slate-400"}`}>Stellar</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Actions/Stats */}
                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[28px] p-8 text-white shadow-xl shadow-indigo-100 relative overflow-hidden group">
                            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                            <h2 className="text-xl font-black mb-2 relative z-10">Launch Your Next Campaign</h2>
                            <p className="text-indigo-100 font-bold text-sm mb-6 leading-relaxed relative z-10 opacity-90">Ready to boost your YouTube channel metrics? Start a professional campaign today.</p>
                            <Button 
                                onClick={() => router.push("/campaign")}
                                className="w-full bg-white text-indigo-600 hover:bg-slate-50 font-black rounded-2xl h-14 shadow-lg active:scale-95 transition-all text-sm uppercase tracking-wider relative z-10"
                            >
                                Get Started <ExternalLink className="w-4 h-4 ml-2" />
                            </Button>
                        </div>

                        <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm p-6 space-y-4">
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-2">Quick Navigation</h3>
                            <div className="space-y-2">
                                {[
                                    { label: "View Campaigns", icon: LayoutGrid, path: "/campaign/my-campaigns", color: "text-blue-500", bg: "bg-blue-50" },
                                    { label: "Purchase Views", icon: Eye, path: "/campaign/bulk-views", color: "text-red-500", bg: "bg-red-50" },
                                    { label: "Pricing Charts", icon: Calendar, path: "/pricing", color: "text-emerald-500", bg: "bg-emerald-50" },
                                ].map((item) => (
                                    <button
                                        key={item.label}
                                        onClick={() => router.push(item.path)}
                                        className="w-full flex items-center justify-between p-3.5 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-9 h-9 ${item.bg} rounded-xl flex items-center justify-center ${item.color}`}>
                                                <item.icon className="w-4.5 h-4.5" />
                                            </div>
                                            <span className="text-[13px] font-bold text-slate-700 group-hover:text-slate-900">{item.label}</span>
                                        </div>
                                        <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-slate-500 transition-colors" />
                                    </button>
                                ))}
                            </div>
                        </div>
                        
                        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                             <div className="flex items-center gap-3 mb-2">
                                 <div className="w-2 h-2 rounded-full bg-blue-500" />
                                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Support Portal</p>
                             </div>
                             <p className="text-[12px] font-bold text-slate-600 mb-3 leading-relaxed">Need help with your account or a campaign? Our team is available 24/7.</p>
                             <button
                                onClick={() => router.push("/campaign/support")}
                                className="text-[12px] font-black text-indigo-600 hover:text-indigo-700 underline underline-offset-4 transition-colors"
                             >
                                Contact Support
                             </button>
                        </div>
                    </div>
                </div>
            </div>
        </CampaignLayout>
    );
}


