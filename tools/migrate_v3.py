"""One-off migration (24 Oct 2026): IIMB Color Guide palette, single sans-serif family, white/cream section rhythm.
Usage: python tools/migrate_v3.py   (idempotent where possible; review the diff afterwards)"""
import glob, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
J = os.path.join(ROOT, "assets", "css", "journal.css")

s = open(J, encoding="utf-8").read()
# fonts: drop Gloock/Eczar, add Anek Devanagari
s = re.sub(r'@font-face \{ font-family: "(Gloock|Eczar)";[^\n]*\n', "", s)
if "Anek Devanagari" not in s:
    s = s.replace('@font-face { font-family: "Anek Latin"', '@font-face { font-family: "Anek Devanagari"; src: url(../fonts/anek-devanagari.woff2) format("woff2"); font-weight: 100 800; font-stretch: 75% 125%; font-display: swap; unicode-range: U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FF; }\n@font-face { font-family: "Anek Latin"', 1)
tokens = {
    "--burgundy": "#631111", "--burgundy-deep": "#4E0D0D", "--burgundy-ink": "#3B0909",
    "--red": "#A92D2D", "--red-deep": "#8C2323",
    "--cream": "#E8E3DB", "--cream-2": "#F2EEE8", "--blush": "#E8E3DB", "--blush-2": "#F4F1EC", "--gold": "#E8E3DB",
    "--ink": "#141414", "--ink-2": "#0E0E0E", "--white": "#FFFFFF", "--mute": "#585858", "--mute-on-burgundy": "#E4DBD6",
    "--rule": "rgba(20, 20, 20, .14)", "--rule-strong": "rgba(20, 20, 20, .34)", "--rule-light": "rgba(232, 227, 219, .26)",
}
for k, v in tokens.items():
    s = re.sub(r"(\n\s*%s:\s*)[^;]+;" % re.escape(k), r"\g<1>%s;" % v, s)
s = s.replace("/* Pinned palette + verified IIMB colours */", "/* IIMB Color Guide: red #A92D2D, maroon #631111, cream #E8E3DB; neutrals white/black/greys */")
s = re.sub(r'--f-display: [^;]+;', '--f-display: "Anek Latin", "Anek Devanagari", "Segoe UI", system-ui, sans-serif;', s)
s = re.sub(r'--f-serif: [^;]+;', '--f-serif: "Anek Latin", "Anek Devanagari", "Segoe UI", system-ui, sans-serif;', s)
s = re.sub(r'--f-sans: [^;]+;', '--f-sans: "Anek Latin", "Anek Devanagari", "Segoe UI", system-ui, sans-serif;', s)
s = s.replace("margin: 0; background: var(--cream); color: var(--ink);", "margin: 0; background: var(--white); color: var(--ink);")
open(J, "w", encoding="utf-8", newline="\n").write(s)

LITERALS = [
    ("rgba(251, 245, 236,", "rgba(232, 227, 219,"), ("rgba(58, 15, 31,", "rgba(99, 17, 17,"), ("rgba(100, 29, 53,", "rgba(99, 17, 17,"),
    ("rgba(29, 20, 22,", "rgba(14, 10, 10,"), ("rgba(42, 41, 40,", "rgba(20, 20, 20,"), ("rgba(177, 35, 34,", "rgba(169, 45, 45,"),
    ("#EBDDC2", "var(--cream)"), ("#5D3943", "var(--mute)"), ("#6B3E4A", "var(--mute)"), ("#857A75", "#6E6E6E"), ("#8E8380", "#707070"),
    ("#C9BFBA", "#BDBDBD"), ("%23641D35", "%23631111"),
]
for f in glob.glob(os.path.join(ROOT, "src", "css", "*.css")) + [J]:
    t = open(f, encoding="utf-8").read()
    o = t
    # display type: Gloock was a single weight; the sans display needs real weight
    t = re.sub(r"font: 400 ([^;]*?)var\(--f-display\)", r"font: 650 \1var(--f-display)", t)
    for a, b in LITERALS:
        t = t.replace(a, b)
    if t != o:
        open(f, "w", encoding="utf-8", newline="\n").write(t)
        print("updated", os.path.basename(f))

# section background classes leave the page templates and scripts; core.js alternates white/cream
CLS = re.compile(r"\s(on-dark|on-burgundy|on-blush|on-cream2|on-white)(?=[\s\"'])")
for f in glob.glob(os.path.join(ROOT, "src", "pages", "*.html")) + glob.glob(os.path.join(ROOT, "assets", "js", "pages", "*.js")):
    t = open(f, encoding="utf-8").read()
    n = CLS.sub("", t)
    n = n.replace('class="on-dark ', 'class="').replace('class="on-burgundy ', 'class="')
    if n != t:
        open(f, "w", encoding="utf-8", newline="\n").write(n)
        print("classes", os.path.basename(f))
