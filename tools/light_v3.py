"""One-off (24 Oct 2026): sections are now white or cream, so components that assumed a dark section get dark-on-light colours.
Self-contained colour blocks (quote boxes, feature cards, event tiles) keep their maroon fill."""
import os, re
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSS = os.path.join(ROOT, "src", "css")

def edit(name, pairs):
    p = os.path.join(CSS, name); s = open(p, encoding="utf-8").read()
    for a, b in pairs:
        if a not in s:
            raise SystemExit(f"{name}: not found: {a[:70]}")
        s = s.replace(a, b)
    open(p, "w", encoding="utf-8", newline="\n").write(s)

edit("about.css", [
    (".ab-hero { background: var(--cream); padding-block", ".ab-hero { padding-block"),
    (".vis-label { grid-column: 1 / -1; color: var(--gold);", ".vis-label { grid-column: 1 / -1; color: var(--red);"),
    (".vis-mission .meta, .vis-values .meta { color: var(--gold);", ".vis-mission .meta, .vis-values .meta { color: var(--red);"),
    ("padding-top: 1rem; border-top: 1px solid var(--rule-light); }", "padding-top: 1rem; border-top: 1px solid var(--rule-strong); }"),
    (".mission li::before { content: counter(m, decimal-leading-zero); color: var(--gold);", ".mission li::before { content: counter(m, decimal-leading-zero); color: var(--red);"),
    (".values li { padding: .8rem 0; border-top: 1px solid var(--rule-light);", ".values li { padding: .8rem 0; border-top: 1px solid var(--rule-strong);"),
    (".tl-sec { background: var(--cream-2); padding-block", ".tl-sec { padding-block"),
    ("border-radius: 50%; background: var(--cream-2); border: 2px solid var(--burgundy);", "border-radius: 50%; background: var(--white); border: 2px solid var(--burgundy);"),
    (".tl-year .en { color: var(--gold); }", ".tl-year .en { color: var(--red); }"),
    (".ab-arch { background: var(--cream); overflow: hidden; }", ".ab-arch { overflow: hidden; }"),
    (".arch-quote { margin: 0; padding: 1.6rem; background: var(--burgundy); color: var(--cream); }", ".arch-quote { margin: 0; padding: 1.6rem; background: var(--burgundy); color: var(--white); }"),
    (".arch-quote a { color: var(--blush); }", ".arch-quote a { color: var(--white); }"),
    (".lead-chair { margin: 0; padding: 2rem; background: var(--blush); color: var(--burgundy-ink);", ".lead-chair { margin: 0; padding: 2rem; background: var(--burgundy); color: var(--white);"),
    (".lead-chair .src { color: var(--mute); }", ".lead-chair .src { color: var(--mute-on-burgundy); }\n.lead-chair .src a { color: var(--white); }"),
])

