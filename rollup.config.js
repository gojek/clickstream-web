import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";

// const devMode = process.env.NODE_ENV === "development";

export default {
  input: "./index.js",
  output: {
    file: "./dist/index.js",
    format: "esm",
    exports: "named",
    sourcemap: "inline",
    plugins: [
      terser({
        ecma: 2020,
        mangle: { toplevel: true },
        compress: {
          module: true,
          toplevel: true,
          unsafe_arrows: true,
          drop_console: true,
          drop_debugger: true,
        },
        output: { quote_style: 1 },
      }),
    ],
  },
};
