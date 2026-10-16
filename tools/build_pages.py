"""Write the site's HTML pages from one shared head. Run: python tools/build_pages.py"""
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ARR = '<svg class="arr" viewBox="0 0 16 16" aria-hidden="true"><path d="M1 8h13M9 3l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>'


def page(fname, page_id, title, desc, body, section=None, preload=""):
    html = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="theme-color" content="#F6F5F1">
<link rel="icon" href="assets/brand/favicon.png" type="image/png">
<link rel="preload" href="assets/fonts/martel-latin-200.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/anek-latin-wdth-wght.woff2" as="font" type="font/woff2" crossorigin>{preload}
<link rel="stylesheet" href="assets/css/site.css">
<script defer src="data/institute.js"></script>
<script defer src="data/photos.js"></script>
<script defer src="data/faculty.js"></script>
<script defer src="data/news.js"></script>
<script defer src="data/events.js"></script>
<script defer src="data/publications.js"></script>
<script defer src="assets/js/pages.js"></script>
<script defer src="assets/js/core.js"></script>
</head>
<body data-page="{page_id}" data-section="{section or page_id}">
<main id="main" tabindex="-1">
{body.strip()}
</main>
<noscript><div class="wrap" style="padding:24px 0"><p>This concept site builds its directories from data files with JavaScript. Please enable JavaScript, or visit <a href="https://www.iimb.ac.in/">iimb.ac.in</a>.</p></div></noscript>
</body>
</html>
"""
    open(os.path.join(ROOT, fname), "w", encoding="utf-8", newline="\n").write(html)


def head(crumbs, h1, deck, h1_id="", deck_id=""):
    cr = "".join(f"<li>{c}</li>" for c in crumbs)
    return f"""<header class="page-head"><div class="wrap">
  <ol class="crumbs">{cr}</ol>
  <div class="grid"><h1 class="t-1"{f' id="{h1_id}"' if h1_id else ''}>{h1}</h1><p class="deck"{f' id="{deck_id}"' if deck_id else ''}>{deck}</p></div>
</div></header>"""


HOME = '<a href="index.html">Home</a>'

# ------------------------------------------------------------------ HOME
page("index.html", "home", "IIM Bangalore — The Architectural Institution",
     "A concept website for the Indian Institute of Management Bangalore: B.V. Doshi's stone campus, its programmes, research, faculty and centres.",
     preload='\n<link rel="preload" href="assets/img/aerial-1600.jpg" as="image">',
     body=f"""
<section class="hero" aria-label="Introduction">
  <div class="hero-frame">
    <div class="hero-media">
      <video id="heroVideo" autoplay muted loop playsinline preload="metadata" poster="assets/img/aerial-1600.jpg" aria-label="Campus film: the stone buildings, corridors and grounds of IIM Bangalore">
        <source src="assets/video/iimb-campus.mp4" type="video/mp4">
      </video>
    </div>
    <div class="hero-copy hero-intro">
      <div>
        <p class="dev" lang="sa">तेजस्वि नावधीतमस्तु</p>
        <h1 class="t-hero">Let our study be enlightening.</h1>
      </div>
      <div class="hero-side">
        <p>The Indian Institute of Management Bangalore: an Institute of National Importance, teaching and researching in B.V. Doshi’s stone campus since 1983.</p>
        <div class="btns"><a class="btn" href="programmes.html">Explore programmes {ARR}</a><a class="btn ghost" href="about.html#architecture">The campus</a></div>
      </div>
    </div>
    <div class="hero-foot">
      <span>Campus film · <a href="https://www.iimb.ac.in/" rel="noopener">IIM Bangalore</a> · the motto, from the Taittiriya Upanishad</span>
      <button class="play-toggle" id="heroToggle" type="button" aria-pressed="false">Pause film</button>
    </div>
  </div>
  <nav class="doors" id="doors" aria-label="Find your way"></nav>
</section>

<section class="section intro" aria-labelledby="introH">
  <div class="wrap grid">
    <div class="statement">
      <h2 id="introH" class="t-2">A lesson in rhythm and composition.</h2>
      <p class="lede" style="margin-top:28px">From the logo that portrays the rays of the rising sun to the design of the IIMB complex, light plays a crucial role.</p>
      <p class="src">— <a href="https://www.iimb.ac.in/about-institute/architecture" rel="noopener" class="ext">IIMB, Architecture</a></p>
    </div>
    <div class="body">
      <p>The Indian Institute of Management Bangalore is a leading graduate school of management in Asia. Under the IIM Act of 2017, IIMB is an Institute of National Importance. Its programmes run from undergraduate degrees to a PhD, alongside executive education for working leaders.</p>
      <p>The campus was laid out by B.V. Doshi on the plan of Fatehpur Sikri: a network of corridors, courtyards and gardens, so that academic exchange carries on beyond the classroom.</p>
      <a class="link" href="about.html">About the institution {ARR}</a>
      <ul class="legend" id="legend"></ul>
    </div>
  </div>
