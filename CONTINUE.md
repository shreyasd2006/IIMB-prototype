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
