import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CampaignLayout from "@/components/CampaignLayout";
import CampaignHeader from "@/components/CampaignHeader";
import CampaignCard from "@/components/CampaignCard";
import { Button } from "@/components/ui/button";
import { getVerifiedEmail } from "@/lib/verifiedEmail";
import {
  Play,
  Calendar,
  DollarSign,
  TrendingUp,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Users,
} from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL.replace(/\/$/, "");
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
  targeting?: {
    goal?: string;
    country?: string;
    duration?: string;
  };
  freeViewsRedeemed?: number;
};

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  payment_pending: { label: "Payment Pending", color: "bg-orange-100 text-orange-800", icon: Clock },
  paid: { label: "Paid", color: "bg-blue-100 text-blue-800", icon: CheckCircle },
  promotion_scheduled: { label: "Scheduled", color: "bg-red-100 text-red-800", icon: Calendar },
  in_progress: { label: "In Progress", color: "bg-red-100 text-red-800", icon: TrendingUp },
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

  // Calculate statistics
  const activeCampaigns = orders.filter(o => o.status === 'in_progress' || o.status === 'promotion_scheduled').length;
  const totalViews = orders.reduce((sum, o) => sum + (o.plan?.quantity || 0), 0);
  const totalSpent = orders.reduce((sum, o) => sum + (o.plan?.price || o.budget || 0), 0);
  // Only count subscribers if the goal is "subscribers", otherwise show 0
  const totalSubscribers = orders.reduce((sum, o) => {
    const goal = o.targeting?.goal;
    if (goal === 'subscribers') {
      return sum + (o.plan?.quantity || 0) * 0.1; // Estimate
    }
    return sum;
  }, 0);

  return (
    <CampaignLayout activeSidebar="campaigns">
      <CampaignCard>
        <CampaignHeader>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">My Campaigns</h1>
            <p className="text-slate-600">
              Track and manage all your video promotions
            </p>
          </div>
        </CampaignHeader>
        
        <div className="flex justify-end mb-6">
          <Button
            onClick={() => navigate("/campaign")}
            className="bg-red-600 hover:bg-red-700 rounded-xl"
          >
            CREATE NEW CAMPAIGN
          </Button>
        </div>

            {error && (
              <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

        {/* Statistics Cards - match reference style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Active Campaigns */}
          <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-6 py-4 shadow-sm">
            <div>
              <p className="text-xs font-medium text-slate-500">Active Campaigns</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{activeCampaigns}</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50">
              <Play className="h-5 w-5 text-red-500" />
            </div>
          </div>

          {/* Total Views */}
          <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-6 py-4 shadow-sm">
            <div>
              <p className="text-xs font-medium text-slate-500">Total Views</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                {(totalViews / 1000).toFixed(1)}K
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50">
              <Eye className="h-5 w-5 text-red-500" />
            </div>
          </div>

          {/* New Subscribers */}
          <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-6 py-4 shadow-sm">
            <div>
              <p className="text-xs font-medium text-slate-500">New Subscribers</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                {Math.round(totalSubscribers)}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50">
              <Users className="h-5 w-5 text-red-500" />
            </div>
          </div>

          {/* Total Spent */}
          <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white px-6 py-4 shadow-sm">
            <div>
              <p className="text-xs font-medium text-slate-500">Total Spent</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                ₹{totalSpent.toLocaleString()}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50">
              <TrendingUp className="h-5 w-5 text-red-500" />
            </div>
          </div>
        </div>

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
              className="bg-red-600 hover:bg-red-700 rounded-xl"
            >
              CREATE YOUR FIRST CAMPAIGN
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
                {orders.map((order) => {
                  const statusInfo = statusConfig[order.status] || statusConfig.pending;
                  const StatusIcon = statusInfo.icon;
                  const progress = getProgressPercentage(order.status);
                  const videoCount = order.videos?.length || 0;
                  const videos = order.videos || [];

                  return (
                    <div
                      key={order._id}
                      className="bg-white rounded-xl border border-slate-200 p-6"
                    >
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-3">
                          <h3 className="text-lg font-semibold text-slate-900">
                            Campaign: {order.orderId}
                          </h3>
                          <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${statusInfo.color}`}>
                            {statusInfo.label.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                          <span>Started: {new Date(order.createdAt).toLocaleDateString()}</span>
                          <span>Budget: ₹{order.plan?.price || order.budget || 0}</span>
                          <span>2 days remaining</span>
                          {videoCount > 0 && (
                            <span>{videoCount} {videoCount === 1 ? 'video' : 'videos'}</span>
                          )}
                        </div>
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                            <span>
                              {order.plan?.quantity || 0} / {order.plan?.quantity || 5000} views
                              {order.freeViewsRedeemed && order.freeViewsRedeemed > 0 && (
                                <span className="text-emerald-600 ml-2">
                                  (+{order.freeViewsRedeemed.toLocaleString()} free views)
                                </span>
                              )}
                            </span>
                          </div>
                          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-red-600 transition-all duration-300"
                              style={{ width: `${Math.min(progress, 100)}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Display all videos */}
                      {videos.length > 0 && (
                        <div className="space-y-3">
                          <p className="text-sm font-semibold text-slate-800 mb-2">
                            Videos ({videos.length})
                          </p>
                          {videos.map((video, idx) => (
                            <div key={`${order.orderId}-${video.videoId}-${idx}`} className="flex gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                              {video.thumbnail && (
                                <img
                                  src={video.thumbnail}
                                  alt={video.title}
                                  className="w-24 h-16 rounded-lg object-cover flex-shrink-0"
                                />
                              )}
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-slate-900 line-clamp-2 mb-1">
                                  {video.title || `Video ${idx + 1}`}
                                </h4>
                                {video.link && (
                                  <a
                                    href={video.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-xs text-purple-600 hover:underline"
                                  >
                                    View on YouTube
                                  </a>
                                )}
                                {video.viewsRequested && (
                                  <p className="text-xs text-slate-500 mt-1">
                                    Requested: {video.viewsRequested.toLocaleString()} views
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
        </CampaignCard>
    </CampaignLayout>
  );
};

export default MyCampaigns;

