---
name: Open Corridor
description: IIMB concept prototype. Stone, shade and one red light, walked as bands and thresholds on a 12-bay colonnade grid.
colors:
  shade: "#1C1A17"
  shade-2: "#262320"
  shade-3: "#312D29"
  shade-line: "rgba(238, 234, 226, 0.11)"
  on-shade: "#EEEAE2"
  on-shade-2: "#B9B1A4"
  ground: "#E0DFDB"
  stone: "#F4F3F1"
  stone-2: "#EBE9E5"
  ink: "#1F1C18"
  ink-2: "#5A5349"
  rule: "#C6C7C1"
  rule-strong: "#9D9588"
  sun: "#B12322"
  sun-deep: "#94191A"
  noon: "#EC6A61"
  noon-ink: "#B12322"
  noon-wash: "rgba(177, 35, 34, 0.08)"
  on-sun: "#FFFFFF"
  amber: "#F2A900"
  amber-ink: "#7D5200"
  amber-wash: "rgba(242, 169, 0, 0.16)"
  indigo: "#3346A8"
  laterite: "#A3472A"
  leaf: "#3F6B3A"
  error: "#9B2C13"
typography:
  display-lead:
    fontFamily: "Anek Latin, Anek Devanagari, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 1rem + 4.3vw, 5.4rem)"
    fontWeight: 640
    lineHeight: 0.96
    letterSpacing: "-0.02em"
    fontVariation: "\"wdth\" 78"
  display:
    fontFamily: "Anek Latin, Anek Devanagari, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2.3rem, 1rem + 3.5vw, 4.4rem)"
    fontWeight: 650
    lineHeight: 0.98
    letterSpacing: "-0.012em"
    fontVariation: "\"wdth\" 76"
  headline:
    fontFamily: "Anek Latin, Anek Devanagari, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 1.35rem + 2.9vw, 4rem)"
    fontWeight: 650
    lineHeight: 1.04
    letterSpacing: "-0.012em"
    fontVariation: "\"wdth\" 78"
  title:
    fontFamily: "Anek Latin, Anek Devanagari, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.65rem, 1.25rem + 1.5vw, 2.6rem)"
    fontWeight: 650
    lineHeight: 1.04
    letterSpacing: "-0.012em"
    fontVariation: "\"wdth\" 84"
  title-sm:
    fontFamily: "Anek Latin, Anek Devanagari, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.2rem, 1.1rem + 0.4vw, 1.45rem)"
    fontWeight: 650
    lineHeight: 1.15
    fontVariation: "\"wdth\" 84"
  item:
    fontFamily: "Anek Latin, Anek Devanagari, Segoe UI, system-ui, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 650
    lineHeight: 1.04
    fontVariation: "\"wdth\" 84"
  box-head:
    fontFamily: "Anek Latin, Anek Devanagari, Segoe UI, system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 600
    lineHeight: 1.04
  figure:
    fontFamily: "Anek Latin, Anek Devanagari, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.6rem + 1.4vw, 3rem)"
    fontWeight: 640
    lineHeight: 1
    fontFeature: "\"tnum\""
    fontVariation: "\"wdth\" 78"
  lede:
    fontFamily: "Anek Latin, Anek Devanagari, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.08rem, 1rem + 0.35vw, 1.3rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Anek Latin, Anek Devanagari, Segoe UI, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  reading:
    fontFamily: "Martel, Georgia, Times New Roman, serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.78
  quote:
    fontFamily: "Martel, Georgia, Times New Roman, serif"
    fontSize: "clamp(1.25rem, 1.05rem + 0.8vw, 1.7rem)"
    fontWeight: 400
    lineHeight: 1.45
  small:
    fontFamily: "Anek Latin, Anek Devanagari, Segoe UI, system-ui, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
  label:
    fontFamily: "Anek Latin, Anek Devanagari, Segoe UI, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    letterSpacing: "0.01em"
rounded:
  none: "0"
  focus: "2px"
  bar-end: "4px"
  circle: "50%"
