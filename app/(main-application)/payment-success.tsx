import React, { useEffect, useRef } from "react";
import { Image, View } from "react-native";
import { FONTS } from "@/constants/fonts";
import { ThemedText } from "@/components/themed/themed-text";
import Confetti from "react-native-confetti";
const PaymentSuccess = ({ children }: any) => {
  let confetti = useRef<Confetti>(null!);
  useEffect(() => {
    confetti.current.startConfetti();
  });
  return (
    <View
      style={{
        padding: 6,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Confetti confettiCount={200} ref={confetti} />
      <Image
        source={require("../../assets/images/verified.png")}
        style={{
          height: 250,
          objectFit: "contain",
        }}
        alt=""
      />
      <View>
        <ThemedText
          type="title"
          style={{
            opacity: 0.8,
            textAlign: "center",
            padding: 20,
            fontFamily: FONTS.Arvo.Regular,
          }}
        >
          Payment Successful
        </ThemedText>
        <ThemedText style={{
          textAlign:"center"
        }} type="default">Thanks for your purchase</ThemedText>
      </View>
    </View>
  );
};

export default PaymentSuccess;
