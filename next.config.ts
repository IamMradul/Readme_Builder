import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'img.shields.io' },
      { protocol: 'https', hostname: 'github-readme-stats.vercel.app' },
      { protocol: 'https', hostname: 'streak-stats.demolab.com' },
      { protocol: 'https', hostname: 'github-profile-trophy.vercel.app' },
      { protocol: 'https', hostname: 'github-readme-activity-graph.vercel.app' },
      { protocol: 'https', hostname: 'readme-typing-svg.demolab.com' },
      { protocol: 'https', hostname: 'capsule-render.vercel.app' },
      { protocol: 'https', hostname: 'skillicons.dev' },
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
      { protocol: 'https', hostname: 'komarev.com' },
      { protocol: 'https', hostname: 'readme-jokes.vercel.app' },
      { protocol: 'https', hostname: 'quotes-github-readme.vercel.app' },
    ],
  },
};

export default nextConfig;
