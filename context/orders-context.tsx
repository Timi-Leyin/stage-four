import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Cart } from "@/interfaces/carts";

// Define the structure of an order record
interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    address: string;
  };
  items: Cart[];
  status: string;
  createdAt:Date|string|number
}

// Define the context value type
interface OrderContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrder: (orderId: string, updatedOrder: Order) => void;
  removeOrder: (orderId: string) => void;
  getOrderById: (orderId: string) => Order | undefined;

}

// Create the context
const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const ordersData = await AsyncStorage.getItem("@orders");
        if (ordersData) {
          setOrders(JSON.parse(ordersData));
        }
      } catch (error) {
        console.error("Failed to load orders:", error);
      }
    };

    loadOrders();
  }, []);

  useEffect(() => {
    const saveOrders = async () => {
      try {
        await AsyncStorage.setItem("@orders", JSON.stringify(orders));
      } catch (error) {
        console.error("Failed to save orders:", error);
      }
    };

    saveOrders();
  }, [orders]);

  const addOrder = (order: Order) => {
    setOrders([...orders, order]);
  };

  const updateOrder = (orderId: string, updatedOrder: Order) => {
    setOrders(
      orders.map((order) => (order.id === orderId ? updatedOrder : order))
    );
  };

  const removeOrder = (orderId: string) => {
    setOrders(orders.filter((order) => order.id !== orderId));
  };

  const getOrderById = (orderId: string) => {
    return orders.find((order) => order.id === orderId);
  };

  return (
    <OrderContext.Provider
      value={{ orders, addOrder, updateOrder, removeOrder, getOrderById }}
    >
      {children}
    </OrderContext.Provider>
  );
};

// Custom hook to use the OrderContext
export const useOrderContext = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrderContext must be used within an OrderProvider");
  }
  return context;
};
