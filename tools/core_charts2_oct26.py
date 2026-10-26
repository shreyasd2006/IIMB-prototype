"""One-off (26 Oct 2026): class-profile charts redesigned. Composition -> ring with legend; ordered ranges -> columns.
Rings sweep in on reveal (CSS variable --k tweened 0 -> 1)."""
import os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
p = os.path.join(ROOT, "assets", "js", "core.js")
s = open(p, encoding="utf-8").read()
add = r'''  /* Composition as a ring: segments sweep round on reveal; the legend carries the numbers */
  const RING = ["#631111", "#A92D2D", "#C9776F", "#E0B7AE", "#8A8A8A", "#BDBDBD", "#D9D3CA", "#4A4A4A"];
  J.ring = (rows, { centre, centreLabel, colors = RING } = {}) => {
    const sum = rows.reduce((a, r) => a + r[1], 0);
    let acc = 0;
    const stops = rows.map(([, v], i) => { const a0 = (acc / sum) * 360; acc += v; const a1 = (acc / sum) * 360; return `${colors[i % colors.length]} calc(var(--k) * ${a0.toFixed(2)}deg) calc(var(--k) * ${a1.toFixed(2)}deg)`; });
    const top = rows.reduce((m, r) => (r[1] > m[1] ? r : m), rows[0]);
    const c = centre ?? `${Math.round((top[1] / sum) * 100)}%`, cl = centreLabel ?? top[0];
    return `<div class="ring" data-ring><div class="ring-dial" style="--k:1;background:conic-gradient(${stops.join(", ")}, var(--rule) calc(var(--k) * 360deg) 360deg)" role="img" aria-label="${J.esc(rows.map(([l, v]) => `${l} ${v}`).join(", "))}"><div class="ring-hole"><b class="num">${J.esc(c)}</b><span>${J.esc(cl)}</span></div></div>
      <ul class="ring-key">${rows.map(([l, v], i) => `<li><i style="background:${colors[i % colors.length]}"></i><span class="rk-l">${J.esc(l)}</span><b class="num">${v}</b><small>${Math.round((v / sum) * 100)}%</small></li>`).join("")}</ul></div>`;
  };
  /* Ordered ranges (experience, age) as columns */
  J.columns = (rows, { unit = "" } = {}) => {
    const max = Math.max(...rows.map((r) => r[1])), sum = rows.reduce((a, r) => a + r[1], 0);
    return `<div class="cols" data-bars><ol>${rows.map(([l, v]) => `<li${v === max ? ' class="max"' : ""}><span class="col-v"><b class="num">${v}</b><small>${Math.round((v / sum) * 100)}%</small></span><span class="col-track"><i style="--h:${Math.max((v / max) * 100, 2)}%" data-grow="y"></i></span><span class="col-l">${J.esc(l)}</span></li>`).join("")}</ol>${unit ? `<p class="col-unit">${J.esc(unit)}</p>` : ""}</div>`;
  };

'''
a = "  /* ---------------------------------------------------------------- \"On this page\": an index that hangs from the corner once you scroll past the opening */"
assert a in s and "J.ring = " not in s
s = s.replace(a, add + a, 1)
# reveal: rings sweep round
s = s.replace('const autoRevealSel = "[data-split],[data-plate],[data-rule],[data-stagger],[data-fade],[data-count],[data-parallax],[data-bars]";',
              'const autoRevealSel = "[data-split],[data-plate],[data-rule],[data-stagger],[data-fade],[data-count],[data-parallax],[data-bars],[data-ring]";')
a = '      } else if (el.hasAttribute("data-bars")) {'
s = s.replace(a, '''      } else if (el.hasAttribute("data-ring")) {
        const dial = J.$(".ring-dial", el);
        g.set(dial, { "--k": 0 });
        ScrollTrigger.create({ ...st, start: "top 85%", onEnter: () => { g.to(dial, { "--k": 1, duration: 1.4, ease: "expo.inOut" }); g.fromTo(J.$$(".ring-key li", el), { autoAlpha: 0, x: 16 }, { autoAlpha: 1, x: 0, duration: 0.7, ease: J.ease, stagger: 0.06, delay: 0.3 }); } });
''' + a, 1)
open(p, "w", encoding="utf-8", newline="\n").write(s)
print("charts added")
