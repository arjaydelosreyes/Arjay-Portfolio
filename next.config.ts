import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['lightningcss', 'lightningcss-win32-x64-msvc', '@tailwindcss/node'],
};

export default nextConfig;
