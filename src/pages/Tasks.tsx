import { useState } from "react";
import { Plus } from "lucide-react";
import TaskCard, { Task } from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialTasks: Task[] = [
  { id: "1", title: "Design homepage wireframe", description: "Create low-fidelity wireframes for the landing page", status: "in_progress", priority: "high", dueDate: "Feb 7" },
  { id: "2", title: "Set up project repository", status: "done", priority: "medium", dueDate: "Feb 6" },
  { id: "3", title: "Write API documentation", description: "Document all REST endpoints", status: "todo", priority: "low", dueDate: "Feb 10" },
  { id: "4", title: "Review pull requests", status: "todo", priority: "medium", dueDate: "Feb 8" },
  { id: "5", title: "Fix navigation bug", description: "Mobile menu not closing on route change", status: "todo", priority: "high", dueDate: "Feb 9" },
  { id: "6", title: "Deploy staging build", status: "in_progress", priority: "medium", dueDate: "Feb 7" },
];

type Filter = "all" | "todo" | "in_progress" | "done";

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<Filter>("all");
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const filtered = filter === "all" ? tasks : tasks.filter((t) => t.status === filter);

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

  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    const task: Task = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      status: "todo",
      priority: "medium",
    };
    setTasks((prev) => [task, ...prev]);
    setNewTaskTitle("");
  };

  const filters: { label: string; value: Filter }[] = [
    { label: "All", value: "all" },
    { label: "To Do", value: "todo" },
    { label: "In Progress", value: "in_progress" },
    { label: "Done", value: "done" },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Tasks</h1>
        <p className="text-muted-foreground">Manage all your tasks</p>
      </div>

      {/* Add task */}
      <div className="flex gap-2">
        <Input
          placeholder="Add a new task..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          className="h-11"
        />
        <Button onClick={addTask} className="h-11 gap-1 shrink-0">
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`shrink-0 rounded-full px-4 py-1.5 font-medium transition-colors ${
              filter === f.value
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-accent"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Task list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <p className="py-8 text-center text-muted-foreground">No tasks found</p>
        ) : (
          filtered.map((task) => (
            <TaskCard key={task.id} task={task} onToggleStatus={toggleStatus} onToggleStopwatch={toggleStopwatch} />
          ))
        )}
      </div>
    </div>
  );
};

export default Tasks;
