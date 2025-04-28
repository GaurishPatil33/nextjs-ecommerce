import { Product, ProductInterface } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface FilterProps {
  products: Product[];
}

const Filter = ({ products }: FilterProps) => {
  const [selectedSort, setSelectedSort] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedRatings, setSelectedRatings] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<string>("");
  const [selectedDiscount, setSelectedDiscount] = useState<string>("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const categories = Array.from(
    new Set(products?.map((product) => product.category))
  );
  const brands = Array.from(new Set(products?.map((product) => product.brand)));

  const sortOptions = [
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Rating: High to Low", value: "rating-desc" },
    { label: "Rating: Low to High", value: "rating-asc" },
  ];

  useEffect(() => {
    setSelectedCategory(searchParams.get("cat") || "");
    setSelectedBrand(searchParams.get("brand") || "");
    setSelectedRatings(searchParams.get("ratings") || "");
    setSelectedSort(searchParams.get("sort") || "");
    setSelectedDiscount(searchParams.get("discount") || "");
  }, [searchParams]);

  const applyFilters = () => {
    console.log("filters", products);
    const urlParams = new URLSearchParams();
    if (search) urlParams.set("search", search);
    if (selectedCategory) urlParams.set("cat", selectedCategory);
    if (selectedBrand) urlParams.set("brand", selectedBrand);
    if (selectedRatings) urlParams.set("ratings", selectedRatings);
    if (selectedSort) urlParams.set("sort", selectedSort);
    if (selectedPrice) urlParams.set("price", selectedPrice);
    if (selectedDiscount) urlParams.set("discount", selectedDiscount);
    router.push(`?${urlParams.toString()}`);
  };

  const clearFilter = () => {
    setSelectedBrand("");
    setSelectedCategory("");
    setSelectedDiscount("");
    setSelectedPrice("");
    setSelectedRatings("");
    setSelectedSort("");
    router.push(search ? `?search=${search}` : "?");
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-sm mb-8">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Category options */}
      {/* <div className="mb-4">
        <div className="block text-sm font-medium text-gray-700">Category</div>
        <select
          name="category"
          id=""
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 sm:text-sm"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option value={cat} key={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div> */}

      {/* Brand options */}
      {/* <div className="mb-4">
        <div className="block text-sm font-medium text-gray-700">Brand</div>
        <select
          name="brand"
          id=""
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 sm:text-sm"
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          <option value="">All Brands</option>
          {brands.map((brand, i) => (
            <option value={brand} key={i}>
              {brand}
            </option>
          ))}
        </select>
      </div>  */}

      {/* rating options */}
      {/* <div className="mb-4">
        <div className="block text-sm font-medium text-gray-700">Rating</div>
        <select
          name="rating"
          id=""
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 sm:text-sm"
          value={selectedRatings}
          onChange={(e) => setSelectedRatings(e.target.value)}
        >
          <option value="">All Rating</option>
          {[...Array(5)].map((_, i) => (
            <option value={i + 1} key={i}>
              {i + 1} star & up
            </option>
          ))}
        </select>
      </div> */}

      {/* discount options */}
      {/* <div className="mb-4">
        <div className="block text-sm font-medium text-gray-700">Discount</div>
        <select
          name="Discount"
          id=""
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 sm:text-sm"
          value={selectedDiscount}
          onChange={(e) => setSelectedDiscount(e.target.value)}
        >
          <option value="">Select Discount</option>
          {[...Array(10)].map((_, i) => (
            <option value={(i + 1) * 10} key={i}>
              {(i + 1) * 10} % and above
            </option>
          ))}
        </select>
      </div> */}

      {/* Sort options */}
      <div className="mb-4">
        <div className="block text-sm font-medium text-gray-700">Sort By</div>
        <select
          name="sort"
          id=""
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 sm:text-sm"
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value)}
        >
          <option value="">Select Sort Option</option>
          {sortOptions.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {/* Apply/clear Filters Button */}
      <div className=" flex flex-col gap-2">
        <button
          onClick={applyFilters}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Apply Filters
        </button>
        <button
          onClick={clearFilter}
          className="w-full bg-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-400"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
