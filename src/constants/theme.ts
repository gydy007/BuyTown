/**
 * BuyTown Design System Tokens & Guidelines
 * 
 * Central source of truth for visual identity, metrics, typography,
 * color tokens, spacing, elevations, and design standards across BuyTown.
 */

export const Colors = {
  // Brand Core Colors
  primary: '#524DEB',
  primaryDark: '#433DD8',
  primaryLight: '#716DF2',
  primarySurface: '#EEF0FF',
  primaryGradient: ['#5A55F5', '#4942E5'] as const,

  // Accent & E-Commerce Highlights
  brandOrange: '#F06A38',
  brandOrangeDark: '#D85422',
  brandOrangeLight: '#FFF2EB',
  brandOrangeGradient: ['#FF723B', '#EA551E'] as const,
  
  brandTeal: '#0E9F6E',
  brandTealDark: '#047857',
  brandTealLight: '#E8F8F3',

  brandCyan: '#0EA5E9',
  brandAmber: '#F59E0B',

  // Form & Input Specific
  inputBackground: '#FBFBFE',
  inputBorder: '#DCE1EB',
  inputBorderFocus: '#524DEB',
  inputPlaceholder: '#94A0B4',

  // Biometrics & Special Surfaces
  biometricCardBg: '#F3FAF9',
  biometricCardBorder: '#E0F2EF',
  biometricIconBg: '#D1F5ED',
  biometricTeal: '#0E9F6E',
  biometricPillBg: '#70E3D3',
  biometricPillText: '#0A4F46',

  // Social Auth & Status
  socialButtonBg: '#FFFFFF',
  socialButtonBorder: '#E4E7EE',
  statusVerified: '#524DEB',
  statusError: '#EF4444',
  statusSuccess: '#10B981',

  // Surface & Canvas Backgrounds
  background: '#F9FAFC',
  cardBackground: '#FFFFFF',
  surfaceCardMuted: '#F4F5F9',
  surfaceSubtle: '#F1F3F7',
  surfaceGhost: '#ECEFF4',
  surfaceWhite: '#FFFFFF',

  // Borders & Dividers
  borderSubtle: '#F0F2F6',
  borderDefault: '#E5E8EF',
  borderStrong: '#D1D7E4',
  divider: '#ECEFF4',

  // Text Hierarchy
  textPrimary: '#191D2D',      // Main headlines, high-emphasis text
  textSecondary: '#5E6778',    // Paragraphs, descriptions, body text
  textMuted: '#8E98A8',        // Metadata, labels, inactive indicators
  textInverse: '#FFFFFF',      // White text on dark/primary backgrounds
  textBrandOrange: '#DE5720',  // Special promo text

  // Metric & Stat Specific
  metricProducts: '#524DEB',
  metricDelivery: '#0E9F6E',
  metricSatisfaction: '#191D2D',

  // Feature Badges
  badgeBackground: '#F1F3F8',
  badgeText: '#222838',
  badgeBorder: 'rgba(226, 232, 240, 0.6)',

  // Overlays & Translucency
  overlayGlass: 'rgba(255, 255, 255, 0.92)',
  overlayGlassBorder: 'rgba(255, 255, 255, 0.65)',
  overlayDark: 'rgba(0, 0, 0, 0.45)',
} as const;

export const Typography = {
  fontFamilies: {
    sans: 'System',
    heading: 'System',
    rounded: 'System',
  },
  fontSizes: {
    xs: 11,
    sm: 12.5,
    base: 14,
    md: 15,
    lg: 16.5,
    xl: 18,
    '2xl': 20,
    '3xl': 23,
    '4xl': 28,
  },
  fontWeights: {
    regular: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
    extraBold: '800' as const,
  },
  lineHeights: {
    tight: 16,
    normal: 20,
    relaxed: 22,
    heading: 30,
    display: 34,
  },
  letterSpacings: {
    tighter: -0.5,
    tight: -0.2,
    normal: 0,
    wide: 0.5,
    wider: 1.0,
    widest: 1.5,
  },
} as const;

export const Spacing = {
  '2xs': 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
  '5xl': 40,
  '6xl': 48,
} as const;

export const BorderRadius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  hero: 30,
  pill: 9999,
} as const;

export const Shadows = {
  subtle: {
    shadowColor: '#1A1D2E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  card: {
    shadowColor: '#1A1D2E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  floatingTag: {
    shadowColor: '#1A1D2E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  primaryButton: {
    shadowColor: '#524DEB',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 7,
  },
  statsBar: {
    shadowColor: '#3A4259',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.07,
    shadowRadius: 14,
    elevation: 4,
  },
} as const;

export const Layout = {
  screenPaddingHorizontal: 20,
  maxContentWidth: 480,
  buttonHeight: 54,
  buttonHeightSecondary: 52,
  headerHeight: 52,
} as const;

export const Theme = {
  colors: Colors,
  typography: Typography,
  spacing: Spacing,
  borderRadius: BorderRadius,
  shadows: Shadows,
  layout: Layout,
} as const;

export default Theme;
