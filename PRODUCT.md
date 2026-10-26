# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML, CSS and JavaScript, one HTML file per section, no build step. GSAP (with ScrollTrigger) and Lenis smooth scroll loaded from a pinned CDN version, chosen by the user on 18 Oct 2026 because motion is a major requirement. Content lives in `data/*.js` (plain `<script>` globals). Lives in its own folder, `D:\iimb-journal`, separate from the sibling concepts `D:\iimb-architectural` (port 8765) and `D:\iimb-observatory` (port 8766); this one serves on port 8767.

## Users

Broad institutional audience: prospective students (undergraduate, MBA, executive, doctoral), current students, faculty and researchers, journalists looking for experts, alumni, recruiters and industry partners. Every audience must reach its route within two steps from any page.

## Product Purpose

A third concept website for IIM Bangalore, **"The Global Leadership Journal"**: a complete, runnable, multi-page institutional site art-directed like an international business and leadership journal. It must work: navigation, search, filters, programme discovery, faculty directory and profiles, research themes, centres, news and events.

Scope (user, 18 Oct 2026): a prototype built on real data. It does not reproduce every page of iimb.ac.in; extremely unnecessary pages are dropped, the important institutional journeys stay. The Centre for Software and IT Management (CSITM) must be included.

## Positioning

IIMB is an Institute of National Importance (IIM Act 2017), founded 1973 in Bengaluru: 11 academic areas, centres of excellence, programmes from a new undergraduate school (2026) to the PhD, the NSRCEL incubator and a published research output. The Journal concept treats the institution as a publisher of ideas about leadership, management and public policy, with its people, programmes and research as the stories.

## Operating Context

- Visitors arrive from search, rankings news, or the official site, often on mobile.
- Facts shift (rankings, events, board). Content reused from the sibling project was fetched from iimb.ac.in on 16 Oct 2026; every fact carries a source.
- The site is a concept prototype, not the official IIMB website, and says so.

## Capabilities and Constraints

- Client-side search and filters over the data files.
- Official IIMB films play muted and continuously (no controls, user decision 24 Oct 2026) with a poster; they pause off-screen to save power.
- Official YouTube films load only on click.
- Faculty portraits: the official portraits IIMB publishes on its faculty area pages may be shown, credited to iimb.ac.in, with a typographic fallback (assumed from the brief's "use verified portraits when available"; the user did not choose on 18 Oct 2026).
- Do not invent quotations, statistics, people, rankings, testimonials, placement outcomes, partnership programmes or achievements. Gaps show as clearly labelled placeholders.

## Brand Commitments

Revised by the user on 24 Oct 2026 (meeting minutes "IIMB Website Redesigning" + IIMB Color Guide). These replace the earlier Journal palette.

- **Colours:** three primary colours from the IIMB Color Guide: red **#A92D2D**, maroon **#631111**, cream **#E8E3DB**. Neutrals: white, black #000000 and greys #E5E5E5, #C2C2C2, #F2F2F2, #F9F9F9; link blue #1177BB. Pages alternate white and cream section by section.
- **Type (IIMB minutes, 26 Oct 2026):** serif headings in Playfair Display, sans-serif body and descriptions in Inter, as in the reference design; Noto Serif Devanagari and Anek Devanagari for Hindi. Lining figures everywhere.
- **Logos:** official files supplied by IIMB (Fw__IIMB_prototypes.zip): the header uses the exact official logo; white logos on dark backgrounds.
- **Header:** two tiers (utility row with Hindi toggle and Admissions; main row with the official logo and navigation, About first).
- **Footer:** same sections as the original iimb.ac.in footer (Useful Links, Policies, Publications, Contact us, Disclaimer / Site Map / Terms of Use) plus social links (Facebook, X, LinkedIn, YouTube, Instagram, WhatsApp).
- **Rankings** appear on the homepage, from the original website.
- **Video:** films play continuously, muted, with no pause/resume controls.
- **Hindi:** a language switch translates the whole site into Hindi (translations written for this prototype, not official).
- **Programmes page** follows the layout and effects of the second design (D:\iimb-site-v2).
- **Photos** shown in natural colour, no colour tint or colour change on hover.
- Sun-symbol logo (NID Ahmedabad, 1994) unaltered. Motto तेजस्वि नावधीतमस्तु, "let our study be enlightening".

## Evidence on Hand

- `data/institute.js`: institutional content with sources (about, leadership, board, programmes, centres including CSITM, themes, films, campus, industry).
- `data/faculty.js` (109 profiles from the area-wise directory), `data/publications.js`, `data/news.js` (31 stories), `data/events.js` (12), `data/photos.js`.
- Official media: `assets/video/iimb-campus.mp4`, `assets/video/iimb-library.mp4`; official YouTube films with titles verified by oEmbed (17 Oct 2026), including two student testimonials (TCtOEbBVcWY, pFaVf5QBjgo) and the inaugural UG cohort film (aVNDCSc0g-4).
- Official photographs with credits (`assets/img/credits.json`), including verified archive images of the founding years.
- Raw source pages: `D:\iimb-architectural\research\`. Benchmark research: `research/bench/`.
- IIMB Color Guide (D:\Color Guide.pdf), official logo set (research/incoming/), five UG-school student photographs (research/incoming/UG-1..5.jpg), both supplied by the user on 24 Oct 2026.
- Not available: photo rights clearance, first-person student interviews beyond the films above, placement statistics from a current verified report.

## Product Principles

1. The institution publishes ideas: people, research and programmes are the stories; the campus is the setting.
2. Every fact is sourced, or it does not appear; placeholders say they are placeholders.
3. Motion carries the editorial voice and explains state, never spectacle for its own sake.
4. One institution, many doors: each audience reaches its route within two steps.
5. Honest prototype: marked as a concept, every image credited.

## Accessibility & Inclusion

WCAG 2.1 AA: keyboard access and visible focus, a designed reduced-motion path (no smooth-scroll hijack when reduced motion is requested), 4.5:1 text contrast, meaningful alt text, pause controls on moving media, no autoplaying sound, one H1 per page, correct Devanagari rendering.
