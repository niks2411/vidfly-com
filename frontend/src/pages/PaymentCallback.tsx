import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CampaignCard from "@/components/CampaignCard";
import CampaignLayout from "@/components/CampaignLayout";
import { Loader2, CheckCircle, XCircle, AlertCircle } from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "http://localhost:5000";

type PaymentStatus = "verifying" | "success" | "failed" | "error";

const PaymentCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const paymentId = searchParams.get("paymentId") || searchParams.get("cf_payment_id");
  const status = searchParams.get("status");

  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("verifying");
  const [error, setError] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 10; // Maximum 10 retries (20 seconds total)

  useEffect(() => {
    if (!orderId) {
      setPaymentStatus("error");
      setError("Order ID is missing");
      return;
    }

    // If status is already known from URL params, use it
    if (status === "SUCCESS" || status === "success") {
      verifyPayment();
    } else if (status === "FAILED" || status === "failed") {
      setPaymentStatus("failed");
    } else {
      // Verify payment with backend
      verifyPayment();
    }
  }, [orderId, paymentId, status]);

  const verifyPayment = async () => {
    if (!orderId) return;

    // Check retry limit
    if (retryCount >= MAX_RETRIES) {
      setPaymentStatus("error");
      setError("Payment verification is taking too long. Please check your order status in My Campaigns.");
      return;
    }

    try {
      setPaymentStatus("verifying");
      setError(null);

      // If paymentId is available, verify payment
      if (paymentId) {
        const response = await fetch(`${API_BASE_URL}/api/payments/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            orderId,
            paymentId,
            gateway: "cashfree",
          }),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data?.message || "Payment verification failed");
        }

        const data = await response.json();
        setOrderDetails(data.order);

        if (data.order?.status === "paid") {
          setPaymentStatus("success");
        } else {
          setPaymentStatus("failed");
          setError(data.message || "Payment verification failed");
        }
      } else {
        // If no paymentId, check order status and try to verify from backend
        const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Order not found");
        }

        const data = await response.json();
        setOrderDetails(data);

        // Check if order is already paid
        if (data.status === "paid") {
          setPaymentStatus("success");
          return;
        }
        
        // Check if order failed
        if (data.status === "failed") {
          setPaymentStatus("failed");
          return;
        }

        // If payment has paymentOrderId, try to verify payment status from Cashfree
        if (data.paymentId?.paymentOrderId) {
          try {
            // Try to verify payment using order's paymentOrderId
            const verifyResponse = await fetch(`${API_BASE_URL}/api/payments/verify-order`, {
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

            if (verifyResponse.ok) {
              const verifyData = await verifyResponse.json();
              if (verifyData.order?.status === "paid") {
                setPaymentStatus("success");
                return;
              }
            }
          } catch (verifyErr) {
            console.log("Direct verification failed, will retry:", verifyErr);
          }
        }

        // Payment might still be processing - retry with limit
        setRetryCount(prev => prev + 1);
        setPaymentStatus("verifying");
        // Retry after 2 seconds
        setTimeout(verifyPayment, 2000);
      }
    } catch (err) {
      // If we've retried too many times, show error
      if (retryCount >= MAX_RETRIES - 1) {
        setPaymentStatus("error");
        setError(err instanceof Error ? err.message : "Failed to verify payment. Please check your order status in My Campaigns.");
      } else {
        // Retry on error
        setRetryCount(prev => prev + 1);
        setTimeout(verifyPayment, 2000);
      }
    }
  };

  const handleContinue = () => {
    navigate("/campaign/my-campaigns", { replace: true });
  };

  return (
    <CampaignLayout activeSidebar="payment">
      <CampaignCard>
        <div className="flex flex-col items-center justify-center py-12 space-y-6">
          {paymentStatus === "verifying" && (
            <>
              <Loader2 className="h-16 w-16 animate-spin text-red-600" />
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-slate-900">Verifying Payment</h2>
                <p className="text-slate-600">Please wait while we verify your payment...</p>
              </div>
            </>
          )}

          {paymentStatus === "success" && (
            <>
              <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-slate-900">Payment Successful!</h2>
                <p className="text-slate-600">
                  Your payment has been processed successfully.
                </p>
                {orderDetails?.orderId && (
                  <p className="text-sm text-slate-500 mt-2">
                    Order ID: <span className="font-semibold">{orderDetails.orderId}</span>
                  </p>
                )}
              </div>
              <Button onClick={handleContinue} size="lg" className="mt-4">
                View My Campaigns
              </Button>
            </>
          )}

          {paymentStatus === "failed" && (
            <>
              <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center">
                <XCircle className="h-12 w-12 text-red-600" />
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-slate-900">Payment Failed</h2>
                <p className="text-slate-600">
                  {error || "Your payment could not be processed. Please try again."}
                </p>
                {orderDetails?.orderId && (
                  <p className="text-sm text-slate-500 mt-2">
                    Order ID: <span className="font-semibold">{orderDetails.orderId}</span>
                  </p>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Button variant="outline" onClick={() => navigate("/campaign/my-campaigns")}>
                  Go to My Campaigns
                </Button>
                {orderId && (
                  <Button onClick={() => navigate(`/payment/checkout?orderId=${orderId}`)}>
                    Try Again
                  </Button>
                )}
              </div>
            </>
          )}

          {paymentStatus === "error" && (
            <>
              <div className="h-20 w-20 rounded-full bg-orange-100 flex items-center justify-center">
                <AlertCircle className="h-12 w-12 text-orange-600" />
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-slate-900">Error</h2>
                <p className="text-slate-600">
                  {error || "An error occurred while processing your payment."}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Button variant="outline" onClick={() => navigate("/campaign/my-campaigns")}>
                  Go to My Campaigns
                </Button>
                {orderId && (
                  <Button onClick={() => navigate(`/payment/checkout?orderId=${orderId}`)}>
                    Retry Payment
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </CampaignCard>
    </CampaignLayout>
  );
};

export default PaymentCallback;