spacing:
  gap: "clamp(12px, 1.8vw, 28px)"
  gutter: "clamp(16px, 4vw, 56px)"
  band-y: "clamp(56px, 8vw, 120px)"
  band-tight: "clamp(40px, 5vw, 72px)"
  wrap: "1440px"
components:
  button-primary:
    backgroundColor: "{colors.sun}"
    textColor: "{colors.on-sun}"
    rounded: "{rounded.none}"
    padding: "14px 20px"
  button-primary-hover:
    backgroundColor: "{colors.sun-deep}"
    textColor: "{colors.on-sun}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stone}"
    rounded: "{rounded.none}"
    padding: "14px 20px"
  button-ink-hover:
    backgroundColor: "{colors.shade}"
    textColor: "{colors.stone}"
  button-outline:
    backgroundColor: "transparent"
    rounded: "{rounded.none}"
    padding: "14px 20px"
  masthead-logo:
    height: "54px"
  masthead-logo-compact:
    height: "38px"
  masthead-logo-phone:
    height: "34px"
  footer-logo:
    height: "52px"
  proto-strip:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.shade}"
    typography: "{typography.label}"
  pending:
    backgroundColor: "{colors.amber-wash}"
    textColor: "{colors.amber-ink}"
    rounded: "{rounded.none}"
    padding: "1px 6px"
  pending-on-shade:
    backgroundColor: "rgba(242, 169, 0, 0.08)"
    textColor: "{colors.amber}"
  source-line:
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
  source-line-on-shade:
    textColor: "{colors.on-shade-2}"
    typography: "{typography.label}"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "2px 8px"
  tag-live:
    backgroundColor: "{colors.noon-wash}"
    textColor: "{colors.noon-ink}"
  chip:
    backgroundColor: "{colors.stone}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "2px 8px"
  chip-media:
    backgroundColor: "{colors.noon-wash}"
    textColor: "{colors.noon-ink}"
  field:
    backgroundColor: "{colors.stone}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "11px 12px"
    height: "46px"
  segment-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stone}"
  stage:
    backgroundColor: "transparent"
    textColor: "{colors.on-shade}"
    padding: "18px 16px 20px"
    height: "96px"
  stage-hover:
    backgroundColor: "{colors.shade-2}"
  stage-active:
    backgroundColor: "{colors.shade-3}"
  bar-fill:
    backgroundColor: "{colors.ink-2}"
    rounded: "{rounded.bar-end}"
    height: "14px"
  bar-fill-active:
    backgroundColor: "{colors.noon-ink}"
  bar-fill-on-shade:
    backgroundColor: "{colors.on-shade-2}"
  bar-fill-on-shade-active:
    backgroundColor: "{colors.noon}"
  tooltip:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stone}"
    padding: "6px 9px"
  compare-fit-cell:
    backgroundColor: "{colors.noon-wash}"
  jumpbar:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stone}"
    padding: "15px 12px 13px"
  notice:
    backgroundColor: "{colors.stone-2}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.none}"
    padding: "14px 16px"
  centre-lockup:
    backgroundColor: "{colors.indigo}"
    textColor: "{colors.on-sun}"
    padding: "8px 12px"
---

# Design System: Open Corridor

## Overview

**Creative North Star: "The Open Corridor"**

The site is walked like B.V. Doshi's 1983 stone campus: long horizontal bands of stone, broken by thresholds of deep corridor shade, with one light, the red of IIMB's sun symbol, falling on whatever is named, current or chosen. Every page is a vertical sequence of full-bleed bands. Shade bands carry the chrome (masthead, page heads, footer) and the story moments (the institution-first lead, research themes, proof, rankings). Courtyard bands of granite-dust ground and lighter reading stone carry facts and reading. The change of material between bands does the sectioning, so there are no cards and no floating containers. The official IIMB logo, reversed for shade, sets the masthead and the footer.

Inside each band a 12-bay colonnade grid governs placement. On inner-page shade heads it shows itself as a short strip of hairline pergola beams. Section heads are thresholds: a hairline across the full width with one bay's width of light laid over its left end. Type is stone-cut: Anek Latin at condensed widths for display and interface, Martel for long reading. Density is high but ordered. Facts sit in hairline-ruled registers with visible source lines, and unknown values appear as dashed amber placeholders instead of being hidden.

Motion has one authored moment and otherwise only answers the visitor. Once per session the lead photograph opens through six colonnade shutters, the fact ticks draw, and a pulse of light travels along the six career-stage bays. Everything else is feedback or continuity, and everything runs from an already-visible default. The world rejects the default institutional homepage (a ranking banner over a carousel above a grid of same-size cards), decorative gradients, shadows as depth, and rounded containers.

**Key Characteristics:**
- Full-bleed bands of shade, ground and stone; a change of material marks every section.
- One accent, the IIMB sun red, used only as light: the primary action, state, focus and rules of light. It is lifted to a lighter red on shade.
- Amber exists only to mark the prototype: the banner and unconfirmed-fact placeholders.
- The official IIMB lockup, reversed, at a locked aspect ratio in masthead and footer.
- A 12-bay colonnade grid, shown as pergola beams on inner-page shade heads.
- Condensed stone-cut display type (Anek) paired with a serif reading column (Martel).
- Hairline-ruled registers instead of cards; square corners throughout.
- One focal motion moment per session; all other motion is feedback or continuity.

## Colors

A warm, low-chroma stone-and-shade palette with one red light taken from the IIMB sun symbol, an amber reserved for prototype annotation, and a fixed set of three earth pigments for centre sub-identities.

