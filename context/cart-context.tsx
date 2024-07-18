// src/CartContext.tsx
import { Cart } from '@/interfaces/carts';
import { Products } from '@/interfaces/products';
import React, { createContext, useState, ReactNode, useContext } from 'react';


interface CartContextType {
    cart: Cart[];
    addToCart: (product: Products) => void;
    removeFromCart: (productId: string) => void;
    getProductFromCart: (productId: string) => Cart | undefined;
    clearProductQuantity: (productId: string) => void;
  }
  
  const CartContext = createContext<CartContextType | undefined>(undefined);
  
  export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<Cart[]>([]);
  
    const addToCart = (product: Products) => {
      setCart(prevCart => {
        const existingCartItem = prevCart.find(item => item.product.id === product.id);
        if (existingCartItem) {
          return prevCart.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prevCart, { quantity: 1, product }];
        }
      });
    };
  
    const removeFromCart = (productId: string) => {
      setCart(prevCart => {
        const existingCartItem = prevCart.find(item => item.product.id === productId);
        if (existingCartItem) {
          if (existingCartItem.quantity > 1) {
            return prevCart.map(item =>
              item.product.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            );
          } else {
            return prevCart.filter(item => item.product.id !== productId);
          }
        } else {
          return prevCart;
        }
      });
    };
  
    const getProductFromCart = (productId: string) => {
      return cart.find(item => item.product.id === productId);
    };
  
    const clearProductQuantity = (productId: string) => {
      setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    };
  
    return (
      <CartContext.Provider value={{ cart, addToCart, removeFromCart, getProductFromCart, clearProductQuantity }}>
        {children}
      </CartContext.Provider>
    );
  };
  
  export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error('useCart must be used within a CartProvider');
    }
    return context;
  };