import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../components/paymentForm";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLIC_KEY
);

const Cart = ({
  cartItems = [],
  removeFromCart,
  updateQuantity,
  clearCart,
}) => {
  const [step, setStep] = useState("cart");

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    country: "",
    zipCode: "",
    mobileNo: "",
  });

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleShippingChange = (e) => {
    setShippingInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePaymentSuccess = () => {
    clearCart();
    setStep("cart");
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">
          Your Cart is Empty
        </h1>

        <p className="text-gray-500 mb-6">
          Looks like you haven't added anything yet.
        </p>

        <Link to="/" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">
        My Cart ({cartItems.length})
      </h1>

      {/* Products */}
      <div className="flex flex-col gap-4">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex flex-col md:flex-row items-center justify-between gap-4 bg-base-200 p-4 rounded-xl shadow"
          >

            {/* IMAGE + INFO */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <img
                src={item.images?.[0]?.url}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-lg"
              />

              <div>
                <h2 className="font-bold">{item.title}</h2>
                <p className="text-sm text-gray-500">{item.category}</p>
                <p className="text-green-600 font-semibold">
                  ${item.price}
                </p>
              </div>
            </div>

            {/* QUANTITY */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(item._id, -1)}
                className="btn btn-sm btn-outline"
              >
                -
              </button>

              <span className="font-bold">{item.quantity}</span>

              <button
                onClick={() => updateQuantity(item._id, 1)}
                className="btn btn-sm btn-outline"
              >
                +
              </button>
            </div>

            {/* REMOVE */}
            <button
              onClick={() => removeFromCart(item._id)}
              className="btn btn-error btn-sm"
            >
              Remove
            </button>

          </div>
        ))}
      </div>

      {/* Checkout */}
      <div className="mt-8 flex justify-end">
        <Elements stripe={stripePromise}>
          <div className="bg-base-200 p-6 rounded-xl shadow w-full max-w-sm">
            <h2 className="text-xl font-bold mb-2">
              Order Summary
            </h2>

            <div className="flex justify-between text-gray-600 mb-1">
              <span>Items</span>
              <span>{cartItems.length}</span>
            </div>

            <div className="flex justify-between text-gray-600 mb-4">
              <span>Total Quantity</span>
              <span>
                {cartItems.reduce(
                  (sum, item) => sum + item.quantity,
                  0
                )}
              </span>
            </div>

            <div className="flex justify-between text-lg font-bold border-t pt-3">
              <span>Grand Total</span>

              <span className="text-green-600">
                ${total.toFixed(2)}
              </span>
            </div>

            {/* Step 1 */}
            {step === "cart" && (
              <button
                onClick={() =>
                  setStep("shipping")
                }
                className="btn btn-primary w-full mt-4"
              >
                Proceed to Checkout
              </button>
            )}

            {/* Step 2 */}
            {step === "shipping" && (
              <form
                onSubmit={handleShippingSubmit}
                className="mt-4 flex flex-col gap-3"
              >
                <h3 className="font-semibold">
                  Shipping Information
                </h3>

                <input
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleShippingChange}
                  placeholder="Address"
                  required
                  className="input input-bordered w-full"
                />

                <input
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleShippingChange}
                  placeholder="City"
                  required
                  className="input input-bordered w-full"
                />

                <input
                  name="country"
                  value={shippingInfo.country}
                  onChange={handleShippingChange}
                  placeholder="Country"
                  required
                  className="input input-bordered w-full"
                />

                <input
                  name="zipCode"
                  value={shippingInfo.zipCode}
                  onChange={handleShippingChange}
                  placeholder="Zip Code"
                  required
                  className="input input-bordered w-full"
                />

                <input
                  name="mobileNo"
                  value={shippingInfo.mobileNo}
                  onChange={handleShippingChange}
                  placeholder="Mobile Number"
                  required
                  className="input input-bordered w-full"
                />

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setStep("cart")
                    }
                    className="btn btn-outline flex-1"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary flex-1"
                  >
                    Continue
                  </button>
                </div>
              </form>
            )}

            {/* Step 3 */}
            {step === "payment" && (
              <div className="mt-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold">
                    Payment Details
                  </h3>

                  <button
                    onClick={() =>
                      setStep("shipping")
                    }
                    className="text-sm text-gray-500"
                  >
                    Back
                  </button>
                </div>

                <PaymentForm
                  total={total}
                  cartItems={cartItems}
                  shippingInfo={shippingInfo}
                  onSuccess={handlePaymentSuccess}
                />
              </div>
            )}
          </div>
        </Elements>
      </div>
    </div>
  );
};

export default Cart;