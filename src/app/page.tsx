import CategoryGrid from "@/components/CategoryGrid";
import Productlist from "../components/Productlist";
import Slider from "../components/Slider";

export default async function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* hero/Banner */}
      <div className="">
        <Slider />
      </div>
      <main>
        <CategoryGrid />
        <Productlist title="Trending" />
        <Productlist title="Best Sellers" />
      </main>
    </div>
  );
}
