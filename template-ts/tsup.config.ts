import { defineConfig } from "tsup";

export default defineConfig({
    entry: [ "src/**/*.ts" ],
    bundle: false,
    minify: true,
    clean: true,
    outDir: "dist",
    format: "cjs",
    platform: "node",
    target: "node18"
})