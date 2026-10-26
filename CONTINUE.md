# Continue here (v3 redesign, paused 24 Oct 2026)

Work in progress on the IIMB meeting-minutes changes ("IIMB Website Redesigning.docx" in Downloads) plus the user's 9 chat requests. The user said: use `/impeccable animate` to the fullest, keep animations at least as good, translate EVERYTHING into Hindi, follow the Color Guide, use the logos and UG photos.

Run: preview config "iimb-journal" in D:\.claude\launch.json (port 8767), or `python tools/serve.py`. Build: `python tools/build_pages.py` (also concatenates src/css/*.css into assets/css/pages.css). Checks: `node tools/check.mjs`, `node tools/audit.mjs <outDir> 1440 <pages>` (scroll-stop screenshots + text-overlap scan; collapsed FAQ answers and Eczar-era glyph boxes give false positives), `python tools/css_collisions.py`.

## Done so far
- PRODUCT.md Brand Commitments rewritten (Color Guide #A92D2D red / #631111 maroon / #E8E3DB cream, sans-serif only, official logos, continuous video, Hindi, v2 programmes layout, natural-colour photos).
- Assets: official logos in assets/brand (iimb-logo-official-480/960, iimb-logo-white-480/960, monogram white/colour, favicon-official). UG photos assets/img/ug-students-1..5-{800,1600}.jpg (registered in data/journal.js photos). QS badge, EQUIS, GNAM pngs in assets/img. Anek Devanagari font. Source zips extracted to research/incoming/.
- tools/migrate_v3.py ran: tokens (burgundy var = #631111, red = #A92D2D, cream = #E8E3DB, blush/gold remapped to cream), Gloock/Eczar removed (all fonts Anek), display weight 650, on-dark/on-burgundy/on-blush classes stripped from templates/scripts.
- core.js: white/cream section alternation (J.alternate, `data-keep-bg` opts out), Hindi engine (J.lang, J.t, J.translate DOM walker + MutationObserver, Hindi dates, lang toggle `[data-lang-toggle]` reloads), J.countUp from 1 (years too, fast), faster/earlier reveals (top 96%, 0.9s lines), J.bgFilm continuous with no controls, shared J.progCard + J.carousel.
- Chrome (tools/chrome_template.txt via tools/chrome_v3.py into build_pages.py): maroon utility row (links, हिन्दी toggle, Admissions), white header with exact official logo, nav About first, contents menu with white logo, footer = original iimb.ac.in sections + 6 social links + copyright row; dictionary loader `data/i18n-hi.js` written via document.write only when lang=hi. CSS in assets/css/journal.css (sections from tools/css_chrome_v3.css, tools/css_footer_v3.css), natural-colour `.duo`, `.bg-white/.bg-cream`, `html.lang-hi` typography.
- data/journal.js: sections reordered (About first), homeRank (QS 2026 "Global 52", only one of two Indian B-schools, source liveHome), advantage stats (1500+ students, 150+ faculty, 5300+ EEP participants, 46800+ EEP days) from live iimb.ac.in (checked 24 Oct).
- Home rebuilt (src/pages/index.html, home.js, src/css/00-home.css): no "In this issue" panel, no chair quote, no marquee; brief text full (line reveal), facts count up; new Rankings section; v2 programme carousel; news filtered to Rankings/Research/Programmes/Partnerships/Centres/Institution; events as red date blocks. Verified in screenshots.
- Programmes rebuilt on v2 layout (src/pages/programmes.html, programmes.js, src/css/programmes-v2.css + old programmes.css): hero + jump list, carousel, at-a-glance count-ups, numbered degree grid (red fill hover, outline numerals), 4 admission steps with drawing line, exec ed, finder+compare kept, UG & certificate list, calendar, FAQ accordion (verified answers), official links. Verified in screenshots (adm-dot fix applied, not re-shot).
- About restructured to original order (tools/about_v3.py): Overview hero, Vision/Mission/Values, Milestones, Architecture, Sun symbol (swatches now Color Guide), NEW Sustainability Report, NEW Accreditation & Rankings, Board (chair + director + deans + board list), NEW IIM Act and Rules, NEW Organisational Structure, International Advisory Committee.

## Status, 24 Oct 2026 (later)
All requested non-Hindi changes are done and verified: light-background colour fixes on every page (tools/light_v3.py), new About sections styled, library film plays continuously (reduced-motion visitors get the poster + play control), UG photos in the campus photo essay, credits page text matches the Color Guide. check.mjs 106/106; audit at 1440 clean apart from known collapsed-FAQ false positives.

## Hindi (paused by the user; resume only when asked)
- Engine: core.js translates text nodes + attributes; exact match, then number templates ("{n} items"), then pattern rules (research/i18n/rx.json), then " · ", " — ", ": " parts. Paper titles/citations carry data-no-i18n and stay English.
- Strings: node tools/i18n_extract.mjs (crawls ~198 pages) -> python tools/i18n_batches.py split -> research/i18n/todo/b000..b044.json ({id: English}).
- Done: research/i18n/done/b000..b010.json + extra.json. Remaining: b011..b044 (mostly long news/event paragraphs and faculty bios). Skip "Name — Faculty — IIM Bangalore" titles, author lists and photo-caption lines (handled by part fallback).
- Build: python tools/i18n_batches.py build -> data/i18n-hi.js. Test: node tools/hi_test.mjs.
- Note: re-running split renumbers ids; only re-split if the content changes, and remap done files if so.

## Still open (optional)
Impeccable finish reviewer + documenter (DESIGN.md), mobile pass, README update.

## Mobile fixes (24 Oct 2026)
- Server now listens on all interfaces (tools/serve.py); phones on the same Wi-Fi use http://<PC LAN IP>:8767/ (printed at start). Windows Firewall may ask to allow Python on private networks.
- All scripts are `defer` (build_pages.py); core boots on DOMContentLoaded. Cold load under phone CPU x4 + 20 Mbps went from ~22 s blank to ~3 s.
- English pages use assets/fonts/anek-devanagari-mini.woff2 (106 KB subset of the motto/हिन्दी glyphs; rebuild with fontTools if new Devanagari text is added: chars in research/deva-mini-chars.txt). Hindi mode uses the full font ("Anek Devanagari Full").
- alternate() uses checkVisibility() instead of offsetHeight (no forced layout).
- Phone test tools: tools/mobile_probe.mjs, mobile_time.mjs, mobile_tap.mjs, mobile_prof.mjs. Note: the first navigation in a fresh headless Edge takes ~4 s; wait longer on the first page.

## Second minutes (26 Oct 2026) — done
- Type: Playfair Display headings, Inter body (assets/fonts, journal.css tokens; --f-serif now = Inter). Lining figures site-wide.
- data/programme-detail.js (loaded on every page): IIMB.progDetail for all 11 programmes (overview, chair message, class profile tables, curriculum by term, global exposure, placements, fees/aid/scholarships, eligibility, dates, FAQ), IIMB.rankCards (11 published rankings, programme-tagged), new sources. Scraped from iimb.ac.in / ug. / eep. on 26 Oct (research/scrape-oct26). BBA DBE site was down; its facts come from the official DBE PDF/FAQ via search (sources dbeAdm, dbeFaq).
- core.js: J.rankCard / J.rankGrid / J.ranksFor, J.tiles, J.genderSplit, J.bars, J.gmatRange, J.series (charts grow on reveal via [data-bars]), J.hangIndex (corner "On this page" index; options label/start/after). Don't name helpers J.split (that is the text line splitter).
- programme.html/js rebuilt as full pages; Programmes: rankings band, corner index, degree cards with photos, underline + zoom hover (no red fill), timeline labels hang from dots, section anchor renamed #finder -> #track (the search overlay owns #finder).
- About: opening figures, Act and Rules as dated document line (6 docs incl. Rules Amendment 2022 and Regulations), IAC cards with full designations, rank cards, corner index. Home: rank cards.
- High-res photos: tools/photos_oct26.py -> assets/img/hr-*.jpg (registered at the end of data/photos.js).
- check.mjs 106/106. Hindi dictionary not updated for the new text (still paused).

## Second pass, 26 Oct 2026 (user feedback)
- No outlined lettering anywhere (prog-code solid cream, dg-n plain, iac monogram removed).
- Rankings: J.rankLedger (standings list + featured QS result; rows slide in, rules draw, figures count). J.rankGrid is an alias.
- Home brief: J.inkReveal (scroll-scrubbed word ink, completes before the next section).
- Programme strip (Home + Programmes): pinned and moved sideways by the scroll on >=1000px wide and >=700px tall (same motion as About milestones), progress line + count, cards come into focus; swipe rail on small screens. Entrance clears its transforms so hover zoom works; underline on name and "Explore programme".
- Removed eyebrows/kickers and 01/02 section numbers on programme pages (craft floor); no thick side borders.
- About Act line fills on scroll and documents light up; degree photos wipe in; programme hero code/photo part on scroll.
- serve.py sends Cache-Control: no-cache; cdp.mjs uses a fresh profile per launch.
