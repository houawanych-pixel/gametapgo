import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server build (used by the Dockerfile and home-PC hosting).
  output: "standalone",
};

export default nextConfig;
