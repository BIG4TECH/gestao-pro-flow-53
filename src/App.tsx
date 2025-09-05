import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Layout } from "@/components/layout/Layout";

// Import Pages
import Login from "./pages/Login";
import Index from "./pages/Index";
import CobrancasPagamentos from "./pages/CobrancasPagamentos";
import SimplesNacional from "./pages/SimplesNacional";
import FolhaPagamento from "./pages/FolhaPagamento";
import Demandas from "./pages/Demandas";
import ContabilidadeDigital from "./pages/ContabilidadeDigital";
import AutomacaoFiscal from "./pages/AutomacaoFiscal";
import Arquitetura from "./pages/Arquitetura";
import Ajuda from "./pages/Ajuda";
import Configuracoes from "./pages/Configuracoes";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Protected Routes */}
            <Route path="/*" element={
              <ProtectedRoute>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/cobrancas/*" element={<CobrancasPagamentos />} />
                    <Route path="/simples-nacional/*" element={<SimplesNacional />} />
                    <Route path="/folha-pagamento/*" element={<FolhaPagamento />} />
                    <Route path="/demandas/*" element={<Demandas />} />
                    <Route path="/demandas/:boardId" element={<Demandas />} />
                    <Route path="/contabilidade-digital/*" element={<ContabilidadeDigital />} />
                    <Route path="/automacao-fiscal/*" element={<AutomacaoFiscal />} />
                    <Route path="/arquitetura" element={<Arquitetura />} />
                    <Route path="/ajuda" element={<Ajuda />} />
                    <Route path="/configuracoes/*" element={<Configuracoes />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/search" element={<Search />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Layout>
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
