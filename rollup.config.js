import babel from "@rollup/plugin-babel";
import eslint from "@rollup/plugin-eslint";
import { terser } from "rollup-plugin-terser";

export default {
  input: "./index.js",
  output: [
    {
      name: "clickstream",
      file: "./dist/clickstream.js",
      format: "esm",
      sourcemap: true,
    },
    {
      name: "clickstream",
      file: "./dist/clickstream.min.js",
      format: "esm",
      plugins: [terser()],
    },
  ],
  plugins: [
    eslint({
      fix: true,
      throwOnError: true,
    }),
    babel({
      babelHelpers: "bundled",
    }),
  ],
};
