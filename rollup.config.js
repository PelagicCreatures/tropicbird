import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'

export default {
	input: './index.js',
	external: ['@PelagicCreatures/Sargasso'],

	output: [{
		format: 'iife',
		name: 'PelagicCreatures.TropicBird',
		file: './dist/tropicbird.iife.js',
		globals: {
			'@PelagicCreatures/Sargasso': 'PelagicCreatures.Sargasso'
		},
		sourcemap: true
	}],

	plugins: [
		json(),
		nodeResolve(),
		commonjs()
	]
}
