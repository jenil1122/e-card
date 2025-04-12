import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// Import the required polyfills
import crypto from 'crypto-browserify';

export default defineConfig({
  base: '/e-card/',  // Ensure the base path is correct for GitHub Pages
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.url, "client", "src"),
      "@shared": path.resolve(import.meta.url, "shared"),
      "@assets": path.resolve(import.meta.url, "attached_assets"),
      // Polyfill the 'crypto' module with 'crypto-browserify'
      crypto: import.meta.resolve('crypto-browserify'),
    },
  },
  // Set the root directory to where index.html is located
  root: path.resolve(__dirname, 'client'),  // Ensure this points to the directory containing your index.html
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
    assetsDir: '', // Ensure assets are served correctly
    sourcemap: true, // For better debugging
  },
});
