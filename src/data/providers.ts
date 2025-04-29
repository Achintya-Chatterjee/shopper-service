import { ServiceProvider } from "@/types/Index";

// Mock service provider data
export const serviceProviders: ServiceProvider[] = [
  {
    id: "provider-1",
    name: "TechNova Solutions",
    description:
      "Premier web development and digital services company with over 10 years of experience in creating cutting-edge solutions for businesses of all sizes. Our team of expert developers and designers are committed to delivering high-quality products that meet your specific requirements.",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    coverImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.8,
    reviewCount: 127,
    contactInfo: {
      email: "contact@technova.com",
      phone: "+1-555-123-4567",
      website: "https://www.technova.com",
      address: "101 Tech Avenue, San Francisco, CA 94105",
    },
    specialties: [
      "Web Development",
      "Mobile Apps",
      "E-commerce Solutions",
      "Custom Software",
    ],
    services: ["service-1", "service-2", "service-4"],
    founded: "2012",
    socialMedia: {
      facebook: "https://facebook.com/technova",
      twitter: "https://twitter.com/technova",
      instagram: "https://instagram.com/technova",
      linkedin: "https://linkedin.com/company/technova",
    },
  },
  {
    id: "provider-2",
    name: "Digital Boost Agency",
    description:
      "Specialized in digital marketing and SEO optimization services that help businesses improve their online presence and reach their target audience effectively. With a data-driven approach, we provide measurable results and transparent reporting.",
    logo: "https://images.unsplash.com/photo-1603201667141-5a2d4c673378?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    coverImage:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.5,
    reviewCount: 89,
    contactInfo: {
      email: "info@digitalboost.com",
      phone: "+1-555-987-6543",
      website: "https://www.digitalboost.com",
      address: "25 Marketing Plaza, New York, NY 10001",
    },
    specialties: [
      "SEO Optimization",
      "PPC Campaigns",
      "Digital Marketing",
      "Analytics",
    ],
    services: ["service-3", "service-9", "service-10"],
    founded: "2015",
    socialMedia: {
      facebook: "https://facebook.com/digitalboost",
      twitter: "https://twitter.com/digitalboost",
      instagram: "https://instagram.com/digitalboost",
    },
  },
  {
    id: "provider-3",
    name: "SocialGenius Marketing",
    description:
      "A creative social media agency focused on building brand identity and engaging with audiences across various platforms. We create compelling content and implement strategic campaigns to maximize your social media presence.",
    logo: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    coverImage:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    rating: 4.6,
    reviewCount: 65,
    contactInfo: {
      email: "hello@socialgenius.com",
      phone: "+1-555-444-5555",
      website: "https://www.socialgenius.com",
      address: "50 Social Street, Austin, TX 78701",
    },
    specialties: [
      "Social Media Management",
      "Content Creation",
      "Influencer Marketing",
      "Community Building",
    ],
    services: ["service-5", "service-6", "service-8"],
    founded: "2017",
  },
];

// Helper function to get provider by ID
export const getProviderById = (id: string): ServiceProvider | undefined => {
  return serviceProviders.find((provider) => provider.id === id);
};

// Helper function to get services by provider ID
export const getServicesByProviderId = (
  providerId: string,
  allServices: any[]
): any[] => {
  const provider = getProviderById(providerId);
  if (!provider) return [];

  return allServices.filter((service) =>
    provider.services.includes(service.id)
  );
};
