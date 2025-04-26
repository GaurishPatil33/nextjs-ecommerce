"use client";

import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

import Skeleton from "@/components/Skeleton";
import Productlist from "@/components/Productlist";
import Filter from "@/components/Filter";

const SearchProductContent = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("search");
  const category = searchParams.get("cat");

  return (
    <>
      <h1 className="mt-12 text-xl font-semibold">
        Search results for &quot; {query} &quot;
      </h1>
      <Productlist searchParams={query} category={category} />
    </>
  );
};

const ListingPage = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32">
      <div className="">
        <Filter />

        <Suspense fallback={<Skeleton />}>
          <SearchProductContent />
        </Suspense>
      </div>
    </div>
  );
};

export default ListingPage;
