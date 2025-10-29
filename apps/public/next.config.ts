import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  modularizeImports: {
    antd: {
      transform: 'antd/es/{{member}}'
    }
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: { dimensions: false }
          }
        ],
        as: '*.js'
      }
    }
  },
  webpack: (config) => {
    // config.externals.push({
    //   bufferutil: 'bufferutil',
    //   'utf-8-validate': 'utf-8-validate'
    // });
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: {
        loader: '@svgr/webpack',
        options: {
          dimensions: false
        }
      }
    });
    return config;
  }
};

export default nextConfig;
