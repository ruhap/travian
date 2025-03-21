import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entryPoints: ["src/index.ts"],
  clean: false,
  format: ["cjs"],
  outDir: "dist",
  ...options,
}));
