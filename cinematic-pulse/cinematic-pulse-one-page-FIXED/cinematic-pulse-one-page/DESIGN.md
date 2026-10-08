---
name: Cinematic Pulse
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#e9bcb6'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#af8782'
  outline-variant: '#5e3f3b'
  surface-tint: '#ffb4aa'
  primary: '#ffb4aa'
  on-primary: '#690003'
  primary-container: '#e50914'
  on-primary-container: '#fff7f6'
  inverse-primary: '#c0000c'
  secondary: '#adc7ff'
  on-secondary: '#002e68'
  secondary-container: '#0070ea'
  on-secondary-container: '#fefcff'
  tertiary: '#fbbc30'
  on-tertiary: '#412d00'
  tertiary-container: '#946b00'
  on-tertiary-container: '#fff7f0'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad5'
  primary-fixed-dim: '#ffb4aa'
  on-primary-fixed: '#410001'
  on-primary-fixed-variant: '#930007'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc7ff'
  on-secondary-fixed: '#001a41'
  on-secondary-fixed-variant: '#004493'
  tertiary-fixed: '#ffdea5'
  tertiary-fixed-dim: '#fbbc30'
  on-tertiary-fixed: '#271900'
  on-tertiary-fixed-variant: '#5d4200'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-xl:
    fontFamily: Space Grotesk
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.03em
  display-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 38px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Manrope
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Manrope
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.04em
  label-md:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Manrope
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 3.5rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
The design system embodies the thrill, scale, and immersion of a premier cinema house transferred into a state-of-the-art digital streaming interface. The experience is unapologetically dark, focusing 100% of viewer attention on high-fidelity video content, evocative key art, and editorial curation. The brand voice is confident, premium, and seamless—evoking feelings of anticipation, escapism, and tailored discovery.

Drawing heavily from modern High-Contrast Minimalist and Glassmorphic aesthetics, interface controls retreat into the shadows until summoned. Imagery bleeds edge-to-edge, text cuts cleanly through the dark with uncompromising legibility, and accents of signature red ignite moments of action.

## Colors
The palette is built around obsidian blacks and charcoal canvas tones, allowing rich video thumbnails and key art to dominate visual perception.

- **Primary Brand Red (`#E50914`)**: Used for the primary call-to-action (Play, Subscribe), brand identifiers, and progress indicators. States: Active hover transitions to deep crimson (`#B80610`), while highlights and live tags leverage bright coral-red (`#FF3B30`).
- **Secondary Action Blue (`#0071EB`)**: Used for functional interactions, system notifications, informational tooltips, and digital rentals.
- **Tertiary Cinema Gold (`#E5A919` / `#FFD700`)**: Reserved exclusively for editorial praise, Rotten Tomatoes/IMDb syncs, awards badges, and top-tier subscription perks.
- **Surfaces & Layers**:
  - `Base / Obsidian`: `#0B0B0F` (primary viewports, hero backdrops).
  - `Canvas Charcoal`: `#141414` (scrolling browse views, collections).
  - `Elevated Card / Rail`: `#1F1F24` (content cards, popovers, navigation bars).
  - `Elevated Hover`: `#2B2B33` (card expansion states, menu selections).
  - `Subtle Stroke`: `#33333C` (structural dividers, border outlines).
- **Typography Tiers**:
  - `High-Contrast Pure White`: `#FFFFFF` (titles, primary labels).
  - `Secondary Neutral`: `#AAAAAF` (metadata, runtimes, actors).
  - `Tertiary Muted`: `#737373` (disclaimers, timestamps, inactive states).

## Typography
Typography creates a strong architectural hierarchy between dynamic billboard titles and readable, compact UI data.

- **Headline Font (`Space Grotesk`)**: Provides geometric precision and modern cinematic presence. Used across hero promotional banners, category shelf headlines, and modal titles.
- **Body & Label Font (`Manrope`)**: Delivers high legibility at micro scales across diverse display panels, television apps, and mobile screens. Used for synopsis copy, metadata (maturity ratings, HDR flags, aspect ratios, durations), and operational controls.

## Layout & Spacing
The layout follows a fluid-shelf paradigm engineered for endless horizontal discovery and rich vertical stacking.

