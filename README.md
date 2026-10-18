# IIM Bangalore — The Global Leadership Journal (concept)

Third concept site for IIMB, beside `D:\iimb-architectural` (8765) and `D:\iimb-observatory` (8766). Not the official website.

## Run

```
cd D:\iimb-journal
python tools/serve.py
```
Open http://127.0.0.1:8767/ (the server supports Range requests for the campus film).

## Pages
Home (cover), About, Programmes + programme detail, Research + theme pages, Faculty + profiles (109, official portraits), Partnership Studio, News & Events + story pages, Centres + centre pages (CSITM in full), Campus & Student Life, Recruiters & Alumni, Search, Sources & credits.

## Structure
- `src/pages/*.html` page bodies, `src/css/*.css` page styles → `python tools/build_pages.py` writes the root HTML and `assets/css/pages.css`.
- `assets/css/journal.css` design system; `assets/js/core.js` runtime (Lenis + GSAP, line reveals, plates, contents overlay, search, page-turn leaf, FLIP); `assets/js/pages/*.js` one script per page.
- `data/*.js` verified content (iimb.ac.in, 16–18 Oct 2026); `data/journal.js` concept curation + CSITM; `data/portraits.js`.
- Tools: `check.mjs` (106 functional checks), `shoot.mjs`, `frames.mjs`, `bench.mjs` (benchmark capture), `grab.mjs`, `portraits.mjs`, `css_collisions.py`.
- Research: `research/BENCHMARKS.md`, `research/bench*/`.