edit("centre.css", [
    (".cn-burgundy { background: var(--burgundy); color: var(--cream); }\n.cn-ink { background: var(--ink-2); color: var(--cream); }\n.cn-blush { background: var(--blush); color: var(--burgundy-ink); }\n.cn-gold { background: var(--cream); color: var(--burgundy-ink); }\n.cn-red { background: var(--red); color: var(--white); }",
     "/* hero tone now lives in the abbreviation colour; the section itself follows the white/cream rhythm */\n.cn-hero { --cn-acc: var(--red); }\n.cn-burgundy { --cn-acc: var(--burgundy); }\n.cn-ink { --cn-acc: var(--ink); }"),
    (".cn-hero { padding-block: clamp(1.4rem, 3vh, 2.4rem) var(--s5); background: var(--white); color: var(--ink); }", ".cn-hero { padding-block: clamp(1.4rem, 3vh, 2.4rem) var(--s5); color: var(--ink); }"),
    (".cn-id .crumbs { padding: 0; color: inherit; opacity: .8; }", ".cn-id .crumbs { padding: 0; color: var(--mute); }"),
    ("letter-spacing: -.04em; overflow: hidden; padding-bottom: .04em; }", "letter-spacing: -.04em; overflow: hidden; padding-bottom: .04em; color: var(--cn-acc); }"),
    (".cn-burgundy .cn-abbr, .cn-ink .cn-abbr { color: var(--gold); }\n.cn-cream .cn-abbr { color: var(--red); }\n", ""),
    ("text-transform: uppercase; opacity: .85; }", "text-transform: uppercase; color: var(--red); }"),
    (".cn-plate .caption { color: inherit; opacity: .78; }", ".cn-plate .caption { color: var(--mute); }"),
    (".on-white .cn-up a { background: var(--cream); }", ".bg-white .cn-up a { background: var(--cream); }"),
    (".cn-contact p { display: grid; gap: .3rem; margin: 0; padding-top: 1rem; border-top: 1px solid var(--rule-light); }\n.cn-contact .meta { color: var(--gold); }\n.cn-contact a { color: var(--cream); }",
     ".cn-contact p { display: grid; gap: .3rem; margin: 0; padding-top: 1rem; border-top: 1px solid var(--rule-strong); }\n.cn-contact .meta { color: var(--red); }\n.cn-contact a { color: var(--ink); text-decoration-color: var(--red); }"),
])

edit("centres.css", [
    (".ct-hero { background: var(--cream); padding-block", ".ct-hero { padding-block"),
    (".ct-feature { display: grid; text-decoration: none; background: var(--ink-2); color: var(--cream);", ".ct-feature { display: grid; text-decoration: none; background: var(--burgundy); color: var(--white);"),
    (".cp-ink a { background: var(--ink-2); color: var(--cream); }", ".cp-ink a { background: var(--burgundy-deep); color: var(--white); }"),
    (".g-lines path { fill: none; stroke: var(--gold); stroke-width: 1; opacity: .5;", ".g-lines path { fill: none; stroke: var(--burgundy); stroke-width: 1; opacity: .28;"),
    ("background: none; color: var(--cream); text-decoration: none; padding: .45rem 0;", "background: none; color: var(--ink); text-decoration: none; padding: .45rem 0;"),
    (".g-ab { font: 650 1.1rem/1 var(--f-display); color: var(--gold);", ".g-ab { font: 650 1.1rem/1 var(--f-display); color: var(--red);"),
    (".g-nm { font-size: .82rem; color: var(--mute-on-burgundy); }", ".g-nm { font-size: .82rem; color: var(--mute); }"),
    (".graph.lit .g-t.on { color: var(--white);", ".graph.lit .g-t.on { color: var(--red);"),
    (".graph.lit .g-c.on .g-ab { color: var(--red); }", ".graph.lit .g-c.on .g-ab { color: var(--burgundy); }"),
])

