import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    if (!token) return;
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

  const groupedOrders = useMemo(() => {
    const grouped = orders.reduce<Record<string, Order[]>>((acc, order) => {
      const type = order.campaignType || "standard";
      acc[type] = acc[type] ? [...acc[type], order] : [order];
      return acc;
    }, {});
    
    // Define the desired sort order
    const sortOrder = ['promote_channel', 'promote_video', 'packages', 'bulk_views', 'free_views'];
    
    // Create a new object with sorted keys
    const sorted: Record<string, Order[]> = {};
    sortOrder.forEach(type => {
      if (grouped[type]) {
        sorted[type] = grouped[type];
      }
    });
    
    // Add any remaining types that weren't in the sort order
    Object.keys(grouped).forEach(type => {
      if (!sortOrder.includes(type)) {
        sorted[type] = grouped[type];
      }
    });
    
    return sorted;
  }, [orders]);

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

        {Object.keys(groupedOrders).length === 0 && !loading && (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500">
            No orders yet.
          </div>
        )}

        {Object.entries(groupedOrders).map(([type, list]) => (
          <section key={type} className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs uppercase text-slate-500">Campaign Type</p>
                <h2 className="text-xl font-semibold text-slate-900">
                  {campaignLabels[type] || "Standard Orders"}
                </h2>
              </div>
              <span className="text-sm text-slate-500">{list.length} orders</span>
            </div>
            <div className="grid gap-4">
              {list.map((order) => (
                <article
                  key={order._id}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase text-slate-500">Order ID</p>
                      <p className="text-lg font-semibold text-slate-900">{order.orderId}</p>
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

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-slate-600 font-semibold">Status:</label>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order.orderId, e.target.value)}
                        disabled={updatingStatus[order.orderId]}
                        className="px-3 py-1 text-xs font-semibold rounded-full border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="pending">Pending</option>
                        <option value="payment_pending">Payment Pending</option>
                        <option value="paid">Paid</option>
                        <option value="promotion_scheduled">Promotion Scheduled</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="failed">Failed</option>
                      </select>
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
          </section>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default AdminPanel;


