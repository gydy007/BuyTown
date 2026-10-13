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

export default function SignupScreen() {
  const [fullName, setFullName] = useState('Gideon Umbugadu');
  const [email, setEmail] = useState('gideon@example.com');
  const [phone, setPhone] = useState('8012345678');
  const [countryCode, setCountryCode] = useState('NG +234');
  const [password, setPassword] = useState('Password123');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(true);

  // Password strength calculation (0 to 4 bars)
  const getPasswordStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return Math.max(score, 1);
  };

  const strengthScore = getPasswordStrength();

  const handleCreateAccount = () => {
    if (!agreeTerms) {
      Alert.alert('Terms Required', 'Please accept the Terms of Service and Privacy Policy to continue.');
      return;
    }
    router.push('/account');
  };

  const handleCountryPress = () => {
    Alert.alert('Select Country', 'Currently set to Nigeria (NG +234). More regions available soon.', [
      { text: 'NG +234', onPress: () => setCountryCode('NG +234') },
      { text: 'US +1', onPress: () => setCountryCode('US +1') },
      { text: 'UK +44', onPress: () => setCountryCode('UK +44') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleOpenTerms = () => {
    Alert.alert('Terms of Service', 'BuyTown Terms of Service and Customer Agreements.');
  };

  const handleOpenPrivacy = () => {
    Alert.alert('Privacy Policy', 'BuyTown Customer Data Protection & Privacy Notice.');
  };

  const handleNavigateLogin = () => {
    router.push('/login');
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
            {/* Logo Badge */}
            <View style={styles.logoBadgeContainer}>
              <LinearGradient
                colors={Colors.primaryGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.logoBadge}
              >
                <Ionicons name="bag-handle" size={27} color={Colors.textInverse} />
              </LinearGradient>
            </View>

            {/* Welcome Pill Tag */}
            <View style={styles.welcomePill}>
              <Ionicons name="bag-handle" size={12} color={Colors.primary} style={styles.welcomePillIcon} />
              <Text style={styles.welcomePillText}>WELCOME TO BUYTOWN</Text>
            </View>

            {/* Title & Subtitle */}
            <Text style={styles.title}>Create Your Account</Text>
            <Text style={styles.subtitle}>
              Join BuyTown to unlock personalized shopping and exclusive deals
            </Text>
          </View>

          {/* MAIN FORM CARD */}
          <View style={styles.formCard}>
            {/* Field 1: Full Name */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>
                Full Name <Text style={styles.requiredAsterisk}>*</Text>
              </Text>
              <View style={styles.inputContainer}>
                <Feather name="user" size={18} color="#8E98A8" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Gideon Umbugadu"
                  placeholderTextColor={Colors.inputPlaceholder}
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* Field 2: Email Address */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>
                Email Address <Text style={styles.requiredAsterisk}>*</Text>
              </Text>
              <View style={styles.inputContainer}>
                <Feather name="mail" size={18} color="#8E98A8" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="gideon@example.com"
                  placeholderTextColor={Colors.inputPlaceholder}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Field 3: Phone Number */}
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>
                Phone Number <Text style={styles.requiredAsterisk}>*</Text>
              </Text>
              <View style={styles.phoneRow}>
                {/* Country Code Capsule */}
                <TouchableOpacity
                  style={styles.countryPicker}
                  onPress={handleCountryPress}
                  activeOpacity={0.7}
                  accessibilityRole="button"
                  accessibilityLabel="Select country code"
                >
                  <Text style={styles.countryText}>{countryCode}</Text>
                  <Ionicons name="chevron-down" size={14} color="#8E98A8" />
                </TouchableOpacity>

                {/* Phone Input */}
                <View style={[styles.inputContainer, styles.phoneInputContainer]}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="8012345678"
                    placeholderTextColor={Colors.inputPlaceholder}
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>
            </View>

            {/* Field 4: Password */}
            <View style={styles.fieldGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>
                  Password <Text style={styles.requiredAsterisk}>*</Text>
                </Text>
                <Text style={styles.helperText}>Minimum 8 characters</Text>
              </View>

              <View style={styles.inputContainer}>
                <Feather name="lock" size={18} color="#8E98A8" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="••••••••"
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

              {/* Password Strength Indicator Bars */}
              <View style={styles.strengthBarRow}>
                {[1, 2, 3, 4].map((index) => {
                  const isFilled = index <= strengthScore;
                  return (
                    <View
                      key={index}
                      style={[
                        styles.strengthSegment,
                        isFilled && styles.strengthSegmentFilled,
                      ]}
                    />
                  );
                })}
              </View>
            </View>

            {/* Checkbox 1: Terms Agreement */}
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setAgreeTerms(!agreeTerms)}
              activeOpacity={0.8}
            >
              <View style={[styles.checkbox, agreeTerms && styles.checkboxChecked]}>
                {agreeTerms && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
              </View>
              <Text style={styles.checkboxLabel}>
                I agree to the{' '}
                <Text style={styles.linkText} onPress={handleOpenTerms}>
                  Terms of Service
                </Text>{' '}
                and{' '}
                <Text style={styles.linkText} onPress={handleOpenPrivacy}>
                  Privacy Policy
                </Text>
              </Text>
            </TouchableOpacity>

            {/* Checkbox 2: Newsletter / Discounts */}
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setNewsletter(!newsletter)}
              activeOpacity={0.8}
            >
              <View style={[styles.checkbox, newsletter && styles.checkboxChecked]}>
                {newsletter && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
              </View>
              <Text style={styles.checkboxLabel}>
                Send me exclusive discounts and weekly newsletters
              </Text>
            </TouchableOpacity>

            {/* Primary Action Button */}
            <TouchableOpacity
              onPress={handleCreateAccount}
              activeOpacity={0.88}
              style={styles.submitButtonTouchable}
              accessibilityRole="button"
              accessibilityLabel="Create Account"
            >
              <LinearGradient
                colors={Colors.primaryGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.submitButtonGradient}
              >
                <Text style={styles.submitButtonText}>Create Account</Text>
                <Ionicons name="arrow-forward" size={18} color="#FFFFFF" style={styles.buttonArrowIcon} />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* DIVIDER */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR SIGN UP WITH</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* SOCIAL BUTTONS */}
          <SocialAuthButtons />

          {/* FOOTER LINK */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              Already have an account?{' '}
              <Text style={styles.footerHighlightLink} onPress={handleNavigateLogin}>
                Sign In
              </Text>
            </Text>
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
  logoBadgeContainer: {
    ...Shadows.primaryButton,
    marginBottom: 12,
  },
  logoBadge: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomePill: {
    backgroundColor: Colors.primarySurface,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  welcomePillIcon: {
    marginRight: 5,
  },
  welcomePillText: {
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
  label: {
    fontSize: 13.5,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 7,
  },
  requiredAsterisk: {
    color: '#EF4444',
    fontWeight: '700',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 7,
  },
  helperText: {
    fontSize: 11.5,
    color: Colors.textMuted,
    fontWeight: '500',
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
  eyeIconButton: {
    padding: 6,
    marginRight: -4,
  },

  /* PHONE ROW */
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryPicker: {
    width: 108,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#F4F5F9',
    borderWidth: 1,
    borderColor: '#E5E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginRight: 10,
  },
  countryText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  phoneInputContainer: {
    flex: 1,
  },

  /* PASSWORD STRENGTH */
  strengthBarRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 8,
  },
  strengthSegment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E5E9F2',
  },
  strengthSegmentFilled: {
    backgroundColor: Colors.primary,
  },

  /* CHECKBOXES */
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 12,
    paddingRight: 6,
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
    marginRight: 10,
    marginTop: 1,
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 12.5,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  linkText: {
    color: Colors.primary,
    textDecorationLine: 'underline',
    fontWeight: '500',
  },

  /* SUBMIT BUTTON */
  submitButtonTouchable: {
    borderRadius: 26,
    marginTop: 20,
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
});
