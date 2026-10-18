/* Centre page — each centre in its own colour within the system; CSITM in full */
(() => {
  const { I, $, $$, esc, icon, u } = J;

  const sec = (id, title, html, cls = "") => `<section class="section cn-sec ${cls}" id="${id}" aria-labelledby="${id}-h"><div class="wrap grid"><h2 class="h2 cn-h" id="${id}-h" data-split>${title}</h2><div class="cn-c">${html}</div></div></section>`;
  const matches = (c, text) => (c.match || []).some((m) => text.includes(m));

  function render() {
    const c = J.centre(J.param("id")) || J.centre("csitm");
    const style = I.centreStyle[c.id] || "cream";
    document.title = `${c.name} (${c.abbr}) — IIM Bangalore`;
    $("[data-cn-hero]").classList.add("cn-" + style);
    $("[data-cn-crumb]").textContent = c.abbr;
    $("[data-cn-abbr]").textContent = c.abbr;
    $("[data-cn-name]").textContent = c.name;
    const isCsitm = c.id === "csitm";
    $("[data-cn-kind]").innerHTML = `${esc(c.kind)}${isCsitm ? ` · founded ${I.csitm.founded}` : c.since ? ` · since ${esc(c.since)}` : ""}`;

    const events = I.events.filter((e) => matches(c, e.title + " " + e.host));
    const news = I.news.filter((n) => matches(c, n.title + " " + (n.standfirst || "")));
    const heroImg = isCsitm ? "csitm-summit" : null;
    $("[data-cn-plate]").innerHTML = heroImg ? `<span class="plate">${J.img(heroImg, { lazy: false })}</span><figcaption class="caption">${J.credit(heroImg)}</figcaption>`
      : news[0] && news[0].image ? `<span class="plate">${J.newsImg(news[0])}</span><figcaption class="caption">From “${esc(news[0].title)}”. Photo: IIM Bangalore.</figcaption>`
      : `<span class="plate">${J.img("columns", { lazy: false })}</span><figcaption class="caption">${J.credit("columns")}</figcaption>`;

    const chair = c.chairId && J.fac(c.chairId);
    const people = [...new Set([c.chairId, ...(c.people || []), ...(isCsitm ? I.csitm.people : [])].filter(Boolean))].filter(J.fac);
    const parts = [];
    const nav = [];
    const add = (id, label, html, cls) => { parts.push(sec(id, label, html, cls)); nav.push([id, label]); };

    add("about", "About", `<div class="cn-about">${(isCsitm ? I.csitm.overview : [c.about]).map((p, i) => `<p class="${i === 0 ? "lede" : ""}">${esc(p)}</p>`).join("")}
      ${isCsitm ? `<blockquote class="cn-vision"><p class="meta">Vision</p><p>${esc(I.csitm.vision)}</p></blockquote>` : ""}
      <p class="src">Source: <a class="ulink" href="${c.url}">${esc(c.abbr)} on iimb.ac.in</a>${isCsitm ? `, ${J.srcLink("csitmAbout", "About us")}` : ""}.</p></div>`);

    if (isCsitm) add("history", "Since 1998", `<p class="cn-hist">${esc(I.csitm.history)}</p>`, "on-white");

    const focus = isCsitm ? I.csitm.focus : c.areas;
    add("focus", "Focus areas", `<ol class="cn-focus" data-stagger>${focus.map((f, i) => `<li><span class="num">${String(i + 1).padStart(2, "0")}</span>${esc(f)}</li>`).join("")}</ol>
      ${c.groups ? `<h3 class="h4 sub-h">Research groups</h3><ul class="cn-groups">${c.groups.map((g) => `<li>${esc(g)}</li>`).join("")}</ul>` : ""}
      ${c.numbers ? `<dl class="facts cn-numbers">${c.numbers.map(([v, l]) => `<div class="fact"><dt class="v" data-count>${esc(v)}</dt><dd class="l">${esc(l)}</dd></div>`).join("")}</dl><p class="src">As stated on the centre’s official page.</p>` : ""}`);

    if (isCsitm) {
      add("activities", "What CSITM does", `<ul class="cn-acts" data-stagger>${I.csitm.activities.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>
        <h3 class="h4 sub-h">Collaborators</h3><ul class="cn-collab">${I.csitm.collaborators.map((x) => `<li>${x.u ? `<a class="ulink" href="${x.u}">${esc(x.t)}</a>` : esc(x.t)}</li>`).join("")}</ul>`, "on-white");
      const ups = I.csitm.upcoming.map((x) => { const e = x.eventId && J.story(x.eventId); return `<li class="cn-up"><a href="${e ? u.story(e.id) : x.u}"><span class="tag">${esc(x.kind)}</span><span class="cn-up-t">${esc(x.t)}</span><span class="small">${esc(x.d)}</span>${icon(e ? "arrow" : "arrow-up")}</a></li>`; }).join("");
      add("events", "Events", `<h3 class="meta">Coming up</h3><ol class="cn-ups">${ups}</ol>
        <h3 class="meta sub-h">Recently</h3><ol class="index-list cn-past">${I.csitm.past.map((x, i) => `<li><a class="index-row" href="${x.u}"><span class="n">${String(i + 1).padStart(2, "0")}</span><span class="t">${esc(x.t)}</span></a></li>`).join("")}</ol>
        <div class="cn-gallery">${I.csitm.imgs.slice(1).map((k) => `<figure><span class="plate" data-plate="up">${J.img(k, { want: 800, sizes: "(min-width: 1000px) 30vw, 90vw" })}</span><figcaption class="caption">${J.credit(k)}</figcaption></figure>`).join("")}</div>
        <p class="src">From ${J.srcLink("csitmEvents", "CSITM events")}.</p>`);
      add("research", "Research", `<h3 class="meta">Research themes</h3><ul class="cn-themes">${I.csitm.researchThemes.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        <h3 class="meta sub-h">Selected outputs</h3><ol class="cn-outputs">${I.csitm.outputs.map((o) => `<li><span class="num">${o.y}</span><span><span class="h4">${esc(o.t)}</span><br><span class="small mute">${esc(o.by)} · ${esc(o.where)}</span></span></li>`).join("")}</ol>
        <p class="src">From ${J.srcLink("csitmResearch", "CSITM research themes")}.</p>`, "on-white");
    } else if (events.length || news.length) {
      add("activity", "Recent activity", `${events.length ? `<h3 class="meta">Events</h3><ol class="cn-ups">${events.map((e) => `<li class="cn-up"><a href="${u.story(e.id)}"><span class="tag">${esc(e.kind)}</span><span class="cn-up-t">${esc(e.title)}</span><span class="small">${J.range(e.start, e.end)}</span>${icon("arrow")}</a></li>`).join("")}</ol>` : ""}
        ${news.length ? `<h3 class="meta sub-h">Stories</h3><div class="cn-news">${news.slice(0, 4).map((n) => `<a class="th-story" href="${u.story(n.id)}">${n.image ? `<span class="plate">${J.newsImg(n)}</span>` : ""}<span><span class="meta mute">${J.date(n.date)}</span><br><span class="h4">${esc(n.title)}</span></span></a>`).join("")}</div>` : ""}`, "on-white");
    }

    add("people", "People", people.length ? `<ul class="cn-people">${people.map((id) => { const f = J.fac(id); return `<li><a href="${u.person(id)}">${J.face(id, { cls: "cn-face" })}<span class="h4">${esc(f.name)}</span><span class="small mute">${id === c.chairId ? "Chairperson" : esc(f.title)}</span></a></li>`; }).join("")}</ul>${c.peopleNote ? `<p class="src">${esc(c.peopleNote)}</p>` : ""}${isCsitm ? `<p class="src">Faculty listed on ${J.srcLink("csitmPeople", "CSITM faculty support")}.</p>` : ""}`
      : `<p class="dek">The centre’s people are listed on its <a class="ulink" href="${c.url}">official page</a>.</p>`);

    add("contact", "Contact", `<div class="cn-contact">
      ${c.email ? `<p><span class="meta">Email</span><a class="h3 ulink" href="mailto:${c.email}">${esc(c.email)}</a></p>` : ""}
      ${isCsitm ? `<p><span class="meta">Telephone</span><a class="h3 ulink" href="tel:+918026993353">${I.csitm.phone}</a></p>` : ""}
      <p><span class="meta">Official page</span><a class="arrow-link" href="${c.url}"><span>${esc(c.url.replace(/^https?:\/\//, ""))}</span>${icon("arrow-up")}</a></p>
      <p><span class="meta">Address</span>Indian Institute of Management Bangalore, Bannerghatta Road, Bengaluru 560076</p></div>`, "on-burgundy");

    $("[data-cn-body]").innerHTML = parts.join("");
    $("[data-cn-sub]").innerHTML = `<div class="wrap cn-sub-in">${nav.map(([id, l]) => `<a href="#${id}" data-cn-link="${id}">${esc(l)}</a>`).join("")}<span class="cn-sub-ink" aria-hidden="true"></span></div>`;
    $("[data-cn-others]").innerHTML = I.centres.filter((x) => x.id !== c.id).map((x) => `<li class="cp cp-${I.centreStyle[x.id] || "cream"}"><a href="${u.centre(x.id)}"><span class="cp-abbr">${esc(x.abbr)}</span><span class="cp-name">${esc(x.name)}</span><span class="cp-kind">${esc(x.kind)}</span></a></li>`).join("");
    J.dragRail($("[data-cn-others]"));
  }

  function intro(delay) {
    const g = J.gsap; if (!g) return;
    const tl = g.timeline({ delay, defaults: { ease: J.ease } });
    tl.fromTo(".site-header", { autoAlpha: 0, y: -20 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0)
      .fromTo(".cn-hero", { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: "expo.inOut" }, 0)
      .fromTo(".cn-abbr", { yPercent: 105 }, { yPercent: 0, duration: 1.4 }, 0.45)
      .add(J.linesIn($(".cn-name"), { stagger: 0.07 }), 0.7)
      .fromTo(".cn-kind, .cn-id .crumbs", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.06 }, 0.9)
      .add(J.plateIn($(".cn-plate .plate"), { from: "right" }), 0.5)
      .fromTo(".cn-sub a", { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.04 }, 1.1);
    const ink = $(".cn-sub-ink");
    $$(".cn-sec").forEach((s) => ScrollTrigger.create({ trigger: s, start: "top 40%", end: "bottom 40%", onToggle: (st) => { if (!st.isActive) return; const a = $(`[data-cn-link="${s.id}"]`); $$("[data-cn-link]").forEach((x) => x.classList.toggle("on", x === a)); if (a) { ink.style.width = a.offsetWidth + "px"; ink.style.transform = `translateX(${a.offsetLeft}px)`; a.scrollIntoView({ block: "nearest", inline: "nearest" }); } } }));
    J.batchIn(".cn-ups li, .cn-people li, .cn-outputs li");
  }
  J.page(render, intro);
})();
