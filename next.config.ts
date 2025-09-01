import type { NextConfig } from "next";
import { withContentlayer } from "next-contentlayer2";
import createNextIntlPlugin from 'next-intl/plugin';


const nextConfig: NextConfig = {
    experimental: {
        useCache: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "placehold.co",
            },
        ],
    },
};

export default createNextIntlPlugin()(withContentlayer(nextConfig));