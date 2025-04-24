import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    NEXTAUTH_URL: process.env.NODE_ENV === 'production' ? 'https://megacoolsite.com' : 'http://localhost:3000',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // compiler: {
  //   removeConsole: {
  //     exclude: ["error"],
  //   },
  // },
  //   experimental: {
  //     serverActions: {
  //       allowedOrigins: ["my-proxy.com", "*.my-proxy.com"],
  //     },
  //   },
};

export default nextConfig;
