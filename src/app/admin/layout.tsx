import React from "react";
import AdminSidebar from "@/components/admin components/AdminSidebar";

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
        <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Component */}
      <AdminSidebar />
      
      {/* Main Content */}
      <main className="flex-1 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}
