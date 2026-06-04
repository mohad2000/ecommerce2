import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart } = useCart();

  const { id } = useParams();

  const getProductDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/products/product-detail/${id}`
      );
      setProduct(response.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, [id]);

  // Loading
  if (!product) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* ================= IMAGE SECTION ================= */}
        <div className="space-y-4">

          {/* Main Image */}
          <div className="bg-base-200 rounded-2xl p-6 flex justify-center items-center shadow-lg">

            <img
              src={
                product?.images?.[activeImage]?.url ||
                "https://via.placeholder.com/400"
              }
              alt={product.title}
              className="max-h-[400px] object-contain transition duration-300 hover:scale-105"
            />

          </div>

          {/* Thumbnails */}
          <div className="flex gap-3">

            {product?.images?.map((img, index) => (
              <img
                key={index}
                src={img.url}
                onClick={() => setActiveImage(index)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${activeImage === index
                  ? "border-warning"
                  : "border-transparent"
                  }`}
              />
            ))}

          </div>

        </div>

        {/* ================= DETAILS ================= */}
        <div className="space-y-5">

          {/* Title */}
          <h1 className="text-4xl font-bold leading-tight">
            {product.title}
          </h1>

          {/* Rating (UI فقط) */}
          <div className="rating rating-sm">
            <input type="radio" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" className="mask mask-star-2 bg-orange-400" defaultChecked />
            <input type="radio" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" className="mask mask-star-2 bg-orange-400" />
            <input type="radio" className="mask mask-star-2 bg-orange-400" />
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">

            <span className="text-3xl font-bold text-warning">
              ${product.price}
            </span>

            <span className="line-through text-gray-400">
              ${product.price + 10}
            </span>

            <span className="badge badge-success">
              Sale
            </span>

          </div>

          {/* Description */}
          <p className="text-gray-500 leading-relaxed">
            {product.description || "No description available"}
          </p>

          {/* Quantity */}
          <div className="flex items-center gap-4">

            <span className="font-semibold">Quantity:</span>

            <div className="flex items-center gap-3 bg-base-200 px-4 py-2 rounded-xl">

              <button
                className="btn btn-xs"
                onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
              >
                -
              </button>

              <span className="font-bold">{qty}</span>

              <button
                className="btn btn-xs"
                onClick={() => setQty(qty + 1)}
              >
                +
              </button>

            </div>

          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">

            <button
              className="btn btn-warning flex-1"
              onClick={() => {
                addToCart({
                  ...product,
                  quantity: qty,
                });

                
              }}
            >
              Add To Cart
            </button>

            <button className="btn btn-outline flex-1">
              Buy Now
            </button>

          </div>

          {/* Extra Info */}
          <div className="bg-base-200 p-4 rounded-xl mt-4 text-sm space-y-1">

            <p><span className="font-semibold">Category:</span> {product.category || "N/A"}</p>
            <p><span className="font-semibold">Brand:</span> {product.brand || "N/A"}</p>
            <p><span className="font-semibold">Stock:</span> In Stock</p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductDetails;