"use client";
import React, { useEffect, useState } from "react";
import {
  fetchAllProducts,
  fetchProductByCategory,
  searchProduct,
} from "../lib/productfetchingAPI";
import Productcard from "./Productcard";
import { Product } from "@/lib/types";
import Skeleton from "./Skeleton";

const Productlist = ({
  title,
  category,
  searchParams,
  limit,
}: {
  title?: string;
  category?: string | null;
  searchParams?: string | null;
  limit?: number | null;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    async function fetchproducts() {
      try {
        if (category) {
          const res = await fetchProductByCategory(category, limit ? limit : 0);
          setProducts(res);
        } else if (searchParams) {
          const res = await searchProduct(searchParams);
          setProducts(res);
        } else {
          const res = await fetchAllProducts(limit ? limit : 0);
          setProducts(res);
        }
      } catch (error) {
        console.error("Error :", error);
      } finally {
        setloading(false);
      }
    }

    fetchproducts();
  }, [category, searchParams, limit]);

  if (loading) return <Skeleton />;

  return (
    <div className="px-4 py-4">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4  overflow-x-auto gap-4 pb-4">
        {products?.map((item) => (
          <Productcard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default Productlist;
