/** @type {import('next').NextConfig} */
import withBundleAnalyzer from "@next/bundle-analyzer";
const analyzer = withBundleAnalyzer({
  //enabled: process.env.ANALYZE === "true",
  enabled: true,
  openAnalyzer: true,
});
const nextConfig = {
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
};

export default analyzer(nextConfig);
