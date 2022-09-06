import babel from "@rollup/plugin-babel"
import { terser } from "rollup-plugin-terser"
import { nodeResolve } from "@rollup/plugin-node-resolve"

export default {
  input: "src/index.js",
  output: [
    {
      name: "clickstream",
      file: "./dist/index.js",
      format: "esm",
      sourcemap: true,
    },
    {
      name: "clickstream",
      file: "./dist/index.min.js",
      format: "esm",
      plugins: [terser()],
    },
    {
      file: "./dist/index.cjs",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "./dist/index.min.cjs",
      format: "cjs",
      plugins: [terser()],
    },
    // {
    //   file: "./dist/index.umd.js",
    //   name: "clickstream",
    //   format: "umd",
    //   globals: {
    //     "protobufjs/minimal.js": "$protobuf",
    //   },
    // },
  ],
  external: ["protobufjs/minimal.js"],
  plugins: [
    nodeResolve(),
    babel({
      babelHelpers: "bundled",
      // presets: [
      //   [
      //     "@babel/preset-env",
      //     {
      //       targets: "Android 4.4",
      //     },
      //   ],
      // ],
    }),
  ],
}
