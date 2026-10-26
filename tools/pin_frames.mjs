// Scroll through a section in steps and screenshot each: node tools/pin_frames.mjs <path> <selector> <outPrefix> [steps] [stepPx]
import { writeFileSync } from "node:fs";
import { launch, sleep } from "./cdp.mjs";
const [path, sel, out, steps = "4", stepPx = "500"] = process.argv.slice(2);
const b = await launch({ width: 1440, height: 900 });
await b.goto("http://127.0.0.1:8767/" + path, 6000);
const y0 = await b.evaluate(`(() => { const t = document.querySelector(${JSON.stringify(sel)}); return t.getBoundingClientRect().top + scrollY - 80; })()`);
for (let i = 0; i < +steps; i++) {
  const y = y0 + i * +stepPx;
  await b.evaluate(`J.lenis ? J.lenis.scrollTo(${y}, { immediate: true }) : scrollTo(0, ${y})`);
  await sleep(1400);
  writeFileSync(`${out}-${i}.jpg`, await b.shot({ quality: 60 }));
}
console.log(await b.evaluate(`JSON.stringify({ pinned: !!document.querySelector('.pc-pinned'), spacer: !!document.querySelector('.pin-spacer .prog-sec') })`));
b.close();
