// Every programme page: reveal all hidden films/testimonials, scroll through, report images that fail to load.
// Usage: node tools/media_probe.mjs
import { launch, sleep } from "./cdp.mjs";
const ids = ["pgp", "pgpba", "epgp", "pgpem", "pgppm", "phd", "nsr-predoc", "bsc-data-sciences", "bsc-economics", "bba-dbe", "executive-education"];
const b = await launch({ width: 1440, height: 900 });
let bad = 0;
for (const id of ids) {
  await b.goto(`http://127.0.0.1:8767/programme.html?id=${id}`, 5000);
  await b.evaluate(`document.querySelectorAll("[data-more-films],[data-more-q],[data-more-vf]").forEach((x) => x.click()); document.querySelectorAll(".vx-panel").forEach((p) => (p.hidden = false)); document.querySelectorAll("img[loading=lazy]").forEach((i) => (i.loading = "eager"));`);
  const h = await b.evaluate("document.documentElement.scrollHeight");
  for (let y = 0; y < h; y += 900) { await b.evaluate(`scrollTo(0, ${y})`); await sleep(90); }
  await sleep(2500);
  const r = await b.evaluate(`(() => { const imgs = [...document.querySelectorAll("main img")]; const broken = imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.getAttribute("src")); const pending = imgs.filter((i) => !i.complete).map((i) => i.getAttribute("src"));
    return { n: imgs.length, broken, pending, films: document.querySelectorAll(".pd-film").length, quotes: document.querySelectorAll(".vx-q").length, chair: !!document.querySelector(".pdc"), pager: !!document.querySelector(".pg-steps") }; })()`);
  bad += r.broken.length;
  console.log(id.padEnd(20), "imgs", r.n, "films", r.films, "quotes", r.quotes, "chair", r.chair, "pager", r.pager, r.broken.length ? "BROKEN " + r.broken.join(", ") : "", r.pending.length ? "pending " + r.pending.length : "");
}
console.log(bad ? `${bad} broken images` : "all images load");
b.close();
