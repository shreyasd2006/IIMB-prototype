/* Centres — Research Communities */
(() => {
  const { I, $, $$, esc, icon, u } = J;
  const KINDS = [
    { id: "all", t: "All" },
    { id: "faculty", t: "With full-time faculty", test: (c) => /full-time/i.test(c.kind) },
    { id: "excellence", t: "Centres of excellence", test: (c) => /^Centre of excellence$/i.test(c.kind) },
    { id: "initiative", t: "Initiatives", test: (c) => /initiative/i.test(c.kind) },
    { id: "incubator", t: "Incubator", test: (c) => /incubator/i.test(c.kind) },
  ];
  const state = { kind: "all", theme: "all" };

  const plate = (c) => {
    const chair = c.chairId && J.fac(c.chairId);
    return `<li class="cp cp-${I.centreStyle[c.id] || "cream"}" data-key="${c.id}"><a href="${u.centre(c.id)}">
      <span class="cp-abbr">${esc(c.abbr)}</span>
      <span class="cp-name">${esc(c.name)}</span>
      <span class="cp-kind">${esc(c.kind)}${c.since ? ` · since ${esc(c.since)}` : ""}</span>
      <span class="cp-about">${esc(c.about.split(". ")[0])}.</span>
      <span class="cp-foot">${chair ? `${J.face(chair.id, { cls: "cp-face" })}<span class="small">${esc(chair.name)}</span>` : `<span class="small">${esc(c.areas.slice(0, 2).join(" · "))}</span>`}<span class="cp-go">${icon("arrow")}</span></span>
    </a></li>`;
  };

  function draw(anim = true) {
    const k = KINDS.find((x) => x.id === state.kind);
    const list = I.centres.filter((c) => (!k.test || k.test(c)) && (state.theme === "all" || (I.centreThemes[c.id] || []).includes(state.theme)));
    const grid = $("[data-ct-grid]");
    const doit = () => { grid.innerHTML = list.map(plate).join("") || `<li class="empty"><p class="h3">No centre matches both filters.</p></li>`; };
    anim ? J.flip(grid, doit) : doit();
    $("[data-ct-count]").innerHTML = `<b class="num">${list.length}</b> of ${I.centres.length}`;
  }

  function render() {
    const byKind = (id) => I.centres.filter(KINDS.find((k) => k.id === id).test).length;
    $("[data-ct-intro]").textContent = `${I.centres.length} centres, initiatives and an incubator, from the Centre for Public Policy (2000) to the Centre for Digital Public Goods. ${byKind("faculty")} have their own full-time faculty.`;
    const cs = J.centre("csitm"), chair = J.fac(cs.chairId);
    $("[data-ct-feature]").innerHTML = `
      <span class="cf-plate plate">${J.img("csitm-summit", { lazy: false, sizes: "(min-width: 1000px) 60vw, 100vw" })}</span>
      <span class="cf-text">
        <span class="cf-abbr">CSITM</span>
        <span class="cf-name">${esc(cs.name)}</span>
        <span class="cf-dek">Since ${I.csitm.founded}, IIMB’s centre of excellence on digital technology management: AI, product management, digital governance and platforms. Next: the 9th India Software Product Management Summit, 11–13 February 2027.</span>
        <span class="cf-foot">${J.face(chair.id, { cls: "cp-face" })}<span class="small">${esc(chair.name)}, Chairperson</span><span class="arrow-link"><span>Enter CSITM</span>${icon("arrow")}</span></span>
      </span>`;
    $("[data-ct-kinds]").innerHTML = KINDS.map((k) => `<button type="button" class="chip" aria-pressed="${k.id === "all"}" data-kind="${k.id}">${esc(k.t)}${k.test ? ` <span class="count">${byKind(k.id)}</span>` : ""}</button>`).join("");
    $("[data-ct-themes]").innerHTML = `<button type="button" class="chip" aria-pressed="true" data-ctheme="all">Any theme</button>` + I.themes.map((t) => `<button type="button" class="chip" aria-pressed="false" data-ctheme="${t.id}">${esc(t.t.split(",")[0])}</button>`).join("");
    draw(false);
    $("[data-ct-kinds]").addEventListener("click", (e) => { const b = e.target.closest("[data-kind]"); if (!b) return; state.kind = b.dataset.kind; $$("[data-kind]").forEach((x) => x.setAttribute("aria-pressed", String(x === b))); draw(); });
    $("[data-ct-themes]").addEventListener("click", (e) => { const b = e.target.closest("[data-ctheme]"); if (!b) return; state.theme = b.dataset.ctheme; $$("[data-ctheme]").forEach((x) => x.setAttribute("aria-pressed", String(x === b))); draw(); });
    graph();
  }

  /* Bipartite graph: themes ↔ centres, drawn as SVG curves between measured node positions. */
  function graph() {
    const box = $("[data-graph]");
    box.innerHTML = `<svg class="g-lines" aria-hidden="true"></svg>
      <ol class="g-col g-themes">${I.themes.map((t) => `<li><button type="button" class="g-node g-t" data-gt="${t.id}">${esc(t.t)}</button></li>`).join("")}</ol>
      <ol class="g-col g-centres">${I.centres.map((c) => `<li><a class="g-node g-c" href="${u.centre(c.id)}" data-gc="${c.id}"><span class="g-ab">${esc(c.abbr)}</span><span class="g-nm">${esc(c.name)}</span></a></li>`).join("")}</ol>`;
    const svg = $(".g-lines", box);
    const drawLines = () => {
      const R = box.getBoundingClientRect();
      svg.setAttribute("viewBox", `0 0 ${R.width} ${R.height}`);
      svg.innerHTML = I.centres.flatMap((c) => (I.centreThemes[c.id] || []).map((tid) => {
        const a = $(`[data-gt="${tid}"]`, box).getBoundingClientRect(), b = $(`[data-gc="${c.id}"]`, box).getBoundingClientRect();
        const x1 = a.right - R.left + 8, y1 = a.top + a.height / 2 - R.top, x2 = b.left - R.left - 8, y2 = b.top + b.height / 2 - R.top, mx = (x1 + x2) / 2;
        return `<path d="M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}" data-lt="${tid}" data-lc="${c.id}"/>`;
      })).join("");
      $$("path", svg).forEach((p) => { const L = p.getTotalLength(); p.style.strokeDasharray = L; p.style.strokeDashoffset = box.classList.contains("drawn") ? 0 : L; });
    };
    const light = (t, c) => {
      box.classList.toggle("lit", !!(t || c));
      const themes = new Set(t ? [t] : c ? I.centreThemes[c] || [] : []);
      const centres = new Set(c ? [c] : t ? I.centres.filter((x) => (I.centreThemes[x.id] || []).includes(t)).map((x) => x.id) : []);
      $$("path", svg).forEach((p) => p.classList.toggle("on", (t && p.dataset.lt === t) || (c && p.dataset.lc === c)));
      $$("[data-gt]", box).forEach((n) => n.classList.toggle("on", themes.has(n.dataset.gt)));
      $$("[data-gc]", box).forEach((n) => n.classList.toggle("on", centres.has(n.dataset.gc)));
    };
    $$("[data-gt]", box).forEach((n) => { ["mouseenter", "focus", "click"].forEach((ev) => n.addEventListener(ev, () => light(n.dataset.gt, null))); });
    $$("[data-gc]", box).forEach((n) => { ["mouseenter", "focus"].forEach((ev) => n.addEventListener(ev, () => light(null, n.dataset.gc))); });
    box.addEventListener("mouseleave", () => light(null, null));
    requestAnimationFrame(drawLines);
    addEventListener("resize", () => requestAnimationFrame(drawLines));
    addEventListener("load", drawLines);
    J._drawGraph = drawLines;
  }

  function intro(delay) {
    J.defaultIntro(delay);
    const g = J.gsap;
    if (!g) { $("[data-graph]").classList.add("drawn"); J._drawGraph && J._drawGraph(); return; }
    const f = $("[data-ct-feature]");
    const tl = g.timeline({ delay: delay + 0.3, defaults: { ease: J.ease } });
    tl.add(J.plateIn($(".cf-plate", f), { from: "aperture", dur: 1.5 }), 0)
      .fromTo(".cf-abbr", { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1.2 }, 0.5)
      .fromTo(".cf-name, .cf-dek, .cf-foot", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.7);
    J.batchIn(".cp");
    ScrollTrigger.create({ trigger: "[data-graph]", start: "top 70%", once: true, onEnter: () => {
      $("[data-graph]").classList.add("drawn");
      g.to("[data-graph] path", { strokeDashoffset: 0, duration: 1.8, ease: "expo.inOut", stagger: 0.025 });
      g.fromTo("[data-graph] .g-node", { autoAlpha: 0, x: (i, el) => (el.classList.contains("g-t") ? -20 : 20) }, { autoAlpha: 1, x: 0, duration: 0.8, stagger: 0.02, ease: J.ease });
    } });
  }
  J.page(render, intro);
})();
