import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin the workspace root to this directory so Turbopack does not
    // climb up into the parent repo's package-lock.json when this is a
    // git worktree.
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
