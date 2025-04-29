import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { orders } from "@/data/orders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderTrackingStatus } from "@/components/OrderTrackingStatus";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";

const OrderTracking = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState(orders.find((o) => o.id === id));

  useEffect(() => {

    setOrder(orders.find((o) => o.id === id));
  }, [id]);

  if (!order) {
    return (
      <div>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">Order not found</h1>
          <p className="mb-6">
            The order you're trying to track doesn't exist.
          </p>
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
        <Button variant="ghost" asChild className="mb-6">
          <Link to={`/order/${id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Order Details
          </Link>
        </Button>

        <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
        <p className="text-muted-foreground mb-8">Order ID: {order.id}</p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Tracking Status</CardTitle>
              </CardHeader>
              <CardContent>
                <OrderTrackingStatus status={order.status} />
              </CardContent>
            </Card>

            {order.estimatedDeliveryDate && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Delivery Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 mb-4">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Estimated Delivery</p>
                      <p className="text-muted-foreground">
                        {format(
                          new Date(order.estimatedDeliveryDate),
                          "MMMM d, yyyy"
                        )}
                        {order.scheduledTime && ` at ${order.scheduledTime}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Delivery Address</p>
                      <p className="text-muted-foreground">
                        {order.shippingAddress.address},{" "}
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state}{" "}
                        {order.shippingAddress.zipCode}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.serviceId} className="flex justify-between">
                      <span className="text-sm">
                        {item.serviceName} x{item.quantity}
                      </span>
                      <span className="font-medium">
                        ${item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${order.total}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Button asChild className="w-full">
                    <Link to={`/feedback/${order.id}`}>Leave Feedback</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      (window.location.href = `mailto:support@shopperservice.com?subject=Help with Order ${order.id}`)
                    }
                  >
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
