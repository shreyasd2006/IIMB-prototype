"""One-off (26 Oct 2026): resize the high-resolution official photos and register them in data/photos.js."""
import json, os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "research", "img-oct26")
OUT = os.path.join(ROOT, "assets", "img")
P = "https://www.iimb.ac.in/"

PHOTOS = {
    "hr-pgp-batch":      ("placements.jpg", "The PGP 2025–27 cohort gathered on the lawns, in formal dress.", "PGP 2025–27 cohort", "IIM Bangalore, summer placements 2026", P + "iimb-summer-placements-2026"),
    "hr-pgp-group":      ("pgp-2.jpg", "Six PGP students in suits gather around a laptop on a stone parapet.", "PGP students on campus", "IIM Bangalore, PGP", P + "programmes/pgp"),
    "hr-pgpba-class":    ("pgpba-hero.jpg", "A tiered IIMB classroom of students at laptops during a session.", "A PGPBA classroom", "IIM Bangalore, PGPBA", P + "programmes/pgpba"),
    "hr-epgp-batch":     ("epgp-hero.jpg", "The EPGP cohort and faculty standing on a lawn beneath tall trees.", "The EPGP cohort", "IIM Bangalore, EPGP", P + "programmes/epgp"),
    "hr-epgp-group":     ("epgp-2.jpg", "EPGP participants in business dress around a laptop on campus.", "EPGP participants", "IIM Bangalore, EPGP", P + "programmes/epgp"),
    "hr-epgp-paris":     ("epgp-immersion-2.jpg", "The EPGP cohort on a rooftop in Paris during the international immersion.", "International immersion, Paris, 2026", "IIM Bangalore, EPGP immersion", P + "programmes/epgp/epgp-international-immersion"),
    "hr-epgp-essec":     ("epgp-immersion.jpg", "EPGP students in a classroom at a partner business school abroad.", "Immersion week at a partner school, 2026", "IIM Bangalore, EPGP immersion", P + "programmes/epgp/epgp-international-immersion"),
    "hr-pgpem-batch":    ("pgpem-hero.jpg", "The PGPEM 2026–28 cohort standing in rows in front of a stone building.", "The PGPEM 2026–28 cohort", "IIM Bangalore, PGPEM", P + "programmes/pgpem"),
    "hr-pgpem-steps":    ("pgpem-2.jpg", "A large PGPEM group on stone steps among trees.", "PGPEM students", "IIM Bangalore, PGPEM", P + "programmes/pgpem"),
    "hr-pgppm-class":    ("pgppm-2.jpg", "PGPPM participants seated at a wooden table with a laptop, on campus.", "PGPPM participants", "IIM Bangalore, PGPPM admissions", P + "admissions/pgppm-admissions"),
    "hr-pgppm-batch":    ("pgppm-hero.jpg", "A PGPPM cohort with faculty beside a programme banner.", "A PGPPM cohort", "IIM Bangalore, PGPPM", P + "programmes/pgppm"),
    "hr-predoc-steps":   ("predoc-hero.jpg", "NSR Pre-doctoral fellows standing on stone amphitheatre steps.", "NSR Pre-doc fellows", "IIM Bangalore, NSR Pre-doc", P + "programmes/nsrpredoc"),
    "hr-predoc-walk":    ("predoc-2.jpg", "A group of fellows taking a selfie on a tree-lined campus path.", "NSR Pre-doc fellows", "IIM Bangalore, NSR Pre-doc", P + "programmes/nsrpredoc"),
    "hr-exchange":       ("exchange.jpg", "Exchange students and IIMB students at an outdoor table in a courtyard.", "Exchange students at IIMB", "IIM Bangalore, Student Exchange", P + "programmes/pgp/student-exchange-programme"),
    "hr-ee-avenue":      ("ee-hero.jpg", "A tree-lined avenue on the IIMB campus with purple blossom on the road.", "The campus avenue", "IIM Bangalore, Executive Education", "https://eep.iimb.ac.in/"),
    "hr-ee-corridor":    ("ee-2.jpg", "A pergola corridor between stone columns, open to the garden.", "A corridor in the academic block", "IIM Bangalore, Executive Education", "https://eep.iimb.ac.in/"),
    "hr-about-avenue":   ("about-hero.jpg", "A road curving through trees to a stone building on the IIMB campus.", "The approach to the academic block", "IIM Bangalore, About", P + "about-institute"),
    "hr-recruiters":     ("recruiters.jpg", "Students and recruiters in conversation on a shaded lawn.", "Placement week on campus", "IIM Bangalore, Career Development Services", P + "recruiters"),
}

reg = {}
for key, (fn, alt, cap, credit, src) in PHOTOS.items():
    im = Image.open(os.path.join(SRC, fn)).convert("RGB")
    w, h = im.size
    sizes = {}
    for target in (800, 1600, 2400):
        if target > w and target != 800:
            if target == 1600 and w > 800:
                name = f"{key}-{w}.jpg"; im.save(os.path.join(OUT, name), quality=84, optimize=True, progressive=True); sizes[str(w)] = "assets/img/" + name
            continue
        t = min(target, w)
        r = im.resize((t, round(h * t / w)), Image.LANCZOS) if t != w else im
        name = f"{key}-{target}.jpg"
        r.save(os.path.join(OUT, name), quality=82, optimize=True, progressive=True)
        sizes[str(target)] = "assets/img/" + name
    reg[key] = {"src": sizes, "w": w, "h": h, "alt": alt, "caption": cap, "credit": credit, "source": src}

p = os.path.join(ROOT, "data", "photos.js")
s = open(p, encoding="utf-8").read()
marker = "\n/* High-resolution official photos (26 Oct 2026) */\n"
if marker in s:
    s = s[: s.index(marker)]
s = s.rstrip() + marker + "Object.assign(IIMB.photos, " + json.dumps(reg, ensure_ascii=False, indent=1) + ");\n"
open(p, "w", encoding="utf-8", newline="\n").write(s)
print(len(reg), "photos registered")
