"use client";
import React, { useState, useEffect } from "react";
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Menu,
  X,
  Plus,
  Bell,
  ChevronDown,
  Tag,
  Truck,
  CreditCard,
  MessageSquare,
  Folder,
  Folders,
  Grid,
  Boxes,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SubmenuItem {
  id: string;
  label: string;
  path: string;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  path: string;
  submenu?: SubmenuItem[];
}
const menuItems: MenuItem[] = [
  { id: "dashboard", label: "Dashboard", icon: Home, path: "/admin" },
  {
    id: "products",
    label: "Products",
    icon: Package,
    path: "/admin/products",
    // submenu: [
    //   { id: "all-products", label: "All Products", path: "/admin/products" },
    //   {
    //     id: "add-product",
    //     label: "Add Product",
    //     path: "/admin/products/new",
    //   },
    //   {
    //     id: "categories",
    //     label: "Categories",
    //     path: "/admin/products/categories",
    //   },
    //   {
    //     id: "inventory",
    //     label: "Inventory",
    //     path: "/admin/products/inventory",
    //   },
    // ],
  },
  {
    id: "orders",
    label: "Orders",
    icon: ShoppingCart,
    path: "/admin/orders",
    // submenu: [
    //   { id: "all-orders", label: "All Orders", path: "/admin/orders" },
    //   { id: "pending", label: "Pending", path: "/admin/orders/pending" },
    //   { id: "shipped", label: "Shipped", path: "/admin/orders/shipped" },
    // ],
  },
  {
    id: "categories",
    label: "Categories",
    icon: Boxes,
    path: "/admin/categories",
  },
  {
    id: "customers",
    label: "Customers",
    icon: Users,
    path: "/admin/customers",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    path: "/admin/analytics",
  },
  { id: "coupons", label: "Coupons", icon: Tag, path: "/admin/coupons" },
  { id: "shipping", label: "Shipping", icon: Truck, path: "/admin/shipping" },
  {
    id: "payments",
    label: "Payments",
    icon: CreditCard,
    path: "/admin/payments",
  },
  {
    id: "reviews",
    label: "Reviews",
    icon: MessageSquare,
    path: "/admin/reviews",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    path: "/admin/settings",
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  const [activeItem, setActiveItem] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const current = [...menuItems]
      .sort((a, b) => b.path.length - a.path.length)
      .find((m) => pathname.startsWith(m.path));

    if (current) {
      setActiveItem(current.id);
    }
  }, [pathname]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleSection = (itemId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleItemClick = (item: MenuItem) => {
    setActiveItem(item.id);
    if (item.submenu) {
      toggleSection(item.id);
    } else if (isMobile) {
      setIsOpen(false);
    }
  };

  const handleSubmenuClick = (subItem: SubmenuItem) => {
    if (isMobile) {
      console.log(subItem);
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 px-4 py-3 flex items-center justify-between mb-2">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <Menu size={20} className="text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Admin Panel</h1>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-200 relative hover:scale-105 active:scale-95">
            <Bell size={18} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              3
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/20 bg-opacity-50 z-40 md:hidden transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white z-60 shadow-2xl transition-transform duration-300 ease-in-out ${
          isMobile ? "w-72" : "w-60"
        } ${
          isOpen
            ? "translate-x-0"
            : isMobile
            ? "-translate-x-full"
            : "-translate-x-64"
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Package size={18} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold">EcomAdmin</h2>
                <p className="text-xs text-slate-400">Management Panel</p>
              </div>
            </div>
            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="p-1 rounded-lg hover:bg-slate-700 transition-all duration-200 hover:scale-110 active:scale-90"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <Link href={"/admin/products/new"}>
          <div className="p-4 border-b border-slate-700/50">
            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2.5 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:scale-102 active:scale-98 hover:shadow-xl">
              <Plus size={16} />

              <span>Add Product</span>
            </button>
          </div>
        </Link>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
          <div className="px-4 space-y-1">
            {menuItems.map((item) => (
              <div key={item.id} className="group">
                <Link href={item.path}>
                  <div
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 hover:translate-x-1 ${
                      activeItem === item.id
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                        : "hover:bg-slate-700/50 text-slate-300 hover:text-white"
                    }`}
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon size={18} />

                      <span className="font-medium">{item.label}</span>
                    </div>
                    {item.submenu && (
                      <div
                        className={`transition-transform duration-200 ${
                          expandedSections[item.id] ? "rotate-180" : "rotate-0"
                        }`}
                      >
                        <ChevronDown size={16} />
                      </div>
                    )}
                  </div>
                </Link>

                {/* Submenu */}
                {item.submenu && (
                  <div
                    className={`ml-6 mt-1 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                      expandedSections[item.id]
                        ? "max-h-48 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {item.submenu.map((subItem) => (
                      <div
                        key={subItem.id}
                        onClick={() => handleSubmenuClick(subItem)}
                        className="px-3 py-2 rounded-md text-sm text-slate-400 hover:text-white hover:bg-slate-700/30 cursor-pointer transition-all duration-200 hover:translate-x-1"
                      >
                        {subItem.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-slate-700/50">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 cursor-pointer transition-all duration-200 hover:scale-102">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-slate-400">admin@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Spacer - Add margin to main content when sidebar is open on desktop */}
      {!isMobile && isOpen && <div className="w-64 flex-shrink-0" />}
    </>
  );
};

export default Sidebar;
