// Loads every programme page and reports render errors, console errors and section counts.
import { launch } from "./cdp.mjs";
const ids = ["pgp", "pgpba", "epgp", "pgpem", "pgppm", "phd", "nsr-predoc", "bsc-data-sciences", "bsc-economics", "bba-dbe", "executive-education"];
const b = await launch({ width: 1440, height: 900 });
const errs = []; b.on((d) => { if (d.method === "Runtime.exceptionThrown") errs.push(d.params.exceptionDetails.exception?.description?.split("\n")[0]); if (d.method === "Log.entryAdded" && d.params.entry.level === "error") errs.push(d.params.entry.text); });
await b.goto("http://127.0.0.1:8767/index.html", 5000);
for (const id of ids) {
  errs.length = 0;
  await b.goto("http://127.0.0.1:8767/programme.html?id=" + id, 3500);
  const r = await b.evaluate(`JSON.stringify({ secs: [...document.querySelectorAll('.pd-sec')].map(s => s.id).join(','), note: !!document.querySelector('.placeholder-note'), hero: (document.querySelector('.prog-plate img')||{}).naturalWidth, hang: !!document.querySelector('.hang') })`);
  console.log(id.padEnd(20), r, errs.length ? "ERR " + errs.join(" | ").slice(0, 200) : "");
}
b.close();
