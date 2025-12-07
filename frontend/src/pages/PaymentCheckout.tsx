import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CampaignCard from "@/components/CampaignCard";
import CampaignLayout from "@/components/CampaignLayout";
import { Loader2, CreditCard, AlertCircle, CheckCircle } from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "http://localhost:5000";

type Order = {
  _id: string;
  orderId: string;
  status: string;
  plan?: {
    name?: string;
    price?: number;
    currency?: string;
    quantity?: number;
  };
  packageInfo?: {
    name?: string;
    price?: number;
    currency?: string;
  };
  channel?: {
    name?: string;
  };
  videos?: Array<{
    title?: string;
  }>;
  paymentId?: {
    amount?: number;
    currency?: string;
    status?: string;
  };
};

const PaymentCheckout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) {
      setError("Order ID is missing");
      setLoading(false);
      return;
    }
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    if (!orderId) return;
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Order not found");
      }

      const data = await response.json();
      setOrder(data);

      // If order is already paid, redirect
      if (data.status === "paid") {
        navigate("/campaign/my-campaigns", { replace: true });
        return;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load order");
    } finally {
      setLoading(false);
    }
  };

  const openCashfreeCheckout = (paymentSessionId: string) => {
    try {
      console.log('🔍 Opening Cashfree checkout with session ID:', paymentSessionId?.substring(0, 30) + '...');
      
      // Validate paymentSessionId
      if (!paymentSessionId || paymentSessionId.trim() === '') {
        setError("Invalid payment session ID received");
        setProcessing(false);
        return;
      }

      // Wait for Cashfree SDK to be available
      if (!(window as any).Cashfree) {
        console.log('⏳ Waiting for Cashfree SDK to load...');
        // If SDK not loaded yet, wait a bit and retry
        setTimeout(() => {
          if ((window as any).Cashfree) {
            openCashfreeCheckout(paymentSessionId);
          } else {
            setError("Cashfree payment SDK not loaded. Please refresh the page.");
            setProcessing(false);
          }
        }, 1000);
        return;
      }

      console.log('✅ Cashfree SDK loaded, initializing checkout...');
      
      // Determine mode - must match backend environment
      // Since backend uses TEST, frontend should use sandbox
      const cashfreeMode = 'sandbox'; // Always use sandbox for testing
      
      console.log('🔧 Cashfree configuration:', {
        mode: cashfreeMode,
        sessionIdLength: paymentSessionId.length,
        sessionIdPreview: paymentSessionId.substring(0, 30) + '...'
      });

      const cashfree = (window as any).Cashfree({
        mode: cashfreeMode,
      });

      console.log('🚀 Calling cashfree.checkout()...');
      
      cashfree.checkout({
        paymentSessionId: paymentSessionId.trim(),
        redirectTarget: '_self', // Opens in same tab
      });
      
      console.log('✅ Checkout initiated');
    } catch (err) {
      console.error('❌ Cashfree checkout error:', err);
      setError(`Failed to open Cashfree checkout: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setProcessing(false);
    }
  };

  const handlePayment = async () => {
    if (!orderId) return;

    try {
      setProcessing(true);
      setError(null);

      // Create Cashfree payment session
      const response = await fetch(`${API_BASE_URL}/api/payments/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          orderId,
          gateway: "cashfree",
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.message || "Failed to create payment session");
      }

      const data = await response.json();
      
      console.log('📦 Payment response received:', {
        hasPaymentSessionId: !!data.paymentSessionId,
        hasPaymentUrl: !!data.paymentUrl,
        paymentSessionId: data.paymentSessionId?.substring(0, 30) + '...',
        message: data.message,
        fullData: data
      });

      // Cashfree Payment Gateway uses JavaScript SDK
      if (data.paymentSessionId) {
        openCashfreeCheckout(data.paymentSessionId);
      } else {
        console.error('❌ No paymentSessionId in response:', data);
        throw new Error("Payment session ID not received from server");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to initiate payment");
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <CampaignLayout activeSidebar="payment">
        <CampaignCard>
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-red-600" />
            <p className="text-slate-600">Loading order details...</p>
          </div>
        </CampaignCard>
      </CampaignLayout>
    );
  }

  if (error && !order) {
    return (
      <CampaignLayout activeSidebar="payment">
        <CampaignCard>
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <AlertCircle className="h-12 w-12 text-red-600" />
            <h2 className="text-xl font-bold text-slate-900">Error</h2>
            <p className="text-slate-600 text-center max-w-md">{error}</p>
            <Button onClick={() => navigate("/campaign/my-campaigns")}>
              Go to My Campaigns
            </Button>
          </div>
        </CampaignCard>
      </CampaignLayout>
    );
  }

  if (!order) {
    return null;
  }

  const amount = order.paymentId?.amount || order.plan?.price || order.packageInfo?.price || 0;
  const currency = order.paymentId?.currency || order.plan?.currency || order.packageInfo?.currency || "INR";
  const videoCount = order.videos?.length || 1;
  const campaignName = order.plan?.name || order.packageInfo?.name || "Campaign";

  return (
    <CampaignLayout activeSidebar="payment">
      <CampaignCard>
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-slate-900">Complete Payment</h1>
            <p className="text-slate-600">Secure payment powered by Cashfree</p>
          </div>

          {/* Order Summary */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">Order Summary</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600">Order ID:</span>
                <span className="font-semibold text-slate-900">{order.orderId}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-slate-600">Campaign:</span>
                <span className="font-semibold text-slate-900">{campaignName}</span>
              </div>

              {order.channel?.name && (
                <div className="flex justify-between">
                  <span className="text-slate-600">Channel:</span>
                  <span className="font-semibold text-slate-900">{order.channel.name}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-slate-600">Videos:</span>
                <span className="font-semibold text-slate-900">{videoCount} {videoCount === 1 ? 'Video' : 'Videos'}</span>
              </div>

              {order.plan?.quantity && (
                <div className="flex justify-between">
                  <span className="text-slate-600">Views:</span>
                  <span className="font-semibold text-slate-900">
                    {order.plan.quantity.toLocaleString()}
                  </span>
                </div>
              )}

              <div className="border-t border-slate-200 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-slate-900">Total Amount:</span>
                  <span className="text-2xl font-bold text-red-600">
                    {currency === "USD" ? "$" : "₹"} {amount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-blue-50 rounded-xl border border-blue-200 p-4 flex items-start gap-3">
            <CreditCard className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-blue-900 mb-1">Secure Payment</p>
              <p className="text-xs text-blue-700">
                Your payment will be processed securely through Cashfree. We do not store your card details.
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 rounded-xl border border-red-200 p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-red-900 mb-1">Error</p>
                <p className="text-xs text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => navigate("/campaign/my-campaigns")}
              className="flex-1 rounded-xl"
              disabled={processing}
            >
              Cancel
            </Button>
            <Button
              onClick={handlePayment}
              disabled={processing}
              className="flex-1 rounded-xl"
              size="lg"
            >
              {processing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pay {currency === "USD" ? "$" : "₹"} {amount.toFixed(2)}
                </>
              )}
            </Button>
          </div>

          {/* Security Badge */}
          <div className="text-center pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-500">
              🔒 Secured by Cashfree • SSL Encrypted
            </p>
          </div>
        </div>
      </CampaignCard>
    </CampaignLayout>
  );
};

export default PaymentCheckout;

