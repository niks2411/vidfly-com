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
  MoreVertical,
  Inbox,
  Filter,
  Check,
  X,
  ArrowLeft
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
  paymentId?: { status?: string };
  targeting?: {
    country?: string;
    goal?: string;
    duration?: string;
    autoTargeting?: boolean;
    gender?: string;
    ages?: string[];
    interests?: string[];
  };
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

const AdminPanel = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(() =>
    typeof window !== "undefined" ? localStorage.getItem("adminToken") : null
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<Record<string, boolean>>({});
  const [deletingOrder, setDeletingOrder] = useState<Record<string, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState<Record<string, boolean>>({});
  const [pendingStatus, setPendingStatus] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState("");

  // Gmail-like view states
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [readOrders, setReadOrders] = useState<Set<string>>(() => {
    const saved = localStorage.getItem("admin_read_orders");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const itemsPerPage = 20;

  useEffect(() => {
    localStorage.setItem("admin_read_orders", JSON.stringify(Array.from(readOrders)));
  }, [readOrders]);

  useEffect(() => {
    if (!token) return;
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

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
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoginError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.message || "Invalid credentials");
      }
      const data = await response.json();
      localStorage.setItem("adminToken", data.token);
      setToken(data.token);
      setUsername("");
      setPassword("");
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : "Login failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
    setOrders([]);
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    // Store the new status and show verification prompt
    setPendingStatus((prev) => ({ ...prev, [orderId]: newStatus }));
    setShowVerification((prev) => ({ ...prev, [orderId]: true }));
  };

  const handleStatusUpdate = async (orderId: string) => {
    if (!token) return;

    const newStatus = pendingStatus[orderId];
    if (!newStatus) return;

    // Verify code
    if (verificationCode !== "admin123") {
      setError("Invalid verification code. Please enter 'admin123' to proceed.");
      setVerificationCode("");
      setShowVerification((prev) => ({ ...prev, [orderId]: false }));
      setPendingStatus((prev) => {
        const updated = { ...prev };
        delete updated[orderId];
        return updated;
      });
      return;
    }

    setUpdatingStatus((prev) => ({ ...prev, [orderId]: true }));
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.message || "Failed to update status");
      }
      setVerificationCode("");
      setShowVerification((prev) => ({ ...prev, [orderId]: false }));
      setPendingStatus((prev) => {
        const updated = { ...prev };
        delete updated[orderId];
        return updated;
      });
      await fetchOrders();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update order status");
    } finally {
      setUpdatingStatus((prev) => ({ ...prev, [orderId]: false }));
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!token) return;
    if (!confirm(`Are you sure you want to delete order ${orderId}? This action cannot be undone.`)) {
      return;
    }
    setDeletingOrder((prev) => ({ ...prev, [orderId]: true }));
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.message || "Failed to delete order");
      }
      await fetchOrders();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete order");
    } finally {
      setDeletingOrder((prev) => ({ ...prev, [orderId]: false }));
    }
  };

  // Filter and Search
  const activeOrders = useMemo(() => {
    let filtered = orders.filter(order => order.status !== 'completed');

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(o =>
        o.orderId.toLowerCase().includes(q) ||
        o.userId?.email?.toLowerCase().includes(q) ||
        o.userId?.name?.toLowerCase().includes(q) ||
        o.channel?.name?.toLowerCase().includes(q)
      );
    }

    return filtered;
  }, [orders, searchQuery]);

  const activeOrdersCount = activeOrders.length;
  const completedOrdersCount = useMemo(() => orders.filter(o => o.status === 'completed').length, [orders]);

  const markAsRead = (orderId: string) => {
    setReadOrders(prev => new Set([...prev, orderId]));
  };

  const markAsUnread = (orderId: string) => {
    setReadOrders(prev => {
      const next = new Set(prev);
      next.delete(orderId);
      return next;
    });
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    markAsRead(order._id);
  };

  // Pagination
  const totalPages = Math.ceil(activeOrders.length / itemsPerPage);
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return activeOrders.slice(startIndex, endIndex);
  }, [activeOrders, currentPage]);

  if (!token) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4">
          <form
            onSubmit={handleLogin}
            className="w-full max-w-md bg-white rounded-3xl shadow p-8 space-y-4"
          >
            <h1 className="text-2xl font-bold text-center text-gray-900">Admin Login</h1>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {loginError && <p className="text-sm text-red-600">{loginError}</p>}
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              Sign In
            </Button>
          </form>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-montserrat flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col max-w-[1600px] mx-auto w-full h-[calc(100vh-80px)] overflow-hidden border-x border-slate-200">
        {/* Admin Header - Gmail Style */}
        <div className="flex flex-col border-b border-slate-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Inbox className="w-6 h-6 text-purple-600" />
                Admin Panel
              </h1>
              <div className="hidden md:flex relative flex-1 min-w-[300px] lg:min-w-[500px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search orders, emails, or names..."
                  className="w-full bg-slate-100 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={fetchOrders} disabled={loading} title="Refresh">
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/admin/completed")}
                size="sm"
                className="flex items-center gap-2 border-green-200 text-green-700 hover:bg-green-50"
              >
                <CheckCircle2 className="w-4 h-4" />
                Completed
                {completedOrdersCount > 0 && (
                  <span className="bg-green-100 px-1.5 py-0.5 rounded text-[10px]">
                    {completedOrdersCount}
                  </span>
                )}
              </Button>
              <Button onClick={handleLogout} variant="ghost" size="sm" className="hidden sm:flex text-red-500 hover:text-red-600 hover:bg-red-50">
                Logout
              </Button>
            </div>
          </div>

          {/* Sub-header / Toolbar */}
          {!selectedOrder && (
            <div className="flex items-center justify-between px-6 py-2 bg-slate-50/50 border-t border-slate-200">
              <div className="flex items-center gap-4">
                <div className="text-xs text-slate-500 font-medium">
                  {activeOrders.length} Submissions
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-slate-500 mr-2">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                >
                  <ChevronLeft className="w-4 h-4 rotate-180" />
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-hidden flex flex-col">
          {error && (
            <div className="m-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {error}
              <button className="ml-auto" onClick={() => setError(null)}><X className="w-4 h-4" /></button>
            </div>
          )}

          {/* List View */}
          {!selectedOrder ? (
            <div className="flex-1 overflow-y-auto">
              {paginatedOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                  <Inbox className="w-12 h-12 mb-2 opacity-20" />
                  <p>{loading ? "Loading..." : "No submissions found"}</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {paginatedOrders.map((order) => {
                    const isRead = readOrders.has(order._id);
                    return (
                      <div
                        key={order._id}
                        onClick={() => handleOrderClick(order)}
                        className={`group flex items-center px-6 py-3 cursor-pointer transition-colors border-l-4 ${isRead
                          ? 'bg-white text-slate-600 border-l-transparent'
                          : 'bg-slate-100 text-slate-900 border-l-purple-600 shadow-sm'
                          } hover:bg-slate-50 hover:shadow-md relative`}
                      >
                        {/* Status Icon */}
                        <div className="mr-4 flex-shrink-0">
                          <div className={`w-2.5 h-2.5 rounded-full ${order.status === 'paid' ? 'bg-green-500' :
                            order.status === 'pending' || order.status === 'payment_pending' ? 'bg-orange-500' :
                              order.status === 'failed' ? 'bg-red-500' : 'bg-blue-500'
                            } ${!isRead ? 'ring-4 ring-purple-100' : ''}`} />
                        </div>

                        {/* Sender / Client */}
                        <div className={`w-1/4 min-w-[150px] truncate pr-4 ${!isRead ? 'font-bold' : 'font-medium'}`}>
                          {order.userId?.name || "Anonymous"}
                          <div className="text-[10px] text-slate-400 font-normal uppercase mt-0.5">
                            {order.userId?.email || "No Email"}
                          </div>
                        </div>

                        {/* Subject (Order / Plan) */}
                        <div className="flex-1 flex flex-col md:flex-row md:items-center gap-1 md:gap-3 truncate pr-4">
                          <span className={`truncate ${!isRead ? 'font-bold' : 'font-medium text-slate-800'}`}>
                            {order.orderId}
                          </span>
                          <span className="hidden md:inline text-slate-300">•</span>
                          <span className="text-slate-500 text-sm truncate">
                            {order.plan?.name || "Custom Campaign"} — {order.channel?.name || "No Channel"}
                          </span>
                        </div>

                        {/* Badges / Labels */}
                        <div className="hidden lg:flex items-center gap-2 mr-6">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${statusColors[order.status] || 'bg-slate-100 text-slate-600'}`}>
                            {order.status}
                          </span>
                        </div>

                        {/* Time / Date */}
                        <div className={`text-xs whitespace-nowrap ${!isRead ? 'font-bold text-slate-900' : 'text-slate-400'}`}>
                          {new Date(order.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                          <div className="text-[10px] text-right opacity-60">
                            {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>

                        {/* Quick Actions (Hover) */}
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-2 bg-slate-50 pl-4 shadow-[-20px_0_20px_rgba(248,250,252,1)]">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={(e) => { e.stopPropagation(); handleDeleteOrder(order.orderId); }}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            /* Detail View */
            <div className="flex-1 overflow-y-auto bg-slate-50 p-6">
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Detail Header / Actions */}
                <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => setSelectedOrder(null)}>
                      <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">{selectedOrder.orderId}</h2>
                      <p className="text-xs text-slate-500 uppercase tracking-wide">Submission Details</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 border-red-100 hover:bg-red-50"
                      onClick={() => { handleDeleteOrder(selectedOrder.orderId); setSelectedOrder(null); }}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Main Content */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Client Info */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Client Information</h3>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xl">
                          {selectedOrder.userId?.name?.[0] || "?"}
                        </div>
                        <div>
                          <p className="text-xl font-bold text-slate-900">{selectedOrder.userId?.name || "Anonymous Client"}</p>
                          <p className="text-slate-500 flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {selectedOrder.userId?.email || "No Email Provided"}
                          </p>
                          <p className="text-xs text-slate-400 mt-2">
                            Order placed on {new Date(selectedOrder.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Campaign Info */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Campaign Details</h3>
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <p className="text-xs text-slate-400 uppercase font-bold mb-1">Plan</p>
                          <p className="text-lg font-bold text-slate-800">{selectedOrder.plan?.name || "Custom"}</p>
                          {selectedOrder.plan?.quantity && (
                            <p className="text-sm text-purple-600 font-bold">
                              {selectedOrder.plan.quantity.toLocaleString()} {selectedOrder.plan.type === "package" ? "units" : "views"}
                            </p>
                          )}
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 uppercase font-bold mb-1">Total Amount</p>
                          <p className="text-2xl font-black text-slate-900">
                            {selectedOrder.plan?.currency === "USD" ? "$" : "₹"}
                            {selectedOrder.plan?.price || selectedOrder.budget || 0}
                          </p>
                          {selectedOrder.paymentId && (
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${selectedOrder.paymentId.status === 'captured' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                              }`}>
                              Payment: {selectedOrder.paymentId.status || 'Pending'}
                            </span>
                          )}
                        </div>
                        <div className="col-span-2 pt-4 border-t border-slate-100">
                          <p className="text-xs text-slate-400 uppercase font-bold mb-2">Target Channel / Source</p>
                          <div className="flex items-center gap-3">
                            <div className="bg-slate-50 p-3 rounded-xl flex-1 border border-slate-100">
                              <p className="font-bold text-slate-800">{selectedOrder.channel?.name || "N/A"}</p>
                              {selectedOrder.channel?.link && (
                                <a href={selectedOrder.channel.link} target="_blank" rel="noreferrer" className="text-purple-600 hover:underline text-xs flex items-center gap-1 mt-1">
                                  {selectedOrder.channel.link} <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Videos */}
                    {selectedOrder.videos?.length ? (
                      <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Videos ({selectedOrder.videos.length})</h3>
                        <div className="space-y-4">
                          {selectedOrder.videos.map((video, idx) => (
                            <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                              <p className="font-bold text-slate-900">{video.title}</p>
                              <a href={video.link} target="_blank" rel="noreferrer" className="text-purple-600 hover:underline text-xs block mb-2">
                                {video.link}
                              </a>
                              {video.viewsRequested && (
                                <span className="text-xs px-2 py-1 bg-white border border-slate-200 rounded-lg text-slate-600 font-medium">
                                  Goal: {video.viewsRequested.toLocaleString()} views
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {/* Targeting */}
                    {selectedOrder.targeting && (
                      <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">🎯 Targeting Configuration</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Country</p>
                            <p className="font-bold text-slate-800">{selectedOrder.targeting.country || "Global"}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Goal</p>
                            <p className="font-bold text-slate-800">{selectedOrder.targeting.goal || "Generic"}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Duration</p>
                            <p className="font-bold text-slate-800">{selectedOrder.targeting.duration || "N/A"}</p>
                          </div>
                        </div>
                        {selectedOrder.targeting.autoTargeting === false && (
                          <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Gender</p>
                              <p className="font-bold text-slate-800 capitalize">{selectedOrder.targeting.gender || "All"}</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Ages</p>
                              <p className="font-bold text-slate-800">{selectedOrder.targeting.ages?.join(", ") || "All"}</p>
                            </div>
                            <div className="col-span-full">
                              <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">Interests</p>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {selectedOrder.targeting.interests?.map((i, idx) => (
                                  <span key={idx} className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-bold rounded-lg border border-purple-100">
                                    {i}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Sidebar - Actions */}
                  <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border-t-4 border-purple-600">
                      <h3 className="text-sm font-bold text-slate-900 mb-4">Order Actions</h3>

                      <div className="space-y-4">
                        <div>
                          <label className="text-xs text-slate-400 uppercase font-bold mb-1 block">Current Status</label>
                          <select
                            value={selectedOrder.status}
                            onChange={(e) => handleStatusChange(selectedOrder.orderId, e.target.value)}
                            disabled={updatingStatus[selectedOrder.orderId] || showVerification[selectedOrder.orderId]}
                            className={`w-full p-3 rounded-xl border-2 font-bold transition-all ${selectedOrder.status === 'completed' ? 'border-green-200 bg-green-50 text-green-700' :
                              selectedOrder.status === 'paid' ? 'border-blue-200 bg-blue-50 text-blue-700' :
                                'border-slate-200 bg-white'
                              }`}
                          >
                            <option value="payment_pending">Payment Pending</option>
                            <option value="paid">Paid</option>
                            <option value="promotion_scheduled">Promotion Scheduled</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="failed">Failed</option>
                          </select>
                        </div>

                        {showVerification[selectedOrder.orderId] && (
                          <div className="p-4 bg-yellow-50 border-2 border-yellow-100 rounded-xl space-y-3 animate-in fade-in slide-in-from-top-1">
                            <p className="text-xs font-bold text-yellow-800 uppercase">Verification Required</p>
                            <p className="text-xs text-yellow-700">Enter <code className="bg-white px-1 font-bold">admin123</code> to confirm status change to <span className="font-bold uppercase">{pendingStatus[selectedOrder.orderId]}</span></p>
                            <Input
                              type="password"
                              placeholder="Code"
                              value={verificationCode}
                              onChange={(e) => setVerificationCode(e.target.value)}
                              className="bg-white"
                              onKeyPress={(e) => e.key === 'Enter' && handleStatusUpdate(selectedOrder.orderId)}
                            />
                            <div className="flex gap-2">
                              <Button size="sm" className="flex-1 bg-yellow-600 hover:bg-yellow-700" onClick={() => handleStatusUpdate(selectedOrder.orderId)}>
                                {updatingStatus[selectedOrder.orderId] ? "..." : "Confirm"}
                              </Button>
                              <Button size="sm" variant="ghost" className="flex-1 text-slate-500" onClick={() => {
                                setShowVerification(prev => ({ ...prev, [selectedOrder.orderId]: false }));
                                setVerificationCode("");
                              }}>
                                Cancel
                              </Button>
                            </div>
                          </div>
                        )}

                        <div className="pt-4 border-t border-slate-100">
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-slate-500"
                            onClick={() => markAsUnread(selectedOrder._id)}
                          >
                            <Mail className="w-4 h-4 mr-2" />
                            Mark as Unread
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Internal Notes</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        This campaign is tracked in real-time. Make sure to verify the YouTube channel ownership before scheduling promotions.
                      </p>
                      <div className="mt-6 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold">Admin Managed</p>
                          <p className="text-[10px] text-slate-500">System Account</p>
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

export default AdminPanel;


