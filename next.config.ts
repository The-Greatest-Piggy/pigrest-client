import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "naver.github.io",
        port: "",
        pathname: "/egjs-infinitegrid/assets/image/**",
      },
      {
        protocol: "https",
        hostname: "github.com",
        port: "",
      },
      {
        hostname: "via.placeholder.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
