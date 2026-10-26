"""One-off (26 Oct 2026, third pass): ring + column charts, programme page sections in the official order (rankings
graphic, news, achievements, films), finder rows redesigned, About rankings graphic."""
import os, re
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def rw(rel, fn):
    p = os.path.join(ROOT, rel); s = open(p, encoding="utf-8").read(); s2 = fn(s)
    open(p, "w", encoding="utf-8", newline="\n").write(s2)

CHARTS = """
/* Class profile charts (26 Oct 2026): composition as rings, ordered ranges as columns */
.ring { display: grid; grid-template-columns: minmax(150px, 210px) 1fr; gap: 1.4rem 2rem; align-items: center; }
.ring-dial { --k: 1; position: relative; aspect-ratio: 1; border-radius: 50%; display: grid; place-items: center; }
.ring-hole { width: 64%; aspect-ratio: 1; border-radius: 50%; background: var(--white); display: grid; place-content: center; text-align: center; gap: .15rem; padding: .4rem; }
.bg-white .ring-hole { background: var(--cream-2); }
.ring-hole b { font: 600 clamp(1.7rem, 1.3rem + 1.2vw, 2.3rem)/1 var(--f-display); color: var(--burgundy); }
.ring-hole span { font-size: .78rem; line-height: 1.25; color: var(--mute); max-width: 9ch; margin-inline: auto; }
.ring-key { list-style: none; margin: 0; padding: 0; display: grid; gap: .55rem; }
.ring-key li { display: grid; grid-template-columns: 12px 1fr auto 3rem; gap: .7rem; align-items: center; padding-bottom: .55rem; border-bottom: 1px solid var(--rule); font-size: .92rem; }
.ring-key li:last-child { border-bottom: 0; padding-bottom: 0; }
.ring-key i { width: 12px; height: 12px; border-radius: 3px; }
.ring-key b { font: 600 1rem/1 var(--f-sans); font-variant-numeric: tabular-nums; }
.ring-key small { text-align: right; color: var(--mute); font-size: .8rem; font-variant-numeric: tabular-nums; }
@media (max-width: 520px) { .ring { grid-template-columns: 1fr; } .ring-dial { width: min(220px, 70vw); margin-inline: auto; } }

.cols { display: grid; gap: .6rem; }
.cols ol { list-style: none; margin: 0; padding: 0; display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; gap: clamp(.4rem, 1.2vw, 1rem); align-items: end; min-height: 250px; border-bottom: 1px solid var(--rule-strong); }
.cols li { display: grid; grid-template-rows: auto 1fr; gap: .45rem; height: 100%; }
.col-v { display: grid; justify-items: center; gap: .1rem; }
.col-v b { font: 600 1.25rem/1 var(--f-display); color: var(--ink); }
.col-v small { font-size: .74rem; color: var(--mute); }
.col-track { position: relative; display: flex; align-items: flex-end; justify-content: center; min-height: 170px; }
.col-track i { display: block; width: min(100%, 56px); height: var(--h); background: var(--red); border-radius: 3px 3px 0 0; }
.cols li.max .col-track i { background: var(--burgundy); }
.cols li.max .col-v b { color: var(--burgundy); }
.col-l { grid-row: 3; text-align: center; font-size: .82rem; line-height: 1.25; color: var(--mute); padding-top: .55rem; }
.cols ol { padding-bottom: 0; }
.cols li { grid-template-rows: auto 1fr auto; }
.col-unit { margin: 0; font-size: .78rem; color: var(--mute); }
"""

PAGE = """
/* Programme pages in the official order (26 Oct 2026) */
.pd-charts { display: grid; gap: var(--g); }
@media (min-width: 900px) { .pd-charts { grid-template-columns: repeat(2, minmax(0, 1fr)); } .pd-chart-wide { grid-column: 1 / -1; } }
.pd-chart { padding: clamp(1.2rem, 2.4vw, 2rem); }
.pd-chart-t { font: 600 1.15rem/1.25 var(--f-display); letter-spacing: 0; text-transform: none; color: var(--ink); margin-bottom: .2rem; }
.pd-rankfig { margin: 0; display: grid; gap: .6rem; }
.pd-rankfig img, .ab-rankfig img { width: 100%; height: auto; display: block; box-shadow: 0 30px 60px -40px rgba(20, 20, 20, .45); }
.ab-rankfig { margin: 0 0 var(--s3); display: grid; gap: .6rem; }
.pd-accr { display: flex; flex-wrap: wrap; align-items: center; gap: 1rem 2rem; padding-top: 1.2rem; border-top: 1px solid var(--rule); }
.pd-accr img { height: 56px; width: auto; }
.pd-accr p { flex: 1 1 280px; margin: 0; color: var(--mute); font-size: .92rem; }
.pd-news { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 270px), 1fr)); gap: var(--s3) var(--g); }
.pd-news-a { display: grid; gap: .7rem; text-decoration: none; }
.pd-news-img { display: block; aspect-ratio: 5 / 3; overflow: hidden; background: var(--cream-2); }
.pd-news-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 1s var(--ease); }
.pd-news-type { display: grid; place-items: end start; padding: 1rem 1.1rem; background: var(--burgundy); color: var(--white); }
.pd-news-type span { font: 600 2.4rem/1 var(--f-display); opacity: .9; }
.pd-news-t { font: 600 1.12rem/1.32 var(--f-display); justify-self: start; background: linear-gradient(currentColor, currentColor) 0 100% / 0 1px no-repeat; transition: background-size .55s var(--ease); }
.pd-news-go { display: inline-flex; align-items: center; gap: .4rem; font-size: .8rem; color: var(--red); }
.pd-news-go .ico { width: 14px; height: 14px; }
.pd-news-a:hover .pd-news-img img { transform: scale(1.05); }
.pd-news-a:hover .pd-news-t { background-size: 100% 1px; }
.pd-ach { list-style: none; margin: 0; padding: 0; counter-reset: ach; display: grid; }
.pd-ach li { counter-increment: ach; display: grid; grid-template-columns: 3rem 1fr; padding: 1rem 0; border-top: 1px solid var(--rule); font: 500 1.08rem/1.4 var(--f-display); }
.pd-ach li::before { content: counter(ach, decimal-leading-zero); font: 600 .85rem/1.9 var(--f-sans); color: var(--red); }
.pd-ach a { text-decoration: none; }
.pd-ach a .ico { width: 14px; height: 14px; color: var(--red); }
.pd-ach a:hover { color: var(--red); }
.pd-films { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); gap: var(--s3) var(--g); }
.pd-film { margin: 0; display: grid; gap: .6rem; }
.pd-film[hidden] { display: none; }
.pd-film figcaption { font: 600 1rem/1.35 var(--f-display); }
.pd-film .film .play span { display: none; }
"""

