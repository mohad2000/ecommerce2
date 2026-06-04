import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Package,
  Users,
  ShoppingCart,
  DollarSign,
} from "lucide-react";

const DashboardHome = () => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(0);
  const [product, setProduct] = useState(0);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/products/get-all-products"
        );

        setProducts(response.data.products);
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    };

    const getCombineStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/users/combin-data",
          {
            withCredentials: true,
          }
        );

        setProduct(response.data.product);
        setUser(response.data.user);
        setTotal(response.data.total);
        setOrder(response.data.order);
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    };

    getAllProducts();
    getCombineStats();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/v1/products/delete-product/${id}`,
        {
          withCredentials: true,
        }
      );

      setProducts((prev) =>
        prev.filter((p) => p._id !== id)
      );

      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete product"
      );
    }
  };

  const stats = [
    {
      title: "Products",
      value: product,
      icon: <Package size={22} />,
      color:
        "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      title: "Users",
      value: user,
      icon: <Users size={22} />,
      color:
        "bg-green-50 text-green-600 border-green-100",
    },
    {
      title: "Orders",
      value: order,
      icon: <ShoppingCart size={22} />,
      color:
        "bg-orange-50 text-orange-600 border-orange-100",
    },
    {
      title: "Revenue",
      value: `$${total || 0}`,
      icon: <DollarSign size={22} />,
      color:
        "bg-purple-50 text-purple-600 border-purple-100",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard Overview
        </h1>

        <p className="text-slate-500 mt-2">
          Monitor your store performance and products.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-slate-200 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">
                  {item.title}
                </p>

                <h2 className="text-3xl font-bold text-slate-800 mt-2">
                  {item.value}
                </h2>
              </div>

              <div
                className={`w-12 h-12 rounded-xl border flex items-center justify-center ${item.color}`}
              >
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Products Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">
            Recent Products
          </h2>

          <p className="text-slate-500 text-sm mt-1">
            Manage products available in your store.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="py-20 text-center">
            <h3 className="text-xl font-semibold text-slate-700">
              No Products Found
            </h3>

            <p className="text-slate-500 mt-2">
              Start by adding your first product.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                    Product
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                    Category
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                    Price
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <img
                          src={
                            item.images?.[0]?.url ||
                            "https://via.placeholder.com/60"
                          }
                          alt={item.title}
                          className="w-14 h-14 rounded-xl object-cover border border-slate-200"
                        />

                        <div>
                          <h3 className="font-semibold text-slate-800">
                            {item.title}
                          </h3>

                          <p className="text-sm text-slate-500">
                            Product ID: {item._id.slice(-6)}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {item.category}
                    </td>

                    <td className="px-6 py-5 font-semibold text-slate-800">
                      ${item.price}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex gap-3">
                        <button
                          onClick={() =>
                            navigate(
                              `/admin-dashboard/update-product/${item._id}`
                            )
                          }
                          className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            deleteProduct(item._id)
                          }
                          className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
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

export default DashboardHome;
