import { useState } from "react";
import { useForm } from "react-hook-form";
import { Address, PaymentMethod, ServiceCustomization } from "@/types/Index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { useCart } from "@/context/cart";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SavedAddresses } from "./SavedAddresses";
import { PaymentMethods } from "./PaymentMethods";
import { ServiceScheduling } from "./ServiceScheduling";
import { ServiceCustomization as ServiceCustomizationComponent } from "./ServiceCustomization";
import { ServiceAreaValidation } from "./ServiceAreaValidation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function CheckoutForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(
    null
  );
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(
    undefined
  );
  const [scheduledTime, setScheduledTime] = useState<string | undefined>(
    undefined
  );
  const [customizations, setCustomizations] = useState<ServiceCustomization[]>(
    []
  );
  const [isServiceAreaValid, setIsServiceAreaValid] = useState<boolean>(true);
  const { clearCart, cartItems } = useCart();
  const navigate = useNavigate();

  const form = useForm<Address>({
    defaultValues: {
      fullName: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  const onSubmit = async (data: Address) => {
    const addressToUse = selectedAddress || data;

    if (!selectedPayment) {
      toast.error("Please select a payment method.");
      return;
    }

    if (!isServiceAreaValid) {
      toast.error("Service is not available in your area.");
      return;
    }

    if (
      cartItems.some(
        (item) =>
          item.service.availability && item.service.availability.length > 0
      ) &&
      (!scheduledDate || !scheduledTime)
    ) {
      toast.error("Please schedule your appointment.");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Order placed:", {
        address: addressToUse,
        paymentMethod: selectedPayment,
        scheduledDate,
        scheduledTime,
        customizations,
      });

      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Order placed successfully!");
      clearCart();
      navigate("/");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddressSelect = (address: Address) => {
    setSelectedAddress(address);

    Object.entries(address).forEach(([key, value]) => {
      if (key !== "id" && key !== "isDefault" && key !== "userId") {
        form.setValue(key as keyof Address, value);
      }
    });
  };

  const handlePaymentSelect = (payment: PaymentMethod) => {
    setSelectedPayment(payment);
  };

  const handleScheduleSelect = (date: Date, time: string) => {
    setScheduledDate(date);
    setScheduledTime(time);
  };

  const handleCustomizationChange = (
    updatedCustomizations: ServiceCustomization[]
  ) => {
    setCustomizations(updatedCustomizations);
  };

  const handleServiceAreaValidation = (isValid: boolean) => {
    setIsServiceAreaValid(isValid);
  };

  const hasCustomizableServices = cartItems.some(
    (item) =>
      item.service.category === "Cleaning" ||
      item.service.category === "Home Improvement" ||
      item.service.category === "Personal Care"
  );

  return (
    <div>
      <Accordion
        type="single"
        collapsible
        defaultValue="address"
        className="w-full"
      >
        <AccordionItem value="address">
          <AccordionTrigger>Shipping Information</AccordionTrigger>
          <AccordionContent>
            <div className="mb-6">
              <SavedAddresses
                onSelectAddress={handleAddressSelect}
                selectedAddressId={selectedAddress?.id}
              />
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  rules={{ required: "Full name is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  rules={{ required: "Address is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    rules={{ required: "City is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your city" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    rules={{ required: "State is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your state" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="zipCode"
                  rules={{ required: "Zip code is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your zip code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="payment">
          <AccordionTrigger>Payment Method</AccordionTrigger>
          <AccordionContent>
            <PaymentMethods
              onSelectPayment={handlePaymentSelect}
              selectedPaymentId={selectedPayment?.id}
            />
          </AccordionContent>
        </AccordionItem>

        {hasCustomizableServices && (
          <AccordionItem value="customization">
            <AccordionTrigger>Customize Services</AccordionTrigger>
            <AccordionContent>
              <ServiceCustomizationComponent
                serviceId={cartItems[0].service.id}
                onCustomizationChange={handleCustomizationChange}
              />
            </AccordionContent>
          </AccordionItem>
        )}

        <AccordionItem value="scheduling">
          <AccordionTrigger>Schedule Services</AccordionTrigger>
          <AccordionContent>
            <ServiceScheduling
              onScheduleSelect={handleScheduleSelect}
              selectedDate={scheduledDate}
              selectedTime={scheduledTime}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="serviceArea">
          <AccordionTrigger>Service Area Validation</AccordionTrigger>
          <AccordionContent>
            <ServiceAreaValidation
              zipCode={form.watch("zipCode") || ""}
              providerId={
                cartItems.length > 0
                  ? cartItems[0].service.providerId
                  : undefined
              }
              onValidationChange={handleServiceAreaValidation}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-6">
        <Button
          onClick={form.handleSubmit(onSubmit)}
          className="w-full"
          disabled={isSubmitting || !isServiceAreaValid}
        >
          {isSubmitting ? "Processing..." : "Complete Order"}
        </Button>
      </div>
    </div>
  );
}
