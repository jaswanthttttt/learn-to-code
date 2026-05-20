import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, Code2, Lightbulb, Sparkles } from "lucide-react";
import type { Lesson } from "@/lib/lessons";

export function LessonView({
  lesson,
  done,
  onComplete,
  onBack,
}: {
  lesson: Lesson;
  done: boolean;
  onComplete: () => void;
  onBack: () => void;
}) {
  return (
    <Card className="border-border/60 bg-card/70 p-6 backdrop-blur">
      <button onClick={onBack} className="mb-3 text-xs text-muted-foreground hover:text-foreground">
        ← Back to lessons
      </button>
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary" className="uppercase tracking-wider">
          {lesson.track === "python" ? "Python" : "CAD"}
        </Badge>
        <Badge variant="outline">{lesson.topic}</Badge>
        <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" /> ~{lesson.minutes} min
        </span>
      </div>
      <h2 className="mt-3 text-2xl font-bold tracking-tight">{lesson.title}</h2>

      <div className="mt-5 space-y-4">
        {lesson.blocks.map((b, i) => {
          if (b.type === "text")
            return (
              <p key={i} className="whitespace-pre-line text-sm leading-relaxed text-foreground/90">
                {b.content}
              </p>
            );
          if (b.type === "code")
            return (
              <div key={i}>
                <pre className="overflow-x-auto rounded-lg border border-border/60 bg-background/60 p-4 font-mono text-sm leading-relaxed">
                  <code>{b.content}</code>
                </pre>
                {b.caption && (
                  <p className="mt-1 text-xs italic text-muted-foreground">{b.caption}</p>
                )}
              </div>
            );
          if (b.type === "tip")
            return (
              <div key={i} className="flex gap-3 rounded-lg border border-primary/30 bg-primary/5 p-3">
                <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p className="text-sm text-foreground/90">{b.content}</p>
              </div>
            );
          return (
            <div key={i} className="flex gap-3 rounded-lg border border-accent/30 bg-accent/5 p-3">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <p className="text-sm text-foreground/90">
                <span className="font-semibold text-foreground">Try it: </span>
                {b.content}
              </p>
            </div>
          );
        })}
      </div>

      <Button
        onClick={onComplete}
        className="mt-6 w-full bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90"
      >
        {done ? "Lesson complete — review again" : "Mark complete (+20 XP)"}
      </Button>
    </Card>
  );
}

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
                  {l.track === "python" ? <Code2 className="mr-1 h-2.5 w-2.5" /> : null}
                  {l.topic}
                </Badge>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {locked ? "Complete the previous lesson to unlock" : `~${l.minutes} min read`}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