</section>

<section class="plate on-night" aria-labelledby="archH">
  <div id="archPlate"></div>
  <div class="plan">
    <div>
      <h2 id="archH" class="sr-only">Architecture</h2>
      <blockquote><p>“To create an atmosphere where you don’t see divides and doors.”</p>
        <div class="who"><img src="assets/img/doshi-500.jpg" alt="" width="64" height="64" loading="lazy"><span><strong>B.V. Doshi</strong><br><span class="muted small">Architect of the campus, completed 1983 · <a href="https://www.iimb.ac.in/about-institute/architecture" rel="noopener" style="color:inherit">source</a></span></span></div>
      </blockquote>
    </div>
    <ul class="elements" id="archElements"></ul>
    <a class="link" href="about.html#architecture" style="align-self:flex-start">Read the architecture {ARR}</a>
  </div>
</section>

<section class="section" aria-labelledby="progH">
  <div class="wrap">
    <div class="head"><h2 id="progH" class="t-1">Programmes, from the first degree to the doctorate.</h2><p>Undergraduate honours, the two-year MBA, executive MBAs for experienced professionals, public policy, the PhD and executive education.</p></div>
    <div class="courtyard">
      <div class="courtyard-view" id="progView" aria-hidden="true"></div>
      <div><ul class="index-list" id="progList"></ul><p style="margin-top:28px"><a class="link" href="programmes.html">Compare all programmes {ARR}</a></p></div>
    </div>
  </div>
</section>

<section class="section on-paper2" aria-labelledby="resH">
  <div class="wrap">
    <div class="head"><h2 id="resH" class="t-1">Research, read in public.</h2><p>Working papers from IIMB faculty and doctoral scholars, and new journal articles, as they appear on the institute’s research pages.</p></div>
    <nav class="themes" id="themesHome" aria-label="Research themes" style="margin-bottom:56px"></nav>
    <div class="ledger">
      <div><h3 class="t-4" style="margin-bottom:14px">Latest working papers</h3><ul class="entries" id="wpList"></ul></div>
      <div><h3 class="t-4" style="margin-bottom:14px">New in journals</h3><ul class="entries" id="jaList"></ul></div>
    </div>
    <p style="margin-top:32px"><a class="link" href="research.html">The research index {ARR}</a></p>
  </div>
</section>

<section class="section" aria-labelledby="facH">
  <div class="wrap grid">
    <div style="grid-column:1/span 5">
      <h2 id="facH" class="t-1">Find a scholar.</h2>
      <p class="lede" style="margin-top:24px">Search the directory of IIMB faculty by name, area or the subjects in their profiles.</p>
      <form class="finder" action="faculty.html" role="search"><label class="sr-only" for="homeFinder">Search faculty</label><input id="homeFinder" name="q" placeholder="Name or topic"><button type="submit">Search {ARR}</button></form>
    </div>
    <div style="grid-column:7/span 6"><ul class="areas" id="areasHome" aria-label="Faculty by area"></ul></div>
  </div>
</section>

<section class="section ruled" style="border-top:1px solid var(--rule)" aria-labelledby="cenH">
  <div class="wrap">
    <div class="head"><h2 id="cenH" class="t-1">Centres where disciplines meet.</h2><p>Centres of excellence, an incubator and research initiatives: from public policy and digital public goods to capital markets and real estate.</p></div>
    <nav class="wall" id="wall" aria-label="Centres"></nav>
  </div>
</section>

<section class="section on-night" aria-labelledby="filmH">
  <div class="wrap">
    <div class="head"><h2 id="filmH" class="t-1">Films from the campus.</h2><p>Official IIM Bangalore films. Each loads from YouTube only when you press play.</p></div>
    <div class="films"><div class="film-main" id="filmMain"></div><ul class="film-list" id="filmList" aria-label="Choose a film"></ul></div>
  </div>
</section>

