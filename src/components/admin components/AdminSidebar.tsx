"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
  { label: "Products", href: "/admin/products" },
  { label: "Orders", href: "/admin/orders" },
  { label: "Users", href: "/admin/users" },
];
const AdminSidebar = () => {
  const pathname = usePathname();
  return (
    <div>
      {/* <aside className="w-60 bg-red-400 text-white p-4 space-y-4">
        <h2 className="text-2xl font-bold mb-2">Admin</h2>
        {links.map((l) => (
          <Link
            href={l.href}
            key={l.label}
            className={clsx(
              "block px-3 py-2 rounded hover:bg-red-600",
              pathname.startsWith(l.href) && "bg-red-500"
            )}
          >
            {l.label}
          </Link>
        ))}
      </aside> */}
      <aside className="w-64 min-h-screen bg-gray-900 text-white p-4">
        <Link href={"/admin"}>Admin</Link>
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          {links.map((l) => (
            <Link
              href={l.href}
              key={l.label}
              className={clsx(
                "block px-3 py-2 rounded hover:bg-red-600",
                pathname.startsWith(l.href) && "bg-red-500"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  );
};

export default AdminSidebar;
