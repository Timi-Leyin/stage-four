import { Products } from "@/interfaces/products";
import React, { createContext, useState, ReactNode, useContext } from "react";

interface WishlistContextType {
  wishlist: Products[];
  addToWishlist: (product: Products) => void;
  removeFromWishlist: (productId: string) => void;
  getProductFromWishlist: (productId: string) => Products | undefined;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Products[]>([]);

  const addToWishlist = (product: Products) => {
    setWishlist((prevWishlist: any) => {
      const existingWishlistItem = prevWishlist.find(
        (item: { id: string; }) => item.id === product.id
      );
      if (existingWishlistItem) {
        return prevWishlist;
      } else {
        return [...prevWishlist, product ];
      }
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item.id !== productId)
    );
  };

  const getProductFromWishlist = (productId: string) => {
    return wishlist.find((item) => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        getProductFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
