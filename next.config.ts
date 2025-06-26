import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.hashnode.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'hashnode.com',
        port: '',
        pathname: '/**',
      },
      { hostname: "images.unsplash.com" },
      { hostname: "images-na.ssl-images-amazon.com" },
      { hostname: "upload.wikimedia.org" },
      { hostname: "m.media-amazon.com" },
      { hostname: "cdn.sanity.io" },
      { hostname: "cdn.simpleicons.org" },
      { hostname: "cdn.myanimelist.net" }
    ]
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ disables type checking on build
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ disables linting during build
  },
};

export default nextConfig;
