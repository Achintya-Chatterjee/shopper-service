import { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { serviceProviders } from "@/data/providers";
import { Slider } from "./ui/slider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const getAllSpecialties = () => {
  const specialtiesSet = new Set<string>();

  serviceProviders.forEach((provider) => {
    provider.specialties.forEach((specialty) => {
      specialtiesSet.add(specialty);
    });
  });

  return Array.from(specialtiesSet).sort();
};

interface ProviderFiltersProps {
  onSearchChange: (search: string) => void;
  onSpecialtyChange: (specialty: string) => void;
  onRatingChange: (rating: number) => void;
}

export function ProviderFilters({
  onSearchChange,
  onSpecialtyChange,
  onRatingChange,
}: ProviderFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [specialty, setSpecialty] = useState("all");
  const [rating, setRating] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const allSpecialties = getAllSpecialties();

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearchChange(value);
  };

  const handleSpecialtyChange = (value: string) => {
    setSpecialty(value);
    onSpecialtyChange(value);
  };

  const handleRatingChange = (value: number[]) => {
    setRating(value[0]);
    onRatingChange(value[0]);
  };

  const handleReset = () => {
    setSearchQuery("");
    setSpecialty("all");
    setRating(0);
    onSearchChange("");
    onSpecialtyChange("all");
    onRatingChange(0);
  };

  const DesktopFilters = () => (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search providers..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>
      <Select value={specialty} onValueChange={handleSpecialtyChange}>
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Specialty" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Specialties</SelectItem>
          {allSpecialties.map((specialty) => (
            <SelectItem key={specialty} value={specialty.toLowerCase()}>
              {specialty}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex flex-col w-full sm:w-[200px] gap-1">
        <div className="flex justify-between text-sm">
          <span>Min Rating: {rating}</span>
          <span className="text-muted-foreground">5</span>
        </div>
        <Slider
          value={[rating]}
          min={0}
          max={5}
          step={0.5}
          onValueChange={handleRatingChange}
        />
      </div>
      {(searchQuery || specialty !== "all" || rating > 0) && (
        <Button variant="outline" onClick={handleReset}>
          Reset Filters
        </Button>
      )}
    </div>
  );

  const MobileFilters = () => (
    <div className="flex items-center justify-between mb-6">
      <div className="relative flex-1 mr-2">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search providers..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <Filter className="h-4 w-4" />
            {(specialty !== "all" || rating > 0) && (
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-primary" />
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>
              Refine your search with these filters.
            </SheetDescription>
          </SheetHeader>
          <div className="py-4 space-y-6">
            <Accordion type="single" collapsible defaultValue="specialty">
              <AccordionItem value="specialty">
                <AccordionTrigger>Specialty</AccordionTrigger>
                <AccordionContent>
                  <Select
                    value={specialty}
                    onValueChange={handleSpecialtyChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Specialties</SelectItem>
                      {allSpecialties.map((specialty) => (
                        <SelectItem
                          key={specialty}
                          value={specialty.toLowerCase()}
                        >
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="rating">
                <AccordionTrigger>Minimum Rating</AccordionTrigger>
                <AccordionContent>
                  <div className="px-1">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Min: {rating}</span>
                      <span className="text-muted-foreground">Max: 5</span>
                    </div>
                    <Slider
                      value={[rating]}
                      min={0}
                      max={5}
                      step={0.5}
                      onValueChange={handleRatingChange}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <SheetFooter className="flex flex-row justify-between sm:justify-between gap-2">
            <Button variant="outline" className="flex-1" onClick={handleReset}>
              Reset Filters
            </Button>
            <SheetClose asChild>
              <Button className="flex-1">Apply</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );

  return isMobile ? <MobileFilters /> : <DesktopFilters />;
}
