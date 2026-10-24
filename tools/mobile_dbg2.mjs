import { launch } from "./cdp.mjs";
const UA = "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Mobile Safari/537.36";
const b = await launch({ width: 390, height: 844, mobile: true, ua: UA });
await b.goto("http://127.0.0.1:8767/" + (process.argv[2] || "index.html"), 5000);
console.log(await b.evaluate(`(() => { const cs = (e) => { const s = getComputedStyle(e); return { ov: s.overflow, ovy: s.overflowY, h: s.height, pos: s.position, top: s.top }; };
 const out = { html: cs(document.documentElement), body: cs(document.body), htmlSH: document.documentElement.scrollHeight, bodySH: document.body.scrollHeight, mainH: document.querySelector('main').getBoundingClientRect().height, bodyStyle: document.body.getAttribute('style'), htmlStyle: document.documentElement.getAttribute('style') };
 out.chain = []; let e = document.querySelector('main'); while (e) { const s = getComputedStyle(e); out.chain.push(e.tagName + '.' + e.className + ' h=' + Math.round(e.getBoundingClientRect().height) + ' ov=' + s.overflow + ' pos=' + s.position); e = e.parentElement; }
 out.pins = [...document.querySelectorAll('.pin-spacer')].map(p => p.className + ' ' + p.style.height).slice(0,5);
 out.st = window.ScrollTrigger ? ScrollTrigger.getAll().length : -1;
 out.y = scrollY; window.scrollTo(0, 3000); out.y2 = scrollY;
 return JSON.stringify(out, null, 1); })()`));
b.close();
