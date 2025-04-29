import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { serviceProviders } from "@/data/providers";
import { ServiceProvider } from "@/types/Index";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProviderFilters } from "@/components/ProviderFilters";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { motion } from "framer-motion";

const PROVIDERS_PER_PAGE = 6;

const Providers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [minRating, setMinRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProviders = useMemo(() => {
    return serviceProviders.filter((provider) => {
      const matchesSearch =
        provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        provider.specialties.some((specialty) =>
          specialty.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesSpecialty =
        selectedSpecialty === "all" ||
        provider.specialties.some(
          (specialty) =>
            specialty.toLowerCase() === selectedSpecialty.toLowerCase()
        );

      const matchesRating = provider.rating >= minRating;

      return matchesSearch && matchesSpecialty && matchesRating;
    });
  }, [searchQuery, selectedSpecialty, minRating]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProviders.length / PROVIDERS_PER_PAGE)
  );
  const paginatedProviders = filteredProviders.slice(
    (currentPage - 1) * PROVIDERS_PER_PAGE,
    currentPage * PROVIDERS_PER_PAGE
  );

  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedSpecialty, minRating]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">Service Providers</h1>
        </div>

        <ProviderFilters
          onSearchChange={setSearchQuery}
          onSpecialtyChange={setSelectedSpecialty}
          onRatingChange={setMinRating}
        />

        {paginatedProviders.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">No providers found</h2>
            <p className="text-muted-foreground">
              Try using different search terms or filters.
            </p>
            {(searchQuery || selectedSpecialty !== "all" || minRating > 0) && (
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedSpecialty("all");
                  setMinRating(0);
                }}
              >
                Clear All Filters
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedProviders.map((provider, index) => (
                <motion.div
                  key={provider.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <ProviderCard provider={provider} />
                </motion.div>
              ))}
            </div>

            {filteredProviders.length > PROVIDERS_PER_PAGE && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() =>
                        handlePageChange(Math.max(1, currentPage - 1))
                      }
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }).map((_, index) => {
                    const page = index + 1;
                    const isVisible =
                      page === 1 ||
                      page === totalPages ||
                      Math.abs(page - currentPage) <= 1;

                    const showEllipsisBefore =
                      page === currentPage - 2 && currentPage > 3;
                    const showEllipsisAfter =
                      page === currentPage + 2 && currentPage < totalPages - 2;

                    if (showEllipsisBefore) {
                      return (
                        <PaginationItem key={`ellipsis-before-${page}`}>
                          <span className="flex h-9 w-9 items-center justify-center">
                            ...
                          </span>
                        </PaginationItem>
                      );
                    }

                    if (showEllipsisAfter) {
                      return (
                        <PaginationItem key={`ellipsis-after-${page}`}>
                          <span className="flex h-9 w-9 items-center justify-center">
                            ...
                          </span>
                        </PaginationItem>
                      );
                    }

                    if (isVisible) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            isActive={page === currentPage}
                            onClick={() => handlePageChange(page)}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }

                    return null;
                  })}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() =>
                        handlePageChange(Math.min(totalPages, currentPage + 1))
                      }
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : "cursor-pointer"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
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
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="h-32 overflow-hidden">
        {provider.coverImage && (
          <img
            src={provider.coverImage}
            alt={`${provider.name} cover`}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
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
