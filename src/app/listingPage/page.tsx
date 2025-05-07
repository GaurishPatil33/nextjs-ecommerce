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
  const rating = useMemo(() => searchParams.getAll("ratings"), [searchParams]);
  const discount = useMemo(
    () => Number(searchParams.getAll("discount")) || 0,
    [searchParams]
  );

  const [products, setproducts] = useState<Product[]>([]);
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
    if (category?.length) {
      console.log(category);
      filtered = filtered.filter((p) => category.includes(p.category));
    }
    if (minPrice || maxPrice) {
      filtered = filtered.filter(
        (p) => p.price >= minPrice && p.price <= maxPrice
      );
    }

    if (rating.length > 0) {
      filtered = filtered.filter((p) => rating.includes(p.rating.toString()));
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
  }, [products, brands, category, minPrice, maxPrice, rating, discount, sort]);

  // useEffect(() => {
  //   let filtered = [...products];

  //   if (brand) {
  //     console.log(brand);
  //     filtered = filtered.filter((p) => brand.includes(p.brand));
  //     // filtered = filtered.filter((p) => p.brand === brand);
  //   }
  //   if (category) {
  //     filtered = filtered.filter((p) => p.category === category);
  //   }

  //   // if (categories.length>0) {
  //   //   setCategoriesSet(categories)
  //   // }
  //   if (minPrice || maxPrice) {
  //     filtered = filtered.filter(
  //       (p) => p.price >= minPrice && p.price <= maxPrice
  //     );
  //   }

  //   if (rating) {
  //     filtered = filtered.filter((p) => (p.rating || 0) >= rating);
  //   }

  //   if (discount) {
  //     filtered = filtered.filter(
  //       (p) => (p.discountPercentage || 0) >= discount
  //     );
  //   }

  //   if (sort) {
  //     switch (sort) {
  //       case "price-asc":
  //         filtered.sort((a, b) => a.price - b.price);
  //         break;
  //       case "price-desc":
  //         filtered.sort((a, b) => b.price - a.price);
  //         break;
  //       case "rating-asc":
  //         filtered.sort((a, b) => (a.rating || 0) - (b.rating || 0));
  //         break;
  //       case "rating-desc":
  //         filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  //         break;
  //     }
  //   }

  //   setFilterProducts(filtered);
  // }, [
  //   products,
  //   category,
  //   // categories,
  //   brand,
  //   minPrice,
  //   maxPrice,
  //   rating,
  //   discount,
  //   sort,
  // ]);

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 mb-2">
      <h1 className=" text-xl font-semibold">
        {query
          ? `Search results for "${query}"`
          : category
          ? `Products in category "${category}"`
          : "All Products"}
      </h1>
      <div className="flex gap-3">
        <div className="hidden md:block gap-3 ">
          {/* <Filter products={products} /> */}
          <FilterSidebar products={products} />
        </div>
        <div className="">
          <Sort />
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
