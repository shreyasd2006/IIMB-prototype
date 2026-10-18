// Save official images through a browser page on iimb.ac.in (re-encoded via canvas, no crop).
// Usage: node tools/fetchimg.mjs <url>=<out.jpg> [...]
import { writeFileSync } from "node:fs";
import { launch } from "./cdp.mjs";
const b = await launch({ width: 1200, height: 800, ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36 Edg/130.0.0.0" });
await b.goto("https://www.iimb.ac.in/centres-of-excellence/csitm", 4000);
for (const pair of process.argv.slice(2)) {
  const i = pair.lastIndexOf("="); const url = pair.slice(0, i), out = pair.slice(i + 1);
  try {
    const b64 = await b.evaluate(`new Promise((res, rej) => { const im = new Image(); im.onload = () => { const c = document.createElement('canvas'); const s = Math.min(1, 1600 / im.naturalWidth); c.width = Math.round(im.naturalWidth * s); c.height = Math.round(im.naturalHeight * s); c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); res(c.toDataURL('image/jpeg', 0.84).split(',')[1]); }; im.onerror = () => rej(new Error('img error')); im.src = ${JSON.stringify(url)}; })`, true);
    writeFileSync(out, Buffer.from(b64, "base64")); console.log("ok", out);
  } catch (e) { console.log("fail", url, e.message); }
}
b.close();
