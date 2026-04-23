const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api-coursify.onrender.com/api/:path*",
        // destination: "http://localhost:8080/api/:path*",
      },
      {
        source: "/api/files/:path*",
        destination: `${process.env.NEXT_PUBLIC_API}/api/files/:path*`,
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