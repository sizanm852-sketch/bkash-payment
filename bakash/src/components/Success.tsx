import { useEffect } from "react"
import { useSearchParams, Link } from "react-router-dom"
import toast from "react-hot-toast"

const Success = () => {
  const [params] = useSearchParams()
  const trxID = params.get("trxID")
  const amount = params.get("amount")
  const invoiceID = params.get("invoiceID")

  useEffect(() => {
    toast.success("Payment confirmed! Thank you.", { duration: 5000 })
  }, [])

  const rows = [
    { label: "Transaction ID", value: trxID || "N/A", icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
      </svg>
    )},
    { label: "Amount Paid", value: amount ? `৳${amount}` : "N/A", icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )},
    { label: "Invoice ID", value: invoiceID || "N/A", icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )},
  ]

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-bkash-green/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-bkash-pink/10 blur-[120px] pointer-events-none" />

      <div className="glass-card rounded-3xl p-8 w-full max-w-md animate-slide-up shadow-2xl shadow-bkash-green/10">
        {/* Success icon */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="w-20 h-20 rounded-full bg-bkash-green/20 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-bkash-green to-emerald-400 flex items-center justify-center shadow-lg shadow-bkash-green/40">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            {/* Ping animation */}
            <span className="absolute inset-0 rounded-full bg-bkash-green/20 animate-ping" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Payment Successful!</h1>
          <p className="text-slate-400 text-sm mt-1">Your transaction has been confirmed</p>
        </div>

        {/* Details card */}
        <div className="glass rounded-2xl divide-y divide-white/10 mb-6 overflow-hidden">
          {rows.map(({ label, value, icon }) => (
            <div key={label} className="flex items-center justify-between px-4 py-3.5 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-2.5 text-slate-400 text-sm">
                <span className="text-bkash-green">{icon}</span>
                {label}
              </div>
              <span className="text-white font-semibold text-sm text-right max-w-[180px] truncate">{value}</span>
            </div>
          ))}
        </div>

        {/* Go Home button */}
        <Link
          to="/"
          id="go-home-btn"
          className="w-full py-4 rounded-2xl font-bold text-base text-white tracking-wide
            bg-gradient-to-r from-bkash-green to-emerald-500
            shadow-lg shadow-bkash-green/30
            hover:shadow-bkash-green/50 hover:scale-[1.02]
            active:scale-[0.98]
            transition-all duration-200 ease-out
            flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Back to Home
        </Link>

        <p className="text-center text-slate-600 text-xs mt-5">
          Keep this page for your records. Transaction ID is your proof of payment.
        </p>
      </div>
    </div>
  )
}

export default Success