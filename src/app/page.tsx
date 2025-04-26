import CategoryGrid from "@/components/CategoryGrid";
import Productlist from "../components/Productlist";
import Slider from "../components/Slider";
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
          <Productlist title="Trending"  limit={6}/>
        </Suspense>
        <Suspense fallback={<Skeleton />}>
          <Productlist title="Best Sellers" limit={6} />
        </Suspense>
      </main>
    </div>
  );
}
