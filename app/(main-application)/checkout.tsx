import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, TextInput, View } from "react-native";
import { FONTS } from "@/constants/fonts";
import { ThemedText } from "@/components/themed/themed-text";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "@/components/navigation/top-bar";
import { ThemedButton } from "@/components/themed/themed-button";
import { RadioButton } from "react-native-paper";
import { useRouter } from "expo-router";
import { primaryColor } from "@/constants/colors";
import { DELIVERY_ADDRESS } from "@/constants";

const IsEmpty = ({ children }: any) => {
  const router = useRouter();
  const [choosenAddress, setChoosenAddress] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      {/* <InDeptTopBar /> */}
      <TopBar title="Checkout" />
      <ScrollView
        style={{
          marginTop: 10,
        }}
      >
        <ThemedText style={{ fontFamily: FONTS.Arvo.Regular }} type="subtitle">
          Select how to receive your package(s)
        </ThemedText>

        <ThemedText
          style={{
            marginTop: 16,
            fontFamily: FONTS.Arvo.Regular,
          }}
          type="default"
        >
          Pickup
        </ThemedText>

        {DELIVERY_ADDRESS.map((address, index) => {
          return (
            <View
              key={index}
              style={{
                marginLeft: -6,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <RadioButton
                onPress={() => setChoosenAddress(address)}
                status={address === choosenAddress ? "checked" : "unchecked"}
                color={primaryColor}
                uncheckedColor={primaryColor}
                value={address}
              />
              <ThemedText
                type="subtitle"
                style={{ fontSize: 12, fontFamily: FONTS.Arvo.Regular }}
              >
                {address}
              </ThemedText>
            </View>
          );
        })}

        <View
          style={{
            marginVertical: 10,
          }}
        >
          <ThemedText
            style={{
              marginTop: 16,
              fontFamily: FONTS.Arvo.Regular,
            }}
            type="default"
          >
            Delivery
          </ThemedText>
          <TextInput
            placeholder="Delivery address"
            style={{
              borderColor: "rgba(0,0,0,0.3)",
              padding: 15,
              borderRadius: 10,
              fontFamily: FONTS.Arvo.Regular,

              borderWidth: 1,
              marginTop: 5,
            }}
          />
        </View>

        <View
          style={{
            marginVertical: 10,
          }}
        >
          <ThemedText
            style={{
              marginTop: 16,
              fontFamily: FONTS.Arvo.Regular,
            }}
            type="default"
          >
            Contact
          </ThemedText>
          <TextInput
            placeholder="Phone Number 1"
            style={{
              borderColor: "rgba(0,0,0,0.3)",
              padding: 15,
              borderRadius: 10,
              fontFamily: FONTS.Arvo.Regular,

              borderWidth: 1,
              marginTop: 5,
            }}
          />
          <TextInput
            placeholder="Phone Number 2"
            style={{
              borderColor: "rgba(0,0,0,0.3)",
              padding: 15,
              borderRadius: 10,
              marginTop:10,
              fontFamily: FONTS.Arvo.Regular,

              borderWidth: 1,
            }}
          />
        </View>

        <ThemedButton
          onPress={() => {
            router.navigate("/payment");
          }}
        >
          Go to Payment
        </ThemedButton>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
export default IsEmpty;
