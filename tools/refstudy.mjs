// Records a reference site's structure: headings in order, sticky/fixed elements, stat-like blocks, plus viewport screenshots.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { launch, sleep } from "./cdp.mjs";
const [outDir, ...pairs] = process.argv.slice(2); mkdirSync(outDir, { recursive: true });
const b = await launch({ width: 1440, height: 900, ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0" });
for (const pair of pairs) {
  const i = pair.indexOf("="); const name = pair.slice(0, i), url = pair.slice(i + 1);
  try {
    await b.goto(url, 6000);
    const H = await b.evaluate("document.documentElement.scrollHeight");
    let k = 0;
    for (let y = 0; y < Math.min(H, 9000); y += 1800, k++) { await b.evaluate(`scrollTo(0,${y})`); await sleep(700); writeFileSync(join(outDir, `${name}-${String(k).padStart(2, "0")}.jpg`), await b.shot({ quality: 55 })); }
    const info = await b.evaluate(`(() => {
      const hs = [...document.querySelectorAll('h1,h2,h3')].filter(h => h.offsetParent).map(h => h.tagName + ' ' + h.innerText.trim().replace(/\s+/g,' ').slice(0,90));
      const sticky = [...document.querySelectorAll('body *')].filter(e => ['sticky','fixed'].includes(getComputedStyle(e).position) && e.offsetHeight > 20).map(e => getComputedStyle(e).position + ' ' + e.tagName + '.' + String(e.className).slice(0,60) + ' :: ' + (e.innerText||"").trim().replace(/\s+/g,' ').slice(0,140)).slice(0,10);
      const nums = [...document.querySelectorAll('body *')].filter(e => e.children.length === 0 && /^[#$]?\d[\d,.]*[%+]?$/.test((e.innerText||"").trim()) && parseFloat(getComputedStyle(e).fontSize) > 28).map(e => (e.innerText||"").trim() + ' :: ' + (e.parentElement.innerText || '').trim().replace(/\s+/g,' ').slice(0,90)).slice(0,25);
      return { title: document.title, h: H = document.documentElement.scrollHeight, hs, sticky, nums };
    })()`);
    writeFileSync(join(outDir, name + ".json"), JSON.stringify(info, null, 1));
    console.log("ok", name, info.title);
  } catch (e) { console.log("fail", name, e.message); }
}
b.close();
