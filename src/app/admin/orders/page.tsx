"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FilterControls from "@/components/admin components/FilterControls2";
import ProductCard from "@/components/admin components/ProductCard";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  sold: number;
  rating: number;
  reviews: number;
  status: "active" | "inactive" | "out_of_stock" | "low_stock";
  image: string;
  createdAt: string;
  lastUpdated: string;
  profit: number;
  profitMargin: number;
  trend: "up" | "down" | "stable";
}

const ProductDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const products: Product[] = [
    {
      id: "P001",
      name: "iPhone 15 Pro",
      category: "Electronics",
      price: 999,
      cost: 700,
      stock: 45,
      sold: 234,
      rating: 4.8,
      reviews: 156,
      status: "active",
      image: "📱",
      createdAt: "2024-01-15",
      lastUpdated: "2024-06-01",
      profit: 299,
      profitMargin: 30,
      trend: "up",
    },
    {
      id: "P002",
      name: "MacBook Pro M3",
      category: "Electronics",
      price: 1999,
      cost: 1400,
      stock: 12,
      sold: 89,
      rating: 4.9,
      reviews: 78,
      status: "low_stock",
      image: "💻",
      createdAt: "2024-02-20",
      lastUpdated: "2024-05-28",
      profit: 599,
      profitMargin: 30,
      trend: "up",
    },
    {
      id: "P003",
      name: "Nike Air Max 90",
      category: "Fashion",
      price: 129,
      cost: 65,
      stock: 0,
      sold: 456,
      rating: 4.6,
      reviews: 234,
      status: "out_of_stock",
      image: "👟",
      createdAt: "2024-01-10",
      lastUpdated: "2024-06-05",
      profit: 64,
      profitMargin: 50,
      trend: "down",
    },
    {
      id: "P004",
      name: "Wireless Headphones",
      category: "Electronics",
      price: 199,
      cost: 120,
      stock: 78,
      sold: 167,
      rating: 4.4,
      reviews: 89,
      status: "active",
      image: "🎧",
      createdAt: "2024-03-05",
      lastUpdated: "2024-06-02",
      profit: 79,
      profitMargin: 40,
      trend: "stable",
    },
    {
      id: "P005",
      name: "Gaming Chair",
      category: "Furniture",
      price: 299,
      cost: 180,
      stock: 23,
      sold: 78,
      rating: 4.3,
      reviews: 45,
      status: "active",
      image: "🪑",
      createdAt: "2024-02-15",
      lastUpdated: "2024-05-30",
      profit: 119,
      profitMargin: 40,
      trend: "up",
    },
    {
      id: "P006",
      name: "Coffee Maker",
      category: "Home",
      price: 89,
      cost: 45,
      stock: 156,
      sold: 234,
      rating: 4.2,
      reviews: 123,
      status: "active",
      image: "☕",
      createdAt: "2024-01-20",
      lastUpdated: "2024-06-03",
      profit: 44,
      profitMargin: 49,
      trend: "up",
    },
  ];

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === "all" || product.status === filterType;
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      return matchesSearch && matchesFilter && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price":
          return b.price - a.price;
        case "stock":
          return b.stock - a.stock;
        case "sold":
          return b.sold - a.sold;
        case "profit":
          return b.profit - a.profit;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h2 className="text-2xl font-semibold mb-4">Product Dashboard</h2>

      <FilterControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterOptions={[
          { label: "All", value: "all" },
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" },
          { label: "Low Stock", value: "low_stock" },
          { label: "Out of Stock", value: "out_of_stock" },
        ]}
        filterValue={filterType}
        setFilterValue={setFilterType}
        categoryOptions={[
          { label: "All", value: "all" },
          { label: "Electronics", value: "Electronics" },
          { label: "Fashion", value: "Fashion" },
          { label: "Furniture", value: "Furniture" },
          { label: "Home", value: "Home" },
        ]}
        categoryValue={selectedCategory}
        setCategoryValue={setSelectedCategory}
        sortOptions={[
          { label: "Name", value: "name" },
          { label: "Price", value: "price" },
          { label: "Stock", value: "stock" },
          { label: "Sold", value: "sold" },
          { label: "Profit", value: "profit" },
          { label: "Rating", value: "rating" },
        ]}
        sortValue={sortBy}
        setSortValue={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }
      >
        <AnimatePresence>
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
            >
              <ProductCard product={product} viewMode={viewMode} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 text-gray-400"
        >
          No products found.
        </motion.div>
      )}
    </div>
  );
};

export default ProductDashboard;
