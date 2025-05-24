import CategoryGrid from "@/components/CategoryGrid";
import Productlist from "@/components/Productlist";
import Slider from "@/components/Slider";
import { Suspense } from "react";
import Skeleton from "@/components/Skeleton";

export default async function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* hero/Banner */}
      <div className="">
        <Slider />
      </div>
      <main>
        <CategoryGrid />

        <Suspense fallback={<Skeleton />}>
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Trending</h2>
            <Productlist limit={6} />
            <h2 className="text-2xl font-bold mb-4">Best Sellers</h2>
            <Productlist limit={6} />
          </div>
        </Suspense>
      </main>
    </div>
  );
}
