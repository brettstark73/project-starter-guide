/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
  env: {
    // Only expose public keys to client bundle
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    // Server-only secrets (NEXTAUTH_SECRET, DATABASE_URL, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET)
    // are accessed directly via process.env in API routes - never expose to client
  },
  turbopack: {
    root: __dirname,
  },
}

module.exports = nextConfig
