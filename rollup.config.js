import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import cleanup from "rollup-plugin-cleanup";
import filesize from "rollup-plugin-filesize";

import packageJson from "./package.json";

export default {
  input: "./src/index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true,
    },
  ],
  external: ["http", "url", "stream", "https", "zlib"],
  plugins: [
    nodeResolve({ preferBuiltins: true }),
    peerDepsExternal(),
    commonjs(),
    typescript(),
    cleanup(),
    terser(),
    filesize(),
  ],
};