<section class="section" aria-labelledby="newsH">
  <div class="wrap">
    <div class="head"><h2 id="newsH" class="t-1">News and encounters.</h2><p class="actions"><a class="link" href="news.html">All news & events {ARR}</a></p></div>
    <div class="news-home">
      <article class="lead-story" id="leadStory"></article>
      <div><h3 class="t-4" style="margin-bottom:12px">Recent</h3><ul class="story-list" id="storyList"></ul></div>
      <div><h3 class="t-4" style="margin-bottom:12px">Coming up</h3><ul class="event-list" id="eventList"></ul></div>
    </div>
  </div>
</section>

<section class="section" style="border-top:1px solid var(--rule)" aria-labelledby="recH">
  <div class="wrap">
    <div class="head"><h2 id="recH" class="t-2">Recognition, with its sources.</h2><p>Recent rankings as reported by IIMB. Each line links to the institute’s announcement.</p></div>
    <div class="table-scroll"><table class="recog"><thead><tr><th>Rank</th><th>Scope</th><th>Programme or measure</th><th>Ranking</th></tr></thead><tbody id="recog"></tbody></table></div>
  </div>
</section>

<section class="section on-paper2 closing" aria-labelledby="indH">
  <div class="wrap band">
    <div><h2 id="indH" class="t-1">Bring a question. Build knowledge.</h2><p style="margin-top:20px">Recruit graduates, develop your leaders, commission research with a centre, or back founders through NSRCEL.</p><a class="btn" href="industry.html" style="margin-top:16px">Work with IIMB {ARR}</a></div>
    <ul class="routes">
      <li><a href="industry.html#recruit">Recruit graduates {ARR}</a></li>
      <li><a href="industry.html#exec">Executive education {ARR}</a></li>
      <li><a href="industry.html#research">Research partnerships {ARR}</a></li>
      <li><a href="industry.html#ventures">Startups & NSRCEL {ARR}</a></li>
    </ul>
  </div>
</section>
""")

# ------------------------------------------------------------------ ABOUT
page("about.html", "about", "About IIMB — The Architectural Institution", "History, architecture, leadership and governance of IIM Bangalore.",
     body=head([HOME, "About"], "An idea made inhabitable.", "IIM Bangalore: an Institute of National Importance since the IIM Act of 2017, housed since 1983 in a campus built as a lesson in rhythm and composition.") + f"""
<section class="section" aria-labelledby="instH">
  <div class="wrap split">
    <div class="side"><div class="sticky"><h2 id="instH" class="t-2">The institution</h2><div id="motto" style="margin-top:28px"></div></div></div>
    <div class="prose"><div id="overview"></div><h3>Mission and values</h3><ul id="mission"></ul></div>
  </div>
</section>

<section id="architecture" class="on-night" aria-labelledby="archH2">
  <div id="archHero"></div>
  <div class="section" style="padding-top:clamp(48px,6vw,96px)"><div class="wrap">
    <div class="head"><h2 id="archH2" class="t-1">Architecture: stone, courtyards and light.</h2><p>Designed by B.V. Doshi and completed in 1983, the campus is a case study for architects worldwide.</p></div>
    <div class="split">
      <div class="side"><div class="sticky"><div id="archDoshi"></div></div></div>
      <div><div id="archLede"></div><div class="prose" id="archBody" style="margin-top:24px;color:var(--night-text)"></div></div>
    </div>
    <div class="essay-row" id="archPhotos" style="margin-top:72px"></div>
  </div></div>
</section>

<section class="section" aria-labelledby="histH">
  <div class="wrap">
    <div class="head"><h2 id="histH" class="t-1">From a city campus to Bannerghatta Road.</h2><p>Milestones from the IIMB Archives and the institute’s own pages. Archive photographs are reproduced at the resolution the archive publishes.</p></div>
    <ol class="timeline" id="timeline"></ol>
  </div>
</section>

<section id="leadership" class="section on-paper2" aria-labelledby="leadH">
  <div class="wrap">
    <div class="head"><h2 id="leadH" class="t-1">Leadership and governance.</h2><p>The Board of Governors, the Director-in-charge and the Deans, as listed by IIMB on 14 August 2026.</p></div>
    <div id="leaders"></div>
    <h3 class="t-3" style="margin:72px 0 20px">Board of Governors</h3>
    <table class="board-table"><tbody id="board"></tbody></table>
    <p class="src" id="boardNote" style="margin-top:10px"></p>
    <div class="grid" style="margin-top:72px;row-gap:48px">
      <div style="grid-column:span 6"><h3 class="t-3" style="margin-bottom:20px">International Advisory Committee</h3><ul class="plain-list" id="iac"></ul></div>
      <div style="grid-column:8/span 5"><h3 class="t-3" style="margin-bottom:20px">Statutes and documents</h3><ul class="plain-list" id="docs"></ul></div>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="recH2">
  <div class="wrap">
    <div class="head"><h2 id="recH2" class="t-2">Accreditation and rankings</h2><p>EQUIS-accredited since 2010 and re-accredited in December 2021. Recent rankings, each with its source.</p></div>
    <div class="table-scroll"><table class="recog"><thead><tr><th>Rank</th><th>Scope</th><th>Programme or measure</th><th>Ranking</th></tr></thead><tbody id="recogAbout"></tbody></table></div>
    <div id="aboutSources"></div>
  </div>
