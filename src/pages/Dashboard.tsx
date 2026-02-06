import { useState } from "react";
import { Plus } from "lucide-react";
import TaskCalendar from "@/components/TaskCalendar";
import TaskCard, { Task } from "@/components/TaskCard";
import { Button } from "@/components/ui/button";

const sampleTasks: Task[] = [
  { id: "1", title: "Design homepage wireframe", description: "Create low-fidelity wireframes for the landing page", status: "in_progress", priority: "high", dueDate: "Feb 7" },
  { id: "2", title: "Set up project repository", status: "done", priority: "medium", dueDate: "Feb 6" },
  { id: "3", title: "Write API documentation", description: "Document all REST endpoints", status: "todo", priority: "low", dueDate: "Feb 10" },
  { id: "4", title: "Review pull requests", status: "todo", priority: "medium", dueDate: "Feb 8" },
];

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const taskDates = [new Date(2026, 1, 6), new Date(2026, 1, 7), new Date(2026, 1, 8), new Date(2026, 1, 10)];

  const todoCount = tasks.filter((t) => t.status === "todo").length;
  const inProgressCount = tasks.filter((t) => t.status === "in_progress").length;
  const doneCount = tasks.filter((t) => t.status === "done").length;

  const toggleStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: t.status === "done" ? "todo" : "done" } : t
      )
    );
  };

  const toggleStopwatch = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, showStopwatch: !t.showStopwatch } : t
      )
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Here's your overview for today</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-dashed border-gray-300 bg-card p-4 text-center">
          <p className="text-2xl font-bold text-foreground">{todoCount}</p>
          <p className="text-muted-foreground">To Do</p>
        </div>
        <div className="rounded-xl border border-dashed border-gray-300 bg-card p-4 text-center">
          <p className="text-2xl font-bold text-primary">{inProgressCount}</p>
          <p className="text-muted-foreground">In Progress</p>
        </div>
        <div className="rounded-xl border border-dashed border-gray-300 bg-card p-4 text-center">
          <p className="text-2xl font-bold text-foreground">{doneCount}</p>
          <p className="text-muted-foreground">Done</p>
        </div>
      </div>

      {/* Calendar */}
      <div>
        <h2 className="mb-3 font-semibold text-foreground">Calendar</h2>
        <TaskCalendar taskDates={taskDates} selectedDate={selectedDate} onSelectDate={setSelectedDate} />
      </div>

      {/* Recent Tasks */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold text-foreground">Recent Tasks</h2>
          <Button size="sm" className="gap-1">
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>
        <div className="space-y-3">
          {tasks.slice(0, 3).map((task) => (
            <TaskCard key={task.id} task={task} onToggleStatus={toggleStatus} onToggleStopwatch={toggleStopwatch} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
