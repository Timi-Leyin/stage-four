import { StyleSheet, Text, View } from "react-native";
import React, { Fragment } from "react";
import { Slot } from "expo-router";
import { ProductsProvider } from "@/context/products-context";
import BottomBar from "@/components/navigation/bottom-bar";
import { CartProvider } from "@/context/cart-context";

const AppLayout = () => {
  return (
    <ProductsProvider>
      <CartProvider>
        <Slot />
        <BottomBar />
      </CartProvider>
    </ProductsProvider>
  );
};

export default AppLayout;

const styles = StyleSheet.create({});
