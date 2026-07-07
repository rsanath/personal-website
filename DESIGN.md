---
name: Sanath — Personal Site
description: A calm, near-monochrome developer portfolio with a hypnotic ASCII plasma hero and a plain, document-like body.
colors:
  background: "oklch(98.2% 0.004 250)"
  background-dark: "oklch(16% 0.012 250)"
  foreground: "oklch(19% 0.018 250)"
  foreground-dark: "oklch(96% 0.006 250)"
  foreground-muted: "oklch(45% 0.014 250)"
  foreground-muted-dark: "oklch(74% 0.014 250)"
  foreground-faint: "oklch(88% 0.006 250)"
  foreground-faint-dark: "oklch(28% 0.014 250)"
  teal-accent: "oklch(60% 0.118 184.704)"
  teal-accent-dark: "oklch(51.1% 0.096 186.391)"
typography:
  display:
    fontFamily: "var(--font-sans), Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 8vw, 5.5rem)"
    fontWeight: 500
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "var(--font-sans), Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 3vw, 2.25rem)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "var(--font-sans), Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "var(--font-mono), JetBrains Mono, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  pill: "9999px"
spacing:
  section-y: "6rem"
  section-y-lg: "8rem"
components:
  theme-toggle:
    backgroundColor: "{colors.foreground-faint}"
    rounded: "{rounded.pill}"
    size: "36px"
  skill-chip:
    backgroundColor: "{colors.foreground-faint}"
    textColor: "{colors.foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "6px 12px 6px 6px"
---

# Design System: Sanath — Personal Site

## 1. Overview

**Creative North Star: "The Hypnotic Stillness"**

The site opens with one hypnotic flourish — a looping ASCII plasma field, teal bleeding up through a monochrome mask behind the hero title — then goes completely still. Past that first screen, the page reads like a plain, well-set document: single foreground color, type-driven hierarchy, no boxes, no competing motion. The hero is meant to be watched for a second, not performed at; everything after it is meant to be read, not decorated. The word for the whole system is "unique but clean" — one hypnotic, unmistakably custom moment, wrapped in a body that gets out of the way.

This system explicitly rejects **generic SaaS templates** (gradient hero text, hero-metric stat blocks, uppercase tracked eyebrows, identical feature-card grids), **cluttered maximalist portfolios** (competing animations, effects on every section), **corporate resume-as-website** (bland, generic, template-shaped), and **card-heavy / boxy layouts** (nested cards, chip grids, bordered panels standing in for real typographic hierarchy). The post-hero page is a document, not a dashboard of tiles.

**Key Characteristics:**
- Near-monochrome foreground/background scale (hue 250, near-zero chroma) carries every surface, border, and body of text.
- Teal is the one accent color, sourced from Tailwind's teal-600/700 — used site-wide, but rationed, never the resting-state color of the page.
- One signature animated moment (the plasma hero); zero ambient motion elsewhere.
- Mono type (JetBrains Mono) is reserved for metadata and labels — dates, categories, route-style nav links — never for headlines or paragraph prose.
- Dark is the default resting theme; light is a considered, fully-supported alternative via the toggle, not an equal coin-flip.
- Flat by default: no shadows anywhere in the system. Depth comes from tonal layering (`foreground-faint` fills) and hairline dividers, not elevation.

## 2. Colors

Near-monochrome everywhere except one rationed accent; the palette reads as ink-on-paper (dark: paper-on-ink) with a single teal signal.

### Primary
- **Signal Teal** (`oklch(60% 0.118 184.704)` light / `oklch(51.1% 0.096 186.391)` dark — Tailwind teal-600/700): the one accent. Currently the hero's plasma-mask gradient; extends site-wide as the sole accent for interactive/active states (link hover, active nav item, focus rings). Never used as a body background.

### Neutral
- **Paper Ink** (`oklch(98.2% 0.004 250)` bg / `oklch(19% 0.018 250)` fg, light mode): the resting light surface and its body text.
- **Deep Ink** (`oklch(16% 0.012 250)` bg / `oklch(96% 0.006 250)` fg, dark mode): the default resting surface and its body text.
- **Muted Ink** (`oklch(45% 0.014 250)` light / `oklch(74% 0.014 250)` dark): secondary text — subtitles, descriptions, dates, captions.
- **Faint Ink** (`oklch(88% 0.006 250)` light / `oklch(28% 0.014 250)` dark): the only "filled" surface in the system — chip backgrounds, hairline dividers, the theme-toggle button. Never a full-section background.

### Named Rules
**The One Voice Rule.** Teal is the single named accent in the system. It should never cover more than roughly 10% of any given screen; its rarity — one gradient, one hover state, one active indicator — is what makes it read as deliberate rather than decorative.

**The No New Neutrals Rule.** Every "colored" surface in the system (text, border, fill) is a step on the same hue-250 near-zero-chroma ramp. Don't introduce a second gray family (warm grays, blue-grays) alongside it.

## 3. Typography

**Display/Body Font:** Bricolage Grotesque (`var(--font-sans)`, with system-ui/sans-serif fallback)
**Label/Mono Font:** JetBrains Mono (`var(--font-mono)`, with monospace fallback)

