/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      unoptimized: true, // This is needed for Netlify deployment
      remotePatterns: [
         {
            protocol: 'https',
            hostname: '**'
         }
      ]
   },
   output: 'export' // This is needed for static site generation on Netlify
};

module.exports = nextConfig;
