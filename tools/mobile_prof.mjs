import { launch, sleep } from "./cdp.mjs";
const UA = "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Mobile Safari/537.36";
const b = await launch({ width: 390, height: 844, mobile: true, ua: UA });
await b.goto("about:blank", 300);
await b.send("Emulation.setCPUThrottlingRate", { rate: Number(process.argv[3] || 4) });
await b.send("Profiler.enable"); await b.send("Profiler.setSamplingInterval", { interval: 1000 });
await b.send("Profiler.start");
await b.send("Page.navigate", { url: "http://127.0.0.1:8767/" + (process.argv[2] || "index.html") });
await sleep(30000);
const { profile } = await b.send("Profiler.stop");
console.log(await b.evaluate(`(() => { const n = performance.getEntriesByType('navigation')[0]; return JSON.stringify({ responseEnd: Math.round(n.responseEnd), domInteractive: Math.round(n.domInteractive), dcl: Math.round(n.domContentLoadedEventEnd), load: Math.round(n.loadEventEnd), mp: document.documentElement.classList.contains('mp') }); })()`));
// self time per function
const byId = new Map(profile.nodes.map((n) => [n.id, n]));
const self = new Map(); const dt = profile.timeDeltas; 
profile.samples.forEach((id, i) => { const n = byId.get(id); const k = n.callFrame.functionName + " " + n.callFrame.url.split("/").pop() + ":" + n.callFrame.lineNumber; self.set(k, (self.get(k) || 0) + (dt[i] || 0)); });
[...self.entries()].sort((a, b) => b[1] - a[1]).slice(0, 22).forEach(([k, v]) => console.log(String(Math.round(v / 1000)).padStart(7), "ms", k));
b.close();
