// Visual audit at a real viewport: scrolls each page in steps (as a reader would), waits for reveals,
// captures the viewport, and reports overlapping text boxes and clipped/overflowing text at every stop.
// Usage: node tools/audit.mjs <outDir> <width> <path> [path...]     env STEP=px (default 700), SHOTS=0 to skip images
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { launch, sleep } from "./cdp.mjs";

const [outDir, widthArg, ...paths] = process.argv.slice(2);
const width = Number(widthArg) || 1440, H = width < 700 ? 844 : 900;
mkdirSync(outDir, { recursive: true });
const STEP = Number(process.env.STEP || 700);
const b = await launch({ width, height: H, mobile: width < 700 });

const probe = `(() => {
  const vis = (e) => { const s = getComputedStyle(e); return s.visibility !== 'hidden' && s.display !== 'none' && +s.opacity > 0.05; };
  const leaves = [];
  const walker = document.createTreeWalker(document.querySelector('main'), NodeFilter.SHOW_TEXT);
  let n; const seen = new Set();
  while ((n = walker.nextNode())) {
    if (!n.textContent.trim()) continue;
    const el = n.parentElement; if (seen.has(el)) continue; seen.add(el);
    if (el.closest('[aria-hidden=true], .sr, .marquee, script, style')) continue;
    const range = document.createRange(); range.selectNodeContents(n);
    const rects = [...range.getClientRects()].filter(r => r.width > 2 && r.height > 2 && r.bottom > 0 && r.top < innerHeight);
    if (!rects.length || !vis(el)) continue;
    let anc = el, hidden = false; while (anc && anc !== document.body) { if (!vis(anc)) { hidden = true; break; } anc = anc.parentElement; }
    if (hidden) continue;
    let st = false, q = el; while (q && q !== document.body) { const p = getComputedStyle(q).position; if (p === 'sticky' || p === 'fixed') { st = true; break; } q = q.parentElement; }
    rects.forEach(r => leaves.push({ el, r, sticky: st, t: n.textContent.trim().slice(0, 40) }));
  }
  const name = (e) => e.tagName.toLowerCase() + (e.className && typeof e.className === 'string' ? '.' + e.className.trim().split(/\\s+/).slice(0, 2).join('.') : '');
  const out = [];
  for (let i = 0; i < leaves.length; i++) for (let j = i + 1; j < leaves.length; j++) {
    const a = leaves[i], c = leaves[j];
    if (a.el === c.el || a.el.contains(c.el) || c.el.contains(a.el)) continue;
    if (a.sticky || c.sticky) continue;
    const x = Math.min(a.r.right, c.r.right) - Math.max(a.r.left, c.r.left), y = Math.min(a.r.bottom, c.r.bottom) - Math.max(a.r.top, c.r.top);
    if (x > 4 && y > 4 && x * y > 0.18 * Math.min(a.r.width * a.r.height, c.r.width * c.r.height)) out.push('OVERLAP ' + name(a.el) + ' "' + a.t + '"  ×  ' + name(c.el) + ' "' + c.t + '" @y' + Math.round(a.r.top));
  }
  document.querySelectorAll('main h1, main h2, main h3, main p, main li, main a, main dt, main dd, main span').forEach(e => {
    if (!vis(e) || !e.textContent.trim()) return;
    const r = e.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight || r.width < 4) return;
    const s = getComputedStyle(e);
    if (s.overflow === 'hidden' && e.scrollWidth > e.clientWidth + 2 && !e.closest('.line')) out.push('CLIPPED-X ' + name(e) + ' "' + e.textContent.trim().slice(0, 30) + '"');
    if (r.right > innerWidth + 1 && !e.closest('.rail,.shelf,.tl-track,.ribbon,.th-switch,.cn-sub,.cmp-scroll,.tl-h,[data-overflow-ok]')) out.push('OFFSCREEN ' + name(e) + ' "' + e.textContent.trim().slice(0, 30) + '" r=' + Math.round(r.right));
  });
  return [...new Set(out)].slice(0, 30);
})()`;

const report = {};
for (const p of paths) {
  await b.goto("http://127.0.0.1:8767/" + p, 3600);
  const name = p.replace(/[^a-z0-9]+/gi, "_").replace(/^_|_$/g, "") || "index";
  const total = await b.evaluate("document.documentElement.scrollHeight");
  const issues = [];
  let i = 0;
  for (let y = 0; y < Math.max(total, await b.evaluate("document.documentElement.scrollHeight")) - H / 2; y += STEP, i++) {
    await b.evaluate(`window.J&&J.lenis?J.lenis.scrollTo(${y},{immediate:true}):scrollTo(0,${y})`);
    await sleep(1300);
    const found = await b.evaluate(probe);
    found.forEach((f) => issues.push(`[${y}] ${f}`));
    if (process.env.SHOTS !== "0") writeFileSync(join(outDir, `${name}-${String(i).padStart(2, "0")}.jpg`), await b.shot({ quality: 55 }));
    const nowTotal = await b.evaluate("document.documentElement.scrollHeight");
    if (nowTotal > total) {}
  }
  report[p] = issues;
}
console.log(JSON.stringify(report, null, 1));
b.close();
