// Scrolls a page and reports what the hanging index says at each section.
import { launch, sleep } from "./cdp.mjs";
const [path, w = "1440"] = process.argv.slice(2);
const b = await launch({ width: +w, height: 900, mobile: +w < 700 });
await b.goto("http://127.0.0.1:8767/" + path, 6000);
const ids = await b.evaluate(`[...document.querySelectorAll('[data-hang]')].map(a => a.dataset.hang)`);
const out = [await b.evaluate(`'top: show=' + document.querySelector('.hang').classList.contains('show')`)];
for (const id of ids) {
  await b.evaluate(`(() => { const t = document.getElementById(${JSON.stringify(id)}); const y = t.getBoundingClientRect().top + scrollY - 120; J.lenis ? J.lenis.scrollTo(y, { immediate: true }) : scrollTo(0, y); })()`);
  await sleep(500);
  out.push(id + " -> " + await b.evaluate(`document.querySelector('.hang').classList.contains('show') + ' ' + document.querySelector('[data-hang-cur]').textContent + ' ' + document.querySelector('[data-hang-n]').textContent`));
}
console.log(out.join("\n"));
b.close();
