import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.tsx"],
  dts: true,
  outDir: "dist",
  clean: true,
  format: ["cjs", "esm"],
  splitting: false,
  cjsInterop: true,
});