- **Grid & Alignment**: Standard 12-column fluid grid for detailed hubs, landing pages, and account panels. Content rails (posters, landscape cards) bypass strict vertical column tracks in favor of fluid horizontal overflowing scrollers with edge feathering.
- **Breakpoints**:
  - `Desktop (>= 1280px)`: Outer margin of `3.5rem` (`56px`), gutter of `1.5rem` (`24px`). Full multi-item horizontal carousel visibility (6 items visible).
  - `Tablet (768px - 1279px)`: Outer margin of `2rem` (`32px`), gutter of `1rem` (`16px`). 3 to 4 items visible per carousel.
  - `Mobile (< 768px)`: Outer margin of `1rem` (`16px`), gutter of `0.75rem` (`12px`). Vertical card stacks or single/two-up horizontal snaps.

## Elevation & Depth
Elevation is constructed through deep spatial layering and subtle translucent materials rather than heavy drop shadows:

- **Level 0 (Canvas Base)**: Pitch `#0B0B0F` to deep `#141414`. Absorbs background bleed.
- **Level 1 (Inline Cards & Media Rails)**: `#1F1F24` paired with a 1px border of `rgba(255, 255, 255, 0.08)`.
- **Level 2 (Hover Expansion & Flyouts)**: `#2B2B33` supported by an ambient black shadow (`0 20px 40px rgba(0, 0, 0, 0.8)`) and a subtle red/white glow rim (`0 0 0 1px rgba(255, 255, 255, 0.15)`).
- **Level 3 (Modals, Overlays, and Video Scrubbers)**: Deep Glassmorphism using `background: rgba(15, 15, 20, 0.85)` with a backdrop blur of `24px` and a bounding hairline border of `#33333C`.
- **Video Vignettes**: Top and bottom gradients on hero banners utilize a 4-stop black gradient (`rgba(11,11,15,0) 0%`, `rgba(11,11,15,0.6) 60%`, `rgba(11,11,15,0.95) 90%`, `#0B0B0F 100%`) ensuring text readouts remain sharp.

## Shapes
The system relies on compact, disciplined rounding (Level 1, `4px` base) to evoke the sharp, clean edges of modern displays and cinematic screens. 

- **Media Cards & Artwork**: `rounded-sm` (`4px`) preserves the cinematic framing of poster keys without cutting off peripheral content or letterboxing.
- **Pills & Status Badges**: Maturity ratings (e.g., `TV-MA`, `PG-13`), audio formats (`Dolby Vision`, `4K UHD`), and interactive chips apply a slight `4px` border radius or pure pill shape (`9999px`) strictly for interactive tags.
- **Interactive Controls**: Buttons, inputs, and modals follow a crisp `4px` or `6px` radius.

## Components

- **Buttons**:
  - *Primary ("Play")*: High-contrast `#FFFFFF` background with `#000000` text, scaling to `#E50914` background with `#FFFFFF` text on focal interactions. Hover includes a subtle scale transform (`1.04x`).
  - *Secondary ("More Info / Add to List")*: Translucent smoke background (`rgba(255, 255, 255, 0.2)`), `#FFFFFF` text, frosted backdrop blur (`12px`).
  - *Icon Controls*: Circular (`36px` to `48px`) framed by a 1px border (`#33333C`), backfilled with `rgba(20, 20, 20, 0.6)`.

- **Media Cards & Carousel Rails**:
  - Horizontal cards (16:9) and vertical posters (2:3).
  - Hover state triggers an animated expansion overlay (`scale(1.15)`), revealing in-place video preview teasers, match score (`#E5A919`), age rating pills, genre breadcrumbs, and quick-action icon buttons.

- **Badges & Chips**:
  - Maturity and visual spec tags use transparent containers with a crisp `1px` border of `rgba(255, 255, 255, 0.4)` and uppercase `label-sm` Manrope typography.
  - "Top 10" and "Trending" badges feature high-energy diagonal gradients incorporating `#E50914` and `#B80610`.

- **Inputs & Search**:
  - Understated input fields featuring `#1F1F24` background, expanding horizontally on focus with a crisp `1px` border of `#FFFFFF`. Pure white search text with `#737373` placeholder.

- **Progress & Scrubber Bars**:
  - Base track: `rgba(255, 255, 255, 0.2)` at `4px` height.
  - Buffer track: `rgba(255, 255, 255, 0.4)`.
  - Active playback fill: Vivid cinematic red (`#E50914`). Scrubber thumb is an active white circle (`12px`) expanding to `16px` on hover.

- **Lists & Episode Selectors**:
  - Horizontal rows with an integrated thumbnail (`16:9`), episode index, runtime, title, and synopsis. Active/playing items feature an obsidian glow and primary red equalizer animation.