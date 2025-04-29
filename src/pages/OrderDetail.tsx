import { useParams, Link } from "react-router-dom";
import { orders } from "@/data/orders";
import { serviceProviders, getProviderById } from "@/data/providers";
import { Header } from "@/components/Header";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getOrderStatusColor } from "@/data/orders";
import { Clock, MapPin, CreditCard } from "lucide-react";
import { Order } from "@/types/Index";

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const order = orders.find((o) => o.id === id);

  const getPaymentMethodDisplay = (order: Order) => {
    if (!order.paymentMethod) return "Not specified";

    switch (order.paymentMethod.type) {
      case "credit_card":
        return `Credit Card ${order.paymentMethod.details.cardNumber || ""}`;
      case "paypal":
        return `PayPal (${order.paymentMethod.details.paypalEmail || ""})`;
      case "bank_transfer":
        return "Bank Transfer";
      case "cash":
        return "Cash on Delivery";
      default:
        return order.paymentMethod.type;
    }
  };

  if (!order) {
    return (
      <div>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">Order not found</h1>
          <p className="mb-6">The order you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/orders">Return to Order History</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Order Details</h1>
            <p className="text-muted-foreground">
              Order {order.id} • Placed on{" "}
              {format(new Date(order.orderDate), "MMMM d, yyyy")}
            </p>
          </div>
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getOrderStatusColor(
              order.status
            )}`}
          >
            {order.status.replace("_", " ").toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {order.items.map((item) => {
                    const provider = getProviderById(item.providerId);
                    return (
                      <div
                        key={item.serviceId}
                        className="flex justify-between p-4 border rounded-md"
                      >
                        <div>
                          <h3 className="font-medium">{item.serviceName}</h3>
                          <div className="text-sm text-muted-foreground">
                            Quantity: {item.quantity}
                          </div>
                          {provider && (
                            <Link
                              to={`/provider/${provider.id}`}
                              className="text-sm text-primary hover:underline"
                            >
                              Provided by: {provider.name}
                            </Link>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {formatCurrency(item.price * item.quantity)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {formatCurrency(item.price)} each
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>
                      {formatCurrency(
                        order.items.reduce(
                          (acc, item) => acc + item.price * item.quantity,
                          0
                        )
                      )}
                    </span>
                  </div>

                  {order.promoDiscount && order.promoCode && (
                    <div className="flex justify-between text-green-600">
                      <span>Promo: {order.promoCode}</span>
                      <span>-{formatCurrency(order.promoDiscount)}</span>
                    </div>
                  )}

                  <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span>{formatCurrency(order.total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Shipping Address</h4>
                    <div className="text-sm text-muted-foreground">
                      <p>{order.shippingAddress.fullName}</p>
                      <p>{order.shippingAddress.email}</p>
                      <p>{order.shippingAddress.address}</p>
                      <p>
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state}{" "}
                        {order.shippingAddress.zipCode}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Order Date</h4>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(order.orderDate), "MMMM d, yyyy")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CreditCard className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Payment Method</h4>
                    <p className="text-sm text-muted-foreground">
                      {getPaymentMethodDisplay(order)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6">
              <Button asChild variant="outline" className="w-full">
                <Link to="/orders">Back to Order History</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
