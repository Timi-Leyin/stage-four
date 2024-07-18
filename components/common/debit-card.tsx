import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { ThemedText } from "../themed/themed-text";
import { FONTS } from "@/constants/fonts";
import { formatCardNumber, formatExpiryDate } from "@/utils/format-card";

const DebitCard = ({
  cardNumber,
  expiryDate,
  cvv,
}: {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}) => {
  return (
    <View style={styles.cardBody}>
      <Image
        style={styles.cardOverlay}
        source={require("../../assets/images/card-asset.png")}
      />
      <View style={styles.cardContent}>
        <ThemedText style={styles.cardNumber}>
          {formatCardNumber(cardNumber) || "0000 0000 0000 0000"}
        </ThemedText>

        <View
          style={{
            flexDirection: "row",
            gap: 30,
          }}
        >
          <View>
            <ThemedText style={[styles.text]}>Card holder name</ThemedText>
            <ThemedText style={styles.boldText}>Original Timi</ThemedText>
          </View>
          <View>
            <ThemedText style={[styles.text]}>Expiry date</ThemedText>
            <ThemedText style={styles.boldText}>
              {formatExpiryDate(expiryDate)}
            </ThemedText>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DebitCard;

const styles = StyleSheet.create({
  cardBody: {
    backgroundColor: "#353535",
    padding: 20,
    height: 200,
    overflow: "hidden",
    position: "relative",
    borderRadius: 20,
  },
  cardOverlay: {
    width: "100%",
    height: 150,
    position: "absolute",
    top: 0,
    right: -65,
    objectFit: "contain",
  },
  cardContent: {
    position: "absolute",
    bottom: 0,
    padding: 20,
  },
  cardNumber: {
    fontSize: 25,
    lineHeight: 30,
    marginBottom: 10,
    fontFamily: FONTS.Arvo.Bold,
    color: "#fff",
  },
  text: {
    color: "#fff",
    fontFamily: FONTS.Arvo.Regular,
    lineHeight: 12,
    fontSize: 12,
  },
  boldText: {
    fontSize: 15,
    color: "#fff",
    fontFamily: FONTS.Arvo.Bold,
  },
});
