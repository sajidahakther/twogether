import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    domains: ['lh3.googleusercontent.com'],
    unoptimized: true
  },
};

export default nextConfig;
