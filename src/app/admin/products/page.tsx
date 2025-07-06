"use client";
import Confirmationbox from "@/components/Confirmationbox";
import Paginations from "@/components/Paginations";
import Skeleton from "@/components/Skeleton";

import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Edit,
 
  Filter,
  Grid3X3,
  List,
  Package,
  Plus,
  Search,
  Star,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect,  useState } from "react";
import FilterPanel from "@/components/admin components/Filters";

interface Review {
  userId: string;
  username: string;
  comment: string;
  rating: number;
  date: string;
}
interface ProductInterface {
  _id?: string;
  title: string;
  price: number;
  discountPercentage: number;
  stock: number;
  images: string[];
  media: {
    url: string;
    public_id: string;
    type: string;
  }[];
  category: string;
  description: string;
  reviews: Review[];
  brand: string;
  rating: number;
  status: "active" | "low stock" | "out of stock";
  sales: number;
  createdAt?: string;
  updatedAt?: string;
}
type ViewMode = "grid" | "list";

interface FilterConfig {
  key: string;
  label: string;
  type: "single" | "multi";
  options: { value: string; label: string }[];
  placeholder: string;
  maxSelections?: number;
}

interface ProductCardProps {
  product: ProductInterface;
}

const ProductPage = () => {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [showFilters, setShowFilters] = useState(false);

  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState<ProductInterface>();

  const [currentPage, setCurrentPage] = useState(1);
  // const productsPerPage = 2;
  const productsPerPage = viewMode === "grid" ? 4 : 8;

  const [filters, setFilters] = useState<Record<string, string | string[]>>({});

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/api/product");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching : ", err);
    } finally {
      setLoading(false);
    }
  };

  //creating filters
  const filterConfig: FilterConfig[] = [
    {
      key: "category",
      label: "Category",
      type: "single",
      options: Array.from(new Set(products.map((p) => p.category))).map(
        (c) => ({
          value: c,
          label: c,
        })
      ),
      placeholder: "All Categories",
    },
    {
      key: "brand",
      label: "Brand",
      type: "multi",
      options: Array.from(new Set(products.map((p) => p.brand))).map((c) => ({
        value: c,
        label: c,
      })),
      placeholder: "All Brands",
    },
    {
      key: "stock",
      label: "Stock",
      type: "single",
      options: [
        { value: "in", label: "In Stock" },
        { value: "out", label: "Out of Stock" },
      ],

      placeholder: "All ",
    },
  ];

  // for initial product fetching
  useEffect(() => {
    fetchProducts();
  }, []);

  // for reset pagination on search/filter
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  const confirmDelete = (product: ProductInterface) => {
    setDeleteProduct(product);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    if (!deleteProduct) return;
    try {
      await axios.delete(`/api/product?id=${deleteProduct._id}`);
      setDeleteProduct(undefined);
      setShowConfirm(false);
      fetchProducts();
      // setProducts((prev) => prev.filter((p: any) => p._id !== id));
    } catch (err) {
      console.error("Error deleting...", err);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());

    const { price, rating, category, status, brand } = p;

    const selectedCategory = filters.category as string;
    const selectedBrand = (filters.brand as string[]) || [];
    const selectedStatus = (filters.status as string[]) || [];
    const selectedPrice = filters.price as string;

    const selectedRating = filters.rating as string;

    let match = true;

    if (selectedCategory) {
      match &&= category === selectedCategory;
    }
    if (selectedBrand.length > 0) {
      match &&= selectedBrand.includes(brand);
    }

    if (selectedStatus.length > 0) {
      match &&= selectedStatus.includes(status);
    }


    if (selectedPrice) {
      if (selectedPrice.includes("+")) {
        const min = parseFloat(selectedPrice.replace("+", ""));
        match &&= price >= min;
      } else {
        const [min, max] = selectedPrice.split("-").map(Number);
        match &&= price >= min && price <= max;
      }
    }

    const selectedStock = Array.isArray(filters.stock)
      ? filters.stock
      : [filters.stock].filter(Boolean); 

    if (selectedStock.length > 0) {
      match &&= selectedStock.some((s) =>
        s === "in" ? p.stock > 0 : p.stock === 0
      );
    }

    if (selectedRating) {
      const [min, max] = selectedRating.includes("-")
        ? selectedRating.split("-").map(Number)
        : [parseFloat(selectedRating), 5];
      match &&= rating >= min && rating <= max;
    }

    return match && matchSearch;
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const getStatusColor = (status: ProductInterface["status"]): string => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "out of stock":
        return "bg-red-100 text-red-800";
      case "low stock":
        return "bg-yellow-100 text-yellow-800";
      // case "draft":
      //   return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-lg transition-all duration-300"
    >
      <div className="relative mb-4">
        <img
          src={product.media[0].url}
          alt={product.title}
          className="w-full h-48 object-contain rounded-xl"
        />
        <div className="absolute top-3 right-3">
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
              product.status
            )}`}
          >
            {product.status}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900 text-lg truncate">
          {product.title}
        </h3>
        <p className="text-sm text-gray-500">{product.category}</p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            ₹{product.price}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">{product.rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Stock: {product.stock}</span>
          <span className="text-gray-600">Sales: {product.sales}</span>
        </div>

        <div className="flex space-x-2 pt-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 transition-colors text-sm flex items-center justify-center gap-1"
          >
            <Edit size={14} />
            Edit
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 bg-red-500 text-white py-2 px-3 rounded-lg hover:bg-red-600 transition-colors text-sm flex items-center justify-center gap-1"
          >
            <Trash2 size={14} />
            Delete
          </motion.button>
          {/* <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Eye size={14} />
                  </motion.button> */}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="p-3 px-1 max-w-screen mt-15 md:mt-2">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold mb-4">Products</h1>

        <Link href={"/admin/products/new"}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </motion.button>
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-2xl mb-3 shadow-sm border">
        <div className="flex flex-col  lg:justify-between space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 " />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-80"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showFilters ? "rotate-180" : ""
                }`}
              />
            </motion.button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <FilterPanel
                filters={filters}
                onChange={setFilters}
                configs={filterConfig}
              />
            )}
          </AnimatePresence>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">View:</span>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-400 hover:bg-gray-100"
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-400 hover:bg-gray-100"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="">
          <Skeleton />
        </div>
      )}

      {paginatedProducts.length > 0 &&
        (viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {paginatedProducts.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 ">
            {/* <div className=""> */}

            <div className="bg-white md:rounded-2xl rounded shadow-sm border overflow-x-auto">
              <table className="w-full bg-white ">
                <thead>
                  <tr className="border-b border-gray-200">
                    {[
                      "Product",
                      "Category",
                      "Price",
                      "Stock",
                      "Sales",
                      "Actions",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-6 py-4 text-left text-sm font-medium text-gray-900"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedProducts.map((product) => (
                    <motion.tr
                      key={product._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.media[0].url}
                            alt={product.title}
                            className="w-12 h-12 object-contain rounded"
                          />
                          <div className="font-medium text-gray-900 truncate">
                            {product.title}
                          </div>
                          {/* <div className="text-sm text-gray-500">
                          Updated {product.updatedAt}
                        </div> */}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {product.category}
                      </td>
                      <td className="py-4 px-6 font-medium text-gray-900">
                        ₹{product.price}
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {product.stock}
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {product.sales}
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Link href={`/admin/products/${product._id}`}>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className="group flex items-center justify-center gap-1 p-2 rounded-lg transition-colors hover:bg-blue-500"
                            >
                              <Edit
                                size={16}
                                className="text-blue-500 group-hover:text-white"
                              />
                              <span className="text-sm text-white opacity-0 translate-x-2 group-hover:opacity-100  group-hover:translate-x-0 transition-all duration-200">
                                Edit
                              </span>
                            </motion.button>
                          </Link>

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => confirmDelete(product)}
                            className="group flex items-center justify-center gap-1 p-2 rounded-lg transition-colors hover:bg-red-500"
                          >
                            <Trash2
                              size={16}
                              className="text-red-500 group-hover:text-white"
                            />
                            <span className="text-sm text-white opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                              Delete
                            </span>
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-12 text-center shadow-sm border"
        >
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search or filter criteria
          </p>
          <Link href={`/admin/products/new`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
            >
              Add Your First Product
            </motion.button>
          </Link>
        </motion.div>
      )}
      {/* pagination */}
      {totalPages > 1 && (
        <Paginations
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      <Confirmationbox
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Product?"
        message={`Are you sure, you want to delete "${deleteProduct?.title}"? this can not be undone! `}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default ProductPage;
