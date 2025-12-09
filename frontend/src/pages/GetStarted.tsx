import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  clearVerifiedEmail,
  saveVerifiedEmail,
  getVerifiedEmail,
} from "@/lib/verifiedEmail";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "http://localhost:5000";

const normalizeEmail = (value: string) => value.trim().toLowerCase();

const REFERRAL_STORAGE_KEY = "vidfly_referral_code";

const GetStarted = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
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

  // Check for referral code in URL and store it
  useEffect(() => {
    const refCode = searchParams.get("ref");
    if (refCode) {
      const normalizedCode = refCode.trim().toUpperCase();
      setReferralCode(normalizedCode);
      // Store referral code in sessionStorage
      if (typeof window !== "undefined") {
        try {
          sessionStorage.setItem(REFERRAL_STORAGE_KEY, normalizedCode);
        } catch (err) {
          console.warn("Unable to store referral code", err);
        }
      }
    } else {
      // Check if there's a stored referral code
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
      // Email is already verified, redirect to campaign page immediately
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
          // Clear referral code after applying
          if (typeof window !== "undefined") {
            sessionStorage.removeItem(REFERRAL_STORAGE_KEY);
          }
        } catch (err) {
          console.error("Failed to apply referral code", err);
          // Don't block the user if referral fails
        }
      }
      
      setMessage("Email verified successfully! You can proceed with your order.");
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
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 font-montserrat flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking verification status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 font-montserrat">
      <Navbar />

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-red-100">
          <div className="text-center mb-10">
            <span className="inline-flex items-center px-4 py-1 rounded-full bg-red-50 text-red-600 text-sm font-semibold mb-4">
              Get Started With Vidflyy
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Verify Your Email & Kick Off Your Campaign
            </h1>
            <p className="text-gray-600">
              Enter your email address to receive a one-time password (OTP). Once verified, you'll be ready to submit your campaign request.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 rounded-xl">
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
                className="h-12 text-base rounded-xl"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={sendOtp}
                disabled={sendingOtp || emailVerified || !email}
                className="flex-1 rounded-xl"
              >
                {emailVerified
                  ? "EMAIL VERIFIED"
                  : sendingOtp
                  ? "SENDING OTP..."
                  : otpSent
                  ? "RESEND OTP"
                  : "SEND OTP"}
              </Button>
              {otpSent && !emailVerified && (
                <Button
                  variant="outline"
                  onClick={resetState}
                  className="h-12 font-semibold rounded-xl"
                >
                  Change Email
                </Button>
              )}
            </div>

            {otpSent && !emailVerified && (
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Enter 6-digit OTP
                </label>
                <Input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter Your OTP"
                  className="text-center tracking-[0.4em] text-lg font-mono h-12"
                />
                <Button
                  onClick={verifyOtp}
                  disabled={verifyingOtp || otp.length !== 6}
                  className="rounded-xl w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold transition-all duration-300 hover:scale-[1.01]"
                >
                  {verifyingOtp ? "Verifying..." : "Verify OTP"}
                </Button>
              </div>
            )}

            {message && (
              <div className="p-4 rounded-xl bg-green-50 text-green-700 text-sm font-medium border border-green-100">
                {message}
              </div>
            )}

            {error && (
              <div className="p-4 rounded-xl bg-red-50 text-red-700 text-sm font-medium border border-red-100">
                {error}
              </div>
            )}

            {referralCode && !emailVerified && (
              <div className="p-4 rounded-xl bg-emerald-50 text-emerald-700 text-sm font-medium border border-emerald-200">
                <p className="font-semibold mb-1">🎉 Referral Code Detected!</p>
                <p>You'll receive <strong>500 free views</strong> when you verify your email and create your first campaign!</p>
                <p className="text-xs mt-2 opacity-75">Referral Code: <span className="font-mono">{referralCode}</span></p>
              </div>
            )}

            <div className="mt-10 bg-red-50 rounded-2xl p-6 border border-red-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">What happens next?</h2>
              <ol className="space-y-2 text-gray-700 text-sm">
                <li>1. Enter your email and request an OTP.</li>
                <li>2. Verify the OTP to confirm your email address.</li>
                <li>3. Once verified, proceed to submit your full order details.</li>
                <li>4. Our team will reach out with the next steps.</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GetStarted;









