import { launch } from "./cdp.mjs";
const b = await launch({ width: 1440, height: 900 });
await b.goto("http://127.0.0.1:8767/about.html", 2500);
await b.evaluate("localStorage.setItem('j-lang','hi')");
await b.goto("http://127.0.0.1:8767/about.html", 3500);
console.log(await b.evaluate("JSON.stringify({lang:document.documentElement.lang, hi:!!(window.IIMB&&IIMB.HI), n:Object.keys(IIMB.HI||{}).length, nav:[...document.querySelectorAll('.site-nav a, nav a')].slice(0,4).map(a=>a.textContent.trim()), title:document.title, h:[...document.querySelectorAll('h2')].slice(0,12).map(h=>h.textContent.trim())})"));
await b.evaluate("localStorage.removeItem('j-lang')");
b.close();
