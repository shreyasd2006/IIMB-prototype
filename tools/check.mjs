// Functional checks in headless Edge: every route and detail page renders without errors, has one h1,
// internal links resolve, and the main interactions work. Usage: node tools/check.mjs   (server on :8767)
import { readFileSync, existsSync } from "node:fs";
import { launch, sleep } from "./cdp.mjs";

const BASE = "http://127.0.0.1:8767/";
const results = []; let fails = 0;
const ok = (name, cond, info = "") => { results.push(`${cond ? "PASS" : "FAIL"}  ${name}${info ? "  — " + info : ""}`); if (!cond) fails++; };

// ids from the data files
const read = (f) => readFileSync("data/" + f, "utf8");
const ids = (src, re) => [...src.matchAll(re)].map((m) => m[1]);
const progIds = ids(read("institute.js"), /\{ id: "([a-z0-9-]+)", short:/g);
const centreIds = ids(read("institute.js"), /\{ id: "([a-z0-9-]+)", name: "[^"]+", abbr:/g);
const themeIds = ids(read("institute.js"), /\{ id: "([a-z]+)", t: "[^"]+", d:/g);
const facIds = ids(read("faculty.js"), /"id": "([a-z0-9-]+)"/g);
const newsIds = ids(read("news.js"), /^"id": "([^"]+)"/gm);
const eventIds = ids(read("events.js"), /^"id": "([^"]+)"/gm);

const pages = ["index.html", "about.html", "programmes.html", "research.html", "faculty.html", "partnerships.html", "news.html", "centres.html", "campus.html", "industry.html", "search.html?q=pgp", "credits.html",
  ...progIds.map((i) => `programme.html?id=${i}`), ...centreIds.map((i) => `centre.html?id=${i}`), ...themeIds.map((i) => `theme.html?id=${i}`),
  ...facIds.filter((_, i) => i % 9 === 0).map((i) => `person.html?id=${i}`), ...newsIds.filter((_, i) => i % 4 === 0).map((i) => `story.html?id=${i}`), ...eventIds.map((i) => `story.html?id=${i}`)];

const b = await launch({ width: 1440, height: 900 });
const links = new Set();
for (const p of pages) {
  const errs = [];
  const off = b.on((d) => {
    if (d.method === "Runtime.exceptionThrown") errs.push(d.params.exceptionDetails.exception?.description || d.params.exceptionDetails.text);
    if (d.method === "Log.entryAdded" && d.params.entry.level === "error" && !/youtube|ytimg/.test(d.params.entry.url || "")) errs.push(d.params.entry.text + " " + (d.params.entry.url || ""));
  });
  await b.goto(BASE + p, p === "index.html" ? 4000 : 1600);
  const info = await b.evaluate(`(() => ({ h1: document.querySelectorAll('h1').length, h1t: (document.querySelector('h1')||{}).textContent || '', main: (document.querySelector('main')||{textContent:''}).textContent.replace(/\s+/g,' ').length, note: !!document.querySelector('main .placeholder-note:not(.cm-slot)'), url: location.href, links: [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')).filter(h => h && !/^(https?:|mailto:|tel:|#)/.test(h)) }))()`);
  info.links.forEach((l) => links.add(l));
  ok(`render ${p}`, !errs.length && info.h1 === 1 && info.main > 400 && !info.note, errs.length ? errs.join(" | ").slice(0, 200) : `h1=${info.h1} "${info.h1t.trim().slice(0, 50)}" chars=${info.main}`);
  off();
}

// internal links: file exists, and id parameters point at real records
const known = { programme: progIds, centre: centreIds, theme: themeIds, person: facIds, story: [...newsIds, ...eventIds] };
let bad = [];
for (const l of links) {
  const [path, query = ""] = l.split("#")[0].split("?");
  const file = path || "index.html";
  if (!existsSync(file)) { bad.push(l); continue; }
  const id = new URLSearchParams(query).get("id"), page = file.replace(".html", "");
  if (id && known[page] && !known[page].includes(id)) bad.push(l);
}
ok(`internal links (${links.size} unique)`, !bad.length, bad.slice(0, 8).join(", "));

// interactions
const ev = (e, aw) => b.evaluate(e, aw);
await b.goto(BASE + "index.html", 3500);
await b.send("Input.dispatchKeyEvent", { type: "keyDown", key: "/", text: "/" }); await sleep(900);
ok("search overlay opens with /", await ev("!document.getElementById('finder').hidden"));
await ev("var qi=document.getElementById('finder-q'); qi.value='csitm'; qi.dispatchEvent(new Event('input'))"); await sleep(300);
ok("search overlay finds CSITM", await ev("[...document.querySelectorAll('#finder-results .res-item')].some(a=>/CSITM|Software and Information/.test(a.textContent))"));
await b.send("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape" }); await sleep(800);
ok("search overlay closes with Esc", await ev("document.getElementById('finder').hidden"));
await ev("document.querySelector('[data-open-contents]').click()"); await sleep(1300);
ok("contents overlay opens with 9 sections", await ev("!document.getElementById('contents').hidden && document.querySelectorAll('.toc li').length===9"));
await b.send("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape" }); await sleep(900);
ok("contents overlay closes with Esc", await ev("document.getElementById('contents').hidden"));
ok("cover film element present", await ev("!!document.querySelector('[data-cover-film] video')"));
await ev("document.querySelector('[data-aud]').value='researcher'; document.querySelector('[data-cover-finder] button').click()"); await sleep(2200);
ok("cover finder routes to programmes for researchers (with page leaf)", await ev("location.pathname.endsWith('programmes.html') && location.search.includes('for=researcher')"), await ev("location.href"));
await sleep(1500);
ok("finder shows 2 researcher programmes", await ev("document.querySelectorAll('.prog-row').length===2"));
await ev("document.querySelector('[data-aud=professional]').click()"); await sleep(1000);
ok("audience switch reflows list (3 programmes)", await ev("document.querySelectorAll('.prog-row').length===3"));
await ev("document.querySelector('[data-fmt=weekend]').click()"); await sleep(900);
ok("format filter narrows to PGPEM", await ev("document.querySelectorAll('.prog-row').length===1 && /PGPEM/.test(document.querySelector('.prog-row').textContent)"));
await ev("document.querySelector('[data-reset]').click()"); await sleep(900);
await ev("document.querySelector('[data-cmp-id=pgp]').click(); document.querySelector('[data-cmp-id=epgp]').click()"); await sleep(900);
ok("compare two programmes shows table + tray", await ev("!document.querySelector('[data-compare-sec]').hidden && document.querySelectorAll('[data-cmp] thead th').length===3 && document.querySelector('[data-tray]').classList.contains('on')"));

