import { useCompare } from "@/context/compare/CompareContext";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { formatCurrency } from "@/lib/utils";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const Compare = () => {
  const { compareList, removeFromCompare, clearCompareList } = useCompare();

  // Features to compare
  const features = ["price", "rating", "category"];

  if (compareList.length === 0) {
    return (
      <div>
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Service Comparison</h1>
          <p className="text-muted-foreground mb-8">
            You haven't added any services to compare yet.
          </p>
          <Button asChild>
            <Link to="/">Browse Services</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Service Comparison</h1>
          <Button variant="outline" onClick={clearCompareList}>
            Clear All
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-4 text-left border-b"></th>
                {compareList.map((service) => (
                  <th
                    key={service.id}
                    className="p-4 text-center border-b min-w-[200px] relative"
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-2"
                      onClick={() => removeFromCompare(service.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <div className="pt-4">
                      <Link
                        to={`/service/${service.id}`}
                        className="hover:underline"
                      >
                        <img
                          src={service.image || "/placeholder.svg"}
                          alt={service.name}
                          className="w-20 h-20 mx-auto mb-2 rounded object-cover"
                        />
                        <div className="font-medium">{service.name}</div>
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Price row */}
              <tr>
                <td className="p-4 border-b font-medium">Price</td>
                {compareList.map((service) => (
                  <td key={service.id} className="p-4 text-center border-b">
                    {formatCurrency(service.price)}
                  </td>
                ))}
              </tr>

              {/* Rating row */}
              <tr>
                <td className="p-4 border-b font-medium">Rating</td>
                {compareList.map((service) => (
                  <td key={service.id} className="p-4 text-center border-b">
                    {service.rating}/5
                  </td>
                ))}
              </tr>

              {/* Category row */}
              <tr>
                <td className="p-4 border-b font-medium">Category</td>
                {compareList.map((service) => (
                  <td key={service.id} className="p-4 text-center border-b">
                    {service.category}
                  </td>
                ))}
              </tr>

              {/* Description row */}
              <tr>
                <td className="p-4 border-b font-medium">Description</td>
                {compareList.map((service) => (
                  <td key={service.id} className="p-4 text-center border-b">
                    <div className="max-h-32 overflow-y-auto text-sm">
                      {service.description}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Actions row */}
              <tr>
                <td className="p-4 border-b font-medium">Actions</td>
                {compareList.map((service) => (
                  <td key={service.id} className="p-4 text-center border-b">
                    <div className="flex flex-col gap-2">
                      <Button asChild size="sm">
                        <Link to={`/service/${service.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Compare;
