import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';

interface SocialAuthButtonsProps {
  onGooglePress?: () => void;
  onApplePress?: () => void;
}

export function SocialAuthButtons({ onGooglePress, onApplePress }: SocialAuthButtonsProps) {
  const handleGoogle = () => {
    if (onGooglePress) {
      onGooglePress();
    } else {
      Alert.alert('Google Sign In', 'Authenticating with Google Account...');
    }
  };

  const handleApple = () => {
    if (onApplePress) {
      onApplePress();
    } else {
      Alert.alert('Apple Sign In', 'Authenticating with Apple ID...');
    }
  };

  return (
    <View style={styles.container}>
      {/* Google Button */}
      <TouchableOpacity
        style={styles.socialButton}
        onPress={handleGoogle}
        activeOpacity={0.75}
        accessibilityRole="button"
        accessibilityLabel="Sign in with Google"
      >
        <FontAwesome name="google" size={18} color="#EA4335" style={styles.socialIcon} />
        <Text style={styles.socialText}>Google</Text>
      </TouchableOpacity>

      {/* Apple Button */}
      <TouchableOpacity
        style={styles.socialButton}
        onPress={handleApple}
        activeOpacity={0.75}
        accessibilityRole="button"
        accessibilityLabel="Sign in with Apple"
      >
        <Ionicons name="logo-apple" size={19} color="#000000" style={styles.socialIcon} />
        <Text style={styles.socialText}>Apple</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.socialButtonBg,
    borderWidth: 1,
    borderColor: Colors.socialButtonBorder,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIcon: {
    marginRight: 8,
  },
  socialText: {
    fontSize: 14.5,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
});

export default SocialAuthButtons;
