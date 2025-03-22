import { BrowserRouter, Route, Routes } from "react-router"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/Login";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/ProtectedComponent";
import { Suspense, lazy } from "react";
import Loading from "./components/Loading";

const Incentive = lazy(() => import("./pages/Incentive"));
const Learn = lazy(() => import("./pages/Learn"));
const Reports = lazy(() => import("./pages/Reports"));

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
                      <Route
                          path="/reports"
                          element={
                              <Suspense fallback={<Loading />}>
                                  <Reports />
                              </Suspense>
                          }
                      />
                      <Route
                          path="/incentive"
                          element={
                              <Suspense fallback={<Loading />}>
                                  <Incentive />
                              </Suspense>
                          }
                      />
                      <Route
                          path="/learn"
                          element={
                              <Suspense fallback={<Loading />}>
                                  <Learn />
                              </Suspense>
                          }
                      />
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