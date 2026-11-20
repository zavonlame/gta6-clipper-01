// gta6-clipper-01: the program for this bounty only hands the video address
// to the grader. The clip itself lives on YouTube as a public Short; this
// file copies the VIDEO.json pointer from the repo root into the output
// folder so the grader can find the video.

import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(process.env.MAKEFUN_BOT_DIR ?? "/bot");
const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
const source = join(repoRoot, "VIDEO.json");
const target = join(outDir, "VIDEO.json");

if (!existsSync(source)) {
  throw new Error(`VIDEO.json not found at ${source}`);
}

const pointer = JSON.parse(readFileSync(source, "utf8"));
if (typeof pointer !== "object" || pointer === null || typeof pointer.url !== "string") {
  throw new Error("VIDEO.json must be an object with a string url field");
}
if (pointer.url.trim().length === 0) {
  throw new Error("VIDEO.json url must not be empty");
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);
console.log(`Wrote ${target} -> ${pointer.url}`);
