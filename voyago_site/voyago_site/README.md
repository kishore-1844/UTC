# VoyageCraft / Voyago – HTML + CSS + JS version

Open `index.html` (Home). The top nav links to the other pages:
index (Home) · flights · hotels · trains · buses · cabs · offers (Deals).
`all-tabs.html` is the original "all 7 tabs on one page" view.

## Structure
- `*.html`            pages (markup unchanged from the original code.html files)
- `css/tailwind.css`  compiled Tailwind (same config/theme as the original CDN setup, no CDN needed)
- `css/fonts.css`     self-hosted fonts + Material Symbols icon class
- `css/base.css`      original base rules
- `js/*.js`           original inline scripts, one per page
- `assets/fonts/`     Inter, Plus Jakarta Sans, Material Symbols Outlined
- `assets/images/`    filled by `download-images.py`

## Images (one step)
The photos are still linked to their original URLs (identical pictures, they load when online).
To save them locally: `python3 download-images.py`  (needs internet; rewrites the HTML to local paths).

## Rebuild CSS after editing classes (optional)
`tailwindcss -c tailwind.config.js -i css/tailwind.input.css -o css/tailwind.css --minify`
