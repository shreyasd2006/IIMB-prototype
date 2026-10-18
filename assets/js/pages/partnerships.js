/* Business Engagement — Partnership Studio */
(() => {
  const { I, $, $$, esc, icon, u } = J;
  const R = I.industry.routes;
  const IMG = { recruit: "film-convocation", exec: "exec-ed", research: "columns", ventures: "library-commons", cases: "film-classroom", give: "main-block" };
  const MAIL = { recruit: "cds@iimb.ac.in", exec: "info@iimb.ac.in", research: "info@iimb.ac.in", ventures: "nsrcel@iimb.ac.in", cases: "info@iimb.ac.in", give: "info@iimb.ac.in" };

  const extra = (r) => {
    if (r.id === "recruit") return `<dl class="kv on-b">${r.detail.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl><p class="src">Placement calendar from ${J.srcLink("recruiters", "For Recruiters")}.</p><p class="small">Hire from: <a class="ulink" href="${u.prog("pgp")}">PGP</a> (${esc(J.prog("pgp").intake)}) and <a class="ulink" href="${u.prog("pgpba")}">PGPBA</a> (${esc(J.prog("pgpba").intake)}).</p>`;
    if (r.id === "research") return `<ul class="ps-centres">${I.centres.filter((c) => /excellence/i.test(c.kind)).slice(0, 8).map((c) => `<li><a class="chip" href="${u.centre(c.id)}">${esc(c.abbr)}</a></li>`).join("")}</ul><p class="small"><a class="arrow-link" href="centres.html"><span>All centres and initiatives</span>${icon("arrow")}</a></p>`;
    if (r.id === "ventures") { const n = J.story("iitkanpur-iimb-nsrcel-have-signed-mou"); return n ? `<p class="small">Latest: <a class="ulink" href="${u.story(n.id)}">${esc(n.title)}</a> (${J.date(n.date)}).</p>` : ""; }
    if (r.id === "cases") { const n = J.story("iimb-ranks-11th-globally-financial-times"); return n ? `<p class="small">Source: <a class="ulink" href="${u.story(n.id)}">${esc(n.title)}</a>.</p>` : ""; }
    if (r.id === "exec") return `<p class="small"><a class="arrow-link" href="${u.prog("executive-education")}"><span>Executive education at IIMB</span>${icon("arrow")}</a></p>`;
    return "";
  };

  function render() {
    $("[data-ps-cap]").innerHTML = J.credit("exec-ed");
    $("[data-ps-quick]").innerHTML = R.slice(0, 3).map((r) => `<a class="btn ghost" href="#${r.id}">${esc(r.k)}${icon("arrow")}</a>`).join("");
    $("[data-panels]").innerHTML = R.map((r, i) => {
      const chair = r.chairId && J.fac(r.chairId);
      return `<article class="ps-panel" id="${r.id}" data-i="${i}" aria-labelledby="${r.id}-h">
        <figure class="ps-panel-img plate">${J.img(IMG[r.id], { want: 1000, sizes: "(min-width: 1000px) 50vw, 100vw" })}</figure>
        <p class="ps-panel-n num">${String(i + 1).padStart(2, "0")}</p>
        <h2 class="h2" id="${r.id}-h">${esc(r.k)}</h2>
        <p class="dek">${esc(r.d)}</p>
        ${extra(r)}
        <div class="ps-panel-foot">
          ${chair ? `<a class="ps-person" href="${u.person(chair.id)}">${J.face(chair.id, { cls: "ps-face" })}<span><span class="small mute">Faculty lead</span><br><span class="h4">${esc(chair.name)}</span></span></a>` : ""}
          <div class="ps-ctas">${r.u ? `<a class="btn" href="${r.u}">${/^https?:/.test(r.u) ? "Official page" : "Explore"}${icon(/^https?:/.test(r.u) ? "arrow-up" : "arrow")}</a>` : ""}<a class="arrow-link" href="#enquire" data-enq-pick="${r.id}"><span>Enquire</span>${icon("arrow")}</a></div>
        </div>
      </article>`;
    }).join("");
    $("[data-stage-dots]").innerHTML = R.map((r, i) => `<li data-dot="${i}"></li>`).join("");
    $("[data-stage-t]").textContent = R[0].k;

    /* recent partnerships: real stories in the Partnerships category */
    const rec = I.news.filter((n) => n.category === "Partnerships");
    $("[data-recent]").innerHTML = rec.map((n) => `<li><a class="rec" href="${u.story(n.id)}" data-peek="${n.image ? n.image.src[750] : ""}"><span class="rec-d num">${J.date(n.date, "short")}</span><span class="rec-t">${esc(n.title)}</span><span class="rec-go">${icon("arrow")}</span></a></li>`).join("");
    $("[data-longer]").innerHTML = I.industry.partners.slice(0, 3).map((p) => `<li class="tag">${esc(p.split(":")[0])}</li>`).join("") + `<li class="small mute">${J.srcLink(I.industry.partnersSrc, "Source: About IIMB")}</li>`;

    /* enquiry */
    const C = I.industry.contact;
    $("[data-contacts]").innerHTML = [["General enquiries", C.general, "mailto:" + C.general], ["Telephone", C.phone, "tel:" + C.phone.replace(/\s/g, "")], ["Recruitment (Career Development Services)", "cds@iimb.ac.in", "mailto:cds@iimb.ac.in"], ["Startups and incubation (NSRCEL)", "nsrcel@iimb.ac.in", "mailto:nsrcel@iimb.ac.in"], ["Media", C.comms, "mailto:" + C.comms]].map(([k, v, h]) => `<li><span class="small mute">${k}</span><a class="ulink" href="${h}">${esc(v)}</a></li>`).join("");
    const sel = $("[data-enq-route]");
    sel.innerHTML = R.map((r) => `<option value="${r.id}">${esc(r.k)}</option>`).join("");
    const showTo = () => ($("[data-enq-to]").textContent = `Goes to ${MAIL[sel.value]}`);
    sel.addEventListener("change", showTo); showTo();
    $$("[data-enq-pick]").forEach((a) => a.addEventListener("click", () => { sel.value = a.dataset.enqPick; showTo(); }));

    $("[data-enq]").addEventListener("submit", (e) => {
      e.preventDefault();
      const f = e.target; let bad = null;
      const check = (name, ok) => { const el = f.elements[name], err = $("#err-" + name); err.hidden = ok; el.setAttribute("aria-invalid", String(!ok)); if (!ok) el.setAttribute("aria-describedby", "err-" + name); else el.removeAttribute("aria-describedby"); if (!ok && !bad) bad = el; };
      check("name", f.elements.name.value.trim().length > 1);
      check("org", f.elements.org.value.trim().length > 1);
      check("email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.elements.email.value.trim()));
      check("msg", f.elements.msg.value.trim().length > 5);
      if (bad) { bad.focus(); if (J.gsap) J.gsap.fromTo(bad, { x: -8 }, { x: 0, duration: 0.45, ease: "power3.out" }); return; }
      const r = R.find((x) => x.id === sel.value), to = MAIL[r.id];
      const subject = `Enquiry: ${r.k} (${f.elements.org.value.trim()})`;
      const body = `${f.elements.msg.value.trim()}\n\n${f.elements.name.value.trim()}\n${f.elements.org.value.trim()}\n${f.elements.email.value.trim()}`;
      const href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const done = $("[data-enq-done]");
      done.hidden = false;
      done.innerHTML = `<p class="h3">Your email is drafted.</p><p>Your mail app should open with a message to <strong>${to}</strong>. If it did not, <a class="ulink" href="${href}">open the draft again</a> or write to ${to} directly.</p>`;
      done.focus();
      if (J.gsap) J.gsap.fromTo(done, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: J.ease });
      location.href = href;
    });
  }

  function intro(delay) {
    J.defaultIntro(delay);
    const g = J.gsap; if (!g) return;
    const panels = $$(".ps-panel"), n = $("[data-stage-n]"), t = $("[data-stage-t]");
    let cur = 0;
    const setStage = (i) => {
      if (i === cur) return; const dir = i > cur ? 1 : -1; cur = i;
      g.to([n, t], { yPercent: -40 * dir, autoAlpha: 0, duration: 0.25, ease: "power2.in", onComplete: () => {
        n.textContent = String(i + 1).padStart(2, "0"); t.textContent = R[i].k;
        g.fromTo([n, t], { yPercent: 40 * dir, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.6, ease: J.ease, stagger: 0.05 });
      } });
      $$("[data-dot]").forEach((d) => d.classList.toggle("on", +d.dataset.dot === i));
    };
    $$("[data-dot]")[0].classList.add("on");
    panels.forEach((p, i) => {
      ScrollTrigger.create({ trigger: p, start: "top 55%", end: "bottom 55%", onToggle: (s) => s.isActive && setStage(i) });
      const img = p.querySelector(".ps-panel-img");
      g.fromTo(img, { clipPath: "inset(12% 12% 12% 12%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: p, start: "top 90%", end: "top 35%", scrub: true } });
      g.fromTo(img.querySelector("img"), { scale: 1.2 }, { scale: 1, ease: "none", scrollTrigger: { trigger: p, start: "top 90%", end: "bottom top", scrub: true } });
    });
    g.fromTo(".rec", { autoAlpha: 0, x: -30 }, { autoAlpha: 1, x: 0, duration: 0.9, stagger: 0.1, ease: J.ease, scrollTrigger: { trigger: "[data-recent]", start: "top 85%", once: true } });
  }
  J.page(render, intro);
})();
