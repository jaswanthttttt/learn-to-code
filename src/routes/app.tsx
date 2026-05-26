import { createFileRoute } from "@tanstack/react-router";
import { QuizGame } from "@/components/QuizGame";

export const Route = createFileRoute("/app")({
  component: App,
  head: () => ({ meta: [{ title: "Quick Learner — App" }] }),
});

function App() {
  return <QuizGame />;
}
