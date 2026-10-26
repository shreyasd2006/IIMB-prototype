"""One-off (26 Oct 2026, second pass): standings list for rankings, pinned programme strip, card hover (zoom + underline
on name and action), solid programme codes (no outlined lettering), no thick side borders."""
import os, re
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def rw(rel, fn):
    p = os.path.join(ROOT, rel); s = open(p, encoding="utf-8").read(); s2 = fn(s)
    open(p, "w", encoding="utf-8", newline="\n").write(s2)

LEDGER = """
/* Rankings as standings (26 Oct 2026): one featured result, then a list read like a league table */
.rkl { display: grid; gap: var(--s3) var(--g); align-items: start; }
@media (min-width: 1000px) { .rkl.has-feature { grid-template-columns: 4.6fr 7.4fr; column-gap: clamp(2rem, 5vw, 5.5rem); } .rkl-feature { position: sticky; top: calc(var(--header-h) + 2rem); } }
.rkl-feature { display: grid; gap: .9rem; align-content: start; padding: clamp(1.6rem, 3vw, 2.6rem); background: var(--burgundy); color: var(--white); overflow: hidden; position: relative; isolation: isolate; }
.rkl-feature::after { content: ""; position: absolute; inset: auto -20% -45% 35%; height: 90%; background: radial-gradient(closest-side, rgba(169, 45, 45, .55), transparent); z-index: -1; }
.rkl-f-by { margin: 0; font: 600 .76rem/1.3 var(--f-sans); letter-spacing: .08em; text-transform: uppercase; color: var(--mute-on-burgundy); }
.rkl-f-n { margin: .2rem 0 0; display: flex; align-items: baseline; gap: .8rem; font: 600 clamp(6rem, 4rem + 6vw, 9.6rem)/.82 var(--f-display); letter-spacing: -.03em; }
.rkl-f-n .num { font-family: inherit; font-weight: inherit; }
.rkl-f-pre { font: 500 1.05rem/1 var(--f-sans); letter-spacing: .02em; color: var(--mute-on-burgundy); }
.rkl-f-what { margin: .4rem 0 0; font: 600 clamp(1.4rem, 1.1rem + .8vw, 1.9rem)/1.2 var(--f-display); }
.rkl-f-note { margin: 0; font-size: 1rem; color: var(--mute-on-burgundy); max-width: 30ch; }
.rkl-f-src { margin: .6rem 0 0; font-size: .78rem; color: var(--mute-on-burgundy); }
.rkl-f-src a { color: var(--white); }
.rkl-list { list-style: none; margin: 0; padding: 0; border-top: 2px solid var(--ink); }
.rkl-row { position: relative; display: grid; grid-template-columns: 6.6rem 1fr auto 2.6rem; gap: .2rem 1.4rem; align-items: center; padding: 1.15rem .4rem 1.15rem 0; transition: background .45s var(--ease); }
.rkl-rule { position: absolute; left: 0; right: 0; bottom: 0; height: 1px; background: var(--rule-strong); }
.rkl-n { display: flex; align-items: flex-start; gap: .1rem; font: 600 clamp(2.8rem, 2.2rem + 1.6vw, 3.9rem)/.9 var(--f-display); color: var(--burgundy); letter-spacing: -.02em; transition: color .45s var(--ease), transform .6s var(--ease); }
.rkl-n .num { font-family: inherit; font-weight: inherit; }
.rkl-hash { font-size: .4em; line-height: 1.2; color: var(--red); }
.rkl-body { display: grid; gap: .3rem; min-width: 0; }
.rkl-what { font: 600 1.18rem/1.3 var(--f-display); }
.rkl-scope { font-size: .9rem; color: var(--mute); }
.rkl-prog { margin-left: .3rem; padding: .2em .5em .14em; border: 1px solid var(--red); color: var(--red); font: 600 .7rem/1 var(--f-sans); letter-spacing: .05em; text-decoration: none; vertical-align: .22em; transition: background var(--d-fast), color var(--d-fast); }
.rkl-prog:hover, .rkl-prog:focus-visible { background: var(--red); color: var(--white); }
.rkl-by { display: grid; justify-items: end; gap: .2rem; font: 500 .8rem/1.25 var(--f-sans); color: var(--mute); text-align: right; }
.rkl-by b { font: 600 1rem/1 var(--f-sans); color: var(--ink); }
.rkl-src { display: grid; place-items: center; width: 2.4rem; height: 2.4rem; border-radius: 50%; color: var(--red); border: 1px solid var(--rule-strong); transition: background var(--d-mid), color var(--d-mid), border-color var(--d-mid), transform .5s var(--ease); }
.rkl-src .ico { width: 16px; height: 16px; }
.rkl-row:hover { background: linear-gradient(90deg, rgba(169, 45, 45, .07), transparent 70%); }
.rkl-row:hover .rkl-n { color: var(--red); transform: translateX(.35rem); }
.rkl-src:hover, .rkl-src:focus-visible { background: var(--red); border-color: var(--red); color: var(--white); transform: rotate(-45deg); }
@media (max-width: 640px) {
  .rkl-row { grid-template-columns: 4.6rem 1fr 2.4rem; grid-template-areas: "n body src" "n by src"; }
  .rkl-n { grid-area: n; } .rkl-body { grid-area: body; } .rkl-by { grid-area: by; justify-items: start; text-align: left; grid-auto-flow: column; justify-content: start; gap: .5rem; } .rkl-src { grid-area: src; }
}
"""

