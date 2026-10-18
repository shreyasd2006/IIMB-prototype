// Benchmark research: visit real institutional sites, capture first viewport + a scrolled full page
// at desktop and mobile widths, and extract navigation + heading outline.
// Usage: node tools/bench.mjs <outDir> <name>=<url> ...
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { launch, sleep } from "./cdp.mjs";

const [outDir, ...pairs] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0";
const UAM = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";

const outline = `(() => {
  const t = (e) => (e.innerText || e.textContent || '').replace(/\\s+/g, ' ').trim();
  const nav = [...document.querySelectorAll('header a, nav a, [role=navigation] a')].map(t).filter((s) => s && s.length < 40);
  const heads = [...document.querySelectorAll('h1,h2,h3')].map((h) => h.tagName + ': ' + t(h)).filter((s) => s.length > 4).slice(0, 70);
  const fonts = [...new Set([...document.querySelectorAll('h1,h2,p,a,button')].slice(0, 200).map((e) => getComputedStyle(e).fontFamily.split(',')[0]))].slice(0, 8);
  const vids = document.querySelectorAll('video').length;
  return { title: document.title, nav: [...new Set(nav)].slice(0, 60), heads, fonts, vids, height: document.documentElement.scrollHeight };
})()`;

const report = {};
for (const mode of ["desk", "mob"]) {
  const mobile = mode === "mob";
  const b = await launch({ width: mobile ? 390 : 1440, height: mobile ? 844 : 900, mobile, ua: mobile ? UAM : UA });
  for (const pair of pairs) {
    const i = pair.indexOf("=");
    const name = pair.slice(0, i), url = pair.slice(i + 1);
    try {
      await b.goto(url, 6000);
      // dismiss common cookie banners
      await b.evaluate(`[...document.querySelectorAll('button,a')].filter(e=>/^(accept|accept all|allow all|i agree|agree|got it|ok)$/i.test((e.innerText||'').trim())).slice(0,2).forEach(e=>{try{e.click()}catch{}})`).catch(() => {});
      await sleep(800);
      writeFileSync(join(outDir, `${name}-${mode}-fold.jpg`), await b.shot());
      const h = await b.evaluate("document.documentElement.scrollHeight");
      for (let y = 0; y < Math.min(h, 12000); y += 600) { await b.evaluate(`scrollTo(0,${y})`); await sleep(160); }
      await b.evaluate("scrollTo(0,0)"); await sleep(700);
      writeFileSync(join(outDir, `${name}-${mode}-full.jpg`), await b.shot({ full: true, maxH: mobile ? 9000 : 7000, quality: 55 }));
      if (!mobile) report[name] = { url, ...(await b.evaluate(outline)) };
      else report[name + "_mob"] = { height: await b.evaluate("document.documentElement.scrollHeight") };
      console.error("ok", mode, name);
    } catch (e) { console.error("fail", mode, name, e.message); report[name + "_" + mode + "_err"] = e.message; }
  }
  b.close();
}
writeFileSync(join(outDir, "outline.json"), JSON.stringify(report, null, 1));
console.log("done");
