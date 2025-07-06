"use client";

import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import Skeleton from "@/components/Skeleton";
// import Productlist from "@/components/Productlist";
// import Filter from "@/components/FilterSidebar";
import { Product } from "@/lib/types";
import {
  fetchAllProducts,
  fetchProductByCategory,
  searchProduct,
} from "@/lib/productfetchingAPI";
import Sort from "@/components/Sort";
import Productlist1 from "@/components/Productlist1";
import FilterSidebar from "@/components/FilterSidebar";

const ListingPage = () => {
  const searchParams = useSearchParams();
  // const query = searchParams.get("search");
  // const category = searchParams.get("cat");
  // // const categories = searchParams.getAll("cats")||[];
  // const brand = searchParams.getAll("brand");
  // const sort = searchParams.get("sort");
  // const minPrice = Number(searchParams.get("minPrice"));
  // const maxPrice = Number(searchParams.get("maxPrice"));
  // const rating = Number(searchParams.get("ratings"));
  // const discount = Number(searchParams.get("discount"));

  const query = useMemo(() => searchParams.get("search"), [searchParams]);
  const category = useMemo(() => searchParams.get("cat"), [searchParams]);
  const categories = useMemo(() => searchParams.getAll("cats"), [searchParams]);
  const brands = useMemo(() => searchParams.getAll("brand"), [searchParams]);
  const sort = useMemo(() => searchParams.get("sort"), [searchParams]);
  const minPrice = useMemo(
    () => Number(searchParams.get("minPrice")) || 0,
    [searchParams]
  );
  const maxPrice = useMemo(
    () => Number(searchParams.get("maxPrice")) || Infinity,
    [searchParams]
  );
  const ratings = useMemo(() => searchParams.getAll("ratings"), [searchParams]);
  const discount = useMemo(
    () => Number(searchParams.getAll("discount")) || 0,
    [searchParams]
  );

  const [products, setproducts] = useState<Product[]>([]);
  const [mobileFilters, setMobileFilters] = useState(false);
  const [mobileSort, setMobileSort] = useState(false);

  // const [filterProducts, setFilterProducts] = useState<Product[]>([]);
  // const [categoriesSet, setCategoriesSet] = useState<string[]>([]);

  useEffect(() => {
    const fetchproducts = async () => {
      try {
        let fetchproducts: Product[] = [];
        if (query) {
          fetchproducts = await searchProduct(query);
        } else if (category) {
          fetchproducts = await fetchProductByCategory(category);
        } else {
          fetchproducts = await fetchAllProducts();
        }
        setproducts(fetchproducts);
        // setFilterProducts(fetchproducts);
      } catch (error) {
        console.error("Error :", error);
        setproducts([]);
      }
    };
    fetchproducts();
  }, [query, category]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    // console.log(filtered);

    if (brands.length > 0) {
      filtered = filtered.filter((p) => brands.includes(p.brand));
    }
    if (categories.length > 0) {
      console.log(categories);
      filtered = filtered.filter((p) => categories.includes(p.category));
    }
    if (minPrice || maxPrice) {
      filtered = filtered.filter(
        (p) => p.price >= minPrice && p.price <= maxPrice
      );
    }

    if (ratings.length > 0) {
      const minRating = Math.min(...ratings.map(Number));
      filtered = filtered.filter(
        (p) => (p.rating || 0) >= minRating
        // (p.rating.toString() || 0) >= ratings.toString()
      );
    }

    if (discount > 0) {
      filtered = filtered.filter((p) => p.discountPercentage >= discount);
    }

    if (sort) {
      switch (sort) {
        case "price-asc":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "rating-asc":
          filtered.sort((a, b) => (a.rating || 0) - (b.rating || 0));
          break;
        case "rating-desc":
          filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
      }
    }
    // setFilterProducts(filtered);
    console.log("filtered:", filtered);
    return filtered;
  }, [
    products,
    brands,
    categories,
    minPrice,
    maxPrice,
    ratings,
    discount,
    sort,
  ]);

  
  return (
    <div className="relative px-4 md:px-6 lg:px-16 xl:px-32 mb-2">
      <h1 className=" text-xl font-semibold">
        {query
          ? `Search results for "${query}"`
          : category
          ? `Products in category "${category}"`
          : "All Products"}
      </h1>

      {/* mobile filter and sort option */}
      <div className=" flex justify-between items-center gap-2">
        <button
          onClick={() => {
            setMobileFilters((prev) => !prev);
            setMobileSort(false);
          }}
          className="md:hidden w-1/2 mb-4 px-4 py-2 bg-gray-100 border rounded"
        >
          Filters
        </button>
        <button
          onClick={() => {
            setMobileSort((prev) => !prev);
            setMobileFilters(false);
          }}
          className="md:hidden w-1/2 mb-4 px-4 py-2 bg-gray-100 border rounded"
        >
          Sort by
        </button>
      </div>
      <div className="flex justify-between">
        <div className=" absolute z-11 md:hidden mb-4 flex gap-3 bg-gray-50 rounded">
          {mobileFilters && <FilterSidebar products={products} />}
        </div>
        <div className=" absolute z-11 md:hidden mb-4 flex gap-3  right-2">
          {mobileSort && <Sort />}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 ">
        <div className="hidden md:block gap-3 ">
          {/* <Filter products={products} /> */}
          <FilterSidebar products={products} />
        </div>
        <div className=" md:w-3/4 w-full">
          <div className="hidden md:block">
            <Sort />
          </div>
          {/* <Productlist1 product={filterProducts} /> */}
          <Productlist1 product={filteredProducts} />
        </div>
      </div>
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
