import { CartItem, SavedCart } from "@/types/Index";
import { Json } from "@/integrations/supabase/types";
import { generateShareableCartId } from "@/lib/utils";
import {
  applyPromoCode as applyCodeToCart,
  calculateQuantityDiscounts,
} from "@/lib/cart";
import { supabase } from "@/integrations/supabase/client";

// Re-export calculateQuantityDiscounts from @/lib/cart
export { calculateQuantityDiscounts };

// Local storage keys
export const CURRENT_CART_KEY = "current_cart";

// Transform database cart to app cart format
export const transformDbCartToAppCart = (dbCart: any): SavedCart => ({
  id: dbCart.id,
  name: dbCart.name,
  items: dbCart.items as unknown as CartItem[],
  savedAt: new Date(dbCart.created_at),
  promoCode: null,
  promoDiscount: 0,
});

// Save cart to local storage
export const saveCartToLocalStorage = (
  cartItems: CartItem[],
  promoCode: string | null,
  promoDiscount: number
) => {
  try {
    localStorage.setItem(
      CURRENT_CART_KEY,
      JSON.stringify({
        cartItems,
        promoCode,
        promoDiscount,
      })
    );
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};

// Load cart from local storage
export const loadCartFromLocalStorage = () => {
  try {
    const savedCartData = localStorage.getItem(CURRENT_CART_KEY);
    if (savedCartData) {
      return JSON.parse(savedCartData);
    }
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
  }
  return { cartItems: [], promoCode: null, promoDiscount: 0 };
};

// Create local saved cart
export const createLocalSavedCart = (
  cartItems: CartItem[],
  promoCode: string | null,
  promoDiscount: number,
  cartName: string
): SavedCart => {
  return {
    id: generateShareableCartId(),
    name: cartName,
    items: [...cartItems],
    savedAt: new Date(),
    promoCode,
    promoDiscount,
  };
};

// Apply promo code with proper result handling
export const handlePromoCode = (code: string, cartTotal: number) => {
  const result = applyCodeToCart(code, cartTotal);
  return result;
};

// Database operations
export const saveCartToDatabase = async (
  userId: string,
  cartName: string,
  cartItems: CartItem[]
) => {
  const { data, error } = await supabase
    .from("saved_carts")
    .insert({
      user_id: userId,
      name: cartName,
      items: cartItems as unknown as Json,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const shareCartToDatabase = async (
  userId: string,
  cartItems: CartItem[],
  promoCode: string | null,
  promoDiscount: number
) => {
  const { data, error } = await supabase
    .from("shared_carts")
    .insert({
      creator_id: userId,
      items: cartItems as unknown as Json,
      promo_code: promoCode,
      promo_discount: promoDiscount,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const fetchSavedCartsFromDatabase = async (userId: string) => {
  const { data, error } = await supabase
    .from("saved_carts")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};

export const fetchSharedCartFromDatabase = async (cartId: string) => {
  const { data, error } = await supabase
    .from("shared_carts")
    .select("*")
    .eq("id", cartId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};
