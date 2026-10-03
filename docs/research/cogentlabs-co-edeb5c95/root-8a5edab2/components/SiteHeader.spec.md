# SiteHeader Specification

## Overview
- Target: `SiteHeader.tsx`; reference screenshot: `original-desktop.png`; interaction: scroll + click.
## DOM Structure
Fixed header > shell > logo, nav, CTA, menu button; mobile panel below.
## Computed Styles
80px height; 1280px max width; 56px desktop/20px mobile gutter; 14px/500 nav; 1px border; warm background after 40px scroll.
## States & Behaviors
Transparent/warm initial state to 92% warm backdrop at scroll; underline and arrow hover; mobile panel toggle.
## Assets
Extracted BXTrack logo PNG from the supplied brand site.
## Text Content
Home, Services, Case Studies, Blogs, About Us, Start a Project.
## Responsive Behavior
Desktop full nav; tablet reduced gaps; mobile logo + CTA + menu, panel links.
