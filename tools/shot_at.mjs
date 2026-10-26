// Screenshot a page scrolled to an element: node tools/shot_at.mjs <path> <selector> <out.jpg> [width]
import { writeFileSync } from "node:fs";
import { launch, sleep } from "./cdp.mjs";
const [path, sel, out, w = "1440"] = process.argv.slice(2);
const b = await launch({ width: +w, height: 900, mobile: +w < 700 });
await b.goto("http://127.0.0.1:8767/" + path, 6000);
await b.evaluate(`(() => { const t = document.querySelector(${JSON.stringify(sel)}); const y = t.getBoundingClientRect().top + scrollY - 140; J.lenis ? J.lenis.scrollTo(y, { immediate: true }) : scrollTo(0, y); })()`);
await sleep(2500);
writeFileSync(out, await b.shot({ quality: 70 }));
b.close();
