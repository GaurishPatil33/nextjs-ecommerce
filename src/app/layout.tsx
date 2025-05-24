import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MantineProvider } from "@mantine/core";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My store ",
  description: "E-commerce store  created with next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col justify-between bg-white text-black dark:bg-gray-900 dark:text-white`}
      >
        {/* <ThemeProvider > */}
        <MantineProvider
          theme={{}}
          withGlobalClasses
          withCssVariables
          defaultColorScheme="light"
        >
          {children}
        </MantineProvider>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
