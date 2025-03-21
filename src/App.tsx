import { BrowserRouter, Route, Routes } from "react-router"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/Login";

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
                  <Route path="/home" element={<Home />} />
                  <Route path="*" element={<NotFound />} />
              </Routes>
          </BrowserRouter>
      </QueryClientProvider>
  );
}
 
export default App