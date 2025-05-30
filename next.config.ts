import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
   /* config options here */
   webpack: (config) => {
      config.externals.push('pino-pretty', 'lokijs', 'encoding');
      return config;
   },
   async headers() {
      return [
         {
            source: '/thovt-main/:path*',
            headers: [
               {
                  key: 'Cache-Control',
                  value: 'public, max-age=31536000, immutable'
               }
            ]
         }
      ];
   },
   // Добавляем настройки для статических файлов
   output: 'standalone',
   poweredByHeader: false,
   reactStrictMode: true,
   // Настраиваем обработку статических файлов
   async rewrites() {
      return [
         {
            source: '/thovt-main/:path*',
            destination: '/thovt-main/:path*'
         }
      ];
   },
   // Настраиваем обработку внешних ресурсов
   images: {
      domains: [
         'web.archive.org',
         'thovt.io',
         'fonts.gstatic.com',
         'fonts.googleapis.com'
      ],
      unoptimized: true
   },
   eslint: {
      ignoreDuringBuilds: true,
    },
};

export default nextConfig;
