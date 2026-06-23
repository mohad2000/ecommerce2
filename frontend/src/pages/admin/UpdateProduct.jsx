import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("furniture");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const categories = [
    "furniture",
    "electronics",
    "clothing",
    "bags",
    "sports",
  ];

  const handleImagesChange = async (e) => {
    const files = Array.from(e.target.files);

    const promises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onloadend = () => {
          resolve(reader.result);
        };

        reader.readAsDataURL(file);
      });
    });

    const results = await Promise.all(promises);

    setImages(results);
    setImagePreviews(results);
  };



  useEffect(() => {

    const getProduct = async () => {
      try {
        console.log("images before send:", images);
        
        const response = await axios.get(
          `http://localhost:8000/api/v1/products/product-detail/${id}`
        );
        const p = response.data.product;

        setTitle(p.title);
        setPrice(p.price);
        setDescription(p.description);
        setStock(p.stock);
        setCategory(p.category);

        if (p.images?.length > 0) {
          setImagePreviews(p.images.map((img) => img.url));
        }

      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load product");
      }
    };
    getProduct();
  }, [id]);

  const updateProduct = async (e) => {
    e.preventDefault();

    console.log("Current Images:", images);
    
    try {
      
      const data = {
      title,
      price,
      description,
      stock,
      category,
    };

     if (images.length > 0) {
      data.images = images;
    }

      const response = await axios.put(
        `http://localhost:8000/api/v1/products/update-product/${id}`,
        data,
        { withCredentials: true }
      );

     
      toast.success(response.data.message);
      navigate("/admin-dashboard");

    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden">

        <div className="bg-black text-white px-8 py-6">
          <h1 className="text-3xl font-bold">Update Product</h1>
          <p className="text-gray-300 mt-2">Edit product details and save changes</p>
        </div>

        <form
          onSubmit={updateProduct}
          className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Product Title
            </label>
            <input
              type="text"
              placeholder="Enter product title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Price
            </label>
            <input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Stock Quantity
            </label>
            <input
              type="number"
              placeholder="Available stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Description
            </label>
            <textarea
              rows="5"
              placeholder="Write product description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black resize-none"
            ></textarea>
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Product Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImagesChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-black file:text-white cursor-pointer"
            />
            {imagePreviews.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-3">
                {imagePreviews.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`preview-${i}`}
                    className="w-24 h-24 object-cover rounded-xl border border-gray-300"
                  />
                ))}
              </div>
            )}
          </div>
          {/* <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Product Images
            </label>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImagesChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-black file:text-white cursor-pointer"
            />

            {imagePreviews.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-3">
                {imagePreviews.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`preview-${index}`}
                    className="w-24 h-24 object-cover rounded-xl border border-gray-300"
                  />
                ))}
              </div>
            )}
          </div> */}

          <div className="md:col-span-2 flex gap-4">
            <button
              type="button"
              onClick={() => navigate("/admin-dashboard")}
              className="w-full border-2 border-gray-300 hover:border-gray-400 transition duration-300 text-gray-700 py-4 rounded-2xl font-bold text-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 transition duration-300 text-white py-4 rounded-2xl font-bold text-lg shadow-lg"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;