edit("research.css", [
    (".rs-intro .dek { color: rgba(232, 227, 219, .88); }", ".rs-intro .dek { color: var(--ink); }"),
    (".rs-stat { margin: 0; font-size: .95rem; color: var(--mute-on-burgundy); }", ".rs-stat { margin: 0; font-size: .95rem; color: var(--mute); }"),
    ("var(--f-display); color: var(--gold); margin-bottom: .3rem; }", "var(--f-display); color: var(--red); margin-bottom: .3rem; }"),
    (".theme-index { list-style: none; border-top: 1px solid var(--rule-light); }\n.theme-index li { border-bottom: 1px solid var(--rule-light); }", ".theme-index { list-style: none; border-top: 2px solid var(--ink); }\n.theme-index li { border-bottom: 1px solid var(--rule-strong); }"),
    (".ti-n { grid-area: n; color: var(--gold);", ".ti-n { grid-area: n; color: var(--red);"),
    (".ti-row:hover .ti-t { transform: translateX(10px); color: var(--white); }", ".ti-row:hover .ti-t { transform: translateX(10px); color: var(--red); }"),
    (".ti-d { grid-area: d; color: var(--mute-on-burgundy);", ".ti-d { grid-area: d; color: var(--mute);"),
    ("font-size: .88rem; color: var(--mute-on-burgundy); margin-top: .3rem; }", "font-size: .88rem; color: var(--mute); margin-top: .3rem; }"),
    (".ti-s b { font-weight: 500; color: var(--cream);", ".ti-s b { font-weight: 600; color: var(--ink);"),
    ("border-radius: 50%; border: 1px solid var(--rule-light); display: grid; place-items: center;", "border-radius: 50%; border: 1px solid var(--rule-strong); color: var(--red); display: grid; place-items: center;"),
    (".ti-row:hover .ti-go { background: var(--red); border-color: var(--red);", ".ti-row:hover .ti-go { background: var(--red); border-color: var(--red); color: var(--white);"),
    (".rs-features { background: var(--cream); }\n", ""),
    (".map-themes { list-style: none; display: grid; gap: 0; border-top: 1px solid var(--rule-light); }", ".map-themes { list-style: none; display: grid; gap: 0; border-top: 2px solid var(--ink); }"),
    ("border-bottom: 1px solid var(--rule-light); background: none; color: var(--cream); padding: .9rem 0;", "border-bottom: 1px solid var(--rule-strong); background: none; color: var(--ink); padding: .9rem 0;"),
    (".map-theme[aria-pressed=\"true\"] { color: var(--gold);", ".map-theme[aria-pressed=\"true\"] { color: var(--red);"),
    (".map-col .meta { color: var(--gold);", ".map-col .meta { color: var(--red);"),
    ("padding: .45em .7em .38em; border: 1px solid var(--rule-light);", "padding: .45em .7em .38em; border: 1px solid var(--rule-strong);"),
    ("opacity: 1; background: var(--cream); color: var(--burgundy-ink); border-color: var(--cream);", "opacity: 1; background: var(--red); color: var(--white); border-color: var(--red);"),
    (".map-node:hover { border-color: var(--gold); }", ".map-node:hover { border-color: var(--red); color: var(--red); }"),
])

edit("partnerships.css", [
    (".ps-hero .lede { color: rgba(232, 227, 219, .9); }", ".ps-hero .lede { color: var(--ink); }"),
    (".ps-quick .btn.ghost { color: var(--cream); }\n", ""),
    (".ps-hero-plate .caption { color: var(--mute-on-burgundy); }", ".ps-hero-plate .caption { color: var(--mute); }"),
    (".ps-routes { background: var(--cream); }\n", ""),
    (".enq-contacts li { display: grid; gap: .1rem; padding-top: .7rem; border-top: 1px solid var(--rule-light); }\n.enq-contacts a { color: var(--cream); }", ".enq-contacts li { display: grid; gap: .1rem; padding-top: .7rem; border-top: 1px solid var(--rule-strong); }\n.enq-contacts a { color: var(--ink); text-decoration-color: var(--red); }"),
    (".enq-form label { color: var(--blush); }\n.enq-form .input, .enq-form .select { background: var(--cream); color: var(--ink); border-color: transparent; }\n.enq-form .input:focus, .enq-form .select:focus { box-shadow: 0 0 0 3px var(--gold); }\n.enq-form [aria-invalid=\"true\"] { box-shadow: 0 0 0 2px #FFB4AE; }\n.err { margin: 0; font-size: .85rem; color: #FFD2CE; }",
     ".enq-form label { color: var(--ink); }\n.enq-form .input, .enq-form .select { background: var(--white); color: var(--ink); border-color: var(--rule-strong); }\n.bg-white .enq-form .input, .bg-white .enq-form .select { background: var(--cream-2); }\n.enq-form .input:focus, .enq-form .select:focus { border-color: var(--red); box-shadow: 0 0 0 3px rgba(169, 45, 45, .2); }\n.enq-form [aria-invalid=\"true\"] { border-color: var(--red); box-shadow: 0 0 0 2px rgba(169, 45, 45, .3); }\n.err { margin: 0; font-size: .85rem; color: var(--red-deep); }"),
    (".enq-done { padding: 1.4rem; background: var(--cream); color: var(--ink);", ".enq-done { padding: 1.4rem; background: var(--white); color: var(--ink);"),
])

