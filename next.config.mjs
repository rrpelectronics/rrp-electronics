/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/admin/:path*",
        destination: "https://rrp-electronics-cms.vercel.app//:path*", // backend URL
      },
    ];
  },
};

export default nextConfig;
