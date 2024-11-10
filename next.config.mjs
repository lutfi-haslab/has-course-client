import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add any other Next.js specific configurations here
  images: {
    domains: ['your-domain.com'], // example for allowing image domains if required
  },
};

const payloadConfig = {
  // Add Payload CMS-specific configuration here, such as collection paths or API URLs
  serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000',
};

export default withSentryConfig(nextConfig, {
  org: "haslab",
  project: "has-course-client",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  widenClientFileUpload: true,

  tunnelRoute: "/monitoring",

  hideSourceMaps: true,

  disableLogger: true,

  automaticVercelMonitors: true,
});
