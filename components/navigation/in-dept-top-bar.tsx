import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import React from "react";
import { ThemedText } from "../themed/themed-text";
import { ArrowLeft } from "iconsax-react-native";
import { Colors } from "@/constants/colors";
import { useRouter } from "expo-router";

const InDeptTopBar = ({ title = "Back" }) => {
  const theme = useColorScheme() ?? "light";
  const tint = Colors[theme].tint;
  const router = useRouter();
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        {/* <Image
          style={styles.logo}
          source={require("../../assets/images/logo.png")}
        /> */}
        <ArrowLeft color={tint} />
        <ThemedText type="default">{title}</ThemedText>
      </TouchableOpacity>
    </View>
  );
};

export default InDeptTopBar;

const styles = StyleSheet.create({
  logo: {
    height: 40,
    width: 120,
    objectFit: "contain",
  },
});
