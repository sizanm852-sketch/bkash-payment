import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

// Order details — in a real app these would come from your backend/cart
const ORDER = {
  amount: 50,
  orderId: 1,
}

const Home = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handlePayment = async () => {
    setLoading(true)

    const paymentPromise = axios
      .post(
        "http://localhost:5001/api/payment/create/bkash",
        { amount: ORDER.amount, orderId: ORDER.orderId },
        { withCredentials: true }
      )
      .then(({ data }) => {
        if (data.url) {
          window.location.href = data.url
          return "Redirecting to bKash…"
        }
        throw new Error("No payment URL received")
      })

    toast.promise(paymentPromise, {
      loading: "Initiating payment…",
      success: "Redirecting to bKash ✓",
      error: (err) => err?.response?.data?.error || "Payment initiation failed",
    })

    paymentPromise.catch(() => {
      setLoading(false)
      setTimeout(() => navigate("/error"), 1500)
    })
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-bkash-pink/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-purple-600/15 blur-[120px] pointer-events-none" />

      <div className="glass-card rounded-3xl p-8 w-full max-w-md animate-slide-up shadow-2xl shadow-bkash-pink/10">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-bkash-pink to-bkash-dark flex items-center justify-center mb-4 shadow-lg shadow-bkash-pink/40">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Complete Payment</h1>
          <p className="text-slate-400 text-sm mt-1">Secure checkout via bKash</p>
        </div>

        {/* Amount card */}
        <div className="glass rounded-2xl p-5 mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Payment Summary</p>
          <div className="flex justify-between items-center">
            <span className="text-slate-300 text-sm font-medium">Total Amount</span>
            <span className="text-3xl font-bold text-white">৳{ORDER.amount}</span>
          </div>
          <p className="text-slate-600 text-xs mt-3">
            Invoice will be generated after payment is confirmed.
          </p>
        </div>

        {/* Pay button */}
        <button
          id="bkash-pay-btn"
          onClick={handlePayment}
          disabled={loading}
          className="w-full py-4 rounded-2xl font-bold text-base text-white tracking-wide
            bg-gradient-to-r from-bkash-pink to-bkash-dark
            shadow-lg shadow-bkash-pink/40
            hover:shadow-bkash-pink/60 hover:scale-[1.02]
            active:scale-[0.98]
            disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100
            transition-all duration-200 ease-out
            flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Processing…
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Pay with bKash
            </>
          )}
        </button>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-4 mt-6 text-slate-500 text-xs">
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-bkash-green" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            SSL Secured
          </div>
          <span className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-bkash-green" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Verified by bKash
          </div>
          <span className="w-px h-4 bg-white/10" />
          <span>100% Safe</span>
        </div>
      </div>
    </div>
  )
}

export default Home