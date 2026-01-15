import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Production optimizations
  build: {
    outDir: "dist",
    sourcemap: mode === "development",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: mode === "production", // Remove console.log in production
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: ["@radix-ui/react-dialog", "@radix-ui/react-select"],
        },
      },
    },
  },
  // Environment variable handling
  define: {
    "import.meta.env.VITE_API_URL": JSON.stringify(process.env.VITE_API_URL),
  },
}));
