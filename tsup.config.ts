import { defineConfig } from "tsup";
import { copyFileSync } from "fs";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "tokens/index": "src/tokens/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "framer-motion"],
  treeshake: true,
  splitting: true,
  minify: false,
  async onSuccess() {
    copyFileSync("src/styles.css", "dist/styles.css");
  },
});
