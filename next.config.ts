const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8080/api/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google OAuth profile pictures
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com", // fallback if needed
      },
      {
        protocol: "https",
        hostname: "static0.colliderimages.com", // 👈 added
      },
    ],
  },
};

export default nextConfig;