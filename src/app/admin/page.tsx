"use client";
import React, { useState, useEffect, JSX } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  LucideIcon,
} from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import StatsCard from "@/components/admin components/StatsCard";

// Type definitions
interface SalesData {
  name: string;
  sales: number;
  orders: number;
  revenue: number;
}

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface Order {
  id: string;
  customer: string;
  product: string;
  amount: string;
  status: "completed" | "pending" | "processing" | "cancelled";
  time: string;
}

interface TopProduct {
  name: string;
  sales: number;
  revenue: string;
  trend: "up" | "down";
}

type TimePeriod = "24h" | "7d" | "30d" | "90d";
type OrderStatus = "completed" | "pending" | "processing" | "cancelled";

const Dashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("7d");
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set client flag to true after component mounts
    setIsClient(true);

    // Initialize time after component mounts
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleString());
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  // Sample data for charts
  const salesData: SalesData[] = [
    { name: "Mon", sales: 4000, orders: 24, revenue: 2400 },
    { name: "Tue", sales: 3000, orders: 18, revenue: 1800 },
    { name: "Wed", sales: 5000, orders: 32, revenue: 3200 },
    { name: "Thu", sales: 2780, orders: 15, revenue: 1500 },
    { name: "Fri", sales: 1890, orders: 12, revenue: 1200 },
    { name: "Sat", sales: 2390, orders: 16, revenue: 1600 },
    { name: "Sun", sales: 3490, orders: 22, revenue: 2200 },
  ];

  const categoryData: CategoryData[] = [
    { name: "Electronics", value: 35, color: "#3B82F6" },
    { name: "Clothing", value: 25, color: "#10B981" },
    { name: "Books", value: 20, color: "#F59E0B" },
    { name: "Home & Garden", value: 15, color: "#EF4444" },
    { name: "Sports", value: 5, color: "#8B5CF6" },
  ];

  const recentOrders: Order[] = [
    {
      id: "#12847",
      customer: "John Doe",
      product: "iPhone 14 Pro",
      amount: "$999",
      status: "completed",
      time: "2 min ago",
    },
    {
      id: "#12846",
      customer: "Jane Smith",
      product: "Nike Air Max",
      amount: "$129",
      status: "pending",
      time: "5 min ago",
    },
    {
      id: "#12845",
      customer: "Mike Johnson",
      product: "MacBook Pro",
      amount: "$1299",
      status: "processing",
      time: "12 min ago",
    },
    {
      id: "#12844",
      customer: "Sarah Wilson",
      product: "AirPods Pro",
      amount: "$249",
      status: "completed",
      time: "18 min ago",
    },
    {
      id: "#12843",
      customer: "David Brown",
      product: "iPad Air",
      amount: "$599",
      status: "cancelled",
      time: "25 min ago",
    },
  ];

  const topProducts: TopProduct[] = [
    { name: "iPhone 14 Pro", sales: 156, revenue: "$155,400", trend: "up" },
    { name: "MacBook Pro M2", sales: 89, revenue: "$115,700", trend: "up" },
    { name: "AirPods Pro", sales: 234, revenue: "$58,350", trend: "down" },
    { name: "iPad Air", sales: 67, revenue: "$40,130", trend: "up" },
    { name: "Apple Watch", sales: 145, revenue: "$36,250", trend: "up" },
  ];

  const getStatusColor = (status: OrderStatus): string => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: OrderStatus): JSX.Element => {
    switch (status) {
      case "completed":
        return <CheckCircle size={16} />;
      case "pending":
        return <Clock size={16} />;
      case "processing":
        return <AlertCircle size={16} />;
      case "cancelled":
        return <XCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  const handlePeriodChange = (period: TimePeriod): void => {
    setSelectedPeriod(period);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome back! Here&rsquo;s what&rsquo;s happening with your
                store.
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              {/* Only show time after client-side hydration */}
              {isClient && (
                <div className="text-sm text-gray-500 bg-white px-3 py-2 rounded-lg border">
                  {currentTime}
                </div>
              )}
              <div className="flex space-x-2">
                {(["24h", "7d", "30d", "90d"] as TimePeriod[]).map((period) => (
                  <button
                    key={period}
                    onClick={() => handlePeriodChange(period)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      selectedPeriod === period
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Revenue"
            value="$45,239"
            change="+12.5%"
            icon={DollarSign}
            trend="up"
            color="blue"
          />
          <StatsCard
            title="Total Orders"
            value="1,429"
            change="+8.2%"
            icon={ShoppingCart}
            trend="up"
            color="green"
          />
          <StatsCard
            title="Total Customers"
            value="2,156"
            change="+5.7%"
            icon={Users}
            trend="up"
            color="purple"
          />
          <StatsCard
            title="Total Products"
            value="348"
            change="-2.1%"
            icon={Package}
            trend="down"
            color="orange"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Sales Overview
              </h2>
              <button
                className="p-2 hover:bg-gray-100 rounded-lg"
                aria-label="More options"
              >
                <MoreVertical size={20} className="text-gray-500" />
              </button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorSales)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Category Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Sales by Category
              </h2>
              <button
                className="p-2 hover:bg-gray-100 rounded-lg"
                aria-label="More options"
              >
                <MoreVertical size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <ResponsiveContainer width={200} height={200}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry: CategoryData, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 ml-6">
                {categoryData.map((item: CategoryData, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between mb-3"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-gray-600">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Orders
              </h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order: Order, index: number) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <span className="font-medium text-gray-900">
                        {order.id}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {order.customer} • {order.product}
                    </p>
                    <p className="text-xs text-gray-500">{order.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {order.amount}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Top Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Top Products
              </h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {topProducts.map((product: TopProduct, index: number) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {product.sales} sales
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {product.revenue}
                    </p>
                    <div
                      className={`flex items-center space-x-1 text-sm ${
                        product.trend === "up"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {product.trend === "up" ? (
                        <TrendingUp size={14} />
                      ) : (
                        <TrendingDown size={14} />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
