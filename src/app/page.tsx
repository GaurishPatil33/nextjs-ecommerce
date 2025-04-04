import Productlist from "./components/Productlist";
import Slider from "./components/Slider";

export default async function Home() {
  return (
    <div>
      {/* hero/Banner */}
      <div className="">
        <Slider />
        </div>
      <main>
        All products
        <div className="grid grid-cols-4 "></div>
        <Productlist />
      </main>
    </div>
  );
}
