// Screenshots + console/overflow/broken-image report for this site (server on :8767).
// Usage: node tools/shoot.mjs <outDir> <width> <path1> [path2 ...]
//   env RM=1 emulates prefers-reduced-motion; FOLD=1 captures only the first viewport (after the intro); WAIT=ms
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { launch, sleep } from "./cdp.mjs";

const [outDir, widthArg, ...paths] = process.argv.slice(2);
const width = Number(widthArg) || 1440, mobile = width < 700;
mkdirSync(outDir, { recursive: true });
const b = await launch({ width, height: mobile ? 844 : 900, mobile, reducedMotion: !!process.env.RM });
const report = {};
for (const p of paths) {
  const errs = [];
  const off = b.on((d) => {
    if (d.method === "Runtime.exceptionThrown") errs.push("EXC " + (d.params.exceptionDetails.exception?.description || d.params.exceptionDetails.text).slice(0, 300));
    if (d.method === "Runtime.consoleAPICalled" && ["error", "warning"].includes(d.params.type)) errs.push(d.params.type + " " + d.params.args.map((a) => a.value || a.description).join(" ").slice(0, 300));
    if (d.method === "Log.entryAdded" && d.params.entry.level === "error") errs.push("LOG " + d.params.entry.text + " " + (d.params.entry.url || ""));
  });
  await b.goto("http://127.0.0.1:8767/" + p, Number(process.env.WAIT || 4200));
  const name = p.replace(/[^a-z0-9]+/gi, "_").replace(/^_|_$/g, "") || "index";
  if (process.env.FOLD) {
    writeFileSync(join(outDir, `${name}-${width}-fold.jpg`), await b.shot({ quality: 80 }));
  } else {
    const h = await b.evaluate("document.documentElement.scrollHeight");
    for (let y = 0; y < h; y += 500) { await b.evaluate(`window.J&&J.lenis?J.lenis.scrollTo(${y},{immediate:true}):scrollTo(0,${y})`); await sleep(140); }
    await b.evaluate("document.querySelectorAll('img[loading=lazy]').forEach(i=>i.loading='eager')");
    await b.evaluate("(async()=>{for(let i=0;i<50;i++){if([...document.images].every(im=>im.complete))break;await new Promise(r=>setTimeout(r,200));}})()", true);
    await sleep(1400);
    await b.evaluate("window.J&&J.lenis?J.lenis.scrollTo(0,{immediate:true}):scrollTo(0,0)"); await sleep(900);
    writeFileSync(join(outDir, `${name}-${width}.jpg`), await b.shot({ full: true, maxH: 16000, quality: 66 }));
  }
  const info = await b.evaluate(`(() => {
    const W = innerWidth;
    const wide = [...document.querySelectorAll('body *')].filter(e => { const r = e.getBoundingClientRect(); return r.right > W + 1 && getComputedStyle(e).position !== 'fixed' && !e.closest('.shelf,.marquee,.rail,.tl-track,.contents,.finder,.peek,.tray,[data-overflow-ok]'); }).slice(0, 6).map(e => e.tagName + '.' + String(e.className).slice(0, 40));
    const broken = [...document.images].filter(i => i.complete && i.naturalWidth === 0 && i.getAttribute('src')).map(i => i.getAttribute('src')).slice(0, 8);
    const h1 = document.querySelectorAll('h1').length;
    return { scrollW: document.documentElement.scrollWidth, W, wide, broken, h1, title: document.title };
  })()`);
  report[p] = { errors: errs, ...info };
  off();
}
console.log(JSON.stringify(report, null, 1));
b.close();
