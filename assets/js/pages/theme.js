/* Research theme — papers, people, centres and stories, switched in place */
(() => {
  const { I, $, $$, esc, icon, u } = J;
  const WP = I.publications.workingPapers, JA = I.publications.journalArticles;
  let current = null;

  const fill = (th) => {
    const papers = [...WP.map((p) => ({ n: `WP ${p.no}`, t: p.title, by: `${p.authors} · ${p.year}`, u: p.url })), ...JA.map((p) => ({ n: "Article", t: p.title, by: p.by, u: p.url }))].filter((p) => J.themesOf(p.t).includes(th.id));
    const fac = J.facultyInTheme(th);
    const centres = I.centres.filter((c) => (I.centreThemes[c.id] || []).includes(th.id));
    const stories = I.news.filter((n) => J.themesOf(n.title + " " + (n.standfirst || "")).includes(th.id));
    $("[data-th-desc]").textContent = th.d;
    $("[data-th-stats]").innerHTML = [[papers.length, "papers"], [fac.length, "faculty"], [centres.length, "centres"], [stories.length, "stories"]].map(([v, l]) => `<div><dt class="num">${v}</dt><dd>${l}</dd></div>`).join("");
    $("[data-th-papers]").innerHTML = papers.slice(0, 10).map((p) => `<li><a class="index-row" href="${p.u}"><span class="n">${p.n}</span><span class="t" data-no-i18n>${esc(p.t)}</span><span class="d">${esc(p.by)}</span></a></li>`).join("") || `<li class="empty">No papers matched.</li>`;
    $("[data-th-areas]").textContent = `Faculty in ${th.areas.join(", ")} (editorial mapping of areas to this theme).`;
    $("[data-th-faces]").innerHTML = fac.slice(0, 18).map((f) => `<li><a href="${u.person(f.id)}">${J.face(f.id)}<span class="tf-n">${esc(f.name)}</span><span class="tf-a">${esc(f.areas[0])}</span></a></li>`).join("") + (fac.length > 18 ? `<li class="tf-more"><a class="arrow-link" href="faculty.html?area=${J.slug(th.areas[0])}"><span>All ${fac.length}</span>${icon("arrow")}</a></li>` : "");
    $("[data-th-centres]").innerHTML = centres.map((c) => `<li><a class="th-c" href="${u.centre(c.id)}"><span class="th-c-a">${esc(c.abbr)}</span><span>${esc(c.name)}</span></a></li>`).join("") || `<li class="mute">None mapped.</li>`;
    $("[data-th-stories]").innerHTML = stories.slice(0, 4).map((n) => `<a class="th-story${n.image ? "" : " no-img"}" href="${u.story(n.id)}">${n.image ? `<span class="plate">${J.newsImg(n)}</span>` : ""}<span><span class="meta mute">${J.date(n.date)}</span><br><span class="h4">${esc(n.title)}</span></span></a>`).join("") || `<p class="mute">No stories matched.</p>`;
  };

  const setTitle = (th, animate) => {
    const el = $("[data-th-title]");
    const g = J.gsap;
    if (!animate || !g) { el.textContent = th.t; return; }
    const old = J.split(el);
    g.to(old.lines, { yPercent: -110, duration: 0.45, ease: "power3.in", stagger: 0.04, onComplete: () => { old.revert(); el.textContent = th.t; J.linesIn(el, { stagger: 0.07, dur: 0.95 }); } });
  };

  function show(id, animate = true) {
    const th = J.theme(id) || I.themes[0];
    if (current === th.id) return;
    current = th.id;
    document.title = `${th.t} — Research — IIM Bangalore`;
    $$("[data-th]").forEach((b) => { const on = b.dataset.th === th.id; b.setAttribute("aria-selected", String(on)); b.tabIndex = on ? 0 : -1; });
    const sel = $(`[data-th="${th.id}"]`), ink = $(".th-ink");
    if (sel && ink) { ink.style.width = sel.offsetWidth + "px"; ink.style.transform = `translateX(${sel.offsetLeft}px)`; }
    setTitle(th, animate);
    const body = $("[data-th-body]"), g = J.gsap;
    if (animate && g) {
      g.to(body, { autoAlpha: 0, y: 24, duration: 0.35, ease: "power2.in", onComplete: () => { fill(th); g.fromTo(body, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: J.ease }); g.fromTo(".th-faces li", { autoAlpha: 0, scale: 0.92 }, { autoAlpha: 1, scale: 1, duration: 0.6, ease: J.ease, stagger: 0.025, delay: 0.15 }); ScrollTrigger.refresh(); } });
      history.pushState({ id: th.id }, "", `theme.html?id=${th.id}`);
    } else fill(th);
  }

  function render() {
    $("[data-switch]").innerHTML = I.themes.map((th, i) => `<button role="tab" class="th-tab" data-th="${th.id}" aria-selected="false" tabindex="-1"><span class="num">${String(i + 1).padStart(2, "0")}</span>${esc(th.t.split(",")[0].replace(" &", ""))}</button>`).join("") + `<span class="th-ink" aria-hidden="true"></span>`;
    $$("[data-th]").forEach((b) => b.addEventListener("click", () => show(b.dataset.th)));
    $("[data-switch]").addEventListener("keydown", (e) => {
      if (!/Arrow(Left|Right)/.test(e.key)) return;
      const bs = $$("[data-th]"); const i = bs.findIndex((b) => b.dataset.th === current);
      const n = bs[(i + (e.key === "ArrowRight" ? 1 : -1) + bs.length) % bs.length]; n.focus(); show(n.dataset.th);
    });
    addEventListener("popstate", () => show(J.param("id")));
    show(J.param("id"), false);
    requestAnimationFrame(() => { const sel = $(`[data-th="${current}"]`), ink = $(".th-ink"); if (sel) { ink.style.width = sel.offsetWidth + "px"; ink.style.transform = `translateX(${sel.offsetLeft}px)`; } });
  }

  function intro(delay) {
    J.defaultIntro(delay);
    const g = J.gsap; if (!g) return;
    g.set("[data-th-title]", { visibility: "visible" });
    J.linesIn($("[data-th-title]"), { delay: delay + 0.15, stagger: 0.08 });
    g.fromTo(".th-faces li", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: J.ease, stagger: 0.03, scrollTrigger: { trigger: ".th-faces", start: "top 85%", once: true } });
  }
  J.page(render, intro);
})();
