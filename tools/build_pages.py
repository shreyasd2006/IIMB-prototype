"""Build every HTML page from one shared head/header/footer plus a per-page body in src/pages/<name>.html.
Usage: python tools/build_pages.py        (writes ./<name>.html for each page)"""
import os, html

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "src", "pages")

NAV = [
    ("programmes", "Programmes", "programmes.html"),
    ("research", "Research", "research.html"),
    ("faculty", "Faculty", "faculty.html"),
    ("centres", "Centres", "centres.html"),
    ("partnerships", "Partnerships", "partnerships.html"),
    ("news", "News & Events", "news.html"),
    ("campus", "Campus Life", "campus.html"),
    ("about", "About", "about.html"),
]

ALL_DATA = ["institute", "faculty", "portraits", "news", "events", "photos", "publications", "obs", "journal"]

# name, <title>, description, nav key, leaf title, leaf sub, data files, page script
PAGES = [
    ("index", "IIM Bangalore — The Global Leadership Journal", "A concept website for the Indian Institute of Management Bangalore, art-directed as a journal of leadership: programmes, research, faculty, centres and the life of the institute.", "home", "The Global Leadership Journal", "IIM Bangalore", ALL_DATA, "home"),
    ("about", "About IIMB — The institutional story", "IIM Bangalore from 1972 to today: mission, history, the B V Doshi campus, leadership and governance.", "about", "About IIMB", "The institutional story", ALL_DATA, "about"),
    ("programmes", "Programmes & Admissions — IIM Bangalore", "Find an IIMB programme by who you are, compare up to three, and reach the official admissions pages.", "programmes", "Programmes & Admissions", "The decision journey", ALL_DATA, "programmes"),
    ("programme", "Programme — IIM Bangalore", "Eligibility, curriculum, admissions and official application links for an IIMB programme.", "programmes", "Programmes & Admissions", "The decision journey", ALL_DATA, "programme"),
    ("research", "Research — Ideas in Focus — IIM Bangalore", "IIMB research by theme: long-form features, working papers, journal articles and the people behind them.", "research", "Research", "Ideas in focus", ALL_DATA, "research"),
    ("theme", "Research theme — IIM Bangalore", "A research theme at IIMB: papers, faculty, centres and stories.", "research", "Research", "Ideas in focus", ALL_DATA, "theme"),
    ("faculty", "Faculty — People and Ideas — IIM Bangalore", "Search 109 IIMB faculty by name, area or research interest.", "faculty", "Faculty", "People and ideas", ALL_DATA, "faculty"),
    ("person", "Faculty profile — IIM Bangalore", "An IIMB faculty profile: research, roles, publications and colleagues.", "faculty", "Faculty", "People and ideas", ALL_DATA, "person"),
    ("partnerships", "Partnership Studio — IIM Bangalore", "How organisations work with IIMB: recruitment, executive education, research with centres, ventures, cases and giving.", "partnerships", "Business Engagement", "Partnership studio", ALL_DATA, "partnerships"),
    ("news", "News & Events — IIM Bangalore", "The living institution: stories, announcements and upcoming events at IIM Bangalore.", "news", "News & Events", "The living institution", ALL_DATA, "news"),
    ("story", "Story — IIM Bangalore", "A story from IIM Bangalore.", "news", "News & Events", "The living institution", ALL_DATA, "story"),
    ("centres", "Centres — Research Communities — IIM Bangalore", "IIMB's centres of excellence, initiatives and incubator: missions, people, events and connections.", "centres", "Centres", "Research communities", ALL_DATA, "centres"),
    ("centre", "Centre — IIM Bangalore", "A centre of excellence at IIM Bangalore.", "centres", "Centres", "Research communities", ALL_DATA, "centre"),
    ("campus", "Campus & Student Life — The IIMB Experience", "Student life at IIM Bangalore: clubs, festivals, facilities, films and stories from the Bannerghatta Road campus.", "campus", "Campus & Student Life", "The IIMB experience", ALL_DATA, "campus"),
    ("industry", "Recruiters & Alumni — IIM Bangalore", "For recruiters and alumni: placement calendar, programmes to hire from, alumni stories and ways to give.", "industry", "Recruiters & Alumni", "Beyond the classroom", ALL_DATA, "industry"),
    ("search", "Search — IIM Bangalore", "Search programmes, faculty, centres, research and stories.", "search", "Search", "Find anything", ALL_DATA, "search"),
    ("credits", "Sources & credits — IIM Bangalore (concept)", "Where every fact, photograph, portrait and film on this concept site comes from.", "credits", "Sources & credits", "How this concept was made", ALL_DATA, "credits"),
]

