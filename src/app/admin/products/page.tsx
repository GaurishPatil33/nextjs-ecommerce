"use client";
import Confirmationbox from "@/components/Confirmationbox";
import Skeleton from "@/components/Skeleton";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductInterface>();

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/api/product");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching : ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const confirmDelete = (product: any) => {
    setSelectedProduct(product);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    if (!selectedProduct) return;
    try {
      await axios.delete(`/api/product?id=${selectedProduct._id}`);
      setSelectedProduct(undefined);
      setShowConfirm(false);
      fetchProducts();
      // setProducts((prev) => prev.filter((p: any) => p._id !== id));
    } catch (err) {
      console.error("Error deleting...", err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <Link
          href={"/admin/products/new"}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          + Add Product
        </Link>
      </div>

      {/* <table className="w-full border">
        <thead>
          <tr>Name</tr>
          <tr>Images</tr>
          <tr>Price</tr>
          <tr>Stock</tr>
          <tr>Actions</tr>
        </thead>
      </table> */}

      {loading ? (
        <div className="">
          <Skeleton />
        </div>
      ) : (
        <div className="grid gap-4">
          {products.map((p: any) => (
            <div
              key={p._id}
              className="border p-4 rounded shadow-sm flex items-center justify-between "
            >
              <div className="flex items-center justify-between gap-4">
                <p className="font-semibold">{p.title}</p>
                <p className="text-gray-500">{p.brand}</p>
                <p className="text-gray-500">₹ {p.price}</p>
                <p className="text-gray-500">Stock: {p.stock}</p>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/admin/products/${p._id}`}
                  className="bg-blue-500 text-xs px-2 py-1 text-white hover:underline rounded "
                >
                  Edit
                </Link>
                <button
                  className="bg-red-500 text-xs px-2 py-1 text-white hover:bg-red-600 rounded"
                  onClick={() => confirmDelete(p)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Confirmationbox
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Product?"
        message={`Are you sure, you want to delete "${selectedProduct?.title}"? this can not be undone! `}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default ProductPage;
