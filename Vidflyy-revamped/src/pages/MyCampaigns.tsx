import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CampaignSidebar from "@/components/CampaignSidebar";
import CampaignHeader from "@/components/CampaignHeader";
import { Button } from "@/components/ui/button";
import { getVerifiedEmail } from "@/lib/verifiedEmail";
import { Play, Calendar, DollarSign, TrendingUp, CheckCircle, Clock, XCircle } from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "http://localhost:5000";

type Order = {
  _id: string;
  orderId: string;
  status: string;
  createdAt: string;
  completedAt?: string;
  plan?: {
    name?: string;
    price?: number;
    currency?: string;
    quantity?: number;
    type?: string;
  };
  budget?: number;
  channel?: {
    name?: string;
    link?: string;
    avatar?: string;
  };
  videos?: Array<{
    videoId?: string;
    title?: string;
    link?: string;
    thumbnail?: string;
    viewsRequested?: number;
  }>;
  campaignType?: string;
  paymentId?: {
    status?: string;
    amount?: number;
    currency?: string;
  };
};

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  payment_pending: { label: "Payment Pending", color: "bg-orange-100 text-orange-800", icon: Clock },
  paid: { label: "Paid", color: "bg-blue-100 text-blue-800", icon: CheckCircle },
  promotion_scheduled: { label: "Scheduled", color: "bg-purple-100 text-purple-800", icon: Calendar },
  in_progress: { label: "In Progress", color: "bg-indigo-100 text-indigo-800", icon: TrendingUp },
  completed: { label: "Completed", color: "bg-green-100 text-green-800", icon: CheckCircle },
  failed: { label: "Failed", color: "bg-red-100 text-red-800", icon: XCircle },
};

const MyCampaigns = () => {
  const navigate = useNavigate();
  const verifiedEmail = getVerifiedEmail();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!verifiedEmail) {
      navigate("/get-started", { replace: true });
      return;
    }
    fetchCampaigns();
  }, [verifiedEmail, navigate]);

  const fetchCampaigns = async () => {
    if (!verifiedEmail) return;
    setLoading(true);
    setError(null);
    try {
      const normalizedEmail = verifiedEmail.trim().toLowerCase();
      console.log('Fetching campaigns for email:', normalizedEmail);
      
      const response = await fetch(
        `${API_BASE_URL}/api/orders/user?email=${encodeURIComponent(normalizedEmail)}`,
        {
          credentials: "include",
        }
      );
      
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        console.error('Error response:', data);
        throw new Error(data?.message || "Unable to fetch campaigns");
      }
      
      const data = await response.json();
      console.log('Received orders:', data);
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching campaigns:', err);
      setError(err instanceof Error ? err.message : "Failed to load campaigns");
    } finally {
      setLoading(false);
    }
  };

  const getProgressPercentage = (status: string): number => {
    const progressMap: Record<string, number> = {
      pending: 10,
      payment_pending: 20,
      paid: 40,
      promotion_scheduled: 60,
      in_progress: 80,
      completed: 100,
      failed: 0,
    };
    return progressMap[status] || 0;
  };

  if (!verifiedEmail) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-purple-50 font-montserrat">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 flex flex-col gap-8 lg:flex-row">
        <CampaignSidebar active="promote" />
        <div className="flex-1 space-y-8">
          <section className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 animate-fade-in hover:shadow-2xl transition-all duration-300">
            <CampaignHeader>
              <div className="animate-fade-in">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent mb-3">My Campaigns</h1>
                <p className="text-slate-600 text-lg">
                  Track the progress of all your video promotion campaigns
                </p>
              </div>
            </CampaignHeader>
            <div className="flex justify-end mb-6 animate-fade-in delay-200">
              <Button
                onClick={() => navigate("/campaign")}
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-2xl px-8 py-6 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Create New Campaign
              </Button>
            </div>

            {error && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            {loading ? (
              <div className="text-center py-12 text-slate-500">Loading campaigns...</div>
            ) : orders.length === 0 ? (
              <div className="text-center py-12">
                <Play className="mx-auto h-16 w-16 text-slate-300 mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No campaigns yet</h3>
                <p className="text-slate-500 mb-6">
                  Start promoting your videos to see your campaigns here
                </p>
                <Button
                  onClick={() => navigate("/campaign")}
                  className="bg-purple-600 hover:bg-purple-700 rounded-2xl px-6"
                >
                  Create Your First Campaign
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const statusInfo = statusConfig[order.status] || statusConfig.pending;
                  const StatusIcon = statusInfo.icon;
                  const progress = getProgressPercentage(order.status);
                  const videoCount = order.videos?.length || 0;

                  return (
                    <div
                      key={order._id}
                      className="border-2 border-white/50 rounded-3xl p-6 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 animate-fade-in"
                      style={{ animationDelay: `${Math.min(orders.indexOf(order), 5) * 0.1}s` }}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-lg font-semibold text-slate-900">
                              {order.orderId}
                            </h3>
                            <span
                              className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1 ${statusInfo.color}`}
                            >
                              <StatusIcon className="h-3 w-3" />
                              {statusInfo.label}
                            </span>
                          </div>

                          {order.channel?.name && (
                            <p className="text-sm text-slate-600 mb-2">
                              Channel: <span className="font-semibold">{order.channel.name}</span>
                            </p>
                          )}

                          {order.plan?.name && (
                            <p className="text-sm text-slate-600">
                              Plan: <span className="font-semibold">{order.plan.name}</span>
                            </p>
                          )}

                          {videoCount > 0 && (
                            <p className="text-sm text-slate-600 mt-2">
                              Videos: <span className="font-semibold">{videoCount}</span>
                            </p>
                          )}
                        </div>

                        <div className="text-right">
                          <p className="text-xs text-slate-500 uppercase mb-1">Amount</p>
                          <p className="text-xl font-bold text-slate-900">
                            {order.plan?.currency === "USD" ? "$" : "₹"}
                            {order.plan?.price || order.budget || 0}
                          </p>
                          {order.paymentId?.status && (
                            <p className="text-xs text-slate-500 mt-1">
                              Payment: {order.paymentId.status}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                          <span>Progress</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-purple-500 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>

                      {order.videos && order.videos.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-slate-200">
                          <p className="text-sm font-semibold text-slate-800 mb-3">
                            Videos ({order.videos.length})
                          </p>
                          <div className="grid gap-3 sm:grid-cols-2">
                            {order.videos.slice(0, 4).map((video, idx) => (
                              <div
                                key={`${order.orderId}-${video.videoId}-${idx}`}
                                className="flex gap-3 items-center p-3 bg-slate-50 rounded-2xl"
                              >
                                {video.thumbnail && (
                                  <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className="w-20 h-12 rounded-lg object-cover"
                                  />
                                )}
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-slate-900 line-clamp-1">
                                    {video.title || "Untitled Video"}
                                  </p>
                                  {video.viewsRequested && (
                                    <p className="text-xs text-slate-500">
                                      {video.viewsRequested.toLocaleString()} views requested
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                          {order.videos.length > 4 && (
                            <p className="text-xs text-slate-500 mt-2">
                              +{order.videos.length - 4} more video{order.videos.length - 4 > 1 ? "s" : ""}
                            </p>
                          )}
                        </div>
                      )}

                      <div className="mt-4 pt-4 border-t border-slate-200 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                        <span>
                          Created: {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                        {order.completedAt && (
                          <span>
                            Completed: {new Date(order.completedAt).toLocaleDateString()}
                          </span>
                        )}
                        {order.channel?.link && (
                          <a
                            href={order.channel.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:underline"
                          >
                            View Channel →
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyCampaigns;

