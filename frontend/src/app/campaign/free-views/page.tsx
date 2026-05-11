"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CampaignLayout from "@/components/CampaignLayout";
import CampaignHeader from "@/components/CampaignHeader";
import CampaignCard from "@/components/CampaignCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getVerifiedEmail } from "@/lib/verifiedEmail";
import { useAuth } from "@/context/AuthContext";
import { Copy, Check, Users, Gift, Share2 } from "lucide-react";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");

export default function CampaignFreeViews() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth();
    const [mounted, setMounted] = useState(false);
    const [verifiedEmail, setVerifiedEmail] = useState("");
    const [freeViewsBalance, setFreeViewsBalance] = useState(0);
    const [referralCode, setReferralCode] = useState("");
    const [referralLink, setReferralLink] = useState("");
    const [enteredReferralCode, setEnteredReferralCode] = useState("");
    const [referralStats, setReferralStats] = useState({
        totalReferrals: 0,
        totalViewsEarned: 0,
    });
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || authLoading) return;

        let email = "";
        if (user?.email) {
            email = user.email;
        } else {
            const storedEmail = getVerifiedEmail();
            if (storedEmail) {
                email = storedEmail;
            } else {
                router.replace("/get-started");
                return;
            }
        }

        setVerifiedEmail(email);

        // Generate referral code from email
        const generateReferralCode = (emailStr: string) => {
            const hash = emailStr.split('').reduce((acc, char) => {
                return ((acc << 5) - acc) + char.charCodeAt(0);
            }, 0);
            return `VID${Math.abs(hash).toString(36).toUpperCase().slice(0, 8)}`;
        };

        const code = generateReferralCode(email);
        setReferralCode(code);
        if (typeof window !== "undefined") {
            setReferralLink(`${window.location.origin}/get-started?ref=${code}`);
        }

        loadFreeViewsData(email);
    }, [mounted, authLoading, user, router]);

    const loadFreeViewsData = async (email: string) => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/api/free-views/balance?email=${encodeURIComponent(email)}`, {
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                setFreeViewsBalance(data.balance || 0);
                setReferralStats({
                    totalReferrals: data.totalReferrals || 0,
                    totalViewsEarned: data.totalViewsEarned || 0,
                });
            }
        } catch (err) {
            console.error("Failed to load free views data", err);
        } finally {
            setLoading(false);
        }
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(referralLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            setError("Failed to copy link");
        }
    };

    const handleApplyReferralCode = async () => {
        if (!enteredReferralCode.trim()) {
            setError("Please enter a referral code");
            return;
        }

        try {
            setLoading(true);
            setError("");
            setSuccess("");

            const response = await fetch(`${API_BASE_URL}/api/free-views/apply-referral`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: verifiedEmail,
                    referralCode: enteredReferralCode.trim().toUpperCase(),
                }),
                credentials: "include",
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data?.message || "Failed to apply referral code");

            setSuccess(`Referral code applied successfully! Your friend earned 500 free views.`);
            setEnteredReferralCode("");
            loadFreeViewsData(verifiedEmail);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to apply referral code");
        } finally {
            setLoading(false);
        }
    };

    return (
        <CampaignLayout activeSidebar="free">
            <CampaignCard>
                <CampaignHeader>
                    <h1 className="text-2xl font-bold text-slate-900">Free Views</h1>
                </CampaignHeader>

                <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <p className="text-xs uppercase text-slate-500 font-semibold mb-1">Current Balance</p>
                            <p className="text-4xl font-bold text-red-600">
                                {loading ? "..." : `${freeViewsBalance.toLocaleString()} Views`}
                            </p>
                        </div>
                        <Button className="bg-red-600 hover:bg-red-700 rounded-xl px-8 py-6 h-auto text-lg font-bold" onClick={() => router.push("/campaign")}>
                            REDEEM NOW
                        </Button>
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-slate-900">Referral Program</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <StatBox icon={Users} label="Total Referrals" value={referralStats.totalReferrals} />
                        <StatBox icon={Gift} label="Views Earned" value={referralStats.totalViewsEarned.toLocaleString()} />
                        <StatBox icon={Share2} label="Your Code" value={referralCode} isMono />
                    </div>

                    <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-6">
                        <h3 className="text-lg font-bold text-emerald-700 mb-2">Share Your Referral Link</h3>
                        <p className="text-emerald-900 mb-4">Get <span className="font-bold">500 free views</span> for each friend who signs up and completes their first Order using your link!</p>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <div className="flex-1 flex items-center gap-2 bg-white rounded-xl px-4 py-3 border border-emerald-200">
                                <input value={referralLink} readOnly className="flex-1 border-0 bg-transparent text-sm focus:ring-0 outline-none" />
                                <Button variant="ghost" size="sm" onClick={handleCopyLink} className="text-emerald-600">
                                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            </div>
                            <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-xl px-6 h-auto font-bold" onClick={handleCopyLink}>SHARE LINK</Button>
                        </div>
                    </div>

                    <div className="bg-red-50 rounded-xl border border-red-200 p-6">
                        <h3 className="text-lg font-bold text-red-700 mb-2">Have a Referral Code?</h3>
                        <p className="text-slate-900 mb-4">Enter a friend's code to help them earn <span className="font-bold">500 free views</span>!</p>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <Input
                                placeholder="Ex: VID123456"
                                value={enteredReferralCode}
                                onChange={(e) => { setEnteredReferralCode(e.target.value.toUpperCase()); setError(""); setSuccess(""); }}
                                className="flex-1 rounded-xl h-12"
                            />
                            <Button className="bg-red-600 hover:bg-red-700 rounded-xl px-6 h-12 font-bold" onClick={handleApplyReferralCode} disabled={loading || !enteredReferralCode.trim()}>
                                {loading ? "APPLYING..." : "APPLY CODE"}
                            </Button>
                        </div>
                        {error && <div className="mt-2 text-sm text-red-600 font-medium">{error}</div>}
                        {success && <div className="mt-2 text-sm text-emerald-600 font-medium">{success}</div>}
                    </div>
                </div>
            </CampaignCard>
        </CampaignLayout>
    );
}

function StatBox({ icon: Icon, label, value, isMono }: { icon: any; label: string; value: string | number; isMono?: boolean }) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 p-4 text-center">
            <Icon className="h-5 w-5 text-red-600 mx-auto mb-2" />
            <p className="text-xs uppercase text-slate-500 font-semibold mb-1">{label}</p>
            <p className={`text-xl font-bold ${isMono ? "font-mono text-red-600" : "text-slate-900"}`}>{value}</p>
        </div>
    );
}
