import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Perf budget: serve modern formats with responsive sizes everywhere.
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Keep the type gate on — perf/a11y are acceptance criteria, not optional.
  // (ESLint runs via `pnpm lint`; Next 16 removed the built-in `eslint` config key.)
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
