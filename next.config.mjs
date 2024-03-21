/* @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ["image/avif", "image/webp"],
        domains: [
          "cityhotels.s3.amazonaws.com",
          "city-hotels-storage.s3.amazonaws.com",
          "image.cityhotelsandbookings.com",
          "lh3.googleusercontent.com"
        ]
      }
    };

export default nextConfig;
