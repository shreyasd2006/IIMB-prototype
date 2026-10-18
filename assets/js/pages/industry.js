/* Recruiters & Alumni — Beyond the Classroom */
(() => {
  const { I, $, $$, esc, icon, u } = J;
  const rec = I.industry.routes.find((r) => r.id === "recruit");

  function render() {
    $("[data-pcal]").innerHTML = `<div class="pcal-line" aria-hidden="true"><span data-pcal-fill></span></div><ol class="pcal-nodes">${rec.detail.map(([k, v], i) => `<li class="pcal-n"><span class="pcal-dot"></span><span class="pcal-v">${esc(v)}</span><span class="pcal-k">${esc(k)}</span></li>`).join("")}</ol><p class="src">From ${J.srcLink("recruiters", "For Recruiters")}.</p>`;
    $("[data-hire]").innerHTML = ["pgp", "pgpba"].map(J.prog).map((p) => `<li><a class="hire" href="${u.prog(p.id)}"><span class="hire-code">${esc(p.short)}</span><span><span class="h4">${esc(p.name)}</span><br><span class="small mute">${esc(p.intake)}</span></span></a></li>`).join("");
    const outs = [
      ["ft-executive-mba-ranking-2026", "PGPEM alumni salary increase of 102%, with IIMB the only Indian school in the FT global top 10 on that measure"],
      ["ft-b-school-rankings-mim-2026", "PGP ranked 21st in the world and first in India in the FT Masters in Management 2026"],
      ["epgp-2nd-rank-apac-bloomberg-b-school-rankings-2026", "EPGP ranked second in Asia-Pacific by Bloomberg Businessweek, 2026"],
    ];
    $("[data-outcomes]").innerHTML = outs.map(([id, t], i) => { const n = J.story(id); return n ? `<li><a class="index-row" href="${u.story(id)}"><span class="n">${String(i + 1).padStart(2, "0")}</span><span class="t">${esc(t)}</span><span class="d">Source: ${esc(n.title)} · ${J.date(n.date)}</span></a></li>` : ""; }).join("");
    const ch = J.fac(rec.chairId);
    $("[data-rec-contact]").innerHTML = `<div class="contact-card">${ch ? `<a class="cc-person" href="${u.person(ch.id)}">${J.face(ch.id, { cls: "cc-face" })}<span><span class="small mute">Chairperson, Career Development Services</span><br><span class="h4">${esc(ch.name)}</span></span></a>` : ""}<p class="cc-mail">${icon("mail")}<a class="ulink" href="mailto:${rec.contact}">${rec.contact}</a></p><div class="cc-actions"><a class="btn" href="${rec.u}">For Recruiters, iimb.ac.in${icon("arrow-up")}</a><a class="arrow-link" href="partnerships.html#recruit"><span>Other ways to engage</span>${icon("arrow")}</a></div></div>`;

    const alu = I.news.filter((n) => n.category === "Alumni");
    $("[data-alumni]").innerHTML = alu.map((n, i) => `<article class="alu ${i === 0 ? "alu-lead" : ""}"><a class="alu-img plate" href="${u.story(n.id)}" tabindex="-1" aria-hidden="true" data-plate="up">${J.newsImg(n)}</a><div><p class="meta mute">${J.date(n.date)}</p><h3 class="${i === 0 ? "h2" : "h3"}"><a class="draw" href="${u.story(n.id)}">${esc(n.title)}</a></h3>${n.standfirst ? `<p class="dek">${esc(n.standfirst)}</p>` : ""}</div></article>`).join("");
    const dean = I.leadership.deans.find((d) => /Alumni/.test(d.role)), df = dean && J.fac(dean.facultyId);
    $("[data-alu-dean]").innerHTML = df ? `<h3 class="h3">Alumni relations</h3><a class="cc-person" href="${u.person(df.id)}">${J.face(df.id, { cls: "cc-face" })}<span><span class="h4">${esc(dean.name)}</span><br><span class="small mute">${esc(dean.role)}</span></span></a>` : "";
    $("[data-gnam]").textContent = I.about.gnam;
  }

  function intro(delay) {
    J.defaultIntro(delay);
    const g = J.gsap; if (!g) return;
    g.fromTo(".in-half", { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.3, ease: "expo.inOut", stagger: 0.15, delay: delay + 0.2 });
    g.fromTo(".in-lbl > *", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.06, ease: J.ease, delay: delay + 0.9 });
    g.fromTo("[data-pcal-fill]", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: "[data-pcal]", start: "top 80%", end: "top 30%", scrub: 0.5 } });
    $$(".pcal-n").forEach((n, i) => ScrollTrigger.create({ trigger: "[data-pcal]", start: () => `top ${80 - i * 12.5}%`, onEnter: () => n.classList.add("on"), onLeaveBack: () => n.classList.remove("on") }));
  }
  J.page(render, intro);
})();
