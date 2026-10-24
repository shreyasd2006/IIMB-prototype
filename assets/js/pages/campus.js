/* Campus & Student Life — The IIMB Experience */
(() => {
  const { I, $, $$, esc, icon, u } = J;
  const C = I.campus;
  const COLS = [["unmaad", "film-classroom", "music", "library-commons"], ["sport", "pergola-light", "amphitheatre", "cafeteria"], ["hockey", "corridor", "art", "auditorium"]];
  const ESSAY = ["pergola-light", "ug-students-5", "film-classroom", "library-commons", "amphitheatre", "sport", "hockey", "music", "unmaad", "cafeteria", "ug-students-3", "art", "corridor", "stone-bougainvillea", "film-convocation", "ug-students-4", "auditorium"];

  function render() {
    $("[data-cm-cols]").innerHTML = COLS.map((col, i) => `<div class="cm-col cm-col-${i}">${[...col, ...col].map((k) => `<span class="cm-tile plate">${J.img(k, { want: 800, sizes: "34vw", alt: "", lazy: false })}</span>`).join("")}</div>`).join("");
    $("[data-cm-intro]").textContent = `${C.intro} Clubs, festivals, sport and music on the Bannerghatta Road campus.`;
    $("[data-cm-facts]").innerHTML = C.facts.map((f) => `<div class="fact"><dt class="v" data-count>${esc(f.v)}</dt><dd class="l">${esc(f.l)}</dd></div>`).join("") + `<p class="src cmf-src">As stated on ${J.srcLink(C.factsSrc, "Student Life and Activities")}. The About page gives about 1,200 students in degree programmes.</p>`;
    $("[data-cm-rail]").innerHTML = ESSAY.filter(J.photo).map((k, i) => { const p = J.photo(k); const tall = p.h / p.w > 0.62; return `<li class="ess ${tall ? "tall" : "wide"}"><figure><span class="plate">${J.img(k, { want: 1000, sizes: "60vw" })}</span><figcaption><span class="num">${String(i + 1).padStart(2, "0")}</span> ${J.credit(k)}</figcaption></figure></li>`; }).join("");
    J.dragRail($("[data-cm-rail]"));
    $("[data-cm-fac]").innerHTML = C.facilities.map((f, i) => `<li class="fac fac-${i}"><figure class="plate">${J.img(f.img, { want: 800, sizes: "(min-width: 1000px) 33vw, 90vw" })}</figure><h3 class="h3">${esc(f.k)}</h3><p>${esc(f.d)}</p>${f.u ? `<a class="arrow-link" href="${f.u}"><span>Library site</span>${icon("arrow-up")}</a>` : ""}<p class="caption">${J.credit(f.img)}</p></li>`).join("");
    $("[data-cm-voices]").innerHTML = I.voices.map((v) => `<article class="vc">${J.filmTile(v.id, v.t)}<p class="vc-who"><span class="h4">${esc(v.who)}</span><br><span class="small mute">${esc(v.prog)} · ${esc(v.about)}</span></p></article>`).join("");
    const stories = I.news.filter((n) => n.category === "Students");
    $("[data-cm-stories]").innerHTML = stories.map((n) => `<a class="th-story" href="${u.story(n.id)}">${n.image ? `<span class="plate">${J.newsImg(n)}</span>` : `<span class="plate date-plate"><span class="dp-d">${+n.date.slice(8)}</span><span class="dp-m">${J.months[+n.date.slice(5, 7) - 1]} ${n.date.slice(0, 4)}</span></span>`}<span><span class="meta mute">${J.date(n.date)}</span><br><span class="h4">${esc(n.title)}</span></span></a>`).join("");
    $("[data-cm-fest]").innerHTML = C.festivals.map((f) => `<li>${f.img ? `<span class="plate fest-img">${J.img(f.img, { want: 800 })}</span>` : ""}<h3 class="h3">${esc(f.k)}</h3><p class="small">${esc(f.d)}</p></li>`).join("");
    $("[data-cm-sust]").innerHTML = `${C.sustainability.map((s) => `<p class="sust-n"><span class="num">${esc(s.v)}</span>${esc(s.l)}</p>`).join("")}<p class="small">${esc(C.sustainabilityNote)}</p><p class="src">${J.srcLink("sust", "Sustainability @ IIMB")}</p>`;
  }

  function intro(delay) {
    J.defaultIntro(delay);
    const g = J.gsap; if (!g) return;
    /* hero columns: rise in, then drift at different speeds while you scroll (layered parallax) */
    g.fromTo(".cm-col", { yPercent: (i) => [30, 50, 20][i] }, { yPercent: (i) => [0, -8, 4][i], duration: 2, ease: "expo.out", delay, stagger: 0.12 });
    g.fromTo(".cm-tile", { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 1.4, ease: "expo.inOut", stagger: { each: 0.05, from: "random" }, delay });
    g.fromTo(".cm-title-box", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8, delay: delay + 0.6 });
    [-28, -46, -18].forEach((v, i) => g.to(`.cm-col-${i}`, { yPercent: v, ease: "none", scrollTrigger: { trigger: "[data-cm-hero]", start: "top top", end: "bottom top", scrub: true } }));
    /* essay rail: images de-saturate in and lift as the rail scrolls */
    J.batchIn(".ess", { dur: 1 });
    J.batchIn(".fac");
    $$(".fac figure img").forEach((im) => g.fromTo(im, { yPercent: -8, scale: 1.12 }, { yPercent: 8, scale: 1.12, ease: "none", scrollTrigger: { trigger: im.closest(".fac"), start: "top bottom", end: "bottom top", scrub: true } }));
  }
  J.page(render, intro);
})();
