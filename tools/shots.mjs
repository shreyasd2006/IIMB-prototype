// Several screenshots in one browser: node tools/shots.mjs <outDir> <width> "path|selector|name" ...
// selector may end with @N to add N px to the scroll target (e.g. "#chair@300").
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { launch, sleep } from "./cdp.mjs";
const [outDir, w, ...jobs] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });
const b = await launch({ width: +w, height: +w < 700 ? 812 : 900, mobile: +w < 700 });
let last = "";
for (const job of jobs) {
  const [path, selRaw, name] = job.split("|");
  const [sel, off = "0"] = selRaw.split("@");
  try {
    if (path !== last) { await b.goto("http://127.0.0.1:8767/" + path, 6000); last = path; }
    await b.evaluate(`(() => { const t = document.querySelector(${JSON.stringify(sel)}); if (!t) return; const y = t.getBoundingClientRect().top + scrollY - 110 + ${+off}; J.lenis ? J.lenis.scrollTo(y, { immediate: true }) : scrollTo(0, y); })()`);
    await sleep(2600);
    writeFileSync(join(outDir, name + ".jpg"), await b.shot({ quality: 68 }));
    console.log("ok", name);
  } catch (e) { console.log("fail", name, e.message); }
}
b.close();
