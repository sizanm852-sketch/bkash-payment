import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import toast from "react-hot-toast"

const ErrorPage = () => {
  const [params] = useSearchParams()
  const status = params.get("status")
  const message = params.get("message")

  useEffect(() => {
    const reason = message || status || "Transaction could not be completed"
    toast.error(`Payment failed: ${reason}`, { duration: 6000 })
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-bkash-pink/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-red-700/10 blur-[120px] pointer-events-none" />

      <div className="glass-card rounded-3xl p-8 w-full max-w-md animate-slide-up shadow-2xl shadow-bkash-pink/10">
        {/* Error icon */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="w-20 h-20 rounded-full bg-bkash-pink/10 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-bkash-pink to-bkash-dark flex items-center justify-center shadow-lg shadow-bkash-pink/40">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Payment Failed</h1>
          <p className="text-slate-400 text-sm mt-1">Something went wrong with your transaction</p>
        </div>

        {/* Error details */}
        {(status || message) && (
          <div className="glass rounded-2xl divide-y divide-white/10 mb-6 overflow-hidden">
            {status && (
              <div className="flex items-center justify-between px-4 py-3.5">
                <div className="flex items-center gap-2.5 text-slate-400 text-sm">
                  <svg className="w-4 h-4 text-bkash-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Status
                </div>
                <span className="text-white font-semibold text-sm capitalize">{status}</span>
              </div>
            )}
            {message && (
              <div className="flex items-center justify-between px-4 py-3.5">
                <div className="flex items-center gap-2.5 text-slate-400 text-sm">
                  <svg className="w-4 h-4 text-bkash-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Reason
                </div>
                <span className="text-white font-semibold text-sm text-right max-w-[200px]">{message}</span>
              </div>
            )}
          </div>
        )}

        {/* Help text */}
        <div className="glass rounded-2xl px-4 py-3.5 mb-6 flex gap-3 items-start">
          <svg className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p className="text-slate-400 text-xs leading-relaxed">
            No money has been deducted from your account. Please try again or contact support if the issue persists.
          </p>
        </div>

        {/* Try again button */}
        <a
          href="/"
          id="try-again-btn"
          className="w-full py-4 rounded-2xl font-bold text-base text-white tracking-wide
            bg-gradient-to-r from-bkash-pink to-bkash-dark
            shadow-lg shadow-bkash-pink/30
            hover:shadow-bkash-pink/50 hover:scale-[1.02]
            active:scale-[0.98]
            transition-all duration-200 ease-out
            flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Try Again
        </a>
      </div>
    </div>
  )
}

export default ErrorPage