import { Order, OrderStatus, PaymentMethod } from "@/types/Index";

// Mock orders data
export const orders: Order[] = [
  {
    id: "order-1",
    userId: "user-1",
    items: [
      {
        serviceId: "service-1",
        serviceName: "Website Development",
        quantity: 1,
        price: 1200,
        providerId: "provider-1",
        providerName: "TechNova Solutions",
      },
    ],
    orderDate: new Date("2024-03-15"),
    total: 1200,
    status: "completed",
    shippingAddress: {
      fullName: "John Doe",
      email: "john@example.com",
      address: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
    },
    paymentMethod: {
      id: "pm-1",
      type: "credit_card",
      details: {
        cardNumber: "•••• •••• •••• 4242",
      },
    },
  },
  {
    id: "order-2",
    userId: "user-1",
    items: [
      {
        serviceId: "service-3",
        serviceName: "SEO Optimization",
        quantity: 1,
        price: 800,
        providerId: "provider-2",
        providerName: "Digital Boost Agency",
      },
    ],
    orderDate: new Date("2024-04-01"),
    total: 800,
    status: "in_progress",
    shippingAddress: {
      fullName: "John Doe",
      email: "john@example.com",
      address: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
    },
    paymentMethod: {
      id: "pm-2",
      type: "paypal",
      details: {
        paypalEmail: "john@example.com",
      },
    },
  },
  {
    id: "order-3",
    userId: "user-1",
    items: [
      {
        serviceId: "service-5",
        serviceName: "Social Media Management",
        quantity: 3,
        price: 900,
        providerId: "provider-3",
        providerName: "SocialGenius Marketing",
      },
      {
        serviceId: "service-6",
        serviceName: "Content Creation",
        quantity: 1,
        price: 600,
        providerId: "provider-3",
        providerName: "SocialGenius Marketing",
      },
    ],
    orderDate: new Date("2024-04-20"),
    total: 1500,
    status: "confirmed",
    shippingAddress: {
      fullName: "John Doe",
      email: "john@example.com",
      address: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
    },
    paymentMethod: {
      id: "pm-3",
      type: "credit_card",
      details: {
        cardNumber: "•••• •••• •••• 1234",
      },
    },
    promoCode: "SPRING20",
    promoDiscount: 300,
  },
];

// Helper function to get order status badge color
export const getOrderStatusColor = (status: OrderStatus): string => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "confirmed":
      return "bg-blue-100 text-blue-800";
    case "in_progress":
      return "bg-purple-100 text-purple-800";
    case "completed":
      return "bg-green-100 text-green-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
