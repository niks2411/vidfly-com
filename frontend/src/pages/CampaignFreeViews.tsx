import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CampaignLayout from "@/components/CampaignLayout";
import CampaignHeader from "@/components/CampaignHeader";
import CampaignCard from "@/components/CampaignCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getVerifiedEmail } from "@/lib/verifiedEmail";
import { Copy, Check, Users, Gift, Share2 } from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "http://localhost:5000";

const CampaignFreeViews = () => {
  const navigate = useNavigate();
  const verifiedEmail = getVerifiedEmail();
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
    if (!verifiedEmail) {
      navigate("/get-started", { replace: true });
    } else {
      // Generate referral code from email (simple hash)
      const generateReferralCode = (email: string) => {
        const hash = email.split('').reduce((acc, char) => {
          return ((acc << 5) - acc) + char.charCodeAt(0);
        }, 0);
        return `VID${Math.abs(hash).toString(36).toUpperCase().slice(0, 8)}`;
      };
      
      const code = generateReferralCode(verifiedEmail);
      setReferralCode(code);
      const link = `${window.location.origin}/get-started?ref=${code}`;
      setReferralLink(link);
      
      // Load free views balance and referral stats (would come from API)
      loadFreeViewsData();
    }
  }, [verifiedEmail, navigate]);

  const loadFreeViewsData = async () => {
    if (!verifiedEmail) return;
    try {
      setLoading(true);
      // This would fetch from API: GET /api/free-views/balance?email=...
      // For now, using mock data
      const response = await fetch(`${API_BASE_URL}/api/free-views/balance?email=${encodeURIComponent(verifiedEmail)}`, {
        credentials: "include",
      });
      
      if (response.ok) {
        const data = await response.json();
        setFreeViewsBalance(data.balance || 0);
        setReferralStats({
          totalReferrals: data.totalReferrals || 0,
          totalViewsEarned: data.totalViewsEarned || 0,
        });
      } else {
        // If API doesn't exist yet, use default values
        setFreeViewsBalance(0);
      }
    } catch (err) {
      console.error("Failed to load free views data", err);
      // Use default values if API fails
      setFreeViewsBalance(0);
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

    if (!verifiedEmail) {
      setError("Please verify your email first");
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

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.message || "Failed to apply referral code");
      }

      const data = await response.json();
      setSuccess(`Success! You received ${data.viewsEarned || 500} free views!`);
      setEnteredReferralCode("");
      loadFreeViewsData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to apply referral code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CampaignLayout activeSidebar="free">
      <CampaignCard className="space-y-4">
            <CampaignHeader>
              <div className="animate-fade-in">
                <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r text-red-800 bg-clip-text leading-tight">
                  Free Views Balance
                </h1>
              </div>
            </CampaignHeader>

            <div className="rounded-2xl border border-slate-100 bg-gradient-to-r from-red-50 to-white p-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs uppercase text-slate-500">Current balance</p>
                <p className="text-4xl font-bold text-red-600">
                  {loading ? "Loading..." : `${freeViewsBalance.toLocaleString()} Views`}
                </p>
              </div>
              <Button 
                className="rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-8 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                onClick={() => navigate("/campaign", { state: { email: verifiedEmail } })}
              >
                Redeem Now
              </Button>
            </div>

            {/* Referral Program Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900">
                Referral Program
              </h2>

              {/* Referral Stats */}
              <div className="grid md:grid-cols-3 gap-3">
                <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center">
                  <Users className="h-6 w-6 text-red-600 mx-auto mb-1.5" />
                  <p className="text-xs uppercase text-slate-500 mb-0.5">Total Referrals</p>
                  <p className="text-xl font-bold text-slate-900">{referralStats.totalReferrals}</p>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center">
                  <Gift className="h-6 w-6 text-emerald-600 mx-auto mb-1.5" />
                  <p className="text-xs uppercase text-slate-500 mb-0.5">Views Earned</p>
                  <p className="text-xl font-bold text-emerald-600">{referralStats.totalViewsEarned.toLocaleString()}</p>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center">
                  <Share2 className="h-6 w-6 text-blue-600 mx-auto mb-1.5" />
                  <p className="text-xs uppercase text-slate-500 mb-0.5">Your Code</p>
                  <p className="text-base font-bold text-blue-600 font-mono">{referralCode}</p>
                </div>
              </div>

              {/* Share Your Referral Link */}
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-emerald-700 mb-1.5">
                    Share Your Referral Link
                  </h3>
                  <p className="text-sm text-emerald-900">
                    Get <span className="font-bold">500 free views</span> for each friend who signs up using your link and creates their first campaign!
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 flex items-center gap-2 bg-white rounded-2xl px-4 py-3 border border-emerald-200">
                    <Input
                      value={referralLink}
                      readOnly
                      className="border-0 bg-transparent text-sm"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopyLink}
                      className="text-emerald-600 hover:text-emerald-700"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 mr-1" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <Button
                    className="rounded-2xl bg-emerald-600 hover:bg-emerald-700 px-6"
                    onClick={handleCopyLink}
                  >
                    Share Link
                  </Button>
                </div>
                <div className="bg-white/50 rounded-xl p-3 text-xs text-emerald-800">
                  <p className="font-semibold mb-1">How it works:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Share your referral link with friends</li>
                    <li>When they sign up and create their first campaign, you both get 500 free views</li>
                    <li>No limit on how many friends you can refer!</li>
                  </ul>
                </div>
              </div>

              {/* Enter Referral Code */}
              <div className="rounded-2xl border border-red-100 bg-red-50 p-4 space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-red-700 mb-1.5">
                    Have a Referral Code?
                  </h3>
                  <p className="text-sm text-gray-900">
                    Enter a friend's referral code to get <span className="font-bold">500 free views</span> when you create your first campaign!
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    placeholder="Enter referral code (e.g., VID123456)"
                    value={enteredReferralCode}
                    onChange={(e) => {
                      setEnteredReferralCode(e.target.value.toUpperCase());
                      setError("");
                      setSuccess("");
                    }}
                    className="flex-1 rounded-2xl border-red-200"
                    maxLength={12}
                  />
                  <Button
                    className="rounded-2xl bg-red-600 hover:bg-red-700 px-6"
                    onClick={handleApplyReferralCode}
                    disabled={loading || !enteredReferralCode.trim()}
                  >
                    {loading ? "Applying..." : "Apply Code"}
                  </Button>
                </div>
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-sm text-emerald-600">
                    {success}
                  </div>
                )}
              </div>
            </div>
      </CampaignCard>
    </CampaignLayout>
  );
};

export default CampaignFreeViews;


