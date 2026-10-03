# BXTrack case-study detail specification

## Overview

- Target file: `src/components/sites/cogentlabs-co-edeb5c95/pet-care-petsfirst-25d102cd/BxTrackCaseStudy.tsx`
- Reference: `https://cogentlabs.co/case-studies/pet-care/petsfirst`
- Interaction model: static, with link and card hover transitions

## DOM structure

Fixed dark header; dark grid hero with back-link, case-study category, heading, description, three metrics and a product visual; cream article body with project metadata and five content sections; dark metric recap and enquiry panel.

## Computed reference values

- Hero heading: `64px`, `600`, `70.4px` line-height, `-2.24px` letter-spacing, white.
- Article headings: `32px`, `600`, `38.4px` line-height, `-0.64px` letter-spacing.
- Main article text column: approximately `832px` at the 1920px desktop reference.
- Accent is adapted from Cogent red to BXTrack orange `#f47820` according to the established site theme.

## Responsive behavior

- Desktop: hero is a 1:1 text/visual split; metadata rail and article sit in a 3/8-column layout.
- Mobile: hero and body stack; result cards stay in a three-column compact row and body metadata becomes a two-column grid.
