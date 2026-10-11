/* Page renderers, part B: theme, centre, idea, news, event, executive education, partner, about, institute info, search, prototype notes. */
(function () {
  "use strict";
  const P = (window.IIMBPages = window.IIMBPages || {});
  const O = () => window.OC;

  const head = (crumbs, title, lede, aside = "") => {
    const { R, esc, beams } = O();
    return `<section class="band band--shade pagehead">${beams()}<div class="wrap"><div class="bays">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="${R("index.html")}">Home</a>${crumbs.map(([l, h]) => `<span aria-hidden="true">/</span>${h ? `<a href="${R(h)}">${esc(l)}</a>` : `<span>${esc(l)}</span>`}`).join("")}</nav>
      <h1>${title}</h1>${lede ? `<p class="lede">${lede}</p>` : ""}${aside ? `<div class="aside">${aside}</div>` : ""}
    </div></div></section>`;
  };
  const personLine = (p) => {
    const { esc, personHref, D } = O();
    const internal = !!D.profiles[p.id];
    return `<li class="person"><h3><a href="${esc(personHref(p))}"${internal ? "" : ' rel="noopener"'}>Prof. ${esc(p.name)}</a>${internal ? "" : '<span class="visually-hidden"> (IIMB profile, external)</span>'}</h3><p class="role">${esc(p.area)}${p.roles ? " · " + esc(p.roles[0]) : ""}</p>${p.expertise.length ? `<div class="chips">${p.expertise.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>` : ""}</li>`;
  };
  const streamList = (items) => {
    const { esc, R, storyMeta, isExt } = O();
    return `<div class="story-col" style="grid-column:auto">${items.map((s) => `<a class="story" href="${esc(R(s.url))}"${isExt(s.url) ? ' rel="noopener"' : ""}><h3>${esc(s.title)}${isExt(s.url) ? '<span class="visually-hidden"> (on iimb.ac.in)</span>' : ""}</h3>${storyMeta(s)}${s.dek ? `<p>${esc(s.dek)}</p>` : ""}</a>`).join("")}</div>`;
  };

  /* ---------------- THEME ---------------- */
  P.theme = function (main) {
    const { D, esc, R, link, params, threshold, eventRow, isPast, photo, caption } = O();
    const t = D.themes.find((x) => x.id === (params.get("id") || "dpi")) || D.themes[0];
    const people = D.people.filter((p) => (p.themes || []).includes(t.id));
    const items = D.stream.filter((s) => (s.tags.theme || []).includes(t.id));
    const events = items.filter((s) => s.type === "event").sort((a, b) => b.start.localeCompare(a.start));
    const reads = items.filter((s) => s.type !== "event");
    const c = D.centres.cdpg;
    main.innerHTML = head([["Research & Ideas", null], [t.name, null]], esc(t.name), esc(t.question)) + `
    <section class="band band--ground"><div class="wrap"><div class="cols">
      <div class="c-7"><p class="lede">${esc(t.lede)}</p></div>
      <div class="c-5"><div class="sidebox"><h2>Centre</h2><p>${link("centre.html?id=cdpg", `<b>${esc(c.name)}</b>`)}</p><p class="muted">Chaired by Prof. R Srinivasan · <a href="mailto:${c.email}">${c.email}</a></p></div></div>
    </div></div></section>
    <section class="band band--stone" aria-labelledby="q-h"><div class="wrap"><div class="cols">
      <div class="c-4">${threshold("The questions", "", "q-h")}<p class="muted">The research agenda, as CDPG states it.</p></div>
      <div class="c-8"><ol class="agenda" style="list-style:none">${c.agenda.map((a) => `<li>${esc(a)}</li>`).join("")}</ol>${O().srcLine("cdpg")}</div>
    </div></div></section>
    <section class="band band--ground" aria-labelledby="p-h"><div class="wrap">
      ${threshold("People working on it", `${people.length} faculty from the Strategy, Entrepreneurship and Information Systems areas, working together through CDPG.`, "p-h")}
      <ul class="people">${people.map(personLine).join("")}</ul>
      <p class="small muted" style="margin-top:18px">From the CDPG team list. ${link("faculty.html?theme=dpi", "Open in the directory", "textlink")}</p>
    </div></section>
    <section class="band band--stone" aria-labelledby="o-h"><div class="wrap"><div class="cols">
      <div class="c-6">${threshold("Outputs and explainers", "", "o-h")}
        <ul class="outputs">
          <li><span class="yr">2026</span><div><p class="ot">${link("https://www.iimb.ac.in/cdpg/State-India-DPI-Report-2026/#p=1", "State of DPI in India 2026")}</p><p class="ov">Report by CDPG, commissioned by Protean eGov Technologies. Second edition: financial services, healthcare, agriculture, commerce and education.</p></div></li>
          <li><span class="yr">2024</span><div><p class="ot">Ecosystem Development for Digital Public Goods: The Case of Jugalbandi</p><p class="ov">Teaching case co-authored by Prof. Shankhadeep Banerjee, among the cases submitted for the FT 2024 assessment.</p></div></li>
        </ul>
        <div style="margin-top:32px">${streamList(reads)}</div></div>
      <div class="c-6">${threshold("Events", "", "")}<ul class="events">${events.map(eventRow).join("")}</ul></div>
    </div></div></section>
    <section class="band band--shade photo-band" style="padding:0"><figure style="margin:0">${photo("library", 1600)}<div class="wrap" style="padding-block:12px">${caption("library")}</div></figure></section>`;
  };

  /* ---------------- CENTRE ---------------- */
  P.centre = function (main) {
    const { D, esc, R, link, params, threshold, eventRow, srcLine, beams } = O();
    const c = D.centres[params.get("id") || "cdpg"] || D.centres.cdpg;
    document.title = `${c.name} | IIMB prototype`;
    const accent = `var(--${c.accent})`;
    const team = c.team.map(O().person).filter(Boolean);
    const items = D.stream.filter((s) => (s.tags.centre || []).includes(c.id));
    const events = items.filter((s) => s.type === "event");
    const reads = items.filter((s) => s.type !== "event");
    main.innerHTML = `
    <div class="accent-bar" style="--accent:${accent}"></div>
    <section class="band band--shade pagehead" style="--accent:${accent}">${beams()}<div class="wrap"><div class="bays">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="${R("index.html")}">Home</a><span aria-hidden="true">/</span><span>Research & Ideas</span><span aria-hidden="true">/</span><span>Centres</span></nav>
      <div style="grid-column:1/-1"><span class="centre-lockup"><span class="cs">${esc(c.short)}</span><span class="cn">IIM Bangalore</span></span></div>
      <h1>${esc(c.name)}</h1><p class="lede">${esc(c.lede)}</p>
      <div class="aside">${c.email ? `<a class="btn btn--light" href="mailto:${c.email}">Contact ${esc(c.short)}</a>` : O().pending({ label: "Centre inbox", owner: "CPP" })}</div>
    </div></div></section>
    <section class="band band--ground"><div class="wrap"><div class="cols">
      <div class="c-4">${threshold("What it works on", "")}</div>
      <div class="c-8"><ul class="agenda">${c.agenda.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>${srcLine(c.src)}</div>
    </div></div></section>
    <section class="band band--stone"><div class="wrap">
      ${threshold("People", c.chair ? "" : `Chair: ${O().pending({ label: "Chairperson", owner: "CPP" })}. The members below are listed as secondary members on their directory entries.`)}
      <ul class="people">${team.map(personLine).join("")}</ul>
    </div></div></section>
    <section class="band band--ground"><div class="wrap"><div class="cols">
      <div class="c-6">${threshold("Outputs and news", "")}${reads.length ? streamList(reads) : `<p class="muted">No items tagged to this centre yet.</p>`}</div>
      <div class="c-6">${threshold("Events", "")}<ul class="events">${events.map(eventRow).join("") || '<li class="empty"><p class="muted">No events tagged yet.</p></li>'}</ul></div>
    </div></div></section>
    <section class="band band--shade band--tight"><div class="wrap"><div class="cols">
      <div class="c-8"><p class="lede">${c.email ? `Write to ${esc(c.short)} at <a href="mailto:${c.email}">${c.email}</a>, or reach a team member through their profile.` : `Reach the team through their profiles while the centre's inbox is confirmed.`}</p></div>
      <div class="c-4"><p>${c.site ? link(c.site, `${esc(c.short)}'s current site`, "textlink") : ""}${c.partners ? `<br><span class="small muted">Partners: ${c.partners.map(esc).join(", ")}</span>` : ""}</p>
      <p class="small muted" style="margin-top:10px">Other centres: ${Object.values(D.centres).filter((x) => x.id !== c.id).map((x) => link(`centre.html?id=${x.id}`, esc(x.name))).join(", ")}</p></div>
    </div></div></section>`;
  };

  /* ---------------- IDEA (article) ---------------- */
  P.idea = function (main) {
    const { D, esc, R, link, params, beams, barChart, person } = O();
    const id = params.get("id") || "wp745";
    const a = D.ideas[id];
    const feat = a.featuring.map(person);
    document.title = `${a.headline} | IIMB prototype`;
    const body = a.body.map((b) => {
      if (b.p) return `<p>${esc(b.p)}</p>`;
      if (b.h) return `<h2>${esc(b.h)}</h2>`;
      if (b.quote) return `<blockquote class="quote">“${esc(b.quote)}”<footer>${esc(b.cite)}</footer></blockquote>`;
      if (b.figure) { const f = a.figures[b.figure]; return `<div style="font-family:var(--f-display)">${barChart({ title: f.title, sub: f.note, rows: f.rows, unit: f.unit, max: 20 })}</div>`; }
      return "";
    }).join("");
    main.innerHTML = `
    <article>
      <header class="band band--shade article-head"><div class="wrap">
        <nav class="crumbs" aria-label="Breadcrumb" style="margin-bottom:28px"><a href="${R("index.html")}">Home</a><span aria-hidden="true">/</span><span>Ideas</span></nav>
        <h1>${esc(a.headline)}</h1>
        <p class="standfirst">${esc(a.standfirst)}</p>
        <div class="credit"><span>Featuring ${feat.map((p) => `<b><a href="${R("person.html?id=" + p.id)}">Prof. ${esc(p.name)}</a></b>`).join(", ")} with ${esc(a.coAuthors)}</span><span>By ${O().pending({ label: "Writer", owner: "Communications" })}</span><time datetime="${a.date}">${esc(a.dateLabel)}</time><span>5 min read</span></div>
      </div></header>
      <div class="band band--stone"><div class="wrap article-body">
        <div class="reading">${body}
          <p class="notice" style="margin-top:2em;font-family:var(--f-display)">This explainer was drafted for the prototype from the working paper's abstract. The authors have not reviewed it. In a live Ideas layer, a named writer drafts it and the featured faculty member signs it off.</p>
        </div>
        <aside class="rail" aria-label="Citation">
          <div class="citebox"><h2>Paper of record</h2><p class="ref">${esc(a.citation.text)}</p>
            <p>${link(a.citation.pdf, "Read the working paper (PDF, 989 KB)", "textlink")}</p>
            <p>${link(a.citation.page, "Abstract on iimb.ac.in")}</p>
            <p class="small muted">Keywords: ${esc(a.citation.keywords)}</p>
            <p class="small muted">DOI: none listed on the IIMB working-paper page.</p>
          </div>
          <div class="sidebox" style="margin-top:28px"><h2>Ask an expert</h2><p>Prof. Chetan Subramanian works on monetary economics. ${link("person.html?id=chetan-subramanian", "Profile")}</p><p class="muted">Media: <a href="mailto:${D.mediaContact.email}">${D.mediaContact.email}</a></p></div>
        </aside>
      </div></div>
    </article>`;
  };

  /* ---------------- NEWSROOM ---------------- */
  P.news = function (main) {
    const { D, esc, R, link, params, storyMeta, isPast, isExt, fmtDate, todayISO } = O();
    const per = 8;
    const sortKey = (s) => s.date || s.start;
    const all = [...D.stream];
    const programmes = [["pgp", "PGP"], ["pgpba", "PGPBA"], ["epgp", "EPGP"], ["ug", "Undergraduate"]];
    main.innerHTML = head([["News & events", null]], "News and events", "Stories, news, events, achievements and faculty commentary from across IIMB, in one place.") + `
    <section class="band band--ground band--tight"><div class="wrap">
      <form class="filters" onsubmit="return false" aria-label="Filter the newsroom">
        <div class="field"><label for="n-type">Type</label><select id="n-type"><option value="">Everything</option>${Object.entries(O().typeLabel).map(([k, v]) => `<option value="${k}">${v}</option>`).join("")}</select></div>
        <div class="field"><label for="n-when">Events</label><select id="n-when"><option value="">Upcoming and past</option><option value="upcoming">Upcoming only</option><option value="past">Past only</option></select></div>
        <div class="field"><label for="n-prog">Programme</label><select id="n-prog"><option value="">All programmes</option>${programmes.map(([v, l]) => `<option value="${v}">${l}</option>`).join("")}</select></div>
        <div class="field"><label for="n-centre">Centre</label><select id="n-centre"><option value="">All centres</option>${Object.values(D.centres).map((c) => `<option value="${c.id}">${esc(c.short)}</option>`).join("")}</select></div>
        <div class="field"><label for="n-theme">Theme</label><select id="n-theme"><option value="">All themes</option>${D.themes.map((t) => `<option value="${t.id}">${esc(t.name)}</option>`).join("")}</select></div>
        <div class="field"><label for="n-month">Month</label><select id="n-month"><option value="">Any month</option></select></div>
      </form>
      <p class="resultcount" id="n-count" aria-live="polite"></p>
      <div id="n-list"></div>
      <nav class="pager" id="n-pager" aria-label="Pages"></nav>
      <p class="small muted">Events are compared with today's date (${fmtDate(todayISO)}). The day after an event ends, it moves to past by itself. To preview this, add <code>?today=2026-12-20</code> to the address.</p>
    </div></section>`;
    const $ = (s) => main.querySelector(s);
    const months = [...new Set(all.map((s) => sortKey(s).slice(0, 7)))].sort().reverse();
    $("#n-month").innerHTML += months.map((m) => `<option value="${m}">${fmtDate(m)}</option>`).join("");
    if (params.get("type")) $("#n-type").value = params.get("type");
    let page = 1;
    function render() {
      const type = $("#n-type").value, when = $("#n-when").value, prog = $("#n-prog").value, centre = $("#n-centre").value, theme = $("#n-theme").value, month = $("#n-month").value;
      let res = all.filter((s) => (!type || s.type === type) && (!prog || (s.tags.programme || []).includes(prog)) && (!centre || (s.tags.centre || []).includes(centre)) && (!theme || (s.tags.theme || []).includes(theme)) && (!month || sortKey(s).startsWith(month)));
      if (when) res = res.filter((s) => s.type === "event" && (when === "past" ? isPast(s) : !isPast(s)));
      // upcoming events first (soonest first), then everything else newest first
      const up = res.filter((s) => s.type === "event" && !isPast(s)).sort((a, b) => a.start.localeCompare(b.start));
      const rest = res.filter((s) => !(s.type === "event" && !isPast(s))).sort((a, b) => sortKey(b).localeCompare(sortKey(a)));
      res = [...up, ...rest];
      const pages = Math.max(1, Math.ceil(res.length / per));
      page = Math.min(page, pages);
      const slice = res.slice((page - 1) * per, page * per);
      $("#n-count").textContent = `${res.length} items${up.length ? ` · ${up.length} upcoming events listed first` : ""}`;
      $("#n-list").innerHTML = slice.length ? `<div class="story-col" style="grid-column:auto;border-top:1px solid var(--rule)">${slice.map((s) => {
        const ev = s.type === "event"; const past = ev && isPast(s);
        return `<a class="story" href="${esc(R(s.url))}"${isExt(s.url) ? ' rel="noopener"' : ""} style="padding:20px 0;border-top:1px solid var(--rule)"><h3${past ? ' class="muted"' : ""}>${esc(s.title)}${isExt(s.url) ? '<span class="visually-hidden"> (on iimb.ac.in)</span>' : ""}</h3>${storyMeta(s)}${s.dek ? `<p>${esc(s.dek)}</p>` : ""}${ev ? `<p class="micro">${past ? '<span class="tag tag--past">Past event</span>' : '<span class="tag tag--live">Upcoming</span>'} ${esc(s.mode || "")}</p>` : ""}</a>`;
      }).join("")}</div>` : `<div class="empty"><h3>Nothing matches these filters</h3><p class="muted">Clear a filter to see more. The stream holds ${all.length} items from the last two months.</p></div>`;
      $("#n-pager").innerHTML = pages > 1 ? `<button type="button" data-p="${page - 1}" ${page === 1 ? "disabled" : ""}>Previous</button>${Array.from({ length: pages }, (_, i) => `<button type="button" data-p="${i + 1}" ${i + 1 === page ? 'aria-current="page"' : ""}>${i + 1}</button>`).join("")}<button type="button" data-p="${page + 1}" ${page === pages ? "disabled" : ""}>Next</button>` : "";
      $("#n-pager").querySelectorAll("button").forEach((b) => b.addEventListener("click", () => { page = Number(b.dataset.p); render(); $("#n-count").scrollIntoView({ block: "start" }); }));
    }
    main.querySelectorAll("select").forEach((s) => s.addEventListener("change", () => { page = 1; render(); }));
    render();
  };

  /* ---------------- EVENT ---------------- */
  P.event = function (main) {
    const { D, esc, R, link, params, fmtRange, isPast, isLive, fmtDate, beams } = O();
    const id = params.get("id") || "isc-2026";
    const ev = D.stream.find((s) => s.id === id);
    const d = D.eventDetail[id];
    document.title = `${ev.title} | IIMB prototype`;
    const past = isPast(ev), live = isLive(ev);
    main.innerHTML = head([["News & events", "news.html"], ["Events", "news.html?type=event"], [ev.title, null]], esc(ev.title), esc(d.theme),
      `<p style="font-size:1.6rem;font-stretch:80%;font-weight:640;line-height:1.1">${esc(fmtRange(ev.start, ev.end))}</p><p class="micro muted" style="margin-top:6px">${past ? "This event has ended" : live ? "Happening now" : esc(ev.mode)}</p>`) + `
    <section class="band band--ground"><div class="wrap"><div class="profile-grid">
      <div class="profile-main">
        ${past ? `<p class="notice" style="margin-bottom:28px"><b>This event took place on ${esc(fmtRange(ev.start, ev.end))}.</b> It moved to the archive automatically the day after it ended. Registration is closed.</p>` : ""}
        <div class="reading">${d.about.map((p) => `<p>${esc(p)}</p>`).join("")}</div>
        <h2 class="h3" style="margin-top:40px">Tracks</h2><ul class="agenda">${d.tracks.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        <h2 class="h3" style="margin-top:40px">Conference chairs</h2><ul class="agenda">${d.chairs.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
      </div>
      <aside class="profile-side" aria-label="Event details">
        <div class="sidebox"><h2>When</h2><p><b>${esc(fmtRange(ev.start, ev.end))}</b></p><p class="muted">Times to be confirmed on the conference website</p>
          ${past ? "" : `<p style="margin-top:8px"><button type="button" class="btn btn--ink" id="ics">Add to calendar</button></p>`}</div>
        <div class="sidebox"><h2>Where</h2><p>${esc(d.venue)}</p><p class="muted">Mode: ${esc(ev.mode)}</p></div>
        <div class="sidebox"><h2>Registration</h2><p>${past ? "Closed." : esc(d.registration.status)}</p><p>${link(d.registration.url, "indiastrategy.org/2026", "textlink")}</p></div>
        <div class="sidebox"><h2>Source</h2><p class="small">${link(d.src, "Announcement on iimb.ac.in")}, ${fmtDate(d.announced)}. Checked 11 Oct 2026.</p></div>
      </aside>
    </div></div></section>`;
    const btn = main.querySelector("#ics");
    if (btn) btn.addEventListener("click", () => {
      const end = new Date(ev.end + "T00:00:00"); end.setDate(end.getDate() + 1);
      const e2 = `${end.getFullYear()}${String(end.getMonth() + 1).padStart(2, "0")}${String(end.getDate()).padStart(2, "0")}`;
      const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//IIMB prototype//EN", "BEGIN:VEVENT", `UID:${id}@iimb-prototype`, `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`, `DTSTART;VALUE=DATE:${ev.start.replace(/-/g, "")}`, `DTEND;VALUE=DATE:${e2}`, `SUMMARY:${ev.title}`, `LOCATION:${d.venue.replace(/,/g, "\\,")}`, `URL:${d.registration.url}`, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
      a.download = "india-strategy-conference-2026.ics";
      document.body.appendChild(a); a.click(); a.remove();
    });
  };

  /* ---------------- EXECUTIVE EDUCATION ---------------- */
  P.execed = function (main) {
    const { D, esc, R, link, threshold, srcLine, fmtDate, MONTHS, todayISO } = O();
    const M = D.execEdMeta;
    const cats = [...new Set(D.execEd.map((x) => x.cat))].sort();
    main.innerHTML = head([["Executive Education", null]], "Executive education", "Open programmes from three days to ten months, and custom programmes built for one organisation. The same institution, faculty and campus as the degrees.", `<a class="btn btn--light" href="#enquire">Enquire</a>`) + `
    <section class="band band--ground band--tight" id="finder"><div class="wrap">
      <form class="filters" onsubmit="return false" aria-label="Find a programme">
        <div class="field field--grow"><label for="e-q">Topic or title</label><input type="search" id="e-q" placeholder="e.g. leadership, ESG, finance"></div>
        <div class="field"><label for="e-cat">Area</label><select id="e-cat"><option value="">All areas</option>${cats.map((c) => `<option>${esc(c)}</option>`).join("")}</select></div>
        <div class="field"><span class="micro" style="font-weight:600;color:var(--ink-2)" id="len-l">Length</span><div class="seg" role="group" aria-labelledby="len-l">${[["any", "Any"], ["short", "Up to 5 days"], ["long", "Months"]].map(([v, l], i) => `<button type="button" data-len="${v}" aria-pressed="${i === 0}">${l}</button>`).join("")}</div></div>
        <div class="field"><label for="e-month">Starts in</label><select id="e-month"><option value="">Any month</option><option value="2026-10">October 2026</option><option value="2026-11">November 2026</option></select></div>
      </form>
      <p class="resultcount" id="e-count" aria-live="polite"></p>
      <ul class="schedule" id="schedule"></ul>
      <p class="small muted" style="margin-top:14px">Showing the ${M.shown} programmes starting soonest, of ${M.total} listed on ${link(D.sources.eep.url, "eep.iimb.ac.in")} on 11 Oct 2026. The areas are assigned by this prototype from the programme titles, until the EEP office supplies its own taxonomy. Fees are on each programme's page.</p>
    </div></section>
    <section class="band band--shade" id="custom">${O().beams()}<div class="wrap"><div class="cols">
      <div class="c-5">${threshold("Programmes for organisations", "")}</div>
      <div class="c-7"><p class="lede">IIMB designs custom programmes for corporates, government, international organisations and institutions, from short workshops to long-duration programmes for a single client.</p>
        <p style="margin-top:18px" class="muted">Custom enquiries go to ${O().pending({ label: "Custom programmes inbox", owner: "Executive Education" })}. Until then, use ${link("partner.html#custom", "Partner with IIMB", "textlink")}.</p>
        <div class="figures" style="margin-top:28px;border-top-color:var(--shade-line)"><div style="border-bottom-color:var(--shade-line)"><b>${esc(D.facts.eepAlumni.value)}</b><span style="color:var(--on-shade-2)">Executive Education alumni</span></div><div style="border-bottom-color:var(--shade-line)"><b>${O().pending(D.facts.execEdScale)}</b><span style="color:var(--on-shade-2)">participants a year (two figures in use)</span></div></div></div>
    </div></div></section>
    <section class="band band--stone" id="enquire" aria-labelledby="enq-h"><div class="wrap"><div class="cols">
      <div class="c-5">${threshold("Enquire about a programme", "", "enq-h")}<p class="muted">The office replies by email. This form asks only for what is needed to answer you, and it has no hidden fields.</p>
        <p class="small" style="margin-top:16px">Prefer to write directly? <a href="mailto:${M.email}">${M.email}</a> · ${esc(M.phones)}</p></div>
      <div class="c-7"><form class="form" id="enq" novalidate>
        <div class="row"><div class="field"><label for="f-name">Your name</label><input type="text" id="f-name" name="name" autocomplete="name" required></div>
        <div class="field"><label for="f-email">Work email</label><input type="email" id="f-email" name="email" autocomplete="email" required></div></div>
        <div class="row"><div class="field"><label for="f-org">Organisation <span class="muted">(optional)</span></label><input type="text" id="f-org" name="organisation" autocomplete="organization"></div>
        <div class="field"><label for="f-phone">Phone <span class="muted">(optional)</span></label><input type="tel" id="f-phone" name="phone" autocomplete="tel"></div></div>
        <div class="field"><label for="f-prog">Programme</label><select id="f-prog" name="programme"><option value="">Not sure yet</option>${D.execEd.map((x) => `<option>${esc(x.title)}${x.batch ? " · " + esc(x.batch) : ""}</option>`).join("")}<option>A custom programme for my organisation</option></select></div>
        <div class="field"><label for="f-msg">Your question</label><textarea id="f-msg" name="message" required placeholder="What would you like to know?"></textarea></div>
        <label class="check"><input type="checkbox" id="f-ok" required> I agree that IIMB may use these details to reply to this enquiry</label>
        <div><button class="btn btn--ink" type="submit">Send enquiry</button></div>
        <p class="micro muted">Prototype: nothing is sent or stored.</p>
      </form><div id="enq-done" hidden></div></div>
    </div></div></section>`;
    const $ = (s) => main.querySelector(s);
    let len = "any";
    const prefill = (title) => { $("#f-prog").value = [...$("#f-prog").options].find((o) => o.text.startsWith(title))?.text || ""; $("#enquire").scrollIntoView(); $("#f-name").focus(); };
    function render() {
      const q = $("#e-q").value.trim().toLowerCase(), cat = $("#e-cat").value, month = $("#e-month").value;
      const res = D.execEd.filter((x) => (!q || (x.title + " " + x.cat).toLowerCase().includes(q)) && (!cat || x.cat === cat) && (!month || x.start.startsWith(month)) && (len === "any" || (len === "short" ? x.lengthDays <= 5 : x.lengthDays > 5)) && x.start >= todayISO.slice(0, 7) + "-01");
      $("#e-count").textContent = `${res.length} programme${res.length === 1 ? "" : "s"}`;
      $("#schedule").innerHTML = res.map((x) => { const [y, m, d] = x.start.split("-").map(Number); return `<li class="sched" id="${x.title.replace(/\W+/g, "-").toLowerCase()}"><time datetime="${x.start}"><b>${d} ${MONTHS[m - 1]}</b><span>${y}</span></time><div><h3>${esc(x.title)}</h3><p class="micro muted">${esc(x.cat)}${x.batch ? " · " + esc(x.batch) : ""}</p></div><span class="len">${esc(x.length)}</span><span class="act"><button type="button" class="linkbtn" data-enq="${esc(x.title)}">Enquire<span class="visually-hidden"> about ${esc(x.title)}</span></button></span></li>`; }).join("") || `<li class="empty"><h3>No programmes match</h3><p class="muted">Clear a filter, or ask the office about upcoming batches: <a href="mailto:${M.email}">${M.email}</a></p></li>`;
      main.querySelectorAll("[data-enq]").forEach((b) => b.addEventListener("click", () => prefill(b.dataset.enq)));
    }
    $("#e-q").addEventListener("input", render);
    ["#e-cat", "#e-month"].forEach((s) => $(s).addEventListener("change", render));
    main.querySelectorAll("[data-len]").forEach((b) => b.addEventListener("click", () => { len = b.dataset.len; main.querySelectorAll("[data-len]").forEach((x) => x.setAttribute("aria-pressed", String(x === b))); render(); }));
    render();
    $("#enq").addEventListener("submit", (e) => {
      e.preventDefault();
      const f = e.target; let first = null;
      f.querySelectorAll(".err").forEach((x) => x.remove());
      [["#f-name", "Enter your name."], ["#f-email", "Enter an email address we can reply to, like name@company.com."], ["#f-msg", "Tell us what you'd like to know."], ["#f-ok", "Tick the box so we're allowed to reply."]].forEach(([s, msg]) => {
        const el = f.querySelector(s); const bad = el.type === "checkbox" ? !el.checked : el.type === "email" ? !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value) : !el.value.trim();
        el.setAttribute("aria-invalid", String(bad));
        if (bad) { const p = document.createElement("p"); p.className = "err"; p.id = el.id + "-err"; p.textContent = msg; (el.closest(".field") || el.closest("label")).after(p); el.setAttribute("aria-describedby", p.id); first = first || el; }
      });
      if (first) { first.focus(); return; }
      f.hidden = true;
      const done = $("#enq-done"); done.hidden = false;
      done.innerHTML = `<div class="success" tabindex="-1"><h3>Thanks, ${esc(f.querySelector("#f-name").value.split(" ")[0])}. Your enquiry is ready to send.</h3><p>In the live site it would go to the Executive Education office, which replies by email. This prototype doesn't send anything. To ask for real, write to <a href="mailto:${M.email}">${M.email}</a>.</p></div>`;
      done.firstElementChild.focus();
    });
  };

  /* ---------------- PARTNER ---------------- */
  P.partner = function (main) {
    const { D, esc, link, threshold, srcLine, pending } = O();
    const C = D.placementCalendar;
    main.innerHTML = head([["Partner with IIMB", null]], "Partner with IIMB", "One door for organisations and alumni. Every route ends at a named role inbox, not a person's mobile number.") + `
    <section class="band band--ground"><div class="wrap">
      <ul class="doors">${D.partner.map((d) => `<li class="door" id="${d.id}"><h2>${esc(d.name)}</h2><p>${esc(d.lede)}</p><div class="inbox">
        ${d.inbox ? `<a class="textlink" href="mailto:${d.inbox}">${d.inbox}</a><span class="muted">${esc(d.inboxNote || "")}</span>${d.alt ? `<span class="muted small">Also: ${esc(d.alt)}</span>` : ""}` : d.link ? link(d.link, esc(d.linkLabel), "textlink") : pending({ label: "Role inbox", owner: d.id === "custom" ? "Executive Education" : "Research & Publications" })}
      </div></li>`).join("")}</ul>
    </div></section>
    <section class="band band--stone" id="calendar" aria-labelledby="cal-h"><div class="wrap"><div class="cols">
      <div class="c-4">${threshold("Placement calendar 2026–27", "", "cal-h")}<p class="muted">For recruiters planning campus visits. Dates as published by Career Development Services.</p></div>
      <div class="c-8"><h3 class="h3">PGP and PGPBA</h3><table class="dates"><tbody>${C.pgp.map(([a, b]) => `<tr><th scope="row">${esc(a)}</th><td>${b ? esc(b) : pending({ label: "Dates", owner: "Career Development Services" })}</td></tr>`).join("")}</tbody></table>
        <h3 class="h3" style="margin-top:32px">EPGP</h3><table class="dates"><tbody>${C.epgp.map(([a, b]) => `<tr><th scope="row">${esc(a)}</th><td>${esc(b)}</td></tr>`).join("")}</tbody></table>${srcLine("recruiters")}
        <p class="small muted" style="margin-top:12px">The current recruiters page lists student representatives' personal contact details. The prototype publishes only role inboxes.</p></div>
    </div></div></section>`;
  };

  /* ---------------- ABOUT & CAMPUS ---------------- */
  P.about = function (main) {
    const { D, esc, R, link, threshold, srcLine, pending, photo, caption, beams } = O();
    const F = D.facts;
    main.innerHTML = head([["About & Campus", null]], "Management thinking, tested on the questions India is working on.", "An Institute of National Importance in Bengaluru, known for its teaching cases, its research centres and B.V. Doshi's stone campus.") + `
    <section class="band band--ground"><div class="wrap"><div class="cols">
      <div class="c-6 reading" style="font-size:1.08rem"><p>IIMB is an Institute of National Importance under the IIM Act of 2017. It runs a doctoral programme, four MBA programmes, a public policy master's, undergraduate degrees through the Dorabji Tata School of Undergraduate Studies, and executive education.</p>
        <p>Its motto, <span lang="sa">तेजस्वि नावधीतमस्तु</span> (<i>tejasvi navadhitamastu</i>), translates as “let our study be enlightening”. It comes from the peace invocation in several Upanishads.</p>${srcLine("about")}</div>
      <div class="c-6"><table class="dates"><caption class="visually-hidden">IIMB in brief</caption><tbody>
        <tr><th scope="row">Teaching-case impact</th><td>11th in the world, 1st in India (Financial Times, 2026)</td></tr>
        <tr><th scope="row">Working paper series</th><td>${esc(F.workingPapers.value)} papers, latest in 2026</td></tr>
        <tr><th scope="row">Full-time faculty</th><td>${pending(F.faculty)}</td></tr>
        <tr><th scope="row">Students in degree programmes</th><td>${pending(F.students)}</td></tr>
        <tr><th scope="row">Executive Education alumni</th><td>${esc(F.eepAlumni.value)}</td></tr>
      </tbody></table><p class="small muted" style="margin-top:12px">Faculty and student counts are being confirmed: IIMB's pages currently give ${esc(F.faculty.reason)}, and ${esc(F.students.reason)}.</p></div>
    </div></div></section>
    <section class="band band--stone" id="leadership" aria-labelledby="lead-h"><div class="wrap">
      ${threshold("Leadership", "", "lead-h")}
      <ul class="people">${D.leadership.map((l) => { const p = l.id && O().person(l.id); return `<li class="person"><h3>${p ? `<a href="${esc(p.url)}" rel="noopener">${esc(l.name)}</a>` : esc(l.name)}</h3><p class="role">${esc(l.role)}${l.note ? " · " + esc(l.note) : ""}</p>${l.email ? `<p class="small"><a href="mailto:${l.email}">${l.email}</a></p>` : ""}</li>`; }).join("")}</ul>
      <p class="small muted" style="margin-top:16px">${link("https://www.iimb.ac.in/about-institute/board", "Full Board of Governors", "textlink")}</p>
    </div></section>
    <section class="band band--shade" id="history" aria-labelledby="hist-h">${beams()}<div class="wrap">
      ${threshold("A timeline of firsts", "Only years an IIMB page states. Where the year is inferred, it says so.", "hist-h")}
      <ol class="timeline">${D.timeline.map((t) => `<li><b>${esc(t.year)}</b><p>${esc(t.text)}</p>${t.pending ? `<p class="micro">${pending({ label: "Date", owner: "IIMB Archives" })}</p>` : ""}</li>`).join("")}</ol>
      <p class="micro muted" style="margin-top:12px">Scroll sideways for more. Sources: About, Architecture, PGPEM, CPP and FT pages on iimb.ac.in, checked 11 Oct 2026.</p>
    </div></section>
    <section class="band band--ground" id="campus" aria-labelledby="camp-h"><div class="wrap">
      ${threshold("Campus and architecture", "A lesson in rhythm and composition.", "camp-h")}
      <div class="cols">
        <figure class="c-7" style="margin:0">${photo("corridor-pergola", 1600)}${caption("corridor-pergola")}</figure>
        <div class="c-5 reading"><p>B.V. Doshi designed the campus, and it was completed in 1983. The 54,000 square metre complex is based on the town of Fatehpur Sikri, laid out by Akbar in the 16th century. Doshi linked a network of corridors, courtyards and open spaces so that the campus could grow.</p>
          <p>The high corridors are sometimes open, sometimes partly covered with skylights, sometimes roofed only with pergolas. Their width changes to leave room for casual seating, so a conversation can carry on after class.</p>${srcLine("arch")}
          <p style="margin-top:14px">Campus area: ${pending(F.campusArea)}</p></div>
        <figure class="c-4" style="margin:0">${photo("stone-columns", 800)}${caption("stone-columns")}</figure>
        <figure class="c-4" style="margin:0">${photo("amphitheatre", 800)}${caption("amphitheatre")}</figure>
        <figure class="c-4" style="margin:0">${photo("unmaad", 800)}${caption("unmaad")}</figure>
      </div>
    </div></section>
    <section class="band band--stone" id="sustainability" aria-labelledby="sus-h"><div class="wrap"><div class="cols">
      <div class="c-5">${threshold("Sustainability", "", "sus-h")}<p class="muted">The Sustainability Taskforce is chaired by Prof. Haritha Saranga. In August 2026 IIMB won the ELCITA Gold Award, with Excellence Awards for water, biodiversity and community service.</p></div>
      <div class="c-7"><div class="figures">
        <div><b>${esc(F.trees.value)}</b><span>${esc(F.trees.label)}</span></div>
        <div><b>${esc(F.stp.value)}</b><span>${esc(F.stp.label)}</span></div>
        <div><b>10%+</b><span>of electricity from rooftop solar</span></div>
        <div><b>20%</b><span>of domestic water needs met from water generated on campus</span></div>
      </div>${srcLine("sust")}<p style="margin-top:14px">${link("https://www.iimb.ac.in/sites/default/files/inline-files/iimb-sustainability-report-2025.pdf", "Sustainability Report 2025 (PDF)", "textlink")}</p></div>
    </div></div></section>
    <section class="band band--ground" id="contact" aria-labelledby="con-h"><div class="wrap"><div class="cols">
      <div class="c-5">${threshold("Contact and visit", "", "con-h")}</div>
      <div class="c-7"><p class="lede">Indian Institute of Management Bangalore<br>Bannerghatta Road, Bengaluru 560076</p>
        <p style="margin-top:14px" class="muted">Guided campus tours: ${pending({ label: "Visitor booking", owner: "Communications" })}</p>
        <p style="margin-top:14px">${link("https://www.iimb.ac.in/contactus", "Full contact directory", "textlink")} · ${link("institute-information.html", "Institute information", "textlink")}</p></div>
    </div></div></section>`;
  };

  /* ---------------- INSTITUTE INFORMATION ---------------- */
  P.info = function (main) {
    const { D, esc, link } = O();
    main.innerHTML = head([["Institute information", null]], "Institute information", "The complete statutory index: RTI, acts and regulations, reports and policies. One click from every page, in the footer.") + `
    <section class="band band--ground"><div class="wrap">
      <div class="index">${D.statutory.map((g) => `<section><h2>${esc(g.group)}</h2><ul>${g.items.map(([l, h]) => `<li>${link(h, esc(l))}</li>`).join("")}</ul></section>`).join("")}</div>
      <p class="small muted" style="margin-top:40px">Links go to the current iimb.ac.in pages, checked 11 Oct 2026, from its footer and sitemap. The latest annual report is listed on the Annual Reports page. In the live site this index is generated from the content model, so a new report appears here as soon as it is published.</p>
    </div></section>`;
  };

  /* ---------------- SEARCH ---------------- */
  P.search = function (main) {
    const { D, esc, R, link, params, fmtDate, beams, isPast } = O();
    const q0 = params.get("q") || "";
    const suggestions = ["What is the PGP fee?", "When do PGP applications close?", "Who works on digital public goods?", "Monetary policy expert", "Leadership programme", "RTI"];
    main.innerHTML = `<section class="band band--shade pagehead">${beams()}<div class="wrap">
      <h1 style="margin-bottom:24px">Search</h1>
      <form class="searchbox" role="search" action="search.html"><label for="sq" class="visually-hidden">Search programmes, people, research, events and pages</label><input id="sq" name="q" type="search" value="${esc(q0)}" placeholder="Ask a question or type a name" autocomplete="off"><button type="submit">Search</button></form>
      <div class="suggest" aria-label="Suggested questions">${suggestions.map((s) => `<a href="?q=${encodeURIComponent(s)}">${esc(s)}</a>`).join("")}</div>
    </div></section>
    <section class="band band--ground"><div class="wrap" id="results"></div></section>`;
    const input = main.querySelector("#sq");
    const pages = [["Find and compare programmes", "programmes.html", "programmes mba compare finder eligibility"], ["Admissions 2027: important dates", "programmes.html#dates", "dates deadline apply admissions close open"], ["Executive education", "executive-education.html", "executive education leadership short course"], ["Partner with IIMB", "partner.html", "recruit placement sponsor give incubate"], ["Placement calendar 2026–27", "partner.html#calendar", "placement recruiters calendar summer final"], ["About & Campus", "about.html", "about history campus doshi architecture"], ["Sustainability", "about.html#sustainability", "sustainability trees water solar"], ["Institute information", "institute-information.html", "rti tender policy annual report nirf act statutory regulations"], ["News and events", "news.html", "news events newsroom"]];
    function answer(q) {
      const l = q.toLowerCase();
      const pgp = D.programmes[0];
      if (/fee|cost/.test(l) && /pgp|mba|programme|$/.test(l)) return `<div class="answer"><h2>PGP fee</h2><p class="big">${esc(pgp.fee.value)} for two years</p><p>${esc(pgp.fee.batch)}. ${O().pending(pgp.fee.next)}</p><p class="small muted">${esc(pgp.fee.note)}</p>${O().srcLine("pgpFees")}<p style="margin-top:8px">${link("programme.html?id=pgp#key-facts", "All PGP key facts", "textlink")}</p></div>`;
      if (/deadline|close|apply|dates?/.test(l)) return `<div class="answer"><h2>PGP 2027–29 applications</h2><p class="big">International applications close ${fmtDate("2027-01-14")}</p><p>Opened ${fmtDate("2026-10-01")}. Domestic applicants apply with CAT 2026: ${O().pending({ label: "Domestic window", owner: "Admissions" })}</p>${O().srcLine("pgpIntl")}<p style="margin-top:8px">${link("programmes.html#dates", "All admissions dates", "textlink")}</p></div>`;
      if (/rti|right to information/.test(l)) return `<div class="answer"><h2>Right to Information</h2><p class="big">${link("https://www.iimb.ac.in/rti", "RTI page on iimb.ac.in")}</p><p>${link("institute-information.html", "Institute information index", "textlink")}, including annual reports.</p></div>`;
      return "";
    }
    function run(q) {
      const words = q.toLowerCase().replace(/[?]/g, "").split(/\s+/).filter((w) => w.length > 2 && !["what", "the", "who", "works", "when", "does", "expert", "programme", "find"].includes(w));
      const hit = (s) => words.length && words.some((w) => s.toLowerCase().includes(w.replace(/y$/, "")));
      const progs = [...D.programmes, ...D.otherProgrammes].filter((p) => hit(`${p.short} ${p.name} ${p.oneLine}`));
      const people = D.people.filter((p) => hit(`${p.name} ${p.area} ${p.expertise.join(" ")} ${(p.roles || []).join(" ")}`)).sort((a, b) => b.expertise.length - a.expertise.length).slice(0, 12);
      const stream = D.stream.filter((s) => hit(`${s.title} ${s.dek || ""}`)).slice(0, 10);
      const exec = D.execEd.filter((x) => hit(`${x.title} ${x.cat}`));
      const pg = pages.filter(([t, , k]) => hit(`${t} ${k}`));
      const group = (title, items, fn) => (items.length ? `<section class="rgroup"><h2>${title}<span>${items.length}</span></h2>${items.map(fn).join("")}</section>` : "");
      const out = answer(q) +
        group("Programmes", progs, (p) => `<div class="result">${link(p.months ? `programme.html?id=${p.id}` : p.url, esc(`${p.short}: ${p.name}`))}<p class="small muted">${esc(p.oneLine)}</p></div>`) +
        group("People", people, (p) => `<div class="result"><a href="${esc(O().personHref(p))}">Prof. ${esc(p.name)}</a><p class="small muted">${esc(p.area)}${p.expertise.length ? " · " + esc(p.expertise.join(", ")) : ""}</p></div>`) +
        group("Executive education", exec, (x) => `<div class="result"><a href="${R("executive-education.html#schedule")}">${esc(x.title)}</a><p class="small muted">Starts ${fmtDate(x.start)} · ${esc(x.length)}</p></div>`) +
        group("News, research and events", stream, (s) => `<div class="result">${link(s.url, esc(s.title))}<p class="small muted">${esc(O().typeLabel[s.type])} · ${s.type === "event" ? esc(O().fmtRange(s.start, s.end)) + (isPast(s) ? " · past" : "") : esc(s.dateDisplay || fmtDate(s.date))}</p></div>`) +
        group("Pages", pg, ([t, h]) => `<div class="result">${link(h, esc(t))}</div>`);
      main.querySelector("#results").innerHTML = q ? out || `<div class="empty"><h3>Nothing found for “${esc(q)}”</h3><p class="muted">Try one of the suggested questions, or a programme name such as PGP or EPGP.</p></div>` : `<p class="muted">Results come back by type: programmes, people (with expertise), executive education, news and research, events and pages. Questions about fees and deadlines are answered directly from the facts register.</p>`;
    }
    run(q0);
  };

  /* ---------------- PROTOTYPE NOTES ---------------- */
  P.notes = function (main) {
    const { link } = O();
    let credits = "";
    main.innerHTML = head([["About this prototype", null]], "About this prototype", "What is real, what is a placeholder, and what this build could not verify.") + `
    <section class="band band--ground"><div class="wrap notes reading" style="max-width:78ch">
      <h2>What it is</h2><p>A working concept for a redesigned iimb.ac.in, built from the audit <i>IIMB Website Redesign: Audit and Strategic Direction</i> (10 Oct 2026). It follows the audit's “Open Corridor” direction. It is not the official IIMB website and is not endorsed by IIM Bangalore.</p>
      <h2>Where the content comes from</h2><ul>
        <li>All facts, names, dates, programmes, events and figures come from public IIMB pages and PDFs fetched on 10–11 Oct 2026. Each is stored with its source in <code>data/register.js</code>.</li>
        <li>The 109 faculty names and areas come from the 11 IIMB area pages. Expertise tags appear only where IIMB publishes them.</li>
        <li>Square-bracket placeholders mark facts that IIMB publishes inconsistently or not at all: faculty and student counts, campus area, EQUIS year, the 2027–29 PGP fee, domestic dates, other programmes' fees, some role inboxes. Nothing has been invented to fill them.</li>
        <li>The WP 745 explainer and the Hindi pages were drafted for this prototype. Neither has been reviewed by the authors or by IIMB's Official Language cell.</li>
        <li>Prof. Chetan Subramanian's structured profile uses his public IIMB page. He has not reviewed it, and no faculty consent or media opt-in has been collected.</li>
      </ul>
      <h2>Assets not available</h2><ul>
        <li><b>Logo.</b> The official IIMB logo is reproduced from iimb.ac.in (a 3366×558 PNG; no vector file is published). A reversed version, with the wordmark turned light and the red sun unchanged, is used on dark bands. The site's accent red (#B12322) is sampled from it. Brand masters and usage rules are still needed from IIMB.</li>
        <li><b>Commissioned photography.</b> The campus photographs are Creative Commons images from Wikimedia Commons (credits below). Faculty portraits are deliberately not used.</li>
        <li><b>Campus drawings.</b> The 12-bay grid is a proposal. Its proportion should be derived from Doshi's drawings.</li>
        <li><b>Licensed fonts.</b> Anek Latin, Anek Devanagari (Ek Type) and Martel are open-licence (SIL OFL) stand-ins, pending brand review.</li>
      </ul>
      <h2>Known limits</h2><ul>
        <li>Static prototype: the pages render from data files in the browser, so JavaScript is required. There is no CMS and no backend. The Executive Education form sends nothing.</li>
        <li>Event expiry uses the visitor's own clock. Add <code>?today=YYYY-MM-DD</code> to any address to preview another date.</li>
        <li>Only the PGP programme page and one faculty profile are fully populated. The other templates use real data at smaller scale.</li>
        <li>Hindi covers the homepage and the PGP page. Other pages lead to a notice instead.</li>
        <li>The Executive Education site was read through a JavaScript challenge using a headless browser. Its 10 nearest programmes are included, not all 43.</li>
      </ul>
      <h2 id="credits">Photo credits</h2><div id="credits-list"><p class="muted">Loading…</p></div>
    </div></section>`;
    const list = Object.entries(O().D.photos).map(([k, v]) => `<li><b>${v.place}</b>: ${v.credit}, via Wikimedia Commons</li>`).join("");
    main.querySelector("#credits-list").innerHTML = `<ul>${list}</ul><p class="small muted">Full source URLs and licence names: <code>assets/photos/credits.json</code>.</p>`;
  };
})();
