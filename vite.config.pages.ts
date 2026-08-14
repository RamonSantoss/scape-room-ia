import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const PROJECT_ROOT = import.meta.dirname;

export default defineConfig({
  base: process.env.PAGES_BASE_PATH || "/",
  plugins: [react(), tailwindcss()],
  root: path.resolve(PROJECT_ROOT, "client"),
  publicDir: path.resolve(PROJECT_ROOT, "client", "public"),
  resolve: {
    alias: {
      "@": path.resolve(PROJECT_ROOT, "client", "src"),
      "@shared": path.resolve(PROJECT_ROOT, "shared"),
      "@assets": path.resolve(PROJECT_ROOT, "attached_assets"),
    },
  },
  build: {
    outDir: path.resolve(PROJECT_ROOT, "dist-pages"),
    emptyOutDir: true,
  },
});
