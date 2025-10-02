import { useState } from 'react'
import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:5000' })

export default function OtpVerification({ email, onVerified, onCancel }) {
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)

  const sendOtp = async () => {
    setSending(true)
    setError('')
    try {
      await api.post('/api/auth/send-otp', { email })
      alert('OTP sent to your email!')
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to send OTP')
    } finally {
      setSending(false)
    }
  }

  const verifyOtp = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await api.post('/api/auth/verify-otp', { email, otp })
      onVerified()
    } catch (err) {
      setError(err?.response?.data?.message || 'Invalid OTP')
    } finally {
      setLoading(false)
    }
  }

  const resendOtp = async () => {
    await sendOtp()
    setOtp('')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">📧 Verify Your Email</h2>
        
        <p className="text-gray-600 mb-4">
          We've sent a 6-digit verification code to:
          <br />
          <strong>{email}</strong>
        </p>

        <form onSubmit={verifyOtp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter OTP Code
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="123456"
              className="w-full border p-3 rounded text-center text-lg font-mono tracking-widest"
              maxLength="6"
              required
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded disabled:bg-gray-400"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={resendOtp}
            disabled={sending}
            className="text-blue-600 hover:underline text-sm"
          >
            {sending ? 'Sending...' : "Didn't receive code? Resend"}
          </button>
        </div>

        <div className="mt-4 text-xs text-gray-500 text-center">
          Code expires in 10 minutes
        </div>
      </div>
    </div>
  )
}