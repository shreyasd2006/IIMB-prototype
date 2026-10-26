/* Programme detail — the full programme, as published by IIMB: overview, chair, rankings, class profile, curriculum,
   global exposure, careers, fees and aid, admissions and FAQs, with an index that hangs from the corner. */
(() => {
  const { I, $, $$, esc, icon, u } = J;
  const src = (k) => (k && I.sources[k] ? `<p class="src">Source: ${J.srcLink(k)}</p>` : "");
  const paras = (list, cls = "") => (list || []).map((t) => `<p class="${cls}">${esc(t)}</p>`).join("");
  const head = (n, title, dek) => `<header class="pd-h"><h2 class="h2" data-split>${title}</h2>${dek ? `<p class="pd-dek" data-fade>${dek}</p>` : ""}</header>`;

  function sections(p, D) {
    const out = [];
    const chair = D.chair && J.fac(D.chair.id);

    /* Overview */
    out.push(["overview", "Overview", `${paras(D.overview || [p.summary], "pd-p")}${D.highlights ? `<ul class="pd-cards" data-stagger>${D.highlights.map((h) => `<li><h3 class="h4">${esc(h.t)}</h3><p>${esc(h.d)}</p></li>`).join("")}</ul>` : ""}${D.areas ? `<h3 class="h4 pd-sub">Disciplinary areas</h3><ul class="chips">${D.areas.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>` : ""}`, "", { wide: !!D.highlights }]);

    /* Chair */
    if (chair && D.chair.msg) out.push(["chair", "From the chairperson", `<figure class="pd-chair"><blockquote>${D.chair.msg.map((m) => `<p>${esc(m)}</p>`).join("")}</blockquote><figcaption><a href="${u.person(chair.id)}" class="pd-chair-who">${J.face(chair.id, { cls: "pd-chair-face" })}<span><span class="h4">${esc(chair.name)}</span><br><span class="small mute">Chairperson, ${esc(p.short)} · ${esc(chair.areas[0] || "")}</span></span></a></figcaption></figure>${src(D.chair.src)}`]);

    /* Rankings */
    const ranks = J.ranksFor(p.id);
    if (ranks.length) out.push(["rankings", "Rankings", J.rankLedger(ranks, { feature: false }), "As published by IIM Bangalore. Each row links to the official announcement.", { wide: true }]);

    /* Class profile */
    const P = D.profile;
    if (P) {
      const groups = (P.groups || []).map((g) => `<div class="pd-chart"><h3 class="pd-chart-t">${esc(g.t)}</h3>${J.bars(g.rows)}</div>`).join("");
      out.push(["profile", "Class profile", `${J.tiles(P.tiles)}${P.gender ? `<div class="pd-chart pd-gender"><h3 class="pd-chart-t">Women and men</h3>${J.genderSplit(P.gender.f, P.gender.m)}${P.gender.note ? `<p class="small mute">${esc(P.gender.note)}</p>` : ""}</div>` : ""}${groups ? `<div class="pd-charts">${groups}</div>` : ""}${P.gmat ? `<div class="pd-chart">${J.gmatRange(P.gmat)}</div>` : ""}${P.extra ? `<p class="small mute">${esc(P.extra)}</p>` : ""}${src(P.src)}`, esc(P.title), { wide: true }]);
    }

    /* Curriculum */
    const S = D.structure;
    if (S) {
      out.push(["curriculum", "Curriculum", `${paras(S.intro, "pd-p")}${S.terms ? `<ol class="terms" data-stagger>${S.terms.map((t) => `<li><h3 class="term-t">${esc(t.t)}</h3>${t.items.length ? `<ul>${t.items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : `<p class="small mute">See the official structure page.</p>`}</li>`).join("")}</ol>` : ""}${S.blocks ? `<dl class="pd-blocks">${S.blocks.map((b) => `<div><dt class="h4">${esc(b.t)}</dt><dd>${esc(b.d)}</dd></div>`).join("")}</dl>` : ""}${S.electives ? `<h3 class="h4 pd-sub">Electives</h3><p>${esc(S.electives.intro)}</p><ul class="chips">${S.electives.areas.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>` : ""}${src(S.src)}`, "", { wide: true }]);
    } else out.push(["curriculum", "Curriculum", `<ol class="cur-list">${p.curriculum.map((c, i) => `<li><span class="num">${String(i + 1).padStart(2, "0")}</span><span>${esc(c)}</span></li>`).join("")}</ol>`]);

    /* Global exposure */
    const Gl = D.global;
    if (Gl) out.push(["global", "Global exposure", `<div class="pd-media"><figure class="pd-fig" data-plate="up"><span class="plate">${J.img(Gl.img, { want: 1600, sizes: "(min-width: 1000px) 45vw, 100vw" })}</span><figcaption class="caption">${J.credit(Gl.img)}</figcaption></figure><div><p class="pd-p">${esc(Gl.intro)}</p>${Gl.items.length ? `<dl class="pd-blocks">${Gl.items.map((b) => `<div><dt class="h4">${esc(b.t)}</dt><dd>${esc(b.d)}</dd></div>`).join("")}</dl>` : ""}${src(Gl.src)}</div></div>`, "", { wide: true }]);

    /* Careers */
    const C = D.careers;
    if (C && C.kind === "mba") out.push(["careers", "Careers & placements", `${C.blocks.map((b) => `<div class="pd-place"><h3 class="h3">${esc(b.t)}</h3>${J.tiles(b.tiles)}<div class="pd-charts"><div class="pd-chart"><h4 class="pd-chart-t">${esc(b.barsNote)}</h4>${J.bars(b.bars, { pct: false, unit: b.barsNote.includes("%") ? "%" : "" })}</div>${b.recruiters ? `<div class="pd-chart"><h4 class="pd-chart-t">Top recruiters by offers</h4><ol class="recruit">${b.recruiters.map((r) => `<li>${esc(r)}</li>`).join("")}</ol></div>` : ""}</div>${src(b.src)}</div>`).join("")}<p class="small mute">${esc(C.note)} ${C.report ? `Full figures: ${J.srcLink(C.report)}.` : ""}</p>`, "", { wide: true }]);
    else if (C && C.kind === "series") out.push(["careers", "Careers & placements", `<p class="pd-p">${esc(C.intro)}</p><div class="pd-charts pd-charts-2"><div class="pd-chart"><h3 class="pd-chart-t">Salary over the years</h3>${J.series(C.years, C.series)}</div><div class="pd-chart"><h3 class="pd-chart-t">${esc(C.people.t)}</h3><table class="pd-table"><thead><tr><th>Year</th><th>In the process</th><th>With offers</th><th>Companies</th></tr></thead><tbody>${C.years.map((y, i) => `<tr><td>${y}</td><td class="num">${C.people.v[i][0]}</td><td class="num">${C.people.v[i][1]}</td><td class="num">${C.firms.v[i]}</td></tr>`).join("")}</tbody></table></div></div><p class="small mute">${esc(C.note)}</p>${src(C.src)}`, "", { wide: true }]);
    else if (C && C.kind === "shared") out.push(["careers", "Careers & placements", `<p class="pd-p">${esc(C.note)}</p><p><a class="arrow-link" href="${u.prog(C.link)}#careers"><span>PGP placement results</span>${icon("arrow")}</a></p>${src(C.report)}`]);

    /* Fees */
    const F = D.fees;
    if (F || p.fee || p.aid) out.push(["fees", "Fees & financial aid", `${F && F.rows ? `<table class="pd-table pd-fees"><tbody>${F.rows.map(([l, v]) => `<tr><th scope="row">${esc(l)}</th><td>${esc(v)}</td></tr>`).join("")}</tbody></table>` : p.fee ? `<p class="pd-p">${esc(p.fee)}</p>` : ""}${F && F.notes ? F.notes.map((n) => `<p class="small mute">${esc(n)}</p>`).join("") : ""}${(F && F.aid) || p.aid ? `<h3 class="h4 pd-sub">Financial aid</h3><p>${esc((F && F.aid) || p.aid)}</p>` : ""}${F && F.scholarships ? `<h3 class="h4 pd-sub">Scholarships</h3><dl class="pd-blocks pd-blocks-2">${F.scholarships.map(([t, d]) => `<div><dt class="h4">${esc(t)}</dt><dd>${esc(d)}</dd></div>`).join("")}</dl>` : ""}${src((F && F.src) || p.feeSrc)}`]);

    /* Admissions */
    const elig = D.eligibility ? `<ul class="ticks">${D.eligibility.map((e) => `<li>${esc(e)}</li>`).join("")}</ul>` : `<p class="pd-p">${esc(p.eligibility)}</p>`;
    const dates = D.dates || p.dates || null;
    out.push(["admissions", "Eligibility & admissions", `<div class="pd-adm"><div><h3 class="h4 pd-sub">Who can apply</h3>${elig}${src(D.eligibilitySrc || p.eligibilitySrc)}</div><div><h3 class="h4 pd-sub">How to apply</h3><ol class="adm-steps">${p.admissions.map((a) => `<li><span class="as-dot"></span><span>${esc(a)}</span></li>`).join("")}</ol>${dates && dates.length ? `<h3 class="h4 pd-sub">Key dates</h3><dl class="kv">${dates.map((x) => `<div><dt>${esc(x.l)}</dt><dd>${esc(x.v)}</dd></div>`).join("")}</dl>` : ""}${src(D.datesSrc || p.datesSrc)}</div></div>`, "", { wide: true }]);

    /* Upcoming open programmes (Executive Education) */
    if (D.upcoming) out.push(["upcoming", "Upcoming programmes", `<table class="pd-table"><thead><tr><th>Programme</th><th>Starts</th><th>Duration</th></tr></thead><tbody>${D.upcoming.rows.map(([a, b, c]) => `<tr><td>${esc(a)}</td><td>${esc(b)}</td><td>${esc(c)}</td></tr>`).join("")}</tbody></table>${src(D.upcoming.src)}`, "", { wide: true }]);

    /* FAQ */
    if (D.faq) out.push(["faq", "Frequently asked questions", `<div class="faq">${D.faq.map(([q, a], i) => `<div class="faq-i"><h3 class="faq-q"><button type="button" aria-expanded="false" aria-controls="pfaq-a${i}" id="pfaq-q${i}" data-faq-q><span>${esc(q)}</span><span class="faq-ic" aria-hidden="true"></span></button></h3><div class="faq-a" id="pfaq-a${i}" role="region" aria-labelledby="pfaq-q${i}"><div><p>${esc(a)}</p></div></div></div>`).join("")}</div>${src(D.faqSrc)}`]);
    return out;
  }

  function render() {
    const p = J.prog(J.param("id")) || J.prog("pgp");
    const D = (I.progDetail || {})[p.id] || {};
    document.title = `${p.name} (${p.short}) — IIM Bangalore`;
    $("[data-crumb]").textContent = p.short;
    $("[data-code]").textContent = p.short;
    const codeLen = p.short.replace(/\s/g, "").length;
    $("[data-code]").classList.toggle("c-m", codeLen >= 5 && codeLen <= 6);
    $("[data-code]").classList.toggle("c-l", codeLen >= 7);
    $("[data-title]").classList.toggle("t-long", p.name.length > 40);
    $("[data-title]").textContent = p.name;
    $("[data-degree]").textContent = p.degree;
    $("[data-cta]").innerHTML = `<a class="btn btn-light" href="${p.apply}">Apply on the official site${icon("arrow")}</a><a class="arrow-link" href="${p.url}"><span>Official programme page</span>${icon("arrow-up")}</a>`;
    const hero = D.hero && J.photo(D.hero) ? D.hero : p.img;
    $("[data-plate-hero]").innerHTML = `${J.img(hero, { lazy: false, want: 2400, sizes: "(min-width: 1000px) 60vw, 100vw" })}<figcaption class="caption">${J.credit(hero)}</figcaption>`;
    const facts = D.facts || [];
    const base = [["Duration", p.duration], ["Format", p.format], ["Degree", p.degree], ["Work experience", p.experience === "—" ? "Not applicable" : p.experience]];
    $("[data-facts]").innerHTML = `${facts.length ? `<div class="pf-stats">${J.tiles(facts)}</div>` : ""}<div class="pf-kv">${base.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("")}</div>`;

    const secs = sections(p, D);
    $("[data-content]").innerHTML = secs.map(([id, t, html, dek, o = {}], i) => `<section class="section pd-sec${o.wide ? " pd-wide" : ""}" id="${id}" aria-labelledby="${id}-h"><div class="wrap pd-in">${head(i + 1, t, dek).replace("<h2 ", `<h2 id="${id}-h" `)}<div class="pd-body">${html}</div></div></section>`).join("");

    const chair = D.chair && J.fac(D.chair.id) || (p.chair && J.fac(p.chair));
    const contacts = D.contact || (p.contact ? [["Contact", p.contact, ""]] : []);
    $("[data-cta-band]").innerHTML = `<div class="pd-cta-text"><h2 class="h1" id="apply-h" data-split>Ready to apply to the ${esc(p.short)}?</h2><p class="dek">Applications are made on IIMB’s official admissions pages. This concept links to them directly.</p><div class="pd-cta-acts"><a class="btn btn-light" href="${p.apply}">Apply on the official site${icon("arrow")}</a><a class="arrow-link" href="${p.url}"><span>Official programme page</span>${icon("arrow-up")}</a>${p.calendar ? `<a class="arrow-link" href="${p.calendar}"><span>Programme calendar (PDF)</span>${icon("arrow-up")}</a>` : ""}</div></div>
      <div class="pd-cta-who">${chair ? `<a class="pd-cta-person" href="${u.person(chair.id)}">${J.face(chair.id, { cls: "cc-face" })}<span><span class="small">Programme chair</span><br><span class="h4">${esc(chair.name)}</span></span></a>` : ""}<dl class="pd-contacts">${contacts.map(([l, mail, tel]) => `<div><dt>${esc(l)}</dt><dd><a href="mailto:${esc(mail)}">${esc(mail)}</a>${tel ? `<br><span>${esc(tel)}</span>` : ""}</dd></div>`).join("")}</dl></div>`;

    const rel = I.programmes.filter((x) => x.id !== p.id && x.level === p.level).concat(I.programmes.filter((x) => x.id !== p.id && x.level !== p.level)).slice(0, 4);
    $("[data-related]").innerHTML = rel.map((x) => `<li><a class="rel" href="${u.prog(x.id)}"><span class="rel-img">${J.img(x.img, { want: 800, sizes: "(min-width: 900px) 25vw, 50vw", alt: "" })}</span><span class="rel-code">${esc(x.short)}</span><span class="h4 rel-name">${esc(x.name)}</span><span class="small mute">${esc(x.duration)} · ${esc(x.format)}</span></a></li>`).join("");

    /* FAQ accordion */
    $$("[data-faq-q]").forEach((b) => b.addEventListener("click", () => { const i = b.closest(".faq-i"), open = !i.classList.contains("open"); i.classList.toggle("open", open); b.setAttribute("aria-expanded", String(open)); }));
    J.hangIndex(secs.map(([id, t]) => ({ id, t })).concat([{ id: "apply", t: "Apply" }]), { label: `${p.short} · on this page`, after: ".pd-facts-sec" });
  }

  function intro(delay) {
    const g = J.gsap; if (!g) return;
    const tl = g.timeline({ delay, defaults: { ease: J.ease } });
    tl.fromTo(".site-header", { autoAlpha: 0, y: -20 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0)
      .fromTo(".prog-panel", { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "expo.inOut" }, 0)
      .add(J.plateIn($(".prog-plate"), { from: "right", dur: 1.4 }), 0.2)
      .fromTo(".prog-code", { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1.3 }, 0.6)
      .add(J.linesIn($(".prog-title"), { stagger: 0.07 }), 0.75)
      .fromTo(".prog-degree, .prog-cta, .crumbs", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 }, 1.0)
      .fromTo(".pf-kv > div", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.06 }, 1.1);
    g.to(".prog-plate img", { yPercent: 8, scale: 1.06, ease: "none", scrollTrigger: { trigger: ".prog-hero", start: "top top", end: "bottom top", scrub: true } });
    g.to(".prog-code", { yPercent: -35, autoAlpha: 0.35, ease: "none", scrollTrigger: { trigger: ".prog-hero", start: "top top", end: "bottom top", scrub: true } });
    J.batchIn(".pd-cards li, .terms > li, .pd-chart", { dur: 0.9 });
    g.fromTo(".adm-steps li", { autoAlpha: 0, x: -20 }, { autoAlpha: 1, x: 0, stagger: 0.12, duration: 0.8, ease: J.ease, scrollTrigger: { trigger: ".adm-steps", start: "top 85%", once: true } });
  }
  J.page(render, intro);
})();
