import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  ShoppingCart,
  Clock,
  Truck,
  CheckCircle,
} from "lucide-react";

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

        setOrders(response.data.orders);
      } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            "Failed to load orders"
        );
      }
    };

    getAllOrders();
  }, []);

  const handleStatusChange = async (
    orderId,
    newStatus
  ) => {
    setLoadingId(orderId);

    try {
      const response = await axios.put(
        `http://localhost:8000/api/v1/orders/update-order-status/${orderId}`,
        {
          orderStatus: newStatus,
        },
        {
          withCredentials: true,
        }
      );

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? {
                ...order,
                orderStatus:
                  response.data.order.orderStatus,
              }
            : order
        )
      );

      toast.success("Order updated");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update order"
      );
    } finally {
      setLoadingId(null);
    }
  };

  const totalOrders = orders.length;

  const processingOrders = orders.filter(
    (o) => o.orderStatus === "Processing"
  ).length;

  const shippedOrders = orders.filter(
    (o) => o.orderStatus === "Shipped"
  ).length;

  const deliveredOrders = orders.filter(
    (o) => o.orderStatus === "Delivered"
  ).length;

 return (
  <div className="flex-1 p-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Orders Management
        </h1>

        <p className="text-slate-500 mt-2">
          Track and manage all store orders.
        </p>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">
            All Orders
          </h2>
        </div>

        {orders.length === 0 ? (
          <div className="py-24 text-center">
            <h3 className="text-xl font-semibold text-slate-700">
              No Orders Found
            </h3>

            <p className="text-slate-500 mt-2">
              Orders will appear here once customers purchase.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl">
  <table className="w-full min-w-[900px] border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-left">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-left">
                    Items
                  </th>

                  <th className="px-6 py-4 text-left">
                    Total
                  </th>

                  <th className="px-6 py-4 text-left">
                    Payment
                  </th>

                  <th className="px-6 py-4 text-left">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left">
                    Created
                  </th>

                  <th className="px-6 py-4 text-left">
                    Change Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <h3 className="font-semibold text-slate-800">
                          {order.user?.name ||
                            "Unknown User"}
                        </h3>

                        <p className="text-sm text-slate-500">
                          {order.user?.email}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.orderItems?.length}
                    </td>

                    <td className="px-6 py-5 font-semibold">
                      ${order.totalPrice}
                    </td>

                    <td className="px-6 py-5">
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-600">
                        {order.paymentInfo?.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium
                        ${
                          order.orderStatus ===
                          "Delivered"
                            ? "bg-green-100 text-green-600"
                            : order.orderStatus ===
                              "Shipped"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-orange-100 text-orange-600"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        disabled={
                          loadingId === order._id
                        }
                        value={order.orderStatus}
                        onChange={(e) =>
                          handleStatusChange(
                            order._id,
                            e.target.value
                          )
                        }
                        className="border border-slate-300 rounded-xl px-3 py-2 text-sm"
                      >
                        <option value="Processing">
                          Processing
                        </option>

                        <option value="Shipped">
                          Shipped
                        </option>

                        <option value="Delivered">
                          Delivered
                        </option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAllOrders;
