import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['lightningcss', 'lightningcss-win32-x64-msvc', '@tailwindcss/node'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'thesvg.org' },
    ],
  },
};

export default nextConfig;
