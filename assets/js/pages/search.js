/* Search — full results page over the same index as the overlay */
(() => {
  const { I, $, $$, esc, icon } = J;
  let group = "all";
  const SUGGEST = ["PGP", "digital public goods", "CSITM", "inflation", "caste", "supply chain", "Mayank Kumar", "undergraduate"];

  function draw() {
    const q = $("[data-sr-q]").value.trim();
    history.replaceState(null, "", q ? `search.html?q=${encodeURIComponent(q)}` : "search.html");
    const box = $("[data-sr-results]");
    if (!q) { $("[data-sr-groups]").innerHTML = ""; box.innerHTML = `<div class="sr-empty"><p class="h3">Try one of these</p><p class="chips">${SUGGEST.map((s) => `<button type="button" class="chip" data-suggest="${esc(s)}">${esc(s)}</button>`).join("")}</p></div>`; return; }
    const res = J.search(q);
    const groups = [...new Set(res.map((r) => r.group))];
    if (group !== "all" && !groups.includes(group)) group = "all";
    $("[data-sr-groups]").innerHTML = res.length ? [`<button type="button" class="chip" aria-pressed="${group === "all"}" data-g="all">All <span class="count">${res.length}</span></button>`, ...groups.map((g) => `<button type="button" class="chip" aria-pressed="${group === g}" data-g="${esc(g)}">${esc(g)} <span class="count">${res.filter((r) => r.group === g).length}</span></button>`)].join("") : "";
    const shown = group === "all" ? res : res.filter((r) => r.group === group);
    box.innerHTML = res.length ? `<p class="nw-count"><b class="num">${shown.length}</b> results for “${esc(q)}”</p>` + (group === "all" ? groups : [group]).map((g) => `<section class="sr-sec"><h2 class="h3">${esc(g)}</h2><div class="sr-list">${shown.filter((r) => r.group === g).map((r, i) => J.resultRow(r, q, g + i)).join("")}</div></section>`).join("")
      : `<div class="sr-empty"><p class="h3">Nothing matches “${esc(q)}”.</p><p>Check the spelling, use fewer words, or try a programme code (PGP, EPGP), a surname, or a topic. You can also browse <a class="ulink" href="programmes.html">programmes</a>, <a class="ulink" href="faculty.html">faculty</a> or <a class="ulink" href="research.html#papers">the publication index</a>.</p><p class="chips">${SUGGEST.slice(0, 5).map((s) => `<button type="button" class="chip" data-suggest="${esc(s)}">${esc(s)}</button>`).join("")}</p></div>`;
    if (J.gsap) J.gsap.fromTo(".sr-list .res-item", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.015, ease: J.ease });
  }

  function render() {
    const input = $("[data-sr-q]");
    input.value = J.param("q") || "";
    draw();
    let t; input.addEventListener("input", () => { clearTimeout(t); t = setTimeout(draw, 160); });
    $("[data-sr-form]").addEventListener("submit", (e) => { e.preventDefault(); draw(); });
    document.addEventListener("click", (e) => {
      const g = e.target.closest("[data-g]"); if (g) { group = g.dataset.g; draw(); return; }
      const s = e.target.closest("[data-suggest]"); if (s) { input.value = s.dataset.suggest; group = "all"; draw(); input.focus(); }
    });
    setTimeout(() => input.focus({ preventScroll: true }), J.rm ? 0 : 900);
  }
  J.page(render);
})();
