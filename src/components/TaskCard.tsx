import { useState } from "react";
import { Check, Clock, MoreHorizontal } from "lucide-react";
import Stopwatch from "@/components/Stopwatch";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "in_progress" | "done";
  priority: "low" | "medium" | "high";
  dueDate?: string;
  showStopwatch?: boolean;
}

interface TaskCardProps {
  task: Task;
  onToggleStatus: (id: string) => void;
  onToggleStopwatch: (id: string) => void;
}

const priorityColors: Record<string, string> = {
  low: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
};

const TaskCard = ({ task, onToggleStatus, onToggleStopwatch }: TaskCardProps) => {
  return (
    <div className="rounded-xl border border-dashed border-gray-300 bg-card p-4 transition-all hover:shadow-sm">
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggleStatus(task.id)}
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
            task.status === "done"
              ? "border-primary bg-primary"
              : "border-muted-foreground/30 hover:border-primary"
          }`}
        >
          {task.status === "done" && <Check className="h-3 w-3 text-primary-foreground" />}
        </button>

        <div className="flex-1 min-w-0">
          <p
            className={`font-medium leading-snug ${
              task.status === "done" ? "line-through text-muted-foreground" : "text-foreground"
            }`}
          >
            {task.title}
          </p>
          {task.description && (
            <p className="mt-1 text-muted-foreground line-clamp-2">{task.description}</p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-2.5 py-0.5 text-[13px] font-medium ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>
            {task.dueDate && (
              <span className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span className="text-[13px]">{task.dueDate}</span>
              </span>
            )}
            <button
              onClick={() => onToggleStopwatch(task.id)}
              className="ml-auto text-[13px] text-muted-foreground hover:text-primary transition-colors"
            >
              {task.showStopwatch ? "Hide timer" : "Timer"}
            </button>
          </div>

          {task.showStopwatch && (
            <div className="mt-3 pt-3 border-t border-border">
              <Stopwatch taskId={task.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
