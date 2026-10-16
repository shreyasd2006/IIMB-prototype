---
name: IIM Bangalore: The Architectural Institution
description: Stone and light. Doshi's campus as a ruled editorial system, with IIMB red as the light.
colors:
  iimb-red: "#B12322"
  iimb-red-deep: "#8F1A19"
  red-wash: "#F3E4E0"
  olive: "#777B50"
  olive-ink: "#5B5F3A"
  bronze: "#B18A58"
  bronze-ink: "#82602F"
  ink: "#191919"
  ink-2: "#2A2927"
  soft-white: "#F6F5F1"
  paper-2: "#EEECE6"
  granite: "#DAD6CC"
  stone-400: "#A39E93"
  stone-600: "#6B675F"
  stone-700: "#4F4C46"
  night-stone: "#191919"
  night-text: "#EDEAE3"
  night-muted: "#ADA89D"
  granite-stone-700: "#3E3B36"
  granite-bronze-ink: "#6A4D22"
  granite-olive-ink: "#4A4D2E"
  rule: "rgba(25, 25, 25, .16)"
  rule-granite: "rgba(25, 25, 25, .2)"
  rule-night: "rgba(237, 234, 227, .22)"
typography:
  display:
    fontFamily: "Martel, Noto Serif, Georgia, serif"
    fontSize: "clamp(44px, 6.6vw, 96px)"
    fontWeight: 200
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Martel, Noto Serif, Georgia, serif"
    fontSize: "clamp(40px, 5.4vw, 84px)"
    fontWeight: 200
    lineHeight: 1.06
    letterSpacing: "-0.03em"
  headline-2:
    fontFamily: "Martel, Noto Serif, Georgia, serif"
    fontSize: "clamp(30px, 3.4vw, 52px)"
    fontWeight: 300
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Martel, Noto Serif, Georgia, serif"
    fontSize: "clamp(22px, 1.9vw, 30px)"
    fontWeight: 300
    lineHeight: 1.22
    letterSpacing: "-0.02em"
  title-sm:
    fontFamily: "Martel, Noto Serif, Georgia, serif"
    fontSize: "20px"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  numeral:
    fontFamily: "Martel, Noto Serif, Georgia, serif"
    fontSize: "clamp(40px, 4.2vw, 64px)"
    fontWeight: 200
    lineHeight: 1
    letterSpacing: "-0.04em"
    fontFeature: "lnum, tnum"
  lede:
    fontFamily: "Anek Latin, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(19px, 1.55vw, 23px)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Anek Latin, Segoe UI, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
    fontVariation: "'wdth' 100"
  ui:
    fontFamily: "Anek Latin, Segoe UI, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 560
    lineHeight: 1
    letterSpacing: "0.02em"
    fontVariation: "'wdth' 92"
  label:
    fontFamily: "Anek Latin, Segoe UI, system-ui, sans-serif"
    fontSize: "12.5px"
    fontWeight: 560
    lineHeight: 1.3
    letterSpacing: "0.09em"
    fontVariation: "'wdth' 87.5"
rounded:
  none: "0px"
spacing:
  s1: "4px"
  s2: "8px"
  s3: "12px"
  s4: "16px"
  s5: "24px"
  s6: "32px"
  s7: "48px"
  s8: "64px"
  s9: "96px"
  s10: "144px"
  gutter: "clamp(16px, 4.2vw, 64px)"
  section: "clamp(64px, 9vw, 144px)"
components:
  button-primary:
    backgroundColor: "{colors.iimb-red}"
    textColor: "#FFFFFF"
    typography: "{typography.ui}"
    rounded: "{rounded.none}"
    padding: "0 22px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.iimb-red-deep}"
    textColor: "#FFFFFF"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.ui}"
    rounded: "{rounded.none}"
    padding: "0 22px"
    height: "48px"
  button-ghost-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.soft-white}"
  button-on-red:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.iimb-red}"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 14px"
    height: "36px"
  chip-on:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.soft-white}"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.olive-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "6px 8px"
  field:
    backgroundColor: "{colors.soft-white}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0 14px"
    height: "48px"
  nav-link-active:
    textColor: "{colors.iimb-red}"
    typography: "{typography.ui}"
  monogram:
    backgroundColor: "{colors.granite}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    size: "56px"
---

# Design System: IIM Bangalore: The Architectural Institution

## Overview

**Creative North Star: "Stone and Light"**

