import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

interface ServiceSchedulingProps {
  onScheduleSelect: (date: Date, timeSlot: string) => void;
  selectedDate?: Date;
  selectedTime?: string;
}

export function ServiceScheduling({
  onScheduleSelect,
  selectedDate,
  selectedTime,
}: ServiceSchedulingProps) {
  const [date, setDate] = useState<Date | undefined>(selectedDate);
  const [timeSlot, setTimeSlot] = useState<string | undefined>(selectedTime);

  const getAvailableTimeSlots = (date: Date | undefined) => {
    if (!date) return [];

    const dayOfWeek = date.getDay();

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return ["10:00 AM", "12:00 PM", "2:00 PM"];
    }

    return ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"];
  };

  const timeSlots = date ? getAvailableTimeSlots(date) : [];

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    setTimeSlot(undefined);
  };

  const handleTimeSelect = (time: string) => {
    setTimeSlot(time);
    if (date) {
      onScheduleSelect(date, time);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Schedule Your Service</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="h-fit">
          <CardContent className="p-4">
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateChange}
                disabled={(date) => {
                  return date < new Date(new Date().setHours(0, 0, 0, 0));
                }}
                className="rounded-md border shadow-none w-full max-w-[350px] pointer-events-auto"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardContent className="p-4">
            <h4 className="font-medium mb-3">Available Time Slots</h4>
            {!date ? (
              <p className="text-muted-foreground">
                Please select a date first
              </p>
            ) : timeSlots.length === 0 ? (
              <p className="text-muted-foreground">
                No available slots for selected date
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={timeSlot === time ? "default" : "outline"}
                    className="w-full"
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            )}

            {date && timeSlot && (
              <div className="mt-4 p-3 bg-muted rounded-md">
                <p className="font-medium">Selected Appointment:</p>
                <p className="text-muted-foreground">
                  {format(date, "PPPP")} at {timeSlot}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
