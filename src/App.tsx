import { BrowserRouter, Route, Routes } from "react-router"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Reports from "./pages/Reports";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/Login";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/ProtectedComponent";
import Incentive from "./pages/Incentive";
import Learn from "./pages/Learn";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/incentive" element={<Incentive />} />
            <Route path="/learn" element={<Learn />} />

          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      
      {/* Toast notifications */}
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

export default App;