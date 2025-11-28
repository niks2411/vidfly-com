import { useState } from 'react'
import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:5000' })

export default function OrderTracking() {
  const [orderId, setOrderId] = useState('')
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleTrackOrder = async (e) => {
    e.preventDefault()
    if (!orderId.trim()) {
      setError('Please enter an Order ID')
      return
    }

    setLoading(true)
    setError('')
    try {
      const { data } = await api.get(`/api/orders/${orderId}`)
      setOrder(data)
    } catch (err) {
      setError(err?.response?.data?.message || 'Order not found')
      setOrder(null)
    } finally {
      setLoading(false)
    }
  }

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

  const getStatusIcon = (status) => {
    const icons = {
      'pending': '⏳',
      'payment_pending': '💳',
      'paid': '✅',
      'promotion_scheduled': '📅',
      'in_progress': '🚀',
      'completed': '🎉',
      'failed': '❌'
    }
    return icons[status] || '❓'
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <span className="text-2xl text-white">📦</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Order</h1>
          <p className="text-lg text-gray-600">Enter your Order ID to check the status of your YouTube promotion</p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <form onSubmit={handleTrackOrder} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Order ID</label>
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value.toUpperCase())}
                  placeholder="Enter your Order ID (e.g., VID123456)"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Tracking...' : 'Track Order'}
                </button>
              </div>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <span className="text-red-500 mr-2">⚠️</span>
                <p className="text-red-600">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Order Details */}
        {order && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Order Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Order #{order.orderId}</h2>
                  <p className="text-blue-100">Created on {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    <span className="mr-2">{getStatusIcon(order.status)}</span>
                    {getStatusDisplayName(order.status)}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Customer Info */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{order.userId?.name || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{order.userId?.email || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">{order.userId?.phone || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email Verified:</span>
                      <span className="font-medium">
                        {order.userId?.emailVerified ? '✅ Yes' : '❌ No'}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Order Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Plan:</span>
                      <span className="font-medium">{order.plan.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Views:</span>
                      <span className="font-medium">{order.plan.quantity.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-bold text-green-600">₹{order.plan.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Currency:</span>
                      <span className="font-medium">{order.plan.currency}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* YouTube Link */}
              {order.youtubeLink && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">YouTube Link</h3>
                  <a
                    href={order.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline break-all"
                  >
                    {order.youtubeLink}
                  </a>
                </div>
              )}

              {/* Admin Comments */}
              {order.adminComments && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Admin Update</h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <span className="text-blue-500 mr-2">💬</span>
                      <p className="text-blue-800">{order.adminComments}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Info */}
              {order.paymentId && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Payment Information</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Status:</span>
                        <span className={`font-medium ${
                          order.paymentId.status === 'captured' ? 'text-green-600' : 'text-orange-600'
                        }`}>
                          {order.paymentId.status}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Gateway:</span>
                        <span className="font-medium capitalize">{order.paymentId.gateway}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Timeline */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Order Timeline</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Order Created</p>
                      <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  {order.status !== 'pending' && (
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Status: {getStatusDisplayName(order.status)}</p>
                        <p className="text-xs text-gray-500">Updated by admin</p>
                      </div>
                    </div>
                  )}

                  {order.completedAt && (
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Order Completed</p>
                        <p className="text-xs text-gray-500">{new Date(order.completedAt).toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Need Help?</h3>
          <p className="text-blue-800 text-sm mb-3">
            If you can't find your order or have any questions, please contact our support team.
          </p>
          <div className="text-sm text-blue-700">
            <p>📧 Email: support@vidflyy.com</p>
            <p>📞 Phone: +91 9876543210</p>
          </div>
        </div>
      </div>
    </div>
  )
}



