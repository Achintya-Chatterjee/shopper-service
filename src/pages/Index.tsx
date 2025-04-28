import { ServicesList } from "@/components/ServicesList";
import { Cart } from "@/components/Cart";

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Our Services</h1>
        <Cart />
      </div>
      <ServicesList />
    </div>
  );
};

export default Index;
