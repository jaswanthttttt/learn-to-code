import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Check, Clock, Lightbulb, Sparkles, Lock, Eye, BookOpen } from "lucide-react";
import { practiceMatches, type Lesson } from "@/lib/lessons";
import { trackLabel } from "@/lib/tracks";

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
  const [input, setInput] = useState(lesson.practice.starter ?? "");
  const [status, setStatus] = useState<"idle" | "right" | "wrong">("idle");
  const [showMistake, setShowMistake] = useState(false);

  // Reset state when switching lessons
  useEffect(() => {
    setInput(lesson.practice.starter ?? "");
    setStatus(done ? "right" : "idle");
    setShowMistake(false);
  }, [lesson.id, done]);

  const scrollToTop = () => {
    setShowMistake(false);
    setStatus("idle");
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const check = () => {
    if (practiceMatches(input, lesson.practice)) {
      setStatus("right");
      setShowMistake(false);
    } else {
      setStatus("wrong");
    }
  };

  return (
    <Card className="border-border/60 bg-card/70 p-6 backdrop-blur">
      <button onClick={onBack} className="mb-3 text-xs text-muted-foreground hover:text-foreground">
        ← Back to lessons
      </button>
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary" className="uppercase tracking-wider">
          {trackLabel(lesson.track)}
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

      {/* ============ PRACTICE GATE ============ */}
      <div className="mt-8 rounded-xl border border-accent/40 bg-accent/5 p-5">
        <div className="mb-3 flex items-center gap-2">
          <Lock className="h-4 w-4 text-accent" />
          <h3 className="text-sm font-bold uppercase tracking-widest text-accent">Practice to unlock next</h3>
        </div>
        <p className="text-sm text-foreground/90">{lesson.practice.prompt}</p>

        <Textarea
          value={input}
          onChange={e => {
            setInput(e.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          placeholder={lesson.practice.kind === "code" ? "Type your code here..." : "Type your answer..."}
          spellCheck={false}
          rows={lesson.practice.kind === "code" ? 6 : 2}
          className={`mt-3 ${lesson.practice.kind === "code" ? "font-mono text-sm" : ""} ${
            status === "right" ? "border-success/60" : status === "wrong" ? "border-destructive/60" : ""
          }`}
        />

        {status !== "right" && (
          <Button
            onClick={check}
            disabled={!input.trim()}
            className="mt-3 w-full bg-gradient-accent text-accent-foreground shadow-glow-accent hover:opacity-90"
          >
            Check my answer
          </Button>
        )}

        {status === "wrong" && (
          <div className="mt-4 space-y-3">
            <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm">
              <span className="font-semibold text-destructive">Not quite.</span>
              <span className="text-foreground/90">
                You need to write the code exactly as you learned it before moving on.
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={scrollToTop} className="gap-2">
                <BookOpen className="h-4 w-4" /> Re-read the lesson
              </Button>
              <Button variant="outline" onClick={() => setShowMistake(s => !s)} className="gap-2">
                <Eye className="h-4 w-4" /> {showMistake ? "Hide" : "Show me my mistake"}
              </Button>
            </div>
            {showMistake && (
              <div className="space-y-3 rounded-lg border border-border/60 bg-background/60 p-4">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Expected answer</p>
                  <pre className="mt-1 overflow-x-auto rounded-md border border-border/50 bg-background/80 p-3 font-mono text-xs leading-relaxed">
                    <code>{lesson.practice.expected}</code>
                  </pre>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Why it's wrong</p>
                  <p className="mt-1 whitespace-pre-line text-sm text-foreground/90">{lesson.practice.hint}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {status === "right" && (
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2 rounded-lg border border-success/40 bg-success/10 p-3 text-sm">
              <Check className="h-4 w-4 text-success" />
              <span className="font-semibold text-success">Correct!</span>
              <span className="text-foreground/90">You've earned this lesson.</span>
            </div>
            <Button
              onClick={onComplete}
              className="w-full bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90"
            >
              {done ? "Continue" : "Claim +20 XP & unlock next →"}
            </Button>
          </div>
        )}
      </div>
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
