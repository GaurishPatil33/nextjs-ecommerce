"use client";

import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import Skeleton from "@/components/Skeleton";
import Productlist from "@/components/Productlist";
import Filter from "@/components/Filters";
import { Product } from "@/lib/types";
import {
  fetchAllProducts,
  fetchProductByCategory,
  searchProduct,
} from "@/lib/productfetchingAPI";
import Sort from "@/components/Sort";

const ListingPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("search");
  const category = searchParams.get("cat");
  const brand = searchParams.get("brand");
  const sort = searchParams.get("sort");
  const price = searchParams.get("price");
  const rating = searchParams.get("ratings");
  const discount = searchParams.get("discount");

  // const [products, setproducts] = useState<Product[]>([]);
  // const [filterProducts, setFilterProducts] = useState<Product[]>([]);

  // useEffect(() => {
  //   const fetchproducts = async () => {
  //     try {
  //       let fetchproducts: Product[] = [];
  //       if (query) {
  //         fetchproducts = await searchProduct(query);
  //       } else if (category) {
  //         fetchproducts = await fetchProductByCategory(category);
  //       } else {
  //         fetchproducts = await fetchAllProducts();
  //       }
  //       setproducts(fetchproducts);
  //       setFilterProducts(fetchproducts);
  //     } catch (error) {
  //       console.error("Error :", error);
  //     }
  //   };
  //   fetchproducts();
  // }, [query, category]);

  // useEffect(() => {
  //   let updatedProducts = [...products];

  // Apply filters
  // updatedProducts = updatedProducts.filter((p) => {
  //   const matchesCategory =
  //     !category || p.category.toLowerCase().includes(category.toLowerCase());
  //   const matchesBrand =
  //     !brand ||
  //     (p.brand && p.brand.toLowerCase().includes(brand.toLowerCase()));
  //   const matchesRating = !rating || p.rating >= Number(rating);
  //   const matchesDiscount =
  //     !discount || p.discountPercentage >= Number(discount);

  //   const matchesPrice =
  //     !price ||
  //     (() => {
  //       const [min, max] = price.split("-").map(Number);
  //       return p.price >= min && p.price <= max;
  //     })();

  //   return (
  //     matchesCategory &&
  //     matchesBrand &&
  //     matchesRating &&
  //     matchesDiscount &&
  //     matchesPrice
  //   );
  // });

  // Apply sorting
  //   switch (sort) {
  //     case "price-asc":
  //       updatedProducts.sort((a, b) => a.price - b.price);
  //       break;
  //     case "price-desc":
  //       updatedProducts.sort((a, b) => b.price - a.price);
  //       break;
  //     case "rating-asc":
  //       updatedProducts.sort((a, b) => a.rating - b.rating);
  //       break;
  //     case "rating-desc":
  //       updatedProducts.sort((a, b) => b.rating - a.rating);
  //       break;
  //     default:
  //       break;
  //   }

  //   setFilterProducts(updatedProducts);
  // }, [category, brand, rating, sort, discount, price, products]);
  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // }, [filterProducts]);

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32">
      <h1 className="mt-12 text-xl font-semibold">
        {query
          ? `Search results for "${query}"`
          : category
          ? `Products in "${category}"`
          : "All Products"}
      </h1>
      {/* <div className="hidden md:block">
        <Filter products={products} />
      </div> */}

      <div className="w-4">
        <Sort />
      </div>
      <Productlist
        search={query}
        category={category}
        sort={sort}
        // product={filterProducts}
      />
    </div>
  );
};

const DynamicListingPage = () => {
  return (
    <Suspense fallback={<Skeleton />}>
      <ListingPage />
    </Suspense>
  );
};

export default DynamicListingPage;
