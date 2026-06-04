import { createContext, useContext, useState } from "react";
import React from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((p) => p._id === product._id);

      if (exist) {
        // المنتج موجود → زود الكمية
        return prev.map((p) =>
          p._id === product._id
            ? { ...p, quantity: p.quantity + (product.quantity || 1) }
            : p
        );
      } else {
        // منتج جديد
        return [...prev, { ...product, quantity: product.quantity || 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p._id !== id));
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((p) =>
        p._id === id
          ? { ...p, quantity: p.quantity - 1 }
          : p
      ).filter((p) => p.quantity > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        decreaseQty,
        count: cart.reduce((total, item) => total + item.quantity, 0),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
