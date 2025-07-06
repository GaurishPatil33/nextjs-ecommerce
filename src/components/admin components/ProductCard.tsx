"use client";
import React from "react";
import { Eye, Trash2, Edit } from "lucide-react";
import { motion } from "framer-motion";

export interface ProductPreview {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  sales: number;
  rating: number;
  status: string;
  image: string;
  lastUpdated: string;
}
interface ProductCardProps {
  product: ProductPreview[];
  viewMode: "grid" | "list";
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800";
    case "low_stock":
      return "bg-yellow-100 text-yellow-800";
    case "out_of_stock":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "active":
      return "Active";
    case "low_stock":
      return "Low Stock";
    case "out_of_stock":
      return "Out of Stock";
    default:
      return "Unknown";
  }
};

const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode }) => {
  return (
    <div className="p-6">
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {product.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -4 }}
              className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-200 w-full"
            >
              <div className="relative mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <span
                  className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    product.status
                  )}`}
                >
                  {getStatusText(product.status)}
                </span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 truncate">
                {product.name}
              </h4>
              <p className="text-sm text-gray-600 mb-2">{product.category}</p>
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-gray-900">
                  ${product.price}
                </span>
                <div className="flex items-center gap-1">
                  ⭐{" "}
                  <span className="text-sm text-gray-600">
                    {product.rating}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <span>Stock: {product.stock}</span>
                <span>Sales: {product.sales}</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center justify-center gap-1"
                >
                  <Edit size={14} />
                  Edit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Eye size={14} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Product
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Category
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Price
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Stock
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Sales
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {product.map((product) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <div className="font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          Updated {product.lastUpdated}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    {product.category}
                  </td>
                  <td className="py-4 px-4 font-medium text-gray-900">
                    ${product.price}
                  </td>
                  <td className="py-4 px-4 text-gray-600">{product.stock}</td>
                  <td className="py-4 px-4 text-gray-600">{product.sales}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        product.status
                      )}`}
                    >
                      {getStatusText(product.status)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Eye size={16} className="text-gray-600" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Edit size={16} className="text-gray-600" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} className="text-red-600" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
