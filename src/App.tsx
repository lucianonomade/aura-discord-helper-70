import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Configuration from "./pages/Configuration";
import Ranking from "./pages/Ranking";
import Moderation from "./pages/Moderation";
import Members from "./pages/Members";
import Messages from "./pages/Messages";
import Stats from "./pages/Stats";
import Logs from "./pages/Logs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/config" element={<Configuration />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/moderation" element={<Moderation />} />
          <Route path="/members" element={<Members />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/logs" element={<Logs />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
