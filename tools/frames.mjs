// Capture timed frames of the first viewport to inspect motion (intro sequences, transitions).
// Usage: node tools/frames.mjs <outDir> <width> <path> <ms,ms,ms...> [scrollY]
//   env CLICK="selector" clicks an element at t=0 (after load) and frames are timed from the click.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { launch, sleep } from "./cdp.mjs";

const [outDir, widthArg, path, times, scrollY] = process.argv.slice(2);
const width = Number(widthArg) || 1440, mobile = width < 700;
mkdirSync(outDir, { recursive: true });
const b = await launch({ width, height: mobile ? 844 : 900, mobile });
const ts = times.split(",").map(Number);
await b.send("Page.navigate", { url: "http://127.0.0.1:8767/" + path });
if (scrollY || process.env.CLICK) {
  await sleep(4000);
  if (scrollY) { await b.evaluate(`window.J&&J.lenis?J.lenis.scrollTo(${scrollY},{immediate:true}):scrollTo(0,${scrollY})`); await sleep(300); }
  if (process.env.CLICK) await b.evaluate(`document.querySelector(${JSON.stringify(process.env.CLICK)}).click()`);
}
const t0 = Date.now();
const name = path.replace(/[^a-z0-9]+/gi, "_").replace(/^_|_$/g, "") || "index";
for (const t of ts) {
  const wait = t - (Date.now() - t0); if (wait > 0) await sleep(wait);
  writeFileSync(join(outDir, `${name}-${String(t).padStart(5, "0")}.jpg`), await b.shot({ quality: 60 }));
}
b.close();
