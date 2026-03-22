"use client";

import { Suspense, useEffect, useState } from "react";
import Script from "next/script";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import CampaignCard from "@/components/CampaignCard";
import CampaignLayout from "@/components/CampaignLayout";
import { Loader2, CheckCircle, XCircle, AlertCircle } from "lucide-react";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");

type PaymentStatus = "verifying" | "success" | "failed" | "error";

function PaymentCallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");
    const paymentId = searchParams.get("paymentId") || searchParams.get("cf_payment_id");
    const status = searchParams.get("status");

    const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("verifying");
    const [error, setError] = useState<string | null>(null);
    const [retryCount, setRetryCount] = useState(0);
    const MAX_RETRIES = 5;

    useEffect(() => {
        if (!orderId) {
            setPaymentStatus("error");
            setError("Order ID is missing");
            return;
        }

        if (status === "SUCCESS" || status === "success") {
            verifyPayment();
        } else if (status === "FAILED" || status === "failed") {
            setPaymentStatus("failed");
        } else {
            verifyPayment();
        }
    }, [orderId, paymentId, status]);

    const verifyPayment = async () => {
        if (!orderId) return;

        if (retryCount >= MAX_RETRIES) {
            setPaymentStatus("error");
            setError("Verification taking too long. Please check My Campaigns.");
            return;
        }

        try {
            setPaymentStatus("verifying");
            const response = await fetch(`${API_BASE_URL}/api/payments/verify`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ orderId, paymentId, gateway: "cashfree" }),
            });

            const data = await response.json();
            if (response.ok && data.order?.status === "paid") {
                setPaymentStatus("success");
            } else {
                // If not verified yet, retry
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
                {paymentStatus === "verifying" && (
                    <>
                        <Loader2 className="h-16 w-16 animate-spin text-red-600" />
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-slate-900">Verifying Payment</h2>
                            <p className="text-slate-500">Please wait while we confirm your transaction...</p>
                        </div>
                    </>
                )}

                {paymentStatus === "success" && (
                    <>
                        <Script
                            id="gtag-base"
                            strategy="afterInteractive"
                            src="https://www.googletagmanager.com/gtag/js?id=AW-18031232942"
                        />
                        <Script
                            id="gtag-init"
                            strategy="afterInteractive"
                            dangerouslySetInnerHTML={{
                                __html: `
                                    window.dataLayer = window.dataLayer || [];
                                    function gtag(){dataLayer.push(arguments);}
                                    gtag('js', new Date());
                                    gtag('config', 'AW-18031232942');
                                    
                                    gtag('event', 'conversion', {
                                        'send_to': 'AW-18031232942/sSGsCPmKvo0cEK6P-5VD',
                                        'value': 1.0,
                                        'currency': 'USD',
                                        'transaction_id': '${orderId || ""}'
                                    });
                                `,
                            }}
                        />
                        <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle className="h-12 w-12 text-green-600" />
                        </div>
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-slate-900">Payment Successful!</h2>
                            <p className="text-slate-500">Your campaign has been created and will start shortly.</p>
                        </div>
                        <Button onClick={() => router.push("/campaign/my-campaigns")} size="lg" className="rounded-xl px-12 bg-green-600 hover:bg-green-700 font-bold">
                            VIEW CAMPAIGNS
                        </Button>
                    </>
                )}

                {paymentStatus === "failed" && (
                    <>
                        <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center">
                            <XCircle className="h-12 w-12 text-red-600" />
                        </div>
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-slate-900">Payment Failed</h2>
                            <p className="text-slate-500">{error || "Your transaction could not be completed."}</p>
                        </div>
                        <Button onClick={() => router.push("/campaign/my-campaigns")} variant="outline" className="rounded-xl px-12">
                            MY CAMPAIGNS
                        </Button>
                    </>
                )}

                {paymentStatus === "error" && (
                    <>
                        <div className="h-20 w-20 rounded-full bg-orange-100 flex items-center justify-center">
                            <AlertCircle className="h-12 w-12 text-orange-600" />
                        </div>
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-slate-900">Verification Error</h2>
                            <p className="text-slate-500">{error || "Something went wrong during verification."}</p>
                        </div>
                        <Button onClick={() => router.push("/campaign/my-campaigns")} variant="outline" className="rounded-xl px-12">
                            MY CAMPAIGNS
                        </Button>
                    </>
                )}
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

