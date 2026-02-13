import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CampaignCard from "@/components/CampaignCard";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Shield, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import {
  clearVerifiedEmail,
  saveVerifiedEmail,
  getVerifiedEmail,
} from "@/lib/verifiedEmail";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL.replace(/\/$/, "");

const normalizeEmail = (value: string) => value.trim().toLowerCase();

const REFERRAL_STORAGE_KEY = "vidfly_referral_code";

const GetStarted = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
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

  // Timer for resend cooldown
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // Check for referral code in URL and store it
  useEffect(() => {
    const refCode = searchParams.get("ref");
    if (refCode) {
      const normalizedCode = refCode.trim().toUpperCase();
      setReferralCode(normalizedCode);
      if (typeof window !== "undefined") {
        try {
          sessionStorage.setItem(REFERRAL_STORAGE_KEY, normalizedCode);
        } catch (err) {
          console.warn("Unable to store referral code", err);
        }
      }
    } else {
      if (typeof window !== "undefined") {
        try {
          const stored = sessionStorage.getItem(REFERRAL_STORAGE_KEY);
          if (stored) {
            setReferralCode(stored);
          }
        } catch (err) {
          console.warn("Unable to read referral code", err);
        }
      }
    }
  }, [searchParams]);

  // Check if email is already verified on component mount
  useEffect(() => {
    const storedEmail = getVerifiedEmail();
    if (storedEmail) {
      navigate("/campaign", { state: { email: storedEmail }, replace: true });
    } else {
      setCheckingVerification(false);
    }
  }, [navigate]);

  const sendOtp = async () => {
    const normalizedEmail = normalizeEmail(email);
    if (!normalizedEmail) {
      setError("Please enter your email address.");
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

      setEmail(normalizedEmail);
      setOtpSent(true);
      setMessage("OTP sent! Please check your inbox.");
      setResendCooldown(30); // Start 30s cooldown
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send OTP.");
    } finally {
      setSendingOtp(false);
    }
  };

  const verifyOtp = async () => {
    const normalizedEmail = normalizeEmail(email);
    if (!normalizedEmail) {
      setError("Please enter your email address.");
      return;
    }
    if (otp.length !== 6) {
      setError("Please enter the 6-digit OTP.");
      return;
    }

    setVerifyingOtp(true);
    setError("");
    setMessage("");

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

      setEmail(normalizedEmail);
      setEmailVerified(true);
      saveVerifiedEmail(normalizedEmail);

      // Refresh global auth context (picks up the new HTTPOnly cookie session)
      await refreshUser();

      // Apply referral code if present
      if (referralCode) {
        try {
          await fetch(`${API_BASE_URL}/api/free-views/apply-referral`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: normalizedEmail,
              referralCode: referralCode,
            }),
            credentials: "include",
          });
          if (typeof window !== "undefined") {
            sessionStorage.removeItem(REFERRAL_STORAGE_KEY);
          }
        } catch (err) {
          console.error("Failed to apply referral code", err);
        }
      }

      setMessage("Email verified successfully! Redirecting...");
      setTimeout(() => {
        navigate("/campaign", { state: { email: normalizedEmail } });
      }, 800);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to verify OTP.");
    } finally {
      setVerifyingOtp(false);
    }
  };

  const resetState = () => {
    setOtp("");
    setOtpSent(false);
    setEmailVerified(false);
    setMessage("");
    setError("");
    clearVerifiedEmail();
  };

  // Show loading state while checking verification
  if (checkingVerification) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white font-montserrat flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Checking verification status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white font-montserrat">
      <Navbar />

      <section className="py-12 lg:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center mb-5">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-red-600 to-pink-600 text-white px-5 py-2 rounded-full text-xs font-semibold shadow-lg flex items-center gap-2">
                  <Shield className="h-3.5 w-3.5" />
                  Secure Email Verification
                </div>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-3">
              Get Started With Vidflyy
            </h1>
            <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Verify your email to unlock powerful YouTube promotion tools. Start growing your channel in minutes.
            </p>
          </div>

          {/* Main Card */}
          <CampaignCard className="max-w-2xl mx-auto">
            <div className="mb-6 pb-4 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-1">
                Email Verification
              </h2>
              <p className="text-sm text-slate-500">
                We'll send a 6-digit code to verify your email address
              </p>
            </div>

            <div className="space-y-6 mt-6">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-red-600" />
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    resetState();
                  }}
                  required
                  className="h-12 text-base rounded-xl border-2 border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
                  disabled={emailVerified || otpSent}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={sendOtp}
                  disabled={sendingOtp || emailVerified || !email || (otpSent && resendCooldown > 0)}
                  className="flex-1 h-12 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {emailVerified ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      EMAIL VERIFIED
                    </>
                  ) : sendingOtp ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      SENDING OTP...
                    </>
                  ) : otpSent ? (
                    resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "RESEND OTP"
                  ) : (
                    <>
                      <Mail className="h-4 w-4 mr-2" />
                      Continue
                    </>
                  )}
                </Button>
                {otpSent && !emailVerified && (
                  <Button
                    variant="outline"
                    onClick={resetState}
                    className="h-12 font-semibold rounded-xl border-2 hover:bg-slate-50 transition-all"
                  >
                    Change Email
                  </Button>
                )}
              </div>

              {/* OTP Input Section */}
              {otpSent && !emailVerified && (
                <div className="space-y-4 p-6 bg-gradient-to-br from-slate-50 to-red-50 rounded-2xl border-2 border-red-100 animate-fade-in">
                  <label className="block text-sm font-semibold text-slate-800 text-center flex items-center justify-center gap-2">
                    <Shield className="h-4 w-4 text-red-600" />
                    Enter 6-digit OTP
                  </label>
                  <Input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    placeholder="000000"
                    className="text-center tracking-[0.5em] text-2xl font-mono h-14 rounded-xl border-2 border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-white shadow-inner"
                  />
                  <Button
                    onClick={verifyOtp}
                    disabled={verifyingOtp || otp.length !== 6}
                    className="rounded-xl w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    {verifyingOtp ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Verifying...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        Verify
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* Success Message */}
              {message && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 text-sm font-semibold border-2 border-green-200 shadow-sm flex items-center gap-3 animate-fade-in">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                  <span>{message}</span>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-red-50 to-pink-50 text-red-800 text-sm font-semibold border-2 border-red-200 shadow-sm flex items-center gap-3 animate-fade-in">
                  <span className="text-lg">⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Referral Code Banner */}
              {referralCode && !emailVerified && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 text-emerald-800 text-sm font-medium border-2 border-emerald-200 shadow-sm animate-fade-in">
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm mb-1">Referral Code Detected!</p>
                      <p className="text-sm mb-2">You'll receive <strong className="text-emerald-700">500 free views</strong> when you verify your email and create your first campaign!</p>
                      <p className="text-xs mt-2 opacity-75 bg-white/50 px-3 py-1.5 rounded-lg inline-block">
                        Code: <span className="font-mono font-bold">{referralCode}</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Benefits Section */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">
                  What You Get
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div className="h-8 w-8 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 mb-0.5">Instant Access</p>
                      <p className="text-xs text-slate-600">Start promoting immediately after verification</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div className="h-8 w-8 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Shield className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 mb-0.5">Secure & Safe</p>
                      <p className="text-xs text-slate-600">Your data is protected with industry standards</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div className="h-8 w-8 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Sparkles className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 mb-0.5">Free Views</p>
                      <p className="text-xs text-slate-600">Earn free views through referrals</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div className="h-8 w-8 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ArrowRight className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 mb-0.5">Quick Setup</p>
                      <p className="text-xs text-slate-600">Get started in under 2 minutes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CampaignCard>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GetStarted;
