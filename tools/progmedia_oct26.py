"""One-off (26 Oct 2026): add each programme's own news, student achievements, official YouTube films and remaining
original-page items (EPGP "We seek candidates who", disability policy) to data/programme-detail.js."""
import json, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
R = os.path.join(ROOT, "research", "scrape-oct26")
N = json.load(open(os.path.join(R, "news_by_prog.json"), encoding="utf-8"))
V = json.load(open(os.path.join(R, "videos_by_prog.json"), encoding="utf-8"))

IMG = {  # news photos matched one-to-one with the official listing (PGP, PGPBA, EPGP)
    "https://www.iimb.ac.in/qs-world-university-rankings-2027": "assets/img/news-prog/qs2027.jpg",
    "https://www.iimb.ac.in/pragya-2026": "assets/img/news-prog/pragya2026.jpg",
    "https://www.iimb.ac.in/qs-world-university-rankings-2026": "assets/img/news-prog/qs2026.jpg",
    "https://www.iimb.ac.in/iimb-ft-mim-global-ranking-2025": "assets/img/news-prog/ftmim2025.jpg",
    "https://www.iimb.ac.in/anuradha-appointed-director-marketing-amazon-india": "assets/img/news-prog/anuradha.jpg",
    "https://www.iimb.ac.in/epgp-2nd-rank-apac-bloomberg-b-school-rankings-2026": "assets/img/news-prog/epgp-bloomberg2026.jpg",
    "https://www.iimb.ac.in/epgp-welcomes-batch-2026": "assets/img/news-prog/epgp-batch2026.jpg",
    "https://www.iimb.ac.in/iimb-epgp-ft-mba-rankings-2026": "assets/img/news-prog/main-gate.jpg",
    "https://www.iimb.ac.in/iimb-bloomberg-b-school-rankings-2025": "assets/img/news-prog/main-gate.jpg",
    "https://www.iimb.ac.in/epgp-navodaya-2026": "assets/img/news-prog/epgp-navodaya.jpg",
}
ALL = {"pgp": "https://www.iimb.ac.in/programmes/pgp", "epgp": "https://www.iimb.ac.in/programmes/epgp/epgp-in-news"}

media = {}
for pid, d in N.items():
    news = [x for x in d["news"] if "View all" not in x["t"] and "campus.iimb" not in x["u"] and "#menu" not in x["u"]][:6]
    items = [{"t": x["t"], "u": x["u"], "img": IMG.get(x["u"])} for x in news]
    if items: media.setdefault(pid, {})["news"] = items
for pid, vs in V.items():
    vids = [{"id": v["id"], "t": v["t"].replace(" | IIM Bangalore", "")} for v in vs if v.get("t")]
    if vids: media.setdefault(pid, {})["videos"] = vids

media.setdefault("pgp", {})["achievements"] = [
    {"t": "SnackWise startup by PGP ’25 students selected for NSRCEL incubation"},
    {"t": "PGP ’25 students crowned pan-India winners at Rajasthan Royals Case Competition"},
    {"t": "PGP ’25 students clinch second runner-up at HDFC Life Case Competition"}]
media["pgpba"]["achievements"] = media["pgp"]["achievements"]
media.setdefault("pgpem", {})["achievements"] = [
    {"t": "PGPEM students advance to top 10 at Harvard Global Case Competition"},
    {"t": "Campus win for PGPEM team at Hult Prize 2025 at IIM Bangalore", "u": "https://www.iimb.ac.in/pgpem-team-hult-prize-2025"},
    {"t": "National win for PGPEM team at IIM Kozhikode’s PowerUp strategy challenge", "u": "https://www.iimb.ac.in/pgpem-iimk-winners-powerup-strategy-challenge"}]
media.setdefault("pgppm", {})["achievements"] = [
    {"t": "PGPPM student selected for 64th UN Graduate Study Programme in Geneva", "u": "https://www.iimb.ac.in/madhurya-pgppm-student-selected-unog"}]
media.setdefault("epgp", {})["seek"] = ["Thrive in a rigorous academic environment", "Possess strong communication skills", "Have led teams and contributed to projects that impact the organisation’s bottom line"]
DISAB = [
    "The Indian Institute of Management Bangalore (IIMB) endeavours to remove all barriers that prevent students with disabilities from realizing their potential. The objective of this policy is to provide “equal opportunity” for all students. IIMB commits to a time-bound programme to remove all barriers to access faced by students with disabilities: physical access to all parts of the campus used by students; access to teaching and reference material using appropriate technology; and access to e-resources through the adoption of WCAG and other relevant standards.",
    "IIMB will assess the needs of each enrolled student with disability individually. An Office of Disability Services will arrange such an assessment and be the nodal point to ensure that the needs of the student are communicated to every relevant office and fulfilled appropriately. IIMB will take proactive steps to identify career opportunities for students with disabilities and has set up a Committee on Disability at the institute level.",
    "Adopted by the IIMB faculty on 15 July 2009.",
]
for pid in ("pgp", "pgpba"):
    media[pid]["disability"] = DISAB

p = os.path.join(ROOT, "data", "programme-detail.js")
s = open(p, encoding="utf-8").read()
marker = "\n/* Each programme's own news, achievements and official films, from its iimb.ac.in page (26 Oct 2026) */\n"
if marker in s: s = s[: s.index(marker)]
s = s.rstrip() + marker + "IIMB.progMedia = " + json.dumps(media, ensure_ascii=False, indent=1) + ";\n"
open(p, "w", encoding="utf-8", newline="\n").write(s)
print({k: {kk: len(vv) for kk, vv in v.items()} for k, v in media.items()})
