"""Compile research/ (pages fetched from iimb.ac.in on 16 Oct 2026) into data/*.js
and optimised images in assets/img/. Run:  python -I tools/build_data.py
Re-runnable; downloads are cached in research/img-cache/.
"""
import json, os, re, html, urllib.request, urllib.parse, datetime
from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
R = os.path.join(ROOT, "research")
PAGES = os.path.join(R, "pages")
OUT = os.path.join(ROOT, "data")
IMG = os.path.join(ROOT, "assets", "img")
CACHE = os.path.join(R, "img-cache")
BASE = "https://www.iimb.ac.in"
CHECKED = "2026-10-16"
for d in (OUT, IMG, CACHE, os.path.join(IMG, "news")):
    os.makedirs(d, exist_ok=True)

MONTHS = {m: i for i, m in enumerate(["january", "february", "march", "april", "may", "june", "july",
                                      "august", "september", "october", "november", "december"], 1)}
credits = {}


def clean_inline(s):
    s = re.sub(r"\[javascript:confirmDeletee\('([^']+)'\)\]\s*", "", s)
    s = re.sub(r"\[[^\]\s]+\]\s*", "", s)          # drop [url] link markers, keep anchor text
    s = re.sub(r"\{IMG [^}]+\}", "", s)
    s = re.sub(r"\s+([,.;:!?’”)])", r"\1", s)
    s = re.sub(r"\s{2,}", " ", s)
    s = s.replace("P olicymakers", "Policymakers")
    return s.strip()


def parse_date(s):
    s = s.lower()
    m = re.search(r"(\d{1,2})(?:st|nd|rd|th)?\s+([a-z]+),?\s+(20\d\d)", s)
    if m and m.group(2) in MONTHS:
        return datetime.date(int(m.group(3)), MONTHS[m.group(2)], int(m.group(1))).isoformat()
    m = re.search(r"([a-z]+)\s+(\d{1,2}),?\s+(20\d\d)", s)
    if m and m.group(1) in MONTHS:
        return datetime.date(int(m.group(3)), MONTHS[m.group(1)], int(m.group(2))).isoformat()
    return None


def fetch_img(path):
    """Download an iimb.ac.in image path once; return local cache file."""
    url = path if path.startswith("http") else BASE + path
    name = re.sub(r"[^A-Za-z0-9._-]", "_", urllib.parse.unquote(url.split("/sites/default/files/")[-1]))
    fn = os.path.join(CACHE, name)
    if not os.path.exists(fn):
        req = urllib.request.Request(urllib.parse.quote(url, safe=":/%"), headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=60) as r:
            open(fn, "wb").write(r.read())
    return fn, url


def save_variants(src, slug, widths=(800, 1600), sub=""):
    """Write JPEG variants; returns {w: relpath}."""
    im = Image.open(src)
    im = ImageOps.exif_transpose(im).convert("RGB")
    out = {}
    for w in widths:
        if im.width < w * 0.75 and w != widths[0]:
            continue
        r = im.copy()
        if r.width > w:
            r = r.resize((w, round(r.height * w / r.width)), Image.LANCZOS)
        rel = f"assets/img/{sub}{slug}-{r.width}.jpg"
        r.save(os.path.join(ROOT, rel), "JPEG", quality=80, optimize=True, progressive=True)
        out[r.width] = rel
    return out, im.size


def read(slug):
    return open(os.path.join(PAGES, f"iimb.ac.in__{slug}.clean.txt"), encoding="utf-8").read()


