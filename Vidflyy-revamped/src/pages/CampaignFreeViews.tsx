import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CampaignSidebar from "@/components/CampaignSidebar";
import CampaignHeader from "@/components/CampaignHeader";
import { Button } from "@/components/ui/button";

const CampaignFreeViews = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-purple-50 font-montserrat">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 flex flex-col gap-8 lg:flex-row">
        <CampaignSidebar active="promote" />
        <main className="flex-1 space-y-8">
          <section className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 space-y-8 animate-fade-in hover:shadow-2xl transition-all duration-300">
            <CampaignHeader>
              <div className="flex items-center gap-4 animate-fade-in">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  FV
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold">Channel</p>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">Free Views Balance</h1>
                </div>
              </div>
            </CampaignHeader>

            <div className="rounded-3xl border border-slate-100 bg-gradient-to-r from-purple-50 to-white p-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs uppercase text-slate-500">Current balance</p>
                <p className="text-4xl font-bold text-purple-600">0 Views</p>
              </div>
              <Button className="rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 px-8 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                Redeem Now
              </Button>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Unlock <span className="text-purple-600">Free Views</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-3xl border border-slate-100 p-6 text-center">
                  <p className="text-xs uppercase text-slate-500 mb-2">Step 1</p>
                  <h3 className="text-xl font-bold text-slate-900">
                    Verify mobile number and get <span className="text-purple-600">1000</span>{" "}
                    free views
                  </h3>
                  <Button className="mt-6 rounded-2xl w-full bg-purple-100 text-purple-700 hover:bg-purple-200">
                    Verify Now
                  </Button>
                </div>
                <div className="rounded-3xl border border-slate-100 p-6 text-center">
                  <p className="text-xs uppercase text-slate-500 mb-2">Step 2</p>
                  <h3 className="text-xl font-bold text-slate-900">
                    Create your first paid campaign
                  </h3>
                  <Button className="mt-6 rounded-2xl w-full bg-purple-100 text-purple-700 hover:bg-purple-200">
                    Create Now
                  </Button>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6 text-center space-y-4">
              <h3 className="text-2xl font-bold text-emerald-700">
                Want more <span className="text-emerald-900">Free Views?</span>
              </h3>
              <p className="text-sm text-emerald-900 max-w-3xl mx-auto">
                Supercharge your campaigns with our referral program. Invite creators, help them
                launch their first ad, and both accounts will receive bonus views to reinvest
                into their content.
              </p>
              <Button className="rounded-2xl bg-emerald-600 hover:bg-emerald-700 px-8">
                View Referral Program
              </Button>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default CampaignFreeViews;


