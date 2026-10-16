/* Shared chrome, helpers, motion and site search. No dependencies. */
(function () {
  "use strict";
  const I = (window.IIMB = window.IIMB || {});
  const doc = document;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------------------------------------------------------------- helpers */
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const $ = (sel, root = doc) => root.querySelector(sel);
  const $$ = (sel, root = doc) => Array.from(root.querySelectorAll(sel));
  const params = new URLSearchParams(location.search);
  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const parseISO = (iso) => { if (!iso) return null; const [y, m, d] = iso.split("-").map(Number); return new Date(y, m - 1, d || 1); };
  const fmtDate = (iso, short) => { const d = parseISO(iso); if (!d) return ""; const m = MONTHS[d.getMonth()]; return `${d.getDate()} ${short ? m.slice(0, 3) : m} ${d.getFullYear()}`; };
  const fmtRange = (a, b) => {
    if (!b || a === b) return fmtDate(a);
    const A = parseISO(a), B = parseISO(b);
    if (A.getMonth() === B.getMonth() && A.getFullYear() === B.getFullYear()) return `${A.getDate()}–${B.getDate()} ${MONTHS[A.getMonth()]} ${A.getFullYear()}`;
    return `${fmtDate(a)} – ${fmtDate(b)}`;
  };
  const today = (() => { const t = params.get("today"); const d = t ? parseISO(t) : new Date(); d.setHours(0, 0, 0, 0); return d; })();
  const initials = (n) => n.replace(/^(Dr\.?|Prof\.?|Professor)\s+/i, "").split(/\s+/).filter((w) => /^[A-Za-z]/.test(w)).map((w) => w[0]).filter((c, i, a) => i === 0 || i === a.length - 1).join("").toUpperCase();
  const src = (key) => (I.sources && I.sources[key]) || null;
  const srcLink = (key, label) => { const s = src(key); return s ? `<a href="${esc(s.u)}" rel="noopener" class="ext">${esc(label || s.t)}</a>` : ""; };
  const ICON = {
    arrow: '<svg class="arr" viewBox="0 0 16 16" aria-hidden="true"><path d="M1 8h13M9 3l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>',
    search: '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="m13 13 5.5 5.5" stroke="currentColor" stroke-width="1.5"/></svg>',
    menu: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M2 6h16M2 14h16" stroke="currentColor" stroke-width="1.5"/></svg>',
    close: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m4 4 12 12M16 4 4 16" stroke="currentColor" stroke-width="1.5"/></svg>',
    play: '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 1v10l9-5z" fill="currentColor"/></svg>',
    pause: '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 1h3v10H2zM7 1h3v10H7z" fill="currentColor"/></svg>',
    chev: '<svg class="arr" viewBox="0 0 16 16" aria-hidden="true"><path d="m6 3 5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>'
  };

  /* Responsive photograph with the pergola reveal. */
  function photo(slug, o = {}) {
    const p = I.photos && I.photos[slug];
    if (!p) return `<div class="pergola ${o.cls || ""}" role="img" aria-label="Photograph unavailable"></div>`;
    const ws = Object.keys(p.src).map(Number).sort((a, b) => a - b);
    const srcset = ws.map((w) => `${p.src[w]} ${w}w`).join(", ");
    const fallback = p.src[ws[Math.min(1, ws.length - 1)]];
    const img = `<img src="${fallback}" srcset="${srcset}" sizes="${o.sizes || "(max-width: 900px) 100vw, 50vw"}" alt="${esc(o.alt != null ? o.alt : p.alt)}" ${o.eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" width="${p.w}" height="${p.h}">`;
    const cap = o.caption === false ? "" : `<figcaption>${esc(o.caption || p.caption)} · <a href="${esc(p.source)}" rel="noopener">${esc(p.credit)}</a></figcaption>`;
    return `<figure class="${o.figCls || ""}"><div class="pergola ${o.cls || ""}" ${o.style ? `style="${o.style}"` : ""}>${img}</div>${cap}</figure>`;
  }
  function newsImg(n, o = {}) {
    if (!n.image) return "";
    const ws = Object.keys(n.image.src).map(Number).sort((a, b) => a - b);
    return `<img src="${n.image.src[ws[0]]}" srcset="${ws.map((w) => `${n.image.src[w]} ${w}w`).join(", ")}" sizes="${o.sizes || "(max-width: 900px) 100vw, 40vw"}" alt="${esc(o.alt || "")}" loading="lazy" decoding="async">`;
  }

  /* ---------------------------------------------------------------- chrome */
  const NAV = [
    ["about", "about.html", "About"], ["programmes", "programmes.html", "Programmes"], ["research", "research.html", "Research"],
    ["faculty", "faculty.html", "Faculty"], ["centres", "centres.html", "Centres"], ["campus", "campus.html", "Campus life"],
    ["news", "news.html", "News & events"], ["industry", "industry.html", "Industry"]
  ];
  const section = doc.body.dataset.section || doc.body.dataset.page;

  function chrome() {
    const top = `
<a class="skip" href="#main">Skip to content</a>
<div class="notice-bar"><div class="wrap"><span>Concept website — not the official IIM Bangalore site. Facts checked against iimb.ac.in on ${esc(I.checked || "16 October 2026")}.</span><a href="https://www.iimb.ac.in/" rel="noopener" class="ext">iimb.ac.in</a></div></div>
<header class="site-header" id="top">
  <div class="wrap">
    <a class="brand" href="index.html" aria-label="IIM Bangalore — home"><img src="assets/brand/iimb-logo-720.png" alt="Indian Institute of Management Bangalore" width="720" height="119"></a>
    <nav class="nav" id="nav" aria-label="Main">
      ${NAV.map(([k, h, t]) => `<a href="${h}"${k === section ? ' aria-current="page"' : ""}>${t}</a>`).join("")}
    </nav>
    <div class="header-tools">
      <button class="icon-btn" type="button" id="searchOpen" aria-label="Search the site" aria-haspopup="dialog">${ICON.search}</button>
      <button class="icon-btn menu-btn" type="button" id="menuBtn" aria-label="Open menu" aria-expanded="false" aria-controls="nav">${ICON.menu}</button>
    </div>
  </div>
</header>
<div class="search-sheet" id="searchSheet" role="dialog" aria-modal="true" aria-label="Site search">
  <div class="search-panel"><div class="wrap">
    <form class="search-row" id="searchForm" role="search" action="search.html">
      <label class="sr-only" for="q">Search programmes, faculty, research, centres and news</label>
      <input id="q" name="q" type="search" autocomplete="off" placeholder="Search faculty, programmes, research…">
      <button class="icon-btn" type="button" id="searchClose" aria-label="Close search">${ICON.close}</button>
    </form>
    <div class="search-hints" id="searchHints">
      ${["Doshi", "PGP fee", "digital public goods", "inflation", "NSRCEL", "Public Policy", "December"].map((h) => `<button type="button" class="chip" data-hint="${esc(h)}">${esc(h)}</button>`).join("")}
    </div>
    <div class="results" id="searchResults" aria-live="polite"></div>
  </div></div>
</div>`;
    doc.body.insertAdjacentHTML("afterbegin", top);
    const footer = `
<footer class="site-footer on-night">
  <div class="wrap">
    <div class="top">
      <div>
        <img class="logo" src="assets/brand/iimb-logo-reversed.png" alt="Indian Institute of Management Bangalore" width="724" height="120" loading="lazy">
        <address>Bannerghatta Road, Bengaluru 560 076, India<br>+91 80 2699 3000 · <a href="mailto:info@iimb.ac.in">info@iimb.ac.in</a></address>
      </div>
      <div><h2>Institution</h2><ul>
        <li><a href="about.html">About IIMB</a></li><li><a href="about.html#architecture">Architecture</a></li><li><a href="about.html#leadership">Leadership & governance</a></li><li><a href="campus.html">Campus life</a></li></ul></div>
      <div><h2>Study & research</h2><ul>
        <li><a href="programmes.html">Programmes</a></li><li><a href="research.html">Research</a></li><li><a href="faculty.html">Faculty directory</a></li><li><a href="centres.html">Centres</a></li></ul></div>
      <div><h2>Engage</h2><ul>
        <li><a href="news.html">News & events</a></li><li><a href="industry.html">Industry partnerships</a></li><li><a href="credits.html">Sources & image credits</a></li><li><a href="https://www.iimb.ac.in/" rel="noopener" class="ext">Official website</a></li></ul></div>
    </div>
    <div class="bottom">
      <span class="motto-line"><span class="dev" lang="sa">तेजस्वि नावधीतमस्तु</span> — Let our study be enlightening</span>
      <span>A concept redesign: The Architectural Institution. Not affiliated with or endorsed by IIM Bangalore. Content © IIM Bangalore, used with attribution.</span>
    </div>
  </div>
</footer>`;
    doc.body.insertAdjacentHTML("beforeend", footer);

    /* header shadow once the page moves */
    const header = $(".site-header");
    const onScroll = () => header.classList.toggle("scrolled", scrollY > 8);
    addEventListener("scroll", onScroll, { passive: true }); onScroll();

    /* mobile menu */
    const nav = $("#nav"), mb = $("#menuBtn");
    mb.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      mb.setAttribute("aria-expanded", String(open));
      mb.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      mb.innerHTML = open ? ICON.close : ICON.menu;
    });
    doc.addEventListener("keydown", (e) => { if (e.key === "Escape" && nav.classList.contains("open")) mb.click(); });
  }

  /* ---------------------------------------------------------------- search */
  const PAGES = [
    { t: "About IIMB", u: "about.html", k: "doshi timeline archives indira gandhi 1973 1972 board about history motto vision mission accreditation equis act 2017 institute of national importance" },
    { t: "Architecture — B. V. Doshi’s campus", u: "about.html#architecture", k: "architecture doshi fatehpur sikri stone corridors courtyards pergola light 1983 campus design" },
    { t: "Leadership & governance", u: "about.html#leadership", k: "board governors chairperson director dean governance devi prasad shetty dinesh kumar advisory committee act rules rti" },
    { t: "Campus life", u: "campus.html", k: "doshi photographs films tour pergola library amphitheatre campus life students clubs sport library auditorium music accommodation cafeteria sustainability trees festival unmaad" },
    { t: "Industry partnerships", u: "industry.html", k: "industry partnership recruit placements executive education research collaboration nsrcel giving enquiry" },
    { t: "Sources & image credits", u: "credits.html", k: "sources credits photographs licence attribution" }
  ];
  let INDEX = null;
  function buildIndex() {
    if (INDEX) return INDEX;
    const items = [];
    PAGES.forEach((p) => items.push({ type: "Pages", t: p.t, u: p.u, hay: (p.t + " " + p.k).toLowerCase(), meta: "Section" }));
    (I.programmes || []).forEach((p) => items.push({ type: "Programmes", t: p.name, u: `programme.html?id=${p.id}`, meta: `${p.degree} · ${p.duration}`,
      hay: [p.name, p.short, p.degree, p.level, p.format, p.duration, p.summary, p.eligibility, p.fee ? "fee fees tuition cost " + p.fee : "", p.aid ? "financial aid scholarship " + p.aid : "", (p.curriculum || []).join(" "), (p.admissions || []).join(" ")].join(" ").toLowerCase() }));
    (I.faculty || []).forEach((f) => items.push({ type: "Faculty", t: f.name, u: `person.html?id=${f.id}`, meta: [f.title, f.areas.join(", ")].filter(Boolean).join(" · "),
      hay: [f.name, f.title, f.areas.join(" "), (f.roles || []).join(" "), f.summary || ""].join(" ").toLowerCase() }));
    (I.centres || []).forEach((c) => items.push({ type: "Centres", t: c.name, u: `centre.html?id=${c.id}`, meta: `${c.abbr} · ${c.areas.join(", ")}`,
      hay: [c.name, c.abbr, c.about, c.areas.join(" ")].join(" ").toLowerCase() }));
    (I.events || []).forEach((e) => items.push({ type: "Events", t: e.title, u: `story.html?event=${e.id}`, meta: `${fmtRange(e.start, e.end)} · ${e.kind}`,
      hay: [e.title, e.standfirst, e.kind, e.host, fmtRange(e.start, e.end)].join(" ").toLowerCase() }));
    (I.news || []).forEach((n) => items.push({ type: "News", t: n.title, u: `story.html?id=${n.id}`, meta: `${fmtDate(n.date)} · ${n.category}`,
      hay: [n.title, n.standfirst, n.category, fmtDate(n.date), (n.body || []).map((b) => b.p || b.h || "").join(" ")].join(" ").toLowerCase() }));
    (I.films || []).forEach((f) => items.push({ type: "Films", t: f.t, u: `https://www.youtube.com/watch?v=${f.id}`, ext: true, meta: f.note, hay: [f.t, f.note, "film video youtube"].join(" ").toLowerCase() }));
    Object.values(I.photos || {}).forEach((p) => items.push({ type: "Photographs", t: p.caption, u: "credits.html", meta: p.credit, hay: [p.caption, p.alt, p.credit, "photograph photo"].join(" ").toLowerCase() }));
    const P = I.publications || {};
    (P.workingPapers || []).forEach((w) => items.push({ type: "Research", t: w.title, u: w.url, ext: true, meta: `Working Paper No. ${w.no} · ${w.authors} · ${w.year}`,
      hay: [w.title, w.authors, w.year, "working paper"].join(" ").toLowerCase() }));
    (P.journalArticles || []).forEach((j) => items.push({ type: "Research", t: j.title, u: j.url, ext: true, meta: `Journal article · ${j.by}`, hay: [j.title, j.by, "journal article"].join(" ").toLowerCase() }));
    return (INDEX = items);
  }
  function search(q, limitPer = 6) {
    const terms = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    const scored = [];
    buildIndex().forEach((it) => {
      if (!terms.every((t) => it.hay.includes(t))) return;
      const tl = it.t.toLowerCase();
      let s = terms.reduce((a, t) => a + (tl.includes(t) ? 6 : 1) + (tl.startsWith(t) ? 3 : 0), 0);
      if (tl === q.toLowerCase()) s += 20;
      scored.push({ it, s });
    });
    scored.sort((a, b) => b.s - a.s);
    const groups = {};
    scored.forEach(({ it }) => { (groups[it.type] = groups[it.type] || []).push(it); });
    const order = ["Pages", "Programmes", "Faculty", "Centres", "Films", "Events", "News", "Research", "Photographs"];
    return order.filter((k) => groups[k]).map((k) => ({ type: k, total: groups[k].length, items: limitPer ? groups[k].slice(0, limitPer) : groups[k] }));
  }
  function mark(text, q) {
    let out = esc(text);
    q.toLowerCase().split(/\s+/).filter((t) => t.length > 1).forEach((t) => {
      out = out.replace(new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig"), "<mark>$1</mark>");
    });
    return out;
  }
  function renderResults(q, groups, limited) {
    if (!q.trim()) return "";
    if (!groups.length) return `<div class="empty-state"><p class="t-3">Nothing matches “${esc(q)}”.</p><p>Try a broader word: a surname, a programme such as “PGP”, a topic such as “policy”, or a month such as “December”.</p></div>`;
    return groups.map((g) => `
      <h2 class="label">${g.type} <span class="muted">· ${g.total}</span></h2>
      ${g.items.map((it) => `<a class="result" href="${esc(it.u)}"${it.ext ? ' rel="noopener"' : ""}><span class="label">${g.type === "Research" ? "Paper" : g.type === "Photographs" ? "Photo" : g.type.replace(/s$/, "")}</span><span class="r-title${it.ext ? " ext" : ""}">${mark(it.t, q)}</span><span class="r-meta">${esc(it.meta || "")}</span></a>`).join("")}
      ${limited && g.total > g.items.length ? `<p class="small" style="margin:10px 0 0"><a class="inline-link" href="search.html?q=${encodeURIComponent(q)}">All ${g.total} ${g.type.toLowerCase()} results</a></p>` : ""}`).join("");
  }
  function searchUI() {
    const sheet = $("#searchSheet"), input = $("#q"), out = $("#searchResults"), openBtn = $("#searchOpen");
    let last = null;
    const open = () => { last = doc.activeElement; sheet.classList.add("open"); doc.body.style.overflow = "hidden"; setTimeout(() => input.focus(), 30); };
    const close = () => { sheet.classList.remove("open"); doc.body.style.overflow = ""; (last || openBtn).focus(); };
    openBtn.addEventListener("click", open);
    $("#searchClose").addEventListener("click", close);
    sheet.addEventListener("click", (e) => { if (e.target === sheet) close(); });
    doc.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && sheet.classList.contains("open")) close();
      if (e.key === "/" && !/input|textarea|select/i.test(doc.activeElement.tagName) && !sheet.classList.contains("open")) { e.preventDefault(); open(); }
      if (e.key === "Tab" && sheet.classList.contains("open")) {
        const f = $$("input, button, a[href]", sheet).filter((el) => el.offsetParent !== null);
        if (e.shiftKey && doc.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && doc.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    });
    let t;
    input.addEventListener("input", () => { clearTimeout(t); t = setTimeout(() => { out.innerHTML = renderResults(input.value, search(input.value, 4), true); }, 90); });
    $$("#searchHints [data-hint]").forEach((b) => b.addEventListener("click", () => { input.value = b.dataset.hint; input.dispatchEvent(new Event("input")); input.focus(); }));
  }

  /* ---------------------------------------------------------------- motion */
  function pergolaReveal(root = doc) {
    const els = $$(".pergola", root).filter((el) => !el.dataset.seen);
    els.forEach((el) => (el.dataset.seen = "1"));
    if (reduce.matches || !("IntersectionObserver" in window) || !CSS.supports("mask-composite", "intersect") && !CSS.supports("-webkit-mask-composite", "source-in")) {
      els.forEach((el) => el.classList.add("done")); return;
    }
    doc.documentElement.classList.add("js-motion");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target; io.unobserve(el);
        el.classList.add("lit");
        const child = el.firstElementChild;
        const finish = () => { el.classList.remove("pending", "lit"); el.classList.add("done"); };
        if (child) child.addEventListener("animationend", (e) => { if (e.animationName === "settle") finish(); });
        setTimeout(finish, 2000);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < innerHeight * 0.9 && r.bottom > 0 && !el.closest("[data-reveal-anyway]")) { el.classList.add("done"); return; } // already on screen: never hide content
      el.classList.add("pending"); io.observe(el);
    });
  }

  /* Ambient video: muted, looped, paused off-screen or when the tab is hidden; user control wins. */
  function ambientVideo(video, button) {
    if (!video) return;
    let userPaused = reduce.matches || (navigator.connection && navigator.connection.saveData);
    const setBtn = () => {
      if (!button) return;
      const playing = !video.paused;
      button.setAttribute("aria-pressed", String(!playing));
      button.innerHTML = `${playing ? ICON.pause : ICON.play}<span>${playing ? "Pause film" : "Play film"}</span>`;
    };
    const tryPlay = () => { if (userPaused) return; const p = video.play(); if (p && p.catch) p.catch(() => { userPaused = true; setBtn(); }); };
    video.muted = true; video.playsInline = true;
    if (userPaused) video.removeAttribute("autoplay");
    const io = new IntersectionObserver(([en]) => { if (en.isIntersecting && en.intersectionRatio > 0.25) tryPlay(); else video.pause(); }, { threshold: [0, 0.25, 0.5] });
    io.observe(video);
    doc.addEventListener("visibilitychange", () => { if (doc.hidden) video.pause(); else { const r = video.getBoundingClientRect(); if (r.bottom > 0 && r.top < innerHeight) tryPlay(); } });
    video.addEventListener("play", setBtn); video.addEventListener("pause", setBtn);
    video.addEventListener("error", () => { if (button) button.hidden = true; }, true);
    if (button) button.addEventListener("click", () => { if (video.paused) { userPaused = false; tryPlay(); } else { userPaused = true; video.pause(); } });
    setBtn();
  }

  /* Click-to-load YouTube: no third-party request until the visitor asks. */
  function ytEmbed(holder, id, title) {
    holder.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0" title="${esc(title)}" allow="accelerometer; autoplay; encrypted-media; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
  }
  function ytPoster(id, title, note) {
    return `<button class="film-poster" type="button" data-yt="${esc(id)}" data-title="${esc(title)}" aria-label="Play film: ${esc(title)} (loads YouTube)">
      <img src="https://i.ytimg.com/vi/${esc(id)}/hqdefault.jpg" alt="" loading="lazy" onerror="this.style.display='none'">
      <span class="play"><span class="disc">${ICON.play}</span><span><span class="ft">${esc(title)}</span><br><span class="small" style="opacity:.8">${esc(note || "Official IIM Bangalore film · plays from YouTube")}</span></span></span>
    </button>`;
  }
  function bindPosters(root = doc) {
    $$("[data-yt]", root).forEach((b) => b.addEventListener("click", () => ytEmbed(b.parentElement, b.dataset.yt, b.dataset.title)));
  }

  /* expose */
  Object.assign(I, { util: { esc, $, $$, params, fmtDate, fmtRange, parseISO, today, initials, photo, newsImg, src, srcLink, ICON, search, renderResults, pergolaReveal, ambientVideo, ytPoster, ytEmbed, bindPosters, MONTHS } });

  function boot() {
    chrome(); searchUI();
    const page = doc.body.dataset.page;
    try { if (I.pages && I.pages[page]) I.pages[page](); }
    catch (err) {
      console.error(err);
      const m = $("#main"); if (m) m.insertAdjacentHTML("afterbegin", `<div class="wrap" style="padding:24px 0"><p class="placeholder">Part of this page could not be built (${esc(err.message)}). The official site has this content: <a href="https://www.iimb.ac.in/">iimb.ac.in</a></p></div>`);
    }
    pergolaReveal();
  }
  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", boot); else boot();
})();
