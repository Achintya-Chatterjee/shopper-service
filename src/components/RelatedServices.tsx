import { useMemo } from "react";
import { services } from "@/data/services";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/lib/utils";

interface RelatedServicesProps {
  currentServiceId: string;
  category: string;
}

export function RelatedServices({
  currentServiceId,
  category,
}: RelatedServicesProps) {
  const relatedServices = useMemo(() => {
    return services
      .filter(
        (service) =>
          service.id !== currentServiceId && service.category === category
      )
      .slice(0, 3);
  }, [currentServiceId, category]);

  if (relatedServices.length === 0) {
    //  find any services if there are no services in the same category
    const alternativeServices = services
      .filter((service) => service.id !== currentServiceId)
      .slice(0, 3);

    if (alternativeServices.length === 0) {
      return null;
    }

    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Other Services</h2>
        {renderServiceCards(alternativeServices)}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Related Services</h2>
      {renderServiceCards(relatedServices)}
    </div>
  );
}

function renderServiceCards(services) {
  return (
    <div className="space-y-4">
      {services.map((service) => (
        <Card key={service.id} className="overflow-hidden">
          <Link to={`/service/${service.id}`} className="block">
            <div className="aspect-video">
              <img
                src={service.image}
                alt={service.name}
                className="h-full w-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <CardTitle className="text-base mb-1">{service.name}</CardTitle>
              <div className="flex items-center gap-1 mb-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium">{service.rating}</span>
              </div>
              <p className="font-medium text-primary text-sm">
                {formatCurrency(service.price)}
              </p>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  );
}
