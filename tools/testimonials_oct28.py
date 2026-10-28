"""One-off (28 Oct 2026): student testimonials from each official programme page (the "Video" and "Text" tabs).
Writes research/scrape-oct28/testimonials.json; photos are fetched separately by fetchimg.mjs."""
import html, json, os, re
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
R = os.path.join(ROOT, "research", "scrape-oct28")

def clean(x):
    x = re.sub(r"<[^>]+>", " ", x)
    return re.sub(r"\s+", " ", html.unescape(x)).strip()

def section(s):
    """The testimonials block: from its heading to the next section heading."""
    i = s.find(">Testimonials</h2>")
    if i < 0:
        i = s.find("Testimonials</h")
    if i < 0:
        return ""
    j = len(s)
    for stop in (">Placements<", ">Accreditation and Rankings<", ">Disability Policy", "<footer"):
        k = s.find(stop, i + 30)
        if 0 < k < j:
            j = k
    return s[i:j]

def parse(seg):
    vids = []
    for m in re.finditer(r'youtube\.com/embed/([\w-]{11})[^>]*>.*?</iframe>(.*?)(?=<iframe|class="testimonials|$)', seg, re.S):
        name = re.search(r"<strong>(.*?)</strong>", m.group(2), re.S)
        vids.append({"id": m.group(1), "who": clean(name.group(1)) if name else ""})
    texts = []
    for m in re.finditer(r'<div class="testimonials[^"]*">(.*?)(?=<div class="testimonials|</div>\s*</div>\s*</div>\s*</div>|$)', seg, re.S):
        b = m.group(1)
        img = re.search(r'<img[^>]+src="([^"]+)"', b)
        ps = re.findall(r"<p>(.*?)</p>", b, re.S)
        if not ps:
            continue
        who_p = [p for p in ps if "testimonial_name_student" in p or clean(p).startswith("-")]
        body = [clean(p) for p in ps if p not in who_p and clean(p)]
        who = clean(who_p[-1]).lstrip("-– ").strip() if who_p else ""
        who = re.sub(r"\s+,", ",", who)
        if body:
            texts.append({"q": body, "who": who, "img": ("https://www.iimb.ac.in" + img.group(1)) if img and img.group(1).startswith("/") else (img.group(1) if img else None)})
    return vids, texts

def parse_nsr(s):
    """NSR Pre-doc listing: photo, <strong>name</strong><br>(years), area, then the quote."""
    t = []
    for m in re.finditer(r'<img[^>]+class="img-circle"[^>]*src="([^"]+)"[^>]*>.*?<strong>(.*?)</strong>\s*<br>(.*?)</p>.*?<div class="col-md-12">\s*<p>(.*?)</p>', s, re.S):
        img, name, meta, q = m.groups()
        t.append({"q": [clean(q)], "who": f"{clean(name)}, NSR Pre-doc {clean(meta)}".replace("  ", " "), "img": ("https://www.iimb.ac.in" + img) if img.startswith("/") else img})
    return t

out = {}
for name in sorted(os.listdir(R)):
    if not name.endswith(".html"):
        continue
    key = name[:-5]
    s = open(os.path.join(R, name), encoding="utf-8").read()
    seg = section(s) if not key.endswith("-t") else s
    v, t = parse(seg)
    if key == "nsr-t":
        t = parse_nsr(s)
    for x in t:
        x["who"] = x["who"].replace("�", "–").replace(" ,", ",")
        x["q"] = [q.replace("�", "’") for q in x["q"]]
    # de-duplicate (the listing pages repeat the programme page)
    seen = set(); v = [x for x in v if not (x["id"] in seen or seen.add(x["id"]))]
    seen = set(); t = [x for x in t if not (x["who"] + x["q"][0][:40] in seen or seen.add(x["who"] + x["q"][0][:40]))]
    out[key] = {"videos": v, "texts": t}
    print(key, len(v), "videos", len(t), "texts", [x["who"] for x in t][:12])
json.dump(out, open(os.path.join(R, "testimonials.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
