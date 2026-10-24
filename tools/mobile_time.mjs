import { launch, sleep } from "./cdp.mjs";
const UA = "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0 Mobile Safari/537.36";
for (const p of process.argv.slice(2)) {
  const b = await launch({ width: 390, height: 844, mobile: true, ua: UA });
  // simulate a phone: 4x slower CPU, fast Wi-Fi
  await b.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await b.send("Network.enable"); await b.send("Network.emulateNetworkConditions", { offline: false, latency: 40, downloadThroughput: 2.5e6, uploadThroughput: 1e6 });
  const t0 = Date.now(); await b.send("Page.navigate", { url: "http://127.0.0.1:8767/" + p });
  let ready = -1, shown = -1;
  for (let i = 0; i < 120; i++) { await sleep(250); try { const r = await b.evaluate("JSON.stringify([document.readyState, document.documentElement.classList.contains('mp'), document.documentElement.scrollHeight])"); const [rs, mp, sh] = JSON.parse(r); if (ready < 0 && rs !== "loading") ready = Date.now() - t0; if (shown < 0 && !mp && sh > 1200) { shown = Date.now() - t0; break; } } catch {} }
  console.log(p, "DOM ready", ready, "ms; content visible", shown, "ms");
  b.close();
}
