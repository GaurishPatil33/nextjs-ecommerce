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
  search,
  limit,
  product,
  sort,
}: {
  title?: string;
  category?: string | null;
  search?: string | null;
  limit?: number;
  product?: Product[];
  sort?: string | null;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    async function fetchproducts() {
      try {
        let fetchedProduct: Product[] = [];
        if (product && product.length > 0) {
          fetchedProduct = product;
        }
        if (category) {
          fetchedProduct = await fetchProductByCategory(category, limit);
        } else if (search) {
          fetchedProduct = await searchProduct(search);
        } else {
          fetchedProduct = await fetchAllProducts(limit);
        }
        console.log(sort);
        if (sort) {
          switch (sort) {
            case "price-asc":
              fetchedProduct.sort((a, b) => a.price - b.price);
              break;
            case "price-desc":
              fetchedProduct.sort((a, b) => b.price - a.price);
              break;
            case "rating-asc":
              fetchedProduct.sort((a, b) => (a.rating || 0) - (b.rating || 0));
              break;
            case "rating-desc":
              fetchedProduct.sort((a, b) => (b.rating || 0) - (a.rating || 0));
              break;
          }
        }
        // const res = fetchedProduct.sort((a, b) => a.price - b.price);
        console.log(fetchedProduct);
        setProducts(fetchedProduct);
      } catch (error) {
        console.error("Error :", error);
      } finally {
        setloading(false);
      }
    }

    fetchproducts();
    // console.log("products from filters ", products);
  }, [category, search, limit, product, sort]);

  useEffect(() => {
    if (!products.length || !sort) return;

    const sortedProducts = [...products];

    switch (sort) {
      case "price-asc":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "rating-asc":
        sortedProducts.sort((a, b) => (a.rating || 0) - (b.rating || 0));
        break;
      case "rating-desc":
        sortedProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
    }

    setProducts(sortedProducts);
    console.log(products);
    console.log(sort);
  }, [sort, product]);

  if (loading) return <Skeleton />;

  return (
    <div className="px-4 py-4">
      {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6  overflow-x-auto gap-4 pb-4">
        {products?.map((item) => (
          <Productcard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default Productlist;