# ---------------------------------------------------------------- campus photographs
CAMPUS = {
    # slug: (source file or url, credit, source page, alt, caption)
    "aerial": ("research/img-candidates/drone.png", "IIMB Archives", BASE + "/archives/",
               "Aerial view of the IIMB campus: low stone blocks and courtyards set in a dense canopy of trees.",
               "The Bannerghatta Road campus from the air"),
    "pergola": ("research/img-candidates/slider7.jpg", "IIMB Archives", BASE + "/archives/",
                "A long corridor of rough stone walls under an open timber pergola, bamboo growing in the light well.",
                "A pergola corridor in the academic block"),
    "stone-bougainvillea": ("research/img-candidates/image_53.jpg", "IIM Bangalore, Life @IIMB", BASE + "/about-institute/life-iimb",
                            "Stepped stone blocks of the campus framed by a flowering bougainvillea against a blue sky.",
                            "Doshi's stone, softened by planting"),
    "main-block": ("research/img-candidates/Component_1.jpg", "IIM Bangalore, Life @IIMB", BASE + "/about-institute/life-iimb",
                   "A tree-lined avenue leading to a stone building on the IIMB campus.",
                   "An avenue into the academic core"),
    "main-gate": ("research/img-candidates/IIMB-Main-Gate_1_0_0_0.jpg", "IIM Bangalore news", BASE + "/iimb-ranks-11th-globally-financial-times",
                  "The stone main gate of IIM Bangalore bearing the red sun symbol and the institute's name in three scripts.",
                  "The main gate, Bannerghatta Road"),
    "lawn": ("research/img-candidates/Campus_1.jpg", "IIM Bangalore news", BASE + "/doctoral-student-research-paper-award-2026",
             "Students walking across a green lawn in front of a long stone building with palms.",
             "Lawns and the stone blocks"),
    "library-hall": ("research/img-candidates/image_69.png", "IIM Bangalore, Life @IIMB", BASE + "/about-institute/life-iimb",
                     "The double-height library with bookshelves along mezzanine galleries and reading tables below.",
                     "The library"),
    "auditorium": ("research/img-candidates/image_70.png", "IIM Bangalore, Life @IIMB", BASE + "/about-institute/life-iimb",
                   "A raked auditorium full of students facing a stage and screen.", "The auditorium"),
    "doshi": ("research/img-candidates/img23.png", "IIM Bangalore, Architecture", BASE + "/about-institute",
              "Portrait of architect B. V. Doshi, smiling, in dark-rimmed glasses.", "B. V. Doshi, architect of the campus"),
    "archive-construction": ("research/img-candidates/slider3.jpg", "IIMB Archives", BASE + "/archives/",
                             "Archival photograph of the stone campus buildings under construction, scaffolding visible.",
                             "The campus under construction, early 1980s (IIMB Archives)"),
    "archive-site": ("research/img-candidates/sldier2.jpg", "IIMB Archives", BASE + "/archives/",
                     "Archival photograph of an open field with low stone structures rising on the horizon.",
                     "The Bannerghatta Road site (IIMB Archives)"),
    "archive-groundbreaking": ("research/img-candidates/slider-6.png", "IIMB Archives", BASE + "/archives/",
                               "Black-and-white photograph of a speaker at a lectern beneath a banner reading 'Indian Institute of Management, Bangalore — Guddali Pooja for campus construction'.",
                               "Ground-breaking (guddali pooja) for the campus (IIMB Archives)"),
    "archive-inauguration": ("research/img-candidates/slider-new-1.jpg", "IIMB Archives", BASE + "/archives/",
                             "Black-and-white photograph of Prime Minister Indira Gandhi with officials at the institute's inauguration.",
                             "Inaugurated by Prime Minister Indira Gandhi, 28 October 1973 (IIMB Archives)"),
    "archive-plaque": ("research/img-candidates/slider11.jpg", "IIMB Archives", BASE + "/archives/",
                       "Archival photographs beside a stone foundation plaque inscribed for the Indian Institute of Management.",
                       "The foundation plaque (IIMB Archives)"),
    "archive-class": ("research/img-candidates/slider4.jpg", "IIMB Archives", BASE + "/archives/",
                      "Sepia group photograph of an early cohort of students and faculty seated in rows.",
                      "An early cohort (IIMB Archives)"),
    "sport": ("research/img-candidates/sport-life-at-iimb.webp", "IIM Bangalore homepage", BASE + "/",
              "Students playing basketball on an outdoor court ringed by tall trees.", "Basketball courts"),
    "hockey": ("research/img-candidates/4U4A9437_1.png", "IIM Bangalore, Life @IIMB", BASE + "/about-institute/life-iimb",
               "Students in team jerseys playing field hockey on a dusty pitch.", "Inter-batch sport"),
    "music": ("research/img-candidates/IIMB-Republic_Day-Dhwani_2.jpg", "IIM Bangalore, Life @IIMB", BASE + "/about-institute/life-iimb",
              "Student musicians with guitars, keyboard and percussion performing on stage.", "Dhwani, the music club, on Republic Day"),
    "cafeteria": ("research/img-candidates/image_62.png", "IIM Bangalore, Student Life", BASE + "/about-institute/life-iimb/student-life",
                  "Students served lunch at a table set against a stone wall.", "The cafeteria"),
    "art": ("research/img-candidates/image_58.png", "IIM Bangalore, Student Life", BASE + "/about-institute/life-iimb/student-life",
            "A student pinning artwork onto a wall of collages and posters.", "Student accommodation and its common walls"),
    "pgp-cohort": ("research/img-candidates/pgp-students-at-iimb-campus-2026.JPG", "IIM Bangalore homepage", BASE + "/",
                   "A group of PGP students walking through a stone corridor lined with plants.", "PGP students, 2026"),
    "phd": ("research/img-candidates/PhD-2026.jpg", "IIM Bangalore homepage", BASE + "/",
            "Doctoral students talking at a table with laptops in a brightly coloured common room.", "Doctoral students"),
    "ug": ("research/img-candidates/ug-students-campus-2026.jpg", "IIM Bangalore homepage", BASE + "/",
           "Undergraduate students sitting and reading on wide stone steps.", "Undergraduate students, 2026"),
    "exec-ed": ("research/img-candidates/ee-programme-iimb.jpg", "IIM Bangalore homepage", BASE + "/",
                "Executive education participants walking and talking across a lawn.", "Executive education participants"),
    "pgppm": ("research/img-candidates/PGPPM_2.jpg", "IIM Bangalore homepage", BASE + "/",
              "Public policy programme participants seated in a classroom.", "PGPPM participants"),
    "predoc": ("research/img-candidates/NSR_Pre-doc-2026.jpg", "IIM Bangalore homepage", BASE + "/",
               "A cohort of pre-doctoral fellows seated on stone amphitheatre steps.", "NSR Pre-doc fellows, 2026"),
    "women-leadership": ("research/img-candidates/Women-Leadership-2024.jpeg", "IIM Bangalore homepage", BASE + "/",
                         "Women in conversation at a leadership event.", "Women leadership"),
    "diversity": ("research/img-candidates/Diversity-IIMB-2024.jpg", "IIM Bangalore homepage", BASE + "/",
                  "A student in a wheelchair browsing library shelves beside a peer.", "Inclusion and diversity"),
    "sustainability": ("research/img-candidates/DSC03509.jpg", "IIM Bangalore homepage", BASE + "/",
                       "A collage of rooftop solar panels and water treatment tanks over a view of the green campus.",
                       "Sustainability infrastructure"),
    "amphitheatre": ("../iimb-prototype/assets/photos/amphitheatre-1600.jpg", "Apb2693 · CC BY-SA 4.0 (Wikimedia Commons)",
                     "https://commons.wikimedia.org/wiki/File:Indian_Institute_of_Management_Bangalore,_Amphitheatre.jpg",
                     "A grassed amphitheatre of curved terraces ringed by tall trees.", "The amphitheatre"),
    "corridor": ("../iimb-prototype/assets/photos/corridor-academic-1600.jpg", "Sanyam Bahga · CC BY-SA 3.0 (Wikimedia Commons)",
                 "https://commons.wikimedia.org/wiki/File:Indian_Institute_of_Management,_Bangalore_academic_block.jpg",
                 "Rough stone walls and tall columns frame a corridor open to the sky, with greenery on both sides.",
                 "Corridor between classrooms"),
    "columns": ("../iimb-prototype/assets/photos/stone-columns-1600.jpg", "Magentic Manifestations · CC BY-SA 3.0 (Wikimedia Commons)",
                "https://commons.wikimedia.org/wiki/File:IIMB_Acadblock.JPG",
                "Grey stone columns and a three-storey hall, with a palm in the foreground.", "The three-storey hallway"),
    "pergola-light": ("../iimb-prototype/assets/photos/corridor-pergola-1600.jpg", "Sanyam Bahga · CC BY-SA 2.0 (Wikimedia Commons)",
                      "https://commons.wikimedia.org/wiki/File:IIM-Bangalore_016_(10048461003).jpg",
                      "A long stone corridor under an open timber pergola, daylight falling in bars across the floor.",
                      "Light through the pergola"),
    "library-commons": ("../iimb-prototype/assets/photos/library-1600.jpg", "Sanyam Bahga · CC BY-SA 3.0 (Wikimedia Commons)",
                        "https://commons.wikimedia.org/wiki/File:Indian_Institute_of_Management_Bangalore_library.jpg",
                        "A double-height library hall with skylights, reading tables and stacks along a mezzanine.", "The library"),
    "unmaad": ("../iimb-prototype/assets/photos/unmaad-1600.jpg", "Tarun Paul Kachhap · CC BY-SA 4.0 (Wikimedia Commons)",
               "https://commons.wikimedia.org/wiki/File:Highway_69_at_IIM_Bangalore_during_Unmaad_2014.jpg",
               "A band performs on an outdoor stage, with a creeper-covered building behind.", "Unmaad, the student festival (2014)"),
}

