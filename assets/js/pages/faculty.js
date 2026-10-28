/* Faculty — People and Ideas: search, area filters, A–Z scrubber, FLIP reflow */
(() => {
  const { I, $, $$, esc, icon, u } = J;
  const surname = (n) => { const w = n.replace(/\.$/, "").split(/\s+/); const last = w[w.length - 1]; return last.length <= 2 && w.length > 1 ? w[0] : last; };
  const people = I.faculty.map((f) => ({ ...f, sur: surname(f.name), hay: `${f.name} ${f.title} ${f.areas.join(" ")} ${f.roles.join(" ")} ${f.summary}`.toLowerCase() })).sort((a, b) => a.sur.localeCompare(b.sur));
  const areas = [...new Set(I.faculty.flatMap((f) => f.areas))].sort();
  const state = { q: "", area: "all", chairs: false, pubs: false };
  /* Only the "Chairpersons and heads" view shows the red rule and the chair designation; otherwise a card is name, designation and field */
  const LEAD = /^(chairperson|dean|officiating dean|director|head)\b/i; // named chairs (e.g. "Research Chair") are honours, not posts
  const chairRole = (f) => f.roles.find((r) => LEAD.test(r));

  const card = (f, q) => `<li class="fcard" data-key="${f.id}"><a href="${u.person(f.id)}">
      ${J.face(f.id, { cls: "fc-face" })}
      <span class="fc-name">${q ? J.mark(f.name, q) : esc(f.name)}</span>
      <span class="fc-title">${esc(f.title)}</span>
      <span class="fc-areas">${esc(f.areas.join(" · "))}</span>
      ${state.chairs && chairRole(f) ? `<span class="fc-role">${esc(chairRole(f).replace(/^Chairperson, /, "Chair, "))}</span>` : ""}
    </a></li>`;

  function filtered() {
    const terms = state.q.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return people.filter((f) => (state.area === "all" || f.areas.some((a) => J.slug(a) === state.area))
      && (!state.chairs || f.roles.some((r) => LEAD.test(r)))
      && (!state.pubs || f.pubs.length)
      && terms.every((t) => f.hay.includes(t)));
  }

  function draw(anim = true) {
    const list = filtered(), box = $("[data-fc-groups]");
    const groups = {}; list.forEach((f) => { const k = f.sur[0].toUpperCase(); (groups[k] = groups[k] || []).push(f); });
    const doit = () => {
      box.innerHTML = list.length ? Object.entries(groups).map(([k, fs]) => `<section class="fc-group" id="az-${k}" aria-label="Surnames starting with ${k}"><h2 class="fc-letter" aria-hidden="true">${k}</h2><ul class="fc-grid">${fs.map((f) => card(f, state.q.trim())).join("")}</ul></section>`).join("")
        : `<div class="empty"><p class="h3">Nobody matches “${esc(state.q)}”${state.area !== "all" ? " in this area" : ""}.</p><p>Try a broader word, or <button class="text-btn ulink" type="button" data-fc-reset>clear all filters</button>.</p></div>`;
    };
    anim ? J.flip(box, doit) : doit();
    const areaName = areas.find((a) => J.slug(a) === state.area);
    $("[data-fc-count]").innerHTML = `<b class="num">${list.length}</b> of ${people.length} faculty${areaName ? ` in <strong>${esc(areaName)}</strong>` : ""}${state.q.trim() ? ` matching “${esc(state.q.trim())}”` : ""}`;
    $$("[data-az] a").forEach((a) => { const has = !!groups[a.dataset.l]; a.classList.toggle("off", !has); a.tabIndex = has ? 0 : -1; a.setAttribute("aria-disabled", String(!has)); });
    const qs = new URLSearchParams(); if (state.q.trim()) qs.set("q", state.q.trim()); if (state.area !== "all") qs.set("area", state.area);
    history.replaceState(null, "", location.pathname + (qs.toString() ? "?" + qs : ""));
    setupAzTriggers();
  }

  let azTriggers = [];
  function setupAzTriggers() {
    if (!window.ScrollTrigger || !J.gsap) return;
    azTriggers.forEach((t) => t.kill()); azTriggers = [];
    $$(".fc-group").forEach((g) => azTriggers.push(ScrollTrigger.create({ trigger: g, start: "top 40%", end: "bottom 40%", onToggle: (s) => { if (s.isActive) $$("[data-az] a").forEach((a) => a.classList.toggle("on", "az-" + a.dataset.l === g.id)); } })));
    ScrollTrigger.refresh();
  }

  function render() {
    const p = new URLSearchParams(location.search);
    state.q = p.get("q") || ""; state.area = areas.some((a) => J.slug(a) === p.get("area")) ? p.get("area") : "all";
    $("[data-fc-q]").value = state.q;
    const count = (a) => I.faculty.filter((f) => f.areas.includes(a)).length;
    $("[data-fc-areas]").innerHTML = `<button type="button" class="chip" aria-pressed="${state.area === "all"}" data-area="all">All areas</button>` + areas.map((a) => `<button type="button" class="chip" aria-pressed="${state.area === J.slug(a)}" data-area="${J.slug(a)}">${esc(a)} <span class="count">${count(a)}</span></button>`).join("");
    $("[data-az]").innerHTML = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((l) => `<a href="#az-${l}" data-l="${l}">${l}</a>`).join("");
    draw(false);
    let t; $("[data-fc-q]").addEventListener("input", (e) => { clearTimeout(t); t = setTimeout(() => { state.q = e.target.value; draw(); }, 140); });
    $("[data-fc-areas]").addEventListener("click", (e) => { const b = e.target.closest("[data-area]"); if (!b) return; state.area = b.dataset.area; $$("[data-area]").forEach((x) => x.setAttribute("aria-pressed", String(x === b))); draw(); });
    $("[data-fc-chairs]").addEventListener("change", (e) => { state.chairs = e.target.checked; draw(); });
    $("[data-fc-pubs]").addEventListener("change", (e) => { state.pubs = e.target.checked; draw(); });
    document.addEventListener("click", (e) => {
      if (e.target.closest("[data-fc-reset]")) { state.q = ""; state.area = "all"; state.chairs = state.pubs = false; $("[data-fc-q]").value = ""; $("[data-fc-chairs]").checked = $("[data-fc-pubs]").checked = false; $$("[data-area]").forEach((x) => x.setAttribute("aria-pressed", String(x.dataset.area === "all"))); draw(); }
      const a = e.target.closest("[data-az] a"); if (a) { e.preventDefault(); if (!a.classList.contains("off")) J.scrollTo("#az-" + a.dataset.l, -100); }
    });
  }

  function intro(delay) {
    J.defaultIntro(delay);
    const g = J.gsap; if (!g) return;
    g.fromTo("[data-az] a", { autoAlpha: 0, x: 12 }, { autoAlpha: 1, x: 0, duration: 0.6, ease: J.ease, stagger: 0.015, delay: delay + 0.5 });
    /* cards rise by row as they enter (only those below the fold start hidden) */
    g.set($$(".fcard").filter((e) => e.getBoundingClientRect().top > innerHeight), { autoAlpha: 0 });
    ScrollTrigger.batch(".fcard", { start: "top 92%", once: true, onEnter: (els) => {
      g.fromTo(els, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: J.ease, stagger: 0.05, overwrite: true });
      g.fromTo(els.map((e) => e.querySelector(".duo img")).filter(Boolean), { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 1.1, ease: "expo.inOut", stagger: 0.05 });
    } });
    g.utils.toArray(".fc-letter").forEach((l) => g.fromTo(l, { yPercent: 60, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1, ease: J.ease, scrollTrigger: { trigger: l, start: "top 90%", once: true } }));
  }
  J.page(render, intro);
})();
