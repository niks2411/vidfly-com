"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import CampaignCard from "@/components/CampaignCard";
import CampaignLayout from "@/components/CampaignLayout";
import { Loader2, CreditCard, AlertCircle } from "lucide-react";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");
const CASHFREE_MODE = process.env.NEXT_PUBLIC_CASHFREE_MODE || "sandbox";

type Order = {
    _id: string;
    orderId: string;
    status: string;
    plan?: { name?: string; price?: number; currency?: string; quantity?: number; };
    packageInfo?: { name?: string; price?: number; currency?: string; };
    channel?: { name?: string; };
    videos?: Array<{ title?: string; }>;
    paymentId?: { amount?: number; currency?: string; status?: string; };
};

function PaymentCheckoutContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");

    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [sdkLoaded, setSdkLoaded] = useState(false);

    useEffect(() => {
        if (!orderId) {
            setError("Order ID is missing");
            setLoading(false);
            return;
        }
        fetchOrder();
    }, [orderId]);

    const fetchOrder = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}`, { credentials: "include" });
            if (!response.ok) throw new Error("Order not found");
            const data = await response.json();
            setOrder(data);
            if (data.status === "paid") router.replace("/campaign/my-campaigns");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load order");
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = async () => {
        if (!orderId || !sdkLoaded) return;
        try {
            setProcessing(true);
            setError(null);
            const response = await fetch(`${API_BASE_URL}/api/payments/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ orderId, gateway: "cashfree" }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data?.message || "Failed to create payment session");

            if (data.paymentSessionId) {
                const cashfree = (window as any).Cashfree({ mode: CASHFREE_MODE });
                cashfree.checkout({ paymentSessionId: data.paymentSessionId, redirectTarget: "_self" });
            } else if (data.paymentUrl) {
                window.location.href = data.paymentUrl;
            } else {
                throw new Error("Payment session ID not received");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to initiate payment");
            setProcessing(false);
        }
    };

    if (loading) return <CampaignCard className="max-w-2xl mx-auto flex flex-col items-center py-12"><Loader2 className="animate-spin h-8 w-8 text-red-600 mb-2" /><p>Loading order...</p></CampaignCard>;

    if (error && !order) return <CampaignCard className="max-w-2xl mx-auto text-center py-12"><AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" /><h2 className="text-xl font-bold mb-4">{error}</h2><Button onClick={() => router.push("/campaign/my-campaigns")}>My Campaigns</Button></CampaignCard>;

    const amount = order?.paymentId?.amount || order?.plan?.price || order?.packageInfo?.price || 0;
    const currency = order?.paymentId?.currency || order?.plan?.currency || order?.packageInfo?.currency || "INR";

    return (
        <>
            <Script
                src="https://sdk.cashfree.com/js/v3/cashfree.js"
                onLoad={() => setSdkLoaded(true)}
            />
            <CampaignCard className="max-w-2xl mx-auto">
                <div className="space-y-8">
                    <div className="text-center flex flex-col items-center">
                        <img src="/favicon.png" alt="Vidflyy" className="w-16 h-16 mb-4 object-contain" />
                        <h1 className="text-3xl font-bold text-slate-900">Checkout</h1>
                        <p className="text-slate-500">Secure payment via Cashfree</p>
                    </div>

                    <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-4">
                        <h2 className="font-bold text-lg text-slate-800 border-b pb-3">Order Summary</h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between"><span>Order ID</span><span className="font-bold">{order?.orderId}</span></div>
                            <div className="flex justify-between"><span>Campaign</span><span className="font-bold">{order?.plan?.name || order?.packageInfo?.name}</span></div>
                            <div className="flex justify-between text-lg font-bold pt-4 border-t"><span>Total</span><span className="text-red-600">{currency === "USD" ? "$" : "₹"} {amount.toLocaleString()}</span></div>
                        </div>
                    </div>

                    {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium">{error}</div>}

                    <div className="flex gap-4">
                        <Button variant="outline" className="flex-1 h-12 rounded-xl" onClick={() => router.back()} disabled={processing}>CANCEL</Button>
                        <Button className="flex-1 h-12 rounded-xl bg-red-600 hover:bg-red-700 font-bold" onClick={handlePayment} disabled={processing || !sdkLoaded}>
                            {processing ? <Loader2 className="animate-spin mr-2" /> : <CreditCard className="mr-2 h-4 w-4" />}
                            PAY NOW
                        </Button>
                    </div>

                    <div className="text-center text-[10px] text-slate-400 font-medium">
                        🔒 SECURE 256-BIT SSL ENCRYPTED PAYMENT
                    </div>
                </div>
            </CampaignCard>
        </>
    );
}

export default function PaymentCheckout() {
    return (
        <CampaignLayout activeSidebar="payment" hideSidebar={true}>
            <Suspense fallback={
                <CampaignCard className="max-w-2xl mx-auto flex flex-col items-center py-12">
                    <Loader2 className="animate-spin h-8 w-8 text-red-600 mb-2" />
                    <p>Preparing checkout...</p>
                </CampaignCard>
            }>
                <PaymentCheckoutContent />
            </Suspense>
        </CampaignLayout>
    );
}

