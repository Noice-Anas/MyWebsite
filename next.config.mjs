import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/lib/i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed output: 'export' temporarily for development
  // Will add it back for production build
  images: {
    unoptimized: true,
  },
}

export default withNextIntl(nextConfig)