def journal(s):
    a = s.index("/* Ranking cards: one look on Home, About, Programmes and every programme page */")
    b = s.index("/* Stat tiles */")
    s = s[:a] + s[b:]
    s = s.replace(".rkc-n .num { font-family: inherit; font-weight: inherit; }\n", "")
    s = s.rstrip() + "\n" + LEDGER
    # hanging index: no thick side bar on the active item
    s = s.replace(".hang-panel a { display: grid; grid-template-columns: 2rem 1fr; gap: .4rem; padding: .62rem .7rem; text-decoration: none; font-size: .95rem; line-height: 1.3; border-left: 2px solid transparent; transition: background var(--d-fast), color var(--d-fast); }",
                  ".hang-panel a { display: grid; grid-template-columns: 2rem 1fr; gap: .4rem; padding: .62rem .7rem; text-decoration: none; font-size: .95rem; line-height: 1.3; transition: background var(--d-fast), color var(--d-fast); }")
    s = s.replace(".hang-panel a.on { border-left-color: var(--red); color: var(--burgundy); font-weight: 600; background: var(--cream-2); }",
                  ".hang-panel a.on { color: var(--burgundy); font-weight: 600; background: var(--cream-2); }\n.hang-panel a.on .num { color: var(--red); }")
    s = s.rstrip() + "\n.ink-w { will-change: opacity; }\n"
    return s
rw("assets/css/journal.css", journal)

PIN = """
/* Programme strip: pinned and moved sideways by the scroll on wide screens (same motion as the About milestones) */
.pc-foot { display: flex; align-items: center; gap: 1.2rem; }
.pc-dots { display: flex; align-items: center; gap: 1rem; width: 100%; }
.pc-prog { position: relative; flex: 1; height: 2px; background: var(--rule); overflow: hidden; }
.pc-prog i { position: absolute; inset: 0; background: var(--red); transform-origin: 0 50%; transform: scaleX(.04); transition: transform .2s linear; }
.pc-count { font: 600 .85rem/1 var(--f-sans); letter-spacing: .06em; color: var(--mute); min-width: 4.6rem; text-align: right; }
.pc-pinned { min-height: calc(100vh - var(--header-h)); display: flex; flex-direction: column; justify-content: center; padding-block: clamp(1.6rem, 4vh, 3rem); }
.pc-pinned .pc-rail { overflow: hidden; scroll-snap-type: none; cursor: default; }
.pc-pinned .pc-track { will-change: transform; }
.pc-pinned .pc-head { margin-bottom: clamp(1.2rem, 3vh, 2.4rem); }
.pc-pinned .pc-img { aspect-ratio: 3 / 2; }
.pc-pinned .pc-card { opacity: .55; transition: opacity .6s var(--ease); }
.pc-pinned .pc-card.in-focus { opacity: 1; }
.pc-pinned .pc-card.in-focus a { border-color: var(--rule-strong); }
.pc-pinned .pc-card:hover { opacity: 1; }
@media (prefers-reduced-motion: reduce) { .pc-pinned .pc-card { opacity: 1; } }
/* hover: the photograph zooms slightly; one underline runs under the name and the action */
.pc-go span { background: linear-gradient(currentColor, currentColor) 0 100% / 0 1px no-repeat; transition: background-size .55s var(--ease); padding-bottom: .2em; }
.pc-card a:hover .pc-go span, .pc-card a:focus-visible .pc-go span { background-size: 100% 1px; }
.pc-card a:hover .pc-go, .pc-card a:focus-visible .pc-go { color: var(--red); }
"""
def home(s):
    s = s.replace(".pc-dots { display: flex; gap: .45rem; }\n", "")
    s = s.replace(".pc-dots i { width: 8px; height: 8px; border-radius: 50%; background: var(--rule-strong); transition: background var(--d-mid), width .5s var(--ease); }\n", "")
    s = s.replace(".pc-dots i.on { background: var(--red); width: 26px; border-radius: 4px; }\n", "")
    return s.rstrip() + "\n" + PIN
