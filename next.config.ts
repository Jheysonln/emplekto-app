// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com', 
      'images.unsplash.com',
    ],
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    API_URL: process.env.API_URL,
  },
};

export default nextConfig;