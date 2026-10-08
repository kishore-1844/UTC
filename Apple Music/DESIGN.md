---
name: Obsidian Sonic
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1b1b1d'
  surface-container: '#1f1f21'
  surface-container-high: '#2a2a2c'
  surface-container-highest: '#353437'
  on-surface: '#e4e2e4'
  on-surface-variant: '#e8bcba'
  inverse-surface: '#e4e2e4'
  inverse-on-surface: '#303032'
  outline: '#ae8785'
  outline-variant: '#5e3f3d'
  surface-tint: '#ffb3b0'
  primary: '#ffb3b0'
  on-primary: '#68000f'
  primary-container: '#ff5357'
  on-primary-container: '#5c000c'
  inverse-primary: '#bf0024'
  secondary: '#ffb3b5'
  on-secondary: '#680019'
  secondary-container: '#950329'
  on-secondary-container: '#ff9da2'
  tertiary: '#ffb2b7'
  on-tertiary: '#67001c'
  tertiary-container: '#ff506c'
  on-tertiary-container: '#5b0017'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad8'
  primary-fixed-dim: '#ffb3b0'
  on-primary-fixed: '#410006'
  on-primary-fixed-variant: '#930019'
  secondary-fixed: '#ffdada'
  secondary-fixed-dim: '#ffb3b5'
  on-secondary-fixed: '#40000c'
  on-secondary-fixed-variant: '#920027'
  tertiary-fixed: '#ffdadb'
  tertiary-fixed-dim: '#ffb2b7'
  on-tertiary-fixed: '#40000e'
  on-tertiary-fixed-variant: '#91002b'
  background: '#131315'
  on-background: '#e4e2e4'
  surface-variant: '#353437'
typography:
  display-hero:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Hanken Grotesk
    fontSize: 34px
    fontWeight: '700'
    lineHeight: 42px
    letterSpacing: -0.025em
  headline-xl-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 17px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  label-lg:
    fontFamily: Hanken Grotesk
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
  label-caps:
    fontFamily: Hanken Grotesk
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.25rem
---

## Brand & Style

This design system channels the refined, sensory-rich minimalism of contemporary desktop media interfaces. Merging the architectural discipline of desktop utility with the emotional tactility of high-fidelity music streaming, the interface treats audio content and album art as primary heroes while framing them in pristine, translucent surfaces.

### Emotional Resonance & Aesthetic
- **Focused Immersion:** The interface fades into the background, letting full-bleed album art, dynamic lyrics, and curated editorial content command user focus.
- **Atmospheric Depth:** Frosted glassmorphism combined with deep obsidian foundations evokes a late-night listening session—luxurious, calm, and effortlessly fluid.
- **Precision Engineering:** Subtle micro-borders, clean neo-grotesque type scales, and instantaneous visual feedback evoke native desktop craftsmanship.

### Core Movement: macOS-Inspired Vibrancy & Glassmorphism
The aesthetic relies on multi-layer translucency, heavy backdrop-filter saturations, and ultra-fine light catchers (`#FFFFFF15` outer rings). Chrome elements (such as sidebars, floating playback bars, and context menus) mimic desktop system materials, remaining subordinate to vivid content.

## Colors

The palette establishes an ultra-refined dark atmosphere where deep carbon and obsidian layers reduce eye strain and produce maximum visual pop for rich cover art and media graphics.

### Palette Architecture
- **Primary Accent (`#FA233B`):** The signature vibrant scarlet. Used for primary call-to-actions, active playback states, live scrubbers, and high-priority icon indicators.
- **Secondary Accent (`#FA586A`):** Bright coral-rose. Serves as hover states, subtle gradient stops with the primary color, active badge strokes, and micro-interactions.
- **Tertiary Accent (`#FF375F`):** Vivid neon magenta-rose for spatial audio badges, lossless badges, and live lyric highlights.
- **Foundation Neutral (`#161618`):** Deep charcoal surface neutral serving as the base layer for secondary panes and resting card containers.

