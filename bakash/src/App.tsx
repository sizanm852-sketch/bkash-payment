import { lazy, Suspense } from "react"
import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"

const Home = lazy(() => import("./components/Home"))
const Success = lazy(() => import("./components/Success"))
const ErrorPage = lazy(() => import("./components/Error"))

const LoadingFallback = () => (
  <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
    <div className="w-12 h-12 border-4 border-bkash-pink/20 border-t-bkash-pink rounded-full animate-spin mb-4"></div>
    <p className="text-slate-400 text-sm font-medium animate-pulse">Loading experience...</p>
  </div>
)

const App = () => {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "rgba(15,23,42,0.95)",
            backdropFilter: "blur(12px)",
            color: "#f8fafc",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "14px",
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
            padding: "12px 16px",
          },
          success: {
            iconTheme: { primary: "#00a651", secondary: "#fff" },
          },
          error: {
            iconTheme: { primary: "#e2136e", secondary: "#fff" },
          },
          loading: {
            iconTheme: { primary: "#e2136e", secondary: "rgba(255,255,255,0.2)" },
          },
          duration: 4000,
        }}
      />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/success" element={<Success />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App