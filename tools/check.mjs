// Functional checks in headless Edge: every detail page renders, filters and search work.
import { spawn } from "node:child_process";
import { join } from "node:path";
import { tmpdir } from "node:os";
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const port = 9700 + Math.floor(Math.random() * 200);
const proc = spawn(EDGE, ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${join(tmpdir(), "edge-check-" + port)}`, "--no-first-run", "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let ws, id = 0; const pending = new Map(); let errs = [];
for (let i = 0; i < 40 && !ws; i++) { try { const t = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((x) => x.type === "page"); if (t) ws = new WebSocket(t.webSocketDebuggerUrl); } catch {} await sleep(250); }
if (ws.readyState !== 1) await new Promise((r) => (ws.onopen = r));
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { pending.get(d.id)(d.result); pending.delete(d.id); } else if (d.method === "Runtime.exceptionThrown") errs.push(d.params.exceptionDetails.exception?.description?.split("\n")[0]); else if (d.method === "Log.entryAdded" && d.params.entry.level === "error") errs.push(d.params.entry.text + " " + (d.params.entry.url || "")); };
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); setTimeout(() => { if (pending.has(i)) { pending.delete(i); console.log("TIMEOUT", method, JSON.stringify(params).slice(0, 120)); res({}); } }, 15000); });
const ev = async (expr) => (await send("Runtime.evaluate", { expression: `(async()=>{${expr}})()`, awaitPromise: true, returnByValue: true })).result?.value;
await send("Runtime.enable"); await send("Log.enable"); await send("Page.enable");
const B = "http://127.0.0.1:8765/";
const go = async (u) => { errs = []; await send("Page.navigate", { url: B + u }); await sleep(700); };
const fails = []; let n = 0;
const assert = (ok, msg) => { n++; if (!ok) { fails.push(msg); console.log("FAIL", msg); } if (n % 25 === 0) console.log("..", n); };

await go("search.html?q=doshi");
assert(await ev(`for(let i=0;i<30&&!document.querySelector('#pageResults .result');i++) await new Promise(r=>setTimeout(r,200)); return document.querySelector('#pageResults').textContent.includes('Walk the talk with Dr. BV Doshi')`), "search 'doshi' finds the Doshi film");
// hero video
await go("index.html"); await sleep(2500);
assert(await ev(`const v=document.querySelector('#heroVideo'); return v.readyState>0`), "hero video loads");
assert(await ev(`const v=document.querySelector('#heroVideo'); document.querySelector('#heroToggle').click(); await new Promise(r=>setTimeout(r,200)); return v.paused && document.querySelector('#heroToggle').getAttribute('aria-pressed')==='true'`), "pause control works");
assert(await ev(`const v=document.querySelector('#heroVideo'); document.querySelector('#heroToggle').click(); await new Promise(r=>setTimeout(r,300)); const playing=!v.paused; scrollTo(0, 4000); await new Promise(r=>setTimeout(r,700)); return playing && v.paused`), "video pauses when scrolled away");
// film click-to-load
assert(await ev(`document.querySelector('#filmMain [data-yt]').click(); return !!document.querySelector('#filmMain iframe[src*="youtube-nocookie.com/embed/7AuZ1cebqGU"]')`), "film poster loads YouTube iframe on click");
await go("index.html");
const ids = await ev(`for(let i=0;i<50&&!(window.IIMB&&IIMB.faculty&&IIMB.events);i++) await new Promise(r=>setTimeout(r,200)); return {f:IIMB.faculty.map(x=>x.id),p:IIMB.programmes.map(x=>x.id),c:IIMB.centres.map(x=>x.id),n:IIMB.news.map(x=>x.id),e:IIMB.events.map(x=>x.id)}`);
for (const [page, key, sel] of [["person.html?id=", "f", "#pName"], ["programme.html?id=", "p", "#pTitle"], ["centre.html?id=", "c", "#cName"], ["story.html?id=", "n", "#sTitle"], ["story.html?event=", "e", "#sTitle"]]) {
  for (const x of ids[key]) {
    await go(page + x);
    const t = await ev(`return [document.querySelector('${sel}')?.textContent||'', document.querySelector('main').innerText.length]`);
    assert(t[0] && !/not found/i.test(t[0]) && t[1] > 400, `${page}${x}: empty or not found (${t[0]})`);
    assert(!errs.length, `${page}${x}: ${errs.join(" ; ")}`);
  }
}
// faculty filters
await go("faculty.html?q=game%20theory");
assert(await ev(`return document.querySelectorAll('#fList li').length>0 && document.querySelectorAll('#fList li').length<10`), "faculty search 'game theory'");
await go("faculty.html?area=Marketing");
assert(await ev(`return [...document.querySelectorAll('#fList .areas-cell')].every(e=>e.textContent.includes('Marketing')) && document.querySelectorAll('#fList li').length===10`), "faculty area filter Marketing = 10");
await go("faculty.html?q=zzzzqx");
assert(await ev(`return !document.querySelector('#fEmpty').hidden`), "faculty empty state");
// research
await go("research.html?theme=digital");
assert(await ev(`return document.querySelectorAll('#wpList li').length>0 && document.querySelectorAll('#wpList li').length<50`), "research theme filter");
await go("research.html");
assert(await ev(`const s=document.querySelector('#wpYear'); s.value='2024'; s.dispatchEvent(new Event('change')); return [...document.querySelectorAll('#wpList .em2')].every(e=>e.textContent.includes('2024'))`), "research year filter");
// news
await go("news.html");
assert(await ev(`document.querySelector('[data-m="2026-09"]').click(); await new Promise(r=>setTimeout(r,50)); return [...document.querySelectorAll('#newsItems time')].every(t=>t.getAttribute('datetime').startsWith('2026-09')) && document.querySelectorAll('#newsItems li').length>0`), "news month filter");
assert(await ev(`const c=document.querySelector('#nCat'); c.value='Rankings'; c.dispatchEvent(new Event('change')); return document.querySelectorAll('#newsItems .cat').length>0 && [...document.querySelectorAll('#newsItems .cat')].every(e=>e.textContent==='Rankings')`), "news category filter");
assert(await ev(`document.querySelector('#tab-events').click(); return !document.querySelector('#panel-events').hidden && document.querySelectorAll('#evUpcoming li').length===12`), "events tab shows 12 upcoming");
await go("news.html?today=2026-12-20#events");
assert(await ev(`return document.querySelectorAll('#evPast li').length>0`), "events move to past with ?today");
// programmes + centres
await go("programmes.html");
assert(await ev(`document.querySelector('[data-level="Undergraduate"]').click(); return document.querySelectorAll('#progTable tr').length===3`), "programme level filter");
await go("centres.html?q=health");
assert(await ev(`return document.querySelectorAll('#cGrid .centre-row').length>0`), "centres search");
// search overlay + page
await go("index.html");
assert(await ev(`document.querySelector('#searchOpen').click(); const q=document.querySelector('#q'); q.value='Doshi'; q.dispatchEvent(new Event('input')); await new Promise(r=>setTimeout(r,250)); return document.querySelector('#searchSheet').classList.contains('open') && document.querySelectorAll('#searchResults .result').length>0`), "search overlay Doshi");
await go("search.html?q=PGP%20fee");
assert(await ev(`return document.querySelector('#pageResults').textContent.includes('Post Graduate Programme in Management')`), "search page 'PGP fee' finds PGP");
await go("search.html?q=Sahoo");
assert(await ev(`return document.querySelector('#pageResults').textContent.includes('Soham Sahoo')`), "search finds faculty");
// industry form validation
await go("industry.html");
assert(await ev(`document.querySelector('#enquiry button[type=submit]').click(); return document.querySelector('#eErr').textContent.length>0 && document.querySelector('#eName').getAttribute('aria-invalid')==='true'`), "enquiry validation");
// internal links resolve
const links = await ev(`return [...new Set([...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')).filter(h=>!/^(https?:|mailto:|#)/.test(h)).map(h=>h.split('#')[0].split('?')[0]))]`);
for (const l of links) { const r = await fetch(B + l); assert(r.ok, "broken internal link " + l); }
console.log(`${n - fails.length}/${n} checks passed`); fails.forEach((f) => console.log("FAIL", f));
ws.close(); proc.kill(); process.exit(0);
