import { Colors, Shadows } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const quickCategories = [
  {
    name: "Phones",
    count: "1.8k",
    color: ["#EEF2FF", "#E0E7FF"] as const,
    icon: "phone-portrait-outline",
  },
  {
    name: "Fashion",
    count: "1.2k",
    color: ["#FFF7ED", "#FFEDD5"] as const,
    icon: "shirt-outline",
  },
  {
    name: "Home",
    count: "980",
    color: ["#ECFDF5", "#D1FAE5"] as const,
    icon: "home-outline",
  },
  {
    name: "Beauty",
    count: "760",
    color: ["#FDF2F8", "#FCE7F3"] as const,
    icon: "sparkles-outline",
  },
  {
    name: "Appliances",
    count: "640",
    color: ["#EFF6FF", "#DBEAFE"] as const,
    icon: "tv-outline",
  },
  {
    name: "Groceries",
    count: "1.1k",
    color: ["#F0FDF4", "#DCFCE7"] as const,
    icon: "basket-outline",
  },
];

const topPicks = [
  { name: "Laptops & tablets", badge: "New", accent: "#524DEB" },
  { name: "Supermarket deals", badge: "Hot", accent: "#F06A38" },
  { name: "Home essentials", badge: "Save", accent: "#0E9F6E" },
  { name: "Fresh arrivals", badge: "Trending", accent: "#0EA5E9" },
];

