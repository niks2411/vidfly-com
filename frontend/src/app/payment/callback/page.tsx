"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CampaignCard from "@/components/CampaignCard";
import CampaignLayout from "@/components/CampaignLayout";
import { Loader2 } from "lucide-react";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");

function PaymentCallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");
    const paymentId = searchParams.get("paymentId") || searchParams.get("cf_payment_id");
    const status = searchParams.get("status");

    const [retryCount, setRetryCount] = useState(0);
    const MAX_RETRIES = 5;

    useEffect(() => {
        if (!orderId) {
            router.replace("/payment/failed");
            return;
        }

        if (status === "FAILED" || status === "failed") {
            router.replace(`/payment/failed?orderId=${orderId}`);
            return;
        }

        verifyPayment();
    }, [orderId, paymentId, status]);

    const verifyPayment = async () => {
        if (!orderId) return;

        if (retryCount >= MAX_RETRIES) {
            router.replace(`/payment/failed?orderId=${orderId}`);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/payments/verify`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ orderId, paymentId, gateway: "cashfree" }),
            });

            const data = await response.json();
            if (response.ok && data.order?.status === "paid") {
                router.replace(`/payment/success?orderId=${orderId}`);
            } else {
                setRetryCount(prev => prev + 1);
                setTimeout(verifyPayment, 3000);
            }
        } catch (err) {
            setRetryCount(prev => prev + 1);
            setTimeout(verifyPayment, 3000);
        }
    };

    return (
        <CampaignCard>
            <div className="flex flex-col items-center justify-center py-16 space-y-6">
                <Loader2 className="h-16 w-16 animate-spin text-red-600" />
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900">Verifying Payment</h2>
                    <p className="text-slate-500">Please wait while we confirm your transaction...</p>
                </div>
            </div>
        </CampaignCard>
    );
}

export default function PaymentCallback() {
    return (
        <CampaignLayout activeSidebar="payment">
            <Suspense fallback={
                <CampaignCard>
                    <div className="flex flex-col items-center justify-center py-16 space-y-6">
                        <Loader2 className="h-16 w-16 animate-spin text-red-600" />
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-slate-900">Initializing...</h2>
                            <p className="text-slate-500">Preparing payment verification...</p>
                        </div>
                    </div>
                </CampaignCard>
            }>
                <PaymentCallbackContent />
            </Suspense>
        </CampaignLayout>
    );
}
