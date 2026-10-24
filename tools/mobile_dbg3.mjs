import { launch, sleep } from "./cdp.mjs";
const UA = "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Mobile Safari/537.36";
const b = await launch({ width: 390, height: 844, mobile: true, ua: UA });
await b.goto("http://127.0.0.1:8767/index.html", 7000);
console.log(await b.evaluate(`JSON.stringify([...document.querySelectorAll('.icon-btn[data-open-search], [data-pc-next], .contents-btn')].map(e => { e.scrollIntoView({block:'center'}); const r = e.getBoundingClientRect(); const hit = document.elementFromPoint(r.left + r.width/2, r.top + r.height/2); return { sel: e.className, disp: getComputedStyle(e).display, r: [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)], hit: hit && (hit === e || e.contains(hit)) ? 'self' : (hit ? hit.tagName + '.' + hit.className : null) }; }))`));
b.close();
