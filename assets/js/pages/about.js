/* About — The Institutional Story */
(() => {
  const { I, $, $$, esc, icon, u } = J;
  const A = I.about;

  function render() {
    $("[data-ab-lede]").textContent = A.overview[0];
    $("[data-ab-cap]").innerHTML = J.credit("archive-inauguration");
    $("[data-vision]").textContent = A.overview[1].replace(/^Our vision is to be/, "To be");
    $("[data-mission]").innerHTML = A.mission.map((m) => `<li>${esc(m)}</li>`).join("");
    $("[data-values]").innerHTML = A.values.map((v) => `<li>${esc(v)}</li>`).join("");
    $("[data-vis-src]").innerHTML = `Vision, mission and values from ${J.srcLink("about", "About IIMB")}.`;

    /* timeline */
    const yearSplit = (y) => y.replace("–", "<span class='en'>–</span>");
    $("[data-tl-track]").innerHTML = I.timeline.map((t, i) => `<li class="tl-item${t.img ? " has-img" : ""}" data-i="${i}">
      <span class="tl-mark" aria-hidden="true"></span>
      <p class="tl-year num">${yearSplit(t.y)}</p>
      ${t.img ? `<figure class="tl-img plate">${J.img(t.img, { want: 800, sizes: "(min-width: 1000px) 30vw, 90vw" })}</figure>` : ""}
      <p class="tl-text">${esc(t.t)}</p>
      <p class="src">${J.srcLink(t.src, "Source")}${t.img ? ` · Photo: ${esc(J.photo(t.img).credit)}` : ""}</p>
    </li>`).join("");

    /* architecture */
    const ar = I.architecture;
    $("[data-arch-lede]").textContent = ar.lede;
    $("[data-arch-quote]").innerHTML = `<p class="pullquote"><span class="mark">“</span>${esc(ar.quote.text)}<span class="mark">”</span></p><footer class="small">${esc(ar.quote.by)} · ${J.srcLink(ar.quote.src, "Architecture, iimb.ac.in")}</footer>`;
    $("[data-arch-pass]").innerHTML = ar.passages.map((p) => `<p>${esc(p)}</p>`).join("");
    $("[data-arch-els]").innerHTML = ar.elements.map((e) => `<li><h3 class="h4">${esc(e.k)}</h3><p class="small">${esc(e.d)}</p></li>`).join("");
    $("[data-arch-cap]").innerHTML = `Above: ${J.credit("pergola")} Right: ${J.credit("corridor")}`;
    $("[data-logo-note]").textContent = `${A.logoNote} Its concept comes from the motto, तेजस्वि नावधीतमस्तु, “let our study be enlightening”: from the logo that portrays the rays of the rising sun to the design of the campus, light plays a crucial role.`;

    /* leadership */
    const L = I.leadership;
    const person = (name, role, id) => { const f = id && J.fac(id); return `<article class="lead-p">${f ? `<a href="${u.person(id)}" class="lead-face">${J.face(id)}</a>` : `<span class="lead-face lead-mono mono">${J.initials(name)}</span>`}<h3 class="h4">${f ? `<a class="draw" href="${u.person(id)}">${esc(name)}</a>` : esc(name)}</h3><p class="small mute">${esc(role)}</p></article>`; };
    $("[data-lead]").innerHTML = `<figure class="lead-chair"><blockquote class="pullquote"><span class="mark">“</span>${esc(L.chair.quote)}<span class="mark">”</span></blockquote><figcaption><span class="h4">${esc(L.chair.name)}</span><br><span class="small">${esc(L.chair.role)} · ${esc(L.chair.org)}</span><br><span class="src">${J.srcLink(L.chair.quoteSrc, "Message from the Chairperson")}</span></figcaption></figure>
      <div class="lead-people" data-stagger>${person(L.director.name, L.director.role, L.director.facultyId)}${L.deans.map((d) => person(d.name, d.role, d.facultyId)).join("")}</div>`;
    $("[data-board-note]").textContent = L.boardNote;
    $("[data-board]").innerHTML = L.board.map(([n, r]) => `<li><span class="b-n">${esc(n)}</span><span class="b-r">${esc(r)}</span></li>`).join("");
    $("[data-iac]").innerHTML = L.iac.map(([n, r]) => `<li><span class="b-n">${esc(n)}</span><span class="b-r">${esc(r)}</span></li>`).join("");

    $("[data-accred]").textContent = A.accreditation;
    $("[data-gnam]").textContent = A.gnam;
    $("[data-second]").textContent = A.secondCampus;
    $("[data-docs]").innerHTML = L.governanceDocs.map((d) => `<li><a class="off-link" href="${d.u}"><span class="h4">${esc(d.t)}</span><span class="small mute">iimb.ac.in</span>${icon("arrow-up")}</a></li>`).join("");
  }

  function intro(delay) {
    J.defaultIntro(delay);
    const g = J.gsap; if (!g) return;
    const mm = g.matchMedia();
    mm.add("(min-width: 1000px)", () => {
      const sec = $("[data-tl-sec]"), track = $("[data-tl-track]");
      const dist = () => Math.max(0, track.scrollWidth - innerWidth + 120);
      const tw = g.to(track, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: sec, start: "top top", end: () => "+=" + dist(), pin: true, scrub: 0.7, invalidateOnRefresh: true, anticipatePin: 1,
        onUpdate: (s) => g.set("[data-tl-progress]", { scaleX: s.progress }) } });
      $$(".tl-item").forEach((it) => {
        ScrollTrigger.create({ trigger: it, containerAnimation: tw, start: "left 62%", end: "right 38%", toggleClass: "on" });
        const img = it.querySelector(".tl-img img");
        if (img) g.fromTo(img, { scale: 1.25, filter: "sepia(.6) contrast(.9)" }, { scale: 1, filter: "sepia(0) contrast(1)", ease: "none", scrollTrigger: { trigger: it, containerAnimation: tw, start: "left right", end: "center center", scrub: true } });
        g.fromTo(it.querySelector(".tl-year"), { yPercent: 40 }, { yPercent: 0, ease: "none", scrollTrigger: { trigger: it, containerAnimation: tw, start: "left right", end: "left 40%", scrub: true } });
      });
      return () => g.set(track, { clearProps: "transform" });
    });
    mm.add("(max-width: 999px)", () => {
      g.fromTo("[data-tl-progress]", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: "[data-tl-track]", start: "top 70%", end: "bottom 70%", scrub: true } });
      $$(".tl-item").forEach((it) => ScrollTrigger.create({ trigger: it, start: "top 70%", end: "bottom 30%", toggleClass: "on" }));
    });
    g.fromTo(".arch-b", { yPercent: 18 }, { yPercent: -10, ease: "none", scrollTrigger: { trigger: ".arch-collage", start: "top bottom", end: "bottom top", scrub: true } });
    g.fromTo(".arch-quote", { yPercent: 10 }, { yPercent: -14, ease: "none", scrollTrigger: { trigger: ".arch-collage", start: "top bottom", end: "bottom top", scrub: true } });
    g.fromTo(".id-logo img", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.6, ease: "expo.inOut", scrollTrigger: { trigger: ".id-logo", start: "top 80%", once: true } });
  }
  J.page(render, intro);
})();
