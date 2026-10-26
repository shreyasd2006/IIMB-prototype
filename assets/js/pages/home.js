/* Home — cover film, the institution in brief, rankings, programmes carousel, ideas, people, engagement, events, news */
(() => {
  const { I, $, $$, esc, icon, u } = J;
  const NEWS_CATS = ["Rankings", "Research", "Programmes", "Partnerships", "Centres", "Institution"]; // institutional news only
  
  function render() {
    /* finder */
    const sel = $("[data-aud]");
    sel.innerHTML = I.audiences.map((a) => `<option value="${a.id}">${esc(a.t)}</option>`).join("");
    sel.value = "graduate";

    /* the institution in brief: the official overview and vision, shown in full */
    $("[data-brief]").textContent = `${I.about.overview[0]} ${I.about.overview[1]}`;
    $("[data-brief-src]").innerHTML = `From ${J.srcLink("about", "About IIMB")}, the official site.`;
    const facts = [
      { v: "1973", l: "Inaugurated by Prime Minister Indira Gandhi on 28 October 1973", s: "archives" },
      { v: "1983", l: "B V Doshi’s stone campus on Bannerghatta Road completed", s: "arch" },
      { v: "11", l: "academic areas, from Decision Sciences to Strategy", s: "about" },
      { v: "2017", l: "Institute of National Importance under the IIM Act", s: "about" },
    ];
    $("[data-brief-facts]").innerHTML = facts.map((f) => `<div class="bf"><dt class="num" data-count>${f.v}</dt><dd>${esc(f.l)} <span class="src">${J.srcLink(f.s, "Source")}</span></dd></div>`).join("");

    /* rankings, from the live iimb.ac.in homepage + sourced ranking stories */
    const hr = I.homeRank;
    $("[data-rank-cards]").innerHTML = J.rankGrid(I.rankCards || [], "rkg-home");
    $("[data-adv]").innerHTML = I.advantage.map((a) => `<div class="adv-i"><dt class="num" data-count>${esc(a.v)}</dt><dd>${esc(a.l)}</dd></div>`).join("");
    $("[data-accr]").innerHTML = `<a href="https://www.efmdglobal.org/" class="accr-i"><img src="assets/img/efmd-equis.png" width="1021" height="737" alt="EQUIS accredited (EFMD)" loading="lazy"><span>EQUIS accredited since 2010; re-accredited in December 2021</span></a>
      <a href="https://globalnetwork.io/" class="accr-i"><img src="assets/img/gnam.png" width="765" height="326" alt="Global Network for Advanced Management" loading="lazy"><span>Member of the Global Network for Advanced Management since 2012</span></a>`;

    /* programmes carousel (after the second design) */
    $("[data-pc-track]").innerHTML = I.programmes.map(J.progCard).join("");

    /* featured essay */
    const e = J.story(I.cover.essay);
    $("[data-essay]").innerHTML = `
      <a class="ef-plate plate" href="${u.story(e.id)}" data-plate="left" tabindex="-1" aria-hidden="true">${J.newsImg(e)}</a>
      <div class="ef-text">
        <p class="meta ef-meta"><span class="tag">${esc(e.category)}</span> ${J.date(e.date)} · ${esc(e.place || "Bengaluru")}</p>
        <h3 class="h2 ef-title"><a class="draw" href="${u.story(e.id)}">${esc(e.title)}</a></h3>
        <p class="dek">${esc(e.standfirst || "")}</p>
        <a class="arrow-link" href="${u.story(e.id)}"><span>Read the story</span>${icon("arrow")}</a>
      </div>`;
    const wps = I.publications.workingPapers.slice(0, 5);
    $("[data-wp-note]").textContent = I.publications.wpSeries.text;
    $("[data-papers]").innerHTML = wps.map((p) => `<li><a class="index-row" href="${p.url}"><span class="n">WP ${p.no}</span><span class="t" data-no-i18n>${esc(p.title)}</span><span class="d"><span data-no-i18n>${esc(p.authors)}</span> · ${p.year} · <span class="ext">iimb.ac.in</span></span></a></li>`).join("");

    /* people and ideas */
    const yay = J.fac("sai-yayavaram"), gd = J.fac("gopal-das"), ad = J.fac("anirudh-dhawan");
    const n1 = J.story("node-9520"), n2 = J.story("node-7556");
    $("[data-spotlights]").innerHTML = `
      <article class="spot spot-film" data-fade>
        ${J.filmTile("fwiY2G1ji3M", "Does the market undervalue breakthrough innovation? Prof. Sai Yayavaram weighs in")}
        <div class="spot-by"><a href="${u.person(yay.id)}">${J.face(yay.id, { cls: "spot-face" })}</a><p><a class="draw h4" href="${u.person(yay.id)}">${esc(yay.name)}</a><br><span class="small mute">${esc(yay.title)}, ${esc(yay.areas.join(", "))} · Official IIMB film</span></p></div>
      </article>
      ${[[gd, n1], [ad, n2]].map(([f, n]) => `<article class="spot" data-fade>
        <a class="spot-portrait" href="${u.person(f.id)}">${J.face(f.id, { cls: "sp-face" })}</a>
        <p class="meta mute">${J.date(n.date)} · ${esc(n.category)}</p>
        <h3 class="h3"><a class="draw" href="${u.story(n.id)}">${esc(n.title)}</a></h3>
        <p class="small"><a class="ulink" href="${u.person(f.id)}">${esc(f.name)}</a>, ${esc(f.areas.join(", "))}</p>
      </article>`).join("")}`;
    const pick = ["mukta-kulkarni", "ritwik-banerjee", "spurthy-dharanikota", "m-jayadev", "padmini-srinivasan", "r-srinivasan", "mayank-kumar", "rajeev-r-tripathi", "manaswini-bhalla", "arnab-mukherji", "tarun-jain", "vasanthi-srinivasan", "soham-sahoo", "deepak-malghan"].filter(J.fac).slice(0, 12);
    $("[data-faces]").innerHTML = `<p class="faces-cap"><span class="h3"><span data-count>109</span> faculty, <span data-count>11</span> areas.</span> <a class="arrow-link" href="faculty.html"><span>Browse the directory</span>${icon("arrow")}</a></p>
      <ul class="face-row" data-stagger>${pick.map((id) => { const f = J.fac(id); return `<li><a href="${u.person(id)}" title="${esc(f.name)}">${J.face(id)}<span class="fr-name">${esc(f.name)}</span></a></li>`; }).join("")}</ul>`;

    /* engage routes + partners */
    $("[data-routes]").innerHTML = I.industry.routes.map((r, i) => `<li><a class="index-row" href="partnerships.html#${r.id}"><span class="n">${String(i + 1).padStart(2, "0")}</span><span class="t">${esc(r.k)}</span><span class="d">${esc(r.d)}</span></a></li>`).join("");
    $("[data-partners]").innerHTML = I.industry.partners.map((p) => { const [who, what] = p.split(": "); return `<li><strong>${esc(who)}</strong><span>${esc(what || "")}</span></li>`; }).join("");

    /* events */
    const ups = I.events.filter((e) => (e.end || e.start) >= J.today).sort((a, b) => a.start.localeCompare(b.start)).slice(0, 6);
    $("[data-cal]").innerHTML = ups.map((e) => { const [, m, dd] = e.start.split("-"); return `<li class="cal-item kind-${J.slug(e.kind)}"><a href="${u.story(e.id)}">
      <span class="ci-day num">${+dd}</span><span class="ci-mon">${J.monthName(+m - 1, true)} ${e.start.slice(0, 4)}</span>
      <span class="ci-kind tag">${esc(e.kind)}</span>
      <span class="ci-t">${esc(e.title)}</span>
      <span class="ci-h small mute">${esc(e.host)}${e.end ? " · until " + J.date(e.end, "dm") : ""}</span></a></li>`; }).join("");

    /* news: institutional stories only (no alumni, faculty-appointment or student items) */
    const latest = I.news.filter((n) => n.image && NEWS_CATS.includes(n.category) && n.id !== I.cover.essay).slice(0, 4);
    $("[data-newsroom]").innerHTML = latest.map((n, i) => `<article class="nr-item ${i === 0 ? "lead" : ""}">
      <a class="nr-plate plate" href="${u.story(n.id)}" tabindex="-1" aria-hidden="true" ${i === 0 ? 'data-plate="up"' : ""}>${J.newsImg(n)}</a>
      <p class="meta mute">${esc(n.category)} · ${J.date(n.date)}</p>
      <h3 class="${i === 0 ? "h2" : "h4"}"><a class="draw" href="${u.story(n.id)}">${esc(n.title)}</a></h3>
      ${i === 0 ? `<p class="dek">${esc(n.standfirst || "")}</p>` : ""}</article>`).join("");

    J.bgFilm($("[data-cover-film] video"));
  }

  /* Cinematic opening: rule → film aperture → motto + headline → finder. */
  function intro(delay) {
    const g = J.gsap; if (!g) return;
    const film = $("[data-cover-film]"), short = delay > 0;
    const tl = g.timeline({ delay, defaults: { ease: J.ease } });
    tl.fromTo(".cover-rule", { scaleX: 0 }, { scaleX: 1, duration: short ? 0.5 : 0.8, ease: "expo.inOut" }, 0)
      .fromTo(film, { clipPath: "inset(49.6% 0% 49.6% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: short ? 1.1 : 1.5, ease: "expo.inOut" }, short ? 0.2 : 0.55)
      .fromTo(film.querySelector("video"), { scale: 1.28 }, { scale: 1, duration: 2.4 }, short ? 0.2 : 0.55)
      .to(".cover-rule", { autoAlpha: 0, duration: 0.3 }, short ? 0.9 : 1.4)
      .fromTo(".utility", { yPercent: -100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.9 }, short ? 0.45 : 0.95)
      .fromTo(".site-header", { yPercent: -100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1 }, short ? 0.5 : 1.0)
      .fromTo(".cover-scrim", { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2 }, short ? 0.6 : 1.1)
      .fromTo(".cover-issue span", { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.8, stagger: 0.07 }, short ? 0.8 : 1.35)
      .fromTo(".cover-motto", { autoAlpha: 0, y: 14, letterSpacing: "0.12em" }, { autoAlpha: 1, y: 0, letterSpacing: "0em", duration: 1.3 }, short ? 0.85 : 1.4);
    g.set(".cover-title", { visibility: "visible" });
    tl.add(J.linesIn($(".cover-en"), { stagger: 0.11, dur: 1.15 }), short ? 0.95 : 1.55)
      .fromTo(".cover-dek", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1 }, short ? 1.2 : 1.9)
      .fromTo(".cover-base", { yPercent: 100 }, { yPercent: 0, duration: 1.1, ease: "expo.out" }, short ? 1.2 : 1.85);
    scenes();
  }

  function scenes() {
    const g = J.gsap; if (!g) return;
    /* cover parallax: the title drifts slower than the film as you leave */
    g.to(".cover-main", { yPercent: -18, ease: "none", scrollTrigger: { trigger: ".cover", start: "top top", end: "bottom top", scrub: true } });
    g.to("[data-cover-film] video", { yPercent: 12, ease: "none", scrollTrigger: { trigger: ".cover", start: "top top", end: "bottom top", scrub: true } });

    /* rankings: the headline figure lands with a red rule; rows draw their rules in sequence */
    g.fromTo(".rkg .rkc", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: J.ease, stagger: 0.05, scrollTrigger: { trigger: ".rkg", start: "top 90%", once: true } });
    g.fromTo(".rk-row", { "--rw": 0, autoAlpha: 0, x: 24 }, { "--rw": 1, autoAlpha: 1, x: 0, duration: 0.8, ease: J.ease, stagger: 0.07, scrollTrigger: { trigger: ".rk-list", start: "top 94%", once: true } });
    g.fromTo(".adv-i", { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: J.ease, stagger: 0.08, scrollTrigger: { trigger: ".adv-list", start: "top 95%", once: true } });

    J.carousel($(".prog-sec"));
    J.inkReveal($("[data-brief]"));

    /* essay plate drifts */
    g.fromTo(".ef-plate img", { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: ".essay-feature", start: "top bottom", end: "bottom top", scrub: true } });

    /* events: rows and day numerals roll up together */
    g.fromTo(".cal-item", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: J.ease, stagger: 0.06, scrollTrigger: { trigger: ".cal-list", start: "top 95%", once: true } });
    g.utils.toArray(".ci-day").forEach((n) => J.countUp(n, { trigger: n, start: "top 97%", once: true }));
  }

  J.page(render, intro);

  /* Finder submit: send the audience to the programmes page. */
  document.addEventListener("submit", (e) => {
    const f = e.target.closest("[data-cover-finder]"); if (!f) return;
    e.preventDefault();
    const url = `programmes.html?for=${encodeURIComponent($("[data-aud]").value)}#track`;
    const a = document.createElement("a"); a.href = url; document.body.appendChild(a); a.click(); a.remove();
  });
})();
