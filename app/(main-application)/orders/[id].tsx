import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useOrderContext } from "@/context/orders-context";
import TopBar from "@/components/navigation/top-bar";
import formatMoney from "@/utils/format-money";
import getProductImage from "@/utils/get-product-image";
import { FONTS } from "@/constants/fonts";
import { SafeAreaView } from "react-native-safe-area-context";

const OrderDetail = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { orders } = useOrderContext();

  const order = orders.find((order) => order.id === id);

  if (!order) {
    return (
      <View style={styles.container}>
        <TopBar title="Order Detail" />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Order not found</Text>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 20, paddingBottom: 0 }}>
        <TopBar title="Order Detail" />
      </View>
      <ScrollView style={{ marginTop: 10, paddingHorizontal: 20 }}>
        <Text style={styles.orderId}>Order ID: {order.id}</Text>
        <Text style={styles.orderDate}>Date: {new Date(order.createdAt).toDateString()}</Text>
        <View style={styles.orderItems}>
          {order.items.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Image
                source={{ uri: getProductImage(item.product.photos[0].url) }}
                style={styles.itemImage}
              />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.product.name}</Text>
                <Text style={styles.itemPrice}>{formatMoney(item.product.available_quantity)}</Text>
                <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
              </View>
            </View>
          ))}
        </View>
        {/* <Text style={styles.orderTotal}>Total: {formatMoney(order.items)}</Text> */}
        {/* <TouchableOpacity
          style={styles.reorderButton}
          onPress={() => router.push(`/product/${order.items.}`)}
        >
          <Text style={styles.reorderButtonText}>View Product</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  orderDate: {
    fontSize: 14,
    color: "gray",
    marginBottom: 20,
  },
  orderItems: {
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  itemDetails: {
    justifyContent: "center",
  },
  itemName: {
    fontSize: 14,
  },
  itemPrice: {
    fontSize: 14,
    color: "gray",
  },
  itemQuantity: {
    fontSize: 14,
    color: "gray",
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  reorderButton: {
    padding: 15,
    backgroundColor: "#000",
    borderRadius: 5,
    alignItems: "center",
  },
  reorderButtonText: {
    color: "#FFF",
    fontSize: 14,
  },
});
