// Minimal headless-Edge driver over the DevTools protocol (no dependencies).
// Shared by bench.mjs (benchmark research), shoot.mjs (screenshots), frames.mjs (motion) and check.mjs (functional checks).
import { spawn } from "node:child_process";
import { join } from "node:path";
import { tmpdir } from "node:os";

const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function launch({ width = 1440, height = 900, mobile = false, reducedMotion = false, ua } = {}) {
  const port = 9300 + Math.floor(Math.random() * 600);
  const prof = join(tmpdir(), "edge-cdp-" + port);
  const proc = spawn(EDGE, ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, "--no-first-run", "--hide-scrollbars", "--mute-audio", "--autoplay-policy=no-user-gesture-required", "about:blank"], { stdio: "ignore" });
  let wsUrl;
  for (let i = 0; i < 60 && !wsUrl; i++) {
    try { const r = await fetch(`http://127.0.0.1:${port}/json/list`); const t = (await r.json()).find((x) => x.type === "page"); if (t) wsUrl = t.webSocketDebuggerUrl; } catch {}
    if (!wsUrl) await sleep(250);
  }
  if (!wsUrl) throw new Error("Edge DevTools did not start");
  const ws = new WebSocket(wsUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 0; const pending = new Map(); const listeners = new Set();
  ws.onmessage = (m) => {
    const d = JSON.parse(m.data);
    if (d.id && pending.has(d.id)) { const p = pending.get(d.id); pending.delete(d.id); d.error ? p.rej(new Error(d.error.message)) : p.res(d.result); }
    else listeners.forEach((l) => l(d));
  };
  const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, { res, rej }); ws.send(JSON.stringify({ id: i, method, params })); });
  await send("Page.enable"); await send("Runtime.enable"); await send("Log.enable");
  if (ua) await send("Emulation.setUserAgentOverride", { userAgent: ua });
  if (reducedMotion) await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile });
  if (mobile) await send("Emulation.setTouchEmulationEnabled", { enabled: true });
  const evaluate = async (expression, awaitPromise = false) => {
    const r = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
    return r.result.value;
  };
  const shot = async (opts = {}) => {
    const { full = false, maxH = 14000, quality = 72, clip } = opts;
    let c = clip;
    if (!c) {
      const m = await send("Page.getLayoutMetrics");
      const H = full ? Math.min(Math.ceil(m.cssContentSize.height), maxH) : height;
      c = { x: 0, y: full ? 0 : await evaluate("scrollY"), width, height: H, scale: 1 };
    }
    const s = await send("Page.captureScreenshot", { format: "jpeg", quality, captureBeyondViewport: !!full, clip: c });
    return Buffer.from(s.data, "base64");
  };
  return {
    send, evaluate, shot, width, height,
    on: (l) => { listeners.add(l); return () => listeners.delete(l); },
    goto: async (url, wait = 3000) => { await send("Page.navigate", { url }); await sleep(wait); },
    close: () => { try { ws.close(); } catch {} try { proc.kill(); } catch {} },
  };
}
