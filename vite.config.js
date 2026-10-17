import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  build: {
    target: "es2020",
    minify: "terser",
    cssMinify: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info", "console.debug"],
      },
      format: { comments: false },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "gsap-vendor": ["gsap"],
          "framer-vendor": ["framer-motion"],
          "prop-types-vendor": ["prop-types"],
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
    chunkSizeWarningLimit: 800,
    sourcemap: false,
    reportCompressedSize: false,
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
  },

  /* ✅ NO exclude — yehi build ko todh raha tha */
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "gsap",
      "framer-motion",
      "prop-types",
    ],
  },

  server: {
    hmr: { overlay: false },
  },
});