ICONS = """<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">
<symbol id="i-search" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></symbol>
<symbol id="i-arrow" viewBox="0 0 24 24"><path d="M4 12h15M13 6l6 6-6 6"/></symbol>
<symbol id="i-arrow-up" viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9"/></symbol>
<symbol id="i-close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></symbol>
<symbol id="i-play" viewBox="0 0 24 24"><path d="M7 4.5v15l13-7.5z"/></symbol>
<symbol id="i-pause" viewBox="0 0 24 24"><path d="M8 5v14M16 5v14"/></symbol>
<symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></symbol>
<symbol id="i-check" viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5"/></symbol>
<symbol id="i-mail" viewBox="0 0 24 24"><rect x="3.5" y="5.5" width="17" height="13"/><path d="m4 6.5 8 6 8-6"/></symbol>
<symbol id="i-cal" viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="15"/><path d="M3.5 10h17M8 3v4M16 3v4"/></symbol>
<symbol id="i-pin" viewBox="0 0 24 24"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></symbol>
<symbol id="i-drag" viewBox="0 0 24 24"><path d="M8 12h8M5 9l-3 3 3 3M19 9l3 3-3 3"/></symbol>
</svg>"""


def page_link(key, label, href, current):
    cur = ' aria-current="page"' if key == current else ""
    return f'<li><a href="{href}"{cur}>{label}</a></li>'


