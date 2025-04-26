"use client";

import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import Skeleton from "@/components/Skeleton";
import Productlist from "@/components/Productlist";
import Filter from "@/components/Filter";

const ListingPage = () => {
  const router = useSearchParams();
  const query = router.get("search");
  const category = router.get("cat");

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32">
      <Filter />
      <h1 className="mt-12 text-xl font-semibold">
        Search results for {query}
      </h1>

      <Productlist searchParams={query} category={category} />
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
