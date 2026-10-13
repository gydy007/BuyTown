import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors, Shadows } from '@/constants/theme';
import { SocialAuthButtons } from '@/components/SocialAuthButtons';

export default function LoginScreen() {
  const [identifier, setIdentifier] = useState('umbugadugideon13@gmail.com');
  const [password, setPassword] = useState('SecretPass1234');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);

  const handleSignIn = () => {
    router.push('/home');
  };

  const handleClearIdentifier = () => {
    setIdentifier('');
  };

  const handleForgotPassword = () => {
    Alert.alert('Reset Password', 'A reset link has been dispatched to your email/mobile.');
  };

  const handleBiometricAuth = () => {
    Alert.alert('Biometric Login', 'Biometric authentication triggered. Authenticating with Touch/Face ID...');
  };

  const handleNavigateSignup = () => {
    router.push('/signup');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* HEADER / BRANDING */}
          <View style={styles.header}>
            {/* Logo Badge with Orange Gradient & Lightning Pin */}
            <View style={styles.logoBadgeWrapper}>
              <LinearGradient
                colors={Colors.brandOrangeGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.logoBadge}
              >
                <Ionicons name="bag-handle" size={27} color={Colors.textInverse} />
              </LinearGradient>

              {/* Lightning Bolt Pinned Badge */}
              <View style={styles.lightningBadge}>
                <Ionicons name="flash" size={11} color="#FFFFFF" />
              </View>
            </View>

            {/* Fast Checkout Ready Pill Tag */}
            <View style={styles.checkoutPill}>
              <View style={styles.blueDot} />
              <Text style={styles.checkoutPillText}>FAST CHECKOUT READY</Text>
            </View>

            {/* Title & Subtitle */}
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>
              Sign in to access your orders, wishlist, and exclusive vouchers.
            </Text>
          </View>

          {/* MAIN FORM CARD */}
          <View style={styles.formCard}>
            {/* Field 1: Email or Mobile Number */}
            <View style={styles.fieldGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Email or Mobile Number</Text>
                <View style={styles.verifiedBadge}>
                  <Ionicons
                    name="shield-checkmark"
                    size={13}
                    color={Colors.primary}
                    style={styles.verifiedIcon}
                  />
                  <Text style={styles.verifiedText}>Verified</Text>
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Feather name="mail" size={18} color="#8E98A8" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="umbugadugideon13@gmail.com"
                  placeholderTextColor={Colors.inputPlaceholder}
                  value={identifier}
                  onChangeText={setIdentifier}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {identifier.length > 0 && (
                  <TouchableOpacity
                    onPress={handleClearIdentifier}
                    activeOpacity={0.7}
                    style={styles.clearIconButton}
                    accessibilityRole="button"
                    accessibilityLabel="Clear input"
                  >
                    <Ionicons name="close-circle-outline" size={18} color="#8E98A8" />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Field 2: Password */}
            <View style={styles.fieldGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Password</Text>
                <TouchableOpacity onPress={handleForgotPassword} activeOpacity={0.7}>
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <Feather name="lock" size={18} color="#8E98A8" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="••••••••••••••"
                  placeholderTextColor={Colors.inputPlaceholder}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  activeOpacity={0.7}
                  style={styles.eyeIconButton}
                  accessibilityRole="button"
                  accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
                >
                  <Feather
                    name={showPassword ? 'eye' : 'eye-off'}
                    size={18}
                    color="#8E98A8"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Keep Me Signed In & Face ID Row */}
            <View style={styles.optionsRow}>
              {/* Checkbox */}
              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() => setKeepSignedIn(!keepSignedIn)}
                activeOpacity={0.8}
              >
                <View style={[styles.checkbox, keepSignedIn && styles.checkboxChecked]}>
                  {keepSignedIn && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
                </View>
                <Text style={styles.keepSignedInText}>Keep me signed in</Text>
              </TouchableOpacity>

              {/* Face ID Capsule */}
              <TouchableOpacity
                style={styles.faceIdCapsule}
                onPress={handleBiometricAuth}
                activeOpacity={0.75}
                accessibilityRole="button"
                accessibilityLabel="Sign in with Face ID"
              >
                <Ionicons name="happy-outline" size={16} color={Colors.primary} style={styles.faceIdIcon} />
                <Text style={styles.faceIdText}>Face ID</Text>
              </TouchableOpacity>
            </View>

            {/* Primary Action Button */}
            <TouchableOpacity
              onPress={handleSignIn}
              activeOpacity={0.88}
              style={styles.submitButtonTouchable}
              accessibilityRole="button"
              accessibilityLabel="Sign In"
            >
              <LinearGradient
                colors={Colors.primaryGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.submitButtonGradient}
              >
                <Text style={styles.submitButtonText}>Sign In</Text>
                <Ionicons name="arrow-forward" size={18} color="#FFFFFF" style={styles.buttonArrowIcon} />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* DIVIDER */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* SOCIAL BUTTONS */}
          <SocialAuthButtons />

          {/* BIOMETRIC QUICK LOGIN CARD */}
          <TouchableOpacity
            style={styles.biometricCard}
            onPress={handleBiometricAuth}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Instant Touch or Face Sign In"
          >
            <View style={styles.biometricLeft}>
              <View style={styles.biometricIconBadge}>
                <Ionicons name="finger-print" size={22} color={Colors.biometricTeal} />
              </View>
              <View style={styles.biometricTextContainer}>
                <Text style={styles.biometricTitle}>Instant Touch / Face Sign In</Text>
                <Text style={styles.biometricSubtitle}>
                  Skip passwords safely on this device
                </Text>
              </View>
            </View>

            <View style={styles.biometricPillButton}>
              <Text style={styles.biometricPillText}>Use</Text>
              <Ionicons name="radio-outline" size={13} color={Colors.biometricPillText} />
            </View>
          </TouchableOpacity>

          {/* FOOTER & SECURITY ASSURANCE */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              {"Don't have an account? "}
              <Text style={styles.footerHighlightLink} onPress={handleNavigateSignup}>
                Sign Up
              </Text>
            </Text>

            <View style={styles.securityRow}>
              <Feather name="lock" size={12} color="#788497" style={styles.securityIcon} />
              <Text style={styles.securityText}>
                256-bit Bank Grade Security & Encryption
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 14 : 8,
    paddingBottom: 28,
    maxWidth: 520,
    alignSelf: 'center',
    width: '100%',
  },

  /* HEADER */
  header: {
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 14,
  },
  logoBadgeWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  logoBadge: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.subtle,
  },
  lightningBadge: {
    position: 'absolute',
    bottom: -3,
    right: -3,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.primary,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutPill: {
    backgroundColor: Colors.primarySurface,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  blueDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    marginRight: 6,
  },
  checkoutPillText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 23.5,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 13.5,
    fontWeight: '400',
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 19,
    paddingHorizontal: 16,
  },

  /* FORM CARD */
  formCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#EEF1F6',
    ...Shadows.card,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 7,
  },
  label: {
    fontSize: 13.5,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedIcon: {
    marginRight: 3,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
  },
  forgotPasswordText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: Colors.primary,
  },
  inputContainer: {
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    backgroundColor: Colors.inputBackground,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    height: '100%',
    fontSize: 14.5,
    color: Colors.textPrimary,
    padding: 0,
  },
  clearIconButton: {
    padding: 6,
    marginRight: -4,
  },
  eyeIconButton: {
    padding: 6,
    marginRight: -4,
  },

  /* OPTIONS ROW */
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: 8,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 19,
    height: 19,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#CED5E3',
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  keepSignedInText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  faceIdCapsule: {
    backgroundColor: '#F4F5F9',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E6E9F0',
  },
  faceIdIcon: {
    marginRight: 5,
  },
  faceIdText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: Colors.textPrimary,
  },

  /* SUBMIT BUTTON */
  submitButtonTouchable: {
    borderRadius: 26,
    marginTop: 14,
    ...Shadows.primaryButton,
  },
  submitButtonGradient: {
    height: 52,
    borderRadius: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  buttonArrowIcon: {
    marginLeft: 8,
  },

  /* DIVIDER */
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E8EF',
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 0.8,
  },

  /* BIOMETRIC CARD */
  biometricCard: {
    backgroundColor: Colors.biometricCardBg,
    borderWidth: 1,
    borderColor: Colors.biometricCardBorder,
    borderRadius: 18,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  biometricLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  biometricIconBadge: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: Colors.biometricIconBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  biometricTextContainer: {
    flex: 1,
  },
  biometricTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  biometricSubtitle: {
    fontSize: 11.5,
    fontWeight: '400',
    color: '#748094',
    marginTop: 2,
  },
  biometricPillButton: {
    backgroundColor: Colors.biometricPillBg,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  biometricPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.biometricPillText,
    marginRight: 4,
  },

  /* FOOTER */
  footerContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 13.5,
    color: Colors.textSecondary,
  },
  footerHighlightLink: {
    fontWeight: '700',
    color: Colors.primary,
  },
  securityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  securityIcon: {
    marginRight: 5,
  },
  securityText: {
    fontSize: 11.5,
    fontWeight: '500',
    color: '#788497',
  },
});
