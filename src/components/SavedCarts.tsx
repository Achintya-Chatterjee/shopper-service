import { useCart } from "@/context/CartContext";
import { SavedCart } from "@/types/Index";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { ShoppingBag } from "lucide-react";

export function SavedCarts() {
  const { getSavedCarts, loadSavedCart } = useCart();
  const savedCarts = getSavedCarts();

  if (savedCarts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">Saved Carts</h3>
      <div className="space-y-2 max-h-[200px] overflow-y-auto">
        {savedCarts.map((cart) => (
          <SavedCartItem key={cart.id} cart={cart} onLoad={loadSavedCart} />
        ))}
      </div>
    </div>
  );
}

interface SavedCartItemProps {
  cart: SavedCart;
  onLoad: (id: string) => void;
}

function SavedCartItem({ cart, onLoad }: SavedCartItemProps) {
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="border rounded p-2 flex items-center justify-between">
      <div>
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm font-medium">{cart.name}</p>
        </div>
        <div className="flex gap-2 text-xs text-muted-foreground">
          <span>
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </span>
          <span>•</span>
          <span>
            {formatDistanceToNow(new Date(cart.savedAt), { addSuffix: true })}
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="h-8 text-xs"
        onClick={() => onLoad(cart.id)}
      >
        Load
      </Button>
    </div>
  );
}
