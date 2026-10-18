/* Home — The Journal Cover */
(() => {
  const { I, $, $$, esc, icon, u } = J;

  function render() {
    /* cover lines: four real stories */
    $("[data-cover-lines]").innerHTML = I.cover.lines.map((id, i) => {
      const n = J.story(id); if (!n) return "";
      return `<li><a href="${u.story(id)}" class="cl"><span class="n">${String(i + 1).padStart(2, "0")}</span><span class="c">${esc(n.category)}</span><span class="t">${esc(n.title)}</span></a></li>`;
    }).join("");

    /* finder */
    const sel = $("[data-aud]");
    sel.innerHTML = I.audiences.map((a) => `<option value="${a.id}">${esc(a.t)}</option>`).join("");
    sel.value = "graduate";

    /* brief: official overview + vision, scrubbed word by word */
    const text = `${I.about.overview[0]} ${I.about.overview[1]}`;
    $("[data-scrub]").innerHTML = text.split(" ").map((w) => `<span class="scw">${esc(w)}</span>`).join(" ");
    $("[data-brief-src]").innerHTML = `From ${J.srcLink("about", "About IIMB")}, the official site.`;
    const facts = [
      { v: "1973", l: "Inaugurated by Prime Minister Indira Gandhi on 28 October 1973", s: "archives" },
      { v: "1983", l: "B V Doshi’s stone campus on Bannerghatta Road completed", s: "arch" },
      { v: "11", l: "academic areas, from Decision Sciences to Strategy", s: "about" },
      { v: "2017", l: "Institute of National Importance under the IIM Act", s: "about" },
    ];
    $("[data-brief-facts]").innerHTML = facts.map((f) => `<div class="bf"><dt class="num">${f.v}</dt><dd>${esc(f.l)} <span class="src">${J.srcLink(f.s, "Source")}</span></dd></div>`).join("");

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
    $("[data-papers]").innerHTML = wps.map((p) => `<li><a class="index-row" href="${p.url}"><span class="n">WP ${p.no}</span><span class="t">${esc(p.title)}</span><span class="d">${esc(p.authors)} · ${p.year} · <span class="ext">iimb.ac.in</span></span></a></li>`).join("");

    /* leadership perspective: verbatim, sourced */
    const ch = I.leadership.chair;
    $("[data-voice]").innerHTML = `
      <blockquote class="pullquote" data-split><span class="mark">“</span>${esc(ch.quote)}<span class="mark">”</span></blockquote>
      <figcaption class="byline"><span class="vline" data-rule></span><span><span class="who">${esc(ch.name)}</span><br><span class="role">${esc(ch.role)}, IIM Bangalore · ${esc(ch.org)}</span><br><span class="src">From the ${J.srcLink("chair", "Message from the Chairperson")}</span></span></figcaption>`;

    /* programme shelf */
    const chips = [{ id: "all", t: "Everyone" }, ...I.audiences];
    $("[data-shelf-chips]").innerHTML = chips.map((a, i) => `<button class="chip" type="button" aria-pressed="${i === 0}" data-aud-chip="${a.id}">${esc(a.id === "all" ? a.t : a.t[0].toUpperCase() + a.t.slice(1))}</button>`).join("");
    const shelfItem = (p) => `<li class="spine-card" data-key="${p.id}"><a href="${u.prog(p.id)}">
        <span class="sc-plate plate">${J.img(p.img, { want: 800, sizes: "(max-width: 760px) 80vw, 360px", alt: "" })}</span>
        <span class="sc-code${p.short.length > 6 ? " long" : ""}">${esc(p.short)}</span>
        <span class="sc-name">${esc(p.name)}</span>
        <span class="sc-meta"><span>${esc(p.level)}</span><span>${esc(p.duration)}</span></span>
        <span class="sc-go">${icon("arrow")}</span></a></li>`;
    const track = $("[data-shelf-track]");
    const draw = (aud) => {
      const list = aud === "all" ? I.programmes : I.audiences.find((a) => a.id === aud).progs.map(J.prog);
      track.innerHTML = list.map(shelfItem).join("");
    };
    draw("all");
    $$("[data-aud-chip]").forEach((b) => b.addEventListener("click", () => {
      $$("[data-aud-chip]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      J.flip(track, () => draw(b.dataset.audChip));
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    }));

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
    $("[data-faces]").innerHTML = `<p class="faces-cap"><span class="h3">109 faculty, 11 areas.</span> <a class="arrow-link" href="faculty.html"><span>Browse the directory</span>${icon("arrow")}</a></p>
      <ul class="face-row" data-stagger>${pick.map((id) => { const f = J.fac(id); return `<li><a href="${u.person(id)}" title="${esc(f.name)}">${J.face(id)}<span class="fr-name">${esc(f.name)}</span></a></li>`; }).join("")}</ul>`;

    /* marquee: areas + centres */
    const areas = [...new Set(I.faculty.flatMap((f) => f.areas))].sort();
    const items = [];
    areas.forEach((a, i) => { items.push(`<a class="item" href="faculty.html?area=${J.slug(a)}">${esc(a)}</a>`); const c = I.centres[i]; if (c) items.push(`<a class="item" href="${u.centre(c.id)}">${esc(c.abbr)}</a>`); });
    $("[data-marquee-track]").innerHTML = items.join("");
    $("[data-marquee]").insertAdjacentHTML("beforeend", `<div class="track" aria-hidden="true">${items.join("").replace(/<a /g, '<a tabindex="-1" ')}</div>`);

    /* engage routes + partners */
    const peekImg = { recruit: "film-convocation", exec: "exec-ed", research: "columns", ventures: "library-commons", cases: "film-classroom", give: "main-block" };
    $("[data-routes]").innerHTML = I.industry.routes.map((r, i) => `<li><a class="index-row" href="partnerships.html#${r.id}" data-peek="${J.src(peekImg[r.id], 800)}"><span class="n">${String(i + 1).padStart(2, "0")}</span><span class="t">${esc(r.k)}</span><span class="d">${esc(r.d)}</span></a></li>`).join("");
    $("[data-partners]").innerHTML = I.industry.partners.map((p) => { const [who, what] = p.split(": "); return `<li><strong>${esc(who)}</strong><span>${esc(what || "")}</span></li>`; }).join("");

    /* calendar */
    const ups = I.events.filter((e) => (e.end || e.start) >= J.today).sort((a, b) => a.start.localeCompare(b.start)).slice(0, 6);
    $("[data-cal]").innerHTML = ups.map((e) => { const [, m, dd] = e.start.split("-"); return `<li class="cal-item kind-${J.slug(e.kind)}" data-fade><a href="${u.story(e.id)}">
      <span class="ci-day num">${+dd}</span><span class="ci-mon">${J.months[+m - 1].slice(0, 3)} ${e.start.slice(0, 4)}</span>
      <span class="ci-kind tag">${esc(e.kind)}</span>
      <span class="ci-t">${esc(e.title)}</span>
      <span class="ci-h small mute">${esc(e.host)}${e.end ? " · until " + J.date(e.end, "dm") : ""}</span></a></li>`; }).join("");

    /* newsroom */
    const latest = I.news.filter((n) => n.image && !I.cover.lines.includes(n.id) && !["node-9520", "node-7556"].includes(n.id)).slice(0, 4);
    $("[data-newsroom]").innerHTML = latest.map((n, i) => `<article class="nr-item ${i === 0 ? "lead" : ""}">
      <a class="nr-plate plate" href="${u.story(n.id)}" tabindex="-1" aria-hidden="true" ${i === 0 ? 'data-plate="up"' : ""}>${J.newsImg(n)}</a>
      <p class="meta mute">${esc(n.category)} · ${J.date(n.date)}</p>
      <h3 class="${i === 0 ? "h2" : "h4"}"><a class="draw" href="${u.story(n.id)}">${esc(n.title)}</a></h3>
      ${i === 0 ? `<p class="dek">${esc(n.standfirst || "")}</p>` : ""}</article>`).join("");

    /* rankings */
    $("[data-ranks]").innerHTML = I.rankings.map((r) => `<li><span class="rk num">${r.rank}<sup>${r.ord}</sup></span><span><strong>${esc(r.what)}</strong><br><span class="small mute">${esc(r.scope)} · ${J.srcLink(r.src, r.by)}</span></span></li>`).join("");

    setupFilm();
  }

  /* Campus film: desktop autoplays muted on screen; phones get the poster and a play button. */
  function setupFilm() {
    const v = $("[data-cover-film] video"), btn = $("[data-film-toggle]");
    const load = () => { if (!v.src) { v.src = v.dataset.src; } };
    if (!J.small() && !J.rm) { load(); J.bgFilm(v, btn); }
    else {
      btn.innerHTML = `${icon("play")}<span class="sr">Play the film</span>`;
      btn.addEventListener("click", function once() { btn.removeEventListener("click", once); load(); J.bgFilm(v, btn); v.play().catch(() => {}); });
    }
  }

  /* Cinematic opening: rule → film aperture → motto + headline → spine → finder. */
  function intro(delay) {
    const g = J.gsap; if (!g) return;
    const film = $("[data-cover-film]"), short = delay > 0;
    const tl = g.timeline({ delay, defaults: { ease: J.ease } });
    tl.fromTo(".cover-rule", { scaleX: 0 }, { scaleX: 1, duration: short ? 0.5 : 0.8, ease: "expo.inOut" }, 0)
      .fromTo(film, { clipPath: "inset(49.6% 0% 49.6% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: short ? 1.1 : 1.5, ease: "expo.inOut" }, short ? 0.2 : 0.55)
      .fromTo(film.querySelector("video"), { scale: 1.28 }, { scale: 1, duration: 2.4 }, short ? 0.2 : 0.55)
      .to(".cover-rule", { autoAlpha: 0, duration: 0.3 }, short ? 0.9 : 1.4)
      .fromTo(".site-header", { yPercent: -100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1 }, short ? 0.5 : 1.0)
      .fromTo(".cover-scrim", { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2 }, short ? 0.6 : 1.1)
      .fromTo(".cover-issue span", { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.8, stagger: 0.07 }, short ? 0.8 : 1.35)
      .fromTo(".cover-motto", { autoAlpha: 0, y: 14, letterSpacing: "0.12em" }, { autoAlpha: 1, y: 0, letterSpacing: "0em", duration: 1.3 }, short ? 0.85 : 1.4);
    const en = $(".cover-en");
    g.set(".cover-title", { visibility: "visible" });
    tl.add(J.linesIn(en, { stagger: 0.11, dur: 1.25 }), short ? 0.95 : 1.55)
      .fromTo(".cover-dek", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1 }, short ? 1.2 : 1.9)
      .fromTo(".cover-spine", { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "expo.inOut" }, short ? 0.9 : 1.5)
      .fromTo(".cover-lines-h, .cover-lines li", { autoAlpha: 0, x: 30 }, { autoAlpha: 1, x: 0, duration: 0.9, stagger: 0.08 }, short ? 1.3 : 1.95)
      .fromTo(".cover-base", { yPercent: 100 }, { yPercent: 0, duration: 1.1, ease: "expo.out" }, short ? 1.2 : 1.85);
    scenes();
  }

  function scenes() {
    const g = J.gsap; if (!g) return;
    const mm = g.matchMedia();
    /* cover parallax: the title drifts slower than the film as you leave */
    g.to(".cover-main", { yPercent: -18, ease: "none", scrollTrigger: { trigger: ".cover", start: "top top", end: "bottom top", scrub: true } });
    g.to("[data-cover-film] video", { yPercent: 12, ease: "none", scrollTrigger: { trigger: ".cover", start: "top top", end: "bottom top", scrub: true } });

    /* brief: words light up as they are read */
    g.fromTo(".scrub .scw", { opacity: 0.16 }, { opacity: 1, stagger: 0.05, ease: "none", scrollTrigger: { trigger: ".brief-text", start: "top 78%", end: "bottom 45%", scrub: 0.6 } });

    /* essay plate drifts */
    g.fromTo(".ef-plate img", { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: ".essay-feature", start: "top bottom", end: "bottom top", scrub: true } });

    /* programme shelf: pinned horizontal travel on wide screens */
    mm.add("(min-width: 1000px)", () => {
      const sec = $("[data-shelf-sec]"), track = $("[data-shelf-track]");
      const dist = () => Math.max(0, track.scrollWidth - innerWidth + 80);
      const tw = g.to(track, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: sec, start: "top top", end: () => "+=" + dist(), pin: true, scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1 } });
      g.utils.toArray(".spine-card").forEach((c) => g.fromTo(c.querySelector("img"), { scale: 1.18 }, { scale: 1, ease: "none", scrollTrigger: { trigger: c, containerAnimation: tw, start: "left right", end: "right left", scrub: true } }));
      return () => g.set(track, { clearProps: "transform" });
    });

    /* marquee: drifts, speeds up with scroll velocity, flips with direction */
    const tracks = $$("[data-marquee] .track");
    let x = 0, dir = -1, boost = 0;
    const w = () => tracks[0].offsetWidth;
    g.ticker.add(() => { x += (0.6 + boost) * dir; boost *= 0.92; const W = w(); if (x <= -W) x += W; if (x > 0) x -= W; tracks.forEach((t) => (t.style.transform = `translate3d(${x}px,0,0)`)); });
    ScrollTrigger.create({ trigger: "[data-marquee]", start: "top bottom", end: "bottom top", onUpdate: (s) => { boost = Math.min(18, Math.abs(s.getVelocity()) / 140); dir = s.direction === 1 ? -1 : 1; } });


    /* calendar day numerals roll up */
    g.utils.toArray(".ci-day").forEach((n) => g.fromTo(n, { yPercent: 70, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1, ease: J.ease, scrollTrigger: { trigger: n, start: "top 90%", once: true } }));
  }

  J.page(render, intro);

  /* Finder submit: send the audience to the programmes page. */
  document.addEventListener("submit", (e) => {
    const f = e.target.closest("[data-cover-finder]"); if (!f) return;
    e.preventDefault();
    const url = `programmes.html?for=${encodeURIComponent($("[data-aud]").value)}#finder`;
    const a = document.createElement("a"); a.href = url; document.body.appendChild(a); a.click(); a.remove();
  });
})();
