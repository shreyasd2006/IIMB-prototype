"""One-off (28 Oct 2026): fill the 18 faculty profiles that had no paragraph, from each official iimb.ac.in profile.
Order of preference: the "Summary" block; prose paragraphs in the Accomplishments tabs (Research, Teaching,
Consulting, Service); otherwise a plain statement built only from the profile's own title, area, roles and education.
Writes research/scrape-oct28/bios.json and data/faculty.js (summary + summarySrc)."""
import html, json, os, re, glob, subprocess
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
B = os.path.join(ROOT, "research", "scrape-oct28", "bios")

def clean(x):
    x = re.sub(r"<br\s*/?>", " ", x)
    x = re.sub(r"<[^>]+>", " ", x)
    x = html.unescape(x).replace("\xa0", " ").replace("​", "")
    x = re.sub(r"\s+", " ", x).strip()
    return re.sub(r"\s+([,.;:)])", r"\1", x).replace("( ", "(")

CITE = re.compile(r"\b(19|20)\d{2}\b.*\b(Vol|pp|No\.|Journal|Review)\b|\bVol\.|\bpp\s?\d|\[ ?pdf", re.I)
def prose(p):
    return len(p) >= 90 and re.search(r"\b(is|are|has|have|was|her|his|I am|my|research|interests?)\b", p) and not CITE.search(p) and p[0].isupper()

def get(s):
    s = re.sub(r"<script.*?</script>|<style.*?</style>", "", s, flags=re.S)
    m = re.search(r">\s*Summary\s*</h\d>", s)
    if m:
        j = s.find("Accomplishments", m.end())
        parts = [clean(p) for p in re.findall(r"<p[^>]*>(.*?)</p>", s[m.end(): j if j > 0 else None], re.S)]
        parts = [p for p in parts if len(p) > 30]
        if parts:
            return parts, "summary"
    tabs = dict(re.findall(r'href="#(\w+)"[^>]*>\s*([A-Z ]+?)\s*</a>', s))
    panes = re.findall(r'<div class="tab-pane[^"]*" id="(\w+)">(.*?)(?=<div class="tab-pane|<footer)', s, re.S)
    out = []
    for pid, body in panes:
        name = tabs.get(pid, "")
        if name.strip() in ("EDUCATION", "AWARDS", "EDITORIAL POSITION", "EXTERNAL GRANTS"):
            continue
        out += [p for p in (clean(x) for x in re.findall(r"<p[^>]*>(.*?)</p>", body, re.S)) if prose(p)]
        if len(" ".join(out)) > 900:
            break
    if out:
        return out[:4], "tabs"
    return [], None

def education(s):
    m = re.search(r'>EDUCATION</a>', s)
    if not m: return []
    pid = re.findall(r'href="#(\w+)"[^>]*>EDUCATION<', s)
    if not pid: return []
    b = re.search(r'id="%s">(.*?)(?=<div class="tab-pane|<footer)' % pid[0], s, re.S)
    return [clean(x) for x in re.findall(r"<li[^>]*>(.*?)</li>", b.group(1), re.S)][:3] if b else []

# faculty records
node = "global.window=global;global.IIMB={};require('./data/faculty.js');process.stdout.write(JSON.stringify(IIMB.faculty))"
F = {f["id"]: f for f in json.loads(subprocess.check_output(["node", "-e", node], cwd=ROOT, encoding="utf-8"))}

res = {}
for f in sorted(glob.glob(os.path.join(B, "*.html"))):
    fid = os.path.basename(f)[:-5]; rec = F[fid]
    s = open(f, encoding="utf-8").read()
    parts, kind = get(s)
    if not parts:
        roles = [r for r in rec.get("roles", []) if r]
        line = f"{rec['name']} is {('an' if rec['title'][0] in 'AEIOU' else 'a')} {rec['title']} in the {' and '.join(rec['areas'])} area at IIM Bangalore."
        if roles: line += f" Current roles: {'; '.join(roles)}."
        ed = education(s)
        parts = [line] + ([f"Education: {'; '.join(ed)}."] if ed else [])
        kind = "listing"
    res[fid] = {"p": parts, "kind": kind}
    print(fid, kind, len(" ".join(parts)), "|", " ".join(parts)[:120])
json.dump(res, open(os.path.join(ROOT, "research", "scrape-oct28", "bios.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)

# write into data/faculty.js: each record is a JSON object with "id": "...", ..., "summary": ""
p = os.path.join(ROOT, "data", "faculty.js"); js = open(p, encoding="utf-8").read()
n = 0
for fid, r in res.items():
    pat = re.compile(r'("id": "%s",.*?"summary": )""' % re.escape(fid), re.S)
    js, k = pat.subn(lambda m: m.group(1) + json.dumps(" ".join(r["p"]) if r["kind"] != "listing" else " ".join(r["p"]), ensure_ascii=False) + (', "summaryKind": "%s"' % r["kind"]), js, count=1)
    n += k
open(p, "w", encoding="utf-8", newline="\n").write(js)
print("updated", n)
