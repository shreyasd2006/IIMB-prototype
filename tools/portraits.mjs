// Download the official faculty portraits IIMB publishes on its area-wise faculty pages.
// Runs fetch() inside an iimb.ac.in page (the server refuses non-browser clients).
// Usage: node tools/portraits.mjs  (reads research/portrait-urls.json, writes assets/img/faculty/<id>.jpg)
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { launch } from "./cdp.mjs";

const map = JSON.parse(readFileSync(process.argv[2] || "research/portrait-urls.json", "utf8"));
mkdirSync("assets/img/faculty", { recursive: true });
const b = await launch({ width: 1200, height: 800, ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0" });
await b.goto("https://www.iimb.ac.in/faculty-list-area-wise", 5000);
const done = {};
for (const [id, url] of Object.entries(map)) {
  const out = `assets/img/faculty/${id}.jpg`;
  if (existsSync(out)) { done[id] = { file: out, source: url }; continue; }
  try {
    const b64 = await b.evaluate(`new Promise((res, rej) => { const im = new Image(); im.onload = () => { const c = document.createElement('canvas'); const s = Math.min(im.naturalWidth, im.naturalHeight, 600); c.width = s; c.height = s; const x = (im.naturalWidth - s) / 2, y = (im.naturalHeight - s) / 2; c.getContext('2d').drawImage(im, x, y, s, s, 0, 0, s, s); res(c.toDataURL('image/jpeg', 0.86).split(',')[1]); }; im.onerror = () => rej(new Error('img error')); im.src = ${JSON.stringify(url)}; })`, true);
    writeFileSync(out, Buffer.from(b64, "base64"));
    done[id] = { file: out, source: url };
  } catch (e) { console.log("fail", id, e.message); }
}
const prev = existsSync("research/portraits.json") ? JSON.parse(readFileSync("research/portraits.json", "utf8")) : {};
writeFileSync("research/portraits.json", JSON.stringify({ ...prev, ...done }, null, 1));
console.log("saved", Object.keys(done).length);
b.close();
