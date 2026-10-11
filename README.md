# IIMB website concept prototype ("Open Corridor")

A working concept for a redesigned iimb.ac.in, built from `../IIMB Website Redesign Audit and Strategic Direction.md` (section 7, Prototype brief). **This is not the official IIMB website.** Every page carries a banner that says so.

## Run it

No build step and no dependencies. Either:

- **Double-click `index.html`.** The site works from `file://`, because the data loads as plain `<script>` files. Or
- **Serve the folder:** `python -m http.server 8765` from this folder, then open <http://127.0.0.1:8765/>.

JavaScript must be on, because pages render from the data files.

To preview events moving to the past automatically, add `?today=2026-12-20` (or any date) to any address.

## Routes

| # | Template | URL |
|---|---|---|
| 1 | Homepage | `index.html` |
| 2 | Programme page (PGP fully populated; PGPBA, EPGP and PGPEM show facts only) | `programme.html?id=pgp` |
| 3 | Programme finder and MBA comparison | `programmes.html` |
| 4 | Faculty directory and expert finder | `faculty.html` (for example `faculty.html?q=monetary`) |
| 5 | Faculty profile | `person.html?id=chetan-subramanian` |
| 6 | Research theme | `theme.html?id=dpi` |
| 7 | Centre page (sub-identity) | `centre.html?id=cdpg`, `centre.html?id=cpp` |
| 8 | Ideas article | `idea.html?id=wp745` |
| 9 | Newsroom | `news.html` |
| 10 | Event | `event.html?id=isc-2026` |
| 11 | Executive education catalogue | `executive-education.html` |
| 12 | Partner with IIMB | `partner.html` |
| 13 | About & Campus | `about.html` |
| 14 | Institute information | `institute-information.html` |
| 15 | Hindi variants | `hi/index.html`, `hi/programme.html?id=pgp` |
| – | Search (typed results, direct answers) | `search.html?q=What is the PGP fee?` |
| – | Notes: sources, placeholders, limits, credits | `prototype.html` |

## Structure

```
data/register.js   facts register: every fact carries a source and the date it was checked; gaps are stored as `pending`
data/people.js     109 faculty from IIMB's 11 area pages (generated)
data/content.js    photographs, profile, explainer, Hindi strings
assets/css/        site.css (the Open Corridor design system), fonts.css
assets/js/         core.js (chrome, components), pages-a.js, pages-b.js, pages-hi.js
assets/fonts/      self-hosted Anek Latin / Anek Devanagari / Martel (SIL OFL)
assets/photos/     Wikimedia Commons campus photographs (see credits.json)
```

## What is real and what isn't

See `prototype.html`. In short:

- All facts come from public IIMB pages fetched on 10–11 Oct 2026.
- Contradicted or unpublished facts appear as `[Label: confirm with Owner]` and are never guessed.
- The official IIMB logo is reproduced from iimb.ac.in for this concept (PNG; there is no vector master). Commissioned photography, campus drawings, licensed fonts and faculty consent are still needed.
- Keep this prototype private, or behind the prototype banner. It uses IIMB's real logo and must not be mistaken for the official site.
- The Hindi copy and the WP 745 explainer were drafted for the prototype and have not been reviewed.
