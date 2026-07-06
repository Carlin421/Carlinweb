/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
    // Portrait photos are typically small; allow a modest set of widths.
    imageSizes: [96, 160, 256, 384],
  },
};

export default nextConfig;
