# Design System

This document exports the implemented design system for this project from the current source code in `src/app/globals.css`, `src/config/themes.ts`, `src/lib/fonts.ts`, and the active layout/UI components.

## Overview

The site uses a narrow editorial layout with code-editor influences:

- Pixel-display headlines via `Micro 5`
- Technical utility text via `JetBrains Mono`
- Main reading copy via `Space Grotesk`
- Token-driven color theming with light and dark variants
- Minimal card primitives with thin borders, flat surfaces, and restrained motion
- Accent-led interactions rather than heavy fills or shadows

## Foundations

### Layout

- Main content width: `max-w-2xl` (`42rem` / `672px`)
- Global page shell: centered column with `px-6`
- Section rhythm:
  - hero top padding: `pt-12`
  - major section spacing: typically `mt-24`
  - compact internal spacing uses the 4px token grid

### Typography

- Display / headline: `Micro 5`
  - Used for brandmark and section titles
  - Common sizes:
    - `text-[40px]` for headings
    - oversized responsive brand text in footer
- UI / labels / metadata: `JetBrains Mono`
  - Used for nav, buttons, badges, chips, and shortcuts
  - Common sizes:
    - `10px` for status/meta
    - `12px` for actions
    - `13px` to `14px` for nav/card titles
  - Frequent treatments:
    - uppercase
    - tracking-wider / tracking-wide
- Body copy: `Space Grotesk`
  - Default body font on `body`
  - Common sizes:
    - `16px` for intro paragraphs
    - `14px` for project descriptions
    - `10px` for low-emphasis support copy

### Spacing Scale

Defined in CSS custom properties on a 4px grid:

- `--spacing-1`: `4px`
- `--spacing-2`: `8px`
- `--spacing-3`: `12px`
- `--spacing-4`: `16px`
- `--spacing-5`: `20px`
- `--spacing-6`: `24px`
- `--spacing-8`: `32px`
- `--spacing-10`: `40px`
- `--spacing-12`: `48px`
- `--spacing-16`: `64px`
- `--spacing-20`: `80px`
- `--spacing-24`: `96px`
- `--spacing-32`: `128px`

### Radius

- `--radius-sm`: `4px`
- `--radius-md`: `6px`
- `--radius-lg`: `8px`
- `--radius-xl`: `12px`
- `--radius-full`: `9999px`

Observed usage:

- cards: effectively square or lightly rounded
- floating theme trigger: full pill/circle
- theme panel: `rounded-xl`
- chips and tags: small rounded rectangles

### Motion

Timing and easing tokens:

- `--dur-fast`: `100ms`
- `--dur-normal`: `200ms`
- `--dur-slow`: `500ms`
- `--ease`: `cubic-bezier(0.16, 1, 0.3, 1)`
- `--ease-spring`: `cubic-bezier(0.34, 1.56, 0.64, 1)`

Implemented motion patterns:

- subtle card lift on hover
- border and color transitions on interactive text
- marquee motion
- avatar float
- scan-line reveal
- text scrambling CTA effect
- in-view fade and upward entrance for cards/headings

Reduced motion is respected via a global `prefers-reduced-motion` override.

## Color System

### Semantic Tokens

Core semantic token groups:

- backgrounds
  - `--bg-primary`
  - `--bg-secondary`
  - `--bg-tertiary`
  - `--bg-surface`
- text
  - `--text-primary`
  - `--text-secondary`
  - `--text-tertiary`
  - `--text-muted`
- borders
  - `--border-default`
  - `--border-subtle`
  - `--border-strong`
- accents
  - `--accent-primary`
  - `--accent-primary-hover`
  - `--accent-primary-muted`
  - `--accent-secondary`
  - `--accent-tertiary`
  - `--pixel-orange`
- status
  - `--status-error`
  - `--status-warning`
- data visualization
  - `--github-green-1` to `--github-green-4`

These are mapped into Tailwind v4 theme variables through `@theme inline`.

### Default Theme

Default theme ID: `nord`

Light:

- `bg-primary`: `#eceff4`
- `bg-secondary`: `#e5e9f0`
- `bg-tertiary`: `#d8dee9`
- `text-primary`: `#2e3440`
- `text-secondary`: `#3b4252`
- `accent-primary`: `#5e81ac`
- `accent-secondary`: `#81a1c1`
- `accent-tertiary`: `#6b8f5c`
- `pixel-orange`: `#bf6043`

Dark:

- `bg-primary`: `#2e3440`
- `bg-secondary`: `#3b4252`
- `bg-tertiary`: `#434c5e`
- `text-primary`: `#eceff4`
- `text-secondary`: `#d8dee9`
- `accent-primary`: `#88c0d0`
- `accent-secondary`: `#5e81ac`
- `accent-tertiary`: `#a3be8c`
- `pixel-orange`: `#d08770`

### Available Themes

The project supports 8 palette sets, each with light and dark variants:

