"use client";
import {
  Filter,
  Package,
  Clock,
  RefreshCw,
  Truck,
  CheckCircle,
  XCircle,
  TrendingUp,
  ChevronDown,
  Search,
  Trash2,
  Edit,
  Eye,
  Loader,
  X,
  DollarSign,
  MapPin,
  User,
} from "lucide-react";
import StatsCard from "@/components/admin components/StatsCard";
import React, { useEffect, useMemo,  useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FilterPanel from "@/components/admin components/Filters";
import Confirmationbox from "@/components/Confirmationbox";

interface FilterConfig {
  key: string;
  label: string;
  type: "single" | "multi";
  options: { value: string; label: string }[];
  placeholder: string;
}
interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
    avatar: string;
  };
  status: string;
  date: string;
  total: number;
  items: number;
  payment: string;
  shipping: {
    method: string;
    address: string;
  };
  products: {
    name: string;
    quantity: number;
    price: number;
  }[];
  tracking: string | null;
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
const ordersData = [
  {
    id: "#ORD-001",
    customer: {
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b95b7f08?w=100&h=100&fit=crop&crop=face",
    },
    status: "delivered",
    date: "2024-06-14T10:30:00Z",
    total: 299.99,
    items: 3,
    payment: "card",
    shipping: {
      method: "Express",
      address: "123 Main St, New York, NY 10001",
    },
    products: [
      { name: "Premium Headphones", quantity: 1, price: 199.99 },
      { name: "Phone Case", quantity: 2, price: 49.99 },
    ],
    tracking: "TRK123456789",
  },
  {
    id: "#ORD-002",
    customer: {
      name: "Michael Chen",
      email: "michael.c@email.com",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    status: "shipped",
    date: "2024-06-13T15:45:00Z",
    total: 149.5,
    items: 2,
    payment: "paypal",
    shipping: {
      method: "Standard",
      address: "456 Oak Ave, Los Angeles, CA 90210",
    },
    products: [
      { name: "Wireless Mouse", quantity: 1, price: 79.99 },
      { name: "Mousepad", quantity: 1, price: 29.99 },
    ],
    tracking: "TRK987654321",
  },
  {
    id: "#ORD-003",
    customer: {
      name: "Emily Davis",
      email: "emily.d@email.com",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
    status: "processing",
    date: "2024-06-13T09:20:00Z",
    total: 89.99,
    items: 1,
    payment: "card",
    shipping: {
      method: "Standard",
      address: "789 Pine St, Chicago, IL 60601",
    },
    products: [{ name: "Bluetooth Speaker", quantity: 1, price: 89.99 }],
    tracking: null,
  },
  {
    id: "#ORD-004",
    customer: {
      name: "David Wilson",
      email: "david.w@email.com",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    status: "cancelled",
    date: "2024-06-12T14:15:00Z",
    total: 199.99,
    items: 1,
    payment: "card",
    shipping: {
      method: "Express",
      address: "321 Elm St, Miami, FL 33101",
    },
    products: [{ name: "Smart Watch", quantity: 1, price: 199.99 }],
    tracking: null,
  },
  {
    id: "#ORD-005",
    customer: {
      name: "Lisa Anderson",
      email: "lisa.a@email.com",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    },
    status: "pending",
    date: "2024-06-12T11:30:00Z",
    total: 459.97,
    items: 5,
    payment: "card",
    shipping: {
      method: "Express",
      address: "654 Maple Dr, Seattle, WA 98101",
    },
    products: [
      { name: "Laptop Stand", quantity: 1, price: 99.99 },
      { name: "USB Cable", quantity: 3, price: 19.99 },
      { name: "Power Bank", quantity: 1, price: 79.99 },
    ],
    tracking: null,
  },
];

const orderStats = [
  {
    title: "Total",
    icon: Package,
    color: "blue",
    value: ordersData.length.toString(),
  },
  {
    title: "Pending",
    icon: Clock,
    color: "yellow",
    value: ordersData.filter((o) => o.status === "pending").length.toString(),
  },
  {
    title: "Processing",
    icon: RefreshCw,
    color: "blue",
    value: ordersData
      .filter((o) => o.status === "processing")
      .length.toString(),
  },
  {
    title: "Shipped",
    icon: Truck,
    color: "purple",
    value: ordersData.filter((o) => o.status === "shipped").length.toString(),
  },
  {
    title: "Delivered",
    icon: CheckCircle,
    color: "green",
    value: ordersData.filter((o) => o.status === "delivered").length.toString(),
  },
  {
    title: "Cancelled",
    icon: XCircle,
    color: "red",
    value: ordersData.filter((o) => o.status === "cancelled").length.toString(),
  },
  {
    title: "Revenue",
    icon: TrendingUp,
    color: "green",
    value: "₹" + ordersData.reduce((s, o) => s + o.total, 0).toString(),
  },
];

interface StatusConfig {
  color: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
}

const getStatusConfig = (status: Order["status"]) => {
  const configs: Record<Order["status"], StatusConfig> = {
    delivered: {
      color: "bg-green-50 text-green-700 border-green-200",
      icon: CheckCircle,
      iconColor: "text-green-600",
    },
    processing: {
      color: "bg-yellow-50 text-yellow-700 border-yellow-200",
      icon: Loader,
      iconColor: "text-yellow-600",
    },
    shipped: {
      color: "bg-blue-50 text-blue-700 border-blue-200",
      icon: Truck,
      iconColor: "text-blue-600",
    },
    cancelled: {
      color: "bg-red-50 text-red-700 border-red-200",
      icon: XCircle,
      iconColor: "text-red-600",
    },
  };
  return configs[status] || configs.processing;
};

const OrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Record<string, string | string[]>>({});
  const [orders, setOrders] = useState<Order[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteOrder, setDeleteOrder] = useState<Order>();
  const [showOrdercard, setShowOrderCard] = useState(false);
  const [displayOrderCard, setDisplayOrderCard] = useState<Order|any >(null);

  const filterConfig: FilterConfig[] = [
    {
      key: "Status",
      label: "Status",
      type: "multi",
      options: Array.from(new Set(orders.map((o) => o.status))).map((s) => ({
        value: s,
        label: s,
      })),
      placeholder: "All Status",
    },
    {
      key: "Shipping Method",
      label: "Shipping Method",
      type: "multi",
      options: Array.from(new Set(orders.map((o) => o.shipping.method))).map(
        (s) => ({
          value: s,
          label: s,
        })
      ),
      placeholder: "All",
    },
    {
      key: "Payment Method",
      label: "Payment Method",
      type: "multi",
      options: Array.from(new Set(orders.map((o) => o.payment))).map((s) => ({
        value: s,
        label: s,
      })),
      placeholder: "All ",
    },
    {
      key: "Sort By",
      label: "Sort By",
      type: "single",
      options: [
        { value: "date-newest", label: "Date (Newest First)" },
        { value: "date-oldest", label: "Date (Oldest First)" },
        { value: "total-highest", label: "Total (Highest First)" },
        { value: "total-lowest", label: "Total (Lowest First)" },
        { value: "customer-name", label: "Customer Name (A-Z)" },
        { value: "order-id", label: "Order ID" },
        { value: "status", label: "Status" },
        { value: "items-most", label: "Items (Most First)" },
        { value: "items-least", label: "Items (Least First)" },
      ],
      placeholder: "Sort By",
    },
  ];

  useEffect(() => {
    setOrders(ordersData);
  }, []);

  const filteredOrders = useMemo(() => {
    let filtered = orders.filter((order) => {
      // Search functionality
      const matchSearch =
        searchTerm === "" ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.products.some((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        order.shipping.address
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        (order.tracking &&
          order.tracking.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchStatus =
        !filters["Status"] ||
        filters["Status"].length === 0 ||
        (Array.isArray(filters["Status"])
          ? filters["Status"].includes(order.status)
          : filters["Status"] === order.status);

      const matchShipping =
        !filters["Shipping Method"] ||
        filters["Shipping Method"].length === 0 ||
        (Array.isArray(filters["Shipping Method"])
          ? filters["Shipping Method"].includes(order.shipping.method)
          : filters["Shipping Method"] === order.shipping.method);

     
      const matchPayment =
        !filters["Payment Method"] ||
        filters["Payment Method"].length === 0 ||
        (Array.isArray(filters["Payment Method"])
          ? filters["Payment Method"].includes(order.payment)
          : filters["Payment Method"] === order.payment);

      return matchSearch && matchStatus && matchShipping && matchPayment;
    });

    // Sorting functionality
    if (filters["Sort By"]) {
      const sortBy = filters["Sort By"];

      filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case "date-newest":
            return new Date(b.date).getTime() - new Date(a.date).getTime();

          case "date-oldest":
            return new Date(a.date).getTime() - new Date(b.date).getTime();

          case "total-highest":
            return b.total - a.total;

          case "total-lowest":
            return a.total - b.total;

          case "customer-name":
            return a.customer.name.localeCompare(b.customer.name);

          case "order-id":
            return a.id.localeCompare(b.id);

          case "status":
            return a.status.localeCompare(b.status);

          case "items-most":
            return b.items - a.items;

          case "items-least":
            return a.items - b.items;

          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [orders, searchTerm, filters]);

  const showDetails = (order: Order) => {
    setDisplayOrderCard(order);
    setShowOrderCard(true);
  };

  const closeViewDetails = () => {
    setDisplayOrderCard(null);
    setTimeout(() => setDisplayOrderCard(null), 300);
  };

  const confirmDelete = (order: Order) => {
    setDeleteOrder(order);
    setShowConfirm(true);
  };

  const handleDelete = () => {
    if (!deleteOrder) return;
    try {
      // await axios.delete(`/api/o?id=${deleteProduct._id}`);
      // setDeleteProduct(undefined);
      // setShowConfirm(false);
      // fetchProducts();
      setOrders((prev) => prev.filter((p: any) => p.id !== deleteOrder.id));
      setShowConfirm(false);
    } catch (err) {
      console.error("Error deleting...", err);
    }
  };

  const OrderCard = ({
    order,
    onClose,
  }: {
    order: Order;
    onClose: () => void;
  }) => {
    if (!order) return null;

    const statusConfig = getStatusConfig(order.status);
    const StatusIcon = statusConfig.icon;

    return (
      <div className="">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/5 bg-opacity-50 z-40"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="fixed inset-0 md:max-w-[60%] md:max-h-[30%] md:left-1/3 md:top-1/2  z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full mt-2 max-h-[80vh] md:max-h-[60vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={order.customer.avatar}
                    alt={order.customer.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {order.id}
                    </h2>
                    <p className="text-gray-600">{order.customer.name}</p>
                    <p className="text-sm text-gray-500">
                      {formatDate(order.date)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span
                    className={`px-3 py-1 flex items-center text-sm font-medium rounded-full border ${statusConfig.color}`}
                  >
                    <StatusIcon
                      className={`w-4 h-4 inline mr-1 ${statusConfig.iconColor}`}
                    />
                    {order.status}
                  </span>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-center p-4 bg-gray-50 rounded-xl"
                >
                  <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">
                    ${order.total}
                  </p>
                  <p className="text-sm text-gray-600">Total</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center p-4 bg-gray-50 rounded-xl"
                >
                  <Package className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">
                    {order.items}
                  </p>
                  <p className="text-sm text-gray-600">Items</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center p-4 bg-gray-50 rounded-xl"
                >
                  {order.payment}
                  {/* {getPaymentIcon(order.payment)} */}
                  <p className="text-lg font-medium text-gray-900">
                    {order.payment}
                  </p>
                  <p className="text-sm text-gray-600">Payment</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center p-4 bg-gray-50 rounded-xl"
                >
                  <Truck className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-lg font-medium text-gray-900">
                    {order.shipping.method}
                  </p>
                  <p className="text-sm text-gray-600">Shipping</p>
                </motion.div>
              </div>

              {/* Details Grid */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Order Items */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Package className="w-5 h-5 mr-2" />
                    Order Items
                  </h3>
                  <div className="space-y-3">
                    {order.products.map((product, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Quantity: {product.quantity}
                          </p>
                        </div>
                        <p className="font-bold text-gray-900">
                          ${product.price}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Customer & Shipping Info */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-6"
                >
                  {/* Customer Info */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Customer Information
                    </h3>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-medium text-gray-900">
                        {order.customer.name}
                      </p>
                      <p className="text-gray-600">{order.customer.email}</p>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Shipping Address
                    </h3>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-700">{order.shipping.address}</p>
                    </div>
                  </div>

                  {/* Tracking */}
                  {order.tracking && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Truck className="w-5 h-5 mr-2" />
                        Tracking Information
                      </h3>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="font-mono text-gray-700">
                          {order.tracking}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex justify-center space-x-4 mt-8 pt-6 border-t border-gray-200"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Order</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
                >
                  <Package className="w-4 h-4" />
                  <span>Track Package</span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="p-3 px-2 min-h-screen max-w-screen mt-15 md:mt-2 space-y-2 mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="">
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600 mt-1">Manage and track all Orders</p>
        </div>
      </div>
      {/* stats */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orderStats.map((o) => (
          <StatsCard
            key={o.title}
            title={o.title}
            value={o.value}
            color={o.color}
            icon={o.icon}
          />
        ))}
      </div>
      {/* search and filters */}
      <div className="bg-white p-6 rounded-2xl mb-3 shadow-sm border">
        <div className="flex flex-col  lg:justify-between space-y-4">
          {" "}
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
        </div>
      </div>

      <div className="grid gap-4 ">
        {/* <div className=""> */}

        <div className="bg-white md:rounded-2xl rounded shadow-sm border overflow-x-auto">
          <table className="w-full bg-white ">
            <thead>
              <tr className="border-b border-gray-200">
                {[
                  "Order ID",
                  "Date",
                  "Customer",
                  "Status",
                  "Total",
                  "Items",
                  "Payment Method",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-4 text-left text-sm font-medium text-gray-900 w-full"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((o) => {
                const statusConfig = getStatusConfig(o.status);
                const StatusIcon = statusConfig.icon;
                return (
                  <motion.tr
                    key={o.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6 flex ">
                      <div className="text-sm text-gray-900 flex">{o.id}</div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {formatDate(o.date)}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <img
                          src={o.customer.avatar}
                          alt={o.customer.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-medium text-gray-900">
                            {o.customer.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {o.customer.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border ${statusConfig.color}`}
                      >
                        <StatusIcon
                          className={`w-3 h-3 mr-1 ${statusConfig.iconColor}`}
                        />
                        {o.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{o.total}</td>
                    <td className="py-4 px-6 text-gray-600">{o.items}</td>
                    <td className="py-4 px-6 text-gray-600">{o.payment}</td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => showDetails(o)}
                          title="Show Details"
                          aria-label="Show Details"
                          className="group flex items-center justify-center gap-1 p-2 rounded-lg transition-colors hover:bg-blue-500"
                        >
                          <Eye
                            size={26}
                            className="text-blue-500 group-hover:text-white"
                          />
                          <span className="text-sm text-white opacity-0 md:opacity-100 group-hover:opacity-100 transition-all duration-200">
                            Show Details
                          </span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => confirmDelete(o)}
                          title="Delete"
                          aria-label="Delete"
                          className="group flex items-center justify-center gap-1 p-2 rounded-lg transition-colors hover:bg-red-500"
                        >
                          <Trash2
                            size={20}
                            className="text-red-500 group-hover:text-white"
                          />
                          <span className="text-sm text-white opacity-0 md:opacity-100 group-hover:opacity-100 transition-all duration-200">
                            Delete
                          </span>
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showOrdercard && (
        <OrderCard order={displayOrderCard} onClose={closeViewDetails} />
      )}
      <Confirmationbox
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Product?"
        message={`Are you sure, you want to delete "${deleteOrder?.id}"? this can not be undone! `}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default OrdersPage;
