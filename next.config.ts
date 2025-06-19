import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Disable ESLint during Vercel builds
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Your image domains preserved
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vqxb9zjqp8.ufs.sh",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
};

export default nextConfig;