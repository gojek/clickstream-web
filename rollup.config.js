import babel from "@rollup/plugin-babel"
import { terser } from "rollup-plugin-terser"

export default {
  input: "src/index.js",
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
    babel({
      babelHelpers: "bundled",
    }),
  ],
}
