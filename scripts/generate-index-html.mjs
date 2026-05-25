// Generates dist/client/index.html for static SPA hosting (Netlify).
// TanStack Start normally renders HTML via SSR; on a static host we ship a
// minimal shell that boots the client bundle, and the router takes over.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const clientDir = "dist/client";
const manifestPath = join(clientDir, ".vite/manifest.json");

if (!existsSync(manifestPath)) {
  console.error(`[generate-index-html] missing ${manifestPath}`);
  process.exit(1);
}

const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

const entry = Object.values(manifest).find((c) => c.isEntry);
if (!entry) {
  console.error("[generate-index-html] no entry chunk found in manifest");
  process.exit(1);
}

const cssEntry = Object.entries(manifest).find(([k]) => k.endsWith("styles.css"));
const cssHrefs = new Set();
if (cssEntry) cssHrefs.add(cssEntry[1].file);
for (const css of entry.css ?? []) cssHrefs.add(css);

const cssTags = [...cssHrefs]
  .map((href) => `    <link rel="stylesheet" href="/${href}">`)
  .join("\n");

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Quick Learner</title>
    <meta name="description" content="Learn Python, CAD and 10+ programming languages by ranking up." />
${cssTags}
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/${entry.file}"></script>
  </body>
</html>
`;

writeFileSync(join(clientDir, "index.html"), html);
console.log(`[generate-index-html] wrote ${clientDir}/index.html (entry=${entry.file})`);
