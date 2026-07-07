@AGENTS.md

## Design Context

This is Sanath's personal site — a calm, near-monochrome developer portfolio (see `PRODUCT.md` and `DESIGN.md`). One signature moment: a looping ASCII-art ocean wave behind the hero title; everything below it is flat, static, and content-first (about + projects now, blog/photos later). Near-monochrome palette, light/dark mode only (no named theme), sans-led type with a mono accent and sparing serif. Named anti-reference: the rest of eloyb.design (great hero, too "fancy" after). Read `PRODUCT.md` / `DESIGN.md` before making UI changes.

## Styling Conventions

Always style with Tailwind CSS utility classes. Only fall back to inline styles when the desired result isn't achievable with Tailwind (e.g. computed/dynamic values, canvas drawing) — never add a CSS file for it. For conditional or composed class names, always use the `cn` helper from `src/util.ts` (clsx + tailwind-merge) rather than string-concatenating or template-literal-ing classes together.
