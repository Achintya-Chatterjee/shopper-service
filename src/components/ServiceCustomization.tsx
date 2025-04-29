import { useState } from "react";
import { ServiceCustomization as ServiceCustomizationType } from "@/types/Index";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils";

const mockCustomizations: ServiceCustomizationType[] = [
  {
    id: "1",
    name: "Service Level",
    options: [
      { id: "1-1", name: "Standard", priceAdjustment: 0 },
      { id: "1-2", name: "Premium", priceAdjustment: 20 },
      { id: "1-3", name: "Deluxe", priceAdjustment: 50 },
    ],
    required: true,
  },
  {
    id: "2",
    name: "Additional Options",
    options: [
      { id: "2-1", name: "Express Service", priceAdjustment: 15 },
      { id: "2-2", name: "Weekend Service", priceAdjustment: 25 },
      { id: "2-3", name: "After-hours Service", priceAdjustment: 35 },
    ],
    required: false,
  },
];

interface ServiceCustomizationProps {
  serviceId: string;
  onCustomizationChange: (customizations: ServiceCustomizationType[]) => void;
  initialCustomizations?: ServiceCustomizationType[];
}

export function ServiceCustomization({
  serviceId,
  onCustomizationChange,
  initialCustomizations,
}: ServiceCustomizationProps) {
  const [customizations, setCustomizations] = useState<
    ServiceCustomizationType[]
  >(
    initialCustomizations ||
      mockCustomizations.map((c) => ({
        ...c,
        selectedOption: c.required ? c.options[0] : undefined,
      }))
  );

  const handleOptionSelect = (customizationId: string, optionId: string) => {
    const updatedCustomizations = customizations.map((customization) => {
      if (customization.id === customizationId) {
        const selectedOption = customization.options.find(
          (option) => option.id === optionId
        );
        return {
          ...customization,
          selectedOption,
        };
      }
      return customization;
    });

    setCustomizations(updatedCustomizations);
    onCustomizationChange(updatedCustomizations);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Customize Your Service</h3>

      {customizations.map((customization) => (
        <Card key={customization.id}>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">
              {customization.name}
              {customization.required && (
                <span className="text-sm text-red-500 ml-1">*</span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={customization.selectedOption?.id}
              onValueChange={(value) =>
                handleOptionSelect(customization.id, value)
              }
            >
              {customization.options.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center space-x-2 py-1"
                >
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label
                    htmlFor={option.id}
                    className="flex flex-1 justify-between cursor-pointer"
                  >
                    <span>{option.name}</span>
                    <span
                      className={
                        option.priceAdjustment > 0
                          ? "text-primary"
                          : "text-muted-foreground"
                      }
                    >
                      {option.priceAdjustment > 0
                        ? `+${formatCurrency(option.priceAdjustment)}`
                        : option.priceAdjustment < 0
                        ? formatCurrency(option.priceAdjustment)
                        : "Included"}
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
