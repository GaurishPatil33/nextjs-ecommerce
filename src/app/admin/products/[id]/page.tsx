"use client";
import ProductForm from "@/components/admin components/ProductForm";
import axios from "axios";
import { useParams } from "next/navigation";
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

const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductInterface>();

  useEffect(() => {
    if (!id) return;
    axios.get(`/api/product?id=${id}`).then((res) => setProduct(res.data));
  }, [id]);

  useEffect(() => {
    console.log("Fetched product:", product);
  }, [product]);

  return (
    <div className="p-6">
      <div className="text-2xl font-bold mb-4">Edit Product</div>
      <ProductForm product={product} />
    </div>
  );
};

export default EditProduct;

// const EditProduct = ({ product }: any) => {
//   return (
//     <div className="p-6">
//       <div className="text-2xl font-bold mb-4">Edit Product</div>
//       <ProductForm product={product} />
//     </div>
//   );
// };

// export default EditProduct;

// export async function getServerSideProps(context: any) {
//   const { id } = context.params;
//   const res = await axios.get(`/api/product?id:${id}`);
//   const product = res.data;

//   return { props: { product } };
// }
