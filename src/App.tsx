import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import Index from "./pages/Index";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Docs from "./pages/Docs";
import Imprint from "./pages/Imprint";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Refund from "./pages/Refund";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Overview from "./pages/dashboard/Overview";
import Players from "./pages/dashboard/Players";
import LiveMap from "./pages/dashboard/LiveMap";
import MultiStream from "./pages/dashboard/MultiStream";
import Bans from "./pages/dashboard/Bans";
import Configuration from "./pages/dashboard/Configuration";
import Lookup from "./pages/dashboard/Lookup";
import Logs from "./pages/dashboard/Logs";
import Admins from "./pages/dashboard/Admins";
import Servers from "./pages/demo/Servers";
import { ComingSoon } from "./pages/demo/ComingSoon";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/imprint" element={<Imprint />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/refund" element={<Refund />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Demo */}
          <Route path="/demo" element={<Servers />} />
          <Route path="/demo/redeem" element={<DashboardLayout />}>
            <Route index element={<ComingSoon title="Redeem License" description="Activate a license key for one of your servers." />} />
          </Route>
          <Route path="/demo/downloads" element={<DashboardLayout />}>
            <Route index element={<ComingSoon title="Downloads" description="Download the latest Axyrix client and server resources." />} />
          </Route>
          <Route path="/demo/configs" element={<DashboardLayout />}>
            <Route index element={<ComingSoon title="Config Library" description="Browse and apply community-tuned configurations." />} />
          </Route>
          <Route path="/demo/models" element={<DashboardLayout />}>
            <Route index element={<ComingSoon title="Model Browser" description="Search GTA peds, vehicles, weapons, and props by hash." />} />
          </Route>

          <Route path="/demo/:serverId" element={<DashboardLayout />}>
            <Route index element={<Overview />} />
            <Route path="players" element={<Players />} />
            <Route path="map" element={<LiveMap />} />
            <Route path="multistream" element={<MultiStream />} />
            <Route path="bans" element={<Bans />} />
            <Route path="config" element={<Configuration />} />
            <Route path="lookup" element={<Lookup />} />
            <Route path="logs" element={<Logs />} />
            <Route path="admins" element={<Admins />} />
          </Route>

          {/* Legacy /dashboard → /demo/phoenix-rp */}
          <Route path="/dashboard/*" element={<Navigate to="/demo/phoenix-rp" replace />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
