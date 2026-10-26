"""One-off (26 Oct 2026, IIMB minutes): programme cards hover with an underline and a slight image zoom (no red fill);
degree cards gain photographs; timeline labels hang from their dots; rankings band and section anchors on Programmes."""
import os, re
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def rw(rel, fn):
    p = os.path.join(ROOT, rel); s = open(p, encoding="utf-8").read(); s2 = fn(s)
    open(p, "w", encoding="utf-8", newline="\n").write(s2)

def home_css(s):
    a = s.index(".pc-card a::before {"); b = s.index("\n", a)
    s = s[:a] + s[b + 1:]
    a = s.index(".pc-card a:hover, .pc-card a:focus-visible { border-color"); b = s.index(".pc-foot {")
    s = s[:a] + """/* hover (IIMB minutes): an underline draws under the name and the photograph zooms slightly; no colour fill */
.pc-card a:hover, .pc-card a:focus-visible { border-color: var(--rule-strong); }
.pc-card a:hover .pc-img img, .pc-card a:focus-visible .pc-img img { transform: scale(1.05); }
.pc-card a:hover .pc-name, .pc-card a:focus-visible .pc-name { background-size: 100% 1px; }
.pc-card a:hover .pc-go .ico { transform: translateX(5px); }
""" + s[b:]
    s = s.replace(".pc-name { font: 650 1.24rem/1.25 var(--f-sans); color: var(--ink); min-height: 2.5em; transition: color var(--d-mid); }",
                  ".pc-name { font: 600 1.3rem/1.25 var(--f-display); color: var(--ink); min-height: 2.5em; justify-self: start; background: linear-gradient(currentColor, currentColor) 0 100% / 0 1px no-repeat; transition: background-size .55s var(--ease); }")
    return s
rw("src/css/00-home.css", home_css)

def v2_css(s):
    a = s.index(".dg-card a { position: relative;"); b = s.index("@media (min-width: 700px) { .dgrid")
    s = s[:a] + """.dg-card a { position: relative; display: grid; align-content: start; gap: .5rem; height: 100%; padding: 0 0 1.8rem; border-right: 1px solid var(--rule-strong); border-bottom: 1px solid var(--rule-strong); text-decoration: none; overflow: hidden; }
.dg-img { display: block; aspect-ratio: 16 / 10; overflow: hidden; margin-bottom: .8rem; }
.dg-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 1.1s var(--ease); }
.dg-card a > :not(.dg-img) { margin-inline: 1.6rem; }
.dg-top { display: flex; justify-content: space-between; align-items: baseline; gap: 1rem; }
.dg-n { font: 400 2.6rem/1 var(--f-display); color: transparent; -webkit-text-stroke: 1px var(--burgundy); letter-spacing: -.02em; }
.dg-deg { font: 600 .74rem/1.3 var(--f-sans); letter-spacing: .07em; text-transform: uppercase; color: var(--red); }
.dg-code { font: 600 1.9rem/1 var(--f-display); color: var(--ink); }
.dg-name { font: 500 1.02rem/1.4 var(--f-sans); color: var(--ink); justify-self: start; background: linear-gradient(currentColor, currentColor) 0 100% / 0 1px no-repeat; transition: background-size .55s var(--ease); }
.dg-meta { font-size: .86rem; color: var(--mute); }
.dg-go { color: var(--red); transition: transform .5s var(--ease); }
/* hover (IIMB minutes): underline and a slight photo zoom, no colour fill */
.dg-card a:hover .dg-img img, .dg-card a:focus-visible .dg-img img { transform: scale(1.05); }
.dg-card a:hover .dg-name, .dg-card a:focus-visible .dg-name { background-size: 100% 1px; }
.dg-card a:hover .dg-go { transform: translate(3px, -3px); }
""" + s[b:]
    # admission steps: dot on the line, label hanging from it
    s = s.replace(".adm-line { position: absolute; left: 0; right: 0; top: 4.2rem; height: 2px; background: var(--rule); display: none; }",
                  ".adm-line { position: absolute; left: 0; right: 0; top: 7px; height: 2px; background: var(--rule); display: none; }")
    s = s.replace(".adm-step { position: relative; display: grid; gap: .6rem; align-content: start; }",
                  ".adm-step { position: relative; display: grid; gap: 0; align-content: start; }\n.adm-step > :not(.adm-dot) { margin: 0 0 0 7px; padding: .35rem 0 .35rem 1.1rem; border-left: 1px solid var(--rule-strong); transition: border-color .5s var(--ease); }\n.adm-step > .adm-num { padding-top: .9rem; }\n.adm-step.on > :not(.adm-dot) { border-left-color: var(--red); }")
    s = s.replace("border: 2px solid var(--rule-strong); margin: .6rem 0 .4rem; position: relative; z-index: 1;", "border: 2px solid var(--rule-strong); margin: 0; position: relative; z-index: 1;")
    return s
rw("src/css/programmes-v2.css", v2_css)

