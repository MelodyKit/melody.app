import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";

export const host = "127.0.0.1";

export default defineConfig(() => ({
  plugins: [sveltekit()],

  clearScreen: false,

  server: {
    port: 1369,
    strictPort: true,
    host,
    hmr: {
      protocol: "ws",
      host,
      port: 1370,
    },
    watch: {
      ignored: ["**/src-tauri/**"],
    },
  },
}));
