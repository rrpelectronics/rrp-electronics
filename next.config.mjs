/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/admin/:path*",
        destination: "https://rrp-electronics-cms.vercel.app/:path*", // backend URL
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
