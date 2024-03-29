import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import {
	terser
}
	from 'rollup-plugin-terser'

export default {
	input: './index.mjs',
	external: ['@pelagiccreatures/sargasso'],
	output: [{
		format: 'iife',
		name: 'TropicBirdModule',
		file: './dist/tropicbird.iife.js',
		globals: {
			'@pelagiccreatures/sargasso': 'SargassoModule'
		}
	}, {
		format: 'iife',
		name: 'TropicBirdModule',
		file: './dist/tropicbird.iife.min.js',
		globals: {
			'@pelagiccreatures/sargasso': 'SargassoModule'
		},
		plugins: [terser({
			output: {
				comments: false
			},
			keep_classnames: true,
			keep_fnames: true
		})],
		sourcemap: true
	}],

	plugins: [
		json(),
		nodeResolve(),
		commonjs()
	]
}
