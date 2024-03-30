/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // allowedOrigins: ["lfxslwbc-3000.inc1.devtunnels.ms", "localhost:3000"],
    serverActions: {
      allowedOrigins: ["lfxslwbc-3000.inc1.devtunnels.ms", "localhost:3000"],
    },
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "http://localhost:3000/",
  //     },
  //   ];
  // }
};

export default nextConfig;
