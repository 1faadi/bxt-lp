# CaseStudiesCatalog Specification

## Overview

- Target: `src/components/sites/cogentlabs-co-edeb5c95/case-studies-cecbd40a/CaseStudiesCatalog.tsx`
- Interaction model: click-driven filtering plus card hover.
- Visual reference: Cogent Labs `/case-studies`, desktop and mobile captures.

## Structure

- Dark hero: 72px navigation; title container capped at 1216px; desktop title is 64px, 600 weight, white.
- Catalog: white background; 1216px max-width; top/bottom padding 64/96px; filter pills wrap with 8px gaps.
- Grid: 3 columns with 32px gaps on desktop; 2 columns below 1024px; 1 column below 700px.
- Card: 12px radius, `1px #ececee` border, 4:3 image region, white body with category, title, client and outcome.

## States

- Active category pill uses BXTrack orange `#f47820`; inactive pills retain source-style outline.
- Hovered card translates upward 4px and image scales 1.03.
- Mobile keeps filter pills horizontally readable via wrapping and card list stacking.

## Assets

- Nine local source images under `public/sites/cogentlabs-co-edeb5c95/case-studies-cecbd40a/`.

## Source-derived tokens

- Hero: `rgb(26, 26, 26)`.
- Card border: `rgb(236, 236, 238)`.
- Target card radius: `12px`.
- Card heading: DM Sans, 18px, 600, 24.75px line height, -0.18px tracking.
