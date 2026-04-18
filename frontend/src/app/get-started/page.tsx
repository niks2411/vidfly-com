"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import {
    Check,
    ChevronLeft,
} from "lucide-react";
import {
    clearVerifiedEmail,
    saveVerifiedEmail,
    getVerifiedEmail,
} from "@/lib/verifiedEmail";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");

const normalizeEmail = (value: string) => value.trim().toLowerCase();
const REFERRAL_STORAGE_KEY = "vidfly_referral_code";

function GetStartedContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { refreshUser } = useAuth();
    
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);
    const [sendingOtp, setSendingOtp] = useState(false);
    const [verifyingOtp, setVerifyingOtp] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [checkingVerification, setCheckingVerification] = useState(true);
    const [referralCode, setReferralCode] = useState<string | null>(null);
    const [resendCooldown, setResendCooldown] = useState(0);
    const [attempts, setAttempts] = useState(0);

    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCooldown]);

    useEffect(() => {
        const refCode = searchParams.get("ref");
        if (refCode) {
            const normalizedCode = refCode.trim().toUpperCase();
            setReferralCode(normalizedCode);
            try { sessionStorage.setItem(REFERRAL_STORAGE_KEY, normalizedCode); } catch (e) {}
        } else {
            try {
                const stored = sessionStorage.getItem(REFERRAL_STORAGE_KEY);
                if (stored) setReferralCode(stored);
            } catch (e) {}
        }
    }, [searchParams]);

    useEffect(() => {
        const storedEmail = getVerifiedEmail();
        const flow = searchParams.get("flow");
        if (storedEmail) {
            const selectedPkg = sessionStorage.getItem("vidfly_selected_package");
            if (selectedPkg && flow === "package") {
                router.replace("/campaign/packages/select");
            } else {
                router.replace("/campaign");
            }
        } else {
            setCheckingVerification(false);
        }
    }, [router, searchParams]);

    const sendOtp = async () => {
        const normalizedEmail = normalizeEmail(email);
        if (!normalizedEmail) {
            setError("Please enter your email.");
            return;
        }

        setSendingOtp(true);
        setError("");
        setMessage("");

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/send-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: normalizedEmail }),
                credentials: "include",
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data?.message || "Failed to send OTP.");
            }

            setOtpSent(true);
            setMessage("OTP sent to your email.");
            setResendCooldown(30);
            
            const data = await response.json().catch(() => ({}));
            if (data?.resendCount) {
                setAttempts(data.resendCount);
            } else {
                setAttempts(prev => prev + 1);
            }
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : "Error sending OTP.";
            setError(errorMsg);
            if (errorMsg.toLowerCase().includes("limit reached")) {
                setAttempts(3);
            }
        } finally {
            setSendingOtp(false);
        }
    };

    const verifyOtp = async () => {
        const normalizedEmail = normalizeEmail(email);
        if (otp.length !== 6) {
            setError("Enter 6-digit code.");
            return;
        }

        setVerifyingOtp(true);
        setError("");

        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: normalizedEmail, otp }),
                credentials: "include",
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data?.message || "Invalid OTP.");
            }

            saveVerifiedEmail(normalizedEmail);
            await refreshUser();

            if (referralCode) {
                try {
                    await fetch(`${API_BASE_URL}/api/free-views/apply-referral`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email: normalizedEmail, referralCode }),
                        credentials: "include",
                    });
                    sessionStorage.removeItem(REFERRAL_STORAGE_KEY);
                } catch (e) {}
            }

            setMessage("Redirecting...");
            setTimeout(() => {
                const selectedPkg = sessionStorage.getItem("vidfly_selected_package");
                const flow = searchParams.get("flow");
                if (selectedPkg && flow === "package") {
                    router.push("/campaign/packages/select");
                } else {
                    router.push("/campaign");
                }
            }, 500);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Verification failed.");
        } finally {
            setVerifyingOtp(false);
        }
    };

    if (checkingVerification) return null;

    return (
        <div className="h-screen flex flex-col lg:flex-row font-montserrat tracking-tight overflow-hidden bg-white">
            {/* ── Left Side: Red/Pink Panel ──────────────────────────────────── */}
            <div 
                className="hidden lg:flex lg:w-[45%] bg-gradient-to-br from-[#E52D27] to-[#EC4899] bg-cover bg-center p-10 lg:p-24 relative flex-col justify-center overflow-hidden lg:min-h-screen"
                style={{ backgroundImage: 'url("/pink_abstract_bg.png")' }}
            >
                {/* Dark overlay to ensure text readability */}
                <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>

                {/* Content Container */}
                <div className="relative z-10 w-full max-w-md mx-auto lg:mx-0">
                    {/* Logo Section */}
                    <div className="mb-20">
                        <Image
                            src="/lovable-uploads/0b27d722-c6a7-47e3-ae7d-aeb8461db170.png"
                            alt="Vidflyy Logo"
                            width={140}
                            height={42}
                            className="h-9 w-auto brightness-0 invert"
                            priority
                        />
                    </div>

                    {/* Testimonial Section */}
                    <div className="space-y-8">
                        <div className="text-white opacity-40">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H11.017V6C11.017 5.44772 11.4647 5 12.017 5H19.017C20.6738 5 22.017 6.34315 22.017 8V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM3.0166 21L3.0166 18C3.0166 16.8954 3.91203 16 5.0166 16H8.0166C8.56889 16 9.0166 15.5523 9.0166 15V9C9.0166 8.44772 8.56889 8 8.0166 8H4.0166C3.46432 8 3.0166 8.44772 3.0166 9V12C3.0166 12.5523 2.56889 13 2.0166 13H0.0166016V6C0.0166016 5.44772 0.464317 5 1.0166 5H8.0166C9.67346 5 11.0166 6.34315 11.0166 8V15C11.0166 18.3137 8.3303 21 5.0166 21H3.0166Z" />
                            </svg>
                        </div>
                        <p className="text-xl lg:text-2xl text-white font-medium leading-[1.5] font-founders">
                            Vidflyy helped me grow my YouTube channel from 500 to 50K subscribers. The promotion is real and effective!
                        </p>

                        {/* Features List */}
                        <div className="space-y-4 pt-10">
                            {[
                                "Google Ads Powered Promotions",
                                "58K+ Channels Promoted",
                                "6.9B+ Real Views Delivered"
                            ].map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-4">
                                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center border border-white/30 backdrop-blur-sm">
                                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                    </div>
                                    <span className="text-[15px] font-semibold text-white/95">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Right Side: White Panel (Login Form) ─────────────────────── */}
            <div className="flex-1 bg-white flex flex-col justify-center px-8 sm:px-16 lg:px-28 py-16 relative font-montserrat tracking-tight">
                
                <div className="max-w-[420px] w-full mx-auto lg:ml-0 lg:mr-auto">
                    {/* Header Section */}
                    <div className="mb-8 text-left">
                        <h1 className="text-[32px] font-bold text-[#111827] leading-tight mb-2">Get Started</h1>
                        <p className="text-[#6B7280] text-[15px] font-medium leading-relaxed">Sign in or create an account to start promoting.</p>
                    </div>

                    {!otpSent ? (
                        <div className="space-y-6">
                            {/* Google Sign In */}
                            <button
                                onClick={() => window.location.href = `${API_BASE_URL}/api/auth/google`}
                                className="w-full h-12 border border-[#E5E7EB] bg-white rounded text-[#374151] font-semibold flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors shadow-sm text-sm"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.37 18.41 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
                                    <path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.57C14.73 18.23 13.48 18.63 12 18.63C9.13999 18.63 6.70999 16.7 5.83999 14.12H2.17999V16.96C3.98999 20.56 7.69999 23 12 23Z" fill="#34A853"/>
                                    <path d="M5.83999 14.12C5.60999 13.46 5.47999 12.75 5.47999 12C5.47999 11.25 5.60999 10.54 5.83999 9.88V7.04H2.17999C1.42999 8.53 0.999992 10.22 0.999992 12C0.999992 13.78 1.42999 15.47 2.17999 16.96L5.83999 14.12Z" fill="#FBBC05"/>
                                    <path d="M12 5.38C13.62 5.38 15.06 5.94 16.21 7.03L19.35 3.89C17.45 2.11 14.97 1 12 1C7.69999 1 3.98999 3.44 2.17999 7.04L5.83999 9.88C6.70999 7.3 9.13999 5.38 12 5.38Z" fill="#EA4335"/>
                                </svg>
                                Sign in with Google
                            </button>

                            {/* Divider */}
                            <div className="relative flex items-center py-1">
                                <div className="flex-grow border-t border-gray-100"></div>
                                <span className="flex-shrink mx-4 text-[#9CA3AF] text-[13px] font-medium">or continue with email</span>
                                <div className="flex-grow border-t border-gray-100"></div>
                            </div>

                            {/* Email Login Section */}
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[#374151] font-medium mb-2 block text-[13px]">
                                        Email Address:
                                    </label>
                                    <Input
                                        type="email"
                                        placeholder="example@email.com"
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value); setError(""); }}
                                        className="h-11 border-gray-200 rounded text-[15px] px-4 focus:ring-0 focus:border-red-500 bg-white transition-all text-gray-900 placeholder:text-gray-400 shadow-sm"
                                    />
                                </div>
                                <Button
                                    onClick={sendOtp}
                                    disabled={sendingOtp || !email}
                                    className="w-full h-11 bg-[#D32F2F] hover:bg-[#B71C1C] text-white rounded font-bold text-[14px] tracking-wide uppercase transition-colors shadow-sm"
                                >
                                    {sendingOtp ? "SENDING..." : "CONTINUE"}
                                </Button>
                            </div>
                        </div>
                    ) : (
                        /* Verification UI */
                        <div className="space-y-6 animate-fade-in">
                             <div>
                                <label className="text-[#374151] font-medium mb-2 block text-[13px]">
                                    Enter 6-digit Code:
                                </label>
                                <Input
                                    type="text"
                                    maxLength={6}
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                    placeholder="000000"
                                    className="h-14 text-center text-3xl font-bold tracking-[0.3em] border-gray-200 rounded bg-white shadow-sm"
                                    autoFocus
                                />
                            </div>
                            <Button
                                onClick={verifyOtp}
                                disabled={verifyingOtp || otp.length !== 6}
                                className="w-full h-11 bg-[#D32F2F] hover:bg-[#B71C1C] text-white rounded font-bold text-[14px] tracking-wide uppercase shadow-sm"
                            >
                                {verifyingOtp ? "VERIFYING..." : "VERIFY CODE"}
                            </Button>
                            <div className="flex items-center justify-between text-[13px] font-medium">
                                <button onClick={() => setOtpSent(false)} className="text-[#6B7280] hover:text-gray-900 transition-colors">
                                    Change email
                                </button>
                                <button 
                                    onClick={sendOtp} 
                                    disabled={resendCooldown > 0 || attempts >= 3} 
                                    className="text-[#D32F2F] disabled:text-gray-300 transition-colors"
                                >
                                    {attempts >= 3 
                                        ? "Limit reached" 
                                        : (resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : "Resend code")}
                                </button>
                            </div>
                        </div>
                    )}

                    {error && (
                        <p className="mt-4 text-left text-red-500 font-medium text-[13px]">
                            {error}
                        </p>
                    )}

                    {/* Policy Footer */}
                    <div className="mt-12 text-left">
                         <p className="text-[#9CA3AF] text-[12px] font-medium">
                            By continuing, you agree to our Terms of Service and Privacy Policy
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function GetStarted() {
    return (
        <Suspense fallback={null}>
            <GetStartedContent />
        </Suspense>
    );
}
