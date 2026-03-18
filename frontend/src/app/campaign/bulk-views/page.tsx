"use client";

import { useEffect, useState } from "react";
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
    const [verifiedEmail, setVerifiedEmail] = useState<string | undefined>(undefined);

    useEffect(() => {
        const email = getVerifiedEmail();
        setVerifiedEmail(email);
        if (!email) {
            router.replace("/get-started");
        }
    }, [router]);

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
        <CampaignLayout activeSidebar="bulk" showChannelSelector={false}>
            <CampaignCard>
                <CampaignHeader showChannelSelector={false}>
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
                                <div key={pkg.id} className="flex flex-col xl:flex-row xl:items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm hover:shadow-md transition-all gap-4 xl:gap-0">
                                    {/* Left: Icon & Views */}
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div className={`h-10 w-12 sm:h-12 sm:w-16 rounded-xl ${pkg.iconBg} flex items-center justify-center shadow-md`}>
                                            <span className="text-white font-bold text-sm sm:text-base">▶</span>
                                        </div>
                                        <div>
                                            <p className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">{pkg.views.toLocaleString()}</p>
                                            <p className="text-[10px] sm:text-xs text-slate-500 uppercase font-bold tracking-wider">Views</p>
                                        </div>
                                    </div>

                                    {/* Right: Price & Button */}
                                    <div className="flex items-center justify-between xl:justify-end gap-3 sm:gap-4 w-full xl:w-auto pt-3 xl:pt-0 border-t xl:border-t-0 border-slate-100">
                                        <div className="text-left xl:text-right">
                                            <p className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">{pkg.price}</p>
                                            <div className="flex items-center justify-start xl:justify-end gap-1.5 sm:gap-2 text-[10px] sm:text-xs">
                                                <span className="text-slate-400 line-through">{pkg.originalPrice}</span>
                                                <span className="text-red-600 font-bold">{pkg.discountLabel}</span>
                                            </div>
                                        </div>
                                        <Button
                                            className="rounded-xl bg-red-600 hover:bg-red-700 px-5 sm:px-8 py-2 sm:py-6 text-[12px] sm:text-sm font-bold whitespace-nowrap shadow-md shadow-red-200"
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
