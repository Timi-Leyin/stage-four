import React from "react";
import { Image, View } from "react-native";
import { ThemedText } from "../themed/themed-text";
import { FONTS } from "@/constants/fonts";

const IsEmpty = ({ children }: any) => {
  return (
    <View
      style={{
        padding: 6,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../assets/images/empty-box.png")}
        style={{
          height: 250,
          objectFit: "contain",
        }}
        alt=""
      />
      <ThemedText
        type="title"
        style={{
          opacity: 0.8,
          textAlign: "center",
          padding: 20,
          fontFamily: FONTS.Arvo.Regular,
        }}
      >
        {children}
      </ThemedText>
    </View>
  );
};

export default IsEmpty;
