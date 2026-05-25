import { createFileRoute } from "@tanstack/react-router";
import { QuizGame } from "@/components/QuizGame";

export const Route = createFileRoute("/")({
  component: QuizGame,
  head: () => ({
    meta: [
      { title: "Quick Learner — Learn Python & other coding languages by Ranking Up for free" },
      { name: "description", content: "A gamified quiz to master Python and CAD software. Earn XP, climb 9 ranks, build streaks." },
    ],
  }),
});