rw("src/css/00-home.css", home)

def prog(s):
    s = re.sub(r"\.prog-code \{ margin: 0; font: 600 clamp\(5rem, 3rem \+ 9vw, 12rem\)/\.8 var\(--f-display\); letter-spacing: -\.03em; color: transparent; -webkit-text-stroke: 1\.5px var\(--gold\);",
               ".prog-code { margin: 0; font: 600 clamp(4.4rem, 2.6rem + 7vw, 9.6rem)/.86 var(--f-display); letter-spacing: -.02em; color: var(--cream);", s)
    s = s.replace(".pd-n { margin: 0; font: 600 .9rem/1 var(--f-sans); color: var(--red); letter-spacing: .08em; }\n", "")
    s = s.replace('.pd-n::after { content: ""; display: inline-block; width: 2.4rem; height: 1px; background: var(--red); vertical-align: middle; margin-left: .7rem; }\n', "")
    s = s.replace("  .pd-wide .pd-h { position: static; grid-template-columns: auto 1fr; column-gap: 1.6rem; align-items: baseline; }\n  .pd-wide .pd-h .pd-n { grid-row: 1; }\n  .pd-wide .pd-h .h2 { grid-column: 2; }\n  .pd-wide .pd-h .pd-dek { grid-column: 2; }\n",
                  "  .pd-wide .pd-h { position: static; grid-template-columns: 7fr 5fr; column-gap: clamp(2rem, 5vw, 6rem); align-items: end; }\n")
    s = s.replace(".pd-kicker { margin: 0; font: 600 .78rem/1.3 var(--f-sans); letter-spacing: .08em; text-transform: uppercase; color: var(--red); }\n", "")
    return s
rw("src/css/programmes.css", prog)

def v2(s):
    return s.replace(".dg-n { font: 400 2.6rem/1 var(--f-display); color: transparent; -webkit-text-stroke: 1px var(--burgundy); letter-spacing: -.02em; }",
                     ".dg-n { font: 600 1.05rem/1 var(--f-sans); color: var(--mute); letter-spacing: .06em; }")
rw("src/css/programmes-v2.css", v2)

def about(s):
    s = re.sub(r"\.iac-mono \{[^}]*\}\n", ".iac-mono { display: none; }\n", s)
    s = s.replace(".act-k { color: var(--red); margin-bottom: .8rem; }\n", "")
    s = s.replace(".act-doc { display: grid; grid-template-columns: 4.6rem 1fr auto; grid-template-areas: \"y kind pdf\" \"y t t\" \"y note note\"; gap: .25rem 1rem; padding: 1.1rem 1.2rem; background: var(--white); text-decoration: none; border-left: 3px solid transparent; transition: border-color var(--d-mid), transform .5s var(--ease), box-shadow .5s var(--ease); }",
                  ".act-doc { display: grid; grid-template-columns: 4.6rem 1fr auto; grid-template-areas: \"y kind pdf\" \"y t t\" \"y note note\"; gap: .25rem 1rem; padding: 1.1rem 1.2rem; background: var(--white); text-decoration: none; transition: transform .5s var(--ease), box-shadow .5s var(--ease); }")
    s = s.replace(".act-doc:hover { border-left-color: var(--red); transform: translateX(4px); box-shadow: 0 16px 34px -26px rgba(20, 20, 20, .45); }",
                  ".act-doc:hover { transform: translateX(4px); box-shadow: 0 16px 34px -26px rgba(20, 20, 20, .45); }")
    return s
rw("src/css/about.css", about)
print("css updated")