photos = {}
for slug, (src, credit, source, alt, cap) in CAMPUS.items():
    p = os.path.normpath(os.path.join(ROOT, src))
    if not os.path.exists(p):
        print("missing photo", src); continue
    v, size = save_variants(p, slug, (800, 1600, 2400) if slug in ("aerial", "pergola", "stone-bougainvillea") else (800, 1600))
    photos[slug] = dict(src=v, w=size[0], h=size[1], alt=alt, caption=cap, credit=credit, source=source)
    for rel in v.values():
        credits[rel] = dict(origin=source, credit=credit, retrieved=CHECKED)
print("photos", len(photos))

# ---------------------------------------------------------------- news
NEWS = [
    ("iitkanpur-iimb-nsrcel-have-signed-mou", "Partnerships"), ("ft-executive-mba-ranking-2026", "Rankings"),
    ("doctoral-student-research-paper-award-2026", "Research"), ("iimb-ranks-11th-globally-financial-times", "Rankings"),
    ("new-case-study-gujarat-india-water-lessons-world", "Research"), ("alumnus-anup-bagchi-appointed-md-ceo-HDFC-Bank", "Alumni"),
    ("node__9520", "Faculty"), ("iimbx-fintech-certificate-programme-2026", "Programmes"), ("node__9255", "Students"),
    ("cdpg-annual-policy-conclave-2026", "Centres"), ("node__9716", "Centres"), ("cdpg-national-student-case-competition-2026", "Students"),
    ("iimb-ministry-minority-affairs-sign-mous-nmdfc", "Partnerships"), ("node__7556", "Faculty"),
    ("qs-world-university-rankings-2027", "Rankings"), ("mijsc-9th-foundation-day", "Centres"),
    ("epgp-2nd-rank-apac-bloomberg-b-school-rankings-2026", "Rankings"), ("ft-b-school-rankings-mim-2026", "Rankings"),
    ("iimb-ug-applications-opens-2027", "Programmes"), ("iimb-inaugurates-first-batch-undergraduate-studies-2026", "Programmes"),
    ("cpp-host-xxi-conference-2026", "Centres"), ("ccmrm-signs-mou-acumo-graylight", "Partnerships"),
    ("iimb-tata-trusts-sign-mou-establish-dorabji-tata-school", "Partnerships"), ("iimb-wins-elcita-sustainability-awards-2025-26", "Campus"),
    ("iimb-inaugurated-23rd-cohort-pgppm-2026", "Programmes"), ("pgp-alumni-et-40-under-forty-2026", "Alumni"),
    ("iimb-celebration-80-independence-day", "Campus"), ("pm-narendra-modi-announces-iimb-campus-indonesia", "Institution"),
    ("phd-joel-win-best-paper-award-icfmcf-2026", "Students"), ("madhurya-pgppm-student-selected-unog", "Students"),
    ("node__9860", "Students"),
]


