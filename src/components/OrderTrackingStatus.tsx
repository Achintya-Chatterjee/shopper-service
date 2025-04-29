import { OrderStatus } from "@/types/Index";
import { CheckCircle2, Clock, Package, Truck, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderTrackingStatusProps {
  status: OrderStatus;
}

export function OrderTrackingStatus({ status }: OrderTrackingStatusProps) {
  const steps = [
    {
      id: "pending",
      label: "Order Placed",
      icon: Clock,
      reached: ["pending", "confirmed", "in_progress", "completed"],
    },
    {
      id: "confirmed",
      label: "Order Confirmed",
      icon: CheckCircle2,
      reached: ["confirmed", "in_progress", "completed"],
    },
    {
      id: "in_progress",
      label: "In Progress",
      icon: Package,
      reached: ["in_progress", "completed"],
    },
    {
      id: "completed",
      label: "Completed",
      icon: Truck,
      reached: ["completed"],
    },
  ];

  return (
    <div className="py-4">
      {status === "cancelled" ? (
        <div className="flex flex-col items-center justify-center py-8">
          <XCircle className="h-16 w-16 text-red-500 mb-4" />
          <h3 className="text-xl font-medium mb-2">Order Cancelled</h3>
          <p className="text-muted-foreground text-center">
            This order has been cancelled. Contact support for more information.
          </p>
        </div>
      ) : (
        <div className="relative">
          <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 h-0.5 bg-muted w-full max-w-[80%] top-9 z-0"></div>
          <div className="flex justify-between relative z-10">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center mb-2",
                    step.reached.includes(status)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <step.icon className="h-5 w-5" />
                </div>
                <div
                  className={cn(
                    "text-xs sm:text-sm text-center max-w-[100px]",
                    step.reached.includes(status)
                      ? "font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
