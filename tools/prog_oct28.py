"""One-off (28 Oct 2026): programme pages: chairperson on every page with a large portrait, the official rankings
graphic, student testimonials (Text and Video tabs of the official page), and previous / next / all-programmes nav."""
import os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def rw(rel, pairs):
    p = os.path.join(ROOT, rel); s = open(p, encoding="utf-8").read()
    for a, b in pairs:
        assert a in s, (rel, a[:80]); s = s.replace(a, b, 1)
    open(p, "w", encoding="utf-8", newline="\n").write(s)

P = "assets/js/pages/programme.js"
rw(P, [
# chair on every page, big portrait
(r'''    if (chair && D.chair.msg) out.push(["chair", "Message from the chairperson", `<figure class="pd-chair"><blockquote>${D.chair.msg.map((m) => `<p>${esc(m)}</p>`).join("")}</blockquote><figcaption><a href="${u.person(chair.id)}" class="pd-chair-who">${J.face(chair.id, { cls: "pd-chair-face" })}<span><span class="h4">${esc(chair.name)}</span><br><span class="small">Chairperson, ${esc(p.short)}</span></span></a></figcaption></figure>${src(D.chair.src)}`]);''',
r'''    /* The chairperson, on every programme page: a large portrait, the message where the programme page publishes one,
       otherwise the opening of the chair's own official profile */
    const lead = chairOf(p, D);
    if (lead) {
      const f = lead.f, por = (I.portraits || {})[f.id];
      const bio = (f.summary || "").split(/(?<=\.)\s+(?=[A-Z])/).slice(0, 3).join(" ");
      const words = lead.msg ? `<blockquote class="pdc-quote">${lead.msg.map((m) => `<p>${esc(m)}</p>`).join("")}</blockquote>` : bio ? `<div class="pdc-bio"><p>${esc(bio)}</p></div>` : "";
      out.push(["chair", lead.msg ? "Message from the chairperson" : lead.label, `<div class="pdc">
        <figure class="pdc-photo"><a href="${u.person(f.id)}" tabindex="-1" aria-hidden="true">${por ? `<img src="${por.src}" width="440" height="440" alt="" loading="lazy">` : `<span class="mono">${J.initials(f.name)}</span>`}</a></figure>
        <div class="pdc-text">
          <p class="pdc-role">${esc(lead.role)}</p>
          <h3 class="pdc-name"><a href="${u.person(f.id)}">${esc(f.name)}</a></h3>
          <p class="pdc-title">${esc(f.title)}, ${esc(f.areas.join(" · "))}</p>
          ${words}
          <a class="arrow-link" href="${u.person(f.id)}"><span>Faculty profile</span>${icon("arrow")}</a>
        </div></div>${lead.msg ? src(lead.src) : `<p class="src">${bio ? "From the chair’s official IIMB profile. " : ""}Role as listed on <a class="ulink" href="${f.url}">iimb.ac.in</a>.</p>`}`, "", { wide: true }]);
    }'''),
# rankings: the official graphic and accreditation only
(r'''    const ranks = J.ranksFor(p.id);
    out.push(["rankings", "Accreditation and rankings", `<figure class="pd-rankfig" data-plate="up">''', r'''    out.push(["rankings", "Accreditation and rankings", `${J.rankFigure({ caption: "Accreditation and rankings, as published on the programme pages of iimb.ac.in." })}<!--fig-->'''),
(r'''      ${ranks.length ? J.rankLedger(ranks, { feature: false }) : ""}
''', ""),
# videos: drop the named testimonial films (they move to the testimonials section)
(r'''    if (M.videos) out.push(["videos", "Videos and testimonials", `<div class="pd-films">${M.videos.map(''',
r'''    const V = (I.progVoices || {})[p.id] || {}, vIds = new Set((V.films || []).map((x) => x.id));
    const vids = (M.videos || []).filter((v) => !vIds.has(v.id));
    if (vids.length) out.push(["videos", "Videos", `<div class="pd-films">${vids.map('''),
(r'''${M.videos.length > 6 ? `<p><button class="btn ghost" type="button" data-more-films>Show all ${M.videos.length} films ${icon("plus")}</button></p>` : ""}<p class="src">Official IIMB films on YouTube, as embedded on the programme page. Each loads from YouTube only when you press play.</p>`, "", { wide: true }]);''',
r'''${vids.length > 6 ? `<p><button class="btn ghost" type="button" data-more-films>Show all ${vids.length} films ${icon("plus")}</button></p>` : ""}<p class="src">Official IIMB films on YouTube, as embedded on the programme page. Each loads from YouTube only when you press play.</p>`, "", { wide: true }]);

    /* Testimonials: the programme page's "Text" and "Video" tabs, in the students' own words */
    if ((V.quotes || []).length || (V.films || []).length) {
      const Q = V.quotes || [], F = V.films || [];
      const quotes = Q.length ? `<ul class="vx-quotes">${Q.map((x, i) => `<li class="vx-q${i >= 6 ? " is-more" : ""}"${i >= 6 ? " hidden" : ""}><figure>
          <blockquote><p>${esc(x.q.join(" "))}</p></blockquote>
          <figcaption>${x.img ? `<img src="${x.img}" width="88" height="88" alt="" loading="lazy">` : `<span class="mono">${J.initials(x.name)}</span>`}<span><b>${esc(x.name)}</b><span>${esc(x.who.replace(x.name, "").replace(/^[,\s]+/, "") || p.short)}</span></span></figcaption></figure>
          <button class="vx-more" type="button" hidden aria-expanded="false">Read more</button></li>`).join("")}</ul>${Q.length > 6 ? `<p><button class="btn ghost" type="button" data-more-q>Show all ${Q.length} testimonials ${icon("plus")}</button></p>` : ""}` : "";
      const films = F.length ? `<div class="pd-films vx-films">${F.map((v, i) => `<figure class="pd-film${i >= 6 ? " is-more-f" : ""}"${i >= 6 ? " hidden" : ""}>${J.filmTile(v.id, v.who, { thumb: `assets/img/yt/${v.id}.jpg` })}<figcaption>${esc(v.who)}</figcaption></figure>`).join("")}</div>${F.length > 6 ? `<p><button class="btn ghost" type="button" data-more-vf>Show all ${F.length} video testimonials ${icon("plus")}</button></p>` : ""}` : "";
      const tabs = quotes && films ? `<div class="vx-tabs" role="tablist" aria-label="Testimonials"><button role="tab" type="button" id="vx-t-text" aria-controls="vx-p-text" aria-selected="true">In writing <span>${Q.length}</span></button><button role="tab" type="button" id="vx-t-video" aria-controls="vx-p-video" aria-selected="false" tabindex="-1">On video <span>${F.length}</span></button></div>` : "";
      out.push(["voices", "Student testimonials", `${tabs}${quotes ? `<div class="vx-panel" id="vx-p-text"${tabs ? ' role="tabpanel" aria-labelledby="vx-t-text"' : ""}>${quotes}</div>` : ""}${films ? `<div class="vx-panel" id="vx-p-video"${tabs ? ' role="tabpanel" aria-labelledby="vx-t-video" hidden' : ""}>${films}</div>` : ""}<p class="src">Testimonials as published on the <a class="ulink" href="${V.src}">official ${esc(p.short)} page</a>.</p>`, "Students and alumni, in their own words.", { wide: true }]);
    }'''),
# chair lookup helper + pager
(r'''  function sections(p, D, M) {''',
r'''  /* Who leads the programme: its chairperson, or for the BSc programmes the Officiating Dean, UG Programmes */
  function chairOf(p, D) {
    const id = (D.chair && D.chair.id) || p.chair;
    const f = id && J.fac(id);
    if (f) return { f, role: `Chairperson, ${p.short}`, label: "Programme chairperson", msg: D.chair && D.chair.msg, src: D.chair && D.chair.src };
    if (/^bsc-/.test(p.id) && J.fac("mukta-kulkarni")) return { f: J.fac("mukta-kulkarni"), role: "Officiating Dean, UG Programmes", label: "Programme leadership" };
    return null;
  }

  /* Move between programmes without going back to the listing */
  function pager(p) {
    const all = I.programmes, i = all.findIndex((x) => x.id === p.id);
    const prev = all[(i - 1 + all.length) % all.length], next = all[(i + 1) % all.length];
    const card = (x, dir) => `<a class="pg-step pg-${dir}" href="${u.prog(x.id)}" rel="${dir}"><span class="pg-dir">${dir === "prev" ? "Previous programme" : "Next programme"}</span><span class="pg-code">${esc(x.short)}</span><span class="pg-name">${esc(x.name)}</span><span class="pg-ar" aria-hidden="true">${icon("arrow")}</span></a>`;
    return `<nav class="pg" aria-label="Other programmes">
      <div class="pg-steps">${card(prev, "prev")}<a class="pg-all" href="programmes.html#degrees"><span class="pg-all-ic" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span>All programmes</span></a>${card(next, "next")}</div>
      <ol class="pg-rail">${all.map((x) => `<li><a href="${u.prog(x.id)}"${x.id === p.id ? ' aria-current="page"' : ""} title="${esc(x.name)}">${esc(x.short)}</a></li>`).join("")}</ol>
    </nav>`;
  }

  function sections(p, D, M) {'''),
# render: pager, tabs, read-more
(r'''    const more = $("[data-more-films]");''',
r'''    $("[data-pager]").innerHTML = pager(p);
    $("[data-pager-top]").innerHTML = `<a href="programmes.html#degrees" class="pgt-all">All programmes</a><span class="pgt-sep" aria-hidden="true">·</span>${(() => { const all = I.programmes, i = all.findIndex((x) => x.id === p.id), n = all[(i + 1) % all.length]; return `<a href="${u.prog(n.id)}" class="pgt-next">Next: ${esc(n.short)} ${icon("arrow")}</a>`; })()}`;
    const tabs = $$(".vx-tabs [role=tab]");
    const pick = (t) => { tabs.forEach((b) => { const on = b === t; b.setAttribute("aria-selected", String(on)); b.tabIndex = on ? 0 : -1; $("#" + b.getAttribute("aria-controls")).hidden = !on; }); if (window.ScrollTrigger) ScrollTrigger.refresh(); };
    tabs.forEach((b, i) => { b.addEventListener("click", () => pick(b)); b.addEventListener("keydown", (e) => { if (e.key === "ArrowRight" || e.key === "ArrowLeft") { const n = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length]; pick(n); n.focus(); } }); });
    const clampAll = () => $$(".vx-q:not([hidden])").forEach((li) => { const q = $("blockquote", li), btn = $(".vx-more", li); if (li.classList.contains("open")) return; btn.hidden = q.scrollHeight <= q.clientHeight + 2; });
    $$(".vx-more").forEach((btn) => btn.addEventListener("click", () => { const li = btn.closest(".vx-q"), open = !li.classList.contains("open"); li.classList.toggle("open", open); btn.setAttribute("aria-expanded", String(open)); btn.textContent = open ? "Show less" : "Read more"; if (window.ScrollTrigger) ScrollTrigger.refresh(); }));
    requestAnimationFrame(clampAll);
    const mq = $("[data-more-q]"); if (mq) mq.addEventListener("click", () => { $$(".vx-q.is-more").forEach((f) => (f.hidden = false)); mq.remove(); requestAnimationFrame(clampAll); if (window.ScrollTrigger) ScrollTrigger.refresh(); });
    const mv = $("[data-more-vf]"); if (mv) mv.addEventListener("click", () => { $$(".pd-film.is-more-f").forEach((f) => (f.hidden = false)); mv.remove(); if (window.ScrollTrigger) ScrollTrigger.refresh(); });
    const more = $("[data-more-films]");'''),
(r'''videos: "Videos", careers''', r'''videos: "Videos", voices: "Testimonials", careers'''),
(r'''.concat([{ id: "apply", t: "Contact and apply" }]), { label: `${p.short} · on this page`, after: ".pd-facts-sec" });''',
 r'''.concat([{ id: "apply", t: "Contact and apply" }, { id: "more-progs", t: "Other programmes" }]), { label: `${p.short} · on this page`, after: ".pd-facts-sec" });'''),
# motion for the new pieces
(r'''    J.batchIn(".pd-cards li, .terms > li, .pd-chart, .pd-film:not([hidden])", { dur: 0.9 });''',
r'''    J.batchIn(".pd-cards li, .terms > li, .pd-chart, .pd-film:not([hidden]), .vx-q:not([hidden])", { dur: 0.9 });
    J.rankFigIn();
    const pdc = $(".pdc");
    if (pdc) {
      g.fromTo(".pdc-photo", { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut", clearProps: "clipPath", scrollTrigger: { trigger: pdc, start: "top 80%", once: true } });
      g.fromTo(".pdc-photo img", { scale: 1.15 }, { scale: 1, duration: 1.8, ease: J.ease, clearProps: "transform", scrollTrigger: { trigger: pdc, start: "top 80%", once: true } });
      g.fromTo(".pdc-text > *", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: J.ease, stagger: 0.08, delay: 0.35, clearProps: "transform", scrollTrigger: { trigger: pdc, start: "top 80%", once: true } });
    }
    g.fromTo(".pg-step, .pg-all", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: J.ease, stagger: 0.08, clearProps: "transform", scrollTrigger: { trigger: ".pg", start: "top 88%", once: true } });'''),
])
# drop the old inline figure that the rankFigure replaced (from <!--fig--> up to </figure>)
p = os.path.join(ROOT, P); s = open(p, encoding="utf-8").read()
i = s.index("<!--fig-->"); j = s.index("</figure>", i) + len("</figure>")
s = s[:i] + s[j:]
open(p, "w", encoding="utf-8", newline="\n").write(s)

# template: pager before "Also consider", short nav in the hero
rw("src/pages/programme.html", [
('''      <nav class="crumbs" aria-label="Breadcrumb"><a href="programmes.html">Programmes</a><span aria-hidden="true">/</span><span data-crumb></span></nav>''',
 '''      <div class="prog-top"><nav class="crumbs" aria-label="Breadcrumb"><a href="programmes.html">Programmes</a><span aria-hidden="true">/</span><span data-crumb></span></nav><p class="pgt" data-pager-top></p></div>'''),
('''  <section class="section related" aria-labelledby="rel-h">''',
 '''  <section class="section pg-sec" id="more-progs" aria-label="Other programmes">
    <div class="wrap" data-pager></div>
  </section>
  <section class="section related" aria-labelledby="rel-h">'''),
])
print("programme page updated")
