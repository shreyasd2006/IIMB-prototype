import { launch, sleep } from "./cdp.mjs";
const UA = "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Mobile Safari/537.36";
const b = await launch({ width: 390, height: 844, mobile: true, ua: UA });
await b.send("Network.enable");
const req = new Map();
b.on((d) => {
  if (d.method === "Network.requestWillBeSent") req.set(d.params.requestId, { url: d.params.request.url.replace("http://127.0.0.1:8767/", ""), t: d.params.timestamp, type: d.params.type });
  if (d.method === "Network.loadingFinished") { const r = req.get(d.params.requestId); if (r) { r.bytes = d.params.encodedDataLength; r.end = d.params.timestamp; } }
});
await b.send("Page.navigate", { url: "http://127.0.0.1:8767/" + (process.argv[2] || "index.html") });
await sleep(8000);
const t0 = Math.min(...[...req.values()].map((r) => r.t));
const rows = [...req.values()].sort((a, b) => (b.bytes || 0) - (a.bytes || 0));
let tot = 0; rows.forEach((r) => (tot += r.bytes || 0));
console.log("requests", rows.length, "total KB", Math.round(tot / 1024));
rows.slice(0, 25).forEach((r) => console.log(String(Math.round((r.bytes || 0) / 1024)).padStart(6), "KB", (r.type || "").padEnd(10), ((r.t - t0) * 1000).toFixed(0).padStart(6), "ms", r.url.slice(0, 90)));
b.close();
