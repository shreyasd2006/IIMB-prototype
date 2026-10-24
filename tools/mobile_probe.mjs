// Loads pages at phone size (touch, mobile UA) and reports console errors, horizontal overflow and the widest offenders.
import { launch } from "./cdp.mjs";
const UA = "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Mobile Safari/537.36";
const pages = process.argv.slice(2);
const b = await launch({ width: 390, height: 844, mobile: true, ua: UA });
const errs = [];
b.on((d) => { if (d.method === "Runtime.exceptionThrown") errs.push(d.params.exceptionDetails.exception?.description?.split("\n")[0] || d.params.exceptionDetails.text); if (d.method === "Log.entryAdded" && d.params.entry.level === "error") errs.push(d.params.entry.text + " " + (d.params.entry.url || "")); });
for (const p of pages) {
  errs.length = 0;
  await b.goto("http://127.0.0.1:8767/" + p, 4500);
  const r = await b.evaluate(`(() => { const W = innerWidth; const wide = [...document.querySelectorAll('body *')].filter(e => { const r = e.getBoundingClientRect(); return r.right > W + 2 && r.width > 0 && getComputedStyle(e).position !== 'fixed'; }).slice(0, 8).map(e => e.tagName.toLowerCase() + '.' + String(e.className).trim().split(/\s+/).slice(0,2).join('.') + ' r=' + Math.round(e.getBoundingClientRect().right));
    return { sw: document.documentElement.scrollWidth, W, h: document.documentElement.scrollHeight, lenis: document.documentElement.classList.contains('lenis'), wide, mainText: (document.querySelector('main')||{innerText:''}).innerText.length, hidden: [...document.querySelectorAll('main h1, main h2')].filter(e => +getComputedStyle(e).opacity < .1 || getComputedStyle(e).visibility === 'hidden').length }; })()`);
  console.log(p, JSON.stringify(r), errs.length ? "ERR " + errs.join(" | ").slice(0, 400) : "");
}
b.close();