def article(slug):
    t = read(slug)
    lines = [l.strip() for l in t.split("\n")]
    start = next(i for i, l in enumerate(lines) if l.startswith("# "))
    title = clean_inline(lines[start][2:])
    img = None
    body, stand, date, place = [], None, None, None
    for l in lines[start + 1:]:
        if l.startswith("Create Date") or l.startswith("[http://www.iimb.ac.in/latest_news]") or l.startswith("# "):
            break
        m = re.match(r"\{IMG ([^}]+)\}", l)
        if m:
            if not img and "/sites/default/files/20" in m.group(1):
                img = m.group(1)
            continue
        c = clean_inline(l)
        if not c or c in ("-->",):
            continue
        if stand is None and not parse_date(c[:60]):
            stand = c; continue
        if date is None:
            d = parse_date(c[:60])
            if d:
                date = d
                m2 = re.match(r"^[^:]{0,60}?:\s*(.*)$", c)
                pm = re.match(r"^\s*[\w ,]+?20\d\d\s*,\s*([A-Za-z ]+?)\s*:", c)
                place = pm.group(1).strip() if pm else None
                c = m2.group(1) if m2 else c
        if c.startswith("#"):
            body.append({"h": c.lstrip("# ").strip()}); continue
        body.append({"p": c})
    return title, stand, date, place, body, img


