import { Colors, Shadows } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const shirtImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAeH2E5Af_yxUiQudHp7Acecl4hGBCvtzleVQfJOhkAqBoJ3gq8uXRW62gEzMSPlkUWd7tuNO_9Tvltifi5FoOxqZGKl4I0Rj0BNIyA6xKxA8MKrbpIKh2CZm9YG-jJB9HNOeoPKwMdw4BhG3-4ycOQm6kCPs1fe9D0XYI9LkiUarsZR-3kZJiQglM2Kz7sLxhqOsLAEnHvCnZSkUPp9W4TA-VyFUdNw8AnDe7XpS8fCiE2ubWhDsZTWQ";
const galleryImages = [
  shirtImage,
  shirtImage,
  shirtImage,
  shirtImage,
  shirtImage,
];
const sizes = ["EU L", "EU M", "EU XL", "EU XXL", "EU XXXL"];
const availableSizes = ["EU L", "EU XL", "EU XXL", "EU XXXL"];
const quantityLimit = 10;

const formatNaira = (value: number) => `₦ ${value.toLocaleString("en-NG")}`;

export default function ProductScreen() {
  const params = useLocalSearchParams<{ name?: string; price?: string }>();
  const productName =
    typeof params.name === "string"
      ? params.name
      : "Dou-color Men's Casual Business Shirt - Crisp White Stripe Edition";
  const parsedPrice =
    typeof params.price === "string"
      ? Number(params.price.replace(/[^0-9]/g, ""))
      : 7980;
  const price =
    Number.isFinite(parsedPrice) && parsedPrice > 0 ? parsedPrice : 7980;
  const isReferenceShirt = productName.toLowerCase().includes("shirt");
  const currentProductName = isReferenceShirt ? productName : productName;
  const oldPrice = isReferenceShirt ? 11520 : Math.round(price * 1.28);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("EU XL");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [region, setRegion] = useState("Lagos State");
  const [district, setDistrict] = useState("LEKKI-AJAH (SANGOTEDO)");

  const discount = Math.max(
    0,
    Math.round(((oldPrice - price) / oldPrice) * 100),
  );
  const priceRange = useMemo(
    () =>
      `${formatNaira(Math.min(price - 559, price))} - ${formatNaira(price)}`,
    [price],
  );

  const cycleOption = (
    current: string,
    options: string[],
    setter: (value: string) => void,
  ) => {
    const currentIndex = options.indexOf(current);
    setter(options[(currentIndex + 1) % options.length]);
  };

  const adjustQuantity = (delta: number) => {
    setQuantity((current) =>
      Math.max(1, Math.min(quantityLimit, current + delta)),
    );
  };

  const addToCart = () => {
    Alert.alert(
      "Added to cart",
      `${quantity} × ${currentProductName} (${selectedSize}) added to your cart.`,
      [
        { text: "Continue shopping", style: "cancel" },
        { text: "View cart", onPress: () => router.push("/cart") },
      ],
    );
  };

  const renderStars = () => (
    <View style={styles.starsRow}>
      {[0, 1, 2, 3].map((star) => (
        <Ionicons key={star} name="star" size={16} color="#F59E0B" />
      ))}
      <Ionicons name="star-half" size={16} color="#F59E0B" />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}
          activeOpacity={0.75}
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          Product Details
        </Text>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.push("/cart")}
          activeOpacity={0.75}
          accessibilityLabel="View cart"
        >
          <Ionicons
            name="bag-handle-outline"
            size={22}
            color={Colors.textPrimary}
          />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>1</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.searchRow}>
          <View style={styles.searchField}>
            <Ionicons
              name="search-outline"
              size={19}
              color={Colors.textMuted}
            />
            <Text style={styles.searchText} numberOfLines={1}>
              {currentProductName}
            </Text>
            <TouchableOpacity
              accessibilityLabel="Visual search"
              onPress={() =>
                Alert.alert(
                  "Visual search",
                  "Choose a product image to search.",
                )
              }
            >
              <Ionicons
                name="camera-outline"
                size={19}
                color={Colors.textMuted}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={() =>
              Alert.alert("Share product", "Product sharing is ready.")
            }
            accessibilityLabel="Share product"
          >
            <Ionicons
              name="share-social-outline"
              size={19}
              color={Colors.textPrimary}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.gallery}>
          <Image
            source={{ uri: galleryImages[selectedImage] }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroBadges}>
            <Text style={styles.saleBadge}>-{discount}% OFF</Text>
            <View style={styles.officialBadge}>
              <Ionicons
                name="checkmark-circle"
                size={13}
                color={Colors.primary}
              />
              <Text style={styles.officialText}>Official Store</Text>
            </View>
          </View>
          <TouchableOpacity
            style={[
              styles.wishlistButton,
              isWishlisted && styles.wishlistActive,
            ]}
            onPress={() => setIsWishlisted((value) => !value)}
            accessibilityLabel={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
          >
            <Ionicons
              name={isWishlisted ? "heart" : "heart-outline"}
              size={22}
              color={isWishlisted ? Colors.dangerText : Colors.textPrimary}
            />
          </TouchableOpacity>
          <View style={styles.galleryCount}>
            <Ionicons name="images-outline" size={14} color="#FFFFFF" />
            <Text style={styles.galleryCountText}>
              {selectedImage + 1} / {galleryImages.length}
            </Text>
          </View>
        </View>
        <View style={styles.thumbnailRow}>
          {galleryImages.map((image, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.thumbnail,
                index === selectedImage && styles.thumbnailActive,
              ]}
              onPress={() => setSelectedImage(index)}
              activeOpacity={0.8}
            >
              <Image
                source={{ uri: image }}
                style={styles.thumbnailImage}
                resizeMode="cover"
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.infoSection}>
          <View style={styles.brandRow}>
            <View style={styles.brandInfo}>
              <Text style={styles.brandMuted}>Brand:</Text>
              <Text style={styles.brandName}>
                {isReferenceShirt ? "Dou-color" : "BuyTown Select"}
              </Text>
              <Text style={styles.brandSeparator}>·</Text>
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    "Store",
                    "More products from this verified seller.",
                  )
                }
              >
                <Text style={styles.moreFrom}>
                  More from {isReferenceShirt ? "Dou-color" : "BuyTown Select"}
                </Text>
              </TouchableOpacity>
            </View>
            <Ionicons
              name="shield-checkmark-outline"
              size={18}
              color={Colors.textMuted}
            />
          </View>
          <Text style={styles.productTitle}>
            {isReferenceShirt
              ? "Dou-color Men's Casual Business Shirt - Crisp White Stripe Edition"
              : currentProductName}
          </Text>
          <View style={styles.pricingRow}>
            <Text style={styles.currentPrice}>
              {isReferenceShirt ? priceRange : formatNaira(price)}
            </Text>
            <Text style={styles.previousPrice}>{formatNaira(oldPrice)}</Text>
            <Text style={styles.savingsBadge}>
              Save {formatNaira(Math.max(0, oldPrice - price))}
            </Text>
          </View>
          <View style={styles.stockNotice}>
            <Ionicons name="cube-outline" size={15} color="#B45309" />
            <Text style={styles.stockNoticeText}>
              Some variations with low stock (Only 4 left)
            </Text>
          </View>
          <View style={styles.shippingSnippet}>
            <View style={styles.shippingSnippetLeft}>
              <View style={styles.shippingIcon}>
                <Ionicons name="car-outline" size={16} color={Colors.primary} />
              </View>
              <Text style={styles.shippingSnippetText}>
                Shipping from{" "}
                <Text style={styles.boldText}>{formatNaira(750)}</Text> to{" "}
                <Text style={styles.boldText}>{district}</Text>
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  "Delivery options",
                  "Choose a pickup station or door delivery below.",
                )
              }
            >
              <Text style={styles.linkText}>Options</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.ratingRow}>
            <View style={styles.ratingDetails}>
              {renderStars()}
              <Text style={styles.ratingLink}>4.2 (21 verified ratings)</Text>
            </View>
            <View style={styles.recommendPill}>
              <Ionicons
                name="thumbs-up-outline"
                size={13}
                color={Colors.brandTealDark}
              />
              <Text style={styles.recommendText}>94% recommended</Text>
            </View>
          </View>
        </View>

        <View style={styles.contentSection}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Select Size</Text>
            <TouchableOpacity
              style={styles.guideButton}
              onPress={() =>
                Alert.alert(
                  "Size guide",
                  "EU L fits chest 40-42; EU XL fits chest 43-45.",
                )
              }
            >
              <Ionicons
                name="resize-outline"
                size={16}
                color={Colors.primary}
              />
              <Text style={styles.guideText}>Size Guide</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sizeGrid}>
            {sizes.map((size) => {
              const available = availableSizes.includes(size);
              const selected = selectedSize === size;
              return (
                <TouchableOpacity
                  key={size}
                  disabled={!available}
                  onPress={() => setSelectedSize(size)}
                  style={[
                    styles.sizeChip,
                    selected && styles.sizeChipSelected,
                    !available && styles.sizeChipUnavailable,
                  ]}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.sizeText,
                      selected && styles.sizeTextSelected,
                      !available && styles.sizeTextUnavailable,
                    ]}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.contentSection}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Delivery & Returns</Text>
            <Text style={styles.fastDispatch}>FAST DISPATCH</Text>
          </View>
          <View style={styles.expressBanner}>
            <View style={styles.expressBrandLine}>
              <Text style={styles.expressBrand}>BuyTown</Text>
              <Text style={styles.expressTag}>EXPRESS</Text>
            </View>
            <Text style={styles.expressHeadline}>
              The best products, delivered faster.
            </Text>
            <Text style={styles.expressDescription}>
              Pay on delivery by cash or bank transfer. Zero wahala.
            </Text>
          </View>
          <Text style={styles.locationLabel}>Choose Location</Text>
          <TouchableOpacity
            style={styles.locationSelect}
            onPress={() =>
              cycleOption(
                region,
                ["Lagos State", "Abuja (FCT)", "Rivers (Port Harcourt)"],
                setRegion,
              )
            }
            activeOpacity={0.8}
          >
            <View style={styles.locationTextGroup}>
              <Ionicons
                name="location-outline"
                size={17}
                color={Colors.primary}
              />
              <Text style={styles.locationText}>{region}</Text>
            </View>
            <Ionicons name="chevron-down" size={18} color={Colors.textMuted} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.locationSelect}
            onPress={() =>
              cycleOption(
                district,
                [
                  "LEKKI-AJAH (SANGOTEDO)",
                  "VICTORIA ISLAND",
                  "IKEJA GRA",
                  "SURULERE",
                ],
                setDistrict,
              )
            }
            activeOpacity={0.8}
          >
            <View style={styles.locationTextGroup}>
              <Ionicons
                name="navigate-outline"
                size={17}
                color={Colors.primary}
              />
              <Text style={styles.locationText}>{district}</Text>
            </View>
            <Ionicons name="chevron-down" size={18} color={Colors.textMuted} />
          </TouchableOpacity>
          <DeliveryCard
            icon="storefront-outline"
            title="Pickup Station"
            fee="₦ 750"
            copy="Ready for pickup between 16 October and 19 October if ordered within 6 hrs 27 mins."
          />
          <DeliveryCard
            icon="car-outline"
            title="Door Delivery"
            fee="₦ 1,550"
            copy="Delivered directly to your doorstep between 16 Oct and 19 Oct."
          />
          <DeliveryCard
            icon="return-down-back-outline"
            title="Return Policy"
            copy="Free return within 7 days for eligible items with hassle-free doorstep pickup."
          />
        </View>

        <View style={styles.contentSection}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>Product Details</Text>
            <Ionicons
              name="options-outline"
              size={19}
              color={Colors.textMuted}
            />
          </View>
          {[
            "White base vertical stripes: fresh, timeless and flattering slim look.",
            "Short sleeve classic Cuban collar, tailored for breathable summer comfort.",
            "Fabric: 85% premium combed cotton, 15% linen blend for crease-resistant durability.",
            "Machine washable with reinforced stitching along the button placket and collar.",
          ].map((detail) => (
            <View key={detail} style={styles.bulletRow}>
              <View style={styles.bullet} />
              <Text style={styles.detailText}>{detail}</Text>
            </View>
          ))}
          <View style={styles.skuRow}>
            <View style={styles.locationTextGroup}>
              <Ionicons
                name="pricetag-outline"
                size={18}
                color={Colors.primary}
              />
              <Text style={styles.skuText}>SKU: DU-SH-8842-WT</Text>
            </View>
            <TouchableOpacity
              onPress={() => Alert.alert("SKU copied", "DU-SH-8842-WT")}
            >
              <Text style={styles.linkText}>Copy code</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contentSection}>
          <View style={styles.reviewsHeader}>
            <View>
              <Text style={styles.sectionTitle}>Product Ratings & Reviews</Text>
              <View style={styles.reviewMetaRow}>
                <Text style={styles.ratingScore}>4.2 / 5.0</Text>
                <Text style={styles.reviewCount}>
                  Based on 21 verified buyers
                </Text>
              </View>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={Colors.textMuted}
            />
          </View>
          <ReviewCard
            name="Akeem Oluwasegun"
            date="13 Oct 2026"
            rating={5}
            text="A clean and stylish white shirt suitable for business and casual occasions. The design looks smart and is easy to pair with trousers or jeans."
          />
          <ReviewCard
            name="Nwachukwu Kingsley"
            date="02 Oct 2026"
            rating={5}
            text="It fits well if you pick your actual size. Fabric feels cool on hot days."
          />
          <ReviewCard
            name="Jesutofunmi"
            date="29 Sep 2026"
            rating={3}
            text="Nice shirt! I love it, but you can still do better on the collar firmness. Fast delivery though."
          />
          <TouchableOpacity
            style={styles.allReviewsButton}
            onPress={() =>
              Alert.alert("Reviews", "Showing all 21 verified product reviews.")
            }
          >
            <Text style={styles.allReviewsText}>View all 21 reviews</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contentSection}>
          <View style={styles.sellerHeader}>
            <View style={styles.sellerAvatar}>
              <Text style={styles.sellerInitials}>DC</Text>
            </View>
            <View style={styles.sellerInfo}>
              <View style={styles.sellerNameRow}>
                <Text style={styles.sellerName}>Dou color clothes-COD</Text>
                <Ionicons
                  name="checkmark-circle"
                  size={15}
                  color={Colors.primary}
                />
              </View>
              <Text style={styles.sellerMeta}>Top Rated Merchant</Text>
            </View>
            <TouchableOpacity
              style={styles.followButton}
              onPress={() =>
                Alert.alert(
                  "Following seller",
                  "You are now following this store.",
                )
              }
            >
              <Text style={styles.followText}>+ Follow</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.sellerStats}>
            <SellerStat value="92%" label="Seller Score" />
            <View style={styles.statDivider} />
            <SellerStat value="832" label="Store Followers" />
          </View>
          <SellerQuality label="Shipping speed" value="Excellent" />
          <SellerQuality label="Quality score" value="Excellent" />
          <SellerQuality label="Customer rating" value="Average" />
        </View>

        <View style={styles.reassuranceRow}>
          <Reassurance icon="shield-checkmark-outline" label="Secure Pay" />
          <Reassurance icon="sync-outline" label="Free Returns" />
          <Reassurance icon="car-outline" label="Fast Tracked" />
        </View>
      </ScrollView>

      <View style={styles.purchaseDock}>
        <TouchableOpacity
          style={styles.dockIconButton}
          onPress={() => router.push("/home")}
          accessibilityLabel="Home"
        >
          <Ionicons
            name="storefront-outline"
            size={20}
            color={Colors.textPrimary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dockIconButton}
          onPress={() =>
            Alert.alert(
              "Contact seller",
              "Connecting you with Dou-color Verified Merchant Support...",
            )
          }
          accessibilityLabel="Call seller"
        >
          <Ionicons name="call-outline" size={20} color={Colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.quantityControl}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => adjustQuantity(-1)}
            accessibilityLabel="Decrease quantity"
          >
            <Ionicons name="remove" size={15} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => adjustQuantity(1)}
            accessibilityLabel="Increase quantity"
          >
            <Ionicons name="add" size={16} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={addToCart}
          activeOpacity={0.85}
        >
          <Ionicons name="cart-outline" size={19} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function DeliveryCard({
  icon,
  title,
  fee,
  copy,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  fee?: string;
  copy: string;
}) {
  return (
    <View style={styles.deliveryCard}>
      <View style={styles.deliveryIcon}>
        <Ionicons name={icon} size={20} color={Colors.primary} />
      </View>
      <View style={styles.deliveryCopy}>
        <View style={styles.deliveryTitleRow}>
          <Text style={styles.deliveryTitle}>{title}</Text>
          <TouchableOpacity onPress={() => Alert.alert(title, copy)}>
            <Text style={styles.linkText}>Details</Text>
          </TouchableOpacity>
        </View>
        {fee && <Text style={styles.deliveryFee}>Delivery fee: {fee}</Text>}
        <Text style={styles.deliveryDescription}>{copy}</Text>
      </View>
    </View>
  );
}

