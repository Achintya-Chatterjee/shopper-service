import { useCart } from "@/context/cart";
import { SavedCart } from "@/types/Index";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { ShoppingBag, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

export function SavedCarts() {
  const { getSavedCarts, loadSavedCart, isLoading, userId, savedCarts } =
    useCart();

  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (savedCarts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">
        Saved Carts {userId ? "(Synced to your account)" : ""}
      </h3>
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
  const { userId } = useCart();
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  const handleDelete = async () => {
    // Only authenticated users can delete from Supabase
    if (userId) {
      try {
        const { error } = await supabase
          .from("saved_carts")
          .delete()
          .eq("id", cart.id);

        if (error) throw error;

        toast.success("Cart deleted successfully");
        // We don't need to update the local state as the effect in CartContext will refetch
      } catch (error) {
        console.error("Error deleting saved cart:", error);
        toast.error("Failed to delete cart");
      }
    }
  };

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
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="h-8 text-xs"
          onClick={() => onLoad(cart.id)}
        >
          Load
        </Button>
        {userId && (
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs text-destructive hover:bg-destructive/10"
            onClick={handleDelete}
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
}
