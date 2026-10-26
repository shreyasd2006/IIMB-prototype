/* Programmes — after the second design: carousel, at a glance, degree grid, admission steps, executive education, finder, UG list, calendar, FAQ */
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
    return `<li class="prog-row" data-key="${p.id}">
      <a class="pr-img" href="${u.prog(p.id)}" tabindex="-1" aria-hidden="true">${J.img(p.img, { want: 800, sizes: "(min-width: 1000px) 220px, 34vw", alt: "" })}</a>
      <div class="pr-body">
        <p class="pr-top"><span class="pr-code">${esc(p.short)}</span><span class="pr-level">${esc(p.level)}</span></p>
        <h3 class="pr-name"><a href="${u.prog(p.id)}">${esc(p.name)}</a></h3>
        <p class="pr-deg">${esc(p.degree)}</p>
        <dl class="pr-facts">
          <div><dt>Duration</dt><dd>${esc(p.duration)}</dd></div>
          <div><dt>Format</dt><dd>${esc(p.format)}</dd></div>
          <div><dt>Experience</dt><dd>${esc(p.experience === "—" ? "Not applicable" : p.experience)}</dd></div>
        </dl>
      </div>
      <div class="pr-act">
        <label class="cmp-toggle"><input type="checkbox" data-cmp-id="${p.id}" ${on ? "checked" : ""} ${!on && state.cmp.length >= 3 ? "disabled" : ""}><span class="box">${icon("check")}</span><span>Compare</span></label>
        <a class="pr-go" href="${u.prog(p.id)}"><span>Details</span>${icon("arrow")}</a>
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
    };
    animate ? J.flip(box, doit) : doit();
    const a = state.aud && I.audiences.find((x) => x.id === state.aud);
    $("[data-count-line]").innerHTML = `<span class="num">${ps.length}</span> ${ps.length === 1 ? "programme" : "programmes"}${a ? ` for someone who is <strong>${esc(a.t)}</strong>` : ""}${state.fmt !== "any" ? `, ${esc(FORMATS.find((x) => x.id === state.fmt).t.toLowerCase())}` : ""}.`;
    const filled = (state.aud ? 1 : 0) + (state.fmt !== "any" ? 1 : 0) + (state.cmp.length ? 1 : 0);
    const fill = $("[data-steps-fill]");
    if (J.gsap) J.gsap.to(fill, { scaleY: filled / 3, duration: 0.8, ease: J.ease }); else fill.style.transform = `scaleY(${filled / 3})`;
    $$("[data-step]").forEach((s) => s.classList.toggle("done", (s.dataset.step === "1" && state.aud) || (s.dataset.step === "2" && state.fmt !== "any") || (s.dataset.step === "3" && state.cmp.length)));
    const qs = new URLSearchParams(); if (state.aud) qs.set("for", state.aud); if (state.fmt !== "any") qs.set("format", state.fmt);
    history.replaceState(null, "", qs.toString() ? `${location.pathname}?${qs}#track` : location.pathname + location.hash.replace(/^#track$/, ""));
  }

  function drawCompare() {
    const tray = $("[data-tray]"), sec = $("[data-compare-sec]");
    $("[data-slots]").innerHTML = state.cmp.map((id) => `<span class="slot">${esc(J.prog(id).short)}<button type="button" data-uncmp="${id}" aria-label="Remove ${esc(J.prog(id).short)} from comparison">${icon("close")}</button></span>`).join("") + (state.cmp.length < 3 ? `<span class="slot mute">${3 - state.cmp.length} more</span>` : "");
    tray.classList.toggle("on", state.cmp.length > 0);
    document.documentElement.classList.toggle("has-tray", state.cmp.length > 0);
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

  const DEGREES = ["pgp", "pgpba", "epgp", "pgpem", "pgppm", "phd"], UG = ["bsc-data-sciences", "bsc-economics", "bba-dbe", "nsr-predoc"];
  const STEPS = [
    ["Take the entrance test", "CAT for the PGP; the UG Admission Test for the BSc (Hons) programmes. Each programme page lists its own route."],
    ["Apply online", "Through IIMB’s official admissions page for the programme, with your academic record and, where asked, work experience."],
    ["Shortlist and interview", "PGP shortlists are invited to a Written Ability Test and Personal Interview; UG interviews run in January."],
    ["Offer and enrolment", "Each programme announces its offers; for the BSc (Hons), offers and the waitlist come in the third week of February 2027 (tentative)."],
  ];
  const FAQ = [
    ["Which entrance test do I need?", "For the PGP, CAT 2026 (international applicants follow a separate route). For the BSc (Hons) programmes, the national UG Admission Test, scheduled for 15 November 2026 (tentative). Online GMAT/GRE scores are not applicable for the PGPEM 2027 batch."],
    ["Can I study while working?", "Yes. The PGPEM runs on weekends on campus over two to five years; the PGPPM is a 14-month hybrid of online and on-campus modules; executive education offers short, long and custom programmes."],
    ["How much work experience do the executive programmes ask for?", "At least five years after graduation for the EPGP and the PGPPM, and at least six years for the PGPEM."],
    ["Is financial aid available?", "All PGP students with an annual household income below INR 800,000 are eligible to apply for financial aid. The N. S. Ramaswamy Pre-doctoral Fellowship comes with 100 percent financial support."],
    ["What does the PGP cost?", "Rs 26,00,000 for two years (PGP 2026–28, domestic), plus a mess advance of Rs 30,000 each term. Taxes are extra."],
    ["Do the undergraduate programmes have their own admission process?", "Yes. Applicants need a pass in Class XII or equivalent with Mathematics at 60% or above, then sit a national-level entrance examination and a personal interview."],
  ];

  function render() {
    /* carousel, at a glance, degree grid, steps, UG list, FAQ */
    $("[data-pc-track]").innerHTML = I.programmes.map(J.progCard).join("");
    $("[data-pr-ranks]").innerHTML = J.rankGrid(I.rankCards || [], "rkg-home");
    $("[data-glance]").innerHTML = [[DEGREES.length, "Degree-granting programmes"], [UG.length, "Undergraduate and certificate programmes"], [11, "Academic areas teaching across them"], [1973, "Teaching management since"]].map(([v, l]) => `<div class="gl-i"><dt class="num" data-count>${v}</dt><dd>${l}</dd></div>`).join("");
    $("[data-degrees]").innerHTML = DEGREES.map(J.prog).map((p, i) => { const D = (I.progDetail || {})[p.id] || {}, img = D.hero && J.photo(D.hero) ? D.hero : p.img; return `<li class="dg-card"><a href="${u.prog(p.id)}">
        <span class="dg-img">${J.img(img, { want: 800, sizes: "(min-width: 1100px) 32vw, (min-width: 700px) 50vw, 100vw", alt: "" })}</span>
        <span class="dg-top"><span class="dg-deg">${esc(p.degree)}</span><span class="dg-n" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span></span>
        <span class="dg-code">${esc(p.short)}</span>
        <span class="dg-name">${esc(p.name)}</span>
        <span class="dg-meta">${esc(p.duration)} · ${esc(p.format)}</span>
        <span class="dg-go">${icon("arrow-up")}</span></a></li>`; }).join("");
    $("[data-adm]").innerHTML = STEPS.map(([t, d], i) => `<li class="adm-step"><span class="adm-dot" aria-hidden="true"></span><span class="adm-num">${String(i + 1).padStart(2, "0")}</span><h3 class="h4">${esc(t)}</h3><p>${esc(d)}</p></li>`).join("");
    $("[data-ug]").innerHTML = UG.map(J.prog).map((p, i) => `<li><a class="ug-row" href="${u.prog(p.id)}"><span class="ug-n">${String(i + 1).padStart(2, "0")}</span><span class="ug-t"><span class="h4">${esc(p.name)}</span><span class="small mute">${esc(p.level)} · ${esc(p.duration)} · ${esc(p.format)}</span></span>${icon("arrow")}</a></li>`).join("");
    $("[data-faq]").innerHTML = FAQ.map(([q, a], i) => `<div class="faq-i"><h3 class="faq-q"><button type="button" aria-expanded="false" aria-controls="faq-a${i}" id="faq-q${i}" data-faq-q><span>${esc(q)}</span><span class="faq-ic" aria-hidden="true"></span></button></h3><div class="faq-a" id="faq-a${i}" role="region" aria-labelledby="faq-q${i}"><div><p>${esc(a)}</p></div></div></div>`).join("");
    $$("[data-faq-q]").forEach((b) => b.addEventListener("click", () => { const open = b.getAttribute("aria-expanded") === "true"; b.setAttribute("aria-expanded", String(!open)); b.closest(".faq-i").classList.toggle("open", !open); }));
    $("[data-ex-cap]").innerHTML = J.credit("exec-ed");
    $("[data-ug-cap]").innerHTML = J.credit("ug-students-2");

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

  function hang() {
    J.hangIndex([["glance", "At a glance"], ["rankings", "Rankings"], ["degrees", "Degree programmes"], ["steps", "Admission steps"], ["exec", "Executive education"], ["track", "Find your track"], ["ug", "Undergraduate & certificate"], ["dates", "Admissions calendar"], ["faq", "Questions"], ["official", "Apply officially"]].map(([id, t]) => ({ id, t })), { label: "Programmes · on this page", after: ".pr-keys" });
  }

  function intro(delay) {
    J.defaultIntro(delay);
    const g = J.gsap; if (!g) return;
    J.carousel($(".pcar-sec"));
    g.fromTo(".dg-img", { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.15, ease: "expo.inOut", stagger: { each: 0.1, grid: "auto" }, clearProps: "clipPath", scrollTrigger: { trigger: ".dgrid", start: "top 85%", once: true } });
    g.fromTo(".pr-keys li", { autoAlpha: 0, x: 24 }, { autoAlpha: 1, x: 0, duration: 0.7, ease: J.ease, stagger: 0.06, delay: delay + 0.4 });
    /* degree grid: cards rise in a diagonal wave; outline numerals fill on hover (CSS) */
    g.fromTo(".dg-card", { autoAlpha: 0, y: 46 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: J.ease, stagger: { each: 0.08, grid: "auto", from: "start" }, scrollTrigger: { trigger: ".dgrid", start: "top 92%", once: true } });
    /* admission steps: the line draws through the four stops as you scroll */
    g.fromTo("[data-adm-fill]", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: "[data-adm-rail]", start: "top 85%", end: "bottom 55%", scrub: 0.5 } });
    $$(".adm-step").forEach((st, i) => ScrollTrigger.create({ trigger: "[data-adm-rail]", start: () => `top ${85 - i * 9}%`, onEnter: () => st.classList.add("on"), onLeaveBack: () => st.classList.remove("on") }));
    g.fromTo(".adm-step", { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: J.ease, stagger: 0.1, scrollTrigger: { trigger: "[data-adm-rail]", start: "top 92%", once: true } });
    g.fromTo(".ug-row", { autoAlpha: 0, x: -30 }, { autoAlpha: 1, x: 0, duration: 0.8, ease: J.ease, stagger: 0.08, scrollTrigger: { trigger: ".ug-list", start: "top 94%", once: true } });
    g.fromTo(".faq-i", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: J.ease, stagger: 0.06, scrollTrigger: { trigger: ".faq", start: "top 94%", once: true } });
    g.fromTo("[data-steps] .step", { autoAlpha: 0, x: -30 }, { autoAlpha: 1, x: 0, duration: 0.9, ease: J.ease, stagger: 0.12, scrollTrigger: { trigger: "[data-steps]", start: "top 92%", once: true } });
    J.batchIn(".prog-row");
    g.fromTo("[data-tl-line]", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: "[data-dates]", start: "top 80%", end: "bottom 50%", scrub: 0.6 } });
    g.fromTo(".tl-node", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, stagger: 0.09, duration: 0.8, ease: J.ease, scrollTrigger: { trigger: "[data-dates]", start: "top 78%", once: true } });
  }
  J.page(() => { render(); hang(); }, intro);
})();
