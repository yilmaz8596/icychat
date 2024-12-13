import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  envPrefix: "VITE_", // This ensures only VITE_ prefixed vars are exposed
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
