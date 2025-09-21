import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="tracking" element={<div>Live Tracking - Coming Soon</div>} />
            <Route path="inventory" element={<div>Inventory - Coming Soon</div>} />
            <Route path="cameras" element={<div>Camera Feeds - Coming Soon</div>} />
            <Route path="analytics" element={<div>Analytics - Coming Soon</div>} />
            <Route path="predictions" element={<div>Predictions - Coming Soon</div>} />
            <Route path="alerts" element={<div>Alerts - Coming Soon</div>} />
            <Route path="settings" element={<div>Settings - Coming Soon</div>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
