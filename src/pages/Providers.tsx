import { useState } from "react";
import { Header } from "@/components/Header";
import { serviceProviders } from "@/data/providers";
import { ServiceProvider } from "@/types/Index";
import { Link } from "react-router-dom";
import { Star, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Providers = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProviders = serviceProviders.filter(
    (provider) =>
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.specialties.some((specialty) =>
        specialty.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div>
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">Service Providers</h1>

          <div className="relative w-full md:w-auto md:min-w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search providers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {filteredProviders.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">No providers found</h2>
            <p className="text-muted-foreground">
              Try using different search terms or browse all providers.
            </p>
            {searchQuery && (
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setSearchQuery("")}
              >
                Clear Search
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProviders.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface ProviderCardProps {
  provider: ServiceProvider;
}

const ProviderCard = ({ provider }: ProviderCardProps) => {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="h-32 overflow-hidden">
        {provider.coverImage && (
          <img
            src={provider.coverImage}
            alt={`${provider.name} cover`}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <CardHeader className="relative pb-0">
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-md overflow-hidden border-4 border-background bg-white flex-shrink-0 -mt-12 shadow-md">
            {provider.logo && (
              <img
                src={provider.logo}
                alt={provider.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="ml-3">
            <CardTitle className="text-lg">{provider.name}</CardTitle>
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-sm font-medium">
                {provider.rating}
              </span>
              <span className="ml-1 text-xs text-muted-foreground">
                ({provider.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-grow pt-4">
        <CardDescription className="line-clamp-3">
          {provider.description}
        </CardDescription>

        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Specialties</h4>
          <div className="flex flex-wrap gap-1">
            {provider.specialties.slice(0, 3).map((specialty) => (
              <span
                key={specialty}
                className="bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full text-xs"
              >
                {specialty}
              </span>
            ))}
            {provider.specialties.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{provider.specialties.length - 3} more
              </span>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button asChild className="w-full">
          <Link to={`/provider/${provider.id}`}>View Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Providers;
