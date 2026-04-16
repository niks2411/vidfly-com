"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import CampaignCard from "@/components/CampaignCard";
import CampaignLayout from "@/components/CampaignLayout";
import { XCircle, Loader2 } from "lucide-react";

function PaymentFailedContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");

    return (
        <CampaignCard>
            <div className="flex flex-col items-center justify-center py-16 space-y-6">
                <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center">
                    <XCircle className="h-12 w-12 text-red-600" />
                </div>
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900">Payment Failed</h2>
                    <p className="text-slate-500 mt-2">Your transaction could not be completed. Please try again.</p>
                    {orderId && (
                        <p className="text-sm text-slate-400 mt-2">Order ID: <span className="font-semibold text-slate-600">{orderId}</span></p>
                    )}
                </div>
                <div className="flex gap-4">
                    <Button onClick={() => router.push("/campaign/my-campaigns")} variant="outline" className="rounded-xl px-8">
                        MY CAMPAIGNS
                    </Button>
                    <Button onClick={() => router.push("/campaign")} className="rounded-xl px-8 bg-red-600 hover:bg-red-700 font-bold">
                        TRY AGAIN
                    </Button>
                </div>
            </div>
        </CampaignCard>
    );
}

export default function PaymentFailed() {
    return (
        <CampaignLayout activeSidebar="payment">
            <Suspense fallback={
                <CampaignCard>
                    <div className="flex flex-col items-center justify-center py-16 space-y-6">
                        <Loader2 className="h-16 w-16 animate-spin text-red-600" />
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-slate-900">Loading...</h2>
                        </div>
                    </div>
                </CampaignCard>
            }>
                <PaymentFailedContent />
            </Suspense>
        </CampaignLayout>
    );
}
