# SuperChat Marketing Website V2 Dark — QA Checklist

## Isolation

- [x] Dark project exists in its own directory
- [x] Package name identifies the Dark version
- [x] Dark version runs on port 5176
- [x] V1 remains listening on 5173
- [x] Client Dashboard remains listening on 5174
- [x] V2 Light remains listening on 5175
- [x] No `.env.local`, Git history, `node_modules`, or prior `dist` copied from V2 Light
- [x] No production deployment or Cloudflare change

## Brand and theme

- [x] Large page backgrounds use deep navy, not pure black
- [x] Alternating sections use `#07111F` and `#0B1728`
- [x] Cards use `#101F33`, `#14263D`, and `#102238`
- [x] Borders use `#213953`
- [x] Brand blue remains the primary action and focus colour
- [x] No purple, violet, or indigo theme tokens detected
- [x] White surfaces are limited to the requested Header / mobile drawer and a deliberate light CTA
- [x] `color-scheme: dark` and theme colour `#07111F`
- [x] Focus states remain visible

## Pages and components

- [x] White sticky Header on every route
- [x] Header Logo shown directly without a capsule backing
- [x] Navy navigation with blue active and hover states
- [x] White-theme language switch
- [x] Blue Login button with the existing client login URL
- [x] White mobile Header and mobile drawer
- [x] Dark Hero and trust indicators
- [x] Dark outcome / workflow cards
- [x] Dark multi-platform hub
- [x] Dark demo preview
- [x] Dark comparison cards
- [x] Dark case study card
- [x] Dark Founder section with the real portrait
- [x] Dark pricing cards for all three official plans
- [x] Dark FAQ accordions
- [x] Dark final CTA
- [x] Dark Footer with local preview badge
- [x] Dark `/demo`
- [x] Dark `/about`
- [x] Dark `/contact` inputs and validation states
- [x] Dark `/privacy`
- [x] Dark `/terms`
- [x] Dark 404 page

## Content and integrations

- [x] Chinese and English content preserved
- [x] Language switch works
- [x] Login uses the existing `clientLoginUrl`
- [x] WhatsApp CTAs retain `+60 11-6120 7960`
- [x] Three official pricing plans preserved
- [x] Logo, Founder image, and favicon preserved
- [x] Six copied video files match V2 Light by SHA-256
- [x] No dark-video asset added or substituted

## Video behavior

- [x] Hero video autoplays muted and loops
- [x] Five `/demo` videos are present
- [x] All videos use `object-fit: contain`
- [x] Controls remain hidden
- [x] Viewport playback works
- [x] Offscreen videos pause
- [x] Only the viewed Demo continues playback
- [x] Media requests return 206

## Responsive and accessibility

- [x] Layout CSS covers 320–374, 375–767, 768–1023, 1024–1279, and 1280+ ranges
- [x] Mobile Demo order remains video first
- [x] Homepage sections follow the required primary / secondary dark alternation
- [x] Header height is 64px mobile and 68px from the small breakpoint
- [x] Navigation switches to the mobile menu below the `xl` breakpoint, preventing 1024px overlap
- [x] Sticky Header remains white after scrolling
- [x] Anchor offset keeps in-page sections below the sticky Header
- [x] English desktop layout has no horizontal overflow
- [x] Semantic headings, landmarks, links, buttons, labels, and alt text preserved
- [x] Logo and Founder portrait load without distortion or 404
- [x] Form fields have dark backgrounds, readable text, and visible borders

## Automated verification

- [x] `npm run typecheck`
- [x] `npm run lint`
- [x] `npm run build`

## Homepage six-step build process

- [x] Previous real scalp-care case section removed from the Homepage
- [x] Previous case CTA and right-side icon card removed
- [x] No `/demo` route or video asset removed
- [x] Chinese eyebrow, two-line title, introduction, and six steps present
- [x] English eyebrow, two-line title, introduction, and six steps present
- [x] Step numbers run consecutively from 01 to 06
- [x] Desktop uses three columns and two rows
- [x] Tablet uses two columns
- [x] Mobile uses one column in source order
- [x] Cards have equal minimum height, white backgrounds, light borders, and subtle shadows
- [x] Process section remains full-width `#F7FAFE`
- [x] Previous and next sections remain dark
- [x] No horizontal overflow in Chinese or English
- [x] Video SHA-256 values remain unchanged
