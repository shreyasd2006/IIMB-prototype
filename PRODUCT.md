# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML, CSS and vanilla JavaScript, one HTML file per section, with no build step. Content lives in `data/*.js` files (plain `<script>` globals), so the site runs from `file://` or any static server. The user chose this on 16 Oct 2026: a new folder (`D:\iimb-architectural`), multi-page.

## Users

The audience is institutional and broad (the user confirmed this as the tie-breaker on 16 Oct 2026). The site serves prospective students, researchers and doctoral applicants, faculty-finders such as journalists and collaborators, industry and executive-education buyers, alumni, and visitors who want the institution's story. Architecture and the institution's reputation lead. No single funnel dominates.

## Product Purpose

This is a complete concept website for IIM Bangalore under the approved concept **"The Architectural Institution"**. It is built on the user's base file `IIMB_Architectural_Institution (1).html`. It must be a working site, not a mockup, with:

- real navigation;
- functional search and filters;
- a faculty directory with profile pages;
- centre, programme and news detail pages;
- an industry partnership route.

All of it runs on verified institutional content.

## Positioning

IIMB is an Institute of National Importance (under the IIM Act 2017) that teaches and researches inside B.V. Doshi's stone campus, completed in 1983 and modelled on Fatehpur Sikri. Its own architecture text says that "light plays a crucial role", from the sun symbol in the logo to the pergolas. No other school can claim that pairing of a place and an idea.

## Operating Context

- Visitors arrive from search, rankings news, or the official site. They are often on mobile.
- Facts shift often (rankings, events, board). Every fact carries a source URL and a check date (16 Oct 2026).
- The site is a concept prototype. It is not the official IIMB website, and it says so.

## Capabilities and Constraints

- Global site search and per-page filters work client-side over the data files.
- The homepage plays the official campus film, which pauses when scrolled out of view, and offers official YouTube films as click-to-load embeds.
- Data was fetched from iimb.ac.in and its official subdomains on 16 Oct 2026, under `research/`.
- Do not invent quotations, statistics, people, rankings or achievements. Show a gap as a visible placeholder, or leave it out.

## Brand Commitments

- The IIMB sun symbol (NID Ahmedabad, in use since 1994) and its logo lockup are reproduced unaltered from iimb.ac.in. The motto तेजस्वि नावधीतमस्तु, "let our study be enlightening", comes from the official About page.
- IIMB red **#B12322** is verified: iimb.ac.in uses it as its accent, and the logo carries it.
- The approved concept palette (black #191919, soft white #F6F5F1, olive #777B50, muted bronze #B18A58, stone greys) complements the red as architectural tones. This was pinned by the user's brief.

## Evidence on Hand

- Official pages (text) are under `research/pages/`. The faculty directory and 109 profiles are in `research/faculty/`. Working papers and journal articles are in `research/pubs/`.
- Official media:
  - campus films `IIMB-campus-video-2.mp4` and `Library-5.mp4` from iimb.ac.in;
  - YouTube films from the official channel (UCZAWa1UvCXDqD9pBPDAqQ0Q);
  - campus, event and archive photographs from iimb.ac.in and iimb.ac.in/archives;
  - six Wikimedia Commons campus photographs with CC licences, carried over from `D:\iimb-prototype`.
- Not available:
  - a vector logo master and brand guidelines;
  - rights clearance for official photographs (they are used here for a concept and credited to their source pages);
  - faculty consent to reproduce portraits (the directory uses no portraits);
  - full-resolution originals of archive photographs.

## Product Principles

1. Place before claim. The campus, its light and its people lead. Rankings support them.
2. Every fact is sourced and dated, or it does not appear.
3. Restraint and precision over decoration. The architecture is the ornament.
4. One institution, many doors. Each audience finds its route within two steps.
5. Honest prototype. Mark the site as a concept, and credit every image.

## Accessibility & Inclusion

The site meets WCAG 2.1 AA:

- keyboard access and visible focus;
- a reduced-motion path;
- 4.5:1 text contrast;
- meaningful alt text;
- captions or controls on all video, and no autoplaying sound;
- a single H1 per page.

Devanagari renders correctly where the motto appears.
