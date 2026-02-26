"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import CampaignLayout from "@/components/CampaignLayout";
import CampaignHeader from "@/components/CampaignHeader";
import CampaignCard from "@/components/CampaignCard";
import { Button } from "@/components/ui/button";
import { getVerifiedEmail } from "@/lib/verifiedEmail";

const bulkPackages = [
    {
        id: "views-25k",
        views: 25000,
        price: "₹4,750",
        originalPrice: "₹5,000",
        discountLabel: "5% off",
        iconBg: "bg-gradient-to-tr from-orange-500 to-amber-400",
    },
    {
        id: "views-50k",
        views: 50000,
        price: "₹9,500",
        originalPrice: "₹10,000",
        discountLabel: "5% off",
        iconBg: "bg-gradient-to-tr from-slate-500 to-slate-400",
    },
    {
        id: "views-100k",
        views: 100000,
        price: "₹19,000",
        originalPrice: "₹20,000",
        discountLabel: "5% off",
        iconBg: "bg-gradient-to-tr from-rose-500 to-pink-400",
    },
    {
        id: "views-250k",
        views: 250000,
        price: "₹47,500",
        originalPrice: "₹50,000",
        discountLabel: "5% off",
        iconBg: "bg-gradient-to-tr from-red-500 to-red-400",
    },
    {
        id: "views-500k",
        views: 500000,
        price: "₹95,000",
        originalPrice: "₹1,00,000",
        discountLabel: "5% off",
        iconBg: "bg-gradient-to-tr from-sky-500 to-blue-500",
    },
    {
        id: "views-1m",
        views: 1000000,
        price: "₹1,90,000",
        originalPrice: "₹2,00,000",
        discountLabel: "5% off",
        iconBg: "bg-gradient-to-tr from-emerald-500 to-lime-500",
    },
];

export default function CampaignBulkViews() {
    const router = useRouter();
    const verifiedEmail = getVerifiedEmail();

    useEffect(() => {
        if (!verifiedEmail) {
            router.replace("/get-started");
        }
    }, [verifiedEmail, router]);

    const handleSelectPackage = (pkg: (typeof bulkPackages)[number]) => {
        if (!verifiedEmail) return;

        // Use sessionStorage to pass complex state instead of router state
        sessionStorage.setItem("vidfly_bulk_package", JSON.stringify({
            id: pkg.id,
            label: `${pkg.views.toLocaleString()} views`,
            price: pkg.price,
            views: pkg.views,
        }));

        router.push("/campaign/bulk-views/select");
    };

    return (
        <CampaignLayout activeSidebar="bulk">
            <CampaignCard>
                <CampaignHeader>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Select Bulk Package</h1>
                        <p className="text-slate-600">Pick a bulk views package that fits your goals. You'll select the videos on the next step.</p>
                    </div>
                </CampaignHeader>

                <div className="mt-8 space-y-4">
                    {bulkPackages.reduce<((typeof bulkPackages)[number])[][]>((rows, pkg, index) => {
                        if (index % 2 === 0) rows.push(bulkPackages.slice(index, index + 2));
                        return rows;
                    }, []).map((row, rowIndex) => (
                        <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {row.map((pkg) => (
                                <div key={pkg.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className={`h-12 w-16 rounded-xl ${pkg.iconBg} flex items-center justify-center shadow-lg`}>
                                            <span className="text-white font-bold">▶</span>
                                        </div>
                                        <div>
                                            <p className="text-xl font-bold text-slate-900">{pkg.views.toLocaleString()}</p>
                                            <p className="text-xs text-slate-500 uppercase">Views</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="text-xl font-bold text-slate-900">{pkg.price}</p>
                                            <div className="flex items-center justify-end gap-2 text-[10px]">
                                                <span className="text-slate-400 line-through">{pkg.originalPrice}</span>
                                                <span className="text-red-600 font-bold">{pkg.discountLabel}</span>
                                            </div>
                                        </div>
                                        <Button
                                            className="rounded-xl bg-red-600 hover:bg-red-700 px-6 py-2 text-xs font-bold"
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
}
