/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "standalone",
  reactStrictMode: true,
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000", //this is important for below domains to work
        "bl9bh528-3000.inc1.devtunnels.ms",
      ],
    },
  },
  images: {
    remotePatterns: [
      {
        hostname: "webstockreview.net",
      },
      {
        hostname: "upload.wikimedia.org",
      },
      {
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  // async headers() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       headers: [
  //         {
  //           key: "Access-Control-Allow-Origin",
  //           value: "*", // Set your origin
  //         },
  //         {
  //           key: "Access-Control-Allow-Methods",
  //           value: "GET, POST, PUT, DELETE, OPTIONS",
  //         },
  //         {
  //           key: "Access-Control-Allow-Headers",
  //           value: "Content-Type, Authorization",
  //         },
  //       ],
  //     },
  //   ];
  // },
  // async redirects() {
  //   return [
  //     {
  //       source: "/dashboard",
  //       destination: "/login",
  //       has: [
  //         {
  //         },
  //       ],
  //       missing: [
  //         {
  //           type: "",
  //           key: "",
  //         },
  //       ],
  //     },
  //     {
  //       source: "/dashboard",
  //       destination: "/dashboard/filter",
  //       permanent: true,
  //     }
  //   ];
  // },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "http://localhost:3000/",
  //     },
  //     {
  //       source: "/dashobard/admin/:slug",
  //       destination: "/dashboard/filter/admin/:slug",
  //     }
  //   ];
  // }
};

export default nextConfig;
