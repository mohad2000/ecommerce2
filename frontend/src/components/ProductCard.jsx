import { Link } from "react-router-dom";
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product-details/${product._id}`}>
      <div className="bg-white rounded-2xl p-5 shadow-md hover:-translate-y-2 transition">
        <img
          src={product?.images?.[0]?.url}
          alt={product.title}
          className="w-full h-48 object-contain mx-auto"
        />

        <h3 className="mt-3 font-semibold">
          {product.title}
        </h3>

        <p className="text-amber-600 font-bold">
          ${product.price}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;