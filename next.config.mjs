/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    domains: [
      "www.league-funny.com",
      "img.league-funny.com",
      "img.youtube.com",
      "vod.league-funny.com",
      "platform-lookaside.fbsbx.com",
      "static-cdn.jtvnw.net",
      "i.imgur.com",
      "graph.facebook.com",
      "www.dropbox.com",
      "twitter.com",
      "x.com",
      "truth.bahamut.com.tw",
      "p2.bahamut.com.tw",
      "scontent.cdninstagram.com",
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return config;
  },
};

export default nextConfig;
 