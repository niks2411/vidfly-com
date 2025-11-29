import CampaignLayout from "@/components/CampaignLayout";
import CampaignHeader from "@/components/CampaignHeader";
import CampaignCard from "@/components/CampaignCard";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getVerifiedEmail } from "@/lib/verifiedEmail";
import { useEffect, useState } from "react";

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
  const navigate = useNavigate();
  const verifiedEmail = getVerifiedEmail();
  const [channelError, setChannelError] = useState("");

  useEffect(() => {
    if (!verifiedEmail) {
      navigate("/get-started", { replace: true });
    }
  }, [verifiedEmail, navigate]);

  const handleBuyNow = (pkg: typeof bulkPackages[0]) => {
    if (!verifiedEmail) {
      setChannelError("Please verify your email first");
      return;
    }

    // Navigate to video selection page with bulk views package info
    navigate("/campaign/bulk-views/select", {
      state: {
        email: verifiedEmail,
        bulkViewsPackage: {
          id: pkg.id,
          label: pkg.label,
          price: pkg.price,
          views: parseInt(pkg.label.replace(/\D/g, "")), // Extract number from label
        },
      },
    });
  };

  return (
    <CampaignLayout activeSidebar="bulk">
      <CampaignCard>
            <CampaignHeader>
              <div className="animate-fade-in">
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r text-gray-800 bg-clip-text   leading-tight">
                  Select from Packages below
                </h1>
              </div>
            </CampaignHeader>

            <div className="grid md:grid-cols-2 gap-4">
              {bulkPackages.map((pkg, index) => (
                <div
                  key={pkg.id}
                  className="flex flex-col gap-3 rounded-2xl border-2 border-white/50 p-4 bg-white/80 backdrop-blur-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-12 w-12 rounded-xl bg-gradient-to-br ${pkg.iconGradient} flex items-center justify-center shadow-lg flex-shrink-0`}
                    >
                      <Play className="h-6 w-6 text-white fill-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-slate-500 font-medium">Package</p>
                      <p className="text-lg font-bold text-slate-900">
                        {pkg.label}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xl font-bold text-red-600">
                    <span>{pkg.price}</span>
                    <span className="text-slate-400 line-through text-sm font-normal">
                      {pkg.oldPrice}
                    </span>
                    <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full font-semibold">
                      {pkg.discount}
                    </span>
                  </div>
                  <div>
                    <Button 
                      className="w-full"
                      onClick={() => handleBuyNow(pkg)}
                    >
                      BUY NOW
                    </Button>
                    {channelError && (
                      <p className="mt-1.5 text-xs text-red-600 font-medium text-center">{channelError}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
      </CampaignCard>
    </CampaignLayout>
  );
};

export default CampaignBulkViews;


