"""One-off (28 Oct 2026): student testimonials ("Video" and "Text" tabs of each official programme page) into
IIMB.progMedia[pid].voices, plus the list of photos and film thumbnails still to download."""
import json, os, re, urllib.request
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
T = json.load(open(os.path.join(ROOT, "research", "scrape-oct28", "testimonials.json"), encoding="utf-8"))
SRC = {"pgp": ("pgp-t", "https://www.iimb.ac.in/programmes/pgp/pgp-testimonials"),
       "pgpba": ("pgpba", "https://www.iimb.ac.in/programmes/pgpba"),
       "pgpem": ("pgpem-t", "https://www.iimb.ac.in/programmes/pgpem/testimonials"),
       "pgppm": ("pgppm", "https://www.iimb.ac.in/programmes/pgppm"),
       "nsr-predoc": ("nsr-t", "https://www.iimb.ac.in/programmes/nsrpredoc/testimonials")}
VDIR = os.path.join(ROOT, "assets", "img", "voices"); os.makedirs(VDIR, exist_ok=True)
YDIR = os.path.join(ROOT, "assets", "img", "yt")

def slug(x):
    return re.sub(r"[^a-z0-9]+", "-", x.lower()).strip("-")[:48]

voices, fetch = {}, []
for pid, (key, url) in SRC.items():
    d = T[key]
    quotes = []
    for x in d["texts"]:
        name = re.split(r",|\s+(?:PGP|Class of|\(Class)", x["who"])[0].strip()
        img = None
        if x.get("img"):
            img = f"assets/img/voices/{pid}-{slug(name)}.jpg"
            if not os.path.exists(os.path.join(ROOT, img)):
                fetch.append(f"{x['img']}={img}")
        quotes.append({"q": x["q"], "name": name, "who": x["who"], "img": img})
    films = [{"id": v["id"], "who": v["who"]} for v in d["videos"] if v["who"]]
    for v in films:
        p = os.path.join(YDIR, v["id"] + ".jpg")
        if not os.path.exists(p):
            try:
                urllib.request.urlretrieve(f"https://i.ytimg.com/vi/{v['id']}/hqdefault.jpg", p)
            except Exception as e:
                print("thumb fail", v["id"], e)
    voices[pid] = {"films": films, "quotes": quotes, "src": url}
    print(pid, len(films), "films", len(quotes), "quotes")

p = os.path.join(ROOT, "data", "programme-detail.js")
s = open(p, encoding="utf-8").read()
marker = "\n/* Student testimonials from each official programme page, Video and Text tabs (28 Oct 2026) */\n"
if marker in s: s = s[: s.index(marker)]
s = s.rstrip() + marker + "IIMB.progVoices = " + json.dumps(voices, ensure_ascii=False, indent=1) + ";\n"
open(p, "w", encoding="utf-8", newline="\n").write(s)
open(os.path.join(ROOT, "research", "scrape-oct28", "voice_photos.txt"), "w", encoding="utf-8").write("\n".join(fetch))
print(len(fetch), "photos to fetch")
