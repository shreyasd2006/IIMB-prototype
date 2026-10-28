// Save the full rendered HTML of official pages (hidden tabs included) through headless Edge.
// Usage: node tools/grab_html.mjs <outDir> <name>=<url> ...
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { launch, sleep } from "./cdp.mjs";

const [outDir, ...pairs] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });
const b = await launch({ width: 1366, height: 900, ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0" });
for (const pair of pairs) {
  const i = pair.indexOf("="); const name = pair.slice(0, i), url = pair.slice(i + 1);
  try {
    await b.goto(url, Number(process.env.WAIT || 6000));
    const h = await b.evaluate("document.documentElement.scrollHeight");
    for (let y = 0; y < Math.min(h, 20000); y += 800) { await b.evaluate(`scrollTo(0,${y})`); await sleep(120); }
    // press any "Load more" buttons a few times
    for (let k = 0; k < 6; k++) { await b.evaluate(`[...document.querySelectorAll('a,button')].filter(a => /load more/i.test(a.textContent)).forEach(a => a.click())`); await sleep(700); }
    const html = await b.evaluate("document.documentElement.outerHTML");
    writeFileSync(join(outDir, name + ".html"), html);
    console.log("ok", name, html.length);
  } catch (e) { console.log("fail", name, e.message); }
}
b.close();
