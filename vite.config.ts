import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

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
      "@": path.resolve(__dirname, 'client', 'src'),
      "@shared": path.resolve(__dirname, 'shared'),
      "@assets": path.resolve(__dirname, 'attached_assets'),
    },
  },
  root: path.resolve(__dirname, 'client'),  // Ensure this points to the directory containing your index.html
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
    assetsDir: '', // Ensure assets are served correctly
    sourcemap: true, // For better debugging
  },
});
