import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ThemedButton } from "../themed/themed-button";
import { ThemedText } from "../themed/themed-text";
import { TouchableOpacity } from "react-native";
import { Add, Minus } from "iconsax-react-native";
import { FONTS } from "@/constants/fonts";
import { Colors, primaryColor } from "@/constants/colors";

interface ProductQTY {
  quantity: number;
  increase: () => void;
  decrease: () => void;
}

const ProductCartQ = ({ quantity = 0, increase, decrease }: ProductQTY) => {
  const COLOR = "#000";
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.icon}>
        <Minus onPress={decrease} color={COLOR} />
      </TouchableOpacity>
      <Text style={styles.counter}>{quantity}</Text>

      <TouchableOpacity style={styles.icon}>
        <Add onPress={increase} color={COLOR} />
      </TouchableOpacity>
    </View>
  );
};

export default ProductCartQ;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    display: "flex",
    // backgroundColor: primaryColor,
    justifyContent: "space-between",
    alignItems: "center",
    height: 45,
    marginVertical: 15,
    // paddingHorizontal: 20,
    gap: 20,
    width: 120,
    borderRadius: 30,
  },
  icon: {
    padding: 2,
    // backgroundColor: "rgba(0,0,0,0.2)",
    borderColor: "#000",
    borderWidth: 2,
    // borderRadius: 100,
  },
  counter: {
    fontSize: 15,
    // color: "#FFF",
    // flex: 1,
    fontFamily: FONTS.Arvo.Bold,
  },
});
