"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import CampaignCard from "@/components/CampaignCard";
import CampaignLayout from "@/components/CampaignLayout";
import { CheckCircle, Loader2 } from "lucide-react";

function PaymentSuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");

    return (
        <CampaignCard>
            <div className="flex flex-col items-center justify-center py-16 space-y-6">
                <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900">Payment Successful!</h2>
                    <p className="text-slate-500 mt-2">Your campaign has been created and will start shortly.</p>
                    {orderId && (
                        <p className="text-sm text-slate-400 mt-2">Order ID: <span className="font-semibold text-slate-600">{orderId}</span></p>
                    )}
                </div>
                <Button onClick={() => router.push("/campaign/my-campaigns")} size="lg" className="rounded-xl px-12 bg-green-600 hover:bg-green-700 font-bold">
                    VIEW CAMPAIGNS
                </Button>
            </div>
        </CampaignCard>
    );
}

export default function PaymentSuccess() {
    return (
        <CampaignLayout activeSidebar="payment">
            <Suspense fallback={
                <CampaignCard>
                    <div className="flex flex-col items-center justify-center py-16 space-y-6">
                        <Loader2 className="h-16 w-16 animate-spin text-green-600" />
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-slate-900">Loading...</h2>
                        </div>
                    </div>
                </CampaignCard>
            }>
                <PaymentSuccessContent />
            </Suspense>
        </CampaignLayout>
    );
}
