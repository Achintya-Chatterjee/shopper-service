import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/cart";
import { ThemeProvider } from "@/components/ThemeProvider";
import { FavoritesProvider } from "@/context/favorites/FavoritesContext";
import { CompareProvider } from "@/context/compare/CompareContext";
import React from "react";
import Index from "./pages/Index";
import ServiceDetail from "./pages/ServiceDetail";
import CheckoutPage from "./pages/Checkout";
import SharedCartPage from "./pages/SharedCart";
import Favorites from "./pages/Favorites";
import Compare from "./pages/Compare";
import OrderHistory from "./pages/OrderHistory";
import OrderDetail from "./pages/OrderDetail";
import Providers from "./pages/Providers";
import ProviderDetail from "./pages/ProviderDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system">
        <TooltipProvider>
          <CartProvider>
            <FavoritesProvider>
              <CompareProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/service/:id" element={<ServiceDetail />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route
                      path="/shared-cart/:cartId"
                      element={<SharedCartPage />}
                    />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/compare" element={<Compare />} />
                    <Route path="/orders" element={<OrderHistory />} />
                    <Route path="/order/:id" element={<OrderDetail />} />
                    <Route path="/providers" element={<Providers />} />
                    <Route path="/provider/:id" element={<ProviderDetail />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </CompareProvider>
            </FavoritesProvider>
          </CartProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