### Surface Tiers & Translucency
- **Canvas Base:** `#0D0D0E` (solid backdrop layer under all glass panes).
- **Sidebar & Translucent Panels:** `rgba(22, 22, 24, 0.72)` with `backdrop-filter: blur(40px) saturate(180%)`.
- **Raised Interactive Cards:** `rgba(36, 36, 38, 0.65)` transitioning to `rgba(48, 48, 52, 0.85)` on hover.
- **Persistent Bottom Player Deck:** `rgba(18, 18, 20, 0.82)` with `backdrop-filter: blur(50px) saturate(190%)`.
- **Hairline Borders:** `rgba(255, 255, 255, 0.08)` to `rgba(255, 255, 255, 0.14)` for razor-thin separation without visual weight.
- **Text Layers:** Primary text at `rgba(255, 255, 255, 0.96)`, secondary text at `rgba(255, 255, 255, 0.64)`, and tertiary/caption text at `rgba(255, 255, 255, 0.42)`.

## Typography

The typographic hierarchy utilizes **Hanken Grotesk** across all roles, replicating the pristine geometry, tight tracking, and neutral clarity of Apple's SF Pro family.

### Hierarchy & Treatment
- **Display & Section Titles:** Set tightly tracked (`-0.025em` to `-0.03em`) in weights 600 through 700 to provide a commanding editorial presence for artist landing headers and curated editorial cards.
- **Body & Metadata:** Set in `body-md` (13px) and `body-lg` (15px) with calibrated line-heights to support high-density song tracks and metadata rows without clashing.
- **Caps & Micro-Badges:** `label-caps` is styled uppercase with wide tracking (`+0.08em`) to delineate technical audio codecs (e.g., `LOSSLESS`, `HI-RES`, `DOLBY ATMOS`).

## Layout & Spacing

The layout model is anchored by an app-shell desktop layout featuring a fixed translucent sidebar, a fluid main browse canvas, and a persistent anchored bottom playback cockpit.

### Shell Architecture & Grid
- **Desktop Grid:** Fluid 12-column content container with `gutter: 1.25rem` (20px) and page edge margins of `margin: 2rem` (32px).
- **Navigation Sidebar:** Fixed width of `260px` anchored flush left, full viewport height minus player bar.
- **Main Viewport Reflow:**
  - **Large Desktop (≥1440px):** 6-column album artwork tile layout.
  - **Standard Desktop (1024px – 1439px):** 4 to 5-column album artwork tile layout.
  - **Tablet (768px – 1023px):** Sidebar collapses to an icon rail (`72px`); content adjusts to 3-column album tiles.
  - **Mobile (<768px):** Sidebar converts into a bottom sheet or off-canvas drawer; gutters reduce to `0.75rem` (12px), canvas margins reduce to `1rem` (16px), and album cards display in 2-column grids.

### Media Rows & Tile Sizing
Album grids must preserve an absolute `1:1` aspect ratio for artwork tiles, paired with a constant gap spacing of `space-md` (16px) or `space-lg` (24px) for featured editorial banners.

## Elevation & Depth

Visual depth is achieved through optical translucency, layered vibrancy, and razor-sharp perimeter light refraction rather than muddy drop shadows.

### Tiers of Vibrancy & Materials

1. **Tier 0 (Backdrop Canvas):**
   - Solid `#0D0D0E`. Absorbs light; provides total blackness for rich OLED rendering.

2. **Tier 1 (Submerged Chrome - Sidebar & Headers):**
   - Background: `rgba(22, 22, 24, 0.75)`.
   - Effect: `backdrop-filter: blur(40px) saturate(180%)`.
   - Divider: Border-right / border-bottom hairline `1px solid rgba(255, 255, 255, 0.08)`.

3. **Tier 2 (Floating Surfaces - Cards & List Hovers):**
   - Background: `rgba(255, 255, 255, 0.04)` resting; `rgba(255, 255, 255, 0.08)` hover.
   - Outline: Continuous inner shadow or outer border `1px solid rgba(255, 255, 255, 0.06)`.
   - Shadow: `0 8px 24px -4px rgba(0, 0, 0, 0.5)`.

4. **Tier 3 (Persistent Cockpit - Bottom Player Bar):**
   - Background: `rgba(18, 18, 20, 0.85)`.
   - Effect: `backdrop-filter: blur(48px) saturate(200%)`.
   - Top Edge Highlight: `1px solid rgba(255, 255, 255, 0.12)`.
   - Ambient Shadow: `0 -12px 32px rgba(0, 0, 0, 0.6)`.

5. **Tier 4 (Overlays - Contextual Popovers & Action Sheets):**
   - Background: `rgba(32, 32, 36, 0.90)`.
   - Effect: `backdrop-filter: blur(60px) saturate(210%)`.
   - Border: `1px solid rgba(255, 255, 255, 0.16)`.
   - Drop Shadow: `0 20px 48px -8px rgba(0, 0, 0, 0.75)`.

