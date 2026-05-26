import { createFileRoute, redirect } from "@tanstack/react-router";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { QuizGame } from "@/components/QuizGame";

export const Route = createFileRoute("/app")({
  component: ProtectedApp,
  head: () => ({ meta: [{ title: "Quick Learner — App" }] }),
});

function ProtectedApp() {
  return (
    <>
      <SignedIn>
        <QuizGame />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
