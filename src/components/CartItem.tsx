import { CartItem as CartItemType } from "@/types/Index";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart";
import { Minus, Plus, Trash, FileText } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart, updateCartItemNotes } = useCart();
  const { service, quantity, notes, appliedDiscount } = item;
  const [showNotes, setShowNotes] = useState(false);

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateCartItemNotes(service.id, e.target.value);
  };

  const toggleNotes = () => {
    setShowNotes((prev) => !prev);
  };

  return (
    <div className="py-4 border-b">
      <div className="flex items-center justify-between">
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
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">
                {formatCurrency(service.price)}
              </p>
              {appliedDiscount ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                      Quantity Discount
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Discount of {formatCurrency(appliedDiscount)} per item
                      applied!
                    </p>
                  </TooltipContent>
                </Tooltip>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
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
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeFromCart(service.id)}
              className="text-destructive ml-2"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs flex items-center gap-1 h-6 px-2"
            onClick={toggleNotes}
          >
            <FileText className="h-3 w-3" />
            {notes ? "Edit Notes" : "Add Notes"}
          </Button>
        </div>
      </div>

      {showNotes && (
        <div className="mt-2">
          <Textarea
            placeholder="Add special instructions or notes for this item..."
            className="text-sm"
            value={notes || ""}
            onChange={handleNotesChange}
            rows={2}
          />
        </div>
      )}
    </div>
  );
}
