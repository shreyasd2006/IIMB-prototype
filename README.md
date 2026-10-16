# IIM Bangalore — The Architectural Institution

This is a concept website for the Indian Institute of Management Bangalore. It is built on the approved "Architectural Institution" design, from `D:\IIMB\IIMB\IIMB_Architectural_Institution (1).html`. It is **not** the official IIMB website, and every page says so.

## Run it

There is no build step and nothing to install.

```
cd D:\iimb-architectural
python tools/serve.py
```

Then open <http://127.0.0.1:8765/>.

Opening `index.html` directly also works, because the data loads as plain `<script>` files. Use `tools/serve.py` (it supports HTTP Range requests, which browsers need to stream and seek the campus films; Python’s plain `http.server` does not).

To preview events moving into "past", add `?today=2026-12-20` to any URL.

## Pages

| Page | File |
|---|---|
| Home (campus film hero, programmes index, research, faculty finder, centres, films, news, rankings, industry) | `index.html` |
| About: institution, architecture, history timeline, leadership, Board, governance documents, rankings | `about.html` |
| Programmes finder, and the 11 programme pages | `programmes.html`, `programme.html?id=pgp` |
| Research themes, working-paper index, journal articles | `research.html?theme=digital` |
| Faculty directory (109), and profiles | `faculty.html?q=…&area=…`, `person.html?id=…` |
| Centres directory (16), and centre pages | `centres.html`, `centre.html?id=cdpg` |
| Campus life: photo essay, library film, facilities, sustainability, tour films | `campus.html` |
| News & events, with search, categories and month browsing | `news.html`, `news.html#events` |
| Story and event pages | `story.html?id=…`, `story.html?event=…` |
| Industry partnerships, routes and the enquiry form (drafts an email) | `industry.html` |
| Site search (also opens as an overlay with `/` or the search button) | `search.html?q=…` |
| Sources and image credits | `credits.html` |

## Structure

```
assets/css/site.css    design system: tokens, type, components, pergola reveal
assets/js/core.js      header/footer, search, pergola reveal, ambient video, YouTube click-to-load
assets/js/pages.js     one renderer per page
data/*.js              generated content (do not hand-edit except institute.js)
data/institute.js      hand-compiled institutional content, with sources
assets/img/            optimised photographs (credits.json records each origin)
assets/video/          official IIMB campus and library films (from iimb.ac.in)
research/              raw pages fetched from iimb.ac.in on 16 Oct 2026
tools/build_data.py    research/ → data/*.js + images
tools/build_pages.py   writes the HTML pages from one shared head
tools/shoot.mjs        headless-Edge screenshots (desktop/mobile) + console/overflow checks
tools/check.mjs        389 functional checks (every detail page, filters, search, video, form, links)
```

To update content:

1. Re-fetch into `research/`.
2. Run `python tools/build_data.py`.
3. Run `python tools/build_pages.py`. You only need this step if the page markup changed.