def prog_css(s):
    s = s.replace(".tl-dot { width: 14px; height: 14px; border-radius: 50%; background: var(--white); border: 2px solid var(--burgundy); position: relative; z-index: 1; margin-bottom: .8rem; }",
                  ".tl-dot { width: 14px; height: 14px; border-radius: 50%; background: var(--white); border: 2px solid var(--burgundy); position: relative; z-index: 1; margin: 0; }\n.tl-node { gap: 0 !important; }\n.tl-node > :not(.tl-dot) { margin-left: 6px; padding: .25rem 0 .25rem .9rem; border-left: 1px solid var(--rule-strong); }\n.tl-node > .tl-date { padding-top: .8rem; }\n.tl-node:not(.past) > :not(.tl-dot) { border-left-color: var(--red); }")
    return s
rw("src/css/programmes.css", prog_css)

def prog_js(s):
    a = s.index('    $("[data-degrees]").innerHTML = DEGREES.map(J.prog)'); b = s.index('.join("");', a) + len('.join("");')
    s = s[:a] + '''    $("[data-degrees]").innerHTML = DEGREES.map(J.prog).map((p, i) => { const D = (I.progDetail || {})[p.id] || {}, img = D.hero && J.photo(D.hero) ? D.hero : p.img; return `<li class="dg-card"><a href="${u.prog(p.id)}">
        <span class="dg-img">${J.img(img, { want: 800, sizes: "(min-width: 1100px) 32vw, (min-width: 700px) 50vw, 100vw", alt: "" })}</span>
        <span class="dg-top"><span class="dg-deg">${esc(p.degree)}</span><span class="dg-n" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span></span>
        <span class="dg-code">${esc(p.short)}</span>
        <span class="dg-name">${esc(p.name)}</span>
        <span class="dg-meta">${esc(p.duration)} · ${esc(p.format)}</span>
        <span class="dg-go">${icon("arrow-up")}</span></a></li>`; }).join("");''' + s[b:]
    s = s.replace('`<li class="adm-step"><span class="adm-num">${String(i + 1).padStart(2, "0")}</span><span class="adm-dot" aria-hidden="true"></span><h3 class="h4">',
                  '`<li class="adm-step"><span class="adm-dot" aria-hidden="true"></span><span class="adm-num">${String(i + 1).padStart(2, "0")}</span><h3 class="h4">')
    # rankings band + corner index
    a = '    $("[data-glance]").innerHTML'
    s = s.replace(a, '    $("[data-pr-ranks]").innerHTML = J.rankGrid(I.rankCards || [], "rkg-home");\n' + a, 1)
    s = s.replace("  function intro(", """  function hang() {
    J.hangIndex([["glance", "At a glance"], ["rankings", "Rankings"], ["degrees", "Degree programmes"], ["steps", "Admission steps"], ["exec", "Executive education"], ["finder", "Find your track"], ["ug", "Undergraduate & certificate"], ["dates", "Admissions calendar"], ["faq", "Questions"], ["official", "Apply officially"]].map(([id, t]) => ({ id, t })), { label: "Programmes · on this page" });
  }

  function intro(""", 1)
    return s
rw("assets/js/pages/programmes.js", prog_js)

def prog_html(s):
    s = s.replace('<section class="section glance" aria-labelledby="gl-h">', '<section class="section glance" id="glance" aria-labelledby="gl-h">')
    s = s.replace('<section class="section steps-sec" aria-labelledby="st-h">', '<section class="section steps-sec" id="steps" aria-labelledby="st-h">')
    s = s.replace('<section class="section dates" aria-labelledby="dates-h">', '<section class="section dates" id="dates" aria-labelledby="dates-h">')
    s = s.replace('<section class="section faq-sec" aria-labelledby="faq-h">', '<section class="section faq-sec" id="faq" aria-labelledby="faq-h">')
    s = s.replace('<section class="section official" aria-labelledby="off-h">', '<section class="section official" id="official" aria-labelledby="off-h">')
    band = '''<section class="section pr-ranks" id="rankings" aria-labelledby="rk-h">
  <div class="wrap">
    <div class="dg-head">
      <h2 class="h1" id="rk-h" data-split>Ranked among the world’s best.</h2>
      <p class="dek" data-fade>The latest published results for IIMB and its programmes, as announced on iimb.ac.in. Each card links to the official announcement.</p>
    </div>
    <div data-pr-ranks></div>
  </div>
</section>

'''
    s = s.replace('<section class="section degrees" id="degrees"', band + '<section class="section degrees" id="degrees"', 1)
    s = s.replace('<ul class="pr-keys" data-intro aria-label="Programme levels">\n      <li><a href="#degrees">Degree programmes</a></li>',
                  '<ul class="pr-keys" data-intro aria-label="Programme levels">\n      <li><a href="#rankings">Rankings</a></li>\n      <li><a href="#degrees">Degree programmes</a></li>')
    return s
rw("src/pages/programmes.html", prog_html)
print("programmes updated")
