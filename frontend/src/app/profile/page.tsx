"use client";

import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Mail, Shield, Calendar, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

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
            // Set boy as default if no avatar is saved
            setAvatar("boy");
        }
    }, [user, loading, router]);

    const handleAvatarSelect = (type: string) => {
        setAvatar(type);
        localStorage.setItem("vidfly_avatar", type);
        // Trigger a storage event for other components like Navbar
        window.dispatchEvent(new Event("storage"));
    };

    const handleLogout = async () => {
        await logout();
        router.push("/");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 font-founders">
            <main className="max-w-4xl mx-auto px-4 py-20">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    {/* Cover Header */}
                    <div className="h-32 bg-gradient-to-r from-red-600 to-pink-600"></div>

                    <div className="px-8 pb-8">
                        <div className="relative flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-12 mb-8">
                            <Avatar className="h-32 w-32 border-4 border-white shadow-lg shrink-0">
                                <AvatarImage src={`/avatars/${avatar}.png`} alt={user.name || user.email} />
                                <AvatarFallback className="bg-slate-100 text-slate-600 text-3xl font-bold">
                                    <User className="h-16 w-16" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 text-center sm:text-left pb-2">
                                <h1 className="section-heading !mb-2">{user.name || "User Profile"}</h1>
                                <p className="text-gray-500 font-medium">{user.email}</p>
                            </div>
                            <Button
                                variant="outline"
                                onClick={handleLogout}
                                className="sm:mb-2 border-red-100 text-red-600 hover:bg-red-50 flex items-center gap-2 rounded-xl"
                            >
                                <LogOut className="h-4 w-4" /> Log out
                            </Button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mt-8">
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Account Information</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-red-50 transition-colors">
                                        <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-red-600">
                                            <User className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Full Name</p>
                                            <p className="font-bold text-gray-900">{user.name || "Not provided"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-red-50 transition-colors">
                                        <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-red-600">
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Email Address</p>
                                            <p className="font-bold text-gray-900">{user.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Security & Status</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-red-50 transition-colors">
                                        <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-red-600">
                                            <Shield className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Account ID</p>
                                            <p className="font-bold text-gray-900">{user.id}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-red-50 transition-colors">
                                        <div className="h-10 w-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-red-600">
                                            <Calendar className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Account Active</p>
                                            <p className="font-bold text-green-600 flex items-center gap-1">
                                                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                                                Verified
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Avatar Selection Section */}
                        <div className="mt-12 pt-8 border-t">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">Choose Your Avatar</h3>
                            <div className="flex items-center gap-8">
                                <div
                                    onClick={() => handleAvatarSelect("boy")}
                                    className={`group cursor-pointer flex flex-col items-center gap-3 transition-all ${avatar === "boy" ? "opacity-100" : "opacity-50 hover:opacity-100"}`}
                                >
                                    <div className={`relative w-20 h-20 rounded-full overflow-hidden border-4 transition-all ${avatar === "boy" ? "border-red-500 scale-110 shadow-lg" : "border-gray-200 group-hover:border-gray-300"}`}>
                                        <Image src="/avatars/boy.png" alt="Nano Boy" fill className="object-cover" />
                                    </div>
                                    <p className={`text-sm font-bold ${avatar === "boy" ? "text-red-600" : "text-gray-500"}`}> Boy</p>
                                </div>
                                <div
                                    onClick={() => handleAvatarSelect("girl")}
                                    className={`group cursor-pointer flex flex-col items-center gap-3 transition-all ${avatar === "girl" ? "opacity-100" : "opacity-50 hover:opacity-100"}`}
                                >
                                    <div className={`relative w-20 h-20 rounded-full overflow-hidden border-4 transition-all ${avatar === "girl" ? "border-red-500 scale-110 shadow-lg" : "border-gray-200 group-hover:border-gray-300"}`}>
                                        <Image src="/avatars/girl.png" alt="Nano Girl" fill className="object-cover" />
                                    </div>
                                    <p className={`text-sm font-bold ${avatar === "girl" ? "text-red-600" : "text-gray-500"}`}> Girl</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Links</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <Button
                                    onClick={() => router.push("/campaign")}
                                    className="bg-red-600 hover:bg-red-700 text-white rounded-xl h-24 flex flex-col gap-2 font-bold"
                                >
                                    Dashboard
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => router.push("/campaign/packages")}
                                    className="border-gray-200 hover:bg-gray-50 rounded-xl h-24 flex flex-col gap-2 font-bold"
                                >
                                    Packages
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => router.push("/how-it-works")}
                                    className="border-gray-200 hover:bg-gray-50 rounded-xl h-24 flex flex-col gap-2 font-bold"
                                >
                                    Support
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => router.push("/pricing")}
                                    className="border-gray-200 hover:bg-gray-50 rounded-xl h-24 flex flex-col gap-2 font-bold"
                                >
                                    Pricing
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
