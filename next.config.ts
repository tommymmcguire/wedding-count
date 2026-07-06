import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The raw Canva assets are very large (2400px). Until we run a proper
  // optimization pass (resize/compress into web sizes), serve them directly
  // rather than letting the dev-time image optimizer choke on them.
  images: { unoptimized: true },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "ALLOWALL" },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors *;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
