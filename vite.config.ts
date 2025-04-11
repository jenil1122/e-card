import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  base: "/e-card/",
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    {
      name: "html-404",
      closeBundle: async () => {
        const fs = await import("fs/promises");
        const indexPath = path.resolve(__dirname, "dist/public/index.html");
        const notFoundPath = path.resolve(__dirname, "dist/public/404.html");

        try {
          await fs.copyFile(indexPath, notFoundPath);
          console.log("✅ 404.html generated for GitHub Pages");
        } catch (err) {
          console.error("❌ Failed to copy index.html to 404.html:", err);
        }
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
});
