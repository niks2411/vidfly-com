import CampaignLayout from "@/components/CampaignLayout";
import CampaignHeader from "@/components/CampaignHeader";
import CampaignCard from "@/components/CampaignCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { getVerifiedEmail } from "@/lib/verifiedEmail";
import { useEffect } from "react";

const bulkPackages = [
  {
    id: "views-25k",
    views: 25000,
    price: "₹4,750",
    originalPrice: "₹5,000",
    discountLabel: "5% off",
    badgeColor: "bg-orange-100",
    iconBg: "bg-gradient-to-tr from-orange-500 to-amber-400",
  },
  {
    id: "views-50k",
    views: 50000,
    price: "₹9,500",
    originalPrice: "₹10,000",
    discountLabel: "5% off",
    badgeColor: "bg-slate-200",
    iconBg: "bg-gradient-to-tr from-slate-500 to-slate-400",
  },
  {
    id: "views-100k",
    views: 100000,
    price: "₹19,000",
    originalPrice: "₹20,000",
    discountLabel: "5% off",
    badgeColor: "bg-orange-100",
    iconBg: "bg-gradient-to-tr from-rose-500 to-pink-400",
  },
  {
    id: "views-250k",
    views: 250000,
    price: "₹47,500",
    originalPrice: "₹50,000",
    discountLabel: "5% off",
    badgeColor: "bg-red-100",
    iconBg: "bg-gradient-to-tr from-red-500 to-red-400",
  },
  {
    id: "views-500k",
    views: 500000,
    price: "₹95,000",
    originalPrice: "₹1,00,000",
    discountLabel: "5% off",
    badgeColor: "bg-blue-100",
    iconBg: "bg-gradient-to-tr from-sky-500 to-blue-500",
  },
  {
    id: "views-1m",
    views: 1000000,
    price: "₹1,90,000",
    originalPrice: "₹2,00,000",
    discountLabel: "5% off",
    badgeColor: "bg-green-100",
    iconBg: "bg-gradient-to-tr from-emerald-500 to-lime-500",
  },
];

const CampaignBulkViews = () => {
  const navigate = useNavigate();
  const verifiedEmail = getVerifiedEmail();

  useEffect(() => {
    if (!verifiedEmail) {
      navigate("/get-started", { replace: true });
    }
  }, [verifiedEmail, navigate]);

  const handleSelectPackage = (pkg: (typeof bulkPackages)[number]) => {
    if (!verifiedEmail) return;

    navigate("/campaign/bulk-views/select", {
      state: {
        email: verifiedEmail,
        bulkViewsPackage: {
          id: pkg.id,
          label: `${pkg.views.toLocaleString()} views`,
          price: pkg.price,
          views: pkg.views,
        },
      },
    });
  };

  return (
    <CampaignLayout activeSidebar="bulk">
      <CampaignCard>
        <CampaignHeader>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-1">
              Select from Packages below
            </h1>
            <p className="text-slate-600 text-sm">
              Pick a bulk views package that fits your goals. You’ll select the exact video on the next step.
            </p>
          </div>
        </CampaignHeader>

        <div className="mt-6 space-y-4">
          {bulkPackages.reduce<typeof bulkPackages[][]>((rows, _pkg, index) => {
            if (index % 2 === 0) {
              rows.push(bulkPackages.slice(index, index + 2));
            }
            return rows;
          }, []).map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {row.map((pkg) => (
                <div
                  key={pkg.id}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-8 py-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Left: icon + views */}
                  <div className="flex items-center gap-5">
                    <div className="h-16 w-16 flex items-center justify-center">
                      <div className={`h-9 w-14 rounded-xl ${pkg.iconBg} flex items-center justify-center shadow-sm`}>
                        <span className="text-white text-base font-semibold">▶</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-slate-900">
                        {pkg.views.toLocaleString()}
                      </p>
                      <p className="text-xs text-slate-500">views</p>
                    </div>
                  </div>

                  {/* Right: price + CTA */}
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xl font-bold text-slate-900">
                        {pkg.price}
                      </p>
                      <div className="flex items-center justify-end gap-2 text-[11px]">
                        <span className="text-slate-400 line-through">
                          {pkg.originalPrice}
                        </span>
                        <span className="text-purple-500 font-semibold">
                          {pkg.discountLabel}
                        </span>
                      </div>
                    </div>
                    <Button
                      className="rounded-xl bg-red-500 hover:bg-red-600 px-6 py-2 text-xs font-semibold"
                      onClick={() => handleSelectPackage(pkg)}
                    >
                      Buy Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </CampaignCard>
    </CampaignLayout>
  );
};

export default CampaignBulkViews;


