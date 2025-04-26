"use client";

import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import Skeleton from "@/components/Skeleton";
import Productlist from "@/components/Productlist";

const SearchProductsPage = () => {
  const router = useSearchParams();
  const query = router.get("search");
  const category = router.get("cat");

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32">
      <h1 className="mt-12 text-xl font-semibold">
        Search results for '{query}'
      </h1>
      <Suspense>
        <Productlist searchParams={query} category={category} />
      </Suspense>
    </div>
  );
};

const DynamicSearchProductsPage = () => {
  return (
    <Suspense fallback={<Skeleton />}>
      <SearchProductsPage />
    </Suspense>
  );
};

export default DynamicSearchProductsPage;
