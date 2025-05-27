/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'res.cloudinary.com', // Untuk gambar dari Cloudinary
      'ui-avatars.com', // Untuk avatar generator
    ],
  },
};

module.exports = nextConfig;
