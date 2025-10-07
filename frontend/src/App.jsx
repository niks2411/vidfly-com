import { useState, useEffect } from 'react'
import axios from 'axios'
import AdminPage from './components/AdminPage'
import OrderTracking from './components/OrderTracking'

// Read API base URL from env. Example in production: https://api.myproject.com
const apiBaseUrl = import.meta.env.VITE_API_BASE?.replace(/\/$/, '') || 'http://localhost:5000'
const api = axios.create({ baseURL: apiBaseUrl })

export default function App() {
  const [currentPage, setCurrentPage] = useState('order') // 'order', 'track', 'admin'

  // Handle URL-based routing
  useEffect(() => {
    const path = window.location.pathname
    if (path === '/admin') {
      setCurrentPage('admin')
    } else if (path === '/track') {
      setCurrentPage('track')
    } else {
      setCurrentPage('order')
    }
  }, [])

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname
      if (path === '/admin') {
        setCurrentPage('admin')
      } else if (path === '/track') {
        setCurrentPage('track')
      } else {
        setCurrentPage('order')
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])
  const [form, setForm] = useState({
    customerName: '',
    email: '',
    phone: '',
    youtubeLink: '',
    selectedPackage: 'starter', // Package selection
  })

  // Predefined packages for YouTube views
  const packages = {
    starter: {
      name: 'Starter Views',
      type: 'views',
      quantity: 1000,
      price: 299,
      currency: 'INR',
      description: 'Perfect for new videos',
      features: ['1000 YouTube Views', 'High Quality', 'Fast Delivery', '24/7 Support']
    },
    popular: {
      name: 'Popular Views',
      type: 'views', 
      quantity: 5000,
      price: 1299,
      currency: 'INR',
      description: 'Great for growing channels',
      features: ['5000 YouTube Views', 'High Quality', 'Fast Delivery', '24/7 Support', 'Retention Guarantee']
    },
    viral: {
      name: 'Viral Views',
      type: 'views',
      quantity: 10000,
      price: 2299,
      currency: 'INR', 
      description: 'Maximum impact for your content',
      features: ['10000 YouTube Views', 'High Quality', 'Fast Delivery', '24/7 Support', 'Retention Guarantee', 'Engagement Boost']
    }
  }
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

  const handlePackageSelect = (packageKey) => {
    setForm((f) => ({ ...f, selectedPackage: packageKey }))
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
      const selectedPkg = packages[form.selectedPackage]
      const payload = {
        customerName: form.customerName,
        email: form.email,
        phone: form.phone,
        youtubeLink: form.youtubeLink,
        plan: {
          name: selectedPkg.name,
          type: selectedPkg.type,
          quantity: selectedPkg.quantity,
          price: selectedPkg.price,
          currency: selectedPkg.currency,
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
        selectedPackage: 'starter',
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

  // Navigation component
  const Navigation = () => (
    <nav className="bg-white shadow-sm border-b mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl mr-2">🎬</span>
              <span className="text-xl font-bold text-gray-900">VidFly</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                setCurrentPage('order')
                window.history.pushState({}, '', '/')
              }}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                currentPage === 'order'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Create Order
            </button>
            <button
              onClick={() => {
                setCurrentPage('track')
                window.history.pushState({}, '', '/track')
              }}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                currentPage === 'track'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Track Order
            </button>
          </div>
        </div>
      </div>
    </nav>
  )

  // Render different pages
  if (currentPage === 'admin') {
    return <AdminPage />
  }

  if (currentPage === 'track') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <OrderTracking />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="p-6">
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

           {/* Package Selection */}
           <div className="space-y-4">
             <h3 className="text-lg font-semibold text-gray-900">📦 Choose Your Package</h3>
             <div className="grid md:grid-cols-3 gap-4">
               {Object.entries(packages).map(([key, pkg]) => (
                 <div
                   key={key}
                   onClick={() => handlePackageSelect(key)}
                   className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                     form.selectedPackage === key
                       ? 'border-blue-500 bg-blue-50 shadow-lg'
                       : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                   }`}
                 >
                   <div className="text-center">
                     <h4 className="text-lg font-bold text-gray-900 mb-2">{pkg.name}</h4>
                     <p className="text-sm text-gray-600 mb-3">{pkg.description}</p>
                     <div className="text-2xl font-bold text-blue-600 mb-3">₹{pkg.price}</div>
                     <div className="text-sm text-gray-500 mb-4">{pkg.quantity.toLocaleString()} Views</div>
                     <ul className="text-xs text-gray-600 space-y-1">
                       {pkg.features.map((feature, idx) => (
                         <li key={idx} className="flex items-center">
                           <span className="text-green-500 mr-2">✓</span>
                           {feature}
                         </li>
                       ))}
                     </ul>
                   </div>
                 </div>
               ))}
             </div>
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
                 <div><strong>Customer:</strong> {result.userId?.name || result.customerName}</div>
                 <div><strong>Email:</strong> {result.userId?.email || result.email} ✅</div>
                 <div><strong>Plan:</strong> {result.plan.name}</div>
                 <div><strong>Amount:</strong> ₹{result.plan.price}</div>
                 <div><strong>Views:</strong> {result.plan.quantity.toLocaleString()}</div>
                 <div><strong>Email Verified:</strong> {result.userId?.emailVerified ? '✅ Yes' : '❌ No'}</div>
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
    </div>
  )
}