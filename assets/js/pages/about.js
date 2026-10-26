/* About — The Institutional Story */
(() => {
  const { I, $, $$, esc, icon, u } = J;
  const A = I.about;

  /* Official About and IIM Act pages, 26 Oct 2026 */
  const F = "https://www.iimb.ac.in/sites/default/files/";
  const ACT = [
    ["2017", "Act", "Indian Institutes of Management Act, 2017", F + "inline-files/IIM-ACT.pdf", "Makes IIMB an Institute of National Importance"],
    ["2018", "Rules", "Indian Institutes of Management Rules, 2018", F + "inline-files/IIM-Rules-Gazette-Notification.pdf", ""],
    ["2022", "Amendment", "Indian Institutes of Management Rules Amendment 2022", F + "inline-files/IIM-Rules-Amendment-2022.pdf", ""],
    ["2023", "Amendment", "Indian Institutes of Management Act Amendment 2023", F + "inline-files/IIM-Act-Amendment%202023_16th%20August%202023-GazetteNotification.pdf", "Gazette notification, 16 August 2023"],
    ["2023", "Amendment", "Indian Institutes of Management Rules Amendment 2023", F + "inline-files/IIMB-Rules_Amendment-2023.pdf", ""],
    ["2023", "Regulations", "IIMB Regulations", F + "2023-09/IIMB-Regulations-Gazetted_31.08.2023.pdf", "Gazetted 31 August 2023"],
  ];
  const IAC = [
    ["Ruth Aguilera", "Darla and Frederick Brodsky Trustee Professor in Global Business; Distinguished Professor, International Business and Strategy", "Northeastern University"],
    ["Bharat Anand", "Richard R. West Dean of NYU Stern and Professor of Business Administration", "NYU Stern"],
    ["David Bach", "President of IMD and Nestlé Professor of Strategy and Political Economy", "IMD"],
    ["Gerry George", "Tamsen and Michael Brown Family Professor of Entrepreneurship and Innovation; Academic Advisor to the Georgetown Entrepreneurship Initiative", "Georgetown University"],
    ["Krishna Rajagopal", "William A. M. Burden Professor of Physics; Margaret MacVicar Faculty Fellow", "MIT"],
    ["Raghu Sundaram", "Senior Vice Chancellor and Chief Global Officer, New York University; Dean Emeritus, NYU Stern; Edward I. Altman Professor of Credit and Debt Markets; Professor of Finance", "New York University"],
    ["Lin Zhou", "Dean of The Chinese University of Hong Kong (CUHK) Business School and Choh-Ming Li Professor of Economics", "CUHK Business School"],
  ];

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
    $("[data-iac]").innerHTML = IAC.map(([n, t, org]) => `<li class="iac-card"><span class="iac-mono" aria-hidden="true">${esc(n.split(" ").map((w) => w[0]).join(""))}</span><p class="iac-org">${esc(org)}</p><h3 class="iac-n">Professor ${esc(n)}</h3><p class="iac-t">${esc(t)}</p></li>`).join("");

    $("[data-accred]").textContent = A.accreditation;
    $("[data-equis]").textContent = "The EFMD Quality Improvement System is a leading international system of quality assessment, improvement and accreditation of business schools, run by the European Foundation for Management Development.";
    $("[data-gnam]").textContent = A.gnam;
    $("[data-ab-ranks]").innerHTML = J.rankGrid(I.rankCards || [], "rkg-home");
    const C = I.campus;
    $("[data-su-lede]").textContent = "Central to the Institute’s vision is a deep emphasis on creating a greener, more sustainable future.";
    $("[data-su-facts]").innerHTML = C.sustainability.map((x) => `<div><dt class="num">${esc(x.v)}</dt><dd>${esc(x.l)}</dd></div>`).join("");
    $("[data-su-docs]").innerHTML = [["IIMB Sustainability Report 2025", "https://www.iimb.ac.in/sites/default/files/inline-files/iimb-sustainability-report-2025.pdf"], ["Carbon Footprint Report 2025", "https://www.iimb.ac.in/sites/default/files/inline-files/IIMB-Carbon-Footprint-Report_2025.pdf"]].map(([t, h]) => `<li><a class="off-link" href="${h}"><span class="h4">${esc(t)}</span><span class="small mute">PDF · iimb.ac.in</span>${icon("arrow-up")}</a></li>`).join("");
    $("[data-su-cap]").innerHTML = `${J.credit("sustainability")} ${esc(C.sustainabilityNote)}`;
    $("[data-org-cap]").innerHTML = J.credit("main-block");
    $("[data-act]").innerHTML = ACT.map(([y, kind, t, h, note]) => `<li><a class="act-doc" href="${h}"><span class="act-y num">${y}</span><span class="act-kind">${esc(kind)}</span><span class="act-t">${esc(t)}</span>${note ? `<span class="act-note">${esc(note)}</span>` : ""}<span class="act-pdf">PDF · iimb.ac.in ${icon("arrow-up")}</span></a></li>`).join("");
    $("[data-ab-figs]").innerHTML = [["105", "full-time faculty members"], ["1,200", "students across degree programmes (about)"], ["5,000", "Executive Education participants a year (nearly)"]].map(([v, l]) => `<div><dt class="num" data-count>${v}</dt><dd>${l}</dd></div>`).join("") + `<p class="src">From ${J.srcLink("about", "About IIMB")}.</p>`;
    $("[data-docs]").innerHTML = L.governanceDocs.filter((d) => !/IIM Act|IIM Rules|Institutes of Management|Regulations/.test(d.t)).map((d) => `<li><a class="off-link" href="${d.u}"><span class="h4">${esc(d.t)}</span><span class="small mute">iimb.ac.in</span>${icon("arrow-up")}</a></li>`).join("");
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
      });
      return () => g.set(track, { clearProps: "transform" });
    });
    mm.add("(max-width: 999px)", () => {
      g.fromTo("[data-tl-progress]", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: "[data-tl-track]", start: "top 70%", end: "bottom 70%", scrub: true } });
      $$(".tl-item").forEach((it) => ScrollTrigger.create({ trigger: it, start: "top 70%", end: "bottom 30%", toggleClass: "on" }));
    });
    g.fromTo(".arch-b img", { yPercent: -6, scale: 1.12 }, { yPercent: 6, scale: 1.12, ease: "none", scrollTrigger: { trigger: ".arch-collage", start: "top bottom", end: "bottom top", scrub: true } });
    g.fromTo("[data-act-fill]", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".act-docs", start: "top 70%", end: "bottom 55%", scrub: 0.4 } });
    $$(".act-docs li").forEach((li) => ScrollTrigger.create({ trigger: li, start: "top 62%", end: "bottom top", toggleClass: "lit" }));
    g.fromTo(".iac-card", { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, ease: J.ease, stagger: { each: 0.07, grid: "auto" }, clearProps: "transform", scrollTrigger: { trigger: ".iac-grid", start: "top 85%", once: true } });
    g.fromTo(".id-logo img", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.6, ease: "expo.inOut", scrollTrigger: { trigger: ".id-logo", start: "top 80%", once: true } });
  }
  J.page(() => {
    render();
    J.hangIndex([["vision", "Vision and mission"], ["timeline", "Milestones"], ["architecture", "Architecture"], ["identity", "The sun symbol"], ["sustainability", "Sustainability"], ["accreditation", "Accreditation and rankings"], ["leadership", "Board"], ["act", "IIM Act and Rules"], ["structure", "Organisational structure"], ["iac", "Advisory committee"]].map(([id, t]) => ({ id, t })), { label: "About · on this page", after: ".ab-hero" });
  }, intro);
})();
