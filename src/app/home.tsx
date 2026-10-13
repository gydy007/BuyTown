import React, { useState, useEffect, useRef } from 'react';
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
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors, Shadows } from '@/constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function HomeScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBannerSlide, setActiveBannerSlide] = useState(0);

  // Flash Sale Live Countdown Timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 7,
    minutes: 37,
    seconds: 12,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTimerNumber = (num: number) => num.toString().padStart(2, '0');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      Alert.alert('Search', `Searching BuyTown for "${searchQuery}"`);
    }
  };

  const handleVoiceSearch = () => {
    Alert.alert('Voice Search', 'Listening... What product are you searching for on BuyTown?');
  };

  const handleCallToOrder = () => {
    Alert.alert('Call to Order', 'Dialing BuyTown Express Order Line: 02018883300');
  };

  const handleSectionPress = (title: string) => {
    Alert.alert(title, `Viewing all items in ${title}...`);
  };

  const handleProductPress = (productName: string, price: string) => {
    Alert.alert(productName, `Price: ${price}\nAdding to your BuyTown cart.`);
  };

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
      {/* SCROLLABLE HOME CONTENT */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. CALL TO ORDER HOTLINE BANNER */}
        <TouchableOpacity
          style={styles.hotlineBanner}
          onPress={handleCallToOrder}
          activeOpacity={0.8}
        >
          <Ionicons name="call" size={13} color={Colors.textPrimary} style={styles.hotlineIcon} />
          <Text style={styles.hotlineText}>
            CALL TO ORDER: <Text style={styles.hotlineNumber}>02018883300</Text>
          </Text>
        </TouchableOpacity>

        {/* 2. SEARCH BAR */}
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

        {/* 3. HERO PROMO BANNER CAROUSEL */}
        <View style={styles.carouselSection}>
          <TouchableOpacity
            style={styles.heroPromoCard}
            onPress={() => handleSectionPress('Home Refresh Specials')}
            activeOpacity={0.9}
          >
            <Image
              source={require('@/assets/images/home-promo-banner.jpg')}
              style={styles.heroPromoImage}
              resizeMode="cover"
            />
            <LinearGradient
              colors={['rgba(15, 118, 110, 0.9)', 'rgba(13, 148, 136, 0.45)', 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0.85, y: 0 }}
              style={styles.heroPromoOverlay}
            >
              <Text style={styles.heroPromoTitle}>Refresh{'\n'}your Home</Text>
              <View style={styles.asLowAsBadge}>
                <Text style={styles.asLowAsText}>
                  AS LOW AS <Text style={styles.asLowAsPrice}>₦2,458</Text>
                </Text>
              </View>

              <View style={styles.heroPerksRow}>
                <View style={styles.heroPerk}>
                  <Ionicons name="checkmark-circle" size={12} color="#FFFFFF" />
                  <Text style={styles.heroPerkText}>Quality Product</Text>
                </View>
                <View style={styles.heroPerk}>
                  <Ionicons name="refresh-circle" size={12} color="#FFFFFF" />
                  <Text style={styles.heroPerkText}>Free Return</Text>
                </View>
              </View>

              <Text style={styles.heroTermsText}>**T&Cs Apply**</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Carousel Pagination Dots */}
          <View style={styles.dotsRow}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setActiveBannerSlide(index)}
                style={[
                  styles.dot,
                  activeBannerSlide === index ? styles.activeDot : styles.inactiveDot,
                ]}
              />
            ))}
          </View>
        </View>

        {/* 4. QUICK ACTION & SERVICE CARDS */}
        <View style={styles.serviceCardsRow}>
          {/* Card 1: Call to Order */}
          <TouchableOpacity
            style={styles.pinkActionCard}
            onPress={handleCallToOrder}
            activeOpacity={0.8}
          >
            <View style={styles.actionCardTopRow}>
              <Text style={styles.pinkCardTitle}>Call to Order</Text>
              <Ionicons name="arrow-forward" size={14} color="#BE185D" />
            </View>
            <View style={styles.actionCardCenterIcon}>
              <View style={styles.phoneCircle}>
                <Ionicons name="call" size={20} color="#BE185D" />
              </View>
            </View>
            <View style={styles.actionCardPillBadge}>
              <Text style={styles.actionCardPillText}>ORDER WITH EASE</Text>
            </View>
          </TouchableOpacity>

          {/* Card 2: Make Money */}
          <TouchableOpacity
            style={styles.whiteActionCard}
            onPress={() => handleSectionPress('Sell on BuyTown')}
            activeOpacity={0.8}
          >
            <View style={styles.starBadgeContainer}>
              <Ionicons name="star" size={14} color="#EA580C" />
            </View>
            <Text style={styles.makeMoneyTitle}>Make{'\n'}Money</Text>
            <Text style={styles.makeMoneySubtitle}>Be your own boss</Text>
          </TouchableOpacity>

          {/* Card 3: Extra 10% off at Checkout */}
          <TouchableOpacity
            style={styles.blueActionCard}
            onPress={() => handleSectionPress('Checkout Vouchers')}
            activeOpacity={0.8}
          >
            <Text style={styles.blueCardTitle}>Extra 10%{'\n'}at Checkout</Text>
            <View style={styles.basketIconContainer}>
              <Ionicons name="basket" size={24} color="#0284C7" />
            </View>
            <View style={styles.blueCardPillBadge}>
              <Text style={styles.blueCardPillText}>Extra 10% at...</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* 5. FLASH SALES SECTION (Crimson Container) */}
        <View style={styles.flashSaleContainer}>
          {/* Flash Sale Header */}
          <View style={styles.flashSaleHeader}>
            <View style={styles.flashSaleLeft}>
              <Text style={styles.flashSaleTitle}>Flash Sales</Text>
              <View style={styles.countdownBadge}>
                <Ionicons name="time-outline" size={12} color="#9F1239" style={styles.timerIcon} />
                <Text style={styles.countdownText}>
                  {formatTimerNumber(timeLeft.hours)}h : {formatTimerNumber(timeLeft.minutes)}m : {formatTimerNumber(timeLeft.seconds)}s
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.flashSaleArrowButton}
              onPress={() => handleSectionPress('Flash Sales')}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="View all flash sales"
            >
              <Ionicons name="arrow-forward" size={16} color="#9F1239" />
            </TouchableOpacity>
          </View>

          {/* Flash Sale Items Grid / Row */}
          <View style={styles.productGrid}>
            {/* Item 1 */}
            <TouchableOpacity
              style={styles.flashProductCard}
              onPress={() => handleProductPress('Solar Rechargeable Fan', '₦ 84,482')}
              activeOpacity={0.85}
            >
              <View style={styles.productImageBox}>
                <Ionicons name="sunny-outline" size={48} color="#EA580C" />
              </View>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={11} color="#EA580C" />
                <Text style={styles.ratingText}>4.1 (2041)</Text>
              </View>
              <Text style={styles.flashProductPrice}>₦ 84,482</Text>
              <View style={styles.discountRow}>
                <Text style={styles.originalPrice}>₦ 135,700</Text>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>-38%</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Item 2 */}
            <TouchableOpacity
              style={styles.flashProductCard}
              onPress={() => handleProductPress('Ergonomic Executive Office Chair', '₦ 140,000')}
              activeOpacity={0.85}
            >
              <View style={styles.productImageBox}>
                <MaterialCommunityIcons name="chair-rolling" size={48} color="#4B5563" />
              </View>
              <Text style={styles.flashProductPriceAlt}>₦ 140,000</Text>
              <View style={styles.discountRow}>
                <Text style={styles.originalPrice}>₦ 170,000</Text>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>-18%</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* 6. DARK SLATE SECTION: RECENTLY VIEWED & BASED ON YOUR SEARCH */}
        {/* Recently Viewed */}
        <TouchableOpacity
          style={styles.darkBannerCard}
          onPress={() => handleSectionPress('Recently Viewed')}
          activeOpacity={0.85}
        >
          <View style={styles.darkBannerHeader}>
            <Text style={styles.darkBannerTitle}>Recently viewed</Text>
            <View style={styles.darkBannerArrow}>
              <Ionicons name="arrow-forward" size={14} color="#1F2937" />
            </View>
          </View>
          <View style={styles.darkProductPreviewRow}>
            <View style={styles.darkProductBox}>
              <Ionicons name="phone-portrait-outline" size={28} color="#9CA3AF" />
              <View style={styles.darkProductInfo}>
                <Text style={styles.darkProductName} numberOfLines={1}>
                  Google Pixel 9 Pro XL 5G...
                </Text>
                <Text style={styles.darkProductPrice}>₦ 980,000</Text>
              </View>
            </View>
            <View style={styles.darkProductMiniThumb}>
              <Feather name="shopping-bag" size={24} color="#6B7280" />
            </View>
          </View>
        </TouchableOpacity>

        {/* Based on Your Search */}
        <TouchableOpacity
          style={styles.darkBannerCard}
          onPress={() => handleSectionPress('Based on your search')}
          activeOpacity={0.85}
        >
          <View style={styles.darkBannerHeader}>
            <View>
              <Text style={styles.darkBannerTitle}>Based on your search</Text>
              <Text style={styles.darkBannerSubtitle}>umidigi</Text>
            </View>
            <View style={styles.darkBannerArrow}>
              <Ionicons name="arrow-forward" size={14} color="#1F2937" />
            </View>
          </View>
          <View style={styles.darkProductPreviewRow}>
            <View style={styles.darkProductBox}>
              <Ionicons name="shield-outline" size={28} color="#9CA3AF" />
              <View style={styles.darkProductInfo}>
                <Text style={styles.darkProductName} numberOfLines={1}>
                  UMIDIGI A13/A13S Pro TP...
                </Text>
                <View style={styles.priceWithDiscountRow}>
                  <Text style={styles.darkProductPrice}>₦ 3,500</Text>
                  <View style={styles.discountBadgeSmall}>
                    <Text style={styles.discountTextSmall}>-42%</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.darkProductMiniThumb}>
              <Ionicons name="hardware-chip-outline" size={24} color="#6B7280" />
            </View>
          </View>
        </TouchableOpacity>

        {/* 7. DEALS OF THE DAY SECTION */}
        <View style={styles.dealsOfTheDaySection}>
          <View style={styles.dealsHeaderRow}>
            <View style={styles.dealsBannerTag}>
              <Text style={styles.dealsBannerText}>Deals of the Day</Text>
            </View>
          </View>

          <View style={styles.dealsProductsRow}>
            <TouchableOpacity
              style={styles.dealsCircleCard}
              onPress={() => handleProductPress('Knitted Dress', '₦ 3,060')}
              activeOpacity={0.85}
            >
              <View style={styles.dealsCircleThumb}>
                <Ionicons name="shirt-outline" size={32} color="#FFFFFF" />
              </View>
              <Text style={styles.dealsCirclePrice}>₦ 3,060</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dealsCircleCard}
              onPress={() => handleProductPress('Feature Dual SIM Phone', '₦ 8,900')}
              activeOpacity={0.85}
            >
              <View style={styles.dealsCircleThumb}>
                <Ionicons name="phone-portrait-outline" size={32} color="#FFFFFF" />
              </View>
              <Text style={styles.dealsCirclePrice}>₦ 8,900</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dealsCircleCard}
              onPress={() => handleProductPress('Power Bank 20000mAh', '₦ 14,800')}
              activeOpacity={0.85}
            >
              <View style={styles.dealsCircleThumb}>
                <Ionicons name="battery-charging-outline" size={32} color="#FFFFFF" />
              </View>
              <Text style={styles.dealsCirclePrice}>₦ 14,800</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 8. LIMITED STOCK DEALS (Mint Container) */}
        <View style={styles.mintCategoryContainer}>
          <View style={styles.mintCategoryHeader}>
            <View>
              <Text style={styles.mintCategoryTitle}>Limited Stock deals</Text>
              <Text style={styles.mintCategorySubtitle}>Up to 70% Off</Text>
            </View>
            <TouchableOpacity
              style={styles.mintArrowButton}
              onPress={() => handleSectionPress('Limited Stock deals')}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.productGrid}>
            {/* Item 1 */}
            <TouchableOpacity
              style={styles.categoryProductCard}
              onPress={() => handleProductPress('DELTA 3 Power Station', '₦ 798,000')}
              activeOpacity={0.85}
            >
              <View style={styles.productThumbnailBox}>
                <Ionicons name="cube-outline" size={44} color="#374151" />
              </View>
              <Text style={styles.productName} numberOfLines={2}>
                DELTA 3 Classic Portable Power St...
              </Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={11} color="#EA580C" />
                <Text style={styles.ratingText}>5.0 (3)</Text>
              </View>
              <Text style={styles.productPrice}>₦ 798,000</Text>
              <View style={styles.discountRow}>
                <Text style={styles.originalPrice}>₦ 1,296,000</Text>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>-38%</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Item 2 */}
            <TouchableOpacity
              style={styles.categoryProductCard}
              onPress={() => handleProductPress('Galaxy A08 6.7"', '₦ 223,757')}
              activeOpacity={0.85}
            >
              <View style={styles.productThumbnailBox}>
                <Ionicons name="phone-portrait-outline" size={44} color="#0284C7" />
              </View>
              <Text style={styles.productName} numberOfLines={2}>
                {'Galaxy A08 6.7" 4GB RAM/ 64GB ROM 6...'}
              </Text>
              <Text style={styles.productPrice}>₦ 223,757</Text>
              <View style={styles.discountRow}>
                <Text style={styles.originalPrice}>₦ 280,000</Text>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>-20%</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Item 3 */}
            <TouchableOpacity
              style={styles.categoryProductCard}
              onPress={() => handleProductPress('Vivobook 14 Intel Core', '₦ 839,600')}
              activeOpacity={0.85}
            >
              <View style={styles.productThumbnailBox}>
                <Ionicons name="laptop-outline" size={44} color="#4B5563" />
              </View>
              <Text style={styles.productName} numberOfLines={2}>
                Vivobook 14 Intel Core 7-150U/8GB ...
              </Text>
              <Text style={styles.productPrice}>₦ 839,600</Text>
              <View style={styles.discountRow}>
                <Text style={styles.originalPrice}>₦ 925,540</Text>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>-9%</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Item 4 */}
            <TouchableOpacity
              style={styles.categoryProductCard}
              onPress={() => handleProductPress('Knitted Casual Dress', '₦ 6,060')}
              activeOpacity={0.85}
            >
              <View style={styles.productThumbnailBox}>
                <Ionicons name="body-outline" size={44} color="#0D9488" />
              </View>
              <Text style={styles.productName} numberOfLines={2}>
                Knitted Casual Dress - Green
              </Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={11} color="#EA580C" />
                <Text style={styles.ratingText}>4.4 (37)</Text>
              </View>
              <Text style={styles.productPrice}>₦ 6,060</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 9. COMPUTERS & STORAGE (Mint Container) */}
        <View style={styles.mintCategoryContainer}>
          <View style={styles.mintCategoryHeader}>
            <Text style={styles.mintCategoryTitle}>Computers & Storage</Text>
            <TouchableOpacity
              style={styles.mintArrowButton}
              onPress={() => handleSectionPress('Computers & Storage')}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.productGrid}>
            {/* Item 1 */}
            <TouchableOpacity
              style={styles.categoryProductCard}
              onPress={() => handleProductPress('EliteBook 840 G5', '₦ 490,000')}
              activeOpacity={0.85}
            >
              <View style={styles.productThumbnailBox}>
                <Ionicons name="laptop-outline" size={48} color="#6B7280" />
              </View>
              <Text style={styles.productName} numberOfLines={2}>
                EliteBook 840 G5 TOUCHSCREEN Core ...
              </Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={11} color="#EA580C" />
                <Text style={styles.ratingText}>4.0 (33)</Text>
              </View>
              <Text style={styles.productPrice}>₦ 490,000</Text>
              <View style={styles.discountRow}>
                <Text style={styles.originalPrice}>₦ 1,160,095</Text>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>-58%</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Item 2 */}
            <TouchableOpacity
              style={styles.categoryProductCard}
              onPress={() => handleProductPress('NovaBook Pro Laptop', '₦ 395,000')}
              activeOpacity={0.85}
            >
              <View style={styles.productThumbnailBox}>
                <Ionicons name="laptop-outline" size={48} color="#4F46E5" />
              </View>
              <Text style={styles.productName} numberOfLines={2}>
                NovaBook Pro Laptop Intel N5095 - 16GB R...
              </Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={11} color="#EA580C" />
                <Text style={styles.ratingText}>5.0 (2)</Text>
              </View>
              <Text style={styles.productPrice}>₦ 395,000</Text>
              <View style={styles.discountRow}>
                <Text style={styles.originalPrice}>₦ 520,000</Text>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>-24%</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* 10. MOBILE ACCESSORIES DEALS (Mint Container) */}
        <View style={styles.mintCategoryContainer}>
          <View style={styles.mintCategoryHeader}>
            <Text style={styles.mintCategoryTitle}>Mobile Accessories deals</Text>
            <TouchableOpacity
              style={styles.mintArrowButton}
              onPress={() => handleSectionPress('Mobile Accessories deals')}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.productGrid}>
            <TouchableOpacity
              style={styles.categoryProductCard}
              onPress={() => handleProductPress('PowerPulse A1160 20000mAh', '₦ 16,900')}
              activeOpacity={0.85}
            >
              <View style={styles.productThumbnailBox}>
                <Ionicons name="battery-charging-outline" size={44} color="#1F2937" />
              </View>
              <Text style={styles.productName} numberOfLines={2}>
                PowerPulse A1160 20000mAh Powerbank
              </Text>
              <Text style={styles.productPrice}>₦ 16,900</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.categoryProductCard}
              onPress={() => handleProductPress('EAGEAT HiFi Earbuds', '₦ 11,500')}
              activeOpacity={0.85}
            >
              <View style={styles.productThumbnailBox}>
                <Ionicons name="headset-outline" size={44} color="#1F2937" />
              </View>
              <Text style={styles.productName} numberOfLines={2}>
                EAGEAT Wireless HiFi BT 5.0 Earbuds
              </Text>
              <Text style={styles.productPrice}>₦ 11,500</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 11. HANDS, FEET & NAIL CARE (Mint Container) */}
        <View style={styles.mintCategoryContainer}>
          <View style={styles.mintCategoryHeader}>
            <View>
              <Text style={styles.mintCategoryTitle}>Hands, Feet & Nail Care</Text>
              <Text style={styles.mintCategorySubtitle}>Up to 80% off</Text>
            </View>
            <TouchableOpacity
              style={styles.mintArrowButton}
              onPress={() => handleSectionPress('Hands, Feet & Nail Care')}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.productGrid}>
            <TouchableOpacity
              style={styles.categoryProductCard}
              onPress={() => handleProductPress('Coconut Hydrate Hand Cream', '₦ 8,199')}
              activeOpacity={0.85}
            >
              <View style={styles.productThumbnailBox}>
                <Ionicons name="flower-outline" size={44} color="#D97706" />
              </View>
              <Text style={styles.productName} numberOfLines={2}>
                Coconut Hydrate Hand Cream, 60g
              </Text>
              <Text style={styles.productPrice}>₦ 8,199</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.categoryProductCard}
              onPress={() => handleProductPress('23 In 1 Pedicure Set', '₦ 9,599')}
              activeOpacity={0.85}
            >
              <View style={styles.productThumbnailBox}>
                <Ionicons name="cut-outline" size={44} color="#4B5563" />
              </View>
              <Text style={styles.productName} numberOfLines={2}>
                23 In 1 Professional Pedicure Set...
              </Text>
              <Text style={styles.productPrice}>₦ 9,599</Text>
              <View style={styles.discountRow}>
                <Text style={styles.originalPrice}>₦ 19,200</Text>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>-50%</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* 12. MEN'S CLOTHING - SHIRTS (Mint Container) */}
        <View style={styles.mintCategoryContainer}>
          <View style={styles.mintCategoryHeader}>
            <Text style={styles.mintCategoryTitle}>{"Men's Clothing - Shirts"}</Text>
            <TouchableOpacity
              style={styles.mintArrowButton}
              onPress={() => handleSectionPress("Men's Clothing - Shirts")}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.productGrid}>
            <TouchableOpacity
              style={styles.categoryProductCard}
              onPress={() => handleProductPress('Classic White Piqué Polo', '₦ 7,500')}
              activeOpacity={0.85}
            >
              <View style={styles.productThumbnailBox}>
                <Ionicons name="shirt-outline" size={44} color="#1E3A8A" />
              </View>
              <Text style={styles.productName} numberOfLines={2}>
                Classic White Piqué Short Sleeve Polo
              </Text>
              <Text style={styles.productPrice}>₦ 7,500</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.categoryProductCard}
              onPress={() => handleProductPress('Plaid Flannel Casual Shirt', '₦ 9,200')}
              activeOpacity={0.85}
            >
              <View style={styles.productThumbnailBox}>
                <Ionicons name="shirt-outline" size={44} color="#374151" />
              </View>
              <Text style={styles.productName} numberOfLines={2}>
                Plaid Flannel Long Sleeve Casual Shirt
              </Text>
              <Text style={styles.productPrice}>₦ 9,200</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* BOTTOM SPACING FOR DOCKED BAR */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* FLOATING SCROLL-TO-TOP BUTTON */}
      <TouchableOpacity
        style={styles.floatingTopButton}
        onPress={scrollToTop}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel="Scroll to top"
      >
        <Ionicons name="arrow-up" size={20} color="#191D2D" />
      </TouchableOpacity>

      {/* 4-TAB BOTTOM NAVIGATION BAR (Exact same format as Account Page, Wishlist removed) */}
      <View style={styles.tabBar}>
        {/* Tab 1: Home (Active) */}
        <TouchableOpacity style={styles.tabItem} activeOpacity={1}>
          <Ionicons name="home" size={22} color={Colors.primary} />
          <Text style={[styles.tabLabel, styles.tabLabelActive]}>Home</Text>
        </TouchableOpacity>

        {/* Tab 2: Categories */}
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => Alert.alert('Categories', 'Browsing BuyTown category catalog...')}
          activeOpacity={0.7}
        >
          <Ionicons name="grid-outline" size={22} color="#6B7280" />
          <Text style={styles.tabLabel}>Categories</Text>
        </TouchableOpacity>

        {/* Tab 3: Cart */}
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => Alert.alert('Cart', 'Your BuyTown cart is ready for checkout.')}
          activeOpacity={0.7}
        >
          <Ionicons name="bag-handle-outline" size={22} color="#6B7280" />
          <Text style={styles.tabLabel}>Cart</Text>
        </TouchableOpacity>

        {/* Tab 4: Account */}
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push('/account')}
          activeOpacity={0.7}
        >
          <Ionicons name="person-outline" size={22} color="#6B7280" />
          <Text style={styles.tabLabel}>Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFC',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingTop: Platform.OS === 'android' ? 8 : 4,
    paddingBottom: 20,
    maxWidth: 520,
    alignSelf: 'center',
    width: '100%',
  },

  /* 1. HOTLINE BANNER */
  hotlineBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    marginBottom: 8,
  },
  hotlineIcon: {
    marginRight: 6,
  },
  hotlineText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#191D2D',
    letterSpacing: 0.5,
  },
  hotlineNumber: {
    color: Colors.primary,
  },

  /* 2. SEARCH BAR */
  searchBarContainer: {
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EEF1F6',
    borderWidth: 1,
    borderColor: '#E2E6EE',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginBottom: 12,
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

  /* 3. HERO PROMO BANNER CAROUSEL */
  carouselSection: {
    marginBottom: 14,
  },
  heroPromoCard: {
    height: 175,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#0F766E',
    position: 'relative',
    ...Shadows.subtle,
  },
  heroPromoImage: {
    width: '100%',
    height: '100%',
  },
  heroPromoOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    justifyContent: 'center',
  },
  heroPromoTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 25,
  },
  asLowAsBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 14,
    alignSelf: 'flex-start',
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  asLowAsText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  asLowAsPrice: {
    fontSize: 12.5,
    fontWeight: '800',
  },
  heroPerksRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  heroPerk: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  heroPerkText: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  heroTermsText: {
    fontSize: 8.5,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 6,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    gap: 5,
  },
  dot: {
    height: 5,
    borderRadius: 2.5,
  },
  activeDot: {
    width: 22,
    backgroundColor: '#1E293B',
  },
  inactiveDot: {
    width: 5,
    backgroundColor: '#CBD5E1',
  },

  /* 4. SERVICE CARDS */
  serviceCardsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  pinkActionCard: {
    flex: 1,
    backgroundColor: '#FFE4E6',
    borderRadius: 16,
    padding: 10,
    justifyContent: 'space-between',
    height: 112,
  },
  actionCardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pinkCardTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#BE185D',
  },
  actionCardCenterIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionCardPillBadge: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 3,
    alignItems: 'center',
  },
  actionCardPillText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#BE185D',
    letterSpacing: 0.5,
  },
  whiteActionCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 112,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    ...Shadows.subtle,
  },
  starBadgeContainer: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  makeMoneyTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1F2937',
    textAlign: 'center',
    lineHeight: 15,
  },
  makeMoneySubtitle: {
    fontSize: 9.5,
    color: '#6B7280',
    marginTop: 2,
  },
  blueActionCard: {
    flex: 1,
    backgroundColor: '#E0F2FE',
    borderRadius: 16,
    padding: 10,
    justifyContent: 'space-between',
    height: 112,
  },
  blueCardTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0369A1',
    lineHeight: 14,
  },
  basketIconContainer: {
    alignItems: 'center',
  },
  blueCardPillBadge: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 3,
    alignItems: 'center',
  },
  blueCardPillText: {
    fontSize: 8.5,
    fontWeight: '800',
    color: '#0284C7',
  },

  /* 5. FLASH SALES CONTAINER */
  flashSaleContainer: {
    backgroundColor: '#9F1239',
    borderRadius: 20,
    padding: 12,
    marginBottom: 14,
  },
  flashSaleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  flashSaleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  flashSaleTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  countdownBadge: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timerIcon: {
    marginTop: 1,
  },
  countdownText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9F1239',
  },
  flashSaleArrowButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flashProductCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
  },
  flashProductPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
    marginTop: 4,
  },
  flashProductPriceAlt: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111827',
    marginTop: 18,
  },

  /* 6. DARK SLATE CARDS */
  darkBannerCard: {
    backgroundColor: '#374151',
    borderRadius: 18,
    padding: 12,
    marginBottom: 10,
  },
  darkBannerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  darkBannerTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  darkBannerSubtitle: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  darkBannerArrow: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  darkProductPreviewRow: {
    flexDirection: 'row',
    gap: 8,
  },
  darkProductBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  darkProductInfo: {
    flex: 1,
  },
  darkProductName: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#1F2937',
  },
  darkProductPrice: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111827',
    marginTop: 2,
  },
  darkProductMiniThumb: {
    width: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceWithDiscountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  discountBadgeSmall: {
    backgroundColor: '#16A34A',
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  discountTextSmall: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  /* 7. DEALS OF THE DAY */
  dealsOfTheDaySection: {
    marginBottom: 14,
  },
  dealsHeaderRow: {
    marginBottom: 8,
  },
  dealsBannerTag: {
    backgroundColor: '#EA580C',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 14,
    alignSelf: 'flex-start',
  },
  dealsBannerText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  dealsProductsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  dealsCircleCard: {
    flex: 1,
    alignItems: 'center',
  },
  dealsCircleThumb: {
    width: (SCREEN_WIDTH - 50) / 3,
    height: (SCREEN_WIDTH - 50) / 3,
    borderRadius: (SCREEN_WIDTH - 50) / 6,
    backgroundColor: '#F97316',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  dealsCirclePrice: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1F2937',
  },

  /* 8. MINT CATEGORY CONTAINERS */
  mintCategoryContainer: {
    backgroundColor: '#E6F8F3',
    borderRadius: 20,
    padding: 12,
    marginBottom: 14,
  },
  mintCategoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  mintCategoryTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#065F46',
  },
  mintCategorySubtitle: {
    fontSize: 11,
    fontWeight: '600',
    color: '#059669',
    marginTop: 1,
  },
  mintArrowButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* PRODUCT GRID & CARDS */
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryProductCard: {
    width: '48.8%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
  },
  productThumbnailBox: {
    height: 95,
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  productImageBox: {
    height: 95,
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  productName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
    lineHeight: 16,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 4,
  },
  ratingText: {
    fontSize: 10.5,
    color: '#4B5563',
    fontWeight: '600',
  },
  productPrice: {
    fontSize: 14.5,
    fontWeight: '800',
    color: '#111827',
    marginTop: 4,
  },
  discountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  originalPrice: {
    fontSize: 10.5,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    backgroundColor: '#16A34A',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  discountText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  /* FLOATING TOP BUTTON */
  floatingTopButton: {
    position: 'absolute',
    right: 18,
    bottom: 74,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...Shadows.card,
  },

  /* BOTTOM NAVIGATION BAR */
  tabBar: {
    height: 60,
    backgroundColor: '#FFFFFF',
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
  bottomSpacer: {
    height: 36,
  },
});
