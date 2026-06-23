import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Products = () => {
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);


const [search, setSearch] = useState("");
const [keyword, setKeyword] = useState("");

const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);

// Debounce Search
useEffect(() => {
    const timer = setTimeout(() => {
        setCurrentPage(1);
        setKeyword(search);
    }, 400);

    return () => clearTimeout(timer);
}, [search]);

const fetchProducts = async () => {
    try {
        setLoading(true);

        const { data } = await axios.get(
            `http://localhost:8000/api/v1/products/get-all-products?page=${currentPage}&keyword=${keyword}`
        );

        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
    } catch (error) {
        toast.error("Failed to load products");
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
    fetchProducts();
}, [currentPage, keyword]);

const getImage = (product) => {
    return (
        product?.image ||
        product?.images?.[0]?.url ||
        product?.images?.[0] ||
        "https://via.placeholder.com/400x400?text=No+Image"
    );
};

const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
    } else {
        if (currentPage <= 3) {
            pages.push(1, 2, 3, 4, "...", totalPages);
        } else if (currentPage >= totalPages - 2) {
            pages.push(
                1,
                "...",
                totalPages - 3,
                totalPages - 2,
                totalPages - 1,
                totalPages
            );
        } else {
            pages.push(
                1,
                "...",
                currentPage - 1,
                currentPage,
                currentPage + 1,
                "...",
                totalPages
            );
        }
    }

    return pages;
};

return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 pt-28 px-4 pb-32">

        {/* Header */}
        <div className="max-w-6xl mx-auto text-center mb-12">

            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                Our products
            </h1>

            <p className="text-slate-500 mt-3 text-lg">
Discover the best products in a modern style and enjoy a smooth shopping experience            </p>

            <div className="mt-8 flex justify-center">
                <input
                    type="text"
                    placeholder="Search for the product..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-1/2 px-5 py-3 rounded-2xl border border-slate-200
                    shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-100
                    focus:border-blue-500 transition"
                />
            </div>

        </div>

        <div className="max-w-7xl mx-auto">

            {loading ? (
                <div className="flex justify-center py-24">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : products.length === 0 ? (
                <div className="text-center text-slate-500 py-20 text-lg">
No products
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">

                        {products.map((product) => (
                            <Link
                                key={product._id}
                                to={`/product-details/${product._id}`}
                                className="block"
                            >
                                <div
                                    className="bg-white rounded-3xl overflow-hidden
                                    border border-slate-100
                                    shadow-sm hover:shadow-2xl
                                    hover:-translate-y-2
                                    transition-all duration-300 group"
                                >

                                    {/* Image */}
                                    <div className="h-56 overflow-hidden bg-slate-100">
                                        <img
                                            src={getImage(product)}
                                            alt={product?.title}
                                            className="w-full h-full object-cover
                                            group-hover:scale-110 transition duration-500"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">

                                        <h2 className="text-lg font-bold text-slate-900 line-clamp-1">
                                            {product?.title}
                                        </h2>

                                        <p className="text-sm text-slate-500 mt-2 line-clamp-2 min-h-[40px]">
                                            {product?.description}
                                        </p>

                                        <div className="mt-5 flex justify-between items-center">

                                            <span className="text-blue-600 font-extrabold text-xl">
                                                ${product?.price}
                                            </span>

                                            <button
                                                className="bg-blue-600 text-white
                                                px-4 py-2 rounded-xl text-sm
                                                shadow-md hover:shadow-lg
                                                hover:bg-blue-700 transition"
                                            >
                                                Show details
                                            </button>

                                        </div>

                                    </div>

                                </div>
                            </Link>
                        ))}

                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-16">

                            <div
                                className="flex items-center gap-2
                                bg-white border border-slate-200
                                rounded-2xl shadow-sm
                                px-4 py-3"
                            >

                                <button
                                    disabled={currentPage === 1}
                                    onClick={() =>
                                        setCurrentPage((prev) => prev - 1)
                                    }
                                    className="px-4 py-2 rounded-xl
                                    border border-slate-200
                                    hover:border-blue-300
                                    hover:bg-slate-50
                                    disabled:opacity-40
                                    disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>

                                {getPageNumbers().map((page, index) =>
                                    page === "..." ? (
                                        <span
                                            key={index}
                                            className="px-2 text-slate-400"
                                        >
                                            ...
                                        </span>
                                    ) : (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                setCurrentPage(page)
                                            }
                                            className={`w-11 h-11 rounded-xl font-semibold transition-all ${
                                                currentPage === page
                                                    ? "bg-blue-600 text-white shadow-lg"
                                                    : "text-slate-700 hover:bg-slate-100"
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    )
                                )}

                                <button
                                    disabled={currentPage === totalPages}
                                    onClick={() =>
                                        setCurrentPage((prev) => prev + 1)
                                    }
                                    className="px-4 py-2 rounded-xl
                                    border border-slate-200
                                    hover:border-blue-300
                                    hover:bg-slate-50
                                    disabled:opacity-40
                                    disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>

                            </div>

                        </div>
                    )}
                </>
            )}

        </div>

    </div>
);


};

export default Products;
