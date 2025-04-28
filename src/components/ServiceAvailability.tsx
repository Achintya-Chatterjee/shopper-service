import { useState } from "react";
import { AvailabilitySlot } from "@/types/Index";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format, isSameDay } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceAvailabilityProps {
  serviceId: string;
  availability: AvailabilitySlot[];
}

export function ServiceAvailability({
  serviceId,
  availability,
}: ServiceAvailabilityProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    availability.length > 0 ? new Date(availability[0].date) : undefined
  );

  const availableDates = availability.map((slot) => new Date(slot.date));

  const timeSlots = selectedDate
    ? availability
        .filter((slot) => isSameDay(new Date(slot.date), selectedDate))
        .map((slot) => ({
          id: slot.id,
          startTime: slot.startTime,
          endTime: slot.endTime,
          isBooked: slot.isBooked,
        }))
    : [];

  if (availability.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium mb-2">
          No availability information
        </h3>
        <p className="text-muted-foreground">
          Please contact us for scheduling.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Select a Date</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4 max-w-sm">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className={cn("p-3 pointer-events-auto")}
            modifiers={{
              available: (date) =>
                availableDates.some((availableDate) =>
                  isSameDay(date, availableDate)
                ),
            }}
            modifiersStyles={{
              available: { fontWeight: "bold" },
            }}
            disabled={(date) =>
              !availableDates.some((availableDate) =>
                isSameDay(date, availableDate)
              )
            }
          />
        </Card>

        <div>
          {selectedDate ? (
            <>
              <h4 className="font-medium mb-3 flex items-center">
                <CalendarIcon className="w-4 h-4 mr-2" />
                Available times for {format(selectedDate, "MMMM d, yyyy")}
              </h4>

              {timeSlots.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot.id}
                      variant={slot.isBooked ? "outline" : "default"}
                      disabled={slot.isBooked}
                      className="justify-start"
                    >
                      {slot.startTime} - {slot.endTime}
                      {slot.isBooked && (
                        <span className="ml-2 text-xs">(Booked)</span>
                      )}
                    </Button>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No time slots available for this date.
                </p>
              )}
            </>
          ) : (
            <p className="text-muted-foreground">
              Please select a date to see available time slots.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
