import { useState } from "react";
import TaskCalendar from "@/components/TaskCalendar";

const taskDates: Date[] = [];

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Calendar</h1>
        <p className="text-muted-foreground">View tasks by date</p>
      </div>

      <TaskCalendar taskDates={taskDates} selectedDate={selectedDate} onSelectDate={setSelectedDate} />

      {selectedDate && (
        <div className="rounded-xl border border-dashed border-gray-300 bg-card p-4">
          <h3 className="font-medium text-foreground">
            {selectedDate.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })}
          </h3>
          {taskDates.some((d) => d.toDateString() === selectedDate.toDateString()) ? (
            <p className="mt-2 text-muted-foreground">You have tasks scheduled for this day.</p>
          ) : (
            <p className="mt-2 text-muted-foreground">No tasks scheduled.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
