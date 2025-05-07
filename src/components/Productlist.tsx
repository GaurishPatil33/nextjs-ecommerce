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

interface ProductlistProps {
  title?: string;
  category?: string | null;
  search?: string | null;
  limit?: number;
  product?: Product[];
  sort?: string | null;
  type?: string;
  filters?: {
    brand?: string | null;
    minPrice?: number;
    maxPrice?: number;
    rating?: number;
    discount?: number;
  };
}

const Productlist: React.FC<ProductlistProps> = ({
  title,
  category,
  search,
  limit,
  // product,
  // sort,
  // filters,
  // type,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    async function fetchproducts() {
      try {
        // console.log(type);
        let fetchedProduct: Product[] = [];
        // if (product && product.length > 0) {
        //   fetchedProduct = product;
        // }
        if (category) {
          fetchedProduct = await fetchProductByCategory(category, limit);
        } else if (search) {
          fetchedProduct = await searchProduct(search);
        } else {
          fetchedProduct = await fetchAllProducts(limit);
        }

        // if (filters) {
        //   console.log(filters);
        //   const { brand, minPrice, maxPrice, rating, discount } = filters;
        //   fetchedProduct = fetchedProduct.filter((p) => {
        //     return (
        //       (!brand || p.brand === brand) &&
        //       (!minPrice || p.price >= minPrice) &&
        //       (!maxPrice || p.price <= maxPrice) &&
        //       (!rating || (p.rating || 0) >= rating) &&
        //       (!discount || (p.discountPercentage || 0) >= discount)
        //     );
        //   });
        // }

        // if (sort) {
        //   console.log(sort);
        //   switch (sort) {
        //     case "price-asc":
        //       fetchedProduct.sort((a, b) => a.price - b.price);
        //       break;
        //     case "price-desc":
        //       fetchedProduct.sort((a, b) => b.price - a.price);
        //       break;
        //     case "rating-asc":
        //       fetchedProduct.sort((a, b) => (a.rating || 0) - (b.rating || 0));
        //       break;
        //     case "rating-desc":
        //       fetchedProduct.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        //       break;
        //   }
        // }
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
  }, [
    category,
    search,
    limit,
    // product, sort, filters
  ]);

  // useEffect(() => {
  //   if (!products.length || !sort) return;

  //   const sortedProducts = [...products];

  //   switch (sort) {
  //     case "price-asc":
  //       sortedProducts.sort((a, b) => a.price - b.price);
  //       break;
  //     case "price-desc":
  //       sortedProducts.sort((a, b) => b.price - a.price);
  //       break;
  //     case "rating-asc":
  //       sortedProducts.sort((a, b) => (a.rating || 0) - (b.rating || 0));
  //       break;
  //     case "rating-desc":
  //       sortedProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  //       break;
  //   }

  //   setProducts(sortedProducts);
  //   console.log(products);
  //   console.log(sort);
  // }, [sort, product]);

  if (loading) return <Skeleton />;

  return (
    <div className="px-4 py-4">
      {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
      {/* <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5  overflow-x-auto gap-4 pb-4"> */}
      <div
        className={
          // type === "productsCorosel"
          //   ? "  flex gap-4 overflow-x-auto  pb-2 "
          //   : 
            "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6"
        }
      >
        {products?.map((item) => (
          <div className={"min-w-44 w-60"} key={item.id}>
            <Productcard product={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productlist;
