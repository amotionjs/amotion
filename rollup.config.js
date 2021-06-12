import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";
import resolve from "@rollup/plugin-node-resolve";
import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

export default {
  input: "src/index.ts",
  output: [
    { file: pkg.main, format: "cjs", exports: "default", sourcemap: true },
    {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    babel({ babelHelpers: "bundled" }),
    typescript({
      typescript: require("typescript"),
    }),
  ],
};