</section>
""")

# ------------------------------------------------------------------ PROGRAMMES
page("programmes.html", "programmes", "Programmes — IIM Bangalore", "Compare IIM Bangalore's degree, doctoral, undergraduate and executive programmes.",
     body=head([HOME, "Programmes"], "Learn to lead, with perspective.", "Eleven programmes, from four-year honours degrees to the PhD. Compare duration, format and experience, then open a programme for eligibility, curriculum and how to apply.") + """
<section class="section" style="padding-top:40px" aria-label="Programme finder">
  <div class="wrap">
    <div class="toolbar">
      <div class="field grow"><label class="label" for="progSearch">Search programmes</label><input id="progSearch" type="search" placeholder="e.g. weekend, analytics, public policy"></div>
      <div class="field"><span class="label" id="lvlL">Level</span><div class="chips" id="levelChips" role="group" aria-labelledby="lvlL"></div></div>
    </div>
    <div class="count-line" id="progCount" aria-live="polite"></div>
    <div class="table-scroll"><table class="programme-table"><thead><tr><th>Programme</th><th>Level</th><th>Duration</th><th>Format</th><th>Work experience</th></tr></thead><tbody id="progTable"></tbody></table></div>
    <div class="empty-state" id="progEmpty" hidden><p class="t-3">No programme matches that search.</p><p>Try “MBA”, “online” or “doctoral”, or clear the level filter.</p></div>
    <div id="progSources"></div>
  </div>
</section>
""")

page("programme.html", "programme", "Programme — IIM Bangalore", "Programme details: eligibility, curriculum, admissions and how to apply.", section="programmes",
     body=f"""
<header class="page-head"><div class="wrap">
  <ol class="crumbs"><li>{HOME}</li><li><a href="programmes.html">Programmes</a></li><li id="crumb"></li></ol>
  <div class="grid"><h1 class="t-1" id="pTitle"></h1><p class="deck" id="pDeck"></p></div>
</div></header>
<div id="pImg"></div>
<section class="section" aria-label="Programme details">
  <div class="wrap split">
    <div class="side"><div class="sticky stack"><div id="pCta" class="stack" style="display:grid;gap:14px;justify-items:start"></div><div id="pChair"></div></div></div>
    <div>
      <h2 class="t-3" style="margin-bottom:20px">At a glance</h2>
      <table class="facts-table"><tbody id="pFacts"></tbody></table>
      <div id="pAid" class="prose" style="margin-top:20px"></div>
      <h2 class="t-3" style="margin:56px 0 20px">Curriculum</h2><ul class="plain-list" id="pCurr"></ul>
      <h2 class="t-3" style="margin:56px 0 20px">Admissions</h2><ol class="steps" id="pAdm"></ol>
      <div id="pDates"></div>
      <div id="pNews" style="margin-top:56px"></div>
      <div id="pOthers" style="margin-top:56px"></div>
      <div id="pSources"></div>
    </div>
  </div>
</section>
""")

# ------------------------------------------------------------------ RESEARCH
page("research.html", "research", "Research — IIM Bangalore", "IIMB research themes, the working paper series and recent faculty journal articles.",
     body=head([HOME, "Research"], "Inquiry with consequence.", "Faculty research across every functional area of management, published as journal articles and through IIMB’s working paper series on SSRN.") + """
<section class="section" style="padding-top:56px" aria-labelledby="themeH">
  <div class="wrap">
    <h2 id="themeH" class="t-3" style="margin-bottom:20px">Browse by theme</h2>
    <div class="themes" id="themes" role="group" aria-label="Filter working papers by theme"></div>
  </div>
