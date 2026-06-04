import { Link } from "react-router-dom";
import React from "react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  return (
    <Link to = {`/product-details/${product._id}`}>
   
    <div key={product._id} className="bg-white rounded-2xl p-5 shadow-md hover:-translate-y-2 transition">

      <img
        src={product?.images[0].url}
        className="w-full h-48 object-contain mx-auto"
      />

      <h3 className="mt-3 font-semibold">{product.title}</h3>

      <p className="text-amber-600 font-bold">${product.price}</p>

      <button
        onClick={() => addToCart(product)}
        className="mt-3 w-full bg-amber-500 text-white py-2 rounded-xl"
      >
        Add To Cart
      </button>
    </div>
     </Link>
  );
};

export default ProductCard;