The site is built the way Doshi built the campus: soft white stone, cut granite and night stone, divided by fine rules, with light falling through pergola bars. IIMB red is that light. It is never a paint colour for the building; it appears where the visitor acts, where they are, and where the keyboard focus is. The rest of the palette stays mineral: olive for the courtyard greenery, which marks categories, and bronze for sunlit stone, which carries numerals and the quiet rules of active states.

Density is editorial and asymmetric. Headings sit in the left columns of a 12-column grid, and short briefs answer them on the right. Lists are ruled ledgers, not card stacks. Negative space works as the courtyard between blocks. Martel at its lightest weights (200 and 300) gives the voice a carved, quiet authority. Anek Latin, a variable-width face, handles every working surface and narrows its width axis as the text gets smaller and more functional.

Depth comes from changes of ground (soft white to granite to night stone), not from elevation. Motion has one signature, the pergola reveal, and everything else is a short colour or rule transition on a single long-tailed ease.

**Key Characteristics:**
- Soft white ground, granite cut bands, night stone bands for film, architecture and the footer.
- IIMB red only as light: primary actions, active navigation, focus, hover and the one drenched band on Industry.
- Square corners everywhere, 1px rules, no shadows, no side stripes.
- Martel 200/300 display with Devanagari, and Anek Latin UI on its width axis.
- Pergola reveal on images, and a hero frame that opens from inset to full-bleed on scroll.

## Colors

The palette is a building in daylight: three grounds of stone, two mineral accents, and one red light.

### Primary
- **IIMB Red** (iimb-red): the light. Used for primary buttons, the active nav link and its underline, focus outlines (2px, offset 3px), hover colour on titles and links, text selection, the caret, and the single full red band on Industry. It is 6.3:1 on soft white.
- **Deep Red** (iimb-red-deep): the hover state of primary buttons and in-prose links, and the select fill inside the red band.
- **Red Wash** (red-wash): only as the highlight behind matched search terms.

### Secondary
- **Courtyard Olive** (olive) and **Olive Ink** (olive-ink): categories and tags. Olive Ink is the text value, at 6.1:1 on soft white. It is used for outlined tags, news categories, faculty area cells and centre kinds. Tags sit after or beside the headline, never above it.

### Tertiary
- **Sunlit Bronze** (bronze) and **Bronze Ink** (bronze-ink): numerals and quiet rules. Bronze Ink sets timeline years, event dates, legend values, step counters, research counts and working-paper numbers. Bronze itself draws the hairline under the legend, the timeline rules (at 50% alpha), the 1px bottom rule of an active index row, the dashed outline of content placeholders, and campus figures on night stone.

### Neutral
- **Ink** (ink): body text, strong rules (`rule-strong`), filled chips and ghost-button hover fills.
- **Ink 2** (ink-2): long-form story body text.
- **Soft White** (soft-white): the page ground and field fill.
- **Paper 2** (paper-2): the directory row hover and the scrollbar track.
- **Cut Granite** (granite): cut bands (`on-paper2`, the class name is historical), image wells behind pergola reveals, and monograms.
- **Stone 400 / 600 / 700**: the scrollbar thumb and inactive arrows; meta text and labels (5.3:1); and secondary prose and briefs (7.9:1).
- **Night Stone** (night-stone), **Night Text** and **Night Muted**: the film, architecture and footer bands. Night Muted holds 7.6:1 on night stone.
- **Rules**: `rule` (16% ink) separates rows; `rule-night` does the same on night stone.

### Named Rules
**The Light Rule.** Red is light, not paint. If an element is neither an action, a current location, focus, hover, nor the Industry band, it is not red.

**The Mineral Numeral Rule.** Numerals belong to bronze. Years, dates, values, counts and steps are set in Bronze Ink, never red.

**The Deepened Granite Rule.** On a granite band, the text tokens deepen locally (stone-600 to `#4F4C46`, stone-700 to granite-stone-700, bronze-ink to granite-bronze-ink, olive-ink to granite-olive-ink, rule to rule-granite) so that contrast holds. Fields inside granite bands keep a soft white fill.

## Typography

**Display Font:** Martel (with Noto Serif, Georgia), self-hosted at 200, 300 and 400, with Devanagari subsets at 300 and 400.
**Body Font:** Anek Latin (with Segoe UI, system-ui), a self-hosted variable font with weight 100–800 and width 75–125%.

**Character:** Martel at 200 is thin and carved, like lettering cut into stone. Anek Latin is the working signage of the building. It sets the body at 100% width, buttons at 92%, nav links at 90%, and labels at 87.5%.

