# Product

## Register

brand

## Users

Recruiters, potential collaborators, other engineers, and friends discovering Sanath's personal site — likely arriving from a GitHub/LinkedIn link or word of mouth. They're skimming to answer "who is this, what do they do, is this person good at their craft" in under a minute. Some will linger to read a blog post or browse projects/photos once those sections exist.

## Product Purpose

A personal site that showcases who Sanath is (software developer — mobile apps, websites, servers, blockchain) and his work (projects now; blog and photos as future sections). Success looks like a visitor immediately reading the site itself as evidence of craft — clean and easy to scan, with one deliberate animated flourish at the top and a plain, well-typeset document feel everywhere else.

## Brand Personality

Three words: **calm, quiet, engineer-y.**

The ASCII plasma hero (title + intro over a looping animated field) is a fixed, out-of-scope centerpiece — it stays exactly as built. Everything _after_ the hero is being redirected toward a plainer, document-like register inspired by luca-felix.com: a single-column, text-led page with no cards or boxed sections, a route-style nav (`/`, `/about`, `/contact` — reads like file paths, not menu labels), and personality carried through small deliberate details rather than decoration. Structure comes from type size and whitespace alone, the way a well-set page reads, not from borders or shadows.

Theme is dark-first: the site loads in dark mode by default, with the existing light-mode toggle kept as a considered alternative rather than an equal default.

## Anti-references

- **Generic SaaS template**: gradient hero text, hero-metric stat blocks, uppercase tracked eyebrows, identical feature-card grids.
- **Cluttered maximalist portfolio**: competing animations, effects on every section, sensory overload.
- **Corporate resume-as-website**: bland, generic, no personality — reads like a PDF resume dropped into a template.
- **Card-heavy / boxy layouts**: nested cards, chip grids, bordered panels standing in for real typographic hierarchy — the post-hero site should read as a document, not a dashboard of tiles.

## Design Principles

1. **One signature moment, then quiet.** The ASCII plasma hero is the site's single creative flourish and stays unchanged; every other section defers to it instead of adding competing visual moments.
2. **Hierarchy through type and space, not chrome.** Past the hero, no cards/borders/shadows — heading → subheading → body → link list, structured entirely by type scale and whitespace.
3. **Personality in small details.** Route-style nav, plain-text framing, and understated touches (not decoration) signal craft the way an engineer would build their own site.
4. **Dark by default, light as an alternative.** The toggle remains, but the resting state assumes dark.
5. **Structure ahead of content.** Build about + projects now with a route structure that extends cleanly to blog/photos later, without a redesign.

## Accessibility & Inclusion

Standard best-effort: WCAG AA contrast and semantics where reasonable. The ASCII plasma hero must respect `prefers-reduced-motion` with a genuinely considered static frame, not just a frozen mid-animation glitch.
