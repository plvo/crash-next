/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: {
      exclude: ["error"],
    },
  },
//   experimental: {
//     serverActions: {
//       allowedOrigins: ["my-proxy.com", "*.my-proxy.com"],
//     },
//   },
};

export default nextConfig;