function ReviewCard({
  name,
  date,
  rating,
  text,
}: {
  name: string;
  date: string;
  rating: number;
  text: string;
}) {
  return (
    <View style={styles.reviewCard}>
      <View style={styles.reviewTop}>
        <View style={styles.reviewStars}>
          {[0, 1, 2, 3, 4].map((star) => (
            <Ionicons
              key={star}
              name={star < rating ? "star" : "star-outline"}
              size={14}
              color="#F59E0B"
            />
          ))}
        </View>
        <Text style={styles.reviewDate}>{date}</Text>
      </View>
      <Text style={styles.reviewText}>{text}</Text>
      <View style={styles.reviewBottom}>
        <Text style={styles.reviewAuthor}>by {name}</Text>
        <View style={styles.verifiedReview}>
          <Ionicons
            name="checkmark-circle"
            size={13}
            color={Colors.brandTealDark}
          />
          <Text style={styles.verifiedText}>Verified purchase</Text>
        </View>
      </View>
    </View>
  );
}

function SellerStat({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.sellerStat}>
      <Text style={styles.sellerStatValue}>{value}</Text>
      <Text style={styles.sellerStatLabel}>{label}</Text>
    </View>
  );
}

function SellerQuality({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.qualityRow}>
      <Text style={styles.qualityLabel}>{label}</Text>
      <View style={styles.qualityValue}>
        <Ionicons
          name="checkmark-circle"
          size={15}
          color={Colors.brandTealDark}
        />
        <Text style={styles.qualityText}>{value}</Text>
      </View>
    </View>
  );
}

