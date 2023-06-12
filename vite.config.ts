import dotenv from "dotenv";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import eslintPlugin from "vite-plugin-eslint";

import replace from "@rollup/plugin-replace";
import react from "@vitejs/plugin-react";

const env = dotenv.config().parsed;
const isProduction = process.env.NODE_ENV === "production";
const port = isProduction ? parseInt(process.env.PORT) : parseInt(process.env.PORT_DEV);
console.log(port);
export default defineConfig({
  // root: "./src",
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",

        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? "")) {
            return "assets/images/[name]-[hash][extname]";
          }

          if (/\.css$/.test(name ?? "")) {
            return "assets/css/[name]-[hash][extname]";
          }

          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
    eslintPlugin({
      cache: false,
      include: ["./src/**/*.js", "./src/**/*.jsx", "./src/**/*.tsx"],
      exclude: [],
    }),
    replace({
      preventAssignment: true,
      "process.env.PUBLIC_URL": JSON.stringify(`http://localhost:${port}`),
    }),
  ],
  define: {
    "process.env": env,
  },
  css: {
    devSourcemap: true,
  },
  resolve: {
    alias: {
      components: "/src/components",
      hooks: "/src/hooks",
      assets: "/src/assets",
      data: "/src/data",
      utils: "/src/utils",
      constants: "/src/constants",
    },
  },
  server: {
    port: port,
  },
});
