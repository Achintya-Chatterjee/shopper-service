import { CartItem as CartItemType } from "@/types/Index";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { service, quantity } = item;

  return (
    <div className="flex items-center justify-between py-4 border-b">
      <div className="flex items-start gap-4">
        <div className="h-16 w-16 rounded overflow-hidden">
          <img
            src={service.image}
            alt={service.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium">{service.name}</h3>
          <p className="text-sm text-muted-foreground">
            {formatCurrency(service.price)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-r-none"
            onClick={() => updateQuantity(service.id, quantity - 1)}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <div className="h-8 px-3 flex items-center justify-center border-y">
            {quantity}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-l-none"
            onClick={() => updateQuantity(service.id, quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeFromCart(service.id)}
          className="text-destructive"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
