import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as dotenv from "dotenv";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_POKE_API,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Menghapus prefix /api
      },
    },
  },
});