1. `warm` — terracotta accent, warm neutrals
2. `forest` — emerald green, sage undertones
3. `gruvbox` — retro groove
4. `everforest` — soft green on warm earth
5. `kanagawa` — ink-blue / indigo palette
6. `nord` — default arctic palette
7. `catppuccin` — pastel mauve palette
8. `tokyonight` — neon blue / midnight palette

Theme behavior:

- theme choice is stored in `localStorage` under `aykansal-color-theme`
- the default `nord` theme uses base CSS token values
- non-default themes are applied by overriding CSS variables on `document.documentElement`
- dark/light mode is controlled independently through `next-themes`

## Component System

### Navigation

Primary nav characteristics:

- sticky top navigation
- translucent background with blur: `bg-bg-primary/80 backdrop-blur-lg`
- brand rendered in `Micro 5`
- links rendered in `JetBrains Mono`
- active state uses `accent-primary`
- hover shifts secondary text to stronger text color

### Buttons and Actions

#### Primary CTA: Book Call Button

Pattern:

- full-width inline action
- `JetBrains Mono`, `12px`, uppercase, wide tracking
- 1px accent border
- filled accent backing layer that scales away on hover
- text flips from primary text to accent text
- hover adds scramble animation to the label

This is the system’s most expressive interaction primitive.

#### Secondary Actions

Pattern used for links like `SEE ALL WORK`:

- border only
- muted text by default
- stronger border and stronger text on hover
- small icon paired with label

### Cards

Project cards define the main content-card pattern:

- border: `border-border-default`
- surface: `bg-bg-secondary`
- hover:
  - slight upward shift
  - stronger border
- media region sits on `bg-bg-tertiary`
- inner layout uses:
  - title row
  - description
  - chip list
  - separator line
  - footer actions/meta

Supporting card primitives:

- status badge
- source badge
- tech chip
- footer action link

### Badges and Chips

Badge behavior is semantic and token-based:

- `online` uses `accent-tertiary`
- `in-dev` uses `status-warning`
- `archived` uses muted text tones
- open/closed source badges use green/error-coded variants

Badge styling:

- `JetBrains Mono`
- uppercase
- `10px`
- compact horizontal padding
- translucent tinted backgrounds

### Theme Picker

The theme picker is a dedicated system component rather than a generic dropdown.

Collapsed state:

- fixed circular trigger at bottom-right
- blurred dark glass background
- live accent-color dot preview

Expanded state:

- floating dark glass panel
- keyboard-first interaction
- theme rows show:
  - number key shortcut
  - name
  - short description
  - 5-color swatch strip

Keyboard model:

- `T`: open/close picker
- `D`: toggle light/dark
- `1-8`: select theme
- `Esc`: close

### Footer

Footer pattern:

- info bar on `bg-secondary`
- utility theme toggle
- oversized pixel-wordmark faded into the bottom surface
- gradient overlay to soften the large type into the background

## Media and Illustration Language

The project avoids generic screenshots where possible and uses coded visuals:

- dithered avatar treatment
- generative SVG/CSS thumbnails for project cards
- grid dots, radial rings, sector lines, node graphs, and wireframes
- accent-colored linework over semantic background tokens

This creates a visual language that is:

- technical
- lightweight
- theme-aware
- easy to restyle across palettes

## Interaction Rules

Recurring interaction conventions:

- text color transitions are preferred over heavy container animation
- hover states typically strengthen contrast or reveal accent color
- shadows are used sparingly
- borders do most of the structural work
- accent backgrounds are usually translucent, not fully filled
- fixed utility controls use glass-like dark overlays even in light mode

## Responsive Rules

Observed responsive behavior:

- main layout remains single-column and narrow by default
- hero shifts to a two-column layout at `560px`
- projects switch to a 2-column grid at `480px`
- brand text in navbar compresses to `A` on very small widths below `360px`

## Accessibility and UX Notes

Implemented safeguards:

- reduced-motion support
- focus-visible text-color affordances on nav/CTA elements
- semantic labels on dialog/buttons in theme picker
- adequate mode/theme separation through semantic tokens

Current design system assumptions:

- strong reliance on color and tone contrast for state communication
- keyboard shortcuts are part of the UI identity
- motion is decorative, not required for task completion

## Source of Truth

Primary implementation files:

- `src/app/globals.css`
- `src/config/themes.ts`
- `src/lib/fonts.ts`
- `src/components/layout/navbar.tsx`
- `src/components/layout/footer.tsx`
- `src/components/ui/book-call-button.tsx`
- `src/components/ui/theme-picker.tsx`
- `src/components/sections/hero-intro.tsx`
- `src/components/sections/projects.tsx`
- `src/components/ui/project-thumbnail.tsx`

## Design System Summary

If this system were reduced to a single sentence:

> Editorial portfolio layout + code-editor palette system + pixel-display branding + mono utility UI + restrained motion + token-driven semantic theming.
