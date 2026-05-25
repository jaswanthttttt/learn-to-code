// Static SPA client entry — used for Netlify deployment (no SSR).
// Replaces TanStack Start's default client entry which expects SSR-rendered
// HTML and hydration data. Here we mount the router into #root with createRoot.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";

const router = getRouter();
const container = document.getElementById("root")!;

createRoot(container).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
