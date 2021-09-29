module.exports = {
  images: {
    domains: ['m.media-amazon.com'],
    loader: "imgix",
    path: "",
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
}
// next.config.js
// const withPlugins = require('next-compose-plugins');
// const optimizedImages = require('next-optimized-images');

// module.exports = withPlugins([
//   [optimizedImages, {
//     /* config for next-optimized-images */
//   }],

//   // your other plugins here

// ]);

// const withImages = require('next-images')
// module.exports = withImages()
