import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ViewAllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/orders/all-orders",
          {
            withCredentials: true,
          }
        );

        setOrders(response.data.orders.filter((o) => o.orderStatus !== "Delivered"));
      } catch (error) {
        console.log(error);
      }
    };

    getAllOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setLoadingId(orderId);
    try {
      await axios.put(
        `http://localhost:8000/api/v1/orders/update-order-status/${orderId}`,
        { status: newStatus },
        { withCredentials: true }
      );

      if (newStatus === "Delivered") {
        setOrders((prev) => prev.filter((o) => o._id !== orderId));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update order status");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            All Orders
          </h1>

          <div className="bg-black text-white px-4 py-2 rounded-xl">
            Total Orders : {orders.length}
          </div>
        </div>

        {/* Orders */}
        <div className="grid gap-6">
          {orders?.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border"
            >

              {/* Top Section */}
              <div className="bg-black text-white px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                
                <div>
                  <h2 className="font-bold text-lg">
                    Order ID
                  </h2>
                  <p className="text-sm text-gray-300">
                    {order._id}
                  </p>
                </div>

                <div className="flex gap-4 flex-wrap items-center">

                  {/* Payment */}
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold
                    ${
                      order.paymentInfo?.status === "succeeded"
                        ? "bg-blue-500"
                        : "bg-red-500"
                    }`}
                  >
                    {order.paymentInfo?.status}
                  </span>

                  {/* Status Select */}
                  <select
                    value={order.orderStatus}
                    disabled={loadingId === order._id}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="bg-gray-700 text-white border border-gray-500 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 cursor-pointer"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Delivered">Delivered</option>
                  </select>

                  {loadingId === order._id && (
                    <span className="text-sm text-gray-300">Updating...</span>
                  )}
                </div>
              </div>

              {/* Main Content */}
              <div className="p-6 grid md:grid-cols-3 gap-8">

                {/* Product Section */}
                <div>
                  <h3 className="text-lg font-bold mb-4 text-gray-800">
                    Products
                  </h3>

                  <div className="space-y-4">
                    {order.orderItems?.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center gap-4 border rounded-xl p-3 hover:bg-gray-50 transition"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg border"
                        />

                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {item.name}
                          </h4>

                          <p className="text-sm text-gray-500">
                            Quantity : {item.quantity}
                          </p>

                          <p className="font-bold text-green-600">
                            ${item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Info */}
                <div>
                  <h3 className="text-lg font-bold mb-4 text-gray-800">
                    Shipping Info
                  </h3>

                  <div className="space-y-3 text-gray-700">

                    <p>
                      <span className="font-semibold">Address:</span>{" "}
                      {order.shippingInfo?.address}
                    </p>

                    <p>
                      <span className="font-semibold">City:</span>{" "}
                      {order.shippingInfo?.city}
                    </p>

                    <p>
                      <span className="font-semibold">Country:</span>{" "}
                      {order.shippingInfo?.country}
                    </p>

                    <p>
                      <span className="font-semibold">Zip Code:</span>{" "}
                      {order.shippingInfo?.zipCode}
                    </p>

                    <p>
                      <span className="font-semibold">Mobile:</span>{" "}
                      {order.shippingInfo?.mobileNo}
                    </p>
                  </div>
                </div>

                {/* Pricing */}
                <div>
                  <h3 className="text-lg font-bold mb-4 text-gray-800">
                    Pricing Details
                  </h3>

                  <div className="space-y-3">

                    <div className="flex justify-between text-gray-800">
                      <span>Tax Price</span>
                      <span>${order.taxPrice}</span>
                    </div>

                    <div className="flex justify-between text-gray-800">
                      <span>Shipping Cost</span>
                      <span>${order.shippingCost}</span>
                    </div>

                    <div className="border-t pt-3 flex justify-between text-lg font-bold text-gray-800">
                      <span>Total Price</span>
                      <span className="text-green-600">
                        ${order.totalPrice}
                      </span>
                    </div>

                    <div className="pt-4 text-gray-800">
                      <p className="text-sm text-gray-500">
                        Ordered On
                      </p>

                      <p className="font-medium text-gray-800">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {orders.length === 0 && (
          <div className="bg-white rounded-2xl shadow p-10 text-center mt-6">
            <h2 className="text-2xl font-bold text-gray-700">
              No Orders Found
            </h2>

            <p className="text-gray-500 mt-2">
              Orders will appear here once customers place them.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAllOrders;