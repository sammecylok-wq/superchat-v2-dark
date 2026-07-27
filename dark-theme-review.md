# Dark Theme Review

## Tokens

The Dark version centralizes its palette in `src/styles/index.css`:

- Homepage dark section: `#06101D`
- Homepage tinted-white section: `#F7FAFE`
- Homepage white section: `#FFFFFF`
- White-section card: `#FFFFFF` or `#F7FAFE`
- Homepage section border: `rgba(112, 160, 204, 0.18)`
- Surface: `#101F33`
- Elevated surface: `#14263D`
- Card surface: `#102238`
- Border: `#213953`
- Brand blue: `#2878C8`
- Hover blue: `#3B8ED8`
- Light blue accent: `#57A2E6`
- Primary text: `#F4F8FC`
- Secondary text: `#B7C5D6`
- Muted text: `#8192A6`

## Header

The Header is an intentional white navigation surface above the dark content. It uses `#FFFFFF`, a `#DCE4EE` bottom border, and a restrained navy shadow that becomes slightly stronger after scrolling. It remains sticky without blur or transparency. Navigation uses navy text, brand-blue hover and active states, and a pale-blue active background.

The official Logo is shown directly on white without a capsule backing, border, recolouring, or distortion. The language switch uses `#F7FAFE` with a brand-blue selected state, and Login remains the compact solid-blue action. The mobile Header and drawer follow the same white system.

## Hero

The Hero uses `#06101D` as its full-width base with only restrained radial blue lighting and no purple. It is followed by the clearly contrasting `#F7FAFE` outcome section. The video is framed in a dark media shell, while the value indicators use subtle blue borders. Text contrast and CTA hierarchy remain clear.

## Cards and comparison

Cards in white or tinted-white sections use `#FFFFFF` or `#F7FAFE` with `#DCE4EE` borders. Cards in dark sections use `#0E1D30` or `#102238` with the shared blue-grey section-border token. Shadows remain restrained. The previous table-style comparison remains a pair of differentiated dark cards.

## Video containers

All media shells use deep navy or near-black localized backgrounds, blue-grey borders, contained video sizing, and no persistent overlays. Video files and playback behavior were not altered.

## Pricing

All three official plans and prices remain unchanged. Pricing now sits on a full-width white section: Trial and Pro Max use white cards with `#DCE4EE` borders, while recommended Pro uses `#F7FAFE` with a brand-blue border. Navy headings, grey-blue body text, badges, expandable details, and WhatsApp CTAs remain intact.

## FAQ and forms

FAQ rows use bordered dark cards with blue open-state emphasis. Contact fields use `#101F33`, light text, muted placeholders, clear blue focus rings, and retained validation semantics.

## Footer

The Footer uses `#040A12` as the deepest contained footer surface. It retains the official Logo, navigation, WhatsApp consultant link, Login, and a development-only `V2 Dark Preview · Local only` badge.

## Contrast and light remnants

Dark sections use `#F4F8FC` headings and `#B7C5D6` body text. White sections use `#102A56` headings and `#5F6B7A` body text. The Homepage uses full-width outer section wrappers in this ten-step sequence: `#06101D`, `#F7FAFE`, `#06101D`, `#FFFFFF`, `#06101D`, `#F7FAFE`, `#06101D`, `#FFFFFF`, `#06101D`, and `#102A56`, followed by the `#040A12` Footer. Every section spans the complete 1,265px browser viewport in the desktop browser check; `main` remains transparent and does not override section backgrounds.

## Purple review

A source scan found no `purple`, `violet`, `indigo`, or known purple colour tokens in `src` or `index.html`. The theme uses navy, blue, blue-grey, white, and semantic green/amber/red only.

## Mobile review

Responsive rules preserve single-column flow, mobile video-first ordering, contained media, wrapping platform pills, readable spacing, and a white mobile navigation drawer. The Header is 64px on mobile and 68px from the small breakpoint; the desktop navigation is replaced by the mobile control below `xl`, avoiding overlap at 1024px. Breakpoints cover the requested 320–1440 range.

## Logo and Founder

The official transparent Logo and real Founder portrait are copied unchanged. Browser checks confirmed both load with HTTP 200 and no broken image state.

## Dark / white acceptance

- Dark / White Alternation: **PASS**
- Full Width Section Backgrounds: **PASS**
- White Section Contrast: **PASS**
- Dark Section Contrast: **PASS**
- Pricing White Section: **PASS**
- FAQ Dark Section: **PASS**
- Mobile Alternation: **PASS** — outer section backgrounds do not change at mobile breakpoints
- Purple Remaining: **NO**
- TypeScript: **PASS**
- Lint: **PASS**
- Build: **PASS**

## Six-step build process

The former real-case block has been replaced in the same full-width light position by a dedicated six-step build process. The section uses `#F7FAFE`, navy headings, grey-blue body text, white cards, `#DCE4EE` borders, subtle navy shadows, and pale-blue step numbers.

- Real Case Section Removed: **PASS**
- Six-Step Build Process Added: **PASS**
- Steps 01–06 Present: **PASS**
- Desktop 3x2 Layout: **PASS**
- Mobile Single Column: **PASS**
- White Section Styling: **PASS**
- Dark / White Alternation Preserved: **PASS**
- Chinese Complete: **PASS**
- English Complete: **PASS**
- Videos Modified: **NO**
- V1 Modified: **NO**
- V2 Light Modified: **NO**
- Dashboard Modified: **NO**
- TypeScript: **PASS**
- Lint: **PASS**
- Build: **PASS**
