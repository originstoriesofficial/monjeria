import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'v3.fal.media',
      'fal.media',
      'fal-cdn.batuhan-941.workers.dev',
      'replicate.delivery',
      'aceternity.com',
      'oaidalleapiprodscus.blob.core.windows.net',
      'obj-store.livepeer.cloud',
      'vod-cdn.lp-playback.studio',
      'your-bucket.s3.us-west-2.amazonaws.com', // replace with actual AWS bucket + region
    ],
  },
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
};

export default nextConfig;
