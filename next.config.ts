import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol: "https",
        hostname:"images.pexels.com"

      },
    ],
    domains: ['cdn.dummyjson.com'],
  },
};

export default nextConfig;
