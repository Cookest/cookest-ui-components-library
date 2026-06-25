import { defineConfig } from "tsup";
import { execSync } from "child_process";

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
    execSync("bun x tailwindcss -i src/styles.css -o dist/styles.css");
  },
});