news = []
for slug, cat in NEWS:
    try:
        title, stand, date, place, body, img = article(slug)
    except Exception as e:
        print("news fail", slug, e); continue
    url = BASE + "/" + slug.replace("node__", "node/")
    image = None
    if img:
        try:
            fn, iurl = fetch_img(img)
            sid = re.sub(r"[^a-z0-9]+", "-", slug.lower())[:50]
            v, _ = save_variants(fn, sid, (800, 1400), sub="news/")
            image = dict(src=v, source=iurl)
            for rel in v.values():
                credits[rel] = dict(origin=iurl, credit="IIM Bangalore", page=url, retrieved=CHECKED)
        except Exception as e:
            print("img fail", slug, e)
    news.append(dict(id=re.sub(r"[^a-z0-9]+", "-", slug.lower()).strip("-"), title=title, standfirst=stand, date=date,
                     place=place, category=cat, body=body[:40], image=image, source=url))
news.sort(key=lambda n: n["date"] or "", reverse=True)
print("news", len(news), [n["date"] for n in news][:5])

# ---------------------------------------------------------------- events
EVENTS = [
    ("node__10906", "2026-10-22", None, "Seminar", "Office of Research & Publications", "12:00 pm, Classroom Q-001"),
    ("iimb-to-celebrate-53rd-foundation-day", "2026-10-28", None, "Institutional", "IIM Bangalore", None),
    ("node__683", "2026-11-02", "2026-11-06", "Programme", "Centre for Teaching & Learning", None),
    ("node__10481", "2026-11-20", "2026-11-21", "Conference", "Centre for Corporate Governance & Sustainability", None),
    ("ccmrm-national-student-case-challenge-2026", "2026-11-28", None, "Competition", "Centre for Capital Markets & Risk Management", None),
    ("node__768", "2026-12-01", "2026-12-02", "Workshop", "Centre for Software & IT Management", None),
    ("rp-host-winter_research-methodology-workshop-2026", "2026-12-07", "2026-12-12", "Workshop", "Office of Research & Publications", None),
    ("node__762", "2026-12-12", None, "Workshop", "AIB South Asia Chapter at IIMB", None),
    ("iimb-host-india-strategy-conference-2026", "2026-12-13", "2026-12-15", "Conference", "IIMA, IIMB, IIMC and ISB", None),
    ("node__833", "2027-01-11", "2027-01-12", "Conference", "IIMB Management Review & Doctoral Programme", None),
    ("ispma-2027", "2027-02-11", "2027-02-13", "Conference", "Centre for Software & IT Management", None),
    ("node__757", "2027-03-11", None, "Conference", "Centre for Software & IT Management", None),
]
events = []
for slug, start, end, kind, host, time in EVENTS:
    title, stand, date, place, body, img = article(slug)
    events.append(dict(id=re.sub(r"[^a-z0-9]+", "-", slug.lower()).strip("-"), title=title, standfirst=stand, start=start,
                       end=end, kind=kind, host=host, time=time, announced=date, body=body[:30],
                       source=BASE + "/" + slug.replace("node__", "node/"),
                       listingSource=BASE + "/iimb_conferences"))
