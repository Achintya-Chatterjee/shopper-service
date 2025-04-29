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
    estimatedDeliveryDate: new Date("2024-03-30"),
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
    trackingInfo: {
      currentStatus: "completed",
      statusUpdates: [
        {
          status: "pending",
          timestamp: new Date("2024-03-15T10:30:00"),
          message: "Order received",
        },
        {
          status: "confirmed",
          timestamp: new Date("2024-03-16T09:15:00"),
          message: "Order confirmed",
        },
        {
          status: "in_progress",
          timestamp: new Date("2024-03-18T14:20:00"),
          message: "Service in progress",
        },
        {
          status: "completed",
          timestamp: new Date("2024-03-28T16:45:00"),
          message: "Service completed",
        },
      ],
    },
    feedback: {
      overallRating: 5,
      overallComment: "Great service, very professional!",
      itemRatings: [
        {
          serviceId: "service-1",
          rating: 5,
          comment: "Excellent work on my website. Very satisfied!",
        },
      ],
      submittedAt: new Date("2024-03-29T12:30:00"),
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
    scheduledDate: new Date("2024-04-15"),
    scheduledTime: "10:00 AM",
    estimatedDeliveryDate: new Date("2024-04-20"),
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
    trackingInfo: {
      currentStatus: "in_progress",
      statusUpdates: [
        {
          status: "pending",
          timestamp: new Date("2024-04-01T15:20:00"),
          message: "Order received",
        },
        {
          status: "confirmed",
          timestamp: new Date("2024-04-02T09:45:00"),
          message: "Order confirmed",
        },
        {
          status: "in_progress",
          timestamp: new Date("2024-04-10T11:30:00"),
          message: "Service in progress",
        },
      ],
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
    estimatedDeliveryDate: new Date("2024-05-05"),
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
    trackingInfo: {
      currentStatus: "confirmed",
      statusUpdates: [
        {
          status: "pending",
          timestamp: new Date("2024-04-20T16:40:00"),
          message: "Order received",
        },
        {
          status: "confirmed",
          timestamp: new Date("2024-04-21T10:15:00"),
          message: "Order confirmed and scheduled",
        },
      ],
    },
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
