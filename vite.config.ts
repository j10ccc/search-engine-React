import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    port: 8000,
    proxy: {
      "/api": {
        target: "http://101.43.175.190:8080",
        changeOrigin: true
      }
    }
  },
  plugins: [react()],
  envDir: "/"
});
