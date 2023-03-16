/** @type {import('next').NextConfig} */
if (
  process.env.LD_LIBRARY_PATH == null ||
  !process.env.LD_LIBRARY_PATH.includes(
    `${process.env.PWD}/node_modules/canvas/build/Release:`
  )
) {
  process.env.LD_LIBRARY_PATH = `${
    process.env.PWD
  }/node_modules/canvas/build/Release:${process.env.LD_LIBRARY_PATH || ""}`;
}

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "p1.music.126.net",
      "p2.music.126.net",
      "p3.music.126.net",
      "p4.music.126.net",
    ],
  },
};

module.exports = nextConfig;
