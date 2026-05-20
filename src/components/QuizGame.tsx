import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { QUESTIONS, RANKS, getRank, type Question, type Track } from "@/lib/questions";
import { LESSONS, lessonsFor, type Lesson } from "@/lib/lessons";
import { LessonView, LessonList } from "@/components/Lessons";
import { Check, X, Flame, Sparkles, Trophy, Code2, Ruler, BookOpen, Swords } from "lucide-react";

type SaveState = {
  xp: number;
  streak: number;
  correct: number;
  attempted: number;
  topRank: number;
  completedLessons: string[];
};

const KEY = "rankforge.save.v2";
const DEFAULT_SAVE: SaveState = { xp: 0, streak: 0, correct: 0, attempted: 0, topRank: 0, completedLessons: [] };

function loadSave(): SaveState {
  if (typeof window === "undefined") return DEFAULT_SAVE;
  try {
    return { ...DEFAULT_SAVE, ...JSON.parse(localStorage.getItem(KEY) || "") };
  } catch {
    return DEFAULT_SAVE;
  }
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Mode = "learn" | "quiz";

export function QuizGame() {
  const [mode, setMode] = useState<Mode>("learn");
  const [track, setTrack] = useState<Track | "mixed">("python");
  const [save, setSave] = useState<SaveState>(DEFAULT_SAVE);
  const [queue, setQueue] = useState<Question[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const [rankUp, setRankUp] = useState<string | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  useEffect(() => { setSave(loadSave()); }, []);
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(save)); }, [save]);

  useEffect(() => {
    const pool = QUESTIONS.filter(q => track === "mixed" ? true : q.track === track);
    setQueue(shuffle(pool));
    setPicked(null);
  }, [track, mode]);

  const current = queue[0];
  const rank = getRank(save.xp);
  const progressToNext = rank.next
    ? Math.min(100, ((save.xp - rank.current.min) / (rank.next.min - rank.current.min)) * 100)
    : 100;
  const accuracy = save.attempted ? Math.round((save.correct / save.attempted) * 100) : 0;

  const grantXp = (amount: number) => {
    setSave(prev => {
      const newXp = prev.xp + amount;
      const before = getRank(prev.xp).index;
      const after = getRank(newXp).index;
      if (after > before) setRankUp(RANKS[after].name);
      return { ...prev, xp: newXp, topRank: Math.max(prev.topRank, after) };
    });
  };

  const answer = (i: number) => {
    if (picked !== null || !current) return;
    setPicked(i);
    const correct = i === current.answer;
    const gained = correct ? current.difficulty * 10 + Math.min(save.streak, 5) * 2 : 0;
    setSave(prev => {
      const newXp = prev.xp + gained;
      const before = getRank(prev.xp).index;
      const after = getRank(newXp).index;
      if (after > before) setRankUp(RANKS[after].name);
      return {
        ...prev,
        xp: newXp,
        streak: correct ? prev.streak + 1 : 0,
        correct: prev.correct + (correct ? 1 : 0),
        attempted: prev.attempted + 1,
        topRank: Math.max(prev.topRank, after),
      };
    });
  };

  const next = () => {
    setQueue(q => {
      const rest = q.slice(1);
      return rest.length ? rest : shuffle(QUESTIONS.filter(qq => track === "mixed" ? true : qq.track === track));
    });
    setPicked(null);
  };

  const completeLesson = (l: Lesson) => {
    if (!save.completedLessons.includes(l.id)) {
      setSave(prev => ({ ...prev, completedLessons: [...prev.completedLessons, l.id] }));
      grantXp(20);
    }
    setActiveLesson(null);
  };

  const reset = () => {
    if (confirm("Reset all progress?")) setSave(DEFAULT_SAVE);
  };

  const lessons = lessonsFor(track === "mixed" ? "python" : track);
  const completedSet = new Set(save.completedLessons);
  const trackLessonsDone = lessons.filter(l => completedSet.has(l.id)).length;

  return (
    <div className="min-h-screen px-4 py-8 md:py-12">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* HEADER */}
        <header className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary shadow-glow">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">RankForge</h1>
                <p className="text-xs text-muted-foreground">Learn Python &amp; CAD from zero. Rank up as you go.</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={reset}>Reset</Button>
          </div>

          {/* RANK CARD */}
          <Card className="overflow-hidden border-border/60 bg-card/70 p-5 backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4" style={{ color: rank.current.color }} />
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">Rank {rank.index + 1}</span>
                </div>
                <h2 className="text-2xl font-bold leading-tight" style={{ color: rank.current.color }}>
                  {rank.current.name}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {rank.next ? `${rank.next.min - save.xp} XP to ${rank.next.name}` : "Maximum rank reached"}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gradient-primary">{save.xp}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">XP</div>
              </div>
            </div>
            <Progress value={progressToNext} className="mt-4 h-2" />
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <Stat label="Streak" value={save.streak} icon={<Flame className="h-3 w-3" />} />
              <Stat label="Accuracy" value={`${accuracy}%`} />
              <Stat label="Lessons" value={`${save.completedLessons.length}/${LESSONS.length}`} />
            </div>
          </Card>
        </header>

        {/* MODE TABS */}
        <div className="grid grid-cols-2 gap-2 rounded-xl border border-border/60 bg-card/40 p-1 backdrop-blur">
          <ModeBtn active={mode === "learn"} onClick={() => setMode("learn")} icon={<BookOpen className="h-4 w-4" />} label="Learn" />
          <ModeBtn active={mode === "quiz"} onClick={() => setMode("quiz")} icon={<Swords className="h-4 w-4" />} label="Quiz" />
        </div>

        {/* TRACK SWITCH */}
        <div className="flex flex-wrap gap-2">
          {mode === "quiz" && (
            <TrackBtn active={track === "mixed"} onClick={() => setTrack("mixed")} label="Mixed" />
          )}
          <TrackBtn active={track === "python"} onClick={() => setTrack("python")} label="Python" icon={<Code2 className="h-3.5 w-3.5" />} />
          <TrackBtn active={track === "cad"} onClick={() => setTrack("cad")} label="CAD" icon={<Ruler className="h-3.5 w-3.5" />} />
        </div>

        {/* LEARN MODE */}
        {mode === "learn" && (
          activeLesson ? (
            <LessonView
              lesson={activeLesson}
              done={completedSet.has(activeLesson.id)}
              onComplete={() => completeLesson(activeLesson)}
              onBack={() => setActiveLesson(null)}
            />
          ) : (
            <Card className="border-border/60 bg-card/70 p-5 backdrop-blur">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                    {track === "cad" ? "CAD" : "Python"} Path
                  </h3>
                  <p className="text-xs text-muted-foreground">Each lesson is a few minutes. Lessons unlock in order.</p>
                </div>
                <Badge variant="outline">{trackLessonsDone}/{lessons.length}</Badge>
              </div>
              <LessonList lessons={lessons} completed={completedSet} onPick={setActiveLesson} />
              {trackLessonsDone === lessons.length && (
                <Button
                  onClick={() => setMode("quiz")}
                  className="mt-4 w-full bg-gradient-accent text-accent-foreground shadow-glow-accent"
                >
                  Path complete — test yourself in the Quiz →
                </Button>
              )}
            </Card>
          )
        )}

        {/* QUIZ MODE */}
        {mode === "quiz" && current && (
          <Card className="border-border/60 bg-card/70 p-6 backdrop-blur">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="uppercase tracking-wider">
                {current.track === "python" ? "Python" : "CAD"}
              </Badge>
              <Badge variant="outline">{current.topic}</Badge>
              <Badge className="bg-gradient-accent text-accent-foreground">
                {"★".repeat(current.difficulty)}<span className="opacity-40">{"★".repeat(5 - current.difficulty)}</span>
              </Badge>
              <span className="ml-auto text-xs text-muted-foreground">+{current.difficulty * 10} XP</span>
            </div>

            <h3 className="text-lg font-semibold leading-snug">{current.prompt}</h3>
            {current.code && (
              <pre className="mt-3 overflow-x-auto rounded-lg border border-border/60 bg-background/60 p-4 text-sm font-mono leading-relaxed">
                <code>{current.code}</code>
              </pre>
            )}

            <div className="mt-5 grid gap-2">
              {current.choices.map((choice, i) => {
                const isPicked = picked === i;
                const isCorrect = i === current.answer;
                const showState = picked !== null;
                return (
                  <button
                    key={i}
                    onClick={() => answer(i)}
                    disabled={picked !== null}
                    className={[
                      "group flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all",
                      "border-border bg-background/40 hover:border-primary/60 hover:bg-background/70",
                      showState && isCorrect && "!border-success/70 !bg-success/10",
                      showState && isPicked && !isCorrect && "!border-destructive/70 !bg-destructive/10",
                      picked !== null && "cursor-default",
                    ].filter(Boolean).join(" ")}
                  >
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-border/70 bg-background/70 text-xs font-mono font-bold">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1">{choice}</span>
                    {showState && isCorrect && <Check className="h-4 w-4 text-success" />}
                    {showState && isPicked && !isCorrect && <X className="h-4 w-4 text-destructive" />}
                  </button>
                );
              })}
            </div>

            {picked !== null && (
              <div className="mt-5 space-y-4 rounded-xl border border-border/60 bg-background/40 p-4">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Why: </span>
                  {current.explanation}
                </p>
                <Button onClick={next} className="w-full bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
                  Next question →
                </Button>
              </div>
            )}
          </Card>
        )}

        {/* RANKS LIST */}
        <Card className="border-border/60 bg-card/40 p-5 backdrop-blur">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">Ranks</h3>
          <div className="grid gap-2">
            {RANKS.map((r, i) => {
              const reached = save.xp >= r.min;
              return (
                <div
                  key={r.name}
                  className={`flex items-center justify-between rounded-lg border px-3 py-2 text-sm ${
                    reached ? "border-border/60 bg-background/40" : "border-border/30 opacity-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="grid h-7 w-7 place-items-center rounded-md font-mono text-xs font-bold"
                      style={{
                        background: reached ? r.color : undefined,
                        color: reached ? "oklch(0.18 0.03 260)" : undefined,
                        border: reached ? "none" : "1px solid var(--color-border)",
                      }}
                    >
                      {i + 1}
                    </span>
                    <span style={{ color: reached ? r.color : undefined }} className="font-medium">{r.name}</span>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">{r.min} XP</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* RANK UP MODAL */}
      {rankUp && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-background/80 p-4 backdrop-blur-sm" onClick={() => setRankUp(null)}>
          <Card className="max-w-sm border-primary/40 bg-card p-8 text-center shadow-glow">
            <Trophy className="mx-auto h-12 w-12 text-primary" />
            <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">Rank Up!</p>
            <h2 className="mt-1 text-3xl font-bold text-gradient-primary">{rankUp}</h2>
            <p className="mt-3 text-sm text-muted-foreground">A new tier of mastery unlocked.</p>
            <Button className="mt-5 w-full bg-gradient-primary text-primary-foreground" onClick={() => setRankUp(null)}>
              Continue
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, icon }: { label: string; value: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border/50 bg-background/40 px-2 py-2">
      <div className="flex items-center justify-center gap-1 text-[10px] uppercase tracking-widest text-muted-foreground">
        {icon}{label}
      </div>
      <div className="mt-0.5 text-base font-bold">{value}</div>
    </div>
  );
}

function TrackBtn({ active, onClick, label, icon }: { active: boolean; onClick: () => void; label: string; icon?: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
        active
          ? "border-primary/60 bg-primary/15 text-primary shadow-glow"
          : "border-border bg-background/40 text-muted-foreground hover:text-foreground"
      }`}
    >
      {icon}{label}
    </button>
  );
}

function ModeBtn({ active, onClick, label, icon }: { active: boolean; onClick: () => void; label: string; icon: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
        active
          ? "bg-gradient-primary text-primary-foreground shadow-glow"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {icon}{label}
    </button>
  );
}
