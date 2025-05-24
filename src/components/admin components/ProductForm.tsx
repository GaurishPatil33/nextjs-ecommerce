"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "@/components/Skeleton";

interface Review {
  userId: string;
  username: string;
  comment: string;
  rating: number;
  date: string;
}

interface ProductInterface {
  _id?: string;
  title: string;
  price: number;
  discountPercentage: number;
  stock: number;
  images: string[];
  category: string;
  description: string;
  reviews: Review[];
  brand: string;
  rating: number;
  createdAt?: string;
  updatedAt?: string;
}

interface ProductFormProps {
  product?: ProductInterface;
  //   onSave: (product: ProductInterface) => void;
}

const ProductForm = ({ product }: ProductFormProps) => {
  const isEdit = !!product?._id;

  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState(product?.title || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || "");
  const [discountPercentage, setDiscountPercentage] = useState(
    product?.discountPercentage || ""
  );
  const [stock, setStock] = useState(product?.stock || "");
  const [brand, setBrand] = useState(product?.brand || "");
  const [category, setCategory] = useState(product?.category || "");
  // const [rating, setRating] = useState(product?.rating || "");
  //   const [thumbnail, setThumbnail] = useState(product?.thumbnail || "");
  const [images, setImages] = useState<string[]>(product?.images || []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      title,
      brand,
      price,
      discountPercentage,
      category,
      description,
      stock,
      // images,
    };
    try {
      console.log(data);
      if (isEdit) {
        await axios.put("/api/product", { ...data, _id: product._id });
      } else {
        // await axios.post("/api/product", data);
        await fetch("/api/product", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  useEffect(() => {
    if (product) {
      setTitle(product.title || "");
      setBrand(product.brand || "");
      setDescription(product.description || "");
      setPrice(product.price || "");
      setDiscountPercentage(product.discountPercentage || "");
      setStock(product.stock || "");
      setCategory(product.category || "");
      setImages(product.images || []);
      setLoading(false);
    }
    console.log("product", product);
  }, [product]);

  const uploadImages = async () => {};

  // if (loading) {
  //   return (
  //     <div className="">
  //       <Skeleton />
  //     </div>
  //   );
  // }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
        <h2 className="text-lg font-semibold">
          {isEdit ? "Edit Product" : "Create Product"}
        </h2>
        <input
          type="text"
          name="title"
          placeholder="Product name/title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded mb-1"
          required
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand name"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full border p-2 rounded mb-1"
          required
        />
        <textarea
          placeholder="Enter product description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded mb-1"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2 rounded mb-1"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Product price"
          value={price}
          onChange={(e) => setPrice(+e.target.value)}
          className="w-full border p-2 rounded mb-1"
          required
        />
        <input
          type="number"
          name="discount"
          placeholder="Discount percentage"
          value={discountPercentage}
          onChange={(e) => setDiscountPercentage(+e.target.value)}
          className="w-full border p-2 rounded mb-1"
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(+e.target.value)}
          className="w-full border p-2 rounded mb-1"
          required
        />
        <div className="">
          <div className="block mb-1 font-medium">Product Images</div>
          <input type="file" multiple onChange={uploadImages} />
          <div className="flex flex-wrap gap-2 mt-2">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={title + (i + 1)}
                className="w-20 h-20 object-cover border rounded"
              />
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 "
        >
          {isEdit ? "Update Product" : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