### Primary
- **IIMB Sun Red** (sun, #B12322, sampled from the official logo): The fill of the primary action ("Find your programme", apply buttons, the search submit), the skip link and the text selection, always with white text (on-sun). One filled red action per view.
- **Sun Deep** (sun-deep): The hover state of red buttons. Nothing else.
- **Lifted Sun** (noon, #EC6A61): The red raised in lightness so it reads as light on shade (5.6:1 on shade). On shade, header, footer, jump bar and action bar it draws the threshold rule, the stage light rule, the nav and jump-bar current underline, the focus ring, link and text-link underlines, the lead-fact ticks, hovered theme titles and panel links, the utility Apply link, timeline years, and chart bars on hover or focus.
- **Sun Ink** (noon-ink): The brand red itself, used as light on stone and ground (6.0:1 on stone, 5.0:1 on ground). The default focus ring, threshold rules on light bands, text-link and story-hover underlines, the compare table's best-fit label, chart bars on hover or focus, live tags, media chips and the caret. It shares its value with sun on purpose; the separate name records the role.
- **Sun Wash** (noon-wash): An 8% red tint for the finder's best-fit cells, live tags, media chips and search highlights.

### Secondary (prototype annotation only)
- **Annotation Amber** (amber): The "Prototype, not the official IIMB website" strip, with shade text, and placeholder text and borders on shade.
- **Amber Ink** (amber-ink): Placeholder text and dashed borders on light bands.
- **Amber Wash** (amber-wash): The placeholder fill on light bands.

### Tertiary (centre sub-identities, fixed set)
- **Indigo** (indigo): The default centre accent (CDPG). It fills the centre lockup block and the 6px accent bar above a centre's page head.
- **Laterite** (laterite): The CPP centre accent, in the same two places.
- **Leaf** (leaf): The third member of the set. It also marks the top rule of a form's success message.

### Neutral
- **Corridor Shade** (shade): The ground of the masthead, page heads, shade bands and footer, and the browser theme colour.
- **Shade 2 / Shade 3** (shade-2, shade-3): Steps within shade. Shade 2 is the utility bar, open menu panels, the route drawer and stage hover. Shade 3 is the pressed career stage.
- **Shade Line** (shade-line): Hairlines and outlines on shade, including the pergola beams and the corridor bays.
- **Lit Stone / Worn Stone** (on-shade, on-shade-2): Primary and secondary text on shade. Worn stone is also the resting fill of chart bars on shade.
- **Granite Dust** (ground): The page ground and the default courtyard band.
- **Reading Stone** (stone): The lighter courtyard band, the key-facts block, input fills, chips, and answer and success panels.
- **Stone 2** (stone-2): The notice box fill.
- **Ink / Ink 2** (ink, ink-2): Primary and secondary text on light surfaces. Ink also fills the jump bar, mobile action bar, ink button, active segments and tooltips, and draws the 3px rules that cap registers. Ink 2 is the resting fill of chart bars on light bands.
- **Rule / Rule Strong** (rule, rule-strong): Hairline dividers, and the stronger outlines on tags, chips, fields and pager buttons.
- **On Sun** (on-sun): White, only as text on a red or centre-pigment fill.
- **Error Brick** (error): Validation text and the 2px border on invalid fields. It is a literal in the CSS, not yet a root custom property.

### Named Rules
**The One Light Rule.** The sun red is light, not colour. It appears only as the primary action, state, focus and rules of light. It is never a background panel, never decoration, and charts are not painted red at rest.

**The Light Changes With Its Ground Rule.** On shade the light is the lifted red (noon); on stone and ground it is the brand red (noon-ink). The lifted red fails as a line on light bands (2.8:1 on stone), and the brand red fails as a line on shade (2.6:1), so never swap them.

**The Amber Is Not Ours Rule.** Amber marks the prototype, never the institution: the prototype strip and the placeholder. Nothing that would survive into a live site may use it.

**The Fixed Pigments Rule.** Centre sub-identities use indigo, laterite or leaf, applied only to the centre lockup block and the 6px accent bar. A centre never gets a new hue and never repaints the bands.

## Typography

**Display Font:** Anek Latin, with Anek Devanagari for Hindi (fallback Segoe UI, system-ui). Self-hosted variable font, weight 100 to 800, width 75 to 125 percent.
**Body Font:** Anek Latin at normal width, for interface text.
**Reading Font:** Martel 400/700 (fallback Georgia), for article bodies, standfirsts, quotes and citations.

**Character:** Condensed, slightly heavy Anek reads as cut stone, set tight and in sentence case. Martel's sturdy Devanagari-born serif slows the reader down in the long column.

### Hierarchy
- **Display lead** (640, width 78%, clamp 2.5 to 5.4rem, line-height 0.96, -0.02em): The homepage H1 only, the institution's full name set in two lines across bays 1 to 7. It drops to a fixed 2.3rem at 420px and below.
- **Display** (650, width 76%, clamp 2.3 to 4.4rem, 0.98): Article heads, held to 16ch.
- **Headline** (650, width 78%, clamp 2.1 to 4rem, 1.04): Inner-page H1 in the shade page head.
- **Title** (650, width 78 to 84%, clamp 1.65 to 2.6rem): Threshold section heads, the research band title and its featured idea, the campus band, partner doors.
- **Title small** (650, width 84 to 86%, clamp 1.2 to 1.45rem, 1.15): Story headlines, in-section H3s, the research themes subhead.
- **Item** (650, 1.3rem): Fixed-size item and group heads: route cards, index groups, search result groups, empty and success states.
- **Box head** (600, width 100%, 1.05rem): Heads of chart, side and citation boxes, at normal width.
- **Figure** (640, width 76 to 80%, tabular figures, clamp 2 to 3rem): Proof numbers. Key-fact values, dates and years use the same weight and width at smaller sizes.
- **Lede** (400, clamp 1.08 to 1.3rem, 1.5): Section ledes and the homepage positioning line.
- **Body** (400, 1.0625rem, 1.55): Interface and listing text in Anek.
- **Reading** (Martel 400, 1.0625rem, 1.78, max 68ch): Article bodies. Quotes use Martel at the quote size, 1.45 leading.
- **Small** (0.9rem): Secondary copy, lead facts, key-fact footers, table cells.
- **Label** (600, 0.8125rem, 0.01em, sentence case): Meta lines, source lines, field labels, tags, captions, the prototype strip. Column heads in the menu panel and footer use the label size with up to 0.05em tracking, also in sentence case.

### Named Rules
**The Stone-Cut Rule.** Headings are Anek at condensed width (76 to 86 percent), weight 640 to 650, with tight leading. Hindi resets to 100 percent width and line-height 1.3.

**The Tabular Facts Rule.** Every number in a figure, table or chart uses tabular figures.

**The Sentence Case Rule.** No uppercase type anywhere. Small labels gain at most 0.05em tracking.

**The Named Steps Rule.** New text takes a step from the hierarchy above. Fixed sizes between 1.1 and 1.25rem and one-off figure sizes in the current CSS are drift, not steps (see Do's and Don'ts).

## Layout

The page is a stack of full-bleed bands (band-y vertical padding, band-tight for tight bands). Content sits in the 1440px wrap with the fluid gutter. Inside the wrap a 12-column bay grid with the fluid gap places everything. Common splits are 5 + 6 for threshold title and lede, 7 + 5 for lead copy and photograph, 8 + 4 for main and side, and 6 + 6 for lead story and story column.

The homepage lead is institution first: the name, a positioning line, three facts as a ruled list with a red tick each, one source line for all three, then the red primary action and an About text link, in bays 1 to 7. The corridor photograph fills bays 8 to 12 and, above 900px, bleeds to the band's top and right edges. The six-bay career-stage corridor runs full width beneath both.

Responsive behaviour: the primary nav collapses to a Menu button at 1320px, so the full-size logo never competes with the nav for width. Most bay splits stack to one column at 900px, some at 860px. On phones the corridor comes before the lead photograph, the lead keeps two facts (one at 420px and below), and the first two stages land in the first viewport at 360px. The corridor goes from 6 bays to 3 at 1000px and 2 at 520px. Pergola beams drop from 12 to 4 at 760px, where the sticky mobile action bar also appears.

Registers (events, outputs, schedules, results, people, index lists, rankings, lead facts) are rows divided by 1px rules. A 3px ink top rule caps a register on light bands as its heading.

## Elevation & Depth

The world is flat. Depth comes from material: shade against stone, and the shade-2 and shade-3 steps within shade. Lines separate, not shadows.

### Shadow Vocabulary
- **Menu panel** (`box-shadow: 0 24px 40px -18px rgba(0,0,0,.55)`): The only ambient shadow, under an open mega-menu panel on desktop. It is removed when the nav collapses at 1320px.

### Named Rules
**The Material, Not Shadow Rule.** Separate surfaces by changing band material or drawing a hairline. The menu panel's shadow is the single exception.

## Shapes

Square corners everywhere: buttons, fields, chips, tags, panels, images, the stage grid. Radius is reserved for three things: meta-line dots (50%), the rounded leading end of chart bars (0 4px 4px 0), and the 2px softening on focus outlines. Borders are 1px hairlines. Heavier 3px rules are structural: ink rules cap registers, and red rules carry light (thresholds, stage tops, nav and jump-bar underlines, the action bar's top edge). Placeholders and past-event tags use dashed borders to signal "not settled". The official logo is the one fixed silhouette: its 724:120 aspect ratio is locked and it never flexes or crops.

## Components

### Buttons
Square, firm, and red only for the primary action.
- **Shape:** Square (0), 1px border, padding 14px 20px, weight 600, gap 10px for the trailing arrow SVG, which nudges 3px right on hover.
- **Primary (red):** Sun fill and border with white text; hover deepens to sun-deep over 0.2s. One per view. In the homepage lead it comes before the text link.
- **Ink:** Ink fill with stone text, for actions on light bands. Hover goes to shade.
- **Outline:** Transparent with a currentColor border.
- **Text link:** Weight 600, 2px underline in the light for its ground (noon on shade, noon-ink on stone and ground), 3px on hover. Used beside a red button as the secondary action.
- **Focus:** 3px outline at 3px offset with a 2px radius: noon-ink on light bands, noon on shade, header, footer, jump bar, action bar and route drawer.

### Placeholders (facts register gaps)
A first-class component. An inline bracketed span, for example "[Fee for 2027-29: confirm with Admissions]": amber-wash fill, 1px dashed amber-ink border, amber-ink text at 0.92em, weight 500. On shade the text and border turn amber over an 8% wash. Placeholders are always visible and always name an owner.

### Source lines
A first-class component. A block line in label size and ink-2 (on-shade-2 on shade), 6px below its fact or chart: "Source: [linked title] · checked [date]". The homepage lead uses one combined line for its three facts, 10px below the list. External links carry the 12px external-link SVG and a hidden "(external site)" label. A page toggle can hide source lines; when shown again they fade and settle 4px into place over 0.25s.

### Chips and Tags
- **Tag:** 1px rule-strong outline, label size, transparent fill. Past events use a dashed border. Live events use the sun-wash fill with sun-ink border and text.
- **Chip:** Stone fill, rule-strong outline, label size. As a button, hover darkens the border to ink. Media-ready chips use the sun-wash treatment.

### Inputs / Fields
- **Style:** Stone fill, 1px rule-strong border, square, 11px 12px padding, minimum height 46px, 1rem text. Labels sit above in label style, ink-2.
- **Focus:** 3px outline at 0 offset, and the border turns ink.
- **Error:** 2px error-brick border with a label-size error line in weight 600.
- **Segmented control:** Stone buttons in one rule-strong outline. Pressed is ink fill with stone text.

### Navigation
- **Header:** Always shade. The amber prototype strip, then a shade-2 utility bar in label size (the Apply link in noon), then the masthead (minimum 76px) with the official logo, reversed, at 54px tall (38px at 560px and below, 34px at 420px and below). The logo keeps its 724:120 ratio and never shrinks with the flex row. The masthead carries a view-transition name so it holds still while pages change.
- **Primary nav:** 0.98rem, weight 500, with a 3px transparent bottom border that lights noon on hover, open and current. The chevron turns 180 degrees over 0.25s. Panels open full width on shade-2, revealed downwards from the masthead by a clip over 0.26s; their links, tasks and feature columns settle in over 0.32s, staggered by 0.05s. Exits are instant.
- **Collapsed (1320px and below):** A bordered Menu button opens a stacked list of ruled rows; panels open inline without shadow.
- **Jump bar:** A sticky ink bar on programme pages. Items carry the same 3px underline, noon when current and rule-strong on hover.
- **Action bar:** A fixed ink bar on phones with a 3px noon top rule, carrying the apply action.
- **Footer:** Shade, opening with a row holding the reversed logo at 52px tall, then three column groups under label-size heads.

### Threshold (signature)
The section head. A 1px rule spans the full width, with a 3px light bar covering the first bay's width (minimum 48px) at its left end: noon on shade, noon-ink on stone and ground. The title takes bays 1 to 5 and the lede bays 6 to 11. When the head enters view the bar extends from a quarter of its length to the full bay over 1.1s. Without JS, or with reduced motion, it shows at full length.

### Career-Stage Corridor (signature)
A row of six bays along the bottom of the shade lead, separated by shade-line hairlines. Each stage is a button with a bold label and a label-size programme line, minimum height 96px. A noon top rule grows from the left to 35% on hover and to 100% when pressed, over 0.45s; the background steps to shade-2 on hover and shade-3 when pressed, over 0.25s. The chosen stage opens a shade-2 route drawer of ruled cards, each with a programme and one fact; the cards settle in as a list (0.38s, 45ms apart).

### Focal Entrance (signature motion, once per session)
The homepage's one authored moment, flagged by an `intro` class set once per browser session. Six shade shutters over the lead photograph, one per bay, start half closed at first paint and open to the right over 0.5s each, 45ms apart. From 0.35s the lead-fact ticks draw from the left over 0.45s. From 0.7s one pulse of light travels along the six career-stage bays, each rule growing from the left and releasing to the right over 0.9s, 90ms apart; the pulse leaves hover and pressed states untouched. The name, facts and actions are visible from first paint and are never animated.

### Bar Chart
Single-series horizontal bars, 14px tall, with a rounded leading end. At rest the fills are ink-2 on light bands and worn stone on shade; on hover or focus a bar turns noon-ink (noon on shade) over 0.15s and shows an ink tooltip. When a chart enters view its bars grow from the baseline over 0.75s, 45ms apart. Every chart has a "View as table" disclosure and a source line.

### Comparison Table and Finder
The compare table is capped by a 3px ink rule. When the finder names a best fit, that programme's cells wash to sun-wash over 0.3s and a label-size noon-ink "best fit" line appears under its heading. Finder advice settles into place over 0.3s as it changes.

### Registers and Key Facts
The key-facts block is a stone band with a 3px ink top rule. Facts sit in a 4-column definition grid (2 columns at 1000px, 1 at 520px) of ruled cells: a label-style term above a condensed figure-weight value, with a source line or placeholder. Story meta lines run type · date · featuring · read time, separated by 3px dots.

### Centre Lockup
An abbreviation block filled with the centre's pigment in white condensed 1.3rem bold, joined to a shade-line-outlined name cell. A 6px accent bar sits above the centre's page head.

### Page Transitions
Same-origin navigations cross-fade with the masthead held still: the old page fades out over 0.18s (ease-in) and the new page fades in and rises 10px over 0.32s.

### Reduced Motion
With reduced motion requested, all spatial movement is removed: no shutters, tick draw or bay pulse, no threshold extension, no chart growth, no source-line settle, no view-transition rise, and arrows, chevrons and stage rules change state instantly. Menu panels and route cards keep a plain 0.15s linear fade so the change is still legible. Colour and opacity feedback (hover fills, chart bar light, best-fit wash) stays.

## Do's and Don'ts

### Do:
- **Do** alternate full-bleed shade, ground and stone bands, and let the change of material mark each section.
- **Do** open every major section with a threshold: hairline, one bay of light, title in bays 1 to 5.
- **Do** use the lifted red (noon) as light on shade and the brand red (noon-ink) as light on stone and ground.
- **Do** keep the sun-red fill for the single primary action per view, with white text, hovering to sun-deep.
- **Do** keep amber for the prototype strip and placeholders only.
- **Do** set the official logo reversed on shade at its locked 724:120 ratio: 54px in the masthead (38px at 560px, 34px at 420px), 52px in the footer.
- **Do** render every fact with a source line, and every unknown with a visible placeholder that names an owner.
- **Do** set headings in Anek at condensed width (76 to 86 percent) and long reading in Martel at 68ch.
- **Do** cap registers and fact blocks with a 3px ink rule and divide their rows with 1px rules.
- **Do** leave chart bars neutral at rest and light them only on hover or focus.
- **Do** run motion on the shared ease, cubic-bezier(0.16, 1, 0.3, 1), from an already-visible default, keep the focal entrance to once per session, and give every movement a reduced-motion path that keeps only colour and opacity.
- **Do** keep focus visible: a 3px noon-ink outline, noon on shade.
- **Do** limit centre accents to indigo, laterite and leaf, on the lockup and accent bar only.

### Don't:
- **Don't** use the lifted red (noon) as a line or focus ring on stone or ground, or the brand red as a line on shade.
- **Don't** use amber for anything that belongs to IIMB rather than to the prototype.
- **Don't** stretch, crop, recolour or flex the logo, or rebuild it as type.
- **Don't** round corners on buttons, fields, chips, panels or images. Radius belongs only to meta dots, bar-chart ends and focus outlines.
- **Don't** add drop shadows or elevation. The open menu panel is the single exception.
- **Don't** build grids of same-size cards. Use ruled registers, editorial lead-plus-column story layouts, and banded rows.
- **Don't** add a second focal animation, hide text or actions behind an entrance, or animate counters.
- **Don't** use decorative gradients, carousels or autoplay.
- **Don't** set type in uppercase or add letter-spacing above 0.05em.
- **Don't** add new fixed heading sizes between 1.1 and 1.25rem; use title small or item.
- **Don't** let pergola beams cross headline text, or put them on the homepage lead or article head.
- **Don't** introduce a fourth centre hue.