print("events", len(events))

# ---------------------------------------------------------------- faculty
fac = json.load(open(os.path.join(R, "faculty", "faculty.json"), encoding="utf-8"))
prof_roles = {}
for f in os.listdir(os.path.join(R, "faculty", "profiles")):
    if not f.endswith(".clean.txt"): continue
    pid = f[:-10]
    for l in open(os.path.join(R, "faculty", "profiles", f), encoding="utf-8").read().split("\n")[:40]:
        l = l.strip()
        if re.match(r"^(Chairperson|Dean|Director-in-charge)", l) and not re.search(r"\d{4}|@", l):
            prof_roles.setdefault(pid, []).append(l)
for p in fac:
    p["summary"] = clean_inline(re.sub(r"For more information.*$", "", p.get("summary", ""))).strip()
    p["pubs"] = [clean_inline(re.sub(r"^\d+\.\s*", "", x)) for x in p.get("pubs", [])]
    roles = [r for r in p.get("roles", []) if "Secondary Member" not in r]
    for r in prof_roles.get(p["id"], []):
        if r not in roles: roles.append(r)
    p["roles"] = roles
    p["name"] = re.sub(r"\s+", " ", p["name"]).strip()
print("faculty", len(fac))

# ---------------------------------------------------------------- publications
pubs = json.load(open(os.path.join(R, "pubs", "pubs.json"), encoding="utf-8"))
ja = []
for j in pubs["ja"]:
    m = re.match(r"^['‘](.+?)['’]\s*-?\s*(Prof\.?.*)$", j["t"].strip())
    ja.append(dict(title=m.group(1) if m else j["t"], by=(m.group(2) if m else "").replace("Prof. ", "").replace("Prof ", ""),
                   url=j["url"]))
# journal names for the three featured articles (from node pages)
for j in ja:
    nid = (j["url"] or "").split("/")[-1]
    p = os.path.join(PAGES, f"iimb.ac.in__node__{nid}.clean.txt")
    if os.path.exists(p):
        t = open(p, encoding="utf-8").read()
        m = re.search(r"(?:published in|in the journal|appeared in)\s+(?:the\s+)?['‘“]?([A-Z][^,.;\n]{3,80})", t)
        if m: j["venue"] = clean_inline(m.group(1)).strip("’'” ")
wp = pubs["wp"]
print("wp", len(wp), "ja", len(ja))

# ---------------------------------------------------------------- write
def js(name, obj):
    with open(os.path.join(OUT, name + ".js"), "w", encoding="utf-8") as f:
        f.write(f"/* Generated by tools/build_data.py from pages fetched from iimb.ac.in on {CHECKED}. Do not edit by hand. */\n")
        f.write(f"window.IIMB=window.IIMB||{{}};IIMB.{name}=" + json.dumps(obj, ensure_ascii=False, indent=0) + ";\n")


js("photos", photos)
js("news", news)
js("events", events)
js("faculty", fac)
js("publications", dict(workingPapers=wp, journalArticles=ja, wpSeries=dict(
    text="IIMB scholars have so far published 743 working papers through SSRN.", ssrn="http://papers.ssrn.com/sol3/JELJOUR_Results.cfm?form_name=journalbrowse&journal_id=2102955",
    source=BASE + "/iimb-research/working-papers")))
json.dump(credits, open(os.path.join(IMG, "credits.json"), "w", encoding="utf-8"), indent=1, ensure_ascii=False)
print("done")
