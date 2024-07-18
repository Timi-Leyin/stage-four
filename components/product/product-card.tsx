import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import React, { Fragment } from "react";
import { Products } from "@/interfaces/products";
import { ThemedText } from "../themed/themed-text";
import getProductImage from "@/utils/get-product-image";
import { FONTS } from "@/constants/fonts";
import { ThemedButton } from "../themed/themed-button";
import {
  Bookmark,
  Bookmark2,
  Heart,
  HeartAdd,
  ShoppingCart,
} from "iconsax-react-native";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Colors, primaryColor } from "@/constants/colors";
import ProductCartQ from "./product-cart-q";
import truncateText from "@/utils/truncate-text";
import formatMoney from "@/utils/format-money";
import { useCart } from "@/context/cart-context";
import { useRouter } from "expo-router";
import ProductRating from "./product-rating";

const ProductCard = ({ product }: { product: Products }) => {
  const { cart, addToCart, removeFromCart, getProductFromCart } = useCart();
  const router = useRouter();
  const productInCart = getProductFromCart(product.id);
  const addToCartHandler = () => {
    addToCart(product);
  };

  const removeFromCartHandler = () => {
    removeFromCart(product.id);
  };

  const thumbnail = product.photos[0];
  const theme = useColorScheme() ?? "light";
  const secondaryBtnBg = Colors[theme].tint;
  const fallbackThumbnail = require("../../assets/images/placeholder.png");
  // const imgSrc = fallbackThumbnail;
  // const checkCurrentPriceContent =
  //   Object.keys(product.current_price[0]).length >= 1 &&
  //   Boolean(product.current_price[0][Object.keys(product.current_price[0])[0]]);
  // const currentPrice = checkCurrentPriceContent && product.current_price[0];
  // const currency = Object.keys(currentPrice)[0] || "NGN";
  // const discountedPrice =
  //   currentPrice && currentPrice[Object.keys(currentPrice)[0]][0];
  // const price = currentPrice && currentPrice[Object.keys(currentPrice)[0]][1];
  const imgSrc = thumbnail
    ? { uri: getProductImage(thumbnail.url) }
    : fallbackThumbnail;

  const actualPrice = product.available_quantity;

  // console.log(productInCart)
  return (
    <View
      style={{
        width: "50%",
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity
        style={{
          position: "relative",
        }}
        onPress={() => {
          router.navigate(`/product/${product.id}`);
        }}
      >
        <TouchableOpacity
          onPress={() => {
            // router.navigate(`/product/${product.id}`);
          }}
          style={styles.addToWishlist}
        >
          <Bookmark  size={15} color="#fff" />
        </TouchableOpacity>
        <Image
          style={{
            width: "100%",
            backgroundColor: "#eee",
            height: 200,
            objectFit: "cover",
          }}
          source={imgSrc}
        />
        <View
          style={{
            marginVertical: 10,
          }}
        >
          <View>
            <ThemedText type="title" style={styles.styledText}>
              {truncateText(product.name, 40)}
            </ThemedText>
            <ThemedText
              type="default"
              style={{
                fontSize: 12,
                lineHeight: 15,
              }}
            >
              {truncateText(product.description || "", 18) || ""}
            </ThemedText>

            {/* <ProductRating count={4} /> */}
            {actualPrice && (
              <ThemedText
                type="title"
                style={[styles.styledText, styles.price]}
              >
                N{formatMoney(actualPrice)}
              </ThemedText>
            )}

            {!actualPrice && (
              <ThemedText
                type="title"
                style={[{ color: "red" }, styles.styledText, styles.price]}
              >
                OUT OF STOCK
              </ThemedText>
            )}
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.actions}>
        {productInCart ? (
          <ProductCartQ
            increase={addToCartHandler}
            decrease={removeFromCartHandler}
            quantity={productInCart.quantity}
          />
        ) : (
          <ThemedButton outline onPress={addToCartHandler}>
            Add to Cart
          </ThemedButton>
        )}
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  styledText: {
    fontFamily: FONTS.Arvo.Regular,
    fontSize: 15,
    lineHeight: 20,
  },
  addToWishlist: {
    position: "absolute",
    top: 10,
    padding:10,
    right: 10,
    zIndex: 1,
    backgroundColor:primaryColor,
    borderRadius:30
  },
  price: {
    fontSize: 20,
    color: primaryColor,
    marginTop: 5,
    lineHeight: 20,
  },
  badge: {
    backgroundColor: "red",
    color: "#fff",
    fontSize: 10,
    borderRadius: 10,
    textDecorationLine: "none",
  },
  discount: {
    textDecorationLine: "line-through",
    color: "red",
    lineHeight: 15,
    fontSize: 12,
  },
  actions: {
    display: "flex",
    padding: 0,
    gap: 10,
    alignItems: "center",
    marginTop: -10,
    flexDirection: "row",
  },
});
