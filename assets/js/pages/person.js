/* Faculty profile — portrait plate that blooms to colour, research, roles, publications, colleagues */
(() => {
  const { I, $, $$, esc, icon, u } = J;

  /* Publication strings copied from IIMB pages sometimes carry pasted link debris; keep the citation text only. */
  const cleanPub = (s) => s.replace(/\[javascript:[^\]]*\]?/gi, "").replace(/\(?https?:\/\/\S+\)?/g, "").replace(/\s{2,}/g, " ").replace(/^[\s'"‘“]+|[\s,]+$/g, "").trim();

  function rolesOf(f) {
    const out = f.roles.map((r) => ({ t: r }));
    I.programmes.filter((p) => p.chair === f.id).forEach((p) => out.push({ t: `Programme chair, ${p.short}`, u: u.prog(p.id) }));
    I.centres.filter((c) => c.chairId === f.id).forEach((c) => out.push({ t: `Leads ${c.abbr}`, u: u.centre(c.id) }));
    const L = I.leadership; if (L.director.facultyId === f.id) out.push({ t: L.director.role, u: "about.html#leadership" });
    L.deans.filter((d) => d.facultyId === f.id).forEach((d) => out.push({ t: d.role, u: "about.html#leadership" }));
    const seen = new Set(); return out.filter((r) => { const k = r.t.toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true; });
  }

  function render() {
    const f = J.fac(J.param("id")) || J.fac("mayank-kumar");
    document.title = `${f.name} — Faculty — IIM Bangalore`;
    const portrait = (I.portraits || {})[f.id];
    $("[data-pp-portrait]").innerHTML = portrait
      ? `<span class="pp-plate"><img src="${portrait.src}" width="440" height="440" alt="Portrait of ${esc(f.name)}" fetchpriority="high"></span><figcaption class="caption">Portrait: <a class="ulink" href="${f.url}">IIM Bangalore</a></figcaption>`
      : `<span class="mono pp-mono">${J.initials(f.name)}</span>`;
    $("[data-pp-area-crumb]").textContent = f.areas[0];
    $("[data-pp-area-crumb]").href = `faculty.html?area=${J.slug(f.areas[0])}`;
    $("[data-pp-name]").textContent = f.name;
    $("[data-pp-title]").textContent = f.title;
    $("[data-pp-areas]").innerHTML = f.areas.map((a) => `<li><a class="chip" href="faculty.html?area=${J.slug(a)}">${esc(a)}</a></li>`).join("");
    const roles = rolesOf(f);
    $("[data-pp-roles]").innerHTML = roles.map((r) => `<li>${r.u ? `<a class="ulink" href="${r.u}">${esc(r.t)}</a>` : esc(r.t)}</li>`).join("");
    $("[data-pp-contact]").innerHTML = `${f.email ? `<a class="arrow-link" href="mailto:${f.email}">${icon("mail")}<span>${esc(f.email)}</span></a>` : ""}<a class="arrow-link" href="${f.url}"><span>Official IIMB profile</span>${icon("arrow-up")}</a>`;

    const paras = f.summary.split(/(?<=\.)\s+(?=[A-Z])/);
    const half = Math.ceil(paras.length / 2);
    $("[data-pp-summary]").innerHTML = `<p class="pp-first">${esc(paras.slice(0, half).join(" "))}</p>${paras.length > 1 ? `<p>${esc(paras.slice(half).join(" "))}</p>` : ""}`;
    $("[data-pp-src]").innerHTML = `Profile text as published on the <a class="ulink" href="${f.url}">official IIMB profile</a>.`;

    const themes = I.themes.filter((th) => f.areas.some((a) => th.areas.includes(a)));
    const centres = I.centres.filter((c) => c.chairId === f.id || (c.people || []).includes(f.id) || (f.id && I.csitm.people.includes(f.id) && c.id === "csitm"));
    $("[data-pp-side]").innerHTML = `
      ${themes.length ? `<div class="pp-box"><h2 class="meta">Research themes</h2><ul>${themes.map((t) => `<li><a class="arrow-link" href="${u.theme(t.id)}"><span>${esc(t.t)}</span>${icon("arrow")}</a></li>`).join("")}</ul><p class="src">Derived from academic area.</p></div>` : ""}
      ${centres.length ? `<div class="pp-box"><h2 class="meta">Centres</h2><ul>${centres.map((c) => `<li><a class="arrow-link" href="${u.centre(c.id)}"><span>${esc(c.name)}</span>${icon("arrow")}</a></li>`).join("")}</ul></div>` : ""}
      <div class="pp-box"><h2 class="meta">For journalists</h2><p class="small">Media enquiries go through IIMB’s communications office: <a class="ulink" href="mailto:communications@iimb.ac.in">communications@iimb.ac.in</a>.</p></div>`;

    const pubs = f.pubs.map(cleanPub).filter((p) => p.length > 12);
    if (pubs.length) $("[data-pp-pubs]").innerHTML = pubs.slice(0, 12).map((p, i) => `<li><span class="num">${String(i + 1).padStart(2, "0")}</span><span>${esc(p)}</span></li>`).join("") + (pubs.length > 12 ? `<li class="pp-more"><a class="arrow-link" href="${f.url}"><span>${pubs.length - 12} more on the official profile</span>${icon("arrow-up")}</a></li>` : "");
    else $("[data-pp-pubs-sec]").innerHTML = `<div class="wrap grid"><h2 class="h2 pp-pubs-h">Publications</h2><div class="pp-publist"><p class="dek">This profile lists no publications on the area page. The <a class="ulink" href="${f.url}">official profile</a> has the latest.</p></div></div>`;

    const surname = f.name.split(" ").pop();
    const news = I.news.filter((n) => (n.title + " " + n.body.map((b) => b.p || "").join(" ")).includes(f.name) || (surname.length > 3 && n.title.includes(surname) && n.title.includes(f.name.split(" ")[0])));
    if (news.length) {
      $("[data-pp-news-sec]").hidden = false;
      $("[data-pp-news]").innerHTML = news.slice(0, 4).map((n) => `<a class="th-story" href="${u.story(n.id)}">${n.image ? `<span class="plate">${J.newsImg(n)}</span>` : ""}<span><span class="meta mute">${esc(n.category)} · ${J.date(n.date)}</span><br><span class="h4">${esc(n.title)}</span></span></a>`).join("");
    }

    const col = I.faculty.filter((x) => x.id !== f.id && x.areas.some((a) => f.areas.includes(a)));
    $("[data-pp-col-h]").textContent = `Colleagues in ${f.areas[0]}`;
    $("[data-pp-col]").innerHTML = col.map((x) => `<li><a href="${u.person(x.id)}">${J.face(x.id, { cls: "col-face" })}<span class="col-n">${esc(x.name)}</span><span class="col-t">${esc(x.title)}</span></a></li>`).join("");
    J.dragRail($("[data-pp-col]"));

    const sorted = [...I.faculty].sort((a, b) => a.name.localeCompare(b.name)), i = sorted.findIndex((x) => x.id === f.id);
    const prev = sorted[(i - 1 + sorted.length) % sorted.length], next = sorted[(i + 1) % sorted.length];
    $("[data-pp-pager]").innerHTML = `<a class="pager prev" href="${u.person(prev.id)}"><span class="meta">Previous</span><span class="h3">${esc(prev.name)}</span></a><a class="pager next" href="${u.person(next.id)}"><span class="meta">Next</span><span class="h3">${esc(next.name)}</span></a>`;
  }

  function intro(delay) {
    const g = J.gsap; if (!g) return;
    const tl = g.timeline({ delay, defaults: { ease: J.ease } });
    tl.fromTo(".site-header", { autoAlpha: 0, y: -20 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0);
    const plate = $(".pp-plate");
    if (plate) {
      const img = plate.querySelector("img");
      tl.fromTo(plate, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut" }, 0.1)
        .fromTo(img, { scale: 1.3, filter: "grayscale(1) contrast(1.1)" }, { scale: 1, duration: 1.8 }, 0.1)
        .to(img, { filter: "grayscale(0) contrast(1)", duration: 1.4, ease: "power2.out" }, 1.0);
    }
    tl.add(J.linesIn($("[data-pp-name]"), { stagger: 0.08 }), 0.45)
      .fromTo(".pp-title, .pp-areas li, .pp-roles li, .pp-contact > *, .pp-id .crumbs", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.05 }, 0.7)
      .fromTo(".pp-portrait .caption", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 1.4);
    g.fromTo(".pp-publist li", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.05, ease: J.ease, scrollTrigger: { trigger: ".pp-publist", start: "top 85%", once: true } });
    g.fromTo(".pp-rail li", { autoAlpha: 0, x: 60 }, { autoAlpha: 1, x: 0, duration: 0.9, stagger: 0.04, ease: J.ease, scrollTrigger: { trigger: ".pp-rail", start: "top 90%", once: true } });
  }
  J.page(render, intro);
})();
