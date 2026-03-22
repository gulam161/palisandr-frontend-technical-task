"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
}

interface ShopContextType {
  cart: CartItem[];
  wishlist: Product[];
  orders: Order[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  isInCart: (productId: number) => boolean;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  clearCart: () => void;
  addOrder: (order: Order) => void;
  cartTotal: number;
  cartCount: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("shop_cart");
    const savedWishlist = localStorage.getItem("shop_wishlist");
    const savedOrders = localStorage.getItem("shop_orders");

    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("shop_cart", JSON.stringify(cart));
      localStorage.setItem("shop_wishlist", JSON.stringify(wishlist));
      localStorage.setItem("shop_orders", JSON.stringify(orders));
    }
  }, [cart, wishlist, orders, isLoaded]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const isInCart = (productId: number) => {
    return cart.some((item) => item.product.id === productId);
  };

  const addToWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.some((item) => item.id === product.id)) return prevWishlist;
      return [...prevWishlist, product];
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId));
  };

  const isInWishlist = (productId: number) => {
    return wishlist.some((item) => item.id === productId);
  };

  const clearCart = () => setCart([]);

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        orders,
        addToCart,
        removeFromCart,
        updateQuantity,
        isInCart,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearCart,
        addOrder,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
