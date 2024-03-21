/* @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/ // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ["@svgr/webpack"]
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["next/babel", "@babel/preset-react"]
          }
        }
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
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
