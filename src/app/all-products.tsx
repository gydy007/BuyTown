import { Colors, Shadows } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const filters = ["Popular", "Electronics", "New", "Deals"];

const products = [
  {
    id: 1,
    name: "Aero Mini Speaker",
    price: "₦ 12,500",
    tag: "Best seller",
    accent: "#524DEB",
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    price: "₦ 28,900",
    tag: "Limited",
    accent: "#F06A38",
  },
  {
    id: 3,
    name: "Home Aroma Diffuser",
    price: "₦ 9,700",
    tag: "Trending",
    accent: "#0E9F6E",
  },
  {
    id: 4,
    name: "Glow LED Lamp",
    price: "₦ 15,300",
    tag: "New",
    accent: "#0EA5E9",
  },
  {
    id: 5,
    name: "Urban Canvas Tote",
    price: "₦ 8,200",
    tag: "Hot",
    accent: "#D97706",
  },
  {
    id: 6,
    name: "Flex Wireless Earbuds",
    price: "₦ 19,600",
    tag: "Popular",
    accent: "#7C3AED",
  },
];

export default function AllProductsScreen() {
  const [selectedFilter, setSelectedFilter] = useState("Popular");

  const visibleProducts = useMemo(() => {
    if (selectedFilter === "Popular") return products;
    if (selectedFilter === "Deals") return products.slice().reverse();
    return products.filter(
      (_, index) => index % 2 === 0 || selectedFilter === "New",
    );
  }, [selectedFilter]);

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
      <View style={styles.headerBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-back" size={20} color={Colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerTextWrap}>
          <Text style={styles.headerTitle}>All products</Text>
          <Text style={styles.headerMeta}>{products.length}+ items</Text>
        </View>
        <TouchableOpacity style={styles.cartButton} activeOpacity={0.8}>
          <Ionicons
            name="bag-handle-outline"
            size={18}
            color={Colors.textPrimary}
          />
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
          placeholder="Search all products"
          placeholderTextColor={Colors.inputPlaceholder}
          value=""
          editable={false}
        />
        <TouchableOpacity style={styles.filterButton} activeOpacity={0.7}>
          <Ionicons name="options-outline" size={16} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {filters.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.filterChip,
                selectedFilter === item && styles.filterChipActive,
              ]}
              onPress={() => setSelectedFilter(item)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedFilter === item && styles.filterChipTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.grid}>
          {visibleProducts.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCard}
              activeOpacity={0.9}
            >
              <View
                style={[
                  styles.productArt,
                  { backgroundColor: `${product.accent}15` },
                ]}
              >
                <View
                  style={[
                    styles.productBadge,
                    { backgroundColor: product.accent },
                  ]}
                >
                  <Text style={styles.productBadgeText}>{product.tag}</Text>
                </View>
                <View
                  style={[
                    styles.productShape,
                    { backgroundColor: product.accent },
                  ]}
                />
              </View>
              <Text style={styles.productName}>{product.name}</Text>
              <View style={styles.productFooter}>
                <Text style={styles.productPrice}>{product.price}</Text>
                <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
                  <Ionicons name="add" size={18} color={Colors.textInverse} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.tabBar}>
        {renderTab("Home", "home-outline", false, () => router.push("/home"))}
        {renderTab("Categories", "grid", true)}
        {renderTab("Cart", "bag-handle-outline", false, () =>
          router.push("/home"),
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
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 12,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E8EDF3",
  },
  headerTextWrap: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: Colors.textPrimary,
  },
  headerMeta: {
    marginTop: 2,
    fontSize: 11,
    color: Colors.textMuted,
    fontWeight: "700",
    letterSpacing: 0.7,
  },
  cartButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E8EDF3",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 46,
    borderRadius: 23,
    backgroundColor: "#F1F3F7",
    borderWidth: 1,
    borderColor: "#E7EAF0",
    marginHorizontal: 18,
    paddingHorizontal: 14,
    marginBottom: 12,
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
  filterButton: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: "#EEF0FF",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 18,
    paddingBottom: 24,
  },
  filterRow: {
    paddingVertical: 8,
    gap: 8,
    paddingRight: 20,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8EDF3",
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterChipText: {
    fontSize: 12.5,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  filterChipTextActive: {
    color: "#FFFFFF",
  },
  grid: {
    marginTop: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  productCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#EBEFF5",
    padding: 10,
    ...Shadows.subtle,
  },
  productArt: {
    height: 132,
    borderRadius: 16,
    padding: 10,
    justifyContent: "space-between",
    overflow: "hidden",
  },
  productBadge: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  productBadgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "800",
  },
  productShape: {
    width: 80,
    height: 80,
    borderRadius: 22,
    alignSelf: "center",
    transform: [{ rotate: "15deg" }],
    opacity: 0.9,
  },
  productName: {
    marginTop: 12,
    fontSize: 13.5,
    fontWeight: "700",
    color: Colors.textPrimary,
    lineHeight: 18,
  },
  productFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "800",
    color: Colors.textPrimary,
  },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
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
