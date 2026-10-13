# BuyTown — Design System & UI/UX Rules

This document establishes the official design system, visual specifications, and architectural rules for **BuyTown (Express Mall)**. Every screen, component, and user flow across the BuyTown application must strictly follow these rules to guarantee visual harmony, premium feel, and cross-platform perfection.

---

## 1. Brand Identity & Design Philosophy

BuyTown is a modern, high-speed, premium marketplace ("EXPRESS MALL") delivering millions of products with rapid delivery.
The visual language communicates:
- **Speed & Efficiency**: Clean geometries, pill badges, and compact metrics.
- **Vibrant Delight**: Warm coral/orange accents contrasted against energetic electric indigo (`#524DEB`).
- **Trust & Polish**: Generous whitespace, soft ambient elevations, translucent glass surfaces, and crisp typography.

---

## 2. Color Palette & Semantic Roles

All colors are exposed programmatically in [`src/constants/theme.ts`](file:///c:/Users/USER/Desktop/Fullstack%202026/BuyTown/src/constants/theme.ts).

### 2.1 Primary & Brand Colors
| Token | Hex | Role / Application |
|---|---|---|
| `Colors.primary` | `#524DEB` | Main CTAs, active indicators, brand logo backdrop, primary icon accents. |
| `Colors.primaryDark` | `#433DD8` | Button pressed / active states. |
| `Colors.primarySurface` | `#EEF0FF` | Light tinted badge backgrounds, active list selections. |
| `Colors.brandOrange` | `#F06A38` | Shopping bags, promotional highlights, flash sale accents. |
| `Colors.brandTeal` | `#0E9F6E` | Fast Drop metrics, authentic checkmarks, trust affirmations. |

### 2.2 Neutral & Surface Hierarchy
| Token | Hex | Role / Application |
|---|---|---|
| `Colors.background` | `#F9FAFC` | App root canvas background (soft off-white to prevent stark glare). |
| `Colors.cardBackground` | `#FFFFFF` | Floating hero cards, modal sheets, product cards. |
| `Colors.surfaceSubtle` | `#F1F3F7` | "Skip" buttons, inactive pill tags, secondary button fills. |
| `Colors.borderDefault` | `#E5E8EF` | Card outlines, metric vertical dividers, subtle separators. |

### 2.3 Typography Contrast & Text Colors
| Token | Hex | Role / Application |
|---|---|---|
| `Colors.textPrimary` | `#191D2D` | Headlines, stat numbers, button labels, high-emphasis text. |
| `Colors.textSecondary` | `#5E6778` | Subtitles, body copy, descriptions, explanatory paragraphs. |
| `Colors.textMuted` | `#8E98A8` | Eyebrow subtitles ("EXPRESS MALL"), timestamps, legal copy. |
| `Colors.textInverse` | `#FFFFFF` | Text on primary buttons and dark surfaces. |

---

## 3. Typography System

BuyTown uses modern, crisp sans-serif typography with calibrated line heights to prevent text cramping.

### 3.1 Type Scale
- **Display / Hero Titles**: `23px - 26px`, Weight: `700` (Bold), Line Height: `30px - 34px`.
- **Screen Section Titles**: `18px - 20px`, Weight: `700` (Bold), Line Height: `26px`.
- **Body / Descriptive**: `14px - 15px`, Weight: `400` (Regular), Line Height: `22px`.
- **Button Labels**: `16px - 17px`, Weight: `600` / `700` (SemiBold / Bold).
- **Stat Values**: `17px - 18px`, Weight: `700` (Bold).
- **Badges & Tags**: `12.5px - 13.5px`, Weight: `600` (SemiBold).
- **Eyebrows / Caps**: `11px`, Weight: `700` (Bold), Letter Spacing: `1.0px` (Uppercase).
- **Legal / Disclaimers**: `12px - 13px`, Weight: `400` (Regular), Line Height: `18px`.

---

## 4. Spacing, Radii & Grid System

### 4.1 Spacing Standard (4px / 8px Grid)
- Screen horizontal gutter: `20px` (`Spacing['2xl']`).
- Content stack spacing: `12px`, `16px`, `24px`.
- Minimum tappable target height: `48px` (Buttons: `52px - 56px`).

### 4.2 Border Radii
- **Pills**: `9999px` (Badges, buttons, pagination capsule, "Skip" button).
- **Hero Graphic Container**: `28px - 30px`.
- **Product & Surface Cards**: `20px - 24px`.
- **Metrics Bar**: `18px - 20px`.
- **Brand Logo Icon Box**: `13px - 14px`.

---

## 5. Component Patterns & Rules

### 5.1 App Header
- Left: App icon container (42x42px, radius 13px, `#524DEB` with white shopping bag icon), followed by a 2-line title:
  - Top: "BuyTown" (18px, bold, `#191D2D`)
  - Bottom: "EXPRESS MALL" (11px, bold, uppercase, `#8E98A8`, letterSpacing: 0.8)
- Right: "Skip" action pill (`backgroundColor: '#F1F3F7'`, border radius `20px`, padding: `7px 18px`).

### 5.2 Hero Graphic & 3D Imagery Card
- Rounded container (`borderRadius: 28px`) with subtle elevation.
- High-fidelity 3D render displaying floating orange branded shopping bags filled with luxury/lifestyle products (smartphones, sneakers, watches, cameras) on a warm peach background with confetti.
- Floating overlay badges pinned inside the card:
  - Top-left: White pill with blue dot `•` + "Flash Sale 50% Off".
  - Top-right: White pill with green checkmark shield + "100% Authentic".

### 5.3 Integrated Metrics Bar
- Docked at the bottom of the hero card with glass/white background (`borderRadius: 18px`).
- Divided into 3 equal data columns with subtle vertical borders:
  1. `2M+` (`#524DEB`) / `Products`
  2. `30 Min` (`#0E9F6E`) / `Fast Drop`
  3. `4.9 ★` (`#191D2D`) / `Satisfaction`

### 5.4 Pagination Carousel Indicators
- Centered between the hero graphic and headline.
- Active slide: Elongated pill (`width: 24px`, `height: 6px`, `borderRadius: 3px`, color `#524DEB`).
- Inactive slides: Circular dots (`width: 6px`, `height: 6px`, `borderRadius: 3px`, color `#DCE1EB`).

### 5.5 Feature / Trust Badges
- Displayed in centered flex-wrap rows:
  - Row 1: `Fast Delivery` (truck icon) & `Secure Payment` (shield icon).
  - Row 2: `Verified Sellers` (verified badge icon).
- Background: Soft pill `#F1F3F8`, text color `#222838`, font size `13.5px`, semi-bold.

### 5.6 Call to Action (CTA) Hierarchy
1. **Primary Button**:
   - Label: "Get Started →"
   - Background: `#524DEB` with soft ambient drop-shadow (`shadowColor: '#524DEB'`, `shadowOpacity: 0.35`, `shadowRadius: 16`).
   - Full pill radius (`borderRadius: 27px`), height `54px`.
2. **Secondary Button**:
   - Label: "I already have an account"
   - Background: Soft neutral `#ECEFF4`, no border.
   - Full pill radius (`borderRadius: 26px`), height `52px`.

### 5.7 Legal Disclaimer
- Centered at the bottom with high readability.
- "By proceeding, you accept our [Terms] and [Privacy Policy]."
- Links underlined and styled with active press feedback.

---

## 6. Accessibility & Motion Guidelines

- **Touch Targets**: Minimum 44x44px for all interactables.
- **Contrast**: All text satisfies WCAG AA (minimum 4.5:1 against respective backgrounds).
- **Haptics & Feedback**:
  - Buttons use subtle opacity reduction (`activeOpacity={0.85}`) and smooth scaling.
  - Page transitions follow standard Expo Router native slide/fade patterns.
