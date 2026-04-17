import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
          <Route path="/dashboard" element={<DashboardLayout />}>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
