"use client";
import React from "react";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  AlertCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Activity,
  Star,
  Eye,
  Edit3,
  MoreHorizontal,
} from "lucide-react";

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
  image: string; // You can use this as a URL or JSX element
  createdAt: string;
  lastUpdated: string;
  profit: number;
  profitMargin: number;
  trend: "up" | "down" | "stable";
}

interface ProductCardProps {
  product: Product;
  viewMode: "grid" | "list";
}

const getStatusColor = (status: Product["status"]) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800";
    case "inactive":
      return "bg-gray-100 text-gray-800";
    case "low_stock":
      return "bg-yellow-100 text-yellow-800";
    case "out_of_stock":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusIcon = (status: Product["status"]) => {
  switch (status) {
    case "active":
      return <CheckCircle size={14} />;
    case "inactive":
      return <XCircle size={14} />;
    case "low_stock":
      return <AlertTriangle size={14} />;
    case "out_of_stock":
      return <AlertCircle size={14} />;
    default:
      return <Clock size={14} />;
  }
};

const getTrendIcon = (trend: Product["trend"]) => {
  switch (trend) {
    case "up":
      return <TrendingUp size={16} className="text-green-500" />;
    case "down":
      return <TrendingDown size={16} className="text-red-500" />;
    default:
      return <Activity size={16} className="text-gray-500" />;
  }
};

const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode }) => {
  return viewMode === "grid" ? (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 p-6">
      <div className="flex items-center justify-between mb-4">
        {/* If product.image is an URL string, replace this with <img src=... /> */}
        <div className="text-4xl">{product.image}</div>

        <div className="flex items-center space-x-2">
          {getTrendIcon(product.trend)}
          <button className="p-1 hover:bg-gray-100 rounded">
            <MoreHorizontal size={16} className="text-gray-400" />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.category}</p>
        <div
          className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
            product.status
          )}`}
        >
          {getStatusIcon(product.status)}
          <span className="capitalize">{product.status.replace("_", " ")}</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Price</span>
          <span className="font-semibold">${product.price}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Stock</span>
          <span
            className={`font-semibold ${
              product.stock < 20 ? "text-red-600" : "text-gray-900"
            }`}
          >
            {product.stock}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Sold</span>
          <span className="font-semibold">{product.sold}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Rating</span>
          <div className="flex items-center space-x-1">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span className="font-semibold">{product.rating}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Profit</span>
          <span className="font-semibold text-green-600">
            ${product.profit}
          </span>
        </div>
      </div>

      <div className="flex space-x-2 mt-4">
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors">
          <Eye size={16} className="inline mr-1" />
          View
        </button>
        <button className="p-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors">
          <Edit3 size={16} className="text-gray-600" />
        </button>
      </div>
    </div>
  ) : (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 p-4 flex items-center space-x-6 overflow-x-auto flex-col md:flex-row">
      <div className="flex-1">
        <div className="text-3xl">{product.image}</div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900">{product.name}</h3>
          <div className="flex items-center space-x-2">
            {getTrendIcon(product.trend)}
            <span className="font-semibold">${product.price}</span>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span>{product.category}</span>
          <span>
            Stock:{" "}
            <span
              className={
                product.stock < 20 ? "text-red-600 font-medium" : "font-medium"
              }
            >
              {product.stock}
            </span>
          </span>
          <span>
            Sold: <span className="font-medium">{product.sold}</span>
          </span>
          <div className="flex items-center space-x-1">
            <Star size={12} className="text-yellow-400 fill-current" />
            <span>{product.rating}</span>
          </div>
          <div
            className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              product.status
            )}`}
          >
            {getStatusIcon(product.status)}
            <span className="capitalize">
              {product.status.replace("_", " ")}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 w-full">
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
          View Details
        </button>
        <button className="p-2 border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors">
          <Edit3 size={16} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
