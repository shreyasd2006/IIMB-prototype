// Hover the first matching element and screenshot: node tools/hover_shot.mjs <path> <selector> <out.jpg>
import { writeFileSync } from "node:fs";
import { launch, sleep } from "./cdp.mjs";
const [path, sel, out] = process.argv.slice(2);
const b = await launch({ width: 1440, height: 900 });
await b.goto("http://127.0.0.1:8767/" + path, 6000);
await b.evaluate(`(() => { const t = document.querySelector(${JSON.stringify(sel)}); const y = t.getBoundingClientRect().top + scrollY - 200; J.lenis ? J.lenis.scrollTo(y, { immediate: true }) : scrollTo(0, y); })()`);
await sleep(2500);
const [x, y] = JSON.parse(await b.evaluate(`JSON.stringify((() => { const r = document.querySelector(${JSON.stringify(sel)}).getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; })())`));
await b.send("Input.dispatchMouseEvent", { type: "mouseMoved", x, y });
await sleep(1200);
writeFileSync(out, await b.shot({ quality: 72 }));
b.close();
