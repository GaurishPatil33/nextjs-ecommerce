"use client";

import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

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
    const router = useSearchParams();
    const query = router.get("search");
    const category = router.get("cat");

    return (
      <div className="px-4 md:px-8 lg:px-16 xl:px-32">
        {/* {query.length > 0 ? ( */}
        <div className="">
          <Filter />
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
