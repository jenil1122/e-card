import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// Polyfill the 'crypto' module
import crypto from 'crypto-browserify';

export default defineConfig({
  base: '/e-card/',
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    // Conditionally load the Cartographer plugin in development
    ...(process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined
      ? [import("@replit/vite-plugin-cartographer").then(m => m.cartographer())]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
      // Define 'crypto' to use 'crypto-browserify'
      crypto: require.resolve('crypto-browserify'),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
  define: {
    // This will make 'crypto' accessible in the browser
    'process.env': {},
    global: 'window',
    'crypto': crypto,
  },
});
