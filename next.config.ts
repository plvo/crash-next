import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    APP_URL: process.env.NODE_ENV === 'production' ? 'https://megacoolsite.com' : 'http://localhost:3000',
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
