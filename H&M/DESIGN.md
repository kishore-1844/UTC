---
name: Nordic Editorial Commerce
colors:
  surface: '#faf9f7'
  surface-dim: '#dadad8'
  surface-bright: '#faf9f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f1'
  surface-container: '#efeeec'
  surface-container-high: '#e9e8e6'
  surface-container-highest: '#e3e2e0'
  on-surface: '#1a1c1b'
  on-surface-variant: '#444748'
  inverse-surface: '#2f3130'
  inverse-on-surface: '#f1f1ef'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#bb0017'
  on-secondary: '#ffffff'
  secondary-container: '#e61825'
  on-secondary-container: '#fffbff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1b1c1c'
  on-tertiary-container: '#848484'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#ffdad6'
  secondary-fixed-dim: '#ffb3ac'
  on-secondary-fixed: '#410003'
  on-secondary-fixed-variant: '#930010'
  tertiary-fixed: '#e3e2e2'
  tertiary-fixed-dim: '#c7c6c6'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#464747'
  background: '#faf9f7'
  on-background: '#1a1c1b'
  surface-variant: '#e3e2e0'
typography:
  display-hero:
    fontFamily: Hanken Grotesk
    fontSize: 72px
    fontWeight: '600'
    lineHeight: 76px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Hanken Grotesk
    fontSize: 44px
    fontWeight: '500'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 30px
    fontWeight: '500'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: -0.005em
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0em
  body-lg:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: 0em
  body-md:
    fontFamily: DM Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0.005em
  body-sm:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.01em
  price-lg:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  price-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0em
  label-caps:
    fontFamily: Hanken Grotesk
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.08em
  badge-pill:
    fontFamily: Hanken Grotesk
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.04em
spacing:
  gutter: 1rem
  gutter-mobile: 0.5rem
  gutter-desktop: 1.25rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system embodies modern Scandinavian retail: architectural restraint, stark contrast, and rigorous spatial discipline. Drawing lineage from contemporary high-street institutions such as COS, Arket, and H&M, the visual language merges catalog functionality with the quiet confidence of an art book.

The core philosophy prioritizes studio photography over interface decoration. UI surfaces recede entirely into off-white and pure canvas tones, allowing silhouette, garment texture, and editorial framing to direct user focus. Micro-details—such as razor-thin hairline borders, tightly letter-spaced headers, and precise numerical price structures—convey curatorial intent.

Key style characteristics:
- **Nordic Minimalism:** Uncluttered layouts, expansive macro-whitespace, and an absolute absence of unnecessary skeuomorphism, heavy blur effects, or generic drop shadows.
- **Architectural Framing:** Subtle structural divisions using 1px grid rules, reminiscent of broadsheet newspapers and gallery catalogs.
- **Controlled Urgency:** Strategic, minimal deployment of saturated crimson red reserved strictly for promotional tags, final price reductions, and inventory alerts to prevent interface fatigue.

## Colors

The palette is deliberately restrained, dominated by high-contrast monochrome tones and warm paper grounds.

### Palette Architecture
- **Primary (`#111111`):** Pitch charcoal/black used for dominant typographic levels, primary buttons, structural frames, and active states.
- **Secondary (`#D6001C`):** High-street crimson red. Restricted to sale price readouts, clearance chips, flash badges, and critical validation alerts. Never used for decorative backgrounds or arbitrary icon fills.
- **Tertiary (`#767676`):** Balanced mid-gray for secondary product specifications, crossed-out original prices, breadcrumbs, and inactive metadata.
- **Neutral Canvas (`#F8F7F5`):** Warm studio off-white/linen tint used across alternating grid tiles, product card backplates, and drawer panels to soften stark screen contrast.
- **Surface Pure (`#FFFFFF`):** Base canvas background for the main viewport, standard card surfaces, and modal sheets.
- **Hairline Border (`#E5E5E5`):** Razor-thin separator tone for cards, dividers, navigation boundaries, and filter lines.

## Typography

The typography couples the architectural sharpness of **Hanken Grotesk** with the balanced, geometric legibility of **DM Sans**.

### Typographic Hierarchy & Principles
- **Display & Editorial Headlines:** Scaled down aggressively on mobile to prevent excessive multiline wrapping in narrow viewports. Tight letter-spacing gives larger sizes a sharp, magazine-spread cadence.
- **Label Caps:** Formatted in uppercase with `0.08em` tracking for sub-navigation, category tags, section labels, and table metadata.
- **Pricing:** Rendered in tabular numbers using Hanken Grotesk. Promotional sale pricing uses the crimson accent color (`#D6001C`), while struck-through original pricing appears in neutral mid-gray (`#767676`) at one weight step lower.
- **Body Copy:** Set in DM Sans with generous line heights to preserve reading comfort on product composition descriptions, sustainability reports, and sizing instructions.

## Layout & Spacing

The layout is built upon an editorial fluid column grid structured around studio imagery pacing.

