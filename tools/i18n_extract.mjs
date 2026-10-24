// Collects every English string the Hindi translator will meet: visits each page and every detail page
// (all centres, programmes, themes, faculty profiles, stories), walks text nodes and user-facing attributes
// with the same normalisation as J.translate, and writes research/i18n/strings.json.
// Usage: node tools/i18n_extract.mjs   (server on 8767)
import { mkdirSync, writeFileSync } from "node:fs";
import { launch, sleep } from "./cdp.mjs";

const BASE = "http://127.0.0.1:8767/";
const b = await launch({ width: 1440, height: 900 });
await b.goto(BASE + "index.html", 3000);
await b.evaluate("localStorage.removeItem('j-lang')");
const ids = await b.evaluate(`(() => ({
  centres: (IIMB.centres||[]).map(x=>x.id), programmes: (IIMB.programmes||[]).map(x=>x.id), themes: (IIMB.themes||[]).map(x=>x.id),
  faculty: (IIMB.faculty||[]).map(x=>x.id), news: (IIMB.news||[]).map(x=>x.id), events: (IIMB.events||[]).map(x=>x.id)
}))()`);
const pages = ["index.html", "about.html", "programmes.html", "research.html", "faculty.html", "centres.html", "news.html", "campus.html", "partnerships.html", "industry.html", "credits.html", "search.html", "search.html?q=finance", "search.html?q=zzzz"]
  .concat(ids.centres.map((i) => "centre.html?id=" + i), ids.programmes.map((i) => "programme.html?id=" + i), ids.themes.map((i) => "theme.html?id=" + i),
    ids.faculty.map((i) => "person.html?id=" + i), ids.news.map((i) => "story.html?id=" + i), ids.events.map((i) => "story.html?id=" + i));

const probe = `(() => {
  const { norm, tplKey, SEP } = J._i18n; const out = {};
  const add = (s, kind) => { const t = norm(s); if (!t || !/[A-Za-z]/.test(t)) return; out[t] = kind;
    if (SEP.test(t)) t.split(SEP).forEach((p, i) => { if (i % 2 === 0 && /[A-Za-z]/.test(p)) out[p] = out[p] || "part"; }); };
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: (n) => (n.parentElement && n.parentElement.closest("script,style,[data-no-i18n],svg")) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
  let n; while ((n = w.nextNode())) add(n.nodeValue, n.parentElement.closest("main") ? "main" : "chrome");
  document.querySelectorAll("[placeholder],[aria-label],[title],[alt]").forEach((el) => ["placeholder", "aria-label", "title", "alt"].forEach((a) => { const v = el.getAttribute(a); if (v) add(v, "attr"); }));
  add(document.title, "title");
  return out;
})()`;

const all = {};
let k = 0;
for (const p of pages) {
  try {
    await b.goto(BASE + p, k < 3 ? 3500 : 2200);
    // open the interactive states that add text: FAQ answers and "show all" lists are already in the DOM
    const found = await b.evaluate(probe);
    for (const [s, kind] of Object.entries(found)) { if (!all[s]) all[s] = { kind, page: p, n: 0 }; all[s].n++; }
  } catch (e) { console.error("fail", p, e.message); }
  if (++k % 20 === 0) console.log(k, "/", pages.length, Object.keys(all).length, "strings");
}
b.close();
mkdirSync("research/i18n", { recursive: true });
writeFileSync("research/i18n/strings.json", JSON.stringify(all, null, 1));
console.log("pages", pages.length, "strings", Object.keys(all).length);
