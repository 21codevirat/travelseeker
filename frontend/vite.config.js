import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Enable Vite's React plugin for JSX support and fast refresh in development.
export default defineConfig({
  plugins: [react()],
});
