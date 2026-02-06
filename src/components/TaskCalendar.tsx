import { useState } from "react";
import { format, isSameDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface TaskCalendarProps {
  taskDates: Date[];
  selectedDate: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
}

const TaskCalendar = ({ taskDates, selectedDate, onSelectDate }: TaskCalendarProps) => {
  return (
    <Calendar
      mode="single"
      selected={selectedDate}
      onSelect={onSelectDate}
      className="rounded-xl border border-dashed border-gray-300 bg-card p-3 pointer-events-auto"
      modifiers={{
        hasTask: (date) => taskDates.some((d) => isSameDay(d, date)),
      }}
      modifiersClassNames={{
        hasTask: "relative",
      }}
      components={{
        DayContent: ({ date }) => {
          const hasTask = taskDates.some((d) => isSameDay(d, date));
          return (
            <div className="relative flex items-center justify-center">
              {format(date, "d")}
              {hasTask && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </div>
          );
        },
      }}
    />
  );
};

export default TaskCalendar;