</section>
<section class="section" style="padding-top:0" aria-labelledby="wpH">
  <div class="wrap split">
    <div class="side"><div class="sticky"><h2 id="wpH" class="t-2">Working papers</h2><p class="muted" id="wpNote" style="margin-top:16px"></p></div></div>
    <div>
      <div class="toolbar">
        <div class="field grow"><label class="label" for="wpSearch">Search titles and authors</label><input id="wpSearch" type="search" placeholder="e.g. inflation, caste, Majumdar"></div>
        <div class="field"><label class="label" for="wpYear">Year</label><select id="wpYear"></select></div>
      </div>
      <div class="count-line" id="wpCount" aria-live="polite"></div>
      <ul class="entries" id="wpList"></ul>
      <div class="empty-state" id="wpEmpty" hidden><p class="t-3">No working papers match.</p><p>Try a broader word or another year, or clear the theme.</p></div>
    </div>
  </div>
</section>
<section class="section on-paper2" aria-labelledby="jaH">
  <div class="wrap split">
    <div class="side"><div class="sticky"><h2 id="jaH" class="t-2">Faculty in journals</h2><p class="muted" style="margin-top:16px">Recent journal articles highlighted on IIMB’s research page.</p></div></div>
    <ul class="entries" id="jaList"></ul>
  </div>
</section>
<section class="section" aria-labelledby="rpH">
  <div class="wrap split">
    <div class="side"><h2 id="rpH" class="t-2">Seminars, workshops, conferences</h2></div>
    <div><ul class="event-list" id="rpEvents"></ul><div id="resSources"></div></div>
  </div>
</section>
""")

# ------------------------------------------------------------------ FACULTY
page("faculty.html", "faculty", "Faculty directory — IIM Bangalore", "Search IIM Bangalore faculty by name, area, position and research interests.",
     body=head([HOME, "Faculty"], "Meet the minds behind the work.", "The full-time faculty listed on IIMB’s eleven area pages. Search names, areas and the text of their official profiles.") + """
<section class="section" style="padding-top:40px" aria-label="Faculty directory">
  <div class="wrap">
    <form class="toolbar" role="search" onsubmit="return false">
      <div class="field grow"><label class="label" for="fSearch">Search</label><input id="fSearch" type="search" placeholder="Name, area or topic — e.g. game theory"></div>
      <div class="field"><label class="label" for="fArea">Area</label><select id="fArea"></select></div>
      <div class="field"><label class="label" for="fRank">Position</label><select id="fRank"></select></div>
      <div class="field"><label class="label" for="fSort">Sort</label><select id="fSort"><option value="last">Surname</option><option value="first">First name</option><option value="area">Area</option></select></div>
    </form>
    <div class="count-line" id="fCount" aria-live="polite"></div>
    <ul class="directory" id="fList"></ul>
    <div class="empty-state" id="fEmpty" hidden><p class="t-3">No faculty match these filters.</p><p>Check the spelling, try a single word, or clear the area and position filters.</p></div>
    <div id="facSources"></div>
  </div>
</section>
""")

page("person.html", "person", "Faculty profile — IIM Bangalore", "Faculty profile.", section="faculty",
     body=f"""
<header class="page-head profile-head"><div class="wrap">
  <ol class="crumbs"><li>{HOME}</li><li><a href="faculty.html">Faculty</a></li><li id="crumb"></li></ol>
  <span class="mono profile-mono" id="pMono" aria-hidden="true"></span>
  <h1 class="t-1" id="pName"></h1><p class="lede" id="pRole" style="margin-top:16px;max-width:none"></p>
</div></header>
<section class="section" aria-label="Profile">
  <div class="wrap split">
    <div class="side"><div class="sticky"><div id="pSide"></div><div id="pCentres"></div></div></div>
    <div><div class="prose" id="pSummary"></div><div id="pPubs"></div><div id="pWp"></div><div id="pNews"></div>
      <p class="src" style="margin-top:32px">Profile text from the official IIMB faculty page, checked 16 October 2026.</p></div>
  </div>
</section>
<section class="section on-paper2" aria-labelledby="peersH"><div class="wrap"><h2 id="peersH" class="t-3" style="margin-bottom:20px">Colleagues in the same area</h2><div class="people" id="pPeers"></div></div></section>
""")

# ------------------------------------------------------------------ CENTRES
page("centres.html", "centres", "Centres — IIM Bangalore", "IIMB centres of excellence, NSRCEL and research initiatives.",
     body=head([HOME, "Centres"], "Where disciplines come together.", "Centres of excellence and initiatives draw on faculty across areas to work with government, industry and society on focused questions.") + """