def build(name, title, desc, navkey, leaf_t, leaf_s, data, script):
    with open(os.path.join(SRC, name + ".html"), encoding="utf-8") as f:
        body = f.read()
    nav = "\n".join(page_link(k, l, h, navkey) for k, l, h in NAV)
    data_tags = "\n".join(f'<script src="data/{d}.js"></script>' for d in data)
    return f"""<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{html.escape(title)}</title>
<meta name="description" content="{html.escape(desc)}">
<meta name="theme-color" content="#641D35">
<link rel="icon" href="assets/brand/favicon.png">
<link rel="preload" href="assets/fonts/gloock-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/anek-latin-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/eczar-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/css/journal.css">
<link rel="stylesheet" href="assets/css/pages.css">
<script>(function(d){{var h=d.documentElement;h.classList.add('js');var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;if(!rm){{h.classList.add('mp');setTimeout(function(){{h.classList.remove('mp');h.classList.remove('leaf-in')}},3500)}}try{{if(!rm&&sessionStorage.getItem('j-leaf'))h.classList.add('leaf-in')}}catch(e){{}}}})(document)</script>
</head>
<body data-page="{name}">
{ICONS}
<a class="skip" href="#main">Skip to content</a>
<div class="leaf" aria-hidden="true"><div class="inner"><span class="ttl">{html.escape(leaf_t)}</span><span class="sub">{html.escape(leaf_s)}</span><span class="rule"></span></div></div>
<header class="site-header" data-intro>
  <div class="wrap bar">
    <a class="brand" href="index.html" aria-label="IIM Bangalore, The Global Leadership Journal: home">
      <img src="assets/brand/iimb-logo-720.png" width="720" height="119" alt="Indian Institute of Management Bangalore">
      <span class="issue">The Global Leadership Journal<small>Concept · Bengaluru · Est. 1973</small></span>
    </a>
    <nav class="nav" aria-label="Main"><ul>
{nav}
    </ul></nav>
    <div class="tools">
      <button class="icon-btn" type="button" data-open-search aria-label="Search the site (press /)"><svg class="ico"><use href="#i-search"/></svg></button>
      <button class="contents-btn" type="button" data-open-contents aria-expanded="false" aria-controls="contents"><span class="bars" aria-hidden="true"><i></i><i></i><i></i></span><span class="lbl">Contents</span><span class="sr">Open the site contents</span></button>
      <a class="btn apply-btn" href="programmes.html#finder">Apply<svg class="ico"><use href="#i-arrow"/></svg></a>
    </div>
  </div>
  <span class="progress" aria-hidden="true"></span>
</header>

<div class="contents on-burgundy" id="contents" role="dialog" aria-modal="true" aria-label="Contents" hidden>
  <div class="wrap top">
    <a class="plate-logo" href="index.html"><img src="assets/brand/iimb-logo-720.png" width="720" height="119" alt="IIM Bangalore home"></a>
    <button class="close" type="button" data-close-contents>Close<svg class="ico"><use href="#i-close"/></svg></button>
  </div>
  <div class="wrap body">
    <ol class="toc" data-toc></ol>
    <div class="aside"><div class="preview" data-toc-preview></div><p class="caption" data-toc-caption></p></div>
  </div>
  <div class="wrap quick">
    <a href="programmes.html#finder">Apply</a><a href="https://eep.iimb.ac.in/" class="ext">Executive Education</a><a href="industry.html">Recruiters</a><a href="industry.html#alumni">Alumni</a><a href="https://www.iimb.ac.in/contactus" class="ext">Contact</a><a href="search.html">Search</a>
    <span class="motto" lang="sa">तेजस्वि नावधीतमस्तु</span>
  </div>
</div>

<div class="finder" id="finder" role="dialog" aria-modal="true" aria-label="Search" hidden>
  <div class="scrim" data-close-search></div>
  <div class="panel">
    <div class="wrap head">
      <div class="row">
        <label class="searchbar" for="finder-q"><svg class="ico"><use href="#i-search"/></svg><span class="sr">Search</span>
          <input id="finder-q" type="search" autocomplete="off" placeholder="Programmes, people, ideas…" role="combobox" aria-expanded="true" aria-controls="finder-results" aria-autocomplete="list"></label>
        <button class="icon-btn" type="button" data-close-search aria-label="Close search"><svg class="ico"><use href="#i-close"/></svg></button>
      </div>
      <p class="hint"><kbd>↑</kbd> <kbd>↓</kbd> to move, <kbd>Enter</kbd> to open, <kbd>Esc</kbd> to close · <a href="search.html" class="ulink" data-full-search>All results</a></p>
    </div>
    <div class="wrap results" id="finder-results" role="listbox" aria-label="Search results"></div>
  </div>
</div>

<main id="main" tabindex="-1">
{body}
</main>

<footer class="site-footer on-burgundy">
  <div class="wrap">
    <div class="motto-line">
      <span class="dev" lang="sa">तेजस्वि नावधीतमस्तु</span>
      <span class="en">Let our study be enlightening.</span>
    </div>
    <div class="cols">
      <div>
        <a class="plate-logo" href="index.html"><img src="assets/brand/iimb-logo-720.png" width="720" height="119" alt="IIM Bangalore home"></a>
        <address>Indian Institute of Management Bangalore<br>Bannerghatta Road, Bengaluru 560076, India<br><a href="tel:+918026993000">+91 80 2699 3000</a> · <a href="mailto:info@iimb.ac.in">info@iimb.ac.in</a></address>
      </div>
      <div><h2>Study</h2><ul><li><a href="programmes.html">Find a programme</a></li><li><a href="programme.html?id=pgp">MBA (PGP)</a></li><li><a href="programme.html?id=epgp">Executive MBA</a></li><li><a href="programme.html?id=bsc-data-sciences">Undergraduate</a></li><li><a href="programme.html?id=phd">Doctoral</a></li></ul></div>
      <div><h2>Ideas</h2><ul><li><a href="research.html">Research</a></li><li><a href="faculty.html">Faculty</a></li><li><a href="centres.html">Centres</a></li><li><a href="centre.html?id=csitm">CSITM</a></li><li><a href="news.html">News &amp; events</a></li></ul></div>
      <div><h2>Engage</h2><ul><li><a href="partnerships.html">Partnership studio</a></li><li><a href="industry.html">Recruiters</a></li><li><a href="industry.html#alumni">Alumni</a></li><li><a class="ext" href="https://eep.iimb.ac.in/">Executive education</a></li><li><a class="ext" href="https://www.iimb.ac.in/giving/">Giving</a></li></ul></div>
      <div><h2>Institute</h2><ul><li><a href="about.html">About IIMB</a></li><li><a href="campus.html">Campus life</a></li><li><a class="ext" href="https://www.iimb.ac.in/">Official website</a></li><li><a href="credits.html">Sources &amp; credits</a></li></ul></div>
    </div>
    <div class="legal">
      <span><strong>A design concept, not the official IIMB website.</strong> Content from iimb.ac.in and official IIMB channels, checked 16–18 October 2026.</span>
      <span><a href="credits.html">Sources, photo credits and what is editorial</a></span>
    </div>
  </div>
</footer>

{data_tags}
<script src="assets/vendor/gsap.min.js"></script>
<script src="assets/vendor/ScrollTrigger.min.js"></script>
<script src="assets/vendor/lenis.min.js"></script>
<script src="assets/js/core.js"></script>
<script src="assets/js/pages/{script}.js"></script>
</body>
</html>
"""


def build_css():
    """Concatenate src/css/*.css (sorted) into assets/css/pages.css."""
    folder = os.path.join(ROOT, "src", "css")
    parts = []
    for fn in sorted(os.listdir(folder)):
        if fn.endswith(".css"):
            with open(os.path.join(folder, fn), encoding="utf-8") as f:
                parts.append(f"/* ---- {fn} ---- */\n" + f.read())
    with open(os.path.join(ROOT, "assets", "css", "pages.css"), "w", encoding="utf-8", newline="\n") as f:
        f.write("/* Generated by tools/build_pages.py from src/css/*.css. Edit those files, not this one. */\n" + "\n".join(parts))


if __name__ == "__main__":
    build_css()
    built = 0
    for spec in PAGES:
        if not os.path.exists(os.path.join(SRC, spec[0] + ".html")):
            continue
        built += 1
        out = os.path.join(ROOT, spec[0] + ".html")
        with open(out, "w", encoding="utf-8", newline="\n") as f:
            f.write(build(*spec))
    print(f"built {built} of {len(PAGES)} pages")
