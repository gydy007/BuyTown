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

---

## 7. Authentication & Form Patterns

### 7.1 Logo Header Variants
- **Signup Header**:
  - 56x56px rounded square badge (`borderRadius: 18px`), royal purple gradient (`#5A55F5` to `#4942E5`) with white shopping bag icon.
  - Eyebrow pill: `#EEF0FF` with purple shopping bag icon + `WELCOME TO BUYTOWN`.
  - Title: `Create Your Account` (`23.5px`, bold, `#191D2D`).
- **Login Header**:
  - 56x56px rounded square badge (`borderRadius: 18px`), vibrant coral/orange gradient (`#FF723B` to `#EA551E`) with white shopping bag icon.
  - Bottom-right pinned badge: 22x22px circular `#524DEB` with white lightning bolt ⚡.
  - Eyebrow pill: `#EEF0FF` with blue dot + `FAST CHECKOUT READY`.
  - Title: `Welcome Back!` (`23.5px`, bold, `#191D2D`).

### 7.2 Form Inputs & Controls
- **Input Fields**:
  - Height: `50px`, `borderRadius: 14px`, `backgroundColor: '#FBFBFE'`, `borderWidth: 1px`, `borderColor: '#DCE1EB'`.
  - Leading outline icons (User, Mail, Lock) in `#8E98A8`.
  - Trailing action icons (Eye toggle, Clear input).
- **Split Phone Input**:
  - Country code capsule: `108px` wide, `#F4F5F9`, `borderRadius: 14px`, text `NG +234` + chevron icon.
  - Phone text field: flex 1, numeric keypad.
- **Password Strength Indicator**:
  - 4-segment horizontal bar (`height: 4px`, `borderRadius: 2px`, `backgroundColor: '#E5E9F2'`).
  - Active filled segments in brand primary `#524DEB`.
- **Checkboxes**:
  - Square checkbox (`19x19px`, `borderRadius: 5px`, `borderColor: '#CED5E3'`).
  - Checked state: solid `#524DEB` with crisp white checkmark.

### 7.3 Social Authentication & Biometrics
- **Social Auth Row**:
  - Google & Apple capsule buttons (`height: 48px`, `borderRadius: 24px`, `#FFFFFF` with `1px #E4E7EE` border).
  - Authentic brand icons (Google multi-color/red `G`, Apple black silhouette).
- **Dedicated Biometric Login Card**:
  - Background `#F3FAF9`, border `#E0F2EF`, `borderRadius: 18px`, padding `12px`.
  - Left: Mint badge (`#D1F5ED`) with emerald fingerprint icon (`#0E9F6E`) + descriptive copy.
  - Right: Mint action pill (`#70E3D3`) with dark teal text `Use` + signal wave icon.
- **Security Assurance**:
  - Padlock icon + `256-bit Bank Grade Security & Encryption` in `#788497`.

---

## 8. Account & Profile Screen Patterns

### 8.1 Header & Quick Search Bar
- **Header Bar**:
  - Left: 38x38px rounded square logo badge with white shopping bag + "BuyTown" and eyebrow "ACCOUNT".
  - Right: Search icon button (`search-outline`, 21px) + 34x34px circular avatar with thin white border.
- **Search Capsule Bar**:
  - Height: `46px`, `borderRadius: 23px`, `backgroundColor: '#F1F3F7'`, border: `1px solid #E5E8EF`.
  - Leading search icon, trailing microphone icon.

### 8.2 User Profile Card & Wallet Strip
- **Profile Summary**:
  - Circular avatar (56x56px) with pinned green verified checkmark badge (`#059669`, 18x18px).
  - Title with VIP badge ("Welcome Gideon!" + `#EEF0FF` / `#524DEB` VIP pill).
  - Subtitle: User email in primary electric indigo (`#524DEB`).
- **Wallet Status Sub-Card**:
  - Soft sand/gray container (`#F3F5F8`, `borderRadius: 14px`, padding `10px 12px`).
  - Left: Mint icon box (`#D1F5ED`) with teal wallet icon (`#0E9F6E`) + wallet status message.
  - Right: "Reconnect" action capsule (`#E2E6EE`, text `#1F2937`).
- **Primary Support Channels**:
  - Live Chat pill: Full width, height `44px`, royal indigo `#524DEB` with chat bubbles icon.
  - WhatsApp pill: Full width, height `44px`, deep WhatsApp green `#0B6B56` with WhatsApp icon.

### 8.3 Grouped Navigation Cards & Badges
- **Section Headers**: Uppercase, `11px`, bold, `#6B7280`, `letterSpacing: 0.8px` ("NEED ASSISTANCE?", "MY BUYTOWN ACCOUNT", "MY SETTINGS").
- **Card Containers**: White card, `borderRadius: 20px`, border `1px solid #EEF1F6` with subtle ambient shadow.
- **List Items**:
  - Circular 34x34px light gray icon container (`#F4F5F9`) with 18px icons in `#191D2D`.
  - Destructive action ("Close Account"): Soft red circular icon container (`#FEE2E2`) with `#DC2626` text.
  - Trailing badges:
    - Orders: "2 Active" (`#ECEFF4` / `#4B5563`).
    - Inbox: Circular purple count "2" (`#524DEB` / `#FFFFFF`).
    - Vouchers: "3 available" (`#A7F3D0` / `#065F46`).
    - Standard chevron forward (`#8E98A8`, 16px).

### 8.4 Bottom Tab Navigation
- Fixed 4-tab docked bar (`height: 60px`, white background, `1px solid #EAECEF` top border):
  - Home, Categories, Cart, Account.
  - Active tab styled with vibrant electric indigo `#524DEB` icon and label.


