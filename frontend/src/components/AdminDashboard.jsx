import { useState, useEffect } from 'react'
import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:5000' })

export default function AdminDashboard({ onLogout }) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [statusUpdate, setStatusUpdate] = useState('')
  const [adminComments, setAdminComments] = useState('')
  const [updating, setUpdating] = useState(false)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Set up axios interceptor to include auth token
    const token = localStorage.getItem('adminToken')
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/api/admin/orders')
      setOrders(data)
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to fetch orders')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateOrder = async (orderId) => {
    if (!statusUpdate) {
      setError('Please select a status')
      return
    }

    setUpdating(true)
    try {
      await api.put(`/api/admin/orders/${orderId}/status`, {
        status: statusUpdate,
        adminComments: adminComments
      })
      
      // Refresh orders
      await fetchOrders()
      setSelectedOrder(null)
      setStatusUpdate('')
      setAdminComments('')
      setError('')
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to update order')
    } finally {
      setUpdating(false)
    }
  }

  const handleDeleteOrder = async (orderId) => {
    // Confirm deletion
    if (!window.confirm(`Are you sure you want to delete order ${orderId}? This action cannot be undone.`)) {
      return
    }

    try {
      await api.delete(`/api/admin/orders/${orderId}`)
      
      // Remove order from state
      setOrders(orders.filter(order => order.orderId !== orderId))
      
      // Show success message
      alert('Order deleted successfully!')
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to delete order')
      alert('Failed to delete order: ' + (err?.response?.data?.message || 'Unknown error'))
    }
  }

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'all' || order.status === filter
    const matchesSearch = order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'payment_pending': 'bg-orange-100 text-orange-800',
      'paid': 'bg-blue-100 text-blue-800',
      'promotion_scheduled': 'bg-purple-100 text-purple-800',
      'in_progress': 'bg-indigo-100 text-indigo-800',
      'completed': 'bg-green-100 text-green-800',
      'failed': 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getStatusDisplayName = (status) => {
    const displayNames = {
      'pending': 'Pending',
      'payment_pending': 'Payment Pending',
      'paid': 'Paid',
      'promotion_scheduled': 'Promotion Scheduled',
      'in_progress': 'In Progress',
      'completed': 'Completed',
      'failed': 'Failed'
    }
    return displayNames[status] || status
  }

  const formatCampaignType = (type) => {
    const map = {
      promote_video: 'Promote Video',
      promote_channel: 'Promote Channel',
      packages: 'Packages',
      bulk_views: 'Bulk Views',
      free_views: 'Free Views'
    }
    return map[type] || 'Standard Order'
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage orders and track progress</p>
            </div>
            <button
              onClick={onLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
          
          {/* Quick Stats */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-2xl font-bold text-blue-600">
                {orders.filter(order => order.status === 'payment_pending').length}
              </div>
              <div className="text-sm text-gray-600">Payment Pending</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-2xl font-bold text-green-600">
                {orders.filter(order => order.status === 'in_progress').length}
              </div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-2xl font-bold text-purple-600">
                {orders.filter(order => order.status === 'completed').length}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-2xl font-bold text-gray-600">
                {orders.length}
              </div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by Order ID, Name, or Email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                 <option value="all">All Orders</option>
                 <option value="pending">Pending</option>
                 <option value="payment_pending">Payment Pending</option>
                 <option value="paid">Paid</option>
                 <option value="promotion_scheduled">Promotion Scheduled</option>
                 <option value="in_progress">In Progress</option>
                 <option value="completed">Completed</option>
                 <option value="failed">Failed</option>
              </select>
            </div>
            <button
              onClick={fetchOrders}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Payment Pending Orders Alert */}
        {orders.filter(order => order.status === 'payment_pending').length > 0 && (
          <div className="mb-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center">
              <span className="text-orange-500 mr-3">⚠️</span>
              <div>
                <h3 className="text-lg font-semibold text-orange-800">Payment Pending Orders</h3>
                <p className="text-orange-700 text-sm">
                  {orders.filter(order => order.status === 'payment_pending').length} orders are waiting for payment completion
                </p>
              </div>
            </div>
          </div>
        )}


        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      </div>
                    </td>
                  </tr>
                ) : filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500">No orders found</td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.orderId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>
                          <div className="font-medium">{order.userId?.name || 'N/A'}</div>
                          <div className="text-gray-500">{order.userId?.email || 'N/A'}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>
                          <div className="font-medium">{order.plan?.name || 'Custom Plan'}</div>
                          <div className="text-gray-500">
                            {order.plan?.quantity?.toLocaleString()} {order.plan?.type === 'package' ? 'units' : 'views'}
                          </div>
                          {order.campaignType && (
                            <div className="text-xs text-purple-600 font-semibold mt-1">
                              {formatCampaignType(order.campaignType)}
                            </div>
                          )}
                          {order.videos?.length > 0 && (
                            <div className="text-xs text-gray-500">
                              {order.videos.length} video{order.videos.length > 1 ? 's' : ''}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>
                          <div className="font-medium">
                            {order.plan?.currency === 'USD' ? '$' : '₹'}
                            {order.plan?.price}
                          </div>
                          {order.paymentId && (
                            <div className="text-xs text-gray-500">
                              Payment: {order.paymentId.status}
                            </div>
                          )}
                        </div>
                      </td>
                       <td className="px-6 py-4 whitespace-nowrap">
                         <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                           {getStatusDisplayName(order.status)}
                         </span>
                         {order.status === 'payment_pending' && (
                           <div className="text-xs text-orange-600 mt-1">
                             ⚠️ Awaiting Payment
                           </div>
                         )}
                       </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => handleDeleteOrder(order.orderId)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Details & Update Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Order Details: {selectedOrder.orderId}
                </h3>

                {selectedOrder.campaignType && (
                  <div className="mb-4 rounded-xl border border-purple-100 bg-purple-50 p-4 text-sm">
                    <p className="font-semibold text-purple-700">
                      {formatCampaignType(selectedOrder.campaignType)}
                    </p>
                    {selectedOrder.channel?.name && (
                      <p className="text-gray-600 mt-1">{selectedOrder.channel.name}</p>
                    )}
                    {selectedOrder.budget && (
                      <p className="text-gray-600">Budget: ₹{selectedOrder.budget}</p>
                    )}
                  </div>
                )}

                {selectedOrder.videos?.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      Videos ({selectedOrder.videos.length})
                    </p>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {selectedOrder.videos.map((video) => (
                        <div key={video.videoId} className="text-xs text-gray-600">
                          <p className="font-medium">{video.title}</p>
                          {video.viewsRequested && (
                            <p>{video.viewsRequested.toLocaleString()} views</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedOrder.targeting && (
                  <div className="mb-4 text-sm text-gray-700">
                    <p className="font-semibold mb-1">Targeting</p>
                    <p>Country: {selectedOrder.targeting.country || 'All'}</p>
                    <p>Goal: {selectedOrder.targeting.goal || 'Views'}</p>
                    <p>Duration: {selectedOrder.targeting.duration || 'Flexible'}</p>
                  </div>
                )}
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={statusUpdate}
                    onChange={(e) => setStatusUpdate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                     <option value="">Select Status</option>
                     <option value="pending">Pending</option>
                     <option value="payment_pending">Payment Pending</option>
                     <option value="paid">Paid</option>
                     <option value="promotion_scheduled">Promotion Scheduled</option>
                     <option value="in_progress">In Progress</option>
                     <option value="completed">Completed</option>
                     <option value="failed">Failed</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Admin Comments</label>
                  <textarea
                    value={adminComments}
                    onChange={(e) => setAdminComments(e.target.value)}
                    placeholder="Add a comment for the customer..."
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setSelectedOrder(null)
                      setStatusUpdate('')
                      setAdminComments('')
                      setError('')
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleUpdateOrder(selectedOrder.orderId)}
                    disabled={updating}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    {updating ? 'Updating...' : 'Update Order'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
