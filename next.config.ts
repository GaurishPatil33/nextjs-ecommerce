import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // darkMode: "class",


  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
};

export default nextConfig;