<section class="section" style="padding-top:40px" aria-label="Centres directory">
  <div class="wrap">
    <div class="toolbar">
      <div class="field grow"><label class="label" for="cSearch">Search centres</label><input id="cSearch" type="search" placeholder="e.g. health, governance, startups"></div>
      <div class="field"><span class="label" id="kindL">Type</span><div class="chips" id="kindChips" role="group" aria-labelledby="kindL"></div></div>
    </div>
    <div class="count-line" id="cCount" aria-live="polite"></div>
    <h2 class="sr-only">Centres and initiatives</h2><div id="cGrid"></div>
    <div class="empty-state" id="cEmpty" hidden><p class="t-3">No centres match.</p><p>Try a broader word, or choose “All”.</p></div>
    <div id="cenSources"></div>
  </div>
</section>
""")

page("centre.html", "centre", "Centre — IIM Bangalore", "Centre details.", section="centres",
     body=f"""
<header class="page-head"><div class="wrap">
  <ol class="crumbs"><li>{HOME}</li><li><a href="centres.html">Centres</a></li><li id="crumb"></li></ol>
  <div class="grid"><h1 class="t-1" id="cName"></h1><p class="deck" id="cDeck"></p></div>
</div></header>
<section class="section" aria-label="About the centre">
  <div class="wrap split">
    <div class="side"><div class="sticky stack"><p class="label">Research areas</p><div class="chips" id="cAreas"></div><div id="cContact" style="display:grid;gap:14px;justify-items:start;margin-top:28px"></div></div></div>
    <div><div id="cAbout"></div><div id="cGroups"></div><div id="cNumbers"></div>
      <h2 class="t-3" style="margin:56px 0 20px">People</h2><div id="cPeople"></div>
      <h2 class="t-3" style="margin:56px 0 20px">Activities</h2><div id="cActivity"></div>
      <div id="cSources"></div></div>
  </div>
</section>
""")

# ------------------------------------------------------------------ CAMPUS
page("campus.html", "campus", "Campus life — IIM Bangalore", "Life on IIMB's stone campus: places, people, facilities and sustainability.",
     body=head([HOME, "Campus life"], "A place to pause. A place to meet.", "Life at IIMB extends far beyond the classroom: corridors wide enough to sit in, courtyards planted as gardens, and a hundred acres under trees.") + """
<section class="section" aria-label="Photo essay">
  <div class="wrap">
    <div class="essay-row" id="essay1"></div>
    <div class="essay-row" id="essay2"></div>
    <div class="essay-row" id="essay3"></div>
  </div>
</section>
<section class="section on-night" aria-labelledby="lifeH">
  <div class="wrap">
    <div class="head"><h2 id="lifeH" class="t-1">Students, clubs and the year’s events.</h2><p>Figures as published on IIMB’s Student Life page.</p></div>
    <div id="figures"></div>
  </div>
</section>
<section class="section" aria-labelledby="libH">
  <div class="wrap">
    <div class="head"><h2 id="libH" class="t-1">The library, in motion.</h2><p>A short film of the library from the IIMB homepage. It plays silently while on screen and pauses when you scroll away.</p></div>
    <div class="video-plate"><video id="libVideo" muted loop playsinline preload="none" poster="assets/img/library-hall-1600.jpg" aria-label="Film of the IIMB library: reading halls and bookshelves"><source src="assets/video/iimb-library.mp4" type="video/mp4"></video><button class="play-toggle" id="libToggle" type="button" aria-pressed="true">Play film</button></div>
    <p class="caption">Film: IIM Bangalore · <a href="https://www.iimb.ac.in/" rel="noopener">iimb.ac.in</a></p>
  </div>
</section>
<section class="section on-paper2" aria-labelledby="facilH">
  <div class="wrap"><div class="head"><h2 id="facilH" class="t-1">Facilities.</h2><p>Descriptions are condensed from IIMB’s Life @IIMB and Student Life pages.</p></div><div id="facilities"></div></div>
</section>
<section class="section" aria-labelledby="sustH">
  <div class="wrap grid" style="row-gap:40px">
    <div style="grid-column:1/span 5"><h2 id="sustH" class="t-1">A campus that grows trees.</h2><ul class="legend" id="sust" style="margin-top:32px"></ul><p class="small muted" style="margin-top:20px">In August 2026 IIMB received the ELCITA Gold Award and three Awards for Excellence: Water, Biodiversity, and Social Welfare & Community Services. <a class="inline-link" href="story.html?id=iimb-wins-elcita-sustainability-awards-2025-26">Read the story</a></p></div>
    <div style="grid-column:7/span 6" id="sustPhoto"></div>
  </div>
