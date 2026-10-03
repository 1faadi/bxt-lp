# Visual QA

## Viewports checked

- Desktop: 1440 × 900
- Mobile: 390 × 844, touch emulation

## Results

- Home page matches the requested warm editorial direction: 1280px grid, large type, high whitespace, restrained borders, one rust accent, large case-study visuals, and near-black impact/CTA sections.
- Mobile layout remains single-column, metrics remain 2×2, and no horizontal overflow was detected.
- Fixed header transition was verified at `scrollY > 40` (`rgba(244,242,236,.92)` plus blur/border).
- Mobile menu opens and exposes all five primary routes; route click to `/services` was verified.
- Reveal animation, CTA/row arrow motion, and product hover scale are present and respect reduced motion.
- `/`, `/services`, `/case-studies`, all three case-study detail routes, `/blogs`, all three article routes, `/about-us`, `/privacy`, and `/terms` render successfully.
- Browser console is clean after adding the Next.js 16 `data-scroll-behavior="smooth"` marker.

## Intentional differences from reference

Per the supplied brief, no Cogent Labs logo, copy, photography, client identity, or exact section content was reused. BXTrack branding uses the separately supplied brand source; site copy, case studies, visual mockups, and metrics remain original.
