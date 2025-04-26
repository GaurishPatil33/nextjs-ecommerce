"use client";

import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { searchProduct } from "../../lib/productfetchingAPI";
import Productcard from "../../components/Productcard";
import { Product } from "@/lib/types";
import Skeleton from "@/components/Skeleton";
import Productlist from "@/components/Productlist";
import Filter from "@/components/Filter";

const ListingPage = () =>
  // {
  //   searchParams,
  //   category,
  // }: {
  //   searchParams?: string;
  //   category?: string;
  // }
  {
    // const [products, setProducts] = useState<Product[]>([]);
    const router = useSearchParams();
    const query = router.get("search");
    const category = router.get("cat");
    // const [searchParams, setSearchParams] = useState("");

    // useEffect(() => {
    //   const fetchProducts = async () => {
    //     if (query) {
    //       try {
    //         const res = await searchProduct(query);
    //         setProducts(res || []);
    //         // console.log(res);
    //       } catch (error) {
    //         console.log("error", error);
    //       }
    //     }
    //   };
    //   fetchProducts();
    // }, [query]);

    // useEffect(() => {
    //   if (query) {
    //     setSearchParams(query);
    //   }
    // }, [query]);

    return (
      // <div className="  ">
      //   {products?.length > 0 ? (
      //     <div className="mt-5 ml-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      //       {products?.map((p) => (
      //         <div
      //           key={p.id}
      //           className="transform transition duration-300 hover:scale-105"
      //         >
      //           <Productcard product={p} />
      //         </div>
      //       ))}
      //     </div>
      //   ) : (
      //     <div className=" flex items-center justify-center h-50 text-lg text-gray-500">
      //       Product not found
      //     </div>
      //   )}
      // </div>

      <div className="px-4 md:px-8 lg:px-16 xl:px-32">
        {/* {query.length > 0 ? ( */}
        <div className="">
          {/* <Filter /> */}
          <h1 className="mt-12 text-xl font-semibold">
            Search results for '{query}'
          </h1>
          <Suspense fallback={<Skeleton />}>
            <Productlist searchParams={query} category={category} />
          </Suspense>
        </div>
        {/* ) : (
          <div className=" flex items-center justify-center h-50 text-lg text-gray-500">
            Product not found
          </div>
        )} */}
      </div>
    );
  };

export default ListingPage;
