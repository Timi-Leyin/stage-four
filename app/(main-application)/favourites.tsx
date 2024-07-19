import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { Fragment, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/themed/themed-text";
import { ThemedButton } from "@/components/themed/themed-button";
import { useCart } from "@/context/cart-context";
import formatMoney from "@/utils/format-money";
import ProductCartQ from "@/components/product/product-cart-q";
import InDeptTopBar from "@/components/navigation/in-dept-top-bar";
import IsEmpty from "@/components/common/is-empty";
import { useRouter } from "expo-router";
import TopBar from "@/components/navigation/top-bar";
import { Trash } from "iconsax-react-native";
import getProductImage from "@/utils/get-product-image";
import { FONTS } from "@/constants/fonts";
import { useWishlist } from "@/context/wishlist-context";
import ProductCard from "@/components/product/product-card";

const CartPage = () => {
  const { clearWishlist, wishlist } = useWishlist();

  const fallback = require("../../assets/images/placeholder.png");

  const router = useRouter();
//   console.log(wishlist)
  return (
    <SafeAreaView style={styles.container}>
      {/* <InDeptTopBar /> */}
      <View
        style={{
          padding: 20,
          paddingBottom: 0,
        }}
      >
        <TopBar title="Wishlists" />
      </View>
      <ScrollView
        style={{
          marginTop: 10,
          paddingHorizontal: 20,
        }}
      >
        <View>
          {(!wishlist || wishlist.length == 0) ? (
            <IsEmpty>No Whishlist Yet</IsEmpty>
          ) : (
            <View>
              {wishlist &&
                wishlist.map((pro) => {
                  return <ProductCard key={pro.id} width={"100%"} product={pro} />;
                })}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CartPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartText: {
    fontSize: 18,
  },
  cartItemContainer: {
    marginBottom: 20,
    borderColor: "#000",
    borderWidth: 2,
    padding: 20,
    marginVertical: 20,
  },
  productName: {
    fontSize: 13,
  },
  productPrice: {
    fontSize: 16,
    color: "gray",
  },
  totalContainer: {
    marginTop: "auto",
    backgroundColor: "#eee",
    padding: 20,
    borderRadius: 30,
    // alignItems: "center",
  },
  totalText: {
    fontSize: 12,
    lineHeight: 20,
    // fontWeight: "bold",
  },
  checkoutButton: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "#000",
    borderRadius: 5,
  },
});
