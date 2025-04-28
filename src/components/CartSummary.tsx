import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

export function CartSummary() {
  const { getCartTotal, getCartItemCount } = useCart();

  const cartTotal = getCartTotal();
  const itemCount = getCartItemCount();

  if (itemCount === 0) {
    return (
      <div className="text-center py-8">
        <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-2 text-lg font-medium">Your cart is empty</h3>
        <p className="text-muted-foreground">
          Add some services to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-base">
        <p>Subtotal</p>
        <p className="font-medium">{formatCurrency(cartTotal)}</p>
      </div>
      <div className="border-t pt-4">
        <div className="flex items-center justify-between text-base font-medium">
          <p>Total</p>
          <p>{formatCurrency(cartTotal)}</p>
        </div>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Taxes calculated at checkout
        </p>
      </div>
      <Button asChild className="w-full">
        <Link to="/checkout">Proceed to Checkout</Link>
      </Button>
    </div>
  );
}
