"use client";
import React from "react";
import {  Search } from "lucide-react";

type FilterType = "all" | "active" | "inactive" | "low_stock" | "out_of_stock";
// type ViewMode = "grid" | "list";
type SortType = "name" | "price" | "stock" | "sold" | "profit" | "rating";

interface FilterControlsProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterType: "all" | "active" | "inactive" | "low_stock" | "out_of_stock";
  setFilterType: (value: FilterType) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  sortBy: string;
  setSortBy: (value: SortType) => void;
  viewMode: "grid" | "list";
  setViewMode: (value: "grid" | "list") => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          {/* Search */}
          <div className="relative">
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
            />
          </div>

          {/* Filter by Status */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as FilterType)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="low_stock">Low Stock</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>

          {/* Filter by Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Furniture">Furniture</option>
            <option value="Home">Home</option>
          </select>
        </div>

        <div className="flex items-center space-x-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value  as SortType)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
            <option value="stock">Sort by Stock</option>
            <option value="sold">Sort by Sales</option>
            <option value="profit">Sort by Profit</option>
            <option value="rating">Sort by Rating</option>
          </select>

          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-2 text-sm ${
                viewMode === "grid"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-2 text-sm ${
                viewMode === "list"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              List
            </button>
          </div>
        </div>
      </div>
    </div>

    // <div className="mt-10 md:mt-1 md:flex-row flex-col gap-4 mb-6 items-center justify-between">
    //   <div className="flex items-center gap-2 w-full md:w-auto">
    //     <Search size={20} />
    //     <input
    //       type="text"
    //       placeholder="Search products..."
    //       className="border border-gray-300 rounded px-3 py-2 w-full md:w-64"
    //       value={searchTerm}
    //       onChange={(e) => setSearchTerm(e.target.value)}
    //     />
    //   </div>

    //   <div className="flex flex-wrap gap-2 items-center">
    //     <select
    //       value={filterType}
    //       onChange={(e) => setFilterType(e.target.value)}
    //       className="px-3 py-2 border rounded"
    //     >
    //       <option value="all">All Status</option>
    //       <option value="active">Active</option>
    //       <option value="inactive">Inactive</option>
    //       <option value="low_stock">Low Stock</option>
    //       <option value="out_of_stock">Out of Stock</option>
    //     </select>

    //     <select
    //       value={selectedCategory}
    //       onChange={(e) => setSelectedCategory(e.target.value)}
    //       className="px-3 py-2 border rounded"
    //     >
    //       <option value="all">All Categories</option>
    //       <option value="Electronics">Electronics</option>
    //       <option value="Fashion">Fashion</option>
    //       <option value="Furniture">Furniture</option>
    //       <option value="Home">Home</option>
    //     </select>

    //     <select
    //       value={sortBy}
    //       onChange={(e) => setSortBy(e.target.value)}
    //       className="px-3 py-2 border rounded"
    //     >
    //       <option value="name">Name</option>
    //       <option value="price">Price</option>
    //       <option value="stock">Stock</option>
    //       <option value="sold">Sold</option>
    //       <option value="profit">Profit</option>
    //       <option value="rating">Rating</option>
    //     </select>

    //     <div className="flex gap-2">
    //       <button
    //         onClick={() => setViewMode("grid")}
    //         className={`p-2 rounded border ${viewMode === "grid" ? "bg-gray-200" : ""}`}
    //         title="Grid View"
    //       >
    //         <LayoutGrid size={18} />
    //       </button>
    //       <button
    //         onClick={() => setViewMode("list")}
    //         className={`p-2 rounded border ${viewMode === "list" ? "bg-gray-200" : ""}`}
    //         title="List View"
    //       >
    //         <List size={18} />
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default FilterControls;
