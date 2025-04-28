import { Service } from "@/types/Index";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";
import { Star } from "lucide-react";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const { addToCart } = useCart();

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="aspect-video w-full overflow-hidden rounded-md mb-2">
          <img
            src={service.image}
            alt={service.name}
            className="h-full w-full object-cover transition-all hover:scale-105"
          />
        </div>
        <div className="flex items-center justify-between">
          <CardTitle>{service.name}</CardTitle>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{service.rating}</span>
          </div>
        </div>
        <CardDescription className="text-xl font-bold text-primary">
          {formatCurrency(service.price)}
        </CardDescription>
        <div className="mt-1">
          <span className="inline-block px-2 py-1 text-xs font-medium text-primary-foreground bg-primary rounded-full">
            {service.category}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p>{service.description}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => addToCart(service)}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
