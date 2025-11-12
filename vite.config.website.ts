import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { renameSync } from "fs";

// Vite config for static website generation (GitHub Pages)
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Rename index.website.html to index.html after build
    {
      name: "rename-index",
      closeBundle() {
        try {
          renameSync(
            path.resolve(__dirname, "dist/website/index.website.html"),
            path.resolve(__dirname, "dist/website/index.html")
          );
        } catch (err) {
          console.error("Failed to rename index file:", err);
        }
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/pages": path.resolve(__dirname, "./src/pages"),
      "@/hooks": path.resolve(__dirname, "./src/hooks"),
      "@/contexts": path.resolve(__dirname, "./src/contexts"),
      "@/services": path.resolve(__dirname, "./src/services"),
      "@/types": path.resolve(__dirname, "./src/types"),
      "@/utils": path.resolve(__dirname, "./src/utils"),
      "@/config": path.resolve(__dirname, "./src/config"),
    },
  },
  // GitHub Pages configuration
  base: "./", // Relative paths for compatibility
  build: {
    outDir: "dist/website",
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, "index.website.html"),
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
  },
});
