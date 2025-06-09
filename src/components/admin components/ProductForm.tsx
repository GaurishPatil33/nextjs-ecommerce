"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import MediaUploader from "./MediaUpload";

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
  media: {
    url: string;
    public_id: string;
    type: string;
  }[];
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
  const route = useRouter();

  const [title, setTitle] = useState(product?.title || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || "");
  const [discountPercentage, setDiscountPercentage] = useState(
    product?.discountPercentage || ""
  );
  const [stock, setStock] = useState(product?.stock || "");
  const [brand, setBrand] = useState(product?.brand || "");
  const [category, setCategory] = useState(product?.category || "");
  const [media, setMedia] = useState<ProductInterface["media"]>(
    product?.media || []
  );

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
      media,
    };
    try {
      console.log(data);
      if (isEdit) {
        await axios.put("/api/product", { ...data, _id: product._id });
      } else {
        await axios.post("/api/product", data);
        route.push("/admin/products");
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
      setMedia(product.media || []);
      // setLoading(false);
    }
    console.log("product", product);
  }, [product]);

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
          min={0}
          step={0.01}
          placeholder="Product price"
          value={price}
          onChange={(e) => setPrice(+e.target.value)}
          className="w-full border p-2 rounded mb-1"
          required
        />
        <input
          type="number"
          name="discount"
          min={0}
          step={0.01}
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
          <div className=" mb-1 font-medium">
            Product media (Images,Videos,YoutubeURL)
          </div>
          <MediaUploader media={media} onChange={setMedia} />
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