</section>
<section class="section on-night" aria-labelledby="tourH">
  <div class="wrap">
    <div class="head"><h2 id="tourH" class="t-1">Campus tour films.</h2><p>The three films on IIMB’s official Campus Tour page, including Dr. B.V. Doshi walking his campus.</p></div>
    <div class="grid" style="row-gap:24px"><div style="grid-column:1/span 8"><div class="film-main" id="tourFilm"></div></div><div style="grid-column:9/span 4" id="tourList"></div></div>
  </div>
</section>
<section class="section" aria-labelledby="festH">
  <div class="wrap grid" style="row-gap:32px">
    <div style="grid-column:1/span 6" id="festivals"></div>
    <div style="grid-column:8/span 5"><h2 id="festH" class="t-2">Festivals and the arts</h2><p class="muted" style="margin-top:16px">Unmaad is the student festival; Yamini and Eximius are among the annual events pictured on IIMB’s Student Life page. Dhwani, the music club, performs on campus through the year.</p><div id="campusSources"></div></div>
  </div>
</section>
""")

# ------------------------------------------------------------------ NEWS
page("news.html", "news", "News & events — IIM Bangalore", "Search IIMB news and upcoming events by topic and month.",
     body=head([HOME, "News & events"], "News, ideas and encounters.", "Every IIMB news release from June to October 2026 and the institute’s announced events. Search them, or browse by month.") + """
<section class="section" style="padding-top:32px" aria-label="Newsroom">
  <div class="wrap">
    <div class="tabs" role="tablist" aria-label="News or events">
      <button role="tab" id="tab-news" data-tab="news" aria-controls="panel-news" aria-selected="true">News</button>
      <button role="tab" id="tab-events" data-tab="events" aria-controls="panel-events" aria-selected="false" tabindex="-1">Events</button>
    </div>
    <div class="toolbar" style="border-top:0">
      <div class="field grow"><label class="label" for="nSearch">Search</label><input id="nSearch" type="search" placeholder="e.g. ranking, NSRCEL, conference"></div>
      <div class="field" id="catField"><label class="label" for="nCat">Category</label><select id="nCat"></select></div>
    </div>
    <div class="news-layout" style="margin-top:32px">
      <aside class="months" aria-label="Browse by month"><p class="label" style="margin-bottom:10px">Browse by month</p><ol id="months"></ol></aside>
      <div>
        <div class="count-line" id="nCount" aria-live="polite" style="padding-top:0"></div>
        <div id="panel-news" role="tabpanel" aria-labelledby="tab-news"><ul class="news-items" id="newsItems"></ul></div>
        <div id="panel-events" role="tabpanel" aria-labelledby="tab-events" hidden>
          <ul class="event-list" id="evUpcoming"></ul>
          <div id="evPastWrap" hidden><h2 class="t-3" style="margin:48px 0 16px">Past events</h2><ul class="event-list" id="evPast"></ul></div>
        </div>
        <div class="empty-state" id="nEmpty" hidden><p class="t-3">Nothing matches.</p><p>Try another word, choose “All months”, or clear the category.</p></div>
        <div id="newsSources"></div>
      </div>
    </div>
  </div>
</section>
""")

page("story.html", "story", "Story — IIM Bangalore", "News story or event.", section="news",
     body=f"""
<header class="page-head story-head"><div class="wrap">
  <ol class="crumbs"><li>{HOME}</li><li id="crumbSection"><a href="news.html">News</a></li></ol>
  <h1 class="t-2" id="sTitle"></h1>
  <div class="meta-line after" id="sMeta" style="margin-top:20px"></div>
  <p class="stand" id="sStand"></p>
</div></header>
<div class="wrap" id="sFig" style="margin-top:40px"></div>
<section class="section" style="padding-top:56px" aria-label="Story">
  <div class="wrap grid" style="row-gap:40px">
    <article class="story-body" id="sBody" style="grid-column:1/span 8"></article>
    <aside style="grid-column:10/span 3"><div class="story-aside" id="sAside"></div><div id="sPeople"></div></aside>
    <div style="grid-column:1/span 8" id="sNote"></div>
  </div>
</section>
<section class="section on-paper2" aria-label="More"><div class="wrap" id="sMore"></div></section>
""")

# ------------------------------------------------------------------ INDUSTRY
page("industry.html", "industry", "Industry partnerships — IIM Bangalore", "Recruit, develop leaders, partner on research or back founders with IIMB.",
     body=head([HOME, "Industry"], "Bring a question. Build knowledge.", "Six routes to working with IIMB, each pointing to the office that handles it.") + f"""
<section class="section" style="padding-top:48px" aria-labelledby="routesH">
  <div class="wrap"><h2 id="routesH" class="sr-only">Routes to collaboration</h2><ul class="route-rows" id="routes"></ul></div>
