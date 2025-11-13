import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { renameSync, copyFileSync, mkdirSync, existsSync } from "fs";

// Vite config for static website generation (GitHub Pages)
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Copy only necessary assets and rename index
    {
      name: "copy-assets",
      closeBundle() {
        const outDir = path.resolve(__dirname, "dist/website");
        
        try {
          // Rename index.website.html to index.html
          renameSync(
            path.resolve(outDir, "index.website.html"),
            path.resolve(outDir, "index.html")
          );

          // Copy only logo files (not MSW or debug files)
          const assetsToCopy = [
            "logo.svg",
            "logo-text.svg",
            "vite.svg",
            "favicon.svg",
          ];

          assetsToCopy.forEach((file) => {
            const src = path.resolve(__dirname, "public", file);
            const dest = path.resolve(outDir, file);
            
            if (existsSync(src)) {
              copyFileSync(src, dest);
            }
          });

          console.log("✓ Copied logo assets");
        } catch (err) {
          console.error("Failed to copy assets:", err);
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
  publicDir: false, // Don't copy public directory (excludes MSW and other files)
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
