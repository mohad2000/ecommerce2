import ProductCard from "./ProductCard";
import React from "react";

const ProductsGrid = ({ products }) => {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4">

      {products && products.length > 0 ? (
        products.map((product) => (
          <ProductCard
            key={product._id || product.id}
            product={product}
          />
        ))
      ) : (
        <p className="text-center col-span-full">
          No products found
        </p>
      )}
      
    </div>
  );
};

export default ProductsGrid;
