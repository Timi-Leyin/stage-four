import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useGlobalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import InDeptTopBar from "@/components/navigation/in-dept-top-bar";
import { ThemedText } from "@/components/themed/themed-text";
import { FONTS } from "@/constants/fonts";
import { ThemedButton } from "@/components/themed/themed-button";
import { Bookmark, ShoppingCart } from "iconsax-react-native";
import ProductImageGallery from "@/components/product/product-image-gallery";
import { useFetch } from "@/hooks/use-fetch";
import { GET_PRODUCT } from "@/api/products";
import formatMoney from "@/utils/format-money";
import ProductCartQ from "@/components/product/product-cart-q";
import { useCart } from "@/context/cart-context";
import { ProductPlaceholder } from "@/components/loading-placeholders/product-placeholder";
import ProductRating from "@/components/product/product-rating";
import { primaryColor } from "@/constants/colors";
import { useWishlist } from "@/context/wishlist-context";

const ProductDetailScreen = () => {
  const { id: productId } = useGlobalSearchParams();
  const { getProductFromWishlist, removeFromWishlist, addToWishlist } =
    useWishlist();
  const { cart, addToCart, removeFromCart, getProductFromCart } = useCart();
  const { data, error, fetchData, loading } = useFetch(GET_PRODUCT);
  const category = data ? data.categories.map((c: any) => c.name) : [];
  useEffect(() => {
    fetchData({ productId });
  }, []);

  const productInCart = data && getProductFromCart(data.id);
  const addToCartHandler = () => {
    addToCart(data);
  };

  const removeFromCartHandler = () => {
    removeFromCart(data.id);
  };

  return (
    <View>
      {loading && <ProductPlaceholder />}

      {!loading && data && (
        <SafeAreaView
          style={{
            padding: 20,
          }}
        >
          <InDeptTopBar />
          <ScrollView
            style={{
              marginTop: 15,
            }}
          >
            <ProductImageGallery product={data} />
            <View style={{ marginVertical: 20 }}>
              <ThemedText type="title" style={styles.productName}>
                {data.name}
              </ThemedText>
              {category.map((c: string, index: number) => (
                <ThemedText
                  style={{ textTransform: "uppercase", fontSize: 14 }}
                  type="default"
                  key={index}
                >
                  {c},{" "}
                </ThemedText>
              ))}
              {data.available_quantity && (
                <ThemedText
                  type="title"
                  style={[styles.styledText, styles.price]}
                >
                  NGN {formatMoney(data.available_quantity)}
                </ThemedText>
              )}
              <ProductRating count={2} />
              <ThemedText type="default" style={styles.desc}>
                {data.description}
              </ThemedText>

              <View
                style={{
                  marginVertical: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <View>
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
                <TouchableOpacity
                  onPress={() => {
                    const iswishlist = getProductFromWishlist(
                      productId as string
                    );
                    if (iswishlist) {
                      return removeFromWishlist(productId as string);
                    }
                    addToWishlist(data);
                  }}
                  style={{
                    backgroundColor: primaryColor,
                    padding: 20,
                    borderRadius: 30,
                  }}
                >
                  <Bookmark
                    size={15}
                    variant={
                      getProductFromWishlist(productId as string)
                        ? "Bold"
                        : "Linear"
                    }
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                height: 100,
                marginTop: "auto",
              }}
            />
          </ScrollView>
        </SafeAreaView>
      )}

      {error && !loading && (
        <ThemedText
          type="title"
          style={{
            padding: 20,
            fontFamily: FONTS.Arvo.Regular,
          }}
        >
          An Error Occured, Please Try Again
        </ThemedText>
      )}
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  styledText: {
    fontFamily: FONTS.Arvo.Regular,
    fontSize: 23,
  },
  productName: {
    fontFamily: FONTS.Arvo.Regular,
    marginTop: 10,
  },
  price: {
    fontSize: 20,
    lineHeight: 20,
    paddingVertical: 10,
  },
  desc: {
    fontSize: 12,
    lineHeight: 20,
  },
});
