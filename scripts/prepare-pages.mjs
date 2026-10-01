// Post-processes the static export in ./out for GitHub Pages.
// 1. Next writes per-segment prefetch payloads as nested folders (lessons/__next.lessons/__PAGE__.txt)
//    but the client router requests them flattened (lessons/__next.lessons.__PAGE__.txt). A server
//    maps one to the other; static hosting can't, so write flattened copies alongside.
// 2. Add .nojekyll so GitHub Pages serves _next/ and the __next.* files as-is.
import fs from "node:fs";
import path from "node:path";

const out = path.resolve(process.argv[2] ?? "out");
let copied = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith("__next.")) flatten(dir, full, entry.name);
      else walk(full);
    }
  }
}

function flatten(routeDir, segmentDir, prefix) {
  for (const entry of fs.readdirSync(segmentDir, { withFileTypes: true })) {
    const full = path.join(segmentDir, entry.name);
    const name = `${prefix}.${entry.name}`;
    if (entry.isDirectory()) flatten(routeDir, full, name);
    else {
      fs.copyFileSync(full, path.join(routeDir, name));
      copied++;
    }
  }
}

walk(out);
fs.writeFileSync(path.join(out, ".nojekyll"), "");
console.log(`prepare-pages: wrote ${copied} flattened prefetch files and .nojekyll in ${out}`);
