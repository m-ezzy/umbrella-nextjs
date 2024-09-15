/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // allowedOrigins: ["localhost:3000", "lfxslwbc-3000.inc1.devtunnels.ms"],
    serverActions: {
      allowedOrigins: ["localhost:3000", "lfxslwbc-3000.inc1.devtunnels.ms"],
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