edit("programmes.css", [
    (".prog-panel { padding: clamp(1.2rem, 3vw, 2.5rem) var(--m) clamp(2rem, 5vw, 3.5rem);", ".prog-panel { background: var(--burgundy); color: var(--white); padding: clamp(1.2rem, 3vw, 2.5rem) var(--m) clamp(2rem, 5vw, 3.5rem);"),
    (".prog-degree { font: 400 1.15rem/1.4 var(--f-serif); color: var(--blush);", ".prog-degree { font: 400 1.15rem/1.4 var(--f-serif); color: var(--cream);"),
])

edit("campus.css", [
    (".ess figcaption { font-size: .82rem; line-height: 1.4; color: var(--mute-on-burgundy); max-width: 46ch; }\n.ess figcaption .num { color: var(--gold); margin-right: .3rem; }\n.ess figcaption a { color: var(--blush); }",
     ".ess figcaption { font-size: .82rem; line-height: 1.4; color: var(--mute); max-width: 46ch; }\n.ess figcaption .num { color: var(--red); margin-right: .3rem; }\n.ess figcaption a { color: var(--ink); }"),
    (".cm-slot { color: var(--blush); border-color: var(--blush);", ".cm-slot { color: var(--red); border-color: var(--red);"),
])

edit("faculty.css", [
    ("scroll-snap-type: x proximity; cursor: grab; scrollbar-color: var(--gold) transparent; }", "scroll-snap-type: x proximity; cursor: grab; scrollbar-color: var(--red) transparent; }"),
    (".col-t { font-size: .82rem; color: var(--mute-on-burgundy); }", ".col-t { font-size: .82rem; color: var(--mute); }"),
    ("margin-top: var(--s4); padding-top: 1.4rem; border-top: 1px solid var(--rule-light); }", "margin-top: var(--s4); padding-top: 1.4rem; border-top: 2px solid var(--ink); }"),
    (".pager .meta { color: var(--gold); }\n.pager:hover .h3 { color: var(--white);", ".pager .meta { color: var(--red); }\n.pager:hover .h3 { color: var(--red);"),
    (".fc-letter { font: 650 clamp(3.4rem, 2.6rem + 3vw, 6rem)/.8 var(--f-display); color: var(--blush); }", ".fc-letter { font: 650 clamp(3.4rem, 2.6rem + 3vw, 6rem)/.8 var(--f-display); color: var(--red); }"),
    (".pp-hero { background: var(--cream); padding-block", ".pp-hero { padding-block"),
])

edit("industry.css", [(".in-hero { background: var(--cream); padding-top", ".in-hero { padding-top")])
edit("theme.css", [(".th-hero { background: var(--blush); color: var(--burgundy-ink); padding-bottom", ".th-hero { color: var(--ink); padding-bottom")])
edit("news.css", [
    (".nw-hero { background: var(--cream); padding-block", ".nw-hero { padding-block"),
    (".nw-index { padding-block: var(--s4) var(--s6); background: var(--cream); }", ".nw-index { padding-block: var(--s4) var(--s6); }"),
    (".nw-browse { background: var(--ink-2); color: var(--cream);", ".nw-browse { background: var(--burgundy); color: var(--white);"),
])
edit("utility-pages.css", [(".cr-hero { background: var(--cream); padding-block", ".cr-hero { padding-block")])

# the rhythm classes must beat single-class section rules in page CSS
p = os.path.join(ROOT, "assets", "css", "journal.css"); s = open(p, encoding="utf-8").read()
s = s.replace(".bg-white { background: var(--white); }\n.bg-cream { background: var(--cream); }",
              ":is(section, header, article, div).bg-white { background: var(--white); }\n:is(section, header, article, div).bg-cream { background: var(--cream); }")
open(p, "w", encoding="utf-8", newline="\n").write(s)
print("light colours applied")
