import { useState, useEffect } from "react";
import { CartItem, SavedCart } from "@/types/Index";
import { supabase } from "@/integrations/supabase/client";
import {
  loadCartFromLocalStorage,
  fetchSavedCartsFromDatabase,
  transformDbCartToAppCart,
} from "./cartUtils";

// Hook for cart auth state
export const useCartAuth = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setUserId(data.session?.user?.id || null);

      // Set up auth state listener
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event, session) => {
        setUserId(session?.user?.id || null);
      });

      return () => {
        subscription.unsubscribe();
      };
    };

    checkAuth();
  }, []);

  return { userId };
};

// Hook for loading cart data
export const useCartData = (userId: string | null) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [savedCarts, setSavedCarts] = useState<SavedCart[]>([]);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved carts from Supabase for authenticated users
  useEffect(() => {
    const fetchSavedCarts = async () => {
      if (!userId) {
        const { cartItems, promoCode, promoDiscount } =
          loadCartFromLocalStorage();
        setCartItems(cartItems || []);
        setPromoCode(promoCode || null);
        setPromoDiscount(promoDiscount || 0);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const data = await fetchSavedCartsFromDatabase(userId);

        if (data && data.length > 0) {
          // Transform data from Supabase format to our SavedCart format
          const transformedCarts = data.map((cart: any) =>
            transformDbCartToAppCart(cart)
          );

          setSavedCarts(transformedCarts);
        }
      } catch (error) {
        console.error("Error fetching saved carts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedCarts();
  }, [userId]);

  return {
    cartItems,
    setCartItems,
    savedCarts,
    setSavedCarts,
    promoCode,
    setPromoCode,
    promoDiscount,
    setPromoDiscount,
    isLoading,
  };
};
