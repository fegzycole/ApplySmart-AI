# CareerBoost AI Design System (Stitch Aesthetic)

## Visual Atmosphere
- **Vibe:** Generous, Quiet, Structural, and High-Fidelity.
- **Goal:** Create an AI-native interface that feels calm and intelligent, using white space and hierarchy rather than borders and boxes to organize information.

## Design Tokens

### 1. Color Palette (Quiet & Intentional)
- **Backgrounds:**
  - `bg-base`: `#FFFFFF` (Primary background)
  - `bg-subtle`: `#F9FAFB` (Secondary backgrounds, sidebars)
  - `bg-muted`: `#F3F4F6` (Inactive states, deep backgrounds)
- **Foregrounds:**
  - `fg-base`: `oklch(0.2 0 0)` (Primary text, deep and clear)
  - `fg-muted`: `oklch(0.5 0 0)` (Secondary text, descriptions)
  - `fg-quiet`: `oklch(0.7 0 0)` (Placeholders, disabled text)
- **Accents (Stitch Blue/Google-inspired):**
  - `accent-primary`: `oklch(0.6 0.15 250)` (Soft Indigo/Blue for primary actions)
  - `accent-ai`: `linear-gradient(to right, oklch(0.6 0.15 250), oklch(0.7 0.15 320))` (Indigo to Rose gradient for AI features)

### 2. Typography (Structural-First)
- **Font Stack:** Geist Sans, Inter, system-ui, sans-serif.
- **Scale:**
  - `Display`: 48px / 1.1 (Quietly bold)
  - `Heading`: 24px / 1.3 (Medium weight)
  - `Body`: 16px / 1.6 (Normal weight, generous line height)
  - `Caption`: 14px / 1.5 (Clean and readable)

### 3. Spacing (Generous)
- **Unit:** 4px
- **Rules:** 
  - Use `32px` or `48px` for major section gaps.
  - Use `16px` for internal component padding.
  - Prioritize padding over borders to define structure.

### 4. Elevation (Structural)
- **Soft Shadow:** `0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)`
- **Floating:** `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`

## Component Patterns

### Buttons
- **Quiet:** Low-profile, no border, subtle background shift on hover.
- **High-Fidelity:** Primary buttons use soft shadows and refined border-radius (12px).

### Cards
- **Invisible:** No borders by default. Use background color shifts (`bg-subtle`) or very soft shadows to indicate groupings.

### Inputs
- **Airy:** No permanent heavy borders. Use a focus ring that glows softly when active.

### AI Indicators
- **Shimmer:** Use a subtle, slow-moving shimmer effect for loading/processing states.
- **Glassmorphism:** Use `backdrop-filter: blur()` for floating AI panels.
