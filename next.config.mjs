/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tony.sardaritskillshare.com',
        pathname: '/public/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'i0.wp.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'plum-koala-349902.hostingersite.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      }
    ],
  },
};

export default nextConfig;