### Hierarchy
- **Display** (Martel 200, clamp(44px, 6.6vw, 96px), 1.04, -0.035em): the home hero headline only, held to about 13ch.
- **Headline** (Martel 200, clamp(40px, 5.4vw, 84px), 1.06): page H1s in the page head, on the left 8 columns.
- **Headline 2** (Martel 300, clamp(30px, 3.4vw, 52px), 1.12): section heads. Pull statements drop it to 200.
- **Title** (Martel 300, clamp(22px, 1.9vw, 30px), 1.22): sub-sections, index-row names, tabs and the search input.
- **Title Small** (Martel 400, 20px, 1.3): small headings, person names and board names.
- **Row titles** (Martel 300, 17–21px, 1.32): titles in ledgers, story lists and events.
- **Numeral** (Martel 200, lining and tabular figures, in Bronze Ink): timeline years (up to 64px), event dates (34px), legend values (28px) and step counters (30px).
- **Lede** (Anek 400, clamp(19px, 1.55vw, 23px), 1.5, stone-700): page decks and section briefs, up to 40–62ch.
- **Body** (Anek 400, 17px, 1.6): running text. Prose sets at 18px/1.65 with a 58ch measure, and story body at 18.5px/1.7.
- **UI** (Anek 560, 15px, width 92%, 0.02em): buttons, links, finder actions and nav (520 weight at 90% width).
- **Label** (Anek 560, 12.5px, width 87.5%, 0.09em, uppercase, stone-600): form field labels, table headers, footer column heads, definition terms and search-result group heads.

### Named Rules
**The No-Kicker Rule.** Nothing sits above a heading. Categories, tags and dates follow the headline (`meta-line after`), and a section head pairs the heading with a brief on its right instead of a label above it.

**The Width-Axis Rule.** The smaller and more functional the text, the narrower Anek runs. Don't fake hierarchy with letter-spacing alone.

**The Motto Rule.** Devanagari is set in Martel 300 at letter-spacing 0, and never in a fallback face.

## Layout

The page uses a 12-column grid (column gap clamp(16px, 2.2vw, 32px)) inside a 1440px container with a fluid gutter. Sections breathe at clamp(64px, 9vw, 144px) vertically. Compositions are asymmetric splits: 7/4 for section heads, 8/4 for the hero copy and page heads, 4/8 for sticky side rails, 5/7 for the courtyard index (a sticky image beside a ruled list), and 7/5 for the architecture plate and bands. The spacing scale runs from 4px to 144px (s1–s10), and rows mostly pad at 14–28px.

At 1180px, the secondary nav items drop. At 980px, the nav collapses into a full-width sheet that opens with a clip-path. At 900px, every split stacks, the doors go from six columns to three (and two at 520px), and the courtyard image hides, except on Campus facilities. The header is sticky at 76px with a 94% soft-white backdrop blur.

## Elevation & Depth

The system is flat. There are no drop shadows anywhere. When the header scrolls, its bottom rule changes from `rule` to solid ink rather than casting a shadow. Depth is conveyed by changes of ground, from soft white to cut granite to night stone, with the single red band on Industry. Overlays (the search sheet and the mobile nav) cover the page with a 55% ink scrim, or slide over it on a solid rule.

### Named Rules
**The Ground-Change Rule.** To separate a region, change the stone (granite or night), never lift it. A band is full-bleed, and the next band is a different ground.

## Shapes

Every corner is square (0px): buttons, fields, chips, tags, monograms, images and video. Form comes from 1px rules: `rule` between rows, solid ink (`rule-strong`) at the top of every list, table and toolbar, and `rule-night` on night stone. Hover and current-state lines are horizontal light: a 2px red underline growing from the left on nav links, a 3px red top bar on the home doors, a 2px red bottom bar on centres, and a 3px red underline on the selected tab. The pergola motif (vertical bars at a 9% pitch) appears only as the reveal mask, not as a decorative fill.

## Components

### Buttons
Confident and square, like lit openings in a stone wall.
- **Shape:** square (0px), 48px minimum height, 22px horizontal padding, 12px gap to a 16px SVG arrow.
- **Primary:** IIMB Red fill, white text, 1px red border. Hover changes to Deep Red, and the arrow moves 4px right.
- **Ghost:** transparent with a currentColor border. Hover fills with ink and soft white text, or inverts to soft white on night stone and over the hero.
- **On red:** white fill with red text. Hover changes to an ink fill.
- **Text link:** UI type with a 1px currentColor underline as a bottom border. Hover turns red (on night or red grounds, the underline drops instead).
- **Focus:** a 2px red outline at a 3px offset, or white on night and red grounds.

