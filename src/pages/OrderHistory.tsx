import { useState } from "react";
import { Header } from "@/components/Header";
import { orders, getOrderStatusColor } from "@/data/orders";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order, OrderStatus } from "@/types/Index";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  Info,
  MessageSquare,
  RotateCw,
  Settings,
  TruckIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const OrderHistory = () => {
  const [filter, setFilter] = useState<OrderStatus | "all">("all");

  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((order) => order.status === filter);

  return (
    <div>
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-3xl font-bold">Your Order History</h1>

          <div className="flex gap-3">
            <Button
              asChild
              variant="outline"
              className="flex items-center gap-1"
            >
              <Link to="/notifications">
                <Settings className="h-4 w-4" /> Notification Settings
              </Link>
            </Button>
            <Button asChild className="flex items-center gap-1">
              <Link to="/loyalty">
                <Award className="h-4 w-4" /> Loyalty Program
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <h3 className="text-2xl font-bold">{orders.length}</h3>
                </div>
                <Info className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Orders</p>
                  <h3 className="text-2xl font-bold">
                    {
                      orders.filter(
                        (o) =>
                          o.status !== "completed" && o.status !== "cancelled"
                      ).length
                    }
                  </h3>
                </div>
                <TruckIcon className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Loyalty Points
                  </p>
                  <h3 className="text-2xl font-bold">750</h3>
                </div>
                <Award className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all" onClick={() => setFilter("all")}>
              All Orders
            </TabsTrigger>
            <TabsTrigger
              value="in_progress"
              onClick={() => setFilter("in_progress")}
            >
              In Progress
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              onClick={() => setFilter("completed")}
            >
              Completed
            </TabsTrigger>
            <TabsTrigger
              value="cancelled"
              onClick={() => setFilter("cancelled")}
            >
              Cancelled
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">No orders found</h2>
            <p className="text-muted-foreground mb-6">
              {filter === "all"
                ? "You haven't placed any orders yet."
                : `You don't have any ${filter} orders.`}
            </p>
            <Button asChild>
              <Link to="/">Browse Services</Link>
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      {format(new Date(order.orderDate), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      {order.items.map((item, index) => (
                        <div
                          key={`${order.id}-${item.serviceId}`}
                          className={index !== 0 ? "mt-2" : ""}
                        >
                          {item.serviceName} x{item.quantity}
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>{formatCurrency(order.total)}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`${getOrderStatusColor(order.status)}`}
                      >
                        {order.status.replace("_", " ").toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap items-center gap-2">
                        <Button asChild size="sm" variant="ghost">
                          <Link to={`/order/${order.id}`}>
                            <Info className="h-3 w-3 mr-1" /> Details
                          </Link>
                        </Button>

                        {order.status !== "cancelled" && (
                          <Button asChild size="sm" variant="ghost">
                            <Link to={`/order-tracking/${order.id}`}>
                              <TruckIcon className="h-3 w-3 mr-1" /> Track
                            </Link>
                          </Button>
                        )}

                        {order.status === "completed" && (
                          <Button asChild size="sm" variant="ghost">
                            <Link to={`/feedback/${order.id}`}>
                              <MessageSquare className="h-3 w-3 mr-1" />{" "}
                              Feedback
                            </Link>
                          </Button>
                        )}

                        <Button asChild size="sm" variant="ghost">
                          <Link to={`/reorder/${order.id}`} state={{ order }}>
                            <RotateCw className="h-3 w-3 mr-1" /> Reorder
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
