import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Sparkles, BookOpen, Trophy, Code2 } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "Quick Learner — Learn coding by ranking up" },
      { name: "description", content: "Gamified lessons for Python, C, C++, Java, JS, TS, SQL, Go, Rust, Swift and HTML. Earn XP, climb ranks, learn fast." },
    ],
  }),
});

function Landing() {
  return (
    <div className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <nav className="mb-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-primary shadow-glow">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">Quick Learner</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/app">
              <Button size="sm" className="bg-gradient-primary text-primary-foreground">Start Learning</Button>
            </Link>
          </div>
        </nav>
        <section className="text-center">
          <h1 className="text-balance text-5xl font-bold tracking-tight md:text-6xl">
            Learn coding by <span className="text-gradient-primary">ranking up</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-balance text-muted-foreground">
            Bite-sized lessons in Python, C, C++, Java, JS, TS, SQL, Go, Rust, Swift and HTML.
            Read, practice, prove it — then move on.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/app">
              <Button size="lg" className="bg-gradient-primary text-primary-foreground shadow-glow">
                Start learning free →
              </Button>
            </Link>
          </div>
        </section>
        <section className="mt-20 grid gap-4 md:grid-cols-3">
          <Feature icon={<BookOpen className="h-5 w-5" />} title="Read" body="Short lessons you can finish in a few minutes." />
          <Feature icon={<Code2 className="h-5 w-5" />} title="Practice" body="Write code that matches the lesson to unlock the next." />
          <Feature icon={<Trophy className="h-5 w-5" />} title="Rank up" body="Earn XP through 9 ranks as you master each track." />
        </section>
      </div>
    </div>
  );
}

function Feature({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/40 p-5 backdrop-blur">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/15 text-primary">{icon}</div>
      <h3 className="mt-3 font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
