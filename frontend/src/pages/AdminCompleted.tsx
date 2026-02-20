import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Mail,
  User,
  Clock,
  ChevronLeft,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Search,
  RefreshCw,
  Inbox,
  ArrowLeft,
  X,
  Eye
} from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL.replace(/\/$/, "");

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
  pending: "bg-yellow-100 text-yellow-800",
  payment_pending: "bg-orange-100 text-orange-800",
  paid: "bg-blue-100 text-blue-800",
  promotion_scheduled: "bg-purple-100 text-purple-800",
  in_progress: "bg-indigo-100 text-indigo-800",
  completed: "bg-green-100 text-green-800",
  failed: "bg-red-100 text-red-800",
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
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const itemsPerPage = 20;

  // Since these are completed, they are all "seen" by definition or we treat them as such
  // but we can still track them if needed. For now, we'll just show them as "read".

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
    <div className="min-h-screen bg-white font-montserrat flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col max-w-[1600px] mx-auto w-full h-[calc(100vh-80px)] overflow-hidden border-x border-slate-200">
        {/* Header */}
        <div className="flex flex-col border-b border-slate-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                Completed Orders
              </h1>
              <div className="hidden md:flex relative flex-1 min-w-[300px] lg:min-w-[500px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search completed orders..."
                  className="w-full bg-slate-100 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={fetchOrders} disabled={loading}>
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
              <Button onClick={handleLogout} variant="ghost" size="sm" className="text-red-500">
                Logout
              </Button>
            </div>
          </div>

          {!selectedOrder && (
            <div className="flex items-center justify-between px-6 py-2 bg-slate-50/50 border-t border-slate-200">
              <div className="text-xs text-slate-500 font-medium">
                {filteredOrders.length} Completed
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-slate-500 mr-2">
                  Page {currentPage} of {totalPages}
                </span>
                <Button variant="ghost" size="icon" className="h-8 w-8" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>
                  <ChevronLeft className="w-4 h-4 rotate-180" />
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-hidden flex flex-col">
          {error && <div className="m-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg">{error}</div>}

          {!selectedOrder ? (
            <div className="flex-1 overflow-y-auto">
              {paginatedOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                  <Inbox className="w-12 h-12 mb-2 opacity-20" />
                  <p>{loading ? "Loading..." : "No completed orders"}</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {paginatedOrders.map((order) => (
                    <div
                      key={order._id}
                      onClick={() => setSelectedOrder(order)}
                      className="group flex items-center px-6 py-3 cursor-pointer transition-colors bg-white hover:bg-slate-50 border-l-4 border-l-transparent hover:border-l-green-500"
                    >
                      <div className="mr-4 flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      </div>

                      <div className="w-1/4 min-w-[150px] truncate pr-4 font-medium text-slate-700">
                        {order.userId?.name || "Anonymous"}
                        <div className="text-[10px] text-slate-400 font-normal uppercase mt-0.5">
                          {order.userId?.email || "No Email"}
                        </div>
                      </div>

                      <div className="flex-1 flex flex-col md:flex-row md:items-center gap-1 md:gap-3 truncate pr-4 text-slate-600">
                        <span className="truncate font-semibold">{order.orderId}</span>
                        <span className="hidden md:inline text-slate-300">•</span>
                        <span className="text-slate-500 text-sm truncate">
                          {order.plan?.name || "Custom Campaign"} — {order.channel?.name || "No Channel"}
                        </span>
                      </div>

                      <div className="text-xs text-slate-400 whitespace-nowrap text-right">
                        {new Date(order.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                        <div className="text-[10px] opacity-60">
                          {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Detail View */
            <div className="flex-1 overflow-y-auto bg-slate-50 p-6">
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => setSelectedOrder(null)}>
                      <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">{selectedOrder.orderId}</h2>
                      <p className="text-xs text-green-600 font-bold uppercase tracking-wide flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Completed
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Client Information</h3>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-xl">
                          {selectedOrder.userId?.name?.[0] || "?"}
                        </div>
                        <div>
                          <p className="text-lg font-bold text-slate-900">{selectedOrder.userId?.name || "Anonymous"}</p>
                          <p className="text-sm text-slate-500">{selectedOrder.userId?.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Plan & Channel</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[10px] text-slate-400 uppercase font-bold">Plan</p>
                          <p className="font-bold text-slate-800">{selectedOrder.plan?.name}</p>
                          <p className="text-xs text-slate-500">
                            {selectedOrder.plan?.quantity?.toLocaleString()} views/units
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 uppercase font-bold">Channel</p>
                          <p className="font-bold text-slate-800">{selectedOrder.channel?.name || "N/A"}</p>
                          {selectedOrder.channel?.link && (
                            <a href={selectedOrder.channel.link} target="_blank" rel="noreferrer" className="text-purple-600 text-xs hover:underline truncate block">
                              {selectedOrder.channel.link}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {selectedOrder.videos?.length ? (
                      <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Videos</h3>
                        <div className="space-y-3">
                          {selectedOrder.videos.map((v, i) => (
                            <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                              <p className="text-sm font-bold text-slate-800">{v.title}</p>
                              <a href={v.link} target="_blank" rel="noreferrer" className="text-xs text-purple-600 hover:underline">{v.link}</a>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border-t-4 border-green-500">
                      <h3 className="text-sm font-bold text-slate-900 mb-2">Order Summary</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-[10px] text-slate-400 uppercase font-bold">Total Spent</p>
                          <p className="text-xl font-black text-slate-900">
                            {selectedOrder.plan?.currency === "USD" ? "$" : "₹"}
                            {selectedOrder.plan?.price || selectedOrder.budget || 0}
                          </p>
                        </div>
                        <div className="pt-3 border-t border-slate-100">
                          <p className="text-[10px] text-slate-400 uppercase font-bold">Completed On</p>
                          <p className="text-sm font-bold text-slate-700">
                            {new Date(selectedOrder.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {!selectedOrder && <Footer />}
    </div>
  );
};

export default AdminCompleted;

