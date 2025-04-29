import { useState, useEffect } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { orders } from "@/data/orders";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, ShoppingCart } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/context/cart";
import { toast } from "@/components/ui/sonner";
import { OrderItem } from "@/types/Index";

const ReOrder = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const orderFromState = location.state?.order;
  const orderFromData = orders.find((o) => o.id === id);
  const order = orderFromState || orderFromData;

  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(
    {}
  );
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    if (order) {
      const initialSelectedItems: Record<string, boolean> = {};
      const initialQuantities: Record<string, number> = {};

      order.items.forEach((item) => {
        initialSelectedItems[item.serviceId] = true;
        initialQuantities[item.serviceId] = item.quantity;
      });

      setSelectedItems(initialSelectedItems);
      setQuantities(initialQuantities);
    }
  }, [order]);

  if (!order) {
    return (
      <div>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">Order not found</h1>
          <p className="mb-6">
            The order you're trying to reorder doesn't exist.
          </p>
          <Button asChild>
            <Link to="/orders">Return to Order History</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleItemSelection = (serviceId: string, checked: boolean) => {
    setSelectedItems((prev) => ({
      ...prev,
      [serviceId]: checked,
    }));
  };

  const handleQuantityChange = (serviceId: string, value: string) => {
    const quantity = parseInt(value);
    if (!isNaN(quantity) && quantity > 0) {
      setQuantities((prev) => ({
        ...prev,
        [serviceId]: quantity,
      }));
    }
  };

  const handleAddToCart = () => {
    const itemsToAdd: OrderItem[] = order.items.filter(
      (item) => selectedItems[item.serviceId]
    );

    if (itemsToAdd.length === 0) {
      toast.error("Please select at least one item to add to your cart");
      return;
    }

    itemsToAdd.forEach((item) => {
      const quantity = quantities[item.serviceId] || item.quantity;
      const service = {
        id: item.serviceId,
        name: item.serviceName,
        price: item.price,
        providerId: item.providerId,

        description: "",
        category: "",
        rating: 0,
        reviews: [],
        availability: [],
      };

      for (let i = 0; i < quantity; i++) {
        addToCart(service);
      }
    });

    toast.success("Items added to cart");
    navigate("/checkout");
  };

  const calculateTotal = () => {
    return order.items.reduce((total, item) => {
      if (selectedItems[item.serviceId]) {
        return (
          total + item.price * (quantities[item.serviceId] || item.quantity)
        );
      }
      return total;
    }, 0);
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to={`/order/${id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Order Details
          </Link>
        </Button>

        <h1 className="text-3xl font-bold mb-2">Reorder Items</h1>
        <p className="text-muted-foreground mb-8">
          Select the items you want to reorder
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Items from Order {order.id}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.serviceId}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-md"
                    >
                      <div className="flex items-start gap-3 mb-3 sm:mb-0">
                        <Checkbox
                          id={`select-${item.serviceId}`}
                          checked={selectedItems[item.serviceId] || false}
                          onCheckedChange={(checked) =>
                            handleItemSelection(item.serviceId, !!checked)
                          }
                        />
                        <div>
                          <Label
                            htmlFor={`select-${item.serviceId}`}
                            className="font-medium"
                          >
                            {item.serviceName}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Provided by: {item.providerName}
                          </p>
                          <p className="text-sm font-medium">
                            {formatCurrency(item.price)} each
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Label
                          htmlFor={`quantity-${item.serviceId}`}
                          className="text-sm whitespace-nowrap"
                        >
                          Quantity:
                        </Label>
                        <Input
                          id={`quantity-${item.serviceId}`}
                          type="number"
                          min="1"
                          className="w-20"
                          value={quantities[item.serviceId] || item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(item.serviceId, e.target.value)
                          }
                          disabled={!selectedItems[item.serviceId]}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) =>
                    selectedItems[item.serviceId] ? (
                      <div
                        key={item.serviceId}
                        className="flex justify-between"
                      >
                        <span className="text-sm">
                          {item.serviceName} x
                          {quantities[item.serviceId] || item.quantity}
                        </span>
                        <span>
                          {formatCurrency(
                            item.price *
                              (quantities[item.serviceId] || item.quantity)
                          )}
                        </span>
                      </div>
                    ) : null
                  )}

                  <div className="pt-4 border-t">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>{formatCurrency(calculateTotal())}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button
                  className="w-full flex items-center gap-2"
                  onClick={handleAddToCart}
                  disabled={Object.values(selectedItems).every(
                    (value) => !value
                  )}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/orders">Cancel</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReOrder;
