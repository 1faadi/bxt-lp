# Behaviors

- Header is fixed. At `scrollY > 40`, background changes from transparent/warm to `rgba(244,242,236,.92)` with backdrop blur and a visible bottom border; 300ms ease.
- Content reveals use IntersectionObserver: opacity `0 → 1`, translateY `18px → 0`, 600ms cubic-bezier(.22,1,.36,1), small child stagger.
- Navigation links reveal a 1px underline left-to-right on hover.
- CTA and row arrows translate `0 → 4px` on hover in 250ms.
- Project visuals scale `1 → 1.02` on hover over 600ms.
- Metric values count up once on intersection; reduced-motion users receive final values immediately.
- Mobile navigation is click-driven: compact menu button toggles a full-width panel below the 76px header.
- No smooth-scroll library, carousel, scroll-snap, modal, or tab model is required.