await b.goto(BASE + "faculty.html", 3000);
const total = await ev("document.querySelectorAll('.fcard').length");
ok("faculty directory lists 109", total === 109, String(total));
await ev("var qi=document.querySelector('[data-fc-q]'); qi.value='supply chain'; qi.dispatchEvent(new Event('input'))"); await sleep(900);
const nInfl = await ev("document.querySelectorAll('.fcard').length");
ok("faculty search 'supply chain' narrows", nInfl > 0 && nInfl < 20, String(nInfl));
await ev("var qi=document.querySelector('[data-fc-q]'); qi.value='zzzz'; qi.dispatchEvent(new Event('input'))"); await sleep(900);
ok("faculty empty state", await ev("!!document.querySelector('[data-fc-groups] .empty')"));
await ev("document.querySelector('[data-fc-reset]').click()"); await sleep(600);
await ev("document.querySelector('[data-area=information-systems]').click()"); await sleep(900);
ok("faculty area filter: Information Systems = 5", await ev("document.querySelectorAll('.fcard').length") === 5);
ok("portraits load", await ev("[...document.querySelectorAll('.fcard img')].every(i=>i.complete&&i.naturalWidth>0)"));

await b.goto(BASE + "research.html", 3000);
ok("research chart has 6 bars", await ev("document.querySelectorAll('.bar-row').length") === 6);
await ev("document.querySelector('[data-tab=ja]').click()"); await sleep(900);
ok("research tab: journal articles show 12 + Show all", await ev("document.querySelectorAll('.pub').length===12 && !!document.querySelector('[data-more]')"));
await ev("document.querySelector('[data-more]').click()"); await sleep(900);
ok("research Show all reveals 20 articles", await ev("document.querySelectorAll('.pub').length") === 20);
await ev("document.querySelector('[data-tab=wp]').click(); document.querySelector('[data-idx-theme=digital]').click()"); await sleep(900);
ok("research theme filter narrows papers", await ev("document.querySelectorAll('.pub').length>0 && document.querySelectorAll('.pub').length<20"));

await b.goto(BASE + "theme.html?id=markets", 3000);
await ev("document.querySelector('[data-th=digital]').click()"); await sleep(1800);
ok("theme switch in place updates URL + title", await ev("location.search.includes('digital') && /AI, analytics/.test(document.querySelector('[data-th-title]').textContent)"));

await b.goto(BASE + "news.html", 3000);
const before = await ev("document.querySelectorAll('.st').length");
await ev("document.querySelector('[data-m=\"2026-09\"]').click()"); await sleep(900);
const after = await ev("document.querySelectorAll('.st').length");
ok("news month ribbon filters", after > 0 && after < before, `${before} → ${after}`);
await ev("document.querySelector('[data-view=events]').click()"); await sleep(900);
ok("news events view hides stories", await ev("document.querySelector('[data-st-sec]').hidden"));

await b.goto(BASE + "partnerships.html", 3000);
await ev("document.querySelector('[data-enq] button[type=submit]').click()"); await sleep(500);
ok("enquiry form shows validation errors", await ev("!document.getElementById('err-name').hidden && document.activeElement.id==='enq-name'"));

await b.goto(BASE + "centre.html?id=csitm", 3000);
ok("CSITM page: focus areas, upcoming events, people", await ev("document.querySelectorAll('.cn-focus li').length===12 && document.querySelectorAll('.cn-up').length===4 && document.querySelectorAll('.cn-people li').length===4"));

await b.goto(BASE + "about.html", 3000);
ok("about timeline has 9 milestones", await ev("document.querySelectorAll('.tl-item').length") === 9);

// reduced motion: content visible without animation, no smooth-scroll
const rm = await launch({ width: 1440, height: 900, reducedMotion: true });
await rm.goto(BASE + "index.html", 5000);
ok("reduced motion: no Lenis, cover title visible", await rm.evaluate("!document.documentElement.classList.contains('lenis') && getComputedStyle(document.querySelector('.cover-en')).visibility==='visible' && !document.documentElement.classList.contains('mp')"));
ok("reduced motion: film not autoplaying", await rm.evaluate("document.querySelector('[data-cover-film] video').paused"));
rm.close();

console.log(results.join("\n"));
console.log(`\n${results.length - fails}/${results.length} passed`);
b.close();
process.exit(fails ? 1 : 0);
