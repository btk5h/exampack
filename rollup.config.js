import json from "@rollup/plugin-json";
import resolve from '@rollup/plugin-node-resolve';
import commonjs from "@rollup/plugin-commonjs";
import pkg from "./package.json";

const external = [].concat(
	Object.keys(pkg.dependencies || {}),
	Object.keys(pkg.peerDependencies || {})
);

export default [
  {
		input: "src/cli.js",
		output: {
      dir: "dist",
			format: "esm",
		},
		plugins: [
      json({
        preferConst: true
      }),
			// replace({
			// 	preventAssignment: true,
			// 	values: {
			// 		__VERSION__: pkg.version
			// 	}
			// }),
			resolve({
				extensions: ['.mjs', '.js', '.ts']
			}),
			commonjs()
		],
    external,
		preserveEntrySignatures: true
	}
];