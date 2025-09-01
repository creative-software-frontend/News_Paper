/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'encrypted-tbn0.gstatic.com',
      'www.metal-am.com',
      'sportsauthority.gov.gh',
      'localhost',
      'i.pravatar.cc',
      'picsum.photos',
    ],
  },
};

export default nextConfig;
