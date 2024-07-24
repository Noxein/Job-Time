/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
    dest: "public",
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    disable: false,
    workboxOptions:{
        disableDevLogs: true,
    },
    disable: process.env.NODE_ENV === 'development',
  });

const nextConfig = {};

export default withPWA(nextConfig);
