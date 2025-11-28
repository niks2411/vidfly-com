import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CampaignSidebar from "@/components/CampaignSidebar";
import CampaignHeader from "@/components/CampaignHeader";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const bulkPackages = [
  {
    id: "25k",
    label: "25000 views",
    price: "$249",
    oldPrice: "$450",
    discount: "45% off",
    iconGradient: "from-amber-700 to-amber-800",
  },
  {
    id: "50k",
    label: "50000 views",
    price: "$399",
    oldPrice: "$900",
    discount: "56% off",
    iconGradient: "from-slate-400 to-slate-600",
  },
  {
    id: "100k",
    label: "100000 views",
    price: "$699",
    oldPrice: "$1800",
    discount: "61% off",
    iconGradient: "from-orange-500 to-orange-600",
  },
  {
    id: "250k",
    label: "250000 views",
    price: "$1499",
    oldPrice: "$4500",
    discount: "67% off",
    iconGradient: "from-red-500 to-red-600",
  },
  {
    id: "500k",
    label: "500000 views",
    price: "$2899",
    oldPrice: "$9000",
    discount: "68% off",
    iconGradient: "from-blue-500 to-blue-600",
  },
  {
    id: "1m",
    label: "1000000 views",
    price: "$5499",
    oldPrice: "$18000",
    discount: "69% off",
    iconGradient: "from-green-500 to-green-600",
  },
];

const CampaignBulkViews = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-purple-50 font-montserrat">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 flex flex-col gap-8 lg:flex-row">
        <CampaignSidebar active="promote" />
        <main className="flex-1 space-y-8">
          <section className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 animate-fade-in hover:shadow-2xl transition-all duration-300">
            <CampaignHeader>
              <div className="flex items-center gap-4 animate-fade-in">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  BV
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold">Channel</p>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
                    Select from Packages below
                  </h1>
                </div>
              </div>
            </CampaignHeader>

            <div className="grid md:grid-cols-2 gap-6">
              {bulkPackages.map((pkg, index) => (
                <div
                  key={pkg.id}
                  className="flex flex-col gap-4 rounded-3xl border-2 border-white/50 p-6 bg-white/80 backdrop-blur-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${pkg.iconGradient} flex items-center justify-center shadow-lg flex-shrink-0`}
                    >
                      <Play className="h-7 w-7 text-white fill-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-500 font-medium">Package</p>
                      <p className="text-xl font-bold text-slate-900">
                        {pkg.label}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-2xl font-bold text-purple-600">
                    <span>{pkg.price}</span>
                    <span className="text-slate-400 line-through text-base font-normal">
                      {pkg.oldPrice}
                    </span>
                    <span className="text-xs text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full font-semibold">
                      {pkg.discount}
                    </span>
                  </div>
                  <Button className="rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                    Buy Now
                  </Button>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default CampaignBulkViews;


