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
        <CardTitle>{service.name}</CardTitle>
        <CardDescription className="text-xl font-bold text-primary">
          {formatCurrency(service.price)}
        </CardDescription>
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
