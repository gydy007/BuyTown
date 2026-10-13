import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors, Shadows } from '@/constants/theme';

export default function AccountScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      Alert.alert('Search', `Searching BuyTown for: "${searchQuery}"`);
    }
  };

  const handleVoiceSearch = () => {
    Alert.alert('Voice Search', 'Listening... Speak what you are looking for on BuyTown.');
  };

  const handleReconnectWallet = () => {
    Alert.alert('BuyTown Wallet', 'Reconnecting your secured wallet provider...');
  };

  const handleLiveChat = () => {
    Alert.alert('BuyTown Support', 'Connecting you to a 24/7 Live Support Agent...');
  };

  const handleWhatsApp = () => {
    Alert.alert('WhatsApp Support', 'Opening BuyTown Official WhatsApp Business Chat...');
  };

  const handleNavigationItem = (title: string) => {
    Alert.alert(title, `Opening ${title} screen...`);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out of your BuyTown account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            router.push('/login');
          },
        },
      ]
    );
  };

  const handleCloseAccount = () => {
    Alert.alert(
      'Close Account',
      'Closing your account will permanently remove your orders, wishlist, and wallet vouchers. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Proceed', style: 'destructive' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
      {/* SCROLLABLE MAIN CONTENT */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* TOP HEADER */}
        <View style={styles.header}>
          {/* Logo & Brand Title */}
          <View style={styles.logoRow}>
            <LinearGradient
              colors={Colors.primaryGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.logoBadge}
            >
              <Ionicons name="bag-handle" size={20} color={Colors.textInverse} />
            </LinearGradient>

            <View style={styles.logoTextContainer}>
              <Text style={styles.brandTitle}>BuyTown</Text>
              <Text style={styles.brandSubtitle}>ACCOUNT</Text>
            </View>
          </View>

          {/* Right Header Actions: Search & Mini Avatar */}
          <View style={styles.headerRightActions}>
            <TouchableOpacity
              style={styles.headerIconButton}
              onPress={handleSearch}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Search"
            >
              <Ionicons name="search-outline" size={21} color={Colors.textPrimary} />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleNavigationItem('Profile Details')}
              accessibilityRole="button"
              accessibilityLabel="View profile"
            >
              <Image
                source={require('@/assets/images/user-avatar.jpg')}
                style={styles.headerAvatar}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* SEARCH INPUT BAR */}
        <View style={styles.searchBarContainer}>
          <Ionicons name="search-outline" size={18} color="#8E98A8" style={styles.searchLeftIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search on BuyTown"
            placeholderTextColor={Colors.inputPlaceholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <TouchableOpacity
            onPress={handleVoiceSearch}
            activeOpacity={0.7}
            style={styles.micButton}
            accessibilityRole="button"
            accessibilityLabel="Voice search"
          >
            <Ionicons name="mic-outline" size={18} color="#8E98A8" />
          </TouchableOpacity>
        </View>

        {/* USER PROFILE CARD */}
        <View style={styles.profileCard}>
          {/* Profile Details Row */}
          <View style={styles.profileRow}>
            <View style={styles.avatarWrapper}>
              <Image
                source={require('@/assets/images/user-avatar.jpg')}
                style={styles.profileAvatar}
              />
              {/* Green Verified Checkmark Badge */}
              <View style={styles.verifiedCheckBadge}>
                <Ionicons name="checkmark" size={11} color="#FFFFFF" />
              </View>
            </View>

            <View style={styles.profileInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.welcomeName}>Welcome Gideon!</Text>
                <View style={styles.vipBadge}>
                  <Text style={styles.vipText}>VIP</Text>
                </View>
              </View>
              <Text style={styles.userEmail}>umbugadugideon13@gmail.com</Text>
            </View>
          </View>

          {/* BuyTown Wallet Strip */}
          <View style={styles.walletStrip}>
            <View style={styles.walletLeft}>
              <View style={styles.walletIconBadge}>
                <Ionicons name="wallet-outline" size={18} color={Colors.brandTeal} />
              </View>
              <View style={styles.walletTextContainer}>
                <Text style={styles.walletTitle}>BUYTOWN WALLET</Text>
                <Text style={styles.walletSubtitle} numberOfLines={1}>
                  Sorry, your balance is not ...
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.reconnectButton}
              onPress={handleReconnectWallet}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Reconnect wallet"
            >
              <Text style={styles.reconnectText}>Reconnect</Text>
            </TouchableOpacity>
          </View>

          {/* Action Buttons: Live Chat & WhatsApp */}
          <View style={styles.actionButtonsRow}>
            {/* Live Chat */}
            <TouchableOpacity
              style={styles.liveChatButton}
              onPress={handleLiveChat}
              activeOpacity={0.85}
              accessibilityRole="button"
              accessibilityLabel="Live Chat"
            >
              <Ionicons name="chatbubbles" size={17} color="#FFFFFF" style={styles.actionButtonIcon} />
              <Text style={styles.actionButtonText}>Live Chat</Text>
            </TouchableOpacity>

            {/* WhatsApp */}
            <TouchableOpacity
              style={styles.whatsappButton}
              onPress={handleWhatsApp}
              activeOpacity={0.85}
              accessibilityRole="button"
              accessibilityLabel="WhatsApp"
            >
              <Ionicons name="logo-whatsapp" size={17} color="#FFFFFF" style={styles.actionButtonIcon} />
              <Text style={styles.actionButtonText}>WhatsApp</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* SECTION 1: NEED ASSISTANCE? */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>NEED ASSISTANCE?</Text>
          <TouchableOpacity
            style={styles.singleItemCard}
            onPress={() => handleNavigationItem('Help & Support')}
            activeOpacity={0.7}
          >
            <View style={styles.itemLeft}>
              <View style={styles.itemIconCircle}>
                <Ionicons name="help-circle-outline" size={19} color={Colors.textPrimary} />
              </View>
              <Text style={styles.itemTitle}>Help & Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#8E98A8" />
          </TouchableOpacity>
        </View>

        {/* SECTION 2: MY BUYTOWN ACCOUNT */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>MY BUYTOWN ACCOUNT</Text>
          <View style={styles.groupCard}>
            {/* Orders */}
            <TouchableOpacity
              style={styles.groupItem}
              onPress={() => handleNavigationItem('Orders')}
              activeOpacity={0.7}
            >
              <View style={styles.itemLeft}>
                <View style={styles.itemIconCircle}>
                  <Ionicons name="cube-outline" size={18} color={Colors.textPrimary} />
                </View>
                <Text style={styles.itemTitle}>Orders</Text>
              </View>
              <View style={styles.itemRightBadge}>
                <View style={styles.activeOrdersBadge}>
                  <Text style={styles.activeOrdersText}>2 Active</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#8E98A8" />
              </View>
            </TouchableOpacity>

            {/* Inbox */}
            <TouchableOpacity
              style={styles.groupItem}
              onPress={() => handleNavigationItem('Inbox')}
              activeOpacity={0.7}
            >
              <View style={styles.itemLeft}>
                <View style={styles.itemIconCircle}>
                  <Feather name="mail" size={17} color={Colors.textPrimary} />
                </View>
                <Text style={styles.itemTitle}>Inbox</Text>
              </View>
              <View style={styles.itemRightBadge}>
                <View style={styles.inboxCountBadge}>
                  <Text style={styles.inboxCountText}>2</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#8E98A8" />
              </View>
            </TouchableOpacity>

            {/* Ratings & Reviews */}
            <TouchableOpacity
              style={styles.groupItem}
              onPress={() => handleNavigationItem('Ratings & Reviews')}
              activeOpacity={0.7}
            >
              <View style={styles.itemLeft}>
                <View style={styles.itemIconCircle}>
                  <Ionicons name="chatbox-outline" size={17} color={Colors.textPrimary} />
                </View>
                <Text style={styles.itemTitle}>Ratings & Reviews</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#8E98A8" />
            </TouchableOpacity>

            {/* Vouchers */}
            <TouchableOpacity
              style={styles.groupItem}
              onPress={() => handleNavigationItem('Vouchers')}
              activeOpacity={0.7}
            >
              <View style={styles.itemLeft}>
                <View style={styles.itemIconCircle}>
                  <Ionicons name="ticket-outline" size={18} color={Colors.textPrimary} />
                </View>
                <Text style={styles.itemTitle}>Vouchers</Text>
              </View>
              <View style={styles.itemRightBadge}>
                <View style={styles.voucherBadge}>
                  <Text style={styles.voucherText}>3 available</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#8E98A8" />
              </View>
            </TouchableOpacity>

            {/* Wishlist */}
            <TouchableOpacity
              style={styles.groupItem}
              onPress={() => handleNavigationItem('Wishlist')}
              activeOpacity={0.7}
            >
              <View style={styles.itemLeft}>
                <View style={styles.itemIconCircle}>
                  <Ionicons name="heart-outline" size={18} color={Colors.textPrimary} />
                </View>
                <Text style={styles.itemTitle}>Wishlist</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#8E98A8" />
            </TouchableOpacity>

            {/* Follow Seller */}
            <TouchableOpacity
              style={styles.groupItem}
              onPress={() => handleNavigationItem('Follow Seller')}
              activeOpacity={0.7}
            >
              <View style={styles.itemLeft}>
                <View style={styles.itemIconCircle}>
                  <Ionicons name="storefront-outline" size={17} color={Colors.textPrimary} />
                </View>
                <Text style={styles.itemTitle}>Follow Seller</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#8E98A8" />
            </TouchableOpacity>

            {/* Recently Viewed */}
            <TouchableOpacity
              style={styles.groupItem}
              onPress={() => handleNavigationItem('Recently Viewed')}
              activeOpacity={0.7}
            >
              <View style={styles.itemLeft}>
                <View style={styles.itemIconCircle}>
                  <Ionicons name="time-outline" size={18} color={Colors.textPrimary} />
                </View>
                <Text style={styles.itemTitle}>Recently Viewed</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#8E98A8" />
            </TouchableOpacity>
          </View>
        </View>

        {/* SECTION 3: MY SETTINGS */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>MY SETTINGS</Text>
          <View style={styles.groupCard}>
            {/* Address Book */}
            <TouchableOpacity
              style={styles.groupItem}
              onPress={() => handleNavigationItem('Address Book')}
              activeOpacity={0.7}
            >
              <View style={styles.itemLeft}>
                <View style={styles.itemIconCircle}>
                  <Ionicons name="location-outline" size={18} color={Colors.textPrimary} />
                </View>
                <Text style={styles.itemTitle}>Address Book</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#8E98A8" />
            </TouchableOpacity>

            {/* Account Management */}
            <TouchableOpacity
              style={styles.groupItem}
              onPress={() => handleNavigationItem('Account Management')}
              activeOpacity={0.7}
            >
              <View style={styles.itemLeft}>
                <View style={styles.itemIconCircle}>
                  <Ionicons name="person-circle-outline" size={18} color={Colors.textPrimary} />
                </View>
                <Text style={styles.itemTitle}>Account Management</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#8E98A8" />
            </TouchableOpacity>

            {/* Notification Preferences */}
            <TouchableOpacity
              style={styles.groupItem}
              onPress={() => handleNavigationItem('Notification Preferences')}
              activeOpacity={0.7}
            >
              <View style={styles.itemLeft}>
                <View style={styles.itemIconCircle}>
                  <Ionicons name="notifications-outline" size={18} color={Colors.textPrimary} />
                </View>
                <Text style={styles.itemTitle}>Notification Preferences</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#8E98A8" />
            </TouchableOpacity>

            {/* Privacy Policy */}
            <TouchableOpacity
              style={styles.groupItem}
              onPress={() => handleNavigationItem('Privacy Policy')}
              activeOpacity={0.7}
            >
              <View style={styles.itemLeft}>
                <View style={styles.itemIconCircle}>
                  <Ionicons name="shield-outline" size={18} color={Colors.textPrimary} />
                </View>
                <Text style={styles.itemTitle}>Privacy Policy</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#8E98A8" />
            </TouchableOpacity>

            {/* Close Account */}
            <TouchableOpacity
              style={styles.groupItem}
              onPress={handleCloseAccount}
              activeOpacity={0.7}
            >
              <View style={styles.itemLeft}>
                <View style={[styles.itemIconCircle, styles.closeAccountCircle]}>
                  <Ionicons name="ban-outline" size={18} color={Colors.dangerText} />
                </View>
                <Text style={[styles.itemTitle, styles.closeAccountTitle]}>Close Account</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#8E98A8" />
            </TouchableOpacity>
          </View>
        </View>

        {/* LOGOUT BUTTON */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Logout"
        >
          <Ionicons name="log-out-outline" size={19} color={Colors.primary} style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* APP VERSION NOTE */}
        <Text style={styles.versionText}>BuyTown App Version 4.18.2</Text>
      </ScrollView>

      {/* DOCKED BOTTOM TAB BAR */}
      <View style={styles.tabBar}>
        {/* Tab 1: Home */}
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push('/home')}
          activeOpacity={0.7}
        >
          <Ionicons name="home-outline" size={22} color="#6B7280" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>

        {/* Tab 2: Categories */}
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => Alert.alert('Categories', 'Browsing product categories...')}
          activeOpacity={0.7}
        >
          <Ionicons name="grid-outline" size={22} color="#6B7280" />
          <Text style={styles.tabLabel}>Categories</Text>
        </TouchableOpacity>

        {/* Tab 3: Cart */}
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => Alert.alert('Cart', 'Your shopping cart is currently empty.')}
          activeOpacity={0.7}
        >
          <Ionicons name="bag-handle-outline" size={22} color="#6B7280" />
          <Text style={styles.tabLabel}>Cart</Text>
        </TouchableOpacity>

        {/* Tab 4: Account (Active) */}
        <TouchableOpacity style={styles.tabItem} activeOpacity={1}>
          <Ionicons name="person" size={22} color={Colors.primary} />
          <Text style={[styles.tabLabel, styles.tabLabelActive]}>Account</Text>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 10 : 4,
    paddingBottom: 24,
    maxWidth: 520,
    alignSelf: 'center',
    width: '100%',
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    paddingHorizontal: 2,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBadge: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.subtle,
  },
  logoTextContainer: {
    marginLeft: 9,
    justifyContent: 'center',
  },
  brandTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: -0.2,
  },
  brandSubtitle: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 0.9,
    marginTop: 1,
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconButton: {
    padding: 6,
    marginRight: 10,
  },
  headerAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },

  /* SEARCH BAR */
  searchBarContainer: {
    height: 46,
    borderRadius: 23,
    backgroundColor: Colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: Colors.borderDefault,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  searchLeftIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: Colors.textPrimary,
    padding: 0,
  },
  micButton: {
    padding: 6,
    marginRight: -4,
  },

  /* PROFILE CARD */
  profileCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EEF1F6',
    marginBottom: 8,
    ...Shadows.card,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: 12,
  },
  profileAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  verifiedCheckBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#059669',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeName: {
    fontSize: 17.5,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginRight: 6,
  },
  vipBadge: {
    backgroundColor: Colors.badgeVipBg,
    paddingVertical: 2,
    paddingHorizontal: 7,
    borderRadius: 10,
  },
  vipText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: Colors.badgeVipText,
  },
  userEmail: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.primary,
    marginTop: 2,
  },

  /* WALLET STRIP */
  walletStrip: {
    backgroundColor: '#F3F5F8',
    borderRadius: 14,
    paddingVertical: 9,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  walletLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  walletIconBadge: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#D1F5ED',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  walletTextContainer: {
    flex: 1,
  },
  walletTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#4B5563',
    letterSpacing: 0.6,
  },
  walletSubtitle: {
    fontSize: 11.5,
    color: '#6B7280',
    marginTop: 1,
  },
  reconnectButton: {
    backgroundColor: '#E2E6EE',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  reconnectText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#1F2937',
  },

  /* ACTION BUTTONS */
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  liveChatButton: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  whatsappButton: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.whatsAppGreen,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonIcon: {
    marginRight: 7,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13.5,
  },

  /* SECTION CONTAINERS */
  sectionContainer: {
    marginTop: 18,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B7280',
    letterSpacing: 0.8,
    marginBottom: 8,
    paddingHorizontal: 4,
  },

  /* SINGLE ITEM CARD */
  singleItemCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#EEF1F6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Shadows.subtle,
  },

  /* GROUP CARD */
  groupCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EEF1F6',
    paddingVertical: 4,
    ...Shadows.subtle,
  },
  groupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 11,
    paddingHorizontal: 16,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F4F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemTitle: {
    fontSize: 14.5,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  itemRightBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  /* BADGES */
  activeOrdersBadge: {
    backgroundColor: Colors.badgeActiveBg,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  activeOrdersText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.badgeActiveText,
  },
  inboxCountBadge: {
    width: 19,
    height: 19,
    borderRadius: 9.5,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inboxCountText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  voucherBadge: {
    backgroundColor: Colors.badgeVoucherBg,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  voucherText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: Colors.badgeVoucherText,
  },

  /* CLOSE ACCOUNT */
  closeAccountCircle: {
    backgroundColor: Colors.dangerBg,
  },
  closeAccountTitle: {
    color: Colors.dangerText,
  },

  /* LOGOUT BUTTON */
  logoutButton: {
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.cardBackground,
    borderWidth: 1,
    borderColor: Colors.borderDefault,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    ...Shadows.subtle,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.primary,
  },
  versionText: {
    fontSize: 11.5,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 10,
  },

  /* DOCKED BOTTOM TAB BAR */
  tabBar: {
    height: 60,
    backgroundColor: Colors.cardBackground,
    borderTopWidth: 1,
    borderTopColor: '#EAECEF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: Platform.OS === 'ios' ? 4 : 2,
    ...Shadows.subtle,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    flex: 1,
  },
  tabLabel: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 2,
  },
  tabLabelActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
});
