import { Service } from "@/types/Index";

export const categories = [
  "Development",
  "Design",
  "Marketing",
  "Content",
  "Business",
  "Support",
];

export const services: Service[] = [
  {
    id: "1",
    name: "Web Development",
    description:
      "Custom website design and development for your business needs",
    price: 1200,
    image: "/images/web-dev.jpg",
    category: "Development",
    rating: 4.8,
    reviews: [
      {
        id: "r1",
        userId: "u1",
        userName: "John Doe",
        rating: 5,
        comment: "Excellent service, delivered on time!",
        createdAt: new Date("2024-04-20"),
      },
    ],
    availability: [
      {
        id: "a1",
        date: new Date("2024-05-01"),
        startTime: "09:00",
        endTime: "17:00",
        isBooked: false,
      },
    ],
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "Native mobile applications for iOS and Android platforms",
    price: 2500,
    image: "/images/app-dev.jpg",
    category: "Development",
    rating: 4.6,
    reviews: [],
    availability: [],
  },
  {
    id: "3",
    name: "UI/UX Design",
    description:
      "User-centered design to enhance the user experience of your products",
    price: 800,
    image: "/images/ui-ux.png",
    category: "Design",
    rating: 4.9,
    reviews: [],
    availability: [],
  },
  {
    id: "4",
    name: "SEO Optimization",
    description: "Improve your website's visibility in search engines",
    price: 500,
    image: "/images/seo-optimisation.jpg",
    category: "Marketing",
    rating: 4.7,
    reviews: [],
    availability: [],
  },
  {
    id: "5",
    name: "Content Creation",
    description:
      "High-quality content for your website, blog, and social media",
    price: 300,
    image: "/images/content-creation.jpg",
    category: "Content",
    rating: 4.5,
    reviews: [],
    availability: [],
  },
  {
    id: "6",
    name: "Digital Marketing",
    description:
      "Comprehensive digital marketing strategies to grow your business",
    price: 1000,
    image: "/images/digital-marketing.png",
    category: "Marketing",
    rating: 4.8,
    reviews: [],
    availability: [],
  },
];
