import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
        return [
            {
                source: '/:path*',
                has: [
                    {
                        type: 'host',
                        value: 'vidflyy.in',
                    },
                ],
                destination: 'https://www.vidflyy.in/:path*',
                permanent: true,
            },
        ];
    },
    /* config options here */
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'upload.wikimedia.org',
            },
        ],
    },
};

export default nextConfig;
