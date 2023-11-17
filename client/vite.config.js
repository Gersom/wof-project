/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  // Permite conexiones desde cualquier IP
  server: { host: "0.0.0.0" },
  plugins: [react()],
  resolve: {
    alias: {
      "~src": path.resolve(__dirname, "./src"),
      "~common": path.resolve(__dirname, "./src/common"),
      "~components": path.resolve(__dirname, "./src/ui/components"),
      "~icons": path.resolve(__dirname, "./src/ui/assets/icons"),
      "~images": path.resolve(__dirname, "./src/ui/assets/images"),
      "~styles": path.resolve(__dirname, "./src/ui/assets/styles"),
    },
  },
});
