import { Colors, Shadows } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const initialQuantity = 1;
const unitPrice = 7980;
const oldPrice = 11520;
const deliveryFee = 750;
const shippingThreshold = 12000;
const productImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCf_MHUU0_7aT5fCddFCBCT9xmVzqQjA0Y8jBsNVkEGTNQVfdNvR5fqEAxrOQ2HiYye44EXuJkKuMZu_4GRU66NCGkh4yFkNWpPjgbxn1fvMcvKI7bv1eOiuw99C7bB9IIqe3rRADVNwCA6bAnv4OcqSQ5sKQ6BZeZDHmn5WZ5nzAU5BdQLkfj_ruzMF_y5tt5MpZudJLt35jMV-cEaqh9mcdEmofw3IgwaIknLUPLiEud8caOKJFW2oQ";

const recommendations = [
  {
    name: "Anti Theft Multifunctional Laptop Backpack",
    price: 16149,
    oldPrice: 29999,
    discount: "-46%",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDND_pntU0rXP83T7qQJMDKrcoY7tZJUjlroY9XN0O28GzfAYc-fx1q2UGlNdErJ1ea9EuOXObzrFC8OafHeDpVsfLDmP1nYV03BAi77qz-BRNVYSLTRze_LV5PBijm-sbsLzbJJzMLaBgw8QTm2X6UvvHLxr058mK99h4ieM-UJ6-iAFYBIQqO3jbQZ4MwPixmL8AqdPQqoXA534owYB9B5crnPlkatXVAWrDFhAqLYJKQ7ZEn9H1XQ",
  },
  {
    name: "A trendy men's shoulder crossbody chest bag",
    price: 11689,
    oldPrice: 18240,
    discount: "-36%",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCY2KnwloHKpPTf-Oj5TsNK51aPxNV6Q_GFQZfaMUWNiWDGnRTBc7sB4WTellxcLdK68aT1r5pMLb4wrjVhW4C-oWa_DyfPt_tUpjG9e_gAZsW8RWteeLdnk8ZLT3px9Eqw8B60XEneWGSvkQrlY0bCS0B4QsPfVMHRs1X_Scyrk5HFeUZHZjVlF6NDNeH380XlczM67ZBU_2g9Y85OXmTUfuX5l6rycsylSegFQdCv5kOzWXHG_wPAQQ",
  },
];

const formatNaira = (amount: number) => `₦ ${amount.toLocaleString("en-NG")}`;

