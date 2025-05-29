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
   output: 'export', // This is needed for static site generation on Netlify
   trailingSlash: true // This helps with static exports
   // Add basePath if your site is not deployed to the root domain
   // basePath: '',
};

module.exports = nextConfig;
