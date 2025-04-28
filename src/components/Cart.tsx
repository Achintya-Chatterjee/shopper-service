import { useCart } from "@/context/CartContext";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ShoppingBag } from "lucide-react";

export function Cart() {
  const { cartItems, getCartItemCount, clearCart } = useCart();
  const itemCount = getCartItemCount();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingBag className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh] flex flex-col">
        <DrawerHeader>
          <DrawerTitle>Shopping Cart</DrawerTitle>
          <DrawerDescription>
            {itemCount === 0
              ? "Your cart is empty"
              : `You have ${itemCount} ${
                  itemCount === 1 ? "item" : "items"
                } in your cart`}
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto px-4">
          {cartItems.map((item) => (
            <CartItem key={item.service.id} item={item} />
          ))}
        </div>
        <div className="p-4">
          <CartSummary />
        </div>
        <DrawerFooter className="flex flex-row justify-between pt-2">
          {itemCount > 0 && (
            <Button variant="outline" onClick={clearCart}>
              Clear Cart
            </Button>
          )}
          <DrawerClose asChild>
            <Button variant="outline">Continue Shopping</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
