import { useParams } from "react-router-dom";
import { useState } from "react";
import { services } from "@/data/services";
import { serviceProviders, getProviderById } from "@/data/providers";
import { ServiceReviews } from "@/components/ServiceReviews";
import { ServiceAvailability } from "@/components/ServiceAvailability";
import { RelatedServices } from "@/components/RelatedServices";
import { useCart } from "@/context/cart";
import { Button } from "@/components/ui/button";
import { Star, Users } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { FavoriteButton } from "@/components/FavoriteButton";
import { CompareButton } from "@/components/CompareButton";
import { Header } from "@/components/Header";
import { Link } from "react-router-dom";

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<
    "description" | "reviews" | "availability"
  >("description");

  const service = services.find((s) => s.id === id);
  const provider = service?.providerId
    ? getProviderById(service.providerId)
    : undefined;

  if (!service) {
    return (
      <div>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">Service not found</h1>
          <p>The service you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-4xl font-bold mb-2">{service.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 font-medium">{service.rating}</span>
                </div>
                <span className="text-muted-foreground">
                  ({service.reviews.length} reviews)
                </span>
                <span className="text-muted-foreground">•</span>
                <span className="text-primary font-medium">
                  {service.category}
                </span>
              </div>
              <div className="aspect-video w-full overflow-hidden rounded-md mb-6">
                <img
                  src={service.image}
                  alt={service.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="text-2xl font-bold text-primary mb-4">
                {formatCurrency(service.price)}
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <Button size="lg" onClick={() => addToCart(service)}>
                  Add to Cart
                </Button>
                <FavoriteButton service={service} variant="default" />
                <CompareButton service={service} variant="default" />
              </div>

              {provider && (
                <Card className="mb-6 p-4">
                  <div className="flex items-center">
                    <div className="mr-4">
                      {provider.logo ? (
                        <img
                          src={provider.logo}
                          alt={provider.name}
                          className="w-12 h-12 rounded-md object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center">
                          <Users className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-medium">Provided by:</div>
                      <Link
                        to={`/provider/${provider.id}`}
                        className="text-primary hover:underline font-bold"
                      >
                        {provider.name}
                      </Link>
                      <div className="flex items-center text-sm">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1">{provider.rating}</span>
                        <span className="ml-1 text-muted-foreground">
                          ({provider.reviewCount} reviews)
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-auto"
                      asChild
                    >
                      <Link to={`/provider/${provider.id}`}>View Profile</Link>
                    </Button>
                  </div>
                </Card>
              )}

              <div className="border-b mb-6">
                <div className="flex space-x-8">
                  <button
                    className={`pb-2 font-medium ${
                      activeTab === "description"
                        ? "border-b-2 border-primary"
                        : ""
                    }`}
                    onClick={() => setActiveTab("description")}
                  >
                    Description
                  </button>
                  <button
                    className={`pb-2 font-medium ${
                      activeTab === "reviews" ? "border-b-2 border-primary" : ""
                    }`}
                    onClick={() => setActiveTab("reviews")}
                  >
                    Reviews ({service.reviews.length})
                  </button>
                  <button
                    className={`pb-2 font-medium ${
                      activeTab === "availability"
                        ? "border-b-2 border-primary"
                        : ""
                    }`}
                    onClick={() => setActiveTab("availability")}
                  >
                    Availability
                  </button>
                </div>
              </div>

              {activeTab === "description" && (
                <div className="prose max-w-none">
                  <p>{service.description}</p>
                </div>
              )}

              {activeTab === "reviews" && (
                <ServiceReviews
                  serviceId={service.id}
                  reviews={service.reviews}
                />
              )}

              {activeTab === "availability" && (
                <ServiceAvailability
                  availability={service.availability}
                  serviceId={service.id}
                />
              )}
            </div>
          </div>

          <div>
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Quick Summary</h2>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-medium">{service.category}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Rating:</span>
                  <span className="font-medium flex items-center">
                    {service.rating}{" "}
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 ml-1" />
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Price:</span>
                  <span className="font-medium text-primary">
                    {formatCurrency(service.price)}
                  </span>
                </li>
              </ul>
            </Card>

            <RelatedServices
              currentServiceId={service.id}
              category={service.category}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
