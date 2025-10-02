import { useState } from 'react'
import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:5000' })

export default function App() {
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
  
  // Email verification states
  const [emailVerified, setEmailVerified] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [sendingOtp, setSendingOtp] = useState(false)
  const [verifyingOtp, setVerifyingOtp] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    
    // Reset email verification if email changes
    if (name === 'email') {
      setEmailVerified(false)
      setOtpSent(false)
      setOtp('')
    }
  }

  const sendOtp = async () => {
    if (!form.email) {
      setError('Please enter your email address')
      return
    }

    setSendingOtp(true)
    setError('')
    
    try {
      await api.post('/api/auth/send-otp', { email: form.email })
      setOtpSent(true)
      setError('')
      alert('OTP sent to your email! Please check your inbox.')
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to send OTP')
    } finally {
      setSendingOtp(false)
    }
  }

  const verifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP')
      return
    }

    setVerifyingOtp(true)
    setError('')
    
    try {
      await api.post('/api/auth/verify-otp', { 
        email: form.email, 
        otp: otp 
      })
      setEmailVerified(true)
      setError('')
      alert('Email verified successfully! You can now submit your order.')
    } catch (err) {
      setError(err?.response?.data?.message || 'Invalid OTP')
    } finally {
      setVerifyingOtp(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!emailVerified) {
      setError('Please verify your email before submitting the order')
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
      setOtpSent(false)
      setOtp('')
      
    } catch (err) {
      if (err?.response?.data?.code === 'EMAIL_NOT_VERIFIED') {
        setEmailVerified(false)
        setError('Email verification expired. Please verify your email again.')
      } else {
        setError(err?.response?.data?.message || err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto bg-white shadow rounded p-6">
        <h1 className="text-2xl font-semibold mb-4">📧 Vidflyy Order with Email Verification</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full border p-2 rounded" name="customerName" placeholder="Full Name" value={form.customerName} onChange={handleChange} required />
          
          {/* Email Verification Section */}
          <div className="border rounded p-4 bg-blue-50">
            <h3 className="font-semibold text-blue-900 mb-3">📧 Email Verification Required</h3>
            
            {/* Email Input with Send OTP Button */}
            <div className="flex space-x-2 mb-3">
              <input 
                className="flex-1 border p-2 rounded" 
                name="email" 
                type="email" 
                placeholder="Email Address" 
                value={form.email} 
                onChange={handleChange} 
                required 
              />
              <button
                type="button"
                onClick={sendOtp}
                disabled={!form.email || sendingOtp || emailVerified}
                className={`px-4 py-2 rounded font-medium whitespace-nowrap ${
                  emailVerified 
                    ? 'bg-green-500 text-white cursor-not-allowed' 
                    : sendingOtp 
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {emailVerified ? '✓ Verified' : sendingOtp ? 'Sending...' : 'Send OTP'}
              </button>
            </div>

            {/* OTP Input and Verify Button */}
            {otpSent && !emailVerified && (
              <div className="flex space-x-2 mb-3">
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="flex-1 border p-2 rounded text-center font-mono"
                  maxLength="6"
                />
                <button
                  type="button"
                  onClick={verifyOtp}
                  disabled={otp.length !== 6 || verifyingOtp}
                  className={`px-4 py-2 rounded font-medium whitespace-nowrap ${
                    verifyingOtp 
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {verifyingOtp ? 'Verifying...' : 'Verify OTP'}
                </button>
              </div>
            )}

            {/* Status Messages */}
            {emailVerified && (
              <div className="text-green-600 text-sm font-medium">
                ✅ Email verified successfully! You can now submit your order.
              </div>
            )}
            
            {otpSent && !emailVerified && (
              <div className="text-blue-600 text-sm">
                📱 OTP sent to {form.email}. Please check your inbox and enter the 6-digit code.
                <br />
                <button 
                  type="button" 
                  onClick={sendOtp}
                  disabled={sendingOtp}
                  className="text-blue-700 underline hover:no-underline mt-1"
                >
                  Resend OTP
                </button>
              </div>
            )}
          </div>
          <input className="w-full border p-2 rounded" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
          <input className="w-full border p-2 rounded" name="youtubeLink" placeholder="YouTube Link (optional)" value={form.youtubeLink} onChange={handleChange} />

          <div className="grid grid-cols-2 gap-3">
            <input className="border p-2 rounded" name="planName" placeholder="Plan Name" value={form.planName} onChange={handleChange} />
            <select className="border p-2 rounded" name="planType" value={form.planType} onChange={handleChange}>
              <option value="views">views</option>
              <option value="subscribers">subscribers</option>
              <option value="watch_time">watch_time</option>
              <option value="likes">likes</option>
            </select>
            <input className="border p-2 rounded" name="quantity" type="number" value={form.quantity} onChange={handleChange} />
            <input className="border p-2 rounded" name="price" type="number" step="0.01" value={form.price} onChange={handleChange} />
            <input className="border p-2 rounded" name="currency" value={form.currency} onChange={handleChange} />
          </div>

          <button 
            type="submit"
            className={`w-full py-3 px-4 rounded font-medium text-white ${
              emailVerified && !loading
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={loading || !emailVerified}
          >
            {loading ? 'Submitting Order...' : emailVerified ? 'Submit Order' : 'Verify Email First'}
          </button>
        </form>

        {error && <p className="text-red-600 mt-3">{error}</p>}
        {result && (
          <div className="mt-6 text-sm">
            <h2 className="font-semibold text-green-600 text-lg">✅ Order Created Successfully!</h2>
            <div className="mt-3 p-4 bg-green-50 border border-green-200 rounded">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div><strong>Order ID:</strong> {result.orderId}</div>
                <div><strong>Status:</strong> {result.status}</div>
                <div><strong>Customer:</strong> {result.customerName}</div>
                <div><strong>Email:</strong> {result.email} ✅</div>
                <div><strong>Plan:</strong> {result.plan.name}</div>
                <div><strong>Amount:</strong> ₹{result.plan.price}</div>
                <div><strong>Email Verified:</strong> {result.emailVerified ? '✅ Yes' : '❌ No'}</div>
                <div><strong>Created:</strong> {new Date(result.createdAt).toLocaleString()}</div>
              </div>
            </div>
            
            <details className="mt-3">
              <summary className="cursor-pointer text-gray-600 hover:text-gray-800">
                View Full Response
              </summary>
              <pre className="bg-gray-100 p-3 rounded overflow-auto text-xs mt-2">
                {JSON.stringify(result, null, 2)}
              </pre>
            </details>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
          <h3 className="font-semibold text-blue-900 mb-2">📋 How Email Verification Works:</h3>
          <ol className="text-sm text-blue-800 space-y-1">
            <li>1. Enter your email address</li>
            <li>2. Click "Send OTP" to receive verification code</li>
            <li>3. Check your email inbox for 6-digit OTP</li>
            <li>4. Enter the OTP and click "Verify OTP"</li>
            <li>5. Once verified, you can submit your order</li>
          </ol>
          <p className="text-xs text-blue-600 mt-2">
            💡 OTP expires in 10 minutes. Orders require verified email addresses.
          </p>
        </div>
      </div>
    </div>
  )
}