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
        <h1 className="text-3xl font-bold mb-8">Your Order History</h1>

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
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getOrderStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status.replace("_", " ").toUpperCase()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Link
                        to={`/order/${order.id}`}
                        className="text-primary hover:underline"
                      >
                        View Details
                      </Link>
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
