import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const Sort = () => {
  const [selectedSort, setSelectedSort] = useState<string>("");

  const router = useRouter();
  const searchParams = useSearchParams();

  const sortOptions = [
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Rating: High to Low", value: "rating-desc" },
    { label: "Rating: Low to High", value: "rating-asc" },
  ];

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedSort(value);

    const urlParams = new URLSearchParams(searchParams.toString());
    if (value) urlParams.set("sort", value);
    else urlParams.delete("sort");
    router.push(`?${urlParams.toString()}`);
  };

  return (
    <div className="mb-4">
      <div className="block text-sm font-medium text-gray-700">Sort By</div>
      <select
        id="sort"
        value={selectedSort}
        onChange={handleSortChange}
        className="p-2 border border-gray-300 rounded-md"
      >
        <option value="">Select Sort Option</option>
        {sortOptions.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Sort;
