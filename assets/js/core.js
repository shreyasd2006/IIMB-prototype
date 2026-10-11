/* Open Corridor: shared chrome, helpers and components. No dependencies. */
(function () {
  "use strict";
  const D = window.IIMB;
  const html = document.documentElement;
  const ROOT = html.dataset.root || "";
  const LANG = html.lang === "hi" ? "hi" : "en";
  html.classList.add("js");
  /* the homepage's focal entrance plays once per session */
  try { if (!sessionStorage.getItem("iimb-intro")) { html.classList.add("intro"); sessionStorage.setItem("iimb-intro", "1"); } } catch (e) { html.classList.add("intro"); }

  /* ---------- helpers ---------- */
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const R = (p) => (/^(https?:|mailto:|tel:|#)/.test(p) ? p : ROOT + p);
  const isExt = (u) => /^https?:/.test(u || "");
  const params = new URLSearchParams(location.search);
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const MONTHS_HI = ["जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"];
  const parse = (iso) => { const [y, m, d] = iso.split("-").map(Number); return { y, m, d }; };
  const fmtDate = (iso, opts = {}) => {
    if (!iso) return "";
    const { y, m, d } = parse(iso);
    const mon = (LANG === "hi" ? MONTHS_HI : MONTHS)[m - 1];
    if (!d) return `${mon} ${y}`;
    return opts.noYear ? `${d} ${mon}` : `${d} ${mon} ${y}`;
  };
  const fmtRange = (a, b) => {
    if (!b || a === b) return fmtDate(a);
    const A = parse(a), B = parse(b);
    if (A.y === B.y && A.m === B.m) return `${A.d}–${B.d} ${MONTHS[A.m - 1]} ${A.y}`;
    if (A.y === B.y) return `${fmtDate(a, { noYear: true })} – ${fmtDate(b)}`;
    return `${fmtDate(a)} – ${fmtDate(b)}`;
  };
  /* "Now" is the visitor's real date. ?today=YYYY-MM-DD lets a demo show events moving to the past. */
  const todayISO = (() => {
    const o = params.get("today");
    if (o && /^\d{4}-\d{2}-\d{2}$/.test(o)) return o;
    const n = new Date();
    return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-${String(n.getDate()).padStart(2, "0")}`;
  })();
  const isPast = (ev) => (ev.end || ev.start || ev.date) < todayISO;
  const isLive = (ev) => ev.start <= todayISO && (ev.end || ev.start) >= todayISO;
  const person = (id) => D.people.find((p) => p.id === id);
  const personHref = (p) => (D.profiles && D.profiles[p.id] ? R(`person.html?id=${p.id}`) : p.url);

  const icon = {
    arrow: '<svg class="arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
    ext: '<svg class="ext" viewBox="0 0 12 12" aria-hidden="true"><path d="M4.5 2.5H2v7.5h7.5V7.5M6.5 1.5h4v4M10.5 1.5 5 7" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>',
    chev: '<svg viewBox="0 0 10 10" aria-hidden="true"><path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
    menu: '<svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true"><path d="M0 1h18M0 7h18M0 13h18" stroke="currentColor" stroke-width="1.6"/></svg>'
  };
  /* Links: external ones say so, to sighted and screen-reader users alike. */
  const link = (href, text, cls = "") => {
    const ext = isExt(href);
    return `<a href="${esc(R(href))}"${cls ? ` class="${cls}"` : ""}${ext ? ' rel="noopener"' : ""}>${text}${ext ? icon.ext + '<span class="visually-hidden"> (external site)</span>' : ""}</a>`;
  };

  /* ---------- facts register rendering ---------- */
  const source = (key) => (key && D.sources[key]) || null;
  const srcLine = (key, extra) => {
    const s = source(key);
    if (!s) return "";
    return `<span class="src">Source: ${link(s.url, esc(s.title))} · checked ${fmtDate(s.checked)}${extra ? " · " + esc(extra) : ""}</span>`;
  };
  const pending = (p) => {
    const label = p.label || "Value";
    const owner = p.owner ? `confirm with ${p.owner}` : "to confirm";
    return `<span class="pending" title="${esc(p.reason || "")}">[${esc(label)}: ${esc(owner)}]</span>`;
  };
  const factValue = (f) => (f.pending ? pending(f) : esc(f.value));

  /* ---------- small components ---------- */
  const beams = () => `<div class="beams" aria-hidden="true"><div class="wrap"><div class="bays">${"<i></i>".repeat(12)}</div></div></div>`;
  const threshold = (title, lede, id) =>
    `<div class="threshold"><div class="bays"><h2${id ? ` id="${id}"` : ""}>${title}</h2>${lede ? `<p class="lede">${lede}</p>` : ""}</div></div>`;
  const typeLabel = { story: "Story", news: "News", event: "Event", achievement: "Achievement", media: "In the media", idea: "Idea" };
  const minutes = (n) => (n ? `${n} min read` : "");

  const storyMeta = (s) => {
    const parts = [`<span class="type">${typeLabel[s.type] || s.type}</span>`];
    const date = s.type === "event" ? fmtRange(s.start, s.end) : s.dateDisplay || fmtDate(s.date);
    parts.push(`<time datetime="${esc(s.start || s.date)}">${date}</time>`);
    if (s.people && s.people.length && (s.type === "idea" || s.type === "media")) {
      const names = s.people.map(person).filter(Boolean).map((p) => "Prof. " + p.name);
      parts.push(`<span>${s.type === "idea" ? "Featuring " : ""}${esc(names.join(", "))}</span>`);
    }
    if (s.outlet) parts.push(`<span>${esc(s.outlet)}</span>`);
    if (s.minutes) parts.push(`<span>${minutes(s.minutes)}</span>`);
    return `<div class="meta">${parts.join('<span class="dot" aria-hidden="true"></span>')}</div>`;
  };
  const photo = (key, size = 1600, cls = "", loading = "lazy") => {
    const p = D.photos[key];
    if (!p) return "";
    return `<img src="${R(`assets/photos/${key}-800.jpg`)}" srcset="${R(`assets/photos/${key}-800.jpg`)} 800w, ${R(`assets/photos/${key}-1600.jpg`)} 1600w" sizes="(max-width: 900px) 100vw, ${size === 1600 ? "60vw" : "40vw"}" alt="${esc(p.alt)}" loading="${loading}" decoding="async"${cls ? ` class="${cls}"` : ""}>`;
  };
  const caption = (key) => {
    const p = D.photos[key];
    return p ? `<figcaption><b>${esc(p.place)}</b><span>Photo: ${esc(p.credit)}</span></figcaption>` : "";
  };

  const eventRow = (ev) => {
    const past = isPast(ev), live = isLive(ev);
    const { d, m, y } = parse(ev.start);
    const href = ev.url;
    const status = live ? '<span class="tag tag--live">Happening now</span>' : past ? '<span class="tag tag--past">Past event</span>' : "";
    return `<li class="event${past ? " is-past" : ""}">
      <time datetime="${ev.start}"><b>${d}</b><span>${MONTHS[m - 1]} ${y}</span></time>
      <div><h3>${link(href, esc(ev.title))}</h3>${ev.dek ? `<p class="small muted">${esc(ev.dek)}</p>` : ""}</div>
      <div class="side"><span>${esc(fmtRange(ev.start, ev.end))}</span><span>${esc(ev.mode || "")}</span>${status}</div>
    </li>`;
  };

  /* Single-series bar chart, with hover tooltip and a table view. */
  let chartN = 0;
  const barChart = ({ title, sub, rows, unit = "", total, max, srcKey }) => {
    const id = "c" + ++chartN;
    const top = max || Math.max(...rows.map((r) => r[1]));
    const sum = total || rows.reduce((a, r) => a + r[1], 0);
    const items = rows.map(([label, v], i) => {
      const pct = unit === "%" ? "" : ` (${Math.round((v / sum) * 100)}%)`;
      return `<li class="bar"><span class="bl">${esc(label)}</span><span class="track"><span class="fill" style="width:${(v / top) * 100}%;--i:${i}"></span><span class="bv">${v}${unit}</span></span>
        <span class="hit" tabindex="0" data-tip="${esc(label)}: ${v}${unit}${pct}" aria-label="${esc(label)}: ${v}${unit}${pct}"></span></li>`;
    }).join("");
    const table = `<table class="datatable"><thead><tr><th scope="col">Category</th><th scope="col" class="n">Value</th></tr></thead><tbody>${rows.map(([l, v]) => `<tr><td>${esc(l)}</td><td class="n">${v}${unit}</td></tr>`).join("")}</tbody></table>`;
    return `<figure class="chart" id="${id}"><div class="ct">${esc(title)}</div>${sub ? `<p class="cs">${esc(sub)}</p>` : ""}
      <ul class="bars">${items}</ul><span class="tip" hidden></span>
      <details class="tablev"><summary>View as table</summary>${table}</details>${srcKey ? srcLine(srcKey) : ""}</figure>`;
  };
  const chartIO = "IntersectionObserver" in window ? new IntersectionObserver((ents) => ents.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); chartIO.unobserve(e.target); } }), { rootMargin: "0px 0px -10% 0px" }) : null;
  function wireCharts(root = document) {
    root.querySelectorAll(".chart").forEach((ch) => {
      if (chartIO && !ch.dataset.wired) { ch.classList.add("will-grow"); chartIO.observe(ch); }
      if (ch.dataset.wired) return;
      ch.dataset.wired = "1";
      const tip = ch.querySelector(".tip");
      const show = (el) => {
        const r = el.getBoundingClientRect(), c = ch.getBoundingClientRect();
        const fill = el.parentElement.querySelector(".fill").getBoundingClientRect();
        tip.textContent = el.dataset.tip;
        tip.style.left = Math.min(Math.max(fill.right - c.left, 60), c.width - 60) + "px";
        tip.style.top = r.top - c.top + 4 + "px";
        tip.hidden = false;
      };
      ch.querySelectorAll(".hit").forEach((h) => {
        h.addEventListener("mouseenter", () => show(h));
        h.addEventListener("focus", () => show(h));
        h.addEventListener("mouseleave", () => (tip.hidden = true));
        h.addEventListener("blur", () => (tip.hidden = true));
      });
    });
  }

  /* ---------- navigation model (audit section 5) ---------- */
  const NAV = [
    { id: "programmes", label: "Programmes", href: "programmes.html",
      links: [["Find and compare programmes", "programmes.html"], ["MBA: PGP", "programme.html?id=pgp"], ["MBA (Business Analytics): PGPBA", "programme.html?id=pgpba"], ["One-year MBA: EPGP", "programme.html?id=epgp"], ["Weekend MBA: PGPEM", "programme.html?id=pgpem"], ["Public policy: PGPPM", "https://www.iimb.ac.in/programmes/pgppm"], ["Doctoral: PhD · NSR Pre-doc", "https://www.iimb.ac.in/programmes/doctoral-programme"], ["Undergraduate: BSc (Hons) · BBA DBE", "https://ug.iimb.ac.in/"], ["Admissions 2027: important dates", "programmes.html#dates"], ["Fees, aid and scholarships", "https://www.iimb.ac.in/programmes/pgp/financial-aid-scholarships"]],
      tasks: [["Find a programme", "programmes.html#finder"], ["Compare the four MBAs", "programmes.html#compare"], ["Important dates", "programmes.html#dates"]], feature: "ft-mim-2026" },
    { id: "execed", label: "Executive Education", href: "executive-education.html",
      links: [["Find an open programme", "executive-education.html#finder"], ["Programme calendar", "executive-education.html#schedule"], ["Programmes for organisations", "executive-education.html#custom"], ["Online learning: IIMBx", "https://iimbx.iimb.ac.in/"], ["Enquire", "executive-education.html#enquire"]],
      tasks: [["Next programmes", "executive-education.html#schedule"], ["Enquire about a programme", "executive-education.html#enquire"]], feature: "iimbx-fintech" },
    { id: "research", label: "Research & Ideas", href: "theme.html?id=dpi",
      links: [["Theme: digital public infrastructure", "theme.html?id=dpi"], ["Ideas: explainers by faculty", "idea.html?id=wp745"], ["Centre for Digital Public Goods", "centre.html?id=cdpg"], ["Centre for Public Policy", "centre.html?id=cpp"], ["Working papers", "https://www.iimb.ac.in/iimb-research/working-papers"], ["IIMB Management Review", "https://www.iimb.ac.in/imr/"], ["Seminars and conferences", "news.html?type=event"], ["Research ethics (IRB)", "https://www.iimb.ac.in/iimb-research/about-irb"]],
      tasks: [["Digital public infrastructure", "theme.html?id=dpi"], ["Latest explainer", "idea.html?id=wp745"]], feature: "wp745" },
    { id: "faculty", label: "Faculty & Experts", href: "faculty.html",
      links: [["Directory: search and filters", "faculty.html"], ["Find an expert (media)", "faculty.html?media=1"], ["Economics", "faculty.html?area=Economics"], ["Strategy", "faculty.html?area=Strategy"], ["All 11 academic areas", "faculty.html#filters"], ["Leadership and deans", "about.html#leadership"], ["Faculty positions", "https://www.iimb.ac.in/faculty-recruitments"]],
      tasks: [["Find an expert", "faculty.html?media=1"], ["Contact the media office", "faculty.html#media-office"]], feature: "media-gdp" },
    { id: "partner", label: "Partner with IIMB", href: "partner.html",
      links: [["Recruit our students", "partner.html#recruit"], ["Custom executive education", "partner.html#custom"], ["Sponsor research", "partner.html#research"], ["Incubate with NSRCEL", "partner.html#incubate"], ["Give", "partner.html#give"], ["International partnerships", "https://www.iimb.ac.in/internationalization"]],
      tasks: [["Placement calendar 2026–27", "partner.html#calendar"], ["Talk to Career Development Services", "mailto:cds@iimb.ac.in"]], feature: "moma-mous" },
    { id: "about", label: "About & Campus", href: "about.html",
      links: [["Who we are", "about.html"], ["Leadership and Board", "about.html#leadership"], ["History: a timeline of firsts", "about.html#history"], ["Campus and architecture", "about.html#campus"], ["Sustainability", "about.html#sustainability"], ["Contact and visit", "about.html#contact"], ["Institute information (RTI, reports, policies)", "institute-information.html"]],
      tasks: [["Institute information", "institute-information.html"], ["Visit the campus", "about.html#contact"]], feature: "elcita-2026" }
  ];
  const HI_PAGES = { "index.html": "hi/index.html", "programme.html": "hi/programme.html" };

  function header() {
    const page = html.dataset.page;
    const H = D.hi;
    const t = (en, hi) => (LANG === "hi" ? hi : en);
    const file = location.pathname.split("/").pop() || "index.html";
    let langHref;
    if (LANG === "hi") langHref = ROOT + (file === "programme.html" ? "programme.html" + location.search : "index.html");
    else langHref = HI_PAGES[file] ? R(HI_PAGES[file]) + location.search : R("hi/index.html?untranslated=" + encodeURIComponent(file + location.search));
    const navLabel = (n) => (LANG === "hi" ? H.nav[n.id] : n.label);
    const items = NAV.map((n) => {
      const feat = D.stream.find((s) => s.id === n.feature);
      const current = html.dataset.section === n.id ? ' aria-current="page"' : "";
      return `<li><button type="button" aria-expanded="false" aria-controls="panel-${n.id}"${current}>${esc(navLabel(n))}${icon.chev}</button>
        <div class="panel" id="panel-${n.id}" hidden><div class="wrap"><div class="bays">
          <div class="links"><h2 class="ph">${esc(n.label)}</h2>${n.links.map(([l, h]) => link(h, esc(l))).join("")}</div>
          <div class="tasks"><h2 class="ph">Do it now</h2>${n.tasks.map(([l, h]) => `<a href="${esc(R(h))}">${esc(l)}${icon.arrow}</a>`).join("")}</div>
          ${feat ? `<div class="feature"><h2 class="ph">Latest</h2><a href="${esc(R(feat.url))}" style="text-decoration:none"><h3>${esc(feat.title)}</h3>${storyMeta(feat)}</a></div>` : ""}
        </div></div></div></li>`;
    }).join("");
    return `<a class="skip" href="#main">${t("Skip to main content", H.skip)}</a>
      <div class="proto" role="note"><div class="wrap"><span>${t("Prototype, not the official IIMB website. Facts were checked against public IIMB pages on 10–11 Oct 2026.", H.prototype)}</span><a href="${R("prototype.html")}">${t("About this prototype", H.prototypeMore)}</a></div></div>
      <div class="utility"><div class="wrap"><nav aria-label="${t("Utility", "उपयोगी लिंक")}"><ul>
        <li><a class="apply" href="${R("programmes.html#dates")}">${t("Apply · Admissions 2027", H.util.apply)}</a></li>
        <li><a href="${R("news.html")}">${t("News & events", H.util.news)}</a></li>
        <li class="opt"><a href="https://iimbaa.com/" rel="noopener">${t("Alumni", H.util.alumni)}<span class="visually-hidden"> (external site)</span></a></li>
        <li class="opt"><a href="${R("partner.html#give")}">${t("Give", H.util.give)}</a></li>
        <li><a href="${R("search.html")}">${t("Search", H.util.search)}</a></li>
        <li><a href="${esc(langHref)}" lang="${LANG === "hi" ? "en" : "hi"}" hreflang="${LANG === "hi" ? "en" : "hi"}">${LANG === "hi" ? "English" : "हिन्दी"}</a></li>
        <li class="opt"><a href="https://campus.iimb.ac.in/" rel="noopener">${t("Login", H.util.login)}<span class="visually-hidden"> (students and staff, external)</span></a></li>
      </ul></nav></div></div>
      <div class="wrap masthead">
        <a class="lockup" href="${R(LANG === "hi" ? "hi/index.html" : "index.html")}" title="${t("Home", "मुखपृष्ठ")}">
          <img src="${R("assets/brand/iimb-logo-reversed.png")}" width="724" height="120" alt="${t("Indian Institute of Management Bangalore", H.instituteName)}">
        </a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">${icon.menu}<span>${t("Menu", "मेनू")}</span></button>
        <nav aria-label="${t("Primary", "मुख्य")}"><ul class="primary" id="primary-nav">${items}</ul></nav>
      </div>`;
  }

  function footer() {
    const t = (en, hi) => (LANG === "hi" ? hi : en);
    const forList = [["Prospective students", "programmes.html"], ["Current students", "https://campus.iimb.ac.in/"], ["Alumni", "https://iimbaa.com/"], ["Recruiters", "partner.html#recruit"], ["Organisations", "partner.html"], ["Researchers", "theme.html?id=dpi"], ["Media", "faculty.html?media=1"], ["Policymakers", "centre.html?id=cpp"], ["Visitors", "about.html#contact"]];
    const info = [["Right to Information", "https://www.iimb.ac.in/rti"], ["Tender notices", "https://www.iimb.ac.in/tender_notices"], ["IIM Act and Rules", "https://www.iimb.ac.in/iim-act-rules"], ["Annual reports", "https://www.iimb.ac.in/annual-reports"], ["NIRF", "https://www.iimb.ac.in/nirf-india-rankings"], ["Accessibility statement", "https://www.iimb.ac.in/accessibility-statement"], ["All institute information", "institute-information.html"]];
    const social = [["LinkedIn", "https://www.linkedin.com/school/indian-institute-of-management-bangalore/"], ["X", "https://x.com/iimb_official"], ["Instagram", "https://www.instagram.com/iimbofficial/"], ["YouTube", "https://www.youtube.com/channel/UCZAWa1UvCXDqD9pBPDAqQ0Q"], ["Facebook", "https://www.facebook.com/IIMBOfficial"]];
    return `<div class="wrap"><div class="bays">
      <div class="f-logo"><img src="${R("assets/brand/iimb-logo-reversed.png")}" width="724" height="120" alt="Indian Institute of Management Bangalore" loading="lazy"></div>
      <div class="f-for"><h2>${t("Information for", D.hi.footer.infoFor)}</h2><ul>${forList.map(([l, h]) => `<li>${link(h, l)}</li>`).join("")}</ul></div>
      <div class="f-info"><h2>${t("Institute information", D.hi.footer.info)}</h2><ul>${info.map(([l, h]) => `<li>${link(h, l)}</li>`).join("")}</ul></div>
      <div class="f-contact"><h2>${t("Contact", D.hi.footer.contact)}</h2><ul>
        <li>Indian Institute of Management Bangalore<br>Bannerghatta Road, Bengaluru 560076</li>
        <li>PGP admissions: <a href="mailto:pgpadm@iimb.ac.in">pgpadm@iimb.ac.in</a></li>
        <li>Media: <a href="mailto:${D.mediaContact.email}">${D.mediaContact.email}</a></li>
        <li>Executive Education: <a href="mailto:openpro@iimb.ac.in">openpro@iimb.ac.in</a></li>
        <li style="margin-top:10px">${social.map(([l, h]) => link(h, l)).join(" · ")}</li>
      </ul></div>
      <div class="f-base"><span>Concept prototype for a redesigned iimb.ac.in. Not affiliated with or endorsed by IIM Bangalore. IIMB logo © Indian Institute of Management Bangalore, reproduced from iimb.ac.in for this concept. Campus photographs: Wikimedia Commons contributors, CC BY-SA (see ${link("prototype.html#credits", "credits")}).</span><span>Facts register compiled ${fmtDate(D.meta.today)}</span></div>
    </div></div>`;
  }

  function wireHeader(root) {
    const btns = root.querySelectorAll(".primary > li > button");
    const closeAll = (except) => btns.forEach((b) => { if (b !== except) { b.setAttribute("aria-expanded", "false"); document.getElementById(b.getAttribute("aria-controls")).hidden = true; } });
    btns.forEach((b) => b.addEventListener("click", () => {
      const open = b.getAttribute("aria-expanded") === "true";
      closeAll(b);
      b.setAttribute("aria-expanded", String(!open));
      document.getElementById(b.getAttribute("aria-controls")).hidden = open;
    }));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") { const o = root.querySelector('.primary button[aria-expanded="true"]'); closeAll(); if (o) o.focus(); } });
    document.addEventListener("click", (e) => { if (!root.contains(e.target)) closeAll(); });
    const tog = root.querySelector(".menu-toggle");
    tog.addEventListener("click", () => {
      const open = root.classList.toggle("open");
      tog.setAttribute("aria-expanded", String(open));
    });
  }

  /* Light the thresholds as they come into view (content is visible by default). */
  function wireThresholds() {
    const els = document.querySelectorAll(".threshold");
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("is-lit")); return; }
    const io = new IntersectionObserver((ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-lit"); io.unobserve(en.target); } }), { rootMargin: "0px 0px -15% 0px" });
    els.forEach((e) => io.observe(e));
  }

  function mount() {
    const h = document.getElementById("site-header");
    const f = document.getElementById("site-footer");
    if (h) { h.className = "site-header"; h.innerHTML = header(); wireHeader(h); }
    if (f) { f.className = "site-footer"; f.innerHTML = footer(); }
    const page = html.dataset.page;
    const main = document.getElementById("main");
    if (window.IIMBPages && window.IIMBPages[page] && main) {
      try { window.IIMBPages[page](main); }
      catch (err) { main.innerHTML = `<div class="wrap band"><h1>Something went wrong rendering this page</h1><p class="muted">${esc(err.message)}</p></div>`; console.error(err); }
    }
    wireCharts();
    wireThresholds();
    if (location.hash) { const t = document.getElementById(location.hash.slice(1)); if (t) t.scrollIntoView(); }
  }

  window.OC = { D, esc, R, link, isExt, params, fmtDate, fmtRange, todayISO, isPast, isLive, person, personHref, icon, source, srcLine, pending, factValue,
    beams, threshold, storyMeta, photo, caption, eventRow, barChart, wireCharts, wireThresholds, typeLabel, MONTHS, LANG, NAV };
  document.addEventListener("DOMContentLoaded", mount);
})();
