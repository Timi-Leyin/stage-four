import { ReactNode } from "react";
import { ProductsProvider } from "./products-context";
import { CartProvider } from "./cart-context";
import { WishlistProvider } from "./wishlist-context";
import { OrderProvider } from "./orders-context";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ProductsProvider>
      <CartProvider>
        <WishlistProvider>
          <OrderProvider>{children}</OrderProvider>
        </WishlistProvider>
      </CartProvider>
    </ProductsProvider>
  );
};
