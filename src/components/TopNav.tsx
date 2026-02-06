import { CheckSquare } from "lucide-react";

const TopNav = () => {
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const dateString = now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <CheckSquare className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground">TaskFlow</span>
        </div>

        <div className="text-right">
          <p className="font-medium text-foreground leading-tight">{timeString}</p>
          <p className="text-muted-foreground leading-tight" style={{ fontSize: "13px" }}>{dateString}</p>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
