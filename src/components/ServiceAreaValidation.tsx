import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, AlertCircle } from "lucide-react";
import { ServiceProvider } from "@/types/Index";
import { serviceProviders } from "@/data/providers";

interface ServiceAreaValidationProps {
  zipCode: string;
  providerId?: string;
  onValidationChange: (isValid: boolean) => void;
}

export function ServiceAreaValidation({
  zipCode,
  providerId,
  onValidationChange,
}: ServiceAreaValidationProps) {
  const [inputZipCode, setInputZipCode] = useState(zipCode);
  const [isChecking, setIsChecking] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [provider, setProvider] = useState<ServiceProvider | null>(null);

  const servicableZipCodes = [
    "94105",
    "94107",
    "94108",
    "94109",
    "94110",
    "94111",
    "94112",
    "94114",
    "94115",
    "94116",
    "94117",
    "94118",
    "94121",
    "94122",
    "94123",
    "94124",
    "94127",
    "94129",
    "94130",
    "94131",
    "94132",
    "94133",
    "94134",
  ];

  useEffect(() => {
    if (providerId) {
      const foundProvider =
        serviceProviders.find((p) => p.id === providerId) || null;
      setProvider(foundProvider);
    }

    if (zipCode) {
      validateZipCode(zipCode);
    }
  }, [providerId]);

  const validateZipCode = (zip: string) => {
    setIsChecking(true);

    setTimeout(() => {
      const isInServiceArea = servicableZipCodes.includes(zip);
      setIsValid(isInServiceArea);
      onValidationChange(isInServiceArea);
      setIsChecking(false);
    }, 500);
  };

  const handleCheckZipCode = () => {
    validateZipCode(inputZipCode);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-lg font-medium mb-2">Service Area Verification</h3>
        <p className="text-sm text-muted-foreground mb-4">
          {provider
            ? `Check if ${provider.name} serves your area`
            : "Check if we provide service in your area"}
        </p>

        <div className="flex space-x-2">
          <Input
            value={inputZipCode}
            onChange={(e) => setInputZipCode(e.target.value)}
            placeholder="Enter ZIP code"
            maxLength={5}
            className="max-w-[150px]"
          />
          <Button
            onClick={handleCheckZipCode}
            disabled={isChecking || !inputZipCode || inputZipCode.length < 5}
          >
            {isChecking ? "Checking..." : "Check Availability"}
          </Button>
        </div>

        {isValid !== null && (
          <div
            className={`mt-4 p-3 rounded-md flex items-center ${
              isValid
                ? "bg-green-50 dark:bg-green-900/20"
                : "bg-red-50 dark:bg-red-900/20"
            }`}
          >
            {isValid ? (
              <>
                <Check className="h-5 w-5 text-green-500 mr-2" />
                <div>
                  <p className="font-medium text-green-700 dark:text-green-300">
                    Service Available!
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    We provide service in your area.
                  </p>
                </div>
              </>
            ) : (
              <>
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <div>
                  <p className="font-medium text-red-700 dark:text-red-300">
                    Not Available
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-400">
                    Sorry, we don't service this area yet. Please check back
                    later or try a different ZIP code.
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
