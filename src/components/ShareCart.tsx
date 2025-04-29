import { useState } from "react";
import { useCart } from "@/context/cart";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function ShareCart() {
  const { shareCart, getCartItemCount } = useCart();
  const [shareableLink, setShareableLink] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleShareCart = async () => {
    try {
      const link = await shareCart();
      if (link) {
        setShareableLink(link);
        setDialogOpen(true);
      }
    } catch (error) {
      console.error("Error sharing cart:", error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareableLink);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          disabled={getCartItemCount() === 0}
          onClick={handleShareCart}
        >
          <Share className="h-4 w-4 mr-2" />
          Share Cart
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Your Cart</DialogTitle>
          <DialogDescription>
            Copy the link below to share your cart with others.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <Input value={shareableLink} readOnly onClick={copyToClipboard} />
          <Button onClick={copyToClipboard}>Copy</Button>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setDialogOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