### Chips
- **Style:** a 36px square outline in `rule`, with Anek 520 at 14px and 92% width, and counts in stone-600 tabular figures.
- **State:** hover darkens the border to ink. Pressed or on fills with ink, soft white text and night-muted counts.

### Tags
- **Style:** outlined labels (Anek 560, 12px, 87.5% width, 0.08em, uppercase) in Olive Ink with a currentColor 1px border, and 6px 8px padding. They sit to the right of, or below, the title they classify.

### Cards / Containers
The system avoids cards. Parallel items are rows in a ruled ledger (index rows, entries, events, directory rows, centre rows), opened with a solid ink top rule and separated by `rule`. Rows carry no fill, no radius and no shadow. Hover changes the title to red, and the directory row also takes a paper-2 fill. An active index row turns its name red and its bottom rule bronze.

### Inputs / Fields
- **Style:** a 48px square box, a 1px `rule` border and a soft white fill. Selects use a custom 12px chevron.
- **Hover / Focus:** hover changes the border to stone-600. Focus changes the border to ink and adds a 2px red outline at 0 offset.
- **Search and finder:** Martel 300 at large sizes (22–44px) on a 2px ink bottom rule, or a 1px ink box, with focus-within drawing the red outline.
- **On red (enquiry):** 52px fields with a 55% white border and white text. Focus draws a 2px white outline, and invalid fields take a 2px white border.

### Navigation
The nav uses Anek 520 at 15px and 90% width. Hover and the current page grow a 2px red underline from the left, and the current page is also red. Below 980px, the nav becomes a full-width sheet in 20px rows on ruled dividers, with 44px square icon buttons for menu and search. Breadcrumbs are 14px stone-600 with slash separators.

### Monogram
Faculty portraits are intentionally excluded for consent reasons. People appear as 56px square granite tiles with Martel 300 initials (48px on mobile, and 132px with 44px initials on profiles).

### Pergola Reveal (signature)
Images (and ambient video) entering the view are masked by vertical bars at a 9% pitch, intersected with a left-to-right sweep. The sweep crosses first, then the bars widen to fill, over 1.35s on the system ease, while the image settles from scale 1.045 over 1.6s. Images already on screen at load are never hidden. Reduced motion, a missing IntersectionObserver or no mask-composite support show the image at once. The well behind each image is granite.

### Hero Frame
The official campus film runs inside an inset frame (the page gutter). As the page scrolls through the first 55% of the viewport, the frame opens to full-bleed and the video scale eases from 1.06 to 1. A bottom-weighted ink gradient holds text contrast. A square pause control (40px, translucent ink, white hairline) sits lower-right. The film, and every ambient video, pauses when less than 25% visible. Hero copy rises in with a short blur-to-sharp stagger, which becomes a plain fade under reduced motion.

## Do's and Don'ts

### Do:
- **Do** keep IIMB red to actions, the current location, focus, hover and the one red band on Industry.
- **Do** set every numeral (year, date, value, count, step) in Martel with lining figures in Bronze Ink.
- **Do** set categories and tags in Olive Ink, after or beside the headline.
- **Do** separate regions by changing ground: soft white, granite (with deepened text tokens) or night stone.
- **Do** open every list, table and toolbar with a solid ink 1px rule and separate rows with the 16% rule.
- **Do** mark active states with colour plus a 1px bronze rule.
- **Do** bring new photographs in through the pergola reveal, with its reduced-motion path.
- **Do** use initials monograms for people. Never use portraits without consent.
- **Do** use the one ease, `cubic-bezier(.16, 1, .3, 1)`, for state transitions of 0.2–0.45s.

### Don't:
- **Don't** put a kicker, eyebrow or uppercase label above any heading.
- **Don't** use shadows of any kind for elevation, or for the scrolled header.
- **Don't** mark state with a vertical side stripe or a coloured left border on rows, lists or cards.
- **Don't** round a corner.
- **Don't** set numerals in red.
- **Don't** use red as a background except for the primary button and the single Industry band.
- **Don't** set display, headline or numeral sizes above Martel 300, or render the Devanagari motto in a fallback face.
- **Don't** compose with stacks of equal cards. Use ruled ledgers and asymmetric splits.
