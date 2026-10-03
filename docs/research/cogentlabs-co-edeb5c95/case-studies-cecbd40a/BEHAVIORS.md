# Behavior Notes

- Category pills are click-driven links on the source page; implementation uses buttons and client-side filtering.
- Active filter: solid accent background with white text. Inactive filter: white background, thin gray border, uppercase monospaced label.
- Cards: `0.3s cubic-bezier(0.4, 0, 0.2, 1)` hover transition; image zoom is `0.5s cubic-bezier(0.4, 0, 0.2, 1)`.
- Source uses a static dark hero followed by a light catalog. The recreated page retains the existing reduced-motion-safe reveal behavior.
