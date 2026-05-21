//@ts-check

const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // Use this to set Nx-specific options
  // See: https://nx.dev/recipes/next/next-config-setup
  distDir: '../dist/frontend/.next',
  // Standalone uses symlinks; enable only for Docker/CI (fails on Windows without Developer Mode).
  ...(process.env.NEXT_STANDALONE === 'true' ? { output: 'standalone' } : {}),
  nx: {},
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
