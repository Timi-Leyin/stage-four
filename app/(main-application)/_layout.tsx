import { StyleSheet, Text, View } from "react-native";
import React, { Fragment } from "react";
import { Slot } from "expo-router";
import { ProductsProvider } from "@/context/products-context";
import BottomBar from "@/components/navigation/bottom-bar";
import { CartProvider } from "@/context/cart-context";
import { WishlistProvider } from "@/context/wishlist-context";

const AppLayout = () => {
  return (
    <ProductsProvider>
      <CartProvider>
        <WishlistProvider>
          <Slot />
        </WishlistProvider>
        <BottomBar />
      </CartProvider>
    </ProductsProvider>
  );
};

export default AppLayout;

const styles = StyleSheet.create({});
