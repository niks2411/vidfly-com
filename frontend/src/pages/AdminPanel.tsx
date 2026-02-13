import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  const itemsPerPage = 10;

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

  // Filter out completed orders (they'll be shown in separate page)
  const activeOrders = useMemo(() => {
    return orders.filter(order => order.status !== 'completed');
  }, [orders]);

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
    <div className="min-h-screen bg-slate-50 font-montserrat">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-slate-500">Monitor all campaign orders in one place.</p>
          </div>
          <div className="flex gap-3">
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

        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">All Orders</h2>
            <p className="text-sm text-slate-500">{activeOrders.length} active orders (excluding completed)</p>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate("/admin/completed")}
          >
            View Completed Orders
          </Button>
        </div>

        {paginatedOrders.length === 0 && !loading && (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500">
            No orders yet.
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
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${statusColors[order.status] || statusColors.payment_pending}`}>
                      {order.status === 'paid' ? 'PAID' :
                        order.status === 'payment_pending' ? 'PAYMENT PENDING' :
                          order.status === 'in_progress' ? 'IN PROGRESS' :
                            order.status === 'completed' ? 'COMPLETED' :
                              order.status === 'failed' ? 'FAILED' :
                                order.status === 'promotion_scheduled' ? 'SCHEDULED' :
                                  order.status === 'pending' ? 'PAYMENT PENDING' :
                                    'PAYMENT PENDING'}
                    </span>
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
                    {order.plan?.price}
                  </p>
                  {order.paymentId && (
                    <p className={`text-xs mt-1 ${order.paymentId.status === 'captured' ? 'text-green-600' : order.paymentId.status === 'failed' ? 'text-red-600' : 'text-orange-600'}`}>
                      Payment: {order.paymentId.status === 'captured' ? '✓ Paid' : order.paymentId.status || 'Pending'}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm text-slate-600">
                <div>
                  <p className="font-semibold text-slate-800">Plan</p>
                  <p>{order.plan?.name}</p>
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

              {/* Targeting Section */}
              {order.targeting && (
                <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-sm font-semibold text-slate-800 mb-3">🎯 Targeting</p>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    {/* Goal */}
                    <div>
                      <p className="text-xs text-slate-500 uppercase mb-1">Goal</p>
                      <p className="font-medium text-slate-700">{order.targeting.goal || "Not specified"}</p>
                    </div>
                    {/* Duration */}
                    <div>
                      <p className="text-xs text-slate-500 uppercase mb-1">Campaign Duration</p>
                      <p className="font-medium text-slate-700">{order.targeting.duration || "Not specified"}</p>
                    </div>
                    {/* Country */}
                    <div>
                      <p className="text-xs text-slate-500 uppercase mb-1">Target Country</p>
                      <p className="font-medium text-slate-700">{order.targeting.country || "All Countries"}</p>
                    </div>
                  </div>

                  {/* Manual Targeting Options */}
                  {order.targeting.autoTargeting === false && (
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <p className="text-xs font-semibold text-orange-600 uppercase mb-3">⚙️ Manual Targeting (Advanced)</p>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        {/* Gender */}
                        <div>
                          <p className="text-xs text-slate-500 uppercase mb-1">Gender</p>
                          <p className="font-medium text-slate-700 capitalize">
                            {order.targeting.gender === "all" ? "All Genders" : order.targeting.gender || "All Genders"}
                          </p>
                        </div>
                        {/* Ages */}
                        <div>
                          <p className="text-xs text-slate-500 uppercase mb-1">Age Groups</p>
                          <p className="font-medium text-slate-700">
                            {order.targeting.ages?.length
                              ? order.targeting.ages.includes("all")
                                ? "All Ages"
                                : order.targeting.ages.join(", ")
                              : "All Ages"}
                          </p>
                        </div>
                        {/* Interests */}
                        <div className="md:col-span-3">
                          <p className="text-xs text-slate-500 uppercase mb-1">Interests</p>
                          <div className="flex flex-wrap gap-1">
                            {order.targeting.interests?.length ? (
                              order.targeting.interests.includes("all") ? (
                                <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">All Interests</span>
                              ) : (
                                order.targeting.interests.map((interest, idx) => (
                                  <span key={idx} className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
                                    {interest}
                                  </span>
                                ))
                              )
                            ) : (
                              <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">All Interests</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Auto Targeting Badge */}
                  {order.targeting.autoTargeting !== false && (
                    <div className="mt-3 flex items-center gap-2">
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                        ✓ Automatic Targeting Enabled
                      </span>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <label className="text-xs text-slate-600 font-semibold">Status:</label>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                    disabled={updatingStatus[order.orderId] || showVerification[order.orderId]}
                    className="px-3 py-1 text-xs font-semibold rounded-full border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="payment_pending">Payment Pending</option>
                    <option value="paid">Paid</option>
                    <option value="promotion_scheduled">Promotion Scheduled</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="failed">Failed</option>
                  </select>
                  {showVerification[order.orderId] && (
                    <div className="flex flex-col gap-2 mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-xs font-semibold text-yellow-800">
                        Changing status to: <span className="uppercase">{pendingStatus[order.orderId] || order.status}</span>
                      </p>
                      <div className="flex items-center gap-2">
                        <Input
                          type="password"
                          placeholder="Enter admin123"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value)}
                          className="w-32 h-8 text-xs"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleStatusUpdate(order.orderId);
                            }
                          }}
                        />
                        <Button
                          size="sm"
                          onClick={() => handleStatusUpdate(order.orderId)}
                          className="h-8 text-xs"
                        >
                          Verify
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setShowVerification((prev) => ({ ...prev, [order.orderId]: false }));
                            setVerificationCode("");
                            setPendingStatus((prev) => {
                              const updated = { ...prev };
                              delete updated[order.orderId];
                              return updated;
                            });
                          }}
                          className="h-8 text-xs"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                  {updatingStatus[order.orderId] && (
                    <span className="text-xs text-slate-500">Updating...</span>
                  )}
                </div>
                <span className="text-xs text-slate-500">
                  Created {new Date(order.createdAt).toLocaleString()}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteOrder(order.orderId)}
                  disabled={deletingOrder[order.orderId]}
                  className="ml-auto text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400 disabled:opacity-50"
                >
                  {deletingOrder[order.orderId] ? "Deleting..." : "Delete"}
                </Button>
              </div>
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
              Page {currentPage} of {totalPages}
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

export default AdminPanel;


