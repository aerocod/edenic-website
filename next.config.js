/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Ensures proper static export
  images: {
    unoptimized: true, // Fixes image issues in static export
  },
};

module.exports = nextConfig;