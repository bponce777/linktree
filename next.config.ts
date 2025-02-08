import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['bp8x2wj5xd.ufs.sh', 'utfs.io'], // Added utfs.io to the domains array
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bp8x2wj5xd.ufs.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io', // Added utfs.io to the remote patterns
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
