<!-- SEED: re-run /impeccable document once there's code to capture the actual tokens and components. -->
---
name: Sanath — Personal Site
description: A calm, near-monochrome developer portfolio with a single ASCII plasma field as its signature moment.
---

# Design System: Sanath — Personal Site

## 1. Overview

**Creative North Star: "The Quiet Shoreline"**

The site opens with one deliberate flourish — a looping ASCII plasma field behind the hero title — and then goes quiet. Everything past that first screen (about, projects, and later blog/photos) reads like a well-set page: restrained near-monochrome color, clear type, generous whitespace, no competing motion. The plasma is observed, not performed at; it should make a visitor pause for a second on arrival, not follow them down the page.

This system explicitly rejects the rest of [eloyb.design](https://eloyb.design/) — a named anti-reference the user called out directly: a strong hero idea undercut by a page that stays "fancy" after it. It also rejects generic SaaS-template scaffolding (gradient hero text, hero-metric stat blocks, uppercase eyebrows, identical feature cards), cluttered maximalist portfolios where effects compete for attention, and bland corporate-resume-as-website minimalism that has no personality at all.

**Key Characteristics:**
- Near-monochrome palette everywhere except the hero; the ASCII plasma carries a vivid, full-hue color cycle as its one deliberate departure from the site's single-foreground-color rule.
- One signature animated moment (the hero), zero ambient motion elsewhere.
- Sans-led type with a mono thread (echoing the ASCII texture) and serif used only for rare, singular emphasis.
- Flat, static, content-first below the fold — calm confidence over spectacle.

## 2. Colors

**The Two-Tone Rule.** Outside the hero, the palette is near-zero chroma: dark foreground on a light background (and the inverse in dark mode). Color is not a design lever here — contrast, type, and layout are. The hero's plasma field is the one named exception (see below); every other surface stays on the foreground ramp.

Tokens resolve via a `data-theme` attribute on `<html>` (`light` default, `dark` override), driving both Tailwind's `dark:` variant and these custom properties from one source — no separate dark-mode logic per component.

### Primary
- **Foreground** — the near-black text tone, used for headings, body copy, borders, and icons everywhere outside the hero's plasma.

### Neutral
- **Background** — near-white background (light mode) / near-black background (dark mode). True neutral or chroma nudged only fractionally toward the foreground's own hue — never toward a warm cream/sand default.
- **Foreground-muted** — a lower-contrast step of the foreground tone for secondary text (captions, metadata), still meeting body-text contrast minimums, not a washed-out gray.

### Hero Exception
The ASCII plasma renders in a saturated hue (~70%) that cycles across the full wheel over time and space — a deliberate, named departure from the foreground ramp, confined entirely to the hero background. This is intentionally vivid, not a muted accent. Lightness is tuned per theme rather than shared: darker/richer marks in light mode (against the near-white background, higher saturation reads as pastel-washed at high lightness) and lighter marks in dark mode, so the plasma stays vivid and legible against the background in both themes without fighting the hero text for contrast.

### Named Rules
**The Hero-Only Color Rule.** Any hue outside the foreground ramp is confined to the hero's plasma field. Every other surface — nav, body, footer, future sections — resolves to a tint or shade of the foreground tone. If a new element seems to need its own hue, that's a sign it belongs in the hero, not the rest of the page.

## 3. Typography

**Display/Body Font:** a clean sans (grotesk or humanist — chosen at implementation) carries headings and body copy.
**Mono Font:** reserved for labels, metadata, code-adjacent details, and anything that should echo the ASCII wave's texture (e.g. a nav label, a timestamp, a footer detail).
**Serif:** used sparingly, for one or two singular emphasis moments only (e.g. a pull-quote, the site's name/wordmark, or a single line in the hero) — not a full second voice running throughout.

**Character:** confident and quiet — the sans does the talking, mono adds a quiet technical accent, and the serif appears rarely enough that it feels chosen, not decorative.

### Hierarchy
- **Display** (sans, weight TBD, clamp ≤ 6rem, tight leading): hero title only, sitting over/scrolling past the ASCII wave.
- **Headline / Title** (sans, weight TBD): section headings (About, Projects).
- **Body** (sans, regular weight, 65–75ch max line length): bio, project descriptions, future blog copy.
- **Label** (mono, small size): nav items, dates, tags, metadata — anywhere a "technical" texture reinforces the ASCII motif without repeating it literally.
- **Emphasis** (serif, used rarely): a single quote, name, or accent line where a second voice is deliberately noticeable.

### Named Rules
**The Rare Serif Rule.** The serif appears in at most one or two places per page. If it starts showing up in body copy or repeated components, it has stopped being an accent.

## 4. Elevation

Flat by default. No shadow vocabulary — depth, where needed, comes from foreground/background contrast and spacing, not elevation. The one exception is the hero: the ASCII plasma sits behind the title as a full-bleed background layer, which is a stacking/z-index concern, not a shadow one.

### Named Rules
**The Flat Page Rule.** Nothing below the hero lifts, glows, or casts a shadow. If a component seems to need elevation to read correctly, restructure it with contrast or spacing instead.

## 5. Components

Component library is not yet built — About/Projects UI and nav will be authored during implementation, guided by the rules above. Canonical primitives (nav, links, project list item) should stay flat, near-monochrome, with mono used for any label-like text and no card chrome unless a card is genuinely the best affordance for a project entry.

### ASCII Plasma Hero (signature component)
A classic demoscene plasma field (sum-of-sines, rendered as density-mapped ASCII characters from a light-to-dense palette) fills the hero background, with the hero title and intro copy layered above/scrolling past it on scroll. Colors are the vivid, slowly-cycling hue described in the Hero Exception above, tuned separately for light and dark theme. Must degrade to a genuinely considered static frame under `prefers-reduced-motion`, not a frozen mid-loop glitch, and pause while the tab is hidden.

### Theme Toggle
A small icon button, fixed to the top-right corner of the viewport on every page, switching the `data-theme` attribute between `light` and `dark` and persisting the choice to `localStorage`. Sits on a filled circular chip (foreground-faint — a shade off the background, not the background itself) so it reads as a control against any hero content behind it. Defaults to system preference (`prefers-color-scheme`) on first visit; an inline script applies the stored or system theme before first paint so there's no flash.

## 6. Do's and Don'ts

### Do:
- **Do** keep everything past the hero flat, static, and content-first.
- **Do** confine the plasma's hue-cycle to the hero; render every other "colored" element as a tint/shade of the foreground tone.
- **Do** use mono only for label-scale, technical-feeling text; serif only for singular emphasis moments.
- **Do** ship a real static plasma frame for `prefers-reduced-motion`, considered as its own composition, not a paused loop.
- **Do** drive light/dark exclusively through the `data-theme` attribute (Tailwind's `dark:` variant + these tokens both read it) — no per-component theme logic.

### Don't:
- **Don't** replicate the rest of eloyb.design past its hero — no lingering "fanciness" once the hero moment is over.
- **Don't** use gradient hero text, hero-metric stat blocks, uppercase tracked eyebrows, or identical feature-card grids (generic SaaS template scaffolding).
- **Don't** let effects compete for attention across sections (cluttered maximalist portfolio).
- **Don't** default to a bland, personality-free resume-in-a-template layout.
- **Don't** introduce a second hue family outside the foreground ramp anywhere on the page except the hero.
- **Don't** add ambient or looping motion outside the hero — the plasma is the one signature moment.
