import { useState } from 'react'
import axios from 'axios'
import OtpVerification from './OtpVerification'

const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:5000' })

export default function AppWithOtp() {
  const [form, setForm] = useState({
    customerName: '',
    email: '',
    phone: '',
    youtubeLink: '',
    planName: 'Starter Views',
    planType: 'views',
    quantity: 1000,
    price: 299,
    currency: 'INR',
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showOtpVerification, setShowOtpVerification] = useState(false)
  const [emailVerified, setEmailVerified] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    
    // Reset email verification if email changes
    if (name === 'email') {
      setEmailVerified(false)
    }
  }

  const handleEmailVerification = async () => {
    if (!form.email) {
      setError('Please enter your email address first')
      return
    }

    try {
      setError('')
      await api.post('/api/auth/send-otp', { email: form.email })
      setShowOtpVerification(true)
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to send OTP')
    }
  }

  const handleOtpVerified = () => {
    setEmailVerified(true)
    setShowOtpVerification(false)
    alert('Email verified successfully! You can now submit your order.')
  }

  const handleOtpCancel = () => {
    setShowOtpVerification(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!emailVerified) {
      setError('Please verify your email address before submitting the order')
      return
    }

    setLoading(true)
    setError('')
    try {
      const payload = {
        customerName: form.customerName,
        email: form.email,
        phone: form.phone,
        youtubeLink: form.youtubeLink,
        plan: {
          name: form.planName,
          type: form.planType,
          quantity: Number(form.quantity),
          price: Number(form.price),
          currency: form.currency,
        },
      }
      const { data } = await api.post('/api/orders', payload)
      setResult(data)
      
      // Reset form after successful submission
      setForm({
        customerName: '',
        email: '',
        phone: '',
        youtubeLink: '',
        planName: 'Starter Views',
        planType: 'views',
        quantity: 1000,
        price: 299,
        currency: 'INR',
      })
      setEmailVerified(false)
    } catch (err) {
      setError(err?.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto bg-white shadow rounded p-6">
        <h1 className="text-2xl font-semibold mb-4">Vidflyy Test Order with Email Verification</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            className="w-full border p-2 rounded" 
            name="customerName" 
            placeholder="Full Name" 
            value={form.customerName} 
            onChange={handleChange} 
            required 
          />
          
          <div className="space-y-2">
            <div className="flex space-x-2">
              <input 
                className="flex-1 border p-2 rounded" 
                name="email" 
                type="email" 
                placeholder="Email" 
                value={form.email} 
                onChange={handleChange} 
                required 
              />
              <button
                type="button"
                onClick={handleEmailVerification}
                disabled={!form.email || emailVerified}
                className={`px-4 py-2 rounded text-sm font-medium ${
                  emailVerified 
                    ? 'bg-green-100 text-green-800 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {emailVerified ? '✓ Verified' : 'Verify Email'}
              </button>
            </div>
            
            {emailVerified && (
              <p className="text-green-600 text-sm">✓ Email verified successfully</p>
            )}
          </div>
          
          <input 
            className="w-full border p-2 rounded" 
            name="phone" 
            placeholder="Phone" 
            value={form.phone} 
            onChange={handleChange} 
          />
          
          <input 
            className="w-full border p-2 rounded" 
            name="youtubeLink" 
            placeholder="YouTube Link (optional)" 
            value={form.youtubeLink} 
            onChange={handleChange} 
          />

          <div className="grid grid-cols-2 gap-3">
            <input 
              className="border p-2 rounded" 
              name="planName" 
              placeholder="Plan Name" 
              value={form.planName} 
              onChange={handleChange} 
            />
            <select 
              className="border p-2 rounded" 
              name="planType" 
              value={form.planType} 
              onChange={handleChange}
            >
              <option value="views">views</option>
              <option value="subscribers">subscribers</option>
              <option value="watch_time">watch_time</option>
              <option value="likes">likes</option>
            </select>
            <input 
              className="border p-2 rounded" 
              name="quantity" 
              type="number" 
              value={form.quantity} 
              onChange={handleChange} 
            />
            <input 
              className="border p-2 rounded" 
              name="price" 
              type="number" 
              step="0.01" 
              value={form.price} 
              onChange={handleChange} 
            />
            <input 
              className="border p-2 rounded" 
              name="currency" 
              value={form.currency} 
              onChange={handleChange} 
            />
          </div>

          <button 
            className={`w-full py-2 px-4 rounded font-medium ${
              emailVerified 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-400 text-gray-700 cursor-not-allowed'
            }`}
            disabled={loading || !emailVerified}
          >
            {loading ? 'Submitting...' : emailVerified ? 'Submit Order' : 'Verify Email First'}
          </button>
        </form>

        {error && <p className="text-red-600 mt-3">{error}</p>}
        
        {result && (
          <div className="mt-6 text-sm">
            <h2 className="font-semibold text-green-600">✓ Order Saved Successfully!</h2>
            <div className="bg-green-50 border border-green-200 rounded p-3 mt-2">
              <p><strong>Order ID:</strong> {result.orderId}</p>
              <p><strong>Customer:</strong> {result.customerName}</p>
              <p><strong>Email:</strong> {result.email} ✓</p>
              <p><strong>Plan:</strong> {result.plan.name}</p>
              <p><strong>Amount:</strong> ₹{result.plan.price}</p>
              <p><strong>Status:</strong> {result.status}</p>
            </div>
            <details className="mt-3">
              <summary className="cursor-pointer text-gray-600">View Full Response</summary>
              <pre className="bg-gray-100 p-3 rounded overflow-auto text-xs mt-2">
                {JSON.stringify(result, null, 2)}
              </pre>
            </details>
          </div>
        )}

        {/* Email Verification Instructions */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded p-4">
          <h3 className="font-semibold text-blue-900 mb-2">📧 Email Verification Process</h3>
          <ol className="text-sm text-blue-800 space-y-1">
            <li>1. Enter your email address</li>
            <li>2. Click "Verify Email" button</li>
            <li>3. Check your email for 6-digit OTP code</li>
            <li>4. Enter the OTP to verify your email</li>
            <li>5. Submit your order after verification</li>
          </ol>
          <p className="text-xs text-blue-600 mt-2">
            💡 OTP expires in 10 minutes. You can resend if needed.
          </p>
        </div>
      </div>

      {/* OTP Verification Modal */}
      {showOtpVerification && (
        <OtpVerification
          email={form.email}
          onVerified={handleOtpVerified}
          onCancel={handleOtpCancel}
        />
      )}
    </div>
  )
}