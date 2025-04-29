import { useState } from "react";
import { PaymentMethod } from "@/types/Index";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  PlusCircle,
  Check,
  CreditCard,
  Banknote,
  Building2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PaymentForm } from "./PaymentForm";

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: "1",
    type: "credit_card",
    details: {
      cardNumber: "•••• •••• •••• 4242",
      cardholderName: "John Doe",
      expiryDate: "12/25",
    },
    isDefault: true,
  },
  {
    id: "2",
    type: "paypal",
    details: {
      paypalEmail: "john@example.com",
    },
    isDefault: false,
  },
];

interface PaymentMethodsProps {
  onSelectPayment: (payment: PaymentMethod) => void;
  selectedPaymentId?: string;
}

export function PaymentMethods({
  onSelectPayment,
  selectedPaymentId,
}: PaymentMethodsProps) {
  const [paymentMethods, setPaymentMethods] =
    useState<PaymentMethod[]>(mockPaymentMethods);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleNewPayment = (payment: PaymentMethod) => {
    const newPayment = {
      ...payment,
      id: `new-${Date.now()}`,
      isDefault: paymentMethods.length === 0,
    };

    const updatedPayments = [...paymentMethods, newPayment];
    setPaymentMethods(updatedPayments);
    onSelectPayment(newPayment);
    setIsAddingNew(false);
  };

  const handleSelectPayment = (payment: PaymentMethod) => {
    onSelectPayment(payment);
  };

  const handleSetDefault = (id: string) => {
    const updatedPayments = paymentMethods.map((payment) => ({
      ...payment,
      isDefault: payment.id === id,
    }));
    setPaymentMethods(updatedPayments);
  };

  const getPaymentIcon = (type: PaymentMethod["type"]) => {
    switch (type) {
      case "credit_card":
        return <CreditCard className="h-5 w-5" />;
      case "paypal":
        return <Banknote className="h-5 w-5" />;
      case "bank_transfer":
        return <Building2 className="h-5 w-5" />;
      default:
        return <CreditCard className="h-5 w-5" />;
    }
  };

  const getPaymentLabel = (payment: PaymentMethod) => {
    switch (payment.type) {
      case "credit_card":
        return `${payment.details.cardNumber} (Expires: ${payment.details.expiryDate})`;
      case "paypal":
        return `PayPal (${payment.details.paypalEmail})`;
      case "bank_transfer":
        return `Bank Account ending in ${payment.details.accountNumber?.slice(
          -4
        )}`;
      case "cash":
        return "Cash on delivery";
      default:
        return "Unknown payment method";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Payment Methods</h3>
        <Dialog open={isAddingNew} onOpenChange={setIsAddingNew}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add New Payment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Payment Method</DialogTitle>
            </DialogHeader>
            <PaymentForm
              onSubmit={handleNewPayment}
              onCancel={() => setIsAddingNew(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paymentMethods.map((payment) => (
          <Card
            key={payment.id}
            className={`cursor-pointer border ${
              selectedPaymentId === payment.id ? "border-primary" : ""
            }`}
            onClick={() => handleSelectPayment(payment)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between">
                <div className="flex items-center">
                  {getPaymentIcon(payment.type)}
                  <h4 className="font-medium ml-2 capitalize">
                    {payment.type.replace("_", " ")}
                  </h4>
                  {payment.isDefault && (
                    <span className="ml-2 bg-muted px-2 py-0.5 rounded-full text-xs">
                      Default
                    </span>
                  )}
                </div>
                {selectedPaymentId === payment.id && (
                  <Check className="h-5 w-5 text-primary" />
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {getPaymentLabel(payment)}
              </p>
              {!payment.isDefault && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSetDefault(payment.id);
                  }}
                >
                  Set as default
                </Button>
              )}
            </CardContent>
          </Card>
        ))}

        {/* Cash option */}
        <Card
          className={`cursor-pointer border ${
            selectedPaymentId === "cash" ? "border-primary" : ""
          }`}
          onClick={() =>
            onSelectPayment({
              id: "cash",
              type: "cash",
              details: {},
            })
          }
        >
          <CardContent className="p-4">
            <div className="flex justify-between">
              <div className="flex items-center">
                <CreditCard className="h-5 w-5" />
                <h4 className="font-medium ml-2">Cash on Delivery</h4>
              </div>
              {selectedPaymentId === "cash" && (
                <Check className="h-5 w-5 text-primary" />
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Pay when service is delivered
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
