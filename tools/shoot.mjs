// Headless Edge via the DevTools protocol: full-page screenshots + console errors.
// Usage: node tools/shoot.mjs <outDir> <width> <path1> [path2 ...]   (paths relative to http://127.0.0.1:8765/)
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const [outDir, widthArg, ...paths] = process.argv.slice(2);
const width = Number(widthArg) || 1440;
const mobile = width < 600;
mkdirSync(outDir, { recursive: true });
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const port = 9300 + Math.floor(Math.random() * 400);
const prof = join(tmpdir(), "edge-shoot-" + port);
const proc = spawn(EDGE, ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, "--no-first-run", "--hide-scrollbars", "--mute-audio", "--autoplay-policy=no-user-gesture-required", "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let ws, id = 0; const pending = new Map(); const listeners = [];
async function connect() {
  for (let i = 0; i < 40; i++) {
    try { const r = await fetch(`http://127.0.0.1:${port}/json/list`); const t = (await r.json()).find((x) => x.type === "page"); if (t) return t.webSocketDebuggerUrl; } catch {}
    await sleep(250);
  }
  throw new Error("no devtools");
}
const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method, params })); });

const url = await connect();
ws = new WebSocket(url);
await new Promise((r) => (ws.onopen = r));
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { const p = pending.get(d.id); pending.delete(d.id); d.error ? p.rej(new Error(d.error.message)) : p.res(d.result); } else listeners.forEach((l) => l(d)); };
await send("Page.enable"); await send("Runtime.enable"); await send("Log.enable");
await send("Emulation.setDeviceMetricsOverride", { width, height: mobile ? 844 : 900, deviceScaleFactor: 1, mobile });
const report = {};
for (const p of paths) {
  const errs = [];
  const l = (d) => {
    if (d.method === "Runtime.exceptionThrown") errs.push("EXC " + (d.params.exceptionDetails.exception?.description || d.params.exceptionDetails.text));
    if (d.method === "Runtime.consoleAPICalled" && ["error", "warning"].includes(d.params.type)) errs.push(d.params.type + " " + d.params.args.map((a) => a.value || a.description).join(" "));
    if (d.method === "Log.entryAdded" && d.params.entry.level === "error") errs.push("LOG " + d.params.entry.text + " " + (d.params.entry.url || ""));
  };
  listeners.push(l);
  await send("Page.navigate", { url: "http://127.0.0.1:8765/" + p });
  await sleep(3500);
  // scroll through to trigger lazy images + reveals, then return to top
  const h = (await send("Runtime.evaluate", { expression: "document.documentElement.scrollHeight", returnByValue: true })).result.value;
  for (let y = 0; y < h; y += 700) { await send("Runtime.evaluate", { expression: `scrollTo(0,${y})` }); await sleep(120); }
  await send("Runtime.evaluate", { expression: "document.querySelectorAll('img[loading=lazy]').forEach(i=>i.loading='eager')" });
  await send("Runtime.evaluate", { expression: "(async()=>{for(let i=0;i<60;i++){if([...document.images].every(im=>im.complete))break;await new Promise(r=>setTimeout(r,200));}})()", awaitPromise: true });
  await sleep(600);
  await send("Runtime.evaluate", { expression: "scrollTo(0,0); document.querySelectorAll('.pergola').forEach(e=>{e.classList.remove('pending','lit');e.classList.add('done')})" });
  await sleep(900);
  const metrics = await send("Page.getLayoutMetrics");
  const H = Math.ceil(metrics.cssContentSize.height);
  const overflow = (await send("Runtime.evaluate", { expression: "[document.documentElement.scrollWidth, innerWidth, [...document.querySelectorAll('body *')].filter(e=>e.getBoundingClientRect().right>innerWidth+1).slice(0,5).map(e=>e.tagName+'.'+e.className).join(' | ')]", returnByValue: true })).result.value;
  const shot = await send("Page.captureScreenshot", { format: "jpeg", quality: 70, captureBeyondViewport: true, clip: { x: 0, y: 0, width, height: Math.min(H, 16000), scale: 1 } });
  const name = p.replace(/[^a-z0-9]+/gi, "_").replace(/^_|_$/g, "") || "index";
  writeFileSync(join(outDir, `${name}-${width}.jpg`), Buffer.from(shot.data, "base64"));
  const wide = (await send("Runtime.evaluate", { expression: `[...document.querySelectorAll("body *")].filter(e=>{const w=e.getBoundingClientRect().width;return w>${width}+2 && ![...e.children].some(c=>c.getBoundingClientRect().width>${width}+2)}).slice(0,6).map(e=>e.tagName+'.'+(e.className||'')+'#'+e.id+' w='+Math.round(e.getBoundingClientRect().width))`, returnByValue: true })).result.value;
  const broken = (await send("Runtime.evaluate", { expression: "[...document.images].filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.currentSrc||i.src).slice(0,8)", returnByValue: true })).result.value;
  report[p] = { height: H, errors: errs, overflow, broken, wide };
  listeners.splice(listeners.indexOf(l), 1);
}
console.log(JSON.stringify(report, null, 1));
ws.close(); proc.kill();
process.exit(0);
