"use client";
import React from "react";
import { Filter, Search, LayoutGrid, List } from "lucide-react";

export type FilterOption = { label: string; value: string };
export type ViewMode = "grid" | "list";

interface FilterControlsProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;

  filterOptions: FilterOption[];
  filterValue: string;
  setFilterValue: (val: string) => void;

  categoryOptions: FilterOption[];
  categoryValue: string;
  setCategoryValue: (val: string) => void;

  sortOptions: FilterOption[];
  sortValue: string;
  setSortValue: (val: string) => void;

  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  searchTerm,
  setSearchTerm,
  filterOptions,
  filterValue,
  setFilterValue,
  categoryOptions,
  categoryValue,
  setCategoryValue,
  sortOptions,
  sortValue,
  setSortValue,
  viewMode,
  setViewMode,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
      <div className="flex items-center gap-2 w-full md:w-auto">
        <Search size={20} />
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded px-3 py-2 w-full md:w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <select
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          {filterOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <select
          value={categoryValue}
          onChange={(e) => setCategoryValue(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          {categoryOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <select
          value={sortValue}
          onChange={(e) => setSortValue(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded border ${viewMode === "grid" ? "bg-gray-200" : ""}`}
          >
            <LayoutGrid size={18} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded border ${viewMode === "list" ? "bg-gray-200" : ""}`}
          >
            <List size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
