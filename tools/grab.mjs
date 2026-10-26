// Fetch rendered official pages through headless Edge (iimb.ac.in refuses plain HTTP clients).
// Saves text, images and links per page. Usage: node tools/grab.mjs <outDir> <name>=<url> ...
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { launch, sleep } from "./cdp.mjs";

const [outDir, ...pairs] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });
const b = await launch({ width: 1366, height: 900, ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0" });
for (const pair of pairs) {
  const i = pair.indexOf("="); const name = pair.slice(0, i), url = pair.slice(i + 1);
  try {
    await b.goto(url, Number(process.env.WAIT || 5000));
    const h = await b.evaluate("document.documentElement.scrollHeight");
    for (let y = 0; y < Math.min(h, 15000); y += 800) { await b.evaluate(`scrollTo(0,${y})`); await sleep(120); }
    const data = await b.evaluate(`(() => ({
      url: location.href, title: document.title,
      text: (document.querySelector('main, #main, .main-content, article, .region-content') || document.body).innerText,
      imgs: [...document.images].map(i => ({ src: i.currentSrc || i.src, alt: i.alt, w: i.naturalWidth, h: i.naturalHeight })).filter(i => i.w > 80),
      links: [...document.querySelectorAll('a[href]')].map(a => [a.innerText.trim().replace(/\\s+/g,' '), a.href]).filter(l => l[0]),
      yt: [...document.querySelectorAll('iframe')].map(f => f.src).filter(s => /youtube/.test(s))
    }))()`);
    writeFileSync(join(outDir, name + ".json"), JSON.stringify({ fetched: new Date().toISOString(), ...data }, null, 1));
    console.log("ok", name, data.title, data.text.length, "chars", data.imgs.length, "imgs");
  } catch (e) { console.log("fail", name, e.message); }
}
b.close();
