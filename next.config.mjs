/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // allowedOrigins: ["lfxslwbc-3000.inc1.devtunnels.ms", "localhost:3000"],
    serverActions: {
      allowedOrigins: ["lfxslwbc-3000.inc1.devtunnels.ms", "localhost:3000"],
    },
  },
  async redirects() {
    return [
      // {
      //   source: "/dashboard",
      //   destination: "/login",
      //   has: [
      //     {
      //     },
      //   ],
      //   missing: [
      //     {
      //       type: "",
      //       key: "",
      //     },
      //   ],
      // },
      // {
      //   source: "/dashboard",
      //   destination: "/dashboard/filter",
      //   permanent: true,
      // }
    ];
  },
  async rewrites() {
    return [
      // {
      //   source: "/",
      //   destination: "http://localhost:3000/",
      // },
      // {
      //   source: "/dashobard/admin/:slug",
      //   destination: "/dashboard/filter/admin/:slug",
      // }
    ];
  }
};

export default nextConfig;
