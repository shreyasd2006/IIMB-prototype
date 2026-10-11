/* Page renderers, part A: home, programmes (finder + comparison), programme, faculty, person. */
(function () {
  "use strict";
  const P = (window.IIMBPages = window.IIMBPages || {});
  const O = () => window.OC;

  /* ---------------- shared: corridor router ---------------- */
  function routesFor(stage) {
    const { D } = O();
    const deg = D.programmes.filter((p) => p.stage.includes(stage));
    const other = D.otherProgrammes.filter((p) => p.stage.includes(stage));
    return [...deg, ...other];
  }
  function routeCard(p) {
    const { esc, R, link, pending } = O();
    const isDeg = !!p.months;
    const href = isDeg ? `programme.html?id=${p.id}` : p.url;
    let fact = "";
    if (isDeg) {
      const fee = p.fee && !p.fee.pending ? `${p.fee.value} (${p.fee.batch})` : pending(p.fee || { label: "Fee" });
      fact = `<span class="fact">${esc(p.duration.split("·")[0].trim())} · ${esc(p.format)} · Experience: ${esc(p.expText)}</span><span class="fact">Fee: ${fee}</span>`;
    }
    return `<div class="route-card"><h3>${link(href, esc(p.short))}</h3><p>${esc(p.oneLine)}</p>${fact}</div>`;
  }
  function corridor(opts = {}) {
    const { D, esc, LANG } = O();
    const H = D.hi;
    const title = LANG === "hi" ? H.home.routerTitle : "Where are you starting from?";
    const hint = LANG === "hi" ? H.home.routerHint : "Choose a stage. The programmes that fit light up, each with its key facts.";
    return `<section class="corridor" aria-labelledby="router-h">
      <div class="corridor-head"><h2 id="router-h">${title}</h2><p class="small muted">${hint}</p></div>
      <div class="stages" role="group" aria-label="${esc(title)}">${D.stages.map((s, i) => `<button type="button" class="stage" style="--i:${i}" aria-pressed="false" data-stage="${s.id}" aria-controls="route"><b>${esc(LANG === "hi" ? H.stages[s.id] : s.label)}</b><span>${esc(s.sub)}</span></button>`).join("")}</div>
      <div class="route" id="route" hidden aria-live="polite"><div class="route-inner"></div></div>
    </section>`;
  }
  function wireCorridor(root) {
    const btns = root.querySelectorAll(".stage");
    const route = root.querySelector("#route");
    btns.forEach((b) => b.addEventListener("click", () => {
      const on = b.getAttribute("aria-pressed") === "true";
      btns.forEach((x) => x.setAttribute("aria-pressed", "false"));
      if (on) { route.hidden = true; return; }
      b.setAttribute("aria-pressed", "true");
      const cards = routesFor(b.dataset.stage).map(routeCard);
      route.querySelector(".route-inner").innerHTML = cards.join("") +
        `<div class="route-card"><h3>Not sure?</h3><p>Compare all four MBAs side by side, with eligibility, format, fees and dates.</p><a class="textlink" href="${O().R("programmes.html#compare")}">Compare programmes</a></div>`;
      route.hidden = false;
      route.querySelectorAll(".route-card").forEach((c, i) => c.style.setProperty("--i", i));
    }));
  }

  function rankingsList() {
    const { D, esc, link } = O();
    return `<ul class="rankings">${D.rankings.map((r) => `<li><b>${esc(r.rank)}</b><span>${esc(r.what)}</span><cite>${esc(r.by)} · ${link(D.sources[r.src].url, "source")}</cite></li>`).join("")}</ul>`;
  }
  P._rankingsList = rankingsList;

  /* ---------------- HOME ---------------- */
  P.home = function (main) {
    const { D, esc, R, link, beams, threshold, storyMeta, photo, caption, eventRow, isPast, fmtDate, LANG } = O();
    const H = D.hi.home, hi = LANG === "hi";
    const use = D.facts.ftCasesUse;
    const heroFacts = ["programmesRange", "ftCasesUse", "nationalImportance"];
    const srcShort = { about: "About IIMB", ft: "FT teaching-case report", arch: "Architecture" };
    const stories = ["ft-cases-2026", "dpi-report-2026", "water-case-2026"].map((id) => D.stream.find((s) => s.id === id));
    const leadImg = { "ft-cases-2026": "library" };
    const upcoming = D.stream.filter((s) => s.type === "event" && !isPast(s)).sort((a, b) => a.start.localeCompare(b.start)).slice(0, 4);
    const idea = D.stream.find((s) => s.id === "wp745");
    const ch = D.people.find((p) => p.id === "chetan-subramanian");
    const en = (s) => (hi ? `<span lang="en">${s}</span>` : s);
    const extAttr = (u) => (O().isExt(u) ? ' rel="noopener"' : "");
    const lead = stories[0];

    main.innerHTML = `
    <section class="band band--shade lead" aria-labelledby="lead-h">
      <div class="wrap"><div class="bays">
        <div class="lead-copy">
          <h1 id="lead-h">${hi ? esc(D.hi.instituteName) : "Indian Institute of Management Bangalore"}</h1>
          <p class="lead-line">${hi ? esc(H.positioning) : "Rigorous management thinking, tested on the questions India is working on: digital public goods, public policy, water, start-ups and capital markets."}</p>
          <ul class="lead-facts">
            ${(hi ? H.facts : heroFacts.map((k) => esc(D.facts[k].hero))).map((f) => `<li>${f}</li>`).join("")}
          </ul>
          <p class="lead-src">${hi ? "स्रोत" : "Sources"}: ${heroFacts.map((k) => link(D.sources[D.facts[k].src].url, esc(srcShort[D.facts[k].src] || D.sources[D.facts[k].src].title))).join(" · ")} · ${hi ? "11 अक्टूबर 2026 को जाँचे गए" : "checked 11 Oct 2026"}</p>
          <div class="lead-actions">
            <a class="btn btn--light" href="${R("programmes.html")}">${hi ? "कार्यक्रम देखें" : "Find your programme"}${O().icon.arrow}</a>
            <a class="textlink" href="${R("about.html")}">${hi ? "IIMB के बारे में (अंग्रेज़ी)" : "About IIMB"}</a>
          </div>
        </div>
        <figure class="lead-figure">${photo("corridor-pergola", 800, "", "eager")}<span class="slats" aria-hidden="true">${[0, 1, 2, 3, 4, 5].map((i) => `<i style="--i:${i}"></i>`).join("")}</span><figcaption><b>${esc(D.photos["corridor-pergola"].place)}</b> · Photo: ${esc(D.photos["corridor-pergola"].credit)}</figcaption></figure>
      </div>
      ${corridor()}
      </div>
    </section>

    <section class="band band--ground" aria-labelledby="stories-h">
      <div class="wrap">
        ${threshold(hi ? H.stories : "Now at IIMB", hi ? "" : `What's new across the programmes, centres and campus. ${link("news.html", "All news and events", "textlink")}`, "stories-h")}
        <div class="stories">
          <a class="story story--lead" href="${R(lead.url)}"${extAttr(lead.url)}>${photo(leadImg[lead.id] || lead.img, 800)}<h3>${hi ? en(esc(lead.title)) : `IIMB cases were used by ${esc(use.value)} institutions in close to 50 countries in ${esc(use.year)}`}</h3>${storyMeta(lead)}<p>${hi ? en(esc(lead.dek)) : `The Financial Times ranks IIMB ${esc(D.facts.ftCases.value)} in the world for teaching-case impact. Among the 2025 bestsellers: redBus (Prof. Shankhadeep Banerjee) and Bigbasket (Prof. U Dinesh Kumar).`}</p></a>
          <div class="story-col">${stories.slice(1).map((s) => `<a class="story" href="${R(s.url)}"${extAttr(s.url)}><h3>${en(esc(s.title))}</h3>${storyMeta(s)}<p>${en(esc(s.dek))}</p></a>`).join("")}</div>
        </div>
      </div>
    </section>

    <section class="band band--stone" aria-labelledby="events-h">
      <div class="wrap"><div class="cols">
        <div class="c-4">${threshold(hi ? H.events : "Coming up", "", "events-h")}
          <p class="muted" style="max-width:34ch">${hi ? "सेमिनार, सम्मेलन और कार्यशालाएँ।" : "Seminars, conferences and workshops on campus and with partners."}</p>
          <p style="margin-top:18px">${link("news.html?type=event", hi ? "सभी कार्यक्रम" : "All events, including past", "textlink")}</p></div>
        <div class="c-8"><ul class="events" aria-label="Upcoming events">${upcoming.map(eventRow).join("")}</ul></div>
      </div></div>
    </section>

    <section class="band band--shade" aria-labelledby="themes-h">
      <div class="wrap">
        <h2 id="themes-h" class="themes-title">${hi ? H.research : "From our research"}</h2>
        <a href="${R(idea.url)}" class="story idea-feature">
          <h3>${en(esc(idea.title))}</h3>
          <div class="meta"><span class="type">Idea</span><span class="dot" aria-hidden="true"></span><span>Featuring Prof. ${esc(ch.name)} with Arnab Biswas</span><span class="dot" aria-hidden="true"></span><span>IIMB Working Paper 745 · ${esc(idea.dateDisplay)}</span></div>
          <p>${en(esc(idea.dek))}</p>
        </a>
        <h3 class="themes-sub">${hi ? H.themes : "Four questions IIMB research keeps returning to"}</h3>
        <ul class="themes">${D.themes.map((t) => `<li class="theme-row"><a href="${esc(R(t.url))}"${extAttr(t.url)}><h3>${en(esc(t.name))}</h3><p>${en(esc(t.question))}</p><span class="go">${t.live ? "Theme page" : t.url.startsWith("http") ? "Partner site" : "Centre page"}${O().icon.arrow}</span></a></li>`).join("")}</ul>
      </div>
    </section>

    <section class="band band--ground" aria-labelledby="campus-h">
      <div class="wrap"><div class="campus">
        <figure>${photo("corridor-academic", 1600)}${caption("corridor-academic")}</figure>
        <div class="copy">
          <h2 id="campus-h">${hi ? H.campus : "A campus built as a conversation"}</h2>
          <p class="reading" style="font-size:1rem">${hi ? esc(H.campusText) : "B.V. Doshi's stone campus was completed in 1983 and modelled on Fatehpur Sikri. It is a network of corridors, courtyards and pergolas. The corridors are wide enough to sit in, so that academic exchange carries on beyond the classroom."}</p>
          <blockquote class="quote" style="font-size:1.15rem">“To create an atmosphere where you don't see divides and doors.”<footer>B.V. Doshi, on the aim of the IIMB design. Quoted on ${link("https://www.iimb.ac.in/about-institute/architecture", "IIMB's architecture page")}, checked 11 Oct 2026.</footer></blockquote>
          <p>${link("about.html#campus", hi ? "परिसर के बारे में" : "Campus, history and sustainability", "textlink")}</p>
        </div>
      </div></div>
    </section>

    <section class="band band--shade band--tight" aria-labelledby="proof-h">
      <div class="wrap"><div class="cols">
        <div class="c-4"><h2 id="proof-h" class="h3">${hi ? H.proof : "Rankings, with their sources"}</h2></div>
        <div class="c-8">${rankingsList()}</div>
      </div></div>
    </section>`;
    wireCorridor(main);
  };

  /* ---------------- PROGRAMMES: finder + comparison ---------------- */
  P.programmes = function (main) {
    const { D, esc, R, link, beams, pending, srcLine, threshold, fmtDate, params } = O();
    const progs = D.programmes;
    const intl = progs[0].dates;
    main.innerHTML = `
    <section class="band band--shade pagehead">${beams()}<div class="wrap"><div class="bays">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="${R("index.html")}">Home</a><span aria-hidden="true">/</span><span>Programmes</span></nav>
      <h1>Find a programme</h1>
      <p class="lede">IIMB awards an MBA through four programmes. Tell us your experience and how you want to study, and the best fit lights up. Compare them below on the facts that decide it.</p>
    </div></div></section>

    <section class="band band--ground band--tight" id="finder" aria-labelledby="finder-h"><div class="wrap">
      <h2 id="finder-h" class="visually-hidden">Programme finder</h2>
      <form class="filters" id="finder-form" onsubmit="return false">
        <div class="field"><label for="f-exp">Years of full-time work experience</label>
          <select id="f-exp">${["Any", ...Array.from({ length: 21 }, (_, i) => i)].map((v) => `<option value="${v}">${v === "Any" ? "Any" : v === 20 ? "20 or more" : v}</option>`).join("")}</select></div>
        <div class="field"><span class="micro" style="font-weight:600;color:var(--ink-2)" id="fmt-l">Format</span>
          <div class="seg" role="group" aria-labelledby="fmt-l">${[["any", "Any"], ["fulltime", "Full-time, residential"], ["weekend", "Weekends, keep my job"]].map(([v, l], i) => `<button type="button" data-fmt="${v}" aria-pressed="${i === 0}">${l}</button>`).join("")}</div></div>
        <div class="field"><span class="micro" style="font-weight:600;color:var(--ink-2)" id="dur-l">Length</span>
          <div class="seg" role="group" aria-labelledby="dur-l">${[["any", "Any"], ["12", "1 year"], ["24", "2 years"]].map(([v, l], i) => `<button type="button" data-dur="${v}" aria-pressed="${i === 0}">${l}</button>`).join("")}</div></div>
      </form>
      <p class="resultcount" id="f-count" aria-live="polite"></p>
      <div id="f-advice"></div>
    </div></section>

    <section class="band band--stone" id="compare" aria-labelledby="compare-h"><div class="wrap">
      ${threshold("Compare the four MBAs", "The highlighted columns match your choices above. Each row links back to the rules on the programme's own page.", "compare-h")}
      <div class="compare-wrap"><table class="compare" id="compare-table">
        <caption class="visually-hidden">Comparison of PGP, PGPBA, EPGP and PGPEM</caption>
        <colgroup><col>${progs.map((p) => `<col data-col="${p.id}">`).join("")}</colgroup>
        <thead><tr><td></td>${progs.map((p) => `<th scope="col">${esc(p.short)}<span>${esc(p.name)}</span><em class="fit" hidden>Best fit for your choices</em></th>`).join("")}</tr></thead>
        <tbody>
          ${row("Degree", (p) => esc(p.degree))}
          ${row("Length", (p) => esc(p.duration))}
          ${row("Format", (p) => esc(p.format))}
          ${row("Work experience", (p) => esc(p.expText))}
          ${row("Admission test", (p) => (typeof p.test === "string" ? esc(p.test) : p.test.pending ? pending({ label: "Test route", owner: p.test.owner }) : esc(p.test.value)))}
          ${row("Batch of 2026", (p) => (p.batch2026.pending ? pending({ label: "Batch size", owner: "Programme office" }) : esc(p.batch2026.value)))}
          ${row("Fee", (p) => (p.fee.pending ? pending(p.fee) : `<strong>${esc(p.fee.value)}</strong><br><span class="small muted">${esc(p.fee.batch)}</span><br>${pending(p.fee.next)}`))}
          ${row("Details", (p) => `<a class="textlink" href="${R(`programme.html?id=${p.id}`)}">${esc(p.short)} key facts</a>`)}
        </tbody></table></div>
      <p class="small muted" style="margin-top:14px">Sources: ${progs.map((p) => link(D.sources[p.src].url, D.sources[p.src].title)).join(" · ")}. Checked 11 Oct 2026. Square brackets mark facts IIMB has not yet published in one place.</p>
    </div></section>

    <section class="band band--ground" id="dates" aria-labelledby="dates-h"><div class="wrap"><div class="cols">
      <div class="c-5">${threshold("Admissions 2027: important dates", "")}
        <p class="muted">Dates come from the facts register and say which batch they apply to. Where IIMB has not yet published a date as a page, it shows as a placeholder rather than a guess.</p>
        <p style="margin-top:20px"><a class="btn btn--ink" href="${esc(progs[0].applyUrl)}" rel="noopener">Apply to PGP 2027–29${O().icon.ext}<span class="visually-hidden"> (application portal, external)</span></a></p></div>
      <div class="c-7"><table class="dates"><caption class="visually-hidden">PGP 2027–29 dates</caption><tbody>
        ${intl.map((d) => `<tr><th scope="row">PGP: ${esc(d.label)}</th><td>${d.value ? fmtDate(d.value) : d.text ? esc(d.text) : pending({ label: d.label, owner: d.owner })}${d.link ? ` · ${link(d.link, "iimcat.ac.in")}` : ""}</td></tr>`).join("")}
        <tr><th scope="row">BSc (Hons) Data Sciences and Economics, 2027 entry</th><td>Applications 17 Aug – 15 Oct 2026</td></tr>
        <tr><th scope="row">PGPBA, EPGP, PGPEM 2027 deadlines</th><td>${pending({ label: "Deadlines", owner: "each programme's admissions office" })}</td></tr>
      </tbody></table>${srcLine("pgpIntl")}</div>
    </div></div></section>`;

    function row(label, fn) { return `<tr><th scope="row">${label}</th>${progs.map((p) => `<td data-col="${p.id}">${fn(p)}</td>`).join("")}</tr>`; }

    const state = { exp: params.get("exp") || "Any", fmt: "any", dur: "any" };
    const expSel = main.querySelector("#f-exp");
    expSel.value = state.exp;
    const match = (p) => (state.exp === "Any" || Number(state.exp) >= p.minExpYears) && (state.fmt === "any" || p.formatKey === state.fmt) && (state.dur === "any" || String(p.months) === state.dur);
    function update() {
      const hits = progs.filter(match);
      // best fit: with 5+ years, the programmes built for experienced professionals; otherwise every eligible programme
      const exp = state.exp === "Any" ? null : Number(state.exp);
      const seasoned = hits.filter((p) => p.minExpYears >= 5);
      const fit = exp !== null && exp >= 5 && seasoned.length ? seasoned : hits.length < progs.length ? hits : [];
      const isFit = (id) => fit.some((h) => h.id === id);
      main.querySelectorAll("#compare-table col[data-col]").forEach((c) => c.classList.toggle("is-match", isFit(c.dataset.col)));
      main.querySelectorAll("#compare-table td[data-col], #compare-table thead th").forEach((td, i) => {
        const id = td.dataset.col || progs[i] && progs[i].id;
        td.classList.toggle("dim", fit.length > 0 && !isFit(id));
        td.classList.toggle("is-fit", isFit(id));
      });
      main.querySelectorAll("#compare-table thead th").forEach((th, i) => th.querySelector(".fit") ? (th.querySelector(".fit").hidden = !isFit(progs[i].id)) : null);
      main.querySelector("#f-count").textContent = `${hits.length} of ${progs.length} MBA programmes match.`;
      const adv = main.querySelector("#f-advice");
      if (!hits.length) { adv.innerHTML = `<div class="empty"><h3>No MBA matches that combination</h3><p class="muted">Try “Any” for length or format. With fewer than five years' experience, the one-year EPGP and weekend PGPEM aren't open to you yet; PGP and PGPBA are.</p></div>`; return; }
      adv.innerHTML = `<div class="route-inner" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:0;border-top:1px solid var(--rule)">${hits.map((p) => `
        <div style="padding:20px 20px 22px 0;border-bottom:1px solid var(--rule);display:grid;gap:6px;align-content:start">
          <h3 style="font-size:1.6rem;font-stretch:80%">${link(`programme.html?id=${p.id}`, esc(p.short))}</h3>
          <p>${esc(p.oneLine)}</p>
          <p class="small muted">${esc(p.duration)} · ${esc(p.format)}</p>
        </div>`).join("")}</div>
        ${advice(hits)}`;
    }
    function advice(hits) {
      const ids = hits.map((h) => h.id);
      if (state.exp !== "Any" && ids.includes("epgp") && ids.includes("pgpem")) return `<p class="notice" style="margin-top:20px"><b>EPGP or PGPEM?</b> Both are open to you. EPGP is one year, full time and residential: you step away from work, and it includes a two-week international immersion. PGPEM runs on weekends over two to five years, so you keep your job. ${link("#compare", "See them side by side", "textlink")}.</p>`;
      return "";
    }
    expSel.addEventListener("change", () => { state.exp = expSel.value; update(); });
    main.querySelectorAll("[data-fmt]").forEach((b) => b.addEventListener("click", () => { state.fmt = b.dataset.fmt; main.querySelectorAll("[data-fmt]").forEach((x) => x.setAttribute("aria-pressed", String(x === b))); update(); }));
    main.querySelectorAll("[data-dur]").forEach((b) => b.addEventListener("click", () => { state.dur = b.dataset.dur; main.querySelectorAll("[data-dur]").forEach((x) => x.setAttribute("aria-pressed", String(x === b))); update(); }));
    update();
  };

  /* ---------------- PROGRAMME PAGE ---------------- */
  P.programme = function (main) {
    const { D, esc, R, link, beams, pending, srcLine, fmtDate, params, barChart, person, LANG } = O();
    const id = params.get("id") || "pgp";
    const p = D.programmes.find((x) => x.id === id) || D.programmes[0];
    if (LANG === "hi") return P.programmeHi(main, p);
    document.title = `${p.short}: ${p.name} | IIMB prototype`;
    const full = p.id === "pgp";
    const testText = typeof p.test === "string" ? esc(p.test) : p.test.pending ? pending({ label: "Admission test", owner: p.test.owner }) : esc(p.test.value);
    const kfs = [
      ["Degree", `<strong>${esc(p.degree)}</strong>`],
      ["Length", `<strong>${esc(p.months === 12 ? "1 year" : "2 years")}</strong>${esc(p.duration)}`],
      ["Format", `<strong>${esc(p.format.split(",")[0])}</strong>${esc(p.format)}`],
      ["Batch of 2026", p.batch2026.pending ? pending({ label: "Batch size", owner: "Programme office" }) : `<strong>${esc(p.batch2026.value.split(" ")[0])}</strong>students enrolled${srcLine(p.batch2026.src)}`],
      ["Fee", p.fee.pending ? pending(p.fee) : `<strong>${esc(p.fee.value)}</strong>${esc(p.fee.batch)}. ${pending(p.fee.next)}${srcLine(p.fee.src)}`],
      ["Work experience", `<strong>${esc(p.expText)}</strong>`],
      ["Admission route", `${testText}${full ? srcLine("pgpProcess") : ""}`],
      ["Applications", full ? `<strong>Close ${fmtDate("2027-01-14")}</strong>for international applicants. Domestic: ${pending({ label: "Window", owner: "Admissions" })}${srcLine("pgpIntl")}` : pending({ label: "Deadline", owner: "Admissions" })]
    ];
    if (full) {
      kfs.push(["Eligibility", `${esc(p.eligibility.value)}${srcLine(p.eligibility.src)}`]);
      // three full rows: four single facts / fee + eligibility (wide) / experience, route, applications (wide)
      const order = ["Degree", "Length", "Format", "Batch of 2026", "Fee", "Eligibility", "Work experience", "Admission route", "Applications"];
      kfs.sort((x, y) => order.indexOf(x[0]) - order.indexOf(y[0]));
      kfs.forEach((k) => { k[2] = ["Fee", "Eligibility", "Applications"].includes(k[0]) ? "wide" : undefined; });
    }

    const jump = full ? [["key-facts", "Key facts"], ["admissions", "Admissions"], ["profile", "Class profile"], ["outcomes", "Outcomes"], ["people", "People"], ["faq", "FAQs"]] : [["key-facts", "Key facts"], ["next", "What's next"]];
    main.innerHTML = `
    <section class="band band--shade pagehead">${beams()}<div class="wrap"><div class="bays">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="${R("index.html")}">Home</a><span aria-hidden="true">/</span><a href="${R("programmes.html")}">Programmes</a><span aria-hidden="true">/</span><span>${esc(p.short)}</span></nav>
      <h1>${esc(p.name)} <span style="color:var(--noon)">(${esc(p.short)})</span></h1>
      <p class="lede">${esc(p.oneLine)}</p>
      <div class="aside"><a class="btn btn--light" href="${esc(p.applyUrl)}" rel="noopener">Apply${full ? " to PGP 2027–29" : ""}${O().icon.ext}<span class="visually-hidden"> (external)</span></a><p class="micro muted" style="margin-top:8px">${full ? "Domestic applicants need a CAT 2026 score" : "Admissions details on IIMB's current site"}</p></div>
    </div></div></section>

    <div class="jumpbar" id="jumpbar"><div class="wrap"><nav aria-label="On this page"><ul>${jump.map(([h, l]) => `<li><a href="#${h}">${l}</a></li>`).join("")}</ul></nav>
      <div class="apply"><a class="btn btn--light" href="${esc(p.applyUrl)}" rel="noopener">Apply${O().icon.ext}<span class="visually-hidden"> (external)</span></a></div></div></div>

    <section class="keyfacts sources-hidden" id="key-facts" aria-labelledby="kf-h"><div class="wrap">
      <h2 id="kf-h" class="visually-hidden">Key facts</h2>
      <dl class="kf-grid">${kfs.map(([t, v, w]) => `<div class="kf${w ? " kf--wide" : ""}"><dt>${t}</dt><dd>${v}</dd></div>`).join("")}</dl>
      <div class="kf-foot"><span>${full ? "Each fact shows its source and the date it was checked." : "Facts IIMB currently publishes for this programme. Items in square brackets are still to be confirmed."}</span>
        <button type="button" class="linkbtn" aria-pressed="false" id="src-toggle">Show sources for these facts</button></div>
    </div></section>

    <div class="wrap" id="sections">${full ? pgpSections() : `<section class="section" id="next"><div class="cols"><div class="c-7">
      <h2 class="h3">What this prototype covers for ${esc(p.short)}</h2>
      <p class="reading">The template is the same as the ${link("programme.html?id=pgp", "PGP page")}: key facts first, then admissions, class profile, outcomes, people and FAQs. Only the PGP page is fully populated. For ${esc(p.short)}, the facts above are the ones IIMB publishes today, and the rest of the content is on ${link(D.sources[p.src].url, "the current programme page")}.</p>
      ${p.id === "epgp" ? `<div style="margin-top:28px">${outcomeEpgp()}</div>` : ""}</div></div></section>`}</div>

    <div class="actionbar" role="region" aria-label="Apply"><p><b>${esc(p.short)} ${full ? "2027–29" : ""}</b>${full ? "Apply with CAT 2026" : esc(p.format)}</p><a class="btn btn--light" href="${esc(p.applyUrl)}" rel="noopener">Apply<span class="visually-hidden"> (external)</span></a></div>`;
    document.body.classList.add("has-actionbar");

    const tog = main.querySelector("#src-toggle");
    tog.addEventListener("click", () => {
      const kf = main.querySelector(".keyfacts");
      const on = kf.classList.toggle("sources-hidden");
      tog.setAttribute("aria-pressed", String(!on));
      tog.textContent = on ? "Show sources for these facts" : "Hide sources";
    });
    // jump bar: mark the section in view
    const links = [...main.querySelectorAll(".jumpbar a")];
    const io = new IntersectionObserver((ents) => ents.forEach((e) => { if (e.isIntersecting) links.forEach((a) => a.setAttribute("aria-current", String(a.getAttribute("href") === "#" + e.target.id))); }), { rootMargin: "-45% 0px -50% 0px" });
    jump.forEach(([h]) => { const el = main.querySelector("#" + h); if (el) io.observe(el); });

    function outcomeEpgp() {
      const e = D.outcomes.epgp;
      return `<h3 class="h3">Placements, ${esc(e.cohort)}</h3><div class="figures"><div><b>Rs ${e.median} lakh</b><span>median salary a year</span></div><div><b>${e.accepted}</b><span>offers accepted, from ${e.students} students</span></div><div><b>${e.companies}</b><span>companies</span></div></div>${srcLine("placement")}`;
    }

    function pgpSections() {
      const S = D.pgpSelection, PR = D.pgpProfile, OUT = D.outcomes.pgp;
      const chair = person(p.chair);
      return `
      <section class="section" id="admissions" aria-labelledby="adm-h"><div class="cols">
        <div class="c-5"><h2 id="adm-h" style="font-size:var(--t-h2)">How to apply</h2>
          <p class="muted" style="margin-top:12px">${esc(p.howToApply)}</p></div>
        <div class="c-7"><ol class="agenda" style="list-style:none">
          ${[["Take CAT 2026", "Your score must be valid on the day you submit, with a positive raw score in every section."], ["Apply to IIMB online", "Upload your transcripts and certificates, and name two referees. They submit their references online before the deadline."], ["First shortlist", "Candidates who clear the minimum percentiles get a pre-interview score. CAT counts for 55 of the 100 points."], ["Written Ability Test and Personal Interview", "Both on the same day and at the same place. The WAT takes about 30 minutes."], ["Offer", "Offers are made strictly on post-interview scores, within each category. IIMB follows the law on EWS, NC-OBC, SC, ST and PwD reservation."]].map(([t, d], i) => `<li style="display:grid;grid-template-columns:44px 1fr;gap:4px 12px"><b style="font-size:1.6rem;font-stretch:78%;line-height:1">${i + 1}</b><div><b>${t}</b><p class="small muted">${d}</p></div></li>`).join("")}
        </ol>${srcLine("pgpProcess")}</div>
        <div class="c-6">${barChart({ title: "How you're scored before the interview", sub: "Points out of 100, pre-interview stage", rows: S.prePI, unit: "", total: 100, max: 55, srcKey: "pgpProcess" })}</div>
        <div class="c-6">${barChart({ title: "How you're scored for the final offer", sub: "Points out of 100, after the interview", rows: S.postPI, unit: "", total: 100, max: 55, srcKey: "pgpProcess" })}</div>
        <div class="c-12"><h3 class="h3">Minimum CAT percentiles for the first shortlist</h3><p class="small muted" style="max-width:70ch;margin-bottom:12px">${esc(S.cutoffs.note)}</p>
          <div class="compare-wrap" style="border-top-width:1px"><table class="datatable" style="min-width:520px"><thead><tr><th scope="col">Category</th>${S.cutoffs.cols.map((c) => `<th scope="col" class="n">${c}</th>`).join("")}</tr></thead><tbody>${S.cutoffs.rows.map((r) => `<tr><th scope="row" style="font-weight:600">${r[0]}</th>${r.slice(1).map((v) => `<td class="n">${v}</td>`).join("")}</tr>`).join("")}</tbody></table></div>${srcLine("pgpProcess")}</div>
      </div></section>

      <section class="section" id="profile" aria-labelledby="prof-h"><div class="cols">
        <div class="c-12"><h2 id="prof-h" style="font-size:var(--t-h2)">The batch of 2026</h2></div>
        <div class="c-12"><div class="figures"><div><b>${PR.total}</b><span>students</span></div><div><b>${PR.female}</b><span>women</span></div><div><b>${PR.male}</b><span>men</span></div><div><b>20</b><span>hold CA, CS or ICWA</span></div><div><b>${PR.gmatIntl.median}</b><span>median GMAT, international candidates</span></div></div>${srcLine("pgp")}</div>
        <div class="c-4">${barChart({ title: "First degree", sub: "Students by bachelor's discipline", rows: PR.discipline, total: PR.total })}</div>
        <div class="c-4">${barChart({ title: "Work experience before joining", sub: "Students by months of experience", rows: PR.experience, total: 606 })}</div>
        <div class="c-4">${barChart({ title: "Age", sub: "Students by age band", rows: PR.age, total: 561 })}</div>
        <div class="c-12"><p class="small muted">The PGP page's own tables do not add up to 540 for work experience (606) or age (561). The figures are shown as published and flagged for the facts register: ${O().pending({ label: "Batch profile totals", owner: "PGP Office" })}</p></div>
      </div></section>

      <section class="section" id="outcomes" aria-labelledby="out-h"><div class="cols">
        <div class="c-12"><h2 id="out-h" style="font-size:var(--t-h2)">Where the last batch went</h2><p class="muted" style="margin-top:10px">Final placements, ${esc(OUT.cohort)} (PGP and PGPBA together, as IIMB reports them).</p></div>
        <div class="c-5"><div class="figures" style="grid-template-columns:1fr 1fr"><div><b>Rs ${OUT.median} lakh</b><span>median salary a year</span></div><div><b>Rs ${OUT.average} lakh</b><span>average salary a year</span></div><div><b>${OUT.offers}</b><span>offers for ${OUT.students} students</span></div><div><b>${OUT.companies}</b><span>companies</span></div></div>
          <p class="small muted" style="margin-top:12px">Pre-placement offers: ${esc(OUT.ppo)}. Summer placements for the 2025–27 batch: ${D.outcomes.summer.offers} offers from ${D.outcomes.summer.companies} companies.</p>${srcLine("placement")}</div>
        <div class="c-7">${barChart({ title: "Final offers by sector", sub: "Share of offers, %", rows: OUT.sectors, unit: "%", srcKey: "placement" })}</div>
      </div></section>

      <section class="section" id="people" aria-labelledby="ppl-h"><div class="cols">
        <div class="c-12"><h2 id="ppl-h" style="font-size:var(--t-h2)">People you'll deal with</h2></div>
        <div class="c-4 sidebox"><h3 class="h3" style="margin:0">Programme chair</h3><p><a href="${esc(chair.url)}" rel="noopener"><b>Prof. ${esc(chair.name)}</b><span class="visually-hidden"> (IIMB profile, external)</span></a></p><p class="muted">Chairperson, PGP and PGPBA · ${esc(chair.area)}${chair.expertise.length ? " · " + esc(chair.expertise.join(", ")) : ""}</p></div>
        ${p.contacts.map((c) => `<div class="c-4 sidebox"><h3 class="h3" style="margin:0">${esc(c.role)}</h3><p><a href="mailto:${c.email}">${c.email}</a></p><p class="muted">${esc(c.phone)}</p></div>`).join("")}
        <div class="c-8"><blockquote class="quote">“The sheer number of opportunities, academic or otherwise, gives you a breadth of choice to build your dream career. And, the greatest treasure of all would be the people you meet here.”<footer>Chandrasekar T, PGP 2019–21. Testimonial published on the ${link("https://www.iimb.ac.in/programmes/pgp", "PGP page")}.</footer></blockquote></div>
      </div></section>

      <section class="section" id="faq" aria-labelledby="faq-h"><div class="cols">
        <div class="c-4"><h2 id="faq-h" style="font-size:var(--t-h2)">Questions applicants ask</h2></div>
        <div class="c-8">${D.pgpFaq.map((f) => `<details style="border-bottom:1px solid var(--rule);padding:16px 0"><summary style="cursor:pointer;font-weight:600;font-size:1.1rem">${esc(f.q)}</summary><p class="reading" style="margin-top:10px">${esc(f.a)}</p>${srcLine(f.src)}</details>`).join("")}</div>
      </div></section>`;
    }
  };

  /* ---------------- FACULTY DIRECTORY + EXPERT FINDER ---------------- */
  P.faculty = function (main) {
    const { D, esc, R, link, beams, params, personHref, srcLine } = O();
    const areas = [...new Set(D.people.map((p) => p.area))].sort();
    const tags = [...new Set(D.people.flatMap((p) => p.expertise))].sort();
    const withTags = D.people.filter((p) => p.expertise.length).length;
    main.innerHTML = `
    <section class="band band--shade pagehead">${beams()}<div class="wrap"><div class="bays">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="${R("index.html")}">Home</a><span aria-hidden="true">/</span><span>Faculty & Experts</span></nav>
      <h1>Faculty and experts</h1>
      <p class="lede">${D.people.length} faculty across ${areas.length} academic areas. Search by name or by what they work on.</p>
      <div class="aside notice" id="media-office" style="text-align:left;max-width:22rem"><b style="color:var(--on-shade)">Journalists</b><br>For an expert or an official statement, contact the ${esc(D.mediaContact.role)}: <a href="mailto:${D.mediaContact.email}">${D.mediaContact.email}</a></div>
    </div></div></section>
    <section class="band band--ground band--tight"><div class="wrap">
      <form class="filters" id="filters" role="search" onsubmit="return false">
        <div class="field field--grow"><label for="q">Name or expertise</label><input type="search" id="q" placeholder="Try “monetary”, “digital public goods” or a name" autocomplete="off"></div>
        <div class="field"><label for="area">Area</label><select id="area"><option value="">All areas</option>${areas.map((a) => `<option>${esc(a)}</option>`).join("")}</select></div>
        <div class="field"><label for="theme">Theme</label><select id="theme"><option value="">All themes</option>${D.themes.map((t) => `<option value="${t.id}">${esc(t.name)}</option>`).join("")}</select></div>
        <div class="field"><label for="tag">Expertise</label><select id="tag"><option value="">Any expertise</option>${tags.map((t) => `<option>${esc(t)}</option>`).join("")}</select></div>
        <label class="check"><input type="checkbox" id="media"> Recently in the media</label>
      </form>
      <p class="resultcount" id="count" aria-live="polite"></p>
      <ul class="people" id="list"></ul>
      <p class="small muted" style="margin-top:28px;max-width:80ch">Expertise is shown where IIMB has published it. ${withTags} of ${D.people.length} profiles have it so far. “Recently in the media” lists faculty whose commentary appears in the Media Room. For anything else, the ${esc(D.mediaContact.role)} can point you to the right person.</p>
      <p class="small muted">Sources: the 11 IIMB area faculty pages (checked 11 Oct 2026), ${link(D.sources.econ.url, "Economics specialisations")}, ${link(D.sources.cdpg.url, "CDPG team")}, ${link(D.sources.media.url, "Media Room")}.</p>
    </div></section>`;
    const $ = (s) => main.querySelector(s);
    $("#q").value = params.get("q") || "";
    $("#area").value = params.get("area") || "";
    $("#theme").value = params.get("theme") || "";
    $("#media").checked = params.get("media") === "1";
    const STOP = new Set(["expert", "experts", "on", "in", "and", "the", "for", "who", "works", "prof", "professor", "of"]);
    function score(p, q) {
      const words = q.split(/[\s-]+/).filter((w) => w.length > 1 && !STOP.has(w));
      if (!words.length) { p._tier = 1; return 1; }
      const exp = p.expertise.join(" ").toLowerCase(), rest = [p.name, p.area, ...(p.roles || [])].join(" ").toLowerCase();
      const name = p.name.toLowerCase();
      const strong = words.filter((w) => exp.includes(w) || name.includes(w)).length;
      const any = words.filter((w) => exp.includes(w) || name.includes(w) || rest.includes(w)).length;
      // tier 1: every word in expertise or name; 2: every word anywhere; 3: some word in expertise or name; 4: some word anywhere
      p._tier = strong === words.length ? 1 : any === words.length ? 2 : strong > 0 ? 3 : 4;
      const full = (exp + " " + rest).includes(q) ? 3 : 0;
      return words.reduce((n, w) => n + (exp.includes(w) || name.includes(w) ? 2 : rest.includes(w) ? 1 : 0), full);
    }
    const hl = (s, q) => (q ? esc(s).replace(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "ig"), "<mark>$1</mark>") : esc(s));
    function render() {
      const q = $("#q").value.trim().toLowerCase(), area = $("#area").value, theme = $("#theme").value, tag = $("#tag").value, media = $("#media").checked;
      let res = D.people.filter((p) => {
        if (area && p.area !== area) return false;
        if (theme && !(p.themes || []).includes(theme)) return false;
        if (tag && !p.expertise.includes(tag)) return false;
        if (media && !p.media) return false;
        if (q) { p._score = score(p, q); if (!p._score) return false; }
        return true;
      });
      if (q && res.length) { const best = Math.min(...res.map((p) => p._tier)); res = res.filter((p) => p._tier === best); }
      // best matches first: expertise counts double
      if (q) res.sort((a, b) => b._score - a._score);
      $("#count").textContent = `${res.length} ${res.length === 1 ? "person" : "people"}`;
      const qq = $("#q").value.trim();
      $("#list").innerHTML = res.length ? res.map((p) => `<li class="person">
        <h3><a href="${esc(personHref(p))}"${D.profiles[p.id] ? "" : ' rel="noopener"'}>${hl(p.name, qq)}</a>${D.profiles[p.id] ? "" : '<span class="visually-hidden"> (IIMB profile, external)</span>'}</h3>
        <p class="role">${esc(p.title ? p.title + ", " : "")}${esc(p.area)}${p.roles ? " · " + esc(p.roles[0]) : ""}</p>
        ${p.expertise.length ? `<div class="chips">${p.expertise.map((t) => `<button type="button" class="chip" data-tag="${esc(t)}">${hl(t, qq)}</button>`).join("")}</div>` : `<span class="nogap">Expertise not yet published</span>`}
        ${p.media ? `<p class="micro"><span class="chip chip--media">In the media</span> ${esc(p.media.title)}${p.media.outlet ? ", " + esc(p.media.outlet) : ""} · ${O().fmtDate(p.media.date)}</p>` : ""}
      </li>`).join("") : `<li class="empty" style="grid-column:1/-1"><h3>No one matches yet</h3><p class="muted">Most profiles don't have expertise tags yet. Try a broader word, choose an area instead, or ask the ${esc(D.mediaContact.role)} at <a href="mailto:${D.mediaContact.email}">${D.mediaContact.email}</a>.</p></li>`;
      main.querySelectorAll("[data-tag]").forEach((b) => b.addEventListener("click", () => { $("#tag").value = b.dataset.tag; render(); }));
    }
    ["#q", "#area", "#theme", "#tag", "#media"].forEach((s) => $(s).addEventListener(s === "#q" ? "input" : "change", render));
    render();
  };

  /* ---------------- PERSON ---------------- */
  P.person = function (main) {
    const { D, esc, R, link, beams, params, fmtDate } = O();
    const id = params.get("id") || "chetan-subramanian";
    const p = O().person(id);
    const prof = D.profiles[id];
    if (!p || !prof) { main.innerHTML = `<section class="band band--shade pagehead">${beams()}<div class="wrap"><div class="bays"><h1>Profile not in this prototype</h1><p class="lede">Only one structured profile is built. ${p ? link(p.url, "See the current IIMB profile") : link("faculty.html", "Back to the directory")}</p></div></div></section>`; return; }
    document.title = `Prof. ${p.name} | IIMB prototype`;
    main.innerHTML = `
    <section class="band band--shade pagehead">${beams()}<div class="wrap"><div class="bays">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="${R("index.html")}">Home</a><span aria-hidden="true">/</span><a href="${R("faculty.html")}">Faculty & Experts</a><span aria-hidden="true">/</span><span>${esc(p.name)}</span></nav>
      <h1>Prof. ${esc(p.name)}</h1>
      <p class="lede">${esc(p.title)} of ${esc(p.area)} · Dean (Faculty), 2020–2023</p>
      <div class="aside"><a class="btn btn--light" href="mailto:${prof.email}">Email Prof. Subramanian</a></div>
    </div></div></section>
    <section class="band band--ground"><div class="wrap">
      <p class="notice" style="margin-bottom:40px">This profile was assembled from Prof. Subramanian's public IIMB page (${link(prof.src, "source")}, checked 11 Oct 2026) to show the structured template. He has not reviewed it. A live version needs his consent, and its outputs should be fed from the publications database.</p>
      <div class="profile-grid">
        <div class="profile-main">
          <h2 class="h3">Works on</h2>
          <div class="chips" style="margin-bottom:36px">${p.expertise.map((t) => `<a class="chip" href="${R("faculty.html?q=" + encodeURIComponent(t))}" style="text-decoration:none;font-size:.95rem;padding:6px 12px">${esc(t)}</a>`).join("")}</div>
          <div class="reading">${prof.summary.map((s) => `<p>${esc(s)}</p>`).join("")}</div>
          <h2 class="h3" style="margin-top:48px">Recent outputs</h2>
          <ul class="outputs">${prof.outputs.map((o) => `<li><span class="yr">${o.year}</span><div><p class="ot">${o.link ? link(o.link, esc(o.title)) : esc(o.title)}</p><p class="ov">${esc(o.authors)} · <i>${esc(o.venue)}</i> · ${esc(o.kind)}</p>
            ${o.explainer ? `<p class="micro" style="margin-top:4px"><span class="chip chip--media">Explainer</span> Read the finding in plain language</p>` : `<p class="micro muted">DOI: ${O().pending({ label: "DOI", owner: "the publications feed" })}</p>`}</div></li>`).join("")}</ul>
        </div>
        <aside class="profile-side" aria-label="Profile details">
          <div class="sidebox"><h2>Contact</h2><p><a href="mailto:${prof.email}">${prof.email}</a></p><p class="muted">For media requests, contact the ${esc(D.mediaContact.role)}: <a href="mailto:${D.mediaContact.email}">${D.mediaContact.email}</a></p></div>
          <div class="sidebox"><h2>Media availability</h2><p class="muted">${O().pending({ label: "Opt-in", owner: "Prof. Subramanian" })} Shown here once he chooses to be listed as available for media.</p></div>
          <div class="sidebox"><h2>Teaches</h2>${prof.teaching.map((t) => `<p>${esc(t)}</p>`).join("")}</div>
          <div class="sidebox"><h2>Education</h2>${prof.education.map((t) => `<p>${esc(t)}</p>`).join("")}</div>
          <div class="sidebox"><h2>Portrait</h2><p class="muted">${esc(prof.photoNote)}</p></div>
        </aside>
      </div>
    </div></section>`;
  };
})();
