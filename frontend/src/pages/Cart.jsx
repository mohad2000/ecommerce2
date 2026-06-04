import React from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, decreaseQty, addToCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Cart is empty 🛒</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">

      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-4">

        {cart.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between bg-base-200 p-4 rounded-xl"
          >

            {/* INFO */}
            <div>
              <h2 className="font-bold">{item.title}</h2>
              <p className="text-sm text-gray-500">${item.price}</p>
            </div>

            {/* QUANTITY */}
            <div className="flex items-center gap-2">

              <button
                className="btn btn-xs"
                onClick={() => decreaseQty(item._id)}
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                className="btn btn-xs"
                onClick={() =>
                  addToCart({ ...item, quantity: 1 })
                }
              >
                +
              </button>

            </div>

            {/* REMOVE */}
            <button
              className="btn btn-error btn-sm"
              onClick={() => removeFromCart(item._id)}
            >
              Remove
            </button>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Cart;