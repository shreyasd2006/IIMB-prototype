// Sample frames from a local video served by tools/serve.py; also writes poster JPEGs.
// Usage: node tools/vidframes.mjs <video path rel. to site> <outDir> <count>            (contact frames)
//        node tools/vidframes.mjs <video path> <outFile.jpg> --at <seconds> [--w 1600]  (one poster frame)
import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { launch } from "./cdp.mjs";

const [video, out, a3, a4, a5, a6] = process.argv.slice(2);
const single = a3 === "--at";
const W = single && a5 === "--w" ? +a6 : 640;
const b = await launch({ width: W, height: Math.round(W * 9 / 16) });
await b.goto("http://127.0.0.1:8767/tools/blank.html", 800).catch(() => {});
const dur = await b.evaluate(`new Promise(r=>{document.body.style.margin=0;document.body.innerHTML='<video id=v muted preload=auto src="/${video}" style="position:fixed;inset:0;width:100vw;height:100vh;object-fit:cover"></video>';const v=document.getElementById('v');v.onloadedmetadata=()=>r([v.duration,v.videoWidth,v.videoHeight]);})`, true);
console.log("duration/size", dur);
const grab = async (t, file, q = 62) => {
  await b.evaluate(`new Promise(r=>{const v=document.getElementById('v');v.onseeked=()=>setTimeout(r,250);v.currentTime=${t};})`, true);
  writeFileSync(file, await b.shot({ quality: q }));
};
if (single) { mkdirSync(dirname(out), { recursive: true }); await grab(+a4, out, 82); }
else { mkdirSync(out, { recursive: true }); const n = +a3; for (let i = 0; i < n; i++) { const t = (dur[0] * (i + 0.5)) / n; await grab(t, join(out, `t${String(t.toFixed(1)).padStart(5, "0")}.jpg`)); } }
b.close();
