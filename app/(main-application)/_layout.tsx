import { StyleSheet, Text, View } from "react-native";
import React, { Fragment } from "react";
import { Slot } from "expo-router";
import { ProductsProvider } from "@/context/products-context";
import BottomBar from "@/components/navigation/bottom-bar";
import { CartProvider } from "@/context/cart-context";
import { WishlistProvider } from "@/context/wishlist-context";
import { OrderProvider } from "@/context/orders-context";
import { Providers } from "@/context";

const AppLayout = () => {
  return (
    <Providers>
      <Slot />
      <BottomBar />
    </Providers>
  );
};

export default AppLayout;

const styles = StyleSheet.create({});
