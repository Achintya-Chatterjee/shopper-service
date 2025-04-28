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
      "Custom website design and development for your business needs. Our team of experienced developers will create a responsive, modern website tailored to your specific requirements and business goals.",
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
        comment:
          "Excellent service, delivered on time! The team was very professional and responsive throughout the project.",
        createdAt: new Date("2024-04-20"),
      },
      {
        id: "r2",
        userId: "u2",
        userName: "Jane Smith",
        rating: 4,
        comment:
          "Great work overall. Had some minor issues with responsiveness but they were quickly resolved.",
        createdAt: new Date("2024-04-15"),
      },
      {
        id: "r3",
        userId: "u3",
        userName: "Robert Johnson",
        rating: 5,
        comment:
          "Fantastic experience working with this team. They exceeded my expectations and delivered ahead of schedule.",
        createdAt: new Date("2024-04-08"),
      },
    ],
    availability: [
      {
        id: "a1",
        date: new Date("2024-05-01"),
        startTime: "09:00",
        endTime: "10:00",
        isBooked: false,
      },
      {
        id: "a2",
        date: new Date("2024-05-01"),
        startTime: "11:00",
        endTime: "12:00",
        isBooked: true,
      },
      {
        id: "a3",
        date: new Date("2024-05-02"),
        startTime: "09:00",
        endTime: "10:00",
        isBooked: false,
      },
      {
        id: "a4",
        date: new Date("2024-05-03"),
        startTime: "14:00",
        endTime: "15:00",
        isBooked: false,
      },
    ],
  },
  {
    id: "2",
    name: "Mobile App Development",
    description:
      "Native mobile applications for iOS and Android platforms. We create intuitive, feature-rich mobile apps that provide seamless user experiences across all devices.",
    price: 2500,
    image: "/images/app-dev.jpg",
    category: "Development",
    rating: 4.6,
    reviews: [
      {
        id: "r4",
        userId: "u4",
        userName: "Emma Wilson",
        rating: 5,
        comment:
          "Their mobile app development service was outstanding. The app works perfectly on both iOS and Android.",
        createdAt: new Date("2024-04-10"),
      },
      {
        id: "r5",
        userId: "u5",
        userName: "Michael Brown",
        rating: 4,
        comment:
          "Good quality app development. The process took slightly longer than expected but the results were great.",
        createdAt: new Date("2024-03-28"),
      },
    ],
    availability: [
      {
        id: "a5",
        date: new Date("2024-05-05"),
        startTime: "10:00",
        endTime: "11:00",
        isBooked: false,
      },
      {
        id: "a6",
        date: new Date("2024-05-08"),
        startTime: "13:00",
        endTime: "14:00",
        isBooked: false,
      },
    ],
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
    reviews: [
      {
        id: "r6",
        userId: "u6",
        userName: "Sophia Davis",
        rating: 5,
        comment:
          "The SEO service significantly improved our website's traffic. Highly recommend!",
        createdAt: new Date("2024-04-12"),
      },
      {
        id: "r7",
        userId: "u7",
        userName: "James Garcia",
        rating: 4,
        comment:
          "Good results, but the process took a bit longer than expected.",
        createdAt: new Date("2024-03-30"),
      },
    ],
    availability: [
      {
        id: "a7",
        date: new Date("2024-05-10"),
        startTime: "09:00",
        endTime: "10:00",
        isBooked: false,
      },
      {
        id: "a8",
        date: new Date("2024-05-11"),
        startTime: "11:00",
        endTime: "12:00",
        isBooked: false,
      },
    ],
  },
  {
    id: "4",
    name: "SEO Optimization",
    description: "Improve your website's visibility in search engines",
    price: 500,
    image: "/images/seo-optimisation.jpg",
    category: "Marketing",
    rating: 4.7,
    reviews: [
      {
        id: "r8",
        userId: "u8",
        userName: "Olivia Martinez",
        rating: 5,
        comment:
          "The graphic design work was exceptional. They captured our brand perfectly.",
        createdAt: new Date("2024-04-05"),
      },
      {
        id: "r9",
        userId: "u9",
        userName: "Liam Rodriguez",
        rating: 4,
        comment:
          "Great design, but the revisions took a bit longer than expected.",
        createdAt: new Date("2024-03-25"),
      },
    ],
    availability: [
      {
        id: "a9",
        date: new Date("2024-05-15"),
        startTime: "10:00",
        endTime: "11:00",
        isBooked: false,
      },
      {
        id: "a10",
        date: new Date("2024-05-16"),
        startTime: "14:00",
        endTime: "15:00",
        isBooked: false,
      },
    ],
  },
  {
    id: "5",
    name: "Content Creation",
    description:
      "High-quality content writing services for blogs, websites, and marketing materials. Our team of skilled writers will create engaging and SEO-friendly content tailored to your audience.",
    price: 400,
    image: "/images/content-creation.jpg",
    category: "Content",
    rating: 4.5,
    reviews: [
      {
        id: "r10",
        userId: "u10",
        userName: "Ava Hernandez",
        rating: 5,
        comment:
          "The content writing service was top-notch. The articles were well-researched and engaging.",
        createdAt: new Date("2024-04-18"),
      },
      {
        id: "r11",
        userId: "u11",
        userName: "Noah Lee",
        rating: 4,
        comment:
          "Good quality content, but the turnaround time was a bit longer than expected.",
        createdAt: new Date("2024-03-22"),
      },
    ],
    availability: [
      {
        id: "a11",
        date: new Date("2024-05-20"),
        startTime: "09:00",
        endTime: "10:00",
        isBooked: false,
      },
      {
        id: "a12",
        date: new Date("2024-05-21"),
        startTime: "11:00",
        endTime: "12:00",
        isBooked: false,
      },
    ],
  },
  {
    id: "6",
    name: "Digital Marketing",
    description:
      "Comprehensive digital marketing services including social media management, email marketing, and PPC advertising. We help you reach your target audience effectively and efficiently.",
    price: 1500,
    image: "/images/digital-marketing.png",
    category: "Marketing",
    rating: 4.8,
    reviews: [
      {
        id: "r12",
        userId: "u12",
        userName: "Mia Wilson",
        rating: 5,
        comment:
          "The digital marketing service helped us reach a wider audience. The team was very knowledgeable and responsive.",
        createdAt: new Date("2024-04-25"),
      },
      {
        id: "r13",
        userId: "u13",
        userName: "Ethan Anderson",
        rating: 4,
        comment:
          "Good results, but I expected more frequent updates on the campaign progress.",
        createdAt: new Date("2024-03-18"),
      },
    ],
    availability: [
      {
        id: "a13",
        date: new Date("2024-05-25"),
        startTime: "10:00",
        endTime: "11:00",
        isBooked: false,
      },
      {
        id: "a14",
        date: new Date("2024-05-26"),
        startTime: "14:00",
        endTime: "15:00",
        isBooked: false,
      },
    ],
  },
];
