import { createContext, useContext, useState, ReactNode } from "react";
import { CartItem, Service } from "@/types/Index";
import { toast } from "@/components/ui/sonner";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (service: Service) => void;
  removeFromCart: (serviceId: string) => void;
  updateQuantity: (serviceId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (service: Service) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.service.id === service.id
      );

      if (existingItem) {
        toast.success(`Added another ${service.name} to cart`);
        return prevItems.map((item) =>
          item.service.id === service.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast.success(`${service.name} added to cart`);
        return [...prevItems, { service, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (serviceId: string) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find(
        (item) => item.service.id === serviceId
      );
      if (itemToRemove) {
        toast.info(`${itemToRemove.service.name} removed from cart`);
      }
      return prevItems.filter((item) => item.service.id !== serviceId);
    });
  };

  const updateQuantity = (serviceId: string, quantity: number) => {
    if (quantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.service.id === serviceId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast.info("Cart cleared");
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.service.price * item.quantity,
      0
    );
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
