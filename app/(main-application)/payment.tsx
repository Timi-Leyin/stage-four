import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InDeptTopBar from "@/components/navigation/in-dept-top-bar";
import { ThemedText } from "@/components/themed/themed-text";
import { useRouter } from "expo-router";
import { ThemedButton } from "@/components/themed/themed-button";
import { FONTS } from "@/constants/fonts";
import TopBar from "@/components/navigation/top-bar";
import DebitCard from "@/components/common/debit-card";
import {
  formatCardNumber,
  formatCVV,
  formatExpiryDate,
} from "@/utils/format-card";
import { useOrderContext } from "@/context/orders-context";
import { useCart } from "@/context/cart-context";

const Payment = () => {
  const router = useRouter();
  const { cart } = useCart();
  const products = cart.filter((ca) => ca.product);
  const { addOrder } = useOrderContext();
  const [cardNumber, setCardNumber] = useState("");
  const [expireDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleTextChange = (
    text: string,
    handler: React.Dispatch<React.SetStateAction<string>>
  ) => {
    handler(text);
  };

  return (
    <SafeAreaView
      style={{
        padding: 5,
      }}
    >
      <TopBar title="Payment" />
      <ScrollView
        style={{
          margin: 10,
        }}
      >
        <DebitCard cardNumber={cardNumber} expiryDate={expireDate} cvv={cvv} />

        <View>
          <ThemedText
            style={{
              marginTop: 16,
              fontFamily: FONTS.Arvo.Regular,
            }}
            type="default"
          >
            Card Number
          </ThemedText>
          <TextInput
            placeholder="0000 0000 0000 0000"
            keyboardType="numeric"
            value={cardNumber}
            onChangeText={(e) =>
              handleTextChange(formatCardNumber(e), setCardNumber)
            }
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
            flexDirection: "row",
            gap: 15,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flex: 1,
            }}
          >
            <ThemedText
              style={{
                marginTop: 16,
                fontFamily: FONTS.Arvo.Regular,
              }}
              type="default"
            >
              Expiry Date
            </ThemedText>
            <TextInput
              value={expireDate}
              keyboardType="number-pad"
              onChangeText={(e) =>
                handleTextChange(formatExpiryDate(e), setExpDate)
              }
              placeholder="MM/YY"
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
              flex: 1,
            }}
          >
            <ThemedText
              style={{
                marginTop: 16,
                fontFamily: FONTS.Arvo.Regular,
              }}
              type="default"
            >
              CVV
            </ThemedText>
            <TextInput
              onChangeText={(e) => handleTextChange(formatCVV(e), setCvv)}
              maxLength={3}
              value={cvv}
              placeholder="123"
              keyboardType="number-pad"
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
        </View>

        <ThemedButton
          onPress={() => {
            addOrder({
              id: Math.random().toString(32).slice(2),
              customer: {
                address: "ad",
                email: "ot@gmail.com",
                name: "Original Timi",
              },
              items: cart,
              createdAt:new Date(),
              status: "completed",
            });
            router.navigate("/payment-success");
          }}
        >
          Make Payment
        </ThemedButton>

        <View
          style={{
            height: 100,
            marginTop: "auto",
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Payment;

const styles = StyleSheet.create({});
