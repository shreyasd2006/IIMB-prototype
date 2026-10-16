/* Page renderers. Each reads the data files and fills its page's containers. */
(function () {
  "use strict";
  const I = window.IIMB;
  const U = () => I.util;
  const pages = (I.pages = {});

  const byId = (list, id) => (list || []).find((x) => x.id === id);
  const fac = (id) => byId(I.faculty, id);
  const progImg = (p) => p.img || "corridor";
  const upcoming = () => (I.events || []).filter((e) => U().parseISO(e.end || e.start) >= U().today).sort((a, b) => a.start.localeCompare(b.start));
  const past = () => (I.events || []).filter((e) => U().parseISO(e.end || e.start) < U().today).sort((a, b) => b.start.localeCompare(a.start));
  const set = (sel, html) => { const el = typeof sel === "string" ? U().$(sel) : sel; if (el) el.innerHTML = html; return el; };
  const personLink = (id, extra) => { const f = fac(id); if (!f) return ""; const { esc, initials } = U();
    return `<a class="person" href="person.html?id=${f.id}"><span class="mono" aria-hidden="true">${esc(initials(f.name))}</span><span><span class="pn">${esc(f.name)}</span><span class="pr">${esc(extra || [f.title, f.areas.join(", ")].filter(Boolean).join(" · "))}</span></span></a>`; };
  const eventRow = (e) => { const { esc, parseISO, MONTHS, fmtRange } = U(); const d = parseISO(e.start);
    return `<li><a class="event" href="story.html?event=${e.id}"><span class="d"><b>${d.getDate()}</b><span>${MONTHS[d.getMonth()].slice(0, 3)} ${String(d.getFullYear()).slice(2)}</span></span><span><span class="et2">${esc(e.title)}</span><span class="em3">${esc(fmtRange(e.start, e.end))} · ${esc(e.kind)}</span></span></a></li>`; };
  const storyRow = (n) => { const { esc, fmtDate } = U();
    return `<li><a href="story.html?id=${n.id}"><span class="st">${esc(n.title)}</span><span class="meta-line after"><time datetime="${n.date}">${fmtDate(n.date)}</time><span class="cat">${esc(n.category)}</span></span></a></li>`; };
  const sourcesBlock = (keys, extra = []) => { const { srcLink } = U();
    const items = keys.map((k) => srcLink(k)).filter(Boolean).concat(extra);
    return `<div class="sources"><span class="label">Sources</span> · checked ${U().esc(I.checked)}<ul>${items.map((x) => `<li>${x}</li>`).join("")}</ul></div>`; };
  const syncURL = (obj) => { const p = new URLSearchParams(location.search); Object.entries(obj).forEach(([k, v]) => (v && v !== "all" ? p.set(k, v) : p.delete(k))); history.replaceState(null, "", `${location.pathname}${p.toString() ? "?" + p : ""}${location.hash}`); };
  const title = (t) => { document.title = `${t} — IIM Bangalore · The Architectural Institution`; };

  /* ================================================================ HOME */
  pages.home = function () {
    const { esc, fmtDate, photo, ICON, ambientVideo, ytPoster, bindPosters, $, $$ } = U();

    /* hero film + the frame that opens to full bleed as you scroll */
    ambientVideo($("#heroVideo"), $("#heroToggle"));
    const frame = $(".hero-frame");
    if (frame && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      let ticking = false;
      const update = () => { ticking = false; const p = Math.min(1, Math.max(0, scrollY / (innerHeight * 0.55))); frame.style.setProperty("--p", p.toFixed(3)); };
      addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
      update();
    }

    /* doors: counts come from the data, not from copy */
    const P = I.publications || {};
    const doors = [
      ["programmes.html", I.programmes.length, "Programmes"], ["faculty.html", I.faculty.length, "Faculty"], ["research.html", (P.workingPapers || []).length, "Research"],
      ["centres.html", I.centres.length, "Centres"], ["news.html", I.news.length, "News"], ["news.html#events", upcoming().length, "Events"]
    ];
    set("#doors", doors.map(([h, n, k]) => `<a class="door" href="${h}"><span class="k">${esc(k)} ${ICON.chev}</span><span class="n">${n}</span></a>`).join(""));

    /* intro legend */
    set("#legend", I.about.facts.map((f) => `<li><span class="v num">${esc(f.v)}${f.unit ? `<small>${esc(f.unit)}</small>` : ""}</span><span class="l">${esc(f.l)} <span class="src">· ${U().srcLink(f.src, "source")}</span></span></li>`).join(""));

    /* architecture plate */
    set("#archPlate", photo("pergola", { sizes: "(max-width: 900px) 100vw, 58vw", caption: false, style: "height:100%" }));
    set("#archElements", I.architecture.elements.map((e) => `<li><strong>${esc(e.k)}</strong><span>${esc(e.d)}</span></li>`).join(""));

    /* programmes courtyard index */
    const featured = ["pgp", "pgpba", "epgp", "pgpem", "pgppm", "phd", "bsc-data-sciences", "executive-education"].map((id) => byId(I.programmes, id)).filter(Boolean);
    set("#progView", featured.map((p, i) => { const ph = I.photos[progImg(p)]; if (!ph) return ""; const ws = Object.keys(ph.src).map(Number);
      return `<img data-for="${p.id}" class="${i === 0 ? "on" : ""}" src="${ph.src[Math.max(...ws)] || ph.src[ws[0]]}" alt="${esc(ph.alt)}" loading="lazy">`; }).join("") + `<span class="cv-cap" id="progCap">${esc(I.photos[progImg(featured[0])].caption)}</span>`);
    set("#progList", featured.map((p, i) => `<li><a class="index-row${i === 0 ? " active" : ""}" data-for="${p.id}" href="programme.html?id=${p.id}">
        <span class="nm">${esc(p.name)}</span><span class="meta"><span>${esc(p.degree)}</span><span>${esc(p.duration)}</span><span>${esc(p.format)}</span></span><span class="tag">${esc(p.short)}</span></a></li>`).join(""));
    $$("#progList .index-row").forEach((row) => {
      const show = () => {
        $$("#progList .index-row").forEach((r) => r.classList.toggle("active", r === row));
        $$("#progView img").forEach((im) => im.classList.toggle("on", im.dataset.for === row.dataset.for));
        const p = byId(I.programmes, row.dataset.for); set("#progCap", esc(I.photos[progImg(p)].caption));
      };
      row.addEventListener("mouseenter", show); row.addEventListener("focus", show);
    });

    /* research ledger */
    set("#wpList", (P.workingPapers || []).slice(0, 4).map((w) => `<li class="entry"><a href="${esc(w.url)}" rel="noopener"><span class="et">${esc(w.title)}</span></a><span class="em2"><span class="no">WP ${w.no}</span><span>${esc(w.authors)}</span><span>${w.year}</span></span></li>`).join(""));
    set("#jaList", (P.journalArticles || []).slice(0, 4).map((j) => `<li class="entry"><a href="${esc(j.url)}" rel="noopener"><span class="et">${esc(j.title)}</span></a><span class="em2"><span>${esc(j.by)}</span>${j.venue ? `<span>${esc(j.venue)}</span>` : ""}</span></li>`).join(""));
    set("#themesHome", I.themes.map((t) => `<a class="theme" href="research.html?theme=${t.id}"><strong>${esc(t.t)}</strong><span>${esc(t.d)}</span></a>`).join(""));

    /* faculty teaser */
    const counts = {}; I.faculty.forEach((f) => f.areas.forEach((a) => (counts[a] = (counts[a] || 0) + 1)));
    set("#areasHome", Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0])).map(([a, n]) => `<li><a href="faculty.html?area=${encodeURIComponent(a)}"><span>${esc(a)}</span><span class="n">${n}</span></a></li>`).join(""));

    /* centres wall */
    set("#wall", I.centres.map((c) => `<a href="centre.html?id=${c.id}">${esc(c.name)}<sup>${esc(c.abbr)}</sup></a>`).join(""));

    /* films */
    const films = I.films.slice(0, 5);
    set("#filmMain", ytPoster(films[0].id, films[0].t, films[0].note));
    set("#filmList", films.map((f, i) => `<li><button type="button" data-film="${i}" ${i === 0 ? 'aria-current="true"' : ""}><span class="t">${esc(f.t)}</span><span class="s">${esc(f.note)}</span></button></li>`).join(""));
    bindPosters($("#filmMain"));
    $$("#filmList [data-film]").forEach((b) => b.addEventListener("click", () => {
      const f = films[+b.dataset.film];
      $$("#filmList [data-film]").forEach((x) => x.removeAttribute("aria-current")); b.setAttribute("aria-current", "true");
      set("#filmMain", ytPoster(f.id, f.t, f.note)); bindPosters($("#filmMain"));
    }));

    /* news & events */
    const lead = I.news.find((n) => n.image) || I.news[0];
    set("#leadStory", `<a href="story.html?id=${lead.id}"><div class="pergola">${U().newsImg(lead, { sizes: "(max-width: 1080px) 100vw, 50vw" })}</div>
      <h3 class="serif">${esc(lead.title)}</h3><div class="meta-line after"><time datetime="${lead.date}">${fmtDate(lead.date)}</time><span class="cat">${esc(lead.category)}</span></div><p>${esc(lead.standfirst || "")}</p></a>`);
    set("#storyList", I.news.filter((n) => n !== lead).slice(0, 4).map(storyRow).join(""));
    const up = upcoming().slice(0, 4);
    set("#eventList", up.length ? up.map(eventRow).join("") : `<li class="empty-state"><p>No upcoming events are listed. See the <a class="inline-link" href="news.html#events">events archive</a>.</p></li>`);

    /* recognition */
    set("#recog", I.rankings.map((r) => `<tr><td class="rk">${esc(r.rank)}<sup>${esc(r.ord)}</sup></td><td>${esc(r.scope)}</td><td>${esc(r.what)}</td><td>${U().srcLink(r.src, r.by)}</td></tr>`).join(""));
  };

  /* ================================================================ ABOUT */
  pages.about = function () {
    const { esc, photo, srcLink } = U();
    const A = I.about, AR = I.architecture, L = I.leadership;
    set("#motto", `<p class="dev t-2" lang="sa">${esc(A.motto.dev)}</p><p class="muted"><i lang="sa-Latn">${esc(A.motto.lat)}</i> — “${esc(A.motto.en)}”. ${esc(A.logoNote)}</p>`);
    set("#overview", A.overview.map((p) => `<p>${esc(p)}</p>`).join("") + `<p>${esc(A.accreditation)}</p><p>${esc(A.gnam)} ${esc(A.secondCampus)}</p>`);
    set("#mission", A.mission.concat(A.values).map((m) => `<li>${esc(m)}</li>`).join(""));
    set("#archHero", photo("aerial", { sizes: "100vw", cls: "page-hero-img", eager: false }));
    set("#archLede", `<p class="lede" style="max-width:none">${esc(AR.lede)}</p>`);
    set("#archBody", AR.passages.map((p) => `<p>${esc(p)}</p>`).join("") + `<blockquote>“${esc(AR.quote.text)}”<footer>${esc(AR.quote.by)} · ${srcLink("arch", "IIMB, Architecture")}</footer></blockquote>`);
    set("#archPhotos", [["corridor", "span-7"], ["stone-bougainvillea", "span-5"]].map(([s, c]) => `<div class="${c}">${photo(s)}</div>`).join(""));
    set("#archDoshi", photo("doshi", { sizes: "(max-width: 900px) 60vw, 25vw" }));
    set("#timeline", I.timeline.map((t) => `<li class="tl"><span class="y">${esc(t.y)}</span><p>${esc(t.t)} <span class="src">· ${srcLink(t.src, "source")}</span></p><div>${t.img ? photo(t.img, { sizes: "(max-width: 900px) 100vw, 40vw" }) : ""}</div></li>`).join(""));
    set("#leaders", `
      <div class="split" style="margin-bottom:56px">
        <div><h3 class="t-2">${esc(L.chair.name)}</h3><p style="margin-top:10px">Chairperson, Board of Governors</p><p class="muted">${esc(L.chair.org)} · <a class="inline-link" href="mailto:${L.chair.email}">${L.chair.email}</a></p></div>
        <div class="prose"><blockquote>“${esc(L.chair.quote)}”<footer>From the ${srcLink("chair", "Message from the Chairperson")}</footer></blockquote></div>
      </div>
      <div class="people">${personLink(L.director.facultyId, "Director-in-charge")}${L.deans.map((d) => personLink(d.facultyId, d.role)).join("")}</div>`);
    set("#board", L.board.map(([n, r]) => `<tr><td>${esc(n)}</td><td>${esc(r)}</td></tr>`).join(""));
    set("#boardNote", esc(L.boardNote));
    set("#iac", L.iac.map(([n, r]) => `<li><strong class="serif" style="font-weight:400">${esc(n)}</strong>, <span class="muted">${esc(r)}</span></li>`).join(""));
    set("#docs", L.governanceDocs.map((d) => `<li><a class="inline-link ext" href="${esc(d.u)}" rel="noopener">${esc(d.t)}</a></li>`).join(""));
    set("#recogAbout", I.rankings.map((r) => `<tr><td class="rk">${esc(r.rank)}<sup>${esc(r.ord)}</sup></td><td>${esc(r.scope)}</td><td>${esc(r.what)}</td><td>${srcLink(r.src, r.by)}</td></tr>`).join(""));
    set("#aboutSources", sourcesBlock(["about", "arch", "archives", "board", "chair", "ftCases", "ftMim", "qs", "bloomberg", "ftEmba"]) + `<p class="small" style="margin-top:12px">Where official pages disagree, both values are noted rather than one chosen: ${I.about.conflicting.map(esc).join(" ")}</p>`);
  };

  /* ================================================================ PROGRAMMES */
  pages.programmes = function () {
    const { esc, params, $$ } = U();
    const levels = ["all", ...Array.from(new Set(I.programmes.map((p) => p.level)))];
    let level = params.get("level") || "all";
    const q = U().$("#progSearch");
    q.value = params.get("q") || "";
    const draw = () => {
      const s = q.value.trim().toLowerCase();
      const list = I.programmes.filter((p) => (level === "all" || p.level === level) && (!s || [p.name, p.short, p.degree, p.format, p.summary, p.eligibility].join(" ").toLowerCase().includes(s)));
      set("#levelChips", levels.map((l) => `<button type="button" class="chip" aria-pressed="${l === level}" data-level="${esc(l)}">${l === "all" ? "All programmes" : esc(l)} <span class="n">${l === "all" ? I.programmes.length : I.programmes.filter((p) => p.level === l).length}</span></button>`).join(""));
      $$("#levelChips [data-level]").forEach((b) => b.addEventListener("click", () => { level = b.dataset.level; draw(); }));
      set("#progCount", `<span><strong>${list.length}</strong> of ${I.programmes.length} programmes</span>`);
      set("#progTable", list.map((p) => `<tr>
          <td><a href="programme.html?id=${p.id}">${esc(p.name)}</a><small>${esc(p.degree)}</small></td>
          <td data-l="Level">${esc(p.level)}</td><td data-l="Duration">${esc(p.duration)}</td><td data-l="Format">${esc(p.format)}</td><td data-l="Experience">${esc(p.experience)}</td></tr>`).join(""));
      U().$("#progEmpty").hidden = list.length > 0;
      syncURL({ level, q: q.value.trim() });
    };
    q.addEventListener("input", draw);
    draw();
    set("#progSources", sourcesBlock(["programmes", "admissions", "pgpFees", "pgpIntl", "ugAdm"]));
  };

  pages.programme = function () {
    const { esc, params, photo, srcLink } = U();
    const p = byId(I.programmes, params.get("id")) || I.programmes[0];
    title(p.name);
    set("#crumb", esc(p.short));
    set("#pTitle", esc(p.name));
    set("#pDeck", esc(p.summary));
    set("#pImg", photo(progImg(p), { sizes: "100vw", cls: "page-hero-img" }));
    const rows = [["Degree", p.degree], ["Duration", p.duration], ["Format", p.format], ["Eligibility", p.eligibility + (p.eligibilitySrc ? ` (${srcLink(p.eligibilitySrc, "source")})` : "")], ["Work experience", p.experience], ["Cohort", p.intake], ["Fee", p.fee ? p.fee + ` (${srcLink(p.feeSrc, "source")})` : `<span class="placeholder">Fee for the next intake: confirm on the official programme page</span>`]].filter((r) => r[1]);
    set("#pFacts", rows.map(([k, v]) => `<tr><th scope="row">${k}</th><td>${/<a |<span/.test(v) ? v : esc(v)}</td></tr>`).join(""));
    set("#pCurr", (p.curriculum || []).map((c) => `<li>${esc(c)}</li>`).join(""));
    set("#pAdm", (p.admissions || []).map((c) => `<li><span>${esc(c)}</span></li>`).join("") );
    set("#pAid", p.aid ? `<p>${esc(p.aid)}</p>` : "");
    set("#pDates", p.dates ? `<h3 class="t-4" style="margin:32px 0 12px">Key dates</h3><table class="facts-table">${p.dates.map((d) => `<tr><th scope="row">${esc(d.l)}</th><td>${esc(d.v)}</td></tr>`).join("")}</table><p class="src" style="margin-top:8px">${srcLink(p.datesSrc)}</p>` : p.admissionsSrc ? `<p class="src">${srcLink(p.admissionsSrc)}</p>` : "");
    set("#pChair", p.chair ? `<p class="label" style="margin-bottom:8px">Programme chairperson</p><div class="people" style="grid-template-columns:1fr">${personLink(p.chair)}</div>` : "");
    set("#pCta", `<a class="btn" href="${esc(p.apply)}" rel="noopener">Apply on the official site ${U().ICON.arrow}</a>
      <a class="link ext" href="${esc(p.url)}" rel="noopener">Official programme page</a>${p.contact ? `<p class="small muted" style="margin:8px 0 0">Admissions enquiries: <a class="inline-link" href="${p.contact.includes("@") ? "mailto:" + esc(p.contact) : "https://" + esc(p.contact)}">${esc(p.contact)}</a></p>` : ""}${p.calendar ? `<a class="link ext" href="${esc(p.calendar)}" rel="noopener">Programme calendar 2026–27 (PDF)</a>` : ""}`);
    const rel = I.news.filter((n) => (n.title + " " + (n.standfirst || "")).includes(p.short) || n.title.includes(p.name)).slice(0, 4);
    set("#pNews", rel.length ? `<h2 class="t-3" style="margin-bottom:20px">In the news</h2><ul class="story-list">${rel.map(storyRow).join("")}</ul>` : "");
    const others = I.programmes.filter((x) => x.level === p.level && x.id !== p.id);
    set("#pOthers", others.length ? `<h2 class="t-3" style="margin-bottom:20px">Also at this level</h2><ul class="index-list">${others.map((o) => `<li><a class="index-row" href="programme.html?id=${o.id}"><span class="nm">${esc(o.name)}</span><span class="meta"><span>${esc(o.duration)}</span><span>${esc(o.format)}</span></span><span class="tag">${esc(o.short)}</span></a></li>`).join("")}</ul>` : "");
    set("#pSources", `<div class="sources"><span class="label">Sources</span> · checked ${esc(I.checked)}<ul><li><a class="ext" rel="noopener" href="${esc(p.url)}">${esc(p.name)} — official page</a></li><li>${srcLink("programmes")}</li></ul></div>`);
  };

  /* ================================================================ RESEARCH */
  pages.research = function () {
    const { esc, params, $, $$ } = U();
    const P = I.publications;
    const wp = P.workingPapers;
    const themeOf = (w) => I.themes.filter((t) => t.kw.some((k) => (" " + w.title.toLowerCase() + " ").includes(k))).map((t) => t.id);
    wp.forEach((w) => (w.themes = themeOf(w)));
    let theme = params.get("theme") || "all";
    const q = $("#wpSearch"), yr = $("#wpYear");
    q.value = params.get("q") || "";
    const years = Array.from(new Set(wp.map((w) => w.year))).sort((a, b) => b - a);
    yr.innerHTML = `<option value="all">All years</option>` + years.map((y) => `<option${String(y) === params.get("year") ? " selected" : ""}>${y}</option>`).join("");
    const drawThemes = () => {
      set("#themes", I.themes.map((t) => `<button type="button" class="theme" aria-pressed="${t.id === theme}" data-theme="${t.id}"><strong>${esc(t.t)}</strong><span>${esc(t.d)}</span><span class="n">${wp.filter((w) => w.themes.includes(t.id)).length} papers</span></button>`).join(""));
      $$("#themes [data-theme]").forEach((b) => b.addEventListener("click", () => { theme = theme === b.dataset.theme ? "all" : b.dataset.theme; drawThemes(); draw(); }));
    };
    const draw = () => {
      const s = q.value.trim().toLowerCase(), y = yr.value;
      const list = wp.filter((w) => (theme === "all" || w.themes.includes(theme)) && (y === "all" || String(w.year) === y) && (!s || (w.title + " " + w.authors + " " + w.no).toLowerCase().includes(s)));
      set("#wpCount", `<span><strong>${list.length}</strong> of ${wp.length} working papers${theme !== "all" ? ` in “${esc(byId(I.themes, theme).t)}”` : ""}</span>${theme !== "all" || s || y !== "all" ? `<button type="button" class="chip" id="wpClear">Clear filters</button>` : ""}`);
      const c = $("#wpClear"); if (c) c.addEventListener("click", () => { theme = "all"; q.value = ""; yr.value = "all"; drawThemes(); draw(); });
      set("#wpList", list.map((w) => `<li class="entry"><a href="${esc(w.url)}" rel="noopener"><span class="et ext">${esc(w.title)}</span></a><span class="em2"><span class="no">Working Paper No. ${w.no}</span><span>${esc(w.authors)}</span><span>${w.year}</span>${w.themes.map((t) => `<span class="tag">${esc(byId(I.themes, t).t.split(/[,&]/)[0].trim())}</span>`).join("")}</span></li>`).join(""));
      $("#wpEmpty").hidden = list.length > 0;
      syncURL({ theme, q: q.value.trim(), year: y });
    };
    q.addEventListener("input", draw); yr.addEventListener("change", draw);
    drawThemes(); draw();
    set("#jaList", P.journalArticles.map((j) => {
      const f = I.faculty.find((x) => j.by && j.by.includes(x.name));
      return `<li class="entry"><a href="${esc(j.url)}" rel="noopener"><span class="et ext">${esc(j.title)}</span></a><span class="em2">${f ? `<a class="author-link" href="person.html?id=${f.id}">${esc(j.by)}</a>` : `<span>${esc(j.by)}</span>`}${j.venue ? `<span>${esc(j.venue)}</span>` : ""}</span></li>`; }).join(""));
    set("#wpNote", `${esc(P.wpSeries.text)} <a class="inline-link ext" href="${esc(P.wpSeries.ssrn)}" rel="noopener">IIMB papers on SSRN</a>`);
    const rp = (I.events || []).filter((e) => /research|doctoral|workshop|conference|seminar/i.test(e.kind + " " + e.title));
    set("#rpEvents", rp.filter((e) => U().parseISO(e.end || e.start) >= U().today).slice(0, 5).map(eventRow).join("") || `<li class="empty-state"><p>No upcoming research events.</p></li>`);
    set("#resSources", sourcesBlock(["research", "wp", "events"], [`<a class="ext" rel="noopener" href="https://www.iimb.ac.in/imr/">IIMB Management Review</a>`]) + `<p class="small" style="margin-top:12px">Themes group papers by keywords in their titles. They are an editorial lens for this concept, not an official IIMB classification.</p>`);
  };

  /* ================================================================ FACULTY */
  pages.faculty = function () {
    const { esc, params, $, initials } = U();
    const F = I.faculty;
    const areas = Array.from(new Set(F.flatMap((f) => f.areas))).sort();
    const titles = ["Professor", "Associate Professor", "Assistant Professor"];
    const q = $("#fSearch"), area = $("#fArea"), rank = $("#fRank"), sort = $("#fSort");
    area.innerHTML = `<option value="all">All areas</option>` + areas.map((a) => `<option>${esc(a)}</option>`).join("");
    rank.innerHTML = `<option value="all">All positions</option>` + titles.map((t) => `<option>${t}</option>`).join("") + `<option value="other">Other positions</option>`;
    q.value = params.get("q") || ""; area.value = areas.includes(params.get("area")) ? params.get("area") : "all"; rank.value = params.get("rank") || "all";
    const hay = (f) => [f.name, f.title, f.areas.join(" "), (f.roles || []).join(" "), f.summary || ""].join(" ").toLowerCase();
    const draw = () => {
      const s = q.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
      let list = F.filter((f) => (area.value === "all" || f.areas.includes(area.value)) &&
        (rank.value === "all" || (rank.value === "other" ? !titles.includes(f.title) : f.title === rank.value)) && s.every((t) => hay(f).includes(t)));
      if (sort.value === "first") list = list.slice().sort((a, b) => a.name.localeCompare(b.name));
      if (sort.value === "area") list = list.slice().sort((a, b) => a.areas[0].localeCompare(b.areas[0]) || a.name.split(" ").pop().localeCompare(b.name.split(" ").pop()));
      set("#fCount", `<span><strong>${list.length}</strong> of ${F.length} faculty members</span>${s.length || area.value !== "all" || rank.value !== "all" ? '<button type="button" class="chip" id="fClear">Clear filters</button>' : ""}`);
      const c = $("#fClear"); if (c) c.addEventListener("click", () => { q.value = ""; area.value = "all"; rank.value = "all"; draw(); q.focus(); });
      set("#fList", list.map((f) => {
        const snippet = s.length && f.summary && !f.name.toLowerCase().includes(s[0]) ? (() => { const i = f.summary.toLowerCase().indexOf(s[0]); return i > -1 ? "…" + f.summary.slice(Math.max(0, i - 40), i + 80) + "…" : ""; })() : (f.roles || [])[0] || "";
        return `<li><a class="dir-row" href="person.html?id=${f.id}"><span class="mono" aria-hidden="true">${esc(initials(f.name))}</span><span><span class="pn">${esc(f.name)}</span><span class="pr">${esc(f.title || "Faculty")}</span></span><span class="areas-cell">${esc(f.areas.join(" · "))}</span><span class="exp">${esc(snippet)}</span><span class="go">${U().ICON.chev}</span></a></li>`; }).join(""));
      $("#fEmpty").hidden = list.length > 0;
      syncURL({ q: q.value.trim(), area: area.value, rank: rank.value });
    };
    [q].forEach((el) => el.addEventListener("input", draw));
    [area, rank, sort].forEach((el) => el.addEventListener("change", draw));
    draw();
    set("#facSources", sourcesBlock(["faculty"]) + `<p class="small" style="margin-top:12px">Names, positions and areas come from IIMB’s eleven area pages; summaries and publications from each official profile. Portraits are not reproduced in this concept.</p>`);
  };

  pages.person = function () {
    const { esc, params, initials } = U();
    const f = fac(params.get("id"));
    if (!f) { set("#pName", "Faculty member not found"); set("#pBody", `<p>Return to the <a class="inline-link" href="faculty.html">faculty directory</a>.</p>`); return; }
    title(f.name);
    set("#crumb", esc(f.name));
    set("#pMono", esc(initials(f.name)));
    set("#pName", esc(f.name));
    set("#pRole", `${esc(f.title || "Faculty")} · ${f.areas.map((a) => `<a class="inline-link" href="faculty.html?area=${encodeURIComponent(a)}">${esc(a)}</a>`).join(", ")}`);
    set("#pSide", `<dl class="kv">
      ${f.roles && f.roles.length ? `<dt>Roles</dt><dd>${f.roles.map(esc).join("<br>")}</dd>` : ""}
      ${f.email ? `<dt>Email</dt><dd><a class="inline-link" href="mailto:${esc(f.email)}">${esc(f.email)}</a></dd>` : ""}
      <dt>Profile</dt><dd><a class="inline-link ext" href="${esc(f.url)}" rel="noopener">Official IIMB profile</a></dd></dl>`);
    set("#pSummary", f.summary ? f.summary.split(/(?<=\.)\s+(?=[A-Z])/).reduce((acc, s) => { const last = acc[acc.length - 1]; if (last && last.length < 380) acc[acc.length - 1] = last + " " + s; else acc.push(s); return acc; }, []).map((p) => `<p>${esc(p)}</p>`).join("") : `<p class="placeholder">The official profile does not publish a summary. See the official profile.</p>`);
    set("#pPubs", f.pubs && f.pubs.length ? `<h2 class="t-3" style="margin:48px 0 16px">Selected research</h2><ul class="pub-list">${f.pubs.map((p) => `<li>${esc(p)}</li>`).join("")}</ul><p class="src" style="margin-top:8px">As listed on the official profile. Full list: <a class="ext" href="${esc(f.url)}" rel="noopener">IIMB profile</a></p>` : "");
    const last = f.name.split(" ").pop();
    const wps = (I.publications.workingPapers || []).filter((w) => w.authors.includes(f.name) || (w.authors.includes(last) && w.authors.includes(f.name.split(" ")[0])));
    set("#pWp", wps.length ? `<h2 class="t-3" style="margin:48px 0 16px">IIMB working papers</h2><ul class="entries">${wps.map((w) => `<li class="entry"><a href="${esc(w.url)}" rel="noopener"><span class="et ext">${esc(w.title)}</span></a><span class="em2"><span class="no">WP ${w.no}</span><span>${esc(w.authors)}</span><span>${w.year}</span></span></li>`).join("")}</ul>` : "");
    const news = I.news.filter((n) => (n.title + " " + (n.body || []).map((b) => b.p || "").join(" ")).includes(f.name)).slice(0, 5);
    set("#pNews", news.length ? `<h2 class="t-3" style="margin:48px 0 16px">In IIMB news</h2><ul class="story-list">${news.map(storyRow).join("")}</ul>` : "");
    const centres = I.centres.filter((c) => c.chairId === f.id || (c.people || []).includes(f.id));
    set("#pCentres", centres.length ? `<p class="label" style="margin:28px 0 8px">Centres</p><ul class="plain-list">${centres.map((c) => `<li><a class="inline-link" href="centre.html?id=${c.id}">${esc(c.name)}</a></li>`).join("")}</ul>` : "");
    const peers = I.faculty.filter((x) => x.id !== f.id && x.areas.some((a) => f.areas.includes(a))).slice(0, 6);
    set("#pPeers", peers.map((p) => personLink(p.id)).join(""));
  };

  /* ================================================================ CENTRES */
  pages.centres = function () {
    const { esc, params, $, $$ } = U();
    const kinds = ["all", ...Array.from(new Set(I.centres.map((c) => c.kind)))];
    let kind = params.get("kind") || "all";
    const q = $("#cSearch"); q.value = params.get("q") || "";
    const draw = () => {
      const s = q.value.trim().toLowerCase();
      const list = I.centres.filter((c) => (kind === "all" || c.kind === kind) && (!s || [c.name, c.abbr, c.about, c.areas.join(" ")].join(" ").toLowerCase().includes(s)));
      set("#kindChips", kinds.map((k) => `<button type="button" class="chip" aria-pressed="${k === kind}" data-kind="${esc(k)}">${k === "all" ? "All" : esc(k)} <span class="n">${k === "all" ? I.centres.length : I.centres.filter((c) => c.kind === k).length}</span></button>`).join(""));
      $$("#kindChips [data-kind]").forEach((b) => b.addEventListener("click", () => { kind = b.dataset.kind; draw(); }));
      set("#cCount", `<span><strong>${list.length}</strong> of ${I.centres.length}</span>`);
      set("#cGrid", `<ul class="index-list">${list.map((c) => { const ch = fac(c.chairId); return `<li><a class="index-row centre-row" href="centre.html?id=${c.id}"><span class="nm">${esc(c.name)}<sup class="abbr">${esc(c.abbr)}</sup></span><span class="meta"><span>${esc(c.about.split(". ")[0].replace(/\.+$/, ""))}.</span></span><span class="meta"><span class="kind">${esc(c.kind)}</span>${ch ? `<span>Chair: ${esc(ch.name)}</span>` : ""}<span class="areas-inline">${esc(c.areas.slice(0, 3).join(" · "))}</span></span></a></li>`; }).join("")}</ul>`);
      $("#cEmpty").hidden = list.length > 0;
      syncURL({ kind, q: q.value.trim() });
    };
    q.addEventListener("input", draw); draw();
    set("#cenSources", sourcesBlock(["centres"]) + `<p class="small" style="margin-top:12px">Chairpersons are taken from roles listed on official faculty profiles. Where no chair is listed, none is shown.</p>`);
  };

  pages.centre = function () {
    const { esc, params, srcLink } = U();
    const c = byId(I.centres, params.get("id")) || I.centres[0];
    title(c.name);
    set("#crumb", esc(c.abbr));
    set("#cName", esc(c.name));
    set("#cDeck", `${esc(c.kind)}${c.since ? ` · since ${esc(c.since)}` : ""}`);
    set("#cAbout", `<p class="lede" style="max-width:none">${esc(c.about)}</p>`);
    set("#cAreas", c.areas.map((a) => `<span class="tag">${esc(a)}</span>`).join(""));
    set("#cGroups", c.groups ? `<p class="label" style="margin:28px 0 8px">Research groups</p><ul class="plain-list">${c.groups.map((g) => `<li>${esc(g)}</li>`).join("")}</ul>` : "");
    set("#cNumbers", c.numbers ? `<div class="figures" style="margin-top:32px;border-color:var(--rule)">${c.numbers.map(([v, l]) => `<div style="border-color:var(--rule)"><b style="color:var(--bronze-ink)">${esc(v)}</b><span class="muted">${esc(l)}</span></div>`).join("")}</div><p class="src" style="margin-top:8px">As stated on the centre’s official page.</p>` : "");
    const ppl = [c.chairId].concat(c.people || []).filter(Boolean);
    set("#cPeople", ppl.length ? `<div class="people">${ppl.map((id) => personLink(id, id === c.chairId ? `Chairperson, ${c.abbr}` : null)).join("")}</div>${c.peopleNote ? `<p class="src" style="margin-top:8px">${esc(c.peopleNote)}</p>` : ""}` : `<p class="muted">The centre’s people are listed on its <a class="inline-link ext" href="${esc(c.url)}" rel="noopener">official page</a>.</p>`);
    const rx = new RegExp(c.match.map((m) => m.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"));
    const news = I.news.filter((n) => rx.test(n.title + " " + (n.standfirst || "") + " " + (n.body || []).slice(0, 2).map((b) => b.p || "").join(" ")));
    const ev = (I.events || []).filter((e) => rx.test(e.title + " " + e.host + " " + (e.standfirst || "")));
    set("#cActivity", (ev.length ? `<h3 class="t-4" style="margin-bottom:12px">Events</h3><ul class="event-list" style="margin-bottom:40px">${ev.map(eventRow).join("")}</ul>` : "") +
      (news.length ? `<h3 class="t-4" style="margin-bottom:12px">News</h3><ul class="story-list">${news.slice(0, 6).map(storyRow).join("")}</ul>` : "") ||
      `<p class="muted">No recent news or events in this concept’s data. See the <a class="inline-link ext" href="${esc(c.url)}" rel="noopener">official page</a>.</p>`);
    set("#cContact", `${c.email ? `<a class="btn" href="mailto:${esc(c.email)}">Write to ${esc(c.abbr)} ${U().ICON.arrow}</a>` : ""}<a class="link ext" href="${esc(c.url)}" rel="noopener">Official centre page</a>`);
    set("#cSources", `<div class="sources"><span class="label">Sources</span> · checked ${esc(I.checked)}<ul><li><a class="ext" rel="noopener" href="${esc(c.url)}">${esc(c.name)} — official page</a></li><li>${srcLink("centres")}</li></ul></div>`);
  };

  /* ================================================================ CAMPUS */
  pages.campus = function () {
    const { esc, photo, ambientVideo, $, ytPoster, bindPosters } = U();
    const C = I.campus;
    set("#essay1", `<div class="span-7">${photo("pergola-light", { sizes: "(max-width: 900px) 100vw, 58vw" })}</div><div class="span-5 tall">${photo("ug", { sizes: "(max-width: 900px) 100vw, 40vw" })}</div>`);
    set("#essay2", `<div class="span-5" style="grid-column:2 / span 5">${photo("library-commons", { sizes: "(max-width: 900px) 100vw, 40vw" })}</div><div class="span-6">${photo("amphitheatre", { sizes: "(max-width: 900px) 100vw, 50vw" })}</div>`);
    set("#essay3", `<div class="span-8">${photo("main-block", { sizes: "(max-width: 900px) 100vw, 66vw" })}</div><div class="span-4">${photo("hockey", { sizes: "(max-width: 900px) 100vw, 33vw" })}</div>`);
    set("#figures", `<p class="t-3" style="max-width:34ch;color:var(--night-text)">${C.facts.map((f) => `<span class="fig">${esc(f.v)}</span> ${esc(f.l)}`).join(", ").replace(/, ([^,]*)$/, " and $1")}.</p>`);
    set("#facilities", `<div class="courtyard"><div class="courtyard-view" id="facView" aria-hidden="true">${C.facilities.map((f, i) => { const ph = I.photos[f.img]; const ws = Object.keys(ph.src).map(Number); return `<img data-for="${i}" class="${i === 0 ? "on" : ""}" src="${ph.src[Math.max(...ws)]}" alt="" loading="lazy">`; }).join("")}<span class="cv-cap" id="facCap">${esc(I.photos[C.facilities[0].img].caption)} · ${esc(I.photos[C.facilities[0].img].credit)}</span></div>
      <ul class="index-list">${C.facilities.map((f, i) => `<li><div class="index-row${i === 0 ? " active" : ""}" data-for="${i}" tabindex="0"><span class="nm">${f.u ? `<a href="${esc(f.u)}" rel="noopener" class="ext" style="text-decoration:none">${esc(f.k)}</a>` : esc(f.k)}</span><span class="meta"><span>${esc(f.d)}</span></span></div></li>`).join("")}</ul></div>`);
    U().$$("#facilities .index-row").forEach((row) => { const show = () => { U().$$("#facilities .index-row").forEach((r) => r.classList.toggle("active", r === row)); U().$$("#facView img").forEach((im) => im.classList.toggle("on", im.dataset.for === row.dataset.for)); const ph = I.photos[C.facilities[+row.dataset.for].img]; set("#facCap", esc(ph.caption + " · " + ph.credit)); }; row.addEventListener("mouseenter", show); row.addEventListener("focus", show); });
    set("#sust", C.sustainability.map((s) => `<li><span class="v num">${esc(s.v)}</span><span class="l">${esc(s.l)}</span></li>`).join(""));
    set("#sustPhoto", photo("sustainability", { sizes: "(max-width: 900px) 100vw, 50vw" }));
    set("#festivals", photo("unmaad", { sizes: "(max-width: 900px) 100vw, 50vw" }) );
    ambientVideo($("#libVideo"), $("#libToggle"));
    const tour = I.films.filter((f) => f.src === "tour");
    set("#tourFilm", ytPoster(tour[0].id, tour[0].t, tour[0].note));
    set("#tourList", tour.slice(1).map((f) => `<div class="film-main" style="margin-top:24px">${ytPoster(f.id, f.t, f.note)}</div>`).join(""));
    bindPosters(document);
    set("#campusSources", sourcesBlock(["life", "student", "sust", "tour", "arch"]) );
  };

  /* ================================================================ NEWS & EVENTS */
  pages.news = function () {
    const { esc, params, $, $$, fmtDate, MONTHS, parseISO, newsImg } = U();
    const N = I.news;
    const cats = ["all", ...Array.from(new Set(N.map((n) => n.category))).sort()];
    let tab = location.hash === "#events" || params.get("tab") === "events" ? "events" : "news";
    let month = params.get("month") || "all";
    const q = $("#nSearch"), cat = $("#nCat");
    q.value = params.get("q") || "";
    cat.innerHTML = cats.map((c) => `<option value="${esc(c)}">${c === "all" ? "All categories" : esc(c)}</option>`).join("");
    cat.value = cats.includes(params.get("cat")) ? params.get("cat") : "all";
    const monthKey = (iso) => iso.slice(0, 7);
    const monthLabel = (k) => { const [y, m] = k.split("-"); return `${MONTHS[+m - 1]} ${y}`; };
    const tabs = $$("[role=tab]");
    const setTab = (t) => {
      tab = t;
      tabs.forEach((b) => { const on = b.dataset.tab === t; b.setAttribute("aria-selected", String(on)); b.tabIndex = on ? 0 : -1; });
      $("#panel-news").hidden = t !== "news"; $("#panel-events").hidden = t !== "events";
      $("#catField").hidden = t !== "news";
      month = "all"; draw();
      history.replaceState(null, "", location.pathname + location.search + (t === "events" ? "#events" : ""));
    };
    tabs.forEach((b, i) => {
      b.addEventListener("click", () => setTab(b.dataset.tab));
      b.addEventListener("keydown", (e) => { if (e.key === "ArrowRight" || e.key === "ArrowLeft") { const n = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length]; n.focus(); setTab(n.dataset.tab); } });
    });
    const draw = () => {
      const s = q.value.trim().toLowerCase();
      if (tab === "news") {
        const base = N.filter((n) => (cat.value === "all" || n.category === cat.value) && (!s || [n.title, n.standfirst, n.category, (n.body || []).map((b) => b.p || "").join(" ")].join(" ").toLowerCase().includes(s)));
        const months = {}; base.forEach((n) => (months[monthKey(n.date)] = (months[monthKey(n.date)] || 0) + 1));
        if (month !== "all" && !months[month]) month = "all";
        set("#months", `<li><button type="button" data-m="all" aria-pressed="${month === "all"}">All months <span class="n">${base.length}</span></button></li>` + Object.keys(months).sort().reverse().map((k) => `<li><button type="button" data-m="${k}" aria-pressed="${k === month}">${monthLabel(k)} <span class="n">${months[k]}</span></button></li>`).join(""));
        const list = base.filter((n) => month === "all" || monthKey(n.date) === month);
        set("#nCount", `<span><strong>${list.length}</strong> of ${N.length} stories${month !== "all" ? ` in ${monthLabel(month)}` : ""}</span>${s || cat.value !== "all" || month !== "all" ? '<button type="button" class="chip" id="nClear">Clear filters</button>' : ""}`);
        set("#newsItems", list.map((n) => `<li><a class="news-item${n.image ? "" : " no-thumb"}" href="story.html?id=${n.id}"><span><h2 class="serif">${esc(n.title)}</h2><span class="meta-line after"><time datetime="${n.date}">${fmtDate(n.date)}</time><span class="cat">${esc(n.category)}</span>${n.place ? `<span>${esc(n.place)}</span>` : ""}</span><p>${esc(n.standfirst || "")}</p></span>${n.image ? `<span class="thumb">${newsImg(n, { sizes: "200px" })}</span>` : ""}</a></li>`).join(""));
        $("#nEmpty").hidden = list.length > 0;
      } else {
        const match = (e) => !s || [e.title, e.standfirst, e.kind, e.host].join(" ").toLowerCase().includes(s);
        const months = {}; (I.events || []).filter(match).forEach((e) => (months[monthKey(e.start)] = (months[monthKey(e.start)] || 0) + 1));
        if (month !== "all" && !months[month]) month = "all";
        set("#months", `<li><button type="button" data-m="all" aria-pressed="${month === "all"}">All dates <span class="n">${(I.events || []).filter(match).length}</span></button></li>` + Object.keys(months).sort().map((k) => `<li><button type="button" data-m="${k}" aria-pressed="${k === month}">${monthLabel(k)} <span class="n">${months[k]}</span></button></li>`).join(""));
        const inM = (e) => month === "all" || monthKey(e.start) === month;
        const up = upcoming().filter(match).filter(inM), pa = past().filter(match).filter(inM);
        set("#nCount", `<span><strong>${up.length}</strong> upcoming${pa.length ? ` · ${pa.length} past` : ""}</span>${s || month !== "all" ? '<button type="button" class="chip" id="nClear">Clear filters</button>' : ""}`);
        set("#evUpcoming", up.map(eventRow).join(""));
        set("#evPast", pa.map(eventRow).join(""));
        $("#evPastWrap").hidden = !pa.length;
        $("#nEmpty").hidden = up.length + pa.length > 0;
      }
      $$("#months [data-m]").forEach((b) => b.addEventListener("click", () => { month = b.dataset.m; draw(); }));
      const c = $("#nClear"); if (c) c.addEventListener("click", () => { q.value = ""; cat.value = "all"; month = "all"; draw(); q.focus(); });
      syncURL({ q: q.value.trim(), cat: tab === "news" ? cat.value : "all", month });
    };
    q.addEventListener("input", draw); cat.addEventListener("change", draw);
    setTab(tab);
    if (params.get("month")) { month = params.get("month"); draw(); }
    set("#newsSources", sourcesBlock(["news", "events", "media"]) + `<p class="small" style="margin-top:12px">Events move to “past” automatically from the visitor’s date. Add <code>?today=2026-12-20</code> to preview.</p>`);
  };

  pages.story = function () {
    const { esc, params, fmtDate, fmtRange, newsImg } = U();
    const ev = params.get("event");
    const item = ev ? byId(I.events, ev) : byId(I.news, params.get("id"));
    if (!item) { set("#sTitle", "Story not found"); set("#sBody", `<p>Return to <a class="inline-link" href="news.html">News & events</a>.</p>`); return; }
    title(item.title);
    set("#crumbSection", ev ? `<a href="news.html#events">Events</a>` : `<a href="news.html">News</a>`);
    set("#sTitle", esc(item.title));
    set("#sStand", esc(item.standfirst || ""));
    set("#sMeta", ev ? `<span class="cat">${esc(item.kind)}</span><span>${esc(fmtRange(item.start, item.end))}</span>${item.time ? `<span>${esc(item.time)}</span>` : ""}<span>IIM Bangalore campus</span>`
      : `<span class="cat">${esc(item.category)}</span><time datetime="${item.date}">${fmtDate(item.date)}</time>${item.place ? `<span>${esc(item.place)}</span>` : ""}`);
    set("#sFig", !ev && item.image ? `<figure class="story-figure"><div class="pergola">${newsImg(item, { sizes: "(max-width: 1200px) 100vw, 1200px" })}</div><figcaption>Photograph: IIM Bangalore · <a href="${esc(item.image.source)}" rel="noopener">source file</a></figcaption></figure>` : "");
    set("#sBody", (item.body || []).map((b) => (b.h ? `<h2 class="serif">${esc(b.h)}</h2>` : `<p>${esc(b.p)}</p>`)).join(""));
    set("#sAside", `<dl>
      ${ev ? `<div><dt>When</dt><dd>${esc(fmtRange(item.start, item.end))}${item.time ? `<br>${esc(item.time)}` : ""}</dd></div><div><dt>Host</dt><dd>${esc(item.host)}</dd></div>${item.announced ? `<div><dt>Announced</dt><dd>${fmtDate(item.announced)}</dd></div>` : ""}`
        : `<div><dt>Published</dt><dd>${fmtDate(item.date)}</dd></div><div><dt>Category</dt><dd><a class="cat-link" href="news.html?cat=${encodeURIComponent(item.category)}">${esc(item.category)}</a></dd></div>`}
      <div><dt>Original</dt><dd><a class="inline-link ext" href="${esc(item.source)}" rel="noopener">Read on iimb.ac.in</a></dd></div></dl>`);
    const people = I.faculty.filter((f) => (item.title + " " + (item.body || []).map((b) => b.p || "").join(" ")).includes(f.name)).slice(0, 6);
    set("#sPeople", people.length ? `<h2 class="t-4" style="margin:40px 0 12px">IIMB people in this story</h2><div class="people" style="grid-template-columns:1fr">${people.map((p) => personLink(p.id)).join("")}</div>` : "");
    const more = ev ? upcoming().filter((e) => e.id !== item.id).slice(0, 4).map(eventRow).join("") : I.news.filter((n) => n.id !== item.id && n.category === item.category).slice(0, 4).map(storyRow).join("");
    set("#sMore", more ? `<h2 class="t-3" style="margin-bottom:20px">${ev ? "Other upcoming events" : `More in ${esc(item.category)}`}</h2><ul class="${ev ? "event-list" : "story-list"}">${more}</ul>` : "");
    set("#sNote", `<p class="src">Text reproduced from the official IIMB ${ev ? "announcement" : "news release"} for this concept, unedited apart from link removal. <a class="ext" href="${esc(item.source)}" rel="noopener">Original</a>.</p>`);
  };

  /* ================================================================ INDUSTRY */
  pages.industry = function () {
    const { esc, $, ICON } = U();
    const D = I.industry;
    set("#routes", D.routes.map((r) => { const ch = fac(r.chairId); const ext = /^https?:/.test(r.u);
      return `<li class="route-row" id="${r.id}"><h3>${esc(r.k)}</h3><div><p>${esc(r.d)}</p>${r.detail ? `<table class="mini-table"><tbody>${r.detail.map(([a, b]) => `<tr><td>${esc(a)}</td><td>${esc(b)}</td></tr>`).join("")}</tbody></table><p class="src" style="margin-top:6px">PGP & PGPBA placement calendar 2026–27 — ${U().srcLink("recruiters", "For Recruiters")}</p>` : ""}${ch ? `<p class="small muted" style="margin-top:10px">Led by <a class="inline-link" href="person.html?id=${ch.id}">${esc(ch.name)}</a></p>` : ""}</div>
        <div class="act"><a class="link${ext ? " ext" : ""}" href="${esc(r.u)}"${ext ? ' rel="noopener"' : ""}>${ext ? "Official page" : "Browse centres"} ${ext ? "" : ICON.arrow}</a>${r.contact ? (r.contact.includes("@") ? `<a class="inline-link small" href="mailto:${esc(r.contact)}">${esc(r.contact)}</a>` : `<span class="small muted">${esc(r.contact)}</span>`) : ""}</div></li>`; }).join(""));
    set("#partners", D.partners.map((p) => `<li>${esc(p)}</li>`).join(""));
    const rel = I.news.filter((n) => n.category === "Partnerships").slice(0, 5);
    set("#partnerNews", rel.map(storyRow).join(""));
    /* enquiry: composes an email to the right office; nothing is sent from this page */
    const form = $("#enquiry");
    const routeTo = { recruit: "cds@iimb.ac.in", exec: "communications@iimb.ac.in", research: "info@iimb.ac.in", ventures: "nsrcel@iimb.ac.in", cases: "info@iimb.ac.in", give: "dean.ard@iimb.ac.in", other: "info@iimb.ac.in" };
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let ok = true;
      ["eName", "eOrg", "eMsg"].forEach((id) => { const el = $("#" + id); const bad = !el.value.trim(); el.setAttribute("aria-invalid", String(bad)); if (bad) ok = false; });
      const err = $("#eErr");
      if (!ok) { err.textContent = "Add your name, organisation and a short message, then try again."; $("[aria-invalid=true]").focus(); return; }
      err.textContent = "";
      const t = $("#eType").value, to = routeTo[t] || "info@iimb.ac.in";
      const subject = `Partnership enquiry (${$("#eType").selectedOptions[0].text}) — ${$("#eOrg").value.trim()}`;
      const body = `${$("#eMsg").value.trim()}\n\n— ${$("#eName").value.trim()}, ${$("#eOrg").value.trim()}`;
      $("#eDone").innerHTML = `Your email app should open with a draft to <strong>${esc(to)}</strong>. If it doesn’t, write to that address directly.`;
      location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
    set("#indSources", sourcesBlock(["recruiters", "eep", "about", "contact", "ftCases"]));
  };

  /* ================================================================ SEARCH */
  pages.search = function () {
    const { params, $, search, renderResults } = U();
    const input = $("#pageQ"); input.value = params.get("q") || "";
    const draw = () => { const q = input.value; set("#pageResults", q.trim() ? renderResults(q, search(q, 0), false) : `<p class="muted">Type a name, programme, topic or month.</p>`); syncURL({ q: q.trim() }); };
    input.addEventListener("input", draw); draw();
  };

  /* ================================================================ CREDITS */
  pages.credits = function () {
    const { esc } = U();
    set("#photoCredits", Object.entries(I.photos).map(([k, p]) => `<tr><td>${esc(p.caption)}</td><td>${esc(p.credit)}</td><td><a class="inline-link ext" href="${esc(p.source)}" rel="noopener">Source</a></td></tr>`).join(""));
    set("#newsCredits", `${I.news.filter((n) => n.image).length} news photographs are taken from their IIM Bangalore news releases; each story page links its source file.`);
    set("#allSources", Object.values(I.sources).map((s) => `<li><a class="inline-link ext" href="${esc(s.u)}" rel="noopener">${esc(s.t)}</a></li>`).join(""));
  };
})();
