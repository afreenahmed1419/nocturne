/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
  },
  // Suppress the image 404 from console during dev when images aren't added yet
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
};

export default nextConfig;
