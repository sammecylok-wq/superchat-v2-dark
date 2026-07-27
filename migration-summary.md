# V2 Light to V2 Dark — Migration Summary

## Source and destination

- Source: `C:\Users\User\Documents\Codex\2026-07-25\files-mentioned-by-the-user-superchat-v2`
- Destination: `C:\Users\User\Documents\Codex\2026-07-25\files-mentioned-by-the-user-superchat-v2-dark`
- Local Dark URL: `http://127.0.0.1:5176/`

The destination is an independent local project. V1, the Client Dashboard, and V2 Light were not edited.

## Preserved unchanged

- Page routes and React application structure
- Chinese and English copy
- Language switching
- Three official pricing plans
- WhatsApp consultant number and CTA destinations
- Login configuration and destination
- Official Logo
- Founder portrait
- Favicon
- Six MP4 assets
- Video autoplay, muted, loop, inline, controls-hidden, and visibility behavior

All six Dark-project MP4 files match their V2 Light counterparts by SHA-256.

## Dark-version changes

- New package identity: `superchat-marketing-website-v2-dark`
- New local development port: 5176
- Dark browser metadata and native control colour scheme
- Central dark design tokens
- Dark Header, mobile menu, and Footer
- Dark Hero, content cards, platform hub, media shells, case study, Founder, pricing, FAQ, forms, final CTA, legal pages, and 404
- Side-by-side dark comparison cards in place of the light table treatment
- Development-only Dark preview badge

## Excluded

- V2 Light `node_modules`
- V2 Light build output
- Git metadata
- `.env.local` and secrets
- Client Dashboard
- Previously created dark marketing video deliverables

## Deployment

No production deployment was performed. No formal domain, Cloudflare Pages project, Worker, or environment variable was modified.