export default function CartScreen() {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [hasItem, setHasItem] = useState(true);
  const [promoCode, setPromoCode] = useState("EXTRA10");
  const [promoApplied, setPromoApplied] = useState(true);

  const subtotal = hasItem ? unitPrice * quantity : 0;
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + (hasItem ? deliveryFee : 0) - discount;
  const shippingProgress = Math.min(subtotal / shippingThreshold, 1);
  const shippingRemaining = Math.max(shippingThreshold - subtotal, 0);
  const installment = Math.ceil(total / 4);

  const summaryCount = useMemo(
    () => (hasItem ? quantity : 0),
    [hasItem, quantity],
  );

  const changeQuantity = (nextQuantity: number) => {
    if (nextQuantity < 1) return;
    setQuantity(nextQuantity);
  };

  const clearCart = () => {
    Alert.alert("Clear cart?", "Remove all items from your cart?", [
      { text: "Keep items", style: "cancel" },
      {
        text: "Clear cart",
        style: "destructive",
        onPress: () => setHasItem(false),
      },
    ]);
  };

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === "EXTRA10") {
      setPromoCode("EXTRA10");
      setPromoApplied(true);
      Alert.alert("Promo applied", "EXTRA10 gives you 10% off this order.");
      return;
    }
    setPromoApplied(false);
    Alert.alert(
      "Code not recognized",
      "Try EXTRA10 to apply the available discount.",
    );
  };

  const restoreItem = () => {
    setHasItem(true);
    setQuantity(initialQuantity);
    setPromoApplied(true);
    setPromoCode("EXTRA10");
  };

  const addRecommendation = (name: string) => {
    setHasItem(true);
    Alert.alert("Added to cart", `${name} has been added to your cart.`);
  };

  const proceedToCheckout = () => {
    if (!hasItem) {
      Alert.alert("Your cart is empty", "Add a product before checking out.");
      return;
    }
    Alert.alert("Checkout", `Your order total is ${formatNaira(total)}.`);
  };

  const renderTab = (
    label: string,
    icon: keyof typeof Ionicons.glyphMap,
    active = false,
    onPress?: () => void,
  ) => (
    <TouchableOpacity
      key={label}
      style={styles.tabItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.tabIconWrap}>
        <Ionicons
          name={icon}
          size={22}
          color={active ? Colors.primary : "#5E6778"}
        />
        {active && hasItem && <View style={styles.tabDot} />}
      </View>
      <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <View style={styles.headerMain}>
            <View style={styles.titleGroup}>
              <Text style={styles.headerTitle}>My Cart</Text>
              <View style={styles.countBadge}>
                <Text style={styles.countText}>{summaryCount}</Text>
              </View>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity
                style={styles.headerIconButton}
                onPress={() =>
                  Alert.alert(
                    "Customer care",
                    "Call BuyTown support at 020 1888 3300?",
                    [
                      { text: "Cancel", style: "cancel" },
                      {
                        text: "Call",
                        onPress: () =>
                          Alert.alert(
                            "Support",
                            "Call 020 1888 3300 from your device.",
                          ),
                      },
                    ],
                  )
                }
                accessibilityRole="button"
                accessibilityLabel="Customer care support"
              >
                <Ionicons
                  name="headset-outline"
                  size={20}
                  color={Colors.textPrimary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={clearCart}
                style={styles.clearButton}
                activeOpacity={0.7}
              >
                <Text style={styles.clearText}>Clear</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.deliveryAddress}
            onPress={() =>
              Alert.alert("Delivery address", "Change your delivery location.")
            }
            activeOpacity={0.8}
          >
            <View style={styles.addressTextWrap}>
              <Ionicons
                name="location-outline"
                size={17}
                color={Colors.primary}
              />
              <Text style={styles.addressText} numberOfLines={1}>
                Deliver to{" "}
                <Text style={styles.addressStrong}>Lekki Phase 1, Lagos</Text>
              </Text>
            </View>
            <Text style={styles.changeAddress}>Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {hasItem ? (
            <>
              <View style={styles.sectionSpacing}>
                <View style={styles.shippingCard}>
                  <View style={styles.shippingHeader}>
                    <View style={styles.rowInline}>
                      <Ionicons
                        name="car-outline"
                        size={20}
                        color={Colors.primary}
                      />
                      <Text style={styles.shippingTitle}>
                        Free Express Shipping
                      </Text>
                    </View>
                    <Text style={styles.progressBadge}>
                      {Math.round(shippingProgress * 100)}% reached
                    </Text>
                  </View>
                  <View style={styles.progressTrack}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${Math.max(shippingProgress * 100, 3)}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.shippingHint}>
                    {shippingRemaining > 0 ? (
                      <>
                        Add{" "}
                        <Text style={styles.strongText}>
                          {formatNaira(shippingRemaining)}
                        </Text>{" "}
                        more to unlock{" "}
                        <Text style={styles.freeDeliveryText}>
                          Free Express Delivery
                        </Text>
                      </>
                    ) : (
                      "Your order qualifies for Free Express Delivery"
                    )}
                  </Text>
                </View>
              </View>

              <View style={styles.sectionSpacing}>
                <View style={styles.itemCard}>
                  <View style={styles.itemTop}>
                    <View style={styles.productImageWrap}>
                      <Image
                        source={{ uri: productImage }}
                        style={styles.productImage}
                        resizeMode="cover"
                      />
                      <View style={styles.discountBadge}>
                        <Text style={styles.discountBadgeText}>-31%</Text>
                      </View>
                    </View>
                    <View style={styles.itemDetails}>
                      <Text style={styles.productName} numberOfLines={2}>
                        Men&apos;s casual business shirt - white
                      </Text>
                      <View style={styles.productMetaRow}>
                        <Text style={styles.variantPill}>Size: EU XL</Text>
                        <View style={styles.stockRow}>
                          <View style={styles.stockDot} />
                          <Text style={styles.stockText}>
                            Only 3 units left
                          </Text>
                        </View>
                      </View>
                      <View style={styles.priceBlock}>
                        <View style={styles.priceLine}>
                          <Text style={styles.itemPrice}>
                            {formatNaira(unitPrice)}
                          </Text>
                          <Text style={styles.oldPrice}>
                            {formatNaira(oldPrice)}
                          </Text>
                        </View>
                        <Text style={styles.savingsText}>
                          Save {formatNaira(oldPrice - unitPrice)}
                        </Text>
                        <View style={styles.expressPill}>
                          <Ionicons
                            name="flash"
                            size={13}
                            color={Colors.primary}
                          />
                          <Text style={styles.expressText}>
                            BuyTown Express · Delivery in 24 hrs
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.itemActionsRow}>
                    <View style={styles.itemActionButtons}>
                      <TouchableOpacity
                        style={styles.textAction}
                        onPress={() => setHasItem(false)}
                        activeOpacity={0.7}
                      >
                        <Ionicons
                          name="trash-outline"
                          size={17}
                          color={Colors.dangerText}
                        />
                        <Text style={styles.removeText}>Remove</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.textAction}
                        onPress={() =>
                          Alert.alert(
                            "Saved for later",
                            "This item has been saved for later.",
                          )
                        }
                        activeOpacity={0.7}
                      >
                        <Ionicons
                          name="bookmark-outline"
                          size={17}
                          color={Colors.textMuted}
                        />
                        <Text style={styles.saveText}>Save for later</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.quantityControl}>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => changeQuantity(quantity - 1)}
                        activeOpacity={0.8}
                        accessibilityLabel="Decrease quantity"
                      >
                        <Ionicons
                          name="remove"
                          size={15}
                          color={Colors.textPrimary}
                        />
                      </TouchableOpacity>
                      <Text style={styles.quantityValue}>{quantity}</Text>
                      <TouchableOpacity
                        style={[styles.quantityButton, styles.quantityIncrease]}
                        onPress={() => changeQuantity(quantity + 1)}
                        activeOpacity={0.8}
                        accessibilityLabel="Increase quantity"
                      >
                        <Ionicons name="add" size={16} color="#FFFFFF" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.sectionSpacing}>
                <View style={styles.panel}>
                  <View style={styles.panelHeadingRow}>
                    <View style={styles.rowInline}>
                      <Ionicons
                        name="pricetag-outline"
                        size={20}
                        color={Colors.primary}
                      />
                      <Text style={styles.panelTitle}>
                        Voucher & Promo Code
                      </Text>
                    </View>
                    <Text style={styles.activePromo}>1 Active</Text>
                  </View>
                  <View style={styles.promoInputRow}>
                    <View style={styles.promoInputWrap}>
                      <TextInput
                        style={styles.promoInput}
                        value={promoCode}
                        onChangeText={(value) => {
                          setPromoCode(value);
                          setPromoApplied(false);
                        }}
                        placeholder="Enter code (e.g. EXTRA10)"
                        placeholderTextColor={Colors.textMuted}
                        autoCapitalize="characters"
                      />
                      {promoApplied && (
                        <Ionicons
                          name="checkmark-circle"
                          size={18}
                          color={Colors.brandTeal}
                        />
                      )}
                    </View>
                    <TouchableOpacity
                      style={styles.applyButton}
                      onPress={applyPromo}
                      activeOpacity={0.85}
                    >
                      <Text style={styles.applyButtonText}>Apply</Text>
                    </TouchableOpacity>
                  </View>
                  {promoApplied && (
                    <View style={styles.promoSuccess}>
                      <Ionicons
                        name="checkmark-circle-outline"
                        size={15}
                        color={Colors.brandTeal}
                      />
                      <Text style={styles.promoSuccessText}>
                        Promo EXTRA10 applied: 10% instant discount
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              <View style={styles.sectionSpacing}>
                <View style={styles.panel}>
                  <View style={styles.summaryHeading}>
                    <Text style={styles.panelTitle}>Order Summary</Text>
                    <Text style={styles.itemCountLabel}>
                      {summaryCount} {summaryCount === 1 ? "ITEM" : "ITEMS"}
                    </Text>
                  </View>
                  <View style={styles.summaryRows}>
                    <View style={styles.summaryRow}>
                      <Text style={styles.summaryLabel}>Items Subtotal</Text>
                      <Text style={styles.summaryValue}>
                        {formatNaira(subtotal)}
                      </Text>
                    </View>
                    <View style={styles.summaryRow}>
                      <View style={styles.rowInline}>
                        <Text style={styles.summaryLabel}>Delivery Fee</Text>
                        <Ionicons
                          name="information-circle-outline"
                          size={15}
                          color={Colors.textMuted}
                        />
                      </View>
                      <Text style={styles.summaryValue}>
                        {formatNaira(deliveryFee)}
                      </Text>
                    </View>
                    {promoApplied && (
                      <View style={styles.summaryRow}>
                        <Text style={styles.discountLabel}>
                          Voucher Discount (EXTRA10)
                        </Text>
                        <Text style={styles.discountLabel}>
                          -{formatNaira(discount)}
                        </Text>
                      </View>
                    )}
                    <View style={styles.totalRow}>
                      <View>
                        <Text style={styles.totalLabel}>Total Amount</Text>
                        <Text style={styles.totalNote}>
                          Includes VAT & standard fees
                        </Text>
                      </View>
                      <Text style={styles.totalPrice}>
                        {formatNaira(total)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </>
          ) : (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Ionicons
                  name="bag-handle-outline"
                  size={42}
                  color={Colors.primary}
                />
              </View>
              <Text style={styles.emptyTitle}>Your cart is empty</Text>
              <Text style={styles.emptyCopy}>
                Explore handpicked styles and trending products with exclusive
                discounts today.
              </Text>
              <TouchableOpacity
                style={styles.restoreButton}
                onPress={restoreItem}
                activeOpacity={0.85}
              >
                <Ionicons name="refresh-outline" size={19} color="#FFFFFF" />
                <Text style={styles.restoreButtonText}>Restore Cart Item</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/all-products")}
                style={styles.browseButton}
                activeOpacity={0.8}
              >
                <Text style={styles.browseButtonText}>Browse products</Text>
                <Ionicons
                  name="arrow-forward"
                  size={16}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.sectionSpacing}>
            <TouchableOpacity
              style={styles.helpBanner}
              onPress={() =>
                Alert.alert(
                  "Ordering support",
                  "Call BuyTown care at 020 1888 3300.",
                )
              }
              activeOpacity={0.85}
            >
              <View style={styles.helpIcon}>
                <Ionicons name="headset-outline" size={20} color="#FFFFFF" />
              </View>
              <View style={styles.helpCopy}>
                <Text style={styles.helpTitle}>Need help ordering?</Text>
                <Text style={styles.helpSubtitle}>
                  Call dedicated care: 020 1888 3300
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.trustRow}>
            <TrustItem
              icon="shield-checkmark"
              title="100% Authentic"
              subtitle="Guaranteed"
              color={Colors.brandTeal}
            />
            <TrustItem
              icon="return-down-back"
              title="7 Days Return"
              subtitle="Free & easy"
              color={Colors.primary}
            />
            <TrustItem
              icon="lock-closed"
              title="256-Bit SSL"
              subtitle="Secure Pay"
              color={Colors.brandTeal}
            />
          </View>

          <View style={styles.recommendationSection}>
            <View style={styles.recommendationHeading}>
              <View style={styles.rowInline}>
                <Text style={styles.recommendationTitle}>
                  You Might Also Like
                </Text>
                <View style={styles.headingDot} />
              </View>
              <TouchableOpacity
                onPress={() => router.push("/all-products")}
                style={styles.seeAllButton}
                activeOpacity={0.8}
              >
                <Text style={styles.seeAllText}>See All</Text>
                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.recommendationGrid}>
              {recommendations.map((item) => (
                <View key={item.name} style={styles.recommendationCard}>
                  <View style={styles.recommendationImageWrap}>
                    <Image
                      source={{ uri: item.image }}
                      style={styles.recommendationImage}
                      resizeMode="cover"
                    />
                    <Text style={styles.recommendationDiscount}>
                      {item.discount}
                    </Text>
                    <TouchableOpacity
                      style={styles.wishlistButton}
                      onPress={() =>
                        Alert.alert(
                          "Saved",
                          "This product has been saved to your wishlist.",
                        )
                      }
                      accessibilityLabel="Save product"
                      activeOpacity={0.8}
                    >
                      <Ionicons
                        name="heart-outline"
                        size={16}
                        color={Colors.textPrimary}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.recommendationName} numberOfLines={2}>
                    {item.name}
                  </Text>
                  <Text style={styles.recommendationPrice}>
                    {formatNaira(item.price)}
                  </Text>
                  <Text style={styles.recommendationOldPrice}>
                    {formatNaira(item.oldPrice)}
                  </Text>
                  <TouchableOpacity
                    style={styles.addToCartButton}
                    onPress={() => addRecommendation(item.name)}
                    activeOpacity={0.85}
                  >
                    <Ionicons name="add" size={16} color={Colors.primary} />
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>

        {hasItem && (
          <View style={styles.checkoutDock}>
            <View style={styles.installmentRow}>
              <View style={styles.rowInline}>
                <Ionicons name="flash" size={15} color={Colors.brandTeal} />
                <Text style={styles.installmentText}>
                  or 4 payments of{" "}
                  <Text style={styles.installmentStrong}>
                    {formatNaira(installment)}
                  </Text>{" "}
                  with <Text style={styles.payLater}>PayLater</Text>
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    "PayLater",
                    "Split your payment into 4 installments at checkout.",
                  )
                }
              >
                <Text style={styles.detailsText}>Details</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.checkoutButtonsRow}>
              <TouchableOpacity
                style={styles.callButton}
                onPress={() =>
                  Alert.alert(
                    "Customer care",
                    "Call BuyTown care at 020 1888 3300.",
                  )
                }
                activeOpacity={0.8}
                accessibilityLabel="Call customer care"
              >
                <Ionicons
                  name="call-outline"
                  size={21}
                  color={Colors.textPrimary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={proceedToCheckout}
                activeOpacity={0.85}
              >
                <View style={styles.checkoutLabelGroup}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={19}
                    color="#FFFFFF"
                  />
                  <Text style={styles.checkoutLabel}>Proceed to Checkout</Text>
                </View>
                <View style={styles.checkoutTotalGroup}>
                  <Text style={styles.checkoutTotal}>{formatNaira(total)}</Text>
                  <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.tabBar}>
          {renderTab("Home", "home-outline", false, () => router.push("/home"))}
          {renderTab("Categories", "grid-outline", false, () =>
            router.push("/categories"),
          )}
          {renderTab("Cart", "bag-handle", true)}
          {renderTab("Account", "person-outline", false, () =>
            router.push("/account"),
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function TrustItem({
  icon,
  title,
  subtitle,
  color,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  color: string;
}) {
  return (
    <View style={styles.trustCard}>
      <Ionicons name={icon} size={22} color={color} />
      <Text style={styles.trustTitle}>{title}</Text>
      <Text style={styles.trustSubtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FBF8FC" },
  keyboardView: { flex: 1 },
  header: {
    backgroundColor: "rgba(251,248,252,0.98)",
    borderBottomWidth: 1,
    borderBottomColor: "#ECE8EF",
  },
  headerMain: {
    minHeight: 60,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleGroup: { flexDirection: "row", alignItems: "center", gap: 8 },
  headerTitle: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  countBadge: {
    minWidth: 22,
    height: 20,
    borderRadius: 10,
    paddingHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEF0FF",
  },
  countText: { fontSize: 11, fontWeight: "800", color: Colors.primary },
  headerActions: { flexDirection: "row", alignItems: "center", gap: 4 },
  headerIconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  clearButton: { paddingHorizontal: 11, paddingVertical: 8, borderRadius: 8 },
  clearText: { fontSize: 12, fontWeight: "700", color: Colors.textMuted },
  deliveryAddress: {
    minHeight: 38,
    paddingHorizontal: 18,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F0EDF1",
    borderTopWidth: 1,
    borderTopColor: "#EAE7EB",
  },
  addressTextWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1,
    minWidth: 0,
  },
  addressText: {
    flex: 1,
    minWidth: 0,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  addressStrong: { fontWeight: "700", color: Colors.textPrimary },
  changeAddress: {
    marginLeft: 12,
    fontSize: 11,
    fontWeight: "800",
    color: Colors.primary,
  },
  scrollView: { flex: 1 },
  content: {
    paddingTop: 8,
    paddingBottom: 18,
    paddingHorizontal: 16,
    maxWidth: 520,
    width: "100%",
    alignSelf: "center",
  },
  sectionSpacing: { marginBottom: 8 },
  shippingCard: {
    padding: 14,
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#C7D2FE80",
    gap: 9,
    ...Shadows.subtle,
  },
  shippingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  rowInline: { flexDirection: "row", alignItems: "center", gap: 6 },
  shippingTitle: { fontSize: 13, fontWeight: "700", color: Colors.textPrimary },
  progressBadge: {
    color: Colors.primary,
    fontSize: 10,
    fontWeight: "800",
    backgroundColor: "#EEF0FF",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 999,
  },
  progressTrack: {
    height: 7,
    backgroundColor: "#EAE7EB",
    borderRadius: 999,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 999,
  },
  shippingHint: { fontSize: 11, lineHeight: 16, color: Colors.textSecondary },
  strongText: { fontWeight: "800", color: Colors.textPrimary },
  freeDeliveryText: { fontWeight: "800", color: Colors.brandTealDark },
  itemCard: {
    padding: 13,
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EAE7EB",
    gap: 13,
    ...Shadows.subtle,
  },
  itemTop: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: 12,
    minHeight: 124,
  },
  productImageWrap: {
    width: 92,
    height: 124,
    borderRadius: 13,
    overflow: "hidden",
    backgroundColor: "#F0EDF1",
  },
  productImage: { width: "100%", height: "100%" },
  discountBadge: {
    position: "absolute",
    top: 6,
    left: 6,
    backgroundColor: "#FFDADA",
    borderRadius: 999,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  discountBadgeText: { fontSize: 9, fontWeight: "800", color: "#40000C" },
  itemDetails: { flex: 1, justifyContent: "space-between", minWidth: 0 },
  productName: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  productMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 6,
  },
  variantPill: {
    borderRadius: 6,
    backgroundColor: "#EAE7EB",
    color: Colors.textSecondary,
    paddingHorizontal: 7,
    paddingVertical: 4,
    fontSize: 10,
    fontWeight: "600",
  },
  stockRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  stockDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#C20038",
  },
  stockText: { color: "#950029", fontSize: 10, fontWeight: "700" },
  priceBlock: { marginTop: 7 },
  priceLine: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "baseline",
    gap: 7,
  },
  itemPrice: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "800",
    color: Colors.textPrimary,
  },
  oldPrice: {
    fontSize: 11,
    textDecorationLine: "line-through",
    color: Colors.textMuted,
  },
  savingsText: {
    color: Colors.brandTealDark,
    fontSize: 10,
    fontWeight: "800",
    marginTop: 1,
  },
  expressPill: {
    alignSelf: "flex-start",
    maxWidth: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 5,
    backgroundColor: "#EEF0FF",
    borderRadius: 999,
    paddingHorizontal: 7,
    paddingVertical: 4,
  },
  expressText: {
    flexShrink: 1,
    fontSize: 9,
    lineHeight: 12,
    fontWeight: "700",
    color: Colors.primary,
  },
  itemActionsRow: {
    minHeight: 42,
    paddingTop: 9,
    borderTopWidth: 1,
    borderTopColor: "#EAE7EB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  itemActionButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    flexShrink: 1,
  },
  textAction: {
    minHeight: 34,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 2,
  },
  removeText: { fontSize: 10, fontWeight: "700", color: "#950029" },
  saveText: { fontSize: 10, fontWeight: "700", color: Colors.textMuted },
  quantityControl: {
    height: 34,
    borderRadius: 17,
    backgroundColor: "#EAE7EB",
    flexDirection: "row",
    alignItems: "center",
    padding: 3,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    ...Shadows.subtle,
  },
  quantityIncrease: { backgroundColor: Colors.primary },
  quantityValue: {
    minWidth: 29,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "800",
    color: Colors.textPrimary,
  },
  panel: {
    padding: 14,
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EAE7EB",
    gap: 10,
    ...Shadows.subtle,
  },
  panelHeadingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  panelTitle: { fontSize: 14, fontWeight: "700", color: Colors.textPrimary },
  activePromo: { color: Colors.brandTealDark, fontSize: 10, fontWeight: "800" },
  promoInputRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  promoInputWrap: {
    flex: 1,
    height: 42,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F2F7",
    borderRadius: 11,
    borderWidth: 1,
    borderColor: "#E4E1E6",
    paddingHorizontal: 11,
  },
  promoInput: {
    flex: 1,
    minWidth: 0,
    height: "100%",
    padding: 0,
    color: Colors.textPrimary,
    fontSize: 12,
  },
  applyButton: {
    height: 42,
    justifyContent: "center",
    paddingHorizontal: 17,
    borderRadius: 11,
    backgroundColor: Colors.primary,
  },
  applyButtonText: { color: "#FFFFFF", fontSize: 12, fontWeight: "800" },
  promoSuccess: { flexDirection: "row", alignItems: "center", gap: 5 },
  promoSuccessText: {
    color: Colors.brandTealDark,
    fontSize: 10,
    fontWeight: "600",
  },
  summaryHeading: {
    paddingBottom: 9,
    borderBottomWidth: 1,
    borderBottomColor: "#EAE7EB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemCountLabel: {
    color: Colors.textMuted,
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.6,
  },
  summaryRows: { gap: 11, paddingTop: 2 },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  summaryLabel: { color: Colors.textSecondary, fontSize: 12 },
  summaryValue: { color: Colors.textPrimary, fontSize: 12, fontWeight: "700" },
  discountLabel: {
    color: Colors.brandTealDark,
    fontSize: 11,
    fontWeight: "700",
  },
  totalRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    marginTop: 1,
    borderTopWidth: 1,
    borderTopColor: "#EAE7EB",
    gap: 12,
  },
  totalLabel: { color: Colors.textPrimary, fontSize: 14, fontWeight: "800" },
  totalNote: { marginTop: 2, color: Colors.textMuted, fontSize: 9 },
  totalPrice: { color: Colors.primary, fontSize: 21, fontWeight: "800" },
  emptyState: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  emptyIcon: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: "#EEF0FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  emptyTitle: { color: Colors.textPrimary, fontSize: 20, fontWeight: "800" },
  emptyCopy: {
    maxWidth: 280,
    marginTop: 7,
    marginBottom: 18,
    textAlign: "center",
    color: Colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
  },
  restoreButton: {
    minHeight: 46,
    paddingHorizontal: 19,
    borderRadius: 23,
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    ...Shadows.primaryButton,
  },
  restoreButtonText: { color: "#FFFFFF", fontSize: 13, fontWeight: "800" },
  browseButton: {
    marginTop: 13,
    minHeight: 42,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  browseButtonText: { color: Colors.primary, fontSize: 13, fontWeight: "700" },
  helpBanner: {
    minHeight: 72,
    padding: 12,
    borderRadius: 16,
    backgroundColor: "#EEF2FF",
    borderWidth: 1,
    borderColor: "#C7D2FE70",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  helpIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  helpCopy: { flex: 1, minWidth: 0 },
  helpTitle: { fontSize: 12, fontWeight: "800", color: Colors.textPrimary },
  helpSubtitle: {
    marginTop: 3,
    fontSize: 10,
    fontWeight: "600",
    color: Colors.primary,
  },
  trustRow: { flexDirection: "row", gap: 8, marginBottom: 18 },
  trustCard: {
    flex: 1,
    minHeight: 84,
    paddingVertical: 9,
    paddingHorizontal: 3,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EAE7EB",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  trustTitle: {
    textAlign: "center",
    color: Colors.textPrimary,
    fontSize: 9,
    fontWeight: "800",
  },
  trustSubtitle: { color: Colors.textMuted, fontSize: 9 },
  recommendationSection: { marginBottom: 14 },
  recommendationHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 11,
  },
  recommendationTitle: {
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: "800",
  },
  headingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    marginLeft: 2,
  },
  seeAllButton: {
    minHeight: 34,
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
  },
  seeAllText: { color: Colors.primary, fontSize: 11, fontWeight: "800" },
  recommendationGrid: { flexDirection: "row", gap: 10 },
  recommendationCard: {
    flex: 1,
    minWidth: 0,
    padding: 8,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EAE7EB",
    ...Shadows.subtle,
  },
  recommendationImageWrap: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#F0EDF1",
    marginBottom: 8,
  },
  recommendationImage: { width: "100%", height: "100%" },
  recommendationDiscount: {
    position: "absolute",
    top: 6,
    left: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 5,
    backgroundColor: "#FFDADA",
    color: "#40000C",
    fontSize: 9,
    fontWeight: "800",
  },
  wishlistButton: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 29,
    height: 29,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.95)",
    alignItems: "center",
    justifyContent: "center",
  },
  recommendationName: {
    minHeight: 34,
    color: Colors.textPrimary,
    fontSize: 10,
    lineHeight: 15,
    fontWeight: "600",
  },
  recommendationPrice: {
    marginTop: 4,
    color: Colors.textPrimary,
    fontSize: 13,
    fontWeight: "800",
  },
  recommendationOldPrice: {
    marginTop: 1,
    color: Colors.textMuted,
    fontSize: 10,
    textDecorationLine: "line-through",
  },
  addToCartButton: {
    height: 34,
    marginTop: 8,
    borderRadius: 999,
    backgroundColor: "#EEF0FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  addToCartText: { color: Colors.primary, fontSize: 10, fontWeight: "800" },
  checkoutDock: {
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 9,
    backgroundColor: "rgba(251,248,252,0.98)",
    borderTopWidth: 1,
    borderTopColor: "#EAE7EB",
    gap: 7,
  },
  installmentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 6,
  },
  installmentText: { color: Colors.textSecondary, fontSize: 9, flexShrink: 1 },
  installmentStrong: { color: Colors.textPrimary, fontWeight: "800" },
  payLater: { color: Colors.primary, fontWeight: "800" },
  detailsText: { color: Colors.primary, fontSize: 9, fontWeight: "800" },
  checkoutButtonsRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  callButton: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: "#F0EDF1",
    borderWidth: 1,
    borderColor: "#E4E1E6",
    alignItems: "center",
    justifyContent: "center",
  },
  checkoutButton: {
    flex: 1,
    minHeight: 46,
    paddingHorizontal: 13,
    borderRadius: 999,
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    ...Shadows.primaryButton,
  },
  checkoutLabelGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexShrink: 1,
  },
  checkoutLabel: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
    flexShrink: 1,
  },
  checkoutTotalGroup: { flexDirection: "row", alignItems: "center", gap: 3 },
  checkoutTotal: { color: "#FFFFFF", fontSize: 12, fontWeight: "800" },
  tabBar: {
    height: 60,
    paddingBottom: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "rgba(251,248,252,0.98)",
    borderTopWidth: 1,
    borderTopColor: "#EAE7EB",
  },
  tabItem: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  tabIconWrap: { position: "relative" },
  tabDot: {
    position: "absolute",
    top: -1,
    right: -4,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Colors.brandOrange,
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  tabLabel: { color: Colors.textSecondary, fontSize: 10, fontWeight: "600" },
  tabLabelActive: { color: Colors.primary, fontWeight: "800" },
});
