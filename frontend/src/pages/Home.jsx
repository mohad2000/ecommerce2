import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import HeroSection from "../components/HeroSection";
import ProductsGrid from "../components/ProductsGrid";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // Filters State
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`http://localhost:8000/api/v1/products/get-all-products?page=${currentPage}`);
        setProducts(response.data.products || []);

        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    getAllProducts();
  }, [currentPage]);

  // 1. استخراج التصنيفات ديناميكياً
  const categories = useMemo(() => {
    const unique = ["all", ...new Set(products.map((p) => p.category))];
    return unique;
  }, [products]);

  // 2. الفلترة باستخدام useMemo (أداء أفضل من useEffect)
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.price <= Number(search);

      const matchMin = minPrice === "" || p.price >= Number(minPrice);
      const matchMax = maxPrice === "" || p.price <= Number(maxPrice);
      const matchCat = category === "all" || p.category === category;
      return matchSearch && matchMin && matchMax && matchCat;
    });
  }, [products, search, minPrice, maxPrice, category]);

  return (
    <div>
      <HeroSection />
      <div className="mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8">

        {/* SIDEBAR */}
        <aside className="w-full lg:w-1/4">
          <div className="bg-base-200 p-5 rounded-2xl shadow">
            <h2 className="text-xl font-bold mb-4">Filters</h2>
            <input
              type="text"
              placeholder="Search products..."
              className="input input-bordered w-full mb-4"
              onChange={(e) => setSearch(e.target.value)}
            />
          
            
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`btn btn-sm capitalize ${category === cat ? "btn-warning" : "btn-outline"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="w-full lg:w-3/4">
          {loading ? (
            <div className="text-center py-20"><span className="loading loading-spinner loading-lg"></span></div>
          ) : filteredProducts.length > 0 ? (
            <ProductsGrid products={filteredProducts} />
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold">No products found!</h3>
              <p>Try adjusting your filters.</p>
            </div>
          )}
        </main>
      </div>


      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          className="btn btn-outline"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`btn ${currentPage === index + 1
                ? "btn-warning"
                : "btn-outline"
              }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="btn btn-outline"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;