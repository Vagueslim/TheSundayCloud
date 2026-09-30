import { resolve } from "node:path";
import { defineConfig } from "vite";
import { routes } from "./src/data/routes.js";
import { codaRoutes } from "./src/data/coda-routes.js";

const input = Object.fromEntries(
  [...routes, ...codaRoutes].map((route) => [route.key, resolve(import.meta.dirname, route.file)])
);

export default defineConfig({
  base: process.env.PORTFOLIO_BASE || "/",
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      input
    }
  }
});
