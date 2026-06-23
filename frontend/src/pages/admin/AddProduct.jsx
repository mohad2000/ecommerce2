import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageBase64s, setImageBase64s] = useState([]);
  const [loading, setLoading] = useState(false);

  const categories = [
    "furniture",
    "electronics",
    "clothing",
    "bags",
    "sports",
  ];

 const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const previews = [];
    const base64s = [];
    let loaded = 0;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result);
        base64s.push(reader.result);
        loaded++;
        if (loaded === files.length) {
          setImagePreviews(previews);
          setImageBase64s(base64s);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const [category, setCategory] = useState(categories[0]);  


  const addProduct = async (e) => {
    e.preventDefault();
if (imageBase64s.length === 0) {
      toast.error("Please select at least one product image");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/products/create-product",
        {
          title,
          description,
          price,
          category,
          stock,
          images : imageBase64s ,
          
        },
        {
          withCredentials: true,
        }
      );

      toast.success(response.data.message);

      // Reset fields
      setTitle("");
      setPrice("");
      setDescription("");
      setStock("");
      setCategory(categories[0]);
      setImagePreviews([]);
      setImageBase64s([]);

    } catch (error) {
      
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Top Heading */}
        <div className="bg-black text-white px-8 py-6">
          <h1 className="text-3xl font-bold">
            Add New Product
          </h1>

          <p className="text-gray-300 mt-2">
            Create and upload new products to your store
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={addProduct}
          className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          {/* Product Title */}
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

          {/* Price */}
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

          {/* Stock */}
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

          {/* Category */}
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

          {/* Description */}
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
         
          {/* Button */}
          <div className="md:col-span-2">
              <button
              type="submit"
              disabled={loading}
              className="w-full bg-black hover:bg-gray-800 transition duration-300 text-white py-4 rounded-2xl font-bold text-lg shadow-lg disabled:opacity-60"
            >
              {loading ? "Uploading..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;