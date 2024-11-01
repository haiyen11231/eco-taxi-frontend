import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/v1/user/login": "http://localhost:8081",
      "/v1/user/signup": "http://localhost:8081",
      "/v1/user": "http://localhost:8081",
      "/v1/user/refresh-token": "http://localhost:8081",
    },
  },
});
