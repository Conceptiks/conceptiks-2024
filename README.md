# maximtan.de

Personal site of Maxim Tan. SvelteKit + Tailwind, with page content managed in
Builder.io.

## Setup

1. `npm i`
2. Create a `.env` file:

```
PUBLIC_BUILDER_API_KEY=""
PUBLIC_TURNSTILE_SITE_KEY=""
PRIVATE_TURNSTILE_SECRET=""
PRIVATE_SENDGRID_API_KEY=""
PRIVATE_PIPEDRIVE_API_KEY=""
```

The three `PRIVATE_*` values are required for `npm run build` to succeed — the
contact form imports them at module scope.

3. `npm run dev`

## Design system

Colours resolve through CSS custom properties defined in `src/styles/app.css`,
which `tailwind.config.cjs` exposes as semantic utilities:

| Utility                                  | Meaning                        |
| ---------------------------------------- | ------------------------------ |
| `bg-surface`, `bg-surface-2/-3`           | page and raised backgrounds    |
| `text-ink`, `text-ink-muted/-subtle`      | primary / secondary text       |
| `border-line`, `border-line-strong`       | hairlines and stronger borders |
| `primary-50…950`, `secondary`             | brand orange ramp (`#EB4511`)  |

Prefer these over raw `white` / `neutral-*` / `black` so components follow the
active theme.

**Dark mode** is class-based (`.dark` on `<html>`), toggled from the navigation
and persisted in `localStorage`. It defaults to light rather than following the
system preference, because some Builder.io sections still carry hard-coded light
background colours — see `docs/rebrand-cms-checklist.md`.

Headings use a fluid `clamp()` scale defined in the `@layer base` block; avoid
adding per-breakpoint font-size chains in components.
