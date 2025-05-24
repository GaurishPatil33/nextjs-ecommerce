import React from "react";
import AdminSidebar from "@/components/admin components/AdminSidebar";
import { Geist, Geist_Mono } from "next/font/google";

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body>
//         {/* <ThemeProvider > */}
//         <AdminSidebar />
//         {children}

//         {/* </ThemeProvider> */}
//       </body>
//     </html>
//   );
// }

export const metadata = {
  title: "Admin Panel",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <div className="h-full">
        <AdminSidebar />
      </div>
      <div className="flex-1">
        {/* Optional AdminHeader */}
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
