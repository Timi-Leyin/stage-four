import { Image, StyleSheet, Text, View, useColorScheme } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Bookmark, Clock, Heart, Notification, ShoppingCart, User } from "iconsax-react-native";
import { Colors } from "@/constants/colors";
import { useRouter } from "expo-router";
import { ThemedText } from "../themed/themed-text";
import { FONTS } from "@/constants/fonts";

const TopBar = ({ title }: { title?: string }) => {
  const router = useRouter();
  const theme = useColorScheme() ?? "light";
  const shadeColor = Colors[theme].tint;
  return (
    <View style={styles.wrapper}>
      <View>
        {title ? (
          <View>
            <ThemedText type="title" style={{fontFamily:FONTS.Arvo.Regular}}>{title}</ThemedText>
          </View>
        ) : (
          <Image
            style={styles.logo}
            source={require("../../assets/images/logo.png")}
          />
        )}
      </View>

      <View style={styles.action}>
        <TouchableOpacity
          onPress={() => {
            router.navigate("/favourites");
          }}
        >
          <Bookmark color={shadeColor} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.navigate("/orders");
          }}
        >
          <Clock color={shadeColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "row",
  },
  logo: {
    height: 50,
    width: 150,
    objectFit: "contain",
  },
  action: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    flexDirection: "row",
  },
});
