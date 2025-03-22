import { BrowserRouter, Route, Routes } from "react-router"
import { useState, useEffect } from "react"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Reports from "./pages/Reports"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Login from "./pages/Login"
import { Toaster } from "sonner"
import ProtectedRoute from "./components/ProtectedComponent"
import Incentive from "./pages/Incentive"
import Offline from "./pages/Offline"
import { toast } from "sonner"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
    },
  },
})

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      toast.success("You're back online!")
    }

    const handleOffline = () => {
      setIsOnline(false)
      toast.error("You're offline. Some features may not be available.")
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (!isOnline) {
    return <Offline />
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/incentive" element={<Incentive />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      
      {/* Toast notifications */}
      <Toaster position="top-right" />
    </QueryClientProvider>
  )
}

export default App