export default function CategoriesScreen() {
  const renderTab = (
    label: string,
    icon: string,
    active = false,
    onPress?: () => void,
  ) => (
    <TouchableOpacity
      key={label}
      style={styles.tabItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons
        name={icon as any}
        size={22}
        color={active ? Colors.primary : "#6B7280"}
      />
      <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <View style={styles.headerTextWrap}>
            <Text style={styles.brandTitle}>Categories</Text>
            <Text style={styles.brandCaption}>Browse by department</Text>
          </View>
          <TouchableOpacity style={styles.filterPill} activeOpacity={0.8}>
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchBarContainer}>
          <Ionicons
            name="search-outline"
            size={18}
            color="#8E98A8"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search categories or products"
            placeholderTextColor={Colors.inputPlaceholder}
            value=""
            editable={false}
          />
          <TouchableOpacity style={styles.micButton} activeOpacity={0.7}>
            <Ionicons name="mic-outline" size={18} color="#8E98A8" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.featuredCard}
          activeOpacity={0.9}
          onPress={() => router.push("/all-products")}
        >
          <LinearGradient
            colors={["#524DEB", "#6F63FF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.featuredGradient}
          >
            <View style={styles.featuredHeaderRow}>
              <Text style={styles.featuredEyebrow}>Curated collection</Text>
              <View style={styles.promoChip}>
                <Ionicons
                  name="flash-outline"
                  size={12}
                  color={Colors.textInverse}
                />
                <Text style={styles.promoChipText}>Hot deals</Text>
              </View>
            </View>

            <Text style={styles.featuredTitle}>All products</Text>
            <Text style={styles.featuredSubtitle}>
              Explore the full BuyTown marketplace in one tap.
            </Text>

            <View style={styles.featuredStatsRow}>
              <View style={styles.featuredStat}>
                <Text style={styles.featuredStatNumber}>12K+</Text>
                <Text style={styles.featuredStatLabel}>items</Text>
              </View>
              <View style={styles.featuredStat}>
                <Text style={styles.featuredStatNumber}>30 min</Text>
                <Text style={styles.featuredStatLabel}>fast drop</Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Popular categories</Text>
          <TouchableOpacity
            onPress={() => router.push("/all-products")}
            activeOpacity={0.8}
          >
            <Text style={styles.sectionAction}>See all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categoryGrid}>
          {quickCategories.map((item, index) => (
            <TouchableOpacity
              key={item.name}
              style={styles.categoryCard}
              activeOpacity={0.85}
              onPress={() => router.push("/all-products")}
            >
              <LinearGradient
                colors={item.color}
                style={styles.categoryIconWrap}
              >
                <Ionicons
                  name={item.icon as any}
                  size={22}
                  color={Colors.textPrimary}
                />
              </LinearGradient>
              <Text style={styles.categoryName}>{item.name}</Text>
              <Text style={styles.categoryMeta}>{item.count} items</Text>
              {index === 0 && (
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryBadgeText}>Top</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Top picks</Text>
          <TouchableOpacity
            onPress={() => router.push("/all-products")}
            activeOpacity={0.8}
          >
            <Text style={styles.sectionAction}>Explore</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.picksRow}>
          {topPicks.map((pick) => (
            <TouchableOpacity
              key={pick.name}
              style={styles.pickCard}
              onPress={() => router.push("/all-products")}
              activeOpacity={0.85}
            >
              <View
                style={[styles.pickDot, { backgroundColor: pick.accent }]}
              />
              <Text style={styles.pickName}>{pick.name}</Text>
              <View
                style={[
                  styles.pickBadge,
                  { backgroundColor: `${pick.accent}1A` },
                ]}
              >
                <Text style={[styles.pickBadgeText, { color: pick.accent }]}>
                  {pick.badge}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.tabBar}>
        {renderTab("Home", "home-outline", false, () => router.push("/home"))}
        {renderTab("Categories", "grid", true)}
        {renderTab("Cart", "bag-handle-outline", false, () =>
          router.push("/cart"),
        )}
        {renderTab("Account", "person-outline", false, () =>
          router.push("/account"),
        )}
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
  content: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 30,
    maxWidth: 520,
    alignSelf: "center",
    width: "100%",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  headerTextWrap: {
    flex: 1,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.textPrimary,
    letterSpacing: -0.4,
  },
  brandCaption: {
    marginTop: 1,
    fontSize: 12,
    fontWeight: "600",
    color: Colors.textMuted,
  },
  filterPill: {
    backgroundColor: "#F1F3F7",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  filterText: {
    fontSize: 12.5,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  searchBarContainer: {
    height: 46,
    borderRadius: 23,
    backgroundColor: "#F1F3F7",
    borderWidth: 1,
    borderColor: "#E7EAF0",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 18,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: 14,
    padding: 0,
  },
  micButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  featuredCard: {
    borderRadius: 24,
    overflow: "hidden",
    ...Shadows.card,
  },
  featuredGradient: {
    paddingHorizontal: 18,
    paddingVertical: 18,
    minHeight: 188,
  },
  featuredHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  featuredEyebrow: {
    color: "#E8E9FF",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  promoChip: {
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  promoChipText: {
    color: Colors.textInverse,
    fontSize: 11,
    fontWeight: "700",
  },
  featuredTitle: {
    marginTop: 22,
    fontSize: 32,
    fontWeight: "800",
    color: Colors.textInverse,
    letterSpacing: -0.8,
  },
  featuredSubtitle: {
    marginTop: 8,
    color: "#E5E7FF",
    fontSize: 14,
    lineHeight: 20,
    maxWidth: 240,
  },
  featuredStatsRow: {
    flexDirection: "row",
    marginTop: 22,
    gap: 14,
  },
  featuredStat: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  featuredStatNumber: {
    color: Colors.textInverse,
    fontSize: 18,
    fontWeight: "800",
  },
  featuredStatLabel: {
    color: "#E5E7FF",
    fontSize: 11,
    marginTop: 2,
    textTransform: "lowercase",
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 26,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.textPrimary,
  },
  sectionAction: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: "700",
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  categoryCard: {
    width: "31.5%",
    backgroundColor: Colors.cardBackground,
    borderRadius: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: "#EAF0F7",
    ...Shadows.subtle,
    position: "relative",
  },
  categoryIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  categoryMeta: {
    marginTop: 4,
    fontSize: 11,
    color: Colors.textMuted,
  },
  categoryBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: Colors.primary,
    borderRadius: 999,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  categoryBadgeText: {
    color: Colors.textInverse,
    fontSize: 9,
    fontWeight: "700",
  },
  picksRow: {
    gap: 12,
    marginBottom: 24,
  },
  pickCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EAF0F7",
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...Shadows.subtle,
  },
  pickDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  pickName: {
    flex: 1,
    fontSize: 13.5,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  pickBadge: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  pickBadgeText: {
    fontSize: 10.5,
    fontWeight: "800",
  },
  tabBar: {
    height: 64,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EAECEF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    height: "100%",
  },
  tabLabel: {
    fontSize: 11,
    color: "#6B7280",
    fontWeight: "600",
  },
  tabLabelActive: {
    color: Colors.primary,
    fontWeight: "700",
  },
});