### Grid & Breakpoints
- **Mobile (< 768px):** 4-column layout. Margin: `1rem`, Gutter: `0.5rem`. Catalog views default to a 2-column asymmetric or balanced grid. Product photography dominates edge-to-edge space.
- **Tablet (768px - 1024px):** 8-column layout. Margin: `2rem`, Gutter: `1rem`. Provides breathing room for filter toolbars and 3-column product listings.
- **Desktop (> 1024px):** 12-column layout. Margin: `3.5rem`, Gutter: `1.25rem`. Maximum content width caps at 1440px for content readability, with visual lookbook sections breaking out to full bleed. Catalog default is 4 columns, togglable to 2 columns for a curated editorial view.

### Layout Rhythms
Spacing between major layout sections follows a strict vertical rhythm, using `space-xl` and higher multiples to establish Scandinavian airy intervals. Information clusters (e.g., product title, color swatch, and price) are bound tightly using `space-xs` and `space-sm` to maintain group cohesion.

## Elevation & Depth

Visual hierarchy does not rely on ambient blur or heavy drop shadows. Spatial depth is expressed strictly through tonal layering, surface shifts, and structural hairline boundaries.

### Depth Mechanics
- **Ground Floor (Base Canvas):** Pure white (`#FFFFFF`) or pale off-white (`#F8F7F5`) backing whole pages.
- **Structured Hairlines:** Razor-thin boundaries (`1px solid #E5E5E5`) define product grids, shelf dividers, and sticky headers. No shadows are applied to horizontal rules.
- **Layer 1 (Card & Shelf Surfaces):** Alternating neutral backgrounds (`#F8F7F5`) provide natural visual separation for product card backings and promotional callouts without elevation shadows.
- **Layer 2 (Overlays, Flyouts & Drawers):** Cart drawers, size guide modals, and contextual menus slide over the canvas with a solid `#FFFFFF` surface accompanied by a crisp `1px solid #111111` or `#E5E5E5` boundary. 
- **Backdrop Scrim:** Semi-opaque pure dark veil (`rgba(17, 17, 17, 0.4)`) to dim catalog content when a side-sheet or modal dialog is active.

## Shapes

The primary architectural shape profile is **Sharp (`0`)**. 

To evoke an editorial high-fashion presence, product cards, input fields, dropdown menus, action sheets, and standard buttons utilize strictly sharp 90-degree corners (`0px`). 

The sole exception to the rectangular rule is functional classification badges (e.g., sale tags, "Online Exclusive" markers, sustainable collection indicators) and circular color swatch selectors, which adopt a strict full-pill (`9999px`) geometry to contrast deliberately against the rigid rectilinear framing.

## Components

### Buttons
- **Primary:** Solid `#111111` fill, `#FFFFFF` typography, sharp `0px` corners, zero shadow. Hover state shifts to `#222222` with immediate response. Padding: `14px 24px` for `body-md` bold/uppercase text.
- **Secondary / Outline:** Transparent fill, `1px solid #111111` border, `#111111` typography. Hover shifts fill to `#111111` and text to `#FFFFFF`.
- **Tertiary / Ghost:** Text-only with an underline offset by 4px. Underline transitions into active focus states.
- **Sale / Urgency Action:** `#D6001C` background, `#FFFFFF` text. Used exclusively in cart/checkout discount scenarios.

### Badges & Chips
- **Editorial Badges:** Small pill capsules with full rounded ends (`rounded-full`), `padding: 4px 10px`. 
  - Standard/Neutral: `#F8F7F5` background with `#111111` text.
  - Promotional / Sale: `#D6001C` background with `#FFFFFF` text, rendered in `badge-pill` typography.
- **Filter Chips:** Flat rectangle with `0px` radius, `1px solid #E5E5E5`, hover brings border to `#111111`. Active filter states invert fill to `#111111` with white text and an explicit hairline dismiss icon (`×`).

### Product Cards
- Aspect ratio: Fixed vertical ratio (typically 3:4 or 4:5) for fashion photography.
- Background: Default `#F8F7F5` image background to ensure garments photographed on light gray/off-white blends seamlessly.
- Border: Optional bottom or surrounding `1px solid #E5E5E5` hairline depending on catalog density.
- Details Block: Positioned below image with minimal vertical gap (`space-sm`). Contains:
  1. Product category/title in `body-sm` (`#111111`).
  2. Tabular price readout in `price-md`. Discounted items pair `#D6001C` current price with crossed-out `#767676` original price.
  3. Color options: Mini `12px` solid circular swatches with a `1px` white ring and `1px` gray frame.

### Form Inputs & Checkboxes
- **Text Fields:** Flat `#FFFFFF` or `#F8F7F5` surface with `1px solid #E5E5E5` bottom border (or full box border in checkout). Focused state transitions border color to `#111111` with zero glow ring.
- **Checkboxes & Radios:** Minimalist square (`0px` radius for checkbox) and sharp circular outline (`1px solid #111111`). Checked state fills solid `#111111` with a hairline white checkmark or inner dot.

### Lists & Navigation
- **Navigation Dropdowns & Drawers:** High-contrast lists using `label-caps` for section titles and `body-md` for links. Separators use `1px solid #E5E5E5`.
- **Lookbook Toggles:** Clean segment controls featuring text labels positioned over hairline underlines indicating active tabs, replacing traditional pill-style tab buttons.