import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors, Shadows } from '@/constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function GetStartedScreen() {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleGetStarted = () => {
    router.push('/signup');
  };

  const handleSignIn = () => {
    router.push('/login');
  };

  const handleSkip = () => {
    router.push('/login');
  };

  const handleOpenTerms = () => {
    Alert.alert('Terms of Service', 'BuyTown Terms and Conditions.');
  };

  const handleOpenPrivacy = () => {
    Alert.alert('Privacy Policy', 'BuyTown Privacy Policy & Data Protection.');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* TOP HEADER */}
        <View style={styles.header}>
          <View style={styles.logoRow}>
            {/* Logo Icon Badge */}
            <LinearGradient
              colors={Colors.primaryGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.logoBadge}
            >
              <Ionicons name="bag-handle" size={21} color={Colors.textInverse} />
            </LinearGradient>

            {/* Logo Text */}
            <View style={styles.logoTextContainer}>
              <Text style={styles.brandTitle}>BuyTown</Text>
              <Text style={styles.brandSubtitle}>EXPRESS MALL</Text>
            </View>
          </View>

          {/* Skip Button */}
          <TouchableOpacity
            style={styles.skipButton}
            onPress={handleSkip}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Skip intro"
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* HERO GRAPHIC CARD WITH 3D IMAGE */}
        <View style={styles.heroCardContainer}>
          {/* Main Card with Background & Glow */}
          <View style={styles.heroCard}>
            {/* 3D Promotional Render */}
            <Image
              source={require('@/assets/images/get-started-hero.jpg')}
              style={styles.heroImage}
              resizeMode="cover"
            />

            {/* Ambient Bottom Glow Gradient for Seamless Depth */}
            <LinearGradient
              colors={['transparent', 'rgba(167, 243, 208, 0.25)', 'rgba(255, 255, 255, 0.95)']}
              style={styles.heroGradientBottom}
            />

            {/* Floating Badge 1: Flash Sale (Top-Left) */}
            <View style={[styles.floatingTag, styles.floatingTagLeft]}>
              <View style={styles.blueDot} />
              <Text style={styles.floatingTagText}>Flash Sale 50% Off</Text>
            </View>

            {/* Floating Badge 2: 100% Authentic (Top-Right) */}
            <View style={[styles.floatingTag, styles.floatingTagRight]}>
              <Ionicons name="checkmark-circle" size={17} color={Colors.metricDelivery} style={styles.tagIcon} />
              <Text style={styles.floatingTagText}>100% Authentic</Text>
            </View>

            {/* INTEGRATED METRICS / STATS BAR */}
            <View style={styles.statsBar}>
              {/* Metric 1 */}
              <View style={styles.statColumn}>
                <Text style={styles.statNumberProducts}>2M+</Text>
                <Text style={styles.statLabel}>Products</Text>
              </View>

              <View style={styles.statDivider} />

              {/* Metric 2 */}
              <View style={styles.statColumn}>
                <Text style={styles.statNumberDrop}>30 Min</Text>
                <Text style={styles.statLabel}>Fast Drop</Text>
              </View>

              <View style={styles.statDivider} />

              {/* Metric 3 */}
              <View style={styles.statColumn}>
                <View style={styles.ratingRow}>
                  <Text style={styles.statNumberRating}>4.9</Text>
                  <Ionicons name="star" size={13} color={Colors.metricSatisfaction} style={styles.starIcon} />
                </View>
                <Text style={styles.statLabel}>Satisfaction</Text>
              </View>
            </View>
          </View>
        </View>

        {/* PAGINATION DOTS INDICATOR */}
        <View style={styles.paginationContainer}>
          {[0, 1, 2].map((index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setActiveSlide(index)}
              activeOpacity={0.8}
              style={[styles.dot, activeSlide === index && styles.activeDot]}
              accessibilityRole="button"
              accessibilityLabel={`Slide ${index + 1}`}
            />
          ))}
        </View>

        {/* HEADLINES & DESCRIPTIVE COPY */}
        <View style={styles.textSection}>
          <Text style={styles.mainTitle}>Shop Everything You Love in One Town</Text>
          <Text style={styles.mainDescription}>
            Discover millions of quality products, fast delivery right to your door, and incredible everyday discounts.
          </Text>
        </View>

        {/* TRUST & FEATURE BADGES */}
        <View style={styles.badgesContainer}>
          {/* Row 1 */}
          <View style={styles.badgeRow}>
            <View style={styles.featureBadge}>
              <MaterialCommunityIcons name="truck-fast" size={17} color={Colors.primary} style={styles.badgeIcon} />
              <Text style={styles.badgeLabel}>Fast Delivery</Text>
            </View>

            <View style={styles.featureBadge}>
              <MaterialCommunityIcons name="shield-check" size={17} color={Colors.metricDelivery} style={styles.badgeIcon} />
              <Text style={styles.badgeLabel}>Secure Payment</Text>
            </View>
          </View>

          {/* Row 2 */}
          <View style={styles.badgeRow}>
            <View style={styles.featureBadge}>
              <MaterialCommunityIcons name="check-decagram" size={17} color={Colors.primary} style={styles.badgeIcon} />
              <Text style={styles.badgeLabel}>Verified Sellers</Text>
            </View>
          </View>
        </View>

        {/* ACTION BUTTONS (CTAs) */}
        <View style={styles.actionSection}>
          {/* Primary CTA: Get Started */}
          <TouchableOpacity
            onPress={handleGetStarted}
            activeOpacity={0.88}
            style={styles.primaryButtonTouchable}
            accessibilityRole="button"
            accessibilityLabel="Get Started"
          >
            <LinearGradient
              colors={Colors.primaryGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.primaryButtonGradient}
            >
              <Text style={styles.primaryButtonText}>Get Started</Text>
              <Ionicons name="arrow-forward" size={18} color={Colors.textInverse} style={styles.arrowIcon} />
            </LinearGradient>
          </TouchableOpacity>

          {/* Secondary CTA: I already have an account */}
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleSignIn}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="I already have an account"
          >
            <Text style={styles.secondaryButtonText}>I already have an account</Text>
          </TouchableOpacity>
        </View>

        {/* FOOTER DISCLAIMER */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            By proceeding, you accept our{' '}
            <Text style={styles.footerLink} onPress={handleOpenTerms}>
              Terms
            </Text>{' '}
            and{' '}
            <Text style={styles.footerLink} onPress={handleOpenPrivacy}>
              Privacy Policy
            </Text>
            .
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 12 : 6,
    paddingBottom: 20,
    maxWidth: 520,
    alignSelf: 'center',
    width: '100%',
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 2,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBadge: {
    width: 42,
    height: 42,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.subtle,
  },
  logoTextContainer: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: -0.2,
  },
  brandSubtitle: {
    fontSize: 10.5,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 0.9,
    marginTop: 1,
  },
  skipButton: {
    backgroundColor: Colors.surfaceSubtle,
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E6E9F0',
  },
  skipText: {
    fontSize: 13.5,
    fontWeight: '500',
    color: Colors.textSecondary,
  },

  /* HERO CARD */
  heroCardContainer: {
    marginBottom: 16,
    ...Shadows.card,
  },
  heroCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ECF0F7',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: SCREEN_WIDTH > 400 ? 275 : 255,
  },
  heroGradientBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 70,
  },

  /* FLOATING TAGS INSIDE HERO */
  floatingTag: {
    position: 'absolute',
    top: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(235, 240, 248, 0.9)',
    ...Shadows.floatingTag,
  },
  floatingTagLeft: {
    left: 14,
  },
  floatingTagRight: {
    right: 14,
  },
  blueDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: Colors.primary,
    marginRight: 6,
  },
  tagIcon: {
    marginRight: 5,
  },
  floatingTagText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: Colors.textPrimary,
  },

  /* METRICS BAR */
  statsBar: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(235, 240, 248, 0.95)',
    ...Shadows.statsBar,
  },
  statColumn: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#ECEEF3',
  },
  statNumberProducts: {
    fontSize: 16.5,
    fontWeight: '700',
    color: Colors.metricProducts,
  },
  statNumberDrop: {
    fontSize: 16.5,
    fontWeight: '700',
    color: Colors.metricDelivery,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statNumberRating: {
    fontSize: 16.5,
    fontWeight: '700',
    color: Colors.metricSatisfaction,
  },
  starIcon: {
    marginLeft: 3,
    marginTop: -1,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.textMuted,
    marginTop: 2,
  },

  /* PAGINATION DOTS */
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 14,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#DCE1EB',
    marginHorizontal: 3.5,
  },
  activeDot: {
    width: 24,
    backgroundColor: Colors.primary,
  },

  /* HEADLINES */
  textSection: {
    alignItems: 'center',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 29,
  },
  mainDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 21,
    marginTop: 8,
    paddingHorizontal: 6,
  },

  /* FEATURE BADGES */
  badgesContainer: {
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  featureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.badgeBackground,
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(230, 235, 245, 0.6)',
  },
  badgeIcon: {
    marginRight: 6,
  },
  badgeLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#212737',
  },

  /* ACTION BUTTONS */
  actionSection: {
    marginBottom: 12,
  },
  primaryButtonTouchable: {
    borderRadius: 27,
    ...Shadows.primaryButton,
  },
  primaryButtonGradient: {
    height: 54,
    borderRadius: 27,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontSize: 16.5,
    fontWeight: '700',
    color: Colors.textInverse,
  },
  arrowIcon: {
    marginLeft: 8,
  },
  secondaryButton: {
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.surfaceGhost,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  secondaryButtonText: {
    fontSize: 15.5,
    fontWeight: '600',
    color: '#282F3F',
  },

  /* FOOTER */
  footerContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 4,
  },
  footerText: {
    fontSize: 12.5,
    fontWeight: '400',
    color: '#6E778B',
    textAlign: 'center',
    lineHeight: 18,
  },
  footerLink: {
    fontWeight: '500',
    color: Colors.textPrimary,
    textDecorationLine: 'underline',
  },
});