FINDER = """
/* Finder rows (26 Oct 2026): photo, code and level, name, degree, facts, actions */
.prog-row { display: grid; grid-template-columns: 7.5rem 1fr; grid-template-areas: "img body" "act act"; gap: 1rem 1.2rem; padding: 1.3rem 0; border-bottom: 1px solid var(--rule); align-items: start; }
.pr-img { grid-area: img; display: block; aspect-ratio: 4 / 3; overflow: hidden; background: var(--cream-2); }
.pr-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 1s var(--ease); }
.pr-body { grid-area: body; display: grid; gap: .35rem; min-width: 0; }
.pr-top { margin: 0; display: flex; align-items: baseline; flex-wrap: wrap; gap: .3rem .8rem; }
.pr-code { font: 600 1.25rem/1 var(--f-display); color: var(--burgundy); }
.pr-level { font: 600 .7rem/1.2 var(--f-sans); letter-spacing: .07em; text-transform: uppercase; color: var(--red); }
.pr-name { margin: 0; font: 600 clamp(1.1rem, 1rem + .4vw, 1.35rem)/1.25 var(--f-display); }
.pr-name a { text-decoration: none; background: linear-gradient(currentColor, currentColor) 0 100% / 0 1px no-repeat; transition: background-size .55s var(--ease); }
.pr-deg { margin: 0; font-size: .88rem; color: var(--mute); }
.pr-facts { display: flex; flex-wrap: wrap; gap: .5rem 1.6rem; margin: .5rem 0 0; padding-top: .6rem; border-top: 1px dashed var(--rule-strong); font-size: .88rem; }
.pr-facts div { min-width: 0; max-width: 16rem; }
.pr-facts dt { font: 600 .66rem/1.2 var(--f-sans); letter-spacing: .07em; text-transform: uppercase; color: var(--mute); }
.pr-facts dd { margin: .15rem 0 0; line-height: 1.35; }
.pr-act { grid-area: act; display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
.pr-go { display: inline-flex; align-items: center; gap: .5rem; text-decoration: none; font: 600 .82rem/1 var(--f-sans); letter-spacing: .06em; text-transform: uppercase; }
.pr-go span { background: linear-gradient(currentColor, currentColor) 0 100% / 0 1px no-repeat; transition: background-size .55s var(--ease); padding-bottom: .2em; }
.pr-go .ico { width: 16px; height: 16px; color: var(--red); transition: transform .45s var(--ease); }
.prog-row:hover .pr-img img { transform: scale(1.06); }
.prog-row:hover .pr-name a, .pr-name a:focus-visible { background-size: 100% 1px; }
.prog-row:hover .pr-go span, .pr-go:focus-visible span { background-size: 100% 1px; }
.prog-row:hover .pr-go { color: var(--red); }
.prog-row:hover .pr-go .ico { transform: translateX(4px); }
@media (min-width: 700px) {
  .prog-row { grid-template-columns: 11rem 1fr auto; grid-template-areas: "img body act"; gap: 1.4rem; align-items: center; }
  .pr-act { flex-direction: column; align-items: flex-end; gap: .9rem; }
}
"""

def journal(s):
    return s.rstrip() + "\n" + CHARTS
rw("assets/css/journal.css", journal)

def prog(s):
    # drop the old finder row rules (replaced below)
    for pat in [r"\.prog-row \{ display: grid; gap: \.8rem var\(--g\);[^\n]*\n", r"\.pr-main \{[^\n]*\n", r"\.pr-code \{[^\n]*\n", r"\.pr-name \{[^\n]*\n",
                r"\.pr-main:hover \.pr-code \{[^\n]*\n", r"\.pr-main:hover \.h4 \{[^\n]*\n", r"\.pr-facts \{[^\n]*\n", r"\.pr-facts dt \{[^\n]*\n",
                r"\.pr-facts dd \{[^\n]*\n", r"\.pr-act \{[^\n]*\n", r"  \.prog-row \{ grid-template-columns: 6\.4fr 4\.4fr 1\.4fr; align-items: center; \}\n",
                r"  \.pr-act \{ flex-direction: column; align-items: flex-end; \}\n", r"\.pr-code\.long \{[^\n]*\n"]:
        s = re.sub(pat, "", s, count=1)
    return s.rstrip() + "\n" + PAGE + FINDER
rw("src/css/programmes.css", prog)
print("css round 3 done")