**Character:** One grotesque sans carries both display and body — confident, slightly quirky at large sizes, plain and legible at body sizes — paired against a mono thread used exclusively for metadata, echoing the ASCII texture of the hero without turning the whole site into a terminal pastiche.

### Hierarchy
- **Display** (500, `clamp(2.5rem, 8vw, 5.5rem)`, leading 0.95, tracking `-0.04em`): the hero `<h1>` only — "Hi, I'm {name}". Text-balanced.
- **Headline** (500, `text-3xl`–`text-4xl` / clamp `1.875rem`–`2.25rem`, tracking `-0.02em`): section titles past the hero ("Skills", "Experience").
- **Title** (500, default body size): per-item titles — job role, project name.
- **Body** (400, 1rem, leading 1.6, capped ~65–75ch): descriptions, highlight bullets, intro copy.
- **Label** (400, `text-sm`, mono): dates, category headers, skill-chip text — always mono, always muted-ink colored, never the loudest thing on the line.

### Named Rules
**The Mono-Metadata Rule.** JetBrains Mono is reserved for metadata — dates, categories, route-style nav labels, the hero subtitle. It never sets a headline or a paragraph of prose; that boundary is what keeps the "engineer-y" personality a detail instead of a costume.

## 4. Elevation

Flat by default, everywhere. There are no `box-shadow` values in the system. Depth and grouping are conveyed through tonal layering (`foreground-faint` as the one "raised" fill, used for chips and the theme-toggle button) and hairline `border-t border-foreground-faint` dividers between list items — never through elevation, blur, or shadow.

### Named Rules
**The Flat-By-Default Rule.** If a component needs to feel separated from its neighbor, reach for a hairline divider or a faint-ink fill before reaching for a shadow. Shadows are not part of this system's vocabulary.

## 5. Components

### Theme Toggle
- **Shape:** full pill (`rounded-full`), 36×36px, fixed top-right.
- **Style:** semi-transparent faint fill (`bg-white/50` light / `bg-black/50` dark) so it sits above content without a hard edge.
- **State:** sun/moon icon swap via the `dark:` variant; `active:scale-95` for a tactile press. No hover elevation — the scale press is the only feedback.

### Skill Chips
- **Style:** full pill (`rounded-full`), `foreground-faint` background, no border.
- **Content:** optional 20px tech icon + mono label text, left-aligned with tight internal padding (`py-1.5 pl-1.5 pr-3`).
- **State:** static — no hover/selected variants; chips are informational, not interactive.

### Lists / Containers
- No card component exists in this system, by design. Repeating content (experience entries) is a flat vertical list, each item separated by a `border-t border-foreground-faint` hairline rather than boxed into a card. Do not introduce a bordered/shadowed card wrapper here.

### Navigation (planned — post-hero pivot, not yet built)
- Route-style, slash-prefixed labels (`/`, `/about`, `/contact`) rather than menu words — reads like file paths.
- Fixed to the bottom of the viewport, mono type, muted-ink at rest, teal (the One Voice accent) on hover/active.
- Minimal inventory: 3–4 links, no dropdown, no hamburger, no logo-as-home trick.

### Plasma Hero (signature component)
- Full-viewport (`h-dvh`) canvas-rendered ASCII plasma field, looping continuously, masked to fade out over the lower half of the section (`mask-[linear-gradient(to_bottom,black_1%,transparent_100%)]`).
- Teal gradient (`from-teal-700` dark / `from-teal-600` light, `to-transparent`) sits behind the canvas as the plasma's color signal.
- Hero title/subtitle scroll-link: on scroll, content translates down and fades out (`translateY(progress * 24px)`, opacity `1 - progress * 1.15`) via `requestAnimationFrame`, fully skipped under `prefers-reduced-motion: reduce`.
- A single scroll-cue chevron animates in place (`hero-scroll-cue`, 2.4s, `motion-safe:` gated) beneath the content as the only other hint of motion in the hero.

## 6. Do's and Don'ts

### Do:
- **Do** keep teal to roughly 10% of any screen — one gradient, one hover state, one active indicator (The One Voice Rule).
- **Do** use hairline `border-t border-foreground-faint` dividers between repeating list items instead of cards.
- **Do** reserve JetBrains Mono for metadata (dates, categories, nav labels) — never headlines or prose (The Mono-Metadata Rule).
- **Do** default to dark mode on load; keep the light toggle fully supported, not an afterthought.
- **Do** give the plasma hero's `prefers-reduced-motion` treatment a genuinely considered static frame, not a frozen mid-loop glitch.
- **Do** let the post-hero page read as a plain document: heading → subheading → body → link list, structured by type size and whitespace alone.

### Don't:
- **Don't** add gradient text, hero-metric stat blocks, or uppercase tracked eyebrows anywhere (generic SaaS template).
- **Don't** stack competing animations or add effects to every section (cluttered maximalist portfolio).
- **Don't** wrap repeating content in bordered/shadowed cards, nested cards, or chip grids standing in for hierarchy (card-heavy layout).
- **Don't** introduce a second gray family alongside the hue-250 near-monochrome ramp.
- **Don't** use `box-shadow` for depth or separation; this system has no shadow vocabulary (The Flat-By-Default Rule).
- **Don't** let the hero flourish bleed past the first screen — everything below it stays static and quiet.
