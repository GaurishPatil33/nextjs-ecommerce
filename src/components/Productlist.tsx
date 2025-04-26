"use client";
import React, { useEffect, useState } from "react";
import {
  fetchAllProducts,
  fetchProductByCategory,
  searchProduct,
} from "../lib/productfetchingAPI";
import Productcard from "./Productcard";
import { Product } from "@/lib/types";

const Productlist = ({
  title,
  category,
  searchParams,
}: {
  title?: string;
  category?: string | null;
  searchParams?: string | null;
}) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchproducts() {
      try {
        if (category) {
          const res = await fetchProductByCategory(category);
          setProducts(res);
        } else if (searchParams) {
          const res = await searchProduct(searchParams);
          setProducts(res);
        } else {
          const res = await fetchAllProducts();
          setProducts(res);
        }
      } catch (error){
        console.error("Error :",error)
      }
    }

    fetchproducts();
  }, [category, searchParams]);

  return (
    <div className="px-4 py-4">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {products.map((item) => (
          <Productcard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default Productlist;
