import { ServicesList } from "@/components/ServicesList";
import { Cart } from "@/components/Cart";
import { Header } from "@/components/Header";

const Index = () => {
  return (
    <div>
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">Our Services</h1>
          <div className="flex flex-wrap items-center gap-2">
            <Cart />
          </div>
        </div>
        <ServicesList />
      </div>
    </div>
  );
};

export default Index;