function Reassurance({
  icon,
  label,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}) {
  return (
    <View style={styles.reassuranceItem}>
      <Ionicons name={icon} size={20} color={Colors.primary} />
      <Text style={styles.reassuranceLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FBF8FC" },
  header: {
    minHeight: 56,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(251,248,252,0.98)",
    borderBottomWidth: 1,
    borderBottomColor: "#ECE8EF",
  },
  headerButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  cartBadge: {
    position: "absolute",
    top: 5,
    right: 4,
    width: 15,
    height: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
  },
  cartBadgeText: { color: "#FFFFFF", fontSize: 8, fontWeight: "800" },
  scrollView: { flex: 1 },
  content: { paddingBottom: 90 },
  searchRow: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    flexDirection: "row",
    gap: 9,
    backgroundColor: "#FFFFFF",
  },
  searchField: {
    flex: 1,
    height: 40,
    paddingHorizontal: 11,
    borderRadius: 20,
    backgroundColor: "#F1F3F7",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  searchText: { flex: 1, color: Colors.textMuted, fontSize: 11 },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F1F3F7",
    alignItems: "center",
    justifyContent: "center",
  },
  gallery: {
    width: "100%",
    aspectRatio: 4 / 4.6,
    maxHeight: 460,
    position: "relative",
    backgroundColor: "#F1F3F7",
    overflow: "hidden",
  },
  heroImage: { width: "100%", height: "100%" },
  heroBadges: {
    position: "absolute",
    left: 12,
    top: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  saleBadge: {
    overflow: "hidden",
    color: "#FFFFFF",
    backgroundColor: "#950029",
    borderRadius: 999,
    paddingHorizontal: 9,
    paddingVertical: 6,
    fontSize: 9,
    fontWeight: "800",
  },
  officialBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderRadius: 999,
    backgroundColor: "#EEF0FF",
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  officialText: { fontSize: 9, fontWeight: "800", color: Colors.primary },
  wishlistButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.94)",
    alignItems: "center",
    justifyContent: "center",
    ...Shadows.subtle,
  },
  wishlistActive: { backgroundColor: "#FEE2E2" },
  galleryCount: {
    position: "absolute",
    right: 11,
    bottom: 11,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: 999,
    backgroundColor: "rgba(25,29,45,0.72)",
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  galleryCountText: { fontSize: 10, fontWeight: "700", color: "#FFFFFF" },
  thumbnailRow: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#FFFFFF",
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: 9,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E8EF",
  },
  thumbnailActive: { borderColor: Colors.primary, borderWidth: 2 },
  thumbnailImage: { width: "100%", height: "100%" },
  infoSection: {
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#ECEFF4",
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 7,
  },
  brandInfo: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 5,
  },
  brandMuted: { fontSize: 11, color: Colors.textMuted },
  brandName: { fontSize: 11, fontWeight: "800", color: Colors.primary },
  brandSeparator: { fontSize: 12, color: Colors.textMuted },
  moreFrom: { fontSize: 10, color: Colors.primary, fontWeight: "600" },
  productTitle: {
    fontSize: 19,
    lineHeight: 25,
    fontWeight: "800",
    color: Colors.textPrimary,
  },
  pricingRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 7,
    marginTop: 10,
  },
  currentPrice: { fontSize: 22, fontWeight: "800", color: Colors.primary },
  previousPrice: {
    fontSize: 12,
    color: Colors.textMuted,
    textDecorationLine: "line-through",
  },
  savingsBadge: {
    borderRadius: 999,
    backgroundColor: "#FEE2E2",
    paddingHorizontal: 7,
    paddingVertical: 4,
    fontSize: 9,
    color: "#7F1D1D",
    fontWeight: "800",
  },
  stockNotice: {
    alignSelf: "flex-start",
    marginTop: 9,
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#FFF7ED",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  stockNoticeText: { fontSize: 10, color: "#92400E", fontWeight: "700" },
  shippingSnippet: {
    marginTop: 10,
    padding: 9,
    borderRadius: 12,
    backgroundColor: "#F1F3F7",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 7,
  },
  shippingSnippetLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    flex: 1,
    minWidth: 0,
  },
  shippingIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#EEF0FF",
    alignItems: "center",
    justifyContent: "center",
  },
  shippingSnippetText: {
    flexShrink: 1,
    fontSize: 10,
    lineHeight: 15,
    color: Colors.textSecondary,
  },
  boldText: { color: Colors.textPrimary, fontWeight: "800" },
  linkText: { fontSize: 10, color: Colors.primary, fontWeight: "800" },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 6,
    marginTop: 12,
  },
  ratingDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    flexShrink: 1,
  },
  starsRow: { flexDirection: "row", alignItems: "center" },
  ratingLink: {
    color: Colors.primary,
    fontSize: 10,
    fontWeight: "700",
    flexShrink: 1,
  },
  recommendPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#E8F8F3",
    borderRadius: 999,
    paddingHorizontal: 7,
    paddingVertical: 5,
  },
  recommendText: {
    color: Colors.brandTealDark,
    fontSize: 9,
    fontWeight: "800",
  },
  contentSection: {
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 16, fontWeight: "800", color: Colors.textPrimary },
  guideButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    minHeight: 34,
  },
  guideText: { color: Colors.primary, fontSize: 11, fontWeight: "700" },
  sizeGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  sizeChip: {
    minHeight: 42,
    paddingHorizontal: 15,
    borderRadius: 12,
    backgroundColor: "#F1F3F7",
    alignItems: "center",
    justifyContent: "center",
  },
  sizeChipSelected: { backgroundColor: Colors.primary, ...Shadows.subtle },
  sizeChipUnavailable: { backgroundColor: "#E5E8EF" },
  sizeText: { color: Colors.textPrimary, fontSize: 12, fontWeight: "700" },
  sizeTextSelected: { color: "#FFFFFF", fontWeight: "800" },
  sizeTextUnavailable: {
    color: Colors.textMuted,
    textDecorationLine: "line-through",
  },
  fastDispatch: { fontSize: 9, color: Colors.brandTealDark, fontWeight: "800" },
  expressBanner: {
    padding: 12,
    borderRadius: 13,
    backgroundColor: "#EEF0FF",
    marginBottom: 14,
  },
  expressBrandLine: { flexDirection: "row", alignItems: "center", gap: 6 },
  expressBrand: { fontSize: 16, color: Colors.primary, fontWeight: "800" },
  expressTag: {
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: Colors.primary,
    color: "#FFFFFF",
    paddingHorizontal: 5,
    paddingVertical: 3,
    fontSize: 8,
    fontWeight: "900",
  },
  expressHeadline: {
    marginTop: 4,
    fontSize: 12,
    color: Colors.textPrimary,
    fontWeight: "700",
  },
  expressDescription: {
    marginTop: 3,
    fontSize: 11,
    lineHeight: 16,
    color: Colors.textSecondary,
  },
  locationLabel: {
    marginBottom: 7,
    fontSize: 12,
    color: Colors.textPrimary,
    fontWeight: "800",
  },
  locationSelect: {
    minHeight: 46,
    paddingHorizontal: 12,
    marginBottom: 8,
    borderRadius: 12,
    backgroundColor: "#F1F3F7",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  locationTextGroup: { flexDirection: "row", alignItems: "center", gap: 8 },
  locationText: { color: Colors.textPrimary, fontSize: 12, fontWeight: "600" },
  deliveryCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginTop: 8,
    padding: 11,
    borderRadius: 13,
    backgroundColor: "#F1F3F7",
  },
  deliveryIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  deliveryCopy: { flex: 1, minWidth: 0 },
  deliveryTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deliveryTitle: { color: Colors.textPrimary, fontSize: 12, fontWeight: "800" },
  deliveryFee: {
    marginTop: 3,
    color: Colors.textPrimary,
    fontSize: 10,
    fontWeight: "700",
  },
  deliveryDescription: {
    marginTop: 3,
    color: Colors.textSecondary,
    fontSize: 10,
    lineHeight: 15,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 9,
    marginBottom: 9,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    marginTop: 6,
  },
  detailText: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: 12,
    lineHeight: 18,
  },
  skuRow: {
    marginTop: 10,
    padding: 10,
    borderRadius: 11,
    backgroundColor: "#F1F3F7",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  skuText: { color: Colors.textPrimary, fontSize: 11, fontWeight: "700" },
  reviewsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  reviewMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 7,
    marginTop: 5,
  },
  ratingScore: {
    overflow: "hidden",
    backgroundColor: "#FEF3C7",
    borderRadius: 999,
    paddingHorizontal: 7,
    paddingVertical: 4,
    color: "#78350F",
    fontSize: 9,
    fontWeight: "800",
  },
  reviewCount: { color: Colors.textMuted, fontSize: 10 },
  reviewCard: {
    padding: 11,
    borderRadius: 12,
    backgroundColor: "#F1F3F7",
    marginBottom: 9,
  },
  reviewTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  reviewStars: { flexDirection: "row", gap: 1 },
  reviewDate: { color: Colors.textMuted, fontSize: 9 },
  reviewText: {
    marginTop: 7,
    color: Colors.textPrimary,
    fontSize: 11,
    lineHeight: 17,
  },
  reviewBottom: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 6,
  },
  reviewAuthor: {
    color: Colors.textMuted,
    fontSize: 9,
    fontWeight: "700",
    flexShrink: 1,
  },
  verifiedReview: { flexDirection: "row", alignItems: "center", gap: 3 },
  verifiedText: { color: Colors.brandTealDark, fontSize: 9, fontWeight: "700" },
  allReviewsButton: {
    minHeight: 40,
    borderRadius: 20,
    backgroundColor: "#EEF0FF",
    alignItems: "center",
    justifyContent: "center",
  },
  allReviewsText: { color: Colors.primary, fontSize: 11, fontWeight: "800" },
  sellerHeader: { flexDirection: "row", alignItems: "center", gap: 9 },
  sellerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EEF0FF",
    alignItems: "center",
    justifyContent: "center",
  },
  sellerInitials: { color: Colors.primary, fontSize: 13, fontWeight: "800" },
  sellerInfo: { flex: 1, minWidth: 0 },
  sellerNameRow: { flexDirection: "row", alignItems: "center", gap: 3 },
  sellerName: {
    color: Colors.textPrimary,
    fontSize: 12,
    fontWeight: "800",
    flexShrink: 1,
  },
  sellerMeta: { marginTop: 2, color: Colors.textMuted, fontSize: 10 },
  followButton: {
    minHeight: 34,
    paddingHorizontal: 14,
    borderRadius: 17,
    backgroundColor: Colors.primary,
    justifyContent: "center",
  },
  followText: { color: "#FFFFFF", fontSize: 10, fontWeight: "800" },
  sellerStats: {
    marginTop: 13,
    marginBottom: 12,
    paddingVertical: 11,
    borderRadius: 12,
    backgroundColor: "#F1F3F7",
    flexDirection: "row",
    alignItems: "center",
  },
  sellerStat: { flex: 1, alignItems: "center" },
  sellerStatValue: {
    color: Colors.textPrimary,
    fontSize: 17,
    fontWeight: "800",
  },
  sellerStatLabel: { color: Colors.textMuted, fontSize: 9, fontWeight: "700" },
  statDivider: { width: 1, height: 29, backgroundColor: Colors.borderDefault },
  qualityRow: {
    minHeight: 32,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F2F6",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  qualityLabel: { color: Colors.textMuted, fontSize: 11 },
  qualityValue: { flexDirection: "row", alignItems: "center", gap: 4 },
  qualityText: { color: Colors.brandTealDark, fontSize: 11, fontWeight: "700" },
  reassuranceRow: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  reassuranceItem: { alignItems: "center", gap: 5 },
  reassuranceLabel: { color: Colors.textMuted, fontSize: 9, fontWeight: "700" },
  purchaseDock: {
    minHeight: 60,
    paddingHorizontal: 10,
    paddingVertical: 8,
    paddingBottom: 9,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    backgroundColor: "rgba(255,255,255,0.98)",
    borderTopWidth: 1,
    borderTopColor: "#E5E8EF",
    ...Shadows.card,
  },
  dockIconButton: {
    width: 38,
    height: 40,
    borderRadius: 13,
    backgroundColor: "#F1F3F7",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityControl: {
    height: 38,
    padding: 3,
    borderRadius: 13,
    backgroundColor: "#F1F3F7",
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 29,
    height: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  quantityText: {
    minWidth: 25,
    textAlign: "center",
    color: Colors.textPrimary,
    fontSize: 12,
    fontWeight: "800",
  },
  addButton: {
    flex: 1,
    minHeight: 42,
    borderRadius: 999,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    backgroundColor: Colors.primary,
    ...Shadows.primaryButton,
  },
  addButtonText: { color: "#FFFFFF", fontSize: 12, fontWeight: "800" },
});