</section>
<section class="section on-paper2" aria-labelledby="partH">
  <div class="wrap grid" style="row-gap:40px">
    <div style="grid-column:1/span 6"><h2 id="partH" class="t-2" style="margin-bottom:24px">Partners named by IIMB</h2><ul class="plain-list" id="partners"></ul><p class="src" style="margin-top:8px">From the About page and 2026 news releases.</p></div>
    <div style="grid-column:8/span 5"><h2 class="t-3" style="margin-bottom:20px">Partnership news</h2><ul class="story-list" id="partnerNews"></ul></div>
  </div>
</section>
<section class="section on-red" aria-labelledby="enqH">
  <div class="wrap grid" style="row-gap:40px">
    <div style="grid-column:1/span 5"><h2 id="enqH" class="t-1">Start a conversation.</h2><p class="muted-red" style="margin-top:20px">Tell us what you have in mind. This concept site doesn’t send anything itself: it drafts an email to the right IIMB office, which you send from your own mail app.</p></div>
    <form id="enquiry" class="enquiry" style="grid-column:7/span 6" novalidate>
      <label>Your name<input id="eName" autocomplete="name" required></label>
      <label>Organisation<input id="eOrg" autocomplete="organization" required></label>
      <label class="full">I’m interested in<select id="eType"><option value="recruit">Recruiting graduates</option><option value="exec">Executive education</option><option value="research">A research partnership</option><option value="ventures">Startups and NSRCEL</option><option value="cases">Teaching cases</option><option value="give">Giving</option><option value="other">Something else</option></select></label>
      <label class="full">Message<textarea id="eMsg" required></textarea></label>
      <p class="err full" id="eErr" role="alert"></p>
      <div class="full" style="display:flex;flex-wrap:wrap;gap:16px;align-items:center"><button class="btn" type="submit">Draft my email {ARR}</button><span class="small" id="eDone" aria-live="polite"></span></div>
    </form>
  </div>
</section>
<section class="section" style="padding-top:48px"><div class="wrap" id="indSources"></div></section>
""")

# ------------------------------------------------------------------ SEARCH / CREDITS
page("search.html", "search", "Search — IIM Bangalore", "Search the concept site.",
     body=head([HOME, "Search"], "Search the institution.", "Programmes, faculty, centres, news, events and working papers.") + """
<section class="section" style="padding-top:40px" aria-label="Search results"><div class="wrap">
  <form class="search-row" role="search" onsubmit="return false"><label class="sr-only" for="pageQ">Search</label><input id="pageQ" type="search" placeholder="Search…" autocomplete="off"></form>
  <div class="results" id="pageResults" aria-live="polite"></div>
</div></section>
""")

page("credits.html", "credits", "Sources & credits — IIM Bangalore concept", "Image credits and data sources.",
     body=head([HOME, "Sources & credits"], "Sources and credits.", "What this concept is built from, and where each fact and photograph comes from.") + """
<section class="section" style="padding-top:48px"><div class="wrap split">
  <div class="side"><h2 class="t-3">About this concept</h2></div>
  <div class="prose">
    <p>This is a concept website for the Indian Institute of Management Bangalore, built under the brief “The Architectural Institution”. It is not the official site and is not endorsed by IIMB.</p>
    <p>All text about the institute, its people, programmes, research, news and events was gathered from iimb.ac.in and its official subdomains on 16 October 2026. Quotations are verbatim. News and event text reproduces IIMB’s releases. Faculty data comes from the eleven area pages and the official profiles. Where official pages contradict each other, both values are noted rather than one chosen.</p>
    <p>The IIMB logo and sun symbol are reproduced unaltered from iimb.ac.in. The campus films are IIMB’s own: two video files from the IIMB homepage, and YouTube films from the official channel and Campus Tour page. Faculty portraits are deliberately not used.</p>
    <p><strong>Before any public release:</strong> confirm rights for official photographs and film, obtain higher-resolution archive images and a vector logo master, and re-verify dated facts such as rankings, fees and the board list.</p>
  </div>
</div></section>
<section class="section on-paper2"><div class="wrap">
  <h2 class="t-2" style="margin-bottom:24px">Photographs</h2>
  <div class="table-scroll"><table class="board-table"><tbody id="photoCredits"></tbody></table></div>
  <p class="src" id="newsCredits" style="margin-top:12px"></p>
</div></section>
<section class="section"><div class="wrap"><h2 class="t-2" style="margin-bottom:24px">Official pages used</h2><ul class="plain-list" id="allSources"></ul></div></section>
""")
print("pages written")
