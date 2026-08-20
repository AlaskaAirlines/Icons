# Pictograms

Pictograms are the larger, illustrative graphics in the Auro system — think spot illustrations rather than UI controls. They live in the icon library alongside icons and tails so that teams have a single, versioned, optimized source of truth instead of copies scattered across Figma and various site pages.

## How pictograms differ from icons and tails

| | Icons | Tails / Logos | Pictograms |
|---|---|---|---|
| Purpose | UI affordances (buttons, status, navigation) | Airline & brand marks | Illustrative, storytelling graphics |
| Size | Small, glyph-scale | Brand-scale | Larger, spot-illustration scale |
| Color | Monochrome, tinted via `currentColor` | Full brand color | Full color, fixed palette |
| `dist` path | `dist/icons/` | `dist/logos/` | `dist/pictograms/` |

Because pictograms carry their own brand colors, they are **not** recolored with `currentColor` the way UI icons are. Pick a pictogram for a background-appropriate variant rather than styling it via CSS `color`.

## Naming convention

Pictograms are named `<name>-on-<background>` so consumers can pick a variant tuned for the surface it sits on:

- `elbow-room-on-light` — tuned for light backgrounds.
- `elbow-room-on-dark` — (future) tuned for dark backgrounds.

Additional pictograms and `-on-dark` variants are added by dropping the optimized SVG into `src/icons/pictograms/` and adding a matching entry to [`src/data/pictograms.json`](../src/data/pictograms.json); no pipeline changes are required.

## Consuming pictograms

The build emits the same file types as the other collections into `dist/pictograms/`:

- `dist/pictograms/<name>.svg` — optimized standalone SVG.
- `dist/pictograms/<name>.js` / `<name>_es6.js` — CommonJS / ES6 wrapped objects.
- `dist/pictograms/<name>.mjs` — modern ESM entry (preferred).

```javascript
import elbowRoom from '@alaskaairux/icons/dist/pictograms/elbow-room-on-light.mjs';

element.innerHTML = elbowRoom.svg;
```

Each pictogram object exposes `name`, `title`, `desc`, `viewBox`, `style`, and the optimized `svg` string, with an accessible `<title>` and `<desc>` injected during the build.

> **Rendering the same pictogram more than once on a page.** Each pictogram's SVG contains internal ids (e.g. a clip-path reference). The build namespaces these to the pictogram name, so two *different* pictograms on the same page never collide. Inserting the *same* pictogram inline multiple times, however, still duplicates its ids in the DOM — and the browser resolves every reference to the first match. If you render one pictogram repeatedly (e.g. in a list), isolate each instance — render it inside its own shadow root, or rewrite the ids per instance — so its clip-paths resolve correctly.

## Animated pictograms

Some pictograms have historically existed as animated GIFs. The current pipeline is built for **static SVG only**, and that is the supported format for this collection today. Animated formats are **deferred** to a future story.

When animation support is added, it must:

- respect the user's `prefers-reduced-motion` setting with a static fallback,
- keep file size within the same optimization budget as static assets, and
- preserve the same accessible `<title>` / `<desc>` metadata.

Until then, deliver pictograms as static SVGs; convert any animated source to a representative static frame.
