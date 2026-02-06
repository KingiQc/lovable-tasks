import { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

interface StopwatchProps {
  taskId: string;
}

const Stopwatch = ({ taskId }: StopwatchProps) => {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (running) {
      interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  const format = useCallback((totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }, []);

  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-muted-foreground">{format(seconds)}</span>
      <button
        onClick={() => setRunning(!running)}
        className="rounded-full p-1 text-primary hover:bg-accent transition-colors"
      >
        {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </button>
      {seconds > 0 && (
        <button
          onClick={() => { setRunning(false); setSeconds(0); }}
          className="rounded-full p-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
};

export default Stopwatch;
