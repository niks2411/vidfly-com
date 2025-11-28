import { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CampaignSidebar from "@/components/CampaignSidebar";
import { Button } from "@/components/ui/button";

const packageMeta = {
  monetization: {
    title: "YouTube Monetization Package",
    requirements: { hours: 4000, subs: 1000, time: "8-12 Weeks" },
    faqs: [
      "What is the Monetization Package?",
      "How does it work?",
      "Does watch time from these campaigns count toward monetization?",
      "How is this different from normal YouTube ad campaigns?",
    ],
  },
  silver: {
    title: "YouTube Silver Play Package",
    requirements: { hours: 6000, subs: 100000, time: "12-20 Weeks" },
    faqs: [
      "How do you help reach 100K subscribers?",
      "Can I target specific countries?",
      "What support do I get during the campaign?",
    ],
  },
  "bulk-views": {
    title: "YouTube Bulk Views Packages",
    requirements: { hours: 2000, subs: 0, time: "Flexible" },
    faqs: [
      "Which videos can I include?",
      "Can I split budget across multiple videos?",
      "Do these views help with monetization?",
    ],
  },
} as const;

type StoredVideo = {
  title: string;
  author?: string;
};

const STORAGE_KEY = "vidfly_channel_videos";

const CampaignPackageDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const pkg = id && packageMeta[id as keyof typeof packageMeta];
  const location = useLocation();
  const verifiedEmail =
    (location.state as { email?: string } | null)?.email || undefined;

  const channelInfo = useMemo(() => {
    if (typeof window === "undefined") return null;
    try {
      const parsed: StoredVideo[] = JSON.parse(
        sessionStorage.getItem(STORAGE_KEY) || "[]"
      );
      if (!parsed.length) {
        return null;
      }
      return {
        ...parsed[0],
        avatarUrl: `https://ui-avatars.com/api/?name=${
          parsed[0].author || "VC"
        }&background=7c3aed&color=fff`,
      };
    } catch {
      return null;
    }
  }, []);

  if (!pkg) {
    return (
      <div className="min-h-screen bg-slate-50 font-montserrat">
        <Navbar />
        <div className="max-w-5xl mx-auto px-4 py-16 text-center space-y-6">
          <h1 className="text-3xl font-bold text-slate-900">Package not found</h1>
          <Button onClick={() => navigate("/campaign/packages")} className="rounded-2xl">
            Back to packages
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-montserrat">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 flex flex-col gap-8 lg:flex-row">
        <CampaignSidebar />
        <main className="flex-1 space-y-8">
          <section className="bg-white rounded-3xl shadow-md p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl overflow-hidden bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                {channelInfo?.avatarUrl ? (
                  <img
                    src={channelInfo.avatarUrl}
                    alt={channelInfo.author}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  (channelInfo?.author?.slice(0, 2).toUpperCase() || "VC")
                )}
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-500 uppercase">Channel</p>
                <h2 className="text-xl font-bold text-slate-900">
                  {channelInfo?.author || "Your Channel"}
                </h2>
              </div>
              <Button variant="outline" className="rounded-2xl">
                Add New Channel
              </Button>
            </div>

            <div className="mt-6">
              <h1 className="text-3xl font-bold text-slate-900">{pkg.title}</h1>
              <p className="text-slate-500 mt-2 max-w-2xl">
                Tailored growth campaign for your verified channel. Once purchased, our
                strategists will share a complete execution roadmap and onboarding form.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-center">
                <p className="text-xs uppercase text-slate-500">Watch hours needed</p>
                <p className="text-3xl font-bold text-purple-600">
                  {pkg.requirements.hours.toLocaleString()}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-center">
                <p className="text-xs uppercase text-slate-500">Subscribers needed</p>
                <p className="text-3xl font-bold text-purple-600">
                  {pkg.requirements.subs.toLocaleString()}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-center">
                <p className="text-xs uppercase text-slate-500">Estimated time</p>
                <p className="text-3xl font-bold text-purple-600">
                  {pkg.requirements.time}
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">FAQs</h3>
              <div className="space-y-3">
                {pkg.faqs.map((faq) => (
                  <details key={faq} className="rounded-2xl border border-slate-100 p-4">
                    <summary className="cursor-pointer font-semibold text-slate-800">
                      {faq}
                    </summary>
                    <p className="text-sm text-slate-500 mt-2">
                      Detailed answer will go here describing how this package addresses
                      {` "${faq}"`}.
                    </p>
                  </details>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4 mt-8">
              <Button
                variant="outline"
                className="rounded-2xl border-purple-600 text-purple-600 px-6"
                onClick={() => navigate("/campaign/packages")}
              >
                Back to packages
              </Button>
              <Button className="rounded-2xl bg-purple-600 hover:bg-purple-700 px-8">
                Continue to payment
              </Button>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default CampaignPackageDetail;

