  /* ---------------------------------------------------------------- rankings (IIMB minutes, 26 Oct 2026: more prominent, one card everywhere) */
  J.ord = (n) => { const s = ["th", "st", "nd", "rd"], v = n % 100; return s[(v - 20) % 10] || s[v] || s[0]; };
  J.rankCard = (r) => {
    const prog = r.prog && J.prog(r.prog);
    const world = /in the world/.test(r.scope) && r.n <= 100;
    return `<article class="rkc${r.feature ? " rkc-feature" : ""}">
      <p class="rkc-by">${J.esc(r.by)} <span>${r.year}</span></p>
      <p class="rkc-n">${r.pre ? `<span class="rkc-pre">${J.esc(r.pre)}</span>` : `<span class="rkc-hash" aria-hidden="true">#</span>`}<span class="num" data-count>${r.n}</span></p>
      <h3 class="rkc-what">${J.esc(r.what)}${prog ? ` <a class="rkc-prog" href="${J.u.prog(prog.id)}">${J.esc(prog.short)}</a>` : ""}</h3>
      <p class="rkc-scope">${J.esc(r.scope)}</p>
      ${world ? `<span class="rkc-scale" style="--p:${Math.max(r.n, 1)}" aria-hidden="true"><span class="rkc-track"><i data-grow></i><b></b></span><span class="rkc-ends"><span>1</span><span>Global top 100</span><span>100</span></span></span>` : ""}
      <p class="rkc-src">Source: ${J.srcLink(r.src, "iimb.ac.in")}</p>
    </article>`;
  };
  J.rankGrid = (list, cls = "") => `<div class="rkg ${cls}" data-bars>${list.map(J.rankCard).join("")}</div>`;
  J.ranksFor = (progId) => (I.rankCards || []).filter((r) => (progId ? r.prog === progId : true));

  /* ---------------------------------------------------------------- data graphics for batch profiles and placements */
  J.tiles = (tiles, cls = "") => `<dl class="stat-tiles ${cls}" data-stagger>${tiles.map((t) => `<div><dt class="num" data-count>${J.esc(t.v)}</dt><dd>${J.esc(t.l)}</dd></div>`).join("")}</dl>`;
  J.genderSplit = (f, m) => {
    const t = f + m, pf = Math.round((f / t) * 100);
    return `<div class="gsplit" data-bars role="img" aria-label="Women ${f}, men ${m}"><div class="gs-bar"><i class="gs-f" style="--w:${pf}%" data-grow></i><i class="gs-m" data-grow></i></div><div class="gs-keys"><span><b class="num">${pf}%</b> women · ${f}</span><span><b class="num">${100 - pf}%</b> men · ${m}</span></div></div>`;
  };
  J.bars = (rows, { pct = true, unit = "" } = {}) => {
    const max = Math.max(...rows.map((r) => r[1])), sum = rows.reduce((a, r) => a + r[1], 0);
    return `<ol class="bx" data-bars>${rows.map(([l, v]) => `<li><span class="bx-l">${J.esc(l)}</span><span class="bx-t"><i style="--w:${Math.max((v / max) * 100, 1.5)}%" data-grow></i></span><span class="bx-v"><b class="num">${v}${unit}</b>${pct && !unit ? `<small>${Math.round((v / sum) * 100)}%</small>` : ""}</span></li>`).join("")}</ol>`;
  };
  J.gmatRange = (g) => {
    const lo = 600, hi = 800, at = (v) => ((v - lo) / (hi - lo)) * 100;
    const ends = [["low", g.low], ["high", g.high]].map(([k, v]) => `<span class="rng-end rng-${k}" style="left:${at(v)}%"><b class="num">${v}</b><small>${k === "low" ? "Low" : "High"}</small></span>`).join("");
    return `<div class="rng" data-bars><p class="rng-t">${J.esc(g.label)}</p><div class="rng-track"><i class="rng-span" style="left:${at(g.low)}%;right:${100 - at(g.high)}%" data-grow></i>${ends}<span class="rng-mark" style="left:${at(g.avg)}%"><b class="num">${g.avg}</b><small>Average</small></span>${g.median ? `<span class="rng-mark rng-med" style="left:${at(g.median)}%"><b class="num">${g.median}</b><small>Median</small></span>` : ""}</div></div>`;
  };
  J.series = (years, series) => {
    const max = Math.max(...series.flatMap((s) => s.v));
    return `<div class="ser" data-bars><div class="ser-keys">${series.map((s, i) => `<span class="k${i}">${J.esc(s.t)}</span>`).join("")}</div><ol class="ser-cols">${years.map((y, yi) => `<li><span class="ser-bars">${series.map((s, i) => `<span class="ser-bar k${i}" style="--h:${(s.v[yi] / max) * 100}%" data-grow="y"><b class="num">${s.v[yi]}</b></span>`).join("")}</span><span class="ser-y">${y}</span></li>`).join("")}</ol></div>`;
  };

  /* ---------------------------------------------------------------- "On this page": an index that hangs from the corner once you scroll past the opening */
  J.hangIndex = (items, { label = "On this page", start } = {}) => {
    items = items.filter((it) => J.$("#" + it.id));
    if (items.length < 2) return null;
    const nav = d.createElement("nav");
    nav.className = "hang"; nav.setAttribute("aria-label", label);
    nav.innerHTML = `<div class="hang-panel" id="hang-list" hidden><p class="hang-h">${J.esc(label)}</p><ol>${items.map((it, i) => `<li><a href="#${it.id}" data-hang="${it.id}"><span class="num">${String(i + 1).padStart(2, "0")}</span><span>${J.esc(it.t)}</span></a></li>`).join("")}</ol></div>
      <button class="hang-btn" type="button" aria-expanded="false" aria-controls="hang-list"><span class="hang-k">${J.esc(label)}</span><span class="hang-cur" data-hang-cur>${J.esc(items[0].t)}</span><span class="hang-n num" data-hang-n>1/${items.length}</span><svg class="ico hang-ch" aria-hidden="true"><use href="#i-chev-r"/></svg><i class="hang-prog" data-hang-prog></i></button>`;
    d.body.appendChild(nav);
    const btn = J.$(".hang-btn", nav), panel = J.$(".hang-panel", nav);
    const set = (open) => { panel.hidden = !open; btn.setAttribute("aria-expanded", String(open)); nav.classList.toggle("open", open); };
    btn.addEventListener("click", () => set(panel.hidden));
    d.addEventListener("keydown", (e) => { if (e.key === "Escape" && !panel.hidden) { set(false); btn.focus(); } });
    d.addEventListener("click", (e) => { if (!nav.contains(e.target)) set(false); });
    J.$$("[data-hang]", nav).forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); set(false); J.scrollTo("#" + a.dataset.hang); history.replaceState(null, "", "#" + a.dataset.hang); }));
    const startEl = (start && J.$(start)) || J.$("#" + items[0].id), foot = J.$(".site-footer");
    let cur = -1, raf = 0;
    const tick = () => {
      raf = 0;
      const shown = startEl.getBoundingClientRect().top < innerHeight * 0.6 && (!foot || foot.getBoundingClientRect().top > innerHeight * 0.85);
      nav.classList.toggle("show", shown);
      if (!shown && !panel.hidden) set(false);
      let i = 0;
      items.forEach((it, k) => { const el = J.$("#" + it.id); if (el && el.getBoundingClientRect().top < innerHeight * 0.35) i = k; });
      if (i !== cur) {
        cur = i;
        J.$("[data-hang-cur]", nav).textContent = J.t(items[i].t);
        J.$("[data-hang-n]", nav).textContent = `${i + 1}/${items.length}`;
        J.$$("[data-hang]", nav).forEach((a, k) => a.classList.toggle("on", k === i));
      }
      const first = J.$("#" + items[0].id).getBoundingClientRect().top + scrollY;
      const last = (foot ? foot.getBoundingClientRect().top + scrollY : d.documentElement.scrollHeight) - innerHeight;
      J.$("[data-hang-prog]", nav).style.transform = `scaleX(${Math.min(1, Math.max(0, (scrollY - first + innerHeight * 0.35) / Math.max(1, last - first)))})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    tick();
    return nav;
  };

