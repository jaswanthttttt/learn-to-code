import type { Track } from "./questions";

export const TRACK_META: Record<Track, { label: string; short: string }> = {
  python: { label: "Python", short: "PY" },
  cad: { label: "CAD", short: "CAD" },
  c: { label: "C", short: "C" },
  cpp: { label: "C++", short: "C++" },
  java: { label: "Java", short: "JAVA" },
  html: { label: "HTML", short: "HTML" },
  javascript: { label: "JavaScript", short: "JS" },
  typescript: { label: "TypeScript", short: "TS" },
  sql: { label: "SQL", short: "SQL" },
  go: { label: "Go", short: "GO" },
  rust: { label: "Rust", short: "RS" },
  swift: { label: "Swift", short: "SW" },
};

export const ALL_TRACKS = Object.keys(TRACK_META) as Track[];

export function trackLabel(t: Track): string {
  return TRACK_META[t]?.label ?? t;
}
