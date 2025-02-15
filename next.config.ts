import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

if (process.env.NEXT_PUBLIC_EXPORT == "true") {
  nextConfig.output = "export";
  nextConfig.images = { unoptimized: true };
  nextConfig.pageExtensions = ["jsx", "tsx"];
}

export default nextConfig;
