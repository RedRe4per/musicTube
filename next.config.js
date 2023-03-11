/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "https://p1.music.126.net",
      "https://p2.music.126.net",
      "p1.music.126.net",
      "p2.music.126.net",
    ],
  },
};

module.exports = nextConfig;
