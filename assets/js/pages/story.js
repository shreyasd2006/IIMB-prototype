/* Story / event article */
(() => {
  const { I, $, $$, esc, icon, u } = J;
  const norm = (s) => s.replace(/^\s*\d{1,2}\s+\w+,?\s+\d{4},?\s*[^:]{0,40}:\s*/, "").replace(/\s+/g, " ").trim().toLowerCase();

  function render() {
    const id = J.param("id");
    const n = J.byId(I.news, id), ev = !n && J.byId(I.events, id);
    const s = n || ev || I.news[0];
    const isEvent = !!ev;
    document.title = `${s.title} — IIM Bangalore`;
    $("[data-art-crumb]").textContent = isEvent ? "Event" : s.category;
    $("[data-art-meta]").innerHTML = isEvent
      ? `<span class="tag solid">${esc(s.kind)}</span> <span>${J.range(s.start, s.end)}</span>`
      : `<span class="tag">${esc(s.category)}</span> <span>${J.date(s.date)}${s.place ? " · " + esc(s.place) : ""}</span>`;
    $("[data-art-title]").textContent = s.title;
    $("[data-art-dek]").textContent = s.standfirst || "";
    if (!s.standfirst) $("[data-art-dek]").remove();
    if (s.image) $("[data-art-plate]").innerHTML = `<span class="plate">${J.newsImg(s)}</span><figcaption class="caption">Photo: <a class="ulink" href="${s.image.source}">IIM Bangalore</a>, from the official story.</figcaption>`;
    else $("[data-art-plate]").remove();

    /* body: drop duplicated paragraphs (the source pages repeat the title and lead) */
    const seen = new Set([norm(s.title), norm(s.standfirst || "")]);
    const junk = (p) => /^read more$/i.test(p) || /^add to calendar$/i.test(p) || /^\d{4}-\d{2}-\d{2}/.test(p) || /^\d{1,2}\s+[A-Z][a-z]+,?\s+\d{4}$/.test(p.trim());
    const paras = s.body.map((b) => b.p).filter((p) => { const k = norm(p); if (!k || seen.has(k) || junk(p)) return false; seen.add(k); return true; });
    $("[data-art-text]").innerHTML = paras.map((p, i) => {
      if (p.length < 60 && !/[.!?:]$/.test(p)) return `<h2 class="h4 art-sub">${esc(p)}</h2>`;
      return `<p${i === 0 ? ' class="art-first"' : ""}>${esc(p)}</p>`;
    }).join("") + `<p class="src art-src">Source: <a class="ulink" href="${s.source}">the official story on iimb.ac.in</a>. Text reproduced from IIM Bangalore.</p>`;

    $("[data-art-side]").innerHTML = isEvent ? `<dl class="ev-card">
        <div><dt>${icon("cal")}When</dt><dd>${J.range(s.start, s.end)}${s.time ? `<br>${esc(s.time)}` : ""}</dd></div>
        <div><dt>${icon("pin")}Where</dt><dd>${s.time && /Q-|Classroom|Auditorium|campus/i.test(s.time) ? "IIM Bangalore campus" : "IIM Bangalore, Bannerghatta Road"}</dd></div>
        <div><dt>Host</dt><dd>${esc(s.host)}</dd></div>
        <div><dt>Announced</dt><dd>${J.date(s.announced)}</dd></div>
      </dl><a class="btn" href="${s.source}">Event page${icon("arrow-up")}</a>`
      : `<dl class="ev-card"><div><dt>Published</dt><dd>${J.date(s.date)}</dd></div><div><dt>Category</dt><dd><a class="ulink" href="news.html">${esc(s.category)}</a></dd></div>${s.place ? `<div><dt>Dateline</dt><dd>${esc(s.place)}</dd></div>` : ""}</dl>`;

    /* related: same category or kind, then latest */
    const pool = isEvent ? I.events.filter((e) => e.id !== s.id && e.kind === s.kind).concat(I.events.filter((e) => e.id !== s.id && e.kind !== s.kind)) : I.news.filter((x) => x.id !== s.id && x.category === s.category).concat(I.news.filter((x) => x.id !== s.id && x.category !== s.category));
    $("[data-art-rel]").innerHTML = pool.slice(0, 3).map((r) => `<a class="th-story" href="${u.story(r.id)}">${r.image ? `<span class="plate">${J.newsImg(r)}</span>` : `<span class="plate date-plate"><span class="dp-d">${+(r.start || r.date).slice(8)}</span><span class="dp-m">${J.months[+(r.start || r.date).slice(5, 7) - 1]} ${(r.start || r.date).slice(0, 4)}</span><span class="dp-k">${esc(r.kind || r.category)}</span></span>`}<span><span class="meta mute">${r.date ? J.date(r.date) : J.range(r.start, r.end)}</span><br><span class="h4">${esc(r.title)}</span></span></a>`).join("");
  }

  function intro(delay) {
    const g = J.gsap; if (!g) return;
    const tl = g.timeline({ delay, defaults: { ease: J.ease } });
    tl.fromTo(".site-header", { autoAlpha: 0, y: -20 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0)
      .fromTo(".art-head .crumbs, .art-kicker", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.06 }, 0.1)
      .add(J.linesIn($(".art-title"), { stagger: 0.07 }), 0.2)
      .fromTo(".art-dek", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.6);
    const plate = $(".art-plate .plate"); if (plate) tl.add(J.plateIn(plate, { from: "up" }), 0.5);
    g.fromTo(".art-side", { autoAlpha: 0, x: -20 }, { autoAlpha: 1, x: 0, duration: 0.9, ease: J.ease, delay: delay + 0.9 });
    J.batchIn(".art-text > *", { dur: 0.8 });
  }
  J.page(render, intro);
})();
