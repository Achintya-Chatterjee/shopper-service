import { useState } from "react";
import { useForm } from "react-hook-form";
import { PaymentMethod } from "@/types/Index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CreditCard, Banknote, Building2 } from "lucide-react";

interface PaymentFormProps {
  initialPayment?: PaymentMethod;
  onSubmit: (data: PaymentMethod) => void;
  onCancel?: () => void;
}

interface CreditCardFormValues {
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface PayPalFormValues {
  paypalEmail: string;
}

interface BankTransferFormValues {
  accountName: string;
  accountNumber: string;
  routingNumber: string;
  bankName: string;
}

export function PaymentForm({
  initialPayment,
  onSubmit,
  onCancel,
}: PaymentFormProps) {
  const [paymentType, setPaymentType] = useState<PaymentMethod["type"]>(
    initialPayment?.type || "credit_card"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const creditCardForm = useForm<CreditCardFormValues>({
    defaultValues: {
      cardholderName: initialPayment?.details.cardholderName || "",
      cardNumber: "",
      expiryDate: initialPayment?.details.expiryDate || "",
      cvv: "",
    },
  });

  const paypalForm = useForm<PayPalFormValues>({
    defaultValues: {
      paypalEmail: initialPayment?.details.paypalEmail || "",
    },
  });

  const bankTransferForm = useForm<BankTransferFormValues>({
    defaultValues: {
      accountName: "",
      accountNumber: initialPayment?.details.accountNumber || "",
      routingNumber: initialPayment?.details.routingNumber || "",
      bankName: "",
    },
  });

  const handleCreditCardSubmit = (data: CreditCardFormValues) => {
    setIsSubmitting(true);
    try {
      const maskedCardNumber = `•••• •••• •••• ${data.cardNumber.slice(-4)}`;

      onSubmit({
        id: initialPayment?.id || "",
        type: "credit_card",
        details: {
          cardholderName: data.cardholderName,
          cardNumber: maskedCardNumber,
          expiryDate: data.expiryDate,
          cvv: data.cvv,
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePayPalSubmit = (data: PayPalFormValues) => {
    setIsSubmitting(true);
    try {
      onSubmit({
        id: initialPayment?.id || "",
        type: "paypal",
        details: {
          paypalEmail: data.paypalEmail,
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBankTransferSubmit = (data: BankTransferFormValues) => {
    setIsSubmitting(true);
    try {
      onSubmit({
        id: initialPayment?.id || "",
        type: "bank_transfer",
        details: {
          accountNumber: data.accountNumber,
          routingNumber: data.routingNumber,
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Tabs
      defaultValue={paymentType}
      onValueChange={(value) => setPaymentType(value as PaymentMethod["type"])}
    >
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="credit_card" className="flex items-center gap-2">
          <CreditCard className="h-4 w-4" />
          <span className="hidden sm:inline">Credit Card</span>
        </TabsTrigger>
        <TabsTrigger value="paypal" className="flex items-center gap-2">
          <Banknote className="h-4 w-4" />
          <span className="hidden sm:inline">PayPal</span>
        </TabsTrigger>
        <TabsTrigger value="bank_transfer" className="flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          <span className="hidden sm:inline">Bank</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="credit_card">
        <Card>
          <CardContent className="pt-4">
            <Form {...creditCardForm}>
              <form
                onSubmit={creditCardForm.handleSubmit(handleCreditCardSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={creditCardForm.control}
                  name="cardholderName"
                  rules={{ required: "Cardholder name is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cardholder Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={creditCardForm.control}
                  name="cardNumber"
                  rules={{
                    required: "Card number is required",
                    pattern: {
                      value: /^[0-9]{16}$/,
                      message: "Please enter a valid 16-digit card number",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <Input placeholder="1234 5678 9012 3456" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={creditCardForm.control}
                    name="expiryDate"
                    rules={{
                      required: "Expiry date is required",
                      pattern: {
                        value: /^(0[1-9]|1[0-2])\/[0-9]{2}$/,
                        message: "Please use MM/YY format",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl>
                          <Input placeholder="MM/YY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={creditCardForm.control}
                    name="cvv"
                    rules={{
                      required: "CVV is required",
                      pattern: {
                        value: /^[0-9]{3,4}$/,
                        message: "CVV must be 3 or 4 digits",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVV</FormLabel>
                        <FormControl>
                          <Input placeholder="123" type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  {onCancel && (
                    <Button type="button" variant="outline" onClick={onCancel}>
                      Cancel
                    </Button>
                  )}
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Card"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="paypal">
        <Card>
          <CardContent className="pt-4">
            <Form {...paypalForm}>
              <form
                onSubmit={paypalForm.handleSubmit(handlePayPalSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={paypalForm.control}
                  name="paypalEmail"
                  rules={{
                    required: "PayPal email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PayPal Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-2 pt-2">
                  {onCancel && (
                    <Button type="button" variant="outline" onClick={onCancel}>
                      Cancel
                    </Button>
                  )}
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save PayPal"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="bank_transfer">
        <Card>
          <CardContent className="pt-4">
            <Form {...bankTransferForm}>
              <form
                onSubmit={bankTransferForm.handleSubmit(
                  handleBankTransferSubmit
                )}
                className="space-y-4"
              >
                <FormField
                  control={bankTransferForm.control}
                  name="accountName"
                  rules={{ required: "Account name is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={bankTransferForm.control}
                    name="accountNumber"
                    rules={{
                      required: "Account number is required",
                      pattern: {
                        value: /^[0-9]{8,17}$/,
                        message: "Please enter a valid account number",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Number</FormLabel>
                        <FormControl>
                          <Input placeholder="12345678" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={bankTransferForm.control}
                    name="routingNumber"
                    rules={{
                      required: "Routing number is required",
                      pattern: {
                        value: /^[0-9]{9}$/,
                        message: "Please enter a valid 9-digit routing number",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Routing Number</FormLabel>
                        <FormControl>
                          <Input placeholder="123456789" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={bankTransferForm.control}
                  name="bankName"
                  rules={{ required: "Bank name is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Bank of America" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-2 pt-2">
                  {onCancel && (
                    <Button type="button" variant="outline" onClick={onCancel}>
                      Cancel
                    </Button>
                  )}
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Bank Account"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
