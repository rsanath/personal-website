@AGENTS.md

## Styling Conventions

Always style with Tailwind CSS utility classes. Only fall back to inline styles when the desired result isn't achievable with Tailwind (e.g. computed/dynamic values, canvas drawing) — never add a CSS file for it. For conditional or composed class names, always use the `cn` helper from `src/util.ts` (clsx + tailwind-merge) rather than string-concatenating or template-literal-ing classes together.
