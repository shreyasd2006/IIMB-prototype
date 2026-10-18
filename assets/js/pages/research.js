/* Research — Ideas in Focus */
(() => {
  const { I, $, $$, esc, icon, u } = J;
  const THEME_IMG = { markets: "library-hall", society: "diversity", digital: "film-classroom", strategy: "corridor", operations: "pergola-light" };
  const WP = I.publications.workingPapers, JA = I.publications.journalArticles;
  const state = { tab: "wp", q: "", theme: "all", all: false };

  const themeStats = (th) => ({
    papers: WP.filter((p) => J.themesOf(p.title).includes(th.id)).length + JA.filter((p) => J.themesOf(p.title).includes(th.id)).length,
    faculty: J.facultyInTheme(th).length,
    stories: I.news.filter((n) => J.themesOf(n.title + " " + (n.standfirst || "")).includes(th.id)).length,
  });

  function render() {
    /* theme index */
    $("[data-theme-index]").innerHTML = I.themes.map((th, i) => {
      const s = themeStats(th);
      return `<li><a class="ti-row" href="${u.theme(th.id)}" data-peek="${J.src(THEME_IMG[th.id], 800)}">
        <span class="ti-n num">${String(i + 1).padStart(2, "0")}</span>
        <span class="ti-t">${esc(th.t)}</span>
        <span class="ti-d">${esc(th.d)}</span>
        <span class="ti-s"><span><b class="num">${s.papers}</b> papers</span><span><b class="num">${s.faculty}</b> faculty</span><span><b class="num">${s.stories}</b> stories</span></span>
        <span class="ti-go">${icon("arrow")}</span></a></li>`;
    }).join("");

    /* long reads: real stories from Research and Centres */
    const ids = ["new-case-study-gujarat-india-water-lessons-world", "cdpg-annual-policy-conclave-2026", "doctoral-student-research-paper-award-2026", "mijsc-9th-foundation-day"];
    const fs = ids.map(J.story).filter(Boolean);
    $("[data-features]").innerHTML = fs.map((n, i) => `<article class="feat feat-${i}">
      <a class="feat-plate plate" href="${u.story(n.id)}" data-plate="${i % 2 ? "right" : "left"}" tabindex="-1" aria-hidden="true">${J.newsImg(n)}</a>
      <div class="feat-text">
        <p class="meta mute">${esc(n.category)} · ${J.date(n.date)}</p>
        <h3 class="${i === 0 ? "h2" : "h3"}"><a class="draw" href="${u.story(n.id)}">${esc(n.title)}</a></h3>
        ${n.standfirst ? `<p class="${i === 0 ? "dek" : "small"}">${esc(n.standfirst)}</p>` : ""}
        <p class="feat-tags">${J.themesOf(n.title + " " + (n.standfirst || "")).map((t) => `<a class="tag" href="${u.theme(t)}">${esc(J.theme(t).t.split(",")[0])}</a>`).join(" ")}</p>
      </div></article>`).join("");

    /* chart: papers per theme (derived), one hue, neutral for "none" */
    const counts = I.themes.map((th) => ({ id: th.id, t: th.t, n: WP.filter((p) => J.themesOf(p.title).includes(th.id)), none: false }));
    const none = WP.filter((p) => !J.themesOf(p.title).length);
    counts.sort((a, b) => b.n.length - a.n.length);
    counts.push({ id: "none", t: "Matches no theme keyword", n: none, none: true });
    const max = Math.max(...counts.map((c) => c.n.length));
    const lo = Math.min(...WP.map((p) => p.no)), hi = Math.max(...WP.map((p) => p.no));
    $("[data-viz-note]").textContent = `Working papers ${lo} to ${hi} (${WP.length} papers), counted by theme. A paper can sit in more than one theme; ${none.length} match none of the keywords and are shown in grey.`;
    const years = {}; WP.forEach((p) => (years[p.year] = (years[p.year] || 0) + 1));
    $("[data-years]").innerHTML = Object.entries(years).map(([y, n]) => `<span><b class="num">${n}</b> in ${y}</span>`).join("");
    const bars = $("[data-bars]");
    bars.setAttribute("aria-label", "Bar chart: " + counts.map((c) => `${c.t}, ${c.n.length} papers`).join("; "));
    bars.innerHTML = `<ol class="vbars">${counts.map((c) => `<li class="bar-row${c.none ? " none" : ""}" tabindex="0" data-bar="${c.id}">
        <span class="bar-l">${esc(c.t)}</span>
        <span class="bar-track"><span class="vbar" style="--w:${(c.n.length / max) * 100}%"></span><span class="bar-v num">${c.n.length}</span></span>
        <span class="bar-tip" role="tooltip"><b>${c.n.length} papers</b>${c.n.slice(0, 3).map((p) => `<span>WP ${p.no}: ${esc(p.title)}</span>`).join("")}${c.n.length > 3 ? `<span class="mute">and ${c.n.length - 3} more</span>` : ""}</span>
      </li>`).join("")}</ol>
      <details class="viz-table"><summary>View as a table</summary><table><thead><tr><th scope="col">Theme</th><th scope="col">Papers</th></tr></thead><tbody>${counts.map((c) => `<tr><th scope="row">${esc(c.t)}</th><td>${c.n.length}</td></tr>`).join("")}</tbody></table></details>`;

    /* publication index */
    $("[data-n-wp]").textContent = WP.length; $("[data-n-ja]").textContent = JA.length;
    $("[data-idx-themes]").innerHTML = [{ id: "all", t: "All themes" }, ...I.themes].map((t) => `<button type="button" class="chip" aria-pressed="${t.id === "all"}" data-idx-theme="${t.id}">${esc(t.id === "all" ? t.t : t.t.split(",")[0])}</button>`).join("");
    drawPubs(false);
    $$("[data-tab]").forEach((b) => b.addEventListener("click", () => { state.tab = b.dataset.tab; $$("[data-tab]").forEach((x) => x.setAttribute("aria-selected", String(x === b))); moveInk(); drawPubs(); }));
    $("[data-idx-q]").addEventListener("input", (e) => { state.q = e.target.value; drawPubs(); });
    $$("[data-idx-theme]").forEach((b) => b.addEventListener("click", () => { state.theme = b.dataset.idxTheme; $$("[data-idx-theme]").forEach((x) => x.setAttribute("aria-pressed", String(x === b))); drawPubs(); }));
    requestAnimationFrame(moveInk);

    /* disciplines map */
    const areas = [...new Set(I.faculty.flatMap((f) => f.areas))].sort();
    const centresBy = (tid) => I.centres.filter((c) => (I.centreThemes[c.id] || []).includes(tid));
    $("[data-map]").innerHTML = `<ol class="map-themes">${I.themes.map((th) => `<li><button type="button" class="map-theme" data-mt="${th.id}" aria-pressed="false">${esc(th.t)}</button></li>`).join("")}</ol>
      <div class="map-col"><h3 class="meta">Academic areas</h3><ul class="map-nodes">${areas.map((a) => `<li><a class="map-node" href="faculty.html?area=${J.slug(a)}" data-area="${esc(a)}">${esc(a)}</a></li>`).join("")}</ul></div>
      <div class="map-col"><h3 class="meta">Centres and initiatives</h3><ul class="map-nodes">${I.centres.map((c) => `<li><a class="map-node" href="${u.centre(c.id)}" data-centre="${c.id}">${esc(c.abbr)}<span class="sr"> ${esc(c.name)}</span></a></li>`).join("")}</ul></div>`;
    const light = (tid) => {
      const th = J.theme(tid), cs = tid ? centresBy(tid).map((c) => c.id) : [];
      $$("[data-mt]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.mt === tid)));
      $$("[data-area]").forEach((n) => n.classList.toggle("lit", !!th && th.areas.includes(n.dataset.area)));
      $$("[data-centre]").forEach((n) => n.classList.toggle("lit", cs.includes(n.dataset.centre)));
      $("[data-map]").classList.toggle("has-lit", !!tid);
    };
    $$("[data-mt]").forEach((b) => { b.addEventListener("mouseenter", () => light(b.dataset.mt)); b.addEventListener("focus", () => light(b.dataset.mt)); b.addEventListener("click", () => light(b.dataset.mt)); });
    $("[data-map]").addEventListener("mouseleave", () => light(null));
  }

  function moveInk() {
    const sel = $("[data-tab][aria-selected=true]"), ink = $("[data-ink]");
    if (!sel || !ink) return;
    ink.style.transform = `translateX(${sel.offsetLeft}px)`; ink.style.width = sel.offsetWidth + "px";
  }

  function drawPubs(anim = true) {
    const q = state.q.toLowerCase().trim();
    const src = state.tab === "wp" ? WP.map((p) => ({ k: "wp" + p.no, n: `WP ${p.no}`, t: p.title, by: p.authors, y: p.year, u: p.url })) : JA.map((p, i) => ({ k: "ja" + i, n: "Article", t: p.title, by: p.by, y: "", u: p.url }));
    const list = src.filter((p) => (!q || (p.t + " " + p.by).toLowerCase().includes(q)) && (state.theme === "all" || J.themesOf(p.t).includes(state.theme)));
    const box = $("[data-pubs]");
    const shown = state.all || q || state.theme !== "all" ? list : list.slice(0, 12);
    const doit = () => {
      box.innerHTML = list.length ? shown.map((p) => `<li class="pub" data-key="${p.k}"><a href="${p.u}" class="pub-a">
        <span class="pub-n">${p.n}</span><span class="pub-t">${q ? J.mark(p.t, q) : esc(p.t)}</span>
        <span class="pub-by">${q ? J.mark(p.by, q) : esc(p.by)}${p.y ? " · " + p.y : ""}</span>
        <span class="pub-th">${J.themesOf(p.t).map((t) => `<span class="tag">${esc(J.theme(t).t.split(",")[0])}</span>`).join("")}</span>${icon("arrow-up")}</a></li>`).join("")
        : `<li class="empty"><p class="h3">No publication matches.</p><p>Clear the search or choose “All themes”.</p></li>`;
      if (shown.length < list.length) box.insertAdjacentHTML("beforeend", `<li class="pub-more"><button class="btn ghost" type="button" data-more>Show all ${list.length}${icon("plus")}</button></li>`);
      const more = box.querySelector("[data-more]"); if (more) more.addEventListener("click", () => { state.all = true; drawPubs(); });
    };
    anim ? J.flip(box, doit) : doit();
    $("[data-idx-count]").innerHTML = `Showing <b class="num">${shown.length}</b> of ${src.length}. Each opens on iimb.ac.in.`;
  }

  function intro(delay) {
    J.defaultIntro(delay);
    const g = J.gsap; if (!g) return;
    g.fromTo(".vbar", { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "expo.out", stagger: 0.08, scrollTrigger: { trigger: "[data-bars]", start: "top 80%", once: true } });
    g.fromTo(".bar-v", { autoAlpha: 0, x: -10 }, { autoAlpha: 1, x: 0, duration: 0.8, stagger: 0.08, delay: 0.5, scrollTrigger: { trigger: "[data-bars]", start: "top 80%", once: true } });
    g.utils.toArray(".feat-plate img").forEach((im) => g.fromTo(im, { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: im.closest(".feat"), start: "top bottom", end: "bottom top", scrub: true } }));
    g.fromTo(".ti-row", { "--line": 0 }, { "--line": 1, duration: 1.2, ease: "expo.inOut", stagger: 0.08, delay: delay + 0.4 });
  }
  J.page(render, intro);
})();
