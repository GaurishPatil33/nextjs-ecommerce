import { Select, Text } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useMemo } from "react";

const sortOptions = [
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Rating: High to Low", value: "rating-desc" },
  { label: "Rating: Low to High", value: "rating-asc" },
];

const Sort = () => {
  // const [selectedSort, setSelectedSort] = useState<string>("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedSort = useMemo(() => {
    const current = searchParams.get("sort");
    return current && sortOptions.find((opt) => opt.value === current)
      ? current
      : null;
  }, [searchParams]);

  const updateSingleParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="mb-4 items-end">
      {/* <div className="block text-sm font-medium text-gray-700">Sort By</div>
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
      </select> */}

      <Text className="hidden md:block ">Sort by</Text>
      <Select
        placeholder="Select Sort Option"
        value={selectedSort}
        data={sortOptions}
        clearable
        radius={"md"}
        size={"sm"}
        onChange={(val) => updateSingleParam("sort", val)}
      />
    </div>
  );
};

export default Sort;
