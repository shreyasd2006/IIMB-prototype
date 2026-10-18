/* Programmes — The Decision Journey */
(() => {
  const { I, $, $$, esc, icon, u } = J;
  const FORMATS = [
    { id: "any", t: "Any format" },
    { id: "residential", t: "Full-time, on campus", test: (p) => /full-time/i.test(p.format) },
    { id: "weekend", t: "Weekends, while working", test: (p) => /weekend/i.test(p.format) },
    { id: "flexible", t: "Hybrid, online or short", test: (p) => /hybrid|online|open|custom/i.test(p.format) },
  ];
  const state = { aud: null, fmt: "any", cmp: [] };

  const row = (p) => {
    const on = state.cmp.includes(p.id);
    return `<li class="prog-row" data-key="${p.id}" data-peek="${J.src(p.img, 800)}">
      <a class="pr-main" href="${u.prog(p.id)}">
        <span class="pr-code">${esc(p.short)}</span>
        <span class="pr-name"><span class="h4">${esc(p.name)}</span><span class="small mute">${esc(p.degree)}</span></span>
      </a>
      <dl class="pr-facts">
        <div><dt>Duration</dt><dd>${esc(p.duration)}</dd></div>
        <div><dt>Format</dt><dd>${esc(p.format)}</dd></div>
        <div><dt>Experience</dt><dd>${esc(p.experience === "—" ? "Not applicable" : p.experience)}</dd></div>
      </dl>
      <div class="pr-act">
        <label class="cmp-toggle"><input type="checkbox" data-cmp-id="${p.id}" ${on ? "checked" : ""} ${!on && state.cmp.length >= 3 ? "disabled" : ""}><span class="box">${icon("check")}</span><span>Compare</span></label>
        <a class="arrow-link" href="${u.prog(p.id)}"><span>Details</span>${icon("arrow")}</a>
      </div>
    </li>`;
  };

  function list() {
    let ps = I.programmes;
    if (state.aud) { const a = I.audiences.find((x) => x.id === state.aud); ps = a.progs.map(J.prog); }
    const f = FORMATS.find((x) => x.id === state.fmt);
    if (f.test) ps = ps.filter(f.test);
    return ps;
  }
  function draw(animate = true) {
    const ps = list(), box = $("[data-prog-list]");
    const doit = () => {
      box.innerHTML = ps.length ? ps.map(row).join("") : `<li class="empty"><p class="h3">No programme matches that combination.</p><p>Try “Any format”, or <button class="text-btn ulink" type="button" data-reset>clear your choices</button>.</p></li>`;
      J.peek(box);
    };
    animate ? J.flip(box, doit) : doit();
    const a = state.aud && I.audiences.find((x) => x.id === state.aud);
    $("[data-count-line]").innerHTML = `<span class="num">${ps.length}</span> ${ps.length === 1 ? "programme" : "programmes"}${a ? ` for someone who is <strong>${esc(a.t)}</strong>` : ""}${state.fmt !== "any" ? `, ${esc(FORMATS.find((x) => x.id === state.fmt).t.toLowerCase())}` : ""}.`;
    const filled = (state.aud ? 1 : 0) + (state.fmt !== "any" ? 1 : 0) + (state.cmp.length ? 1 : 0);
    const fill = $("[data-steps-fill]");
    if (J.gsap) J.gsap.to(fill, { scaleY: filled / 3, duration: 0.8, ease: J.ease }); else fill.style.transform = `scaleY(${filled / 3})`;
    $$("[data-step]").forEach((s) => s.classList.toggle("done", (s.dataset.step === "1" && state.aud) || (s.dataset.step === "2" && state.fmt !== "any") || (s.dataset.step === "3" && state.cmp.length)));
    const qs = new URLSearchParams(); if (state.aud) qs.set("for", state.aud); if (state.fmt !== "any") qs.set("format", state.fmt);
    history.replaceState(null, "", `${location.pathname}${qs.toString() ? "?" + qs : ""}#finder`);
  }

  function drawCompare() {
    const tray = $("[data-tray]"), sec = $("[data-compare-sec]");
    $("[data-slots]").innerHTML = state.cmp.map((id) => `<span class="slot">${esc(J.prog(id).short)}<button type="button" data-uncmp="${id}" aria-label="Remove ${esc(J.prog(id).short)} from comparison">${icon("close")}</button></span>`).join("") + (state.cmp.length < 3 ? `<span class="slot mute">${3 - state.cmp.length} more</span>` : "");
    tray.classList.toggle("on", state.cmp.length > 0);
    $("[data-tray-go]").setAttribute("aria-disabled", String(state.cmp.length < 2));
    sec.hidden = state.cmp.length < 2;
    if (state.cmp.length < 2) return;
    const ps = state.cmp.map(J.prog);
    const rows = [["Degree", (p) => p.degree], ["Level", (p) => p.level], ["Duration", (p) => p.duration], ["Format", (p) => p.format], ["Eligibility", (p) => p.eligibility], ["Work experience", (p) => p.experience], ["Cohort", (p) => p.intake || "See programme page"], ["Fee", (p) => p.fee || "See programme page"], ["Contact", (p) => p.contact ? `<a class="ulink" href="mailto:${p.contact.includes("@") ? p.contact : ""}">${esc(p.contact)}</a>` : "—"]];
    $("[data-cmp]").innerHTML = `<thead><tr><th scope="col"><span class="sr">Attribute</span></th>${ps.map((p) => `<th scope="col"><span class="cmp-code">${esc(p.short)}</span><a class="ulink" href="${u.prog(p.id)}">${esc(p.name)}</a></th>`).join("")}</tr></thead>
      <tbody>${rows.map(([k, f]) => `<tr><th scope="row">${k}</th>${ps.map((p) => `<td>${k === "Contact" ? f(p) : esc(f(p))}</td>`).join("")}</tr>`).join("")}
      <tr><th scope="row">Apply</th>${ps.map((p) => `<td><a class="btn" href="${p.apply}">Official page${icon("arrow")}</a></td>`).join("")}</tr></tbody>`;
    if (J.gsap) J.gsap.fromTo("[data-cmp] td, [data-cmp] th", { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.008, ease: J.ease });
  }

  function render() {
    const p = new URLSearchParams(location.search);
    state.aud = I.audiences.some((a) => a.id === p.get("for")) ? p.get("for") : null;
    state.fmt = FORMATS.some((f) => f.id === p.get("format")) ? p.get("format") : "any";

    $("[data-aud-list]").innerHTML = I.audiences.map((a) => `<button type="button" role="radio" class="aud" aria-checked="${state.aud === a.id}" data-aud="${a.id}"><span class="aud-t">${esc(a.long)}</span><span class="aud-n num">${a.progs.length}</span></button>`).join("");
    $("[data-format]").innerHTML = FORMATS.map((f) => `<button type="button" class="chip" aria-pressed="${state.fmt === f.id}" data-fmt="${f.id}">${esc(f.t)}</button>`).join("");
    draw(false); drawCompare();

    d.addEventListener("click", (e) => {
      const a = e.target.closest("[data-aud]");
      if (a) { state.aud = state.aud === a.dataset.aud ? null : a.dataset.aud; $$("[data-aud]").forEach((x) => x.setAttribute("aria-checked", String(x.dataset.aud === state.aud))); draw(); return; }
      const f = e.target.closest("[data-fmt]");
      if (f) { state.fmt = f.dataset.fmt; $$("[data-fmt]").forEach((x) => x.setAttribute("aria-pressed", String(x === f))); draw(); return; }
      if (e.target.closest("[data-reset]")) { state.aud = null; state.fmt = "any"; $$("[data-aud]").forEach((x) => x.setAttribute("aria-checked", "false")); $$("[data-fmt]").forEach((x) => x.setAttribute("aria-pressed", String(x.dataset.fmt === "any"))); draw(); return; }
      const un = e.target.closest("[data-uncmp]");
      if (un) { state.cmp = state.cmp.filter((x) => x !== un.dataset.uncmp); draw(false); drawCompare(); return; }
      if (e.target.closest("[data-tray-go]")) { e.preventDefault(); if (state.cmp.length >= 2) J.scrollTo("#compare"); }
    });
    d.addEventListener("change", (e) => {
      const c = e.target.closest("[data-cmp-id]"); if (!c) return;
      const id = c.dataset.cmpId;
      state.cmp = c.checked ? [...new Set([...state.cmp, id])].slice(0, 3) : state.cmp.filter((x) => x !== id);
      $$("[data-cmp-id]").forEach((x) => { x.disabled = !x.checked && state.cmp.length >= 3; });
      drawCompare(); draw(false);
    });
    /* roving arrow keys in the radiogroup */
    $("[data-aud-list]").addEventListener("keydown", (e) => {
      if (!/Arrow(Up|Down|Left|Right)/.test(e.key)) return;
      e.preventDefault(); const bs = $$("[data-aud]"); const i = bs.indexOf(d.activeElement);
      bs[(i + (/Down|Right/.test(e.key) ? 1 : -1) + bs.length) % bs.length].focus();
    });

    /* admissions calendar (published dates only) */
    const dates = [
      ["2026-08-17", "17 Aug 2026", "UG applications open", "BSc (Hons) Data Sciences and Economics", "ugAdm", false],
      ["2026-10-01", "1 Oct 2026", "PGP international applications open", "PGP 2027–28", "pgpIntl", false],
      ["2026-10-17", "17 Oct 2026", "UG applications close, 5 pm IST", "BSc (Hons) programmes", "ugAdm", false],
      ["2026-11-15", "15 Nov 2026", "UG Admission Test", "BSc (Hons) programmes", "ugAdm", true],
      ["2027-01-14", "14 Jan 2027", "PGP international applications close", "PGP 2027–28", "pgpIntl", false],
      ["2027-01-15", "Jan 2027", "UG interviews", "Second and third weeks of January", "ugAdm", true],
      ["2027-02-01", "Feb–Mar 2027", "PGP international interviews", "PGP 2027–28", "pgpIntl", false],
      ["2027-02-20", "Feb 2027", "UG offers and waitlist", "Third week of February", "ugAdm", true],
    ];
    $("[data-dates]").innerHTML = `<div class="tl-rail"><span class="tl-line" data-tl-line></span><ol class="tl-nodes">${dates.map(([dt, label, t, s, src, tent]) => `<li class="tl-node ${dt < J.today ? "past" : ""}"><span class="tl-dot"></span><span class="tl-date num">${label}</span><span class="tl-t">${esc(t)}</span><span class="tl-s small">${esc(s)}${tent ? " · tentative" : ""} · ${J.srcLink(src, "source")}</span></li>`).join("")}</ol></div>`;

    $("[data-off-links]").innerHTML = [
      ["IIMB admissions", "https://www.iimb.ac.in/admissions", "All programmes"],
      ["UG Admissions 2027", "https://ug.iimb.ac.in/ug-admissions-2027/", "BSc (Hons) Data Sciences and Economics"],
      ["PGP financial aid and scholarships", "https://www.iimb.ac.in/programmes/pgp/financial-aid-scholarships", "Household income below INR 800,000 can apply"],
      ["PGP 2027 admissions process (PDF)", "https://www.iimb.ac.in/sites/default/files/inline-files/PGP-admissions-process_2027.pdf", "Eligibility and selection"],
      ["Executive Education calendar", "https://eep.iimb.ac.in/all-programs/", "Open and custom programmes"],
      ["Doctoral programme admission", "https://www.iimb.ac.in/doctoral-programme-admission", "PhD and NSR Pre-doctoral Fellowship"],
    ].map(([t, h, s]) => `<li><a class="off-link" href="${h}"><span class="h4">${esc(t)}</span><span class="small mute">${esc(s)}</span>${icon("arrow-up")}</a></li>`).join("");
  }
  const d = document;

  function intro(delay) {
    J.defaultIntro(delay);
    const g = J.gsap; if (!g) return;
    g.fromTo("[data-steps] .step", { autoAlpha: 0, x: -30 }, { autoAlpha: 1, x: 0, duration: 1, ease: J.ease, stagger: 0.12, delay: delay + 0.35 });
    g.fromTo(".prog-row", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: J.ease, stagger: 0.05, delay: delay + 0.5 });
    g.fromTo("[data-tl-line]", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: "[data-dates]", start: "top 80%", end: "bottom 50%", scrub: 0.6 } });
    g.fromTo(".tl-node", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, stagger: 0.09, duration: 0.8, ease: J.ease, scrollTrigger: { trigger: "[data-dates]", start: "top 78%", once: true } });
  }
  J.page(render, intro);
})();
