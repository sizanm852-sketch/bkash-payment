import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Home from "./components/Home"
import Success from "./components/Success"
import ErrorPage from "./components/Error"

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/success" element={<Success />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App