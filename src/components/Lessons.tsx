import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { type Lesson } from "@/lib/lessons";
import { trackLabel } from "@/lib/tracks";

export function LessonList({
  lessons,
  completed,
  onPick,
}: {
  lessons: Lesson[];
  completed: Set<string>;
  onPick: (l: Lesson) => void;
}) {
  return (
    <div className="grid gap-2">
      {lessons.map((l, i) => {
        const isDone = completed.has(l.id);
        const prev = i === 0 ? null : lessons[i - 1];
        const locked = prev ? !completed.has(prev.id) : false;
        return (
          <button
            key={l.id}
            onClick={() => !locked && onPick(l)}
            disabled={locked}
            className={`group flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
              locked
                ? "cursor-not-allowed border-border/30 opacity-50"
                : "border-border bg-background/40 hover:border-primary/60 hover:bg-background/70"
            }`}
          >
            <span
              className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border text-xs font-bold ${
                isDone
                  ? "border-success/60 bg-success/15 text-success"
                  : "border-border bg-background/60 text-muted-foreground"
              }`}
            >
              {isDone ? <Check className="h-4 w-4" /> : i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate text-sm font-semibold">{l.title}</span>
                <Badge variant="outline" className="shrink-0 text-[10px]">
                  {l.topic}
                </Badge>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {locked ? "Pass the previous practice to unlock" : `~${l.minutes} min read + practice`}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
