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

const CartPage = () => {
  const { cart, addToCart, removeFromCart, clearProductQuantity } = useCart();

  const totalAmount = cart.reduce(
    (sum, cartItem) =>
      sum + cartItem.product.available_quantity * cartItem.quantity,
    0
  );

  const fallback = require("../../assets/images/placeholder.png");

  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      {/* <InDeptTopBar /> */}
      <View style={{
            padding:20,
            paddingBottom:0
      }}>

      <TopBar title="My Carts" />
      </View>
      <ScrollView
        style={{
          marginTop: 10,
          paddingHorizontal: 20,
        }}
      >
        {cart.length === 0 ? (
          <IsEmpty> No item in cart</IsEmpty>
        ) : (
          cart.map((cartItem) => {
            const thumbnail = cartItem.product.photos[0];
            const imgSrc = thumbnail
              ? { uri: getProductImage(thumbnail.url) }
              : fallback;

            return (
              <View key={cartItem.product.id} style={styles.cartItemContainer}>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 2,
                      justifyContent: "space-between",
                    }}
                  >
                    <Image
                      source={imgSrc}
                      style={{
                        width: 60,
                        marginRight: 10,
                        height: 60,
                      }}
                    />
                    <View>
                      <ThemedText type="title" style={styles.productName}>
                        {cartItem.product.name}
                      </ThemedText>
                      <ProductCartQ
                        increase={() => addToCart(cartItem.product)}
                        decrease={() => removeFromCart(cartItem.product.id)}
                        quantity={cartItem.quantity}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  ></View>
                </View>

                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    gap: 20,
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => clearProductQuantity(cartItem.product.id)}
                  >
                    <Trash color="#000" />
                  </TouchableOpacity>
                  <ThemedText style={styles.productPrice}>
                    NGN {formatMoney(cartItem.product.available_quantity)}
                  </ThemedText>
                </View>
              </View>
            );
          })
        )}
        {cart.length > 0 && (
          <View style={styles.totalContainer}>
            <ThemedText
              type="title"
              style={{
                marginVertical: 10,
                fontSize: 20,
                fontFamily: FONTS.Arvo.Regular,
              }}
            >
              Shopping Summary
            </ThemedText>

            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
            >
              <TextInput
                placeholder="Discount Code"
                style={{
                  borderColor: "rgba(0,0,0,0.3)",
                  borderWidth: 1,
                  height: 50,
                  fontFamily:FONTS.Arvo.Regular,
                  padding: 10,
                  flex: 1,
                  borderRadius: 6,
                }}
              />
              <ThemedButton>Apply Code</ThemedButton>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <ThemedText type="subtitle" style={styles.totalText}>
                Total
              </ThemedText>
              <ThemedText type="subtitle" style={styles.totalText}>
                NGN {formatMoney(totalAmount)}
              </ThemedText>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginVertical: 5,
                justifyContent: "space-between",
              }}
            >
              <ThemedText type="subtitle" style={styles.totalText}>
                Delivery Fee
              </ThemedText>
              <ThemedText type="subtitle" style={styles.totalText}>
                NGN 0
              </ThemedText>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginVertical: 5,
                justifyContent: "space-between",
              }}
            >
              <ThemedText type="subtitle" style={styles.totalText}>
                Discount Amount
              </ThemedText>
              <ThemedText type="subtitle" style={styles.totalText}>
                NGN 0
              </ThemedText>
            </View>

            <View
              style={{
                borderStyle: "dashed",
                borderWidth: 1,
                borderColor: "#000",
                width: "100%",
                marginVertical: 10,
              }}
            />

            <View
              style={{
                flexDirection: "row",
                marginVertical: 5,
                justifyContent: "space-between",
              }}
            >
              <ThemedText type="subtitle" style={styles.totalText}>
                Total Amount
              </ThemedText>
              <ThemedText type="subtitle" style={styles.totalText}>
                NGN {formatMoney(totalAmount)}
              </ThemedText>
            </View>

            <ThemedButton
              onPress={() => {
                router.navigate("/checkout");
              }}
              style={{ width: "100%" }}
            >
              Checkout
            </ThemedButton>
          </View>
        )}
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
