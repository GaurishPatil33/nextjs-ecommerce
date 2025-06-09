"use client";
import Filters, { FilterOption } from "@/components/admin components/Filters";
import Confirmationbox from "@/components/Confirmationbox";
import Paginations from "@/components/Paginations";
import Skeleton from "@/components/Skeleton";

import axios from "axios";
import { Edit3, Eye, Plus, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { IoSearch } from "react-icons/io5";

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
  sales: number;
  createdAt?: string;
  updatedAt?: string;
}

const ProductPage = () => {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchterm, setSearchterm] = useState("");

  const [showFilters, setShowFilters] = useState(false);
  const filterOptions: FilterOption[] = useMemo(
    () => [
      {
        label: "Brand",
        type: "checkbox",
        options: Array.from(new Set(products.map((p) => p.brand))),
      },
      {
        label: "Category",
        type: "checkbox",
        options: Array.from(new Set(products.map((p) => p.category))),
      },
      { label: "Stock", type: "radio", options: ["In Stock", "Out of Stock"] },
    ],
    [products]
  );
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState<ProductInterface>();

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

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

  // for initial product fetching
  useEffect(() => {
    fetchProducts();
  }, []);

  // for reset pagination on search/filter
  useEffect(() => {
    setCurrentPage(1);
  }, [searchterm, selectedFilters]);

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

  const fileteredProducts = products.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(searchterm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchterm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchterm.toLowerCase());

    const brands = selectedFilters["Brand"];
    const matchBrand =
      !brands || brands.length === 0 ? true : brands.includes(p.brand);

    const categories = selectedFilters["Category"];
    const matchcategory =
      !categories || categories.length === 0
        ? true
        : categories.includes(p.category);

    const stock = selectedFilters["Stock"];
    const matchStock =
      !stock || stock.length === 0
        ? true
        : stock.includes(p.stock > 0 ? "In Stock" : "Out of Stock");

    return matchSearch && matchBrand && matchcategory && matchStock;
  });

  const totalPages = Math.ceil(fileteredProducts.length / productsPerPage);
  const paginatedProducts = fileteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="p-4 max-w-screen mt-15">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Products</h1>

        <Link
          href={"/admin/products/new"}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          + Add New Product
        </Link>
      </div>

      <div className="flex justify-between gap-2">
        {/* search functinality */}
        <div className=" flex  items-center border px-3 py-1 gap-2 mb-2 max-w-min rounded-md  ">
          <IoSearch />
          <input
            type="text"
            onChange={(e) => setSearchterm(e.target.value)}
            value={searchterm}
            placeholder="Search product..."
            className="outline-none"
          />
        </div>

        {/* filter functinality */}
        <div className=" items-center gap-1">
          <button
            onClick={() => setShowFilters((prev) => !prev)}
            className="bg-gray-100 px-4 hover:bg-gray-300 py-1 rounded"
          >
            Filters
          </button>
          {Object.keys(selectedFilters).length > 0 && (
            <button
              onClick={() => setSelectedFilters({})}
              className="bg-gray-200 hover:bg-gray-400 py-1 px-2 rounded"
            >
              clear
            </button>
          )}
        </div>
      </div>

      {loading && (
        <div className="">
          <Skeleton />
        </div>
      )}

      {fileteredProducts.length === 0 ? (
        <div className="text-gray-500 text-center">No products found.</div>
      ) : (
        <div className="grid gap-4">
          {paginatedProducts.map((p) => (
            <div
              key={p._id}
              className="border p-4 rounded shadow-sm flex items-center justify-between gap-2"
            >
              {p.media?.[0] && (
                <img
                  src={p.media[0].url}
                  alt={p.title}
                  className="w-12 h-12 object-cover rounded border"
                />
              )}
              <div className="flex items-center justify-between flex-wrap md:flex-row  gap-2 pr-3 w-full">
                <p className="font-semibold truncate">{p.title}</p>
                <p className="text-gray-500">{p.brand}</p>
                <p className="text-gray-500">₹ {p.price}</p>
                <p className="text-gray-500">Stock: {p.stock}</p>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/admin/products/${p._id}`}
                  className="bg-blue-500 text-xs px-2 py-1 text-white hover:underline rounded "
                >
                  Edit
                </Link>
                <button
                  className="bg-red-500 text-xs px-2 py-1 text-white hover:bg-red-600 rounded"
                  onClick={() => confirmDelete(p)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {/* pagination */}
          {totalPages > 1 && (
            <Paginations
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      )}
      <Filters
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filterOptions}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      <Confirmationbox
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Product?"
        message={`Are you sure, you want to delete "${deleteProduct?.title}"? this can not be undone! `}
        confirmText="Delete"
        cancelText="Cancel"
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-900">Products</h2>
            <div className="flex gap-3">
              <div className="flex border border-gray-300 items-center gap-2 pl-2  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <Search className="" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className=" "
                  value={searchterm}
                  onChange={(e) => setSearchterm(e.target.value)}
                />
              </div>
              <Link href={"/admin/products/new"}>
                <button className="px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Product
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sales
                </th> */}
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th> */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {/* <div className="text-2xl mr-3"></div> */}
                      <img
                        src={product.media[0].url}
                        alt=""
                        className="w-10 h-10 object-center"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900 line-clamp-2">
                          {product.title}
                        </div>
                        {/* <div className="text-sm text-gray-500">{product.id}</div> */}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`text-sm ${
                        product.stock < 30 ? "text-red-600" : "text-gray-900"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.sales}
                  </td> */}
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}>
                    {product.status}
                  </span>
                </td> */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
