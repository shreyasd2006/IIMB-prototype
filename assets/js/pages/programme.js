/* Programme detail — eligibility, curriculum, admissions, with a step rail that fills as you read */
(() => {
  const { I, $, $$, esc, icon, u } = J;

  function render() {
    const p = J.prog(J.param("id")) || J.prog("pgp");
    document.title = `${p.name} (${p.short}) — IIM Bangalore`;
    $("[data-crumb]").textContent = p.short;
    $("[data-code]").textContent = p.short;
    $("[data-title]").textContent = p.name;
    $("[data-degree]").textContent = p.degree;
    $("[data-cta]").innerHTML = `<a class="btn" href="${p.apply}">Apply on the official site${icon("arrow")}</a><a class="arrow-link" href="${p.url}"><span>Official programme page</span>${icon("arrow-up")}</a>`;
    const ph = J.photo(p.img);
    $("[data-plate-hero]").innerHTML = `${J.img(p.img, { lazy: false, sizes: "(min-width: 1000px) 58vw, 100vw" })}<figcaption class="caption">${J.credit(p.img)}</figcaption>`;
    $("[data-facts]").innerHTML = [["Duration", p.duration], ["Format", p.format], ["Work experience", p.experience === "—" ? "Not applicable" : p.experience], ["Level", p.level], p.intake ? ["Cohort", p.intake] : null].filter(Boolean).map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("");

    const chair = p.chair && J.fac(p.chair);
    const secs = [
      ["overview", "Overview", `<p class="lede">${esc(p.summary)}</p>${p.aid ? "" : ""}`],
      ["eligibility", "Eligibility", `<p class="dek">${esc(p.eligibility)}</p>${p.eligibilitySrc ? `<p class="src">Source: ${J.srcLink(p.eligibilitySrc)}</p>` : ""}<dl class="kv"><div><dt>Work experience</dt><dd>${esc(p.experience === "—" ? "Not applicable" : p.experience)}</dd></div></dl>`],
      ["curriculum", "Curriculum", `<ol class="cur-list">${p.curriculum.map((c, i) => `<li><span class="num">${String(i + 1).padStart(2, "0")}</span><span>${esc(c)}</span></li>`).join("")}</ol>`],
      ["admissions", "Admissions", `<ol class="adm-steps">${p.admissions.map((a) => `<li><span class="adm-dot"></span><span>${esc(a)}</span></li>`).join("")}</ol>${p.admissionsSrc ? `<p class="src">Source: ${J.srcLink(p.admissionsSrc)}</p>` : ""}${p.dates ? `<h3 class="h4 sub-h">Key dates</h3><dl class="kv">${p.dates.map((x) => `<div><dt>${esc(x.l)}</dt><dd>${esc(x.v)}</dd></div>`).join("")}</dl><p class="src">Source: ${J.srcLink(p.datesSrc)}</p>` : ""}`],
      (p.fee || p.aid) ? ["fees", "Fees & aid", `${p.fee ? `<p class="dek">${esc(p.fee)}</p>` : ""}${p.aid ? `<p>${esc(p.aid)}</p>` : ""}${p.feeSrc ? `<p class="src">Source: ${J.srcLink(p.feeSrc)}</p>` : ""}`] : null,
      ["contact", "Contact & apply", `<div class="contact-card">${chair ? `<a class="cc-person" href="${u.person(chair.id)}">${J.face(chair.id, { cls: "cc-face" })}<span><span class="small mute">Programme chair</span><br><span class="h4">${esc(chair.name)}</span><br><span class="small">${esc(chair.title)}, ${esc(chair.areas.join(", "))}</span></span></a>` : ""}
        ${p.contact ? `<p class="cc-mail">${icon("mail")}<a class="ulink" href="${p.contact.includes("@") ? "mailto:" + p.contact : "https://" + p.contact}">${esc(p.contact)}</a></p>` : ""}
        <div class="cc-actions"><a class="btn" href="${p.apply}">Apply on the official site${icon("arrow")}</a>${p.calendar ? `<a class="btn ghost" href="${p.calendar}">Programme calendar (PDF)${icon("arrow-up")}</a>` : ""}</div></div>`],
    ].filter(Boolean);
    $("[data-content]").innerHTML = secs.map(([id, t, html]) => `<section class="ps" id="${id}" aria-labelledby="${id}-h"><h2 class="h2 ps-h" id="${id}-h" data-split>${t}</h2><div class="ps-body" data-fade>${html}</div></section>`).join("");
    $("[data-rail-list]").innerHTML = secs.map(([id, t], i) => `<li><a href="#${id}" data-rail-link="${id}"><span class="num">${i + 1}</span>${t}</a></li>`).join("");
    $$("[data-rail-link]").forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); J.scrollTo("#" + a.dataset.railLink); history.replaceState(null, "", "#" + a.dataset.railLink); }));

    const rel = I.programmes.filter((x) => x.id !== p.id && (x.level === p.level || I.audiences.some((a) => a.progs.includes(p.id) && a.progs.includes(x.id)))).slice(0, 4);
    $("[data-related]").innerHTML = (rel.length ? rel : I.programmes.filter((x) => x.id !== p.id).slice(0, 3)).map((x) => `<li><a class="rel" href="${u.prog(x.id)}"><span class="rel-code">${esc(x.short)}</span><span class="h4">${esc(x.name)}</span><span class="small mute">${esc(x.duration)} · ${esc(x.format)}</span></a></li>`).join("");
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
      .fromTo(".prog-facts > div", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.06 }, 1.1)
      .fromTo(".steprail li", { autoAlpha: 0, x: -16 }, { autoAlpha: 1, x: 0, duration: 0.7, stagger: 0.05 }, 1.2);
    /* rail: active section + fill */
    g.fromTo("[data-rail-fill]", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-content]", start: "top 40%", end: "bottom 60%", scrub: true } });
    $$(".ps").forEach((s) => ScrollTrigger.create({ trigger: s, start: "top 45%", end: "bottom 45%", onToggle: (st) => { if (st.isActive) $$("[data-rail-link]").forEach((a) => a.classList.toggle("on", a.dataset.railLink === s.id)); } }));
    g.to(".prog-plate img", { yPercent: 10, ease: "none", scrollTrigger: { trigger: ".prog-hero", start: "top top", end: "bottom top", scrub: true } });
    g.fromTo(".adm-steps li", { autoAlpha: 0, x: -20 }, { autoAlpha: 1, x: 0, stagger: 0.12, duration: 0.8, ease: J.ease, scrollTrigger: { trigger: ".adm-steps", start: "top 85%", once: true } });
  }
  J.page(render, intro);
})();
