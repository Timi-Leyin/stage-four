import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useOrderContext } from "@/context/orders-context";
import TopBar from "@/components/navigation/top-bar";
import formatMoney from "@/utils/format-money";
import getProductImage from "@/utils/get-product-image";
import { FONTS } from "@/constants/fonts";
import truncateText from "@/utils/truncate-text";
import { ThemedText } from "@/components/themed/themed-text";

const Orders = () => {
  const router = useRouter();
  const { orders } = useOrderContext();
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 20, paddingBottom: 0 }}>
        <TopBar title="Order History" />
      </View>
      <ScrollView style={{ marginTop: 10, paddingHorizontal: 20 }}>
        {orders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No orders found</Text>
          </View>
        ) : (
          orders.map((order, index) => (
            <View key={index} style={styles.orderContainer}>
              <Text style={[styles.orderId, {fontFamily:FONTS.Arvo.Regular}]}>Order ID: {order.id}</Text>
              <Text style={styles.orderDate}>Date: {order.createdAt?new Date(order.createdAt).toDateString():"N/A"} </Text>
              <View style={styles.orderItems}>
                {order.items.map((item, itemIndex) => (
                  <View key={itemIndex} style={styles.itemContainer}>
                    <Image
                      source={{ uri: getProductImage(item.product.photos[0].url) }}
                      style={styles.itemImage}
                    />
                    <View style={styles.itemDetails}>
                      <Text style={styles.itemName}>{item.product.name}</Text>
                      <Text style={styles.itemName}>{truncateText(item.product.description, 40)}</Text>
                      <Text style={styles.itemPrice}>
                        {formatMoney(item.quantity * item.product.available_quantity)}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
              <ThemedText style={[styles.orderTotal, {fontFamily:FONTS.Arvo.Regular}]}>
                Status: {order.status} 
              </ThemedText>
              <TouchableOpacity
                style={styles.reorderButton}
                onPress={() => router.push(`/orders/${order.id}`)}
              >
                <Text style={styles.reorderButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Orders;

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
  orderContainer: {
    marginBottom: 20,
    borderColor: "#000",
    borderWidth: 1,
    padding: 20,
    borderRadius: 10,
  },
  orderId: {
    fontSize: 16,
    // fontWeight: "bold",
  },
  orderDate: {
    fontSize: 14,
    color: "gray",
    marginBottom: 10,
  },
  orderItems: {
    marginBottom: 10,
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
  orderTotal: {
    fontSize: 16,
    // fontWeight: "bold",
    marginBottom: 10,
  },
  reorderButton: {
    padding: 10,
    backgroundColor: "#000",
    borderRadius: 5,
    alignItems: "center",
  },
  reorderButtonText: {
    color: "#FFF",
    fontSize: 14,
  },
});
