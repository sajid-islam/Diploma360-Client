/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // calls to /api/* in frontend
        destination: "https://diploma360-server.vercel.app/:path*", // redirect to backend
      },
    ];
  },
};

export default nextConfig;
