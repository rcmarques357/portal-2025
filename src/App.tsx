import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Stocks from "./pages/Stocks";
import Markets from "./pages/Markets";
import Currencies from "./pages/Currencies";
import Global from "./pages/Global";
import Portfolio from "./pages/Portfolio";
import Performance from "./pages/Performance";
import Analysis from "./pages/Analysis";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Assets from "./pages/Assets";
import Documentation from "./pages/Documentation";
import GovernanceStandards from "./pages/GovernanceStandards";
import CustomerTransformerDetection from "./pages/CustomerTransformerDetection";
import Reports from "./pages/Reports";
import WorkOrders from "./pages/WorkOrders";
import WorkOrdersOnHold from "./pages/WorkOrdersOnHold";
import GISDiscrepancy from "./pages/GISDiscrepancy";
import GISIntegration from "./pages/GISIntegration";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/gis" element={<GISIntegration />} />
            <Route path="/stocks" element={<Stocks />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/currencies" element={<Currencies />} />
            <Route path="/global" element={<Global />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/workorders" element={<WorkOrders />} />
            <Route path="/workorders-on-hold" element={<WorkOrdersOnHold />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/documentation/governance" element={<GovernanceStandards />} />
            <Route path="/projects/customer-transformer-detection" element={<CustomerTransformerDetection />} />
            <Route path="/dashboards/asset-data-quality/gis-sap-discrepancy" element={<GISDiscrepancy />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
