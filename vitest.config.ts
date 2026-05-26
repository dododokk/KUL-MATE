import { defineConfig } from "vitest/config";
import type { Plugin } from "vite";

function assetMockPlugin(): Plugin {
  return {
    name: "asset-mock",
    transform(_code: string, id: string) {
      if (/\.(png|svg|jpg|jpeg|gif|webp)(\?.*)?$/.test(id)) {
        return { code: 'export default ""', map: null };
      }
    },
  };
}

export default defineConfig({
  plugins: [assetMockPlugin()],
  test: {
    globals: true,
    environment: "node",
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/utils/**/*.ts"],
    },
  },
});