## Shapes

The interface balances soft geometry with rigorous desktop precision. Using `roundedness: 2`, standard elements adopt an 8px radius, cards scale to 12px–16px, and micro-elements use continuous pill geometries.

### Corner Radii Guidelines
- **Album Artwork & Media Cards:** `12px` (`0.75rem`) for compact grids, scaling up to `16px` (`1rem`) for large curated playlist hero blocks.
- **Inputs & Standard Selectors:** `8px` (`0.5rem`) for crisp input boundaries.
- **Badges, Filter Chips & Play Pill Buttons:** Full continuous curvature (`9999px` / pill-shaped) to distinguish actionable state filters and tactile media buttons.
- **Popovers & Context Menus:** `12px` with smoothed squircle clipping to avoid harsh digital apexes.

## Components

### 1. Buttons
- **Primary Play Action:** Full pill shape (`9999px`), background `#FA233B`, text `#FFFFFF`, font `label-lg`. Micro-scale down to `0.97` on active press. Subtle top inner highlight `inset 0 1px 0 rgba(255, 255, 255, 0.3)`.
- **Secondary / Glass Button:** Background `rgba(255, 255, 255, 0.08)`, border `1px solid rgba(255, 255, 255, 0.12)`, text `#FFFFFF`. Hover changes background to `rgba(255, 255, 255, 0.14)`.
- **Icon Utility (Shuffle, Repeat, AirPlay):** Frameless `32x32px` touch targets. Default color `rgba(255, 255, 255, 0.64)`, active state `#FA233B`, hover `rgba(255, 255, 255, 1)`.

### 2. Cards (Album & Playlist Tiles)
- **Container:** Structural wrapper with zero background, `12px` to `16px` artwork radius with a `1px` translucent inner stroke (`rgba(255, 255, 255, 0.08)`).
- **Artwork Hover State:** Scale artwork smoothly to `1.03` with a 200ms ease-out curve. Reveals a floating translucent glass play button centered over artwork (`rgba(0, 0, 0, 0.45)` with `backdrop-filter: blur(12px)` and red accent glyph).
- **Text Lockup:** Title in `label-lg` (pure white, single-line truncation), subtitle/artist in `body-md` (`rgba(255, 255, 255, 0.6)`).

### 3. Track Lists & Data Grids
- **Rows:** Height `48px`, alternating hover fill of `rgba(255, 255, 255, 0.06)` with a `6px` corner radius.
- **Columns:** Track number / play icon trigger (36px), title + artwork thumbnail (flex grow), album name (30%), duration & secondary options (80px right-aligned).
- **Active Track:** Title and track number illuminate in `#FA233B` with an animated 3-bar equalizer glyph.

### 4. Chips & Audio Badges
- **Editorial Chips:** Pill shape, padding `4px 12px`, background `rgba(255, 255, 255, 0.06)`, border `1px solid rgba(255, 255, 255, 0.10)`. When selected: background `#FA233B`, border transparent.
- **Audio Quality Badges (`LOSSLESS`, `ATMOS`):** Compact pill, padding `2px 6px`, font `label-caps`, background `rgba(255, 255, 255, 0.10)`, text `rgba(255, 255, 255, 0.70)`.

### 5. Persistent Player Cockpit (Bottom Deck)
- **Dimensions & Placement:** Fixed height `76px`, spanning full viewport width at `bottom: 0`, layered above content with `z-index: 1000`.
- **Structure:** 
  - **Left (Now Playing Track):** 48px square artwork with `6px` radius, track title, artist name, and favorite heart toggle.
  - **Center (Transport Controls & Scrubber):** Play/pause pill flanked by skip forward/backward buttons. Top or integrated dual-channel progress scrubber with accent `#FA233B` fill and smooth micro-thumb on hover.
  - **Right (Utility Deck):** Volume slider with subtle glass track, lyrics drawer trigger, queue view toggle, and output device selector.

### 6. Inputs & Search Fields
- **Search Field:** Height `36px`, pill or `8px` rounded shape, background `rgba(255, 255, 255, 0.08)`, border `1px solid rgba(255, 255, 255, 0.08)`. Left-aligned magnifying icon in `rgba(255, 255, 255, 0.4)`. Focus state: border `1px solid #FA233B`, ambient outer ring `0 0 0 3px rgba(250, 35, 59, 0.25)`.