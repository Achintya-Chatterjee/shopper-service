import { useState } from "react";
import { Address } from "@/types/Index";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle, Check, Home } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddressForm } from "./AddressForm";

const mockAddresses: Address[] = [
  {
    id: "1",
    fullName: "John Doe",
    email: "john@example.com",
    address: "123 Main St",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    isDefault: true,
  },
  {
    id: "2",
    fullName: "John Doe",
    email: "john@example.com",
    address: "456 Market St",
    city: "San Francisco",
    state: "CA",
    zipCode: "94102",
    isDefault: false,
  },
];

interface SavedAddressesProps {
  onSelectAddress: (address: Address) => void;
  selectedAddressId?: string;
}

export function SavedAddresses({
  onSelectAddress,
  selectedAddressId,
}: SavedAddressesProps) {
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleNewAddress = (address: Address) => {
    const newAddress = {
      ...address,
      id: `new-${Date.now()}`,
      isDefault: addresses.length === 0,
    };

    const updatedAddresses = [...addresses, newAddress];
    setAddresses(updatedAddresses);
    onSelectAddress(newAddress);
    setIsAddingNew(false);
  };

  const handleSelectAddress = (address: Address) => {
    onSelectAddress(address);
  };

  const handleSetDefault = (id: string) => {
    const updatedAddresses = addresses.map((addr) => ({
      ...addr,
      isDefault: addr.id === id,
    }));
    setAddresses(updatedAddresses);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Saved Addresses</h3>
        <Dialog open={isAddingNew} onOpenChange={setIsAddingNew}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add New Address
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
            </DialogHeader>
            <AddressForm
              onSubmit={handleNewAddress}
              onCancel={() => setIsAddingNew(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((address) => (
          <Card
            key={address.id}
            className={`cursor-pointer border ${
              selectedAddressId === address.id ? "border-primary" : ""
            }`}
            onClick={() => handleSelectAddress(address)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <h4 className="font-medium">{address.fullName}</h4>
                  {address.isDefault && (
                    <span className="ml-2 bg-muted px-2 py-0.5 rounded-full text-xs">
                      Default
                    </span>
                  )}
                </div>
                {selectedAddressId === address.id && (
                  <Check className="h-5 w-5 text-primary" />
                )}
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                <p>{address.address}</p>
                <p>
                  {address.city}, {address.state} {address.zipCode}
                </p>
                <p>{address.email}</p>
              </div>
              {!address.isDefault && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSetDefault(address.id!);
                  }}
                >
                  <Home className="h-4 w-4 mr-2" />
                  Set as default
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
