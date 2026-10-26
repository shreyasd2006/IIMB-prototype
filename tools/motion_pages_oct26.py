"""One-off (26 Oct 2026, second pass): authored motion on Programmes, programme pages, About and the rankings rows."""
import os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def rw(rel, pairs):
    p = os.path.join(ROOT, rel); s = open(p, encoding="utf-8").read()
    for a, b in pairs:
        assert a in s, (rel, a[:60]); s = s.replace(a, b, 1)
    open(p, "w", encoding="utf-8", newline="\n").write(s)

for f in ("src/pages/index.html", "src/pages/programmes.html"):
    rw(f, [("Each card links to the official announcement.", "Each row links to the official announcement.")])

# rankings rows: slide in one after another while their rules draw (core reveal handles the rules and counts)
rw("assets/js/core.js", [("        J.$$(\"[data-count]\", el).forEach((c) => { c._rev = 1; J.countUp(c, st); });",
  """        J.$$("[data-count]", el).forEach((c) => { c._rev = 1; J.countUp(c, st); });
        const rows = J.$$(".rkl-row", el);
        if (rows.length) g.fromTo(rows, { autoAlpha: 0, x: 36 }, { autoAlpha: 1, x: 0, duration: 0.9, ease: J.ease, stagger: 0.07, clearProps: "transform", scrollTrigger: { ...st, start: "top 86%" } });
        const feat = J.$(".rkl-feature", el);
        if (feat) g.fromTo(feat, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "expo.inOut", scrollTrigger: { ...st, start: "top 86%" } });""")])

# Programmes: degree photographs wipe in card by card
rw("assets/js/pages/programmes.js", [("    J.carousel($(\".pcar-sec\"));",
  """    J.carousel($(".pcar-sec"));
    g.fromTo(".dg-img", { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.15, ease: "expo.inOut", stagger: { each: 0.1, grid: "auto" }, clearProps: "clipPath", scrollTrigger: { trigger: ".dgrid", start: "top 85%", once: true } });""")])

# Programme pages: the code and the photograph part as you leave the hero
rw("assets/js/pages/programme.js", [("    g.to(\".prog-plate img\", { yPercent: 8, ease: \"none\", scrollTrigger: { trigger: \".prog-hero\", start: \"top top\", end: \"bottom top\", scrub: true } });",
  """    g.to(".prog-plate img", { yPercent: 8, scale: 1.06, ease: "none", scrollTrigger: { trigger: ".prog-hero", start: "top top", end: "bottom top", scrub: true } });
    g.to(".prog-code", { yPercent: -35, autoAlpha: 0.35, ease: "none", scrollTrigger: { trigger: ".prog-hero", start: "top top", end: "bottom top", scrub: true } });
    g.fromTo(".pd-fig .plate img, .pd-cards li", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, ease: J.ease, stagger: 0.06, clearProps: "transform", scrollTrigger: { trigger: ".pd-sec", start: "top 80%", once: true } });""")])

# About: the Act and Rules line fills as you read down it; each document lights up as it is reached
rw("src/pages/about.html", [('<ol class="act-docs" data-act data-stagger></ol>', '<div class="act-line-wrap"><span class="act-fill" aria-hidden="true"><i data-act-fill></i></span><ol class="act-docs" data-act data-stagger></ol></div>')])
rw("assets/js/pages/about.js", [("    g.fromTo(\".id-logo img\",",
  """    g.fromTo("[data-act-fill]", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".act-docs", start: "top 70%", end: "bottom 55%", scrub: 0.4 } });
    $$(".act-docs li").forEach((li) => ScrollTrigger.create({ trigger: li, start: "top 62%", end: "bottom top", toggleClass: "lit" }));
    g.fromTo(".iac-card", { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, ease: J.ease, stagger: { each: 0.07, grid: "auto" }, clearProps: "transform", scrollTrigger: { trigger: ".iac-grid", start: "top 85%", once: true } });
    g.fromTo(".id-logo img",""")])
p = os.path.join(ROOT, "src", "css", "about.css"); s = open(p, encoding="utf-8").read()
s = s.rstrip() + """
.act-line-wrap { position: relative; }
.act-fill { position: absolute; left: 5px; top: .9rem; bottom: .9rem; width: 2px; z-index: 0; pointer-events: none; }
.act-fill i { position: absolute; inset: 0; background: var(--red); transform-origin: 50% 0; transform: scaleY(0); }
.act-docs li::before { transition: background .5s var(--ease), transform .5s var(--ease), box-shadow .5s var(--ease); }
.act-docs li.lit::before { background: var(--red); transform: scale(1.25); box-shadow: 0 0 0 4px rgba(169, 45, 45, .16); }
"""
open(p, "w", encoding="utf-8", newline="\n").write(s)
print("motion added")
