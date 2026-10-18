/* News & Events — The Living Institution: date ribbon, filters, distinct event formats */
(() => {
  const { I, $, $$, esc, icon, u } = J;
  const state = { view: "all", month: "all", cat: "all", q: "" };
  const ym = (iso) => iso.slice(0, 7);
  const lead = I.news.find((n) => n.image);

  const months = () => {
    const set = new Set([...I.news.map((n) => ym(n.date)), ...I.events.map((e) => ym(e.start))]);
    return [...set].sort();
  };

  function evItem(e) {
    const [y, m, dd] = e.start.split("-");
    const kind = J.slug(e.kind);
    return `<li class="ev ev-${kind}" data-key="ev-${e.id}"><a href="${u.story(e.id)}">
      <span class="ev-date"><span class="ev-d num">${+dd}</span><span class="ev-m">${J.months[+m - 1].slice(0, 3)} ${y}</span>${e.end ? `<span class="ev-to">to ${J.date(e.end, "dm")}</span>` : ""}</span>
      <span class="ev-body"><span class="ev-k tag">${esc(e.kind)}</span><span class="ev-t">${esc(e.title)}</span><span class="ev-meta">${esc(e.host)}${e.time ? " · " + esc(e.time) : ""}</span></span>
      <span class="ev-go">${icon("arrow")}</span></a></li>`;
  }
  function stItem(n, i) {
    const big = i % 4 === 0 && n.image;
    return `<li class="st ${big ? "st-big" : ""}" data-key="st-${n.id}"><a href="${u.story(n.id)}">
      ${n.image ? `<span class="st-img plate">${J.newsImg(n)}</span>` : `<span class="st-img st-noimg" aria-hidden="true"><span>${esc(n.category)}</span></span>`}
      <span class="st-text"><span class="meta"><span class="st-cat">${esc(n.category)}</span> · ${J.date(n.date)}</span><span class="st-t">${esc(n.title)}</span>${big && n.standfirst ? `<span class="st-dek">${esc(n.standfirst)}</span>` : ""}</span></a></li>`;
  }

  function draw(anim = true) {
    const q = state.q.toLowerCase().trim();
    const match = (t) => !q || t.toLowerCase().includes(q);
    const evs = I.events.filter((e) => (e.end || e.start) >= J.today).filter((e) => state.month === "all" || ym(e.start) === state.month || (e.end && ym(e.end) === state.month)).filter((e) => state.cat === "all" || J.slug(e.kind) === state.cat).filter((e) => match(e.title + " " + e.host + " " + (e.standfirst || ""))).sort((a, b) => a.start.localeCompare(b.start));
    const sts = I.news.filter((n) => n.id !== lead.id || state.month !== "all" || q || state.cat !== "all").filter((n) => state.month === "all" || ym(n.date) === state.month).filter((n) => state.cat === "all" || J.slug(n.category) === state.cat).filter((n) => match(n.title + " " + (n.standfirst || "")));
    const showEv = state.view !== "stories", showSt = state.view !== "events";
    $("[data-ev-sec]").hidden = !showEv || !evs.length && state.view === "all";
    $("[data-st-sec]").hidden = !showSt || !sts.length && state.view === "all";
    const doit = () => {
      $("[data-events]").innerHTML = evs.map(evItem).join("") || `<li class="empty"><p class="h4">No upcoming events match.</p></li>`;
      $("[data-stories]").innerHTML = sts.map(stItem).join("") || `<li class="empty"><p class="h4">No stories match.</p></li>`;
    };
    anim ? J.flip($("[data-st-sec]").parentNode, doit) : doit();
    const total = (showEv ? evs.length : 0) + (showSt ? sts.length : 0);
    const mName = state.month === "all" ? "" : ` in ${J.months[+state.month.slice(5) - 1]} ${state.month.slice(0, 4)}`;
    $("[data-nw-count]").innerHTML = total ? `<b class="num">${total}</b> ${total === 1 ? "item" : "items"}${mName}` : `Nothing${mName} matches. <button class="text-btn ulink" type="button" data-nw-reset>Show everything</button>`;
  }

  function moveInk(sel, ink) { if (!sel || !ink) return; ink.style.width = sel.offsetWidth + "px"; ink.style.transform = `translateX(${sel.offsetLeft}px)`; }
  function drawCats() {
    const list = state.view === "events" ? [...new Set(I.events.map((e) => e.kind))] : state.view === "stories" ? [...new Set(I.news.map((n) => n.category))] : [...new Set([...I.news.map((n) => n.category), ...I.events.map((e) => e.kind)])];
    $("[data-cats]").innerHTML = `<button type="button" class="chip" aria-pressed="${state.cat === "all"}" data-cat="all">All</button>` + list.map((c) => `<button type="button" class="chip" aria-pressed="${state.cat === J.slug(c)}" data-cat="${J.slug(c)}">${esc(c)}</button>`).join("");
  }

  function render() {
    $("[data-today]").textContent = `Content as of ${J.date(J.today)}`;
    $("[data-lead]").innerHTML = `
      <a class="nl-plate plate" href="${u.story(lead.id)}" tabindex="-1" aria-hidden="true">${J.newsImg(lead)}</a>
      <div class="nl-text"><p class="meta"><span class="tag solid">Lead story</span> ${esc(lead.category)} · ${J.date(lead.date)}</p>
      <h2 class="nl-t"><a class="draw" href="${u.story(lead.id)}">${esc(lead.title)}</a></h2>
      <p class="dek">${esc(lead.standfirst || "")}</p>
      <a class="arrow-link" href="${u.story(lead.id)}"><span>Read the story</span>${icon("arrow")}</a></div>`;
    const ms = months();
    const count = (m) => I.news.filter((n) => ym(n.date) === m).length + I.events.filter((e) => ym(e.start) === m).length;
    $("[data-ribbon]").insertAdjacentHTML("afterbegin", `<button type="button" class="rb on" aria-pressed="true" data-m="all"><span class="rb-m">All</span><span class="rb-n">${I.news.length + I.events.length}</span></button>` + ms.map((m) => `<button type="button" class="rb ${m > ym(J.today) ? "future" : ""} ${m === ym(J.today) ? "now" : ""}" aria-pressed="false" data-m="${m}"><span class="rb-m">${J.months[+m.slice(5) - 1].slice(0, 3)}</span><span class="rb-y">${m.slice(0, 4)}</span><span class="rb-n">${count(m)}</span></button>`).join(""));
    drawCats(); draw(false);
    const ink = $("[data-ribbon-ink]");
    requestAnimationFrame(() => { moveInk($(".rb.on"), ink); moveInk($("[data-view][aria-selected=true]"), $("[data-view-ink]")); });
    $("[data-ribbon]").addEventListener("click", (e) => { const b = e.target.closest("[data-m]"); if (!b) return; state.month = b.dataset.m; $$(".rb").forEach((x) => { x.classList.toggle("on", x === b); x.setAttribute("aria-pressed", String(x === b)); }); moveInk(b, ink); draw(); });
    $$("[data-view]").forEach((b) => b.addEventListener("click", () => { state.view = b.dataset.view; state.cat = "all"; $$("[data-view]").forEach((x) => x.setAttribute("aria-selected", String(x === b))); moveInk(b, $("[data-view-ink]")); drawCats(); draw(); }));
    $("[data-cats]").addEventListener("click", (e) => { const b = e.target.closest("[data-cat]"); if (!b) return; state.cat = b.dataset.cat; $$("[data-cat]").forEach((x) => x.setAttribute("aria-pressed", String(x === b))); draw(); });
    let t; $("[data-nw-q]").addEventListener("input", (e) => { clearTimeout(t); t = setTimeout(() => { state.q = e.target.value; draw(); }, 150); });
    document.addEventListener("click", (e) => { if (e.target.closest("[data-nw-reset]")) { state.month = "all"; state.cat = "all"; state.q = ""; $("[data-nw-q]").value = ""; $$(".rb").forEach((x) => { const on = x.dataset.m === "all"; x.classList.toggle("on", on); x.setAttribute("aria-pressed", String(on)); }); moveInk($(".rb.on"), ink); drawCats(); draw(); } });
    if (location.hash === "#events") { state.view = "events"; $$("[data-view]").forEach((x) => x.setAttribute("aria-selected", String(x.dataset.view === "events"))); drawCats(); draw(false); requestAnimationFrame(() => moveInk($("[data-view=events]"), $("[data-view-ink]"))); }
    addEventListener("resize", () => { moveInk($(".rb.on"), ink); moveInk($("[data-view][aria-selected=true]"), $("[data-view-ink]")); });
  }

  function intro(delay) {
    J.defaultIntro(delay);
    const g = J.gsap; if (!g) return;
    const tl = g.timeline({ delay: delay + 0.2, defaults: { ease: J.ease } });
    tl.add(J.plateIn($(".nl-plate"), { from: "left" }), 0)
      .fromTo(".nl-text > *", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08 }, 0.4)
      .fromTo(".rb", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.04 }, 0.5);
    J.batchIn(".ev");
    J.batchIn(".st");
  }
  J.page(render, intro);
})();
