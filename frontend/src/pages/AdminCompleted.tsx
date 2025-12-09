import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "http://localhost:5000";

type Order = {
  _id: string;
  orderId: string;
  campaignType?: string;
  createdAt: string;
  status: string;
  plan?: { name?: string; price?: number; currency?: string; quantity?: number; type?: string };
  budget?: number;
  channel?: { name?: string; link?: string };
  videos?: Array<{
    videoId?: string;
    title?: string;
    link?: string;
    viewsRequested?: number;
  }>;
  userId?: { name?: string; email?: string };
};

const statusColors: Record<string, string> = {
  completed: "bg-green-100 text-green-800",
};

const campaignLabels: Record<string, string> = {
  promote_video: "Promote Video",
  promote_channel: "Promote Channel",
  packages: "Packages",
  bulk_views: "Bulk Views",
  free_views: "Free Views",
};

const AdminCompleted = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(() =>
    typeof window !== "undefined" ? localStorage.getItem("adminToken") : null
  );
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (!token) {
      navigate("/admin", { replace: true });
      return;
    }
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, navigate]);

  const fetchOrders = async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.message || "Unable to fetch orders");
      }
      const data = await response.json();
      // Filter only completed orders
      const completedOrders = data.filter((order: Order) => order.status === 'completed');
      setOrders(completedOrders);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
    setOrders([]);
    navigate("/admin", { replace: true });
  };

  // Filter orders by search query
  const filteredOrders = useMemo(() => {
    if (!searchQuery.trim()) return orders;
    const query = searchQuery.toLowerCase();
    return orders.filter(order => 
      order.orderId.toLowerCase().includes(query) ||
      order.userId?.email?.toLowerCase().includes(query) ||
      order.userId?.name?.toLowerCase().includes(query) ||
      order.channel?.name?.toLowerCase().includes(query) ||
      order.videos?.some(v => v.title?.toLowerCase().includes(query))
    );
  }, [orders, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredOrders.slice(startIndex, endIndex);
  }, [filteredOrders, currentPage]);

  if (!token) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-montserrat">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Completed Orders</h1>
            <p className="text-slate-500">View all completed campaign orders.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate("/admin")}>
              Back to Dashboard
            </Button>
            <Button variant="outline" onClick={fetchOrders} disabled={loading}>
              {loading ? "Refreshing..." : "Refresh"}
            </Button>
            <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
              Logout
            </Button>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Search */}
        <div className="mb-6">
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 bg-white max-w-md">
            <Search className="text-slate-500" />
            <Input
              placeholder="Search by order ID, email, name, or video title..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
              className="border-0 shadow-none focus-visible:ring-0"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery("")}
                className="text-slate-600"
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        {paginatedOrders.length === 0 && !loading && (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500">
            {searchQuery ? "No completed orders found matching your search." : "No completed orders yet."}
          </div>
        )}

        <div className="grid gap-4">
          {paginatedOrders.map((order) => (
            <article
              key={order._id}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-lg font-semibold text-slate-900">{order.orderId}</p>
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${statusColors[order.status] || statusColors.completed}`}>
                      COMPLETED
                    </span>
                    {order.campaignType && (
                      <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {campaignLabels[order.campaignType] || order.campaignType}
                      </span>
                    )}
                  </div>
                  <p className="text-xs uppercase text-slate-500 mb-1">Order ID</p>
                  {order.userId && (
                    <p className="text-sm text-slate-500">
                      {order.userId.name} · {order.userId.email}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase text-slate-500">Amount</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {order.plan?.currency === "USD" ? "$" : "₹"}
                    {order.plan?.price || order.budget || 0}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Completed {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm text-slate-600">
                <div>
                  <p className="font-semibold text-slate-800">Plan</p>
                  <p>{order.plan?.name || "N/A"}</p>
                  {order.plan?.quantity && (
                    <p>
                      Quantity: {order.plan.quantity.toLocaleString()}{" "}
                      {order.plan.type === "package" ? "units" : "views"}
                    </p>
                  )}
                  {order.budget && <p>Budget: ₹{order.budget}</p>}
                </div>
                <div>
                  <p className="font-semibold text-slate-800">Channel</p>
                  <p>{order.channel?.name || "N/A"}</p>
                  {order.channel?.link && (
                    <a
                      href={order.channel.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-purple-600 hover:underline"
                    >
                      View channel
                    </a>
                  )}
                </div>
              </div>

              {order.videos?.length ? (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-slate-800 mb-2">
                    Videos ({order.videos.length})
                  </p>
                  <div className="space-y-2 text-sm text-slate-600">
                    {order.videos.map((video, idx) => (
                      <div key={`${order.orderId}-${video.videoId}-${idx}`}>
                        <p className="font-medium">{video.title}</p>
                        {video.link && (
                          <a
                            href={video.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-purple-600 hover:underline text-xs"
                          >
                            {video.link}
                          </a>
                        )}
                        {video.viewsRequested && (
                          <p className="text-xs text-slate-500">
                            Requested: {video.viewsRequested.toLocaleString()} views
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm text-slate-600">
              Page {currentPage} of {totalPages} ({filteredOrders.length} total)
            </span>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminCompleted;

